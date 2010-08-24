package com.xored.fanide.ast.expressions;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Expression;

public class TernaryExpression extends Expression {

	private int kind = 0;

	private Expression first, second, third;

	public TernaryExpression(int start, int end) {
		super(start, end);
	}

	public TernaryExpression() {
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

	public Expression getThird() {
		return third;
	}

	public void setThird(Expression third) {
		this.third = third;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (first != null)
				first.traverse(visitor);
			if (second != null)
				second.traverse(visitor);
			if (third != null)
				third.traverse(visitor);
			visitor.endvisit(this);
		}
	}

}
