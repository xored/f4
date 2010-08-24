package com.xored.fanide.ast.expressions;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Literal;

public class StrLiteral extends Literal implements FanExpressionConstants {

	public StrLiteral(int start, int end) {
		super(start, end);
	}

	public void setValue(String value) {
		fLiteralValue = value;
	}

	@Override
	public int getKind() {
		return STRING_LITERAL;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			visitor.endvisit(this);
		}
	}

}
