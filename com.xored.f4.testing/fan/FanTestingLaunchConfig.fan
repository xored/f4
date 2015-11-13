//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 3, 2010 - Initial Contribution
//
using [java] org.eclipse.core.runtime
using [java] org.eclipse.debug.core
using [java] org.eclipse.debug.core.sourcelookup
using [java] org.eclipse.dltk.launching
using [java] org.eclipse.jdt.launching
using [java] org.eclipse.dltk.testing
using f4jdtLaunching
using f4launching
**
**
**
class FanTestingLaunchConfig : JavaLaunchDelegate, TargetLaunchConfig
{
  
  override Void launch(ILaunchConfiguration? conf, Str? mode, ILaunch? launch, IProgressMonitor? m)
  {
	
    wc := conf.getWorkingCopy
    config(conf, wc, mode)
    DLTKTestingCore.registerTestingProcessor(launch, FanTestProcessor(launch))
    launch.setAttribute(DLTKTestingConstants.ATTR_ENGINE_ID, FanTestingEngine.id)

    if (JavaLaunchUtil.confirmLaunch(conf) == true)
      super.launch(conf, mode, launch, m)
  }

  protected static const Str mainLaunchType := "fanx.tools.Fant"

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
  
  override Str?[]? getEnvironment(ILaunchConfiguration? config) 
  {
    res:= JavaLaunchUtil.environment(config, super.getEnvironment(config))
    if(res == null) {
      return null
    }
    return res
  } 
}
