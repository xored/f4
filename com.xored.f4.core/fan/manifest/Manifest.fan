using [java]org.eclipse.core.resources::IProject
using [java]org.eclipse.core.resources::IResource

using f4parser 
using f4model

class Manifest {
	private Range:Int	lineOffsets

	new make(FantomProject fantomProject) {
		project		:= fantomProject.project
		buildFanStr	:= PathUtil.resolveRes(project.getFile(filename)).readAllStr
		lineOffsets = buildOffsets(buildFanStr)

		parser		:= Parser(buildFanStr, EmptyNamespace())
		MethodDef? method := parser.cunit.types.find { it.name.text == "Build" }?.slots?.find { it->name->text == "make" }
		if (method == null) throw ArgErr("Can't parse build.fan in $project.getName")
		
		lines = [Str:Int][:]
		vals =	method.body.stmts
			.findAll { it is ExprStmt }
			.findAll |ExprStmt st->Bool| { st.expr.id == ExprId.assign }
			.map |ExprStmt st -> BinaryExpr| { st.expr }
			.reduce([Str:Obj?][:]) |Str:Obj? result, BinaryExpr expr->Str:Obj?| {
				if (expr.left isnot Ref) return result
				name := expr.left->text
				result[name] = resolveLiteral(expr.right)
				lines[name]	 = lineByPos(expr.right.start)
				return result
			}
	}
	
	//////////////////////////////////////////////////////////////////////////
	// Public API
	//////////////////////////////////////////////////////////////////////////

	public static const Str filename := "build.fan"

	** Lines of field initializers
	Str:Int		lines		{ private set }
	Str:Obj?	vals		{ private set }
	Str? 		podName()	{ vals["podName"] }
	Version		version()	{ vals["version"] ?: Version("1.0") }
	Str 		summary()	{ vals["summary"] ?: "" }
	Uri?		outPodDir()	{ vals["outPodDir"] != null ? Uri.fromStr(vals["outPodDir"]) : null }
	Str[]		depends()	{ vals["depends"] ?: Str[,] }
	Uri[]		resDirs()	{ resolveUris(vals["resDirs"],  false) }
	Uri[]		jsDirs()	{ resolveUris(vals["jsDirs"],   false) }
	Uri[]?		jsProps()	{ resolveUris(vals["jsProps"],  true ) }
	Uri[]		javaDirs()	{ resolveUris(vals["javaDirs"], false) }
	Str:Obj		index()		{ vals["index"] ?: [Str:Obj][:] }
	Str:Str		meta() 		{ vals["meta"]  ?: [Str:Str][:] }
	Bool		docApi()	{ vals["docApi"] ?: true }
	Bool		docSrc()	{ vals["docSrc"] ?: true }
	
	//////////////////////////////////////////////////////////////////////////
	// Helper methods
	//////////////////////////////////////////////////////////////////////////

	private static Uri[]? resolveUris(Obj? vals, Bool nullable) {
		res := Uri[,]
		(vals as Str[])?.each { res.add(Uri.fromStr(it)) }
		return nullable && res.isEmpty ? null : res
	}
	
	private static Obj? resolveLiteral(Expr expr) {
		if (expr is Literal) return expr->val
		if (expr is ListLiteral) {
			list := expr as ListLiteral
			return list.items.map { resolveLiteral(it) }
		}
		
		if (expr is MapLiteral)	{
			map := expr as MapLiteral
			result := [:]
			map.each |k, v|	{
				result[resolveLiteral(k)] = resolveLiteral(v)
			}
			return result
		}
		
		if (expr is CallExpr) { 
			call	:= expr as CallExpr
			callee	:= call.callee
			
			if (isVersionConstructor(callee)) {
				// first look for a Str ctor
				versionStr := (call.args.first as Literal)?.val as Str

				// then for an Int array ctor
				if (versionStr == null)
					versionStr = (call.args.first as ListLiteral)?.items?.join(".") { (it as Literal)?.val?.toStr ?: null }
				
				if (versionStr != null) {
					version := Version.fromStr(versionStr, false)
					if (version != null) return version
				}
			}
		}

		return null
	}
	
	private static Bool isVersionConstructor(Expr callee) {
		
		// these are for standard syntax: Version("1.2")
		if ((callee as UnresolvedRef)?.text == "Version")
			return true
		if ((callee as StaticTargetExpr)?.ctype?.resolvedType?.qname == "sys::Version")
			return true
		
		// this is for explicit make syntax: Version.make("1.2")
		if (callee is InvokeExpr) {
			icallee := ((InvokeExpr) callee).callee
			
			if ((icallee as UnresolvedRef)?.text == "Version")
				return true
			if ((icallee as StaticTargetExpr)?.ctype?.resolvedType?.qname == "sys::Version")
				return true
		}
		
		return false
	}
	
	private static Range:Int buildOffsets(Str file) {
		offset	:= 0
		line	:= 1
		result	:= [Range:Int][:]
		file.each |c, i| {
			if (c == '\n') {
				range := offset..i
				result.set(range, line)
				line++
				offset = i+1
			}
		}
		return result
	}

	private Int lineByPos(Int pos) {
		lineOffsets.find |v, k| {
			k.contains(pos)
		}
	}
}


