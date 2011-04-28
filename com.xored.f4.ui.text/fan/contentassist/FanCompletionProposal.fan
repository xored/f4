using [java] org.eclipse.dltk.ui
using [java] org.eclipse.dltk.ui.text.completion
using [java] org.eclipse.jface.preference
using [java] org.eclipse.swt.graphics
using "[java]com.xored.fanide.internal.ui"::FanUI
using [java] com.xored.f4.ui.text

public class FanCompletionProposal : ScriptCompletionProposalBridge {

  new make(Str? replacementString,
      Int replacementOffset, Int replacementLength, Image? image,
      Str? displayString, Int relevance, Bool isInDoc) 
  : super(replacementString, replacementOffset, replacementLength, image,
        displayString, relevance, isInDoc)
  {
  }

  override Bool insertCompletion()
  {
    FanUI.getDefault.getPreferenceStore
      .getBoolean(PreferenceConstants.CODEASSIST_INSERT_COMPLETION)
  }

}
