//
// Copyright (c) 2009-2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Alena Repina Mar 3, 2010 - Initial Contribution
//

**
** Represents path to certain position in ast node?
** 
const class AstPath
{
  //////////////////////////////////////////////////////////////////////////
  // Constructor and fields
  //////////////////////////////////////////////////////////////////////////
  const Node[] nodes 
  const Int pos
  
  new make(Node[] nodes, Int pos) 
  {
    this.nodes = nodes
    this.pos = pos
  }  
  
  //////////////////////////////////////////////////////////////////////////
  // Convenience methods
  //////////////////////////////////////////////////////////////////////////
  @Operator Node get(Int index) { nodes[index] }
  Node? last() { nodes.last }
  Node? find(Type t) { nodes.find { it.typeof === t} }
  Node[] findAll(Type t) { nodes.findAll { it.typeof === t} } 
  Node? findLast(Type t) { nodes.eachrWhile { it.typeof === t ? it : null } }
  
  Str? methodName() { (findLast(MethodDef#) as MethodDef)?.name?.text }
  Str? typeName() { (findLast(TypeDef#) as TypeDef)?.name?.text }
  
  MethodVar[] findLocals()
  {
    MethodVar[] locals := [,]
    Block[] blocks := findAll(Block#)
    blocks.each {locals.addAll(MethodVarFinder.find(it, pos))}
    MethodDef? def := findLast(MethodDef#)
    if (def != null) locals.addAll(def.params)
    return locals
  }
}
  
**************************************************************************
** MethodVarFinder
**************************************************************************
internal class MethodVarFinder : AstVisitor
{
  private MethodVar[] locals := [,]
  private const Int pos
  private const Node node
  
  private new make(Node n, Int pos)
  {
    this.node = n
    this.pos = pos
  }
  
  static MethodVar[] find(Node n, Int pos)
  {
    finder := MethodVarFinder(n, pos)
    n.accept(finder)
    return finder.locals
  }
  
  override Bool enterNode(Node n)
  {    
    if (n.start >= pos || n !== node && n is Block) return false
    if (n is LocalDef) locals.add((MethodVar)n)
    return true
  } 
}