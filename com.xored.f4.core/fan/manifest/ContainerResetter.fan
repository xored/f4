using [java]org.eclipse.core.resources::IProject
using [java]org.eclipse.dltk.core::DLTKCore
using [java]org.eclipse.dltk.core::IScriptProject
using [java]org.eclipse.dltk.core::IBuildpathEntry
using [java]org.eclipse.dltk.launching::ScriptRuntime
using [java]org.eclipse.core.runtime::IPath

using [java]org.eclipse.jdt.core::JavaCore
using [java]org.eclipse.jdt.core::IJavaProject
using [java]org.eclipse.jdt.core::IClasspathEntry

using concurrent

** Listens for Build.fan changes and updates container
** Automatically groups update requests by project
const class ContainerResetter : Actor {

	new make(ActorPool pool) : 
		super.makeCoalescing (
			pool, 
			|Unsafe val -> Str| {
				// key is project location
				(val.val as IProject).getLocation.toOSString
			}, 
			null,	// we don't need coalesce func, last message wins 
			null	// we override receive method, so no need to pass it
		) {}
	
	public Void reset(IProject project) {
		send(Unsafe(project))
	}
	
	override Obj? receive(Obj? msg) {
		project := (msg as Unsafe).val as IProject
		if (!project.isAccessible) {
			return null
		}

		scriptProject := DLTKCore.create(project)
		if (scriptProject.exists) {
			DLTKCore.getBuildpathContainerInitializer(ScriptRuntime.INTERPRETER_CONTAINER)
				.initialize(containerPath(scriptProject), scriptProject)
		}

		// Reinitialize also Java container
		javaProject := JavaCore.create(project)
		if (javaProject.exists) {
			JavaCore.getClasspathContainerInitializer("com.xored.fanide.jdt.launching.FANJAVA_CONTAINER")
				.initialize(javaContainerPath(javaProject), javaProject)
		}
			
		return null
	}
	
	private IPath? containerPath(IScriptProject project) { 
		IBuildpathEntry? entry := project.getRawBuildpath.find |IBuildpathEntry entry->Bool| {
			entry.getEntryKind == IBuildpathEntry.BPE_CONTAINER &&
			entry.getPath.segments.first == ScriptRuntime.INTERPRETER_CONTAINER
		}
		return entry?.getPath
	}

	private IPath? javaContainerPath(IJavaProject project) { 
		IClasspathEntry? entry := project.getRawClasspath.find |IClasspathEntry entry->Bool| {
			entry.getEntryKind == IClasspathEntry.CPE_CONTAINER &&
			entry.getPath.segments.first == "com.xored.fanide.jdt.launching.FANJAVA_CONTAINER"
		}
		return entry?.getPath
	}
}
