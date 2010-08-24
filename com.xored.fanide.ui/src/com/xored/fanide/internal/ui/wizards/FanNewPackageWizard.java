package com.xored.fanide.internal.ui.wizards;

import org.eclipse.dltk.ui.DLTKUIPlugin;
import org.eclipse.dltk.ui.wizards.NewPackageCreationWizard;
import org.eclipse.dltk.ui.wizards.NewPackageWizardPage;

import com.xored.fanide.internal.ui.FanImages;

public class FanNewPackageWizard extends NewPackageCreationWizard {

	public static final String WIZARD_ID = "com.xored.fanide.ui.internal.wizards.newpackage";

	public FanNewPackageWizard() {
		setDefaultPageImageDescriptor(FanImages.DESC_WIZBAN_FILE_CREATION);
		setDialogSettings(DLTKUIPlugin.getDefault().getDialogSettings());
		setWindowTitle(FanWizardMessages.NewPackageWizard_title);
	}

	@Override
	protected NewPackageWizardPage createNewPackageWizardPage() {
		return new FanNewPackagePage();
	}
}
