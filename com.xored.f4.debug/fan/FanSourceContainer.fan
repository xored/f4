using [java]java.lang
using [java]org.eclipse.core.resources
using [java]org.eclipse.core.runtime
using [java]org.eclipse.debug.core.sourcelookup
using [java]org.eclipse.debug.core.sourcelookup.containers
using [java]com.xored.fanide.core
using f4core

class FanSourceContainer : AbstractSourceContainer
{
  
  private static const Str TYPE_ID := "com.xored.f4.debug.fanSourceContainerType"
  
  override Obj?[]? findSourceElements(Str? name) {
    Path path := Path(name)
    if (!path.segment(0).equals("fan")) return [,] 
    FantomProject? project := FantomProjectManager2.instance.getByPodName(path.segment(1))
    if (project == null) return [,]
    Obj[] sources := [,]
    project.srcDirs.each {
      IFile? file := project.project.getFolder(it.toStr).getFile(path.segment(2))
      if (file != null) if (file.exists) sources.add(file)
    }
    return sources
  }

  override Str? getName() {
    return "Fantom Sources"
  }

  override ISourceContainer?[]? getSourceContainers() {
    return (ISourceContainer?[]?)[,]
  }

  override Bool isComposite() {
    return false
  }
  
  override ISourceContainerType? getType() {
    return getSourceContainerType(TYPE_ID)
  }
  
}
