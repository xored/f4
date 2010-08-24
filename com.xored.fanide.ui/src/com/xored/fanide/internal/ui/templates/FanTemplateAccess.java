package com.xored.fanide.internal.ui.templates;

import org.eclipse.dltk.ui.templates.ScriptTemplateAccess;
import org.eclipse.jface.preference.IPreferenceStore;

import com.xored.fanide.internal.ui.FanUI;

/**
 * Provides access to the Fantom template store.
 */
public class FanTemplateAccess extends ScriptTemplateAccess {

	private static final String CUSTOM_TEMPLATES_KEY = "org.eclipse.fan.Templates";

	private static FanTemplateAccess instance;
	
	public static synchronized FanTemplateAccess getInstance() {
		if (instance == null) {
			instance = new FanTemplateAccess();
		}
		
		return instance;
	}
	
	/*
	 * @see org.eclipse.dltk.ui.templates.ScriptTemplateAccess#getContextTypeId()
	 */
	protected String getContextTypeId() {
		return FanUniversalTemplateContextType.CONTEXT_TYPE_ID;
	}

	/*
	 * @see org.eclipse.dltk.ui.templates.ScriptTemplateAccess#getCustomTemplatesKey()
	 */
	protected String getCustomTemplatesKey() {
		return CUSTOM_TEMPLATES_KEY;
	}

	/*
	 * @see org.eclipse.dltk.ui.templates.ScriptTemplateAccess#getPreferenceStore()
	 */
	protected IPreferenceStore getPreferenceStore() {
		return FanUI.getDefault().getPreferenceStore();
	}

}
