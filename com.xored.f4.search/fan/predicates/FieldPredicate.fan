using f4parser
using [java]org.eclipse.dltk.core
using [java]org.eclipse.dltk.core.search
using [java]org.eclipse.dltk.core.search.matching2
using "[java]org.eclipse.dltk.internal.core.search.matching"
using f4model

class FieldPredicate : IPredicate
{
 
  private FieldPattern pattern
  private MatchingPredicate predicate
  
  new make(FieldPattern pattern) {
    this.pattern = pattern
    this.predicate = MatchingPredicate(pattern, pattern.name)
  }
  
  override FanMatch? match(Node node) {
    if (node is FieldDef) {
      if (!pattern.findDeclarations) return null
      return predicate.nameMatch(node->name->text, node)
    } else if (node is SlotRef) {
      if (!pattern.findReferences) return null
      SlotRef r := node
      if( r.modelSlot != null && r is IFanMethod) return null
      return predicate.nameMatch(node->text, node)
    } else if(node is LocalDef) {
      if (!pattern.findDeclarations) return null
      LocalDef def := node
      return predicate.nameMatch(def.name.text, node)      
    }
    else if( node is MethodVarRef) {
      if (!pattern.findReferences) return null
      MethodVarRef ref := node
      return predicate.nameMatch(ref.text, node)      
    }
    return null
  }
  
}