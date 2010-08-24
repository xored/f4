//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 2, 2010 - Initial Contribution
//

using [java] org.eclipse.core.variables
**
**
**
class FanLinkRes : IDynamicVariableResolver
{
  //TODO: validate correctness of pattern
  private static const Str device := "(?:[a-zA-Z]:)?"
  private static const Str separator := "[/\\\\]"
  private static const Str segment := "[ _\\p{L}\\p{N}\\p{M}\\p{S}\\.\\-]+"
  private static const Str stackTrace := "(?:\\(\\S*\\.fan(?::\\S*)?\\))"
  private static const Str lineNumber := "\\(\\d+,\\d+\\)"
  
  override Str? resolveValue(IDynamicVariable? var, Str? arg)
  {
    "$stackTrace|(?:$device$separator?$segment(?:$separator$segment)*$lineNumber)"
  }
  
  static const Regex fileName := 
    Regex.fromStr("($device$separator?$segment(?:$separator$segment)*)")
}
