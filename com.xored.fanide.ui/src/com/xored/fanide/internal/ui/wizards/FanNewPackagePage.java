package com.xored.fanide.internal.ui.wizards;

import org.eclipse.dltk.ui.wizards.NewPackageWizardPage;

import com.xored.fanide.core.FanNature;

public class FanNewPackagePage extends NewPackageWizardPage{
	protected String getRequiredNature() {
		return FanNature.NATURE_ID;
	}
}