using [java]com.xored.fanide.core
using [java]org.eclipse.dltk.core.search
using [java]org.eclipse.dltk.core.search.matching2
using "[java]org.eclipse.dltk.internal.core.search.matching"

class PredicateFactory
{
  
  public static IPredicate? create(SearchPattern pattern) {
    if (pattern is FieldPattern) {
      return FieldPredicate(pattern) 
    } else if (pattern is MethodPattern) {
      return MethodPredicate(pattern) 
    } else if (pattern is MethodDeclarationPattern) {
      return MethodDeclarationPredicate(pattern) 
    } else if (pattern is TypeReferencePattern) {
       return TypeReferencePredicate(pattern)
    } else if (pattern is QualifiedTypeDeclarationPattern) {
      return QualifiedTypeDeclarationPredicate(pattern)
    } else if (pattern is OrPattern) {
      return OrPredicate(((OrPattern)pattern).getPatterns())
    } else {
      FanCore.log("unknown SearchPattern type : ${pattern.typeof}")
      return null
    }
  }  
  
}
