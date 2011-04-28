using [java] java.util::ArrayList
using [java] java.util::List as JList
using [java] org.eclipse.jface.preference::IPreferenceStore
using [java] org.eclipse.jface.text.rules::WhitespaceRule
using [java] org.eclipse.dltk.ui.text::AbstractScriptScanner
using [java] org.eclipse.dltk.ui.text::IColorManager

class FanDslScanner : AbstractScriptScanner
{
  new make(IColorManager manager, IPreferenceStore store) : super(manager, store) { initialize }

  protected override JList? createRules()
  {
    setDefaultReturnToken(getToken(FanColorConstants.dsl))
    rules := ArrayList()
    rules.add(WhitespaceRule(|Int a->Bool|{ a.isSpace }))
    return rules
  }
  
  protected override Str?[]? getTokenProperties() { [FanColorConstants.dsl] }
}
