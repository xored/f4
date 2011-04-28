using build

class Build : build::BuildPod
{
  new make()
  {
    podName = "f4uiText"
    summary = ""
    srcDirs = [`fan/`, `fan/templates/`, `fan/search/`, `fan/highlighting/`, `fan/folding/`, `fan/fandoc/`, `fan/editor/`, `fan/contentassist/`]
    outDir = `./`
    depends = ["sys 1.0", "f4parser 1.0", "f4model 1.0", "f4core 1.0", "fandoc 1.0"]
    
  }
}
