//
// Copyright (c) 2010, xored software, Inc.
// Licensed under the Academic Free License version 3.0
//
// History:
//   21 Apr 10  Andrey Talnikov  Initial Contribution
//

**
** ClassFileAttr
**
const class ClassFileAttr
{
  const Int nameIndex
  private const Unsafe constBuf

  new make(|This|? f) { f?.call(this) }

  static ClassFileAttr fromStream(InStream istream)
  {
    ClassFileAttr
    {
      nameIndex = istream.readU2
      Int attrLength := istream.readU4
      constBuf = Unsafe(istream.readBufFully(null, attrLength))
    }
  }

  Buf info()
  {
    (Buf)constBuf.val
  }
}
