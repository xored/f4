package com.xored.fanide.ast.expressions;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Expression;

public class BinaryExpression extends Expression {

	private int kind = 0;

	private Expression first, second;

	public BinaryExpression(int start, int end) {
		super(start, end);
	}

	public BinaryExpression() {
	}

	@Override
	public int getKind() {
		return kind;
	}

	public void setKind(int kind) {
		this.kind = kind;
	}

	public Expression getFirst() {
		return first;
	}

	public void setFirst(Expression first) {
		this.first = first;
	}

	public Expression getSecond() {
		return second;
	}

	public void setSecond(Expression second) {
		this.second = second;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (first != null)
				first.traverse(visitor);
			if (second != null)
				second.traverse(visitor);
			visitor.endvisit(this);
		}
	}
}
