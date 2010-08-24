package com.xored.fanide.internal.ui.navigator;

import org.eclipse.dltk.ui.IModelCompareCategories;
import org.eclipse.dltk.ui.IModelCompareProvider;

import com.xored.fanide.internal.core.model.PodFolder;
import com.xored.fanide.internal.core.model.PodFragment;
import com.xored.fanide.internal.core.model.PodSourcesFolder;

public class FanModelCompareProvider implements IModelCompareProvider {
	@SuppressWarnings("restriction")
	public Integer category(Object parentElement) {
		if (parentElement instanceof PodFragment) {
			return IModelCompareCategories.CONTAINER;
		}
		if (parentElement instanceof PodSourcesFolder
				|| parentElement instanceof PodFolder) {
			return IModelCompareCategories.SCRIPTFOLDER;
		}
		return null;
	}

	@SuppressWarnings("restriction")
	public CompareResult compare(Object element1, Object element2, int cat1,
			int cat2) {
		if (element1 instanceof PodFragment && element2 instanceof PodFragment) {
			PodFragment f1 = (PodFragment) element1;
			PodFragment f2 = (PodFragment) element2;
			String segm1 = f1.getPodPath().lastSegment();
			String segm2 = f2.getPodPath().lastSegment();
			int res = segm1.compareToIgnoreCase(segm2);
			if (res > 0) {
				return GREATER;
			} else if (res == 0) {
				return EQUALS;
			} else {
				return LESS;
			}
		}
		return null;
	}
}
