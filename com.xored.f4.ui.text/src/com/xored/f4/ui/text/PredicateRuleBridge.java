package com.xored.f4.ui.text;

import org.eclipse.jface.text.rules.ICharacterScanner;
import org.eclipse.jface.text.rules.IPredicateRule;
import org.eclipse.jface.text.rules.IToken;

public abstract class PredicateRuleBridge implements IPredicateRule {
	public IToken evaluate(ICharacterScanner scanner) {
		return eval(scanner);
	}

	public IToken evaluate(ICharacterScanner scanner, boolean resume) {
		return eval(scanner);
	}
	public abstract IToken eval(ICharacterScanner scanner);
}
