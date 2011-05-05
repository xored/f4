/*******************************************************************************
 * Copyright (c) 2000, 2007 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui;

import org.eclipse.core.runtime.preferences.AbstractPreferenceInitializer;
import org.eclipse.dltk.ui.editor.highlighting.SemanticHighlightingUtils;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.ui.editors.text.EditorsUI;

import com.xored.fanide.core.FanNature;
import com.xored.fanide.ui.FanPreferenceConstants;

public class FanUIPreferenceInitializer extends AbstractPreferenceInitializer {

	@Override
	public void initializeDefaultPreferences() {
		IPreferenceStore store = FanUI.getDefault().getPreferenceStore();

		EditorsUI.useAnnotationsPreferencePage(store);
		EditorsUI.useQuickDiffPreferencePage(store);
		FanPreferenceConstants.initializeDefaultValues(store);
		SemanticHighlightingUtils.initializeDefaultValues(store, FanUI
				.getDefault().getTextTools().getSemanticPositionUpdater(FanNature.NATURE_ID).getSemanticHighlightings());
	}

}
