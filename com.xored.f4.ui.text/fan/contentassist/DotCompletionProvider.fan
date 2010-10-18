//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 19, 2010 - Initial Contribution
//

using f4parser
using f4model
**
** This class provides completion after "?->", "?." or "."
** 
class DotCompletionProvider : CompletionProvider
{
  //////////////////////////////////////////////////////////////////////////
  // Constructor and overrides
  //////////////////////////////////////////////////////////////////////////
  new make(IFanNamespace ns, Str str, CUnit unit) : super(ns, str, unit) {}
  

  override Bool setInput(Int pos, Str prefix)
  {
    super.setInput(pos, prefix)
    preceding := src[0..pos] 
    ending := endings.find { preceding.endsWith(it) }
    if(ending == null) return false
    
    //TODO: improve, looks too similar to magic now
    nodePos := pos - ending.size +1//+ (prefix.isEmpty ? 1 : 0)
    path = AstFinder.find(unit, nodePos) 
    if(path.last is CType) return true
    if(path.last is Expr) return true
    
    Expr? callExpr := path.findLast(CallExpr#)
    if(callExpr == null) return false
    
    path = AstPath(path.nodes[0..path.nodes.index(callExpr)], callExpr.start)
    return true
    //return false
  }
  
  override Bool complete(CompletionReporter reporter)
  {
    super.complete(reporter)
    
    IFanType? type := getType(path)
    if(type == null)
    {
      typeof.pod.log.warn("${src[path.last.start..path.last.end]} can't be resolved, prefix - $prefix")
      return true
    }
    
    if(type.qname == "sys::Void") return true //no slots
    slots := type.allSlots(ns).findAll(filter)
    reportSlots(slots)

    if(isStatic && !slots.any { it.isCtor })
      reportDefaultCtor
    
    return true
  }
  
  private Node getNode(AstPath path) {
    slotLiteral := path.findLast(SlotLiteral#) as SlotLiteral
    if(slotLiteral != null) return slotLiteral
    
    if(prefix != "") {
      return  path[-2]
    }
    return path.last
  }
  private IFanType? getType(AstPath path)
  {
    return getNode(path)->resolvedType
  }
  
  
  
  //////////////////////////////////////////////////////////////////////////
  // Private fields and methods
  //////////////////////////////////////////////////////////////////////////
  
  
  **
  ** The order of elements in this list does make sence:
  ** Elements length should be decreasing (so we correctly define
  ** full ending)
  ** 
  private static const Str[] endings := Str["?->", "->", "?.", "."]
  
  ** path to node preceding to completion position
  private AstPath? path
  **
  ** True if we should complete only static methods and constructors
  ** 
  private Bool isStatic()
  {
    node := getNode(path)
    return node is StaticTargetExpr || node is CType
  }
  
  private |IFanSlot->Bool| filter()
  {
    isStatic ? |IFanSlot slot->Bool| { slot.isStatic || slot.isCtor } :
      |IFanSlot slot->Bool| { !slot.isStatic && !slot.isCtor }
  }
}