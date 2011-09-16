using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.core::IProjectFragment as Fragment
using "[java]com.xored.fanide.internal.core.model"::PodFragment
using "[java]org.eclipse.dltk.internal.launching"::InterpreterContainer
using f4model
using f4parser

internal class ScriptNamespace : IFanNamespace
{
  private IScriptProject project
  private Str:Fragment[] fragmentsByPod
  private Str:IFanPod pods := [:]
  private const Str currPodName
  new make(FantomProject fp,Str source)
  {
    project = fp.scriptProject
    currPodName = "build\$fan"
    vis := CreationVisitor(currPodName)
    StructureParser(source,vis).parseUnit()
    currPod = vis.pod
    install := fp.scriptProject.exists ? fp.getInterpreterInstall : null
    if (install != null)
    {
      bpes := InterpreterContainer.getBuildpathEntries(install)
      bpesByPod := Str:IBuildpathEntry[:].addList(bpes) { getPath.removeFileExtension.lastSegment }
      fragmentsByPod = bpesByPod.findAll |v,k| { vis.usings.contains(k) }.map { [PodFragment(project,it)] }
      podNames = fragmentsByPod.keys.add(currPodName)
    }
    else
    {
      fragmentsByPod = [:]
      podNames = [currPodName]
    }
  }
  
  override const Str[] podNames
  override const IFanPod currPod
  override IFanPod? findPod(Str name)
  {
    if (currPodName == name) return currPod
    if (name.startsWith("[java]")) return FfiPod(project.getProject,name)
    if (fragmentsByPod.containsKey(name))  
      return pods.getOrAdd(name) |->Obj| { DltkPod(name, fragmentsByPod[name]) }
    return null
  }
}

internal class CreationVisitor : StructureVisitor
{
  const Str podName
  Str[] usings := ["sys"] { private set }
  IFanPod? pod { private set }
  private IFanType[] types := [,]
  private Str typeName := ""
  private Int flags
  private Str[] superTypes := [,]
  private |IFanType->IFanSlot|[] slots := [,] 
  new make(Str podName)
  {
    this.podName = podName
  }
  override Void visitUsing(Int start, Int end, Str name, Str? asName)
  {
    usings.add(name)
  }
  override Void endVisitModule(Int end)
  {
    pod = ScriptPod(podName,types)
    types = [,]
  }
  override Void visitType(Int start, Int flags, TokenVal name, Str[] superTypes)
  {
    typeName = name.val
    this.flags = flags
    this.superTypes = superTypes
  }
  override Void endVisitType(Int end)
  {
    types.add(ScriptType(podName,typeName,flags,superTypes,slots))
    slots = [,]
  }
  override Void visitField(Int start, Int flags, Str? type, TokenVal name) {
    slots.add { ScriptField(it, name.val, flags, type) }
  }
  override Void visitMethod(Int start, Int flags, Str? type, TokenVal name,
    Str[] parameterTypes, Str[] parameterNames, Str?[] parameterInitializers)
  {
    slots.add { ScriptMethod(it, name.val, flags, type, parameterTypes, parameterNames, parameterInitializers) }      
  }
}

internal const class ScriptPod : IFanPod
{
  new make(Str name,IFanType[] types)
  {
    this.name = name
    this.typeNames = types.map { it.name }
    this.types = Str:IFanType[:].addList(types) { it.name }
  }
  override IFanType? findType(Str name, Bool checked := true)
  {
    types[name] ?: (checked ? throw UnknownTypeErr() : null)
  }
  override const Str name
  override const Str[] typeNames
  private const Str:IFanType types
}

internal const class ScriptMethod : ScriptSlot, IFanMethod
{
  new make(IFanType container, Str slotName, Int flags, Str? type, Str[] parameterTypes,
    Str[] parameterNames, Str?[] parameterInitializers) : super(container, slotName, flags, type)
  {
    params = parameterTypes.map |v,i| { SimpleParam(v, parameterNames[i], parameterInitializers[i]) }
  }
  override const IFanParam[] params
}

const class SimpleParam : IFanParam
{
  new make(Str type, Str name, Str? init)
  {
    this.name = name
    of = type
    hasDefault = init != null
  }
  override const Str name
  override const Str of
  override const Bool hasDefault
}

internal abstract const class ScriptSlot : IFanSlot, Flag
{
  new make(IFanType container, Str slotName, Int flags, Str? type)
  {
    parent = container.qname
    of = type ?: parent
    this.type = container
    name = slotName
    this.flags = flags
    this.qname = parent + "." + name
  }
  override const Str of
  override const Str parent
  override const IFanType type
  override const Str name
  override const Str qname
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
  override Bool isSynthetic() { false }
  override Bool isVirtual() { flags.and(Virtual) != 0 }
}

internal const class ScriptField : ScriptSlot,IFanField
{
  new make(IFanType container, Str slotName, Int flags, Str type)
    : super(container, slotName, flags, type)
  {
  }
}
  
internal const class ScriptType : IFanType, Flag
{
  new make(Str podName,Str typeName,Int flags,Str[] superTypes,|IFanType->IFanSlot|[] slots)
  {
    pod = podName
    name = typeName
    qname = podName + "::" + typeName
    inheritance = superTypes
    this.flags = flags
    slotsMap = Str:IFanSlot[:].addList(slots.map { it(this) }) { it.name }
  }
  override const Str pod
  override const Str name
  override const Str qname
  override const Str[] inheritance
  private const Int flags
  override Bool isAbstract() { flags.and(Abstract) != 0 }
  override Bool isClass() { flags.and(Mixin.or(Flag.Enum)) == 0 }
  override Bool isConst() { flags.and(Const) != 0 }
  override Bool isEnum() { flags.and(Flag.Enum) != 0 }
  override Bool isFinal() { flags.and(Final) != 0 }
  override Bool isInternal() { flags.and(Internal) != 0 }
  override Bool isMixin() { flags.and(Mixin) != 0 }
  override Bool isPublic() { flags.and(Public) != 0 }
  override Bool isFacet() { flags.and(Flag.Facet) != 0 }
  override Bool isSynthetic() { false }
  override Str[] params() { Str[,] }
  override IFanType parameterize(Str:IFanType parametrization) { throw UnsupportedErr("No user-defined generics") }
  override Str:IFanType parametrization() { [Str:IFanType][:] }
  override Str genericQname() { qname }
  override IFanType toNullable() { RtNullableType(this) }
  override Bool isNullable() { false }
  override protected const Str:IFanSlot slotsMap
}
