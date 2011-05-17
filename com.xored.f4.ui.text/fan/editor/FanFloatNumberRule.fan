using [java] org.eclipse.jface.text.rules::ICharacterScanner
using [java] org.eclipse.jface.text.rules::IRule
using [java] org.eclipse.jface.text.rules::IToken
using [java] org.eclipse.jface.text.rules::Token

/**
 * An implementation of <code>IRule</code> detecting a numerical value.
 */
class FanFloatNumberRule : IRule
{
  private IToken token

  new make(IToken token)
  {
    this.token = token
  }

  override IToken? evaluate(ICharacterScanner? scanner) {
    Mode? mode := Mode.decimal
    digitCount := 0
    readCount := 0
    c := scanner.read
    ++readCount
    if (c.isDigit || c == '.')
    {
      if (c == '.') mode = Mode.float
      else ++digitCount
      while (true)
      {
        lastDigit := c
        c = scanner.read
        ++readCount
        if (c == 'x' || c == 'X')
        {
          if (mode == Mode.decimal && digitCount == 1 && lastDigit == '0')
          {
            mode = Mode.hex
            digitCount = 0
          }
          else
          {
            mode = null
            break
          }
        }
        else if (c.isDigit || c == '_' || mode == Mode.hex && (c >= 'A' && c <= 'F' || c >= 'a' && c <= 'f'))
          digitCount++
        else
          break
      }
      if ((c == 'e' || c == 'E') && (mode == Mode.decimal || mode == Mode.float) && digitCount != 0)
      {
        mode = Mode.float
        c = scanner.read
        ++readCount
        if (c == '+' || c == '-')
        {
          c = scanner.read
          ++readCount
        }
        if (c.isDigit)
        {
          ++readCount
          c = scanner.read
          while (c.isDigit || c == '_')
          {
            ++readCount
            c = scanner.read
          } 
          if (c == 'd' || c == 'D' || c == 'f' || c == 'F') readCount = 0
        }
        else
          mode = null
      }
      if (mode != null && digitCount != 0)
      {
        if (readCount > 0) scanner.unread
        return token
      }
    }
    while (--readCount >= 0) scanner.unread
    return Token.UNDEFINED
  }
}

internal enum class Mode
{
  decimal, hex, float
}

