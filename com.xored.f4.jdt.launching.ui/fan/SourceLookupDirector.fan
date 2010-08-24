//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 28, 2010 - Initial Contribution
//

using [java] org.eclipse.core.resources
using [java] org.eclipse.debug.core.sourcelookup
using [java] org.eclipse.debug.core.sourcelookup.containers
using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.ui
using [java] org.eclipse.dltk.internal.ui.editor
using [java] org.eclipse.jdt.launching.sourcelookup.containers
using [java] org.eclipse.debug.ui
using [java] org.eclipse.debug.internal.ui
using [java] org.eclipse.ui
using [java] org.eclipse.ui.part

using f4core
**
**
**
class SourceLookupDirector : AbstractSourceLookupDirector, ISourcePresentation
{
  override Void initializeParticipants()
  {
    addParticipants(ISourceLookupParticipant[SourceLookupParticipant(), 
      JavaSourceLookupParticipant()])
  }
  
  private static const Str[] supportedTypes :=
    [
      ProjectSourceContainer.TYPE_ID,
      WorkspaceSourceContainer.TYPE_ID,
      "org.eclipse.debug.ui.containerType.workingSet"
    ]
  
  override Bool supportsSourceContainerType(ISourceContainerType? type)
  {
    supportedTypes.contains(type.getId)
  }
  
  
  override Str? getEditorId(IEditorInput? input, Obj? elem) 
  {
    elem is ISourceModule ? 
      DLTKUILanguageManager.getLanguageToolkit(F4Nature.id).getEditorId(elem) :
      getJDIPresentation.getEditorId(input, elem)
  }

  override IEditorInput? getEditorInput(Obj? elem) 
  {
    if (elem is IStorage) 
      return ExternalStorageEditorInput(elem as IStorage)
    else if (elem is ISourceModule) 
      return FileEditorInput((elem as ISourceModule).getResource)
    return getJDIPresentation.getEditorInput(elem);
  }

  private static IDebugModelPresentation getJDIPresentation() 
  {
    (DebugUIPlugin.getModelPresentation as DelegatingModelPresentation).getPresentation(jdiModelId);
  }
  
  private static const Str jdiModelId := "org.eclipse.jdt.debug"; //$NON-NLS-1$

}
