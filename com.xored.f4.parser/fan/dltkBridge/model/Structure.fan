//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Alena Repina Feb 18, 2010 - Initial Contribution
//

class Elem
{
  Int start
  Int end
  
  new make(TokenVal tok)
  {
    this.start = tok.start
    this.end = tok.end
  }
  
  new bounds(Int start, Int end)
  {
    this.start = start
    this.end = end
  }
}

class Word : Elem
{
  new make(TokenVal tok) 
    : super(tok)
  {
    this.text = tok.text
  }
  
  Str text
    
  Word appendText(Str text)
  {
    this.text += text
    this.end += text.size
    return this
  }
  
  Word appendToken(TokenVal tok)
  {
    this.text += tok.text
    this.end += tok.end
    return this
  }
  
  Word append(Word word)
  {
    this.text += word.text
    this.end += word.end
    return this
  }
  
  Word insert(TokenVal tok)
  {
    this.text = tok.text + this.text
    this.start = tok.start
    return this
  }
  
  override Str toStr()
  {
    return text
  }
}
