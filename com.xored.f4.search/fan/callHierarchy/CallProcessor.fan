//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 17, 2010 - Initial Contribution
//

using [java] org.eclipse.core.runtime
using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.core.search
using [java] org.eclipse.dltk.ast.references
using [java] java.util::Map as JMap
using [java] java.util::HashMap

**
**
**
class CallProcessor : ICallProcessor
{
  public static const Int genericAgnosticMatchRule := 
       SearchPattern.R_EXACT_MATCH.
        or(SearchPattern.R_CASE_SENSITIVE).
        or(SearchPattern.R_ERASURE_MATCH)

  private SearchEngine searchEngine := SearchEngine()
  override JMap? process(IModelElement? parent, IModelElement? element,
    IDLTKSearchScope? scope, IProgressMonitor? monitor)
  {
    requestor := Searcher(parent)
    pattern := SearchPattern.createPattern(
        element.getParent.getElementName+"."+element.getElementName,
        IDLTKSearchConstants.METHOD,
        IDLTKSearchConstants.REFERENCES,
        genericAgnosticMatchRule,
        scope.getLanguageToolkit
      )
    
    searchEngine.search(
      pattern, 
      SearchParticipant[SearchEngine.getDefaultSearchParticipant],
      scope,
      requestor,
      monitor
    )
    return requestor.elements
    
  }
}

class Searcher : SearchRequestor
{
  JMap elements := HashMap()
  private IModelElement parent
  new make(IModelElement parent) { this.parent = parent }
  override Void acceptSearchMatch(SearchMatch? match)
  {
    if(match.getAccuracy != SearchMatch.A_ACCURATE || 
      match.isInsideDocComment ||
      match.getElement isnot IModelElement) return

    IModelElement member := match.getElement
    ISourceModule module := member.getAncestor(IModelElement.SOURCE_MODULE)
    
    if(module.codeSelect(match.getOffset, 1).any { parent == it })
      elements.put(
          SimpleReference(match.getOffset, match.getOffset + match.getLength, ""),
          member
        )
  }
}