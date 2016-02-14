
const mixin CompileEnv {

	abstract Str label()

	abstract Str description()
	
	abstract Str:File	resolvePods(FantomProject fanProj)
}
