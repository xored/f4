using f4core

const class PathCompileEnv : CompileEnv {
	override const Str label		:= "util::PathEnv"
	override const Str description	:= "Use pods from work directories"
	override const Uri? envPodUrl	:= `platform:/plugin/com.xored.f4.launchEnv/f4launchEnv.pod`

	// pod files may change if the user updates the /lib/fan/ dirs
	// no real need for this, as CompileEnv are quick cached themselves
	private const QuickCash	podFilesRef := QuickCash(3sec)

	new make(FantomProject? fanProj := null) : super.make(fanProj) { }

	override Str:File resolvePods() {
		podFilesRef.get |->Obj?| {
			podFiles	:= Str:File[:]
			workDirs	:= workDirs
			workDirs.eachr |workDir| {
				(workDir + `lib/fan/`).listFiles(Regex.glob("*.pod")).each |podFile| {
					podFiles[podFile.basename] = podFile		
				}
			}	

			buildConsole.debug("PathEnv - Resolved ${podFiles.size} pods for ${fanProj.podName} from: " + workDirs.join(File.pathSep) { it.osPath })
			return podFiles.toImmutable
		}
	}
	
	override Void tweakLaunchEnv(Str:Str envVars) {
		envVars["FAN_ENV"]			= "f4launchEnv::F4LaunchEnv"
		envVars["FAN_ENV_PARENT"]	= "util::PathEnv"
	}

	override Void publishPod(File podFile) {
		if (workDirs.first == fanProj.fanHomeDir && (fanProj.interpreterInstall?.getName?.endsWith("embedded") ?: false)) {
			// I could, but it seems wrong to pollute a system runtime
			// if the user knew what they were doing, they'd have their own Runtime / work dir
			buildConsole.warn("PathEnv - Will not copy ${podFile.name} to an embedded Fantom Runtime - create a Work Dir instead")
			return
		}

		dstDir := (workDirs.first + `lib/fan/`).normalize			
		buildConsole.debug("PathEnv - Copying ${podFile.name} to ${dstDir.osPath}")
		podFile.copyInto(dstDir, ["overwrite" : true])
	}
	
	private File[] workDirs() {
		pathPrefs	:= PathEnvPrefs(fanProj)
		workPath	:= (pathPrefs.useEnvVar ? Env.cur.vars["FAN_ENV_PATH"] : pathPrefs.fanEnvPath) ?: ""
		workDirs	:= parsePath(workPath).add(fanProj.fanHomeDir)
		return workDirs
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
}
