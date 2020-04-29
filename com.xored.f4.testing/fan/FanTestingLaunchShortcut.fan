//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//	 Ivan Inozemtsev Jun 3, 2010 - Initial Contribution
//

using "[java]org.eclipse.dltk.internal.debug.ui.launcher"
using [java] org.eclipse.debug.core
using [java] org.eclipse.debug.ui
using [java] org.eclipse.ui
using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.testing
using [java] org.eclipse.dltk.ui
using [java] org.eclipse.jface.viewers
using [java] org.eclipse.jface.dialogs
using [java] org.eclipse.core.resources
using [java] org.eclipse.jface.operation
using [java] org.eclipse.core.resources.IProject
using [java] org.eclipse.dltk.core.ISourceModule
using [java] org.eclipse.dltk.core.IProjectFragment

using f4debugUi
using f4core
using f4core::FantomProjectManager
using f4launching

class FanTestingLaunchShortcut : AbstractScriptLaunchShortcut {
	private static const Str configTypeId := "com.xored.fanide.testing.launchConfigurationType"	

	override protected Str? getNatureId := F4Nature.id
	
	override protected ILaunchConfigurationType? getConfigurationType() {
		getLaunchManager.getLaunchConfigurationType(configTypeId)
	}
	
	override protected IResource?[]? findScripts(Obj?[]? elements, IRunnableContext? context) {
		IResource?[]? scripts := super.findScripts(elements, context)
		IResource?[]? launchableScripts := [,] 
		if (elements[0] is IProject) {			
			return IResource[(IResource)elements[0],]
		}
		if (elements[0] is IProjectFragment) {
			IProjectFragment? pf := (IProjectFragment)elements[0]
			IModelElement elem := pf.getParent
			IResource res := elem.getResource
			scripts.each |item| {					 
				if (isScriptLaunchable(item))
					launchableScripts.add(item)					 
			}
			
			if (launchableScripts.size>0)
				return launchableScripts
			else				
				return IResource[res,]
		}			
		return scripts
	}
	
	static Bool? isScriptLaunchable(IResource? script) {		
		sourceModule := DLTKCore.createSourceModuleFrom(script)
		ns := ParseUtil.ns(sourceModule)	 
		typeName := ParseUtil.typeNames(sourceModule).find {
			ParseUtil.inherits(ns.findType(it), "sys::Test", ns)	
		} ?: ""
		if (typeName=="") return false	 
		return true
	}
	
	override protected ILaunchConfiguration? findLaunchConfiguration(IResource? script, ILaunchConfigurationType? ct) {
		attrs := [Str:Obj?][:]
		typeName:=""
		if (!(script is IProject)) {
			fp := FantomProjectManager.instance.get(script.getProject)
			if(fp == null) return null //not a fantom project
			
			sourceModule := DLTKCore.createSourceModuleFrom(script)
			ns := ParseUtil.ns(sourceModule)
			typeName = ParseUtil.typeNames(sourceModule).find {
				ParseUtil.inherits(ns.findType(it), "sys::Test", ns) 
			} ?: ""
		}
		
		//launch tests from entire pod
		attrs[LaunchConsts.fanClass] = typeName
		attrs[DLTKTestingConstants.ATTR_ENGINE_ID] = FanTestingEngine.id
		return LaunchShortcut.findOrCreate(script,getConfigurationType,getLaunchManager,attrs)
	}
}
