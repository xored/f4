using f4parser
using [java]org.eclipse.dltk.core
using [java]org.eclipse.dltk.core.search
using [java]org.eclipse.dltk.core.search.matching2
using "[java]org.eclipse.dltk.internal.core.search.matching"

class TypeReferencePredicate : IPredicate
{

  private MatchingPredicate predicate
  
  new make(TypeReferencePattern pattern) {
    predicate = MatchingPredicate(pattern, pattern.simpleName)
  }
  
  override FanMatch? match(Node node) {
    if (node is CType) {
      CType ctype := (CType)node
      if (ctype.resolvedType == null) return null
      return predicate.nameMatch(ctype.resolvedType.name, ctype)
    } else {
      return null
    }
  }
  
}
