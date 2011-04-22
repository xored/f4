//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   ivaninozemtsev May 6, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.core::IProjectFragment as Fragment
using f4model
**
**
**
internal class DltkNamespace : IFanNamespace
{
  private IScriptProject project
  private Str:Fragment[] fragmentsByPod := [:]
  private Str:IFanPod pods := [:]
  private const Str currPodName
  new make(FantomProject project)
  {
    this.project = project.scriptProject
    this.currPodName = project.podName
    groupFragments
    this.podNames = fragmentsByPod.keys
  }
  
  private Void groupFragments()
  {
    Fragment[] fragments := project->getAllProjectFragments
    
    fragments.each
    {
      pod := podName(it)
      fragmentsByPod.getOrAdd(pod) |->Obj| { Fragment[,] }.add(it)
    }
  }
  
  private Str podName(Fragment fragment)
  {
    switch(fragment.getKind)
    {
      case Fragment.K_SOURCE:  //source fragment
        return FantomProjectManager.instance[(fragment.getParent as IScriptProject).getProject].podName
      default:
        return fragment.getPath.removeFileExtension.lastSegment//Pod fragment
    }
  }
  
  override const Str[] podNames
  override IFanPod currPod() { findPod(currPodName) }
  override IFanPod? findPod(Str name)
  {
    if (name.startsWith("[java]")) return FfiPod(project.getProject,name)
    return !fragmentsByPod.containsKey(name) ? null
      : pods.getOrAdd(name) |->Obj| { DltkPod(name, fragmentsByPod[name]) }
  }
}
