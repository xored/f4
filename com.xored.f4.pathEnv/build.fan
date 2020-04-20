using build

class Build : BuildPod {

	new make() {
		podName = "f4pathEnv"
		summary = "A PATH_ENV extension for F4 projects"
		version = Version("1.1.4")

		meta = [
			"proj.name" : "F4 PATH_ENV"
		]
 
		depends = [
			"sys        1.0",
			"concurrent 1.0",
			"f4core     1.0"
		]

		srcDirs = [`fan/`]

		outPodDir = `./`

		docApi = true
		docSrc = true
	}
}
