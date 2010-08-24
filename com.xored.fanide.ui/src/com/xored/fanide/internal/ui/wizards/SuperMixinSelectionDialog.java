package com.xored.fanide.internal.ui.wizards;

import java.util.List;

import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Status;
import org.eclipse.dltk.core.IScriptProject;
import org.eclipse.dltk.core.IType;
import org.eclipse.dltk.core.search.IDLTKSearchConstants;
import org.eclipse.dltk.core.search.SearchEngine;
import org.eclipse.dltk.core.search.TypeNameMatch;
import org.eclipse.dltk.internal.ui.dialogs.OpenTypeSelectionDialog2;
import org.eclipse.dltk.ui.dialogs.StatusInfo;
import org.eclipse.dltk.ui.viewsupport.BasicElementLabels;
import org.eclipse.jface.dialogs.IDialogConstants;
import org.eclipse.jface.dialogs.IDialogSettings;
import org.eclipse.jface.operation.IRunnableContext;
import org.eclipse.osgi.util.NLS;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Shell;

import com.xored.fanide.ast.declarations.FanFlags;
import com.xored.fanide.internal.ui.FanUI;
import com.xored.fanide.internal.ui.FanUILanguageToolkit;
import com.xored.fanide.internal.ui.dialogs.FanTypeSelectionExtension;

import static com.xored.fanide.core.FanCore.POD_EXTENSION;

@SuppressWarnings("restriction")
public class SuperMixinSelectionDialog extends OpenTypeSelectionDialog2 {

	private static final int ADD_ID = IDialogConstants.CLIENT_ID + 1;

	private FanNewTypeWizardPage fTypeWizardPage;
	@SuppressWarnings("unchecked")
	private List fOldContent;

	/**
	 * Creates new instance of SuperMixinSelectionDialog
	 * 
	 * @param parent
	 *            shell to parent the dialog on
	 * @param context
	 *            context used to execute long-running operations associated
	 *            with this dialog
	 * @param page
	 *            page that opened this dialog
	 * @param p
	 *            the script project which will be considered when searching for
	 *            interfaces
	 */
	public SuperMixinSelectionDialog(Shell parent, IRunnableContext context,
			FanNewTypeWizardPage page, IScriptProject p) {
		super(parent, true, context, SearchEngine.createSearchScope(p),
				IDLTKSearchConstants.TYPE, new FanTypeSelectionExtension(
						FanFlags.AccMixin), FanUILanguageToolkit.getInstance());
		fTypeWizardPage = page;
		// to restore the content of the dialog field if the dialog is canceled
		fOldContent = fTypeWizardPage.getSuperMixins();
		setStatusLineAboveButtons(true);
	}

	@Override
	protected void createButtonsForButtonBar(Composite parent) {
		createButton(parent, ADD_ID,
				FanWizardMessages.NewTypeWizardPage_mixins_add, true);
		super.createButtonsForButtonBar(parent);
	}

	@Override
	protected IDialogSettings getDialogBoundsSettings() {
		return FanUI.getDefault().getDialogSettings();
	}

	@Override
	protected void updateButtonsEnableState(IStatus status) {
		super.updateButtonsEnableState(status);
		Button addButton = getButton(ADD_ID);
		if (addButton != null && !addButton.isDisposed())
			addButton.setEnabled(!status.matches(IStatus.ERROR));
	}

	@Override
	protected void handleShellCloseEvent() {
		super.handleShellCloseEvent();
		// Handle the closing of the shell by selecting the close icon
		fTypeWizardPage.setSuperMixins(fOldContent, true);
	}

	@Override
	protected void cancelPressed() {
		fTypeWizardPage.setSuperMixins(fOldContent, true);
		super.cancelPressed();
	}

	@Override
	protected void buttonPressed(int buttonId) {
		if (buttonId == ADD_ID) {
			addSelectedMixins();
		} else {
			super.buttonPressed(buttonId);
		}
	}

	@Override
	protected void okPressed() {
		addSelectedMixins();
		super.okPressed();
	}

	private void addSelectedMixins() {
		TypeNameMatch[] types = getSelectedTypes();
		if (types == null)
			return;
		for (TypeNameMatch type : types) {
			String qualifiedName = getQualifiedName(type.getType());
			String message;
			if (fTypeWizardPage.addSuperMixin(qualifiedName)) {
				message = NLS
						.bind(
								FanWizardMessages.SuperMixinSelectionDialog_mixinadded_info,
								BasicElementLabels
										.getJavaElementName(qualifiedName));
			} else {
				message = NLS
						.bind(
								FanWizardMessages.SuperMixinSelectionDialog_mixinalreadyadded_info,
								BasicElementLabels
										.getJavaElementName(qualifiedName));
			}
			updateStatus(new StatusInfo(IStatus.INFO, message));
		}
	}

	protected void handleDoubleClick() {
		buttonPressed(ADD_ID);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.eclipse.ui.dialogs.FilteredItemsSelectionDialog#handleSelected(org
	 * .eclipse.jface.viewers.StructuredSelection)
	 */
	@Override
	protected void handleDefaultSelected(TypeNameMatch[] selection) {
		super.handleDefaultSelected(selection);

		if (selection.length == 0
				&& fTypeWizardPage.getSuperMixins().size() > fOldContent.size()) {
			// overrides updateStatus() from handleSelected() if
			// list of super mixins was modified
			// the <code>super.handleSelected(selection)</code> has to be
			// called, because superclass implementation of this class updates
			// state of the table.

			updateStatus(new Status(IStatus.OK, FanUI.PLUGIN_ID, IStatus.OK,
					"", null));

			getButton(ADD_ID).setEnabled(false);
		} else {
			// if selection isn't empty, the add button should be enabled in
			// exactly the same scenarios as the OK button
			if (getButton(ADD_ID) != null)
				getButton(ADD_ID).setEnabled(getButton(OK).isEnabled());
		}
	}

	public static String getQualifiedName(IType type) {
		StringBuffer buf = new StringBuffer();
		if (type.getPath().getFileExtension().equals(POD_EXTENSION)) {
			String podFileName = type.getPath().lastSegment();
			buf.append(podFileName.substring(0, podFileName.lastIndexOf('.')))
					.append("::");
		}
		buf.append(type.getTypeQualifiedName("."));
		return buf.toString();
	}
}
