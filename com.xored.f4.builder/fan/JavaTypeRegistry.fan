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
using [java]org.eclipse.jdt.core::IPackageFragmentRoot
using [java]org.eclipse.jdt.core::IJavaProject
using [java]org.eclipse.jdt.core::IParent
using [java]org.eclipse.jdt.core::IField
using [java]org.eclipse.jdt.core::Signature
using [java]org.eclipse.jdt.core::Flags
using [java]org.eclipse.jdt.core::IType
using [java]org.eclipse.jdt.core::IMethod
using [java]org.eclipse.jdt.core::IMember
using [java]org.eclipse.jdt.core::IJavaElement
using [java]com.xored.fanide.core::FanCore
using [java]com.xored.fanide.core::JDTSupport

class JavaTypeRegistry
{
  private Str:IPackageFragment[] fragments := [:]
  new make(F4Cp cp, IJavaProject? project)
  {
    this.cp = cp
    this.project = project
    
    IPackageFragmentRoot[] roots := project.getAllPackageFragmentRoots
    IPackageFragment[] allFragments := roots.map { it.getChildren.findAll {it is IPackageFragment }}.flatten
  
    allFragments.each {
       IPackageFragment[] fragment := this.fragments.getOrAdd(it.getElementName) |->IPackageFragment[]| { IPackageFragment[,] }
       fragment.add(it)
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
    echo("Asm loading $qname")
    if( qname.index("ArrayList") != null )
    {
      echo("a1")
    }
    populateTypeQName(type, slots, qname)
  }
  private Void populateTypeQName(JavaType type, Str:CSlot slots, Str qname)
  {
    IType? resultType := findType(qname)
    if( resultType != null)
    {
      populateType(type, resultType, slots)
    }
  }
  private IType? findType(Str qname)
  {    
    ind := qname.indexr(".")
    if( ind == null) return null
    pkgName := qname[0..ind-1]
    if( this.fragments.containsKey(pkgName))
    {
      IPackageFragment[] fragments := this.fragments[pkgName]
      IType? resultType := fragments.eachWhile { findTypeFrom(it, qname) }
      return resultType
    }
    else
    {
      // probable inner class, try to locate it
      lqname := qname.split('.')
      fi := 0
      for( i := 0; i < lqname.size-1;i++)
      {
        lpkg := lqname[0..i].join(".")
        lpkg2 := lqname[0..i+1].join(".")
        if( fragments.containsKey(lpkg) && !fragments.containsKey(lpkg2))
        {
          lname := lqname[i+1..-1].join("\$")
          return findType(lpkg +"." + lname)
        }
      }      
    }
    return null
  }
  
  private IType? findTypeFrom(IParent? element, Str qname)
  {
    IJavaElement[]? childs := element.getChildren
    IJavaElement[] result := [,]
    childs.each | IJavaElement childElement |
    {
      if( childElement.getElementType == IJavaElement.TYPE )
      {
        IType typeElement := (IType)childElement
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
          return
        }
      }
    }
    if( result.size > 0)
    {
      return result.first
    }
    return null
  }
  
  private Void populateType(JavaType type, IType info, Str:CSlot result)
  {
    populateAccessAndBase(type, info)
    populateInterfaces(type, info)
    
    slots := [Str:CSlot[]][:]
    populateCtorsAndMethods(type, info, slots)
    islots := [Str:CSlot[]][:]
    populateInterfaceSlots(type, info, slots)
    populateFields(type, info, slots)
    result.addAll(collapseSlots(slots))
    
    if( !result.containsKey("<init>"))
    {
      // Add one default contructor if doesn't persist
      ctor := JavaMethod()
      ctor.parent = type
      ctor.name = "<init>"
      ctor.flags = FConst.Public.or(FConst.Ctor).or(FConst.Virtual)
      ctor.returnType = type
      ctor.setParamTypes([,])
      result["<init>"] = ctor
    }
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

  
  private Void populateFields(JavaType type, IType info, [Str:JavaSlot[]] slots)
  {    
    fieldHandler := |IField f->Void|
    {
      result := JavaField()
      result.parent = type
      result.name = f.getElementName
      result.flags = memberFlags(f.getFlags)
      result.fieldType = fanType(type.pod.bridge, f.getTypeSignature, false, info)
      
      //try to find slot with the same parameters
      if(!slots.containsKey(result.name)) slots[result.name] = [result]
    }
    fieldFilter := |IField? f->Bool|
    {
      f != null || Flags.AccPublic.and(f.getFlags) != 0 || Flags.AccProtected.and(f.getFlags) != 0
    }
    IType? base := info
    while(base != null)
    {
      base.getFields.findAll(fieldFilter).each(fieldHandler)
      base = getBase(base)
    }
  }

  private Void populateCtorsAndMethods(JavaType type, IType info, [Str:JavaSlot[]] slots)
  {
    methodHandler := |IMethod m->Void|
    {
      isCtor := m.isConstructor
      result := JavaMethod()
      result.parent = type
      if( !isCtor ) result.name = m.getElementName
      else result.name = "<init>"
      if( result.name == "<clinit>")
      {
        // Skip interface initialization method
        return
      }
      result.flags = memberFlags(m.getFlags).or(isCtor ? FConst.Ctor : 0)
      returnTypeName := m.getReturnType
      
      result.returnType = isCtor ? type : fanType(type.pod.bridge, returnTypeName, false, info)
      
      result.setParamTypes(m.getParameterTypes.map { fanType(type.pod.bridge, it, false, info)})
      //echo(" method "+ result.name + "(" + result.params +")")
      
      list := slots.getOrAdd(result.name) |->JavaSlot[]| { JavaSlot[,] }
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
      m != null || Flags.AccPublic.and(m.getFlags) != 0 || Flags.AccProtected.and(m.getFlags) != 0
    }
    info.getMethods.findAll(methodFilter).each(methodHandler)
    
    if(Flags.AccInterface.and(info.getFlags) != 0 && getBase(info) != null &&
      getBase(info).getFullyQualifiedName('$') == "java.lang.Object" ) 
      return

    IType? base := info
    while((base = getBase(base)) != null)
      base.getMethods.exclude { it == null }.findAll(methodFilter).each(methodHandler)
  }

  private Void populateInterfaceSlots(JavaType type, IType nfo, [Str:JavaSlot[]] slots)
  {
    if(nfo.getSuperInterfaceNames.isEmpty) return
    nfo.getSuperInterfaceNames.each |interface|
    {
      IType? t := findType(interface)
      if( t == null)
      {
        Str?[]? resolve := JDTSupport.resolve(nfo, interface)
        if( resolve != null && resolve.size > 0) {
          t = findType(resolve[0]) 
        }
      }
      if( t != null)  
      {
        populateCtorsAndMethods(type, t, slots)
        populateFields(type, t, slots)
        populateInterfaceSlots(type, t, slots)
      } 
    }
  }

  private IType? getBase(IType nfo)
  {
    if( nfo.getSuperclassName == null)
    {
      return null
    }
    IType? t := findType(nfo.getSuperclassName)
    if( t != null) return t
    Str?[]? resolve := JDTSupport.resolve(nfo, nfo.getSuperclassName)
    if( resolve != null && resolve.size > 0) {
      return findType(resolve[0])
    }
    return null
  }

  private Void populateInterfaces(JavaType type, IType info)
  { 
    if(info.getSuperInterfaceNames.isEmpty) return
    type.mixins = info.getSuperInterfaceTypeSignatures.exclude { it == null }.map |Str interface -> CType|
    {
      return fanType(type.pod.bridge, interface, false, info)
    }
    //echo("Interfaces for $type - $type.mixins")
  }
  
  private Void populateAccessAndBase(JavaType type, IType info)
  {
    type.flags = classFlags(info.getFlags)
    IType? superClass := null
    if( info.getSuperclassTypeSignature != null )
    { 
       type.base = fanType(type.pod.bridge, info.getSuperclassTypeSignature, false, info)
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
    if(Flags.AccAbstract.and(access) != 0) result = result.or(FConst.Abstract)
    if(Flags.AccFinal.and(access) != 0) result = result.or(FConst.Final)
    if(Flags.AccInterface.and(access) != 0) result = result.or(FConst.Mixin)
    result = result.or((Flags.AccPublic.and(access) != 0) ? FConst.Public : FConst.Internal)
    
    return result
  }
  
  private Int memberFlags(Int access)
  {
    result := 0
    if(Flags.AccAbstract.and(access) != 0) result = result.or(FConst.Abstract)
    if(Flags.AccStatic.and(access) != 0) result = result.or(FConst.Static)
    result = result.or((Flags.AccFinal.and(access) != 0) ? FConst.Final : FConst.Virtual)
    if(Flags.AccPublic.and(access) != 0) result = result.or(FConst.Public)
    else if(Flags.AccPrivate.and(access) != 0) result = result.or(FConst.Private)
    else if(Flags.AccProtected.and(access) != 0) result = result.or(FConst.Protected)
    else result = result.or(FConst.Internal)
    return result
  }
  
  private CType fanType(JavaBridge bridge, Str? type, Bool multidim, IType? info)
  {
    ns := bridge.ns

    if (null == type)
    {
      return ns.voidType
    }
     
    primitive := primitiveType(bridge, type, false, info)
    if(primitive != null) return primitive
    
    if(Signature.getArrayCount(type) > 0) 
    {
      return arrayType(bridge, type, info)
      //handle arrays later
    }
    
    if(!multidim)
    {
      direct := directType(ns, type, info)?.toNullable
      if(direct != null) return direct
    }
    
    if( Signature.getTypeSignatureKind(type) == Signature.TYPE_VARIABLE_SIGNATURE)
    {
      type = Signature.createTypeSignature("java.lang.Object", true);
    }
    
    type = Signature.getTypeErasure(type)
    package := Signature.getSignatureQualifier(type)
    name := Signature.getSimpleName(type)
    if( name.endsWith(";"))
    {
      name = name[0..-2]
    }
    if( package.size == 0) {
      Str?[]? resultName := JDTSupport.resolve(info, Signature.toString(type))
      if( resultName != null && resultName.size > 0) 
      {
        package = resultName[0]
        pind := package.indexr(".")
        name = package[pind+1.. -1]
        if( pind != null) package = package[0.. pind-1]
      }
    }
    if( !fragments.containsKey(package))
    {
      // probable inner class, try to locate it
      lqname := (package + "." + name).split('.')
      fi := 0
      for( i := 0; i < lqname.size-1;i++)
      {
        lpkg := lqname[0..i].join(".")
        lpkg2 := lqname[0..i+1].join(".")
        if( fragments.containsKey(lpkg) && !fragments.containsKey(lpkg2))
        {
          lname := lqname[i+1..-1].join("\$")
          if(lpkg == "fan.sys") return ns.resolveType("sys::$lname?")
          return ns.resolveType("[java]${lpkg}::${lname}?")
        }
      }      
    }
    if( name == "Void" || name == "String")
    {
      echo("\$")
    }
    if(package == "fan.sys") return ns.resolveType("sys::$name?")
    return ns.resolveType("[java]${package}::${name}?")
  }
  
  private CType arrayType(JavaBridge bridge, Str? type, IType? info)
  {
    ns := bridge.ns

    if(Signature.getArrayCount(type) == 1)
    {
      ttype := type [1..-1]
      tName := Signature.toString(Signature.getSimpleNames(ttype).join("."))
      
//      Str?[]? resultName := JDTSupport.resolve(info, tName)
//      if( resultName != null && resultName.size > 0) tName = resultName[0]
      
      switch(tName)
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
    if( Signature.getArrayCount(type) > 0)
    {
      // Remove one ARRAY qualifier
      type = type [1..-1]
     }
    
    elemResult := fanType(bridge, type, true, info).toNonNullable
    if(elemResult isnot JavaType) throw Err("Not JavaType: $type -> $elemResult")
    return ((JavaType)elemResult).toArrayOf.toNullable
  }
  
  private static CType? directType(CNamespace ns, Str? type, IType? info)
  {
    type = Signature.getTypeErasure(type)
    tName := Signature.toString(Signature.getSimpleNames(type).join("."))
    if( tName.index(".") == null)
    {
      Str?[]? resultName := JDTSupport.resolve(info, tName)
      if( resultName != null && resultName.size > 0) tName = resultName[0]
    }
    switch(tName)
    {
      case "java.lang.Object" : return ns.objType
      case "java.lang.String" : return ns.strType
      case "java.math.BigDecimal" : return ns.decimalType
      default: return null
    }
  }
  
  private static CType? primitiveType(JavaBridge bridge, Str? type, Bool multidim, IType? info)
  {
    ns := bridge.ns
    primitives := bridge.primitives
    
    if( Signature.getQualifier(type).size != 0)
    {
      return null
    }
    sigName := Signature.getSimpleName(type)
    finalName := Signature.toString(sigName)
    
//    Str?[]? resultName := JDTSupport.resolve(info, finalName)
//    if( resultName != null && resultName.size > 0) finalName = resultName[0]
    
    switch(finalName)
    {
      case "void":return ns.voidType
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


