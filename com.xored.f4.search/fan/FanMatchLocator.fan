using [java]org.eclipse.core.runtime
using [java]org.eclipse.dltk.core
using [java]org.eclipse.dltk.core.search
using [java]org.eclipse.dltk.core.search.matching
using [java]org.eclipse.dltk.core.search.matching2
using [java]org.eclipse.dltk.internal.core.search.matching
using f4parser
using f4core
using f4model

class FanMatchLocator : IMatchLocator
{

  private SearchRequestor? requestor
  private IPredicate? predicate
  private IDLTKSearchScope? scope
  
  override Void initialize(SearchPattern? pattern, IDLTKSearchScope? scope) {
    this.predicate = PredicateFactory.create(pattern)
    this.scope = scope
  }

  override Void setRequestor(SearchRequestor? requestor) {
    this.requestor = requestor
  }

  override Void setProgressMonitor(IProgressMonitor? progressMonitor) {
  }
  
  private static CUnit parse(ISourceModule? module) 
  {
    SourceParserUtil.parse(module, null)->unit
  }
  
  override Void locateMatches(SearchDocument?[]? searchDocuments) {
    if (requestor == null) return
    if (predicate == null) return
    moduleFactory := ModuleFactory(scope)
    searchDocuments.each {
      ISourceModule? module := moduleFactory.create(it)
      if (module != null)
      {
        CUnit unit := parse(module)
        visitor := SourceVisitor(getParticipant, predicate, module, this.requestor)
        unit.accept(visitor)
      }
    }    
  }
  
}
