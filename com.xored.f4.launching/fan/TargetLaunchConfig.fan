//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 25, 2010 - Initial Contribution
//

using [java] org.eclipse.debug.core.model
using [java] org.eclipse.debug.core
**
**
**
mixin TargetLaunchConfig : ILaunchConfigurationDelegate
{
  abstract Void config(ILaunchConfiguration? source,
    ILaunchConfigurationWorkingCopy? target, Str mode)
}
