//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 17, 2010 - Initial Contribution
//

using f4core
using [java] org.eclipse.dltk.core.search::AbstractSearchFactory
using [java] org.eclipse.dltk.core.search::SearchPatternProcessor as DltkSearchPatternProcessor
using [java] org.eclipse.dltk.core::ISearchPatternProcessor
using [java] org.eclipse.dltk.core::ISearchPatternProcessor$ITypePattern as ITypePattern
using [java] org.eclipse.dltk.core.search::IMatchLocatorParser
using [java] org.eclipse.dltk.core.search.matching::MatchLocatorParser
using [java] org.eclipse.dltk.core.search.matching::MatchLocator
using [java] org.eclipse.dltk.core::ISourceModule
using [java] fanx.interop::CharArray
using [java] org.eclipse.dltk.ast.declarations::ModuleDeclaration
using [java] org.eclipse.dltk.core.search.matching::PossibleMatch
using [java]org.eclipse.dltk.core::SourceParserUtil

using f4parser
**************************************************************************
** SearchFactory
**************************************************************************
**
**
**
class SearchFactory : AbstractSearchFactory 
{
  override ISearchPatternProcessor? createSearchPatternProcessor() 
  {
    SearchPatternProcessor()
  }
}



**************************************************************************
** FanTypePattern
**************************************************************************
class FanTypePattern : ITypePattern
{
  new make(Str pattern) 
  {
    podTypeMethod := SearchPatternProcessor.podTypeMethod(pattern)
    getQualification = podTypeMethod.first
    getSimpleName = podTypeMethod.getSafe(1, "unrecognized")  //get type
    
  }
  override CharArray? qualification() {
    SearchPatternProcessor.nullOrArray(getQualification)
  }
  
  override CharArray? simpleName() {
    SearchPatternProcessor.nullOrArray(getSimpleName)
  }
  override Str? getQualification
  override Str? getSimpleName
}
**************************************************************************
** SearchPatternProcessor
**************************************************************************
class SearchPatternProcessor : DltkSearchPatternProcessor
{
  private static const Str podType := "::"
  private static const Str typeMethod := "."
  
  override ITypePattern? parseType(Str? pattern) { FanTypePattern(pattern ?: "unrecognized") }
  ** podName from podName::typeName.methodName
  override CharArray? extractDeclaringTypeQualification(Str? pattern)
  {
    if (pattern.index(podType)==null) return null;
    return nullOrArray(podTypeMethod(pattern).first)
  }
  
  ** typeName from podName::typeName.methodName
  override CharArray? extractDeclaringTypeSimpleName(Str? pattern)
  {
    if (pattern.index(typeMethod)==null) return null;
    return nullOrArray(podTypeMethod(pattern).getSafe(1))
  }
  
  ** methodName from [podName::]typeName.methodName
  override CharArray? extractSelector(Str? pattern)
  {
    val := podTypeMethod(pattern).getSafe(2)
    return nullOrArray(val != null?val:pattern)
  }
  
  static CharArray? nullOrArray(Str? s) { s == null ? null : InteropUtil.toCharArray(s.chars) }
  
  static Str?[] podTypeMethod(Str? pattern)
  {
    if(pattern == null) return [,]
    Str? pod
    Str? type
    Str? method

    podIndex := pattern.index(podType)
    if(podIndex != null)
    {
      pod = pattern[0..<podIndex]
      pattern = pattern[(podIndex + podType.size)..-1]
    }
    
    methodIndex := pattern.index(typeMethod)
    if(methodIndex != null) 
    {
      method = pattern[(methodIndex + typeMethod.size)..-1]
      pattern = pattern[0..<methodIndex]
    }
    
    type = pattern

    return [pod, type, method]
  }
}