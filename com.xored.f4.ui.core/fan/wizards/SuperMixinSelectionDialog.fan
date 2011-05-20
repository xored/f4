using [java] org.eclipse.osgi.util::NLS
using [java] org.eclipse.core.runtime::IStatus
using [java] org.eclipse.core.runtime::Status
using [java] org.eclipse.swt.widgets::Composite
using [java] org.eclipse.swt.widgets::Shell
using [java] org.eclipse.jface.dialogs::IDialogConstants
using [java] org.eclipse.jface.dialogs::IDialogSettings
using [java] org.eclipse.jface.operation::IRunnableContext
using [java] org.eclipse.dltk.core.search::IDLTKSearchConstants
using [java] org.eclipse.dltk.core.search::SearchEngine
using [java] org.eclipse.dltk.core::IScriptProject
using [java] org.eclipse.dltk.core.search::TypeNameMatch
using [java] org.eclipse.dltk.ui.dialogs::StatusInfo
using [java] org.eclipse.dltk.ui.viewsupport::BasicElementLabels
using "[java]org.eclipse.dltk.internal.ui.dialogs"::OpenTypeSelectionDialog2

using "[java]com.xored.fanide.internal.ui"::FanUILanguageToolkit
using "[java]com.xored.fanide.internal.ui.dialogs"::FanTypeSelectionExtension
using "[java]com.xored.fanide.internal.ui.wizards"::FanWizardMessages

using f4core

public class SuperMixinSelectionDialog : OpenTypeSelectionDialog2
{
	private static const Int addId := IDialogConstants.CLIENT_ID + 1

	private FanNewTypePage typeWizardPage
	private List oldContent;

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
	internal new make(Shell parent, IRunnableContext context,
			FanNewTypePage page, IScriptProject p)
  : super(parent, true, context, SearchEngine.createSearchScope(p),
		IDLTKSearchConstants.TYPE, FanTypeSelectionExtension(FanModifiers.AccMixin),
    FanUILanguageToolkit.getInstance)
  {
		typeWizardPage = page
		// to restore the content of the dialog field if the dialog is canceled
		oldContent = typeWizardPage.getSuperMixins
		setStatusLineAboveButtons(true)
	}

	override protected Void createButtonsForButtonBar(Composite? parent)
  {
		createButton(parent, addId, FanWizardMessages.NewTypeWizardPage_mixins_add, true)
		super.createButtonsForButtonBar(parent)
	}

	override protected IDialogSettings? getDialogBoundsSettings() { FanUI.instance.plugin.getDialogSettings }

	override protected Void updateButtonsEnableState(IStatus? status)
  {
		super.updateButtonsEnableState(status)
		addButton := getButton(addId)
		if (addButton != null && !addButton.isDisposed)
			addButton.setEnabled(!status.matches(IStatus.ERROR))
	}

	override protected Void handleShellCloseEvent()
  {
		super.handleShellCloseEvent
		// Handle the closing of the shell by selecting the close icon
		typeWizardPage.setSuperMixins(oldContent, true)
	}

	override protected Void cancelPressed()
  {
		typeWizardPage.setSuperMixins(oldContent, true)
		super.cancelPressed
	}

	override protected Void buttonPressed(Int buttonId)
  {
		if (buttonId == addId)
			addSelectedMixins
		else
			super.buttonPressed(buttonId)
	}

	override protected Void okPressed()
  {
		addSelectedMixins
		super.okPressed
	}

	private Void addSelectedMixins()
  {
		types := getSelectedTypes
		if (types == null) return
    types.each |TypeNameMatch match|
    {
			qualifiedName := FanNewTypePage.getQualifiedName(match.getType)
      message := typeWizardPage.addSuperMixin(qualifiedName)
				? NLS.bind(FanWizardMessages.SuperMixinSelectionDialog_mixinadded_info,
								BasicElementLabels.getJavaElementName(qualifiedName))
				: NLS.bind(FanWizardMessages.SuperMixinSelectionDialog_mixinalreadyadded_info,
								BasicElementLabels.getJavaElementName(qualifiedName))
			updateStatus(StatusInfo(IStatus.INFO, message))
		}
	}

//	protected void handleDoubleClick() {
//		buttonPressed(ADD_ID);
//	}
//
	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.eclipse.ui.dialogs.FilteredItemsSelectionDialog#handleSelected(org
	 * .eclipse.jface.viewers.StructuredSelection)
	 */
	override protected Void handleDefaultSelected(TypeNameMatch?[]? selection)
  {
		super.handleDefaultSelected(selection)
		if (selection.size == 0 && typeWizardPage.getSuperMixins.size > oldContent.size)
    {
			// overrides updateStatus() from handleSelected() if
			// list of super mixins was modified
			// the <code>super.handleSelected(selection)</code> has to be
			// called, because superclass implementation of this class updates
			// state of the table.
			updateStatus(Status(IStatus.OK, FanUI.pluginId, IStatus.OK, "", null))
			getButton(addId).setEnabled(false)
		}
    else
    {
			// if selection isn't empty, the add button should be enabled in
			// exactly the same scenarios as the OK button
			if (getButton(addId) != null) getButton(addId).setEnabled(getButton(OK).isEnabled)
		}
	}
}
