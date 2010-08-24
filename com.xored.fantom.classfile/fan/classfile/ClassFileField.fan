//
// Copyright (c) 2010, xored software, Inc.
// Licensed under the Academic Free License version 3.0
//
// History:
//   21 Apr 10  Andrey Talnikov  Initial Contribution
//

**
** ClassFileField
**
const class ClassFileField
{
  const Int accessFlags
  const Int nameIndex
  const Int descriptorIndex
  const ClassFileAttr[] attrs

  new make(|This|? f) { f?.call(this) }

  static ClassFileField fromStream(InStream istream)
  {
    ClassFileField
    {
      accessFlags = istream.readU2
      nameIndex = istream.readU2
      descriptorIndex = istream.readU2
      Int attrsCount := istream.readU2

      ClassFileAttr[] readAttrs := [,]
      attrsCount.times
      {
        readAttrs.add(ClassFileAttr.fromStream(istream))
      }
      attrs = readAttrs
    }
  }
}
