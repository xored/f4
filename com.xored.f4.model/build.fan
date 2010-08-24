using build
class Build : build::BuildPod
{
  new make()
  {
    podName = "f4model"
    summary = ""
    depends = ["sys 1.0", "compiler 1.0"]
    srcDirs = [`fan/`, `fan/model/`]
    outDir = `./`
  }
}
