package com.xored.fanide.internal.ui.wizards;

import org.eclipse.core.runtime.IStatus;
import org.eclipse.dltk.core.IModelElement;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.DialogField;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.LayoutUtil;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.SelectionButtonDialogFieldGroup;
import org.eclipse.jface.dialogs.Dialog;
import org.eclipse.jface.dialogs.IDialogSettings;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;

@SuppressWarnings("restriction")
public class FanNewClassPage extends FanNewTypeWizardPage {
	
	public final static String PAGE_NAME = "com.xored.fanide.ui.FanNewClassWizardPage";
	
	private final static String SETTINGS_CREATEMAIN= "create_main"; //$NON-NLS-1$
	private final static String SETTINGS_CREATECONSTR= "create_constructor"; //$NON-NLS-1$
	private final static String SETTINGS_CREATEUNIMPLEMENTED= "create_unimplemented"; //$NON-NLS-1$
	
	private SelectionButtonDialogFieldGroup fMethodStubsButtons;
	
	/**
	 * Creates a new <code>FanNewClassPage</code>
	 */
	public FanNewClassPage() {
		super(FanNewTypeWizardPage.CLASS_TYPE, PAGE_NAME);
		
		setTitle(FanWizardMessages.NewClassPage_title); 
		setDescription(FanWizardMessages.NewClassPage_description); 
		
		String[] buttonNames3= new String[] {
			FanWizardMessages.NewClassPage_methods_main,
			FanWizardMessages.NewClassPage_methods_constructors, 
			FanWizardMessages.NewClassPage_methods_inherited
		};		
		fMethodStubsButtons= new SelectionButtonDialogFieldGroup(SWT.CHECK, buttonNames3, 1);
		fMethodStubsButtons.setLabelText(FanWizardMessages.NewClassPage_methods_label);		 
	}
	
	public void init(IStructuredSelection selection) {
		IModelElement melem= getInitialScriptElement(selection);
		initContainerPage(melem);
		initTypePage(melem);
		doStatusUpdate();
		
		boolean createMain= false;
		boolean createConstructors= false;
		boolean createUnimplemented= false;
		IDialogSettings dialogSettings= getDialogSettings();
		if (dialogSettings != null) {
			IDialogSettings section= dialogSettings.getSection(PAGE_NAME);
			if (section != null) {
				createMain= section.getBoolean(SETTINGS_CREATEMAIN);
				createConstructors= section.getBoolean(SETTINGS_CREATECONSTR);
				createUnimplemented= section.getBoolean(SETTINGS_CREATEUNIMPLEMENTED);
			}
		}
		
		setMethodStubSelection(createMain, createConstructors, createUnimplemented, true);
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
			
		createSuperClassControls(composite, nColumns);
		createSuperMixinsControls(composite, nColumns);
				
		createMethodStubSelectionControls(composite, nColumns);
		
		createCommentControls(composite, nColumns);
		enableCommentControl(true);
		
		setControl(composite);
			
		Dialog.applyDialogFont(composite);
	}
	
	/*
	 * @see WizardPage#becomesVisible
	 */
	@Override
	public void setVisible(boolean visible) {
		super.setVisible(visible);
		if (visible) {
			setFocus();
		} else {
			IDialogSettings dialogSettings= getDialogSettings();
			if (dialogSettings != null) {
				IDialogSettings section= dialogSettings.getSection(PAGE_NAME);
				if (section == null) {
					section= dialogSettings.addNewSection(PAGE_NAME);
				}
				section.put(SETTINGS_CREATEMAIN, isCreateMain());
				section.put(SETTINGS_CREATECONSTR, isCreateConstructors());
				section.put(SETTINGS_CREATEUNIMPLEMENTED, isCreateInherited());
			}
		}
	}	
	
	private void createMethodStubSelectionControls(Composite composite, int nColumns) {
		Control labelControl= fMethodStubsButtons.getLabelControl(composite);
		LayoutUtil.setHorizontalSpan(labelControl, nColumns);
		
		DialogField.createEmptySpace(composite);
		
		Control buttonGroup= fMethodStubsButtons.getSelectionButtonsGroup(composite);
		LayoutUtil.setHorizontalSpan(buttonGroup, nColumns - 1);	
	}
	
	/**
	 * Returns the current selection state of the 'Create Main' checkbox.
	 * 
	 * @return the selection state of the 'Create Main' checkbox
	 */
	public boolean isCreateMain() {
		return fMethodStubsButtons.isSelected(0);
	}

	/**
	 * Returns the current selection state of the 'Create Constructors' checkbox.
	 * 
	 * @return the selection state of the 'Create Constructors' checkbox
	 */
	public boolean isCreateConstructors() {
		return fMethodStubsButtons.isSelected(1);
	}
	
	/**
	 * Returns the current selection state of the 'Create inherited abstract methods' 
	 * checkbox.
	 * 
	 * @return the selection state of the 'Create inherited abstract methods' checkbox
	 */
	public boolean isCreateInherited() {
		return fMethodStubsButtons.isSelected(2);
	}

	/**
	 * Sets the selection state of the method stub checkboxes.
	 * 
	 * @param createMain initial selection state of the 'Create Main' checkbox.
	 * @param createConstructors initial selection state of the 'Create Constructors' checkbox.
	 * @param createInherited initial selection state of the 'Create inherited abstract methods' checkbox.
	 * @param canBeModified if <code>true</code> the method stub checkboxes can be changed by 
	 * the user. If <code>false</code> the buttons are "read-only"
	 */
	public void setMethodStubSelection(boolean createMain, boolean createConstructors, boolean createInherited, boolean canBeModified) {
		fMethodStubsButtons.setSelection(0, createMain);
		fMethodStubsButtons.setSelection(1, createConstructors);
		fMethodStubsButtons.setSelection(2, createInherited);
		fMethodStubsButtons.enableSelectionButton(1, false);
		fMethodStubsButtons.enableSelectionButton(2, false);
		fMethodStubsButtons.setEnabled(canBeModified);
	}

	@Override
	protected String getTypeBody(String typeName, String lineDelimiter) {
		StringBuffer buf = new StringBuffer();
		if(isCreateMain())buf.append(getMainMethod(lineDelimiter));
		if(isCreateConstructors())buf.append(getConstructors(lineDelimiter));
		if(isCreateInherited())buf.append(getInheritedMethods(lineDelimiter));
		return buf.toString();
	}

	private Object getInheritedMethods(String lineDelimiter) {
		return "";
	}

	private Object getConstructors(String lineDelimiter) {
		return "";
	}

	private Object getMainMethod(String lineDelimiter) {
		StringBuffer buf = new StringBuffer();
		buf.append("\tpublic static Void main(Str[] args)").append(lineDelimiter);
		buf.append("\t{").append(lineDelimiter).append(lineDelimiter);
		buf.append("\t}").append(lineDelimiter);		
		return buf.toString();
	}
}
