/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui.preferences;

import org.eclipse.dltk.ui.preferences.AbstractConfigurationBlockPreferencePage;
import org.eclipse.dltk.ui.preferences.IPreferenceConfigurationBlock;
import org.eclipse.dltk.ui.preferences.OverlayPreferenceStore;

import com.xored.fanide.internal.ui.FanUI;

public class FanGlobalPreferencesPage extends AbstractConfigurationBlockPreferencePage {

	protected IPreferenceConfigurationBlock createConfigurationBlock(OverlayPreferenceStore overlayPreferenceStore) {
		// TODO Auto-generated method stub
		return new FanGlobalConfigurationBlock(overlayPreferenceStore, this);
	}

	protected String getHelpId() {
		// TODO Auto-generated method stub
		return null;
	}

	protected void setDescription() {
		String description = FanPreferencesMessages.FanGlobalPreferencePage_description;
		setDescription(description);
	}

	protected void setPreferenceStore() {
		setPreferenceStore(FanUI.getDefault().getPreferenceStore());		
	}

}
