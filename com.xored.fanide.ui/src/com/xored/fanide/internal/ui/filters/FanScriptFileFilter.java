package com.xored.fanide.internal.ui.filters;

import org.eclipse.dltk.core.IProjectFragment;
import org.eclipse.dltk.core.IScriptFolder;
import org.eclipse.dltk.core.IScriptProject;
import org.eclipse.dltk.core.ISourceModule;
import org.eclipse.jface.viewers.Viewer;
import org.eclipse.jface.viewers.ViewerFilter;

public class FanScriptFileFilter extends ViewerFilter {

	private String fTargetExtension;

	public FanScriptFileFilter(String targetExtension) {
		fTargetExtension = targetExtension;
	}

	@Override
	public boolean select(Viewer viewer, Object parent, Object element) {
		if ((element instanceof ISourceModule)
				&& (((ISourceModule) element).getPath().getFileExtension()
						.equals(fTargetExtension)))
			return true;
		if ((element instanceof IScriptProject)
				|| (element instanceof IProjectFragment)
				|| (element instanceof IScriptFolder))
			return true;
		return false;
	}

}