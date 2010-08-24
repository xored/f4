//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   ivaninozemtsev Apr 29, 2010 - Initial Contribution
//

using [java] org.eclipse.debug.core::ILaunchManager
using [java] org.eclipse.dltk.launching::AbstractInterpreterInstall
using [java] org.eclipse.dltk.launching::IInterpreterInstallType
using [java] org.eclipse.dltk.launching::IInterpreterRunner
using f4core
**
**
**
class Install : AbstractInterpreterInstall
{
  new make(IInterpreterInstallType type, Str? id) : super(type, id) {}
  
  override Str? getNatureId() { F4Nature.id }
  
  override IInterpreterRunner? getInterpreterRunner(Str? mode)
  {
    runner := super.getInterpreterRunner(mode)
    if(runner != null) return runner
    
    if(mode == ILaunchManager.RUN_MODE) return InterpreterRunner(this)
    
    return null
  }
}
