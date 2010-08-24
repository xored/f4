package com.xored.fanide.ast.expressions;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Expression;

public class UnaryExpression extends Expression {

	private int kind = 0;

	private Expression operand;

	public UnaryExpression(int start, int end) {
		super(start, end);
	}

	public UnaryExpression() {
	}

	@Override
	public int getKind() {
		return kind;
	}

	public void setKind(int kind) {
		this.kind = kind;
	}

	public Expression getOperand() {
		return operand;
	}

	public void setOperand(Expression operand) {
		this.operand = operand;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (operand != null)
				operand.traverse(visitor);
			visitor.endvisit(this);
		}
	}

}
