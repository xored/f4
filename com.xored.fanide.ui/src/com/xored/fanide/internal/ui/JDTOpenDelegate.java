package com.xored.fanide.internal.ui;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.dltk.ui.IOpenDelegate;
import org.eclipse.jdt.core.IJavaElement;
import org.eclipse.jdt.internal.ui.javaeditor.EditorUtility;
import org.eclipse.ui.IEditorPart;
import org.eclipse.ui.PartInitException;

public class JDTOpenDelegate implements IOpenDelegate {

	public JDTOpenDelegate() {
		// TODO Auto-generated constructor stub
	}

	public boolean supports(Object object) {
		if (object instanceof IJavaElement) {
			return true;
		}
		return false;
	}

	public String getName(Object object) {
		if (object instanceof IJavaElement) {
			return ((IJavaElement) object).getElementName();
		}
		return null;
	}

	public IEditorPart openInEditor(Object object, boolean activate)
			throws PartInitException, CoreException {
		if (object instanceof IJavaElement) {
			return EditorUtility.openInEditor(object,activate);
		}
		return null;
	}

}
