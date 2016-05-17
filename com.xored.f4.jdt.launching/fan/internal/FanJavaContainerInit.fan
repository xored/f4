//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//	 Ivan Inozemtsev May 25, 2010 - Initial Contribution
//

using [java] org.eclipse.core.runtime
using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.launching
using [java] org.eclipse.jdt.core

class FanJavaContainerInit : ClasspathContainerInitializer {
	private static const Bool debug := false
	
	override Void initialize(IPath? containerPath, IJavaProject? project) {
		if (debug) {
			echo("<FANJAVA_CONTAINER> initialize()")
			echo("\tPath: $containerPath")
			echo("\tProj: $project.getProject.getName")
		}
		
		size := containerPath.segmentCount
		
		if (size == 0) {
			if(debug) echo("\t*** NO SEGMENTS IN CONTAINER PATH")
			return
		}
		
		if (containerPath.segment(0) != JavaLaunchConsts.fanJavaContainer) {
			if(debug) echo("\t*** INVALID FANJAVA CONTAINER PATH ***")
			return
		}
		
		IScriptProject scriptProject := DLTKCore.create(project.getProject);
		IInterpreterInstall? fan := ScriptRuntime.getInterpreterInstall(scriptProject);
		
		if (fan == null) {
			if(debug) echo("\t*** FAILED RESOLVE FAN INSTALLATION ***")
			return
		}
		
		if(debug) echo("\tResolved VM: $fan.getName")
		
		container := FanJavaContainer(fan, containerPath, scriptProject);
		
		JavaCore.setClasspathContainer(containerPath,
				IJavaProject[ project ],
				IClasspathContainer[ container ], null);
	}
}
