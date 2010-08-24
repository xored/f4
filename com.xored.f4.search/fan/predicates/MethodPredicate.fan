using f4parser
using [java]org.eclipse.dltk.core.search
using [java]org.eclipse.dltk.internal.core.search.matching

class MethodPredicate : IPredicate
{
  
  private MatchingPredicate namePredicate
  private MatchingPredicate? typePredicate
  
  new make(MethodPattern pattern) {
    namePredicate = MatchingPredicate(pattern, pattern.selector)
    typePredicate = pattern.declaringSimpleName == null ?
      null : MatchingPredicate(pattern, pattern.declaringSimpleName)
  }
  
  override FanMatch? match(Node node) {
    if (node is SlotRef) {
      if (typePredicate != null && 
        typePredicate?.nameMatch(node->modelSlot->type->name, node) == null
        ) return null
      return namePredicate.nameMatch(node->text, node)
    } else {
      return null
    }
  }
  
}