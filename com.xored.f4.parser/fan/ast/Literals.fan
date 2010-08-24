using f4model

const class Literal : Expr
{
  const Obj? val
  new make(Int start, Int end, ExprId id, Obj? val, IFanType? resolvedType)
    : super(start, end, id, resolvedType) {this.val = val}
}

const class DslLiteral : Expr
{
  const Str val
  new make(Int start, Int end, Str val)
    : super(start, end, ExprId.dslLiteral, null) {this.val = val}
}

const class NoneLiteral : Expr
{  
  new make(Int pos) : super(pos, pos, ExprId.noneLiteral, null) {}
}

const class ListLiteral : Expr
{
  const CType? ctype
  const Expr[] items
  
  new make(Int start, Int end, CType? ctype, Expr[] items, IFanType? resolvedType)
    : super(start, end, ExprId.listLiteral, resolvedType)
  {
    this.ctype = ctype
    this.items = items
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      ctype?.accept(v)
      items.each {it.accept(v)}
      v.exitNode(this)
    }
  }
}

const class MapLiteral : Expr
{
  const CType? ctype
  const Expr[] keys
  const Expr[] vals
  
  new make(Int start, Int end, CType? ctype, Expr[] keys, Expr[] vals, IFanType? resolvedType)
    : super(start, end, ExprId.mapLiteral, resolvedType)
  {
    this.ctype = ctype
    this.keys = keys
    this.vals = vals
  }
  
  Void each(|Expr k, Expr v->Void| f)
  {
    len := keys.size.min(vals.size)
    len.times |i|
    {
      f(keys[i], vals[i])
    }
  }
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      ctype?.accept(v)
      keys.each {it.accept(v)}
      vals.each {it.accept(v)}
      v.exitNode(this)
    }
  }
}

const class RangeLiteral : Expr
{
  const Expr startExpr
  const Expr endExpr
  const Bool exclusive
  
  new make(Int start, Int end, Expr startExpr, Expr endExpr, Bool exclusive, IFanType? resolvedType)
    : super(start, end, ExprId.rangeLiteral, resolvedType)
  {
    this.startExpr = startExpr
    this.endExpr = endExpr
    this.exclusive = exclusive
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      startExpr.accept(v)
      endExpr.accept(v)
      v.exitNode(this)
    }
  }
}

const class TypeLiteral : Expr
{
  const CType ctype
  new make(Int start, Int end, CType ctype, IFanType? resolvedType)
    : super(start, end, ExprId.typeLiteral, resolvedType) {this.ctype = ctype}
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      ctype.accept(v)
      v.exitNode(this)
    }
  }
}

const class SlotLiteral : Expr
{
  const CType? ctype
  const SlotRef? slot
  
  new make(Int start, Int end, CType? ctype, SlotRef? slot, IFanType? resolvedType)
    : super(start, end, ExprId.slotLiteral, resolvedType)
  {
    this.ctype = ctype
    this.slot = slot
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      ctype?.accept(v)
      slot?.accept(v)
      v.exitNode(this)
    }
  }
}