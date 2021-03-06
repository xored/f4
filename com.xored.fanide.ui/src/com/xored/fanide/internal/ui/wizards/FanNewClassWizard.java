package com.xored.fanide.internal.ui.wizards;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.dltk.core.IModelElement;
import org.eclipse.dltk.core.ISourceModule;
import org.eclipse.dltk.ui.DLTKUIPlugin;
import org.eclipse.dltk.ui.wizards.NewElementWizard;

import com.xored.fanide.internal.ui.FanImages;

public class FanNewClassWizard extends NewElementWizard {

	public static final String WIZARD_ID = "com.xored.fanide.ui.internal.wizards.newclass";

	private FanNewClassPage fPage;
	private boolean fOpenEditorOnFinish;
	
	public FanNewClassWizard(FanNewClassPage page, boolean openEditorOnFinish) {
		setDefaultPageImageDescriptor(FanImages.DESC_WIZBAN_FILE_CREATION);
		setDialogSettings(DLTKUIPlugin.getDefault().getDialogSettings());
		setWindowTitle(FanWizardMessages.NewClassWizard_title);
		
		fPage= page;
		fOpenEditorOnFinish= openEditorOnFinish;
	}
	
	public FanNewClassWizard() {
		this(null, true);
	}
	
	@Override
	public void addPages() {
		super.addPages();
		if (fPage == null) {
			fPage= new FanNewClassPage();
			fPage.init(getSelection());
		}
		addPage(fPage);
	}
	
	@Override
	protected void finishPage(IProgressMonitor monitor) throws InterruptedException, CoreException {
		fPage.createType(monitor);
	}
		
	@Override
	public boolean performFinish() {
		boolean res= super.performFinish();
		ISourceModule module = fPage.getCreatedOrModifiedModule();
		if (res) {
			if (module != null) {
				selectAndReveal(module.getResource());
				if (fOpenEditorOnFinish) {
					openResource((IFile)module.getResource());
				}
			}	
		}
		return res;
	}

	@Override
	public IModelElement getCreatedElement() {
		return fPage.getCreatedType();
	}
}