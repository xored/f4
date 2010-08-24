package com.xored.fanide.internal.ui.wizards;

import org.eclipse.dltk.ui.DLTKUIPlugin;
import org.eclipse.dltk.ui.text.templates.ICodeTemplateArea;
import org.eclipse.dltk.ui.wizards.NewSourceModulePage;
import org.eclipse.dltk.ui.wizards.NewSourceModuleWizard;

import com.xored.fanide.core.FanNature;
import com.xored.fanide.internal.ui.FanCodeTemplateArea;
import com.xored.fanide.internal.ui.FanImages;
import com.xored.fanide.internal.ui.text.FanCodeTemplateAccess;

public class FanNewScriptWizard extends NewSourceModuleWizard {

	public static final String WIZARD_ID = "com.xored.fanide.ui.internal.wizards.newscript";

	public FanNewScriptWizard() {
		setDefaultPageImageDescriptor(FanImages.DESC_WIZBAN_FILE_CREATION);
		setDialogSettings(DLTKUIPlugin.getDefault().getDialogSettings());
		setWindowTitle(FanWizardMessages.NewScriptWizard_title);
	}

	@Override
	protected NewSourceModulePage createNewSourceModulePage() {
		return new NewSourceModulePage() {
			@Override
			protected String getPageTitle() {
				return FanWizardMessages.NewScriptPage_title;
			}

			@Override
			protected String getPageDescription() {
				return FanWizardMessages.NewScriptPage_description;
			}

			@Override
			protected String getFileContent() {
				return "";
			}

			@Override
			protected String getRequiredNature() {
				return FanNature.NATURE_ID;
			}

			private final ICodeTemplateArea codeTemplateArea = new FanCodeTemplateArea();

			/*
			 * @see NewSourceModulePage#getCodeTemplateArea()
			 */
			@Override
			protected ICodeTemplateArea getTemplateArea() {
				return codeTemplateArea;
			}

			/*
			 * @see NewSourceModulePage#getCodeTemplateContextTypes()
			 */
			@Override
			protected String[] getCodeTemplateContextTypeIds() {
				return new String[] { FanCodeTemplateAccess.FILES_CONTEXT_ID }; //$NON-NLS-1$
			}

			/*
			 * @see NewSourceModulePage#getDefaultCodeTemplateId()
			 */
			@Override
			protected String getDefaultCodeTemplateId() {
				return "com.xored.fanide.text.templates.fan"; //$NON-NLS-1$
			}

			/**
			 * @return the name of the template used in the previous dialog
			 *         invocation.
			 */
			@Override
			protected String getLastUsedTemplateName() {
				return null;
			}
		};
	}
}
