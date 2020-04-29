
using [java] org.eclipse.dltk.codeassist::ISelectionEngine

using [java] org.eclipse.dltk.codeassist::ISelectionRequestor
using [java] org.eclipse.dltk.compiler.env::IModuleSource
using [java] org.eclipse.dltk.core::IModelElement
using [java] org.eclipse.dltk.core::ISourceModule
using [java] org.eclipse.dltk.core::SourceParserUtil
using [java] org.eclipse.dltk.core.model::LocalVariable
using [java] java.util::Map as JMap
using "[java]com.xored.fanide.internal.core.model"::PodFragment
using [java]org.eclipse.core.runtime::IPath

using f4parser
using f4model

class SelectionEngine : ISelectionEngine {
	ISelectionRequestor? requestor
	
	override Void setRequestor(ISelectionRequestor? requestor) {
		this.requestor = requestor
	}

	override Void setOptions(JMap? map) {}
	
	override IModelElement?[]? select(IModuleSource? module, Int start, Int end) { 
		DltkAst ast := SourceParserUtil.parse(module as ISourceModule, null)
		src = module.getSourceContents
		ip := module.getModelElement.getScriptProject.getProject
		fp := FantomProjectManager.instance.get(ip)
		ns = ParseUtil.ns((ISourceModule)module.getModelElement)
		
		unit = ast.unit
		path := AstFinder.find(unit, start)
		node := path.last
		if (node == null) return IModelElement[,]
		if (node is ListType) {
			return selectListType(node, start, end,	src)
		}
		else if (node is FuncTypeParam) {
			if( node->ctype is ListType) {
				return selectListType(node->ctype, start, end, src)
			}
			return selectType(node->ctype, start, end)
		}
		else if (node is TypeDef) return selectTypeDef(node)
		else if( node is FacetDef) return selectType(((FacetDef)node).ctype, start, end)
		else if (node is CType) return selectType(node, start, end)
		else if (node is SlotRef) return selectSlotRef(node)
		else if (node is SlotDef) return selectSlotDef(path)
		else if (node is MethodVarRef) return selectMethodVarRef(node)
		else if (node is MethodVar) return selectMethodVar((MethodVar)node)
		else if (node is Expr) return selectExpr(node)
		else if (ignored.any { node.typeof.fits(it) }) return IModelElement[,] //don't care about blocks
		else 
			typeof.pod.log.warn("Unknown node type $node.typeof")
		return IModelElement[,] 
	} 
	
	** Node types which don't correspond to model elements
	private static const Type[] ignored := Type[
		Block#, 
		SLComment#, 
		ReturnStmt#
		]
	
	private CUnit? unit
	private IFanNamespace? ns
	private Str? src
	
	private IModelElement[] selectListType(ListType? type, Int start, Int end, Str? src) {
		if( src[start] != '[' && src[start] != ']' ) {
			if( type.valType is FuncType) { 
				IModelElement[] result := [,]
				((FuncType)type.valType).params.each
				{
					FuncTypeParam param := it
					if( param.start<= start && start <= param.end) {
						if( param.ctype is ListType)
							result.addAll(selectListType(param.ctype, start, end, src))
						else
							result.addAll(selectType(param.ctype, start, end))
					}
				}
				if( result.size > 0) return result
			}
			// Select list type instead
			return selectType(type.valType, start, end)
		}
		return selectType(type, start, end)
	}
	
	private IModelElement[] selectType(CType? type, Int start, Int end) {
		if( type is NullableType && ((NullableType)type).valType is ListType) {
			if( src[start]=='?') {
				me := type?.resolvedType?.me
				//TODO: Try to search
				return me == null ? [,] : [me] 
			}
			vt := ((NullableType)type).valType as ListType
			return selectListType(vt, start, end, src)
		}
		if( type != null && type.resolvedType != null) {
			resolvedType := type.resolvedType
			resultME := resolvedType.me
			if( resultME != null) {
				return [resultME]
			}
			else if( resolvedType is IFfiForeigh) {
				IFfiForeigh ffiType := (IFfiForeigh)resolvedType
				if( ffiType.foreign != null) {
					requestor.acceptForeignElement(ffiType.foreign)
				}
			}
			if( resolvedType is RtNullableType) {
				RtNullableType nullType := resolvedType
				IFanType fanType := nullType.type
				if( fanType is DltkType) {
					if( fanType.me != null)
						return [fanType.me]
				}
				if( fanType is IFfiForeigh) {
					IFfiForeigh ffiType := (IFfiForeigh)fanType
					if( ffiType.foreign != null) {
						requestor.acceptForeignElement(ffiType.foreign)
					}
				}
			}
		}
		me := type?.resolvedType?.me
		//TODO: Try to search
		return me == null ? [,] : [me] 
	}
	
	private IModelElement[] selectTypeDef(TypeDef def) {
		me := ns.currPod.findType(def.name.text, false)?.me
		return me == null ? [,] : [me] 
	}
	
	private IModelElement[] selectSlotRef(SlotRef ref) {
		if( ref.modelSlot != null) {
			if( ref.modelSlot.me != null) {
				return [ref.modelSlot.me]
			}
			if( ref.modelSlot is IFfiForeigh) {
				IFfiForeigh refFor := (IFfiForeigh)ref.modelSlot 
				if( refFor.foreign != null) {
					requestor.acceptForeignElement(refFor.foreign)
				}
			}
		}
		return [,]
	}
	
	private IModelElement[] selectSlotDef(AstPath path) {
		NamedNode node := path.last
		name := node.name.text
		TypeDef? type := path[-2] as TypeDef
		if(type == null) {
			return IModelElement[,]
		}
		me := ns.currPod.findType(type.name.text, false)?.slot(name, false)?.me
		return me == null ? [,] : [me]
	}
	
	private IModelElement[] selectMethodVarRef(MethodVarRef ref) {
		selectMethodVar(ref.def)
	}
	
	private IModelElement[] selectExpr(Expr node) {
		me := node.resolvedType?.me
		return me == null ? [,] : [me]
	}
	
	private IModelElement[] selectMethodVar(MethodVar def) {
		defNode := def as Node
		if(defNode == null) {
			typeof.pod.log.err("MethodVar $def.typeof is not node!")
			return IModelElement[,]
		}
		
		path := AstFinder.find(unit, defNode.start)
		methodName := (path.findLast(MethodDef#) as MethodDef)?.name?.text
		typeName := (path.findLast(TypeDef#) as TypeDef)?.name?.text
		if(methodName == null || typeName == null) {
			typeof.pod.log.err("MethodVar outside of method and type")
			return IModelElement[,]
		}
		
		me := ns.currPod.findType(typeName, false)?.method(methodName, false)?.me
		return me == null ? [,] : [LocalVariable(
				me, //parent
				def.name.text, //name
				defNode.start, defNode.end, //declaration location
				def.name.start, def.name.end, //name location
				methodVarType(def)
				)]
	}
	
	private Str? methodVarType(MethodVar def) {
		p := def as ParamDef
		if(p != null) return p.resolvedType?.name ?: ""
		l := def as LocalDef
		return l.resolvedType?.name ?: ""
	}
}

