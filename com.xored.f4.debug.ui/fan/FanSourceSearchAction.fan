//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   diman 06.08.2010 - Initial Contribution
//

using [java] org.eclipse.jface.action::Action;

class FanSourceSearchAction : Action
{
  Str? traceLine
  new make(Str? traceLine)
  {
    this.traceLine = traceLine
  }
  
  override Void run()
  {
    if(traceLine == null) return
    
    link := FanHyperlink(traceLine)
    job := SourceSearchJob(link)
    job.schedule
  } 
}
