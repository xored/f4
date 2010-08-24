using f4parser
using [java]java.lang
using [java]org.eclipse.dltk.core
using [java]org.eclipse.dltk.core.search
using [java]org.eclipse.dltk.core.search.matching2
using [java]org.eclipse.dltk.internal.core.search.matching

class MatchingPredicate : AbstractMatchingPredicate
{
  
  new make(SearchPattern pattern, Obj name) : super(pattern, name) {
  }
  
  public FanMatch? nameMatch(Str pattern, Node node) {
    if (super.matchName(pattern) != null) {
      return FanMatch(node)
    } else {
      return null
    }
  }
  
  override MatchLevel? match(Obj? obj) {
    return null
  }
  
}
