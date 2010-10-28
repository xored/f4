using build

class Build : build::BuildPod
{
  new make()
  {
    podName = "f4uiJdt"
    summary = ""
    srcDirs = [`fan/`, `fan/wizards/`, `fan/integration/`]
    outDir = `./`
    depends = ["sys 1.0", "f4jdtLaunching 1.0"]
  }
}
