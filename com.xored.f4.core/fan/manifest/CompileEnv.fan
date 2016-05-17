using [java]org.eclipse.dltk.logconsole::ILogConsole
using [java]org.eclipse.dltk.logconsole::LogConsoleType
using [java]org.eclipse.dltk.logconsole::LogConsolePlugin

** The extension point for pluggable environments.
const abstract class CompileEnv {

	** The Fantom Project this Env is associated with.
	const FantomProject? fanProj
	
	** A logger which logs to the 'Fantom Build Console'.
	const Log	buildConsole
	
	** Subclasses should provide a ctor that takes an optional Fantom Proj.
	** 
	**   new make(FantomProject? fanProj := null) : super.make(fanProj) { }
	new make(FantomProject? fanProj := null) {
		this.fanProj		= fanProj
		this.buildConsole	= ConsoleLogger()
	}
	
	** Used in the Env's preferences page.
	abstract Str label()

	** Used in the Env's preferences page.
	abstract Str description()
	
	** Resolves pods to compile against.
	abstract Str:File resolvePods()

	** (Optional)
	** Url of a pod that's required when running launches. 
	** Will be copied into the Interpreter's '/lib/fan/' dir. 
	virtual Uri? envPodUrl() { null }

	** (Optional)
	** Any Errs encountered when resolving.
	virtual  Err[] resolveErrs() { Err#.emptyList }

	** (Optional)
	** An opportunity to tweak environment variables for launched environments.
	virtual Void tweakLaunchEnv(Str:Str envVars) { }
	
	** (Optional)
	** Called to publish the pod on a successful build.
	virtual Void publishPod(File podFile) { }
	
	** Logs an err message in the 'Error Log' view.
	Void logErr(Str pluginId, Str? message, Err? e := null) {
		LogUtil.logErr(pluginId, message, e)
	}

	** Logs a warning message in the 'Error Log' view.
	Void logWarn(Str pluginId, Str? message, Err? e := null) {
		LogUtil.logWarn(pluginId, message, e)		
	}
}

internal const class ConsoleLogger : Log {
	new make() : super.make("console", false) { }

	override Void log(LogRec rec) {
		console.println("[${rec.level.toStr.upper.justl(5)}] ${rec.msg}".trimEnd)
	}
	
	static ILogConsole console() {
		LogConsolePlugin.getConsoleManager.getConsole(BuildConsole())
	}
}

internal class BuildConsole : LogConsoleType {
  new make() : super("com.xored.f4.builder") {}
  override Str? computeTitle(Obj? id) { "Fantom build" }
}
