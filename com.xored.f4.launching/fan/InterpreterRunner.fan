//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 25, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.launching::AbstractInterpreterRunner
using [java] org.eclipse.dltk.launching::IInterpreterInstall
**
**
**
class InterpreterRunner : AbstractInterpreterRunner
{
  new make(IInterpreterInstall install) :super(install) {}
  
  override protected Str? getProcessType() { LaunchConsts.fanProcessTypeId }
}
