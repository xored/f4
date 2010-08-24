//
// Copyright (c) 2009-2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Alexey Alexandrov Apr 14, 2010 - Initial Contribution
//

using f4parser

class CodeVisitor : AstVisitor
{

  private FanCodeFoldingBlockProvider provider
  
  new make(FanCodeFoldingBlockProvider provider) { this.provider = provider }

  public Void report(Node n, Bool collapse) 
  {
    provider.getRequestor?.acceptBlock(n.start, n.end, FanFoldingBlockKind.code, n.typeof, collapse)
  }
  
  override Bool enterNode(Node n) { true }

  override Void exitNode(Node n) 
  {
    if (n is TypeDef) report(n, provider.collapseClasses)
    else if (n is MethodDef) report(n, provider.collapseMethods)
    else if (n is Closure) report(n, provider.collapseClosures)
  }

  
}
