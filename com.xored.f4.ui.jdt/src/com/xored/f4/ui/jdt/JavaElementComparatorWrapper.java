package com.xored.f4.ui.jdt;

import org.eclipse.jdt.ui.JavaElementComparator;
import org.eclipse.jface.viewers.Viewer;

public class JavaElementComparatorWrapper {

	public static int compareElements(JavaElementComparator comparator,
			Viewer viewer, Object e1, Object e2) {
		return comparator.compare(viewer, e1, e2);
	}

}
