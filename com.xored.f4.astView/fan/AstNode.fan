using f4parser

const class AstNode
{
  
  public const AstNode? parent 
  public const Node node
  public const AstNode[] children
  
  new make(AstNode? parent, Node node) {
    this.node = node
    this.parent = parent
    this.children = SourceVisitor(node).getChildren.map |Node n -> AstNode| { AstNode(this, n) }
  }
  
}
