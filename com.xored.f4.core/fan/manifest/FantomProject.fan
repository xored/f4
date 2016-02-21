//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//	 ivaninozemtsev Apr 19, 2010 - Initial Contribution
//

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
using concurrent

**
** Models a Fantom project
**
const class FantomProject {
	private static const Str[] disabledDirs := ["CVS"]
	
	const Str		podName
	const Str		summary		:= ""
	const Version	version		:= Version.defVal

	** base directory for script and resource folders
	const File		baseDir 

	** The interpreter installation dir, also known as '%FAN_HOME%'
	const File		fanHomeDir

	** absolute path of output directory
	const File		outDir 
	const Uri?		rawOutDir
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
	Err[] resolveErrs {
		get { resolveErrsRef.val }
		set { resolveErrsRef.val = it }
	}

	private const Unsafe iProjectHolder
	IProject project() {
		iProjectHolder.val
	}

	new makeFromProject(IProject project) {
		iProjectHolder	= Unsafe(project)
		baseDir 		= PathUtil.resolveRes(project)
		projErrs		:= ProjectErr[,]

		fanHomePath		:= interpreterInstall?.getInstallLocation?.getPath
		fanHomeDir		= fanHomePath != null ? PathUtil.fanHome(fanHomePath).toFile : Env.cur.homeDir
		
		Manifest? manifest := null
		try {
			manifest = Manifest(this)
		} catch(Err e) {
			projErrs.add(ProjectErr(e.toStr))
			projectErrs	= projErrs
			podName		= "<unknown>"
			outDir		= baseDir
			rawOutDir	= `./`
			return
		}
		
		if (manifest.podName != null)
			podName = manifest.podName
		else {
			podName = "<unknown>"
			projErrs.add(ProjectErr("Pod name is not set"))
		}
		
		outDir		= getOutDir(project, manifest)
		rawOutDir	= manifest.outDir
		version		= manifest.version
		summary		= manifest.summary
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
		isPlugin	= project.getNature(IBundleProjectDescription.PLUGIN_NATURE) != null
		if (!isPlugin && isOutputNotSet) {
			projErrs.add(ProjectErr("Output folder is not set"))
		}
		projectErrs		= projErrs
	}
	
	Bool isOutputNotSet() {
		javaProject.getOutputLocation.equals(javaProject.getPath)
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
	
	** Absolute locations of required pods
	** Used by com.xored.f4.jdt.launching::FanJavaContainer --> Fantom Native Libraries (Java)
	Str:File depends() {
		buildPathFiles := (Str:File) scriptProject.getResolvedBuildpath(false).findAll |IBuildpathEntry bp->Bool| {
			!bp.getPath.segments.first.toStr.startsWith(IBuildpathEntry.BUILDPATH_SPECIAL)
		}
		.map |IBuildpathEntry bp -> File?| {
			switch(bp.getEntryKind) {
				case IBuildpathEntry.BPE_PROJECT:
					projectName := bp.getPath.segments.first
					project := ResourcesPlugin.getWorkspace.getRoot.getProject(projectName)
					if (project.isAccessible) {
						fp := FantomProjectManager.instance[project]
						return (fp.outDir.uri + `${fp.podName}.pod`).toFile
					}
					// Return null if project is not accessible
					return null
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
		
		podFiles := resolvePods.rw.setAll(buildPathFiles)
		return podFiles
	}

	Uri[] srcDirs() {
		unfoldDirs(scriptProject.getResolvedBuildpath(false).findAll |IBuildpathEntry bp -> Bool| {
			bp.getEntryKind == IBuildpathEntry.BPE_SOURCE
		}.map |IBuildpathEntry bp -> Uri| {
			bp.getPath.segments[1..-1].reduce(`./`) |Uri r, Str s -> Uri| { r.plusName(s, true) }
		}, baseDir.uri).sort
	}
	
	Str:File resolvePods() {
		compileEnv	:= compileEnv
		podFiles	:= compileEnv.resolvePods.rw
		resolveErrs	= compileEnv.resolveErrs.toImmutable

		// overwrite entries with workspace pods
		FantomProjectManager.instance.listProjects.each |FantomProject p| {
			if (podFiles.containsKey(p.podName))
				podFiles[p.podName] = (p.outDir.uri + `${p.podName}.pod`).toFile
		}
		return podFiles
	}	
	
	IScriptProject scriptProject() { DLTKCore.create(project) }
	
	IFanNamespace ns() {
		DltkNamespace(this)
	}
	
	ProjectPrefs prefs() {
		ProjectPrefs(this)
	}
	
	CompileEnv compileEnv() {
		// create a new Env everytime so we don't have to hook into preference change listeners
		return prefs.compileEnvType.make([this])
	}
	
	//////////////////////////////////////////////////////////////////////////
	// Private helper methods
	//////////////////////////////////////////////////////////////////////////

	private File getOutDir(IProject project, Manifest manifest) {
		if (isPlugin)
			return resolveOutDir(baseDir.uri, manifest.outDir) ?: baseDir
		
		try	return (File.os(ResourcesPlugin.getWorkspace.getRoot.getFolder(javaProject.getOutputLocation).getLocation.toFile.getAbsolutePath).uri.plusSlash).toFile
		catch return baseDir
	}

	private File? resolveOutDir(Uri baseDir, Uri? outDir) {
		if(outDir != null) {
			result := outDir.isAbs ? outDir : (baseDir + outDir)
			return result.toFile
		}
		
		path := interpreterInstall?.getInstallLocation?.getPath
		if (path != null)
			return PathUtil.libByInterpreter(path)
		
		return null
	}
	
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
