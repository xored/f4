//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 1, 2010 - Initial Contribution
//

using "[java]org.eclipse.dltk.internal.debug.ui.interpreters"
using [java] org.eclipse.jface.dialogs
using [java] org.eclipse.jface.viewers
using [java] org.eclipse.jface.viewers::DelegatingStyledCellLabelProvider$IStyledLabelProvider as IStyledLabelProvider
using [java] com.xored.f4.debug.ui

using f4core
**
**
**
class FanInterpreterLibraryBlock : AbstractInterpreterLibraryBlock
{
  new make(AddScriptInterpreterDialog d) : super(d) {}
  
  override protected IDialogSettings? getDialogSettions()
  {
    FanDebug.getDefault.getDialogSettings
  }
  
  override protected IBaseLabelProvider? getLabelProvider()
  {
    DelegatingStyledCellLabelProvider(FanLibLabelProvider())
  }
}

class FanLibLabelProvider : LibraryLabelProvider, IStyledLabelProvider
{
  override Str? getText(Obj? element)
  {
    if(element isnot LibraryStandin) return super.getText(element)
    uri := resolveLoc(element)
    return "$uri.path.last - $uri.parent"
  }
  
  override StyledString? getStyledText(Obj? element)
  {
    result := StyledString()
    if(element isnot LibraryStandin) 
    {
      result.append(super.getText(element))
      return result
    }
    uri := resolveLoc(element)
    result.append(uri.path.last)
    decOffset := result.length
    result.append(" - ")
    result.append(uri.parent.toStr)
    result.setStyle(decOffset, 
      result.length - decOffset, 
      StyledString.QUALIFIER_STYLER)
    return result
  }
  
  protected Uri resolveLoc(LibraryStandin loc)
  {
    PathUtil.resolveLocalPath(loc.toLibraryLocation.getLibraryPath).uri
  }
}
