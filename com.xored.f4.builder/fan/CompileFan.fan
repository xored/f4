using compiler
using f4core
using f4core::FantomProjectManager2

using [java]java.util::List as JList 
using [java]java.util::Set as JSet
using [java]org.eclipse.core.runtime
using [java]org.eclipse.core.resources::IFile
using [java]org.eclipse.core.resources::IResource
using [java]org.eclipse.core.resources::IProject
using [java]org.eclipse.core.resources::ResourcesPlugin
using [java]org.eclipse.dltk.compiler.problem::DefaultProblem
using [java]org.eclipse.dltk.compiler.problem::ProblemSeverities
using [java]org.eclipse.dltk.core
using [java]org.eclipse.dltk.core.builder
using [java]org.eclipse.core.filesystem::URIUtil
using [java]org.eclipse.jdt.core::JavaCore
using [java]org.eclipse.jdt.launching::JavaRuntime
using [java]org.eclipse.jdt.launching::IRuntimeClasspathEntry
using [java]org.eclipse.dltk.launching::LibraryLocation
using [java]com.xored.fanide.core.utils::FanProjectUtils
using [java]org.eclipse.dltk.launching::ScriptRuntime
using [java]org.eclipse.dltk.launching::IInterpreterInstall

using [java]org.eclipse.dltk.logconsole::ILogConsoleManager
using [java]org.eclipse.dltk.logconsole::ILogConsole
using [java]org.eclipse.dltk.logconsole::LogConsolePlugin
using [java]org.eclipse.dltk.logconsole::LogConsoleType

**************************************************************************
** CompileFan
**************************************************************************
**
** IScriptBuilder implementation to build Fantom projects
** 
class CompileFan : IScriptBuilder {
	static const Str pluginId := "com.xored.f4.builder"

	//////////////////////////////////////////////////////////////////////////
	// Interface methods
	//////////////////////////////////////////////////////////////////////////
	
	** Initialize before a build session
	override Bool initialize(IScriptProject? project) {
		return true
	}

	override Void prepare(IBuildChange? change, IBuildState? state, IProgressMonitor? m) { }

	override Void build(IBuildChange? change, IBuildState? state, IProgressMonitor? m) {
		if( m!= null && m.isCanceled) {
			return
		}

		fp := fantomProject(change.getScriptProject)
		
		buildPod(fp)
	}
	
	override Void clean(IScriptProject? project, IProgressMonitor? monitor)	{
		clearMarkers(project.getProject)
	} 

	override Void endBuild(IScriptProject? project, IBuildState? state, IProgressMonitor? monitor) {
		reporters.vals.each { it.flush }
		reporters.clear
		building = false
	}
	
	** Called for each resource required to build. Only resources with specified
	** project nature are here.
	IStatus? buildModelElements(IScriptProject? project, JList? elements, IProgressMonitor? monitor, Int status) {
		fp := fantomProject(project)
		buildPod(fp)
		return Status(IStatus.OK, pluginId, "OK")
	}
	
	private FantomProject[] projectsFromElements(ISourceModule[] modules) {
		modules.map { fantomProject(it.getScriptProject) }.unique
	}
	
	private Bool buildPod(FantomProject fp)	{
		building = true
		clearMarkers(fp.project)
		hasErrs := false
		IInterpreterInstall? install := ScriptRuntime.getInterpreterInstall(fp.scriptProject)
		
		if (install == null || !install.getInstallLocation.exists) {
			reportRuntimeError(fp.project)
			writeToLog
			return true
		}
		
		createBuilder(fp).build { writeToLog(it) }.each |err| {
			reportErr(err, fp.project)
			hasErrs = hasErrs || err.isErr
		}

		writeToLog // append empty line
		
		if (!hasErrs) refreshPod(fp)
		
		fp.hasBuildErrs = hasErrs
		return hasErrs
	}
	
	private Void writeToLog(Str entry := "") {
		getConsole.println(entry.trimEnd)
	}

	private Builder createBuilder(FantomProject fp) {
		fp.prefs.useExternalBuilder ? ExternalBuilder(fp) : InternalBuilder(fp) 
	}

	private Void refreshPod(FantomProject project) {
		podUri := project.podOutFile.normalize.uri.relTo(project.projectDir.normalize.uri)
		if (podUri.isAbs || podUri.toStr.startsWith(".."))
			return
		
		podFile	:= project.project.getFile(Path(podUri.toStr)) 
		try {
			podFile.refreshLocal(IResource.DEPTH_ZERO, null)
		} catch(Err e) { 
			LogUtil.logWarn(pluginId, "Internal err refreshing pod file", e);
		}
	}
	
	//////////////////////////////////////////////////////////////////////////
	// Helper methods
	//////////////////////////////////////////////////////////////////////////

	private FantomProject fantomProject(IScriptProject project) {
		FantomProjectManager2.instance.get(project.getProject)
	}

	//////////////////////////////////////////////////////////////////////////
	// Report errors methods
	//////////////////////////////////////////////////////////////////////////
	
	private IResource resource(IProject project, Str? file)	{
		if (file != null)  {
			IFile[] files := ResourcesPlugin.getWorkspace.getRoot.findFilesForLocationURI(URIUtil.toURI(Path(file).makeAbsolute))
			if (!files.isEmpty)
				return files.first
		}
		return project
	}
	
	private Str:ProblemReporter reporters := [Str:ProblemReporter][:]
	
	private Void reportErr(CompilerErr err, IProject project) {
		resource := resource(project, err.file)
		reporter := reporters.getOrAdd(resource.getLocationURI.toString) |->Obj| { ProblemReporter(resource) }
		reporter.reportProblem(
			DefaultProblem(
				resource.getLocation.toString, 
				err.msg, 
				0, //id (don't know what this means)
				Str[,], //arguments (don't know what this means)
				err.isWarn || err.msg == "No fan source files found"? ProblemSeverities.Warning : ProblemSeverities.Error, //severity
				-1, //start position
				-1, //end position
				err.line ?: 0
				)
			)
	}

	private Void reportRuntimeError(IProject project) {
		reporter := reporters.getOrAdd(project.getLocationURI.toString) |->Obj| { ProblemReporter(project) }
		reporter.reportProblem(
			DefaultProblem(
				project.getLocation.toString, 
				"Compilation of project ${project.getName} is not possible, there is no Fantom interpreter specified.", 
				0, //id (don't know what this means)
				Str[,], //arguments (don't know what this means)
				ProblemSeverities.Error, //severity
				-1, //start position
				-1, //end position
				-1
				)
			)
	}
	
	private Void clearMarkers(IProject project)	{
		project.deleteMarkers(F4Consts.buildProblem, true, IResource.DEPTH_INFINITE)
	}
	
	private ILogConsole getConsole() { console }
	
	private Bool building := false
	
	public static ILogConsole console() {
		LogConsolePlugin.getConsoleManager.getConsole(BuildConsole())
	}
}

class BuildConsole : LogConsoleType {
	new make() : super(CompileFan.pluginId) {}
	
	override Str? computeTitle(Obj? id) { "Fantom build" }
}
