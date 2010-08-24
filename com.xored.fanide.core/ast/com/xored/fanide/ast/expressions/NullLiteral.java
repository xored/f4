package com.xored.fanide.ast.expressions;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Literal;

public class NullLiteral extends Literal implements FanExpressionConstants {

	public NullLiteral(int start) {
		super(start, start + 4);
		fLiteralValue = "null";
	}

	@Override
	public int getKind() {
		return NULL_LITERAL;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			visitor.endvisit(this);
		}
	}

}
