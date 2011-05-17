using build
class Build : build::BuildPod
{
  new make()
  {
    podName = "f4uiCore"
    summary = ""
    srcDirs = [`fan/`, `fan/wizards/`, `fan/templates/`]
    depends = ["sys 1.0", "f4core 1.0"]
  }
}
