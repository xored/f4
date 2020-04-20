using [java] org.eclipse.debug.core
using [java] org.eclipse.jdt.launching
using [java] org.eclipse.dltk.launching::ScriptLaunchConfigurationConstants
using [java] org.eclipse.dltk.launching::AbstractScriptLaunchConfigurationDelegate
using [java] org.eclipse.dltk.launching::ScriptRuntime
using [java] java.net::URL
using [java] java.util::Map
using [java] java.util::HashMap
using [java] java.util::ArrayList
using [java] fanx.interop::Interop
using [java] org.eclipse.jface.dialogs::MessageDialog
using [java] org.eclipse.swt.widgets::Shell
using [java] org.eclipse.swt.widgets::Display
using [java] org.eclipse.ui::PlatformUI
using f4launching
using f4core

class JavaLaunchUtil {
	
	static Void config(ILaunchConfiguration? src, ILaunchConfigurationWorkingCopy? target, Str mode, Str mainLaunchType) {
		scriptName	:= AbstractScriptLaunchConfigurationDelegate.getScriptProjectName(src)
		interpreter := ScriptRuntime.computeInterpreterInstall(src)
		fanHome 	:= PathUtil.fanHome(interpreter.getInstallLocation.getPath)		
		projHome	:= PathUtil.resolvePath(AbstractScriptLaunchConfigurationDelegate.getProject(src).getFullPath)
		
		target.setAttribute( IJavaLaunchConfigurationConstants.ATTR_WORKING_DIRECTORY, 
		   src.getAttribute(ScriptLaunchConfigurationConstants.ATTR_WORKING_DIRECTORY,	projHome.osPath))
		target.setAttribute( IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME,		scriptName)
		target.setAttribute( IJavaLaunchConfigurationConstants.ATTR_MAIN_TYPE_NAME,		mainLaunchType)
		
		args := Str[,]
		args.add(LaunchConfigDelegate.fanClassName(src))
		
		Str scriptArgs := LaunchConfigDelegate.getArgs(src).trim
		if (!scriptArgs.isEmpty) { args.add(scriptArgs) }
		
		target.setAttribute(IJavaLaunchConfigurationConstants.ATTR_PROGRAM_ARGUMENTS, args.join(" "))
		vmArgs := [LaunchConfigDelegate.getVMArgs(src)]
		vmArgs.add("-Dfan.home=\"$fanHome.toFile.osPath\"")
		target.setAttribute(IJavaLaunchConfigurationConstants.ATTR_VM_ARGUMENTS, vmArgs.join(" "))
	}

	static Void setSourceLocator(ILaunch? launch, ILaunchConfiguration? config, ILaunchManager? manager) {
		if (launch.getSourceLocator == null) {
			sourceLocator := SourceDirectorManager.create
			if (sourceLocator == null) return
			
			sourceLocator.setSourcePathComputer(manager.getSourcePathComputer(SourcePathComputer.id))
			sourceLocator.initializeDefaults(config)
			launch.setSourceLocator(sourceLocator)
		}
	}
	
	static Str?[]? classpath(ILaunchConfiguration? config, Str?[]? base) {
		list := base
		result := Str?[,]
		list.each |s| {
			if (!s.contains(".fantom.sys") && !s.endsWith(".pod"))
				result.add(s)
		}
		return result
	}
	
	static Str?[]? environment(ILaunchConfiguration? config, Str?[]? base) {
		iProj		:= AbstractScriptLaunchConfigurationDelegate.getProject(config)
		proj		:= FantomProjectManager.instance.get(iProj)
		compileEnv	:= proj.compileEnv

		copy		:= config.getWorkingCopy
		configEnv	:= (Map) copy.getAttribute(ILaunchManager.ATTR_ENVIRONMENT_VARIABLES, HashMap())
		envVars		:= Str:Str[:]
		configEnv.keySet.toArray.each {
			envVars[it] = configEnv.get(it)
		}
		
		envVars["FAN_ENV_PODS"] = getPodLocations(findOpenProjects(proj, config))
		compileEnv.tweakLaunchEnv(envVars)
		
		// copy envVars back into the Java config
		configEnv.clear
		envVars.each |val, key| { configEnv.put(key, val) }
		copy.setAttribute(ILaunchManager.ATTR_ENVIRONMENT_VARIABLES, configEnv)

		// copy f4launchEnv.pod to FAN_HOME (Env Classes need to be in FAN_HOME, not WORK_DIR)
		envPodUrl := compileEnv.envPodUrl
		if (envPodUrl != null) {
			// top tip from http://blog.vogella.com/2010/07/06/reading-resources-from-plugin/
			interpreter	:= ScriptRuntime.computeInterpreterInstall(config)
			fanHome		:= PathUtil.fanHome(interpreter.getInstallLocation.getPath)
			f4EnvPod	:= fanHome.plusSlash.plus(`lib/fan/`).plusName(envPodUrl.name).toFile.normalize

			// let people (i.e. me!) override / provide their own pods.
			// example, the official afFpm.pod will always be more up to date than the F4 plugin 
			// future pod versions should rename themselves, e.g. env.pod, env2.pod, etc...
			if (!f4EnvPod.exists) {
				try {
					url			:= URL(envPodUrl.encode)
					inStream	:= (InStream) Interop.toFan(url.openConnection.getInputStream)
					f4EnvBuf	:= inStream.readAllBuf
					f4EnvPod.out.writeBuf(f4EnvBuf).close
				} catch (Err err) {
					compileEnv.buildConsole.warn("Could not copy '${envPodUrl.encode}' to: ${f4EnvPod.osPath}\n" + err.trace)
				}
			}
		}

		return DebugPlugin.getDefault.getLaunchManager.getEnvironment(copy)
	}

	static Bool confirmLaunch(ILaunchConfiguration config) {
		iProj		:= AbstractScriptLaunchConfigurationDelegate.getProject(config)
		proj		:= FantomProjectManager.instance.get(iProj)
		projsInErr	:= findOpenProjects(proj, config).findAll { it.hasBuildErrs }
		if (projsInErr.isEmpty)
			return true

		gogogo := true
		PlatformUI.getWorkbench.getDisplay.syncExec |->| {
				shell	:= PlatformUI.getWorkbench.getActiveWorkbenchWindow.getShell
				msg		:= "The following projects contain errors and have not been built:\n\n" + projsInErr.map { "  ${it.project.getName}" }.join("\n") + "\n\nOld pod versions will be used until errors are resolved.\n\nDo you wish to continue?"
				dialog	:= MessageDialog(shell, "Project Errors", null, msg, MessageDialog.WARNING, Str[,].add("Yes").add("No"), 0)
				gogogo	= dialog.open == 0
		}
		return gogogo
	}

	private static FantomProject[] findOpenProjects(FantomProject fp, ILaunchConfiguration config) {
		projectList := (Str[]) config.getAttribute(LaunchConsts.projectList, ArrayList()).toArray

		otherProjects := fp.prefs.referencedPodsOnly
			? FantomProjectManager.instance.listReferencedProjects(fp.podName)
			: FantomProjectManager.instance.listProjects

		return otherProjects
			.exclude { it.isPlugin }
			.findAll { projectList.isEmpty ? true : projectList.contains(it.podName) }
	}
	
	private static Str getPodLocations(FantomProject[] projects) {
		projects
			.findAll { it.podOutFile.exists }
			.map |FantomProject proj -> Str| {
				proj.podOutFile.osPath
			}.join(File.pathSep)
	}
}