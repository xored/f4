using [java] java.lang
using [java] org.eclipse.core.runtime
using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.ui.text.completion
using [java] org.eclipse.jface.text
using [java] org.eclipse.jface.text.contentassist
using [java] com.xored.f4.ui.text

class FanOverrideCompletionProposal : ScriptTypeCompletionProposal, ICompletionProposalExtension4 {

  private IScriptProject fDTLKProject
  private Str fMethodName
  private Str[] fParamTypes

  new make(IScriptProject? jproject, ISourceModule? cu, Str? methodName, 
    Str?[]? paramTypes, Int start, Int length, Str? displayName, Str? completionProposal) 
  : super(completionProposal, cu, start, length, null, displayName, 0)
  {
    fParamTypes= paramTypes
    fMethodName= methodName

    fDTLKProject= jproject
    
    setReplacementString(completionProposal ?: "")    
  }

  override CharSequence? getPrefixCompletionText(IDocument? document, Int completionOffset) {
    return String(fMethodName)
  }

  override Bool updateReplacementString(IDocument? document, Int trigger, Int offset) {
    IDocument buffer := Document(document.get())
    Int index := offset - 1
    while (index >= 0 && buffer.getChar(index).isAlphaNum) index--
    Int length := offset - index - 1
    buffer.replace(index + 1, length, " ")
    return true
  }
  
  override Bool isAutoInsertable() {
    return false
  }
  
  override IContextInformation? getContextInformation() {    
    return ContextInformation(getDisplayString(), getDisplayString());
  }
}
