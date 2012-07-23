using build
class Build : build::BuildPod
{
  new make()
  {
    podName = "f4builder"
    summary = ""
    depends = ["sys 1.0", "compiler 1.0", 
      "compilerJava 1.0", "f4core 1.0", 
      "f4launching 1.0", "concurrent 1.0"]
    srcDirs = [`fan/`]
    outPodDir = `./`
  }
}
