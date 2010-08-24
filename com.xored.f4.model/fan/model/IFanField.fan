//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 5, 2010 - Initial Contribution
//

const mixin IFanField : IFanSlot
{
  override Bool isField() {return true}
  override Bool isMethod() {return false}
}