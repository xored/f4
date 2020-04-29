using f4core::FantomProject
using f4core::FantomProjectManager2
using f4core::LogUtil
using compiler

using [java]org.eclipse.debug.core::DebugPlugin
using [java]org.eclipse.debug.core::ILaunchConfigurationWorkingCopy
using [java]org.eclipse.debug.core::ILaunchManager
using [java]org.eclipse.jdt.launching::IRuntimeClasspathEntry
using [java]org.eclipse.jdt.core::JavaCore
using [java]org.eclipse.jdt.core::IJavaProject
using [java]org.eclipse.jdt.launching::JavaRuntime
using "[java]org.eclipse.core.externaltools.internal"::IExternalToolConstants as ExtConsts

using [java]com.xored.fanide.core::FanCore
using [java]org.eclipse.core.runtime::NullProgressMonitor
using [java]org.eclipse.core.resources::IResource
using [java]java.util::HashMap as JHashMap

using [java]com.xored.fanide.core::JStubGenerator

**
** This builder uses embedded compiler via API
** 
class InternalBuilder : Builder {
	new make(FantomProject fp) : super(fp) {}
	
	static const Str pluginId := "com.xored.f4.builder"
	
	override CompilerErr[] buildPod(|Str|? consumer) {
		// compile pods in a temporary workdir: /.metadata/.plugins/com.xored.fanide.core/compiler/<podName>/
		// if we build them in a dir that we have control over, there shouldn't be any file locking / permission errors
		pluginState	:= FanCore.getDefault.getStateLocation
		pluginDir	:= File.os(pluginState.toOSString).normalize
		compileDir	:= pluginDir + `compiler/${fp.podName}/`

		// make sure it's empty first
		compileDir.create
		compileDir.listFiles.each { it.delete }
		
`/f4log.txt`.toFile.out(true).writeChars("$fp.podName BUILDING\n").close
		resolvedPods := fp.resolvedPods
    
		bldLoc := Loc(fp.buildFile)
		if (fp.resolveErrs.size > 0) {
			return fp.resolveErrs.map { CompilerErr(it.toStr, bldLoc) }
		}
		
		// Blindly add all workspace pods - seems to be the only way to get F4 to compile itself (...!?)
		// Without this, we get compilation errors similar to "pod not found: f4parser".
		// These aren't actual dependencies and don't seem to be transitive dependencies.
		// Note that adding them as actual project dependencies also solves the issue,
		// But because I don't know why, I'm loath to do so - hence these 3 little lines.

		// SlimerDude - Apr 2020 - Beta feature to turn this off 
		if (fp.prefs.referencedPodsOnly == false)
			FantomProjectManager2.instance.allProjects.each |p| {
				resolvedPods[p.podName] = p.podOutFile
			}

		logger	:= ConsoleLogger(consumer)
		input	:= CompilerInput.make
		try {
			logBuf	:= StrBuf().add("\n")
			meta	:= fp.meta.dup 
			meta["pod.docApi"]		= fp.docApi.toStr
			meta["pod.docSrc"]		= fp.docSrc.toStr

            input.log            	= CompilerLog(logBuf.out)
			input.podName			= fp.podName
			input.version			= fp.version
			input.summary			= fp.summary
			input.ns				= F4Namespace(resolvedPods, fp.classpath, fp.javaProject)
			input.depends			= fp.rawDepends.dup
			input.mode				= CompilerInputMode.file
			input.baseDir			= fp.projectDir
			input.srcFiles			= fp.srcDirs
			input.resFiles			= fp.resDirs
			input.jsFiles			= fp.jsDirs
			input.outDir			= compileDir
			input.output			= CompilerOutputMode.podFile
			input.meta				= meta
			input.index				= fp.index
			input.includeDoc		= fp.docApi
			input.includeSrc		= fp.docSrc

			errs := compile(input)
            consumer?.call(logBuf.toStr)

			if (errs[0].size > 0)
				// ensure dumb compiler errs like 'Cannot resolve depend: pod 'afBedSheet' not found' are mapped to build.fan
				return errs.flatten.map |CompilerErr err -> CompilerErr| {
					consumer?.call("[ERR] ${fp.podName} - ${err.msg}")
					return err.file == "CompilerInput" ? CompilerErr(err.msg, bldLoc) : err
				}

			// Compare pod file in output directory to podFile in project and overwrite it if they are different
			oldPodFile	:= fp.podOutFile
			newPodFile	:= compileDir + `${fp.podName}.pod` 

			if (!fp.javaDirs.isEmpty)
				errs.add(compileJava(consumer, compileDir, resolvedPods))

			if (newPodFile.exists) {
				
				// while isPodChanged() is not absolutely needed, I do see more build thrashing without it,
				// especially when building F4 itself. Given F4 needs it's pods in the project root dir, it may
				// due to Builder (superclass) doing a zero depth refresh
				if (isPodChanged(newPodFile, oldPodFile)) {
					
					// the old behaviour was thus (see below),
					// but re-freshing (esp after we'd copied over new pod files)
					// caused the entire project to re-build, and it would keep on 
					// rebuilding itself continuously and endlessly. Not ideal!
					// The Builder (superclass) does a zero depth refresh anyway.

//					// refresh Java stuff
//					jp := JavaCore.create(fp.project)
//					jp.getJavaModel.refreshExternalArchives([jp], null)
//
//					// refresh Fantom stuff
//					fp.project.refreshLocal(IResource.DEPTH_INFINITE, NullProgressMonitor())

					// copy pod to outDir
					consumer?.call("[DEBUG] Copying pod to ${oldPodFile.osPath}")
					newPodFile.copyTo(oldPodFile, ["overwrite" : true])
				}

				// sometimes we re-build just to re-publish, so don't bother checking for pod changes
				if (fp.prefs.publishPod) {
					consumer?.call("[DEBUG] Publishing ${newPodFile.name}...")
					fp.compileEnv.publishPod(newPodFile)
				}
			}
			
			// we often cannot delete the .pod file if we've been generating Java stubs (get an IOErr)
			// so don't! Delete it when we build again - it all seems fine then.
//			compileDir.delete
			return errs.flatten
			
		} catch (Err err) {
			logger.err("Could not compile ${fp.podName}", err)
			LogUtil.logErr(pluginId, "${err.typeof.qname} during build - ${err.msg}", err)
			throw err

		} finally {
			(input.ns as F4Namespace)?.close
		}
	}

	private CompilerErr[][] compile(CompilerInput input) {
		caughtErrs	:= CompilerErr[,]
		compiler	:= Compiler(input)
		
		try compiler.compile
		catch (CompilerErr e) caughtErrs.add(e) 
		catch (IOErr e)       caughtErrs.add(CompilerErr(e.msg, null))
		catch (Err e) {
			LogUtil.logErr(pluginId, "${e.typeof.qname} during build - ${e.msg}", e)
			caughtErrs.add(CompilerErr("${e.typeof.qname} ${e.msg} - see Error Log View for details", Loc("CompilerInput")))
		}
		return [caughtErrs.addAll(compiler.errs), compiler.warns]
	}

	private CompilerErr[] compileJava(|Str|? consumer, File compileDir, Str:File resolvedPods) {
		jtemp		:= compileDir + `temp-java/`
		podFile		:= compileDir + `${fp.podName}.pod`
		jtemp.create
		
		jmap := JHashMap()
		resolvedPods.each |File file, Str key| {
			jmap.put(key, file)
		}
		
		// stub generation often "locks" the pod file so it cannot be updated or deleted
		// this happens more often when working from flash drives
		// reading from a different .pod file at least lets us update the original (with the jstubs)
		newPodFile	:= compileDir + `jstub/${fp.podName}.pod`
		podFile.copyTo(newPodFile, ["overwrite":true])
		JStubGenerator.generateStubs(newPodFile.osPath, jtemp.osPath, jmap)

		classpath := fp.classpath.join(File.pathSep) { it.osPath }
		javaFiles := listFiles(fp.javaDirs).join(" ") { "\"${it}\"" }
		jp := JavaCore.create(fp.project)
		wc := createJdkConfig("Javac configuration", "javac", jp)
		wc.setAttribute(ExtConsts.ATTR_TOOL_ARGUMENTS, "-d \"${jtemp.osPath}\" -cp \"${classpath}\" ${javaFiles}")
		launch(wc, consumer)

		wc = createJdkConfig("Jar configuration", "jar", jp)
		wc.setAttribute(ExtConsts.ATTR_TOOL_ARGUMENTS, "uf \"${podFile.osPath}\" -C \"${jtemp.osPath}\" \".\"")
		launch(wc, consumer)

		return CompilerErr#.emptyList
	}

	private ILaunchConfigurationWorkingCopy createJdkConfig(Str name, Str exec, IJavaProject jp)	{
		wc := createLaunchConfig(ExtConsts.ID_PROGRAM_BUILDER_LAUNCH_CONFIGURATION_TYPE, name)
		fullExec := JavaRuntime.getVMInstall(jp).getInstallLocation.toStr + (Env.cur.os == "win32" ? "/bin/${exec}.exe" : "/bin/$exec")
		wc.setAttribute(ExtConsts.ATTR_LOCATION, fullExec)
		return wc
	}
	
	private Str[] listFiles(Uri[] uris)	{
		list := Str[,]
		uris.each{
			(fp.projectDir + it).walk {
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
	
	// ----

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
			
			return podContentChanged(newContent, oldContent)
			
		} finally {
			newPodZip?.close
			oldPodZip?.close
		}
	}

	private Zip? safeZipOpen(File file) {
		try 	return Zip.open(file)
		catch	return null
	}

	private Bool podContentChanged(Uri:File newContents, Uri:File oldContents) {
		if (newContents.keys.rw.sort != oldContents.keys.rw.sort)
			return true

		return newContents.any |newFile, uri| {
			if (uri == `/meta.props`)
				return metaChanged(newFile, oldContents[uri])

			if (uri.ext == "js")
				return jsChanged(newFile, oldContents[uri])

			return binaryChanged(newFile, oldContents[uri])
		}
	}
	
	private Bool metaChanged(File newFile, File oldFile) {
		// just because the build timestamp changed, doesn't mean the pod has new content!
		newProps := newFile.readProps.exclude |v, k| { k.startsWith("build.") }
		oldProps := oldFile.readProps.exclude |v, k| { k.startsWith("build.") }
		return newProps != oldProps
	}

	private Bool jsChanged(File newFile, File oldFile) {
		// just because the build timestamp changed, doesn't mean the pod has new content!
		newJs := newFile.readAllLines.exclude { it.startsWith("  m_meta.set(\"build.") }
		oldJs := oldFile.readAllLines.exclude { it.startsWith("  m_meta.set(\"build.") }

		if (newJs.size != oldJs.size) return true
		for (i:=0; i < newJs.size; i++)
			if (newJs[i] != oldJs[i]) return true
		return false
	}
	
	private Bool binaryChanged(File newFile, File oldFile) {
		b1 := newFile.readAllBuf
		b2 := oldFile.readAllBuf
		
		if (b1.size != b2.size) return true
		for (i:=0; i < b1.size; i++)
			if (b1[i] != b2[i]) return true
		return false
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
