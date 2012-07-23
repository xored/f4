using build
class Build : build::BuildPod
{
  new make()
  {
    podName = "f4jdtLaunching"
    summary = ""
    depends = ["f4core 1.0", "sys 1.0", "f4launching 1.0", "f4model 1.0"]
    srcDirs = [`fan/`, `fan/internal/`]
    outPodDir = `./`
  }
}
