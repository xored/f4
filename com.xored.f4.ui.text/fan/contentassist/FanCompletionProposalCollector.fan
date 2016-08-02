using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.ui.text.completion
using [java] org.eclipse.swt.graphics
using [java] com.xored.f4.ui.text
using f4core

public class FanCompletionProposalCollector :
    ScriptCompletionProposalCollectorBridge {

  new make(ISourceModule module) : super(module) {
  }
      
  override ScriptCompletionProposal? createScriptCompletionProposal1(
      Str? completion, Int replaceStart, Int length, Image? image,
      Str? displayString, Int i, Bool isInDoc)
  {
    return FanCompletionProposal(completion, replaceStart, length,
        image, displayString, i, isInDoc)
  }

  override ScriptCompletionProposal? createScriptCompletionProposal2(
      IScriptProject? scriptProject, ISourceModule? compilationUnit,
      Str? name, Str?[]? paramTypes, Int start, Int length,
      Str? displayName, Str? completionProposal)
  {
    return FanOverrideCompletionProposal(scriptProject,
        compilationUnit, name, paramTypes, start, length, displayName,
        completionProposal)
  }

  override IScriptCompletionProposal? createMethodReferenceProposal(
    CompletionProposal? methodProposal)
  {
    FanMethodCompletionProposal(methodProposal, getInvocationContext)
  }

  override Str? getNatureId() { F4Nature.id }
}
