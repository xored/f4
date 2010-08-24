package com.xored.fanide.internal.ui.templates;

import org.eclipse.dltk.ui.templates.ScriptTemplateAccess;
import org.eclipse.dltk.ui.templates.ScriptTemplatePreferencePage;
import org.eclipse.dltk.ui.text.ScriptSourceViewerConfiguration;
import org.eclipse.dltk.ui.text.ScriptTextTools;
import org.eclipse.jface.text.IDocument;

import com.xored.fanide.internal.ui.FanUI;
import com.xored.fanide.internal.ui.text.IFanPartitions;
import com.xored.fanide.internal.ui.text.SimpleFanSourceViewerConfiguration;

/**
 * Fantom code templates preference page
 */
public class FanCodeTemplatesPreferencePage extends
		ScriptTemplatePreferencePage {

	/*
	 * @see org.eclipse.dltk.ui.templates.ScriptTemplatePreferencePage#createSourceViewerConfiguration()
	 */
	protected ScriptSourceViewerConfiguration createSourceViewerConfiguration() {
		return new SimpleFanSourceViewerConfiguration(getTextTools()
				.getColorManager(), getPreferenceStore(), null,
				IFanPartitions.FAN_PARTITIONING, false);
	}

	/*
	 * @see org.eclipse.dltk.ui.templates.ScriptTemplatePreferencePage#setDocumentParticioner(org.eclipse.jface.text.IDocument)
	 */
	protected void setDocumentPartitioner(IDocument document) {
		getTextTools().setupDocumentPartitioner(document,
				IFanPartitions.FAN_PARTITIONING);
	}

	/*
	 * @see org.eclipse.dltk.ui.templates.ScriptTemplatePreferencePage#setPreferenceStore()
	 */
	protected void setPreferenceStore() {
		setPreferenceStore(FanUI.getDefault().getPreferenceStore());
	}

	/*
	 * @see org.eclipse.dltk.ui.templates.ScriptTemplatePreferencePage#getTemplateAccess()
	 */
	protected ScriptTemplateAccess getTemplateAccess() {
		return FanTemplateAccess.getInstance();
	}

	private ScriptTextTools getTextTools() {
		return FanUI.getDefault().getTextTools();
	}
}
