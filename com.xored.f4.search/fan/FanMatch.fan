using f4parser
using [java]org.eclipse.dltk.core
using [java]org.eclipse.dltk.core.search

const class FanMatch
{
  
  public const Node node
  
  new make(Node node) {
    this.node = node
  }
  
  public SearchMatch getSearchMatch(IModelElement module, SearchParticipant participant) {
    element := ModelElementResolver.resolve(module, node)
    resource := element.getResource
    length := node.end - node.start + 1
    return SearchMatch(element, 0, node.start, length, participant, resource)
  }
  
}
