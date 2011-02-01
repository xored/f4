/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui.text;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.eclipse.dltk.core.SimpleClassDLTKExtensionManager;
import org.eclipse.dltk.ui.editor.highlighting.ISemanticHighlighter;
import org.eclipse.dltk.ui.editor.highlighting.SemanticHighlighting;
import org.eclipse.dltk.ui.text.ScriptSourceViewerConfiguration;
import org.eclipse.dltk.ui.text.ScriptTextTools;
import org.eclipse.dltk.ui.text.templates.TemplateVariableProcessor;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.jface.text.rules.IPartitionTokenScanner;
import org.eclipse.ui.texteditor.ITextEditor;

import com.xored.fanide.internal.ui.highlighting.FanSemanticHighlighter;
import com.xored.fanide.ui.highlighting.ISemanticHighlightingExtension;

public class FanTextTools extends ScriptTextTools {

	private final static String[] LEGAL_CONTENT_TYPES = new String[] {
			IFanPartitions.FAN_STRING, IFanPartitions.FAN_MULTI_LINE_COMMENT,
			IFanPartitions.FAN_SINGLE_LINE_COMMENT,
			IFanPartitions.FAN_INTERPRETER_STRING, IFanPartitions.FAN_DOC,
			IFanPartitions.FAN_DSL };

	public FanTextTools(boolean autoDisposeOnDisplayDispose) {
		super(IFanPartitions.FAN_PARTITIONING, LEGAL_CONTENT_TYPES,
				autoDisposeOnDisplayDispose);
	}

	@Override
	public ScriptSourceViewerConfiguration createSourceViewerConfiguraton(
			IPreferenceStore preferenceStore, ITextEditor editor,
			String partitioning) {
		return new FanSourceViewerConfiguration(getColorManager(),
				preferenceStore, editor, partitioning);
	}

	@Override
	public ScriptSourceViewerConfiguration createSourceViewerConfiguraton(
			IPreferenceStore preferenceStore, ITextEditor editor,
			TemplateVariableProcessor variableProcessor) {
		return new FanCodeTemplateSourceViewerConfiguration(getColorManager(),
				preferenceStore, editor, getDefaultPartitioning(), true,
				variableProcessor);
	}

	@Override
	public IPartitionTokenScanner getPartitionScanner() {
		return new FanPartitionScanner();
	}

	@Override
	public SemanticHighlighting[] getSemanticHighlightings() {
		List<SemanticHighlighting> highlightings = new ArrayList<SemanticHighlighting>();
		ISemanticHighlightingExtension[] exts = getExtensions();
		for (int i = 0; i < exts.length; i++) {
			SemanticHighlighting[] hl = exts[i].getHighlightings();
			if (hl != null) {
				highlightings.addAll(Arrays.asList(hl));
			}
		}
		SemanticHighlighting[] ret = new SemanticHighlighting[highlightings
				.size()];
		for (int i = 0; i < highlightings.size(); i++)
			ret[i] = highlightings.get(i);

		return ret;
	}

	/*@Override
	public ISemanticHighlighter getSemanticPositionUpdater() {
		return new FanSemanticHighlighter(getExtensions());
	}*/

	private ISemanticHighlightingExtension[] getExtensions() {
		// use new instance of extensions as they are not reentrant
		final SimpleClassDLTKExtensionManager extensions = new SimpleClassDLTKExtensionManager(
				"com.xored.fanide.highlighting.semantic"); //$NON-NLS-1$
		Object[] objects = extensions.getObjects();
		ISemanticHighlightingExtension[] exts = new ISemanticHighlightingExtension[objects.length];

		for (int i = 0; i < objects.length; i++) {
			exts[i] = ((ISemanticHighlightingExtension) objects[i]);
		}
		return exts;
	}
}
