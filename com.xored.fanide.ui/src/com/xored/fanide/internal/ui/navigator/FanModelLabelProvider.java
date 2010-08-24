package com.xored.fanide.internal.ui.navigator;

import org.eclipse.dltk.core.ModelException;
import org.eclipse.dltk.ui.DLTKPluginImages;
import org.eclipse.jface.viewers.LabelProvider;
import org.eclipse.swt.graphics.Image;

import com.xored.fanide.core.FanCore;
import com.xored.fanide.internal.core.model.PodFragment;
import com.xored.fanide.internal.core.model.PodSourcesFolder;

public class FanModelLabelProvider extends LabelProvider {
	public String getText(Object element) {
		if (element instanceof PodFragment) {
			PodFragment fragment = (PodFragment) element;
			PodSourcesFolder folder = fragment.getPodSourceFolder();
			if (folder != null) {
				try {
					return folder.getPodName() + ".pod";
					// + " ("
					// + folder.getPodVersion() + ")";
				} catch (ModelException e) {
					FanCore.log(e);
				}
			}
			return ((PodFragment) element).getPodPath().lastSegment();
		}
		return null;
	}

	public Image getImage(Object element) {
		if (element instanceof PodFragment) {
			return DLTKPluginImages.get(DLTKPluginImages.IMG_OBJS_JAR_WSRC);
		}
		return null;
	}
}
