//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 3, 2010 - Initial Contribution
//

using [java] org.eclipse.debug.core
using [java] org.eclipse.jdt.launching
using [java] org.eclipse.dltk.launching::ScriptLaunchConfigurationConstants
using [java] org.eclipse.dltk.launching::AbstractScriptLaunchConfigurationDelegate
using [java] org.eclipse.dltk.launching::ScriptRuntime
using [java] java.lang::System
using [java] java.net::URL
using [java] java.util::Map
using [java] java.util::HashMap
using [java] java.util::ArrayList
using [java] fanx.interop::Interop
using f4launching
using f4core

class JavaLaunchUtil
{
  static Void config(ILaunchConfiguration? src,
    ILaunchConfigurationWorkingCopy? target, Str mode,
    Str mainLaunchType
    )
  {
    scriptName	:= AbstractScriptLaunchConfigurationDelegate.getScriptProjectName(src)
    interpreter := ScriptRuntime.computeInterpreterInstall(src)
    fanHome 	:= PathUtil.fanHome(interpreter.getInstallLocation.getPath)		
    projHome	:= PathUtil.resolvePath(AbstractScriptLaunchConfigurationDelegate.getProject(src).getFullPath)
    
    target.setAttribute(IJavaLaunchConfigurationConstants.ATTR_WORKING_DIRECTORY, 
      src.getAttribute(ScriptLaunchConfigurationConstants.ATTR_WORKING_DIRECTORY, projHome.osPath))
    target.setAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, scriptName)
    target.setAttribute(IJavaLaunchConfigurationConstants.ATTR_MAIN_TYPE_NAME, mainLaunchType)
    
    args := Str[,]
    args.add(LaunchConfigDelegate.fanClassName(src))
    
    Str scriptArgs := LaunchConfigDelegate.getArgs(src).trim
    if(!scriptArgs.isEmpty) { args.add(scriptArgs) }
    
    target.setAttribute(IJavaLaunchConfigurationConstants.ATTR_PROGRAM_ARGUMENTS, args.join(" "))
    vmArgs := [LaunchConfigDelegate.getVMArgs(src)]
    vmArgs.add("-Dfan.home=\"$fanHome.toFile.osPath\"")
    target.setAttribute(IJavaLaunchConfigurationConstants.ATTR_VM_ARGUMENTS, vmArgs.join(" "))
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
  
  static Str?[]? environment(ILaunchConfiguration? config, Str?[]? base)
  {
    copy       := config.getWorkingCopy
    configEnv  := (Map) copy.getAttribute(ILaunchManager.ATTR_ENVIRONMENT_VARIABLES, HashMap())

    // pick up the original FAN_ENV, but let the ENV_VAR tab trump
    processEnv := |Obj? env -> Str?| {
      // allow spaces 'cos eclipse *forces* you to provide a value for environment variables
      // spaces will be trimmed in F4PodEnv anyway
      envStr := env?.toStr
      if (envStr?.trimToNull == "f4podEnv::F4PodEnv") envStr = null
      return envStr
    }
    origFanEnv := (processEnv(configEnv.get("FAN_ENV")) ?: processEnv(System.getenv.get("F4PODENV_FAN_ENV"))) ?: processEnv(System.getenv.get("FAN_ENV"))
    if (origFanEnv != null)
      configEnv.put("F4PODENV_FAN_ENV", origFanEnv)

    projectList := config.getAttribute(LaunchConsts.projectList, ArrayList()).toArray
    configEnv.put("F4PODENV_POD_LOCATIONS", getPodLocations(projectList))

    configEnv.put("FAN_ENV", "f4podEnv::F4PodEnv")

    copy.setAttribute(ILaunchManager.ATTR_ENVIRONMENT_VARIABLES, configEnv)

    // copy f4podEnv.pod to FAN_HOME
	// top tip from http://blog.vogella.com/2010/07/06/reading-resources-from-plugin/
    interpreter := ScriptRuntime.computeInterpreterInstall(config)
    fanHome     := PathUtil.fanHome(interpreter.getInstallLocation.getPath)
    f4EnvPod    := fanHome.plusSlash.plus(`lib/fan/f4podEnv.pod`).toFile
    if (!f4EnvPod.exists) {
      url       := URL("platform:/plugin/com.xored.f4.podEnv/f4podEnv.pod")
      inStream  := (InStream) Interop.toFan(url.openConnection.getInputStream)
      f4EnvBuf  := inStream.readAllBuf
      f4EnvPod.out.writeBuf(f4EnvBuf).close
    }

    return DebugPlugin.getDefault.getLaunchManager.getEnvironment(copy)
  }

  private static Str getPodLocations(Str[] checked) {
    FantomProjectManager.instance.listProjects
      .exclude { it.isPlugin }
      .findAll { checked.isEmpty ? true : checked.contains(it.podName) }
      .findAll { it.outDir.exists }
      .map |FantomProject p -> Str| { p.outDir.uri.plusSlash.plusName("${p.podName}.pod").toFile.normalize.osPath }.join(File.pathSep)
  }
}