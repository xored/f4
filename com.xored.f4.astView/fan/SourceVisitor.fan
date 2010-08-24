using f4parser

class SourceVisitor : AstVisitor
{
  
  private const Node node
  private Node[] children := [,]
  
  new make(Node node) {
    this.node = node
    node.accept(this)
  }
  
  public Node[] getChildren() {
    return children
  }
  
  override Bool enterNode(Node node) {
    if (this.node.equals(node)) {
      return true
    } else {
      children.add(node)
      return false
    }
  }
  
}
