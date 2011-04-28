package com.xored.f4.ui.text;

import org.eclipse.dltk.ui.editor.highlighting.ISemanticHighlightingUpdater;
import org.eclipse.dltk.ui.text.ScriptSourceViewerConfiguration;
import org.eclipse.dltk.ui.text.ScriptTextTools;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.ui.texteditor.ITextEditor;

public abstract class ScriptTextToolsBridge extends ScriptTextTools {
	protected ScriptTextToolsBridge(String defaultPartitioning,
			String[] legalContentTypes) {
		super(defaultPartitioning, legalContentTypes, true);
	}

	@Override
	public ScriptSourceViewerConfiguration createSourceViewerConfiguraton(
			IPreferenceStore preferenceStore, ITextEditor editor,
			String partitioning) {
		return srcViewerConf(preferenceStore,editor,partitioning);
	}
	
    protected abstract ScriptSourceViewerConfiguration srcViewerConf(
    		IPreferenceStore preferenceStore, ITextEditor editor,
    		String partitioning);

    @Override
	public ISemanticHighlightingUpdater getSemanticPositionUpdater(String natureId) {
		return semanticPosUpdater();
	}
    
    protected abstract ISemanticHighlightingUpdater semanticPosUpdater();
}
