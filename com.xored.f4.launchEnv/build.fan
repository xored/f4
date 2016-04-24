using build

class Build : BuildPod {

	new make() {
		podName = "f4launchEnv"
		summary = "A Fantom Env for projects launched by F4"
		version = Version("1.0.0")

		meta = [
			"proj.name" : "F4 Launch Environment"
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
