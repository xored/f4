/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
using [java] org.eclipse.ui::IPageLayout
using [java] org.eclipse.ui::IPerspectiveFactory
using [java] org.eclipse.ui.console::IConsoleConstants
using [java] org.eclipse.ui.progress::IProgressConstants

using "[java]com.xored.fanide.internal.ui.wizards"::FanNewEnumWizard
using "[java]com.xored.fanide.internal.ui.wizards"::FanNewMixinWizard
using "[java]com.xored.fanide.internal.ui.wizards"::FanNewPackageWizard
using "[java]com.xored.fanide.internal.ui.wizards"::FanNewScriptWizard
using "[java]com.xored.fanide.internal.ui.wizards"::FanProjectCreationWizard

public class FanPerspective : IPerspectiveFactory
{
	static const Str newFolderWizard := "com.xored.fanide.ui.internal.wizards.newfolder" 

	override Void createInitialLayout(IPageLayout? layout)
  {
		editorArea := layout.getEditorArea

		folder := layout.createFolder("left", IPageLayout.LEFT, 0.2f, editorArea)
		// folder.addView(FanUI.ID_PACKAGES);
		// folder.addView(FanUI.ID_TYPE_HIERARCHY);
		// folder.addView("com.xored.fanide.ui.views.navigator");//IPageLayout.ID_RES_NAV);
		// String navigator = IPageLayout.ID_RES_NAV;
		// String navigator = "org.eclipse.dltk.ui.ScriptExplorer";

		folder.addView(FanUI.explorerId)
		// folder.addPlaceholder(IPageLayout.ID_BOOKMARKS);

		outputfolder := layout.createFolder("bottom", IPageLayout.BOTTOM, 0.75f, editorArea)
		outputfolder.addView(IPageLayout.ID_PROBLEM_VIEW)
		outputfolder.addView(IPageLayout.ID_TASK_LIST)
		outputfolder.addView(IConsoleConstants.ID_CONSOLE_VIEW)
		outputfolder.addView("org.eclipse.pde.runtime.LogView")

		// This is shortcut
		// outputfolder.addPlaceholder(IConsoleConstants.ID_CONSOLE_VIEW);
		outputfolder.addPlaceholder(IPageLayout.ID_BOOKMARKS)
		outputfolder.addPlaceholder(IProgressConstants.PROGRESS_VIEW_ID)

		layout.addView(IPageLayout.ID_OUTLINE, IPageLayout.RIGHT, 0.75f, editorArea)

		layout.addActionSet(IPageLayout.ID_NAVIGATE_ACTION_SET)
		layout.addActionSet(FanUI.actionSetId)

		// views - standard workbench
		layout.addShowViewShortcut(IPageLayout.ID_OUTLINE)
		layout.addShowViewShortcut(IPageLayout.ID_PROBLEM_VIEW)
		layout.addShowViewShortcut(IConsoleConstants.ID_CONSOLE_VIEW)
		layout.addShowViewShortcut(FanUI.explorerId)
		layout.addShowViewShortcut(IPageLayout.ID_TASK_LIST)
		layout.addShowViewShortcut(IProgressConstants.PROGRESS_VIEW_ID)

		// new actions - Fantom project creation wizard
		layout.addNewWizardShortcut(FanProjectCreationWizard.WIZARD_ID)
		layout.addNewWizardShortcut(FanNewClassWizard.wizardId)
		layout.addNewWizardShortcut(FanNewMixinWizard.WIZARD_ID)
		layout.addNewWizardShortcut(FanNewEnumWizard.WIZARD_ID)
		layout.addNewWizardShortcut(FanNewScriptWizard.WIZARD_ID)
		layout.addNewWizardShortcut(newFolderWizard)
//		layout.addNewWizardShortcut(FanNewPackageWizard.WIZARD_ID)

		layout.addNewWizardShortcut("org.eclipse.ui.wizards.new.file")
		layout.addNewWizardShortcut("org.eclipse.ui.wizards.new.folder")
		layout.addNewWizardShortcut("org.eclipse.ui.editors.wizards.UntitledTextFileWizard")
	}
}
