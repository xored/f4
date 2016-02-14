using f4core

const class PathCompileEnv : CompileEnv {

	override const Str label		:= "util::PathEnv"
	override const Str description	:= "Use pods from work directories"

	override Str:File resolvePods(FantomProject fanProj) {
		[:]
	}

}
