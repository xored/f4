using build
class Build : build::BuildPod
{
  new make()
  {
    podName = "f4parser"
    summary = "Fantom parser"
    srcDirs = [`tests/`, `tests/parser/`, `tests/namespace/`, `fan/`, `fan/problemHandling/`, `fan/parser/`, `fan/parser/util/`, `fan/parser/tokenizer/`, `fan/dltkBridge/`, `fan/dltkBridge/model/`, `fan/ast/`]
    outPodDir = `./`
    depends = ["sys 1.0", "f4model 1.0"]
  }
}
