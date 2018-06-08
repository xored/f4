using [java] org.eclipse.jface.preference::IPreferenceStore
using [java] org.eclipse.jface.text::BadLocationException
using [java] org.eclipse.jface.text::DefaultIndentLineAutoEditStrategy
using [java] org.eclipse.jface.text::DocumentCommand
using [java] org.eclipse.jface.text::IDocument
using [java] org.eclipse.jface.text::ITypedRegion
using [java] org.eclipse.jface.text::TextUtilities
using [java] org.eclipse.dltk.ui::CodeFormatterConstants
using [java] org.eclipse.dltk.ui::PreferenceConstants
using [java] com.xored.fanide.ui::FanPreferenceConstants

/**
 * Auto indent strategy sensitive to brackets.
 */
class FanAutoEditStrategy : DefaultIndentLineAutoEditStrategy {
	private static const Symbol[] continuationTokens := [ Symbol.backslash,	Symbol.comma, Symbol.slash, Symbol.plus, Symbol.minus, Symbol.star ]

	private IPreferenceStore preferenceStore
	private const Str partitioning

	/*private boolean closeStrings() {
		preferenceStore.getBoolean(PreferenceConstants.EDITOR_CLOSE_STRINGS);
	}*/

	private Bool closeBrackets() {
		preferenceStore.getBoolean(PreferenceConstants.EDITOR_CLOSE_BRACKETS)
	}

	private Bool closeBraces() {
		preferenceStore.getBoolean(PreferenceConstants.EDITOR_CLOSE_BRACES)
	}

	/*
	 * Switch smart mode on/off
	 */
	private Bool isSmartMode() {
		preferenceStore.getBoolean(PreferenceConstants.EDITOR_SMART_INDENT)
	}

	** Calculates real length of string. So any char except \t has length 1, \t
	** has length getTabWidth.
	private Int getPhysicalLength(Str str) {
		res := 0
		for (i := 0; i < str.size; i++) {
			if (str[i] == '\t')
				res += getTabSize
			else
				res++
		}
		return res
	}

	private Int getTabSize() {
		preferenceStore.getInt(CodeFormatterConstants.FORMATTER_TAB_SIZE)
	}

	private Int getIndentSize() {
		preferenceStore.getInt(CodeFormatterConstants.FORMATTER_INDENTATION_SIZE)
	}

	private Str getTabStyle() {
		preferenceStore.getString(CodeFormatterConstants.FORMATTER_TAB_CHAR)
	}

	private Bool isSmartPaste() {
		preferenceStore.getBoolean(PreferenceConstants.EDITOR_SMART_PASTE)
	}

	new make(IPreferenceStore store, Str part) {
		preferenceStore = store
		partitioning = part
	}
	
	** Returns the leading whitespaces.
	** 
	** @param document	- the document being parsed
	** @param line		- the line being searched
	** @return the leading whitespace
	** @throws BadLocationException	 in case <code>line</code> is invalid in the document
	**
	private Str getLineIndent(IDocument document, Int line) {
		if (line == -1) return ""
		start := document.getLineOffset(line)
		end := start + document.getLineLength(line)
		whiteend := findEndOfWhiteSpace(document, start, end)
		return document.get(start, whiteend - start)
	}

	/**
	 * Returns the leading whitespaces and tabs.
	 * 
	 * @param line
	 *						- the line being searched
	 * @return the leading whitespace
	 */
	/*public String getLineIndent(String line) {
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
	}*/


	/**
	 * Return pair to brace. Ex. '(' for ')', e.t.c.
	 * 
	 * @param b
	 *						input brace
	 * @return peer brace
	 */
	/*private char getBracePair(char b) {
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
	}*/

	private static const Int maxBackScanSize := 16384

	**
	** Determines type of last opening block. For example, for such line 
	** 
	**   proc () {
	** 
	** function will return new BraceBlockType. And for 'proc(){}'
	** function will return null
	** 
	** @param d		document containing the line
	** @param line	number of the start search offset
	** @return an object of appropriate block type
	** @throws BadLocationException
	**
	private FanBlock? getLastOpenBlockType(IDocument d, Int start) {
		blocks := Int[,]
		ITypedRegion? lastRegion := null
		lastLine := -1
		lastLineOffset := -1
		lastLineStr := ""
		stopPosition := 0.max(start - maxBackScanSize)
		offset := start
		while (offset > stopPosition) {
			offset--
			// skip screening
			bslashes := 0
			while (offset - bslashes > 0 && d.getChar(offset - bslashes - 1) == '\\')
				bslashes++
			if (bslashes % 2 == 1) {
				offset -= bslashes
				continue
			}

			// skip comment lines
			if (lastLineOffset < 0 || offset < lastLineOffset) {
				lastLine		= d.getLineOfOffset(offset)
				lastLineOffset	= d.getLineOffset(lastLine)
				lastLineStr		= d.get(lastLineOffset, d.getLineLength(lastLine)).trim()
			}
			if (!lastLineStr.isEmpty && lastLineStr.startsWith("//")) {
				offset = lastLineOffset
				continue
			}
			// skip strings
			if (lastRegion == null || offset < lastRegion.getOffset) {
				lastRegion = TextUtilities.getPartition(d, partitioning, offset, true)
			}
			if (lastRegion.getType == IFanPartitions.string) {
				offset = lastRegion.getOffset
				offset--
			}
			c := d.getChar(offset)

			insideFig := false
			if (blocks.size > 0 && blocks.peek == '}')
				insideFig = true

			// ommit everything inside {}
			if (c != '{' && c != '}' && insideFig)
				continue

			switch (c) {
			case '(':
				if (0 == blocks.size || blocks.pop != ')')
					return FanBlock.makeParentheses(offset,defaultIndent)
			case '[':
				if (0 == blocks.size || blocks.pop != ']')
					return FanBlock.makeBrackets(offset,defaultIndent)
			case '{':
				if (0 == blocks.size || blocks.pop != '}')
					return FanBlock.makeBraces(offset,defaultIndent)
			case ')':
			case ']':
			case '}':
				blocks.push(c)
			}
		}

		return null
	}
	
	private Str defaultIndent() {
		getTabStyle.equals(CodeFormatterConstants.TAB) ? "\t" : Str.spaces(getIndentSize)
	}

	/**
	 * Find line with number <=line, that is Fantom code line (not comment)
	 * 
	 * @param d
	 *						the document to search in
	 * @param line
	 *						number of starting line
	 * @return number of code line or null if no such line found
	 */
	private Int? getLastCodeLine(IDocument d, Int line) {
		res := line
		while (res > -1) {
			str := getDocumentLine(d, line)
			if (!str.startsWith("//") && !str.isEmpty)
				return res
			res--
		}
		return null
	}

	private Str getDocumentLine(IDocument d, Int line) {
		d.get(d.getLineOffset(line), d.getLineLength(line))
	}

	private Void smartIndentAfterNewLine(IDocument d, DocumentCommand c) {
		if (c.offset == -1 || d.getLength() == 0) return
		//try {
			scanner := FanHeuristicScanner(d)
			pos := (c.offset == d.getLength() ? c.offset - 1 : c.offset)
			line := d.getLineOfOffset(pos)
			curLine := d.getLineOfOffset(c.offset)
			curLineStr := getDocumentLine(d, curLine)

			resultIndent := ""
			lastIndent := ""
			FanBlock? block := null
			needPeer := false
			// if we need to jump into middle of block without inserting peer brace
			dummyPeer := false

			block = getLastOpenBlockType(d, c.offset)
			if (curLineStr.trim.endsWith("\\"))
				resultIndent = getLineIndent(d, line - 1)
			else if (block == null) {
				lastCodeLine := getLastCodeLine(d, line)
				// no code above us, just copy last indent
				if (lastCodeLine == null)
					resultIndent = getLineIndent(d, line - 1)
				else {
					// if our line is inside brackets, get line with opening
					// bracket
					block = getLastOpenBlockType(d, d.getLineOffset(lastCodeLine))
					if (block != null) {
						peer := scanner.findOpeningPeer(d.getLineOffset(lastCodeLine), block.opening, block.closing)
						if (peer != null) {
							lastCodeLine = d.getLineOfOffset(peer)
						}
					}
					resultIndent = getLineIndent(d, lastCodeLine)
				}
			}
			else {
				// block != null
				lastCodeLine := d.getLineOfOffset(block.offset)
				lastIndent = getLineIndent(d, lastCodeLine)

				resultIndent = lastIndent + block.indent

				cPos := pos
				while ((d.getChar(cPos) == ' ' || d.getChar(cPos) == '\t')) {
					if (cPos == d.getLength() - 1)
						break
					cPos++
				}
				if (block.closing == d.getChar(cPos))
					dummyPeer = true
				// find closing peer, if exists
				peerOffset := scanner.findClosingPeer(pos, 0, block.opening, block.closing)
				// if not fount peer, we need it
				if (peerOffset == null)
					needPeer = true
			}

			if (!(block?.opening == '[' || block?.opening == '(')) {
				firstContinuation := previousIsFirstContinuation(d,
						scanner, c.offset, curLine)
				continuation := !firstContinuation
						&& previousIsContinuation(scanner, c.offset, curLine)

				if (firstContinuation)
					resultIndent += defaultIndent
				else if (continuation)
					resultIndent += getLineIndent(d, line - 1)
				// process line indent
			}

			resultIndent = remakeIndent(resultIndent)

			reg := d.getLineInformation(line)
			lineEnd := reg.getOffset() + reg.getLength()

			contentStart := findEndOfWhiteSpace(d, c.offset, lineEnd)
			c.length = 0.max(contentStart - c.offset)

			if (block?.opening == '{' && !preferenceStore.getBoolean(FanPreferenceConstants.EDITOR_CLOSE_BRACES))
				needPeer = false

			if ((block?.opening == '[' || block?.opening == '(') && !preferenceStore.getBoolean(FanPreferenceConstants.EDITOR_CLOSE_BRACKETS))
				needPeer = false

			if ((needPeer || dummyPeer) && block?.opening == '{') {
				//block != null
				buf := StrBuf().add(c.text).add(resultIndent)
				c.shiftsCaret = false
				c.caretOffset = c.offset + buf.size
				prevBlock := getLastOpenBlockType(d, block.offset - 1)
				insideRoundBrackets := (prevBlock != null && prevBlock?.opening == '(')
				if (!dummyPeer && !insideRoundBrackets && lineEnd - contentStart > 0) {
					c.length = lineEnd - c.offset
					buf.add(d.get(contentStart, lineEnd - contentStart))
				}

				buf.add(TextUtilities.getDefaultLineDelimiter(d))
				buf.add(lastIndent)

				if (!dummyPeer) {
					if (insideRoundBrackets) {
						buf.addChar(block.closing)
						if (lineEnd - contentStart > 0) {
							c.length = lineEnd - c.offset
							buf.add(d.get(contentStart, lineEnd - contentStart))
						}
					} else
						buf.addChar(block.closing)
				}
				c.text = buf.toStr
			}
			else
				c.text += resultIndent
		//} catch (BadLocationException e) {
		//	e.printStackTrace
		//}
	}

	/*@SuppressWarnings("unused")
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

	}*/

	private Void smartIndentAfterClosingBracket(IDocument d, DocumentCommand c) {
		if (c.offset == -1 || d.getLength == 0) return
		//try {
			bracket := c.text[0]
			// if we already have bracket we should jump over it
			if (c.offset != d.getLength && bracket == d.get(c.offset, 1)[0] && (getRegionType(d, c.offset) == IDocument.DEFAULT_CONTENT_TYPE)) {
				if (bracket == '}' && closeBraces || (bracket == ')' || bracket == ']') && closeBrackets) {
					c.text = ""
					c.shiftsCaret = false;
					c.caretOffset = c.offset + 1
					return
				}
			}

			scanner := FanHeuristicScanner(d)

			p := c.offset == d.getLength ? c.offset - 1 : c.offset
			line := d.getLineOfOffset(p)
			start := d.getLineOffset(line)
			whiteend := findEndOfWhiteSpace(d, start, c.offset)

			// shift only when line does not contain any text up to the closing
			// bracket
			if (whiteend == c.offset) {
				// determine block type
				FanBlock? block
				switch (c.text[0]) {
					case ']': block = FanBlock.makeBrackets(0,defaultIndent)
				case '}': block = FanBlock.makeBraces(0,defaultIndent)
				case ')': block = FanBlock.makeParentheses(0,defaultIndent)
				}
				if (block == null) return
				// evaluate the line with the opening bracket that matches out
				// closing bracket
				reference := scanner.findOpeningPeer(p, block.opening, block.closing)
				indLine := reference == null ? -1 : d.getLineOfOffset(reference)
				if (indLine != -1 && indLine != line) {
					// take the indent of the found line
					replaceText := StrBuf()
					// add the rest of the current line including the just added
					// close bracket
					replaceText.add(getLineIndent(d, indLine))
					replaceText.add(c.text)
					// modify document command
					c.length = c.length + c.offset - start
					c.offset = start
					c.text = replaceText.toStr
				}
			}
		//} catch (BadLocationException e) {
		//	e.printStackTrace
		//}
	}

	private Bool smartIndentJump(IDocument d, DocumentCommand c) {
		if (c.offset == -1 || d.getLength() == 0) return false
		//try {
			scanner := FanHeuristicScanner(d)
			p := c.offset == d.getLength ? c.offset - 1 : c.offset
			curLine := d.getLineOfOffset(c.offset)
			curLineStr := getDocumentLine(d, curLine)

			line := d.getLineOfOffset(p)
			start := d.getLineOffset(line)
			resultIndent := ""
			lastIndent := ""
			FanBlock? block

			// DUPLICATION: this code is identical to code in
			// smartInsertAfterNewLine
			block = getLastOpenBlockType(d, c.offset)
			if (curLineStr.trim.endsWith("\\")) {
				resultIndent = getLineIndent(d, line - 1)
			}
			else if (block == null) {
				lastCodeLine := getLastCodeLine(d, line)
				// if our line is inside brackets, get line with opening bracket
				block = getLastOpenBlockType(d, d.getLineOffset(curLine));
				if (block != null) {
					peer := scanner.findOpeningPeer(d.getLineOffset(curLine), block.opening, block.closing)
					if (peer != null)
						lastCodeLine = d.getLineOfOffset(peer)
				}
				// no code above us, just copy last indent
				if (-1 == lastCodeLine) {
					resultIndent = getLineIndent(d, line - 1)
				} else {
					resultIndent = getLineIndent(d, lastCodeLine)
				}
			} else {
				lastCodeLine := d.getLineOfOffset(block.offset)
				lastIndent = getLineIndent(d, lastCodeLine)
				resultIndent = lastIndent + block.indent
			}

			if (c.offset >= start + resultIndent.size)
				return false // we already in the place

			currentIndent := getLineIndent(d, line)
			if (!currentIndent.startsWith(resultIndent))
				return false // we have no place to jump

			c.length = 0
			c.shiftsCaret = false
			c.text = ""
			c.caretOffset = d.getLineOffset(line) + resultIndent.size

		//} catch (BadLocationException e) {
		//	e.printStackTrace
		//	return false
		//}
		return true
	}

	/**
	 * Installs a partitioner with <code>document</code>.
	 * 
	 * @param document
	 *						the document
	 */
	/*private static void installStuff(Document document) {
		String[] types = new String[] {
				IFanPartitions.FAN_STRING,
				IFanPartitions.FAN_MULTI_LINE_COMMENT,
				IFanPartitions.FAN_SINGLE_LINE_COMMENT,
				IFanPartitions.FAN_INTERPRETER_STRING, IFanPartitions.FAN_DOC,
				IFanPartitions.FAN_DSL, IDocument.DEFAULT_CONTENT_TYPE };
		FastPartitioner partitioner = new FastPartitioner(
				new FanPartitionScanner(), types);
		partitioner.connect(document);
		document.setDocumentPartitioner(IFanPartitions.FAN_PARTITIONING,
				partitioner);
	}*/

	/**
	 * Removes a partitioner with <code>document</code>.
	 * 
	 * @param document
	 *						the document
	 */
	/*private static void removeStuff(Document document) {
		document.setDocumentPartitioner(IFanPartitions.FAN_PARTITIONING, null);
	}*/

	/**
	 * Reindents c.text when pasting(simply indents all to common level).
	 * 
	 * @param d
	 * @param c
	 */
	/*@SuppressWarnings("unused")
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
			if (d.get(start, c.offset - start).trim().length() == 0) {
				// we are inserting lines block
				// TODO: recalc common indent try to detect cutten line
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
	}*/

	private Str generateIndent(Int newIndentLen) {
		res := ""
		if (getTabStyle != CodeFormatterConstants.SPACE) {
			ts := getTabSize
			while (newIndentLen >= ts) {
				res += "\t";
				newIndentLen -= ts;
			}
		}
		if (getTabStyle().equals(CodeFormatterConstants.TAB)) {
			if (newIndentLen > 0) res += "\t"
		} else
			res += Str.spaces(newIndentLen)
		return res
	}

	private Str remakeIndent(Str indent) {
		generateIndent(getPhysicalLength(indent))
	}

	private Bool previousIsFirstContinuation(IDocument d, FanHeuristicScanner scanner, Int offset, Int bound) {
		if (!previousIsContinuation(scanner, offset, bound)) return false
		line := d.getLineOfOffset(offset)
		if (line == 0) return true 
		prev := d.getLineInformation(line - 1)
		return !previousIsContinuation(scanner, prev.getOffset + prev.getLength, prev.getOffset)
	}

	private Bool previousIsContinuation(FanHeuristicScanner scanner, Int offset, Int bound) {
		continuationTokens.contains(scanner.previousToken(offset, bound))
	}

	/*private void smartPaste2(IDocument d, DocumentCommand cmd) {
		try {
			String content = d.get(0, cmd.offset) + cmd.text;
			Document temp = new Document(content);
			installStuff(temp);
			Vector<FanBlock> blocks = new Vector<FanBlock>();
			int figs = 0; // count of braces
			int cmdLine = d.getLineOfOffset(cmd.offset);
			int cmdLineStart = d.getLineOffset(cmdLine);
			int startLine = d.getLineOfOffset(cmd.offset) + 1;
			if (d.get(cmdLineStart, cmd.offset - cmdLineStart).trim().length() == 0)
			 	// we are inserting lines block
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
	}*/

	/**
	 * get partition covering offset
	 * 
	 * @param d
	 * @param offset
	 * @return
	 * @throws BadLocationException
	 */
	private Str getRegionType(IDocument d, Int offset) {
		TextUtilities.getPartition(d, partitioning, offset, true).getType
	}

	/*
	 * @see
	 * org.eclipse.jface.text.IAutoIndentStrategy#customizeDocumentCommand(org
	 * .eclipse.jface.text.IDocument, org.eclipse.jface.text.DocumentCommand)
	 */
	override Void customizeDocumentCommand(IDocument? d, DocumentCommand? c) {
		if (!c.doit) return
		if (c.length == 0 && c.text != null && d.getLegalLineDelimiters().contains(c.text)) {
			if (isSmartMode)
				smartIndentAfterNewLine(d, c)
			else
				super.customizeDocumentCommand(d, c)
		}
		else if (c.length <= 1 && c.text.size == 1) {
			switch (c.text[0]) {
				case '}':
				smartIndentAfterClosingBracket(d, c);
			case '\t':
				jumped := false
				if (preferenceStore.getBoolean(FanPreferenceConstants.EDITOR_SMART_TAB))
					jumped = smartIndentJump(d, c);
				if (!jumped && getTabStyle == CodeFormatterConstants.SPACE)
					c.text = Str.spaces(getTabSize)
			}
		}
		else if (c.length == 0 && c.text.size >= 1	&& c.text.trim.size == 0) {
			jumped := false
			if (preferenceStore.getBoolean(FanPreferenceConstants.EDITOR_SMART_TAB))
				jumped = smartIndentJump(d, c);
			if (!jumped && getTabStyle == CodeFormatterConstants.SPACE)
				c.text = Str.spaces(getTabSize)
		}
		else if (c.text.size >= 1 && isSmartPaste()) {
			// smartPasteSimple(d, c); //
		}
		// else if (c.text.length() >= 1 && isSmartPaste()) {
		// smartPaste2(d, c); // ureacheble code
		// }
	}
}

/*
 * Block is and opening char seq. and closing char seq. Each block have it's
 * own indent
 */
internal class FanBlock {
	const Int offset
	const Int opening
	const Int closing
	const Str indent
	new makeParentheses(Int o,Str indent) {
		offset = o
		opening = '('
		closing = ')'
		this.indent = indent
	}
	new makeBrackets(Int o,Str indent) {
		offset = o
		opening = '['
		closing = ']'
		this.indent = indent
	}
	new makeBraces(Int o,Str indent) {
		offset = o
		opening = '{'
		closing = '}'
		this.indent = indent
	}
}
