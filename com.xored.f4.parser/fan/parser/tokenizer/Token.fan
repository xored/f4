**
** Token is the enum for all the token types.
**
enum class Token
{

  // identifer/literals
  identifier      ("identifier"),
  strLiteral      ("Str literal"),
  intLiteral      ("Int literal"),
  floatLiteral    ("Float literal"),
  decimalLiteral  ("Decimal literal"),
  durationLiteral ("Duration literal"),
  uriLiteral      ("Uri literal"),
  dsl             ("DSL"),

  // operators  
  dot           ("."),
  semicolon     (";"),
  comma         (","),
  colon         (":"),
  doubleColon   ("::"),
  plus          ("+"),
  minus         ("-"),
  star          ("*"),
  slash         ("/"),
  percent       ("%"),
  pound         ("#"),
  increment     ("++"),
  decrement     ("--"),
  bang          ("!"),
  question      ("?"),
  tilde         ("~"),
  pipe          ("|"),
  amp           ("&"),
  caret         ("^"),
  at            ("@"),
  doublePipe    ("||"),
  doubleAmp     ("&&"),
  same          ("==="),
  notSame       ("!=="),
  eq            ("=="),
  notEq         ("!="),
  cmp           ("<=>"),
  lt            ("<"),
  ltEq          ("<="),
  gt            (">"),
  gtEq          (">="),
  lshift        ("<<"),
  rshift        (">>"),
  lbrace        ("{"),
  rbrace        ("}"),
  lparen        ("("),
  rparen        (")"),
  lbracket      ("["),
  rbracket      ("]"),
  dotDot        (".."),
  dotDotLt      ("..<"),
  defAssign     (":="),
  assign        ("="),
  assignPlus    ("+="),
  assignMinus   ("-="),
  assignStar    ("*="),
  assignSlash   ("/="),
  assignPercent ("%="),
  assignAmp     ("&="),
  assignPipe    ("|="),
  assignCaret   ("^="),
  assignLshift  ("<<="),
  assignRshift  (">>="),
  arrow         ("->"),
  elvis         ("?:"),
  safeDot       ("?."),
  safeArrow     ("?->"),
  docComment    ("**"),
  slComment       ("//"),
  mlComment       ("/*"),
  dollar        ("\$"),
  

  // keywords
  abstractKeyword,
  asKeyword,
  assertKeyword,
  breakKeyword,
  caseKeyword,
  catchKeyword,
  classKeyword,
  constKeyword,
  continueKeyword,
  defaultKeyword,
  doKeyword,
  elseKeyword,
  enumKeyword,
  falseKeyword,
  finalKeyword,
  finallyKeyword,
  forKeyword,
  foreachKeyword,
  ifKeyword,
  internalKeyword,
  isKeyword,
  isnotKeyword,
  itKeyword,
  mixinKeyword,
  nativeKeyword,
  newKeyword,
  nullKeyword,
  onceKeyword,
  overrideKeyword,
  privateKeyword,
  protectedKeyword,
  publicKeyword,
  readonlyKeyword,
  returnKeyword,
  staticKeyword,
  superKeyword,
  switchKeyword,
  thisKeyword,
  throwKeyword,
  trueKeyword,
  tryKeyword,
  usingKeyword,
  virtualKeyword,
  volatileKeyword,
  voidKeyword,
  whileKeyword,

  // misc
  none("none"),
  eof("eof");

  // potential keywords:
  //   async, checked, contract, decimal, duck, def, isnot,
  //   namespace, once, unchecked, unless, when,  var, with

  **
  ** Construct with symbol str, or null symbol for keyword.
  **
  private new make(Str? symbol := null)
  {
    if (symbol == null)
    {
      if (!name.endsWith("Keyword")) throw Err(name)
      this.symbol   = name[0..-8]
      this.keyword  = true
      this.isAssign = false
    }
    else
    {
      this.symbol   = symbol
      this.keyword  = false
      this.isAssign = name.startsWith("assign") ||
                      name == "increment" ||
                      name == "decrement"
    }
  }

  override Str toStr() { return symbol }

//////////////////////////////////////////////////////////////////////////
// Keyword Lookup
//////////////////////////////////////////////////////////////////////////

  **
  ** Get a map of the keywords
  **
  const static Str:Token keywords
  static
  {
    map := Str:Token[:]
    vals.each |Token t|
    {
      if (t.keyword) map[t.symbol] = t
    }
    keywords = map
  }

  ** Get string used to display token to user in error messages
  const Str symbol

  ** Is this a keyword token such as "null"
  const Bool keyword

  ** Is this an assignment token such as "=", etc "+=", etc
  const Bool isAssign

}