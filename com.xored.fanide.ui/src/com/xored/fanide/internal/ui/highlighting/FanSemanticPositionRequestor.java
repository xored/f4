package com.xored.fanide.internal.ui.highlighting;

import org.eclipse.dltk.ui.editor.highlighting.ISemanticHighlightingRequestor;

public class FanSemanticPositionRequestor implements
		ISemanticHighlightingRequestor {

	private final ISemanticHighlightingRequestor requestor;
	private final int offset;

	/**
	 * @param requestor
	 * @param offset
	 */
	public FanSemanticPositionRequestor(
			ISemanticHighlightingRequestor requestor, int offset) {
		this.offset = offset;
		this.requestor = requestor;
	}

	public void addPosition(int start, int end, String highlightingKey) {
		requestor.addPosition(start, end, highlightingKey + offset);
	}

}