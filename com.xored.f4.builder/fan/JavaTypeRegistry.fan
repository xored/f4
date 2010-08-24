//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 13, 2010 - Initial Contribution
//


using compiler
using compilerJava

using javaBytecode::Flags
using javaBytecode::TypeRef as NTypeRef
using javaBytecode::JavaType as NJavaType
using javaBytecode::JavaField as NJavaField
using javaBytecode::JavaMethod as NJavaMethod

class JavaTypeRegistry
{
  new make(F4Cp cp)
  {
    this.cp = cp
  }
  private F4Cp cp

  readonly Str:NJavaType infoCache := [:]
  
  **
  ** Use the same signature as JavaReflect
  ** 
  Void load(JavaType type, Str:CSlot slots)
  {
    if(type.arrayRank > 0) 
      populateArray(type, type.arrayOf, slots)
    else
      doLoad(type, slots)
  }
  
  private Void doLoad(JavaType type, Str:CSlot slots)
  {
    qname := type.toJavaClassName
    //echo("Asm loading $qname")
    asm := info(qname)
    populateType(type, asm, slots)
  }
  
  private NJavaType info(Str qname)
  {
    infoCache.getOrAdd(qname) |->NJavaType| { NJavaType.fromStream(cp.locs[qname].load.in) }
  }

  private Void populateType(JavaType type, NJavaType info, Str:CSlot result)
  {
    populateAccessAndBase(type, info)
    populateInterfaces(type, info)
    
    slots := [Str:CSlot[]][:]
    populateCtorsAndMethods(type, info, slots)
    islots := [Str:CSlot[]][:]
    populateInterfaceSlots(type, info, slots)
    populateFields(type, info, slots)
    result.addAll(collapseSlots(slots))
  }
 
  private Str:CSlot collapseSlots(Str:CSlot[] slots)
  {
    slots.map | CSlot[] list, Str name -> CSlot |
    {
      if(list.isEmpty) throw Err("Empty slot list $name")
      if(list.size < 2) return list.first
      
      first := list.first
      list = list[1..-1]
      return list.reduce(first) |JavaSlot r, JavaSlot v->CSlot|
      {
        v.next = r.next
        r.next = v
        return r
      }
    }
  }

  
  private Void populateFields(JavaType type, NJavaType info, [Str:JavaSlot[]] slots)
  {
    fieldHandler := |NJavaField f->Void|
    {
      result := JavaField()
      result.parent = type
      result.name = f.name
      result.flags = memberFlags(f.flags)
      result.fieldType = fanType(type.pod.bridge, f.type)
      slots[f.name] = [result]
    }
    fieldFilter := |NJavaField f->Bool|
    {
      Flags.Public.isSet(f.flags) || Flags.Protected.isSet(f.flags)
    }
    NJavaType? base := info
    while(base != null)
    {
      base.fields.findAll(fieldFilter).each(fieldHandler)
      base = getBase(base)
    }
  }

  private Void populateCtorsAndMethods(JavaType type, NJavaType info, [Str:JavaSlot[]] slots)
  {
    methodHandler := |NJavaMethod m->Void|
    {
      isCtor := m.name == "<init>"
      result := JavaMethod()
      result.parent = type
      result.name = m.name
      result.flags = memberFlags(m.flags).or(isCtor ? FConst.Ctor : 0)
      result.returnType = isCtor ? type : fanType(type.pod.bridge, m.returns)
      result.setParamTypes(m.params.map { fanType(type.pod.bridge, it)})
      
      list := slots.getOrAdd(m.name) |->JavaSlot[]| { JavaSlot[,] }
      //try to find slot with the same parameters
      slotExists := list.any |JavaSlot slot -> Bool|
      {
        if(slot isnot JavaMethod) return false
        other := slot as JavaMethod
        return other.params.map { it.paramType.qname } == result.params.map { it.paramType.qname }
      }
      if(!slotExists) list.add(result)
      //slots.getOrAdd(m.name) |->JavaSlot[]| { JavaSlot[,] }.add(result)
    }
    methodFilter := |NJavaMethod m->Bool|
    {
      Flags.Public.isSet(m.flags) || Flags.Protected.isSet(m.flags)
    }
    info.methods.findAll(methodFilter).each(methodHandler)
    
    if(Flags.Interface.isSet(info.flags) &&
      getBase(info).type.canonicalName == "java.lang.Object" ) 
      return

    NJavaType? base := info
    while((base = getBase(base)) != null)
      base.methods.exclude { it.name == "<init>"}.findAll(methodFilter).each(methodHandler)
  }

  private Void populateInterfaceSlots(JavaType type, NJavaType nfo, [Str:JavaSlot[]] slots)
  {
    if(nfo.interfaces.isEmpty) return
    nfo.interfaces.each |interface|
    { 
      qname := interface.toStr
      iinfo := info(qname)
      populateCtorsAndMethods(type, iinfo, slots)
      populateFields(type, iinfo, slots)
      populateInterfaceSlots(type, iinfo, slots)
    }
  }

  private NJavaType? getBase(NJavaType nfo)
  {
    nfo.superClass == null ? null : info(nfo.superClass.toStr)
  }

  private Void populateInterfaces(JavaType type, NJavaType info)
  {
    if(info.interfaces.isEmpty) return
    type.mixins = info.interfaces.map |NTypeRef interface -> CType|
    {
      fanType(type.pod.bridge, interface)
    }
    //echo("Interfaces for $type - $type.mixins")
  }
  
  private Void populateAccessAndBase(JavaType type, NJavaType info)
  {
    type.flags = classFlags(info.flags)
    NTypeRef? superClass := null
    if(info.superClass != null)
    {
      type.base = fanType(type.pod.bridge, info.superClass)
      //echo("type.base - $type.base")
    }
  }
  
  private Void populateArray(JavaType type, JavaType arrayOf, Str:CSlot slots)
  {
    //assume that arrayOf and arrayKind are set,
    //so we will just populate it with methods from Object
    populateType(type, info("java.lang.Object"), slots)
  }
  
  private Int classFlags(Int access)
  {
    result := 0
    if(Flags.Abstract.isSet(access)) result = result.or(FConst.Abstract)
    if(Flags.Final.isSet(access)) result = result.or(FConst.Final)
    if(Flags.Interface.isSet(access)) result = result.or(FConst.Mixin)
    result = result.or(Flags.Public.isSet(access) ? FConst.Public : FConst.Internal)
    
    return result
  }
  
  private Int memberFlags(Int access)
  {
    result := 0
    if(Flags.Abstract.isSet(access)) result = result.or(FConst.Abstract)
    if(Flags.Static.isSet(access)) result = result.or(FConst.Static)
    result = result.or(Flags.Final.isSet(access) ? FConst.Final : FConst.Virtual)
    if(Flags.Public.isSet(access)) result = result.or(FConst.Public)
    else if(Flags.Private.isSet(access)) result = result.or(FConst.Private)
    else if(Flags.Protected.isSet(access)) result = result.or(FConst.Protected)
    else result = result.or(FConst.Internal)
    return result
  }
  
  private CType fanType(JavaBridge bridge, NTypeRef? type, Bool multidim := false)
  {
    ns := bridge.ns

    if (null == type)
    {
      return ns.voidType
    }
    
    primitive := primitiveType(bridge, type)
    if(primitive != null) return primitive
    
    if(type.isArray)
    {
      return arrayType(bridge, type)
      //handle arrays later
    }
    
    if(!multidim)
    {
      direct := directType(ns, type)?.toNullable
      if(direct != null) return direct
    }

    
    qname := type.toStr
    indexr := qname.indexr(".")
    //echo("qname - $qname")
    package := qname[0..<indexr]
    name := qname[indexr+1..-1]
    
    if(package == "fan.sys") return ns.resolveType("sys::$name?")
    return ns.resolveType("[java]${package}::${name}?")
  }
  
  private CType arrayType(JavaBridge bridge, NTypeRef type)
  {
    ns := bridge.ns
    elemType := type.elemType

    if(!elemType.isArray)
    {
      switch(elemType.toStr)
      {
          case "boolean": return ns.resolveType("[java]fanx.interop::BooleanArray?")
          case "byte": return ns.resolveType("[java]fanx.interop::ByteArray?")
          case "short": return ns.resolveType("[java]fanx.interop::ShortArray?")
          case "char": return ns.resolveType("[java]fanx.interop::CharArray?")
          case "int": return ns.resolveType("[java]fanx.interop::IntArray?")
          case "long": return ns.resolveType("[java]fanx.interop::LongArray?")
          case "float": return ns.resolveType("[java]fanx.interop::FloatArray?")
          case "double": return ns.resolveType("[java]fanx.interop::DoubleArray?") 
      }
      
    }
    elemResult := fanType(bridge, elemType, true).toNonNullable
    if(elemResult isnot JavaType) throw Err("Not JavaType: $elemType -> $elemResult")
    return ((JavaType)elemResult).toArrayOf.toNullable
  }
  
  private static CType? directType(CNamespace ns, NTypeRef type)
  {
    switch(type.toStr)
    {
      case "java.lang.Object" : return ns.objType
      case "java.lang.String" : return ns.strType
      case "java.math.BigDecimal" : return ns.decimalType
      default: return null
    }
  }
  
  private static CType? primitiveType(JavaBridge bridge, NTypeRef type, Bool multidim := false)
  {
    ns := bridge.ns
    primitives := bridge.primitives
    switch(type.toStr)
    {
      case "void": return ns.voidType
      case "boolean" : return multidim? primitives.booleanType : ns.boolType
      case "long" : return multidim? primitives.longType : ns.intType
      case "double" : return multidim? primitives.doubleType : ns.floatType
      case "int" : return primitives.intType
      case "byte": return primitives.byteType
      case "short": return primitives.shortType
      case "char": return primitives.charType
      case "float": return primitives.floatType
    }
    return null
  }
}


