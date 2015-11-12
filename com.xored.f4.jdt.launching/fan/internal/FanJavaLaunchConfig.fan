//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 27, 2010 - Initial Contribution
//

using [java] org.eclipse.core.runtime
using [java] org.eclipse.debug.core
using [java] org.eclipse.debug.core.sourcelookup
using [java] org.eclipse.dltk.launching
using [java] org.eclipse.jdt.launching
using f4launching
using f4core
**
**
**
class FanJavaLaunchConfig : JavaLaunchDelegate, TargetLaunchConfig
{

  override Void launch(ILaunchConfiguration? config, Str? mode, ILaunch? launch, IProgressMonitor? m) {
    if (JavaLaunchUtil.confirmLaunch(config) == true)
      super.launch(config, mode, launch, m)
  }

  override Str?[]? getEnvironment(ILaunchConfiguration? config) 
  {
    res:= JavaLaunchUtil.environment(config, super.getEnvironment(config))
    if(res == null) {
      return null
    }
    return res
  }
  override Str?[]? getClasspath(ILaunchConfiguration? config)
  {
    JavaLaunchUtil.classpath(config, super.getClasspath(config))
  }
  
  override protected Void setDefaultSourceLocator(ILaunch? launch,
    ILaunchConfiguration? config)
  {
    JavaLaunchUtil.setSourceLocator(launch, config, getLaunchManager)
  }
  
  override Void config(ILaunchConfiguration? src,
    ILaunchConfigurationWorkingCopy? target, Str mode
    )
  {
    JavaLaunchUtil.config(src,target,mode,mainLaunchType)
  }
  protected static const Str mainLaunchType := "fanx.tools.Fan"
  
}
