//
// Copyright (c) 2010, xored software, Inc.
// Licensed under the Academic Free License version 3.0
//
// History:
//   21 Apr 10  Andrey Talnikov  Initial Contribution
//

**
** ClassFileInnerClass
**
internal const class ClassFileInnerClass
{
  const Int innerClassInfoIndex
  const Int outerClassInfoIndex
  const Int innerNameIndex
  const Int innerClassAccessFlags

  new make(|This|? f) { f?.call(this) }

  static ClassFileInnerClass fromStream(InStream istream)
  {
    ClassFileInnerClass
    {
      innerClassInfoIndex = istream.readU2
      outerClassInfoIndex = istream.readU2
      innerNameIndex = istream.readU2
      innerClassAccessFlags = istream.readU2
    }
  }
}
