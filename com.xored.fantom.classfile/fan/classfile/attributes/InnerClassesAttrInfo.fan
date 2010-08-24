//
// Copyright (c) 2010, xored software, Inc.
// Licensed under the Academic Free License version 3.0
//
// History:
//   21 Apr 10  Andrey Talnikov  Initial Contribution
//

**
** InnerClassesAttrInfo
**
internal const class InnerClassesAttrInfo
{
  const ClassFileInnerClass[] classes := [,]

  new make(|This|? f) { f?.call(this) }

  static InnerClassesAttrInfo fromStream(InStream istream)
  {
    InnerClassesAttrInfo
    {
      ClassFileInnerClass[] readClasses := [,]
      Int numberOfClasses := istream.readU2
      numberOfClasses.times
      {
        readClasses.add(ClassFileInnerClass.fromStream(istream))
      }
      classes = readClasses
    }
  }
}
