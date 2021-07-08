using f4parser
using f4model

**
** This class provides completion after "?->", "->", "?.", ".", or "#"
** 
class DotCompletionProvider : CompletionProvider {
	//////////////////////////////////////////////////////////////////////////
	// Constructor and overrides
	//////////////////////////////////////////////////////////////////////////
	new make(IFanNamespace ns, Str str, CUnit unit) : super(ns, str, unit) {}

	override Bool setInput(Int pos, Str prefix) {
		super.setInput(pos, prefix)
		preceding := src[0..pos] 
		ending := endings.find { preceding.endsWith(it) }
		if (ending == null) return false
		isPound = ending == "#"
		
		//TODO: improve, looks too similar to magic now
		esize := ending.size
		nodePos := pos - esize //+ (prefix.isEmpty ? 1 : 0)
		path = AstFinder.find(unit, nodePos)
		if (path.last is Literal && ((Literal)path.last).id == ExprId.strLiteral &&	path.last.end > pos) return false
		
		if (path.last is CType) return true
		if (path.last is Expr) return true
		// skip completion from using
		if (path.findLast(UsingDef#) != null) return false
		
		Expr? callExpr := path.findLast(CallExpr#)
		if(callExpr == null) return false
		
		path = AstPath(path.nodes[0..path.nodes.index(callExpr)], callExpr.start)
		return true
	}
	
	override Bool complete(CompletionReporter reporter) {
		super.complete(reporter)
		
		IFanType? type := getType(path)
		if (type == null) {
			typeof.pod.log.warn("${src[path.last.start..path.last.end]} can't be resolved, prefix - $prefix")
			return true
		}
		
		if (type.qname == "sys::Void") return true //no slots
		slots := type.allSlots(ns).findAll(filter)

		// TODO Ivan Inozemtsev: StrProvider should be reworked to support this filtering logic too
		TypeDef? thisType := path.findLast(TypeDef#)
		if (thisType != null) {
			thisQname := "$this.ns.currPod.name::$thisType.name.text"
			thatQname := type.qname

			if (thisQname != thatQname) {
				slots = slots.exclude { it.isPrivate }
			}
		}

		reportSlots(slots)
		
		// given reportSlots adds in slots for Obj, I believe we should always have a ctor - SlimerDude July 2021
		if (isStatic && !slots.any { it.isCtor })
			reportDefaultCtor
		
		return true
	}
	
	private Node getNode(AstPath path) {
		if (!isPound) {
			slotLiteral := path.findLast(SlotLiteral#) as SlotLiteral
			if (slotLiteral != null) return slotLiteral
//			if (prefix != "") {
//				return	path[-2]
//			}
			if (path.last is InvokeExpr) {
				InvokeExpr expr := path.last
				if (expr.caller.start > pos) {
					return expr.callee
				}
			}
		}
		return path.last
	}
	private IFanType? getType(AstPath path) {
		try {
			return getNode(path)->resolvedType
		} catch (UnknownSlotErr e) {
			// Ignore. Assume not correct parsed node
		}
		return null
	}
	
	
	
	//////////////////////////////////////////////////////////////////////////
	// Private fields and methods
	//////////////////////////////////////////////////////////////////////////
	
	**
	** The order of elements in this list does make sence:
	** Elements length should be decreasing (so we correctly define
	** full ending)
	** 
	public static const Str[] endings := Str["?->", "->", "?.", ".", "#"]
	
	** path to node preceding to completion position
	private AstPath? path
	private Bool isPound 
	**
	** True if we should complete only static methods and constructors
	** 
	private Bool isStatic() {
		node := getNode(path)
		return node is StaticTargetExpr || node is CType
	}

	private |IFanSlot->Bool| filter() {
		isPound
			? |IFanSlot slot->Bool| { true }
			: (
				isStatic
					? |IFanSlot slot->Bool| {  slot.isStatic ||  slot.isCtor }
					: |IFanSlot slot->Bool| { !slot.isStatic && !slot.isCtor }
			)
	}
}