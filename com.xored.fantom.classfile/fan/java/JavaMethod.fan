//
// Copyright (c) 2010, xored software, Inc.
// Licensed under the Academic Free License version 3.0
//
// History:
//   21 Apr 10  Andrey Talnikov  Initial Contribution
//

**
** JavaMethod
**
const class JavaMethod
{
  const Str name
  const Int flags
  const TypeRef[] exceptions
  const MethodDescr descr

  TypeRef? returns() { descr.returns }
  TypeRef[] params() { descr.params }
  new make(|This|? f) { f?.call(this) }

  override Str toStr()
  {
    result := StrBuf()
    result.add(Flags.strMethodFlags(flags)).add(" ")
    result.add(returns ?: "void")
    result.add(" $name(")
    result.add(params.join(", "))
    result.add(")")

    if (!exceptions.isEmpty)
    {
      result.add(" throws ")
      result.add(exceptions.join(", "))
    }

    return result.toStr.trim
  }
}
