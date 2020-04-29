using [java]org.eclipse.dltk.compiler::ISourceElementRequestor as Requestor
using [java]org.eclipse.dltk.compiler::IElementRequestor$FieldInfo as FieldInfo
using [java]com.xored.fanide.core.utils::ElementInfoWrappers$TypeInfo as TypeInfo
using [java]com.xored.fanide.core.utils::ElementInfoWrappers$MethodInfo as MethodInfo
using [java]com.xored.fanide.ast.declarations::FanModifiers
using [java]org.eclipse.dltk.compiler.env::IModuleSource
using [java]org.eclipse.dltk.core::ISourceModule
using [java]org.eclipse.dltk.core::SourceParserUtil

using f4parser

class SourceIndexer {
	static Void index(IModuleSource module, Requestor requestor) {
		cunit(module).accept(IndexingVisitor(requestor, module.getSourceContents))
	}
	
	private static CUnit cunit(IModuleSource module) {
		if(module is ISourceModule) 
			return SourceParserUtil.parse(module as ISourceModule, null)->unit
		proj := module.getModelElement.getScriptProject.getProject
		ns	 := FantomProjectManager2.instance.get(proj).ns
		return Parser(module.getSourceContents, ns).cunit
	}
}

**************************************************************************
** IndexingVisitor
**************************************************************************
class IndexingVisitor : AstVisitor {
	private Requestor requestor
	private Str src

	new make(Requestor requestor, Str src) { 
		this.requestor = requestor 
		this.src = src
	}
	
	override Bool enterNode(Node n) {
		if(n is CUnit) { requestor.enterModule }
		else if(n is TypeDef) enterType(n)
		else if(n is FieldDef) { enterField(n) }
		else if(n is MethodDef) { enterMethod(n) }
		//usages
		else if(n is CType) { typeUsage(n) }
		else if(n is SlotRef) { slotUsage(n) }
		else if(n is MethodVarRef) {localUsage(n)}
		else if(n is LocalDef) {localDef(n)}
		return true
	}
	
	override Void exitNode(Node n) {
		if(n is CUnit) { requestor.exitModule(n.end) }
		else if(n is TypeDef) { requestor.exitType(n.end) }
		else if(n is FieldDef) { requestor.exitField(n.end) }
		else if(n is MethodDef) { requestor.exitMethod(n.end) }
	}
	
	private Void enterType(TypeDef def) {
		info := TypeInfo()
		info.declarationStart = def.start
		info.modifiers = flags(def.modifiers)
		info.name = def.name.text
		info.nameSourceStart = def.name.start
		info.nameSourceEnd = def.name.end
		info.setSuperClasses(supers(def))
		requestor.enterType(info)
	}
	
	private Void enterField(FieldDef def) {
		info := FieldInfo()
		info.declarationStart = def.start
		info.modifiers = flags(def.modifiers)
		info.name = def.name.text
		info.nameSourceStart = def.name.start
		info.nameSourceEnd = def.name.end
		info.type = nodeText(def.ctype)
		requestor.enterField(info)
	}
	private Void localDef(LocalDef def) {
		info := FieldInfo()
		info.declarationStart = def.start
		info.modifiers = 0
		info.name = def.name.text
		info.nameSourceStart = def.name.start
		info.nameSourceEnd = def.name.end
		if( def.ctype != null) {
			info.type = nodeText(def.ctype)
		}
		requestor.enterField(info)
	}
	
	private Void enterMethod(MethodDef def) {
		info := MethodInfo()
		info.declarationStart = def.start
		info.modifiers = flags(def.modifiers)
		info.name = def.name.text
		info.nameSourceStart = def.name.start
		info.nameSourceEnd = def.name.end
		info.returnType = nodeText(def.returnType)
		info.isConstructor = info.modifiers.and(FanModifiers.AccNew) != 0
		
		Str[] paramNames := def.params.map { it.name.text }
		Str[] paramInits := def.params.map { nodeText(it.init) }
		Str[] paramTypes := def.params.map { nodeText(it.ctype) }
		info.setParameterNames(paramNames)
		info.setParameterInitializers(paramInits)
		info.setParameterTypes(paramTypes)
		
		requestor.enterMethod(info)
	}
	
	private Str[] supers(TypeDef def) {
		def.inheritance.map |ctype| { nodeText(ctype) }
	}
	
	private Str nodeText(Node? node) {
		node == null ? "" : src[node.start..node.end] 
	}
	

	private Int flags(Modifiers modifiers) {
		flags := 0
		protection := false
		modifiers.map.keys.each |ModifierId modifier| {
			switch(modifier.name) {
				case "Abstract": flags = flags.or(FanModifiers.AccAbstract)
				case "Const": flags = flags.or(FanModifiers.AccConst)
				case "Ctor": flags = flags.or(FanModifiers.AccNew)
				case "Enum": flags = flags.or(FanModifiers.AccEnum)
				case "Final": flags = flags.or(FanModifiers.AccFinal)
				case "Internal": flags = flags.or(FanModifiers.AccInternal);	protection = true
				case "Mixin": flags = flags.or(FanModifiers.AccMixin)
				case "Native": flags = flags.or(FanModifiers.AccNative)
				case "Override": flags = flags.or(FanModifiers.AccOverride)
				case "Facet": flags = flags.or(FanModifiers.AccAnnotation)
				case "Private": flags = flags.or(FanModifiers.AccPrivate);	 protection = true
				case "Protected": flags = flags.or(FanModifiers.AccProtected); protection = true
				case "Public": flags = flags.or(FanModifiers.AccPublic);		protection = true
				case "Static": flags = flags.or(FanModifiers.AccStatic)
				case "Virtual": flags = flags.or(FanModifiers.AccVirtual)
				case "Once": flags = flags.or(FanModifiers.AccOnce)
				case "Readonly": flags = flags.or(FanModifiers.AccReadOnly)
			}
		}

		if (!protection) flags = flags.or(FanModifiers.AccPublic)

		return flags
	}
	
	private Void typeUsage(CType? type) {
		if(type == null) return
		if(type is SimpleType) {
			simpleType := type as SimpleType
			reportUsage(simpleType.typeName)
		} else if(type is NullableType) {
			typeUsage((type as NullableType).valType)
		} else if(type is ListType) {
			typeUsage((type as ListType).valType)
		} else if(type is MapType) {
			typeUsage((type as MapType).keyType)
			typeUsage((type as MapType).valType)
		} else if(type is FuncType) {
			ft := type as FuncType
			typeUsage(ft.returnType)
			ft.params.each
			{
				typeUsage(it.ctype)
			}
		}
	}
	
	private Void slotUsage(SlotRef ref) {
		if (ref.modelSlot != null) {
			if(ref.modelSlot.isMethod)
				requestor.acceptMethodReference(ref.text, 0, ref.start, ref.end) //TODO: count args
			else
				requestor.acceptFieldReference(ref.text, ref.start)
		}
	}
	
	private Void localUsage(MethodVarRef ref) {
		requestor.acceptFieldReference(ref.def.name.text, ref.start)
	}
	
	private Void reportUsage(TypeRef ref) {
		requestor.acceptTypeReference(ref.text, ref.start)
	}
	
}