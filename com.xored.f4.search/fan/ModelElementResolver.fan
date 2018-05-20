using [java]org.eclipse.dltk.core
using f4parser

class ModelElementResolver : IModelElementVisitor
{
  
  private Node node
  private IModelElement? resolved := null
  
  new make(Node node) {
    this.node = node
  }
  
  public IModelElement? getResolvedElement() {
    return resolved
  }
  
  override Bool visit(IModelElement? element) {
    ISourceRange? range := getRange(element)
    if (range == null) return true
    if (range.getOffset <= node.start 
        && range.getOffset + range.getLength >= node.end
    ) {
      resolved = element
    }
    return true
  }
  
  public static ISourceRange? getRange(IModelElement? element) {
    if (element is ISourceReference) {
      return element->getSourceRange
    } else {
      return null
    }
  }
  
  public static IModelElement? resolve(IModelElement? module, Node node) {
    resolver := make(node)
    module?.accept(resolver)
    return resolver.getResolvedElement ?: module
  }
  
}
