package com.xored.fanide.internal.ui.text;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.dltk.ui.text.AbstractScriptScanner;
import org.eclipse.dltk.ui.text.IColorManager;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.jface.text.rules.IRule;
import org.eclipse.jface.text.rules.WhitespaceRule;

public class FanDslScanner extends AbstractScriptScanner{
	
	public FanDslScanner(IColorManager manager, IPreferenceStore store) {
		super(manager, store);
		initialize();
	}
	private static String fgTokenProperties[] = new String[]{
			FanColorConstants.FAN_DSL
	};
	
	@Override
	protected List<IRule> createRules() {
		List<IRule> rules = new ArrayList<IRule>();
		// Add generic whitespace rule.
		rules.add(new WhitespaceRule(new FanWhitespaceDetector()));

		setDefaultReturnToken(getToken(FanColorConstants.FAN_DSL));

		return rules;
	}
	
	@Override
	protected String[] getTokenProperties() {
		return fgTokenProperties;
	}

}
