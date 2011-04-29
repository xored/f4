using build
class Build : build::BuildPod
{
  new make()
  {
    podName = "f4fcodeUi"
    summary = ""
    srcDirs = [`fan/`]
    depends = ["sys 1.0", "f4fcode 1.0", "f4uiText 1.0", "compiler 1.0"]
    outDir = `./`
  }
}
