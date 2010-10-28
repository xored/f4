//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 31, 2010 - Initial Contribution
//

using "[java]org.eclipse.dltk.internal.debug.ui.launcher"
using [java] org.eclipse.debug.core
using [java] org.eclipse.debug.ui
using [java] org.eclipse.core.resources
using [java] org.eclipse.dltk.launching
using [java] org.eclipse.dltk.core

using [java] java.util::Map as JavaMap

using f4core
using f4launching
using f4parser
using f4model
**
**
**
class LaunchShortcut : AbstractScriptLaunchShortcut
{
  override protected Str? getNatureId := F4Nature.id
  
  override protected ILaunchConfigurationType? getConfigurationType()
  {
    getLaunchManager.getLaunchConfigurationType(LaunchConsts.fanScriptId)
  }
  
  override protected ILaunchConfiguration? findLaunchConfiguration
  (IResource? script, ILaunchConfigurationType? ct)
  {
    attrs := [Str:Obj?][:]
   
    sourceModule := DLTKCore.createSourceModuleFrom(script)
    ns := ParseUtil.ns(sourceModule)
    type := ParseUtil.typeNames(sourceModule).find |Str name -> Bool| 
    {
      type := ns.currPod.findType(name,false)
      if(type == null) return false
      return type.findSlot("main", ns, false) != null
    }

    if(type == null) return null
    
    attrs[LaunchConsts.fanClass] =  type

    return findOrCreate(script, getConfigurationType, getLaunchManager, attrs)
  }
  

  
  static ILaunchConfiguration? find(IResource? res,
    ILaunchConfigurationType? type, Str:Obj? attrs)
  {
    configs := DebugPlugin.getDefault.getLaunchManager.getLaunchConfigurations(type)
    found := configs.findAll |ILaunchConfiguration conf -> Bool|
    {
      map := conf.getAttributes
      return attrs.all |v, k| { map[k] == v }
    }
    
    return found.first
  }
  
  static ILaunchConfiguration? findOrCreate(IResource? res,
    ILaunchConfigurationType? type,
    ILaunchManager? manager, Str:Obj? attrs)
  {
    attrs[LaunchConsts.fanProject] = res.getProject.getName
    attrs[LaunchConsts.scriptNature] = F4Nature.id
    
    found := find(res, type, attrs)
    if(found != null) return found
    
    ILaunchConfigurationWorkingCopy wc := 
    type.newInstance(null, 
      manager.generateUniqueLaunchConfigurationNameFrom(res.getName))
        
    attrs.each |v, k|
    {
      if(v is Str) wc.setAttribute(k, v as Str)
      else if (v is Bool) wc.setAttribute(k, (Bool)v)
      else if (v is Int) wc.setAttribute(k, v as Int)
      else if(v == null) wc.setAttribute(k, null as Str)
    }
    wc.setMappedResources([res])
    return wc.doSave
  }
}

