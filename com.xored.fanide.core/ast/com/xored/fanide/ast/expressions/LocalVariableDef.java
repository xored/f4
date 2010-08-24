package com.xored.fanide.ast.expressions;

import org.eclipse.dltk.ast.ASTNode;
import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Expression;
import org.eclipse.dltk.ast.references.SimpleReference;

import com.xored.fanide.ast.typesystem.FanTypeRef;

public class LocalVariableDef extends Expression {
	private FanTypeRef type;
	private ASTNode initializer;
	private SimpleReference name;

	@Override
	public int getKind() {
		return 0;
	}

	public SimpleReference getName() {
		return name;
	}

	public void setName(SimpleReference name) {
		this.name = name;
	}

	public ASTNode getInitializer() {
		return initializer;
	}

	public void setInitializer(ASTNode initializer) {
		this.initializer = initializer;
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
			if (name != null)
				name.traverse(visitor);
			if (initializer != null)
				initializer.traverse(visitor);
			visitor.endvisit(this);
		}
	}
}
