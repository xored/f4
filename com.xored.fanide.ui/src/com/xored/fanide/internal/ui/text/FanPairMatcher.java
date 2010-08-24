package com.xored.fanide.internal.ui.text;

import org.eclipse.jface.text.BadLocationException;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.IRegion;
import org.eclipse.jface.text.source.DefaultCharacterPairMatcher;

import com.xored.fanide.core.FanConstants;

public final class FanPairMatcher extends DefaultCharacterPairMatcher {

	private int fBlockAnchor;

	public FanPairMatcher() {
		super("{}[]()".toCharArray(), FanConstants.FAN_PARTITIONING);
	}

	/* @see ICharacterPairMatcher#match(IDocument, int) */
	public IRegion match(IDocument document, int offset) {
		try {
			return performMatch(document, offset);
		} catch (BadLocationException ble) {
			return null;
		}
	}

	/*
	 * Performs the actual work of matching for #match(IDocument, int).
	 */
	private IRegion performMatch(IDocument document, int offset)
			throws BadLocationException {
		if (offset < 0 || document == null)
			return null;
		final IRegion region = super.match(document, offset);
		return region;
	}

	public int getAnchor() {
		int superAnchor = super.getAnchor();
		if (superAnchor < 0)
			return fBlockAnchor;
		else
			return superAnchor;
	}

	public void clear() {
		super.clear();
		fBlockAnchor = -1;
	}
}

