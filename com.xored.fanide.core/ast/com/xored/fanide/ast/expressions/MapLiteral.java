package com.xored.fanide.ast.expressions;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.core.runtime.Assert;
import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Expression;
import org.eclipse.dltk.ast.expressions.Literal;

import com.xored.fanide.ast.typesystem.MapTypeRef;

public class MapLiteral extends Literal implements FanExpressionConstants {
	MapTypeRef type;
	List<Expression> keys = new ArrayList<Expression>();
	List<Expression> values = new ArrayList<Expression>();

	public MapLiteral() {
		super(0, 0);
	}

	public MapLiteral(int start, int end) {
		super(start, end);
	}

	public void setValue(String value) {
		fLiteralValue = value;
	}
	
	public void setType(MapTypeRef type) {
		this.type = type;
	}

	public MapTypeRef getType() {
		return this.type;
	}
	
	public void accept(Expression key, Expression value) {
		Assert.isLegal(key != null);
		Assert.isLegal(value != null);
		keys.add(key);
		values.add(value);
	}

	@Override
	public int getKind() {
		return MAP_LITERAL;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (this.type != null)
				this.type.traverse(visitor);
			for (Expression ex : keys) {
				ex.traverse(visitor);
			}
			for (Expression ex : values) {
				ex.traverse(visitor);
			}
			visitor.endvisit(this);
		}
	}

}
