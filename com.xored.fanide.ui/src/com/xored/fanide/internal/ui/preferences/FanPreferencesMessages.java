package com.xored.fanide.internal.ui.preferences;

import org.eclipse.osgi.util.NLS;

public class FanPreferencesMessages extends NLS {
	private static final String BUNDLE_NAME = "com.xored.fanide.internal.ui.preferences.FanPreferencesMessages";//$NON-NLS-1$	

	private FanPreferencesMessages() {
		// Do not instantiate
	}

	static {
		NLS
				.initializeMessages(
						BUNDLE_NAME,
						com.xored.fanide.internal.ui.preferences.FanPreferencesMessages.class);
	}

	public static String FanGlobalPreferencePage_description;

	public static String FanEditorPreferencePage_general;

	public static String FanSmartTypingConfigurationBlock_smartPaste;
	public static String FanSmartTypingConfigurationBlock_typing_smartTab;
	public static String FanSmartTypingConfigurationBlock_closeBrackets;
	public static String FanSmartTypingConfigurationBlock_closeBraces;
	public static String FanSmartTypingConfigurationBlock_closeStrings;
	public static String FanSmartTypingConfigurationBlock_typing_tabTitle;

	public static String TodoTaskDescription;

	public static String FanEditorPreferencePage_multiLineComment;
	public static String FanEditorPreferencePage_interpreterStringComment;
	public static String FanEditorPreferencePage_documentation;
	public static String FanEditorPreferencePage_dsl;

	public static String CodeTemplateBlock_createCommentLabel;

	public static String FanEditorPreferencePage_fields;

	public static String FanEditorPreferencePage_static_fields;

	public static String SourceAttachmentPropertyPage_noarchive_message;
	public static String SourceAttachmentPropertyPage_invalid_container;
	public static String SourceAttachmentPropertyPage_error_title;
	public static String SourceAttachmentPropertyPage_error_message;

	public static String FoldingConfigurationBlock_initiallyFoldClosures;
	public static String FoldingConfigurationBlock_initiallyFoldImports;
}
