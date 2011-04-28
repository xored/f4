using [java] fanx.interop
using [java] org.eclipse.dltk.ui.templates::ScriptTemplateAccess
using [java] org.eclipse.dltk.ui.templates::ScriptTemplateCompletionProcessor
using [java] org.eclipse.dltk.ui.text.completion::ScriptContentAssistInvocationContext

/**
 * Fantom template completion processor
 */
class FanTemplateCompletionProcessor : ScriptTemplateCompletionProcessor
{
  new make(ScriptContentAssistInvocationContext context) : super(context) { }

  /*
   * @see org.eclipse.dltk.ui.templates.ScriptTemplateCompletionProcessor#getContextTypeId()
   */
  protected override const Str? getContextTypeId :=
      FanUniversalTemplateContextType.contextTypeId

  /*
   * @see org.eclipse.dltk.ui.templates.ScriptTemplateCompletionProcessor#getIgnore()
   */
  protected override once CharArray? getIgnore()
  {
    array := CharArray(1)
    array[0] = '.'
    return array
  }
  
  /*
   * @see org.eclipse.dltk.ui.templates.ScriptTemplateCompletionProcessor#getTemplateAccess()
   */
  protected override once ScriptTemplateAccess? getTemplateAccess() { FanTemplateAccess() }
}
