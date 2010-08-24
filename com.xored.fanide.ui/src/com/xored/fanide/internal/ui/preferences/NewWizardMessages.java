package com.xored.fanide.internal.ui.preferences;

import org.eclipse.osgi.util.NLS;

public class NewWizardMessages extends NLS {
	private static final String BUNDLE_NAME = "com.xored.fanide.internal.ui.preferences.NewWizardMessages";//$NON-NLS-1$	

	private NewWizardMessages() {
		// Do not instantiate
	}

	static {
		NLS
				.initializeMessages(
						BUNDLE_NAME,
						com.xored.fanide.internal.ui.preferences.NewWizardMessages.class);
	}

	public static String SourceAttachmentBlock_filename_varlabel;
	public static String SourceAttachmentBlock_filename_external_varbutton;
	public static String SourceAttachmentBlock_filename_variable_button;
	public static String SourceAttachmentBlock_filename_label;
	public static String SourceAttachmentBlock_filename_externalfile_button;
	public static String SourceAttachmentBlock_filename_internal_button;
	public static String SourceAttachmentBlock_filename_externalfolder_button;
	public static String SourceAttachmentBlock_message;
	public static String SourceAttachmentBlock_filename_description;
	public static String SourceAttachmentBlock_intjardialog_title;
	public static String SourceAttachmentBlock_intjardialog_message;
	public static String SourceAttachmentBlock_extfolderdialog_message;
	public static String SourceAttachmentBlock_extfolderdialog_text;
	public static String SourceAttachmentBlock_extjardialog_text;

	public static String NewTypeWizardPage_error_TypeNameExistsDifferentCase;
	public static String NewTypeWizardPage_error_uri_location_unkown;
}
