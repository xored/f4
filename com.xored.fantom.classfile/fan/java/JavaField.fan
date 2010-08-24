//
// Copyright (c) 2010, xored software, Inc.
// Licensed under the Academic Free License version 3.0
//
// History:
//   21 Apr 10  Andrey Talnikov  Initial Contribution
//

**
** JavaField
**
const class JavaField
{
  const Str name
  const TypeRef type
  const Int flags

  new make(|This|? f) { f?.call(this) }

  override Str toStr()
  {
    "${Flags.strFieldFlags(flags)} $type $name".trim
  }
}
