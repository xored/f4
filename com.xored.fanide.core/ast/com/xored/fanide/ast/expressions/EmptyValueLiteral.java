package com.xored.fanide.ast.expressions;

import org.eclipse.dltk.ast.expressions.Literal;

public class EmptyValueLiteral extends Literal {

	protected EmptyValueLiteral(int start) {
		super(start, start);
	}

	@Override
	public int getKind() {
		return 0;
	}

}
