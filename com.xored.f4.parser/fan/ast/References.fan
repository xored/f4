using f4model

const class Ref : Expr
{
  const Str text
  
  new make(Int start, Int end, Str text, ExprId id, IFanType? resolvedType := null)
    : super(start, end, id, resolvedType) {this.text = text}
  
  override Str toStr() {return text}
}

const class UnresolvedRef : Ref
{  
  new make(Int start, Int end, Str text)
    : super(start, end, text, ExprId.unresolvedRef) {}
}

const class PodRef : Ref
{
  const IFanPod? modelPod
  new make(Int start, Int end, Str text, IFanPod? modelPod := null)
    : super(start, end, text, ExprId.podRef) {this.modelPod = modelPod}
}

const class TypeRef : Ref
{  
  const IFanType? modelType
  new make(Int start, Int end, Str text, IFanType? modelType := null)
    : super(start, end, text, ExprId.typeRef, modelType) {this.modelType = modelType}
}

const class SlotRef : Ref
{  
  const IFanSlot? modelSlot
  const IFanType? thisType
  const Bool isCall

  new make(Int start, Int end, Str text, ExprId id, IFanSlot? modelSlot, IFanType? resolvedType, IFanType? thisType, Bool isCall := false)
    : super(start, end, text, id, resolvedType) 
  {
    this.isCall = isCall
    if(modelSlot != null &&
      modelSlot.isCtor && 
      (resolvedType == null || 
        resolvedType.qname == "sys::Void"))
    {
      this.resolvedType = thisType ?: modelSlot.type
    }
    this.modelSlot = modelSlot
    this.thisType = thisType
    if(resolvedType?.qname == "sys::This" && thisType != null)
    {
      this.resolvedType = thisType
    }
  }
}

const class MethodVarRef : Ref
{  
  const MethodVar def
  new make(Int start, Int end, Str text, MethodVar def)
    : super(start, end, text, ExprId.methodVarRef,
      def->resolvedType) // TODO report bug
  {this.def = def}
}

const class ThisRef : Expr
{
  new make(Int start, Int end, IFanType? resolvedType)
    : super(start, end, ExprId.thisRef, resolvedType) {}
}

const class SuperRef : Expr
{
  const CType? ctype
  new make(Int start, Int end, CType? ctype, IFanType? resolvedType := null)
    : super(start, end, ExprId.superRef, resolvedType?:ctype?.resolvedType) {}
}

const class ItRef : Expr
{
  new make(Int start, Int end, IFanType? resolvedType := null)
    : super(start, end, ExprId.itRef, resolvedType) {}
}