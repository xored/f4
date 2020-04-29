//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 2, 2010 - Initial Contribution
//

using [java] org.eclipse.ui.console
using [java] org.eclipse.ui.ide
using [java] org.eclipse.ui.texteditor
using [java] org.eclipse.ui.progress
using [java] org.eclipse.core.runtime
using [java] org.eclipse.core.runtime.jobs
using [java] org.eclipse.core.resources
using [java] org.eclipse.dltk.core.search
using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.debug.ui
using "[java]org.eclipse.dltk.internal.ui.editor"
using [java] com.xored.fanide.core
using f4core::FantomProjectManager
using f4core

class FanConsoleTracker : IPatternMatchListenerDelegate
{
  
  private TextConsole? console

  override Void connect(TextConsole? console) { this.console = console }
  
  override Void disconnect() { console = null }
  
  override Void matchFound(PatternMatchEvent? event)
  {
    try
    {
    offset := event.getOffset
    len := event.getLength
    text := console.getDocument.get(offset, len)
    link := FanFileHyperlink(console)
    if(FanFileHyperlink.isStackTraceLink(text))
    {
      //TODO: investigate fucking magic
      offset = offset + 1
      len = len - 2
    }
    
      console.addHyperlink(link, offset, len)

      
    } catch(Err e)
    {
      e.trace
    }
  }
}


**************************************************************************
** ConsoleMessages
**************************************************************************
class ConsoleMessages
{
  //TODO: localize
  static const Str unknownLink := "Unknown hyperlink"
  static const Str cantParseFile := "Unable to parse file name from hyperlink"
  static const Str searchJob := "Searching Fan type..."
  
}

**************************************************************************
** SourceSearchJob
**************************************************************************
class SourceSearchJob : Job
{
  private FanHyperlink link
  new make(FanHyperlink link) : super(ConsoleMessages.searchJob) 
  {
    this.link = link
  }
  
  override IStatus? run(IProgressMonitor? m)
  {
    
    Obj? result := ((tryFindInProjects ?: tryFindByPath) ?: tryFindSourceModule) ?: tryFindType
    
    if(result != null) 
      reportResults(result) 

    return Status.OK_STATUS
  }
  
  private Obj? tryFindByPath()
  {
    linkFileName := link.fileName
    return linkFileName == null ? null : ResourcesPlugin.getWorkspace.getRoot.getFileForLocation(Path(linkFileName))
  }
  
  private Obj? tryFindInProjects()
  {
    found := IResource[,]
    FantomProjectManager.instance.allProjects.each |fp|
    {
      if(link.projectName != null && link.projectName != fp.podName)
        return
      fp.project.accept |IResource? r -> Bool|
      {
        if(r.getType == IResource.FILE && r.getName == link.fileName)
          found.add(r)
        return r.getType == IResource.FILE
      }
    }
    return found.first
  }
  
  private Obj? tryFindSourceModule() 
  { 
    found := Obj[,]
    FantomProjectManager.instance.allProjects.each |fp|
    {
      if(fp.podName == link.projectName || 
        fp.project.getName == link.projectName)
      {
        //TODO: implement
      }
    }
    return found.first
  }
  
  private Obj? tryFindType() 
  {
    searcher := Searcher()
    toolkit := FanLanguageToolkit.getDefault
    engine := SearchEngine()
    pattern := SearchPattern.createPattern(
        link.typeName,
        IDLTKSearchConstants.TYPE,
        IDLTKSearchConstants.DECLARATIONS,
        SearchPattern.R_EXACT_MATCH,
        toolkit)
    engine.search(pattern, [SearchEngine.getDefaultSearchParticipant], 
        SearchEngine.createWorkspaceScope(toolkit),
        searcher,
        null)
    return searcher.result.first
  }

  
  private Void reportResults(Obj result)
  {
    job := ReportResultJob(result, link.typeName, link.lineNumber)
    job.setSystem(true)
    job.schedule
  }
  
}

**************************************************************************
** Searcher
**************************************************************************
internal class Searcher : SearchRequestor
{
  Obj[] result := Obj[,]
  override Void acceptSearchMatch(SearchMatch? match)
  {
    element := match.getElement
    if(element is IType) result.add(element)
  }
}

**************************************************************************
** ReportResultJob
**************************************************************************
class ReportResultJob : UIJob
{
  private Obj result
  private Str typeName
  private Int lineNumber
  new make(Obj result, Str typeName, Int lineNumber) : super("Link complete")
  {
    this.result = result
    this.typeName = typeName
    this.lineNumber = lineNumber
  }
  
  override IStatus? runInUIThread(IProgressMonitor? m)
  {
    editorInput := EditorUtility.getEditorInput(result)
    if(editorInput == null) return Status.OK_STATUS
    if(editorInput.getName.endsWith(".class")) return Status.OK_STATUS
    descriptor := IDE.getEditorDescriptor(editorInput.getName)
    if(descriptor == null || descriptor.getId == null) return Status.OK_STATUS
    
    editorPart := DLTKDebugUIPlugin.getActivePage.openEditor(
      editorInput, descriptor.getId)
    if(editorPart isnot ITextEditor || lineNumber < 0) return Status.OK_STATUS
    
    textEditor := editorPart as ITextEditor
    provider := textEditor.getDocumentProvider
    provider.connect(editorInput)
    doc := provider.getDocument(editorInput)
    line := doc.getLineInformation(lineNumber)
    textEditor.selectAndReveal(line.getOffset, line.getLength)
    provider.disconnect(editorInput)
    return Status.OK_STATUS
  }
}