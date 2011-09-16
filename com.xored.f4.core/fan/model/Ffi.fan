using [java]org.eclipse.core.resources::IProject
using [java]org.eclipse.jdt.core::IClassFile
using [java]org.eclipse.jdt.core::ICompilationUnit
using [java]org.eclipse.jdt.core::IField
using [java]org.eclipse.jdt.core::IMember
using [java]org.eclipse.jdt.core::IMethod
using [java]org.eclipse.jdt.core::IPackageFragmentRoot
using [java]org.eclipse.jdt.core::IType
using [java]org.eclipse.jdt.core::JavaCore
using [java]org.eclipse.jdt.core::Flags as JavaFlags
using [java]com.xored.fanide.core::JDTSupport

using f4model
using f4parser

internal const class FfiPod : IFanPod
{
  new make(IProject project, Str name)
  {
    this.name = name
    package := name[6..-1]
    allTypes := IFanType[,]
    JavaCore.create(project).getAllPackageFragmentRoots.each |IPackageFragmentRoot pfr|
    {
      pf := pfr.getPackageFragment(package)
      if (!pf.exists) return
      pf.getClassFiles.each |IClassFile cf|
      {
        primaryType := cf.findPrimaryType
        if(primaryType != null) allTypes.add(FfiType(name,primaryType))
      }
      pf.getCompilationUnits.each |ICompilationUnit cu|
      {
        cu.getAllTypes.each |IType t|
        {
          allTypes.add(FfiType(name,t))
        }
      }
    }
    this.typeNames = allTypes.map { it.name }
    this.types = Str:IFanType[:].setList(allTypes) { it.name }
  }
  override IFanType? findType(Str name, Bool checked := true)
  {
    types[name] ?: (checked ? throw UnknownTypeErr() : null)
  }
  override const Str name
  override const Str[] typeNames
  private const Str:IFanType types
}

internal const class FfiType : IFanType, Flag, IFfiForeigh
{
  new make(Str podName,IType type)
  {
    typeRef = Unsafe(type)
    pod = podName
    name = type.getTypeQualifiedName
    qname = podName + "::" + name
    superTypes := type.getSuperclassName == null?[,]:[type.getSuperclassName]
    superTypes.addAll(type.getSuperInterfaceNames)
    inheritance = superTypes.exclude { it == null }.map |Str name->Str| {
      javaName := name
      if( javaName.index(".") == null || javaName.index("\$") != null)
      {
        Str[]? val := JDTSupport.resolve((IType)typeRef.val, name)
        if( val != null && val.size ==1)
        {
          javaName = val[0]
        }
      }
      return toFanClass(javaName)
    }
    javaFlags := type.getFlags
   // if( type.isInterface) {
   //   javaFlags = javaFlags.or(JavaFlags.AccAbstract).or(JavaFlags.AccInterface)
   // }
    flags := 0
    if (JavaFlags.isAbstract(javaFlags)) flags = flags.or(Abstract)
    if (type.isEnum) flags = flags.or(Flag.Enum)
    if (JavaFlags.isFinal(javaFlags)) flags = flags.or(Final)
    if (JavaFlags.isPackageDefault(javaFlags)) flags = flags.or(Internal)
    if (type.isInterface) flags = flags.or(Mixin)
    if (JavaFlags.isPublic(javaFlags)) flags.or(Public)
    if (JavaFlags.isSynthetic(javaFlags)) isSynthetic = true
    this.flags = flags
    slots := IFanSlot[,]
    type.getFields.each |IField field|
    {
      slot := FfiField.tryMake(this,field)
      if (slot != null) slots.add(slot)
    }
    type.getMethods.each |IMethod method|
    {
      slot := FfiMethod.tryMake(this,method)
      if (slot != null) slots.add(slot)
    }
    
    
    
    slotsMap = Str:IFanSlot[:].setList(slots) { it.name }
  }
  static Str toFanClass(Str javaName)
  {
    switch (javaName)
    {
      case "java.lang.Boolean": return "sys::Bool"
      case "java.lang.Byte":
      case "java.lang.Short":
      case "java.lang.Char":
      case "java.lang.Int":
      case "java.lang.Long": return "sys::Int"
      case "java.lang.Float":
      case "java.lang.Double": return "sys::Float"
      case "java.lang.Object": return "sys::Obj"
      case "java.lang.String":  return "sys::Str"
      case "java.math.BigDecimal": return "sys::Decimal"
    }
    pos := javaName.indexr(".")
    podName := ""
    if (pos != null)
    {
      podName = javaName[0..<pos]
      javaName = javaName[pos+1..-1]
    }
    podName = podName.startsWith("fan.") ? podName[4..-1] : "[java]"+podName
    return podName+"::"+javaName
  }
  static Str toFan(Str javaName)
  {
    switch (javaName)
    {
      case "Z": return "sys::Bool"
      case "B":
      case "S":
      case "C":
      case "I":
      case "J": return "sys::Int"
      case "F":
      case "D": return "sys::Float"
      case "V": return "sys::Void"
      case "[Z": return "[java]fanx.interop::BooleanArray?"
      case "[B": return "[java]fanx.interop::ByteArray?"
      case "[S": return "[java]fanx.interop::ShortArray?"
      case "[C": return "[java]fanx.interop::CharArray?"
      case "[I": return "[java]fanx.interop::IntArray?"
      case "[J": return "[java]fanx.interop::LongArray?"
      case "[F": return "[java]fanx.interop::FloatArray?"
      case "[D": return "[java]fanx.interop::DoubleArray?"
    }
    if (javaName.startsWith("[")) return toFan(javaName[1..-1])+"[]?"
    return toFanClass(javaName[1..-2].replace("/", "."))+"?"
  }
  override const Str pod
  override const Str name
  override const Str qname
  override const Str[] inheritance
  private const Int flags
  const Unsafe typeRef
  override Obj? foreign() { typeRef.val }
  override Bool isAbstract() { flags.and(Abstract) != 0 }
  override Bool isClass() { flags.and(Mixin.or(Flag.Enum)) == 0 }
  override Bool isConst() { flags.and(Const) != 0 }
  override Bool isEnum() { flags.and(Flag.Enum) != 0 }
  override Bool isFinal() { flags.and(Final) != 0 }
  override Bool isInternal() { flags.and(Internal) != 0 }
  override Bool isMixin() { flags.and(Mixin) != 0 }
  override Bool isPublic() { flags.and(Public) != 0 }
  override Bool isFacet() { flags.and(Flag.Facet) != 0}
  override const Bool isSynthetic
  override Str[] params() { Str[,] }
  override IFanType parameterize(Str:IFanType parametrization) { throw UnsupportedErr("No user-defined generics") }
  override Str:IFanType parametrization() { [Str:IFanType][:] }
  override Str genericQname() { qname }
  override IFanType toNullable() { RtNullableType(this) }
  override Bool isNullable() { false }
  override protected const Str:IFanSlot slotsMap
}

internal abstract const class FfiSlot : IFanSlot, Flag, IFfiForeigh
{
  new make(IFanType container, IMember member)
  {
    this.member = Unsafe(member)
    parent = container.name
    this.type = container
    name = isCtor ? "make" : member.getElementName
    javaFlags := member.getFlags
    
//    IType mType := member.getParent
//    if( mType.isInterface)
//    {
//      if( member.getElementType == IMember.FIELD)
//      {
//        javaFlags = javaFlags.or(JavaFlags.AccPublic).or(JavaFlags.AccStatic).or(JavaFlags.AccFinal)
//      }
//      else if( member.getElementType == IMember.METHOD)
//      {
//        javaFlags = javaFlags.or(JavaFlags.AccPublic).or(JavaFlags.AccAbstract)
//      }
//    }
    
    flags := 0
    if (JavaFlags.isAbstract(javaFlags)) flags = flags.or(Abstract)
    if (member is IField && JavaFlags.isFinal(javaFlags)) flags = flags.or(Const)
    if ((member as IMethod)?.isConstructor == true) flags = flags.or(Ctor)
    if (JavaFlags.isPackageDefault(javaFlags)) flags = flags.or(Internal)
    flags = flags.or(Native)
    if (JavaFlags.isPrivate(javaFlags)) flags = flags.or(Private)
    if (JavaFlags.isProtected(javaFlags)) flags = flags.or(Protected)
    if (JavaFlags.isPublic(javaFlags)) flags = flags.or(Public)
    if (JavaFlags.isStatic(javaFlags)) flags = flags.or(Static)
    if (JavaFlags.isSynthetic(javaFlags)) isSynthetic = true
    if (member is IMethod && !JavaFlags.isFinal(javaFlags)) flags = flags.or(Virtual)
    this.flags = flags
    this.qname = parent + "." + name 
  }
  static Bool isInvisible(IMember member)
  {
    javaFlags := member.getFlags
    return JavaFlags.isPrivate(javaFlags)
  }
  override Obj? foreign() { member.val }
  override const Str parent
  override const IFanType type
  override const Str name
  override const Str qname
  protected const Unsafe member
  private const Int flags
  override Bool isAbstract() { flags.and(Abstract) != 0 }
  override Bool isConst() { flags.and(Const) != 0 }
  override Bool isCtor() { flags.and(Ctor) != 0 }
  override Bool isInternal() { flags.and(Internal) != 0 }
  override Bool isNative() { flags.and(Native) != 0 }
  override Bool isOverride() { flags.and(Override) != 0 }
  override Bool isPrivate() { flags.and(Private) != 0 }
  override Bool isProtected() { flags.and(Protected) != 0 }
  override Bool isPublic() { flags.and(Public) != 0 }
  override Bool isStatic() { flags.and(Static) != 0 }
  override const Bool isSynthetic
  override Bool isVirtual() { flags.and(Virtual) != 0 }
}

internal const class FfiField : FfiSlot, IFanField
{
  static FfiField? tryMake(IFanType container, IField field)
  {
    if (FfiSlot.isInvisible(field))
      return null
    return FfiField(container, field)
  }
  private new make(IFanType container, IField field) : super(container, field)
  {
    of = FfiType.toFan(field.getTypeSignature)
  }
  override const Str of
}

internal const class FfiMethod : FfiSlot, IFanMethod
{
  static FfiMethod? tryMake(IFanType container, IMethod method)
  {
    return FfiMethod(container, method)
  }
  private new make(IFanType container, IMethod method) : super(container, method)
  {
    of = isCtor ? container.qname : FfiType.toFan(method.getReturnType)
  }
  override const Str of
  private const Unsafe paramsResult := Unsafe(IFanParam[]?[null])
  override IFanParam[] params() 
  {
    IMethod method := member.val()
    if (FfiSlot.isInvisible(method) || method.getElementName == "<clinit>")
      return IFanParam[,]

    IFanParam[]?[] lazyResult := paramsResult.val()
    if (lazyResult[0] == null )
    { 
      names := method.getParameterNames
      types := method.getParameterTypes
      if (names.size != types.size )
        return IFanParam[,]
      lazyResult[0] = types.map |v,i| { SimpleParam(FfiType.toFan(v), names[i], null) }
    }
    return lazyResult[0]
  }
}
