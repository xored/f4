using f4core
using [java]org.eclipse.core.runtime.preferences::AbstractPreferenceInitializer
using [java]org.eclipse.core.runtime.preferences::DefaultScope
using [java]org.eclipse.core.resources::IProject
using [java]com.xored.fanide.core::FanCore
using [java]org.eclipse.dltk.core::PreferencesLookupDelegate
class BuilderPrefs
{
  static const Str useExternalBuilder := "useExternalBuilder"
  static const Str buildDependants := "buildDependants"
  private PreferencesLookupDelegate delegate
  private Str qualifier := CompileFan.pluginId
  private IProject project
  private new make(IProject project) 
  { 
    this.project = project
    delegate = PreferencesLookupDelegate(project)
  }
  
  
  static BuilderPrefs get(FantomProject proj) 
  {
    return BuilderPrefs(proj.project) 
  }
  
  Bool isUseExternalBuilder() 
  { 
    delegate.getBoolean(qualifier, useExternalBuilder)
  }
  
  Bool isBuildDependants() { delegate.getBoolean(qualifier, buildDependants) }
  
}

class BuilderPrefsInitializer : AbstractPreferenceInitializer
{
  override Void initializeDefaultPreferences() 
  {
    store := DefaultScope().getNode(CompileFan.pluginId)
    store.putBoolean(BuilderPrefs.useExternalBuilder, false)
    store.putBoolean(BuilderPrefs.buildDependants, true)
  }
}