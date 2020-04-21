using [java]org.eclipse.core.resources::IProject
using [java]org.eclipse.dltk.core::IScriptModel
using [java]org.eclipse.dltk.core::IScriptProject
using [java]org.eclipse.dltk.core::DLTKCore
using [java]org.eclipse.core.resources::ResourcesPlugin
using concurrent

const class FantomProjectManager : Actor, BuildfanChangeListener {
	static const FantomProjectManager?	instance := FantomProjectManager()
	private const ContainerResetter		resetter
	const BuildfanListener				buildFanChange


	//////////////////////////////////////////////////////////////////////////
	// Constructor and fields
	//////////////////////////////////////////////////////////////////////////
	
	private new make() : super(ActorPool()) {
		try {
			resetter = ContainerResetter(pool)
			buildFanChange = BuildfanListener(pool)
			buildFanChange.subscribe
			buildFanChange.addListener(this)
			init	
		} catch(Err e) {
			e.trace
			throw e
		}
	}
	
	//////////////////////////////////////////////////////////////////////////
	// Overriden methods
	//////////////////////////////////////////////////////////////////////////
	
	override Obj? receive(Obj? msg) {
		// rewritten to fail fast
		try	{
			list := (Obj[])msg
			return ((Method)list[0]).callOn(this, ((Unsafe)list[1]).val)
		} catch(Err e) {
			e.trace //TODO: Add normal error reporting
			throw e
		}
	}
	
	override Void notify(WorkspaceChange change) {
		runInManager(#doNotify, [change])
	}

	//////////////////////////////////////////////////////////////////////////
	// Public API
	//////////////////////////////////////////////////////////////////////////
	
	internal Void init() { send([#doInit,Unsafe([,])].toImmutable) }
	
	@Operator FantomProject? get(IProject project) { runInManager(#doGet, [project]) }
	
	FantomProject? getByPod(Str podName) { runInManager(#doGetByPod, [podName]) }
	
	FantomProject[] listProjects() { runInManager(#doListProjects, [,]) }

	** SlimerDude - Apr 2020 - A beta feature to cut down on build thrashing
	** 'cos I dunno why we need ALL projects as dependencies!? 
	FantomProject[] listReferencedProjects(Str podName) { runInManager(#doListReferencedProjects, [podName]) }

	//////////////////////////////////////////////////////////////////////////
	// Method handlers
	//////////////////////////////////////////////////////////////////////////
	
	private Obj? runInManager(Method method, Obj?[] args) { marker ? method.callOn(this,args) : send([method,Unsafe(args)].toImmutable).get }
	
	private Void doNotify(WorkspaceChange change) {
		// we need to reset containers for all projects that depend on 
		// closed or opened projects and for all projects with updated content
		projectsToUpdate := [Str:IProject][:]
		
		//add opened projects
		change.openedProjects.each |IProject p| {
			if (isFantomProject(p)) addProject(p)
		}
		
		[change.closedProjects, change.openedProjects].flatten.each |IProject p| {
			dependentProjects(p).each |IProject d| {
				projectsToUpdate[d.getName] = d 
			}
		}

		// add updated and opened projects to projectsToUpdate
		[change.updatedProjects, change.openedProjects].flatten.each |IProject p| { 
			if(isFantomProject(p)) projectsToUpdate[p.getName] = p 
		}
		
		// now we need to exclude all removed projects for this list
		projectsToUpdate = projectsToUpdate.exclude |v, k| {
			change.closedProjects.any { getName == k }
		}

		// remove all closed projects
		change.closedProjects.each |p| { removeProject(p) }
		
		// buildfanChanged(change.updatedProjects.first)
		projectsToUpdate.vals.each |p| {
			addProject(p)
		}
		
		projectsToUpdate.vals.each |p| {
			resetter.reset(p)
		}
	}
	
	private Bool isFantomProject(IProject p) {
		if (!p.exists) return projects[getKey(p)] != null
		return p.getNature(F4Nature.id) != null
	}
	
	private Void removeProject(IProject p) {
		key := getKey(p)
		fp  := projects[key]
		if (fp == null) return
		projects.remove(key)
		pods.remove(fp.podName)
	}
	
	private static Str getKey(IProject p) { p.getName }
	
	private FantomProject addProject(IProject p) {
		fp := FantomProject.makeFromProject(p)
		removeProject(p)
		projects[getKey(p)] = fp
		pods[fp.podName] = fp
		return fp
	}
	
	private IProject[] dependentProjects(IProject project) {
		fp := projects[getKey(project)]
		if(fp == null) return IProject[,]
		podName := fp.podName
		ps := projects
		return ps.vals.findAll |p| {
			p.rawDepends.any |d| {
				d.name == podName
			}
		}.map { it.project }
	}
	
	private FantomProject? doGet(IProject project) {
		// SlimerDude - Apr 2020 - not sure why a null location prevents us from returning the project?
		if (project.getLocation == null) {
			echo("location is null for project $project.getName")
			return null
		}
		key := getKey(project)
		if (projects.containsKey(key)) return projects[key]
		return addProject(project)
	}

	private Void doInit() {
		setMarker
		DLTKCore.create(ResourcesPlugin.getWorkspace.getRoot).getScriptProjects(F4Nature.id).each |IScriptProject sp| {
			addProject(sp.getProject)
		}
	}
	
	private FantomProject[] doListProjects() { projects.vals.dup.toImmutable }
	
	private FantomProject? doGetByPod(Str podName) { pods[podName] }

	private FantomProject[] doListReferencedProjects(Str podName) {
		fp := pods[podName]
		projs := fp.project.getReferencedProjects.map { doGet(it) }.exclude { it == null }
		return projs
	}
	
	//////////////////////////////////////////////////////////////////////////
	// Private hepler methods
	//////////////////////////////////////////////////////////////////////////
	
	private FantomProject? createProject(IProject project) {
		try	{
			return FantomProject.makeFromProject(project)
		} catch (Err e) {
			e.trace
			return null
		}
	}
	
	//////////////////////////////////////////////////////////////////////////
	// Locals-backed properties
	//////////////////////////////////////////////////////////////////////////
	
	** Fantom projects by location
	private Str:FantomProject projects() {
		locals.getOrAdd("projects") |->Obj| { [Str:FantomProject][:] }
	}
	
	** Fantom projects by pod name
	private Str:FantomProject pods() {
		locals.getOrAdd("pods") |->Obj| { [Str:FantomProject][:] }
	}
	
	private Bool marker() { locals[toStr] as Bool ?: false }
	private Void setMarker() { locals[toStr] = true }
}
