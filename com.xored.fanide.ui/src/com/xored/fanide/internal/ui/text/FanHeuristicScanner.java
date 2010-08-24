package com.xored.fanide.internal.ui.text;

import java.util.Arrays;

import org.eclipse.core.runtime.Assert;
import org.eclipse.dltk.ui.DLTKUIPlugin;
import org.eclipse.jface.text.BadLocationException;
import org.eclipse.jface.text.Document;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.IRegion;
import org.eclipse.jface.text.Region;

import com.xored.fanide.core.FanConstants;

public class FanHeuristicScanner extends ScriptHeuristicScanner {

	private static final int[] BLOCK_BEGINNING_SYMBOLS = { TokenLBRACE,
		TokenLBRACKET };

	private static final int[] BLOCK_ENDINGS = { TokenRBRACE,
		TokenRBRACKET };

	public FanHeuristicScanner(IDocument document) {
		super(document, FanConstants.FAN_PARTITIONING,
				IDocument.DEFAULT_CONTENT_TYPE);
	}

	public int getToken(int pos, String s) {
		Assert.isNotNull(s);

		if (s.length() == 1) {
			return super.getGenericToken(s.charAt(0));
		}
		return ISymbols.TokenIDENTIFIER;
	}

	public IRegion findSurroundingBlock(int offset) {
		int start = findBlockBeginningOffset(offset);
		if (start == NOT_FOUND)
			start = 0;

		int end = findBlockEndingOffset(offset);
		if (end == NOT_FOUND)
			end = getDocument().getLength();

		return new Region(start, end - start);
	}

	public boolean isBlockBeginning(int offset, int bound) {
		int token = previousToken(bound, offset);
		while (token != NOT_FOUND) {
			if (Arrays.binarySearch(BLOCK_BEGINNING_SYMBOLS, token) >= 0)
				return true;

			token = previousToken(getPosition(), offset);
		}

		return false;
	}

	public boolean isBlockEnding(int offset, int bound) {
		int token = nextToken(offset, bound);
		while (token != NOT_FOUND) {
			if (Arrays.binarySearch(BLOCK_ENDINGS, token) >= 0)
				return true;
			token = nextToken(getPosition(), bound);
		}

		return false;
	}

	public int findBlockBeginningOffset(int offset) {
		try {
			IDocument d = getDocument();
			int line = d.getLineOfOffset(offset);
			int endingCount = 0;
			while (line >= 0) {
				IRegion info = d.getLineInformation(line);
				int start = info.getOffset();
				int end = Math.min(info.getOffset() + info.getLength(), offset);
				setPosition(start);
				while (getPosition() < end) {
					if (isBlockEnding(getPosition(), end)) {
						endingCount++;
					}
				}

				start = info.getOffset();
				end = Math.min(info.getOffset() + info.getLength(), offset);
				setPosition(end);
				while (getPosition() > start) {
					if (isBlockBeginning(start, getPosition())) {
						if (endingCount > 0) {
							endingCount--;
						} else {
							return getPosition();
						}
					}
				}

				line--;
			}
		} catch (BadLocationException e) {
			DLTKUIPlugin.log(e);
		}
		return NOT_FOUND;
	}

	public int findBlockEndingOffset(int offset) {
		try {
			IDocument d = getDocument();
			int line = d.getLineOfOffset(offset);
			int lineNum = d.getNumberOfLines();
			int beginningCount = 0;
			while (line < lineNum) {
				IRegion info = d.getLineInformation(line);
				int start = Math.max(info.getOffset(), offset);
				int end = info.getOffset() + info.getLength();
				setPosition(end);
				while (getPosition() > start) {
					if (isBlockBeginning(start, getPosition())) {
						beginningCount++;
					}
				}

				start = Math.max(info.getOffset(), offset);
				end = info.getOffset() + info.getLength();
				setPosition(start);
				while (getPosition() < end) {
					if (isBlockEnding(getPosition(), end)) {
						if (beginningCount > 0) {
							beginningCount--;
						} else {
							return getPosition();
						}
					}
				}

				line++;
			}
		} catch (BadLocationException e) {
			DLTKUIPlugin.log(e);
		}
		return NOT_FOUND;
	}

	public int previousTokenAfterInput(int offset, String appended) {
		try {
			if (getPartition(offset).getType() != IDocument.DEFAULT_CONTENT_TYPE)
				return NOT_FOUND;

			if (appended.length() == 1) {
				int token = getGenericToken(appended.charAt(0));
				if (token != TokenOTHER)
					return token;
			}

			IRegion line = getDocument().getLineInformationOfOffset(offset);
			String content = getDocument().get(line.getOffset(),
					offset - line.getOffset())
					+ appended;
			IDocument newDoc = new Document(content);
			FanHeuristicScanner scanner = new FanHeuristicScanner(newDoc);
			return scanner.previousToken(content.length(), UNBOUND);
		} catch (BadLocationException e) {
			DLTKUIPlugin.log(e);
		}
		return NOT_FOUND;
	}
}
