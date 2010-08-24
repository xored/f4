using [java]org.eclipse.debug.core.sourcelookup

class FanSourceContainerTypeDelegate : ISourceContainerTypeDelegate
{

  override ISourceContainer? createSourceContainer(Str? memento) {
    return FanSourceContainer()
  }
  
  override Str? getMemento(ISourceContainer? container) {
    return "FanSourceContainer"
  }
  
}
