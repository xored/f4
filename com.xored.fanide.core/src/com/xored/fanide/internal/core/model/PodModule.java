package com.xored.fanide.internal.core.model;

import java.util.List;

import org.eclipse.dltk.core.WorkingCopyOwner;
import org.eclipse.dltk.core.model.binary.BinaryModule;
import org.eclipse.dltk.internal.core.ModelElement;

public class PodModule extends BinaryModule {

	private List<String> types;

	protected PodModule(ModelElement parent, String name,
			WorkingCopyOwner owner, List<String> types) {
		super(parent, name, owner);
		this.types = types;
	}

	public List<String> getFTypes() {
		return types;
	}
}
