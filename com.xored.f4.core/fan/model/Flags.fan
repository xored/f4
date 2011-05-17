//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   ivaninozemtsev Apr 30, 2010 - Initial Contribution
//

using f4parser
**
**
**
const mixin Flags
{
  abstract Int flags()
  
  //////////////////////////////////////////////////////////////////////////
  // Type flags
  //////////////////////////////////////////////////////////////////////////
  Bool isAbstract() { flags.and(FanModifiers.AccAbstract) != 0 }
  Bool isMixin() { flags.and(FanModifiers.AccInterface) != 0 }
  Bool isEnum() { flags.and(FanModifiers.AccEnum) != 0 }
  Bool isClass() { !(isEnum || isMixin) }
  Bool isConst() { flags.and(FanModifiers.AccConstant) != 0 }
  Bool isFinal() { flags.and(FanModifiers.AccFinal) != 0 }
  Bool isInternal() { flags.and(FanModifiers.AccInternal) != 0 }
  Bool isPublic() { flags.and(FanModifiers.AccPublic) != 0 }
  Bool isSynthetic() { flags.and(FanModifiers.AccSynthetic) != 0 }
  
  //////////////////////////////////////////////////////////////////////////
  // Slot flags
  //////////////////////////////////////////////////////////////////////////
  Bool isCtor() { flags.and(FanModifiers.AccNew) != 0 }
  Bool isNative() { flags.and(FanModifiers.AccNative) != 0 }
  Bool isOverride() { flags.and(FanModifiers.AccOverride) != 0 }
  Bool isPrivate() { flags.and(FanModifiers.AccPrivate) != 0 }
  Bool isProtected() { flags.and(FanModifiers.AccProtected) != 0 }
  Bool isStatic() { flags.and(FanModifiers.AccStatic) != 0 }
  Bool isVirtual() { flags.and(FanModifiers.AccVirtual) != 0 }
}
