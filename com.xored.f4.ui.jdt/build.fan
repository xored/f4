using build

class Build : build::BuildPod
{
  new make()
  {
    podName = "f4uiJdt"
    summary = ""
    srcDirs = [`fan/`, `fan/integration/`, `fan/wizards/`]
    outPodDir = `./`
    depends = ["sys 1.0", "f4uiCore 1.0", "f4jdtLaunching 1.0", "f4core 1.0"]
  }
}
