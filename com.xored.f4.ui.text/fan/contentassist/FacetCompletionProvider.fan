//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 19, 2010 - Initial Contribution
//

using f4core
using f4model
using f4parser
**
** This provider works when we completing something after "::"
**
class FacetCompletionProvider : CompletionProvider
{
  //////////////////////////////////////////////////////////////////////////
  // Constructor and overrides
  //////////////////////////////////////////////////////////////////////////
  new make(IFanNamespace ns, Str src, CUnit unit) : super(ns, src, unit) {}
  
  override Bool setInput(Int pos, Str prefix)
  {
    super.setInput(pos, prefix)
    path = AstFinder.find(unit, pos)
    if( path.last is FacetDef) return true
    return false
  }
  
  override Bool complete(CompletionReporter reporter)
  {
    super.complete(reporter)
    ns.podNames.each
    {
      //if( availablePods.contains(it))
      pod := ns.findPod(it)
      pod.typeNames.findAll { it.startsWith(prefix) } .each {
        IFanType? type := pod.findType(it)
        if( type != null)
        {
          if( type.isFacet)
          {
            reportType(type)
          }
        }
      }
    }
    return true
  }
  //////////////////////////////////////////////////////////////////////////
  // Provider-spefific privates
  //////////////////////////////////////////////////////////////////////////
  private AstPath? path
}
