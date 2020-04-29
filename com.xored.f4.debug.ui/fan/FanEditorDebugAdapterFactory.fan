//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 2, 2010 - Initial Contribution
//

using [java] java.util::HashMap
using [java] org.eclipse.dltk.core::ISourceModule
using [java] org.eclipse.dltk.core::IProjectFragment
using [java] org.eclipse.dltk.core::IModelElement
using [java] org.eclipse.dltk.ui::DLTKUIPlugin
using [java] org.eclipse.dltk.debug.ui
using [java] org.eclipse.dltk.debug.ui.breakpoints
using [java] org.eclipse.dltk.debug.ui.breakpoints::Messages as Msgs
using [java] org.eclipse.jdt.debug.core
using [java] org.eclipse.debug.core.model
using [java] org.eclipse.jface.viewers
using [java] org.eclipse.jface.text
using [java] org.eclipse.ui
using [java] org.eclipse.ui.texteditor
using [java] org.eclipse.core.runtime.jobs
using [java] org.eclipse.core.runtime
using [java] org.eclipse.core.resources
using [java] org.eclipse.osgi.util

using f4core
using f4core::FantomProjectManager2
using f4parser

class FanEditorDebugAdapterFactory : ScriptEditorDebugAdapterFactory
{
  override protected ScriptToggleBreakpointAdapter? getBreakpointAdapter()
  {
    FanToggleBreakpointAdapter()
  }
}

**************************************************************************
** FanToggleBreakpointAdapter
**************************************************************************
class FanToggleBreakpointAdapter : ScriptToggleBreakpointAdapter
{
  override protected IScriptBreakpointLineValidator? getValidator()
  {
    ScriptBreakpointLineValidatorFactory.createNonEmptyNoCommentValidator("//")
  }
   
  override protected Str? getDebugModelId() { JDIDebugModel.getPluginIdentifier() }
  
  override Void toggleMethodBreakpoints(IWorkbenchPart? part, ISelection? selection)
  {
    //Not implemented
  }
  
  override Bool canToggleMethodBreakpoints(IWorkbenchPart? part, ISelection? selection)
  {
    false
  }
  
  override Void toggleWatchpoints(IWorkbenchPart? part, ISelection? selection) 
  {
    //Not implemented
  }
  
  override Bool canToggleWatchpoints(IWorkbenchPart? part, ISelection? selection)
  {
    false
  }
  
  override Void toggleBreakpoints(IWorkbenchPart? part, ISelection? selection)
  {
    toggleLineBreakpoints(part, selection)
  }
  
  override Bool canToggleBreakpoints(IWorkbenchPart? part, ISelection? selection)
  {
    canToggleLineBreakpoints(part, selection)
  }
  
  override Void toggleLineBreakpoints(IWorkbenchPart? part, ISelection? selection)
  {
    job := ToggleLineBreakpoint(this, part, getTextEditor(part), selection)
    job.setSystem(true)
    job.schedule
  }
  
  //////////////////////////////////////////////////////////////////////////
  // Methods below are just visibility expanders for protected methods
  //////////////////////////////////////////////////////////////////////////
  **
  ** Just the way to make method available to job below
  ** 
  internal Void internalReport(Str? message, IWorkbenchPart? part)
  {
    report(message, part)
  }
  
  internal Str? internalGetDebugModelId() { getDebugModelId }
  
  internal Int internalFindBreakpointLine(IDocument? doc, Int line)
  {
    return findBreakpointLine(doc, line, getValidator)
  }
  
  internal Bool lineNotFound(Int line)
  {
    line == BREAKPOINT_LINE_NOT_FOUND
  }
  
  
  internal Bool addLineBreakpoint(ITextEditor? editor, Int lineNumber)
  {
    doc := editor.getDocumentProvider.getDocument(editor.getEditorInput)
    try
    {
      IRegion line := doc.getLineInformation(lineNumber - 1)
      start := line.getOffset 
      end := start + line.getLength
      fanClassName := getFanClass(editor, start)
      if(fanClassName == null) return false
      
      res := BreakpointUtils.getBreakpointResource(editor)
      
      if(res == null || res is IWorkspaceRoot)
      {
        return addLibBp(editor, fanClassName, lineNumber, start, end)
      }
      
      loc := BreakpointUtils.getBreakpointResourceLocation(editor)
      Str? podName := loc == null ? 
        loc.removeFileExtension.lastSegment.replace(".", "") + "_0" : 
        getResourcePodName(res)
      
      if(podName == null) return false
      
      JDIDebugModel.createStratumBreakpoint(
        res, null, null, null,
        "fan.${podName}.${fanClassName}",
        lineNumber, start, end,
        0, true, null)
      
      return true
      
    } catch(Err e)
    {
      e.trace //TODO: add normal error reporting
    }
    return false
  }
  
  private Bool addLibBp(ITextEditor editor, Str fanClassName, 
    Int lineNumber, Int start, Int end)
  {
    //Fan library
    IModelElement? elem := editor.getEditorInput.getAdapter(
      InteropUtil.getClass(IModelElement#))
   
    podName := getElementPodName(elem)
    if(podName == null) return false
    
    IProjectFragment? fragment := elem.getAncestor(IProjectFragment.PROJECT_FRAGMENT)
    IResource? res := ResourcesPlugin.getWorkspace.getRoot
    
    typeName := "fan.${podName}.${fanClassName}"
    
    map := HashMap()
    map.put(IMarker.LOCATION, fragment.getPath.toPortableString)
    JDIDebugModel.createLineBreakpoint(res, typeName,
      lineNumber, start, end, 0, true, map)
    return true
  }
  
  //////////////////////////////////////////////////////////////////////////
  // Private helper methods
  //////////////////////////////////////////////////////////////////////////
  private Str? getFanClass(ITextEditor editor, Int offset)
  {
    input := editor.getEditorInput
    if(input == null) return null
    
    ISourceModule? module := 
      DLTKUIPlugin.getEditorInputModelElement(input) ?:
      DLTKUIPlugin.getDefault.getWorkingCopyManager.getWorkingCopy(input, false)
    
    unit := ParseUtil.parse(module)
    
    path := AstFinder.find(unit, offset)
    Closure? closure := path.findLast(Closure#)
    TypeDef? def := path.findLast(TypeDef#)
    if (closure == null) {
      if(def != null && def.modifiers.list.any { it.id == ModifierId.Mixin }) {
        return "$def.name.text\$"
      }
      return def?.name?.text      
    } else {
      MethodDef? method := path.findLast(MethodDef#)
      resolver := ClosureIndexResolver(closure)
      unit.accept(resolver)
      Int? id := resolver.getId
      return "${def?.name?.text}\$${method?.name?.text}\$${id}"
    }
    
  }
  
  private Str? getElementPodName(IModelElement? elem)
  {
    if(elem == null) return null
    IProjectFragment pf := elem.getAncestor(IProjectFragment.PROJECT_FRAGMENT)
    if(pf.isArchive && pf.isExternal)
    {
      path := pf.getPath
      if(path.getFileExtension != F4Consts.podExt) return null
      
      return path.removeFileExtension.lastSegment
    }
    return getResourcePodName(elem.getScriptProject.getProject)
    
  }
  
  private Str? getResourcePodName(IResource? res)
  {
    FantomProjectManager2.instance.get(res.getProject).podName
  }
}

**************************************************************************
** ToggleLineBreakpointJob
**************************************************************************
class ToggleLineBreakpoint : Job
{
  new make(FanToggleBreakpointAdapter adapter, 
    IWorkbenchPart? part,
    ITextEditor? editor,
    ISelection? selection) : 
    super("Script Toggle Line Breakpoint")
  {
    this.adapter = adapter
    this.part = part
    this.selection = selection
    this.editor = editor
  }
  private ITextEditor? editor
  private FanToggleBreakpointAdapter adapter
  private IWorkbenchPart? part
  private ISelection? selection
  
  protected IBreakpoint? findBreakpoint(Int line)
  {
    BreakpointUtils.findLineBreakpoint(editor, line, adapter.internalGetDebugModelId)
  }
  override protected IStatus? run(IProgressMonitor? monitor)
  {
    if(editor == null || selection isnot ITextSelection) return Status.OK_STATUS
    if(monitor.isCanceled) return Status.CANCEL_STATUS
    adapter.internalReport(null, part) //TODO: do we really need this?
    
    line := (selection as ITextSelection).getStartLine + 1
    IBreakpoint? bp := findBreakpoint(line)
    
    if(bp != null)
    {
      //delete and return
      while((bp = findBreakpoint(line)) !=null)
        bp.delete
      return Status.OK_STATUS
    }
    
    doc := editor.getDocumentProvider?.getDocument(editor.getEditorInput)
    if(doc == null) return Status.CANCEL_STATUS
    
    line = adapter.internalFindBreakpointLine(doc, line - 1) + 1
    if(adapter.lineNotFound(line))
    {
      adapter.internalReport(
        Msgs.ScriptToggleBreakpointAdapter_invalidBreakpointPosition, part)
      return Status.OK_STATUS
    }
    
    if(findBreakpoint(line) == null)
    {
      if(!adapter.addLineBreakpoint(editor, line))
        adapter.internalReport(
          Msgs.ScriptToggleBreakpointAdapter_invalidBreakpointPosition, part)
      return Status.OK_STATUS
    } 
    
    adapter.internalReport(
      NLS.bind(
        Msgs.ScriptToggleBreakpointAdapter_breakpointAlreadySetAtLine,
        [line]
      ),
      part
    )
    return Status.OK_STATUS
  }
}

class ClosureIndexResolver : AstVisitor { 

  private const Closure closure;
  private Int cur := 0
  private Int? id := null
  
  new make(Closure closure) {
    this.closure = closure
  }
 
  override Bool enterNode(Node n) {
    if (n == closure) id = cur
    if (n is Closure) cur++
    return true
  }

  public Int? getId() {
    return id
  }
  
}