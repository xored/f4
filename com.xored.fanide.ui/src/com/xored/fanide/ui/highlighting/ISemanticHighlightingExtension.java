package com.xored.fanide.ui.highlighting;

import org.eclipse.dltk.compiler.env.IModuleSource;
import org.eclipse.dltk.ui.editor.highlighting.ISemanticHighlightingRequestor;
import org.eclipse.dltk.ui.editor.highlighting.SemanticHighlighting;

public interface ISemanticHighlightingExtension {

	SemanticHighlighting[] getHighlightings();

	boolean process(IModuleSource code, ISemanticHighlightingRequestor requestor);

}
