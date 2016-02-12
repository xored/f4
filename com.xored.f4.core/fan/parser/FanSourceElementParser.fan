using [java]org.eclipse.dltk.core::ISourceElementParser
using [java]org.eclipse.dltk.compiler::ISourceElementRequestor
using [java]org.eclipse.dltk.compiler.problem::IProblemReporter
using [java]org.eclipse.dltk.compiler.env::IModuleSource
using [java]org.eclipse.dltk.core.search.indexing::SourceIndexerRequestor as IndexRequestor

** This class is contributed to extension point
** Depending on requestor this parser calls
** either StructureBuilder or SourceIndexer
class FanSourceElementParser : ISourceElementParser {
	ISourceElementRequestor? requestor { private set }
	
	override Void parseSourceModule(IModuleSource? module) {
		if(requestor == null || module == null) return
		if(requestor is IndexRequestor) 
			SourceIndexer.index(module, requestor)
		else StructureBuilder.build(module, requestor)
	}

	override Void setRequestor(ISourceElementRequestor? requestor) {
		this.requestor = requestor
	}

	override Void setReporter(IProblemReporter? reporter) {}
}
