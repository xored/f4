using [java] org.eclipse.jface.text::IDocument
using [java] org.eclipse.jface.text::ITypedRegion
using [java] org.eclipse.jface.text::TextUtilities
using [java] org.eclipse.jface.text::TypedRegion
using [java] com.xored.fanide.core::FanConstants

class FanHeuristicScanner {

  /*private static final int[] BLOCK_BEGINNING_SYMBOLS = { TokenLBRACE,
    TokenLBRACKET };

  private static final int[] BLOCK_ENDINGS = { TokenRBRACE,
    TokenRBRACKET };*/


  new make(IDocument document)
  {
    this.document = document
    //partitioning = FanConstants.FAN_PARTITIONING
    //partition = IDocument.DEFAULT_CONTENT_TYPE
  }
  
  private IDocument document

  Symbol getToken(Int pos, Str? s)
  {
    return s.size == 1 ? getGenericToken(s[0]) : Symbol.identifier
  }

  /*public IRegion findSurroundingBlock(int offset) {
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
  }*/
  
  /**
   * Returned by all methods when the requested position could not be found,
   * or if a {@link BadLocationException} was thrown while scanning.
   */
  //public static final int NOT_FOUND = -1;
  /**
   * Special bound parameter that means either -1 (backward scanning) or
   * <code>fDocument.getLength()</code> (forward scanning).
   */
  //public static final int UNBOUND = -2;

  /* character constants */
  /*private static final char LBRACE = '{';
  private static final char RBRACE = '}';
  private static final char LPAREN = '(';
  private static final char RPAREN = ')';
  private static final char SEMICOLON = ';';
  private static final char COLON = ':';
  private static final char COMMA = ',';
  private static final char LBRACKET = '[';
  private static final char RBRACKET = ']';
  private static final char QUESTIONMARK = '?';
  private static final char EQUAL = '=';
  private static final char LANGLE = '<';
  private static final char RANGLE = '>';
  private static final char BACKSLASH = '\\';
  private static final char SLASH = '/';
  private static final char PLUS = '+';
  private static final char MINUS = '-';
  private static final char STAR = '*';*/
  
  /* preset stop conditions */
  private StopCondition nonWSDefaultPart := NonWhitespaceDefaultPartition(this)
  /*private final static StopCondition fNonWS = new NonWhitespace();*/
  private StopCondition nonIdentifier := NonIdentifierPartDefaultPartition(this)

  /** The document being scanned. */
  //private final IDocument fDocument;
  /** The partitioning being used for scanning. */
  //private final String fPartitioning;
  /** The partition to scan in. */
  //private final String fPartition;

  /* internal scan state */

  /** the most recently read character. */
  private Int char
  /** the most recently read position. */
  Int pos { private set }
  /**
   * The most recently used partition.
   * 
   * @since 3.2
   */
  private ITypedRegion cachedPartition := TypedRegion(-1, 0, "__no_partition_at_all")

  /**
   * Sets the most recent internal scan position.
   * 
   * @return the most recent internal scan position.
   */
  /*protected void setPosition(int pos) {
    fPos = pos;
  }*/
  
  /**
   * Returns the scanned document
   * 
   * @return the scanned document
   */
  /*public IDocument getDocument() {
    return fDocument;
  }*/

  /**
   * Returns the partition at <code>position</code>.
   * 
   * @param position
   *            the position to get the partition for
   * @return the partition at <code>position</code> or a dummy zero-length
   *         partition if accessing the document fails
   */
  internal ITypedRegion getPartition(Int position)
  {
    if (!contains(cachedPartition, position))
    {
      //Assert.isTrue(position >= 0);
      //Assert.isTrue(position <= fDocument.getLength());

      //try {
        cachedPartition = TextUtilities.getPartition(document,
            FanConstants.FAN_PARTITIONING, position, false)
      //} catch (BadLocationException e) {
      //  fCachedPartition = new TypedRegion(position, 0,
      //      "__no_partition_at_all"); //$NON-NLS-1$
      //}
    }

    return cachedPartition
  }

  /**
   * Returns <code>true</code> if <code>region</code> contains
   * <code>position</code>.
   * 
   * @param region
   *            a region
   * @param position
   *            an offset
   * @return <code>true</code> if <code>region</code> contains
   *         <code>position</code>
   * @since 3.2
   */
  private Bool contains(ITypedRegion region, Int position)
  {
    offset := region.getOffset
    return offset <= position && position < offset + region.getLength
  }

  /**
   * Checks whether <code>position</code> resides in a default partition of
   * <code>fDocument</code>.
   * 
   * @param position
   *            the position to be checked
   * @return <code>true</code> if <code>position</code> is in the default
   *         partition of <code>fDocument</code>, <code>false</code>
   *         otherwise
   */
  Bool isDefaultPartition(Int position)
  {
    getPartition(position).getType == IDocument.DEFAULT_CONTENT_TYPE
  }

  /**
   * Finds the lowest position <code>p</code> in <code>fDocument</code>
   * such that <code>start</code> &lt;= p &lt; <code>bound</code> and
   * <code>condition.stop(fDocument.getChar(p), p)</code> evaluates to
   * <code>true</code>.
   * 
   * @param start
   *            the first character position in <code>fDocument</code> to be
   *            considered
   * @param bound
   *            the first position in <code>fDocument</code> to not consider
   *            any more, with <code>bound</code> &gt; <code>start</code>,
   *            or <code>UNBOUND</code>
   * @param condition
   *            the <code>StopCondition</code> to check
   * @return the lowest position in [<code>start</code>,
   *         <code>bound</code>) for which <code>condition</code> holds,
   *         or <code>NOT_FOUND</code> if none can be found
   */
  //public int scanForward(int start, int bound, StopCondition condition) {
  private Int? scanForward(Int start, StopCondition condition, Int bound := document.getLength)
  {
    //Assert.isLegal(start >= 0);
    //try {
      pos = start
      while (pos < bound)
      {
        char = document.getChar(pos)
        if (condition.stop(char, pos, true)) return pos
        pos = condition.nextPosition(pos, true)
      }
    //} catch (BadLocationException e) {
    //}
    return null
  }

  /**
   * Finds the highest position <code>p</code> in <code>fDocument</code>
   * such that <code>bound</code> &lt; <code>p</code> &lt;=
   * <code>start</code> and
   * <code>condition.stop(fDocument.getChar(p), p)</code> evaluates to
   * <code>true</code>.
   * 
   * @param start
   *            the first character position in <code>fDocument</code> to be
   *            considered
   * @param bound
   *            the first position in <code>fDocument</code> to not consider
   *            any more, with <code>bound</code> &lt; <code>start</code>,
   *            or <code>UNBOUND</code>
   * @param condition
   *            the <code>StopCondition</code> to check
   * @return the highest position in (<code>bound</code>,
   *         <code>start</code> for which <code>condition</code> holds, or
   *         <code>NOT_FOUND</code> if none can be found
   */
  //public int scanBackward(int start, int bound, StopCondition condition) {
  
  private Int? scanBackward(Int start, StopCondition condition, Int bound := -1)
  {
    //Assert.isLegal(start <= fDocument.getLength());

    //try {
      pos = start - 1
      while (pos >= bound)
      {
        if (pos < 0) return null
        char = document.getChar(pos)
        if (condition.stop(char, pos, false))
          return pos
        pos = condition.nextPosition(pos, false)
      }
    //} catch (BadLocationException e) {
    //}
    return null
  }

  /**
   * Finds the smallest position in <code>fDocument</code> such that the
   * position is &gt;= <code>position</code> and &lt; <code>bound</code>
   * and <code>Character.isWhitespace(fDocument.getChar(pos))</code>
   * evaluates to <code>false</code> and the position is in the default
   * partition.
   * 
   * @param position
   *            the first character position in <code>fDocument</code> to be
   *            considered
   * @param bound
   *            the first position in <code>fDocument</code> to not consider
   *            any more, with <code>bound</code> &gt; <code>position</code>,
   *            or <code>UNBOUND</code>
   * @return the smallest position of a non-whitespace character in [<code>position</code>,
   *         <code>bound</code>) that resides in a Java partition, or
   *         <code>NOT_FOUND</code> if none can be found
   */
  /*public int findNonWhitespaceForward(int position, int bound) {
    return scanForward(position, bound, fNonWSDefaultPart);
  }*/

  /**
   * Finds the smallest position in <code>fDocument</code> such that the
   * position is &gt;= <code>position</code> and &lt; <code>bound</code>
   * and <code>Character.isWhitespace(fDocument.getChar(pos))</code>
   * evaluates to <code>false</code>.
   * 
   * @param position
   *            the first character position in <code>fDocument</code> to be
   *            considered
   * @param bound
   *            the first position in <code>fDocument</code> to not consider
   *            any more, with <code>bound</code> &gt; <code>position</code>,
   *            or <code>UNBOUND</code>
   * @return the smallest position of a non-whitespace character in [<code>position</code>,
   *         <code>bound</code>), or <code>NOT_FOUND</code> if none can
   *         be found
   */
  /*public int findNonWhitespaceForwardInAnyPartition(int position, int bound) {
    return scanForward(position, bound, fNonWS);
  }*/

  /**
   * Finds the highest position in <code>fDocument</code> such that the
   * position is &lt;= <code>position</code> and &gt; <code>bound</code>
   * and <code>Character.isWhitespace(fDocument.getChar(pos))</code>
   * evaluates to <code>false</code> and the position is in the default
   * partition.
   * 
   * @param position
   *            the first character position in <code>fDocument</code> to be
   *            considered
   * @param bound
   *            the first position in <code>fDocument</code> to not consider
   *            any more, with <code>bound</code> &lt; <code>position</code>,
   *            or <code>UNBOUND</code>
   * @return the highest position of a non-whitespace character in (<code>bound</code>,
   *         <code>position</code>] that resides in a Java partition, or
   *         <code>NOT_FOUND</code> if none can be found
   */
  /*public int findNonWhitespaceBackward(int position, int bound) {
    return scanBackward(position, bound, fNonWSDefaultPart);
  }*/

  /**
   * Finds the highest position in <code>fDocument</code> such that the
   * position is &gt;= <code>position</code> and &lt; <code>bound</code>
   * and <code>Character.isWhitespace(fDocument.getChar(pos))</code>
   * evaluates to <code>false</code>.
   * 
   * @param position
   *            the first character position in <code>fDocument</code> to be
   *            considered
   * @param bound
   *            the first position in <code>fDocument</code> to not consider
   *            any more, with <code>bound</code> &gt; <code>position</code>,
   *            or <code>UNBOUND</code>
   * @return the smallest position of a non-whitespace character in [<code>position</code>,
   *         <code>bound</code>), or <code>NOT_FOUND</code> if none can
   *         be found
   */
  /*public int findNonWhitespaceBackwardInAnyPartition(int position, int bound) {
    return scanBackward(position, bound, fNonWS);
  }*/

  protected Symbol getGenericToken(Int ch)
  {
    switch (ch)
    {
    case '{':
      return Symbol.lbrace
    case '}':
      return Symbol.rbrace
    case '[':
      return Symbol.lbracket
    case ']':
      return Symbol.rbracket
    case '(':
      return Symbol.lparen
    case ')':
      return Symbol.rparen
    case ';':
      return Symbol.semicolon
    case ':':
      return Symbol.colon
    case ',':
      return Symbol.comma
    case '?':
      return Symbol.question
    case '=':
      return Symbol.eq
    case '<':
      return Symbol.less
    case '>':
      return Symbol.greater
    case '\\':
      return Symbol.backslash
    case '/':
      return Symbol.slash
    case '+':
      return Symbol.plus
    case '-':
      return Symbol.minus
    case '*':
      return Symbol.star
    default:
      return Symbol.other
    }
  }

  /**
   * Returns the next token in forward direction, starting at
   * <code>start</code>, and not extending further than <code>bound</code>.
   * The return value is one of the constants defined in {@link Symbols}.
   * After a call, {@link #getPosition()} will return the position just after
   * the scanned token (i.e. the next position that will be scanned).
   * 
   * @param start
   *            the first character position in the document to consider
   * @param bound
   *            the first position not to consider any more
   * @return a constant from {@link Symbols} describing the next token
   */
  public Symbol nextToken(Int start, Int bound)
  {
    pos := scanForward(start, nonWSDefaultPart, bound)
    if (pos == null) return Symbol.eof

    pos++

    token := getGenericToken(char)
    if (token != Symbol.other) return token

    // else
    if (!char.isAlphaNum) return Symbol.other
    // assume an identifier or keyword
    from := pos
    to := scanForward(pos, nonIdentifier, bound) ?: bound

    return getToken(from,document.get(from, to - from))
  }

  /**
   * Returns the next token in backward direction, starting at
   * <code>start</code>, and not extending further than <code>bound</code>.
   * The return value is one of the constants defined in {@link Symbols}.
   * After a call, {@link #getPosition()} will return the position just before
   * the scanned token starts (i.e. the next position that will be scanned).
   * 
   * @param start
   *            the first character position in the document to consider
   * @param bound
   *            the first position not to consider any more
   * @return a constant from {@link Symbols} describing the previous token
   */
  Symbol previousToken(Int start, Int bound)
  {
    pos := scanBackward(start, nonWSDefaultPart, bound)
    if (pos == null) return Symbol.eof

    token := getGenericToken(char)
    if (token != Symbol.other) return token

    // else
    if (char.isAlphaNum)
    {
      // assume an ident or keyword
      to := pos + 1
      from := 0
      pos = scanBackward(pos, nonIdentifier, bound)
      if (pos == null)
        from = bound
      else
        from = pos + 1

      return getToken(from,document.get(from, to - from))
    }
    else
    {
      // operators, number literals etc
      return Symbol.other
    }
  }

  /*private int getToken(int from, int to) {
    String identOrKeyword;
    try {
      identOrKeyword = fDocument.get(from, to - from);
    } catch (BadLocationException e) {
      return TokenEOF;
    }

    return getToken(from, identOrKeyword);
  }*/

  /*public int findPrecedingNotEmptyLine(int offset) {
    try {
      int notEmptyPositioin = findNonWhitespaceBackward(offset, UNBOUND);
      if (notEmptyPositioin != NOT_FOUND) {
        return fDocument.getLineInformationOfOffset(notEmptyPositioin)
            .getOffset();
      }
    } catch (BadLocationException e) {
      DLTKUIPlugin.log(e);
    }
    return 0;
  }*/
  
  /**
   * Returns the position of the closing peer character (forward search). Any scopes introduced by opening peers
   * are skipped. All peers accounted for must reside in the default partition.
   *
   * <p>Note that <code>start</code> must not point to the opening peer, but to the first
   * character being searched.</p>
   *
   * @param start the start position
   * @param openingPeer the opening peer character (e.g. '{')
   * @param closingPeer the closing peer character (e.g. '}')
   * @return the matching peer character position, or <code>NOT_FOUND</code>
   */
  //public int findClosingPeer(int start, int depth, int bound, final char openingPeer, final char closingPeer) {
  Int? findClosingPeer(Int start, Int depth, Int openingPeer, Int closingPeer)
  {
    //Assert.isLegal(start >= 0);

    //try {
      Int? backwordstart := start
      while (true)
      {
        backwordstart = scanBackward(backwordstart, CharacterMatch([openingPeer, closingPeer],this))
        if (backwordstart == null) break

        if (document.getChar(backwordstart) == openingPeer)
          depth++
        else
          depth--
      }
    
      Int? next := start-1
      while (true)
      {
        next = scanForward(next+1, CharacterMatch([openingPeer,closingPeer],this))
        if (next == null) return null
        if (document.getChar(next) == openingPeer)
          depth++
        else
          depth--
        if (depth == 0) return next
      }
    return null
    //} catch (BadLocationException e) {
    //  return NOT_FOUND;
    //}
  }

  /**
   * Returns the position of the opening peer character (backward search). Any scopes introduced by closing peers
   * are skipped. All peers accounted for must reside in the default partition.
   *
   * <p>Note that <code>start</code> must not point to the closing peer, but to the first
   * character being searched.</p>
   *
   * @param start the start position
   * @param openingPeer the opening peer character (e.g. '{')
   * @param closingPeer the closing peer character (e.g. '}')
   * @return the matching peer character position, or <code>NOT_FOUND</code>
   */
  Int? findOpeningPeer(Int start, Int openingPeer, Int closingPeer)
  {
    //Assert.isLegal(start <= document.getLength)

    //try {
      match := CharacterMatch([openingPeer,closingPeer],this)
      depth := 1
      Int? next := start + 1
      while (true)
      {
        next = scanBackward(next - 1, match)
        if (next == null) return null

        if (document.getChar(next) == closingPeer)
          depth++
        else
          depth--

        if (depth == 0) return next
      }
    //} catch (BadLocationException e) {
    //  return NOT_FOUND;
    //}
    return null
  }

  /*public IRegion findWordAt(int offset) {
    try {     
      IRegion line = fDocument.getLineInformationOfOffset(offset);
      int start = findNonIdentifierBackward(offset, line.getOffset());
      int end = findNonIdentifierForward(offset, line.getOffset() + line.getLength());
      if (start == NOT_FOUND)
        start = line.getOffset();
      else 
        start += 1;
      
      if (end == NOT_FOUND)
        end = line.getOffset() + line.getLength();
      
      int length = end - start;
      if (length > 0)
        return new Region(start, length);
      
    } catch (BadLocationException e) {
      DLTKUIPlugin.log(e);
    }
    return null;
  }*/

  /**
   * Returns one of the keyword constants or <code>TokenIDENT</code> for a
   * scanned identifier.
   * 
   * @param s
   *            a scanned identifier
   * @return one of the constants defined in {@link ISymbols}
   */
}
/**
 * Specifies the stop condition, upon which the <code>scanXXX</code>
 * methods will decide whether to keep scanning or not. This interface may
 * implemented by clients.
 */
internal abstract class StopCondition
{
  /**
   * Instructs the scanner to return the current position.
   * 
   * @param ch
   *            the char at the current position
   * @param position
   *            the current position
   * @param forward
   *            the iteration direction
   * @return <code>true</code> if the stop condition is met.
    */
 abstract Bool stop(Int ch, Int position, Bool forward)

  /**
   * Asks the condition to return the next position to query. The default
   * is to return the next/previous position.
   * 
   * @return the next position to scan
   */
  virtual Int nextPosition(Int position, Bool forward) { forward ? position + 1 : position - 1 }
}

/**
 * Stops upon a character in the default partition that matches the given character list.
 */
internal class CharacterMatch : StopCondition
{
  private const Int[] chars
  private FanHeuristicScanner scanner

  /**
   * Creates a new instance.
   * @param chars the chars to match.
   */
  new make(Int[] chars, FanHeuristicScanner scanner) {
    this.chars = chars
    this.scanner = scanner
  }

    /*
     * @see org.eclipse.jdt.internal.ui.text.JavaHeuristicScanner.StopCondition#stop(char, int)
     */
  override Bool stop(Int ch, Int position, Bool forward)
  {
    chars.contains(ch) && scanner.isDefaultPartition(position)
  }

    /*
     * @see org.eclipse.jdt.internal.ui.text.JavaHeuristicScanner.StopCondition#nextPosition(int, boolean)
     */
  override Int nextPosition(Int position, Bool forward)
  {
    partition := scanner.getPartition(position)
    if (partition.getType == IDocument.DEFAULT_CONTENT_TYPE)
      return super.nextPosition(position, forward)

    if (forward)
    {
      end := partition.getOffset + partition.getLength
      if (position < end) return end
    }
    else
    {
      offset := partition.getOffset
      if (position > offset)
        return offset - 1
    }
    return super.nextPosition(position, forward)
  }
}

/**
 * Stops upon a non-whitespace character in the default partition.
 * 
 * @see RubyHeuristicScanner.NonWhitespace
 */
internal class NonWhitespaceDefaultPartition : StopCondition
{
  private FanHeuristicScanner scanner
  new make(FanHeuristicScanner scanner)
  {
    this.scanner = scanner
  }
  
  override Bool stop(Int ch, Int position, Bool forward)
  {
    ch.isSpace && scanner.isDefaultPartition(position)
  }

  override Int nextPosition(Int position, Bool forward)
  {
    partition := scanner.getPartition(position)
    if (partition.getType == IDocument.DEFAULT_CONTENT_TYPE)
      return super.nextPosition(position, forward)
    if (forward)
    {
      end := partition.getOffset + partition.getLength
      if (position < end) return end
    }
    else
    {
      offset := partition.getOffset
      if (position > offset) return offset - 1
    }
    return super.nextPosition(position, forward)
  }
}

/**
 * Stops upon a non-java identifier character in the default partition.
 * 
 * @see JavaHeuristicScanner.NonIdentifierPart
 */
internal class NonIdentifierPartDefaultPartition : StopCondition
{
  private FanHeuristicScanner scanner
  new make(FanHeuristicScanner scanner)
  {
    this.scanner = scanner
  }
  
  override Bool stop(Int ch, Int position, Bool forward)
  {
    ch.isAlphaNum || !scanner.isDefaultPartition(position)
  }

  override Int nextPosition(Int position, Bool forward)
  {
    partition := scanner.getPartition(position)
    if (partition.getType == IDocument.DEFAULT_CONTENT_TYPE)
      return super.nextPosition(position, forward)
    if (forward)
    {
      end := partition.getOffset + partition.getLength
      if (position < end) return end
    }
    else
    {
      offset := partition.getOffset
      if (position > offset) return offset - 1
    }
    return super.nextPosition(position, forward)
  }
}
