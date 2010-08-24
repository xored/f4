package com.xored.fanide.internal.ui;

import org.eclipse.dltk.ui.text.templates.ICodeTemplateAccess;
import org.eclipse.dltk.ui.text.templates.ICodeTemplateArea;

public class FanCodeTemplateArea implements ICodeTemplateArea {

	public static final String PREF_ID = "com.xored.fanide.ui.preferences.code.templates"; //$NON-NLS-1$
	public static final String PROP_ID = "com.xored.fanide.ui.propertyPage.CodeTemplatePage"; //$NON-NLS-1$

	public FanCodeTemplateArea() {
		// TODO Auto-generated constructor stub
	}

	public ICodeTemplateAccess getTemplateAccess() {
		return FanUI.getDefault().getCodeTemplateAccess();
	}

	public String getTemplatePreferencePageId() {
		return PREF_ID;
	}

	public String getTemplatePropertyPageId() {
		return PROP_ID;
	}
}
