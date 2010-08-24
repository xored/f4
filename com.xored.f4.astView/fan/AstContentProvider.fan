using [java]org.eclipse.jface.viewers

class AstContentProvider : ITreeContentProvider
{
  
    AstNode? root := null
  
    override Obj?[]? getChildren(Obj? parentElement) {
      if (parentElement is AstNode) {
        return (Obj?[]?)(parentElement->children)
      } else {
        return [,]
      }
    }
  
    override Obj? getParent(Obj? element) {
      if (element is AstNode) {
        return element->parent
      } else {
        return null
      }
    }
  
    override Bool hasChildren(Obj? element) {
      return getChildren(element).size > 0
    }
  
    override Obj?[]? getElements(Obj? inputElement) {
      if (root == null) {
        return [,]
      } else {
        return [root]
      }
    }
  
    override Void dispose() {
      
    }

    override Void inputChanged(Viewer? viewer, Obj? oldInput, Obj? newInput) {
      if (newInput is AstNode[]) {
        root = newInput->first
      } else {
        root = null
      }
    }
  
}