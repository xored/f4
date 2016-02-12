using compiler
using compilerJava
using [java]org.eclipse.jdt.core.search
using [java]org.eclipse.jdt.core
using [java]com.xored.fanide.core::FanCore
using [java]com.xored.fanide.core.utils::JDTSearchAllTypes
using f4core

class F4Namespace : CNamespace {
	private const	Str:File		locs
	private const	File[]			cpEntries
	private 		IJavaProject?	project
	
	new make(Str:File locs, File[] cpEntries := File[,], IJavaProject? project := null) {
		this.locs = locs
		this.cpEntries = cpEntries
		this.project = project
		init
	}
	
	override FPod? findPod(Str podName) {
		if (!locs.containsKey(podName))
			return null

		loc := locs[podName]
		if (!loc.exists)
			return null

		fpod := FPod(this, podName, addZip(Zip.open(loc)))		
		fpod.read
		return fpod
	}
	
	override protected CBridge findBridge(Compiler c, Str name, Loc? loc) {
		return name == "java" ? F4JavaBridge(c, F4Cp(cpEntries, project), project) : super.findBridge(c, name, loc)
	}
	
	private Zip addZip(Zip zip) {
		zips.add(zip)
		return zip
	}

	private Zip[] zips := [,]
	
	public Void close() {
		zips.each { it.close }
	}
}

**************************************************************************
** F4Cp
**************************************************************************

class F4Cp : ClassPath {
	private IJavaProject? project
	
	new make(File[] entries, IJavaProject? project) : super([,]) {
		this.project = project
	}
}

**************************************************************************
** F4JavaBridge
**************************************************************************
** 
class F4JavaBridge : JavaBridge {
	JavaTypeRegistry	registry
	IJavaProject?		project

	new make(Compiler c, F4Cp cp, IJavaProject? project) : super(c)	{
		registry = JavaTypeRegistry(cp, project)
		this.project = project
		this.cp = cp
	}

	
	override CPod resolvePod(Str name, Loc? loc) {
		if (name == "") return primitives
		return JdtJavaPod(this, ClassPathPackage(name))
	}
}
