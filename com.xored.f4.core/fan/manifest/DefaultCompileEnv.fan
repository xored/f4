
const class DefaultCompileEnv : CompileEnv {
	override const Str		label		:= "None"
	override const Str		description	:= "Use pods from Fantom Interpreter installation"
	override const Uri?		envPodUrl	:= `platform:/plugin/com.xored.f4.launchEnv/f4launchEnv.pod`
	
	// pod files may change if the user updates the Fantom lib/fan/ dir
	// no real need for this, as CompileEnv are quick cached themselves
	private const QuickCash	podFilesRef := QuickCash(3sec)

	new make(FantomProject? fanProj := null) : super.make(fanProj) { }
	
	override Str:File resolvePods() {
		// this gets the 'Interpreter System Libraries' as defined in the 'Edit Interpreter' dialog.
		// you can only add dirs to this (which isn't much help) and it's not very dynamic
		// so we may as well just stick to the Fantom way of doing things
//		podLocs	 := ScriptRuntime.getLibraryLocations(fanProj.interpreterInstall) as LibraryLocation[]
//		podFiles := podLocs.map { PathUtil.resolveLocalPath(it.getLibraryPath()) }
	
		podFilesRef.get |->Obj?| {
			podFiles := Str:File[:]
			workDir	 := (fanProj.fanHomeDir + `lib/fan/`).normalize
			workDir.listFiles(Regex.glob("*.pod")).each |podFile| {
				podFiles[podFile.basename] = podFile		
			}
		
			buildConsole.debug("DefaultEnv - Resolved ${podFiles.size} pods for ${fanProj.podName} from: ${workDir.osPath}")
			return podFiles.toImmutable
		}
	}
	
	override Void tweakLaunchEnv(Str:Str envVars) {
		envVars.remove("FAN_ENV_PARENT")

		fanEnv := envVars["FAN_ENV"]
		if (fanEnv != null && fanEnv != "f4launchEnv::F4LaunchEnv")
			envVars["FAN_ENV_PARENT"] = fanEnv

		envVars["FAN_ENV"] = "f4launchEnv::F4LaunchEnv"
	}
	
	override Void publishPod(File podFile) {
		dstDir := null as File
		
		if (fanProj.publishDir != null) {
			dstDir = (fanProj.projectDir + fanProj.publishDir).normalize
			
		} else {
			if (fanProj.interpreterInstall?.getName?.endsWith("embedded") ?: false)
				// I could, but it seems wrong to pollute a system runtime
				// if the user knew what they were doing, they'd have their own Runtime / work dir
				buildConsole.warn("DefaultEnv - Will not copy ${podFile.name} to an embedded Fantom Runtime - create a Work Dir instead")
			else
				dstDir = (fanProj.fanHomeDir + `lib/fan/`).normalize
		}
		if( dstDir != null) {
			buildConsole.debug("DefaultEnv - Copying ${podFile.name} to ${dstDir.osPath}")
			podFile.copyInto(dstDir, ["overwrite" : true])
		}
	}
}
