//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 1, 2010 - Initial Contribution
//

using "[java]org.eclipse.dltk.internal.debug.ui.interpreters"
using f4core
**
**
**
class FanInterpreterContainerWizardPage : AbstractInterpreterContainerWizardPage
{
  override Str? getScriptNature := F4Nature.id
}
