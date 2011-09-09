package com.xored.f4.ui.text;

import org.eclipse.jdt.core.IJavaElement;
import org.eclipse.jdt.core.IMember;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.internal.ui.text.javadoc.JavadocContentAccess2;

public class JDTJavaDocBridge {
	public static String getJavaDoc(IJavaElement element) {
		if (element instanceof IMember)
			try {
				return JavadocContentAccess2
						.getHTMLContent((IMember) element, true);
			} catch (JavaModelException e) {
//				e.printStackTrace();
			}
		return null;
	}
}
