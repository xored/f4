using concurrent::AtomicRef

const class DefaultCompileEnv : CompileEnv {
	override const Str label		:= "None"
	override const Str description	:= "Use pods from Fantom Interpreter installation"
	override const Uri? envPodUrl	:= `platform:/plugin/com.xored.f4.podEnv/f4podEnv.pod`

	const AtomicRef	podFilesRef		:= AtomicRef()

	new make(FantomProject? fanProj := null) : super.make(fanProj) { }
	
	override Str:File resolvePods() {
		// this gets the 'Interpreter System Libraries' as defined in the 'Edit Interpreter' dialog.
		// you can only add dirs to this (which isn't much help) and it's not very dynamic
		// so we may as well just stick to the Fantom way of doing things
//		podLocs	 := ScriptRuntime.getLibraryLocations(fanProj.interpreterInstall) as LibraryLocation[]
//		podFiles := podLocs.map { PathUtil.resolveLocalPath(it.getLibraryPath()) }
	
		if (podFilesRef.val == null) {
			podFiles := Str:File[:]
			workDir	 := (fanProj.fanHomeDir + `lib/fan/`).normalize
			workDir.listFiles(Regex.glob("*.pod")).each |podFile| {
				podFiles[podFile.basename] = podFile		
			}
	
			// prevent errs such as "Project cannot reference itself: poo"
			podFiles.remove(fanProj.podName)
	
			buildConsole.debug("DefaultEnv - Resolved ${podFiles.size} pods for ${fanProj.podName} from: ${workDir.osPath}")
			podFilesRef.val = podFiles.map { it.uri }.toImmutable	// Files aren't immutable, so map to Uris
		}
		return ((Str:Uri) podFilesRef.val).map { it.toFile }
	}
	
	override Void tweakLaunchEnv(Str:Str envVars) {
		envVars.remove("FAN_ENV_PARENT")

		fanEnv := envVars["FAN_ENV"]
		if (fanEnv != null && fanEnv != "f4podEnv::F4PodEnv")
			envVars["FAN_ENV_PARENT"] = fanEnv

		envVars["FAN_ENV"] = "f4podEnv::F4PodEnv"
	}
	
	override Void publishPod(File podFile) {
		if (fanProj.interpreterInstall?.getName?.endsWith("embedded") ?: false)
			// I could, but it seems wrong to pollute a system runtime
			// if the user knew what they were doing, they'd have their own Runtime / work dir
			buildConsole.warn("DefaultEnv - Will not copy ${podFile.name} to an embedded Fantom Runtime - create a Work Dir instead")
		else {
			dstDir := (fanProj.fanHomeDir + `lib/fan/`).normalize
			buildConsole.debug("DefaultEnv - Copying ${podFile.name} to ${dstDir.osPath}")
			podFile.copyInto(dstDir, ["overwrite" : true])
		}
	}
}
