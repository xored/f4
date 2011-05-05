using [java] java.util::ArrayList
using [java] java.util::List as JList
using [java] org.eclipse.jface.preference::IPreferenceStore
using [java] org.eclipse.dltk.ui.text::AbstractScriptScanner
using [java] org.eclipse.dltk.ui.text::IColorManager

class FanInterpreterStringScanner : AbstractScriptScanner
{

  new make(IColorManager manager, IPreferenceStore store) : super(manager, store)
  {
    initialize
  }

  protected override JList? createRules()
  {
    setDefaultReturnToken(getToken(FanColorConstants.interpreterString))
    return ArrayList()
  }

  protected override Str?[]? getTokenProperties() { [FanColorConstants.interpreterString] }
}
