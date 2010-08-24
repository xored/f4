package com.xored.f4.ui.jdt;

import org.eclipse.dltk.ui.IModelCompareProvider;

public abstract class ModelCompareProviderBridge implements
		IModelCompareProvider {

	public CompareResult compare(Object element1, Object element2, int cat1, int cat2) {
		return compareModel(element1, element2, cat1, cat2);
	}
	
	protected abstract CompareResult compareModel(Object element1, Object element2, int cat1, int cat2);
	
}
