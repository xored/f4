package com.xored.fanide.internal.ui.preferences;

import org.eclipse.dltk.internal.ui.wizards.dialogfields.SelectionButtonDialogField;
import org.eclipse.dltk.ui.preferences.CodeTemplatesPreferencePage;
import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;

import com.xored.fanide.internal.ui.FanCodeTemplateArea;
import com.xored.fanide.internal.ui.FanUI;
import com.xored.fanide.internal.ui.FanUILanguageToolkit;
import com.xored.fanide.ui.FanPreferenceConstants;

@SuppressWarnings("restriction")
public class FanCodeTemplatesPreferencePage extends CodeTemplatesPreferencePage {

	private SelectionButtonDialogField fGenerateComments;

	public FanCodeTemplatesPreferencePage() {
		super(FanUILanguageToolkit.getInstance(), new FanCodeTemplateArea());
		setPreferenceStore(FanUI.getDefault().getPreferenceStore());
	}

	@Override
	protected Control createContents(Composite parent) {
		Control content = super.createContents(parent);
		if (content instanceof Composite)
			createAddComentDialogField((Composite) content);
		return content;
	}

	private void createAddComentDialogField(Composite parent) {
		fGenerateComments = new SelectionButtonDialogField(SWT.CHECK | SWT.WRAP);

		fGenerateComments
				.setLabelText(FanPreferencesMessages.CodeTemplateBlock_createCommentLabel);
		fGenerateComments.setSelection(getPreferenceStore().getBoolean(
				FanPreferenceConstants.CODEGEN_ADD_COMMENTS));
		fGenerateComments.doFillIntoGrid(parent, 1);

	}

	@Override
	public boolean performOk() {
		getPreferenceStore().setValue(
				FanPreferenceConstants.CODEGEN_ADD_COMMENTS,
				fGenerateComments.isSelected());
		return super.performOk();
	}

}
