//
// Copyright (c) 2009-2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Alexey Alexandrov Apr 14, 2010 - Initial Contribution
//

using f4parser

class ImportVisitor : AstVisitor
{

  private FanCodeFoldingBlockProvider provider
  private Node? first := null
  private Node? last := null
  
  new make(FanCodeFoldingBlockProvider provider) {
    this.provider = provider
  }
  
  override Bool enterNode(Node n) {
    if (n is CUnit) return true
    if (n is UsingDef) {
      if (first == null) {
        first = n
      }
      last = n
    }
    return false
  }
  
  override Void exitNode(Node n) {
    if (n isnot CUnit || first == null) return

    kind := FanFoldingBlockKind.code
    collapse := provider.collapseImports
    provider.getRequestor?.acceptBlock(first.start, last.end, kind, null, collapse)
  }
  
}
