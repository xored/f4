using build

class Build : build::BuildPod
{
  new make()
  {
    podName = "f4fcode"
    summary = ""
    srcDirs = [`fan/`]
    outDir = `./`
    depends = ["sys 1.0", "compiler 1.0", "f4core 1.0", "f4parser 1.0"]
    
  }
}
