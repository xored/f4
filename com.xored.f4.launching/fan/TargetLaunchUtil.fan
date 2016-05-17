//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//	 Ivan Inozemtsev May 25, 2010 - Initial Contribution
//

using [java] org.eclipse.debug.core
using [java] java.util::HashSet

class TargetLaunchUtil {
	static ILaunchConfigurationWorkingCopy createFanLaunchConfig() {
		manager := DebugPlugin.getDefault.getLaunchManager
		type := manager.getLaunchConfigurationType(LaunchConsts.fanScriptId)
		return type.newInstance(null, "build configuration")
	}
	
	static TargetLaunchConfig getTargetConfig(Str mode) {
		manager := DebugPlugin.getDefault.getLaunchManager
		ILaunchConfigurationType? targetDelegateType := 
			manager.getLaunchConfigurationTypes.find |ILaunchConfigurationType t ->Bool| { 
				t.getCategory == "fan" 
			}

		if(targetDelegateType == null) throw Err("Can't find Fantom Target VM launch config delegate")
		set := HashSet()
		set.add(mode)
		ILaunchDelegate[] delegates := targetDelegateType.getDelegates(set)
		if(delegates.isEmpty) throw Err("Fantom Target VM delegate does not support $mode mode")
		
		return delegates.first.getDelegate
	}
}
