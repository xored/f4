using compiler
using compilerJava

using [java]org.eclipse.jdt.core.search
using [java]org.eclipse.jdt.core::IPackageFragment
using [java]org.eclipse.jdt.core::IPackageFragmentRoot
using [java]org.eclipse.jdt.core::IJavaProject
using [java]org.eclipse.jdt.core::IParent
using [java]org.eclipse.jdt.core::IField
using [java]org.eclipse.jdt.core::Signature
using [java]org.eclipse.jdt.core::Flags
using [java]org.eclipse.jdt.core::IType
using [java]org.eclipse.jdt.core::ITypeParameter
using [java]org.eclipse.jdt.core::IMethod
using [java]org.eclipse.jdt.core::IMember
using [java]org.eclipse.jdt.core::IJavaElement
using [java]com.xored.fanide.core::FanCore
using [java]com.xored.fanide.core::JDTSupport

class JavaTypeRegistry {
	private Str:IPackageFragment[]	fragments		:= [:]
	private Str:[Str:Str]			jdtResolveMap	:= [:]
	private F4Cp 					cp
	private IJavaProject?			project

	new make(F4Cp cp, IJavaProject? project) {
		this.cp = cp
		this.project = project
		
		IPackageFragmentRoot[] roots := project.getAllPackageFragmentRoots
		IPackageFragment[] allFragments := roots.map { it.getChildren.findAll {it is IPackageFragment }}.flatten
	
		allFragments.each {
			 IPackageFragment[] fragment := this.fragments.getOrAdd(it.getElementName) |->IPackageFragment[]| { IPackageFragment[,] }
			 fragment.add(it)
		}
	}

		
	** Use the same signature as JavaReflect
	Void load(JavaType type, Str:CSlot slots) {
		if(type.arrayRank > 0) 
			populateArray(type, type.arrayOf, slots)
		else
			doLoad(type, slots)
	}
	
	Void loadFromJdt(JdtJavaType type, Str:CSlot slots) {
		populateType(type, type.jdtType, slots)
	}
	
	private Void doLoad(JavaType type, Str:CSlot slots) {
		qname := type.toJavaClassName
		populateTypeQName(type, slots, qname)
	}

	private Void populateTypeQName(JavaType type, Str:CSlot slots, Str qname) {
		IType? resultType := findType(qname)
		if (resultType != null) {
			populateType(type, resultType, slots)
		}
	}

	private Void printJavaMethod(JavaSlot m) {
		map := [
			"Abstract"	: 0x00000001,
			"Const"		: 0x00000002,
			"Ctor"		: 0x00000004,
			"Enum"		: 0x00000008,
			"Facet"		: 0x00000010,
			"Final"		: 0x00000020,
			"Getter"	: 0x00000040,
			"Internal"	: 0x00000080,
			"Mixin"		: 0x00000100,
			"Native"	: 0x00000200,
			"Override"	: 0x00000400,
			"Private"	: 0x00000800,
			"Protected"	: 0x00001000,
			"Public"	: 0x00002000,
			"Setter"	: 0x00004000,
			"Static"	: 0x00008000,
			"Storage"	: 0x00010000,
			"Synthetic"	: 0x00020000,
			"Virtual"	: 0x00040000,
			"FlagsMask"	: 0x0007ffff
		]
		
		echo(m.signature)
		map.each |v, k| { if(m.flags.and(v) == v) echo("\t$k") }
	}

	private IType? findType(Str qname) {		
		ind := qname.indexr(".")
		if (ind == null) return null
		pkgName := qname[0..ind-1]

		if (this.fragments.containsKey(pkgName)) {
			pType := project.findType(qname)

			if( pType != null) {
				return pType
			}
			
			if( qname.contains("\$")) {
				pType = project.findType(qname[0..qname.index("\$")-1])
				if( pType != null) {
					return findTypeFrom(pType, qname)
				}
			}
			
			IPackageFragment[] fragments := this.fragments[pkgName]
			IType? resultType := fragments.eachWhile { findTypeFrom(it, qname) }
			return resultType
			
		} else {
			// probable inner class, try to locate it
			lqname := qname.split('.')
			fi := 0
			for( i := 0; i < lqname.size-1;i++) {
				lpkg := lqname[0..i].join(".")
				lpkg2 := lqname[0..i+1].join(".")
				if( fragments.containsKey(lpkg) && !fragments.containsKey(lpkg2)) {
					lname := lqname[i+1..-1].join("\$")
					return findType(lpkg +"." + lname)
				}
			}			
		}
		return null
	}
	
	private IType? findTypeFrom(IParent? element, Str qname) {
		IJavaElement[]? childs := element.getChildren
		IJavaElement[] result := [,]
		childs.each |IJavaElement childElement|	{
			if (childElement.getElementType == IJavaElement.TYPE ) {
				IType typeElement := (IType)childElement
				ename := typeElement.getFullyQualifiedName('$')
				if (ename == qname)	{
					result.add(childElement)
					return
				}
				
			}
	
			if (childElement is IParent && !(childElement.getElementType == IJavaElement.FIELD || childElement.getElementType == IJavaElement.METHOD)) {
				res := findTypeFrom((IParent)childElement, qname)
				if (res != null) {
					result.add(res)
					return
				}
			}
		}
	
		if (result.size > 0) {
			return result.first
		}
		return null
	}
	
	private Void populateType(JavaType type, IType info, Str:CSlot result) {
		populateAccessAndBase(type, info)
		populateInterfaces(type, info)
		
		slots := [Str:CSlot[]][:]
		populateCtorsAndMethods(type, info, slots)
		islots := [Str:CSlot[]][:]
		populateInterfaceSlots(type, info, slots)
		populateFields(type, info, slots)
		populateObjSlots(type, slots)
		
		result.addAll(collapseSlots(slots))
		
		// Add <init> method for non interfaces
		if (Flags.AccInterface.and(info.getFlags) == 0)
			if (!result.containsKey("<init>")) {
				// Add one default contructor if doesn't persist
				ctor := JavaMethod(type, "<init>", FConst.Public.or(FConst.Ctor).or(FConst.Virtual), type, [,] )
				result["<init>"] = ctor
			}
	}
	
	private Void populateObjSlots(JavaType type, Str:CSlot[] slots)	{
		type.bridge.ns.objType.slots.each |slot, name| {	
			if (slot.isCtor) return
			if (!slot.isPublic && !slot.isProtected) return
			if (!slots.containsKey(name)) 
				slots[name] = [slot] 
		}
	}
 
	private Str:CSlot collapseSlots(Str:CSlot[] slots) {
		slots.map |CSlot[] list, Str name -> CSlot| {
			if(list.isEmpty) throw Err("Empty slot list $name")
			if(list.size < 2) return list.first
			
			first := list.first
			list = list[1..-1]
			return list.reduce(first) |JavaSlot r, JavaSlot v->CSlot| {
				v.next = r.next
				r.next = v
				return r
			}
		}
	}

	
	private Void populateFields(JavaType type, IType info, [Str:JavaSlot[]] slots) {		
		fieldHandler := |IField f->Void| {
			flg := f.getFlags
			if (f.getParent is IType) {
				IType mType := f.getParent
				if( mType.isInterface) {
					flg = flg.or(Flags.AccPublic).or(Flags.AccStatic).or(Flags.AccFinal)
				}
			} 
			result := JavaField(type, f.getElementName, memberFlags(flg), fanType(type.pod.bridge, f.getTypeSignature, false, info) )
			
			//try to find slot with the same parameters
			if(!slots.containsKey(result.name)) slots[result.name] = [result]
		}
		
		fieldFilter := |IField? f->Bool| {
			Flags.AccPublic.and(f.getFlags) != 0 || Flags.AccProtected.and(f.getFlags) != 0
		}
		
		IType? base := info
		while(base != null) {
			if( base.isInterface) base.getFields.exclude {it == null}.each(fieldHandler)
			else base.getFields.exclude {it == null}.findAll(fieldFilter).each(fieldHandler)
			base = getBase(base)
		}
	}

	private Void populateCtorsAndMethods(JavaType type, IType info, [Str:JavaSlot[]] slots)	{
		methodHandler := |IMethod m->Void| {
			isCtor := m.isConstructor
			result_name := ""
			if( !isCtor ) result_name = m.getElementName
			else result_name = "<init>"
			flg := m.getFlags
			if (m.getParent is IType) {
				IType mType := m.getParent
				if( mType.isInterface) {
					flg = flg.or(Flags.AccAbstract.or(Flags.AccPublic))
				}
			}
			result_flags := memberFlags(flg).or(isCtor ? FConst.Ctor : 0)
			returnTypeName := resolveGenericType(m.getReturnType, m, info)
			
			result_returnType := isCtor ? type : fanType(type.pod.bridge, returnTypeName, false, info)
			
			paramNames := m.getParameterNames
			paramTypes := m.getParameterTypes
			
			
			result_params := paramTypes.map |pt, i| {
				name := paramNames.getSafe(i, "arg$i")
				paramType := resolveGenericType(pt, m, info)
				return JDTParam(name, fanType(type.pod.bridge, paramType, false, info), false)
			}
			//echo(" method "+ result.name + "(" + result.params +")")
			result := JavaMethod( type, result_name, result_flags, result_returnType, result_params )
			
			list := slots.getOrAdd(result.name) |->JavaSlot[]| { JavaSlot[,] }
			//try to find slot with the same parameters
			slotExists := list.any |JavaSlot slot -> Bool|
			{
				if(slot isnot JavaMethod) return false
				other := slot as JavaMethod
				part1 := other.params.map { it.paramType.qname }
				part2 := result.params.map { it.paramType.qname }
				return part1 == part2
			}
			if(!slotExists) list.add(result)
			//slots.getOrAdd(m.name) |->JavaSlot[]| { JavaSlot[,] }.add(result)
		}
		methodFilter := |IMethod? m->Bool| {
			Flags.AccPublic.and(m.getFlags) != 0 || Flags.AccProtected.and(m.getFlags) != 0
		}
		if (info.isInterface) info.getMethods.exclude{it == null || ((IMethod)it).getElementName == "<clinit>"}.each(methodHandler)
		else info.getMethods.exclude{it == null}.findAll(methodFilter).each(methodHandler)
		
		if (Flags.AccInterface.and(info.getFlags) != 0 && getBase(info) != null &&
			getBase(info).getFullyQualifiedName('$') == "java.lang.Object" ) 
			return
		
		basicFiler := |IMethod? m->Bool| {
			m == null || m.isConstructor || m.getElementName == "<clinit>"
		}

		IType? base := info
		while((base = getBase(base)) != null) {
			if( base.isInterface) base.getMethods.exclude(basicFiler).each(methodHandler)
			else base.getMethods.exclude(basicFiler).findAll(methodFilter).each(methodHandler)
		}
	}

	private static Str resolveGenericType(Str? type, IMethod m, IType t) {
		typeParams := ITypeParameter[,] 
		typeParams.addAll(m.getTypeParameters)
		typeParams.addAll(t.getTypeParameters)
		Str?[] typeParamNames := typeParams.map { it.getElementName }.unique
		qualifier := Signature.getSignatureQualifier(type)
		name := Signature.getSignatureSimpleName(type)
		if(type.chars.first == Signature.C_UNRESOLVED && qualifier.isEmpty && typeParamNames.contains(name)) {
			return "Ljava.lang.Object;"
		}
		return type
	}

	private Void populateInterfaceSlots(JavaType type, IType nfo, [Str:JavaSlot[]] slots) {
		if(nfo.getSuperInterfaceNames.isEmpty) return
		nfo.getSuperInterfaceNames.each |interface| {
			IType? t := findType(interface)
			if (t == null) {
				Str?[]? resolve := resolveJDTType(nfo, interface)
				if( resolve != null && resolve.size > 0) {
					t = findType(resolve[0]) 
				}
			}
			
			if (t != null) {
				populateCtorsAndMethods(type, t, slots)
				populateFields(type, t, slots)
				populateInterfaceSlots(type, t, slots)
			} 
		}
	}

	private IType? getBase(IType nfo) {
		if (nfo.getSuperclassName == null)
			return null
	
		IType? t := findType(nfo.getSuperclassName)
		if (t != null) return t
		Str?[]? resolve := resolveJDTType(nfo, nfo.getSuperclassName)
		if (resolve != null && resolve.size > 0) {
			return findType(resolve[0])
		}
		return null
	}

	private Void populateInterfaces(JavaType type, IType info) { 
		if(info.getSuperInterfaceNames.isEmpty) return
		type.mixins = info.getSuperInterfaceTypeSignatures.exclude { it == null }.map |Str interface -> CType| {
			return fanType(type.pod.bridge, interface, false, info)
		}
	}
	
	private Void populateAccessAndBase(JavaType type, IType info) {
		flg := classFlags(info.getFlags)
		type.flags = flg
		if( info.isInterface) {
			type.flags = flg.or(FConst.Abstract)
		}
		IType? superClass := null
		if (info.getSuperclassTypeSignature != null ) { 
			 type.base = fanType(type.pod.bridge, info.getSuperclassTypeSignature, false, info).toNonNullable
		}
	}
	
	private Void populateArray(JavaType type, JavaType arrayOf, Str:CSlot slots) {
		//assume that arrayOf and arrayKind are set,
		//so we will just populate it with methods from Object
		populateTypeQName(type, slots, "java.lang.Object")
	}
	
	private Int classFlags(Int access) {
		result := 0
		if(Flags.AccAbstract.and(access) != 0) result = result.or(FConst.Abstract)
		if(Flags.AccFinal.and(access) != 0) result = result.or(FConst.Final)
		if(Flags.AccInterface.and(access) != 0) result = result.or(FConst.Mixin)
		result = result.or((Flags.AccPublic.and(access) != 0) ? FConst.Public : FConst.Internal)
		return result
	}
	
	private Int memberFlags(Int access) {
		result := 0
		if(Flags.AccAbstract.and(access) != 0) result = result.or(FConst.Abstract)
		if(Flags.AccStatic.and(access) != 0) result = result.or(FConst.Static)
		result = result.or((Flags.AccFinal.and(access) != 0) ? FConst.Final : FConst.Virtual)
		if(Flags.AccPublic.and(access) != 0) result = result.or(FConst.Public)
		else if(Flags.AccPrivate.and(access) != 0) result = result.or(FConst.Private)
		else if(Flags.AccProtected.and(access) != 0) result = result.or(FConst.Protected)
		else result = result.or(FConst.Internal)
		return result
	}
	
	private CType fanType(JavaBridge bridge, Str? type, Bool multidim, IType? info)	{
		ns := bridge.ns

		if (null == type) {
			return ns.voidType
		}
		 
		primitive := primitiveType(bridge, type, false, info)
		if(primitive != null) return primitive
		
		if (Signature.getArrayCount(type) > 0) {
			return arrayType(bridge, type, info)
			//handle arrays later
		}
		
		if (Signature.getTypeSignatureKind(type) == Signature.TYPE_VARIABLE_SIGNATURE) { 
			//type = Signature.createTypeSignature("java.lang.Object", true);
			return ns.objType.toNullable
		}
	
		if(!multidim) {
			direct := directType(ns, type, info)?.toNullable
			if (direct != null) return direct
		}
		
		
		type = Signature.getTypeErasure(type)
		package := Signature.getSignatureQualifier(type)
		name := Signature.getSignatureSimpleName(type).replace(".", "\$")

		if( package.size == 0 || !fragments.containsKey(package)) {
			stype := Signature.toString(type)
			resultName := resolveJDTType(info, stype)
			if( resultName != null && resultName.size > 0) 
			{
				package = resultName[0]
				pind := package.indexr(".")
				name = package[pind+1.. -1]
				if( pind != null) package = package[0.. pind-1]
			}
		}

		if (!fragments.containsKey(package)) {
			// probable inner class, try to locate it
			lqname := (package + "." + name).split('.')
			fi := 0
			for (i := 0; i < lqname.size-1;i++) {
				lpkg := lqname[0..i].join(".")
				lpkg2 := lqname[0..i+1].join(".")
				if( fragments.containsKey(lpkg) && !fragments.containsKey(lpkg2))
				{
					lname := lqname[i+1..-1].join("\$")
					if(lpkg == "fan.sys") return ns.resolveType("sys::$lname?")
					return ns.resolveType("[java]${lpkg}::${lname}?")
				}
			}			
		}

		if(package == "fan.sys") return ns.resolveType("sys::$name?")
		return ns.resolveType("[java]${package}::${name}?")
	}
	
	private Str?[]? resolveJDTType(IType? info, Str stype) {
		if( info == null) {
			return null
		}
		tkey := info.getFullyQualifiedName('$')
		if (jdtResolveMap.containsKey(tkey)) {
			if( jdtResolveMap[tkey].containsKey(stype) )
				return [jdtResolveMap[tkey][stype]]
		}
		
		Str?[]? resultName := JDTSupport.resolve(info, stype)
		// Try to resolve agains base class
		if (resultName == null && info != null)	{
			IType? base := getBase(info)
			while( resultName == null && base != null) {
				resultName = JDTSupport.resolve(base, stype)
				base = getBase(base)
			}
		}
	
		if(resultName != null && resultName.size == 1) {
			[Str:Str]? rmap := jdtResolveMap[tkey]
			if( rmap == null) {
				rmap = [:]
				jdtResolveMap[tkey] = rmap
			}
			rmap[stype] = resultName[0]
		}
		return resultName
	}

	private CType arrayType(JavaBridge bridge, Str? type, IType? info) {
		ns := bridge.ns

		if(Signature.getArrayCount(type) == 1) {
			ttype := type [1..-1]
			tName := Signature.toString(Signature.getSimpleNames(ttype).join("."))
			
//			Str?[]? resultName := resolveJDTType(info, tName)
//			if( resultName != null && resultName.size > 0) tName = resultName[0]
			
			switch (tName) {
				case "boolean"	: return ns.resolveType("[java]fanx.interop::BooleanArray?")
				case "byte"		: return ns.resolveType("[java]fanx.interop::ByteArray?")
				case "short"	: return ns.resolveType("[java]fanx.interop::ShortArray?")
				case "char"		: return ns.resolveType("[java]fanx.interop::CharArray?")
				case "int"		: return ns.resolveType("[java]fanx.interop::IntArray?")
				case "long"		: return ns.resolveType("[java]fanx.interop::LongArray?")
				case "float"	: return ns.resolveType("[java]fanx.interop::FloatArray?")
				case "double"	: return ns.resolveType("[java]fanx.interop::DoubleArray?") 
			}
			
		}

		if( Signature.getArrayCount(type) > 0) {
			// Remove one ARRAY qualifier
			type = type [1..-1]
		}
		
		if( Signature.getTypeSignatureKind(type) == Signature.TYPE_VARIABLE_SIGNATURE) {
			type = Signature.createTypeSignature("java.lang.Object", true);
		}
	
		elemResult := fanType(bridge, type, true, info).toNonNullable
		if(elemResult isnot JavaType) throw Err("Not JavaType: $type -> $elemResult")
		return ((JavaType)elemResult).toArrayOf.toNullable
	}
	
	private CType? directType(CNamespace ns, Str? type, IType? info) {
		type = Signature.getTypeErasure(type)
		tName := Signature.toString(Signature.getSimpleNames(type).join("."))
		if( tName.index(".") == null) {
			Str?[]? resultName := resolveJDTType(info, tName)
			if( resultName != null && resultName.size > 0) tName = resultName[0]
		}
		
		switch(tName) {
			case "java.lang.Object"		: return ns.objType
			case "java.lang.String"		: return ns.strType
			case "java.math.BigDecimal"	: return ns.decimalType
			default: return null
		}
	}
	
	private static CType? primitiveType(JavaBridge bridge, Str? type, Bool multidim, IType? info) {
		ns := bridge.ns
		primitives := bridge.primitives
		
		if( Signature.getQualifier(type).size != 0) {
			return null
		}
		type = Signature.getTypeErasure(type)
		sigName := Signature.getSimpleName(type)
		finalName := Signature.toString(sigName)
		
//		Str?[]? resultName := resolveJDTType(info, finalName)
//		if( resultName != null && resultName.size > 0) finalName = resultName[0]
		
		switch(finalName) {
			case "void"		: return ns.voidType
			case "boolean"	: return multidim? primitives.booleanType : ns.boolType
			case "long"		: return multidim? primitives.longType : ns.intType
			case "double"	: return multidim? primitives.doubleType : ns.floatType
			case "int"		: return primitives.intType
			case "byte"		: return primitives.byteType
			case "short"	: return primitives.shortType
			case "char"		: return primitives.charType
			case "float"	: return primitives.floatType
		}
		return null
	}
}

internal class JDTParam: CParam {
	override const	Str		name
	override 		CType	paramType
	override const	Bool	hasDefault
	
	new make(Str name, CType type, Bool def) {
		this.name = name
		this.paramType = type
		this.hasDefault = def
	}
}
