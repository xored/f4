package com.xored.fanide.internal.ui.actions;

import org.eclipse.dltk.ui.IDLTKUILanguageToolkit;
import org.eclipse.dltk.ui.actions.OpenTypeAction;

import com.xored.fanide.internal.ui.FanUILanguageToolkit;

public class FanOpenTypeAction extends OpenTypeAction {
	@Override
	protected IDLTKUILanguageToolkit getUILanguageToolkit() {
		return FanUILanguageToolkit.getInstance();
	}
}
