//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   ivaninozemtsev Apr 29, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.launching
using [java] org.eclipse.debug.core
using [java] org.eclipse.dltk.debug.core
using [java] org.eclipse.core.runtime
using [java] org.eclipse.core.resources
using [java] org.eclipse.core.variables
using f4core 
**
**
**
class LaunchConfigDelegate : AbstractScriptLaunchConfigurationDelegate
{
  override Str? getLanguageId() { return F4Nature.id }
  
  override protected Bool saveBeforeLaunch(ILaunchConfiguration? config, Str? mode, IProgressMonitor? monitor)
  {
    config.getAttribute(LaunchConsts.skipAutosave, false) ? true : super.saveBeforeLaunch(config, mode, monitor)
  }
  
  override Bool finalLaunchCheck(ILaunchConfiguration? config, Str? mode, IProgressMonitor? monitor)
  {
    config.getAttribute(LaunchConsts.skipErrs, false) ? true : super.finalLaunchCheck(config, mode, monitor)
  }
  

  **
  ** For some problem with Fantom compiler I could not override
  ** `isLaunchProblem method`, so this is workaround
  ** 
  override protected Bool existsProblems(IProject? proj)
  {
    return super.existsProblems(proj) &&
      proj.findMarkers(F4Consts.buildProblem, true, IResource.DEPTH_INFINITE).isEmpty
  }
  
  override Void launch(ILaunchConfiguration? config, Str? mode, ILaunch? launch, 
    IProgressMonitor? m)
  {
    targetConfig := TargetLaunchUtil.getTargetConfig(mode)
    wc := config.getWorkingCopy
    targetConfig.config(config, wc, mode)

    //TODO add submonitor -- Ivan: just copied from java source
    interpreter := ScriptRuntime.computeInterpreterInstall(wc)
    if(!interpreter.getInstallLocation.exists) 
      throw ArgErr("Interpreter $interpreter.getName location ($interpreter.getInstallLocation) does not exist")
    targetConfig.launch(wc, mode, launch, m)
  }
  
  static Str fanClassName(ILaunchConfiguration config)
  {
    Str className := config.getAttribute(LaunchConsts.fanClass, "")
    Str projectName := config.getAttribute(LaunchConsts.fanProject, "")
    if(projectName.isEmpty) return className

    podName := FantomProjectManager.instance[ResourcesPlugin.getWorkspace.getRoot.getProject(projectName)].podName
    if(className.isEmpty) return podName
    
    return "$podName::$className"
  }
    
  static Str getArgs(ILaunchConfiguration config)
  {
    VariablesPlugin.getDefault.getStringVariableManager.performStringSubstitution(
        config.getAttribute(LaunchConsts.ATTR_SCRIPT_ARGUMENTS, ""))
  }
  
  override protected Void setDebugConsoleAttributes(Launch? launch,
    ILaunchConfiguration? config)
  {
    // FIXME - to be removed later -- Alex  -- Ivan: just copied from Java code
    launch.setAttribute(
      DLTKDebugLaunchConstants.ATTR_DEBUG_CONSOLE, 
      DLTKDebugLaunchConstants.FALSE)
  }
}
