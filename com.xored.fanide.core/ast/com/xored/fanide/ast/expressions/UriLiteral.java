package com.xored.fanide.ast.expressions;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Literal;

public class UriLiteral extends Literal implements FanExpressionConstants {

	public UriLiteral(int start, int end) {
		super(start, end);
	}

	public void setValue(String value) {
		fLiteralValue = value;
	}

	@Override
	public int getKind() {
		return URI_LITERAL;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			visitor.endvisit(this);
		}
	}

}
