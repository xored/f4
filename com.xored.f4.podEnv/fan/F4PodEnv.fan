
** An Env for F4 launched applications.
** 
** All F4 generated pods are passed in via the 'F4PODENV_POD_LOCATIONS' environment variable.
** 
** Any previously set 'FAN_ENV' is passed in via the 'F4PODENV_FAN_ENV' environment variable 
** and becomes the parent 'Env'. This preserves any 'PATH_ENV' that has been set on the system.
const class F4PodEnv : Env {

	static new make() {
		// Env.cur defaults to BootEnv until we create ourselves
		podLocs		:= Env.cur.vars["F4PODENV_POD_LOCATIONS"]?.trimToNull?.split(File.pathSep.chars.first, true) ?: Str#.emptyList
		origFanEnv	:= Env.cur.vars["F4PODENV_FAN_ENV"]?.trimToNull
		curEnv		:= origFanEnv != null ? Type.find(origFanEnv).make : Env.cur
		return makeInternal(podLocs, curEnv)
	}
	
	private const Str:File podLocations
	
	private new makeInternal(Str[] podLocs, Env parent) : super.make(parent) {
		podLocations = Str:File[:] { it.ordered=true }.addList(podLocs.map { File.os(it) }) { it.basename }
		podLocations.vals.each {
			if (!it.exists)
				throw Err("Pod file does not exist - ${it.osPath}")
		}
	}

	override File? findPodFile(Str podName) {
		podLocations[podName] ?: super.findPodFile(podName)
	}
	
	override Str[] findAllPodNames() {
		podLocations.keys.addAll(super.findAllPodNames)
	}
}
