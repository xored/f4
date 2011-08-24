//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 19, 2010 - Initial Contribution
//

using f4core
using f4parser
using f4model
**
** This provider check for string literal completions and just grabs and reports all it can overwize - local vars, types, pods, keywords
**
class StrProvider : CompletionProvider
{
  private Bool isPound := false
  //////////////////////////////////////////////////////////////////////////
  // Constructor and overrides
  //////////////////////////////////////////////////////////////////////////
  new make(IFanNamespace ns, Str str, CUnit unit) : super(ns, str, unit) {}
  
  override Bool complete(CompletionReporter reporter)
  {
    super.complete(reporter)

    path := AstFinder.find(unit, pos)

    // report locals and current type slots
    insideString := false // Completion inside string
    allowMethodsInStr := false // Allow methods completion if inside ${}
    // Ignore string literals
    if( path.last is Literal && ((Literal)path.last).id == ExprId.strLiteral)
    {
      Literal lit := path.last
      
      Int cpos := pos
      while( cpos >= lit.start )
      {
        if( src[cpos] == ' ' || src[cpos] == '\t') break
        if( src[cpos] == '\$')
        {
          if( cpos > 1 && src[cpos-1] !='\\')
          {
            insideString = true
            cpos++;
            break
          }
        }
        if( src[cpos]=='{')
        {
          if( cpos > 2 && src[cpos-1] == '\$' && src[cpos-2] != '\\')
          {
            allowMethodsInStr = true
            insideString = true
            cpos+=1
            break
          }
        }
        cpos--;
      }
      if( src[pos] == '{')pos++;
      cend := pos+prefix.size 
      realPrefix := src[cpos..cend]
      partUnit := null
      
      methodName := path.methodName
      typeName := path.typeName
      curType := ns.currPod.findType(typeName, false)
      curMethod := curType?.method(methodName, false)
      parent := curMethod?.me
      
      if( realPrefix.size > 0) 
      {
        try {
          parser := Parser(realPrefix, ns)
          parser.usings = unit.usings
          parser.currType = curType
          parser.currPod = ns.currPod
          
          MethodDef? methoddef := path.findLast(MethodDef#)
          if( methoddef != null)
          {
            parser.funcStack.push([,].addAll(methoddef.params))
            LocalDefCollector collector := LocalDefCollector(pos)
            methoddef.accept(collector)
            collector.defs.each {
              parser.addLocal(it)
            }
          }
          partUnit = parser.expr
        }
        catch(Err e)
        {
          // Ignore errors
        }
      }
      if( insideString && partUnit != null)
      {
        ending := DotCompletionProvider.endings.find { realPrefix.endsWith(it) }
        if(ending != null)
        {
          isPound = ending == "#"
          // DotCompletion
          npos := cend-cpos
          nodePos := npos - ending.size +1//+ (prefix.isEmpty ? 1 : 0)
          partpath := AstFinder.findNode(partUnit, nodePos) 
          
          skipCallProcess := (partpath.last is CType) || (partpath.last is Expr)
    
          if( !skipCallProcess )
          {
            Expr? callExpr := partpath.findLast(CallExpr#)
            if(callExpr != null)
              partpath = AstPath(partpath.nodes[0..partpath.nodes.index(callExpr)], callExpr.start)
          }
          IFanType? type := getType(partpath)
          
          if(type == null)
          {
            typeof.pod.log.warn("${src[path.last.start..path.last.end]} can't be resolved, prefix - $prefix")
            return true
          }
          
          if(type.qname == "sys::Void") return true //no slots
          slots := type.allSlots(ns).findAll(filter(partpath))
          reportSlots(slots)
      
          if(isStatic(partpath) && !slots.any { it.isCtor })
            reportDefaultCtor
          return true
        }
      }
     
      if( insideString)
      {        
        path.findLocals.each 
        { 
          reportLocal(it.name.text, 
                    (it as LocalDef)?.resolvedType?.name, 
                    parent)
        }
        curType = type(path)
        if( curType != null)
        {
          slots := curType.allSlots(ns).findAll |IFanSlot slot -> Bool| {
            if( slot.isMethod && slot is DltkMethod)
            {
              if( ["Void", "sys::Void"].contains(slot.of)) {
                return false
              }
            }
            return true
          }
          reportSlots(slots)
        }
        //types
        reportNsTypes
        return true
      }
   }
   return false
  }
  
  
  //////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////
  private |IFanSlot->Bool| filter(AstPath path)
  {
    isPound ? |IFanSlot slot->Bool| { true } :
    (isStatic(path) ? |IFanSlot slot->Bool| { slot.isStatic || slot.isCtor } :
      |IFanSlot slot->Bool| { !slot.isStatic && !slot.isCtor })
  }
  private Bool isStatic(AstPath path)
  {
    node := getNode(path)
    return node is StaticTargetExpr || node is CType
  }
  private IFanType? type(AstPath path)
  {
    name := (path.find(TypeDef#) as TypeDef).name.text
    return ns.currPod.findType(name, false)
  }

  private Void reportTypeSlots(IFanType? type)
  {
    if (type == null) return

    slots := type.allSlots(ns)
    reportSlots(slots)
    if(!slots.any{ it.isCtor }) reportDefaultCtor
  }
  private Node getNode(AstPath path) {
    if (!isPound) {
      slotLiteral := path.findLast(SlotLiteral#) as SlotLiteral
      if(slotLiteral != null) return slotLiteral
      if(prefix != "") {
        return  path[-2]
      }
    }
    return path.last
  }
  private IFanType? getType(AstPath path)
  {
    return getNode(path)->resolvedType
  }
}
internal class LocalDefCollector: AstVisitor
{
  private const Int pos
  public LocalDef[] defs := [,]
  new make(Int pos)
  {
    this.pos = pos
  }
  override Bool enterNode(Node n) {
    if(n is LocalDef && n.end < pos)
    {
      defs.add(n)
    }
    return true
  }
  override Void exitNode(Node n) {}
}
