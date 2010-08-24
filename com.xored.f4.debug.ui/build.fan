using build

class Build : build::BuildPod
{
  new make()
  {
    podName = "f4debugUi"
    summary = ""
    srcDirs = [`fan/`]
    outDir = `./`
    depends = ["sys 1.0", "fwt 1.0", "gfx 1.0", "f4model 1.0", "f4debug 1.0", "f4core 1.0", "f4launching 1.0", "f4parser 1.0"]
  }
}
