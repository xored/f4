using build
class Build : build::BuildPod
{
  new make()
  {
    podName = "f4core"   
    summary = "Fantom Core"
    srcDirs = [`fan/`, `fan/util/`, `fan/todos/`, `fan/selection/`, `fan/parser/`, `fan/model/`, `fan/manifest/`]
    outPodDir = `./`
    depends = ["sys 1.0", "f4parser 1.0", "f4model 1.0", "concurrent 1.0"] 
  } 
}  
