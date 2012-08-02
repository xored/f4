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
  private Str:Int tags := [:]
  
  new make(ITaskReporter reporter, ITodoTaskPreferences preferences) {
    this.reporter = reporter
    preferences.getTaskTags.toArray.each |TodoTask task|
    {
      tags.add(task.name, priorities[task.priority])
    }
    names := tags.keys.join("|")
  }
  
  public Void process(Comment comment) {
    text := comment.text.trim
    text.splitLines.each |line, i| {
      if (line.trim.isEmpty) return
      haveTag := false
      if (tags.keys.any { line.contains(it) }){
        array := ""
        Str? tagWord
        haveTag = false
        words := line.split
        words.each | word | { 
          if (tags.keys.any { word.equals(it) }){
            if (haveTag){
              reporter.reportTask(
                tagWord + array,
                comment.line + i,
                tags[tagWord],
                comment.start,
                comment.end + 1)
              array = ""
            }
            haveTag = true
            tagWord = word
          } else {
            if (haveTag)
              array += " " + word
          }
        }
        if (haveTag) {
          reporter.reportTask(
                tagWord + array,
                comment.line + i,
                tags[tagWord],
                comment.start,
                comment.end + 1)
        }
      }
    }
  }
  
}
