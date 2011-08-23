//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 25, 2010 - Initial Contribution
//

using [java] org.eclipse.core.runtime
using [java] org.eclipse.core.resources::IProject
using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.launching
using [java] org.eclipse.jdt.core

using f4core
**
**
**
class FanJavaContainer : IClasspathContainer
{
  private IPath path
  private IInterpreterInstall install
  private IScriptProject project
  new make(IInterpreterInstall fan, IPath path, IScriptProject project)
  {
    this.install = fan
    this.path = path
    this.project = project
  }
  
  override IClasspathEntry?[]? getClasspathEntries()
  {
    install := ScriptRuntime.getInterpreterInstall(project)
    if(install == null) return IClasspathEntry?[,]
    if(this.install != install) this.install = install
    
    IClasspathEntry?[] cpEntries := 
      jarDirs.map |Uri loc -> File[]|
      {
        (home + loc).toFile.listFiles.findAll { it.ext == "jar" }
      }.flatten.map |File f -> IClasspathEntry?|
      {
        createLibrary(f.normalize,f.basename)
      }
    
    fp := FantomProjectManager.instance[project.getProject]
    fp.depends.each |loc, name|
    {
      podFP := FantomProjectManager.instance.getByPod(name)
      if( podFP != null)
      {
        IProject prj := podFP.project
        if( prj.hasNature("org.eclipse.jdt.core.javanature"))
        {
         // Do not need to add entry
          return
        }
      }
      
      if(isJavaPod(loc))
        cpEntries.add(createLibrary(loc,name))
    }
    return cpEntries
  }
  
  private Uri home() { PathUtil.fanHome(install.getInstallLocation.getPath) }
  
  private IClasspathEntry createLibrary(File podFile,Str podName)
  {
    return JavaCore.newLibraryEntry(
      Path(podFile.osPath),
      Path((home + `src/$podName/java/`).toFile.osPath),
      Path("")
    )
  }
  
  private static Bool isJavaPod(File f)
  {
    if (!f.exists) return false;
    zip := Zip.open(f)
    try {
      return zip.contents.keys.any { ext == "class" }
    } finally {
      zip.close
    }
  }
  
  ** Dirs with jars relative to fan.home
  private const Uri[] jarDirs := [`lib/java/ext/`, `lib/java/`, `lib/java/ext/$Env.cur.os-$Env.cur.arch/`] 
  
  override Int getKind() { K_APPLICATION }
  
  override IPath? getPath() { path }
  
  override Str? getDescription() { "Fantom Native Libraries (Java)" }
 }
