using [java]org.eclipse.core.runtime.preferences::AbstractPreferenceInitializer
using [java]org.eclipse.core.runtime::Preferences
using [java]com.xored.fanide.core::FanCore
class BuilderPrefs
{
  static const Str useExternalBuilder := "useExternalBuilder"
  
  private Preferences prefs
  private new make(Preferences prefs) { this.prefs = prefs }
  
  static BuilderPrefs get() { BuilderPrefs(FanCore.getDefault.getPluginPreferences) }
  
  Bool isUseExternalBuilder() { prefs.getBoolean(useExternalBuilder) }
}

class BuilderPrefsInitializer : AbstractPreferenceInitializer
{
  override Void initializeDefaultPreferences() 
  {
    store := FanCore.getDefault.getPluginPreferences
    store.setDefault(BuilderPrefs.useExternalBuilder, false)
  }
}