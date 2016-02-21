using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.core::IProjectFragment as Fragment
using f4model

internal class DltkNamespace : IFanNamespace {
	private IScriptProject project
	private Str:Fragment[] fragmentsByPod := [:]
	private Str:IFanPod pods := [:]
	public Str:IFanPod ffiPods := [:]
	private const Str currPodName
	new make(FantomProject project, Str? podName := null) {
		this.project = project.scriptProject
		if( podName == null)
			this.currPodName = project.podName
		else
			this.currPodName = podName
		groupFragments
		this.podNames = fragmentsByPod.keys
	}
	
	private Void groupFragments() {
		Fragment[] fragments := project->getAllProjectFragments
		
		fragments.each
		{
			pod := podName(it)
			fragmentsByPod.getOrAdd(pod) |->Obj| { Fragment[,] }.add(it)
		}
	}
	
	private Str podName(Fragment fragment) {
		switch(fragment.getKind) {
			case Fragment.K_SOURCE:
				// source fragment
				return FantomProjectManager.instance[(fragment.getParent as IScriptProject).getProject].podName
			default:
				// pod fragment
				fileName := fragment.getPath.removeFileExtension.lastSegment
				podName	 := fileName.contains("-") ? fileName[0..<fileName.index("-")] : fileName
				return podName
		}
	}
	
	override const Str[] podNames
	
	override IFanPod currPod() {
		// the Err is more informative than an NPE!
		findPod(currPodName) ?: throw Err("Could not find pod '${currPodName}'")
	}

	override IFanPod? findPod(Str name) {
		if (name.startsWith("[java]")) {
			if( ffiPods.containsKey(name)) {
				return ffiPods[name]
			}
			pod := FfiPod(project.getProject,name)
			ffiPods[name] = pod
			return pod
		}
		return !fragmentsByPod.containsKey(name) ? null
			: pods.getOrAdd(name) |->Obj| { DltkPod(name, fragmentsByPod[name]) }
	}
}
