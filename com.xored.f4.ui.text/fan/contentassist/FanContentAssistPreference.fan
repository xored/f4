using [java] org.eclipse.dltk.ui.text
using [java] org.eclipse.dltk.ui.text.completion
using "[java]com.xored.fanide.internal.ui"

class FanContentAssistPreference : ContentAssistPreference {

  override ScriptTextTools? getTextTools() {
    return FanUI.getDefault().getTextTools()
  }

}
