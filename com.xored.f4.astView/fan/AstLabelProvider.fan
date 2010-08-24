using [java]org.eclipse.jface.viewers
using [java]org.eclipse.swt.graphics

using f4parser
class AstLabelProvider : ILabelProvider
{

  override Void addListener(ILabelProviderListener? listener) {
    
  }

  override Void dispose() {
    
  }

  override Bool isLabelProperty(Obj? element, Str? property) {
    return false
  }

  override Void removeListener(ILabelProviderListener? listener) {
    
  }
  
  override Image? getImage(Obj? node) {
    return null
  }
  
  override Str? getText(Obj? node) {
    if (node is AstNode) 
      return label(node->node)
    else return node->typeof->name
  }
  
  private Str label(Node node)
  {
    result := node.typeof.name
    if(node is Expr) result = "$result (${node->resolvedType?->genericQname}) (op ${node->id->name})"
    return result
  }
}
