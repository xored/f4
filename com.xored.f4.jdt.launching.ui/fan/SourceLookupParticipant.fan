//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 28, 2010 - Initial Contribution
//

using [java] org.eclipse.core.resources
using [java] org.eclipse.core.runtime
using [java] org.eclipse.debug.core.sourcelookup
using [java] org.eclipse.debug.core.sourcelookup.containers
using [java] org.eclipse.dltk.core
using [java] org.eclipse.jdt.debug.core

using "[java]com.xored.fanide.internal.core.model"
using [java] java.lang::Class
using [java] java.io::File as JavaFile
using f4core
**
**
**
class SourceLookupParticipant : AbstractSourceLookupParticipant
{
  override Obj?[]? findSourceElements(Obj? obj)
  {
    name := getSourceName(obj)
    podName := getPodName(obj)
    if(name == null || podName == null) return Obj?[,]
    
    fileName := File.os(name).uri.path.last
    files := findInWorkspace(podName, fileName)
    if(!files.isEmpty) return files
    files = findInLibs(podName, fileName)
    return files
  }
  
  override Str? getSourceName(Obj? obj)
  {
    if(obj is Str) return obj
    sourceName := getSourcePath(obj)
    if(sourceName == null) return null
    
    //strip 1st two elements
    return File.os(sourceName).uri.sliceToPathAbs(2..-1).plusSlash.toStr
  }
  
  private static Obj? getClas(Str name)
  {
    Class.forName(name)
  }
  
  private Str? getSourcePath(Obj? obj)
  {
    IJavaStackFrame? frame :=  (obj as IAdaptable)?.getAdapter(
        getClas("org.eclipse.jdt.debug.core.IJavaStackFrame"))
        //InteropUtil.getClass(IJavaStackFrame#))
    if(frame == null || frame.isObsolete) 
    {
      return null
    }
    Str? path := frame.getSourcePath
    if (path == null) {
      Str classQualifiedName := frame.getReceivingTypeName
      path = classQualifiedName.replace(".","/")
      if (path.contains("\$"))
        path = path.split('\$', false)[0]
      return "${path}.fan"
    } else {
      return path
    }
  }
  
  private Str? getPodName(Obj? obj)
  {
    sourcePath := getSourcePath(obj)
    if(sourcePath == null) return null
    return File.os(sourcePath).uri.path[1]
  }
  
  private IModelElement[] findInWorkspace(Str pod, Str name)
  {
    result := IModelElement[,]
    FantomProjectManager.instance.listProjects.each |fp|
    {
      if(fp.podName != pod) return
      fp.project.accept |IResource res -> Bool|
      {
        if(res.getType == IResource.FILE && res.getName.equalsIgnoreCase(name))
        {
          result.add(DLTKCore.create(res as IFile))
        }
        return true
      }
    }
    return result
  }
  
  private IModelElement[] findInLibs(Str pod, Str name)
  {
    result := IModelElement[,]
    FantomProjectManager.instance.listProjects.each |fp|
    {
      fp.scriptProject.getProjectFragments.each |IProjectFragment pf|
      {
        if(pf isnot PodFragment) return
        podFragment := pf as PodFragment
        if(!podFragment.getPodPath.lastSegment.equalsIgnoreCase("${pod}.pod") ) return
        pos := name.indexr(".fan")
        if(pos == null) return
        fcodeName := "${name[0..<pos]}.fcode"
        podFragment.accept |IModelElement e -> Bool|
        {
          if(e.getElementType == IModelElement.SOURCE_MODULE)
          {
            if(e.getElementName == fcodeName) result.add(e)
            return false
          }
          return true
        }
      }
    }
    return result
  }
}
