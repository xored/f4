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
		IPath statePath := FanCore.getDefault.getStateLocation
		IPath projectPath := statePath.append("compiler").append(fp.podName)
		JFile root := projectPath.toFile
		root.mkdirs
		root.listFiles.each |JFile? f|{ f?.delete}
		
        logger	:= ConsoleLogger(consumer)
		input	:= CompilerInput.make
		Bool podChanged := false
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
			input.ns				= F4Namespace(getAllPods(fp), fp.classpath, fp.javaProject)
			input.depends			= fp.rawDepends.dup
			input.includeDoc		= true
			input.summary			= fp.summary
			input.mode				= CompilerInputMode.file
			input.baseDir			= fp.baseDir
			input.srcFiles			= fp.srcDirs
			input.resFiles			= fp.resDirs
			input.index				= fp.index
			input.outDir			= File.os(projectPath.toOSString) 
			input.output			= CompilerOutputMode.podFile
			input.jsFiles			= fp.jsDirs
			input.meta				= meta

			errs := compile(input)
            consumer?.call(logBuf.toStr)
			if (!errs[0].isEmpty) return errs.flatten
			
			if (!fp.javaDirs.isEmpty) errs.add(compileJava(consumer, projectPath))
			
			// Compare pod file in output directory to podFile in project and overwrite it if they are different
			podFileName	:= `${fp.podName}.pod` 
			newPodFile	:= input.outDir + podFileName
			podFile		:= fp.outDir + podFileName

			if(newPodFile.exists && isPodChanged(newPodFile, podFile)) {
				newPodFile.copyTo(podFile, ["overwrite" : true])
				jp := JavaCore.create(fp.project)
				jp.getJavaModel.refreshExternalArchives([jp], null)
				fp.project.refreshLocal(IResource.DEPTH_INFINITE, NullProgressMonitor())
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
		catch (Err e) {
			LogUtil.logErr(pluginId, "Internal error during build", e)
			caughtErrs.add(CompilerErr("Internal compiler error, please check Error Log view", null))
		}
		return [caughtErrs.addAll(compiler.errs), compiler.warns]
	}

	private CompilerErr[] compileJava(|Str|? consumer, IPath projectPath ) {
		jtemp		:= projectPath.append("temp-java").toFile

		jtemp.mkdirs
		jtempPath	:= jtemp.getAbsolutePath
		podFile		:= File.os(projectPath.append("${fp.podName}.pod").toOSString)
//		wc := createLaunchConfig(JavaConsts.ID_JAVA_APPLICATION, "Jstub configuration")
//		wc.setAttribute(JavaConsts.ATTR_MAIN_TYPE_NAME, "fanx.tools.Jstub")
//		fanHome := PathUtil.fanHome(fp.getInterpreterInstall.getInstallLocation.getPath).toFile.osPath
//		wc.setAttribute(JavaConsts.ATTR_VM_ARGUMENTS, "-Dfan.home=\"$fanHome\"")
//		wc.setAttribute(JavaConsts.ATTR_PROGRAM_ARGUMENTS, "-nozip -d $jtempPath $fp.podName")
//		wc.setAttribute(JavaConsts.ATTR_PROJECT_NAME, fp.project.getName)
//		launch(wc, consumer)
		
		JHashMap jmap := JHashMap()
		fp.getAllPods.each |File file, Str key| {
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

