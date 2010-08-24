//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 3, 2010 - Initial Contribution
//

using [java] org.eclipse.debug.core
using [java] org.eclipse.jdt.launching
using [java] org.eclipse.dltk.launching
using f4launching
using f4core

class JavaLaunchUtil
{
  static Void config(ILaunchConfiguration? src,
    ILaunchConfigurationWorkingCopy? target, Str mode,
    Str mainLaunchType
    )
  {
    scriptName := AbstractScriptLaunchConfigurationDelegate.getScriptProjectName(src)
    interpreter := ScriptRuntime.computeInterpreterInstall(src)
    fanHome := PathUtil.fanHome(interpreter.getInstallLocation.getPath)
    
    target.setAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, scriptName)
    target.setAttribute(IJavaLaunchConfigurationConstants.ATTR_MAIN_TYPE_NAME, mainLaunchType)
    
    args := Str[,]
    args.add(LaunchConfigDelegate.fanClassName(src))
    
    Str scriptArgs := LaunchConfigDelegate.getArgs(src).trim
    if(!scriptArgs.isEmpty) { args.add(scriptArgs) }
    
    target.setAttribute(IJavaLaunchConfigurationConstants.ATTR_PROGRAM_ARGUMENTS, args.join(" "))
    args.clear
    args.add("-Dfan.home=\"$fanHome.toFile.osPath\"")

    target.setAttribute(IJavaLaunchConfigurationConstants.ATTR_VM_ARGUMENTS, args.join(" "))
  }
  static Void setSourceLocator(ILaunch? launch, ILaunchConfiguration? config, ILaunchManager? manager)
  {
    if(launch.getSourceLocator == null)
    {
      sourceLocator := SourceDirectorManager.create
      if(sourceLocator == null) return
      
      sourceLocator.setSourcePathComputer(
        manager.getSourcePathComputer(SourcePathComputer.id))
      sourceLocator.initializeDefaults(config)
      launch.setSourceLocator(sourceLocator)
    }
  }
  
  static Str?[]? classpath(ILaunchConfiguration? config, Str?[]? base)
  {
    list := base
    result := Str?[,]
    list.each |s|
    {
      if(!s.contains(".fantom.sys") && !s.endsWith(".pod")) result.add(s)
    }
    return result
  }
}