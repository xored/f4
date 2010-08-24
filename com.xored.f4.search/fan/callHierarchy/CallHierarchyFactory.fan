//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 17, 2010 - Initial Contribution
//

using [java] org.eclipse.core.runtime::IProgressMonitor
using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.core.search
**
**
**
class CallHierarchyFactory : ICallHierarchyFactory
{
  override ICallProcessor? createCallProcessor() { CallProcessor() }
  
  override ICalleeProcessor? createCalleeProcessor(
      IMethod? method, IProgressMonitor? monitor,
      IDLTKSearchScope? scope
    )
  {
    CalleeProcessor(method, scope, monitor)
  }
}
