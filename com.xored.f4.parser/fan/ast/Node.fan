abstract const class Node
{
  const Int start
  const Int end
  
  new make(Int start, Int end)
  {
    this.start = start
    this.end = end
  }
  
  virtual Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      v.exitNode(this)
    }
  }
}