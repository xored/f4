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

		projectsToUpdate  := [Str:IProject][:] { it.ordered = true }
	
		// update updated and opened Fantom projects
		change.openedProjects.each {
			projectsToUpdate[it.getName] = it 
		}
		change.updatedProjects.each {
			projectsToUpdate[it.getName] = it 
		}
		
		
		// update the dependencies of parent projects
		change.openedProjects.each {
			parentProjects(it).each {
				projectsToUpdate[it.getName] = it
			}
		}
		change.closedProjects.each {
			parentProjects(it).each {
				// reset and re-resolve to remove these annoying errors:
				//  - Project A is missing required script project: 'Project B'
				resetter.reset(it)
				projectsToUpdate[it.getName] = it
			}

			// remove all closed projects
			projectsToUpdate .remove(it.getName)
			projects		 .remove(it.getName)
		}

		// remove all updated projects to ensure they get re-created
		// updated projects are those with build.fan changes
		change.updatedProjects.each {
			projects		.remove(it.getName)			
		}
		
		// do the update
		projectsToUpdate.vals.each {
			created := createProject(it)

			if (created)
				// resetting seems quite processor intensive, so only do it if we really need to
				resetter.reset(it)

			if (!created)
				// reset existing projects so pods get lazily resolved
				projects[it.getName].reset
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
		createProject(ip)
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
	private Bool createProject(IProject ip) {
		// if the existing project looks okay, let's keep it!
		fp := projects[ip.getName]
		if (fp != null)
			// SlimerDude (Apr 2020) should be no need to manually check build.fan - rely on workspace updates instead
			if (fp.projectErrs.isEmpty && fp.resolveErrs.isEmpty)
				return false

		fp = FantomProject.makeFromProject(ip)
		projects[ip.getName] = fp
		return true
	}
}
