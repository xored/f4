package com.xored.fanide.core.utils;

import org.eclipse.jdt.core.search.TypeNameRequestor;

public class JDTTypeNameRequestor extends TypeNameRequestor {
	@Override
	public void acceptType(int modifiers, char[] packageName,
			char[] simpleTypeName, char[][] enclosingTypeNames, String path) {
		String[] enclosings = null;
		if (enclosingTypeNames != null) {
			enclosings = new String[enclosingTypeNames.length];
			int i = 0;
			for (char[] c : enclosingTypeNames) {
				enclosings[i] = new String(c);
				i++;
			}
		}
		acceptJavaType(modifiers, packageName == null ? null : new String(
				packageName), simpleTypeName == null ? null : new String(
				simpleTypeName), enclosings, path);
	}

	public void acceptJavaType(int modifiers, String packageName,
			String simpleTypeName, String[] enclosingTypeNames, String path) {

	}
}
