//import org.eclipse.core.runtime.CoreException;

using [java] org.eclipse.swt.widgets::Shell
using [java] org.eclipse.core.runtime::IProgressMonitor
using [java] org.eclipse.core.resources::IncrementalProjectBuilder
using [java] org.eclipse.core.resources::IProject
using [java] org.eclipse.core.resources::ResourcesPlugin

class FanBuildUtils
{
  private new make() { }
  static Bool processChanges(IProject? project, IProgressMonitor monitor)
  {
		if (project != null)
				project.build(IncrementalProjectBuilder.FULL_BUILD, monitor)
    else
				ResourcesPlugin.getWorkspace.build(IncrementalProjectBuilder.FULL_BUILD, monitor)
		return true
	}

	public static Bool doBuildDialog(IProject? project, Shell shell)
  {
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
		return true
	}
//
//	/*private static String[] getFullBuildDialogStrings(boolean workspaceSettings) {
//		String title = "Interpreter settings changed";
//		String message;
//		if (workspaceSettings) {
//			message = PreferencesMessages
//					.bind(
//							PreferencesMessages.PreferenceChange_rebuildWorkspaceMessageTemplate,
//							"");
//		} else {
//			message = PreferencesMessages
//					.bind(
//							PreferencesMessages.PreferenceChange_rebuildProjectMessageTemplate,
//							"");
//		}
//		return new String[] { title, message };
//	}*/
}
