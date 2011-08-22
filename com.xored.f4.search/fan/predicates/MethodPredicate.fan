using f4parser
using [java]org.eclipse.dltk.core.search
using "[java]org.eclipse.dltk.internal.core.search.matching"
using f4model

class MethodPredicate : IPredicate
{
  
  private MatchingPredicate namePredicate
  private MatchingPredicate? typePredicate
  private MethodPattern pattern
  
  new make(MethodPattern pattern) {
    this.pattern = pattern
    namePredicate = MatchingPredicate(pattern, pattern.selector)
    typePredicate = pattern.declaringSimpleName == null ?
      null : MatchingPredicate(pattern, pattern.declaringSimpleName)
  }
  
  override FanMatch? match(Node node) {
    if (node is SlotRef)
    {
      if (pattern.findDeclarations)
      {
        if (typePredicate != null && typePredicate?.nameMatch(node->modelSlot->type->name, node) == null ) return null
        return null
      }
      SlotRef r := node
      if( r.modelSlot != null && r is IFanField) return null
      return namePredicate.nameMatch(r.text, node)
    } 
    return null
  }
  
}