using [java]org.eclipse.core.runtime.preferences::AbstractPreferenceInitializer
using [java]org.eclipse.core.runtime.preferences::DefaultScope
using [java]org.eclipse.core.resources::IProject
using [java]org.eclipse.dltk.core::PreferencesLookupDelegate
using f4core::FantomProject

class PathEnvPrefs {
	static const Str useEnvVarName		:= "useEnvVar"
	static const Str fanEnvPathName		:= "fanEnvPath"
	
	private PreferencesLookupDelegate	delegate
	private IProject 					project
	private Str 						qualifier
	
	new make(FantomProject project)	{
		this.project	= project.project
		this.delegate	= PreferencesLookupDelegate(this.project)
		this.qualifier	= PathEnvPlugin.id
	}
	
	Bool useEnvVar() { 
		delegate.getBoolean(qualifier, useEnvVarName)
	}
	
	Str fanEnvPath() {
		delegate.getString(qualifier, fanEnvPathName)
	}
}

class PathEnvPrefsInitializer : AbstractPreferenceInitializer {
	override Void initializeDefaultPreferences() {
		store := DefaultScope().getNode(PathEnvPlugin.id)

		store.putBoolean(PathEnvPrefs.useEnvVarName, true)
		store.put		(PathEnvPrefs.fanEnvPathName, Env.cur.vars["FAN_ENV_PATH"] ?: "")
	}
}