using [java]org.eclipse.core.resources::IProject
using [java]org.eclipse.core.resources::ResourcesPlugin
using [java]org.eclipse.jdt.core::JavaCore
using [java]org.eclipse.jdt.core::IJavaProject
using [java]org.eclipse.jdt.core.search::IJavaSearchScope
using [java]org.eclipse.jdt.core.search::SearchEngine
using [java]org.eclipse.jdt.launching::IRuntimeClasspathEntry
using [java]org.eclipse.jdt.launching::JavaRuntime
using [java]org.eclipse.dltk.launching::IInterpreterInstall
using [java]org.eclipse.dltk.launching::ScriptRuntime
using [java]org.eclipse.dltk.core::DLTKCore
using [java]org.eclipse.dltk.core::IScriptProject
using [java]org.eclipse.dltk.core::PreferencesLookupDelegate
using [java]org.eclipse.dltk.core::IBuildpathEntry
using [java]org.eclipse.pde.core.project::IBundleProjectDescription
using f4model
using concurrent::AtomicBool
using concurrent::AtomicRef
using concurrent::Actor
using concurrent::ActorPool
using concurrent::Future

**
** Models a Fantom project
**
const class FantomProject {
	private static const Str[] disabledDirs := ["CVS"]
	
	const Str		podName 
	const Str		summary		:= ""
	const Version	version		:= Version.defVal

	const File		projectDir
	
	const Uri?		podOutDir		
	const Depend[]	rawDepends	:= Depend#.emptyList
	const Uri[]		resDirs		:= Uri#.emptyList
	const Uri[]		jsDirs		:= Uri#.emptyList
	const Uri[]		javaDirs	:= Uri#.emptyList
	const Str:Obj	index		:= Str:Obj[:]
	const Str:Str	meta		:= Str:Str[:]
	const Bool		docApi 		:= true
	const Bool		docSrc 		:= true
	const Bool		isPlugin
	
	const ProjectErr[] projectErrs	:= ProjectErr[,]
	
	** This is set / cleared by com.xored.f4.builder::CompileFan.build() after a pod compilation. 
	private const AtomicBool hasBuildErrsRef := AtomicBool(false)
	Bool hasBuildErrs {
		get { hasBuildErrsRef.val }
		set { hasBuildErrsRef.val = it }
	}

	private const AtomicRef resolveErrsRef := AtomicRef(Err#.emptyList)
	Err[] resolveErrs() {
		resolveErrsRef.val
	}

	private const Unsafe iProjectRef
	IProject project() {
		iProjectRef.val
	}

	new makeFromProject(IProject project) {
		iProjectRef		= Unsafe(project)
		projectDir 		= PathUtil.resolveRes(project)
		
		projErrs		:= ProjectErr[,]
		Manifest? manifest := null
		try {
			manifest = Manifest(this)
		} catch(Err e) {
			projErrs.add(ProjectErr(e.toStr))
			projectErrs	= projErrs
			podName		= "<unknown>"
			return
		}
		
		if (manifest.podName != null)
			podName = manifest.podName
		else {
			podName = "<unknown>"
			projErrs.add(ProjectErr("Pod name is not set"))
		}
		
		version		= manifest.version
		summary		= manifest.summary
		podOutDir	= manifest.outPodDir
		resDirs		= manifest.resDirs
		jsDirs		= manifest.jsDirs
		javaDirs	= manifest.javaDirs
		meta		= manifest.meta.dup
		index		= manifest.index.dup
		docApi		= manifest.docApi
		docSrc		= manifest.docSrc
		rawDepends	= manifest.depends.reduce(Depend[,]) |Depend[] r, Str raw -> Depend[]| {
			depend := Depend.fromStr(raw, false)
			if (depend != null)
				r.add(depend)
			else
				projErrs.add(ProjectErr("Can't parse depend $raw", manifest.lines["depends"]))
			return r
		}
		isPlugin		= project.getNature(IBundleProjectDescription.PLUGIN_NATURE) != null
		projectErrs		= projErrs
	}
	
	** The interpreter installation dir, also known as '%FAN_HOME%'.
	File fanHomeDir() {
		// this is calculated dynamically so it picks up changes to the Interpreter Library location
		fanHomePath	:= interpreterInstall?.getInstallLocation?.getPath
		fanHomeDir	:= fanHomePath != null ? PathUtil.fanHome(fanHomePath).toFile : Env.cur.homeDir
		return fanHomeDir
	}
	
	** The output pod file that gets built.
	File podOutFile() {
		podDir := (podOutDir != null) ? projectDir + podOutDir : prefs.podOutputDir
		return podDir.uri.plusSlash.plusName("${podName}.pod").toFile.normalize		
	}
	
	** The 'build.fan' file.
	File buildFile() {
		(projectDir + `build.fan`).normalize
	}

	IInterpreterInstall? interpreterInstall() {
		ScriptRuntime.getInterpreterInstall(scriptProject)
	}
	
	File[] classpath() {
		javaProj	:= javaProject
		entries		:= JavaRuntime.computeUnresolvedRuntimeClasspath(javaProject)
		resolved	:= IRuntimeClasspathEntry[,]
		entries.each |entry| {
			resolved.addAll(JavaRuntime.resolveRuntimeClasspathEntry(entry, javaProject))
		}
		return resolved.map { File.os(it.getLocation) }
	}
	
	IJavaProject javaProject() {
		JavaCore.create(project)
	}
	
	//////////////////////////////////////////////////////////////////////////
	// Build info
	//////////////////////////////////////////////////////////////////////////	
	
	private const AtomicRef classpathDependsRef := AtomicRef(null)
	Str:File classpathDepends() {
		if (classpathDependsRef.val == null)
			update
		return classpathDependsRef.val
	}
	
	** (SlimerDude Jun 2016) - not really sure what this returns.
	** Seems to be absolute locations of required pods
	** Used by com.xored.f4.jdt.launching::FanJavaContainer --> Fantom Native Libraries (Java)
	** 
	** (SlimerDude Apr 2020) - also by
	**   - IProject.getReferencedProjects() 
	**     - called by f4jdtLaunching.FanJavaContainer.getClasspathEntries()
	**       - called by f4core.FantomProjectManager.doListReferencedProjects()
	private Str:File doClasspathDepends() {
		entries := IBuildpathEntry?[,]
		
		try	entries = scriptProject.getResolvedBuildpath(false)
		catch (Err err)
			// F4 hangs when getResolvedBuildpath() errors - usually when there's an unknown Java JDK
			resolveErrsRef.val = resolveErrs.rw.add(err).toImmutable

		buildPathFiles	:= (Str:File) entries.findAll |IBuildpathEntry bp->Bool| {
			!bp.getPath.segments.first.toStr.startsWith(IBuildpathEntry.BUILDPATH_SPECIAL)
		}
		.map |IBuildpathEntry bp -> File?| {
			switch(bp.getEntryKind) {
				case IBuildpathEntry.BPE_PROJECT:
					projectName	:= bp.getPath.segments.first
					project		:= ResourcesPlugin.getWorkspace.getRoot.getProject(projectName)
					return project.isOpen && project.isAccessible
						? FantomProjectManager.instance.get(project).podOutFile
						: null

				case IBuildpathEntry.BPE_LIBRARY:
					// libs are gotten from an older, cached, and workspace wide version of Interpreter libs (Fantom-1.0.68)
					// whereas we want libs specific to this project, so return null here and add our resolved pods
					// return PathUtil.resolveLibPath(bp)
					return null

				default:
					return null
			}
		}
		.exclude {it == null}
		.reduce([Str:File][:]) | Str:File r, File v -> Str:File | {
			r[v.basename] = v
			return r
		}

		podFiles := resolvedPods.rw.setAll(buildPathFiles)
		return podFiles
	}

	Uri[] srcDirs() {
		unfoldDirs(scriptProject.getResolvedBuildpath(false).findAll |IBuildpathEntry bp -> Bool| {
			bp.getEntryKind == IBuildpathEntry.BPE_SOURCE
		}.map |IBuildpathEntry bp -> Uri| {
			bp.getPath.segments[1..-1].reduce(`./`) |Uri r, Str s -> Uri| { r.plusName(s, true) }
		}, projectDir.uri).sort
	}  
	
	
	private const AtomicRef resolvedPodsRef := AtomicRef(null)
	Str:File resolvedPods() {
		if (resolvedPodsRef.val == null)
			update
		return resolvedPodsRef.val
	}

	** Reset so we lazily resolve pods when needed
	Void reset() {
		this.resolvedPodsRef.val	 = null
		this.classpathDependsRef.val = null		
	}

	** The workspace has changed somehow (projects updates) and we're involved somehow
	private Void update() {
		podFiles := doResolvePods.rw

		// overwrite entries with workspace pods
		dependentProjects.each {
			podFiles[it.podName] = it.podOutFile
		}

		// prevent errs such as "Project cannot reference itself: poo"
		podFiles.remove(podName)
		
		this.resolvedPodsRef.val	 = podFiles.toImmutable
		this.classpathDependsRef.val = doClasspathDepends.toImmutable
	}
	
	FantomProject[] dependentProjects() {
		projectManager := FantomProjectManager.instance
		return projectManager.dependentProjects(this)
	}
	
	IScriptProject scriptProject() { DLTKCore.create(project) }
	
	IFanNamespace ns() {
		DltkNamespace(this, podName)
	}
	
	ProjectPrefs prefs() {
		ProjectPrefs(this)
	}
	
	private const AtomicRef	resolvePodsRef		:= AtomicRef()
	private const AtomicRef	resolveFutureRef	:= AtomicRef()
	private Str:File doResolvePods() {
		// coalesce multiple calls into one
		future := resolveFutureRef.val as Future
		if (future == null) {		
			future = Synchronized(ActorPool()).async |->Obj?| {
				resolvedPods		:= compileEnv.resolvePods
				resolvePodsRef.val	= resolvedPods.toImmutable
				resolveErrsRef.val	= compileEnv.resolveErrs.toImmutable
				return resolvedPods
			}
			resolveFutureRef.val = future
		}

		// if there was an error, be sure to create a new future 
		try return future.get
		finally resolveFutureRef.val = null
	}
	
	private const AtomicRef	compileEnvRef := AtomicRef()
	CompileEnv compileEnv() {
		// only bother making a new one if the type / preferences change
		// this may make a difference for FpmEnv which reads file config
		if (compileEnvRef.val?.typeof != prefs.compileEnvType)
			compileEnvRef.val = prefs.compileEnvType.make([this])
		return compileEnvRef.val
	}

	
	
	// ---- Private helper methods ----

	private Uri[] unfoldDirs(Uri[] dirs, Uri baseDir) {
		result := Uri[,]
		result.addAll(dirs)
		dirs.each |dir|	{
			fullPath := (baseDir + dir).toFile
			result.addAll(
				unfoldDirs(fullPath.listDirs.exclude { disabledDirs.contains(it.basename) }.map { it.uri.relTo(baseDir)}, baseDir)
			)
		}
		return result
	}
	
	override Str toStr() { podName }
}

**************************************************************************
** ProjectErr
**************************************************************************
const class ProjectErr {
	const Str msg
	const Int line

	new make(Str msg, Int line := -1) {
		this.msg	= msg
		this.line	= line
	}
}
