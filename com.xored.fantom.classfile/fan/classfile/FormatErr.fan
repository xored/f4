//
// Copyright (c) 2010, xored software, Inc.
// Licensed under the Academic Free License version 3.0
//
// History:
//   21 Apr 10  Andrey Talnikov  Initial Contribution
//

**
** BadClassFileFormat
**
const class FormatErr : IOErr
{
  new make() : super("Bad class file format") {}
}
