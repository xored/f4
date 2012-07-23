using build
class Build : build::BuildPod
{
  new make()
  {
    podName = "f4launching"
    summary = ""
    depends = ["f4core 1.0", "sys 1.0", "f4fcode 1.0", "compiler 1.0"]
    srcDirs = [`fan/`]
    outPodDir = `./`
  }
}
