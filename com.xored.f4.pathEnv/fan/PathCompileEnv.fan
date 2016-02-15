using f4core
using [java] org.eclipse.dltk.launching::IInterpreterInstall

const class PathCompileEnv : CompileEnv {

	override const Str label		:= "util::PathEnv"
	override const Str description	:= "Use pods from work directories"
	override const Uri? envPodUrl	:= `platform:/plugin/com.xored.f4.podEnv/f4podEnv.pod`

	const FantomProject? fanProj
	
	new make() { }
	
	new makeWithProj(FantomProject fantomProject) {
		this.fanProj = fantomProject
	}

	override Str:File resolvePods() {		
		podFiles	:= Str:File[:]
		workDirs.eachr |workDir| {
			(workDir + `lib/fan/`).listFiles(Regex.glob("*.pod")).each |podFile| {
				podFiles[podFile.basename] = podFile		
			}
		}	

		// prevent errs such as "Project cannot reference itself: poo"
		podFiles.remove(fanProj.podName)

		return podFiles
	}
	
	override Void tweakLaunchEnv(Str:Str envVars) {
		envVars["FAN_ENV"]			= "f4podEnv::F4PodEnv"
		envVars["FAN_ENV_PARENT"]	= "util::PathEnv"
	}

	override Void publishPod(File podFile) {
		if (workDirs.first == fanProj.fanHomeDir && (fanProj.interpreterInstall?.getName?.endsWith("embedded") ?: false))
			// I could, but it seems wrong to pollute a system runtime
			// if the user knew what they were doing, they'd have their own Runtime / work dir
			logWarn("com.xored.fanide.core", "Will not copy ${podFile.name} to an embedded Fantom Runtime - create a Work Dir instead")
		else
			podFile.copyInto(workDirs.first + `lib/fan/`, ["overwrite" : true])
	}
	
	** parsePath() taken from util::PathEnv so we mimic the exact behaviour
	private File[] parsePath(Str path) {
		acc := File[,]
		try {
			path.split(File.pathSep[0]).each |item| {
				if (item.isEmpty)	return
				dir := File.os(item).normalize
				if (!dir.exists)	dir = File(item.toUri.plusSlash, false).normalize
				if (!dir.exists)	return logWarn(PathEnvPlugin.id, "Dir not found: $dir")
				if (!dir.isDir)		return logWarn(PathEnvPlugin.id, "Not a dir: $dir")
				acc.add(dir)
			}
		}
		catch (Err e) logErr(PathEnvPlugin.id, "Cannot parse path: $path", e)
		return acc
	}
	
	private File[] workDirs() {
		pathPrefs	:= PathEnvPrefs(fanProj)
		workPath	:= pathPrefs.useEnvVar ? Env.cur.vars["FAN_ENV_PATH"] : pathPrefs.fanEnvPath
		workDirs	:= parsePath(workPath).add(fanProj.fanHomeDir)
		return workDirs
	}
}
