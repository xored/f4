package com.xored.fanide.internal.ui.preferences;

import java.lang.reflect.InvocationTargetException;

import org.eclipse.core.runtime.Assert;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IAdaptable;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.dltk.core.BuildpathContainerInitializer;
import org.eclipse.dltk.core.DLTKCore;
import org.eclipse.dltk.core.IBuildpathContainer;
import org.eclipse.dltk.core.IBuildpathEntry;
import org.eclipse.dltk.core.IModelElement;
import org.eclipse.dltk.core.IProjectFragment;
import org.eclipse.dltk.core.IScriptProject;
import org.eclipse.dltk.internal.launching.InterpreterContainer;
import org.eclipse.dltk.launching.IInterpreterInstall;
import org.eclipse.dltk.launching.ScriptRuntime;
import org.eclipse.jface.dialogs.Dialog;
import org.eclipse.jface.operation.IRunnableWithProgress;
import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Label;
import org.eclipse.ui.IWorkbenchPropertyPage;
import org.eclipse.ui.PlatformUI;
import org.eclipse.ui.dialogs.PropertyPage;

public class FanSourceAttachmentPropertyPage extends PropertyPage implements
		IWorkbenchPropertyPage {
	private FanSourceAttachmentBlock fSourceAttachmentBlock;
	private IProjectFragment fRoot;
	private IPath fContainerPath;
	private IBuildpathEntry fEntry;

	public FanSourceAttachmentPropertyPage() {
	}

	/*
	 * @see
	 * org.eclipse.jface.dialogs.IDialogPage#createControl(org.eclipse.swt.widgets
	 * .Composite)
	 */

	@Override
	public void createControl(Composite parent) {
		super.createControl(parent);
		// PlatformUI.getWorkbench().getHelpSystem().setHelp(getControl(),
		// IJavaHelpContextIds.SOURCE_ATTACHMENT_PROPERTY_PAGE);
	}

	/*
	 * @see PreferencePage#createContents
	 */
	@Override
	protected Control createContents(Composite composite) {
		initializeDialogUnits(composite);
		Control result = createPageContent(composite);
		Dialog.applyDialogFont(result);
		return result;
	}

	private Control createPageContent(Composite composite) {
		try {
			fContainerPath = null;
			fEntry = null;
			fRoot = getJARPackageFragmentRoot();
			if (fRoot == null
					|| fRoot.getKind() != IProjectFragment.NO_RESOURCE_MODIFICATION) {
				return createMessageContent(
						composite,
						FanPreferencesMessages.SourceAttachmentPropertyPage_noarchive_message);
			}
			IBuildpathEntry containerEntry = null;
			IBuildpathEntry[] eentries = fRoot.getScriptProject()
					.getRawBuildpath();
			for (IBuildpathEntry iBuildpathEntry : eentries) {
				if (iBuildpathEntry.getEntryKind() == IBuildpathEntry.BPE_CONTAINER
						&& iBuildpathEntry.getPath().segment(0).equals(
								ScriptRuntime.INTERPRETER_CONTAINER)) {
					containerEntry = iBuildpathEntry;
					break;
				}
			}
			IPath containerPath = null;
			IScriptProject jproject = fRoot.getScriptProject();
			IBuildpathEntry entry = containerEntry;
			if (entry == null) {
				entry = containerEntry;
			} else {
				if (entry.getEntryKind() == IBuildpathEntry.BPE_CONTAINER) {
					containerPath = entry.getPath();
					BuildpathContainerInitializer initializer = DLTKCore
							.getBuildpathContainerInitializer(containerPath
									.segment(0));
					IBuildpathContainer container = DLTKCore
							.getBuildpathContainer(containerPath, jproject);
					if (initializer == null || container == null) {
						return createMessageContent(
								composite,
								FanPreferencesMessages.SourceAttachmentPropertyPage_invalid_container);
					}

					// TODO verify!
					IInterpreterInstall install = ScriptRuntime
							.getInterpreterInstall(jproject);
					IBuildpathEntry[] entries = InterpreterContainer
							.getBuildpathEntries(install);
					for (IBuildpathEntry iBuildpathEntry : entries) {
						if (((com.xored.fanide.internal.core.model.PodFragment) fRoot)
								.getPodPath().equals(iBuildpathEntry.getPath())) {
							entry = iBuildpathEntry;
							break;
						}
					}
					Assert.isNotNull(entry);
				}
			}
			fContainerPath = containerPath;
			fEntry = entry;

			fSourceAttachmentBlock = new FanSourceAttachmentBlock(null, entry);
			return fSourceAttachmentBlock.createControl(composite);
		} catch (CoreException e) {
			e.printStackTrace();
			return createMessageContent(
					composite,
					FanPreferencesMessages.SourceAttachmentPropertyPage_noarchive_message);
		}
	}

	private Control createMessageContent(Composite composite, String message) {
		Composite inner = new Composite(composite, SWT.NONE);
		GridLayout layout = new GridLayout();
		layout.marginHeight = 0;
		layout.marginWidth = 0;
		inner.setLayout(layout);

		GridData gd = new GridData(GridData.HORIZONTAL_ALIGN_FILL);
		gd.widthHint = convertWidthInCharsToPixels(80);

		Label label = new Label(inner, SWT.LEFT + SWT.WRAP);
		label.setText(message);
		label.setLayoutData(gd);
		return inner;
	}

	/*
	 * @see IPreferencePage#performOk
	 */
	@Override
	public boolean performOk() {
		if (fSourceAttachmentBlock != null) {
			try {
				IBuildpathEntry entry = fSourceAttachmentBlock.getNewEntry();
				if (entry.getSourceAttachmentPath() != null
						&& entry.getSourceAttachmentPath().equals(
								fEntry.getSourceAttachmentPath())
						&& entry.getSourceAttachmentRootPath() != null
						&& entry.getSourceAttachmentRootPath().equals(
								fEntry.getSourceAttachmentRootPath())) {
					return true; // no change
				}
				fEntry.setSourceAttachmentPath(entry.getSourceAttachmentPath());
				fEntry.setSourceAttachmentRootPath(entry
						.getSourceAttachmentRootPath());

				IRunnableWithProgress runnable = FanSourceAttachmentBlock
						.getRunnable(getShell(), entry, fRoot
								.getScriptProject(), fContainerPath);
				PlatformUI.getWorkbench().getProgressService().run(true, true,
						runnable);
			} catch (InvocationTargetException e) {
				String title = FanPreferencesMessages.SourceAttachmentPropertyPage_error_title;
				String message = FanPreferencesMessages.SourceAttachmentPropertyPage_error_message;
				// ExceptionHandler.handle(e, getShell(), title, message);
				return false;
			} catch (InterruptedException e) {
				// cancelled
				return false;
			}
		}
		return true;
	}

	/*
	 * @see PreferencePage#performDefaults()
	 */
	@Override
	protected void performDefaults() {
		if (fSourceAttachmentBlock != null) {
			fSourceAttachmentBlock.setDefaults();
		}
		super.performDefaults();
	}

	private IProjectFragment getJARPackageFragmentRoot() throws CoreException {
		// try to find it as Java element (needed for external jars)
		IAdaptable adaptable = getElement();
		IModelElement elem = (IModelElement) adaptable
				.getAdapter(IModelElement.class);
		if (elem instanceof IProjectFragment) {
			return (IProjectFragment) elem;
		}
		return null;
	}

	/*
	 * @see IStatusChangeListener#statusChanged
	 */
	public void statusChanged(IStatus status) {
		setValid(!status.matches(IStatus.ERROR));
		// StatusUtil.applyToStatusLine(this, status);
	}

}
