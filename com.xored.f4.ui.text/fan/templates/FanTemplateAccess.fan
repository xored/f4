using [java] org.eclipse.jface.preference::IPreferenceStore
using [java] org.eclipse.dltk.ui.templates::ScriptTemplateAccess

using f4uiCore

/**
 * Provides access to the Fantom template store.
 */
class FanTemplateAccess : ScriptTemplateAccess
{
  /*
   * @see org.eclipse.dltk.ui.templates.ScriptTemplateAccess#getContextTypeId()
   */
  protected override const Str? getContextTypeId := FanUniversalTemplateContextType.contextTypeId

  /*
   * @see org.eclipse.dltk.ui.templates.ScriptTemplateAccess#getCustomTemplatesKey()
   */
  protected override const Str? getCustomTemplatesKey := "org.eclipse.fan.Templates"

  /*
   * @see org.eclipse.dltk.ui.templates.ScriptTemplateAccess#getPreferenceStore()
   */
  protected override IPreferenceStore? getPreferenceStore := FanUI.instance.plugin.getPreferenceStore { private set }
}
