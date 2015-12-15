using f4core
using f4launching
using compiler
using concurrent

using [java]org.eclipse.debug.core.model::IProcess
using [java]org.eclipse.dltk.launching::ScriptRuntime
using [java]org.eclipse.debug.core::ILaunchManager
using [java]org.eclipse.core.runtime::NullProgressMonitor
using [java]org.eclipse.core.resources::IResource
using [java]org.eclipse.jdt.core::JavaCore

class ExternalBuilder : Builder {
	private static const Regex loc		:= Regex<|(\((\d+)(,(\d+))?\))|> 
	private static const Regex javaLoc	:= Regex<|:(\d+):|>

	new make(FantomProject fp) : super(fp) {}
	
	override CompilerErr[] buildPod(|Str|? consumer) {
		wc := TargetLaunchUtil.createFanLaunchConfig
		wc.setAttribute(LaunchConsts.skipAutosave, true)
		wc.setAttribute(LaunchConsts.skipErrs, true)
		wc.setAttribute(LaunchConsts.fanClass, Manifest.filename)
		wc.setAttribute(LaunchConsts.fanProject, fp.project.getName)
		wc.setAttribute(LaunchConsts.useClassOnly, true)
		wc.setAttribute(LaunchConsts.consoleEncoding, "UTF-8")
		install := ScriptRuntime.computeInterpreterInstall(wc)
		if (!install.getInstallLocation.exists)
			return interpreterErrs
		out := launch(wc, consumer)
		
		podFileName	:= `${fp.podName}.pod` 
		newPodFile	:= fp.baseDir + podFileName
		podFile		:= fp.outDir + podFileName

		if (newPodFile.exists) {
			newPodFile.copyTo(podFile, ["overwrite" : true])
			newPodFile.delete
			jp := JavaCore.create(fp.project)
			jp.getJavaModel.refreshExternalArchives([jp], null)
			fp.project.refreshLocal(IResource.DEPTH_INFINITE, NullProgressMonitor())
		}

		return parseErrors(out.toStr)
	}
	
	private CompilerErr[] parseErrors(Str out) {
		return out.splitLines.map { errFromLine(it) }.exclude { it == null }
	}
	
	private CompilerErr? errFromLine(Str line) {
		if (line.startsWith("ERR: ")) {
			if (line.contains("CompileJava")) return null;
			line = line["ERR: ".size..-1]
			return CompilerErr.make(line, null, null, LogLevel.err)
		}

		// assume that err/warn line always starts with base directory
		if (!line.startsWith(fp.baseDir.osPath))
			return null

		m := loc.matcher(line)
		if (m.find) {
			file	:= line[0..<m.start]
			lineNo	:= m.group(2).toInt
			col		:= m.group(4).isEmpty ? null : m.group(4).toInt
			msg		:= line[m.end+1..-1].trim
			isWarn	:= msg.startsWith("WARN")
			if (isWarn) msg = msg["WARN".size..-1]
			return CompilerErr.make(msg, Loc.make(file, lineNo, col), null, isWarn ? LogLevel.warn : LogLevel.err)
		}

		m = javaLoc.matcher(line);
		if (m.find) {
			file	:= line[0..<m.start]
			lineNo	:= m.group(1).toInt
			msg		:= line[m.end+1..-1].trim
			isWarn	:= msg.startsWith("WARN")
			if (isWarn) msg = msg["WARN".size..-1]
			return CompilerErr.make(msg, Loc.make(file, lineNo), null, isWarn ? LogLevel.warn : LogLevel.err)
		}

		return null
	}
}
