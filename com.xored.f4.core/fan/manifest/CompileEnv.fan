
const mixin CompileEnv {

	abstract Str label()

	abstract Str description()
	
	abstract Uri? envPodUrl()

	abstract Str:File resolvePods()

	virtual  Err[] resolveErrs() { Err#.emptyList }

	abstract Void tweakLaunchEnv(Str:Str envVars)
	
	abstract Void publishPod(File podFile)
	
	virtual Void logErr(Str pluginId, Str? message, Err? e := null) {
		LogUtil.logErr(pluginId, message, e)
	}

	virtual Void logWarn(Str pluginId, Str? message, Err? e := null) {
		LogUtil.logWarn(pluginId, message, e)		
	}
}
