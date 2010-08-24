using build

class Build : build::BuildPod
{
  new make()
  {
    podName = "f4search"
    summary = ""
    srcDirs = [`fan/`, `fan/predicates/`, `fan/callHierarchy/`]
    outDir = `./`
    depends = ["sys 1.0", "f4parser 1.0", "f4core 1.0", "f4model 1.0"]
  }
}
