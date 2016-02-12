using [java]org.eclipse.dltk.core
using "[java]com.xored.fanide.internal.core.model"

class ModelPrinter {

	static Void print(IModelElement element) {
		doPrint(element, "", element)
	}
	
	private static Str podName(IType type) {
		IModelElement elem := type
		buf := StrBuf()
		while (elem.getParent != null) {
			elem = elem.getParent
			buf.add(elem.typeof.name).add(".")
		}
		return buf.toStr
	}
	
	private static Void doPrint(IModelElement element, Str prefix, IScriptProject project) {
		echo("$prefix$element.getElementName ($element.typeof.name) ")
		printExtra(element, prefix, project)
		children(element).each { doPrint(it, "$prefix	", project) }
	}
	
	private static Void printExtra(IModelElement e, Str prefix, IScriptProject project)	{
		if(e is PodModule) {
			//echo("$prefix ftypes - ${e->getFTypes}")
		}

		if(e is IProjectFragment) {
			if(e.getParent != project) {
				echo("this is external source folder")
			}
		}
	}

	private static IModelElement[] children(IModelElement parent) {
		if(parent is IScriptProject) return parent->getAllProjectFragments
//		if(parent isnot IScriptProject) return [,]
//		sp := parent as IScriptProject
//		return sp->getAllProjectFragments
		if(parent is IType || parent is PodModule) return [,]
		if(parent isnot IParent) return IModelElement[,]
		return (parent as IParent).getChildren
	}
	
	private static IType[] allTypes(IModelElement parent) {
		//if(parent isnot IScriptProject) return [,]
		if(parent is IType) return [parent]
		if(parent isnot IParent) return [,]
		return (parent as IParent).getChildren.map { allTypes(it) }.flatten
	}
}
