class TokenVal
{
  new make(Token kind, Obj? val := null)
  {
    this.kind = kind
    this.val  = val
  }

  override Int hash()
  {
    return kind.hash
  }

  override Bool equals(Obj? obj)
  {
    that := obj as TokenVal
    if (that == null) return false
    return (kind === that.kind) && (val == that.val)
  }

  Str text()
  {
    if (val is Str) return val
    return kind.symbol
  }

  override Str toStr()
  {
    if (kind === Token.identifier) return val.toStr
    return kind.symbol
  }
  
  Token kind      // enum for Token type
  Obj? val        // Str, Int, Float, Duration, or Str[]
  Bool newline    // have we processed one or more newlines since the last token
  Bool whitespace // was this token preceeded by whitespace
  
  Int? start := -1
  Int? end := -1
  Int? line := -1
  Int? col := -1
}

**
** Extra information for DSL tokens.
**
class TokenValDsl : TokenVal
{
  new make(Token kind, Str src, Int tabs, Int spaces)
    : super.make(kind, src)
  {
    leadingTabs = tabs
    leadingSpaces = spaces
  }

  Int leadingTabs     // see DslExpr
  Int leadingSpaces   // see DslExpr
}