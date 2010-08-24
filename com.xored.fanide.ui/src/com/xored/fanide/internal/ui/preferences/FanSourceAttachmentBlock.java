package com.xored.fanide.internal.ui.preferences;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.Assert;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.preferences.InstanceScope;
import org.eclipse.dltk.core.DLTKCore;
import org.eclipse.dltk.core.DLTKLanguageManager;
import org.eclipse.dltk.core.IBuildpathEntry;
import org.eclipse.dltk.core.IProjectFragment;
import org.eclipse.dltk.core.IScriptProject;
import org.eclipse.dltk.core.ModelException;
import org.eclipse.dltk.internal.ui.dialogs.StatusUtil;
import org.eclipse.dltk.internal.ui.wizards.buildpath.ArchiveFileFilter;
import org.eclipse.dltk.internal.ui.wizards.buildpath.BPListElement;
import org.eclipse.dltk.internal.ui.wizards.buildpath.FolderSelectionDialog;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.DialogField;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.IDialogFieldListener;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.IStringButtonAdapter;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.LayoutUtil;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.SelectionButtonDialogField;
import org.eclipse.dltk.internal.ui.wizards.dialogfields.StringButtonDialogField;
import org.eclipse.dltk.ui.DLTKUIPlugin;
import org.eclipse.dltk.ui.dialogs.StatusInfo;
import org.eclipse.dltk.ui.util.IStatusChangeListener;
import org.eclipse.dltk.ui.util.PixelConverter;
import org.eclipse.dltk.ui.viewsupport.BasicElementLabels;
import org.eclipse.jface.dialogs.Dialog;
import org.eclipse.jface.operation.IRunnableWithProgress;
import org.eclipse.jface.viewers.ILabelProvider;
import org.eclipse.jface.viewers.ITreeContentProvider;
import org.eclipse.jface.viewers.ViewerFilter;
import org.eclipse.jface.window.Window;
import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.DirectoryDialog;
import org.eclipse.swt.widgets.FileDialog;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.ui.model.WorkbenchContentProvider;
import org.eclipse.ui.model.WorkbenchLabelProvider;
import org.osgi.service.prefs.BackingStoreException;
import org.osgi.service.prefs.Preferences;

import com.xored.fanide.core.FanCore;
import com.xored.fanide.core.FanNature;
import com.xored.fanide.internal.core.model.FanSourceMapper;
import com.xored.fanide.internal.core.model.PodFragment;

public class FanSourceAttachmentBlock {
	private final IStatusChangeListener fContext;

	private StringButtonDialogField fFileNameField;
	private SelectionButtonDialogField fWorkspaceButton;
	private SelectionButtonDialogField fExternalFolderButton;

	private IStatus fNameStatus;

	/**
	 * The path to which the archive variable points. Null if invalid path or
	 * not resolvable. Must not exist.
	 */
	private IPath fFileVariablePath;

	private final IWorkspaceRoot fWorkspaceRoot;

	private Control fSWTWidget;
	private Label fFullPathResolvedLabel;

	private IScriptProject fProject;
	private final IBuildpathEntry fEntry;

	/**
	 * @param context
	 *            listeners for status updates
	 * @param entry
	 *            The entry to edit
	 */
	public FanSourceAttachmentBlock(IStatusChangeListener context,
			IBuildpathEntry entry) {
		Assert.isNotNull(entry);

		fContext = context;
		fEntry = entry;

		int kind = entry.getEntryKind();
		Assert.isTrue(kind == IBuildpathEntry.BPE_LIBRARY
				|| kind == IBuildpathEntry.BPE_VARIABLE);

		fWorkspaceRoot = ResourcesPlugin.getWorkspace().getRoot();

		fNameStatus = new StatusInfo();

		SourceAttachmentAdapter adapter = new SourceAttachmentAdapter();

		// create the dialog fields (no widgets yet)
		if (isVariableEntry()) {
			fFileNameField = new VariablePathDialogField(adapter);
			fFileNameField.setDialogFieldListener(adapter);
			fFileNameField
					.setLabelText(NewWizardMessages.SourceAttachmentBlock_filename_varlabel);
			fFileNameField
					.setButtonLabel(NewWizardMessages.SourceAttachmentBlock_filename_external_varbutton);
			((VariablePathDialogField) fFileNameField)
					.setVariableButtonLabel(NewWizardMessages.SourceAttachmentBlock_filename_variable_button);

		} else {
			fFileNameField = new StringButtonDialogField(adapter);
			fFileNameField.setDialogFieldListener(adapter);
			fFileNameField
					.setLabelText(NewWizardMessages.SourceAttachmentBlock_filename_label);
			fFileNameField
					.setButtonLabel(NewWizardMessages.SourceAttachmentBlock_filename_externalfile_button);

			fWorkspaceButton = new SelectionButtonDialogField(SWT.PUSH);
			fWorkspaceButton.setDialogFieldListener(adapter);
			fWorkspaceButton
					.setLabelText(NewWizardMessages.SourceAttachmentBlock_filename_internal_button);

			fExternalFolderButton = new SelectionButtonDialogField(SWT.PUSH);
			fExternalFolderButton.setDialogFieldListener(adapter);
			fExternalFolderButton
					.setLabelText(NewWizardMessages.SourceAttachmentBlock_filename_externalfolder_button);
		}

		// set the old settings
		setDefaults();
	}

	public void setDefaults() {
		if (fEntry.getSourceAttachmentPath() != null) {
			fFileNameField.setText(fEntry.getSourceAttachmentPath().toString());
		} else {
			fFileNameField.setText(""); //$NON-NLS-1$
		}
	}

	private boolean isVariableEntry() {
		return fEntry.getEntryKind() == IBuildpathEntry.BPE_VARIABLE;
	}

	/**
	 * Gets the source attachment path chosen by the user
	 * 
	 * @return the source attachment path
	 */
	public IPath getSourceAttachmentPath() {
		if (fFileNameField.getText().length() == 0) {
			return null;
		}
		return getFilePath();
	}

	/**
	 * Gets the source attachment root chosen by the user Returns null to let
	 * JCore automatically detect the root.
	 * 
	 * @return the source attachment root path
	 */
	public IPath getSourceAttachmentRootPath() {
		return null;
	}

	public IBuildpathEntry getNewEntry() {
		BPListElement elem = BPListElement.createFromExisting(fEntry, fProject);
		// elem.setAttribute(BPListElement.,
		// getSourceAttachmentPath());
		elem.setSourcePath(getSourceAttachmentPath());
		elem.setSourceRootPath(getSourceAttachmentRootPath());
		return elem.getBuildpathEntry();
	}

	/**
	 * Creates the control
	 * 
	 * @param parent
	 *            the parent
	 * @return the created control
	 */
	public Control createControl(Composite parent) {
		PixelConverter converter = new PixelConverter(parent);

		fSWTWidget = parent;

		Composite composite = new Composite(parent, SWT.NONE);

		GridLayout layout = new GridLayout();
		layout.marginHeight = 0;
		layout.marginWidth = 0;
		layout.numColumns = 4;
		composite.setLayout(layout);

		if (isVariableEntry()) {
			int widthHint = converter.convertWidthInCharsToPixels(40);
			int labelWidthHint = widthHint * 2;

			Label message = new Label(composite, SWT.WRAP);
			GridData gd = new GridData(GridData.FILL, GridData.BEGINNING,
					false, false, 4, 1);
			message.setLayoutData(gd);
			message.setText(/* NewWizardMessages.SourceAttachmentBlock_message */
			NewWizardMessages.bind(
					NewWizardMessages.SourceAttachmentBlock_message,
					BasicElementLabels.getResourceName(fEntry.getPath()
							.lastSegment())));

			// DialogField.createEmptySpace(composite, 1);

			Label desc = new Label(composite, SWT.WRAP);
			gd = new GridData(GridData.FILL, GridData.BEGINNING, false, false,
					4, 1);
			gd.widthHint = labelWidthHint;
			desc.setLayoutData(gd);
			desc
					.setText(NewWizardMessages.SourceAttachmentBlock_filename_description);

			fFileNameField.doFillIntoGrid(composite, 4);
			LayoutUtil.setWidthHint(fFileNameField.getTextControl(null),
					widthHint);

			// label that shows the resolved path for variable jars
			// DialogField.createEmptySpace(composite, 1);
			fFullPathResolvedLabel = new Label(composite, SWT.WRAP);
			fFullPathResolvedLabel.setText(getResolvedLabelString());
			gd = new GridData(GridData.FILL, GridData.BEGINNING, false, false,
					4, 1);
			gd.widthHint = labelWidthHint;
			fFullPathResolvedLabel.setLayoutData(gd);

			LayoutUtil.setHorizontalGrabbing(fFileNameField
					.getTextControl(null));
		} else {
			int widthHint = converter.convertWidthInCharsToPixels(60);

			GridData gd = new GridData(GridData.FILL, GridData.BEGINNING,
					false, false, 3, 1);
			gd.widthHint = converter.convertWidthInCharsToPixels(50);

			Label message = new Label(composite, SWT.LEFT + SWT.WRAP);
			message.setLayoutData(gd);
			message.setText(/* NewWizardMessages.SourceAttachmentBlock_message */
			NewWizardMessages.bind(
					NewWizardMessages.SourceAttachmentBlock_message,
					BasicElementLabels.getResourceName(fEntry.getPath()
							.lastSegment())));

			fWorkspaceButton.doFillIntoGrid(composite, 1);
			((GridData) fWorkspaceButton.getSelectionButton(null)
					.getLayoutData()).verticalAlignment = SWT.END;

			// archive name field
			fFileNameField.doFillIntoGrid(composite, 4);
			LayoutUtil.setWidthHint(fFileNameField.getTextControl(null),
					widthHint);
			LayoutUtil.setHorizontalGrabbing(fFileNameField
					.getTextControl(null));

			// Additional 'browse workspace' button for normal jars
			DialogField.createEmptySpace(composite, 3);

			fExternalFolderButton.doFillIntoGrid(composite, 1);
		}

		fFileNameField.postSetFocusOnDialogField(parent.getDisplay());

		Dialog.applyDialogFont(composite);

		// PlatformUI.getWorkbench().getHelpSystem().setHelp(composite,
		// IJavaHelpContextIds.SOURCE_ATTACHMENT_BLOCK);
		return composite;
	}

	private class SourceAttachmentAdapter implements IStringButtonAdapter,
			IDialogFieldListener {

		// -------- IStringButtonAdapter --------
		public void changeControlPressed(DialogField field) {
			attachmentChangeControlPressed(field);
		}

		// ---------- IDialogFieldListener --------
		public void dialogFieldChanged(DialogField field) {
			attachmentDialogFieldChanged(field);
		}
	}

	private void attachmentChangeControlPressed(DialogField field) {
		if (field == fFileNameField) {
			IPath jarFilePath = isVariableEntry() ? chooseExtension()
					: chooseExtJarFile();
			if (jarFilePath != null) {
				fFileNameField.setText(jarFilePath.toString());
			}
		}
	}

	// ---------- IDialogFieldListener --------

	private void attachmentDialogFieldChanged(DialogField field) {
		if (field == fFileNameField) {
			fNameStatus = updateFileNameStatus();
		} else if (field == fWorkspaceButton) {
			IPath jarFilePath = chooseInternal();
			if (jarFilePath != null) {
				fFileNameField.setText(jarFilePath.toString());
			}
			return;
		} else if (field == fExternalFolderButton) {
			IPath folderPath = chooseExtFolder();
			if (folderPath != null) {
				fFileNameField.setText(folderPath.toString());
			}
			return;
		}
		doStatusLineUpdate();
	}

	private void doStatusLineUpdate() {
		fFileNameField.enableButton(canBrowseFileName());

		// set the resolved path for variable jars
		if (fFullPathResolvedLabel != null) {
			fFullPathResolvedLabel.setText(getResolvedLabelString());
		}

		IStatus status = StatusUtil
				.getMostSevere(new IStatus[] { fNameStatus });
		// fContext.statusChanged(status);
	}

	private boolean canBrowseFileName() {
		if (!isVariableEntry()) {
			return true;
		}
		// to browse with a variable JAR, the variable name must point to a
		// directory
		if (fFileVariablePath != null) {
			return fFileVariablePath.toFile().isDirectory();
		}
		return false;
	}

	private String getResolvedLabelString() {
		IPath resolvedPath = getResolvedPath(getFilePath());
		if (resolvedPath != null) {
			return "BasicElementLabels.getPathLabel(resolvedPath, true)";
		}
		return ""; //$NON-NLS-1$
	}

	private IPath getResolvedPath(IPath path) {
		if (path != null) {
			String varName = path.segment(0);
			if (varName != null) {
				IPath varPath = DLTKCore.getBuildpathVariable(varName);
				if (varPath != null) {
					return varPath.append(path.removeFirstSegments(1));
				}
			}
		}
		return null;
	}

	private IStatus updateFileNameStatus() {
		StatusInfo status = new StatusInfo();
		fFileVariablePath = null;

		String fileName = fFileNameField.getText();
		if (fileName.length() == 0) {
			// no source attachment
			return status;
		} else {
			if (!Path.EMPTY.isValidPath(fileName)) {
				status
						.setError("NewWizardMessages.SourceAttachmentBlock_filename_error_notvalid");
				return status;
			}
			IPath filePath = Path.fromOSString(fileName);
			IPath resolvedPath;
			if (isVariableEntry()) {
				if (filePath.getDevice() != null) {
					status
							.setError("NewWizardMessages.SourceAttachmentBlock_filename_error_deviceinpath");
					return status;
				}
				String varName = filePath.segment(0);
				if (varName == null) {
					status
							.setError("NewWizardMessages.SourceAttachmentBlock_filename_error_notvalid");
					return status;
				}
				fFileVariablePath = DLTKCore.getBuildpathVariable(varName);
				if (fFileVariablePath == null) {
					status
							.setError("NewWizardMessages.SourceAttachmentBlock_filename_error_varnotexists");
					return status;
				}
				resolvedPath = fFileVariablePath.append(filePath
						.removeFirstSegments(1));

				if (resolvedPath.isEmpty()) {
					status
							.setWarning("NewWizardMessages.SourceAttachmentBlock_filename_warning_varempty");
					return status;
				}
				File file = resolvedPath.toFile();
				if (!file.exists()) {
					String message = "Messages.format(NewWizardMessages.SourceAttachmentBlock_filename_error_filenotexists, BasicElementLabels.getPathLabel(resolvedPath, true))";
					status.setWarning(message);
					return status;
				}
				if (!resolvedPath.isAbsolute()) {
					String message = "Messages.format(NewWizardMessages.SourceAttachmentBlock_filename_error_notabsolute, BasicElementLabels.getPathLabel(filePath, false))";
					status.setError(message);
					return status;
				}

				String deprecationMessage = "BuildPathSupport.getDeprecationMessage(varName)";
				if (deprecationMessage != null) {
					status.setWarning(deprecationMessage);
					return status;
				}

			} else {
				// JDT/Core only supports source attachments in archives on the
				// local file system. So using getLocation is save here.
				File file = filePath.toFile();
				IResource res = fWorkspaceRoot.findMember(filePath);
				if (res != null && res.getLocation() != null) {
					file = res.getLocation().toFile();
				}
				if (!file.exists()) {
					String message = "Messages.format(NewWizardMessages.SourceAttachmentBlock_filename_error_filenotexists, BasicElementLabels.getPathLabel(filePath, false))";
					status.setError(message);
					return status;
				}
				if (res == null) {
					if (!filePath.isAbsolute()) {
						String message = "Messages.format(NewWizardMessages.SourceAttachmentBlock_filename_error_notabsolute, BasicElementLabels.getPathLabel(filePath, false))";
						status.setError(message);
						return status;
					}
				}
			}

		}
		return status;
	}

	private IPath getFilePath() {
		return Path.fromOSString(fFileNameField.getText()).makeAbsolute();
	}

	private IPath chooseExtension() {
		IPath currPath = getFilePath();
		if (currPath.segmentCount() == 0) {
			currPath = fEntry.getPath();
		}

		IPath resolvedPath = getResolvedPath(currPath);
		File initialSelection = resolvedPath != null ? resolvedPath.toFile()
				: null;

		String currVariable = currPath.segment(0);
		// JARFileSelectionDialog dialog = new
		// JARFileSelectionDialog(getShell(),
		// false, true, false);
		// dialog
		// .setTitle("NewWizardMessages.SourceAttachmentBlock_extvardialog_title");
		// dialog
		// .setMessage("NewWizardMessages.SourceAttachmentBlock_extvardialog_description");
		// dialog.setInput(fFileVariablePath.toFile());
		// dialog.setInitialSelection(initialSelection);
		// if (dialog.open() == Window.OK) {
		// File result = (File) dialog.getResult()[0];
		// IPath returnPath = Path.fromOSString(result.getPath())
		// .makeAbsolute();
		// return modifyPath(returnPath, currVariable);
		// }
		return null;
	}

	/*
	 * Opens a dialog to choose a jar from the file system.
	 */
	private IPath chooseExtJarFile() {
		IPath currPath = getFilePath();
		if (currPath.segmentCount() == 0) {
			currPath = fEntry.getPath();
		}

		if (ArchiveFileFilter.isArchivePath(currPath)) {
			currPath = currPath.removeLastSegments(1);
		}

		FileDialog dialog = new FileDialog(getShell());
		dialog
				.setText(NewWizardMessages.SourceAttachmentBlock_extjardialog_text);
		// dialog.setFilterExtensions(ArchiveFileFilter.JAR_ZIP_FILTER_EXTENSIONS);
		dialog.setFilterPath(currPath.toOSString());
		String res = dialog.open();
		if (res != null) {
			return Path.fromOSString(res).makeAbsolute();
		}
		return null;
	}

	private IPath chooseExtFolder() {
		IPath currPath = getFilePath();
		if (currPath.segmentCount() == 0) {
			currPath = fEntry.getPath();
		}
		if (ArchiveFileFilter.isArchivePath(currPath)) {
			currPath = currPath.removeLastSegments(1);
		}

		DirectoryDialog dialog = new DirectoryDialog(getShell());
		dialog
				.setMessage(NewWizardMessages.SourceAttachmentBlock_extfolderdialog_message);
		dialog
				.setText(NewWizardMessages.SourceAttachmentBlock_extfolderdialog_text);
		dialog.setFilterPath(currPath.toOSString());
		String res = dialog.open();
		if (res != null) {
			return Path.fromOSString(res).makeAbsolute();
		}
		return null;
	}

	/*
	 * Opens a dialog to choose an internal jar.
	 */
	private IPath chooseInternal() {
		String initSelection = fFileNameField.getText();

		ViewerFilter filter = new ArchiveFileFilter((List) null, false);

		ILabelProvider lp = new WorkbenchLabelProvider();
		ITreeContentProvider cp = new WorkbenchContentProvider();

		IResource initSel = null;
		if (initSelection.length() > 0) {
			initSel = fWorkspaceRoot.findMember(new Path(initSelection));
		}
		if (initSel == null) {
			initSel = fWorkspaceRoot.findMember(fEntry.getPath());
		}

		FolderSelectionDialog dialog = new FolderSelectionDialog(getShell(),
				lp, cp);
		dialog.setAllowMultiple(false);
		dialog.addFilter(filter);
		dialog
				.setTitle(NewWizardMessages.SourceAttachmentBlock_intjardialog_title);
		dialog
				.setMessage(NewWizardMessages.SourceAttachmentBlock_intjardialog_message);
		dialog.setInput(fWorkspaceRoot);
		dialog.setInitialSelection(initSel);
		if (dialog.open() == Window.OK) {
			IResource res = (IResource) dialog.getFirstResult();
			return res.getFullPath();
		}
		return null;
	}

	private Shell getShell() {
		if (fSWTWidget != null) {
			return fSWTWidget.getShell();
		}
		return DLTKUIPlugin.getActiveWorkbenchShell();
	}

	/**
	 * Takes a path and replaces the beginning with a variable name (if the
	 * beginning matches with the variables value)
	 * 
	 * @param path
	 *            the path
	 * @param varName
	 *            the variable
	 * @return the modified path
	 */
	private IPath modifyPath(IPath path, String varName) {
		if (varName == null || path == null) {
			return null;
		}
		if (path.isEmpty()) {
			return new Path(varName);
		}

		IPath varPath = DLTKCore.getBuildpathVariable(varName);
		if (varPath != null) {
			if (varPath.isPrefixOf(path)) {
				path = path.removeFirstSegments(varPath.segmentCount());
			} else {
				path = new Path(path.lastSegment());
			}
		} else {
			path = new Path(path.lastSegment());
		}
		return new Path(varName).append(path);
	}

	/**
	 * Creates a runnable that sets the source attachment by modifying the
	 * project's classpath.
	 * 
	 * @param shell
	 *            the shell
	 * @param newEntry
	 *            the new entry
	 * @param jproject
	 *            the Java project
	 * @param containerPath
	 *            the path of the parent container or <code>null</code> if the
	 *            element is not in a container
	 * @return return the runnable
	 */
	public static IRunnableWithProgress getRunnable(final Shell shell,
			final IBuildpathEntry newEntry, final IScriptProject jproject,
			final IPath containerPath) {
		return new IRunnableWithProgress() {
			public void run(IProgressMonitor monitor)
					throws InvocationTargetException {
				Preferences preferences = new InstanceScope()
						.getNode(FanCore.PLUGIN_ID);
				Preferences sub1 = preferences.node("FanPodSrc");
				if (newEntry.getPath() != null) {
					sub1.put("path", newEntry.getPath().toPortableString());
				}
				if (newEntry.getSourceAttachmentPath() != null) {
					sub1.put("src", newEntry.getSourceAttachmentPath()
							.toPortableString());
				}
				if (newEntry.getSourceAttachmentRootPath() != null) {
					sub1.put("srcRoot", newEntry.getSourceAttachmentRootPath()
							.toPortableString());
				}

				try {
					// Forces the application to save the preferences
					preferences.flush();

					IProject[] projects = ResourcesPlugin.getWorkspace()
							.getRoot().getProjects();
					if (projects == null) {
						return;
					}
					for (IProject iProject : projects) {

						if (DLTKLanguageManager.hasScriptNature(iProject)) {
							IScriptProject sProject = DLTKCore.create(iProject);
							if (sProject.getLanguageToolkit().getNatureId()
									.equals(FanNature.NATURE_ID)) {
								try {
									IProjectFragment projFragment = sProject
											.getProjectFragment("#special#pod#/@/"
													+ newEntry.getPath()
															.lastSegment());
									if (projFragment != null
											&& projFragment instanceof PodFragment) {
										((PodFragment) projFragment)
												.setSourceMapper(new FanSourceMapper(
														newEntry
																.getSourceAttachmentPath(),
														newEntry
																.getSourceAttachmentRootPath()));
										projFragment.makeConsistent(null);
									}
								} catch (ModelException e) {
									FanCore.log(e);
								}
							}
						}
					}

					// ((org.eclipse.dltk.internal.core.ScriptProject) jproject)
					// .updateProjectFragments();
				} catch (BackingStoreException e) {
					e.printStackTrace();
				}
			}
		};
	}
}

class VariablePathDialogField extends StringButtonDialogField {

	public VariablePathDialogField(IStringButtonAdapter adapter) {
		super(adapter);
		// TODO Auto-generated constructor stub
	}

	public void setVariableButtonLabel(String label) {
	}

}