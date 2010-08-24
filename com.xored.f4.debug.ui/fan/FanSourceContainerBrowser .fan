using [java]org.eclipse.dltk.core
using [java]org.eclipse.swt.widgets
using [java]org.eclipse.debug.ui.sourcelookup
using [java]org.eclipse.debug.core.sourcelookup
using [java]org.eclipse.core.resources
using f4debug

class FanSourceContainerBrowser : ISourceContainerBrowser 
{
  
  new make() {
    
  }
  
  override ISourceContainer?[]? addSourceContainers(Shell? shell, ISourceLookupDirector? director) {
    return [FanSourceContainer()]
  }
  
  override Bool canAddSourceContainers(ISourceLookupDirector? director) {
    return true
  }
  
  override ISourceContainer?[]? editSourceContainers(Shell? shell, ISourceLookupDirector? director, ISourceContainer?[]? containers) {
    return containers
  }
  
  override Bool canEditSourceContainers(ISourceLookupDirector? director, ISourceContainer?[]? containers) {
    return true
  }
  
}
