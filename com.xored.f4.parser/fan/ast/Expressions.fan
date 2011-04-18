//
// Copyright (c) 2009-2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Alena Repina Mar 3, 2010 - Initial Contribution
//

using f4model

**************************************************************************
** Expr
**************************************************************************

** Base class for all expressions
abstract const class Expr : Node
{
  const ExprId id  
  const IFanType? resolvedType
  new make(Int start, Int end, ExprId id, IFanType? resolvedType)
    : super(start, end) {this.id = id; this.resolvedType = resolvedType}
}

**************************************************************************
** LocalDef
**************************************************************************

** [ctype] name [:= init]
const class LocalDef : Expr, MethodVar
{
  const CType? ctype
  override const Id name
  override const Expr? init
  
  new make(Int start, Int end, CType? ctype, Id name, Expr? init := null, IFanType? typeHint := null) 
    : super(start, end, ExprId.localDef, (ctype?.resolvedType ?: init?.resolvedType) ?: typeHint)
  {
    this.ctype = ctype
    this.name = name
    this.init = init
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      ctype?.accept(v)
      init?.accept(v)
      v.exitNode(this)
    }
  }
}

**************************************************************************
** TernaryExpr
**************************************************************************

** cond ? ifExpr : elseExpr
const class TernaryExpr : Expr
{
  const Expr cond
  const Expr ifExpr
  const Expr elseExpr
  
  new make(Int start, Int end, Expr cond, Expr ifExpr, Expr elseExpr, IFanType? resolvedType)
    : super(start, end, ExprId.ternary, resolvedType)
  {
    this.cond = cond
    this.ifExpr = ifExpr
    this.elseExpr = elseExpr
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      cond.accept(v)
      ifExpr.accept(v)
      elseExpr.accept(v)
      v.exitNode(this)
    }
  }
}

**************************************************************************
** ThrowExpr
**************************************************************************

** throw thrown
const class ThrowExpr : Expr
{
  const Expr thrown  
  
  new make(Int start, Int end, Expr thrown)
    : super(start, end, ExprId.throwExpr, null) {this.thrown = thrown}
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      thrown.accept(v)
      v.exitNode(this)
    }
  }
}

**************************************************************************
** BinaryExpr
**************************************************************************

** left <id> right
const class BinaryExpr : Expr
{
  const Expr left
  const Expr right
  
  new make(Int start, Int end, Expr left, Expr right, ExprId id, IFanType? resolvedType)
    : super(start, end, id, resolvedType)
  {
    this.left = left
    this.right = right
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      left.accept(v)
      right.accept(v)
      v.exitNode(this)
    }
  }
}

**************************************************************************
** UnaryExpr
**************************************************************************

** <id> operand
const class UnaryExpr : Expr
{
  const Expr operand
  
  new make(Int start, Int end, Expr operand, ExprId id, IFanType? resolvedType)
    : super(start, end, id, resolvedType)
  {
    this.operand = operand    
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      operand.accept(v)
      v.exitNode(this)
    }
  }
}

**************************************************************************
** ParenExpr
**************************************************************************
const class ParenExpr : UnaryExpr
{  
  new make(Int start, Int end, Expr operand)
    : super(start, end, operand, ExprId.paren, operand.resolvedType) {}
}

**************************************************************************
** StorageExpr
**************************************************************************
const class StorageExpr : Expr
{  
  const Ref field
  
  new make(Int start, Int end, Ref field)
    : super(start, end, ExprId.storage, field.resolvedType) {this.field = field}
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      field.accept(v)
      v.exitNode(this)
    }
  }
}

**************************************************************************
** TypeCheckExpr
**************************************************************************

** <target> is <check>
const class TypeCheckExpr : Expr
{
  const CType check
  const Expr target
  
  new make(Int start, Int end, CType check, Expr target, ExprId id, IFanType? resolvedType)
    : super(start, end, id, resolvedType)
  {
    this.check = check
    this.target = target
  }
  
  new asExpr(Int start, Int end, CType check, Expr target)
    : this.make(start, end, check, target, ExprId.asExpr, check.resolvedType) {}
  
  new isExpr(Int start, Int end, CType check, Expr target, IFanType? resolvedType)
    : this.make(start, end, check, target, ExprId.isExpr, resolvedType) {}
  
  new isnotExpr(Int start, Int end, CType check, Expr target, IFanType? resolvedType)
    : this.make(start, end, check, target, ExprId.isnotExpr, resolvedType) {}
  
  new coerce(Int start, Int end, CType check, Expr target)
    : this.make(start, end, check, target, ExprId.coerce, check.resolvedType) {}
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      check.accept(v)
      target.accept(v)
      v.exitNode(this)
    }
  }
}

**************************************************************************
** InvokeExpr
**************************************************************************
const class InvokeExpr : Expr
{
  const Expr callee
  const Expr caller
  
  new make(Int start, Int end, Expr callee, Expr caller, ExprId id, Bool safe := false)
    : super(start, end, id, safe ? caller.resolvedType?.toNullable : caller.resolvedType)
  {
    this.callee = callee
    this.caller = caller
  }
  
  new staticInvoke(Int start, Int end, Expr callee, Expr caller)
    : this.make(start, end, callee, caller, ExprId.staticInvoke) {}
  
  new staticSafeInvoke(Int start, Int end, Expr callee, Expr caller)
    : this.make(start, end, callee, caller, ExprId.staticSafeInvoke, true) {}
  
  new dynamicInvoke(Int start, Int end, Expr callee, Expr caller)
    : this.make(start, end, callee, caller, ExprId.dynamicInvoke) {}
  
  new dynamicSafeInvoke(Int start, Int end, Expr callee, Expr caller)
    : this.make(start, end, callee, caller, ExprId.dynamicSafeInvoke, true) {}
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      callee.accept(v)
      caller.accept(v)
      v.exitNode(this)
    }
  }
}

**************************************************************************
** Closure
**************************************************************************
const class Closure : Expr
{
  const FuncType? signature
  const Block block
  const IFanType?[]? argTypesHint
  const IFanType? resolvedReturnType
  
  new make(Int start, Int end, FuncType? signature, Block block, IFanType? resolvedType, IFanType?[]? argTypesHint)
    : super(start, end, ExprId.closure, resolvedType)
  {
    this.signature = signature
    this.block = block
    this.argTypesHint = argTypesHint
    this.resolvedReturnType = signature?.returnType?.resolvedType
  }

  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      signature?.accept(v)
      block.accept(v)
      v.exitNode(this)
    }
  }
  
}

**************************************************************************
** CallExpr
**************************************************************************
const class CallExpr : Expr
{
  const Expr callee
  const Expr[] args
  
  new make(Int start, Int end, Expr callee, Expr[] args)
    : super(start, end, ExprId.call, resolveType(callee))
  {
    this.callee = callee
    this.args = args
  }
  
  private static IFanType? resolveType(Expr caller)
  {
    if(caller is Closure) return caller->resolvedReturnType
    return caller.resolvedType
  }
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      callee.accept(v)
      args.each {it.accept(v)}
      v.exitNode(this)
    }
  }
}

**************************************************************************
** StaticTargetExpr
**************************************************************************
const class StaticTargetExpr : Expr
{
  const CType ctype
  
  new make(Int start, Int end, CType ctype)
    : super(start, end, ExprId.staticTarget, ctype.resolvedType)
  {
    this.ctype = ctype
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      ctype.accept(v)
      v.exitNode(this)
    }
  }
}

**************************************************************************
** DslExpr
**************************************************************************
const class DslExpr : Expr
{
  const CType anchorType
  const DslLiteral dsl
  new make(Int start, Int end, CType anchorType, DslLiteral dsl)
    : super(start, end, ExprId.dsl, anchorType.resolvedType)
  {
    this.anchorType = anchorType
    this.dsl = dsl
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      anchorType.accept(v)
      dsl.accept(v)
      v.exitNode(this)
    }
  }
}