//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Alena Repina Feb 18, 2010 - Initial Contribution
//

**
** These flags are used only in structure parser
** 
mixin Flag
{
  const static Int Abstract   := 0x00000001
  const static Int Const      := 0x00000002
  const static Int Ctor       := 0x00000004
  const static Int Enum       := 0x00000008
  const static Int Final      := 0x00000010
  const static Int Internal   := 0x00000020
  const static Int Mixin      := 0x00000040
  const static Int Native     := 0x00000080
  const static Int Override   := 0x00000100
  const static Int Private    := 0x00000200
  const static Int Protected  := 0x00000400
  const static Int Public     := 0x00000800
  const static Int Static     := 0x00001000
  const static Int Virtual    := 0x00002000
  const static Int Once       := 0x00004000
  const static Int Readonly   := 0x00008000
}