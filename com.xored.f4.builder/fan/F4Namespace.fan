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
    fpod.read
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
  new make(File[] entries, IJavaProject? project) : super(entries)
  {
    this.project = project
  }
  
  override Str:Str[] loadClasses()
  {
//    scope := SearchEngine.createWorkspaceScope
//    SearchEngine engine := SearchEngine()
//    requestor := ClassPathTypeRequestor()
//    dc := InteropUtil.toCharArray("*".chars)
//    engine.searchAllTypeNames(dc,SearchPattern.R_PATTERN_MATCH, dc, 
//      SearchPattern.R_PATTERN_MATCH,
//      IJavaSearchConstants.CLASS_AND_INTERFACE,
//      scope,
//      requestor,
//      IJavaSearchConstants.WAIT_UNTIL_READY_TO_SEARCH, null)    
//    
//    return requestor.getClasses
    return Str:Str[][:]
  }
  
  protected Bool isClass(Uri uri)
  {
    uri.ext == "class" &&
    isValidPackage(uri) &&
    uri.basename != "Void"
  }
  
  **
  ** Originally FFI Bridge does not index packages 
  ** starting from "com.sun" or "sun" (probably due to performance)
  ** However we need com.sun.jdi.VirtualMachine for debugging
  ** 
  protected Bool isValidPackage(Uri uri)
  {
    package := uri.path[0..-2].join(".")
    if(!disabledPrefixes.any { package.startsWith(it) }) return true
    return enabledPrefixes.any { package.startsWith(it) }
  }
  
  private static const Str[] disabledPrefixes := ["com.sun", "sun"]
  private static const Str[] enabledPrefixes := ["com.sun.jdi"]
  
  
}

**************************************************************************
** F4JavaBridge
**************************************************************************
class F4JavaBridge : JavaBridge
{
  new make(Compiler c, F4Cp cp, IJavaProject? project) : super(c, cp)
  {
    registry = JavaTypeRegistry(cp, project)
    this.project = project
  }
  private JavaTypeRegistry registry
  private IJavaProject? project
  
  override CPod resolvePod(Str name, Loc? loc)
  {
    // the empty package is used to represent primitives
    if (name == "") return primitives
    
    IPackageFragmentRoot[] roots := project.getAllPackageFragmentRoots
    IPackageFragment[] allFragments := roots.map { it.getChildren.findAll {it is IPackageFragment && ((IPackageFragment)it).getElementName == name} }.flatten
        
    if( allFragments.size == 0)
    {
      return JavaPod(this, name, [,])
    }
    
    Str[] names := [,]
    allFragments.each {
      collectTypes(it, names)
    }
      
    // map package to JavaPod
    return JavaPod(this, name, names)
  }
  private Void collectTypes(IParent? element, Str[] names)
  {
    IJavaElement[]? childs := element.getChildren
    childs.each | IJavaElement childElement |
    {
      if( childElement.getElementType == IJavaElement.TYPE )
      {
        IType t := childElement
        ename := t.getTypeQualifiedName('$')
        if( !names.contains(ename)) names.add(ename)
      }
      if( childElement is IParent && 
        !(childElement.getElementType == IJavaElement.FIELD || childElement.getElementType == IJavaElement.METHOD) )
      {
        collectTypes((IParent)childElement, names)
      }
    }
  }
  
  override Void loadType(JavaType type, Str:CSlot slots)
  {
    try
    {
      registry.load(type, slots)
    } catch(Err e) 
    {
      e.trace
      err("Failed to load java type '${type.name}': ${e.msg}", null)
    }
  }
}