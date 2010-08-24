package com.xored.fanide.internal.ui.rules;

import org.eclipse.jface.text.rules.ICharacterScanner;
import org.eclipse.jface.text.rules.IToken;
import org.eclipse.jface.text.rules.IRule;
import org.eclipse.jface.text.rules.Token;


public class FanUsingRule implements IRule {
	protected IToken fToken;
	
	public FanUsingRule(IToken token) {
		fToken = token;
	}

	public IToken evaluate(ICharacterScanner scanner) {
		
		int size = 0;
		StringBuffer buffer = new StringBuffer();
		
		while(scanner.getColumn() != 0) {
			scanner.unread();
			size++;
		}
		
		for(int i = 0; i < size; i++)
			buffer.append((char)scanner.read());
		
		if(buffer.indexOf("using") < 0)
			return Token.UNDEFINED;
		
		if(endSequenceDetected(scanner))
			return fToken;
		
		return Token.UNDEFINED;
	}
	
	protected boolean endSequenceDetected(ICharacterScanner scanner) {
		int c;
		
		while((c = scanner.read()) != ICharacterScanner.EOF) {
			if(c == '\n')
				return true;
		}

		return false;
	}
}
