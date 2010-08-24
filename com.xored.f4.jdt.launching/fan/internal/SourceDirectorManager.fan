//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 8, 2010 - Initial Contribution
//

using [java] org.eclipse.debug.core.sourcelookup
using [java] org.eclipse.core.runtime

**
**
**
class SourceDirectorManager 
{
  static ISourceLookupDirector? create()
  {
    IConfigurationElement[] elements := Platform.getExtensionRegistry().getConfigurationElementsFor(point)
    if(elements.isEmpty) return null
    className := elements.first.getAttribute(className)
    type := Type.find(className, false)
    if(type == null) return null
    return type.method("create", false)?.callOn(null, [,])
  }
  
  private static const Str className := "className"
  
  private static const Str point := "com.xored.f4.fanSourceDirector"
}
