//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   ivaninozemtsev Apr 29, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.internal.launching::AbstractInterpreterInstallType
using [java] org.eclipse.dltk.internal.launching::AbstractInterpreterInstallType$ILookupRunnable as ILookupRunnable
using [java] org.eclipse.dltk.launching::IInterpreterInstall
using [java] org.eclipse.dltk.core.environment::IDeployment
using [java] org.eclipse.core.runtime::IPath
using [java] com.xored.fanide.core::FanCore
using [java] org.eclipse.core.runtime::ILog
using [java] java.util::List as JList
using [java] org.eclipse.dltk.launching::EnvironmentVariable as EnvVar
using [java] org.eclipse.core.runtime::IProgressMonitor
using [java] org.eclipse.dltk.core.environment::IFileHandle
using [java] org.eclipse.dltk.core.environment::IEnvironment
using [java] org.eclipse.dltk.launching::LibraryLocation
using [java] org.eclipse.dltk.core.environment::EnvironmentPathUtils

using f4core
**
**
**
class InstallType : AbstractInterpreterInstallType
{
  private static const Str typeName := "Fantom 1.0"
  
  override Str? getNatureId() { F4Nature.id }
  
  override Str? getName() { typeName }
  
  override protected Str? getPluginId() { LaunchingPlugin.id }
  
  override protected Str?[]? getPossibleInterpreterNames() { ["fan"] }
  
  override protected IInterpreterInstall? doCreateInterpreterInstall(Str? id)
  {
    Install(this, id)
  }
  
  override protected IPath? createPathFile(IDeployment? deployment)
  {
    null
  }
  
  override protected ILog? getLog() { FanCore.getDefault.getLog }
  
  override protected ILookupRunnable? createLookupRunnable(IFileHandle? installLoc,
      JList? locs, EnvVar?[]? vars)
  {
    return InstallTypeLookupRunnable( |->|
    {
      env := installLoc.getEnvironment
      path := installLoc.getPath
      libDir := path.removeLastSegments(2).append("lib/fan")
      
      libLocations := env.getFile(libDir)
      IFileHandle[]? pods := libLocations.getChildren
      if(pods == null) return
      LibraryLocation[] result := pods.findAll { it.getPath.getFileExtension == F4Consts.podExt}.map |pod|
      {
        LibraryLocation(EnvironmentPathUtils.getFullPath(env, pod.getPath))
      }
      result.sort |a, b| { a.getLibraryPath <=> b.getLibraryPath }.each { locs.add(it) }
      
    })
  }
}

class InstallTypeLookupRunnable : ILookupRunnable
{
  private |->| func
  new make(|->| func) { this.func = func }
  override Void run(IProgressMonitor? monitor)
  {
    func.call
  }
}
