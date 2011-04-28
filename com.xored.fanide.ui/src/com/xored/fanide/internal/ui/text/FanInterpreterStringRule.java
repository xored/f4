package com.xored.fanide.internal.ui.text;

import org.eclipse.jface.text.rules.ICharacterScanner;
import org.eclipse.jface.text.rules.IPredicateRule;
import org.eclipse.jface.text.rules.IToken;
import org.eclipse.jface.text.rules.Token;

public class FanInterpreterStringRule implements IPredicateRule {
	private IToken token;

	public FanInterpreterStringRule(IToken comment) {
		this.token = comment;
	}

	public IToken evaluate(ICharacterScanner scanner) {
		if (!(scanner instanceof IFanPartitionScanner && ((IFanPartitionScanner) scanner)
				.getOffset() == 0)) {
			return Token.UNDEFINED;
		}
		int c = scanner.read();
		if (c != '#') {
			scanner.unread();
			return Token.UNDEFINED;
		}
		c = scanner.read();
		if (c != '!') {
			scanner.unread();
			scanner.unread();
			return Token.UNDEFINED;
		}
		// read till EOL
		while (c != '\n' && c != '\r' && c != ICharacterScanner.EOF) {
			c = scanner.read();
		}
		if (c == '\r') {
			c = scanner.read();
			if (c != '\n') {
				scanner.unread();
			}
		}
		return this.token;
	}

	public IToken evaluate(ICharacterScanner scanner, boolean resume) {
		return evaluate(scanner);
	}

	public IToken getSuccessToken() {
		return this.token;
	}
}