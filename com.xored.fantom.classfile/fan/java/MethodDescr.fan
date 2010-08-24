//
// Copyright (c) 2010, xored software, Inc.
// Licensed under the Academic Free License version 3.0
//
// History:
//   21 Apr 10  Andrey Talnikov  Initial Contribution
//

**
** JavaMethodType
**
const class MethodDescr
{
  const TypeRef? returns
  const TypeRef[] params

  new make(|This|? f := null) { f?.call(this) }
  
  static MethodDescr fromStr(Str descr) { fromStream(descr.in) }

  internal static MethodDescr fromStream(InStream in)
  {
    if(in.readChar != paramsStart) throw FormatErr()
    
    prms := TypeRef[,]
    while(in.peekChar != paramsEnd)
      prms.add(TypeRef.fromStream(in))
    in.readChar //skip paramsEnd
    
    TypeRef? rtrns := null
    if(in.peekChar != voidReturn)
      rtrns = TypeRef.fromStream(in)
    
    return MethodDescr { returns = rtrns; params = prms }
  }

  private static const Int voidReturn      := 'V'
  private static const Int paramsStart     := '('
  private static const Int paramsEnd       := ')'

}
