package com.xored.fanide.core.utils;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IResourceVisitor;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.QualifiedName;
import org.eclipse.dltk.core.DLTKCore;
import org.eclipse.dltk.core.IScriptProject;

import com.xored.fanide.core.FanNature;

public class FanProjectUtils {
	private static final String QUALIFIER = "com.xored.fanide.projectbuilder";
	private static final QualifiedName POD_NAME_PROJECT_PROPERTY = new QualifiedName(
			QUALIFIER, "podName");

	/*public static String getPodNameForElement(IModelElement element) {
		IProjectFragment proj = (IProjectFragment) element
				.getAncestor(IProjectFragment.PROJECT_FRAGMENT);
		if (proj.isArchive() && proj.isExternal()) {
			IPath podPath = proj.getPath();
			String ext = podPath.getFileExtension();
			if (ext != null && ext.equalsIgnoreCase(POD_EXTENSION)) {
				return podPath.removeFileExtension().lastSegment();
			}
		} else {
			return getPodNameForElement(element.getScriptProject().getProject());
		}
		return null;
	}*/

	/*public static boolean isPodProject(IScriptProject project) {
		if (!project.isOpen())
			return false;
		String element = FanProjectUtils.getPodNameForElement(project
				.getProject());
		return element != null;
	}*/

	/*public static String getPodNameForElement(IResource resource) {
		try {
			IProject project = resource.getProject();
			String property = project
					.getPersistentProperty(POD_NAME_PROJECT_PROPERTY);
			if (property == null) {
				// Try to read property from pod.fan
				String podName = BuildFan.readPodName(project);
				if (podName != null) {
					project.setPersistentProperty(POD_NAME_PROJECT_PROPERTY,
							podName);
				}
				return podName;
			}
			return property;
		} catch (CoreException e) {
			FanCore.log(e);
		}
		return null;
	}*/

	public static String getSrcDirs(final IScriptProject project)
			throws CoreException {
		final List<IPath> folders = new ArrayList<IPath>();
		project.getProject().accept(new IResourceVisitor() {

			public boolean visit(IResource resource) throws CoreException {
				if ((resource.getType() == IResource.FOLDER || resource
						.getType() == IResource.PROJECT)
						&& project.isOnBuildpath(resource)) {
					folders.add(resource.getProjectRelativePath());
				}
				return true;
			}

		});
		StringBuilder sb = new StringBuilder();
		for (IPath path : folders) {
			if (sb.length() != 0) {
				sb.append(", "); //$NON-NLS-1$
			}
			sb.append("`"); //$NON-NLS-1$
			if (!path.isEmpty()) {
				sb.append(path.toString());
			} else {
				// current directory
				sb.append("."); //$NON-NLS-1$
			}
			sb.append("/`"); //$NON-NLS-1$
		}
		return sb.toString();
	}

	public static boolean isOnBuildPath(IFile file) throws CoreException {
		if (file != null && file.getProject().hasNature(FanNature.NATURE_ID)) {
			IScriptProject sProject = DLTKCore.create(file.getProject());
			return sProject.isOnBuildpath(file);
		}
		return false;
	}

	/*public static void updatePodName(IProject project) {
		String podName = BuildFan.readPodName(project);
		if (podName != null) {
			try {
				project.setPersistentProperty(
						FanProjectUtils.POD_NAME_PROJECT_PROPERTY, podName);
			} catch (CoreException e) {
				FanCore.log(e);
			}
		}
	}*/
}
