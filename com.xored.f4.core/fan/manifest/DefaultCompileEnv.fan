using [java]org.eclipse.dltk.launching::LibraryLocation
using [java]org.eclipse.dltk.launching::ScriptRuntime

const class DefaultCompileEnv : CompileEnv {
	
	override const Str label		:= "None"
	override const Str description	:= "Use pods from Fantom Interpreter installation"

	override Str:File resolvePods(FantomProject fanProj) {
		podFiles := Str:File[:]
		
		//add interpreter libraries
		libLocs := ScriptRuntime.getLibraryLocations(fanProj.interpreterInstall) as LibraryLocation[]
		libLocs.each {
			file := PathUtil.resolveLocalPath(it.getLibraryPath())
			podFiles[file.basename] = file
		}
		
		return podFiles
	}
}
