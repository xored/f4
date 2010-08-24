//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   ivaninozemtsev May 6, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.core::IProjectFragment as Fragment
using [java] org.eclipse.dltk.core::IModelElement as Element
using [java] org.eclipse.dltk.core::IType
using [java] org.eclipse.dltk.core::IParent
using f4model

**
**
**
internal const class DltkPod : IFanPod
{
  override const Str name
  override const Str[] typeNames
  new make(Str name, Fragment[] fragments)
  {
    this.name = name
    this.typesMap = [Str:IFanType][:].addList(allTypes(fragments)) |type| { type.name }
    this.typeNames = typesMap.keys
  }
  
  private IFanType[] allTypes(Fragment[] fragments)
  {
    IType[] types := IType[,]
    allITypes(fragments, types)
    return types.map { DltkType(name, it) }
  }
  
  private static Void allITypes(Element[] elements, IType[] result)
  {
    elements.each |e|
    {
      if(e is IType) { result.add(e); return }
      if(e isnot IParent) return
      allITypes((e as IParent).getChildren, result)
    }
  }
  
  override IFanType? findType(Str name, Bool checked := true)
  {
    typesMap[name] ?: (checked ? throw UnknownTypeErr() : null)
  }
  
  private const Str:IFanType typesMap
}
