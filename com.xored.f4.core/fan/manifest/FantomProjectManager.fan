using [java] org.eclipse.core.resources::IProject
using concurrent::ActorPool

const class FantomProjectManager {
	static const FantomProjectManager	instance := FantomProjectManager()

	private const SynchronizedState		fantomProjects
	private const FantomProjectListener	projectListener

	private new make() {
		this.fantomProjects	 = SynchronizedState.makeWithType(ActorPool(), FantomProjectManagerState#)
		this.projectListener = FantomProjectListener(this)
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
	
	internal Void notify(WorkspaceChange change) {
		changeRef := Unsafe(change)
		call { it.applyChanges(changeRef.val) } 
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
	
	Obj? applyChanges(WorkspaceChange change) {
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
		doDependentProjects(fp, Str:FantomProject[:]).vals.toImmutable
	}

	private Str:FantomProject doDependentProjects(FantomProject fp, Str:FantomProject fps) {
		for (i := 0; i < fp.rawDepends.size; ++i) {
			podName := fp.rawDepends[i].name
			
			// prevent infinite cyclic dependencies
			if (!fps.containsKey(podName)) {
				project := getByPodName(podName)

				if (project != null) {
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
			if (fp.resolveErrs.isEmpty && fp.buildFanHasChanged == false) {
				return false
			}
		}

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
