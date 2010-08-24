//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 1, 2010 - Initial Contribution
//

using [java] org.eclipse.core.resources
using [java] org.eclipse.core.runtime
using [java] org.eclipse.dltk.internal.debug.ui.interpreters
using [java] org.eclipse.dltk.internal.ui.actions
using [java] org.eclipse.dltk.ui.util
using [java] org.eclipse.dltk.launching
using [java] org.eclipse.jface.dialogs
using [java] org.eclipse.swt.widgets::Composite
using [java] org.eclipse.swt.widgets::Control
using [java] com.xored.f4.debug.ui
using f4core
using f4launching
**
**
**
class InterpreterPreferencePage : ScriptInterpreterPreferencePage
{
  private InterpretersBlock? interpretersBlock
  private IInterpreterInstall[]? interpreters
  
  override protected Control? createContents(Composite? ancestor)
  {
    control := super.createContents(ancestor)
    interpreters = interpretersBlock.getCheckedInterpreters
    return control
  }
  
  override public InterpretersBlock? createInterpretersBlock()
  {
    interpretersBlock = FanInterpretersBlock()
    return interpretersBlock
  }
}

class FanInterpretersBlock : InterpretersBlockBridge
{
  override protected AddScriptInterpreterDialog? createDialog
    (IInterpreterInstall? standin)
  {
    AddFanInterpreterDialog(
      this, 
      getShell, 
      ScriptRuntime.getInterpreterInstallTypes(getCurrentNature),
      standin)
  }
  
  override protected Str? getCurrentNature := F4Nature.id
  
  override Void interpreterAdded(IInterpreterInstall? interpreter)
  {
    fanVersion := InterpreterUtils.getVersion(interpreter)
    interpreter.setName(fanVersion)
    super.interpreterAdded(interpreter)
  }
}