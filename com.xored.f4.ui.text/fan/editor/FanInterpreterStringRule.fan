using [java] org.eclipse.jface.text.rules::ICharacterScanner
using [java] org.eclipse.jface.text.rules::IToken
using [java] org.eclipse.jface.text.rules::Token
using [java] com.xored.f4.ui.text::PredicateRuleBridge

class FanInterpreterStringRule : PredicateRuleBridge
{
  private IToken token

  new make(IToken comment)
  {
    token = comment
  }

  override IToken? eval(ICharacterScanner? scanner)
  {
    if (!(scanner is FanPartitionScanner && ((FanPartitionScanner) scanner).getOffset() == 0)) {
      return Token.UNDEFINED;
    }
    c := scanner.read();
    if (c != '#') {
      scanner.unread();
      return Token.UNDEFINED;
    }
    c = scanner.read();
    if (c != '!') {
      scanner.unread();
      scanner.unread();
      return Token.UNDEFINED;
    }
    // read till EOL
    while (c != '\n' && c != '\r' && c != ICharacterScanner.EOF) {
      c = scanner.read();
    }
    if (c == '\r') {
      c = scanner.read();
      if (c != '\n') {
        scanner.unread();
      }
    }
    return token;
  }

  override IToken? getSuccessToken() {
    return token;
  }
}