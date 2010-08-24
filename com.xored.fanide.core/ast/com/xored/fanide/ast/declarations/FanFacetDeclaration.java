package com.xored.fanide.ast.declarations;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Expression;
import org.eclipse.dltk.ast.references.SimpleReference;
import org.eclipse.dltk.ast.statements.Statement;

public class FanFacetDeclaration extends Statement {
	private SimpleReference key;
	private Expression value;
	
	public final static int D_FACET = 3128;

	public FanFacetDeclaration() {
		super();
		this.setStart(0);
		this.setEnd(-1);
	}
	
	public void accept(SimpleReference key, Expression value) {
		if (key != null) {
			this.setStart(key.sourceStart());
			int end = value != null ? value.sourceEnd() : key.sourceEnd();
			this.setEnd(end);
		}
		this.key = key;
		this.value = value;
	}
	
	public String getKeyName() {
		return this.key.getName();
	}
	
	public Expression getValue() {
		return this.value;
	}

	@Override
	public int getKind() {
		return D_FACET;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (key != null)
				key.traverse(visitor);
			if (value != null)
				value.traverse(visitor);
			visitor.endvisit(this);
		}
	}
}
