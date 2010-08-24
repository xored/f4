package com.xored.fanide.ast.expressions;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Literal;

public class IntLiteral extends Literal implements FanExpressionConstants {
	private long intValue = 0;

	public IntLiteral(int start, int end) {
		super(start, end);
	}

	public long getIntValue() {
		return intValue;
	}

	public void setIntValue(long intValue) {
		this.intValue = intValue;
	}

	public void setValue(String value) {
		fLiteralValue = value;
	}

	@Override
	public int getKind() {
		return INT_LITERAL;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			visitor.endvisit(this);
		}
	}

}
