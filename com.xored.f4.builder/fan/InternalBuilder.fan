using f4core::FantomProject
using f4core::LogUtil
using compiler
using concurrent::Actor

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
		compileErrs	:= CompilerErr[,] 

		// make sure it's empty first
		compileDir.create
		compileDir.listFiles.each { it.delete }
		
		resolvedPods := fp.resolvedPods
    
		bldLoc := Loc(fp.buildFile)
		if (fp.resolveErrs.size > 0) {
			return fp.resolveErrs.map { CompilerErr(it.toStr, bldLoc) }
		}

		logger	:= ConsoleLogger(consumer)
		input	:= CompilerInput()
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
			input.jsPropsFiles		= fp.jsProps
			input.outDir			= compileDir
			input.output			= CompilerOutputMode.podFile
			input.meta				= meta
			input.index				= fp.index
			input.includeDoc		= fp.docApi
			input.includeSrc		= fp.docSrc

			// add some backdoors for F4 JS compilation
			if (meta["f4.forceJs"] == "true")
				input.forceJs		= true
			if (meta["f4.jsReflectClosures"] == "true")
				input.jsReflectClosures	= true
			
			moarErrs := compileFan(input)
			compileErrs.addAll(moarErrs)
            consumer?.call(logBuf.toStr)

			if (compileErrs.size > 0)
				// ensure dumb compiler errs like 'Cannot resolve depend: pod 'afBedSheet' not found' are mapped to build.fan
				return compileErrs.map |CompilerErr err -> CompilerErr| {
					consumer?.call("[ERR] ${fp.podName} - ${err.msg}")
					return err.file == "CompilerInput" ? CompilerErr(err.msg, bldLoc) : err
				}

			if (fp.javaDirs.size > 0) {
				javaErrs := compileJava(consumer, compileDir, resolvedPods)
				compileErrs.addAll(javaErrs)
			}

		} catch (Err err) {
			logger.err("Could not compile ${fp.podName}", err)
			LogUtil.logErr(pluginId, "${err.typeof.qname} during build - ${err.msg}", err)
			throw err

		} finally {
			(input.ns as F4Namespace)?.close
		}


		// Compare pod file in output directory to podFile in project and overwrite it if they are different
		oldPodFile	:= fp.podOutFile
		newPodFile	:= compileDir + `${fp.podName}.pod` 

		if (newPodFile.exists) {
			
			// while isPodChanged() is not absolutely needed, I do see more build thrashing without it,
			// especially when building F4 itself. Given F4 needs its pods in the project root dir, 
			// it may be due to Builder (superclass) doing a zero depth refresh
			if (isPodChanged(newPodFile, oldPodFile) == false)
				consumer?.call("[DEBUG] Contents of pod have NOT changed")

			else {
				consumer?.call("[DEBUG] Contents of pod have changed")

				// the old behaviour was thus (see below),
				// but re-freshing (esp after we'd copied over new pod files)
				// caused the entire project to re-build, and it would keep on 
				// rebuilding itself continuously and endlessly. Not ideal!
				// The Builder (superclass) does a zero depth refresh anyway.

//				// refresh Java stuff
//				jp := JavaCore.create(fp.project)
//				jp.getJavaModel.refreshExternalArchives([jp], null)
//
//				// refresh Fantom stuff
//				fp.project.refreshLocal(IResource.DEPTH_INFINITE, NullProgressMonitor())

				try {
					// copy pod to outDir
					// but often (I'm looking at YOU - SkySpark!) the pod is locked and this throws an IoErr
					consumer?.call("[DEBUG] Copying pod to: ${oldPodFile.osPath}")

					// turns out that file locking is a REAL problem on Windows and happens ALL the time
					// a comment in this stackoverflow post suggests avoiding Java NIO - which Fantom.copyTo() now uses
					// https://stackoverflow.com/questions/4179145/release-java-file-lock-in-windows
					// https://github.com/fantom-lang/fantom/commit/5ad35635544534e697ae5329cda76bcb85272633
					out :=  oldPodFile.out
					try		newPodFile.in.pipe(out)
					finally	out.close

					// or... herein enter file locking problems on Windows!
//					newPodFile.copyTo(oldPodFile, ["overwrite" : true])

				} catch (Err err) {
					consumer?.call("[ERR] ${oldPodFile.name} is locked by another process")

					// let's not cause a modal pop-up - but fail quietly in the background with a reported err
					msg := "${oldPodFile.name} is locked by another process."
					msg += "\nPlease end all programs using the .pod file and re-build the project."
					msg += "\n${oldPodFile.osPath}"
					msg += "\n"
					msg += "\n" + err.msg
						.replace("java.nio.file.FileSystemException: ", "java.nio.file.FileSystemException:\n  ")
						.replace(".pod: The process", ".pod\n  The process")
					com := CompilerErr.make(msg, Loc.makeFile(fp.buildFile), err, LogLevel.err)
					compileErrs.add(com)
				}
			}

			// sometimes we re-build just to re-publish, so don't bother checking for pod changes
			if (fp.prefs.publishPod) {
				consumer?.call("[DEBUG] Publishing ${newPodFile.name}...")
				fp.compileEnv.publishPod(newPodFile)
			}
		}
		
		// we often cannot delete the .pod file if we've been generating Java stubs (get an IOErr)
		// so don't! Delete it when we build again - it all seems fine then.
//		compileDir.delete
		return compileErrs
	}
	
	private CompilerErr[] compileFan(CompilerInput input) {
		caughtErrs	:= CompilerErr[,]
		compiler	:= Compiler(input)
		
		try compiler.compile
		catch (CompilerErr e) caughtErrs.add(e) 
		catch (IOErr e)       caughtErrs.add(CompilerErr(e.msg, null))
		catch (Err e) {
			LogUtil.logErr(pluginId, "${e.typeof.qname} during build - ${e.msg}", e)
			caughtErrs.add(CompilerErr("${e.typeof.qname} ${e.msg} - see Error Log View for details", Loc("CompilerInput")))
		}
		return caughtErrs.addAll(compiler.errs).addAll(compiler.warns)
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
		JStubGenerator.generateStubs(fp.podName, newPodFile.osPath, jtemp.osPath, jmap)

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
