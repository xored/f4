using [java] org.eclipse.dltk.ui.text.completion
using [java] org.eclipse.jface.text.templates
using "[java]com.xored.fanide.internal.ui.templates"

public class FanTypeCompletionProposalComputer :
    ScriptCompletionProposalComputer {

  override TemplateCompletionProcessor? createTemplateProposalComputer(
      ScriptContentAssistInvocationContext? context) {
    return FanTemplateCompletionProcessor(context)
  }

  override ScriptCompletionProposalCollector? createCollector(
      ScriptContentAssistInvocationContext? context) {
    return FanCompletionProposalCollector(context.getSourceModule());
  }

}
