//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   ivaninozemtsev May 5, 2010 - Initial Contribution
//

using [java] org.eclipse.core.runtime::IPath
using [java] org.eclipse.core.runtime::Path
using [java] org.eclipse.core.resources::IResource
using [java] org.eclipse.dltk.core.environment::EnvironmentPathUtils
using [java] org.eclipse.dltk.core::IBuildpathEntry
**
**
**
class PathUtil
{
  **
  ** Convenience for resolvePath(EnvironmentPathUtils.getLocalPath(path))
  ** 
  static File? resolveLocalPath(IPath path, Bool checked := true)
  {
    try
    {
      return File.os(EnvironmentPathUtils.getLocalPath(path).toOSString)
    } catch(Err e)
    {
      if(checked) throw e
    }
    return null
  }
  
  **
  ** Get `sys::File` corresponding to eclipse IResource
  ** 
  static File resolveRes(IResource resource)
  {
    File.os(resource.getLocation.toOSString)
  }
  static File resolvePath(IPath path)
  {
    File.os(path.toOSString)
  }
  
  static File resolveLibPath(IBuildpathEntry entry)
  {
    str:= entry.getPath.segments.join("/")
    return Uri.fromStr("file:/$str").toFile
  }
  
  static IPath toPath(File f) { Path.fromOSString(f.osPath) }
  //////////////////////////////////////////////////////////////////////////
  // Interpreter-specific paths
  //////////////////////////////////////////////////////////////////////////
  static Uri fanHome(IPath interp) { resolveLocalPath(interp).uri[0..-3] }
 
  static File libByInterpreter(IPath interp) { (fanHome(interp) + `lib/fan/`).toFile }
  
  static File srcByInterpreter(IPath interp) { (fanHome(interp) + `src/`).toFile }
}
