package com.xored.f4.ui.text;

import org.eclipse.dltk.core.IScriptProject;
import org.eclipse.dltk.core.ISourceModule;
import org.eclipse.dltk.ui.text.completion.ScriptCompletionProposal;
import org.eclipse.dltk.ui.text.completion.ScriptCompletionProposalCollector;
import org.eclipse.jface.viewers.StyledString;
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
	protected ScriptCompletionProposal createOverrideCompletionProposal(
			IScriptProject scriptProject, ISourceModule compilationUnit,
			String name, String[] paramTypes, int start, int length,
			StyledString label, String string) {
		// default implementation return null, as this functionality is optional
		return null;
	}
	protected ScriptCompletionProposal createOverrideCompletionProposal(
			IScriptProject scriptProject, ISourceModule compilationUnit,
			String name, String[] paramTypes, int start, int length,
			String label, String proposal) {
		return createScriptCompletionProposal2(scriptProject, compilationUnit, name, paramTypes, start, length, label, proposal);
	}

	protected abstract ScriptCompletionProposal createScriptCompletionProposal1(
			String completion, int replaceStart, int length, Image image,
			String displayString, int i, boolean isInDoc);
	
	protected abstract ScriptCompletionProposal createScriptCompletionProposal2(IScriptProject scriptProject, ISourceModule compilationUnit,
			String name, String[] paramTypes, int start, int length,
			String displayName, String completionProposal);

}
