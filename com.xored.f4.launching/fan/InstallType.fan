//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//	 ivaninozemtsev Apr 29, 2010 - Initial Contribution
//

using [java] com.xored.f4.launching::AbstractInterpreterInstallTypeBridge
using "[java]org.eclipse.dltk.internal.launching"::AbstractInterpreterInstallType$ILookupRunnable as ILookupRunnable
using [java] org.eclipse.dltk.launching::IInterpreterInstall
using [java] org.eclipse.dltk.core.environment::IDeployment
using [java] org.eclipse.core.runtime::Status
using [java] org.eclipse.core.runtime::IStatus
using [java] org.eclipse.core.runtime::Path
using [java] org.eclipse.core.runtime::IPath
using [java] com.xored.fanide.core::FanCore
using [java] org.eclipse.core.runtime::ILog
using [java] org.eclipse.core.runtime::FileLocator
using [java] java.util::List as JList
using [java] org.eclipse.dltk.launching::EnvironmentVariable as EnvVar
using [java] org.eclipse.core.runtime::IProgressMonitor
using [java] org.eclipse.dltk.core.environment::IFileHandle
using [java] org.eclipse.dltk.core.environment::IEnvironment
using [java] org.eclipse.dltk.launching::LibraryLocation
using [java] org.eclipse.dltk.core.environment::EnvironmentPathUtils
using [java] org.eclipse.dltk.core.environment::EnvironmentManager
using [java] org.eclipse.core.runtime::Platform
using [java] org.eclipse.dltk.core.environment::FileAsFileHandle
using [java] java.io::File as JavaFile

using f4fcode
using f4core

class InstallType : AbstractInterpreterInstallTypeBridge {
	
	private static const Str typeName := "Fantom 1.0"
	
	override Str? getNatureId() { F4Nature.id }
	
	override Str? getName() { typeName }
	
	override protected Str? getPluginId() { LaunchingPlugin.id }
	
	override protected Str?[]? getPossibleInterpreterNames() { ["fan"] }
	
	override protected IInterpreterInstall? doCreateInterpreterInstall(Str? id) {
		Install(this, id)
	}
	
	override protected IPath? createPathFile(IDeployment? deployment) {
		null
	}
	
	override protected ILog? getLog() { FanCore.getDefault.getLog }
	
	override protected ILookupRunnable? createLookupRunnable(IFileHandle? installLoc,
			JList? locs, EnvVar?[]? vars) {
		return InstallTypeLookupRunnable( |->| {
			env := installLoc.getEnvironment
			path := installLoc.getPath
			libDir := path.removeLastSegments(2).append("lib/fan")
			
			libLocations := env.getFile(libDir)
			IFileHandle[]? pods := libLocations.getChildren
			if(pods == null) return
			LibraryLocation[] result := pods.findAll { it.getPath.getFileExtension == F4Consts.podExt}.map |pod| {
				LibraryLocation(EnvironmentPathUtils.getFullPath(env, pod.getPath))
			}
			result.sort |a, b| { a.getLibraryPath <=> b.getLibraryPath }.each { locs.add(it) }
			
		})
	}
	
	override IFileHandle?[]? detectInstallLocations() {
		fanHome := Env.cur.vars[fanHomeVar]
		File? fanHomeDir := null
		try fanHomeDir = File.os(fanHome) + `bin/fan`
		catch {}
		if (fanHomeDir?.exists ?: false) return [FileAsFileHandle(JavaFile(fanHomeDir.osPath))]
		return null
	}

	private static const Str fanHomeVar := "FAN_HOME"
	
	override Str? generateDetectedInterpreterName(IFileHandle? install) {
		pName := InterpreterUtils.getVersion(PathUtil.fanHome(install.getPath).toFile)
		baseName := pName
		index := 0
		while (!validateGeneratedName(pName)) pName = "$baseName(${index++})" 
		return pName
	}
	
	protected Bool validateGeneratedName(Str name) {
		findInterpreterInstallByName(name) == null
	}
	
	
	override IStatus? validateInstall(IFileHandle? installLocation) {
		fanHome := PathUtil.fanHome(installLocation.getPath)
		//installation is valid if there is sys.pod which can be opened by fcode reader
		sysPod := fanHome.toFile + `lib/fan/sys.pod`
		if(!sysPod.exists) return createStatus(IStatus.ERROR, "Sys pod is not found at $sysPod", null)
		
		if(!InterpreterUtils.isValid(sysPod)) return createStatus(IStatus.ERROR, "Invalid pod $sysPod", null)
		
		return Status.OK_STATUS
	}
	
	//protected IStatus createStatus(int severity, String message,
	//		Throwable throwable) {
}


class InstallTypeLookupRunnable : ILookupRunnable {
	private |->| func
	new make(|->| func) { this.func = func }
	override Void run(IProgressMonitor? monitor) {
		func.call
	}
}
