class AstFinder : AstVisitor
{
  private Node[] path
  private Int? pos
  private new make(Int? pos := null, Node[] path := Node[,]) 
  {
    this.pos = pos
    this.path = path
  }
  
  static AstPath find(CUnit unit, Int pos)
  {
    finder := AstFinder(pos)
    unit.accept(finder)
    return AstPath(finder.path, pos)
  }
  
  override Bool enterNode(Node node)
  { 
    if ((pos+1) >= node.start && (pos-1) <= node.end)
    {
      path.push(node)
      return true
    }
    return false
  }
}