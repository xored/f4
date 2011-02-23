package com.xored.fanide.internal.core.model;

import java.util.Map;

import org.eclipse.dltk.compiler.ISourceElementRequestor;
import org.eclipse.dltk.core.IModelElement;
import org.eclipse.dltk.core.model.binary.BinaryModuleElementInfo;
import org.eclipse.dltk.core.model.binary.BinaryModuleStructureRequestor;
import org.eclipse.dltk.core.model.binary.IBinaryModule;
import org.eclipse.dltk.core.model.binary.SourceMapper;
import org.eclipse.dltk.internal.core.ModelElementInfo;

public class SourceAsBinaryElementRequestor extends
		BinaryModuleStructureRequestor implements ISourceElementRequestor {

	public SourceAsBinaryElementRequestor(IBinaryModule module,
			BinaryModuleElementInfo moduleInfo, SourceMapper mapper,
			Map<IModelElement, ModelElementInfo> newElements) {
		super(module, moduleInfo, mapper, newElements);
	}

	public boolean enterFieldCheckDuplicates(FieldInfo info) {
		return false;
	}

	@Override
	protected void addChild(ModelElementInfo parentInfo, IModelElement handle) {
		// Do not all childs.
	}

	@Override
	public void exitModule(int declarationEnd) {
		// empty
	}

	public void updateField(FieldInfo arg0, int arg1) {
	}
}
