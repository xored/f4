//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 13, 2010 - Initial Contribution
//

using compiler
using compilerJava
using [java]org.eclipse.jdt.core.search
using [java]org.eclipse.jdt.core
using [java]com.xored.fanide.core::FanCore
using [java]com.xored.fanide.core.utils::JDTSearchAllTypes
using f4core
**
**
**
class F4Namespace : CNamespace
{
  private const Str:File locs
  private const File[] cpEntries
  private IJavaProject? project
  new make(Str:File locs, File[] cpEntries := File[,], IJavaProject? project := null ) 
  {
    this.locs = locs
    this.cpEntries = cpEntries
    this.project = project
    init
  }
  
  override FPod? findPod(Str podName)
  {
    if(!locs.containsKey(podName)) return null
    loc := locs[podName]
    if(!loc.exists) return null
    fpod := FPod(this, podName, addZip(Zip.open(loc)))
    
    
    try fpod.read
    catch(Err e)
    {
      if(fpod.in(`/fcode/types.def`) == null && e is NullErr)
      {
        // Ivan Inozemtsev: Ignoring err, workaround for internal compiler NPE, 
        // see http://fantom.org/forum/topic/2386
      }
      else throw e
    }
    return fpod
  }
  
  override protected CBridge findBridge(Compiler c, Str name, Loc? loc)
  {
    return name == "java" ? F4JavaBridge(c, F4Cp(cpEntries, project), project) : super.findBridge(c, name, loc)
  }
  
  private Zip addZip(Zip zip) {
    zips.add(zip)
    return zip
  }
  private Zip[] zips := [,]
  
  public Void close() {
    zips.each { it.close }
  }
}

**************************************************************************
** F4Cp
**************************************************************************
class F4Cp : ClassPath
{
  private IJavaProject? project := null
  new make(File[] entries, IJavaProject? project) : super([,])
  {
    this.project = project
  }
}

**************************************************************************
** F4JavaBridge
**************************************************************************
class F4JavaBridge : JavaBridge
{
  new make(Compiler c, F4Cp cp, IJavaProject? project) : super(c)
  {
    registry = JavaTypeRegistry(cp, project)
    this.project = project
    this.cp = cp
  }
  JavaTypeRegistry registry
  IJavaProject? project
  
  override CPod resolvePod(Str name, Loc? loc)
  {
    if (name == "") return primitives
    return JdtJavaPod(this, ClassPathPackage(name))
  }
}