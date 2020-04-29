using [java] org.eclipse.core.resources::IProject
using [java] org.eclipse.dltk.core::IScriptProject
using [java] org.eclipse.dltk.core::DLTKCore
using [java] org.eclipse.core.resources::ResourcesPlugin
using concurrent::ActorPool

using [java] org.eclipse.core.resources::IResourceChangeListener
using [java] org.eclipse.core.resources::IResourceChangeEvent
using [java] org.eclipse.core.resources::IResource
using [java] org.eclipse.core.resources::IResourceDeltaVisitor
using [java] org.eclipse.core.resources::IResourceDelta
using [java]org.eclipse.jdt.core::IJavaProject


const class FantomProjectManager2 : IResourceChangeListener {
	static const FantomProjectManager2?	instance := FantomProjectManager2()

	private const SynchronizedState		fantomProjects

	private new make() {
		this.fantomProjects	= SynchronizedState.makeWithType(ActorPool(), FantomProjectManagerState#)
		init
	}

	FantomProject? get(IProject project) {
		projectRef := Unsafe(project)
		return call { it.getOrAdd(projectRef) }
	}
	
	FantomProject? getByPodName(Str podName) {
		call { it.getByPodName(podName) }
	}
	
	FantomProject[] allProjects() {
		call { it.allProjects } 
	}
	
	FantomProject[] dependentProjects(FantomProject fp) {
		call { it.dependentProjects(fp) }
	}

	override Void resourceChanged(IResourceChangeEvent? event) {
		// TODO move to deltaVis - use the Fantom closure interface thing
		if (event.getType == IResourceChangeEvent.POST_CHANGE) {
			visitor := DeltaVisitor2()
			event.getDelta.accept(visitor)
			notify(visitor.workspaceChanges)
		}
	}
	
	private Void notify(WorkspaceChange2 change) {
		changeRef := Unsafe(change)
		call { it.applyChanges(changeRef.val) } 
	}
	
	private Void init() {
		call { it.init }
		DLTKCore.addPreProcessingResourceChangedListener(this, IResourceChangeEvent.POST_CHANGE)
	}
	
	private Obj? call(|FantomProjectManagerState->Obj?| state) {
		fantomProjects.sync(state)
	}
}

internal class FantomProjectManagerState {
	private ContainerResetter	resetter
	private Str:FantomProject	projects
	
	new make() {
		this.resetter	= ContainerResetter(ActorPool())
		this.projects	= Str:FantomProject[:]
	}
	
	Obj? init() {
		DLTKCore.create(ResourcesPlugin.getWorkspace.getRoot).getScriptProjects(F4Nature.id).each |IScriptProject sp| {
			updateProject(sp.getProject)
		}
		return null
	}
	
	Obj? applyChanges(WorkspaceChange2 change) {
		// reset containers for all projects that depend on 
		// closed or opened projects and for all projects with updated content

		projectsToUpdate := [Str:IProject][:] { it.ordered = true }
		
		// add updated and opened Fantom projects
		change.openedProjects.each {
			if (isFantomProject(it))	projectsToUpdate[it.getName] = it 
		}
		change.updatedProjects.each {
			if (isFantomProject(it))	projectsToUpdate[it.getName] = it 
		}
		
		
		// add parent projects
		change.openedProjects.each {
			parentProjects(it).each {	projectsToUpdate[it.getName] = it }
		}
		change.closedProjects.each {
			parentProjects(it).each {	projectsToUpdate[it.getName] = it }
		}

		
		// remove all closed projects
		change.closedProjects.each {
			projectsToUpdate.remove(it.getName)
			projects		.remove(it.getName)
		}

		
		// do the update
		projectsToUpdate.vals.each {
			updated := updateProject(it)
			if (updated)
				resetter.reset(it)
			else
				projects[it.getName].update
		}
		
		return null
	}
	
	private IProject[] parentProjects(IProject ip) {
		fp := projects[ip.getName]
		if (fp == null)
			return IProject#.emptyList
		
		parents := IProject[,]
		projs := projects.vals
		for (i := 0; i < projs.size; ++i) {
			proj := projs[i]
			deps := proj.rawDepends
			for (j := 0; j < deps.size; ++j) {
				if (deps[j].name == fp.podName)
					parents.add(proj.project)
			}
		}
		return parents
	}
	
	FantomProject? getOrAdd(Unsafe projectRef) {
		ip := (IProject) projectRef.val
		updateProject(ip)
		return projects[ip.getName]
	}
	
	FantomProject? getByPodName(Str podName) {
		projects.find { it.podName == podName }
	}
	
	FantomProject[] allProjects() {
		projects.vals.toImmutable
	}

	FantomProject[] dependentProjects(FantomProject fp) {
`/f4log.txt`.toFile.out(true).writeChars("----\n").close
		des:=doDependentProjects(fp, Str:FantomProject[:]).vals.toImmutable
`/f4log.txt`.toFile.out(true).writeChars("$fp ==> $des\n").close
		return des
	}

	private Str:FantomProject doDependentProjects(FantomProject fp, Str:FantomProject fps) {
`/f4log.txt`.toFile.out(true).writeChars("  $fp --> ${fp.rawDepends}\n").close
		for (i := 0; i < fp.rawDepends.size; ++i) {
			podName := fp.rawDepends[i].name
			
`/f4log.txt`.toFile.out(true).writeChars("  $fp --> has ${podName} == ${fps.containsKey(podName)} \n").close

			// prevent infinite cyclic dependencies
			if (!fps.containsKey(podName)) {
				project := getByPodName(podName)
`/f4log.txt`.toFile.out(true).writeChars("  $fp --> pro ${podName} == ${project}\n").close

				if (project != null) {
`/f4log.txt`.toFile.out(true).writeChars("  $fp --> $podName\n").close
					fps[podName] = project
					doDependentProjects(project, fps)
				}
			}
		}
		return fps
	}

	** Returns 'true' if the project was updated
	private Bool updateProject(IProject ip) {
		// if the existing project looks okay, let's keep it!
		fp := projects[ip.getName]
		if (fp != null) {
//`/f4log.txt`.toFile.out(true).writeChars("$ip.getName Proj exists (build.fan diff-${fp.buildFanHasChanged}) (${fp.resolveErrs}) \n").close
			if (fp.resolveErrs.isEmpty && fp.buildFanHasChanged == false) {
				return false
			}
		}

`/f4log.txt`.toFile.out(true).writeChars("$ip.getName MAKING NEW!\n").close
		fp = FantomProject.makeFromProject(ip)
		projects[ip.getName] = fp
		return true
	}
	
	private Bool isFantomProject(IProject ip) {
		ip.exists
			? ip.getNature(F4Nature.id)  != null
			: projects[ip.getName] != null
	}
}

** Visits resource delta and collects changes
class DeltaVisitor2 : IResourceDeltaVisitor {
	IProject[] closedProjects	:= IProject[,]
	IProject[] openedProjects	:= IProject[,]
	IProject[] updatedProjects	:= IProject[,]
	
	override Bool visit(IResourceDelta? delta) {
		resource := delta.getResource

		switch (resource.getType) {
			case IResource.PROJECT:
				project := (IProject) resource

				if (!project.exists || projectClosed(delta, project)) {
`/f4log.txt`.toFile.out(true).writeChars("$project.getName - PROJ CLOSED\n").close
					closedProjects.add(project)
					return false
				}
			
				if (projectOpened(delta, project)) {
`/f4log.txt`.toFile.out(true).writeChars("$project.getName - PROJ OPENED\n").close
					openedProjects.add(project)
					return false
				}
			
				return true

			case IResource.FOLDER:
				return false

			case IResource.FILE:
				if ((resource.getName == Manifest.filename || resource.getName == IJavaProject.CLASSPATH_FILE_NAME) && contentChanged(delta))
`/f4log.txt`.toFile.out(true).writeChars("$resource.getProject.getName - FILE CHANGE\n").close
					updatedProjects.add(resource.getProject)
				return false

			default:
				return true
		}
	}
	
	WorkspaceChange2 workspaceChanges() {
		WorkspaceChange2 {
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

class WorkspaceChange2 {
	IProject[] closedProjects  := IProject[,]
	IProject[] openedProjects  := IProject[,]
	IProject[] updatedProjects := IProject[,]
}
