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
  new make(FantomProject fantomProject)
  {
    project := fantomProject.project
    content := PathUtil.resolveRes(project.getFile(filename)).readAllStr
    lineOffsets = buildOffsets(content)
    parser := Parser(content, EmptyNamespace())

    MethodDef? method := parser.cunit.types.find { it.name.text == "Build" }?.slots?.find { it->name->text == "make" }
    if(method == null) throw ArgErr("Can't parse build.fan in $project.getName")
    
    lines = [Str:Int][:]
    vals =  method.body.stmts
      .findAll { it is ExprStmt }
      .findAll |ExprStmt st->Bool| { st.expr.id == ExprId.assign }
      .map |ExprStmt st -> BinaryExpr| { st.expr }
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
    vals["outPodDir"] != null ? Uri.fromStr(vals["outPodDir"]) : null
  }
  
  Str[] depends() { vals["depends"] ?: Str[,] }
  
  Uri[] resDirs() { resolveUris(vals["resDirs"]) }
  
  Uri[] jsDirs() { resolveUris(vals["jsDirs"]) }
  
  Uri[] javaDirs() { resolveUris(vals["javaDirs"]) }
  
  Str:Str meta() { vals["meta"] ?: [Str:Str][:] }
  
  //////////////////////////////////////////////////////////////////////////
  // Helper methods
  //////////////////////////////////////////////////////////////////////////
  private static Uri[] resolveUris(Obj? vals) {
    res := Uri[,]
    (vals as Str[])?.each { res.add(Uri.fromStr(it)) }
    return res
  }
  
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
      callee := call.callee
      if (isVersionConstructor(callee)) {
        // first look for a Str ctor
        versionStr := (call.args.first as Literal)?.val as Str

        // then for an Int array ctor
        if (versionStr == null)
          versionStr = (call.args.first as ListLiteral)?.items?.join(".") { (it as Literal)?.val?.toStr ?: null }
        
        if (versionStr != null) {
          version := Version.fromStr(versionStr, false)
          if (version != null) return version
        }
      }
    }
    return null
  }
  
  private static Bool isVersionConstructor(Expr callee) 
  {
    (callee as UnresolvedRef)?.text == "Version" ||
      (callee as StaticTargetExpr)?.ctype?.resolvedType?.qname == "sys::Version";
  }
}


