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
    !fragmentsByPod.containsKey(name) ?  
      null
      : pods.getOrAdd(name) |->Obj| { DltkPod(name, fragmentsByPod[name]) }
  }
  
  override IFanType? findType(Str name) 
  { 
    if(name.isEmpty) return null
    if(name[-1] == '?') name = name[0..-2]

    //special handling for Lists and Maps
    IFanType? result := trySpecial(name)
    if(result != null) return result
    
    index := name.index("::")
    Str? pod := null
    if(index != null)
    {
      pod = name[0..<index]
      name = name[index+2..-1]
    }

    pods := pod == null ? podNames : [pod]
    result = pods.eachWhile { findPod(it)?.findType(name, false) }
    if(result == null)
    {
      //typeof.pod.log.warn("Unresolved type $name")
    }
    return result
  } 
  
  **
  ** Returns List or Map if applicable
  ** 
  private IFanType? trySpecial(Str name)
  {
    if(name.endsWith("[]"))
    {
      valueTypename := name[0..-3]
      valueType := findType(valueTypename)
      return findType("sys::List")?.parameterize(["sys::V" : valueType])
    }
    if(ParseUtil.isMapType(name))
    {
      Str cutName := name.startsWith("[") ? name[1..-2] : name
      bracesCount := 0
      for (i := 0; i < cutName.size; i++)
      {
        switch (cutName[i])
        {
          case '[': bracesCount++
          case ']': bracesCount--
          case ':':
          if (bracesCount == 0 && !ParseUtil.isQnamePos(cutName, i))
          {
            keyTypename := cutName[0..i - 1]
            valueTypename := cutName[i + 1..-1]
            keyType := findType(keyTypename)
            valueType := findType(valueTypename)
            return findType("sys::Map")?.parameterize(["sys::K" : keyType, "sys::V" : valueType])
          }
        }
      }
      // exceptional case, only if name is incorrect
      return findType("sys::Map")
    }
    if(name.startsWith("|")) { return findType("sys::Func") }
    return null
  }
}
