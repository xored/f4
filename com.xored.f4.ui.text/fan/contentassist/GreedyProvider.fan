using f4core
using f4parser
using f4model

**
** This provider just grabs and reports all it can - local vars, types, pods, keywords
**
class GreedyProvider : CompletionProvider {

	//////////////////////////////////////////////////////////////////////////
	// Constructor and overrides
	//////////////////////////////////////////////////////////////////////////

	new make(IFanNamespace ns, Str str, CUnit unit) : super(ns, str, unit) {}
	
	override Bool complete(CompletionReporter reporter) {
		super.complete(reporter)

		path := AstFinder.find(unit, pos)
		if (path.last is Literal && ((Literal)path.last).id == ExprId.strLiteral) return false
		// report locals and current type slots
		insideMethod := path.find(MethodDef#) != null
		insideDefOrCall := (path.find(LocalDef#) != null) || (path.find(CallExpr#) != null)
		if (insideMethod) {
			methodName := path.methodName
			typeName := path.typeName
			parent := ns.currPod.findType(typeName, false)?.method(methodName, false)?.me
			
			path.findLocals.each { 
				reportLocal(it.name.text, (it as LocalDef)?.resolvedType?.name, parent) 
			}
			reportTypeSlots(type(path))
		}

		// report slots of it from last it-block
		itBlock := path.nodes.eachrWhile {
			it is Closure && (it as Closure).signature == null ? it : null
		}
		if (itBlock != null) {
			reportLocal("it")

			itType := (itBlock as Closure).argTypesHint?.first
			reportTypeSlots(itType)
		}

		if( insideDefOrCall) {
			//types
			reportNsTypes(true)
			//keywords
			reportKeywords(defOrCallKeywords)
			// Report FFI
			reportUsings(true)
			reportTypeSlots(type(path))
			return true
		}
		
		// pods
		reportNsPods

		// types
		reportNsTypes
		
		// keywords
		reportKeywords(insideMethod ? methodKeywords : typeKeywords)

		// Report FFI
		reportUsings

		return true
	}
	
	** keywords that can be used inside method
	private static const Str[] methodKeywords := [
		"try", "catch", "finally",
		"switch", "case", "default",
		"return", "continue", "break",
		"for", "while", "if", "else",
		"true", "false", "null",
		"this", "super",
		"is", "as", "isnot"
	]
	
	** keywords that can be used inside method
	private static const Str[] defOrCallKeywords := [
		"this", "super"
	]
	
	private static const Str[] typeKeywords := [
		"class", "mixin", "abstract", "const", "final",
		"using", "private", "protected", "public", "internal", "once",
		"native", "facet"
	]
	
	//////////////////////////////////////////////////////////////////////////
	// Private methods
	//////////////////////////////////////////////////////////////////////////

	private IFanType? type(AstPath path) {
		name := (path.find(TypeDef#) as TypeDef).name.text
		return ns.currPod.findType(name, false)
	}

	private Void reportTypeSlots(IFanType? type) {
		if (type == null) return

		slots := type.allSlots(ns)
		reportSlots(slots)
		if (!slots.any { it.isCtor }) reportDefaultCtor
	}
}
