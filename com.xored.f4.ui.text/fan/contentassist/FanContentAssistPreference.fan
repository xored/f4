using [java] org.eclipse.dltk.ui.text
using [java] org.eclipse.dltk.ui.text.completion

class FanContentAssistPreference : ContentAssistPreference {

  override ScriptTextTools? getTextTools() {
    return FanTextTools.instance
  }

}
