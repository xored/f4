using [java]org.eclipse.dltk.core
using [java]org.eclipse.dltk.core.search
using [java]org.eclipse.dltk.core.search.matching
using [java]org.eclipse.dltk.core.search.matching2
using [java]org.eclipse.dltk.internal.core.search.matching
using f4parser

class OrPredicate : IPredicate
{
  
  private IPredicate[] predicates := [,]
  
  new make(SearchPattern[] patterns) {
    patterns.each {
      predicate := PredicateFactory.create(it)
      if (predicate != null) predicates.add(predicate)
    }
  }

  override FanMatch? match(Node node) {
    match := null
    predicates.find |IPredicate predicate -> Bool| {
      match = predicate.match(node)
      return match != null
    }
    return match
  }
    
}
