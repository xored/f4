using [java]org.eclipse.dltk.codeassist
using [java]org.eclipse.dltk.compiler.env::IModuleSource
using [java]org.eclipse.dltk.core
using [java]org.eclipse.dltk.core::RuntimePerformanceMonitor$PerformanceNode as PerformanceNode
using f4parser
using f4model
using f4core

**************************************************************************
** Relevance
**************************************************************************

** Represents relevance for completion proposals
enum class Relevance {
	freeSpace	(100000),
	pod			(100000),
	keyword		(1000000),
	type		(2000000),
	method		(10000000),
	var			(100000000);

	const Int val
	private new make(Int val) { this.val = val }
}

**************************************************************************
** ProposeKind
**************************************************************************

** Enum with kinds of proposed completions
enum class ProposeKind {
	method	(CompletionProposal.METHOD_REF,			Relevance.method),
	keyword	(CompletionProposal.KEYWORD,			Relevance.keyword),
	pod		(CompletionProposal.PACKAGE_REF,		Relevance.pod),
	var		(CompletionProposal.LOCAL_VARIABLE_REF,	Relevance.var),
	type	(CompletionProposal.TYPE_REF,			Relevance.type),
	field	(CompletionProposal.FIELD_REF,			Relevance.var)
	
	const Int val
	const Relevance relevance

	private new make(Int val, Relevance relevance) { 
		this.val = val 
		this.relevance = relevance
	}
}

**************************************************************************
** FanCompletionEngine
**************************************************************************
class FanCompletionEngine : ScriptCompletionEngine, CompletionReporter {	
	override Int computeCaseRelevance(Str prefix, Str name) {
		return computeRelevanceForCaseMatching(InteropUtil.toCharArray(prefix.chars), name)
	}
	
	** Type inferencer timeout
	//private static const Int TI_TIMEOUT := 2000
	
	override Void complete(IModuleSource? sourceModule, Int pos, Int ii) {
		this.actualCompletionPosition = pos--
		PerformanceNode rpm := RuntimePerformanceMonitor.begin
		this.requestor.beginReporting
		
		ns := ParseUtil.ns((ISourceModule)sourceModule)
		cunit := ParseUtil.parse((ISourceModule)sourceModule)
		content := sourceModule.getSourceContents

		try {
			
			wordStarting := ParseUtil.wordStart(content, pos)
			//echo("pos - $pos, wordStarting - $wordStarting")
			if (!wordStarting.isEmpty)
				this.setSourceRange(actualCompletionPosition - 
					wordStarting.size, actualCompletionPosition)
			else 
				this.setSourceRange(actualCompletionPosition, 
					actualCompletionPosition)
			pos -= wordStarting.size
			//echo("${content[pos-2..pos]}")
			// After . ?. -> ?->
			Int? prevNodePos := null
			
			CompletionProvider[] providers := [
				DotCompletionProvider#,
				FacetCompletionProvider#,
				QnameCompletionProvider#,
				UsingCompletionProvider#,
				IsCompletionProvider#,
				StrProvider#,
				GreedyProvider#,
				].map |Type t->CompletionProvider| {
					t.make([ns, content, cunit])
				}
			
			Bool? isDone := providers.eachWhile |provider| {
				provider.setInput(pos, wordStarting) ? 
					(provider.complete(this) ? 
						true ://no more processing
						null //next provider
						) : 
					null //next provider
			}
			if(isDone ?: false) return

			path := AstFinder.find(cunit, pos)
			
			// Inside type declaration
			//TODO: Remove once we will find out that there is no valuable information
//			TypeDef? typeDef := path.find(TypeDef#)
//			if (typeDef != null)
//			{
//				if (isEndOfStmt(content, pos))
//				{					
//					completePods(ns.podNames, wordStarting)
//					ns.podNames.each
//					{
//						completeTypes(ns.findPod(it).typeNames, wordStarting)
//					}					
//				}
//				if (isStmt(content, pos))
//				{
//					if (path.find(Block#) != null)
//					{			
//						t := ns.currPod.findType(typeDef.name.text, false)
//						if (t != null) completeSlots(t.allSlots(ns), wordStarting)	
//						MethodVar[] locals := path.findLocals			
//						completeLocals(locals, wordStarting)
//					}					
//				}
//			}
//			
//			completeKeywords(pos, cunit, wordStarting, domLocation)
			
		}
		catch(Err e) {
			//TODO: handle error correctly
			e.trace
		}
		finally {
			this.requestor.endReporting()
			rpm.done(F4Nature.id, "Completion time", 0)
		}
	}
	
	private Str getLineStarting(Str content, Int position) {
		if (position <= 0 || position > content.size) return ""
		original := position

		while (position > 0 && content[position] != '\n')
			position--

		return content[position..original]
	}
	
	private Bool isEndOfStmt(Str content, Int position) {
		if (position <= 0 || position > content.size) return true
		original := position

		while (position > 0 && content[position] == ' ')
			position--

		if (content[position] == '\n'
			|| content[position] == '}'
			|| content[position] == ';') return true
		return false
	}
	
	private Bool isStmt(Str content, Int position) {
		if (position <= 0 || position > content.size) return true
		original := position
		
		while (position > 0 && content[position] == ' ')
			position--

		switch (content[position]) {
			case '\n':return true
			case '}': return true
			case ';': return true
			case '=': return true
		}
		return false
	}
	
	private Str getWordStarting(Str content, Int position, Int maxLen) {
		if (position <= 0 || position > content.size) return ""
		original := position
		while (position > 0 && maxLen > 0 && ((content[position].isAlphaNum) || content[position] == '_')) {
			position--
			maxLen--
		}
		return content[position+1..original]
	}
	
	protected Void completeKeywords(Str[] keywords, Str nameStarting) {
		keywords.findAll { it.lower.startsWith(nameStarting.lower) }.each {
			reportWord(it, ProposeKind.keyword, Relevance.keyword)
		}
	}
	
	protected Void completePods(Str[] podNames, Str nameStarting) {
		podNames.findAll { it.lower.startsWith(nameStarting.lower) }.each {
			reportWord(it, ProposeKind.pod, Relevance.pod)
		}
	}
	
	protected Void completeSlots(IFanSlot[] slots, Str nameStarting) {
		slots.findAll { it.name.lower.startsWith(nameStarting.lower) }.each |slot| {
			kind := getKind(slot)
			
			switch(kind) {
				case ProposeKind.method:
					reportMethod(slot)
				default:
					reportWord(slot.name, kind, Relevance.var, slot.me)
			}
		}
	}
	
	private ProposeKind getKind(IFanSlot slot) { 
		if (slot.isField) return ProposeKind.field
		method := slot as IFanMethod
		if (method.params.size == 0) return ProposeKind.field //To avoid empty braces, reporting parameterless method as field 
		return ProposeKind.method
	}
	
	protected Void completeTypes(Str[] typeNames, Str prefix) {
		typeNames.findAll { it.lower.startsWith(prefix.lower) }. each { reportWord(it, ProposeKind.type, Relevance.type) }
	}
	
	protected Void completeLocals(MethodVar[] locals, Str prefix) {
		locals.findAll { it.name.text.lower.startsWith(prefix.lower) }.
		each { reportWord(it.name.text, ProposeKind.var, Relevance.var) }
	}
	
	private Void reportMethod(IFanMethod method) {
		if(requestor.isIgnored(ProposeKind.method.val)) return
		proposal := createProposal(ProposeKind.method.val, actualCompletionPosition)
		proposal.setName(method.name)
		proposal.setCompletion(method.name)
		proposal.setIsConstructor(method.isCtor)
		proposal.setParameterNames(paramNames(method))
		proposal.setReplaceRange(startPosition - offset, endPosition - offset)
		proposal.setModelElement(method.me)
		proposal.setRelevance(Relevance.method.val)
//		proposal.setExtraInfo(method.type)
		requestor.accept(proposal)
	}
	
	private Str?[]? paramNames(IFanMethod method) { method.params.map |IFanParam p->Str?| { p.name } } 
	private Void reportWord(Str name, ProposeKind kind, Relevance relevance, IModelElement? me := null) {
		if(requestor.isIgnored(kind.val)) return
		proposal := createProposal(kind.val, actualCompletionPosition)
		proposal.setName(name)
		proposal.setCompletion(name)
		proposal.setReplaceRange(startPosition - offset, endPosition - offset)
		proposal.setRelevance(relevance.val)
		proposal.setModelElement(me)
		this.requestor.accept(proposal)
	}
	
	override CompletionProposal create(ProposeKind kind) {
		result := createProposal(kind.val, actualCompletionPosition)
		result.setReplaceRange(startPosition - offset, endPosition - offset)
		return result
	}
	
	override Void report(CompletionProposal proposal) {
		requestor.accept(proposal)
	}
	
	override Bool ignores(ProposeKind kind) {
		requestor.isIgnored(kind.val)
	}
}

