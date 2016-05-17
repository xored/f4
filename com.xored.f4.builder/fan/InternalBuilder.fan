using f4core
using f4launching
using compiler
using concurrent

using [java]org.eclipse.debug.core::DebugPlugin
using [java]org.eclipse.debug.core::ILaunchConfigurationWorkingCopy
using [java]org.eclipse.debug.core::ILaunchManager
using [java]org.eclipse.dltk.launching::ScriptRuntime
using [java]org.eclipse.dltk.launching::AbstractScriptLaunchConfigurationDelegate
using [java]org.eclipse.jdt.launching::IJavaLaunchConfigurationConstants as JavaConsts
using [java]org.eclipse.jdt.launching::IRuntimeClasspathEntry
using [java]org.eclipse.jdt.core::JavaCore
using [java]org.eclipse.jdt.core::IJavaProject
using [java]org.eclipse.jdt.launching::JavaRuntime
using "[java]org.eclipse.core.externaltools.internal"::IExternalToolConstants as ExtConsts

using [java]com.xored.fanide.core::FanCore
using [java]org.eclipse.core.runtime::IPath
using [java]org.eclipse.core.runtime::Path
using [java]org.eclipse.core.runtime::NullProgressMonitor
using [java]org.eclipse.core.resources::ResourcesPlugin
using [java]org.eclipse.core.resources::IResource
using [java]java.io::File as JFile
using [java]java.util::HashMap as JHashMap

using [java]com.xored.fanide.core::JStubGenerator

**
** This builder uses embedded compiler via API
** 
class InternalBuilder : Builder {
	new make(FantomProject fp) : super(fp) {}
	
	static const Str pluginId := "com.xored.f4.builder"
	
	override CompilerErr[] buildPod(|Str|? consumer) {
		// Prepare temporary output directory for pod building
		statePath	:= FanCore.getDefault.getStateLocation
		projectPath	:= statePath.append("compiler").append(fp.podName)
		root		:= projectPath.toFile
		root.mkdirs
		root.listFiles.each |JFile? f|{ f?.delete}
		
		resolvedPods := fp.resolvePods
		
		bldLoc := Loc(fp.baseDir + `build.fan`)
		if (fp.resolveErrs.size > 0) {
			return fp.resolveErrs.map { CompilerErr(it.toStr, bldLoc) }
		}
		
        logger	:= ConsoleLogger(consumer)
		input	:= CompilerInput.make
		try {
			logBuf	:= StrBuf().add("\n")
			meta	:= fp.meta.dup 
			meta["pod.docApi"]			= fp.docApi.toStr
			meta["pod.docSrc"]			= fp.docSrc.toStr
			meta["pod.native.java"]		= (!fp.javaDirs.isEmpty).toStr
			meta["pod.native.dotnet"]	= false.toStr
			meta["pod.native.js"]		= (!fp.jsDirs.isEmpty).toStr

            input.log            	= CompilerLog(logBuf.out)
			input.podName			= fp.podName
			input.version			= fp.version
			input.ns				= F4Namespace(resolvedPods, fp.classpath, fp.javaProject)
			input.depends			= fp.rawDepends.dup
			input.includeDoc		= true
			input.summary			= fp.summary
			input.mode				= CompilerInputMode.file
			input.baseDir			= fp.baseDir
			input.srcFiles			= fp.srcDirs
			input.resFiles			= fp.resDirs
			input.outDir			= File.os(projectPath.toOSString) 
			input.output			= CompilerOutputMode.podFile
			input.jsFiles			= fp.jsDirs
			input.meta				= meta
			input.index				= fp.index
			input.includeDoc		= fp.docApi
			input.includeSrc		= fp.docSrc

			errs := compile(input)
            consumer?.call(logBuf.toStr)
			if (!errs[0].isEmpty)
				// ensure dumb compiler errs like 'Cannot resolve depend: pod 'afBedSheet' not found' are mapped to build.fan
				return errs.flatten.map |CompilerErr err -> CompilerErr| {
					consumer?.call("[ERR  ] ${err.msg}")
					return err.file == "CompilerInput" ? CompilerErr(err.msg, bldLoc) : err
				}

			if (!fp.javaDirs.isEmpty)
				errs.add(compileJava(consumer, projectPath, resolvedPods))
			
			// Compare pod file in output directory to podFile in project and overwrite it if they are different
			podFileName	:= `${fp.podName}.pod` 
			newPodFile	:= input.outDir + podFileName
			podFile		:= fp.outDir + podFileName

			if (newPodFile.exists) {
				if (isPodChanged(newPodFile, podFile)) {
					newPodFile.copyTo(podFile, ["overwrite" : true])
					jp := JavaCore.create(fp.project)
					jp.getJavaModel.refreshExternalArchives([jp], null)
					fp.project.refreshLocal(IResource.DEPTH_INFINITE, NullProgressMonitor())
				}

				// sometimes we re-build just to re-publish, so don't bother checking for pod changes
				if (fp.prefs.publishPod) {
					consumer?.call("[DEBUG] Publishing ${newPodFile.name}...")
					fp.compileEnv.publishPod(newPodFile)
				}
				
				newPodFile.delete
			}
			
			return errs.flatten
			
		} catch (Err err) {
			logger.err("Could not compile ${fp.podName}", err)
			throw err

		} finally {
			(input.ns as F4Namespace)?.close
		}
	}
	
	private Zip? safeZipOpen(File file) {
		try 	return Zip.open(file)
		catch	return null
	}
	
	private Bool isPodChanged(File newPod, File oldPod) {
		if (!oldPod.exists) 
			return true
		
		newPodZip := safeZipOpen(newPod)
		oldPodZip := safeZipOpen(oldPod)
		
		try {
			if (newPodZip == null) {
				LogUtil.logErr(pluginId, "$newPod is not valid zip archive", null)
				return false
			}

			if (oldPodZip == null) return true
			
			newContent := newPodZip.contents
			oldContent := oldPodZip.contents
			
			if(newPodZip.contents != oldPodZip.contents) return true
			
			return podContentChanged(newPodZip, oldPodZip)
			
		} finally {
			newPodZip?.close
			oldPodZip?.close
		}
			
		return true
	}
	
	private Bool podContentChanged(Zip newPod, Zip oldPod) {
		newContents := newPod.contents
		oldContents := oldPod.contents
		
		comparators := [
			`/meta.props` : | File f1, File f2 -> Bool | { metaChanged(f1, f2) } 
		]
		
		def := | File f1, File f2 -> Bool | { binaryChanged(f1, f2) }
		
		return newPod.contents.any |newFile, uri| { 
			(comparators[uri] ?: def)(newFile, oldContents[uri])	
		}
	}
	
	private Bool metaChanged(File newFile, File oldFile) {
		Str:Str newProps := newFile.readProps.exclude |v, k| { k.startsWith("build.") }
		Str:Str oldProps := oldFile.readProps.exclude |v, k| { k.startsWith("build.") }
		return newProps != oldProps
	}
	
	private Bool binaryChanged(File newFile, File oldFile) {
		Buf b1 := newFile.readAllBuf
		Buf b2 := oldFile.readAllBuf
		
		if (b1.size != b2.size) return true
		for (i:=0; i < b1.size; i++)
			if( b1[i] != b2[i]) return true
						
		return false
	}

	private CompilerErr[][] compile(CompilerInput input) {
		caughtErrs	:= CompilerErr[,]
		compiler	:= Compiler(input)
		
		try compiler.compile	
		catch (CompilerErr e) caughtErrs.add(e) 
		catch (IOErr e)       caughtErrs.add(CompilerErr(e.msg, null))
		catch (Err e) {
			LogUtil.logErr(pluginId, "${e.typeof.qname} during build - ${e.msg}", e)
			caughtErrs.add(CompilerErr("${e.typeof.qname} ${e.msg} - see Error Log View for details", null))
		}
		return [caughtErrs.addAll(compiler.errs), compiler.warns]
	}

	private CompilerErr[] compileJava(|Str|? consumer, IPath projectPath, Str:File resolvedPods ) {
		jtemp		:= projectPath.append("temp-java").toFile

		jtemp.mkdirs
		jtempPath	:= jtemp.getAbsolutePath
		podFile		:= File.os(projectPath.append("${fp.podName}.pod").toOSString)
		
		JHashMap jmap := JHashMap()
		resolvedPods.each |File file, Str key| {
			jmap.put(key, file)
		}
		
		JStubGenerator.generateStubs(podFile.osPath, jtemp.getAbsolutePath, jmap)
		jp := JavaCore.create(fp.project)

		wc := createJdkConfig("Javac configutation", "javac", jp)
		IRuntimeClasspathEntry[] entries := JavaRuntime.computeUnresolvedRuntimeClasspath(jp)
		entries = entries.map { JavaRuntime.resolveRuntimeClasspathEntry(it, jp) }.flatten
		classpath := entries.map { getLocation }.add(jtempPath).join(File.pathSep)
		javaFiles := listFiles(fp.javaDirs).join(" ") { "\"${it}\"" }
		wc.setAttribute(ExtConsts.ATTR_TOOL_ARGUMENTS, "-d \"${jtempPath}\" -cp \"${classpath}\" ${javaFiles}")
		launch(wc, consumer)

		wc = createJdkConfig("Jar configuration", "jar", jp)
		wc.setAttribute(ExtConsts.ATTR_TOOL_ARGUMENTS, "uf \"${podFile.osPath}\" -C \"${jtempPath}\" \".\"")
		launch(wc, consumer)
		
		|JFile file|? delFunc := null
		delFunc = |JFile file| {
			if (file.isDirectory) {
				file.listFiles().each(delFunc)
				file.delete
			} else
				file.delete
		}
		jtemp.listFiles().each(delFunc)
		return [,]
	}

	private ILaunchConfigurationWorkingCopy createJdkConfig(Str name,Str exec, IJavaProject jp)	{
		wc := createLaunchConfig(ExtConsts.ID_PROGRAM_BUILDER_LAUNCH_CONFIGURATION_TYPE, name)
		fullExec := JavaRuntime.getVMInstall(jp).getInstallLocation.toStr+(Env.cur.os == "win32" ? "/bin/${exec}.exe" : "/bin/$exec")
		wc.setAttribute(ExtConsts.ATTR_LOCATION, fullExec)
		return wc
	}
	
	private Str[] listFiles(Uri[] uris)	{
		list := Str[,]
		uris.each{
			(fp.baseDir+it).walk {
				if (ext == "java") list.add(osPath)
			}
		}
		return list
	}
	
	private ILaunchConfigurationWorkingCopy createLaunchConfig(Str type, Str name) {
		wc := DebugPlugin.getDefault.getLaunchManager.getLaunchConfigurationType(type).newInstance(null, name)
		wc.setAttribute(ILaunchManager.ATTR_PRIVATE, true)
		return wc
	}
}


const class ConsoleLogger : Log {
    const Unsafe consumer

    new make(|Str|? consumer) : super.make("console", false) {
        this.consumer = Unsafe(consumer)
    }

    override Void log(LogRec rec) {
        ((|Str|?) consumer.val)?.call("[${rec.level.toStr.upper}] ${rec.msg}")
    }
}
