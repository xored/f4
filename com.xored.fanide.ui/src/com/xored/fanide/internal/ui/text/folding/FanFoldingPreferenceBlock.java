/*******************************************************************************
 * Copyright (c) 2000, 2007 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui.text.folding;

import java.util.List;

import org.eclipse.dltk.ui.preferences.OverlayPreferenceStore;
import org.eclipse.dltk.ui.preferences.OverlayPreferenceStore.OverlayKey;
import org.eclipse.dltk.ui.text.folding.SourceCodeFoldingPreferenceBlock;
import org.eclipse.jface.preference.PreferencePage;
import org.eclipse.swt.widgets.Group;

import com.xored.fanide.internal.ui.preferences.FanPreferencesMessages;
import com.xored.fanide.ui.FanPreferenceConstants;


/**
 * Fantom source folding preferences.
 */
public class FanFoldingPreferenceBlock extends SourceCodeFoldingPreferenceBlock {

	public FanFoldingPreferenceBlock(OverlayPreferenceStore store,
			PreferencePage page) {
		super(store, page);
	}
	
	protected void addOverlayKeys(List<OverlayKey> keys) {
		keys.add(new OverlayPreferenceStore.OverlayKey(
				OverlayPreferenceStore.BOOLEAN, getInitiallyFoldClosuresKey()));
		keys.add(new OverlayPreferenceStore.OverlayKey(
				OverlayPreferenceStore.BOOLEAN, getInitiallyFoldImportsKey()));
	}

	protected void addInitiallyFoldOptions(Group group) {
		super.addInitiallyFoldOptions(group);
		createCheckBox(group, getInitiallyFoldClosuresText(),
				getInitiallyFoldClosuresKey());
		createCheckBox(group, getInitiallyFoldImportsText(),
				getInitiallyFoldImportsKey());
	}

	protected String getInitiallyFoldClosuresKey() {
		return FanPreferenceConstants.EDITOR_FOLDING_INIT_CLOSURES;
	}

	protected String getInitiallyFoldClosuresText() {
		return FanPreferencesMessages.FoldingConfigurationBlock_initiallyFoldClosures;
	}

	protected String getInitiallyFoldImportsKey() {
		return FanPreferenceConstants.EDITOR_FOLDING_INIT_IMPORTS;
	}

	protected String getInitiallyFoldImportsText() {
		return FanPreferencesMessages.FoldingConfigurationBlock_initiallyFoldImports;
	}

}
