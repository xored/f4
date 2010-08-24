//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Dmitriy Malyugin July 26, 2010 - Initial Contribution
//

package com.xored.f4.ui.text;

import org.eclipse.dltk.core.CompletionProposal;
import org.eclipse.dltk.ui.text.completion.ScriptContentAssistInvocationContext;
import org.eclipse.dltk.ui.text.completion.ScriptMethodCompletionProposal;
// import org.eclipse.swt.graphics.Image;

public class ScriptMethodCompletionProposalBridge extends
		ScriptMethodCompletionProposal {

	public ScriptMethodCompletionProposalBridge(CompletionProposal proposal,
			ScriptContentAssistInvocationContext context) {
		super(proposal, context);
	}

}
