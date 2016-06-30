using [java]org.eclipse.core.runtime.preferences::AbstractPreferenceInitializer
using [java]org.eclipse.core.runtime.preferences::DefaultScope
using [java]org.eclipse.core.resources::IProject
using [java]com.xored.fanide.core::FanCore
using [java]org.eclipse.dltk.core::PreferencesLookupDelegate

class ProjectPrefs {
	static const Str qualifier				:= "com.xored.f4.core"	// from com.xored.f4.builder::CompileFan.pluginId
	static const Str podOutputDirName		:= "podOutputDir"
	static const Str useExternalBuilderName	:= "useExternalBuilder"
	static const Str buildDependantsName	:= "buildDependants"
	static const Str publishPodName			:= "publishPod"
	static const Str compileEnvName			:= "compileEnv"
	
	private PreferencesLookupDelegate	delegate
	private FantomProject				project
	
	new make(FantomProject project) { 
		this.project	= project
		this.delegate	= PreferencesLookupDelegate(project.project)
	}
	
	File podOutputDir() { 
		dirStr := delegate.getString(qualifier, podOutputDirName)
		dirUri := dirStr.contains("\\") ? File.os(dirStr).uri : dirStr.toUri
		if (dirUri.isAbs || dirUri.isPathAbs)
			return dirUri.plusSlash.toFile
		return project.projectDir.plus(dirUri.plusSlash, true)
	}
	
	Bool useExternalBuilder() { 
		delegate.getBoolean(qualifier, useExternalBuilderName)
	}
	
	Bool publishPod() {
		delegate.getBoolean(qualifier, publishPodName)
	}

	Type compileEnvType() {
		name := delegate.getString(qualifier, compileEnvName)
		type := Type.find(name)
		return type
	}
}

class ProjectPrefsInitializer : AbstractPreferenceInitializer {
	override Void initializeDefaultPreferences() {
		store := DefaultScope().getNode(ProjectPrefs.qualifier)
		store.put		(ProjectPrefs.podOutputDirName,			"bin/")
		store.putBoolean(ProjectPrefs.useExternalBuilderName,	false)
		store.putBoolean(ProjectPrefs.buildDependantsName,		true)
		store.putBoolean(ProjectPrefs.publishPodName,			false)
		store.put		(ProjectPrefs.compileEnvName,			DefaultCompileEnv#.qname)
	}
}
