//
// Copyright (c) 2009-2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Apr 16, 2010 - Initial Contribution
//
using [java]org.eclipse.core.resources::IProject
using [java]org.eclipse.core.resources::IResource

using f4parser 
using f4model

class Manifest
{
  new make(IProject project)
  {
    content := PathUtil.resolveRes(project.getFile(filename)).readAllStr
    lineOffsets = buildOffsets(content)
    parser := Parser(content, EmptyNamespace())

    MethodDef? method := parser.cunit.types.find { it.name.text == "Build" }?.slots?.find { it->name->text == "make" }
    if(method == null) throw ArgErr("Can't parse build.fan in $project.getName")
    
    lines = [Str:Int][:]
    vals =  method.body.stmts
      .findAll { it is ExprStmt }
      .findAll |ExprStmt st->Bool| { st.expr.id == ExprId.assign }
      .map |ExprStmt st -> BinaryExpr| { st.expr}
      .reduce([Str:Obj?][:]) |Str:Obj? result, BinaryExpr expr->Str:Obj?|
      {
        if(expr.left isnot Ref) return result
        name := expr.left->text
        result[name] = resolveLiteral(expr.right)
        lines[name] = lineByPos(expr.right.start)
        return result
      }
  }

  private Range:Int lineOffsets
  
  private Range:Int buildOffsets(Str file)
  {
    offset := 0
    line := 1
    result := [Range:Int][:]
    file.each |c, i|
    {
      if(c == '\n')
      {
        range := offset..i
        result.set(range, line)
        line++
        offset = i+1
      }
    }
    
    return result
  }
  private Int lineByPos(Int pos)
  {
    lineOffsets.find |v, k| 
    {
      k.contains(pos)
    }
  }
  
  //////////////////////////////////////////////////////////////////////////
  // Public API
  //////////////////////////////////////////////////////////////////////////
  public static const Str filename := "build.fan"
  Str:Obj? vals { private set }
  ** Lines of field initializers
  Str:Int lines { private set } 
  
  Str? podName() { vals["podName"] }
  
  Version version() { vals["version"] ?: Version("1.0") }
  
  Str:Obj index() { vals["index"] ?: [Str:Obj][:] }
  
  Str summary() { vals["summary"] ?: "" }
  
  Uri? outDir() 
  { 
    vals["outDir"] 
  }
  
  Str[] depends() { vals["depends"] ?: Str[,] }
  
  Uri[] resDirs() { vals["resDirs"] ?: Uri[,] }
  
  Uri[] jsDirs() { vals["jsDirs"] ?: Uri[,] }
  //////////////////////////////////////////////////////////////////////////
  // Helper methods
  //////////////////////////////////////////////////////////////////////////
  private static Obj? resolveLiteral(Expr expr)
  {
    if (expr is Literal) return expr->val
    if (expr is ListLiteral)
    {
      list := expr as ListLiteral
      return list.items.map { resolveLiteral(it) }
    }
    if (expr is MapLiteral)
    {
      map := expr as MapLiteral
      result := [:]
      map.each |k, v|
      {
        result[resolveLiteral(k)] = resolveLiteral(v)
      }
      return result
    }
    if (expr is CallExpr)
    {
      call := expr as CallExpr
      // Possibly, more generic solution is needed 
      if ((call.callee as Ref)?.text == "Version")
      {
        s := (call.args.getSafe(0) as Literal)?.val as Str
        if (s != null) return Version(s)
      }
    }
    return null
  }
  
}


