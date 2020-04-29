using f4core
using f4core::FantomProjectManager2
using f4model
using f4parser
using f4uiText
using [java]org.eclipse.ui
using [java]org.eclipse.ui.part
using [java]org.eclipse.swt.widgets
using [java]org.eclipse.jface.viewers
using [java]org.eclipse.dltk.ui
using [java]org.eclipse.dltk.core

class AstView : ViewPart, IPartListener
{ 
  private TreeViewer? tree
  private ReconcileListener reconcileListener := ReconcileListener(this)
  
  override Void createPartControl(Composite? parent) {
    tree = TreeViewer(Tree(parent, 0))
    tree.setContentProvider(AstContentProvider())
    tree.setLabelProvider(AstLabelProvider())
    tree.addSelectionChangedListener(AstSelectionChangedListener(tree))
    PlatformUI.getWorkbench?.getActiveWorkbenchWindow?.getPartService?.addPartListener(this)
  }
 
  override Void dispose() {
    PlatformUI.getWorkbench?.getActiveWorkbenchWindow?.getPartService?.removePartListener(this);
    super.dispose
  }
  override Void setFocus() {
    tree.getControl().setFocus()
  }
  
  public Void update(ISourceModule? module) {
    unit := (module == null) ? null : parse(module)
    node := (unit == null) ? null : AstNode(null, unit)
    if(tree.getTree.isDisposed) return
    tree.setInput([node])
    tree.expandToLevel(3)
  }

  public static FanEditor? getEditor() {
    editor := PlatformUI.getWorkbench?.getActiveWorkbenchWindow?.getActivePage?.getActiveEditor
    if (editor is FanEditor) {
      return editor
    } else {
      return null
    }
  }
  
  private static ISourceModule? getSourceModule(FanEditor? editor) {
    input := editor?.getEditorInput
    if (input == null) return null
    return DLTKUIPlugin.getEditorInputModelElement(input)
  }

  private static CUnit parse(ISourceModule? module) {
    Str source := module->getSourceContents
    return Parser(source, getNamespace(module)).cunit 
  }

  private static IFanNamespace getNamespace(ISourceModule? content) {
    project := content?.getScriptProject?.getProject
    if (project == null || !project.isOpen) return EmptyNamespace()
    return FantomProjectManager2.instance.get(project).ns
  }
  
  override Void partActivated(IWorkbenchPart? part) {
    if (part is IEditorPart) {
      fanPart := part as FanEditor
      update(getSourceModule(fanPart))
      fanPart?.addReconcileListener(reconcileListener)
    }
  }

  override Void partBroughtToTop(IWorkbenchPart? part) {
  }

  override Void partClosed(IWorkbenchPart? part) {
    if (part is FanEditor) update(null)
  }

  override Void partDeactivated(IWorkbenchPart? part) {
    fanPart := part as FanEditor
    fanPart?.removeReconcileListener(reconcileListener)
  }

  override Void partOpened(IWorkbenchPart? part) {
  }
  
}