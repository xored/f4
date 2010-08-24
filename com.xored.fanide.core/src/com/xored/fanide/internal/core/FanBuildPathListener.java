package com.xored.fanide.internal.core;

import java.util.HashSet;
import java.util.Set;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResourceChangeEvent;
import org.eclipse.core.resources.IResourceDelta;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Status;
import org.eclipse.core.runtime.jobs.Job;
import org.eclipse.dltk.core.DLTKCore;
import org.eclipse.dltk.core.ElementChangedEvent;
import org.eclipse.dltk.core.IElementChangedListener;
import org.eclipse.dltk.core.IModelElement;
import org.eclipse.dltk.core.IModelElementDelta;
import org.eclipse.dltk.core.IProjectFragment;
import org.eclipse.dltk.core.IScriptProject;

import com.xored.fanide.core.BuildFan;
import com.xored.fanide.core.FanCore;
import com.xored.fanide.core.FanNature;
import com.xored.fanide.core.utils.FanProjectUtils;

public class FanBuildPathListener implements IElementChangedListener {

	private static class UpdateBuildJob extends Job {

		static class Family {
			final IFile file;

			public Family(IFile file) {
				this.file = file;
			}

		}

		private final IFile buildFile;

		/**
		 * @param podFanFile
		 */
		public UpdateBuildJob(IFile buildFile) {
			super("Updating " + buildFile.getFullPath().toString()); //$NON-NLS-1$
			this.buildFile = buildFile;
			setRule(buildFile);
			setPriority(Job.SHORT);
		}

		@Override
		protected IStatus run(IProgressMonitor monitor) {
			try {
				BuildFan.updateSrcDirs(buildFile, FanProjectUtils
						.getSrcDirs(DLTKCore.create(buildFile.getProject())));
			} catch (Exception e) {
				FanCore.log(e);
			}
			return Status.OK_STATUS;
		}

		@Override
		public boolean belongsTo(Object family) {
			if (family instanceof Family) {
				final Family f = (Family) family;
				return f.file == null || buildFile.equals(f.file);
			}
			return false;
		}

	}

	public static void updateBuildFan(IProject project) {
		final IFile buildFile = project.getFile(BuildFan.FILENAME);
		if (!buildFile.exists()) {
			return;
		}
		Job[] find = Job.getJobManager().find(
				new UpdateBuildJob.Family(buildFile));
		if (find.length > 0) { // Already have one update job in queue.
			return;
		}
		new UpdateBuildJob(buildFile).schedule();
	}

	public void elementChanged(ElementChangedEvent event) {
		if (isRunningInUpdateJob()) {
			return;
		}
		IModelElementDelta delta = event.getDelta();

		final Set<IProject> projectsToUpdate = new HashSet<IProject>();
		processDelta(delta, projectsToUpdate);
		for (IProject prj : projectsToUpdate) {
			if (!select(prj)) {
				// additional safety check
				continue;
			}
			updateBuildFan(prj);
		}
	}

	private void processDelta(IModelElementDelta delta,
			Set<IProject> projectsToUpdate) {
		IModelElement element = delta.getElement();
		if (element.getElementType() == IModelElement.SCRIPT_PROJECT) {
			final IProject project = ((IScriptProject) element).getProject();
			if (!select(project)) {
				// early exit if not FAN project
				return;
			}
			if ((delta.getFlags() & IModelElementDelta.F_BUILDPATH_CHANGED) != 0) {
				projectsToUpdate.add(project);
				return;
			}
			if (containsBuildFanInResourceDelta(delta)) {
				projectsToUpdate.add(project);
				return;
			}
		}
		if (element.getElementType() == IModelElement.PROJECT_FRAGMENT) {
			IProjectFragment fragment = (IProjectFragment) element;
			if (fragment.isExternal()) {
				return;
			}
			if ((delta.getFlags() & IModelElementDelta.F_ADDED_TO_BUILDPATH) != 0
					|| (delta.getFlags() & IModelElementDelta.F_REMOVED_FROM_BUILDPATH) != 0) {
				projectsToUpdate.add(element.getScriptProject().getProject());
				return;
			}
		}
		if (element.getElementType() == IModelElement.SCRIPT_FOLDER) {
			if (delta.getKind() == IModelElementDelta.ADDED
					|| delta.getKind() == IModelElementDelta.REMOVED) {
				projectsToUpdate.add(element.getScriptProject().getProject());
				return;
			}
		}
		// if we really care about pod.fan - test source modules too
		// if (element.getElementType() == IModelElement.SOURCE_MODULE) {
		// final IResource resource = element.getResource();
		// if (resource != null) {
		// final IPath path = resource.getProjectRelativePath();
		// if (path.segmentCount() == 1
		// && FanCore.POD_FAN.equals(path.segment(0))) {
		// projectsToUpdate.add(resource.getProject());
		// return;
		// }
		// }
		// }
		IModelElementDelta[] affectedChildren = delta.getAffectedChildren();
		for (IModelElementDelta childDelta : affectedChildren) {
			processDelta(childDelta, projectsToUpdate);
		}

	}

	private static boolean isRunningInUpdateJob() {
		final Job job = Job.getJobManager().currentJob();
		return job != null && job.belongsTo(new UpdateBuildJob.Family(null));
	}

	private static boolean containsBuildFanInResourceDelta(
			IModelElementDelta delta) {
		final IResourceDelta[] resourceDeltas = delta.getResourceDeltas();
		if (resourceDeltas != null) {
			for (IResourceDelta resourceDelta : resourceDeltas) {
				final IPath path = resourceDelta.getProjectRelativePath();
				if (path.segmentCount() == 1
						&& BuildFan.FILENAME.equals(path.segment(0))) {
					return true;
				}
			}
		}
		return false;
	}

	private boolean select(IProject project) {
		try {
			return project.isOpen() && project.hasNature(FanNature.NATURE_ID);
		} catch (CoreException e) {
			return false;
		}
	}

	private static IElementChangedListener listener = null;

	public static void install() {
		if (listener == null) {
			listener = new FanBuildPathListener();
			DLTKCore.addElementChangedListener(listener,
					IResourceChangeEvent.POST_CHANGE);
		}
	}

	public static void uninstall() {
		if (listener != null) {
			DLTKCore.removeElementChangedListener(listener);
			listener = null;
		}
	}

}
