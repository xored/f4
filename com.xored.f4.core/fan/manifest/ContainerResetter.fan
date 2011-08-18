//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   ivaninozemtsev Apr 20, 2010 - Initial Contribution
//

using [java]org.eclipse.core.resources::IProject
using [java]org.eclipse.dltk.core::DLTKCore
using [java]org.eclipse.dltk.core::IScriptProject
using [java]org.eclipse.dltk.core::IBuildpathEntry
using [java]org.eclipse.dltk.launching::ScriptRuntime
using [java]org.eclipse.core.runtime::IPath

using concurrent
**
** Listens for Build.fan changes and updates container
** Automatically groups update requests by project
**
const class ContainerResetter : Actor
{
  new make(ActorPool pool) : 
    super.makeCoalescing
    (
      pool, 
      |Unsafe val -> Str|
      {
        //key is project location
        (val.val as IProject).getLocation.toOSString
      }, 
      null, //we don't need coalesce func, last message wins 
      null  //we override receive method, so no need to pass it
    ) 
  {}
  
  public Void reset(IProject project) 
  {
    send(Unsafe(project))
  }
  
  override Obj? receive(Obj? msg)
  {
    try
    {
      project := (msg as Unsafe).val as IProject
      if( !project.isAccessible)
      {
        return null
      }
      scriptProject := DLTKCore.create(project)
      DLTKCore.getBuildpathContainerInitializer(ScriptRuntime.INTERPRETER_CONTAINER)
        .initialize(containerPath(scriptProject), scriptProject)
      
    } catch(Err e)
    {
      e.trace
      throw e
      //TODO: add normal error reporting
    }
    return null
  }
  
  private IPath? containerPath(IScriptProject project) 
  { 
    IBuildpathEntry? entry := project.getRawBuildpath.find |IBuildpathEntry entry->Bool|
    {
      entry.getEntryKind == IBuildpathEntry.BPE_CONTAINER &&
      entry.getPath.segments.first == ScriptRuntime.INTERPRETER_CONTAINER
    }
    return entry?.getPath
  } 
  
}
