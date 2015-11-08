package com.xored.f4.ui.text;

import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.IRegion;
import org.eclipse.jface.text.source.DefaultCharacterPairMatcher;

public class FanJavaPairMatcher extends DefaultCharacterPairMatcher {
	public FanJavaPairMatcher(char[] chars, String partitioning) {
		super(chars, partitioning);
	}

	/* @see ICharacterPairMatcher#match(IDocument, int) */
	public IRegion doMatch(IDocument document, int offset) {
		return null;
	}

	public IRegion match(IDocument document, int offset) {
		return doMatch(document, offset);
	}
}
