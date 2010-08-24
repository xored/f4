/**
 * 
 */
package com.xored.fanide.internal.ui.highlighting;

import org.eclipse.dltk.compiler.env.IModuleSource;
import org.eclipse.dltk.ui.editor.highlighting.AbstractSemanticHighlighter;
import org.eclipse.dltk.ui.editor.highlighting.ISemanticHighlightingRequestor;

import com.xored.fanide.ui.highlighting.ISemanticHighlightingExtension;

/**
 * @author akazantsev
 */
public class FanSemanticHighlighter extends AbstractSemanticHighlighter {

	private final ISemanticHighlightingExtension[] extensions;
	private final ISemanticHighlightingRequestor[] requestors;

	public FanSemanticHighlighter(ISemanticHighlightingExtension[] extensions) {
		this.extensions = extensions;
		this.requestors = new ISemanticHighlightingRequestor[extensions.length];
		int offset = 0;
		for (int i = 0; i < extensions.length; ++i) {
			requestors[i] = new FanSemanticPositionRequestor(this, offset);
			offset += extensions[i].getHighlightings().length;
		}
	}

	@Override
	protected boolean doHighlighting(IModuleSource code) throws Exception {
		boolean result = false;
		for (int i = 0; i < extensions.length; i++) {
			if (extensions[i].process(code, requestors[i]))
				result = true;
		}
		return result;
	}

}
