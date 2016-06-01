using build

class Build : build::BuildPod
{
  new make()
  {
    podName = "f4uiText"
    summary = ""
    srcDirs = [`fan/`, `fan/contentassist/`, `fan/editor/`, `fan/fandoc/`, `fan/folding/`, `fan/highlighting/`, `fan/search/`, `fan/templates/`]
    outPodDir = `./`
    depends = ["sys 1.0", "f4parser 1.0", "f4model 1.0", "f4core 1.0", "fandoc 1.0", "f4uiCore 1.0"]
  }
}
