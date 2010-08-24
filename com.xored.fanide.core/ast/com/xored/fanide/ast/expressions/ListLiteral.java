package com.xored.fanide.ast.expressions;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.core.runtime.Assert;
import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Expression;
import org.eclipse.dltk.ast.expressions.Literal;

import com.xored.fanide.ast.typesystem.ArrayTypeRef;

public class ListLiteral extends Literal implements FanExpressionConstants {
	ArrayTypeRef type;
	List<Expression> values = new ArrayList<Expression>();

	public ListLiteral() {
		super(0, 0);
	}

	public ListLiteral(int start, int end) {
		super(start, end);
	}

	public void setValue(String value) {
		fLiteralValue = value;
	}
	
	public void setType(ArrayTypeRef type) {
		this.type = type;
	}
	
	public ArrayTypeRef getType() {
		return this.type;
	}

	public void accept(Expression value) {
		Assert.isLegal(value != null);
		values.add(value);
	}

	@Override
	public int getKind() {
		return LIST_LITERAL;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (this.type != null)
				this.type.traverse(visitor);
			for (Expression ex : values) {
				ex.traverse(visitor);
			}
			visitor.endvisit(this);
		}
	}

}
