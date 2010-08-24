package com.xored.f4.ui.text;

import java.io.Reader;
import java.io.StringReader;

import org.eclipse.dltk.core.IMember;
import org.eclipse.dltk.ui.documentation.IScriptDocumentationProvider;

public abstract class ScriptDocumentationProviderBridge implements IScriptDocumentationProvider {

	public Reader getInfo(String content) {
		return new StringReader(getStrInfo(content));
	}
	
	public abstract String getStrInfo(String content);

	public Reader getInfo(IMember element, boolean lookIntoParents,
			boolean lookIntoExternal) {
		return new StringReader(getMemberInfo(element, lookIntoParents, lookIntoExternal));
	}
	
	public abstract String getMemberInfo(IMember elem, boolean lookIntoParents, boolean lookIntoExternal);

}
