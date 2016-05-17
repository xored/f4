using compilerJava
using f4core
using [java]org.eclipse.jdt.core.search
using [java]org.eclipse.jdt.core
using [java]com.xored.fanide.core.utils::JDTSearchAllTypes
using [java]org.eclipse.core.runtime::NullProgressMonitor

** JDT-backed Java pod
class JdtJavaPod : JavaPod {

			JavaTypeRegistry	registry
	private IPackageFragment[]	allFragments	:= [,]
	private SearchEngine		engine			:= SearchEngine()
	private IJavaSearchScope?	scope

	new make(F4JavaBridge bridge, ClassPathPackage package) : super(bridge, package) {
		IPackageFragmentRoot[] roots := bridge.project.getAllPackageFragmentRoots
		allFragments = roots.map { it.getChildren.findAll {it is IPackageFragment && ((IPackageFragment)it).getElementName == packageName} }.flatten
		scope = SearchEngine.createJavaSearchScope(allFragments)
		registry = bridge.registry
		
		allMatches := TypeRequestor()
		engine.searchAllTypeNames(
			null, 
			SearchPattern.R_PATTERN_MATCH, 
			null, 
			SearchPattern.R_PATTERN_MATCH, 
			IJavaSearchConstants.TYPE, 
			scope, 
			allMatches, 
			IJavaSearchConstants.WAIT_UNTIL_READY_TO_SEARCH, 
			NullProgressMonitor()
		)

		qnames := Str[,]
		allMatches.results.each |jdtType| { 
			type := JdtJavaType(this, jdtType)
			if(!qnames.contains(type.qname)) {
				qnames.add(type.qname)
				types.add(type)
			}
		}
	}
	
	
	override JavaType? resolveType(Str typeName, Bool checked) {
		if (typeName.endsWith("IScriptBuilder")) {
			breakpoint := true
		}
		result := super.resolveType(typeName, false)
		if (result != null) return result

		result = loadTypeFromJdt(typeName);
		if (result != null) {
			return result
		}

		if(checked) throw UnknownTypeErr(name + "::" + typeName) 
		return null
	}
	
	private JavaType? loadTypeFromJdt(Str typeName) {
		nameForSearch := typeName[(typeName.indexr("\$") ?: -1)+1..-1]
		requestor := TypeRequestor()
		engine.searchAllTypeNames(
			InteropUtil.toCharArray(packageName.chars),
			SearchPattern.R_EXACT_MATCH,
			InteropUtil.toCharArray(nameForSearch.chars),
			SearchPattern.R_EXACT_MATCH.and(SearchPattern.R_CASE_SENSITIVE),
			IJavaSearchConstants.TYPE,
			scope,
			requestor,
			IJavaSearchConstants.WAIT_UNTIL_READY_TO_SEARCH,
			NullProgressMonitor()
		)
		
		if(requestor.results.isEmpty) 
			return null
		type := JdtJavaType(this, requestor.results.first)
		types.add(type)
		return type
	}
	
}

class TypeRequestor : TypeNameMatchRequestor {
	IType[] results := [,]

	override Void acceptTypeNameMatch(TypeNameMatch? match) {
		results.add(match.getType)
	}
}
