using [java] org.eclipse.dltk.ui.text.completion
using [java] org.eclipse.jface.text.templates

class FanTypeCompletionProposalComputer : ScriptCompletionProposalComputer {

	override TemplateCompletionProcessor? createTemplateProposalComputer(ScriptContentAssistInvocationContext? context) {
		FanTemplateCompletionProcessor(context)
	}

	override ScriptCompletionProposalCollector? createCollector(ScriptContentAssistInvocationContext? context) {
		FanCompletionProposalCollector(context.getSourceModule());
	}
}
