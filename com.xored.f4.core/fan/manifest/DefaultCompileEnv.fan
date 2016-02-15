using [java] org.eclipse.dltk.launching::LibraryLocation
using [java] org.eclipse.dltk.launching::ScriptRuntime

const class DefaultCompileEnv : CompileEnv {
	override const Str label		:= "None"
	override const Str description	:= "Use pods from Fantom Interpreter installation"
	override const Uri? envPodUrl	:= `platform:/plugin/com.xored.f4.podEnv/f4podEnv.pod`

	const FantomProject? fanProj
	
	new make() { }
	
	new makeWithProj(FantomProject fantomProject) {
		this.fanProj = fantomProject
	}
	
	override Str:File resolvePods() {
		// this gets the 'Interpreter System Libraries' as defined in the 'Edit Interpreter' dialog.
		// you can only add dirs to this (which isn't much help) and it's not very dynamic
		// so we may as well just stick to the Fantom way of doing things
//		podLocs	 := ScriptRuntime.getLibraryLocations(fanProj.interpreterInstall) as LibraryLocation[]
//		podFiles := podLocs.map { PathUtil.resolveLocalPath(it.getLibraryPath()) }
	
		podFiles := Str:File[:]
		(fanProj.fanHomeDir + `lib/fan/`).listFiles(Regex.glob("*.pod")).each |podFile| {
			podFiles[podFile.basename] = podFile		
		}

		// prevent errs such as "Project cannot reference itself: poo"
		podFiles.remove(fanProj.podName)

		return podFiles
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
			logWarn("com.xored.fanide.core", "Will not copy ${podFile.name} to an embedded Fantom Runtime - create a Work Dir instead")
		else
			podFile.copyInto(fanProj.fanHomeDir + `lib/fan/`, ["overwrite" : true])
	}
}
