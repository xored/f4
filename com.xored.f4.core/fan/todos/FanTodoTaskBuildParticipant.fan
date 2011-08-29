//
// Copyright (c) 2009-2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Alexey Alexandrov Apr 29, 2010 - Initial Contribution
//

using [java]org.eclipse.dltk.core::ISourceModule
using [java]org.eclipse.dltk.core::SourceParserUtil
using [java]org.eclipse.dltk.core.builder
using [java]org.eclipse.dltk.compiler.task

using f4parser
using f4model

class FanTodoTaskBuildParticipant : IBuildParticipant
{
  
  private ITodoTaskPreferences preferences
  
  new make(ITodoTaskPreferences preferences) {
    this.preferences = preferences
  }
  
  override Void build(IBuildContext? context) {
    try
    {
      if (preferences.isEnabled) {
        ISourceModule? module := context.getSourceModule
        if( module != null && !module.isBinary)
        {
          Str? source := module.getSource
          if( source != null)
          {
            TodoTask? index := preferences.getTaskTags.toArray.find {
              source.indexIgnoreCase(((TodoTask)it).name) != null
            }
            if( index != null) 
            {            
              CUnit unit := parse(context.getSourceModule)
              processor := TodoProcessor(context.getTaskReporter, preferences)
              unit.comments.each { processor.process(it) }
            }   
          }
        }
      }
    } catch(Err e)
    {
      e.trace
      //TODO: add normal error reporting
    }
  }
  
  private static CUnit parse(ISourceModule? module) {
    DltkAst ast := SourceParserUtil.parse(module, null)
    return ast.unit 
  }
  
}
