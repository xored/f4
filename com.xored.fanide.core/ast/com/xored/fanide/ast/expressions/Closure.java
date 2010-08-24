package com.xored.fanide.ast.expressions;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Expression;
import org.eclipse.dltk.ast.statements.Block;

import com.xored.fanide.ast.typesystem.FanTypeRef;

public class Closure extends Expression implements FanExpressionConstants {

	private FanTypeRef type;

	private Block body;

	@Override
	public int getKind() {
		return E_CLOSURE;
	}

	public FanTypeRef getType() {
		return type;
	}

	public void setType(FanTypeRef type) {
		this.type = type;
	}

	public Block getBody() {
		return body;
	}

	public void setBody(Block body) {
		this.body = body;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (type != null)
				type.traverse(visitor);
			if (body != null)
				body.traverse(visitor);
			visitor.endvisit(this);
		}
	}
}
