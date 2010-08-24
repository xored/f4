package com.xored.fanide.internal.ui.compare;

import org.eclipse.compare.CompareConfiguration;
import org.eclipse.compare.IViewerCreator;
import org.eclipse.jface.viewers.Viewer;
import org.eclipse.swt.widgets.Composite;

public class FanMergeViewerCreator implements IViewerCreator {

	public FanMergeViewerCreator() {
		// TODO Auto-generated constructor stub
	}

	public Viewer createViewer(Composite parent, CompareConfiguration cfg) {
		return new FanMergeViewer(parent, cfg);
	}
}
