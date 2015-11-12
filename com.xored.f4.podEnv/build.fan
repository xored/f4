using build

class Build : BuildPod {

	new make() {
		podName = "f4podEnv"
		summary = "A Fantom Env for F4 launched projects"
		version = Version("1.0.0")

		meta = [
			"proj.name" : "F4 Pod Environment"
		]

		depends = [
			"sys 1.0"
		]

		srcDirs = [`fan/`]

		outPodDir = `./`

		docApi = true
		docSrc = true
	}
}
