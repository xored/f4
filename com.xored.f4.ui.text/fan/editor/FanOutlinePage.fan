using [java] org.eclipse.ui::IActionBars
using [java] org.eclipse.jface.preference::IPreferenceStore
using [java] org.eclipse.dltk.core::IModelElement
using [java] org.eclipse.dltk.ui::DLTKPluginImages
using [java] org.eclipse.dltk.ui.actions::MemberFilterActionGroup
using [java] org.eclipse.dltk.ui.viewsupport::MemberFilterAction
using [java] org.eclipse.dltk.ui.viewsupport::ModelElementFilter
using "[java]org.eclipse.dltk.internal.ui.editor"::IScriptEditor
using "[java]org.eclipse.dltk.internal.ui.editor"::ScriptOutlinePage

class FanOutlinePage : ScriptOutlinePage
{
  new make(IScriptEditor? editor, IPreferenceStore? store) : super(editor, store) { }
  
  protected override Void registerSpecialToolbarActions(IActionBars? actionBars)
  {
    memberFilterActionGroup := MemberFilterActionGroup(fOutlineViewer, fStore)

    // order corresponds to order in toolbar
    memberFilterActionGroup.setActions([
      action(memberFilterActionGroup,"field","fields",IModelElement.FIELD),
      action(memberFilterActionGroup,"method","methods",IModelElement.METHOD),
      action(memberFilterActionGroup,"class","classes",IModelElement.FIELD)
    ])
    memberFilterActionGroup.contributeToToolBar(actionBars.getToolBarManager)
  }
  
  private MemberFilterAction action(MemberFilterActionGroup memberFilterActionGroup,
    Str singular, Str plural, Int kind)
  {
    res := MemberFilterAction(memberFilterActionGroup, "Hide &"+plural.capitalize,
      ModelElementFilter(IModelElement.FIELD), "", true)
    res.setDescription("Toggles the visibility of "+plural)
    res.setToolTipText("Hide "+plural.capitalize)
    DLTKPluginImages.setLocalImageDescriptors(res, "filter_${plural}.gif")
    return res
  }
}
