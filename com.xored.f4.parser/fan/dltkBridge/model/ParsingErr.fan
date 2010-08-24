//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Alena Repina Feb 18, 2010 - Initial Contribution
//

**************************************************************************
** ParsingErr
**************************************************************************
const class ParsingErr : Err
{
  const Int? line
  const Int? col
  new make(Str? msg, Int? line := -1, Int? col := -1) : super (msg)
  {  
    this.line = line
    this.col = col
  }
  
  override Str toStr()
  {
    return "[" + line + ":" + col + "] " + super.toStr
  }
}

**************************************************************************
** UnexpTokenErr
**************************************************************************
const class UnexpTokenErr : ParsingErr
{
  new make(Str? msg, Int? line := -1, Int? col := -1) : super (msg, line, col)
  {  
  }
}

**************************************************************************
** EndOfStmtErr
**************************************************************************
const class EndOfStmtErr : ParsingErr
{
  new make(Str? msg, Int? line := -1, Int? col := -1) : super (msg, line, col)
  {  
  }
}
