using [java]org.eclipse.dltk.core::CompletionProposal
using [java]org.eclipse.dltk.core::IModelElement
using [java]org.eclipse.dltk.core::IMember
using [java]org.eclipse.dltk.core.model::LocalVariable

using f4core
using f4model
using f4parser

**************************************************************************
** CompletionReporter 
**************************************************************************

**
** This class allows to create and report completion proposals
** We don't create a separate Fantom class for completion proposals
** as it seems there is no need for that and use just DLTK CompletionProposal
** 
mixin CompletionReporter {
	abstract CompletionProposal create(ProposeKind kind)
	abstract Void report(CompletionProposal proposal)
	abstract Bool ignores(ProposeKind kind)
	abstract Int computeCaseRelevance(Str prefix, Str name)
}

**************************************************************************
** CompletionProvider
**************************************************************************
**
** Base class for providing completions
**
abstract class CompletionProvider {
	protected IFanNamespace ns
	protected Str src
	protected CUnit unit
	
	protected Int? pos
	** word prefix, used for filtering
	protected Str? prefix
	protected CompletionReporter? reporter
	
	new make(IFanNamespace ns, Str src, CUnit unit) {
		this.ns = ns
		this.src = src
		this.unit = unit
	}

	**
	** Sets input for completion
	** If this particular provider is not applicable
	** for input, it should return false
	** Default implementation just sets corresponding fields
	** and returns true
	** 
	virtual Bool setInput(Int pos, Str prefix) {
		this.pos = pos
		this.prefix = prefix
		return true
	}
	
	**
	** This method provides completions for previously set input to reporter
	** Returns 'true' if no other providers should be called. 
	** Default implementation just returns false	 
	** 
	virtual Bool complete(CompletionReporter reporter) {
		this.reporter = reporter
		return false
	}
	
	**
	** Helper method to report bunch of slots
	** 
	protected Void reportSlots(IFanSlot[] slots) {
		slots = slots.findAll { it.name.lower.startsWith(prefix.lower) }
		slots.each |slot| {
			if(slot.isField) reportField(slot)
			else if(slot.isMethod) reportMethod(slot) 
		}
	}

	**
	** Helper to report field
	** 
	protected Void reportField(IFanSlot field) {
		if(reporter.ignores(ProposeKind.field)) return
		reporter.report(createProposal(ProposeKind.field, field.name, field.me, reporter.computeCaseRelevance(this.prefix, field.name)))
	}

	protected Void reportMethod(IFanMethod method, Str? mname := null) {
		params := method.params
	 
		if(reporter.ignores(ProposeKind.method)) return

		required := params.findIndex { it.hasDefault }
		if (required == null) { required = params.size }

		for (i := required; i < params.size + 1; i++) {
			curParams := params[0..< i]
			allRelatedParams := [curParams]
			curParams.each |param, index| {

				// generate all variants of Func type
				if (ParseUtil.isFuncType(param.of)) {
					relatedTypes := ParseUtil.computeRelatedFuncTypes(param.of)
					// add basic func param - see https://github.com/xored/f4/issues/103
					relatedTypes.add("Func")
					allRelatedParamsSize := allRelatedParams.size
					for (Int j := 0; j < allRelatedParamsSize; ++j) {
						relatedTypes[1..-1].each |type| {
							originalRelatedParams := allRelatedParams[j]
							relatedParams := originalRelatedParams.dup
							originalParam := originalRelatedParams[index]
							relatedParams[index] = FakeFanParam.fake(originalParam.name, type, originalParam.hasDefault)
							allRelatedParams.add(relatedParams)
						}
					}
					
				}
			}

			methodName := mname != null ? mname : method.name
			allRelatedParams.each |relatedParams| {
				proposal := createProposal(ProposeKind.method, methodName, method.me, reporter.computeCaseRelevance(this.prefix, methodName))
				proposal.setIsConstructor(method.isCtor)
				if (method is IFfiForeigh) {
					proposal.setForeign(((IFfiForeigh)method).foreign)
				}
				proposal.setParameterNames(relatedParams.map{ it.name } as Str[])
				proposal.setExtraInfo(FanMethodCompletionProposalExtraInfo(method, relatedParams))
				reporter.report(proposal)
			}
		}
	}

	private Bool isFromStr(IFanMethod method) {
		return method.name.equals("fromStr") && method.isStatic && method.params.size == 1 && method.params[0].of.contains("Str")
	}

	protected Void reportPodTypes(IFanPod? pod, Bool constructors := false) {
		if(pod == null || reporter.ignores(ProposeKind.type)) return
		pod.typeNames
			.findAll { it.lower.startsWith(prefix.lower) }
			.each {
				if (constructors && !reporter.ignores(ProposeKind.method) && it.lower.startsWith(prefix.lower)) {
					IFanType? type := pod.findType(it)
					if (type != null) {
						type.methods.each { 
							if (it.isCtor|| isFromStr(it)) {
								if( it.name != "make" && it.name != "fromStr")
									reportMethod(it, type.name + "." + it.name)
								else
									reportMethod(it, type.name)
							}
						}
						// always report the Type too, as it's a useful auto-complete for Types# syntax and enums
						// see https://github.com/xored/f4/issues/102
						reportType(type)
					}
				}
				else {
					if (prefix.equals(it)) {
						// Constructors
						IFanType? type := pod.findType(it)
						if( type != null) {
							added := false
							type.methods.each { 
								if( it.isCtor|| isFromStr(it)) {
									added = true
									if( it.name != "make" && it.name != "fromStr")
										reportMethod(it, type.name + "." + it.name)
									else
										reportMethod(it, type.name)
								}
							}
							if (!added) {
								reportType(type)
							}
						}
					}
					else {
						reportType(pod.findType(it))
					}
				}
			}
	}
	
	protected Void reportNsTypes(Bool constructors := false) {
		if(reporter.ignores(ProposeKind.type)) return
		availablePods := [,]
		
		unit.usings.each {
			pName := it.podName.text
			if( pName.startsWith("[java]")) {
				pName = pName[6..-1]
			}
			availablePods.add(pName)
		}
		availablePods.add(ns.currPod.name)
		availablePods.add("sys")
		
		ns.podNames.each {
			//if( availablePods.contains(it))
				reportPodTypes(ns.findPod(it), constructors)
		}
	}
	
	protected Void reportUsings(Bool constructors := false) {
		unit.usings.each { 
			ffiPod := it.podName.text.startsWith("[")
			if (it.typeName != null && it.typeName.resolvedType != null ) {
				Str? tname := (it.asTypeName != null)?it.asTypeName.text:it.typeName.text
				if (tname != null) {
					if (tname.lower.startsWith(prefix.lower)) {
						if (constructors || prefix.equals(tname)) {
							it.typeName.resolvedType.methods.each { 
								if (it.isCtor || isFromStr(it)) {
									if ((it.name != "make" && it.name != "fromStr") && !ffiPod)
										reportMethod(it, tname + "." + it.name)
									else
										reportMethod(it, tname)
								}
							}
						}
						else if (!reporter.ignores(ProposeKind.type)) {
							reporter.report(createProposal(ProposeKind.type, tname , it.typeName.resolvedType.me, reporter.computeCaseRelevance(this.prefix, tname)))
						}
					}
				}
			}
			else if (!ns.podNames.contains(it.podName.text)) {
				if (it.podName.modelPod != null ) {
					modelpod := it.podName.modelPod
					types := modelpod.typeNames
					types.each {
						if( it.lower.startsWith(prefix.lower)) {
							type := modelpod.findType(it)
							if (type != null ) {
								if (constructors || prefix.equals(it)) {
									type.methods.each { 
										if (it.isCtor|| isFromStr(it)) {
											if ((it.name != "make" && it.name != "fromStr") && !ffiPod)
												reportMethod(it, type.name + "." + it.name)
											else
												reportMethod(it, type.name)
										}
									}
								}
								else if (!reporter.ignores(ProposeKind.type)) {
									reporter.report(createProposal(ProposeKind.type, it , type.me, reporter.computeCaseRelevance(this.prefix, it)))
								}
							}
						}
					}
				}
			}
		}
	}
	
	protected Void reportPod(IFanPod? pod) {
		if (pod == null) return
		if (reporter.ignores(ProposeKind.pod)) return
		reporter.report(createProposal(ProposeKind.pod, pod.name, null, reporter.computeCaseRelevance(this.prefix, pod.name)))
	}
	
	protected Void reportNsPods() {
		if (reporter.ignores(ProposeKind.pod)) return
		ns.podNames.each {
			if(it.lower.startsWith(prefix.lower) && it != ns.currPod.name)
				reportPod(ns.findPod(it)) 
		}
	}
	
	protected Void reportType(IFanType type) {
		if (reporter.ignores(ProposeKind.type)) return
		reporter.report(createProposal(ProposeKind.type, type.name, type.me, reporter.computeCaseRelevance(this.prefix, type.name)))
	}
	
	protected Void reportLocal(Str name, Str? type := null, IModelElement? parent := null) {		
		if (reporter.ignores(ProposeKind.var) || !name.lower.startsWith(prefix.lower)) return
		if (type == null || parent == null) {
			reporter.report(createProposal(ProposeKind.var, name, null, reporter.computeCaseRelevance(this.prefix, name)))
			return
		}
		
		// TODO: set actual declaration location and name location
		locaVar := LocalVariable(
				parent, //parent
				name, //name
				-1, -1, //declaration location
				-1, -1, //name location
				type
				)
		
		reporter.report(createProposal(ProposeKind.var, name, locaVar, reporter.computeCaseRelevance(this.prefix, name)))
	}
	
	protected Void reportKeywords(Str[] keywords) {
		if (reporter.ignores(ProposeKind.keyword)) return
		keywords.each |kw| {
			if (!kw.lower.startsWith(prefix.lower)) return
			reporter.report(createProposal(ProposeKind.keyword, kw, null, reporter.computeCaseRelevance(this.prefix, kw)))
		}
	}
	
	protected Void reportDefaultCtor() {
		if (!"make".startsWith(prefix.lower)) return
		if (reporter.ignores(ProposeKind.method)) return
		proposal := createProposal(ProposeKind.field, "make", null, reporter.computeCaseRelevance(this.prefix, "make"))
		proposal.setIsConstructor(true)
		proposal.setFlags(FanModifiers.AccPublic)
		reporter.report(proposal)
	}

	protected CompletionProposal createProposal(ProposeKind kind, Str name, IModelElement? me := null, Int relevance := 0) {
		proposal := reporter.create(kind)
		proposal.setName(name)
		proposal.setCompletion(name)
		proposal.setRelevance(kind.relevance.val + relevance)
		proposal.setModelElement(me)
		if (me is IMember) {
			proposal.setFlags((me as IMember).getFlags)
		}
		return proposal
	}
}
