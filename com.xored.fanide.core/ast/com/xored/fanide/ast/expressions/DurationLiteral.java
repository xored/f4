package com.xored.fanide.ast.expressions;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Literal;

public class DurationLiteral extends Literal implements FanExpressionConstants {

	private double durationValue = 0;

	public DurationLiteral(int start, int end) {
		super(start, end);
	}

	public double getDurationValue() {
		return durationValue;
	}

	public void setDurationValue(double durationValue) {
		this.durationValue = durationValue;
	}

	public void setValue(String value) {
		fLiteralValue = value;
	}

	@Override
	public int getKind() {
		return DURATION_LITERAL;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			visitor.endvisit(this);
		}
	}

}
