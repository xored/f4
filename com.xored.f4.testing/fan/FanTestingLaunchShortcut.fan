//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 3, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.internal.debug.ui.launcher
using [java] org.eclipse.debug.core
using [java] org.eclipse.debug.ui
using [java] org.eclipse.ui
using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.testing
using [java] org.eclipse.dltk.ui
using [java] org.eclipse.jface.viewers
using [java] org.eclipse.jface.dialogs
using [java] org.eclipse.core.resources

using f4debugUi
using f4core
using f4launching
**
**
**
class FanTestingLaunchShortcut : AbstractScriptLaunchShortcut
{
  private static const Str configTypeId := "com.xored.fanide.testing.launchConfigurationType"
  
  override protected ILaunchConfigurationType? getConfigurationType()
  {
    getLaunchManager.getLaunchConfigurationType(configTypeId)
  }
  
  override protected ILaunchConfiguration? findLaunchConfiguration
  (IResource? script, ILaunchConfigurationType? ct)
  {
    attrs := [Str:Obj?][:]
    fp := FantomProjectManager.instance[script.getProject]
    if(fp == null) return null //not a fantom project
    
    sourceModule := DLTKCore.createSourceModuleFrom(script)
    ns := ParseUtil.ns(sourceModule)
    typeName := ParseUtil.typeNames(sourceModule).find 
    {
      ParseUtil.inherits(ns.findType(it), "Test", ns)
    } ?: ""
    
    //launch tests from entire pod
    attrs[LaunchConsts.fanClass] = typeName
    attrs[DLTKTestingConstants.ATTR_ENGINE_ID] = FanTestingEngine.id
    return LaunchShortcut.findOrCreate(script,getConfigurationType,getLaunchManager,attrs)
  }
  
  
  
  override protected Str? getNatureId := F4Nature.id

 
}
