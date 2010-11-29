package com.xored.f4.builder.ui;
import org.eclipse.dltk.ui.preferences.AbstractConfigurationBlockPropertyAndPreferencePage;
import org.eclipse.jface.preference.IPreferenceStore;


public abstract class AbstractConfigurationBlockPropertyAndPreferencePageBridge extends
		AbstractConfigurationBlockPropertyAndPreferencePage {
	@Override
	protected void setDescription() {
		setDescription(getDefaultDescription());
	}
	
	protected abstract String getDefaultDescription();
	
	@Override
	protected void setPreferenceStore() {
		setPreferenceStore(getDefaultPreferenceStore());
	}
	
	protected abstract IPreferenceStore getDefaultPreferenceStore();
}
