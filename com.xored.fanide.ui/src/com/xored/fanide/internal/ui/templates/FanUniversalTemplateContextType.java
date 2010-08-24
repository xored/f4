package com.xored.fanide.internal.ui.templates;

import org.eclipse.dltk.core.ISourceModule;
import org.eclipse.dltk.ui.templates.ScriptTemplateContext;
import org.eclipse.dltk.ui.templates.ScriptTemplateContextType;
import org.eclipse.jface.text.IDocument;

public class FanUniversalTemplateContextType extends
		ScriptTemplateContextType {
	public static final String CONTEXT_TYPE_ID = "FanUniversalTemplateContextType";
	
	public FanUniversalTemplateContextType() {
		// empty constructor
	}
	
	public FanUniversalTemplateContextType(String id, String name) {
		super(id, name);
	}

	public FanUniversalTemplateContextType(String id) {
		super(id);
	}

	public ScriptTemplateContext createContext(IDocument document,
			int completionPosition, int length, ISourceModule sourceModule) {
		return new FanTemplateContext(this, document, completionPosition,
				length, sourceModule);
	}

}
