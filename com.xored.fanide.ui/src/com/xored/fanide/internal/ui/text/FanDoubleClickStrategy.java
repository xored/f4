package com.xored.fanide.internal.ui.text;

import org.eclipse.jface.text.BadLocationException;
import org.eclipse.jface.text.DefaultTextDoubleClickStrategy;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.IRegion;
import org.eclipse.jface.text.Region;

public class FanDoubleClickStrategy extends DefaultTextDoubleClickStrategy {

	private static final class FanIdentifierDetector {

		// State or Direction
		private static final int UNKNOWN = -1;

		// BEGIN States
		private static final int IDSTART = 0;
		private static final int IDPART = 1;
		private static final int AT = 2;
		// END States

		// BEGIN Directions
		private static final int BACKWARD = 0;
		private static final int FORWARD = 1;
		// END Directions

		private int characterState;
		private int anchorState;
		private int currentDirection;

		private int wordStart;
		private int wordEnd;

		public IRegion getWordSelection(IDocument d, int offset) {
			try {
				setInitialAnchorPos(offset);
				int pos = offset;
				final int max = d.getLength();
				while (pos < max) {
					char c = d.getChar(pos);
					if (!goForward(c, pos))
						break;
					++pos;
				}

				pos = offset;
				final int min = 0;
				while (pos >= min) {
					char c = d.getChar(pos);
					if (!goBackward(c, pos))
						break;
					--pos;
				}

				return new Region(wordStart, wordEnd - wordStart + 1);
			} catch (BadLocationException e) {
				return new Region(offset, 0);
			}
		}

		private void setInitialAnchorPos(int offset) {
			characterState = UNKNOWN;
			anchorState = UNKNOWN;
			currentDirection = UNKNOWN;

			wordStart = offset;
			wordEnd = wordStart - 1;
		}

		private boolean isIdentifierStart(char c) {
			return Character.isLetter(c) || c == '_';
		}

		private boolean isIdentifierPart(char c) {
			return isIdentifierStart(c) || Character.isDigit(c);
		}

		public boolean goForward(char c, int offset) {
			setState(FORWARD);

			switch (characterState) {

			case UNKNOWN:
				if (c == '@') {
					wordStart = offset;
					characterState = AT;
					anchorState = characterState;
					return true;
				} else if (isIdentifierStart(c)) {
					wordEnd = offset;
					characterState = IDSTART;
					anchorState = characterState;
					return true;
				} else if (isIdentifierPart(c)) {
					wordEnd = offset;
					characterState = IDPART;
					anchorState = characterState;
					return true;
				}
				return false;

			case IDSTART:
			case IDPART:
				if (isIdentifierStart(c)) {
					wordEnd = offset;
					characterState = IDSTART;
					return true;
				} else if (isIdentifierPart(c)) {
					wordEnd = offset;
					characterState = IDPART;
					return true;
				}
				return false;

			case AT:
				if (isIdentifierStart(c)) {
					wordEnd = offset;
					characterState = IDSTART;
					return true;
				}
				return false;

			default:
				return false;
			}
		}

		public boolean goBackward(char c, int offset) {
			setState(BACKWARD);
			switch (characterState) {

			case AT:
				return false;

			case IDSTART:
				if (c == '@') {
					wordStart = offset;
					characterState = AT;
					return false;
				} else if (isIdentifierStart(c)) {
					wordStart = offset;
					characterState = IDSTART;
					return true;
				} else if (isIdentifierPart(c)) {
					wordStart = offset;
					characterState = IDPART;
					return true;
				}
				return false;

			case IDPART:
				if (isIdentifierStart(c)) {
					wordStart = offset;
					characterState = IDSTART;
					return true;
				} else if (isIdentifierPart(c)) {
					wordStart = offset;
					characterState = IDPART;
					return true;
				}
				return false;

			default:
				return false;
			}
		}

		private void setState(int direction) {
			if (currentDirection == direction)
				return;
			if (wordStart <= wordEnd)
				characterState = anchorState;
			else
				characterState = UNKNOWN;
			currentDirection = direction;
		}
	}

	protected FanPairMatcher fPairMatcher = new FanPairMatcher();
	protected final FanIdentifierDetector fanWordDetector = new FanIdentifierDetector();

	protected IRegion findExtendedDoubleClickSelection(IDocument document,
			int offset) {
		IRegion match = fPairMatcher.match(document, offset);
		if (match != null && match.getLength() >= 2)
			return new Region(match.getOffset() + 1, match.getLength() - 2);
		return findWord(document, offset);
	}

	protected IRegion findWord(IDocument document, int offset) {
		return fanWordDetector.getWordSelection(document, offset);
	}

}
