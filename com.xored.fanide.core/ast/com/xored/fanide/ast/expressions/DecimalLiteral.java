package com.xored.fanide.ast.expressions;

import java.math.BigDecimal;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Literal;

public class DecimalLiteral extends Literal implements FanExpressionConstants {

	private BigDecimal decimalValue = BigDecimal.ZERO;

	public DecimalLiteral(int start, int end) {
		super(start, end);
	}

	public void setValue(String value) {
		fLiteralValue = value;
	}

	public BigDecimal getDecimalValue() {
		return decimalValue;
	}

	public void setDecimalValue(BigDecimal value) {
		this.decimalValue = value;
	}

	@Override
	public int getKind() {
		return DECIMAL_LITERAL;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			visitor.endvisit(this);
		}
	}

}
