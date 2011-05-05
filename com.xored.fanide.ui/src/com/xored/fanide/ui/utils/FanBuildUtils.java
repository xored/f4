package com.xored.fanide.ui.utils;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IncrementalProjectBuilder;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.swt.widgets.Shell;

public class FanBuildUtils {
	public static boolean processChanges(IProject project,
			IProgressMonitor monitor) {
		if (project != null) {
			try {
				project.build(IncrementalProjectBuilder.FULL_BUILD, monitor);
			} catch (CoreException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else {
			try {
				ResourcesPlugin.getWorkspace().build(
						IncrementalProjectBuilder.FULL_BUILD, monitor);
			} catch (CoreException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return true;
	}

	public static boolean doBuildDialog(IProject project, Shell shell) {
		// boolean doBuild = false;
		// boolean hasFanProjects = false;
		// IProject[] projects = ResourcesPlugin.getWorkspace().getRoot()
		// .getProjects();
		// for (IProject prj : projects) {
		// if (DLTKLanguageManager.hasScriptNature(prj)) {
		// IScriptProject scriptProject = DLTKCore.create(prj);
		// IDLTKLanguageToolkit toolkit = scriptProject
		// .getLanguageToolkit();
		// if (toolkit.getNatureId().equals(FanNature.NATURE_ID)) {
		// hasFanProjects = true;
		// break;
		// }
		// }
		// }
		// if (!hasFanProjects) {
		// return false;
		// }
		// String[] strings = getFullBuildDialogStrings(project == null);
		// if (strings != null) {
		// MessageDialog dialog = new MessageDialog(shell, strings[0], null,
		// strings[1], MessageDialog.QUESTION, new String[] {
		// IDialogConstants.YES_LABEL,
		// IDialogConstants.NO_LABEL }, 2);
		// int res = dialog.open();
		// if (res == 0) {
		// doBuild = true;
		// } else if (res != 1) {
		// return false; // cancel pressed
		// }
		// }
		// return doBuild;
		return true;
	}

	/*private static String[] getFullBuildDialogStrings(boolean workspaceSettings) {
		String title = "Interpreter settings changed";
		String message;
		if (workspaceSettings) {
			message = PreferencesMessages
					.bind(
							PreferencesMessages.PreferenceChange_rebuildWorkspaceMessageTemplate,
							"");
		} else {
			message = PreferencesMessages
					.bind(
							PreferencesMessages.PreferenceChange_rebuildProjectMessageTemplate,
							"");
		}
		return new String[] { title, message };
	}*/
}
