/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui;

import org.eclipse.ui.IFolderLayout;
import org.eclipse.ui.IPageLayout;
import org.eclipse.ui.IPerspectiveFactory;
import org.eclipse.ui.console.IConsoleConstants;
import org.eclipse.ui.progress.IProgressConstants;

import com.xored.fanide.internal.ui.wizards.FanNewClassWizard;
import com.xored.fanide.internal.ui.wizards.FanNewEnumWizard;
import com.xored.fanide.internal.ui.wizards.FanNewMixinWizard;
import com.xored.fanide.internal.ui.wizards.FanNewPackageWizard;
import com.xored.fanide.internal.ui.wizards.FanNewScriptWizard;
import com.xored.fanide.internal.ui.wizards.FanProjectCreationWizard;

public class FanPerspective implements IPerspectiveFactory {

	public static final String NEW_FOLDER_WIZARD = "com.xored.fanide.ui.internal.wizards.newfolder"; //$NON-NLS-1$ 

	public void createInitialLayout(IPageLayout layout) {

		String editorArea = layout.getEditorArea();

		IFolderLayout folder = layout.createFolder(
				"left", IPageLayout.LEFT, (float) 0.2, editorArea); //$NON-NLS-1$
		// folder.addView(FanUI.ID_PACKAGES);
		// folder.addView(FanUI.ID_TYPE_HIERARCHY);
		// folder.addView("com.xored.fanide.ui.views.navigator");//IPageLayout.ID_RES_NAV);
		// String navigator = IPageLayout.ID_RES_NAV;
		// String navigator = "org.eclipse.dltk.ui.ScriptExplorer";

		folder.addView(FanUI.ID_FAN_EXPLORER);
		// folder.addPlaceholder(IPageLayout.ID_BOOKMARKS);

		IFolderLayout outputfolder = layout.createFolder(
				"bottom", IPageLayout.BOTTOM, (float) 0.75, editorArea); //$NON-NLS-1$
		outputfolder.addView(IPageLayout.ID_PROBLEM_VIEW);
		outputfolder.addView(IPageLayout.ID_TASK_LIST);
		outputfolder.addView(IConsoleConstants.ID_CONSOLE_VIEW);
		outputfolder.addView("org.eclipse.pde.runtime.LogView");

		// This is shortcut
		// outputfolder.addPlaceholder(IConsoleConstants.ID_CONSOLE_VIEW);
		outputfolder.addPlaceholder(IPageLayout.ID_BOOKMARKS);
		outputfolder.addPlaceholder(IProgressConstants.PROGRESS_VIEW_ID);

		layout.addView(IPageLayout.ID_OUTLINE, IPageLayout.RIGHT, (float) 0.75,
				editorArea);

		layout.addActionSet(IPageLayout.ID_NAVIGATE_ACTION_SET);
		layout.addActionSet(FanUI.ID_ACTION_SET);

		// views - standard workbench
		layout.addShowViewShortcut(IPageLayout.ID_OUTLINE);
		layout.addShowViewShortcut(IPageLayout.ID_PROBLEM_VIEW);
		layout.addShowViewShortcut(IConsoleConstants.ID_CONSOLE_VIEW);
		layout.addShowViewShortcut(FanUI.ID_FAN_EXPLORER);
		layout.addShowViewShortcut(IPageLayout.ID_TASK_LIST);
		layout.addShowViewShortcut(IProgressConstants.PROGRESS_VIEW_ID);

		// new actions - Fantom project creation wizard
		layout.addNewWizardShortcut(FanProjectCreationWizard.WIZARD_ID);
		layout.addNewWizardShortcut(FanNewClassWizard.WIZARD_ID);
		layout.addNewWizardShortcut(FanNewMixinWizard.WIZARD_ID);
		layout.addNewWizardShortcut(FanNewEnumWizard.WIZARD_ID);
		layout.addNewWizardShortcut(FanNewScriptWizard.WIZARD_ID);
		layout.addNewWizardShortcut(NEW_FOLDER_WIZARD);
		layout.addNewWizardShortcut(FanNewPackageWizard.WIZARD_ID);

		layout.addNewWizardShortcut("org.eclipse.ui.wizards.new.file");//$NON-NLS-1$
		layout.addNewWizardShortcut("org.eclipse.ui.wizards.new.folder");//$NON-NLS-1$
		layout
				.addNewWizardShortcut("org.eclipse.ui.editors.wizards.UntitledTextFileWizard");//$NON-NLS-1$
	}
}
