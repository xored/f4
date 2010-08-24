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
class QnameCompletionProvider : CompletionProvider
{
  //////////////////////////////////////////////////////////////////////////
  // Constructor and overrides
  //////////////////////////////////////////////////////////////////////////
  new make(IFanNamespace ns, Str src, CUnit unit) : super(ns, src, unit) {}
  
  override Bool setInput(Int pos, Str prefix)
  {
    super.setInput(pos, prefix)
    if(src[pos-1..pos] != "::") return false
    path = AstFinder.find(unit, pos-1)
    return true
  }
  
  override Bool complete(CompletionReporter reporter)
  {
    super.complete(reporter)
    reportPodTypes(pod)
    return true
  }
  //////////////////////////////////////////////////////////////////////////
  // Provider-spefific privates
  //////////////////////////////////////////////////////////////////////////
  private AstPath? path
  
  private once IFanPod? pod()
  {
    podRef := path.last as PodRef
    if(podRef != null) return podRef.modelPod ?: ns.findPod(podRef.text)
    podName := ParseUtil.wordStart(src, pos-2)
    return ns.findPod(podName)
  }
}
