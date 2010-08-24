//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 3, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.debug.core.model
**
**
**
class FanTypeFactory : IScriptTypeFactory
{
  private static const Str[] atomic := [,]
  
  override IScriptType? buildType(Str? type)
  {
    atomic.contains(type) ? AtomicScriptType(type) : ComplexScriptType(type)
  }
}
