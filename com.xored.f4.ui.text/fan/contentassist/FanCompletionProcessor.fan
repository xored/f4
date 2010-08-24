using [java] org.eclipse.dltk.ui.text.completion
using [java] org.eclipse.jface.text.contentassist
using [java] org.eclipse.ui
using [java] com.xored.fanide.core

class FanCompletionProcessor : ScriptCompletionProcessor {

  new make(IEditorPart? editor,
      ContentAssistant? assistant, Str? partition) 
  : super(editor, assistant, partition) {
  }

  override Str? getNatureId() {
    return FanNature.NATURE_ID
  }

}
