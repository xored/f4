using build
class Build : build::BuildPod
{
  new make()
  {
    podName = "javaBytecode"
    summary = ""
    srcDirs = [`fan/`, `fan/java/`, `fan/classfile/`, `fan/classfile/attributes/`, `examples/`]
    depends = ["sys 1.0"]
    outDir = `./`
  }
}
