using f4parser
using [java]org.eclipse.dltk.core
using [java]org.eclipse.dltk.core.search
using [java]org.eclipse.dltk.core.search.matching2

class SourceVisitor : AstVisitor
{
  
  private SearchParticipant? participant
  private IPredicate? predicate
  private ISourceModule? module
  private SearchRequestor? requestor
  
  new make(SearchParticipant? participant, IPredicate? predicate, 
    ISourceModule? module, SearchRequestor? requestor) {
    this.participant = participant
    this.predicate = predicate
    this.module = module
    this.requestor = requestor
  }
  
  override Bool enterNode(Node node) {
    return true
  }
  
  override Void exitNode(Node node) { 
    FanMatch? match := predicate.match(node)
    if (match == null) return
    SearchMatch searchMatch := match.getSearchMatch(module, participant)
    requestor.acceptSearchMatch(searchMatch)
  }
   
}
