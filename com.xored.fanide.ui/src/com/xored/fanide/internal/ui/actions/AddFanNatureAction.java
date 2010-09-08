package com.xored.fanide.internal.ui.actions;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IProjectDescription;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.core.runtime.OperationCanceledException;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.SubProgressMonitor;
import org.eclipse.dltk.core.DLTKCore;
import org.eclipse.dltk.core.IBuildpathEntry;
import org.eclipse.dltk.core.IScriptProject;
import org.eclipse.dltk.core.ModelException;
import org.eclipse.dltk.core.environment.EnvironmentManager;
import org.eclipse.dltk.core.environment.IEnvironment;
import org.eclipse.dltk.internal.ui.util.CoreUtility;
import org.eclipse.dltk.launching.IInterpreterInstall;
import org.eclipse.dltk.launching.ScriptRuntime;
import org.eclipse.dltk.launching.ScriptRuntime.DefaultInterpreterEntry;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.util.SafeRunnable;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.ui.IObjectActionDelegate;
import org.eclipse.ui.IWorkbenchPart;

import com.xored.fanide.core.FanCore;
import com.xored.fanide.core.FanNature;
import com.xored.fanide.core.IProjectConfigurer;
import com.xored.fanide.internal.ui.wizards.FanProjectCreationWizard;

public class AddFanNatureAction implements IObjectActionDelegate {
	private ISelection selection;

	public void setActivePart(IAction action, IWorkbenchPart targetPart) {
	}

	public void run(IAction action) {
		if (this.selection == null) {
			return;
		}
		final Set<IProject> projects = new HashSet<IProject>();
		final IStructuredSelection sel = (IStructuredSelection) this.selection;
		for (Iterator<?> iterator = sel.iterator(); iterator.hasNext();) {
			Object obj = iterator.next();
			if (obj instanceof IProject)
				projects.add((IProject) obj);
		}
		SafeRunnable.run(new SafeRunnable() {
			public void run() throws Exception {
				if (!projects.isEmpty()) {
					for (IProject project : projects) {
						NullProgressMonitor monitor = new NullProgressMonitor();
						monitor.beginTask("Configuring project...", 3); //$NON-NLS-1$
						try {
							for (IProjectConfigurer configurer : FanCore
									.getConfigurers()) {
								String[] configurableNatures = configurer
										.getConfigurableProjectNatures();
								for (String nature : configurableNatures) {
									if (project.hasNature(nature)) {
										configurer.configure(project);
										break;
									}
								}
							}
							
							// TODO: Is there a better place for this code?
							if (!project.hasNature(getNature())) {
							  IProjectDescription desc = project.getDescription();
							  String[] nats = desc.getNatureIds();
							  String[] newNats = new String[nats.length + 1];
							  System.arraycopy(nats, 0, newNats, 0, nats.length);
							  newNats[nats.length] = getNature();
							  desc.setNatureIds(newNats);
							  project.setDescription(desc, monitor);
							}
							
							setInstallInterpreterBuildPath(project, monitor);
							addSourceFolder("fan", DLTKCore.create(project));
							FanProjectCreationWizard.createBuildFanFile(
									DLTKCore.create(project), monitor);
						} catch (OperationCanceledException e) {
							throw new InterruptedException();
						} finally {
							monitor.done();
						}
					}
				}
			}
		});
	}

	public void selectionChanged(IAction action, ISelection selection) {
		boolean enable = false;
		if (selection != null && selection instanceof IStructuredSelection
				&& !selection.isEmpty()) {
			boolean disable = false;
			final IStructuredSelection sel = (IStructuredSelection) selection;
			for (Iterator<?> iterator = sel.iterator(); iterator.hasNext();) {
				Object obj = iterator.next();
				if (obj instanceof IProject) {
					IProject project = (IProject) obj;
					try {
						if (project.exists() && project.hasNature(getNature())) {
							disable = true;
							break;
						}
					} catch (CoreException ex) {
						disable = true;
						break;
					}
				}
			}
			enable = !disable;
		}
		action.setEnabled(enable);
		if (enable) {
			this.selection = selection;
		}
	}

	private static String getNature() {
		return FanNature.NATURE_ID;
	}

	private static void setInstallInterpreterBuildPath(IProject project,
			IProgressMonitor monitor) {
		IEnvironment environment = EnvironmentManager.getLocalEnvironment();
		IInterpreterInstall interpreter = ScriptRuntime
				.getDefaultInterpreterInstall(new DefaultInterpreterEntry(
						getNature(), environment.getId()));
		IBuildpathEntry[] paths = null;
		if (interpreter != null) {
			IPath InterpreterEnvironmentContainerPath = new Path(
					ScriptRuntime.INTERPRETER_CONTAINER);
			IPath newPath = InterpreterEnvironmentContainerPath.append(
					interpreter.getInterpreterInstallType().getId()).append(
					interpreter.getName());
			IBuildpathEntry bPath = DLTKCore.newContainerEntry(newPath);
			if (bPath != null) {
				paths = new IBuildpathEntry[] { bPath };
			}
		}
		try {
			if (paths != null) {
				IScriptProject prj = DLTKCore.create(project);
				prj.setRawBuildpath(paths, new SubProgressMonitor(monitor, 2));
			}
		} catch (ModelException ex) {
			ex.printStackTrace();
		}
	}

	private static void addSourceFolder(String name, IScriptProject project)
			throws CoreException {
		final IFolder folder = project.getProject().getFolder(name);
		CoreUtility.createFolder(folder, true, true, null);
		if (!project.isOnBuildpath(folder)) {
			List<IBuildpathEntry> entries = new ArrayList();
			entries.addAll(Arrays.asList(project.getRawBuildpath()));
			entries.add(DLTKCore.newSourceEntry(folder.getFullPath()));
			project.setRawBuildpath(entries.toArray(new IBuildpathEntry[0]),
					null);
		}
	}

}
