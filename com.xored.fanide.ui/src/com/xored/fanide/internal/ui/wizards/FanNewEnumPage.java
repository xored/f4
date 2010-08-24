package com.xored.fanide.internal.ui.wizards;

import org.eclipse.core.runtime.IStatus;
import org.eclipse.dltk.core.IModelElement;
import org.eclipse.jface.dialogs.Dialog;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;

public class FanNewEnumPage extends FanNewTypeWizardPage {

	public final static String PAGE_NAME = "com.xored.fanide.ui.FanNewClassWizardPage";
	
	/**
	 * Creates a new <code>FanNewEnumPage</code>
	 */
	public FanNewEnumPage() {
		super(FanNewTypeWizardPage.ENUM_TYPE, PAGE_NAME);
		
		setTitle(FanWizardMessages.NewEnumPage_title); 
		setDescription(FanWizardMessages.NewEnumPage_description); 
	}
	
	public void init(IStructuredSelection selection) {
		IModelElement melem= getInitialScriptElement(selection);
		initContainerPage(melem);
		initTypePage(melem);
		doStatusUpdate();
	}
	
	private void doStatusUpdate() {
		IStatus[] status= new IStatus[] {
			containerStatus,
			fFilenameStatus,
			fTypeNameStatus,
			fModifierStatus,
			fSuperClassStatus,
			fSuperMixinsStatus
		};
		
		updateStatus(status);
	}
	
	/*
	 * @see NewContainerWizardPage#handleFieldChanged
	 */
	@Override
	protected void handleFieldChanged(String fieldName) {
		super.handleFieldChanged(fieldName);
		
		doStatusUpdate();
	}
	
	/*
	 * @see WizardPage#createControl
	 */
	public void createControl(Composite parent) {
		initializeDialogUnits(parent);
		
		Composite composite= new Composite(parent, SWT.NONE);
		composite.setFont(parent.getFont());
		
		int nColumns= 4;
		
		GridLayout layout= new GridLayout();
		layout.numColumns= nColumns;		
		composite.setLayout(layout);
		
		// pick & choose the wanted UI components
		
		createContainerControls(composite, nColumns);	

		createFilenameControls(composite, nColumns);
				
		createSeparator(composite, nColumns);
		
		createTypeNameControls(composite, nColumns);
		createModifierControls(composite, nColumns);
			
		createSuperMixinsControls(composite, nColumns);
				
		createCommentControls(composite, nColumns);
		enableCommentControl(true);
		
		setControl(composite);

		Dialog.applyDialogFont(composite);
	}
	
	@Override
	public void setVisible(boolean visible) {
		super.setVisible(visible);
		if (visible) {
			setFocus();
		}
	}
	
	@Override
	protected String getTypeBody(String typeName, String lineDelimiter) {
		return null;
	}
}
