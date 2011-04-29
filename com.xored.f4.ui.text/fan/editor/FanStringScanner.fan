using [java] java.util::ArrayList
using [java] java.util::List as JList
using [java] org.eclipse.jface.preference::IPreferenceStore
using [java] org.eclipse.jface.text.rules::WhitespaceRule
using [java] org.eclipse.dltk.ui.text::AbstractScriptScanner
using [java] org.eclipse.dltk.ui.text::IColorManager

class FanStringScanner : AbstractScriptScanner
{
  new make(IColorManager manager, IPreferenceStore store) : super(manager, store)
  {
    initialize();
  }

  protected override Str?[]? getTokenProperties() { [FanColorConstants.string] }

  protected override JList? createRules()
  {
    rules := ArrayList()
    // Add generic whitespace rule.
    rules.add(WhitespaceRule(|Int a->Bool|{ a.isSpace }))

    // TODO: Add here ${name} variables handling.

    setDefaultReturnToken(getToken(FanColorConstants.string))
    return rules
  }

}
