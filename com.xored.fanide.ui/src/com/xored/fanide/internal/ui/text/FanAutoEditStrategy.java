/*******************************************************************************
 * Copyright (c) 2005, 2007 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui.text;

import java.util.Arrays;
import java.util.Iterator;
import java.util.Vector;

import org.eclipse.dltk.compiler.util.Util;
import org.eclipse.dltk.core.DLTKCore;
import org.eclipse.dltk.ui.CodeFormatterConstants;
import org.eclipse.dltk.ui.PreferenceConstants;
import org.eclipse.dltk.ui.text.util.AutoEditUtils;
import org.eclipse.dltk.utils.CharacterStack;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.jface.text.BadLocationException;
import org.eclipse.jface.text.DefaultIndentLineAutoEditStrategy;
import org.eclipse.jface.text.Document;
import org.eclipse.jface.text.DocumentCommand;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.IRegion;
import org.eclipse.jface.text.ITypedRegion;
import org.eclipse.jface.text.TextUtilities;
import org.eclipse.jface.text.rules.FastPartitioner;

import com.xored.fanide.ui.FanPreferenceConstants;

/**
 * Auto indent strategy sensitive to brackets.
 */
public class FanAutoEditStrategy extends DefaultIndentLineAutoEditStrategy {

	private static final int[] CONTINUATION_TOKENS = { ISymbols.TokenBACKSLASH,
			ISymbols.TokenCOMMA, ISymbols.TokenSLASH, ISymbols.TokenPLUS,
			ISymbols.TokenMINUS, ISymbols.TokenSTAR };

	private final IPreferenceStore preferenceStore;
	private final String fPartitioning;

	private boolean closeStrings() {
		return preferenceStore
				.getBoolean(PreferenceConstants.EDITOR_CLOSE_STRINGS);
	}

	private boolean closeBrackets() {
		return preferenceStore
				.getBoolean(PreferenceConstants.EDITOR_CLOSE_BRACKETS);
	}

	private boolean closeBraces() {
		return preferenceStore
				.getBoolean(PreferenceConstants.EDITOR_CLOSE_BRACES);
	}

	/*
	 * Switch smart mode on/off
	 */
	private boolean isSmartMode() {
		return preferenceStore
				.getBoolean(PreferenceConstants.EDITOR_SMART_INDENT);
	}

	/**
	 * Calculates real length of string. So any char except \t has length 1, \t
	 * has length getTabWidth.
	 * 
	 * @param str
	 *            string to process
	 * @return length
	 */
	public int getPhysicalLength(String str) {
		int res = 0;
		for (int i = 0; i < str.length(); i++) {
			if (str.charAt(i) == '\t')
				res += getTabSize();
			else
				res++;
		}
		return res;
	}

	private int getTabSize() {
		return preferenceStore
				.getInt(CodeFormatterConstants.FORMATTER_TAB_SIZE);
	}

	private int getIndentSize() {
		return preferenceStore
				.getInt(CodeFormatterConstants.FORMATTER_INDENTATION_SIZE);
	}

	private String getTabStyle() {
		return preferenceStore
				.getString(CodeFormatterConstants.FORMATTER_TAB_CHAR);
	}

	private boolean isSmartPaste() {
		return preferenceStore
				.getBoolean(PreferenceConstants.EDITOR_SMART_PASTE);
	}

	public FanAutoEditStrategy(IPreferenceStore store, String part) {
		preferenceStore = store;
		fPartitioning = part;
	}

	private boolean isLineDelimiter(IDocument document, String text) {
		String[] delimiters = document.getLegalLineDelimiters();
		if (delimiters != null)
			return TextUtilities.equals(delimiters, text) > -1;
		return false;
	}

	/**
	 * Returns the leading whitespaces.
	 * 
	 * @param document
	 *            - the document being parsed
	 * @param line
	 *            - the line being searched
	 * @return the leading whitespace
	 * @throws BadLocationException
	 *             in case <code>line</code> is invalid in the document
	 */
	private String getLineIndent(IDocument document, int line)
			throws BadLocationException {
		if (line > -1) {
			int start = document.getLineOffset(line);
			int end = start + document.getLineLength(line);
			int whiteend = findEndOfWhiteSpace(document, start, end);
			return document.get(start, whiteend - start);
		}
		return ""; //$NON-NLS-1$
	}

	/**
	 * Returns the leading whitespaces and tabs.
	 * 
	 * @param line
	 *            - the line being searched
	 * @return the leading whitespace
	 */
	public String getLineIndent(String line) {
		int end = line.length();
		int whiteend = end;
		int offset = 0;
		while (offset < end) {
			char c = line.charAt(offset);
			if (c != ' ' && c != '\t') {
				whiteend = offset;
				break;
			}
			offset++;
		}
		return line.substring(0, whiteend);
	}

	/*
	 * Block is and opening char seq. and closing char seq. Each block have it's
	 * own indent
	 */
	private abstract class FanBlock {
		private int offset;
		public char openingPeer;
		public char closingPeer;
		public String indent;

		protected FanBlock(int o) {
			offset = o;
		}

		public int getOffset() {
			return offset;
		}
	}

	private class RoundBracketBlock extends FanBlock {
		public RoundBracketBlock(int offset) {
			super(offset);
			openingPeer = '(';
			closingPeer = ')';
			if (!getTabStyle().equals(CodeFormatterConstants.TAB))
				indent = AutoEditUtils.getNSpaces(getIndentSize());
			else
				indent = "\t";
		}
	}

	private class BracketBlock extends FanBlock {
		public BracketBlock(int offset) {
			super(offset);
			openingPeer = '[';
			closingPeer = ']';
			if (!getTabStyle().equals(CodeFormatterConstants.TAB))
				indent = AutoEditUtils.getNSpaces(getIndentSize());
			else
				indent = "\t";
		}
	}

	private class BraceBlock extends FanBlock {
		public BraceBlock(int offset) {
			super(offset);
			openingPeer = '{';
			closingPeer = '}';
			if (!getTabStyle().equals(CodeFormatterConstants.SPACE))
				indent = "\t";
			else {
				indent = AutoEditUtils.getNSpaces(getIndentSize());
			}
		}
	}

	/**
	 * Return pair to brace. Ex. '(' for ')', e.t.c.
	 * 
	 * @param b
	 *            input brace
	 * @return peer brace
	 */
	private char getBracePair(char b) {
		switch (b) {
		case '(':
			return ')';
		case ')':
			return '(';
		case '[':
			return ']';
		case ']':
			return '[';
		case '{':
			return '}';
		case '}':
			return '{';
		case '\"':
			return '\"';
		case '\'':
			return '\'';
		}
		return b;
	}

	private static final int MAX_BACK_SCAN_SIZE = 16384;

	/**
	 * Determines type of last opening block. For example, for such line <code>
	 * proc () {
	 * </code>
	 * function will return new BraceBlockType. And for <code>proc(){}</code>
	 * function will return null
	 * 
	 * @param d
	 *            document containing the line
	 * @param line
	 *            number of the start search offset
	 * @return an object of appropriate block type
	 * @throws BadLocationException
	 */
	private FanBlock getLastOpenBlockType(IDocument d, int start)
			throws BadLocationException {
		// IRegion lineReg = d.getLineInformation(line);
		final CharacterStack blocks = new CharacterStack();
		// String lineStr = d.get(lineReg.getOffset(), lineReg.getLength());
		ITypedRegion lastRegion = null;
		int lastLine = -1;
		int lastLineOffset = -1;
		String lastLineStr = Util.EMPTY_STRING;
		final int stopPosition = Math.max(start - MAX_BACK_SCAN_SIZE, 0);
		int offset = start;
		while (offset > stopPosition) {
			offset--;
			// skip screening
			int bslashes = 0;
			while (offset - bslashes > 0
					&& d.getChar(offset - bslashes - 1) == '\\')
				bslashes++;
			if (bslashes % 2 == 1) {
				offset -= bslashes;
				continue;
			}

			// skip comment lines
			if (lastLineOffset < 0 || offset < lastLineOffset) {
				lastLine = d.getLineOfOffset(offset);
				lastLineOffset = d.getLineOffset(lastLine);
				lastLineStr = d.get(lastLineOffset, d.getLineLength(lastLine))
						.trim();
			}
			if (lastLineStr.length() != 0 && lastLineStr.startsWith("//")) {
				offset = lastLineOffset;
				continue;
			}
			// skip strings
			if (lastRegion == null || offset < lastRegion.getOffset()) {
				lastRegion = TextUtilities.getPartition(d, fPartitioning,
						offset, true);
			}
			if (lastRegion.getType() == IFanPartitions.FAN_STRING) {
				offset = lastRegion.getOffset();
				offset--;
			}
			char c = d.getChar(offset);

			boolean insideFig = false;
			if (blocks.size() > 0 && blocks.peek() == '}')
				insideFig = true;

			// ommit everything inside {}
			if (c != '{' && c != '}' && insideFig)
				continue;

			switch (c) {
			case '(':
				if (0 == blocks.size())
					return new RoundBracketBlock(offset);
				if (blocks.pop() != ')')
					return new RoundBracketBlock(offset);
				break;
			case '[':
				if (0 == blocks.size())
					return new BracketBlock(offset);
				if (blocks.pop() != ']')
					return new BracketBlock(offset);
				break;
			case '{':
				if (0 == blocks.size())
					return new BraceBlock(offset);
				if (blocks.pop() != '}')
					return new BraceBlock(offset);
				break;
			case ')':
			case ']':
			case '}':
				blocks.push(c);
				break;
			}
		}

		return null;
	}

	/**
	 * Find line with number <=line, that is Fantom code line (not comment)
	 * 
	 * @param d
	 *            the document to search in
	 * @param line
	 *            number of starting line
	 * @return number of code line or -1 if no such line found
	 */
	private int getLastCodeLine(IDocument d, int line) {
		int res = line;
		try {
			while (res > -1) {
				IRegion reg = d.getLineInformation(res);
				String str = d.get(reg.getOffset(), reg.getLength()).trim();
				if (!str.startsWith("//") && str.length() > 0)
					return res;
				res--;
			}
		} catch (BadLocationException e) {
			e.printStackTrace();
		}
		return res;
	}

	private String getDocumentLine(IDocument d, int line)
			throws BadLocationException {
		int start = d.getLineOffset(line);
		int length = d.getLineLength(line);
		return d.get(start, length);
	}

	private void smartIndentAfterNewLine(IDocument d, DocumentCommand c) {
		if (c.offset == -1 || d.getLength() == 0)
			return;
		try {

			FanHeuristicScanner scanner = new FanHeuristicScanner(d);

			int pos = (c.offset == d.getLength() ? c.offset - 1 : c.offset);

			int line = d.getLineOfOffset(pos);
			int curLine = d.getLineOfOffset(c.offset);
			String curLineStr = getDocumentLine(d, curLine);

			String resultIndent = "";
			String lastIndent = "";
			FanBlock block = null;
			boolean needPeer = false;
			// if we need to jump into middle of block without inserting peer
			// brace
			boolean dummyPeer = false;

			block = getLastOpenBlockType(d, c.offset);
			if (curLineStr.trim().endsWith("\\")) {
				resultIndent = getLineIndent(d, line - 1);
			} else if (block == null) {
				int lastCodeLine = getLastCodeLine(d, line);
				// no code above us, just copy last indent
				if (-1 == lastCodeLine) {
					resultIndent = getLineIndent(d, line - 1);
				} else {
					// if our line is inside brackets, get line with opening
					// bracket
					block = getLastOpenBlockType(d, d
							.getLineOffset(lastCodeLine));
					if (block != null) {
						int peer = scanner.findOpeningPeer(d
								.getLineOffset(lastCodeLine),
								block.openingPeer, block.closingPeer);
						if (peer != FanHeuristicScanner.NOT_FOUND) {
							lastCodeLine = d.getLineOfOffset(peer);
						}
					}
					resultIndent = getLineIndent(d, lastCodeLine);
				}
			} else {
				int lastCodeLine = d.getLineOfOffset(block.getOffset());
				lastIndent = getLineIndent(d, lastCodeLine);

				resultIndent = lastIndent + block.indent;

				int cPos = pos;
				while ((d.getChar(cPos) == ' ' || d.getChar(cPos) == '\t')) {
					if (cPos == d.getLength() - 1)
						break;
					cPos++;
				}
				if (block.closingPeer == d.getChar(cPos)) {
					dummyPeer = true;
				}
				// find closing peer, if exists
				int peerOffset = scanner.findClosingPeer(pos, 0,
						block.openingPeer, block.closingPeer);
				// if not fount peer, we need it
				if (peerOffset == FanHeuristicScanner.NOT_FOUND)
					needPeer = true;

			}

			if (!(block instanceof BracketBlock || block instanceof RoundBracketBlock)) {
				boolean firstContinuation = previousIsFirstContinuation(d,
						scanner, c.offset, curLine);
				boolean continuation = !firstContinuation
						&& previousIsContinuation(scanner, c.offset, curLine);

				if (firstContinuation)
					resultIndent += getDefaultIndent();
				else if (continuation)
					resultIndent += getLineIndent(d, line - 1);
				// process line indent
			}

			resultIndent = remakeIndent(resultIndent);

			IRegion reg = d.getLineInformation(line);
			int lineEnd = reg.getOffset() + reg.getLength();

			int contentStart = findEndOfWhiteSpace(d, c.offset, lineEnd);
			c.length = Math.max(contentStart - c.offset, 0);

			if (block instanceof BraceBlock
					&& !preferenceStore
							.getBoolean(FanPreferenceConstants.EDITOR_CLOSE_BRACES))
				needPeer = false;

			if ((block instanceof BracketBlock || block instanceof RoundBracketBlock)
					&& !preferenceStore
							.getBoolean(FanPreferenceConstants.EDITOR_CLOSE_BRACKETS))
				needPeer = false;

			if ((needPeer || dummyPeer) && block instanceof BraceBlock) {
				StringBuffer buf = new StringBuffer(c.text);
				buf.append(resultIndent);
				c.shiftsCaret = false;
				c.caretOffset = c.offset + buf.length();
				FanBlock prevBlock = getLastOpenBlockType(d,
						block.getOffset() - 1);
				boolean insideRoundBrackets = (prevBlock != null && prevBlock instanceof RoundBracketBlock);
				if (!dummyPeer) {
					if (!insideRoundBrackets && lineEnd - contentStart > 0) {
						c.length = lineEnd - c.offset;
						buf.append(d.get(contentStart, lineEnd - contentStart)
								.toCharArray());
					}
				}

				buf.append(TextUtilities.getDefaultLineDelimiter(d)
						.toCharArray());
				buf.append(lastIndent);

				if (!dummyPeer) {
					if (insideRoundBrackets) {
						buf.append(block.closingPeer);
						if (lineEnd - contentStart > 0) {
							c.length = lineEnd - c.offset;
							buf.append(d.get(contentStart,
									lineEnd - contentStart).toCharArray());
						}
					} else
						buf.append(block.closingPeer);
				}
				c.text = buf.toString();
			} else {
				StringBuffer buf = new StringBuffer(c.text);
				buf.append(resultIndent);
				c.text = buf.toString();
			}

		} catch (BadLocationException e) {
			e.printStackTrace();
		}

	}

	@SuppressWarnings("unused")
	private void smartIndentAfterOpeningBracket(IDocument d, DocumentCommand c) {
		if (c.offset == -1)
			return;

		try {
			if (d.getChar(c.offset - 1) == '\\')
				return;
		} catch (BadLocationException e1) {
		}

		if ('\"' == c.text.charAt(0) && !closeStrings())
			return;

		if ('\'' == c.text.charAt(0) && !closeStrings())
			return;

		if (!closeBrackets()
				&& ('[' == c.text.charAt(0) || '(' == c.text.charAt(0)))
			return;

		if (!closeBraces() && ('{' == c.text.charAt(0)))
			return;

		try {
			char ch = c.text.charAt(0);
			switch (ch) {
			case '\"':
			case '\'':
				// if we close existing quote, do nothing
				if ('\"' == ch && c.offset > 0
						&& "\"".equals(d.get(c.offset - 1, 1)))
					return;

				if ('\'' == ch && c.offset > 0
						&& "\'".equals(d.get(c.offset - 1, 1)))
					return;

				if (c.offset != d.getLength()
						&& ch == d.get(c.offset, 1).charAt(0))
					c.text = "";
				else {
					c.text += c.text;
					c.length = 0;

				}

				c.shiftsCaret = false;
				c.caretOffset = c.offset + 1;
				break;
			case '(':
			case '{':
			case '[':
				boolean needPeer = false;
				FanHeuristicScanner scanner = new FanHeuristicScanner(d);
				// find closing peer, if exists
				int peerOffset = scanner.findClosingPeer(c.offset, 1, ch,
						getBracePair(ch));
				// if not fount peer, we need it
				if (peerOffset == FanHeuristicScanner.NOT_FOUND)
					needPeer = true;
				// check partition
				if (getRegionType(d, c.offset) != IDocument.DEFAULT_CONTENT_TYPE)
					return;

				if (!needPeer)
					return;

				if (c.offset != d.getLength()
						&& ch == d.get(c.offset, 1).charAt(0))
					return;

				// add closing peer
				c.text = c.text + getBracePair(ch);
				c.length = 0;

				c.shiftsCaret = false;
				c.caretOffset = c.offset + 1;
				break;
			}
		} catch (BadLocationException e) {
			e.printStackTrace();
		}

	}

	private void smartIndentAfterClosingBracket(IDocument d, DocumentCommand c) {
		if (c.offset == -1 || d.getLength() == 0)
			return;
		try {
			char bracket = c.text.charAt(0);
			// if we already have bracket we should jump over it
			if (c.offset != d.getLength()
					&& bracket == d.get(c.offset, 1).charAt(0)
					&& (getRegionType(d, c.offset) == IDocument.DEFAULT_CONTENT_TYPE)) {
				if ((bracket == '}' && closeBraces())
						|| ((bracket == ')' || bracket == ']') && closeBrackets())) {
					c.text = "";
					c.shiftsCaret = false;
					c.caretOffset = c.offset + 1;
					return;
				}
			}

			FanHeuristicScanner scanner = new FanHeuristicScanner(d);

			int p = (c.offset == d.getLength() ? c.offset - 1 : c.offset);
			int line = d.getLineOfOffset(p);
			int start = d.getLineOffset(line);
			int whiteend = findEndOfWhiteSpace(d, start, c.offset);

			// shift only when line does not contain any text up to the closing
			// bracket
			if (whiteend == c.offset) {
				// determine block type
				FanBlock block = null;
				switch (c.text.charAt(0)) {
				case ']':
					block = new BracketBlock(0);
					break;
				case '}':
					block = new BraceBlock(0);
					break;
				case ')':
					block = new RoundBracketBlock(0);
					break;
				}
				if (block == null)
					return;
				// evaluate the line with the opening bracket that matches out
				// closing bracket
				int reference = scanner.findOpeningPeer(p, block.openingPeer,
						block.closingPeer);
				int indLine = d.getLineOfOffset(reference);
				if (indLine != -1 && indLine != line) {
					// take the indent of the found line
					StringBuffer replaceText = new StringBuffer();
					// add the rest of the current line including the just added
					// close bracket
					replaceText.append(getLineIndent(d, indLine));
					replaceText.append(c.text);
					// modify document command
					c.length += c.offset - start;
					c.offset = start;
					c.text = replaceText.toString();
				}
			}

		} catch (BadLocationException e) {
			if (DLTKCore.DEBUG) {
				e.printStackTrace();
			}
		}
	}

	private boolean smartIndentJump(IDocument d, DocumentCommand c) {
		if (c.offset == -1 || d.getLength() == 0)
			return false;
		try {
			FanHeuristicScanner scanner = new FanHeuristicScanner(d);
			int p = (c.offset == d.getLength() ? c.offset - 1 : c.offset);
			int curLine = d.getLineOfOffset(c.offset);
			String curLineStr = getDocumentLine(d, curLine);

			int line = d.getLineOfOffset(p);
			int start = d.getLineOffset(line);
			String resultIndent = "";
			String lastIndent = "";
			FanBlock block;

			// DUPLICATION: this code is identical to code in
			// smartInsertAfterNewLine
			block = getLastOpenBlockType(d, c.offset);
			if (curLineStr.trim().endsWith("\\")) {
				resultIndent = getLineIndent(d, line - 1);
			} else if (block == null) {
				int lastCodeLine = getLastCodeLine(d, line);
				// if our line is inside brackets, get line with opening bracket
				block = getLastOpenBlockType(d, d.getLineOffset(curLine));
				if (block != null) {
					int peer = scanner.findOpeningPeer(
							d.getLineOffset(curLine), block.openingPeer,
							block.closingPeer);
					if (peer != FanHeuristicScanner.NOT_FOUND) {
						lastCodeLine = d.getLineOfOffset(peer);
					}
				}
				// no code above us, just copy last indent
				if (-1 == lastCodeLine) {
					resultIndent = getLineIndent(d, line - 1);
				} else {
					resultIndent = getLineIndent(d, lastCodeLine);
				}
			} else {
				int lastCodeLine = d.getLineOfOffset(block.getOffset());
				lastIndent = getLineIndent(d, lastCodeLine);
				resultIndent = lastIndent + block.indent;
			}

			if (c.offset >= start + resultIndent.length())
				return false; // we already in the place

			String currentIndent = getLineIndent(d, line);
			if (!currentIndent.startsWith(resultIndent))
				return false; // we have no place to jump

			c.length = 0;
			c.shiftsCaret = false;
			c.text = "";
			c.caretOffset = d.getLineOffset(line) + resultIndent.length();

		} catch (BadLocationException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * Installs a partitioner with <code>document</code>.
	 * 
	 * @param document
	 *            the document
	 */
	private static void installStuff(Document document) {
		String[] types = new String[] { IFanPartitions.FAN_STRING,
				IFanPartitions.FAN_MULTI_LINE_COMMENT,
				IFanPartitions.FAN_SINGLE_LINE_COMMENT,
				IFanPartitions.FAN_INTERPRETER_STRING, IFanPartitions.FAN_DOC,
				IFanPartitions.FAN_DSL, IDocument.DEFAULT_CONTENT_TYPE };
		FastPartitioner partitioner = new FastPartitioner(
				new FanPartitionScanner(), types);
		partitioner.connect(document);
		document.setDocumentPartitioner(IFanPartitions.FAN_PARTITIONING,
				partitioner);
	}

	/**
	 * Removes a partitioner with <code>document</code>.
	 * 
	 * @param document
	 *            the document
	 */
	private static void removeStuff(Document document) {
		document.setDocumentPartitioner(IFanPartitions.FAN_PARTITIONING, null);
	}

	/**
	 * Reindents c.text when pasting(simply indents all to common level).
	 * 
	 * @param d
	 * @param c
	 */
	@SuppressWarnings("unused")
	private void smartPasteSimple(IDocument d, DocumentCommand c) {
		try {
			String content = d.get(0, c.offset) + c.text;
			Document temp = new Document(content);
			int line = d.getLineOfOffset(c.offset);
			int start = d.getLineOffset(line);
			int relativeIndent = 0;
			int sline = line + 1;
			String commonIndent = getLineIndent(d, line);
			int back = -1;
			if (d.get(start, c.offset - start).trim().length() == 0) { // we are
				// inserting
				// lines
				// block
				// TODO: recalc common indent
				// try to detect cutten line
				int i;
				int depth = 0;
				myloop: for (i = 0; i < c.text.length(); i++) {
					switch (c.text.charAt(i)) {
					case '(':
					case '{':
					case '[':
						depth++;
						break;
					case ')':
					case ']':
					case '}':
						depth--;
						break;
					case '\n':
						break myloop;
					}
				}
				if (depth == 0
						&& i != c.text.length()
						&& getRegionType(temp, c.offset + i) != IFanPartitions.FAN_STRING) {
					String first = getLineIndent(c.text.substring(0, i));
					String second = getLineIndent(temp, line + 1);
					temp.replace(start, c.offset - start + first.length(),
							second);
				} else
					temp.replace(start, c.offset - start, "");
				back = c.offset - start;
				relativeIndent = getPhysicalLength(getLineIndent(temp, line));
				sline = line;
			}
			while (true) {
				try {
					getDocumentLine(temp, sline);
				} catch (BadLocationException e) {
					break; // signal of the end of lines
				}
				String currentIndent = getLineIndent(temp, sline);
				int newIndentLen = getPhysicalLength(commonIndent)
						+ getPhysicalLength(currentIndent) - relativeIndent;
				String newIndent = generateIndent(newIndentLen); // may be do
				// here
				temp.replace(temp.getLineOffset(sline), currentIndent.length(),
						newIndent);
				sline++;
			}
			if (back > 0) {
				c.offset = start;
				c.text = temp.get(start, temp.getLength() - start);
				c.length += back;
			} else {
				c.text = temp.get(c.offset, temp.getLength() - c.offset);
			}
		} catch (BadLocationException e) {
			e.printStackTrace();
		}
	}

	private String generateIndent(int newIndentLen) {
		String res = "";
		if (!getTabStyle().equals(CodeFormatterConstants.SPACE)) {
			int ts = getTabSize();
			while (newIndentLen >= ts) {
				res += "\t";
				newIndentLen -= ts;
			}
		}
		if (getTabStyle().equals(CodeFormatterConstants.TAB)) {
			if (newIndentLen > 0)
				res += "\t";
		} else {
			for (int i = 0; i < newIndentLen; i++)
				res += " ";
		}
		return res;
	}

	private String remakeIndent(String indent) {
		int len = getPhysicalLength(indent);
		return generateIndent(len);
	}

	private boolean previousIsFirstContinuation(IDocument d,
			FanHeuristicScanner scanner, int offset, int bound)
			throws BadLocationException {

		IRegion previousLine = null;
		int line = d.getLineOfOffset(offset);
		if (line > 0) {
			previousLine = d.getLineInformation(line - 1);
		}

		return previousIsContinuation(scanner, offset, bound)
				&& (previousLine == null || !previousIsContinuation(scanner,
						previousLine.getOffset() + previousLine.getLength(),
						previousLine.getOffset()));

	}

	private boolean previousIsContinuation(FanHeuristicScanner scanner,
			int offset, int bound) {
		int token = scanner.previousToken(offset, bound);
		return Arrays.binarySearch(CONTINUATION_TOKENS, token) >= 0;
	}

	private void smartPaste2(IDocument d, DocumentCommand cmd) {
		try {
			String content = d.get(0, cmd.offset) + cmd.text;
			Document temp = new Document(content);
			installStuff(temp);
			Vector<FanBlock> blocks = new Vector<FanBlock>();
			int figs = 0; // count of braces
			int cmdLine = d.getLineOfOffset(cmd.offset);
			int cmdLineStart = d.getLineOffset(cmdLine);
			int startLine = d.getLineOfOffset(cmd.offset) + 1;
			if (d.get(cmdLineStart, cmd.offset - cmdLineStart).trim().length() == 0) // we
				// are
				// inserting
				// lines
				// block
				startLine--;
			int offset = 0;
			while (offset < temp.getLength()) {
				ITypedRegion region = TextUtilities.getPartition(temp,
						fPartitioning, offset, true);
				if (region.getType() != IDocument.DEFAULT_CONTENT_TYPE
						&& figs == 0) {
					offset = region.getOffset() + region.getLength();
					continue;
				}
				char c = temp.getChar(offset);
				if (c == '\\') {
					offset += 2;
					continue;
				}
				switch (c) {
				case ')':
				case ']':
				case '}':
					if (c == '}')
						figs--;
					if (blocks.size() > 0) {
						blocks.removeElementAt(blocks.size() - 1);
					}
					break;
				}

				int line = temp.getLineOfOffset(offset);
				String currentIndent = getLineIndent(temp, line);
				// if may start reindenting
				if (line >= startLine
						&& offset == temp.getLineOffset(line)
								+ currentIndent.length()) {
					StringBuffer newIndentBuf = new StringBuffer();
					Iterator<FanBlock> iter = blocks.iterator();
					while (iter.hasNext()) {
						FanBlock b = iter.next();
						newIndentBuf.append(b.indent);
					}
					String newIndent = newIndentBuf.toString();
					temp.replace(temp.getLineOffset(line), currentIndent
							.length(), newIndent);
					offset = temp.getLineOffset(line) + newIndent.length();
				}

				switch (c) {
				case '(':
					blocks.add(new RoundBracketBlock(offset));
					break;
				case '[':
					blocks.add(new BracketBlock(offset));
					break;
				case '{':
					figs++;
					blocks.add(new BraceBlock(offset));
					break;
				}

				offset++;
			}
			if (cmd.offset - offset > 0) {
				cmd.text = temp.get(cmdLineStart, temp.getLength()
						- cmdLineStart);
				cmd.offset = cmdLineStart;
			} else {
				cmd.text = temp.get(cmd.offset, temp.getLength() - cmd.offset);
			}
			removeStuff(temp);
		} catch (BadLocationException e) {
			e.printStackTrace();
		}
	}

	/**
	 * get partition covering offset
	 * 
	 * @param d
	 * @param offset
	 * @return
	 * @throws BadLocationException
	 */
	private String getRegionType(IDocument d, int offset)
			throws BadLocationException {
		ITypedRegion region = TextUtilities.getPartition(d, fPartitioning,
				offset, true);
		return region.getType();
	}

	private String getDefaultIndent() {
		if (!getTabStyle().equals(CodeFormatterConstants.TAB))
			return AutoEditUtils.getNSpaces(getIndentSize());
		else
			return "\t";
	}

	/*
	 * @see
	 * org.eclipse.jface.text.IAutoIndentStrategy#customizeDocumentCommand(org
	 * .eclipse.jface.text.IDocument, org.eclipse.jface.text.DocumentCommand)
	 */
	@Override
	public void customizeDocumentCommand(IDocument d, DocumentCommand c) {
		if (c.doit == false)
			return;
		if (c.length == 0 && c.text != null && isLineDelimiter(d, c.text)) {
			if (isSmartMode())
				smartIndentAfterNewLine(d, c);
			else {
				super.customizeDocumentCommand(d, c);
				return;
			}
		} else if (c.length <= 1 && c.text.length() == 1) {
			switch (c.text.charAt(0)) {
			case '}':
				smartIndentAfterClosingBracket(d, c);
				break;
			case '\t':
				boolean jumped = false;
				if (preferenceStore
						.getBoolean(FanPreferenceConstants.EDITOR_SMART_TAB)) {
					jumped = smartIndentJump(d, c);
				}
				if (!jumped) { // process tab key using format options
					if (getTabStyle().equals(CodeFormatterConstants.SPACE)) {
						c.text = "";
						int ts = getTabSize();
						for (int i = 0; i < ts; i++) {
							c.text += " ";
						}
					}
				}
				break;
			}
		} else if (c.length == 0 && c.text.length() >= 1
				&& c.text.trim().length() == 0) {
			boolean jumped = false;
			if (preferenceStore
					.getBoolean(FanPreferenceConstants.EDITOR_SMART_TAB)) {
				jumped = smartIndentJump(d, c);
			}
			if (!jumped) { // process tab key using format options
				if (getTabStyle().equals(CodeFormatterConstants.SPACE)) {
					c.text = "";
					int ts = getTabSize();
					for (int i = 0; i < ts; i++) {
						c.text += " ";
					}
				}
			}
		} else if (c.text.length() >= 1 && isSmartPaste()) {
			// smartPasteSimple(d, c); //
		}
		// else if (c.text.length() >= 1 && isSmartPaste()) {
		// smartPaste2(d, c); // ureacheble code
		// }
	}
}
