using build
class Build : build::BuildPod
{
  new make()
  {
    podName = "f4uiCore"
    summary = ""
    srcDirs = [`fan/`, `fan/templates/`, `fan/wizards/`]
    depends = ["sys 1.0", "f4core 1.0"]
    outPodDir = `./`
  }
}
