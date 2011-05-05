package com.xored.fanide.internal.ui.dialogs;

import org.eclipse.dltk.ui.dialogs.ITypeInfoFilterExtension;
import org.eclipse.dltk.ui.dialogs.ITypeInfoRequestor;
import org.eclipse.dltk.ui.dialogs.TypeSelectionExtension;

import com.xored.fanide.ast.declarations.FanModifiers;

public class FanTypeSelectionExtension extends TypeSelectionExtension {

	private int MIXIN_MODIFYER = FanModifiers.AccMixin;
	private int ENUM_MODIFYER = FanModifiers.AccEnum;
	
	private int curType;
	private boolean isClass = false;

	public FanTypeSelectionExtension(int curType) {
		if((curType & MIXIN_MODIFYER) == 0 && (curType & ENUM_MODIFYER) == 0)
			isClass = true;
		this.curType = curType;
	}

	public FanTypeSelectionExtension() {
		this(0);
	}
	
	@Override
	public ITypeInfoFilterExtension getFilterExtension() {
		return new ITypeInfoFilterExtension() {
			public boolean select(ITypeInfoRequestor typeInfoRequestor) {
				int flags = typeInfoRequestor.getModifiers();
				if((flags & curType) != 0)
					return true;
				else if(isClass && (flags & MIXIN_MODIFYER) == 0 && (flags & ENUM_MODIFYER) == 0)
					return true;
				return false;
			}
		};
	}

}
