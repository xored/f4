//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 13, 2010 - Initial Contribution
//


using compiler
using compilerJava

using [java]org.eclipse.jdt.core.search
using [java]org.eclipse.jdt.core::IPackageFragment
using [java]org.eclipse.jdt.core::IJavaProject
using [java]org.eclipse.jdt.core::IParent
using [java]org.eclipse.jdt.core::IField
using [java]org.eclipse.jdt.core::Signature
using [java]org.eclipse.jdt.core::Flags
using [java]org.eclipse.jdt.core::IType as IJavaType
using [java]org.eclipse.jdt.core::IMethod
using [java]org.eclipse.jdt.core::IMember
using [java]org.eclipse.jdt.core::IJavaElement
using [java]com.xored.fanide.core::FanCore

class JavaTypeRegistry
{
  private Str:IPackageFragment[] fragments := [:]
  new make(F4Cp cp, IJavaProject? project)
  {
    this.cp = cp
    this.project = project
    IPackageFragment[]? fragments := project.getPackageFragments
    if( fragments != null)
    {
      fragments.each {
         IPackageFragment[] fragment := this.fragments.getOrAdd(it.getElementName) |->IPackageFragment[]| { IPackageFragment[,] }
         fragment.add(it)
      }
    }
  }
  private F4Cp cp
  private IJavaProject? project
    
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
    populateTypeQName(type, slots, qname)
  }
  private Void populateTypeQName(JavaType type, Str:CSlot slots, Str qname)
  {
    IJavaType? resultType := findType(qname)
    if( resultType != null)
    {
      populateType(type, resultType, slots)
    }
  }
  private IJavaType? findType(Str qname)
  {
    pkgName := qname[0..qname.indexr(".")]
    IJavaType? resultType := null
    if( this.fragments.containsKey(pkgName))
    {
      IPackageFragment[] fragments := this.fragments[pkgName]
      fragments.each |IPackageFragment f|
      {
        resultType = findTypeFrom(f, qname)
        if( resultType != null)
        {
          return
        }
      }
    }
    return resultType
  }
  
  private IJavaType? findTypeFrom(IParent? element, Str qname)
  {
    IJavaElement[]? childs := element.getChildren
    IJavaElement[] result := [,]
    childs.each | IJavaElement childElement |
    {
      if( childElement.getElementType == IJavaElement.TYPE )
      {
        IJavaType typeElement := (IJavaType)childElement
        ename := typeElement.getFullyQualifiedName('$')
        if( ename == qname)
        {
          result.add(childElement)
          return
        }
        
      }
      if( childElement is IParent && 
        !(childElement.getElementType == IJavaElement.FIELD || childElement.getElementType == IJavaElement.METHOD) )
      {
        res := findTypeFrom((IParent)childElement, qname)
        if( res != null)
        {
          result.add(res)
        }
      }
    }
    if( result.size > 0)
    {
      return result.first
    }
    return null
  }
  
  private Void populateType(JavaType type, IJavaType info, Str:CSlot result)
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

  
  private Void populateFields(JavaType type, IJavaType info, [Str:JavaSlot[]] slots)
  {    
    fieldHandler := |IField f->Void|
    {
      result := JavaField()
      result.parent = type
      result.name = f.getElementName
      result.flags = memberFlags(f.getFlags)
      result.fieldType = fanType(type.pod.bridge, f.getTypeSignature)
      slots[f.getElementName] = [result]
    }
    fieldFilter := |IField? f->Bool|
    {
      f != null || Flags.AccPublic.and(f.getFlags) != 0 || Flags.AccProtected.and(f.getFlags) != 0
    }
    IJavaType? base := info
    while(base != null)
    {
      base.getFields.findAll(fieldFilter).each(fieldHandler)
      base = getBase(base)
    }
  }

  private Void populateCtorsAndMethods(JavaType type, IJavaType info, [Str:JavaSlot[]] slots)
  {
    methodHandler := |IMethod m->Void|
    {
      isCtor := m.getElementName == "<init>"
      result := JavaMethod()
      result.parent = type
      result.name = m.getElementName
      result.flags = memberFlags(m.getFlags).or(isCtor ? FConst.Ctor : 0)
      result.returnType = isCtor ? type : fanType(type.pod.bridge, m.getReturnType)
      result.setParamTypes(m.getParameterTypes.map { fanType(type.pod.bridge, it)})
      
      list := slots.getOrAdd(m.getElementName) |->JavaSlot[]| { JavaSlot[,] }
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
    methodFilter := |IMethod? m->Bool|
    {
      m != null || Flags.AccPublic.and(m.getFlags) != 0 || Flags.AccProtected.and(m.getFlags) != 0 || m.getElementName == "<init>"
    }
    info.getMethods.findAll(methodFilter).each(methodHandler)
    
    //TODO: Need to write correct code here
//    if(Flags.AccInterface.and(info.getFlags) == info.getFlags &&
//      getBase(info).getFullQualifiedName() == "java.lang.Object" ) 
//      return

    IJavaType? base := info
    while((base = getBase(base)) != null)
      base.getMethods.exclude { it == null }.findAll(methodFilter).each(methodHandler)
  }

  private Void populateInterfaceSlots(JavaType type, IJavaType nfo, [Str:JavaSlot[]] slots)
  {
    if(nfo.getSuperInterfaceNames.isEmpty) return
    nfo.getSuperInterfaceNames.each |interface|
    { 
      t := findType(interface) 
      populateCtorsAndMethods(type, t, slots)
      populateFields(type, t, slots)
      populateInterfaceSlots(type, t, slots)
    }
  }

  private IJavaType? getBase(IJavaType nfo)
  {
    return findType(nfo.getSuperclassName)
  }

  private Void populateInterfaces(JavaType type, IJavaType info)
  { 
    if(info.getSuperInterfaceNames.isEmpty) return
    type.mixins = info.getSuperInterfaceNames?.exclude { it == null }.map |Str interface -> CType|
    {
      fanType(type.pod.bridge, interface)
    }
    //echo("Interfaces for $type - $type.mixins")
  }
  
  private Void populateAccessAndBase(JavaType type, IJavaType info)
  {
    type.flags = classFlags(info.getFlags)
    IJavaType? superClass := null
    if( info.getSuperclassName != null )
    {
      type.base = fanType(type.pod.bridge, info.getSuperclassName)
      //echo("type.base - $type.base")
    }
  }
  
  private Void populateArray(JavaType type, JavaType arrayOf, Str:CSlot slots)
  {
    //assume that arrayOf and arrayKind are set,
    //so we will just populate it with methods from Object
    populateTypeQName(type, slots, "java.lang.Object")
  }
  
  private Int classFlags(Int access)
  {
    result := 0
    if(Flags.AccAbstract.and(access) == access) result = result.or(FConst.Abstract)
    if(Flags.AccFinal.and(access) == access) result = result.or(FConst.Final)
    if(Flags.AccInterface.and(access) == access) result = result.or(FConst.Mixin)
    result = result.or((Flags.AccPublic.and(access) == access) ? FConst.Public : FConst.Internal)
    
    return result
  }
  
  private Int memberFlags(Int access)
  {
    result := 0
    if(Flags.AccAbstract.and(access) == access) result = result.or(FConst.Abstract)
    if(Flags.AccStatic.and(access) == access) result = result.or(FConst.Static)
    result = result.or((Flags.AccFinal.and(access) == access) ? FConst.Final : FConst.Virtual)
    if(Flags.AccPublic.and(access) == access) result = result.or(FConst.Public)
    else if(Flags.AccPrivate.and(access) == access) result = result.or(FConst.Private)
    else if(Flags.AccProtected.and(access) == access) result = result.or(FConst.Protected)
    else result = result.or(FConst.Internal)
    return result
  }
  
  private CType fanType(JavaBridge bridge, Str? type, Bool multidim := false)
  {
    ns := bridge.ns

    if (null == type)
    {
      return ns.voidType
    }
    
    primitive := primitiveType(bridge, type)
    if(primitive != null) return primitive
    
    if(Signature.getArrayCount(type) > 0) 
    {
      return arrayType(bridge, type)
      //handle arrays later
    }
    
    if(!multidim)
    {
      direct := directType(ns, type)?.toNullable
      if(direct != null) return direct
    }

    
    package := Signature.getQualifier(type)
    name := Signature.getSimpleName(type)
    
    if(package == "fan.sys") return ns.resolveType("sys::$name?")
    return ns.resolveType("[java]${package}::${name}?")
  }
  
  private CType arrayType(JavaBridge bridge, Str? type)
  {
    ns := bridge.ns

    if(Signature.getArrayCount(type) == 0)
    {
      switch(Signature.getSimpleName(type))
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
    elemResult := fanType(bridge, type, true).toNonNullable
    if(elemResult isnot JavaType) throw Err("Not JavaType: $type -> $elemResult")
    return ((JavaType)elemResult).toArrayOf.toNullable
  }
  
  private static CType? directType(CNamespace ns, Str? type)
  {
    
    tName := Signature.getQualifier(type) +"." + Signature.getSimpleName(type)
    switch(tName)
    {
      case "java.lang.Object" : return ns.objType
      case "java.lang.String" : return ns.strType
      case "java.math.BigDecimal" : return ns.decimalType
      default: return null
    }
  }
  
  private static CType? primitiveType(JavaBridge bridge, Str? type, Bool multidim := false)
  {
    ns := bridge.ns
    primitives := bridge.primitives
    switch(Signature.getSimpleName(type))
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


