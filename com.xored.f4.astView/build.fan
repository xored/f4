using build

class Build : build::BuildPod
{
  new make()
  {
    podName = "f4astView"
    summary = ""
    srcDirs = [`fan/`]
    outPodDir = `./`
    depends = ["sys 1.0", "f4parser 1.0", "f4core 1.0", "f4uiText 1.0", "f4model 1.0"]
  }
}
