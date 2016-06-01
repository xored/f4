using build
class Build : build::BuildPod
{
  new make()
  {
    podName = "f4parser"
    summary = "Fantom parser"
    srcDirs = [`fan/`, `fan/ast/`, `fan/dltkBridge/`, `fan/dltkBridge/model/`, `fan/parser/`, `fan/parser/tokenizer/`, `fan/parser/util/`, `fan/problemHandling/`, `tests/`, `tests/namespace/`, `tests/parser/`]
    outPodDir = `./`
    depends = ["sys 1.0", "f4model 1.0"]
  }
}
