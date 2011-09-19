//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   vkuzkokov Aug 30, 2010 - Initial Contribution
//

const class RtNullableType : IFanType
{
  const IFanType type
  new make(IFanType type)
  {
    this.type = type
  }
  
  override const Bool isMixin := false
  override const Bool isClass := false
  override Str:IFanSlot slotsMap() { type.slotsMap }
  override Str[] params() { type.params }
  override Str:IFanType parametrization() { type.parametrization }
  override IFanType parameterize(Str:IFanType parameterization) {
    type.parameterize(parametrization).toNullable
  }
  override const Bool isSynthetic := false
  override Str[] inheritance() { type.inheritance }
  override Bool isAbstract() { type.isAbstract }
  override Str qname() { type.qname }
  override Bool isInternal() { type.isInternal }
  override Str name() { type.name }
  override Bool isConst() { type.isConst }
  override Bool isPublic() { type.isPublic }
  override Bool isFinal() { type.isFinal }
  override Bool isEnum() { type.isEnum }
  override Str pod() { type.pod }
  override Str genericQname() { type.genericQname + "?" }
  override Str toStr() { genericQname }
  override const IFanType toNullable := this
  override const Bool isNullable := true
  override Bool isFacet() { type.isFacet }
  override Str? findImportedType(Str name) {type.findImportedType(name)}
}
