using [java] org.eclipse.jface.text::DefaultTextDoubleClickStrategy
using [java] org.eclipse.jface.text::IDocument
using [java] org.eclipse.jface.text::IRegion
using [java] org.eclipse.jface.text::Region

using "[java]com.xored.fanide.internal.ui.text"::FanPairMatcher

class FanDoubleClickStrategy : DefaultTextDoubleClickStrategy
{
  protected FanPairMatcher pairMatcher := FanPairMatcher()
  private FanIdentifierDetector fanWordDetector := FanIdentifierDetector()

  protected override IRegion? findExtendedDoubleClickSelection(IDocument? document,
      Int offset)
  {
    match := pairMatcher.match(document, offset)
    if (match != null && match.getLength >= 2)
      return Region(match.getOffset + 1, match.getLength - 2)
    return findWord(document, offset)
  }

  protected override IRegion? findWord(IDocument? document, Int offset)
  {
    return fanWordDetector.getWordSelection(document, offset)
  }
}

internal class FanIdentifierDetector
{
    // State or Direction
    private static const Int UNKNOWN := -1

    // BEGIN States
    private static const Int IDSTART := 0
    private static const Int IDPART := 1
    private static const Int AT := 2
    // END States

    // BEGIN Directions
    private static const Int BACKWARD := 0
    private static const Int FORWARD := 1
    // END Directions

    private Int characterState
    private Int anchorState
    private Int currentDirection
    
    private Int wordStart
    private Int wordEnd

    IRegion getWordSelection(IDocument d, Int offset)
    {
      //try {
        setInitialAnchorPos(offset)
        pos := offset
        max := d.getLength
        while (pos < max)
        {
          c := d.getChar(pos)
          if (!goForward(c, pos)) break
          ++pos
        }

        pos = offset
        min := 0
        while (pos >= min)
        {
          c := d.getChar(pos)
          if (!goBackward(c, pos))
            break
          --pos
        }

        return Region(wordStart, wordEnd - wordStart + 1)
      //} catch (BadLocationException e) {
      //  return new Region(offset, 0);
      //}
    }

    private Void setInitialAnchorPos(Int offset)
    {
      characterState = UNKNOWN
      anchorState = UNKNOWN
      currentDirection = UNKNOWN
      wordStart = offset
      wordEnd = wordStart - 1
    }

    Bool goForward(Int c, Int offset)
    {
      setState(FORWARD)

      switch (characterState)
      {
      case UNKNOWN:
        if (c == '@')
        {
          wordStart = offset
          characterState = AT
          anchorState = characterState
          return true
        }
        else if (c.isAlpha)
        {
          wordEnd = offset
          characterState = IDSTART
          anchorState = characterState
          return true
        }
        else if (c.isDigit)
        {
          wordEnd = offset
          characterState = IDPART
          anchorState = characterState
          return true
        }
        return false

      case IDSTART:
      case IDPART:
        if (c.isAlpha)
        {
          wordEnd = offset
          characterState = IDSTART
          return true
        }
        else if (c.isDigit)
        {
          wordEnd = offset
          characterState = IDPART
          return true
        }
        return false

      case AT:
        if (c.isAlpha)
        {
          wordEnd = offset
          characterState = IDSTART
          return true
        }
        return false

      default:
        return false
      }
    }

    Bool goBackward(Int c, Int offset)
    {
      setState(BACKWARD)
      switch (characterState)
      {
      case AT:
        return false
      case IDSTART:
        if (c == '@')
        {
          wordStart = offset
          characterState = AT
          return false
        }
        else if (c.isAlpha)
        {
          wordStart = offset
          characterState = IDSTART
          return true
        }
        else if (c.isDigit)
        {
          wordStart = offset
          characterState = IDPART
          return true
        }
        return false

      case IDPART:
        if (c.isAlpha)
        {
          wordStart = offset
          characterState = IDSTART
          return true
        }
        else if (c.isDigit)
        {
          wordStart = offset
          characterState = IDPART
          return true
        }
        return false

      default:
        return false
      }
    }

    private Void setState(Int direction)
    {
      if (currentDirection == direction) return
      characterState = wordStart <= wordEnd ? anchorState : UNKNOWN
      currentDirection = direction
    }
}