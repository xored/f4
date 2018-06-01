using f4model
using f4core
using f4parser

**
** Very simple - works after words as, is and isnot
**
class IsCompletionProvider : CompletionProvider {

	//////////////////////////////////////////////////////////////////////////
	// Constructor and overrides
	//////////////////////////////////////////////////////////////////////////

	new make(IFanNamespace ns, Str str, CUnit unit) : super(ns, str, unit) {}
	
	override Bool setInput(Int pos, Str prefix) {
		super.setInput(pos, prefix)
		preSrc := src[0..pos].trim
		return endings.any { preSrc.endsWith(it) }
	}
	
	override Bool complete(CompletionReporter reporter) {
		super.complete(reporter)
		reportNsTypes
		return true
	}

	//////////////////////////////////////////////////////////////////////////
	// Private provider-specific slots
	//////////////////////////////////////////////////////////////////////////

	private static const Str[] endings := ["as", "is", "isnot"]
}
