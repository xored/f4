/**
 * 
 */
package com.xored.fanide.internal.ui.explorer;

import org.eclipse.core.resources.IFile;
import org.eclipse.dltk.core.DLTKCore;
import org.eclipse.dltk.core.IModelElement;
import org.eclipse.dltk.internal.ui.editor.EditorUtility;
import org.eclipse.dltk.ui.DLTKUIPlugin;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.jface.viewers.StructuredSelection;
import org.eclipse.ui.IEditorInput;
import org.eclipse.ui.IEditorPart;
import org.eclipse.ui.IWorkbenchPage;
import org.eclipse.ui.ide.ResourceUtil;
import org.eclipse.ui.navigator.ILinkHelper;

/**
 * @author akazantsev
 * 
 */
public class ScriptLinkHelper implements ILinkHelper {

	public void activateEditor(IWorkbenchPage page,
			IStructuredSelection selection) {
		if (selection == null || selection.isEmpty())
			return;
		Object element = selection.getFirstElement();
		IEditorPart part = EditorUtility.isOpenInEditor(element);
		if (part != null) {
			page.bringToTop(part);
			if (element instanceof IModelElement)
				EditorUtility.revealInEditor(part, (IModelElement) element);
		}

	}

	public IStructuredSelection findSelection(IEditorInput input) {
		IModelElement element = DLTKUIPlugin.getEditorInputModelElement(input);
		if (element == null) {
			IFile file = ResourceUtil.getFile(input);
			if (file != null) {
				element = DLTKCore.create(file);
			}
		}
		return (element != null) ? new StructuredSelection(element)
				: StructuredSelection.EMPTY;
	}

}
