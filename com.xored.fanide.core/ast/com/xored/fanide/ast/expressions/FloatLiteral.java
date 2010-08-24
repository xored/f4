package com.xored.fanide.ast.expressions;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Literal;

public class FloatLiteral extends Literal implements FanExpressionConstants {

	private double floatValue = 0;

	public FloatLiteral(int start, int end) {
		super(start, end);
	}

	public void setValue(String value) {
		fLiteralValue = value;
	}

	public double getFloatValue() {
		return floatValue;
	}

	public void setFloatValue(double value) {
		this.floatValue = value;
	}

	@Override
	public int getKind() {
		return FLOAT_LITERAL;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			visitor.endvisit(this);
		}
	}

}
