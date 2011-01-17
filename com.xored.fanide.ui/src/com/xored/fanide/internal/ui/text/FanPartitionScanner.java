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

import org.eclipse.jface.text.rules.EndOfLineRule;
import org.eclipse.jface.text.rules.IPredicateRule;
import org.eclipse.jface.text.rules.IToken;
import org.eclipse.jface.text.rules.MultiLineRule;
import org.eclipse.jface.text.rules.RuleBasedPartitionScanner;
import org.eclipse.jface.text.rules.SingleLineRule;
import org.eclipse.jface.text.rules.Token;

public class FanPartitionScanner extends RuleBasedPartitionScanner implements
		IFanPartitionScanner {

	/**
	 * Creates the partitioner and sets up the appropriate rules.
	 */
	public FanPartitionScanner() {
		super();

		IToken string = new Token(IFanPartitions.FAN_STRING);
		IToken multiLineComment = new Token(
				IFanPartitions.FAN_MULTI_LINE_COMMENT);
		IToken singleLineComment = new Token(
				IFanPartitions.FAN_SINGLE_LINE_COMMENT);
		IToken interpreterString = new Token(
				IFanPartitions.FAN_INTERPRETER_STRING);

		IToken doc = new Token(IFanPartitions.FAN_DOC);
		IToken dsl = new Token(IFanPartitions.FAN_DSL);

		List<IPredicateRule> rules = new ArrayList<IPredicateRule>();

		rules.add(new EndOfLineRule("//", singleLineComment));
		rules.add(new EndOfLineRule("**", doc));
		rules.add(new MultiLineRule("/*", "*/", multiLineComment, '\\', true));

		rules.add(new MultiLineRule("\'\'\'", "\'\'\'", string, '\\'));
		rules.add(new MultiLineRule("\"\"\"", "\"\"\"", string));
		rules.add(new MultiLineRule("\"", "\"", string, '\\'));
		rules.add(new SingleLineRule("`", "`", string, '\\'));
		rules.add(new SingleLineRule("'", "'", string, '\\'));
		rules.add(new MultiLineRule("<|", "|>", dsl));

		rules.add(new FanInterpreterStringRule(interpreterString));

		IPredicateRule[] result = new IPredicateRule[rules.size()];
		rules.toArray(result);
		setPredicateRules(result);
	}

	public int getOffset() {
		return fOffset;
	}
}
