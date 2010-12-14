//
// Copyright (c) 2009-2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Andrey Platov Oct 12, 2009 - Initial Contribution
//   Ivan Inozemtsev Apr 09, 2010 - Reanimation
//
using compiler
using f4core

using [java]java.util::List as JList 
using [java]java.util::Set as JSet
using [java]org.eclipse.core.runtime
using [java]org.eclipse.core.resources::IFile
using [java]org.eclipse.core.resources::IResource
using [java]org.eclipse.core.resources::IProject
using [java]org.eclipse.core.resources::ResourcesPlugin
using [java]org.eclipse.dltk.compiler.problem::DefaultProblem
using [java]org.eclipse.dltk.compiler.problem::ProblemSeverities
using [java]org.eclipse.dltk.core
using [java]org.eclipse.dltk.core.builder
using [java]org.eclipse.core.filesystem::URIUtil
using [java]org.eclipse.jdt.core::JavaCore
using [java]org.eclipse.jdt.launching::JavaRuntime
using [java]org.eclipse.jdt.launching::IRuntimeClasspathEntry
using [java]org.eclipse.dltk.launching::LibraryLocation
using [java]com.xored.fanide.core.utils::FanProjectUtils

using [java]org.eclipse.dltk.logconsole::ILogConsoleManager
using [java]org.eclipse.dltk.logconsole::ILogConsole
using [java]org.eclipse.dltk.logconsole::LogConsolePlugin
using [java]org.eclipse.dltk.logconsole::LogConsoleType
**************************************************************************
** CompileFan
**************************************************************************
**
** IScriptBuilder implementationt to build Fantom projects
** 
class CompileFan : IScriptBuilder
{
  //////////////////////////////////////////////////////////////////////////
  // Interface methods
  //////////////////////////////////////////////////////////////////////////
  
  **
  ** Initialize before a build session
  ** 
  ** @param project
  **
  override Bool initialize(IScriptProject? project)
  {
    return true
  }

  override Void prepare(IBuildChange? change, IBuildState? state, IProgressMonitor? m)
  {
  }

  override Void build(IBuildChange? change, IBuildState? state, IProgressMonitor? m)
  {
    fp := fantomProject(change.getScriptProject)
    
    //buildPod(fp)
    allProjects := FantomProjectManager.instance.listProjects
    projectsToBuild := [fp].addAll(allDependents(fp, allProjects))
    projectsToBuild.sort |FantomProject a, FantomProject b -> Int|
    {
      //b depends on a
      if(allDependents(a,allProjects).contains(b)) return -1
      //a depends on b
      else if(allDependents(b,allProjects).contains(a)) return 1
      return 0
    }.each 
    { 
      buildPod(it) 
    }
  }
  
  override Void clean(IScriptProject? project, IProgressMonitor? monitor)
  {
    clearMarkers(project.getProject)
  } 

  override Void endBuild(IScriptProject? project, IProgressMonitor? monitor) 
  {
    reporters.vals.each { it.flush }
    reporters.clear
    building = false
  }

  

  private FantomProject[] allDependents(FantomProject project, FantomProject[] allProjects)
  {
    result := FantomProject[,]
    dependents(project, allProjects).each |p|
    {
      result.add(p)
      result.addAll(allDependents(p, allProjects))
    }
    return result.unique
  }
  
  private FantomProject[] dependents(FantomProject project, FantomProject[] allProjects)
  {
    allProjects.findAll |FantomProject candidate ->Bool| 
    { 
      candidate.rawDepends.any |Depend d -> Bool| 
      {
        d.name == project.podName
      }
    }
  }
  
  static const Str pluginId := "com.xored.f4.builder"
  **
  ** Called for each resource required to build. Only resources with specified
  ** project nature are here.
  ** 
  IStatus? buildModelElements(IScriptProject? project, JList? elements,
      IProgressMonitor? monitor, Int status)
  {
    allProjects := FantomProjectManager.instance.listProjects
    fp := fantomProject(project)
    projectsToBuild := [fp].addAll(allDependents(fp, allProjects))
    projectsToBuild.sort |FantomProject a, FantomProject b -> Int|
    {
      //b depends on a
      if(allDependents(a,allProjects).contains(b)) return -1
      //a depends on b
      else if(allDependents(b,allProjects).contains(a)) return 1
      return 0
    }.eachWhile 
    { 
      //so that we terminate build once at least one project fails
      buildPod(it) ? null : "" 
    }
    return Status(IStatus.OK, pluginId, "OK")
  }
  
  private FantomProject[] projectsFromElements(ISourceModule[] modules)
  {
    modules.map { fantomProject(it.getScriptProject) }.unique
  }
  
  private Bool buildPod(FantomProject fp)
  {
    building = true
    clearMarkers(fp.project)
    hasErrs := false
    createBuilder(fp).build { writeToLog(it) }.each |err| 
    {
      reportErr(err, fp.project)
      hasErrs = hasErrs || err.isErr
    }
    writeToLog //append empty line
    if(!hasErrs) refreshPod(fp)
    return hasErrs
  }
  
  private Void writeToLog(Str entry := "")
  {
    getConsole.println(entry.trimEnd)
    
  }
  private Builder createBuilder(FantomProject fp)
  {
    BuilderPrefs.get(fp).isUseExternalBuilder ? ExternalBuilder(fp) : InternalBuilder(fp) 
  }
  private Void refreshPod(FantomProject project)
  {
    if(project.rawOutDir == null || project.rawOutDir.isAbs) return
    path := Path("${project.rawOutDir.toStr}${project.podName}.pod")
    podFile := project.project.getFile(path) 
    try
    {
      podFile.refreshLocal(IResource.DEPTH_ZERO, null)
    } catch(Err e) 
    { 
      //do nothing
      //TODO: report warning
    }
  }
  
  //////////////////////////////////////////////////////////////////////////
  // Helper methods
  //////////////////////////////////////////////////////////////////////////
  private FantomProject fantomProject(IScriptProject project)
  {
    FantomProjectManager.instance[project.getProject]
  }
  private Bool buildRequired(FantomProject project, IFile[] resources)
  {
    resources.any |res|
    {
      res.getName == Manifest.filename || 
      project.resDirs.any |rd|
      {
        resDir := rd.path.join("/")
        resParent := res.getParent.getProjectRelativePath.toStr
        return resDir == resParent
      }
    }
  }
  //////////////////////////////////////////////////////////////////////////
  // Report errors methods
  //////////////////////////////////////////////////////////////////////////
  private IResource resource(IProject project, Str? file)
  {
    if (file != null) 
    {
      IFile[] files := ResourcesPlugin.getWorkspace.getRoot.
        findFilesForLocationURI(URIUtil.toURI(Path(file).makeAbsolute))
      if (!files.isEmpty) return files.first
    }
    return project
  }
  
  private Str:ProblemReporter reporters := [Str:ProblemReporter][:]
  
  private Void reportErr(CompilerErr err, IProject project)
  {
    resource := resource(project, err.file)
    reporter := reporters.getOrAdd(resource.getLocationURI.toString) |->Obj| { ProblemReporter(resource) }
    reporter.reportProblem(
      DefaultProblem(
        resource.getLocation.toString, 
        err.msg, 
        0, //id (don't know what this means)
        Str[,], //arguments (don't know what this means)
        err.isWarn || err.msg == "No fan source files found"? ProblemSeverities.Warning : ProblemSeverities.Error, //severity
        -1, //start position
        -1, //end position
        err.line ?: 0,
        err.col ?: 0
        )
      )
  }
  
  private Void clearMarkers(IProject project)
  {
    project.deleteMarkers(F4Consts.buildProblem, true, IResource.DEPTH_INFINITE)
  }
  
  private once ILogConsole getConsole() { console }
  
  private Bool building := false
  
  public static ILogConsole console() 
  {
    LogConsolePlugin.getConsoleManager.getConsole(BuildConsole())
  }
}

class BuildConsole : LogConsoleType
{
  new make() : super(CompileFan.pluginId) {}
  
  override Str? computeTitle(Obj? id) { "Fantom build" }
}
