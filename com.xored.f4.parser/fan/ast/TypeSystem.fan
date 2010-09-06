using f4model

abstract const class CType : Node
{  
  const IFanType? resolvedType
  new make(Int start, Int end, IFanType? resolvedType)
     : super(start, end) {this.resolvedType = resolvedType}
}

const class SimpleType : CType
{
  const PodRef? podName
  const TypeRef typeName
  
  new make(Int start, Int end, PodRef? podName, TypeRef typeName)
     : super(start, end, typeName.modelType)
  {
    this.podName = podName
    this.typeName = typeName
  }
  
  override Str toStr()
  {
    return podName == null? "$typeName" : "$podName::$typeName"
  }
}

const class NullableType : CType
{
  const CType valType
  
  new make(Int start, Int end, CType valType) 
    : super(start, end, valType.resolvedType?.toNullable) {this.valType = valType} 
  
  override Str toStr() {return "$valType?"}
}

const class ListType : CType
{
  const CType valType
  
  new make(Int start, Int end, CType valType, IFanType? listType)
     : super(start, end, listType) {this.valType = valType}
  
  override Str toStr() {return "$valType[]"}
}

const class MapType : CType
{
  const CType keyType
  const CType valType
  const Bool bracketed
  
  new make(Int start, Int end, CType keyType, CType valType, 
    Bool bracketed, IFanType? mapType)
     : super(start, end, mapType)
  {
    this.keyType = keyType
    this.valType = valType
    this.bracketed = bracketed
  }
  
  override Str toStr()
  {
    return bracketed? "$keyType:$valType" : "[$keyType:$valType]"
  }
}

const class FuncType : CType
{
  const FuncTypeParam[] params
  const CType? returnType
  
  new make(Int start, Int end, FuncTypeParam[] params, CType? returnType,
    IFanType? funcType)
     : super(start, end, funcType)
  {
    this.params = params
    this.returnType = returnType
  }
  
  override Str toStr()
  {
    if (params.isEmpty && returnType == null) return "|->|"
    if (params.isEmpty) return "|->$returnType|"
    if (returnType == null) return "|"+params.join(",")+"|"
    return "|"+params.join(",")+"->$returnType|"
  }
}

const class FuncTypeParam : Node
{
  const CType? ctype
  const Id? name
  const IFanType? resolvedType

  new make(Int start, Int end, CType? ctype, Id? name, IFanType? resolvedType := null)
    : super(start, end)
  {
    this.ctype = ctype
    this.name = name
    this.resolvedType = resolvedType ?: ctype?.resolvedType
  }

  override Str toStr()
  {
    t := resolvedType?.name
    n := name?.text
    return """${t?:""} ${n?:""}""".trim
  }
}
