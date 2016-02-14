using f4core

using [java]com.xored.f4.builder.ui::AbstractConfigurationBlockPropertyAndPreferencePageBridge as Base
using [java]org.eclipse.jface.preference::IPreferenceStore
using [java]org.eclipse.dltk.ui::PreferencesAdapter
using [java]org.eclipse.dltk.ui.util::IStatusChangeListener
using [java]org.eclipse.core.resources::IProject
using [java]com.xored.fanide.core::FanCore
using [java]org.eclipse.ui.preferences::IWorkbenchPreferenceContainer

using [java]org.eclipse.dltk.ui.preferences::AbstractOptionsBlock
using [java]org.eclipse.dltk.ui.preferences::PreferenceKey
using [java]org.eclipse.dltk.ui.util::SWTFactory

using [java]org.eclipse.swt.widgets::Control
using [java]org.eclipse.swt.widgets::Button
using [java]org.eclipse.swt.widgets::Composite
using [java]org.eclipse.swt.layout::GridData
using [java]org.eclipse.swt.graphics::Font

class CompilerPreferencePage : Base {
	
	override Str? getPropertyPageId		:= "com.xored.f4.builder.ui.propertyPage.compiler"
	override Str? getPreferencePageId	:= "com.xored.f4.builder.ui.preferences.compiler"
	override Str? getHelpId				:= null
	override Str? getProjectHelpId		:= null
	
	override protected Str? getDefaultDescription					:= "Fantom compiler preferences"
	override protected IPreferenceStore? getDefaultPreferenceStore	:= null
	
	override protected AbstractOptionsBlock? createOptionsBlock( IStatusChangeListener? context, IProject? project, IWorkbenchPreferenceContainer? container ) {
		CompilerOptionsBlock(context, project, container)
	}
}

class CompilerOptionsBlock : AbstractOptionsBlock {

	new make(IStatusChangeListener? context, IProject? project,	IWorkbenchPreferenceContainer? container) : super(context, project, allKeys, container) { }
	
	override protected Control? createOptionsBlock(Composite? parent) {
		composite := SWTFactory.createComposite(parent, parent.getFont, 1, 1, GridData.FILL_HORIZONTAL)
		
		bindControl(SWTFactory.createCheckButton(composite, "Use external compiler", null, false, 1), useExternalBuilderKey, null)
		
		// FIXME does not seem to be used anywhere...?
//		bindControl(SWTFactory.createCheckButton(composite, "Automatically build dependent projects", null, false, 1), buildDependantsKey, null)
		
		return composite
	}

	private static PreferenceKey useExternalBuilderKey() {
		PreferenceKey(ProjectPrefs.qualifier, ProjectPrefs.useExternalBuilderName)
	}
	
	private static PreferenceKey buildDependantsKey() {
		PreferenceKey(ProjectPrefs.qualifier, ProjectPrefs.buildDependantsName)
	}
	
	private static PreferenceKey[] allKeys() {
		[useExternalBuilderKey, buildDependantsKey]
	}
}
