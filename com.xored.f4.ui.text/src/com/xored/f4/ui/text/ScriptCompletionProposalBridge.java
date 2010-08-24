package com.xored.f4.ui.text;

import org.eclipse.dltk.ui.text.completion.ScriptCompletionProposal;
import org.eclipse.swt.graphics.Image;

public abstract class ScriptCompletionProposalBridge extends
		ScriptCompletionProposal {

	public ScriptCompletionProposalBridge(String replacementString,
			int replacementOffset, int replacementLength, Image image,
			String displayString, int relevance, boolean isInDoc) {
		super(replacementString, replacementOffset, replacementLength, image,
				displayString, relevance, isInDoc);
	}

}
