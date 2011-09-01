
class StrParser
{
  private Int cur           // current char
  private Int peek          // next char
  private Str buf           // buffer
  internal Int pos           // index into buf for cur
  new make(Str value)
  {
    this.buf = value
    // initialize cur and peek
    cur = peek = ' '
    if (buf.size > 0) cur  = buf[0]
    if (buf.size > 1) peek = buf[1]
    pos = 0
  }
  private Void consume()
  {
    // get the next character from the buffer, any
    // problems mean that we have read past the end
    cur = peek
    pos++
    if (pos+1 < buf.size)
      peek = buf[pos+1] // next peek is cur+1
    else
      peek = 0
  }
  Void parse(|Int start, Int end| region)
  {
    while(pos < buf.size)
    {
      if( (cur =='$' && pos == 0 ) || (cur == '$' && pos > 0 && buf[pos-1] != '\\'))
        subst(region)
      else
        consume
    }
  }
  private Void subst(|Int start, Int end| region)
  {
    consume
    start := pos
    if( cur != '{')
    {
      while( cur.isAlphaNum || cur == '.' || cur == '_' ) consume
      region(start, pos+1)
    }
    else
    {
      blocks
      region(start, pos+1)
    }
  }
  private Void blocks()
  {
    Int in := 0
    while( pos < buf.size)
    {
      if( cur == '{')
      {
        in++;
      }
      if(cur == '}')
      {
        in--;
        if( in == 0)
        {
          consume
          return
        }
      }
      consume
    }
  }
}
