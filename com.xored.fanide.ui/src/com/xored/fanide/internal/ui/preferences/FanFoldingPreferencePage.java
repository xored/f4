/*******************************************************************************
 * Copyright (c) 2000, 2007 IBM Corporation and others.
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
import org.eclipse.dltk.ui.text.folding.DefaultFoldingPreferenceConfigurationBlock;
import org.eclipse.dltk.ui.text.folding.DocumentationFoldingPreferenceBlock;
import org.eclipse.dltk.ui.text.folding.IFoldingPreferenceBlock;
import org.eclipse.jface.preference.PreferencePage;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;

import com.xored.fanide.internal.ui.FanUI;
import com.xored.fanide.internal.ui.text.folding.FanFoldingPreferenceBlock;

/**
 * Fantom folding preference page
 */
public final class FanFoldingPreferencePage extends
		AbstractConfigurationBlockPreferencePage {

	@Override
	protected String getHelpId() {
		return null;
	}

	@Override
	protected void setDescription() {
		// setDescription(PreferencesMessages.EditorPreferencePage_folding_title);
	}

	@Override
	protected void setPreferenceStore() {
		setPreferenceStore(FanUI.getDefault().getPreferenceStore());
	}

	@Override
	protected Label createDescriptionLabel(Composite parent) {
		return null; // no description for new look.
	}

	@Override
	protected IPreferenceConfigurationBlock createConfigurationBlock(
			OverlayPreferenceStore overlayPreferenceStore) {
		return new DefaultFoldingPreferenceConfigurationBlock(
				overlayPreferenceStore, this) {
			@Override
			protected IFoldingPreferenceBlock createSourceCodeBlock(
					OverlayPreferenceStore store, PreferencePage page) {
				return new FanFoldingPreferenceBlock(store, page);
			}

			@Override
			protected IFoldingPreferenceBlock createDocumentationBlock(
					OverlayPreferenceStore store, PreferencePage page) {
				return new DocumentationFoldingPreferenceBlock(store, page) {

					@Override
					protected boolean supportsDocFolding() {
						return true;
					}
				};
			}
		};
	}
}
