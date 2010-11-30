using f4core
using [java]org.eclipse.core.runtime.preferences::AbstractPreferenceInitializer
using [java]org.eclipse.core.resources::IProject
using [java]com.xored.fanide.core::FanCore
using [java]org.eclipse.dltk.core::PreferencesLookupDelegate
class BuilderPrefs
{
  static const Str useExternalBuilder := "useExternalBuilder"

  private PreferencesLookupDelegate delegate
  private Str qualifier := FanCore.PLUGIN_ID
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
  
  
}

class BuilderPrefsInitializer : AbstractPreferenceInitializer
{
  override Void initializeDefaultPreferences() 
  {
    store := FanCore.getDefault.getPluginPreferences
    store.setDefault(BuilderPrefs.useExternalBuilder, false)
  }
}