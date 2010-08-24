//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 17, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.core::ISearchPatternProcessor
using [java] org.eclipse.dltk.core.search::AbstractSearchFactory
using [java] fanx.interop::CharArray

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
** SearchPatternProcessor
**************************************************************************
class SearchPatternProcessor : ISearchPatternProcessor
{
  private static const Str podType := "::"
  private static const Str typeMethod := "."
  
  override Str? getDelimiterReplacementString := "."
  
  ** podName from podName::typeName.methodName
  override CharArray? extractDeclaringTypeQualification(Str? pattern)
  {
    if(!pattern.contains(podType)) return null
    return toCharArray(pattern[0..<pattern.index(podType)])
  }
  
  ** typeName from podName::typeName.methodName
  override CharArray? extractDeclaringTypeSimpleName(Str? pattern)
  {
    if(!pattern.contains(typeMethod)) return null
    start := pattern.index(podType)?.plus(2) ?: 0
    end := pattern.indexr(typeMethod) 
    return toCharArray(pattern[start..<end])
  }
  
  ** methodName from [podName::]typeName.methodName
  override CharArray? extractSelector(Str? pattern)
  {
    result := pattern[(pattern.indexr(typeMethod)?.plus(1) ?: 0)..-1]
    return toCharArray(result)
  }
  
  ** podName from podName::typeName
  override CharArray? extractTypeQualification(Str? pattern)
  {
    if(!pattern.contains(podType)) return null
    return toCharArray(pattern[0..<pattern.index(podType)])
  }
  
  ** typeName from podName::typeName
  override Str? extractTypeChars(Str? pattern)
  {
    pattern[(pattern.indexr(podType) ?: 0)..-1]
  }
  
  
  private static CharArray toCharArray(Str str)
  {
    result := CharArray(str.size)
    str.each |ch, i| { result[i] = ch }
    return result
  }
}