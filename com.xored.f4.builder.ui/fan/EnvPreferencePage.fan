using f4builder

using [java]org.eclipse.core.runtime::Platform
using [java]org.eclipse.core.runtime::IConfigurationElement
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
using [java]com.xored.fanide.core::FanCore
using f4core::CompileEnv
using [java]fanx.interop::Interop

class EnvPreferencePage : Base {
	
	override Str? getPropertyPageId		:= "com.xored.f4.builder.ui.propertyPage.env"
	override Str? getPreferencePageId	:= "com.xored.f4.builder.ui.preferences.env"
	override Str? getHelpId				:= null
	override Str? getProjectHelpId		:= null
	
	override protected Str? getDefaultDescription					:= "Fantom Env preferences"
	override protected IPreferenceStore? getDefaultPreferenceStore	:= null
	
	override protected AbstractOptionsBlock? createOptionsBlock(IStatusChangeListener? context, IProject? project, IWorkbenchPreferenceContainer? container) {
		EnvOptionsBlock(context, project, container)
	}
}

class EnvOptionsBlock : AbstractOptionsBlock {

	new make(IStatusChangeListener? context, IProject? project,	IWorkbenchPreferenceContainer? container) : super(context, project, allKeys, container) { }
	
	override protected Control? createOptionsBlock(Composite? parent) {
		composite := SWTFactory.createComposite(parent, parent.getFont, 1, 1, GridData.FILL_HORIZONTAL)
		
		envs := (CompileEnv[]) Platform.getExtensionRegistry
			.getConfigurationElementsFor("com.xored.fanide.core.compileEnv")
			.map |IConfigurationElement element->CompileEnv| {
				element.createExecutableExtension("class")
			}

		// ensure 'None' is first and 'Path Env' is second
		envs.sort |e1, e2| {
			num := |Obj obj->Int| {
				switch (obj.typeof.pod.name) {
					case "f4core"		: return 1
					case "f4pathEnv"	: return 2
					default				: return 3
				}
			}
			return num(e1) <=> num(e2)
		}

		// grab some private fields
		bindManagerField := Interop.toJava(AbstractOptionsBlock#).getDeclaredField("bindManager")
		bindManagerField.setAccessible(true)
		bindManager := (ControlBindingManager) bindManagerField.get(this)

		KeysField := Interop.toJava(AbstractOptionsBlock#).getDeclaredField("keys")
		KeysField.setAccessible(true)
		keys := (ArrayList) KeysField.get(this)

		group := SWTFactory.createGroup(composite, "Fantom Environement", 2, 1, GridData.FILL_HORIZONTAL)

		SWTFactory.createLabel(group, "Select the Fantom environment used to find pods:", 2)
		envs.each |env| {
			radio := SWTFactory.createRadioButton(group, env.label, 1)
			SWTFactory.createLabel(group, env.description, 1)
			bindManager.bindRadioControl(radio, compileEnvKey, env.typeof.qname, null)
		}
		keys.add(compileEnvKey)

		return composite
	}

	private static PreferenceKey compileEnvKey() {
		PreferenceKey(CompileFan.pluginId, BuilderPrefs.compileEnv)
	}
	
	private static PreferenceKey[] allKeys() {
		[compileEnvKey]
	}
}
