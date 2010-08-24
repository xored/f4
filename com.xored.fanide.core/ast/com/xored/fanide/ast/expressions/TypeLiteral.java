package com.xored.fanide.ast.expressions;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Literal;

import com.xored.fanide.ast.typesystem.FanTypeRef;

public class TypeLiteral extends Literal implements FanExpressionConstants {

	private FanTypeRef type;

	public TypeLiteral(int start, int end) {
		super(start, end);
	}

	@Override
	public int getKind() {
		return TYPE_LITERAL;
	}

	public FanTypeRef getType() {
		return type;
	}

	public void setType(FanTypeRef type) {
		this.type = type;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (type != null)
				type.traverse(visitor);
			visitor.endvisit(this);
		}
	}
}
