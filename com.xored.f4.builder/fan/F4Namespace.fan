//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 13, 2010 - Initial Contribution
//

using compiler
using compilerJava
**
**
**
class F4Namespace : CNamespace
{
  private const Str:File locs
  private const File[] cpEntries
  new make(Str:File locs, File[] cpEntries := File[,]) 
  {
    this.locs = locs
    this.cpEntries = cpEntries
    init
  }
  
  override FPod? findPod(Str podName)
  {
    if(!locs.containsKey(podName)) return null
    loc := locs[podName]
    if(!loc.exists) return null
    fpod := FPod(this, podName, Zip.open(loc))
    fpod.read
    return fpod
  }
  
  override protected CBridge findBridge(Compiler c, Str name, Loc? loc)
  {
    return name == "java" ? F4JavaBridge(c, F4Cp(cpEntries)) : super.findBridge(c, name, loc)
  }
}

**************************************************************************
** F4Cp
**************************************************************************
class F4Cp : ClassPath
{
  new make(File[] entries) : super(entries)
  {
  }
  
  [Str:CfLoc]? locs
  
  override Str:Str[] loadClasses()
  {
    if(locs == null) locs = [Str:CfLoc][:]
    result := [Str:Str[]][:]
    visitClasses |f, c|
    {
      package := c.path[0..-2].join(".")
      name := c.basename
      qname := [package, name].join(".")
      locs[qname] = CfLoc(f, c)
      list := result.getOrAdd(package) |->Obj| { Str[,] }
      if(!list.contains(name)) list.add(name)
    }
    return result
  }
  Void visitClasses(|File entry, Uri cf| visitor)
  {
    entries.each |e|
    {
      eUri := e.uri
      if(e.isDir)
      {
        e.walk |c| 
        {
          cUri := c.uri.relTo(eUri)
          if(isClass(cUri)) 
          {
            visitor(e, cUri)
          }
        }
      }
      else
      {
        Zip? zip := null
        try
        {
          zip = Zip.open(e)
          zip.contents.keys.each |c|
          {
            if(isClass(c)) visitor(e, c)
          }
        } catch {} 
        finally { zip?.close }
      }
    }
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
** CfLoc
**************************************************************************
const class CfLoc
{
  const File entry
  const Uri cf
  new make(File entry, Uri cf) { this.entry = entry; this.cf = cf }
  
  Buf load() { entry.isDir ? loadDir : loadZip }
  
  protected Buf loadDir() { (entry + cf).readAllBuf }
  protected Buf loadZip() 
  {
    Zip? zip := null
    try
    {
      zip = Zip.open(entry)
      return zip.contents[cf].readAllBuf
    } 
    finally { zip?.close } 
  }
}

**************************************************************************
** F4JavaBridge
**************************************************************************
class F4JavaBridge : JavaBridge
{
  new make(Compiler c, F4Cp cp) : super(c, cp)
  {
    registry = JavaTypeRegistry(cp)
  }
  private JavaTypeRegistry registry
  
  override Void loadType(JavaType type, Str:CSlot slots)
  {
    try
    {
      registry.load(type, slots)
    } catch(Err e) 
    {
      err("Failed to load java type '${type.name}': ${e.msg}", null)
    }
  }
}