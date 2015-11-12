//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   ivaninozemtsev Apr 19, 2010 - Initial Contribution
//

using [java]org.eclipse.core.resources::IProject
using [java]org.eclipse.core.resources::ResourcesPlugin
using [java]org.eclipse.jdt.core::JavaCore
using [java]org.eclipse.jdt.core::IJavaProject
using [java]org.eclipse.jdt.core.search::IJavaSearchScope
using [java]org.eclipse.jdt.core.search::SearchEngine
using [java]org.eclipse.jdt.launching::IRuntimeClasspathEntry
using [java]org.eclipse.jdt.launching::JavaRuntime
using [java]org.eclipse.dltk.launching::IInterpreterInstall
using [java]org.eclipse.dltk.core::DLTKCore
using [java]org.eclipse.dltk.core::IScriptProject
using [java]org.eclipse.dltk.launching::ScriptRuntime
using [java]org.eclipse.dltk.core::IBuildpathEntry
using [java]org.eclipse.dltk.launching::LibraryLocation
using [java]org.eclipse.pde.core.project::IBundleProjectDescription
using f4model
**
** Models a Fantom project
**
const class FantomProject
{
  new makeFromProject(IProject project)
  {
    iProjectHolder = Unsafe(project)
    baseDir = PathUtil.resolveRes(project)
    perrs := ProjectErr[,]
    berrs := ProjectErr[,]
    Manifest? manifest := null
    try
    {
      manifest = Manifest(this)
    } catch(Err e)
    {
//      e.trace
      perrs.add(ProjectErr(e.toStr))
      podName = "<unknown>"
      version = Version.defVal
      index = [Str:Obj][:]
      rawOutDir = `./`
      outDir = baseDir
      resDirs = Uri[,]
      jsDirs = Uri[,]
      javaDirs = Uri[,]
      summary = ""
      rawDepends = Depend[,]
      meta = [Str:Str][:]
      projectErrs = perrs
      return
    }
    
    if(manifest.podName != null)
      podName = manifest.podName
    else
    {
      podName = "<unknown>"
      berrs.add(ProjectErr("Pod name is not set"))
    }
    
    version = manifest.version
    index = manifest.index 
    rawOutDir = manifest.outDir
    isPlugin = project.getNature(IBundleProjectDescription.PLUGIN_NATURE) != null
    outDir = getOutDir(project, manifest) //resolveOutDir(baseDir.uri, manifest.outDir) ?: baseDir
    if (!isPlugin && isOutputNotSet) {
      perrs.add(ProjectErr("Output folder is not set"))
    }
    resDirs = manifest.resDirs             
    jsDirs = manifest.jsDirs
    javaDirs = manifest.javaDirs
    summary = manifest.summary
    meta = manifest.meta.dup
    rawDepends = manifest.depends.reduce(Depend[,]) |Depend[] r, Str raw -> Depend[]|
    {
      Depend? depend := null
      try { depend = Depend.fromStr(raw) } catch(Err e) {}
      if(depend != null)
        r.add(depend)
      else
        berrs.add(ProjectErr("Can't parse depend $raw", manifest.lines["depends"]))
      return r
    }
    projectErrs = perrs
    buildfanErrs = berrs
  }
  
  private File getOutDir(IProject project, Manifest manifest) {
    if(isPlugin) {
      return resolveOutDir(baseDir.uri, manifest.outDir) ?: baseDir
    }
    
    try {
      return (File.os(ResourcesPlugin.getWorkspace.getRoot
                .getFolder(javaProject.getOutputLocation)
                .getLocation.toFile.getAbsolutePath).uri.plusSlash).toFile
    } catch (Err e) {
      return baseDir
    }
  }
  
  public Bool isOutputNotSet() {
    javaProject.getOutputLocation.equals(javaProject.getPath)
  }
  
  public Bool isInterpreterSet()
  {
    ScriptRuntime.getInterpreterInstall(scriptProject) != null ? true : false
  }
  
  public IInterpreterInstall? getInterpreterInstall()
  {
    ScriptRuntime.getInterpreterInstall(scriptProject)
  }
  
  private File? resolveOutDir(Uri baseDir, Uri? outDir)
  {
    if(outDir != null)
    {
      result := outDir.isAbs ? outDir : (baseDir + outDir)
      return result.toFile
    }
    
    path := ScriptRuntime.getInterpreterInstall(scriptProject)?.getInstallLocation?.getPath
    
    if (path != null)
      return PathUtil.libByInterpreter(path)
    
    return null
  }
  
  new makeCopy(FantomProject project, |This|? f) 
  {
    iProjectHolder = Unsafe(project.project)
    this.baseDir = project.baseDir
    this.podName = project.podName
    this.index = project.index
    this.jsDirs = project.jsDirs
    this.outDir = project.outDir
    this.rawOutDir = project.rawOutDir
    this.rawDepends = project.rawDepends
    this.resDirs = project.resDirs
    this.summary = project.summary
    this.version = project.version
    this.projectErrs = project.projectErrs
    this.buildfanErrs = project.buildfanErrs
    this.meta = project.meta
    f?.call(this)
  }
  
  const ProjectErr[] projectErrs := ProjectErr[,]
  const ProjectErr[] buildfanErrs := ProjectErr[,]
  
  Bool hasErrs() { projectErrs.size + buildfanErrs.size > 0 }
  private const Unsafe iProjectHolder
  IProject project()
  {
    iProjectHolder.val
  }
  
  File[] classpath()
  {
    jp := JavaCore.create(project)
    
    entries := JavaRuntime.computeUnresolvedRuntimeClasspath(jp)
    resolved := IRuntimeClasspathEntry[,]
    entries.each |entry|
    {
      resolved.addAll(JavaRuntime.resolveRuntimeClasspathEntry(entry, jp))
    }
    
    return resolved.map { File.os(it.getLocation) }
  }
  
  IJavaProject javaProject()
  {
    return JavaCore.create(project)
  }
  
  File? javaOutput()
  {
    try
    {
      root := baseDir
      JavaCore.create(project).getOutputLocation.segments[1..-1].each |Str a|{ root += Uri.fromStr(a+"/") }
      return root
    }
    catch (Err e)
      return null
  }
  
//////////////////////////////////////////////////////////////////////////
// Build info
//////////////////////////////////////////////////////////////////////////  
  
  ** Absolute locations of required pods
  Str:File depends()
  {
    scriptProject.getResolvedBuildpath(false).findAll |IBuildpathEntry bp->Bool|
    {
      !bp.getPath.segments.first.toStr.startsWith(IBuildpathEntry.BUILDPATH_SPECIAL)
    }
    .map |IBuildpathEntry bp -> File? |
    {
      switch(bp.getEntryKind)
      {
        case IBuildpathEntry.BPE_LIBRARY: 
          return PathUtil.resolveLibPath(bp)
        case IBuildpathEntry.BPE_PROJECT:
          projectName := bp.getPath.segments.first
          project := ResourcesPlugin.getWorkspace.getRoot.getProject(projectName)
          if( project.isAccessible)
          {
            fp := FantomProjectManager.instance[project]
            return (fp.outDir.uri + `${fp.podName}.pod`).toFile
          }
          // Return null if project is not accessible
          return null
        default: return null
      }
    }
    .exclude {it == null}
    .reduce([Str:File][:]) | Str:File r, File v -> Str:File |
    {
      r[v.basename] = v
      return r
    }
  }
  
  FantomProject[] reqProjects()
  {
    scriptProject.getResolvedBuildpath(false).findAll |IBuildpathEntry bp->Bool|
    {
      !bp.getPath.segments.first.toStr.startsWith(IBuildpathEntry.BUILDPATH_SPECIAL) &&
      bp.getEntryKind == IBuildpathEntry.BPE_PROJECT
    }.map |IBuildpathEntry bp -> FantomProject|
    {
      projectName := bp.getPath.segments.first
      project := ResourcesPlugin.getWorkspace.getRoot.getProject(projectName)
      return FantomProjectManager.instance[project]
    }.exclude { it == null }
  }
    
  ** base directory for script and resource folders
  const File baseDir 

  const Depend[] rawDepends
  
  Uri[] srcDirs() 
  {
    unfoldDirs(scriptProject.getResolvedBuildpath(false).findAll |IBuildpathEntry bp -> Bool|
    {
      bp.getEntryKind == IBuildpathEntry.BPE_SOURCE
    }.map |IBuildpathEntry bp -> Uri|
    {
      bp.getPath.segments[1..-1].reduce(`./`) |Uri r, Str s -> Uri| { r.plusName(s, true) }
    }, baseDir.uri)
  }
  
  Str:File getAllPods()
  {
    result :=  [:]
    
    //add interpreter libraries
    libLocs := ScriptRuntime.getLibraryLocations(this.getInterpreterInstall) as LibraryLocation[]
    libLocs.each 
    {
      file := PathUtil.resolveLocalPath(it.getLibraryPath())
      result[file.basename] = file
    }
    
    //add workspace pods
    FantomProjectManager.instance.listProjects.each |FantomProject p|
    {
      result[p.podName] = (p.outDir.uri + `${p.podName}.pod`).toFile
    }
    
    //uncomment if necessary 
    //result.setAll(fp.depends)
    return result
  }
  
  const Uri[] resDirs
  
  const Uri[] jsDirs
    
  const Uri[] javaDirs
  ** absolute path of output directory
  const File outDir 
  
  const Uri? rawOutDir
  
  const Bool isPlugin
//////////////////////////////////////////////////////////////////////////
// Pod meta info
//////////////////////////////////////////////////////////////////////////
  ** Pod index
  const Str:Obj index
  
  ** Pod name
  const Str podName
    
  const Str summary
    
  const Version version
  
  ** Pod meta-data name/value pairs to compile into pod.  
  ** See `sys::Pod.meta`.
  const Str:Str meta
  
  ** Indicates if if fandoc API should be included in the documentation. 
  ** By default API is included.
  const Bool docApi := true
  
  ** Indicates if if source code should be included in the pod/documentation. 
  ** By default source code it not included.
  const Bool docSrc := false
  
  ** This is set / cleared by com.xored.f4.builder::CompileFan.build() after a pod compilation. 
//////////////////////////////////////////////////////////////////////////
// Private helper methods
//////////////////////////////////////////////////////////////////////////
  private Uri[] unfoldDirs(Uri[] dirs, Uri baseDir)
  {
    result := Uri[,]
    result.addAll(dirs)
    dirs.each |dir|
    {
      fullPath := (baseDir + dir).toFile
      result.addAll(
        unfoldDirs(
          fullPath.listDirs
          .exclude { disabledDirs.contains(it.basename) }
          .map { it.uri.relTo(baseDir)}
          , baseDir
        )
      )
    }
    return result
  }
  
  private static const Str[] disabledDirs := ["CVS"]
  
  IScriptProject scriptProject() { DLTKCore.create(project) }
  
  IFanNamespace ns() {
    DltkNamespace(this)
  }
}

**************************************************************************
** ProjectErr
**************************************************************************
const class ProjectErr
{
  new make(Str msg, Int line := -1)
  {
    this.msg = msg
    this.line = line
  }
  const Str msg
  const Int line
}