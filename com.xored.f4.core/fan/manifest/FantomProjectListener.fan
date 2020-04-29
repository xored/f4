using [java] org.eclipse.jdt.core::IJavaProject
using [java] org.eclipse.dltk.core::IScriptProject
using [java] org.eclipse.dltk.core::DLTKCore
using [java] org.eclipse.core.resources::ResourcesPlugin
using [java] org.eclipse.core.resources::IResourceChangeEvent
using [java] org.eclipse.core.resources::IResource
using [java] org.eclipse.core.resources::IResourceDelta
using [java] org.eclipse.core.resources::IProject

internal const class FantomProjectListener {
	const FantomProjectManager	fantomProjects
	
	new make(FantomProjectManager fantomProjects) {
		this.fantomProjects = fantomProjects

		DLTKCore.create(ResourcesPlugin.getWorkspace.getRoot).getScriptProjects(F4Nature.id).each |IScriptProject sp| {
			// this "adds" the project
			fantomProjects.get(sp.getProject)
		}
		
		// Java interfaces with ONE method may be represented as a closure - cool, huh!?
		DLTKCore.addPreProcessingResourceChangedListener(|IResourceChangeEvent? event| {
			if (event.getType == IResourceChangeEvent.POST_CHANGE) {
				visitor := DeltaVisitor2()
				// do that interface closure thing again!
				event.getDelta.accept |IResourceDelta delta -> Bool| {
					visitor.visit(delta)
				}
				fantomProjects.notify(visitor.workspaceChanges)
			}
		}, IResourceChangeEvent.POST_CHANGE)
	}
}

** Visits resource delta and collects changes
internal class DeltaVisitor2 {
	IProject[] closedProjects	:= IProject[,]
	IProject[] openedProjects	:= IProject[,]
	IProject[] updatedProjects	:= IProject[,]
	
	Bool visit(IResourceDelta? delta) {
		resource := delta.getResource

		switch (resource.getType) {
			case IResource.PROJECT:
				project := (IProject) resource

				if (!project.exists || projectClosed(delta, project)) {
					closedProjects.add(project)
					return false
				}
			
				if (projectOpened(delta, project)) {
					openedProjects.add(project)
					return false
				}
			
				return true

			case IResource.FOLDER:
				return false

			case IResource.FILE:
				if ((resource.getName == Manifest.filename || resource.getName == IJavaProject.CLASSPATH_FILE_NAME) && contentChanged(delta))
					updatedProjects.add(resource.getProject)
				return false

			default:
				return true
		}
	}
	
	WorkspaceChange workspaceChanges() {
		WorkspaceChange {
			it.closedProjects	= this.closedProjects
			it.openedProjects	= this.openedProjects
			it.updatedProjects	= this.updatedProjects
		}
	}
	
	private static Bool contentChanged(IResourceDelta delta) {
		switch (delta.getKind) {
			case IResourceDelta.CHANGED:
				return delta.getFlags.and(IResourceDelta.CONTENT) != 0
			default:
				return true
		}
	}

	private static Bool projectClosed(IResourceDelta delta, IProject project) { openChange(delta) && !project.isOpen }
	private static Bool projectOpened(IResourceDelta delta, IProject project) { openChange(delta) &&  project.isOpen }
	private static Bool openChange	 (IResourceDelta delta) { delta.getFlags.and(IResourceDelta.OPEN) != 0 }
}

internal class WorkspaceChange {
	IProject[] closedProjects  := IProject[,]
	IProject[] openedProjects  := IProject[,]
	IProject[] updatedProjects := IProject[,]
}
