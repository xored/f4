/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui.text;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.dltk.ui.text.AbstractScriptScanner;
import org.eclipse.dltk.ui.text.IColorManager;
import org.eclipse.dltk.ui.text.rules.ScriptWordRule;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.jface.text.rules.EndOfLineRule;
import org.eclipse.jface.text.rules.IRule;
import org.eclipse.jface.text.rules.IToken;
import org.eclipse.jface.text.rules.MultiLineRule;
import org.eclipse.jface.text.rules.WhitespaceRule;

import com.xored.fanide.internal.ui.rules.FanFloatNumberRule;
import com.xored.fanide.internal.ui.rules.FanUsingRule;

public class FanCodeScanner extends AbstractScriptScanner {
	private static String[] fgKeywords = FanKeywordProvider.getKeywords();
	private static String fgReturnKeyword = FanKeywordProvider.KEYWORD_RETURN;
	private static String fgTokenProperties[] = new String[] {
			FanColorConstants.FAN_DOC, FanColorConstants.FAN_DSL,
			FanColorConstants.FAN_MULTI_LINE_COMMENT,
			FanColorConstants.FAN_SINGLE_LINE_COMMENT,
			FanColorConstants.FAN_DEFAULT, FanColorConstants.FAN_KEYWORD,
			FanColorConstants.FAN_KEYWORD_RETURN, FanColorConstants.FAN_NUMBER,
			FanColorConstants.FAN_CLASS_DEFINITION,
			FanColorConstants.FAN_FUNCTION_DEFINITION,
			FanColorConstants.FAN_DECORATOR };

	public FanCodeScanner(IColorManager manager, IPreferenceStore store) {
		super(manager, store);
		initialize();
	}

	@Override
	protected String[] getTokenProperties() {
		return fgTokenProperties;
	}

	@Override
	protected List<IRule> createRules() {
		List<IRule> rules = new ArrayList<IRule>();
		IToken keyword = getToken(FanColorConstants.FAN_KEYWORD);
		IToken keywordReturn = getToken(FanColorConstants.FAN_KEYWORD_RETURN);
		IToken doc = getToken(FanColorConstants.FAN_DOC);
		IToken dsl = getToken(FanColorConstants.FAN_DSL);
		IToken multiLineComment = getToken(FanColorConstants.FAN_MULTI_LINE_COMMENT);
		IToken singleLineComment = getToken(FanColorConstants.FAN_SINGLE_LINE_COMMENT);
		IToken other = getToken(FanColorConstants.FAN_DEFAULT);
		IToken cls = getToken(FanColorConstants.FAN_CLASS_DEFINITION);
		// IToken def = getToken(FanColorConstants.FAN_FUNCTION_DEFINITION);
		IToken number = getToken(FanColorConstants.FAN_NUMBER);
		// IToken decorator = getToken(FanColorConstants.FAN_DECORATOR);
		// Add rule for single line comments.
		rules.add(new MultiLineRule("/*", "*/", multiLineComment));
		rules.add(new EndOfLineRule("//", singleLineComment));
		rules.add(new EndOfLineRule("**", doc));
		rules.add(new MultiLineRule("<|", "|>", dsl));
		// Add generic whitespace rule.
		rules.add(new WhitespaceRule(new FanWhitespaceDetector()));
		rules.add(new FanUsingRule(other));
		// Add word rule for keywords, types, and constants.

		ScriptWordRule wordRule = new ScriptWordRule(new FanWordDetector(),
				other);
		wordRule.addNextTokenAfterSeen("class", cls);

		for (int i = 0; i < fgKeywords.length; i++) {
			wordRule.addWord(fgKeywords[i], keyword);
		}
		wordRule.addWord(fgReturnKeyword, keywordReturn);

		rules.add(wordRule);
		rules.add(new FanFloatNumberRule(number));
		setDefaultReturnToken(other);
		return rules;
	}
}
