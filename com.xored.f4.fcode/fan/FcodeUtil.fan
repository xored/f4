//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   ivaninozemtsev May 5, 2010 - Initial Contribution
//

using compiler
using f4core
using f4parser
**
**
**
class FcodeUtil
{
  static Str resolveType(FPod pod, Int typeRef)
  {
    r := pod.typeRef(typeRef)
    return r.isGenericInstance ?
       r.sig :
       "${pod.n(r.podName)}::${pod.n(r.typeName)}$r.sig"
  }
  
  
  static Int flagsFcodeToDltk(Int flags)
  {
    fcodeToDltk.reduce(0) | Int r, Int dltk, Int fcode -> Int|
    {
      return (flags.and(fcode) != 0) ? r.or(dltk) : r 
    }
  }
  
  private static const Int:Int fcodeToDltk :=
    [
      FConst.Abstract : FanModifiers.AccAbstract,
      FConst.Const : FanModifiers.AccConstant,
      FConst.Ctor : FanModifiers.AccNew,
      FConst.Enum : FanModifiers.AccEnum,
      FConst.Facet : FanModifiers.AccAnnotation, //TODO: verify
      FConst.Final : FanModifiers.AccFinal,
      FConst.Getter : FanModifiers.AccGetter,
      FConst.Internal : FanModifiers.AccInternal,
      FConst.Mixin : FanModifiers.AccInterface,
      FConst.Native : FanModifiers.AccNative,
      FConst.Override : FanModifiers.AccOverride,
      FConst.Private : FanModifiers.AccPrivate,
      FConst.Protected : FanModifiers.AccProtected,
      FConst.Public : FanModifiers.AccPublic,
      FConst.Setter : FanModifiers.AccSetter,
      FConst.Static : FanModifiers.AccStatic,
      FConst.Storage : FanModifiers.AccStorage,
      FConst.Synthetic : FanModifiers.AccSynthetic,
      FConst.Virtual : FanModifiers.AccVirtual
    ]
}
