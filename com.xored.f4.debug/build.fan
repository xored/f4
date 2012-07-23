using build

class Build : build::BuildPod
{
  new make()
  {
    podName = "f4debug"
    summary = ""
    srcDirs = [`fan/`]
    outPodDir = `./`
    depends = ["sys 1.0", "f4core 1.0"]
  }
}
