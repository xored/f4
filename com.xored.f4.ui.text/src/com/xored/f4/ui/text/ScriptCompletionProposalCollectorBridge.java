package com.xored.f4.ui.text;

import org.eclipse.dltk.core.ISourceModule;
import org.eclipse.dltk.ui.text.completion.ScriptCompletionProposal;
import org.eclipse.dltk.ui.text.completion.ScriptCompletionProposalCollector;
import org.eclipse.swt.graphics.Image;

public abstract class ScriptCompletionProposalCollectorBridge extends
		ScriptCompletionProposalCollector {

	public ScriptCompletionProposalCollectorBridge(ISourceModule cu) {
		super(cu);
	}

	protected ScriptCompletionProposal createScriptCompletionProposal(
			String completion, int replaceStart, int length, Image image,
			String displayString, int i, boolean isInDoc) {
		return createScriptCompletionProposal1(completion, replaceStart,
				length, image, displayString, i, isInDoc);
	}
	
	protected ScriptCompletionProposal createScriptCompletionProposal(
			String completion, int replaceStart, int length, Image image,
			String displayString, int i) {
		return createScriptCompletionProposal1(completion, replaceStart,
				length, image, displayString, i, false);
	}

	protected abstract ScriptCompletionProposal createScriptCompletionProposal1(
			String completion, int replaceStart, int length, Image image,
			String displayString, int i, boolean isInDoc);

}
