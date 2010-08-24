/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui.rules;

import org.eclipse.core.runtime.Assert;
import org.eclipse.jface.text.rules.ICharacterScanner;
import org.eclipse.jface.text.rules.IRule;
import org.eclipse.jface.text.rules.IToken;
import org.eclipse.jface.text.rules.Token;

/**
 * An implementation of <code>IRule</code> detecting a numerical value.
 */
public class FanFloatNumberRule implements IRule {

	final IToken fToken;

	public FanFloatNumberRule(IToken token) {
		Assert.isNotNull(token);
		fToken = token;
	}

	private enum Mode {
		DECIMAL, HEX, FLOAT
	}

	public IToken evaluate(ICharacterScanner scanner) {
		Mode mode = Mode.DECIMAL;
		int digitCount = 0;
		int readCount = 0;
		int c = scanner.read();
		++readCount;
		if (Character.isDigit((char) c) || c == '.') {
			if (c == '.') {
				mode = Mode.FLOAT;
			} else {
				++digitCount;
			}
			for (;;) {
				final char lastDigit = (char) c;
				c = scanner.read();
				++readCount;
				if (c == 'x' || c == 'X') {
					if (mode == Mode.DECIMAL && digitCount == 1
							&& lastDigit == '0') {
						mode = Mode.HEX;
						digitCount = 0;
					} else {
						mode = null;
						break;
					}
				} else if (Character.isDigit((char) c) || c == '_') {
					digitCount++;
				} else if (mode == Mode.HEX
						&& (c >= 'A' && c <= 'F' || c >= 'a' && c <= 'f')) {
					digitCount++;
				} else
					break;
			}
			if ((c == 'e' || c == 'E')
					&& (mode == Mode.DECIMAL || mode == Mode.FLOAT)
					&& digitCount != 0) {
				mode = Mode.FLOAT;
				c = scanner.read();
				++readCount;
				if (c == '+' || c == '-') {
					c = scanner.read();
					++readCount;
				}
				if (Character.isDigit((char) c)) {
					do {
						++readCount;
						c = scanner.read();
					} while (Character.isDigit((char) c) || c == '_');
					if (c == 'd' || c == 'D' || c == 'f' || c == 'F') {
						readCount = 0;
					}
				} else {
					mode = null;
				}
			}
			if (mode != null && digitCount != 0) {
				if (readCount > 0)
					scanner.unread();
				return fToken;
			}
		}
		while (--readCount >= 0) {
			scanner.unread();
		}
		return Token.UNDEFINED;
	}
}
