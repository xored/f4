using f4model


const class Id : Node
{
  const Str text
  
  new make(Int start, Int end, Str text)
    : super(start, end) {this.text = text}

  override Str toStr() { return "Id($text)" }
}

const class CUnit : Node
{
  const UsingDef[] usings
  const TypeDef[] types
  const Comment[] comments
  
  new make(Int start, Int end, UsingDef[] usings, TypeDef[] types, Comment[] comments)
    : super (start, end)
  {
    this.usings = usings
    this.types = types
    this.comments = comments
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      usings.each {it.accept(v)}
      types.each {it.accept(v)}
      comments.each { it.accept(v) }
      v.exitNode(this)
    }
  }
}

const class UsingDef : Node
{
  const PodRef podName
  const TypeRef? typeName
  const Id? asTypeName
  new make(Int start, Int end, PodRef podName, 
    TypeRef? typeName, Id? asTypeName)
    : super(start, end) 
  {
    this.podName = podName
    this.typeName = typeName
    this.asTypeName = asTypeName
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      podName.accept(v)
      typeName?.accept(v)
      v.exitNode(this)
    }
  }
}

abstract const class NamedNode : Node
{
  const Id name
  const FanDoc[] docs
  new make(Int start, Int end, Id name, FanDoc[] docs) : super(start, end)
  {
    this.name = name
    this.docs = docs
  }
}

abstract const class DefNode : NamedNode
{
  const FacetDef[] facets
  const Modifiers modifiers
  
  new make(Int start, Int end, 
    FanDoc[] docs, FacetDef[] facets, Modifiers modifiers, Id name) 
    : super(start, end, name, docs)
  {
    this.facets = facets
    this.modifiers = modifiers
    this.name = name
  }
}

const class TypeDef : DefNode
{
  const CType[] inheritance
  const SlotDef[] slots
  new make(Int start, Int end, 
    FanDoc[] docs, FacetDef[] fasets, Modifiers modifiers, Id name, 
    CType[] inheritance, SlotDef[] slots) 
    : super(start, end, docs, fasets, modifiers, name)
  {
    this.inheritance = inheritance
    this.slots = slots
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      inheritance.each {it.accept(v)}
      slots.each {it.accept(v)}
      v.exitNode(this)
    }
  }
}

const mixin SlotDef
{
  abstract Int start()
  abstract Int end()  
  abstract Void accept(AstVisitor v)
}

const class FieldDef : DefNode, SlotDef
{
  const CType? ctype
  const Expr? init
  const Getter? getter
  const Setter? setter
  new make(Int start, Int end, 
    FanDoc[] docs, FacetDef[] fasets, Modifiers modifiers, 
    CType? ctype, Id name, Expr? init, 
    Getter? getter, Setter? setter) 
    : super(start, end, docs, fasets, modifiers, name)
  {
    this.ctype = ctype
    this.init = init
    this.getter = getter
    this.setter = setter
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      ctype?.accept(v)
      init?.accept(v)
      getter?.accept(v)
      setter?.accept(v)
      v.exitNode(this)
    }
  }
}

const class Getter : Node
{
  const Id name
  const Block? body
  new make(Int start, Int end, Id name, Block? body) 
    : super(start, end) {this.name = name; this.body = body}
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      body?.accept(v)
      v.exitNode(this)
    }
  }
}

const class Setter : Node
{
  const Id name
  const Modifiers modifiers
  const Block? body
  new make(Int start, Int end, Modifiers modifiers, Id name, Block? body) 
    : super(start, end)
  {
    this.modifiers = modifiers
    this.name = name
    this.body = body
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      body?.accept(v)
      v.exitNode(this)
    }
  }
}

const class MethodDef : DefNode, SlotDef
{
  const CType? returnType
  const ParamDef[] params
  const CtorChain? ctorChain
  const Block? body
  
  new make(Int start, Int end, 
    FanDoc[] docs, FacetDef[] fasets, Modifiers modifiers, CType? returnType, 
    Id name, ParamDef[] params, CtorChain? ctorChain, Block? body) 
    : super(start, end, docs, fasets, modifiers, name)
  {
    this.returnType = returnType
    this.params = params
    this.body = body
    this.ctorChain = ctorChain
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      returnType?.accept(v)
      params.each {it.accept(v)}
      ctorChain?.accept(v)
      body?.accept(v)
      v.exitNode(this)
    }
  }
}

const class CtorChain : Node
{
  const Expr target
  const Ref? ctor
  const Expr[] args
  
  new make(Int start, Int end, Expr target, Ref? ctor, Expr[] args)
    : super(start, end)
  {
    this.target = target
    this.ctor = ctor
    this.args = args
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      target.accept(v)
      ctor?.accept(v)
      args.each {it.accept(v)}
      v.exitNode(this)
    }
  }
}

const mixin MethodVar
{
  abstract IFanType? resolvedType()
  abstract Id name()
  abstract Expr? init()
}

const class ParamDef : Node, MethodVar
{
  const CType ctype
  override const Id name
  override const Expr? init
  override const IFanType? resolvedType
  
  new make(Int start, Int end, CType ctype, Id name, Expr? init := null) 
    : super(start, end)
  {
    this.ctype = ctype
    this.name = name
    this.init = init
    this.resolvedType = ctype.resolvedType
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      ctype.accept(v)
      init?.accept(v)
      v.exitNode(this)
    }
  }
}

const class StaticInit : Node, SlotDef
{
  const Block body
  
  new make(Int start, Int end, Block body) 
    : super(start, end) {this.body = body}
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      body.accept(v)
      v.exitNode(this)
    }
  }
}

const class EnumValDef : NamedNode, SlotDef
{
  const Expr[] args
  new make(Int start, Int end, FanDoc[] docs, Id name, Expr[] args) 
    : super(start, end, name, docs)
  {
    this.args = args
  }
}

const class FacetDef : Node
{
  const CType ctype
  const Id[] names
  const Expr[] vals
  
  new make(Int start, Int end, CType ctype, Id[] names, Expr[] vals) 
    : super(start, end)
  {
    this.ctype = ctype
    this.names = names
    this.vals = vals
  }
}

abstract const class Comment : Node {
  const Int line
  const Str text
  new make(Int start, Int end, Int line, Str text) : super(start, end) {
    this.line = line
    this.text = text
  }
}

const class SLComment : Comment {
  new make(Int start, Int end, Int line, Str text) : super(start, end, line, text) {}
}

const class MLComment : Comment {
  new make(Int start, Int end, Int line, Str text) : super(start, end, line, text) {}
}

const class FanDoc : Node
{
  new make(Int start, Int end) : super(start, end) {}
}