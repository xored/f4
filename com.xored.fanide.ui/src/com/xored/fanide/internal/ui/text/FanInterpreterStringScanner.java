package com.xored.fanide.internal.ui.text;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.dltk.ui.text.AbstractScriptScanner;
import org.eclipse.dltk.ui.text.IColorManager;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.jface.text.rules.IRule;

public class FanInterpreterStringScanner extends AbstractScriptScanner {
	private static String fgTokenProperties[] = new String[] { FanColorConstants.FAN_INTERPRETER_STRING };

	public FanInterpreterStringScanner(IColorManager manager,
			IPreferenceStore store) {
		super(manager, store);
		initialize();
	}

	@Override
	protected List<IRule> createRules() {
		setDefaultReturnToken(getToken(FanColorConstants.FAN_INTERPRETER_STRING));
		return new ArrayList<IRule>();
	}

	@Override
	protected String[] getTokenProperties() {
		return fgTokenProperties;
	}

}
