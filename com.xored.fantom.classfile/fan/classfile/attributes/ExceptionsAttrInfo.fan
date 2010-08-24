//
// Copyright (c) 2010, xored software, Inc.
// Licensed under the Academic Free License version 3.0
//
// History:
//   21 Apr 10  Andrey Talnikov  Initial Contribution
//

**
** ExceptionsAttrInfo
**
internal const class ExceptionsAttrInfo
{
  const Int[] exceptionIndexTable

  new make(|This|? f) { f?.call(this) }

  static ExceptionsAttrInfo fromStream(InStream istream)
  {
    ExceptionsAttrInfo
    {
      Int[] readExceptionIndexTable := [,]
      Int numberOfExceptions := istream.readU2
      numberOfExceptions.times
      {
        readExceptionIndexTable.add(istream.readU2)
      }
      exceptionIndexTable = readExceptionIndexTable
    }
  }
}
