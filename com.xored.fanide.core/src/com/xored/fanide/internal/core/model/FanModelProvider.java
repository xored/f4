package com.xored.fanide.internal.core.model;

import static com.xored.fanide.core.FanCore.POD_EXTENSION;

import java.util.List;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.dltk.core.IBuildpathEntry;
import org.eclipse.dltk.core.IModelElement;
import org.eclipse.dltk.core.IModelProvider;
import org.eclipse.dltk.core.ModelException;
import org.eclipse.dltk.core.environment.EnvironmentPathUtils;
import org.eclipse.dltk.internal.core.ScriptProject;

import com.xored.fanide.core.FanCore;

public class FanModelProvider implements IModelProvider {

	public FanModelProvider() {
	}

	public boolean isModelChangesProvidedFor(IModelElement modelElement,
			String name) {
		if (modelElement instanceof ScriptProject) {
			return true;
		}
		return false;
	}

	public void provideModelChanges(IModelElement parentElement,
			List<IModelElement> children) {
		if (parentElement instanceof ScriptProject) {
			ScriptProject project = (ScriptProject) parentElement;
			try {
				IBuildpathEntry[] entries = project.getResolvedBuildpath();
				for (IBuildpathEntry rentry : entries) {
					IPath path = EnvironmentPathUtils.getLocalPath(rentry
							.getPath());
					if (POD_EXTENSION.equalsIgnoreCase(rentry.getPath()
							.getFileExtension())
							&& path.toFile().isFile() && !rentry.isExternal()) {
						PodFragment podFragment = new PodFragment(project,
								rentry);
						children.add(podFragment);
					}
				}
			} catch (ModelException e) {
				FanCore.log(e);
			} catch (CoreException e) {
				FanCore.log(e);
			}
		}
	}
}
