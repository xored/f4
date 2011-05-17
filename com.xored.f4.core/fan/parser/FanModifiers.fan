//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse  License version 1.0
//
// History:
//   ivaninozemtsev May 5, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.ast::Modifiers
**
** Fantom extension of DLTK type/slot modifiers 
**
mixin FanModifiers : Modifiers {
  static const Int AccInternal := 1.shiftl(USER_MODIFIER)
  static const Int AccMixin := 1.shiftl(USER_MODIFIER + 1)
  static const Int AccEnum := 1.shiftl(USER_MODIFIER + 2)
  static const Int AccNative := 1.shiftl(USER_MODIFIER + 3)
  static const Int AccOverride := 1.shiftl(USER_MODIFIER + 4)
  static const Int AccReadOnly := 1.shiftl(USER_MODIFIER + 5)
  static const Int AccVirtual := 1.shiftl(USER_MODIFIER + 6)
  static const Int AccOnce := 1.shiftl(USER_MODIFIER + 7)
  static const Int AccNew := 1.shiftl(USER_MODIFIER + 8)
  static const Int AccEnumVal := 1.shiftl(USER_MODIFIER + 9)
  static const Int AccGetter := 1.shiftl(USER_MODIFIER + 10)
  static const Int AccSetter := 1.shiftl(USER_MODIFIER + 11)
  static const Int AccStorage := 1.shiftl(USER_MODIFIER + 12)
}
