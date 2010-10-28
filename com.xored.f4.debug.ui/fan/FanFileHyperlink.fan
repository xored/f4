//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 2, 2010 - Initial Contribution
//

using [java] org.eclipse.ui.console
using [java] org.eclipse.ui.ide
using [java] org.eclipse.ui.texteditor
using [java] org.eclipse.ui.progress
using [java] org.eclipse.core.runtime
using [java] org.eclipse.core.runtime.jobs
using [java] org.eclipse.core.resources
using [java] org.eclipse.dltk.core.search
using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.debug.ui
using "[java]org.eclipse.dltk.internal.ui.editor"
using [java] com.xored.fanide.core
using f4core

**************************************************************************
** FanFileHyperlink
**************************************************************************
class FanFileHyperlink : IHyperlink
{
  private TextConsole? console
  new make(TextConsole console) { this.console = console }
  
  override Void linkEntered() {}
  override Void linkExited() {}
  
  override Void linkActivated()
  {
    action := FanSourceSearchAction(linkLine)
    action.run
  }
  
  protected once Str linkLine()
  {
    doc := console.getDocument
    region := console.getRegion(this)
    if(region == null) throw ArgErr(ConsoleMessages.unknownLink)
    
    lineInfo := doc.getLineInformationOfOffset(region.getOffset)
    return doc.get(lineInfo.getOffset, lineInfo.getLength).trim
  }

  static Bool isStackTraceLink(Str text) { !stackTracePattern.matches(text) }
  static const Bool debug := false
  
  private static const Regex stackTracePattern := Regex<|.*\((\d+),\d+\)|>
}

**************************************************************************
** FanHyperlink
**************************************************************************
class FanHyperlink
{
  private Str linkLine
  
  public once Str linkText() 
  {
    if(!FanFileHyperlink.isStackTraceLink(linkLine)) return linkLine
    result := linkLine
    start := result.indexr("(") ?: 0
    end := result.indexr(")") ?: -1
    return result[start+1..<end]
  }
  
  public once Str fileName()
  {
    txt := linkText[0..-1]
    if(isWin32 && txt[0] == '/') txt = txt[1..-1]
    matcher := FanLinkRes.fileName.matcher(txt)
    if(matcher.find)
    {
      return matcher.group(1)
    }
    
    throw ArgErr(ConsoleMessages.cantParseFile) //TODO: add normal logging
  }
  
  public once Str? projectName()
  {
    if(!FanFileHyperlink.isStackTraceLink(linkLine)) return null
    if(!linkLine.contains("::")) return null
    return linkLine[0..<linkLine.indexr("::")]
  }
  
  public once Str typeName()
  {
    result := linkLine[0..-1]
    if(!FanFileHyperlink.isStackTraceLink(result))
    {
      pos := result.indexr("/") ?: result.indexr("\\")
      if(pos != null) result = result[pos+1..-1]
      pos = result.indexr(".")
      if(pos != null) result = result[0..<pos]
      return result
    }
    pos := result.index("::")
    if(pos != null) result = result[pos+2..-1]
    
    pos = (result.index(".") ?: result.index(" ")) ?: result.index("(")
    
    if(pos != null) result = result[0..<pos]
    return result
  }
  
  public once Int lineNumber()
  {
    matcher := simpleLineNumber.matcher(linkText)
    if(matcher.find)
      return matcher.group(1).toInt - 1
    matcher = complexLineNumber.matcher(linkText)
    if(matcher.find)
      return matcher.group(1).toInt - 1
    return 0
  }
  
  new make(Str traceLine)
  {
    this.linkLine = traceLine
  }
  
  static const Bool isWin32 := false//Env.cur.os == "win32"
  
  private static const Regex simpleLineNumber := Regex<|:(\d+)|>
  private static const Regex complexLineNumber := Regex<|\((\d+),\d+\)|>
}
