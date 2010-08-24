//
// Copyright (c) 2009-2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Alexey Alexandrov Apr 29, 2010 - Initial Contribution
//

using [java]org.eclipse.dltk.compiler.task
using [java]org.eclipse.core.resources
using f4parser

class TodoProcessor
{
  
  private static const Str:Int priorities := [
    TodoTask.PRIORITY_NORMAL : IMarker.PRIORITY_NORMAL,
    TodoTask.PRIORITY_LOW : IMarker.PRIORITY_LOW,
    TodoTask.PRIORITY_HIGH : IMarker.PRIORITY_HIGH,
  ]
  
  private ITaskReporter reporter
  private Regex regex
  private Str:Int tags := [:]
  
  new make(ITaskReporter reporter, ITodoTaskPreferences preferences) {
    this.reporter = reporter
    preferences.getTaskTags.toArray.each |TodoTask task|
    {
      tags.add(task.name, priorities[task.priority])
    }
    
    names := tags.keys.join("|")
    //Changed pattern to include optional colon after name -- Ivan
    regex = Regex.fromStr("^(${names}):?(|\\s.*)\$")
  }
  
  public Void process(Comment comment) {
    text := comment.text.trim
    m := regex.matcher(text)
    
    if (m.matches) {
      reporter.reportTask(
        text,
        comment.line - 1,
        tags[m.group(1)],
        comment.start,
        comment.end + 1)
    }
  }
  
}
