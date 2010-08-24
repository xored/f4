class LexerTests : Test
{
  Void testUnexpectedSymbol()
  {
    c := ProblemCollector.make
    t := Tokenizer("fan tom фан",c)
    TokenVal[] tokens := t.tokenize
    verifyEq(tokens.size, 2);
    verifyEq(c.list.size, 3);
    verifyEq(c.list[0].kind, ProblemKind.lexer_unexpected);
    verifyEq(c.list[1].kind, ProblemKind.lexer_unexpected);
    verifyEq(c.list[2].kind, ProblemKind.lexer_unexpected);
  }
}