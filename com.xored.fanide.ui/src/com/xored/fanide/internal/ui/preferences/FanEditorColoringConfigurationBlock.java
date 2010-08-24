/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui.preferences;

import java.io.InputStream;

import org.eclipse.dltk.internal.ui.editor.ScriptSourceViewer;
import org.eclipse.dltk.ui.preferences.AbstractScriptEditorColoringConfigurationBlock;
import org.eclipse.dltk.ui.preferences.IPreferenceConfigurationBlock;
import org.eclipse.dltk.ui.preferences.OverlayPreferenceStore;
import org.eclipse.dltk.ui.preferences.PreferencesMessages;
import org.eclipse.dltk.ui.text.IColorManager;
import org.eclipse.dltk.ui.text.ScriptSourceViewerConfiguration;
import org.eclipse.dltk.ui.text.ScriptTextTools;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.source.IOverviewRuler;
import org.eclipse.jface.text.source.IVerticalRuler;
import org.eclipse.jface.text.source.projection.ProjectionViewer;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.ui.texteditor.ITextEditor;

import com.xored.fanide.internal.ui.FanUI;
import com.xored.fanide.internal.ui.editor.FanDocumentSetupParticipant;
import com.xored.fanide.internal.ui.text.IFanPartitions;
import com.xored.fanide.internal.ui.text.SimpleFanSourceViewerConfiguration;
import com.xored.fanide.ui.FanPreferenceConstants;

public class FanEditorColoringConfigurationBlock extends
		AbstractScriptEditorColoringConfigurationBlock implements
		IPreferenceConfigurationBlock {

	private static final String PREVIEW_FILE_NAME = "PreviewFile.txt";

	private static final String[][] fSyntaxColorListModel = new String[][] {
			{ FanPreferencesMessages.FanEditorPreferencePage_documentation,
					FanPreferenceConstants.EDITOR_DOC_COLOR,
					sDocumentationCategory },
			{ FanPreferencesMessages.FanEditorPreferencePage_multiLineComment,
					FanPreferenceConstants.EDITOR_MULTI_LINE_COMMENT_COLOR,
					sCommentsCategory },
			{ PreferencesMessages.DLTKEditorPreferencePage_singleLineComment,
					FanPreferenceConstants.EDITOR_SINGLE_LINE_COMMENT_COLOR,
					sCommentsCategory },
			{ PreferencesMessages.DLTKEditorPreferencePage_CommentTaskTags,
					FanPreferenceConstants.COMMENT_TASK_TAGS, sCommentsCategory },
			{
					FanPreferencesMessages.FanEditorPreferencePage_interpreterStringComment,
					FanPreferenceConstants.COMMENT_INTERPRETER_STRING,
					sCommentsCategory },
			{ FanPreferencesMessages.FanEditorPreferencePage_dsl,
					FanPreferenceConstants.EDITOR_DSL_COLOR, sCoreCategory },
			{ PreferencesMessages.DLTKEditorPreferencePage_keywords,
					FanPreferenceConstants.EDITOR_KEYWORD_COLOR, sCoreCategory },
			{ PreferencesMessages.DLTKEditorPreferencePage_returnKeyword,
					FanPreferenceConstants.EDITOR_KEYWORD_RETURN_COLOR,
					sCoreCategory },

			{ PreferencesMessages.DLTKEditorPreferencePage_strings,
					FanPreferenceConstants.EDITOR_STRING_COLOR, sCoreCategory },

			{ PreferencesMessages.DLTKEditorPreferencePage_numbers,
					FanPreferenceConstants.EDITOR_NUMBER_COLOR, sCoreCategory },

			{ PreferencesMessages.DLTKEditorPreferencePage_decorators,
					FanPreferenceConstants.EDITOR_DECORATOR_COLOR,
					sCoreCategory },

			{ PreferencesMessages.DLTKEditorPreferencePage_class_colors,
					FanPreferenceConstants.EDITOR_CLASS_DEFINITION_COLOR,
					sCoreCategory },

			{ PreferencesMessages.DLTKEditorPreferencePage_function_colors,
					FanPreferenceConstants.EDITOR_FUNCTION_DEFINITION_COLOR,
					sCoreCategory },

			{ PreferencesMessages.DLTKEditorPreferencePage_variables,
					FanPreferenceConstants.EDITOR_VARIABLE_COLOR, sCoreCategory },
			{ FanPreferencesMessages.FanEditorPreferencePage_fields,
					FanPreferenceConstants.EDITOR_FIELD_COLOR, sCoreCategory },
			{ FanPreferencesMessages.FanEditorPreferencePage_static_fields,
					FanPreferenceConstants.EDITOR_STATIC_FIELD_COLOR,
					sCoreCategory } };

	public FanEditorColoringConfigurationBlock(OverlayPreferenceStore store) {
		super(store);
	}

	@Override
	protected ScriptTextTools getTextTools() {
		return FanUI.getDefault().getTextTools();
	}

	@Override
	protected String[][] getSyntaxColorListModel() {
		return fSyntaxColorListModel;
	}

	@Override
	protected ProjectionViewer createPreviewViewer(Composite parent,
			IVerticalRuler verticalRuler, IOverviewRuler overviewRuler,
			boolean showAnnotationsOverview, int styles, IPreferenceStore store) {
		return new ScriptSourceViewer(parent, verticalRuler, overviewRuler,
				showAnnotationsOverview, styles, store);
	}

	@Override
	protected ScriptSourceViewerConfiguration createSimpleSourceViewerConfiguration(
			IColorManager colorManager, IPreferenceStore preferenceStore,
			ITextEditor editor, boolean configureFormatter) {
		return new SimpleFanSourceViewerConfiguration(colorManager,
				preferenceStore, editor, IFanPartitions.FAN_PARTITIONING,
				configureFormatter);
	}

	@Override
	protected void setDocumentPartitioning(IDocument document) {
		FanDocumentSetupParticipant participant = new FanDocumentSetupParticipant();
		participant.setup(document);
	}

	@Override
	protected InputStream getPreviewContentReader() {
		return getClass().getResourceAsStream(PREVIEW_FILE_NAME);
	}
}
