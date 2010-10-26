using [java]org.eclipse.jface.viewers
using [java]org.eclipse.jface.text
using "[java]com.xored.fanide.internal.ui.editor"

class AstSelectionChangedListener : ISelectionChangedListener
{
  
  private TreeViewer? tree
  
  new make(TreeViewer? tree) {
    this.tree = tree
  }
  
  override Void selectionChanged(SelectionChangedEvent? event) {
    editor := AstView.getEditor
    if (editor == null) return
    selection := tree.getSelection
    if (selection isnot TreeSelection) return
    selection->getPaths->find |TreePath path -> Bool| {
      AstNode node := path.getLastSegment
      sel := TextSelection(node.node.start, node.node.end - node.node.start + 1)
      editor.getSelectionProvider.setSelection(sel)
      return true
    }
  }
  
}
