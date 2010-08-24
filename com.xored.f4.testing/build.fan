using build
class Build : build::BuildPod
{
  new make()
  {
    podName = "f4testing"
    summary = ""
    srcDirs = [`fan/`]
    depends = ["sys 1.0", "f4launching 1.0", "f4parser 1.0", "f4jdtLaunching 1.0", "f4core 1.0", "f4model 1.0", "f4debugUi 1.0"]
    outDir = `./`
  }
}
