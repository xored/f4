using f4parser
using [java]org.eclipse.dltk.core
using [java]org.eclipse.dltk.core.search
using [java]org.eclipse.dltk.core.search.matching2
using [java]org.eclipse.dltk.internal.core.search.matching

class MethodDeclarationPredicate : IPredicate
{
 
  private MatchingPredicate predicate
  
  new make(MethodDeclarationPattern pattern) {
    predicate = MatchingPredicate(pattern, pattern.simpleName)
  }
  
  override FanMatch? match(Node node) {
    if (node is MethodDef) {
      return predicate.nameMatch(node->name->text, node->name)
    } else {
      return null
    }
  }
  
}