//
// Copyright (c) 2009-2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Apr 09, 2010 - Initial contribution
//

using [java]org.eclipse.dltk.compiler.problem::ProblemCollector
using [java]org.eclipse.core.resources::IResource
using [java]org.eclipse.dltk.compiler.problem::IProblem
using [java]org.eclipse.core.resources::IMarker
using [java]java.lang::Integer

using f4core

class ProblemReporter : ProblemCollector
{
  IResource resource
  new make(IResource resource) { this.resource = resource }
  
  Void flush()
  {
    problems.toArray.each |IProblem p|
    {
      marker := resource.createMarker(F4Consts.buildProblem)
      marker.setAttribute(IMarker.LINE_NUMBER, Integer(p.getSourceLineNumber))
      marker.setAttribute(IMarker.MESSAGE, p.getMessage)
      marker.setAttribute(IMarker.LOCATION, resource.getFullPath.toString)
      marker.setAttribute(IMarker.SEVERITY, p.isWarning? IMarker.SEVERITY_WARNING: IMarker.SEVERITY_ERROR)
    }
    problems.clear
  }

}
