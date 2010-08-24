package com.xored.fanide.internal.ui.navigator;

import java.util.List;

import org.eclipse.dltk.core.DLTKCore;
import org.eclipse.dltk.core.IBuildpathEntry;
import org.eclipse.dltk.core.IProjectFragment;
import org.eclipse.dltk.core.IScriptProject;
import org.eclipse.dltk.core.ModelException;
import org.eclipse.dltk.internal.ui.scriptview.BuildPathContainer;
import org.eclipse.dltk.launching.ScriptRuntime;
import org.eclipse.dltk.ui.IModelContentProvider;
import org.eclipse.jface.viewers.ITreeContentProvider;

import com.xored.fanide.internal.core.model.PodFragment;

@SuppressWarnings("restriction")
public class FanModelContentProvider implements IModelContentProvider {

	public FanModelContentProvider() {
	}

	public void provideModelChanges(Object parentElement, List children,
			ITreeContentProvider iTreeContentProvider) {
		// System.out.println("CONTAINER:" + parentElement);
		if (parentElement instanceof BuildPathContainer) {
			BuildPathContainer container = (BuildPathContainer) parentElement;
			IBuildpathEntry entry = container.getBuildpathEntry();
			if (!entry.getPath().segment(0).equals(
					ScriptRuntime.INTERPRETER_CONTAINER)) {
				return;
			}

			IScriptProject project = container.getScriptProject();
			IProjectFragment[] fragments;
			try {
				fragments = project.getProjectFragments();
				for (int i = 0; i < fragments.length; i++) {
					if (fragments[i] instanceof PodFragment) {
						PodFragment fragment = (PodFragment) fragments[i];
						children.add(fragment);
					}
				}
			} catch (ModelException e) {
				if (DLTKCore.DEBUG) {
					e.printStackTrace();
				}
			}
		}
		// if( parentElement instanceof PodFragment ) {
		// PodFragment fragment = (PodFragment) parentElement;
		// PodSourcesFolder folder = (PodSourcesFolder)
		// fragment.getChildren()[0];
		// folder.get
		// }
	}

	public Object getParentElement(Object element,
			ITreeContentProvider iTreeContentProvider) {
		if (element instanceof PodFragment) {
			return ((PodFragment) element).getScriptProject();
		}
		return null;
	}
}
