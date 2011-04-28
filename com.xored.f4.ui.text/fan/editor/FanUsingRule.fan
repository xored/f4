using [java] org.eclipse.jface.text.rules::ICharacterScanner
using [java] org.eclipse.jface.text.rules::IRule
using [java] org.eclipse.jface.text.rules::IToken
using [java] org.eclipse.jface.text.rules::Token

class FanUsingRule : IRule
{
  private IToken token
  
  new make(IToken token)
  {
    this.token = token
  }

  override IToken? evaluate(ICharacterScanner? scanner)
  {
    size := 0
    buffer := StrBuf()
    
    while(scanner.getColumn != 0)
    {
      scanner.unread
      size++
    }
    size.times { buffer.add(scanner.read.toChar) }
    
    return buffer.toStr.index("using") != null && endSequenceDetected(scanner) ? token : Token.UNDEFINED
  }
  
  private Bool endSequenceDetected(ICharacterScanner scanner)
  {
    c := 0
    
    while((c = scanner.read) != ICharacterScanner.EOF)
      if(c == '\n') return true

    return false;
  }
}
