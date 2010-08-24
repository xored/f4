//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 1, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.internal.debug.ui.interpreters
using [java] org.eclipse.swt.widgets::Shell
using [java] org.eclipse.dltk.launching
using [java] org.eclipse.core.runtime
using [java] org.eclipse.dltk.core.environment

using f4launching

**
**
**
class AddFanInterpreterDialog : AddScriptInterpreterDialog
{
  new make(IAddInterpreterDialogRequestor requestor,
      Shell shell, IInterpreterInstallType[] interpreterInstallTypes,
      IInterpreterInstall? editedInterpreter
    ) : super(requestor, shell, interpreterInstallTypes, editedInterpreter) {}
  
  override protected Str? generateInterpreterName(IFileHandle? file)
  {
    IInterpreterInstall install := InterpreterStandin(
      getInterpreterType, 
      createUniqueId(getInterpreterType))
    setFieldValuesToInterpreter(install)
    
    pName := InterpreterUtils.getVersion(install)
    baseName := pName
    index := 0
    while(!validateGeneratedName(pName)) pName = "$baseName(${index++})" 
    return pName
  }
  
  override protected AbstractInterpreterLibraryBlock? createLibraryBlock(
      AddScriptInterpreterDialog? dialog
    )
  {
    FanInterpreterLibraryBlock(dialog)
  }
  
  private Str createUniqueId(IInterpreterInstallType type)
  {
    DateTime.nowUnique.toStr
  }
}
