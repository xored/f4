package com.xored.f4.ui.text;

import org.eclipse.dltk.core.ISourceModule;
import org.eclipse.dltk.ui.templates.ScriptTemplateContext;
import org.eclipse.dltk.ui.templates.ScriptTemplateContextType;
import org.eclipse.jface.text.IDocument;

public abstract class ScriptTemplateContextTypeBridge extends ScriptTemplateContextType {
	@Override
	public ScriptTemplateContext createContext(IDocument document,
			int completionPosition, int length, ISourceModule sourceModule) {
		return createCtx(document, completionPosition, length, sourceModule);
	}

	public abstract ScriptTemplateContext createCtx(IDocument document,
			int completionPosition, int length, ISourceModule sourceModule);
}
