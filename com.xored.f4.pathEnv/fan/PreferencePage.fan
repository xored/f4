using [java]org.eclipse.core.resources::IProject
using [java]org.eclipse.ui.preferences::IWorkbenchPreferenceContainer

using [java]org.eclipse.dltk.ui::PreferencesAdapter
using [java]org.eclipse.dltk.ui.preferences::AbstractOptionsBlock
using [java]org.eclipse.dltk.ui.preferences::PreferenceKey
using [java]org.eclipse.dltk.ui.preferences::ControlBindingManager
using [java]org.eclipse.dltk.ui.util::IStatusChangeListener
using [java]org.eclipse.dltk.ui.util::SWTFactory
	
using [java]org.eclipse.swt.widgets::Control
using [java]org.eclipse.swt.widgets::Button
using [java]org.eclipse.swt.widgets::Composite
using [java]org.eclipse.swt.layout::GridData
using [java]org.eclipse.swt.graphics::Font
using [java]org.eclipse.swt::SWT
using [java]java.util::ArrayList

using [java]org.eclipse.jface.preference::IPreferenceStore

using [java]com.xored.f4.builder.ui::AbstractConfigurationBlockPropertyAndPreferencePageBridge as Base
using [java]fanx.interop::Interop

class PreferencePage : Base {	
	override Str? getPropertyPageId		:= "${PathEnvPlugin.id}.propertyPage"
	override Str? getPreferencePageId	:= "${PathEnvPlugin.id}.preferencePage"
	override Str? getHelpId				:= null
	override Str? getProjectHelpId		:= null
	
	override protected Str? getDefaultDescription					:= "Path_Env preferences"
	override protected IPreferenceStore? getDefaultPreferenceStore	:= null
	
	override protected AbstractOptionsBlock? createOptionsBlock(IStatusChangeListener? context, IProject? project, IWorkbenchPreferenceContainer? container) {
		EnvOptionsBlock(context, project, container)
	}
}

class EnvOptionsBlock : AbstractOptionsBlock {

	new make(IStatusChangeListener? context, IProject? project,	IWorkbenchPreferenceContainer? container) : super(context, project, allKeys, container) { }
	
	override protected Control? createOptionsBlock(Composite? parent) {
		composite := SWTFactory.createComposite(parent, parent.getFont, 1, 1, GridData.FILL_HORIZONTAL)

		group := SWTFactory.createGroup(composite, "FAN_ENV_PATH value", 4, 1, GridData.FILL_HORIZONTAL)
		SWTFactory.createLabel(group, "Multiple dirs may be specified using your OS's path separator", 4)

		radio1 := SWTFactory.createRadioButton(group, "Use FAN_ENV_PATH environment variable", 4)
		radio2 := SWTFactory.createRadioButton(group, "Use:", 1)
		text := SWTFactory.createSingleText(group, 3)
		SWTFactory.createLabel(group, "The 'Work Dir' is always the first path in the list", 4)
	
		SWTFactory.createLabel(composite, "", 1)
		SWTFactory.createLabel(composite, "Note: Pods will be published the 'Work Dir'", 1)

		// stoopid private field
		bindManagerField := Interop.toJava(AbstractOptionsBlock#).getDeclaredField("bindManager")
		bindManagerField.setAccessible(true)
		bindManager := (ControlBindingManager) bindManagerField.get(this)
		bindManager.bindRadioControl(radio1, useEnvVarKey.getQualifier, "true", null)
		bindManager.bindRadioControl(radio2, useEnvVarKey.getQualifier, "false", [text])
		bindManager.bindControl(text, fanEnvPathKey, null)

		// stoopid private field
		KeysField := Interop.toJava(AbstractOptionsBlock#).getDeclaredField("keys")
		KeysField.setAccessible(true)
		keys := (ArrayList) KeysField.get(this)
		allKeys.each { keys.add(it) }

		return composite
	}
	
	static PreferenceKey useEnvVarKey() {
		PreferenceKey(PathEnvPlugin.id, PathEnvPrefs.useEnvVarName)
	}

	static PreferenceKey fanEnvPathKey() {
		PreferenceKey(PathEnvPlugin.id, PathEnvPrefs.fanEnvPathName)
	}
	
	static PreferenceKey[] allKeys() {
		[useEnvVarKey, fanEnvPathKey]
	}
}


