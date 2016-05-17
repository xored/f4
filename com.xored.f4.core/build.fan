using build
class Build : build::BuildPod
{
  new make()
  {
    podName = "f4core"
    summary = ""
    srcDirs = [`fan/`, `fan/manifest/`, `fan/model/`, `fan/parser/`, `fan/selection/`, `fan/todos/`, `fan/util/`]
    outPodDir = `./`
    depends = ["sys 1.0", "f4parser 1.0", "f4model 1.0", "concurrent 1.0"]
  }
}
