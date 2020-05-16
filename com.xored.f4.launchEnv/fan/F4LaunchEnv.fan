
** An Env for F4 launched applications.
** 
** All F4 generated pods are passed in via the 'FAN_ENV_PODS' environment variable.
** 
** Any previously set 'FAN_ENV' is passed in via the 'FAN_ENV_PARENT' environment variable 
** and becomes the parent 'Env'. This preserves any 'PATH_ENV' that has been set on the system.
const class F4LaunchEnv : Env {

	static new make() {
		// Env.cur defaults to BootEnv until we create ourselves
		podLocs		:= Env.cur.vars["FAN_ENV_PODS"]?.trim?.split(File.pathSep.chars.first, true)?.exclude { it.trimToNull == null }
		if (podLocs != null && podLocs.size == 0)
			podLocs = null
		
		origFanEnv	:= Env.cur.vars["FAN_ENV_PARENT"]?.trim
		if (origFanEnv != null && origFanEnv.size == 0)
			origFanEnv = null

		// a handy get out of jail card 'cos eclipse *forces* you to provide a value for environment variables
		if (origFanEnv != null && origFanEnv.equalsIgnoreCase("null"))
			origFanEnv = null

		curEnv		:= origFanEnv != null ? Type.find(origFanEnv).make : Env.cur
		return makeInternal(podLocs, curEnv)
	}
	
	private const Str:File podLocations
	
	private new makeInternal(Str[]? podLocs, Env parent) : super.make(parent) {
		podLocations := Str:File[:] { it.ordered=true }
		if (podLocs != null) {
			podLocations.addList(podLocs.map { File.os(it).normalize }) { it.basename }
			podLocations.vals.each {
				if (!it.exists)
					throw Err("Pod file does not exist - ${it.osPath}")
			}
		}
		this.podLocations = podLocations
	}

	override File? findPodFile(Str podName) {
		podLocations[podName] ?: super.findPodFile(podName)
	}
	
	override Str[] findAllPodNames() {
		podLocations.keys.addAll(super.findAllPodNames).unique
	}
}
