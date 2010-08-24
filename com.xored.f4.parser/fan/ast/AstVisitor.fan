mixin AstVisitor
{
  virtual Bool enterNode(Node n) {return true}
  virtual Void exitNode(Node n) {}
}
