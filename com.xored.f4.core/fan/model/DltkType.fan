//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   ivaninozemtsev Apr 30, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.core::IType
using [java] org.eclipse.dltk.core::IModelElement
using [java] org.eclipse.dltk.core::IField
using [java] org.eclipse.dltk.core::IMethod
using f4model

**
**
**
internal const class DltkType : IFanType, Flags
{
  override const Str pod 
  override const Str name
  override const Str qname
  
  override protected const Str:IFanSlot slotsMap
  override const Str[] inheritance
  override const Int flags
  
  // TODO: Get rid of Unsafe for God's sake
  private const Unsafe meHolder
  override IModelElement? me() { meHolder.val }

  override const Str[] params
  override const Str:IFanType parametrization
  override const Str genericQname
  override const Bool isNullable

  new make(Str pod, IType type, [Str:IFanType]? parametrization := null)
  {
    this.pod = pod
    this.name = type.getElementName
    this.qname = "$pod::$name"
    this.flags = type.getFlags
    this.meHolder = Unsafe(type)
    this.inheritance = type.getSuperClasses
    this.isNullable = false
    slotsMap = [Str:IFanSlot][:].setList(
      type.getFields.map |IField f->IFanField| { DltkField(this, f) }
    ) { it.name }.setList(
      type.getMethods.map |IMethod m->IFanMethod| { DltkMethod(this, m) }
    ) { it.name }

    if (qname == "sys::List")
    {
      this.params = ["sys::L", "sys::V"]
      resultParametrization := parametrization ?: [:]
      resultParametrization["sys::L"] = this
      this.parametrization = resultParametrization
      this.genericQname = isGeneric ? qname : (this.parametrization["sys::V"].genericQname + "[]")
    } else if (qname == "sys::Map")
    {
      this.params = ["sys::M", "sys::K", "sys::V"]
      resultParametrization := parametrization ?: [:]
      resultParametrization["sys::M"] = this
      this.parametrization = resultParametrization
      this.genericQname = isGeneric ? qname :
        ("[" + this.parametrization["sys::K"].genericQname + ":" + this.parametrization["sys::V"].genericQname + "]")
    } else if (qname == "sys::Func")
    {
      this.params = ["sys::R"]
      this.parametrization = parametrization ?: [:]
      this.genericQname = qname
    }
    else
    {
      this.params = [,]
      this.parametrization = parametrization ?: [:]
      this.genericQname = qname
    }
  }
  
  override DltkType parameterize(Str:IFanType parametrization)
  {
    return DltkType(pod, me as IType, [:].addAll(this.parametrization).addAll(parametrization))
  }

  **
  ** Substitutes type parameter with actual type if possible, otherwise returns 'type'.
  ** Handles nullable types.
  ** 
  Str evaluateType(Str type)
  {
    splitted := ParseUtil.splitByQnames(type)
    replaced := splitted.map { parametrization[it]?.genericQname ?: it }
    return replaced.join
  }
 
  override Str toStr() { genericQname }
  
  override IFanType toNullable() {
    RtNullableType(this)
  }
}
