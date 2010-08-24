package com.xored.f4.debug.ui;

import org.eclipse.dltk.core.environment.IEnvironment;
import org.eclipse.dltk.internal.debug.ui.interpreters.AddScriptInterpreterDialog;
import org.eclipse.dltk.internal.debug.ui.interpreters.IScriptInterpreterDialog;
import org.eclipse.dltk.internal.debug.ui.interpreters.InterpretersBlock;
import org.eclipse.dltk.launching.IInterpreterInstall;

public abstract class InterpretersBlockBridge extends InterpretersBlock {
	@Override
	protected IScriptInterpreterDialog createInterpreterDialog(
			IEnvironment environment, IInterpreterInstall standin) {
		AddScriptInterpreterDialog dialog = createDialog(standin);
		dialog.setEnvironment(environment);
		return dialog;
	}
	
	protected abstract AddScriptInterpreterDialog createDialog(IInterpreterInstall install);
}
