package com.xored.fanide.core.ast;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.declarations.Argument;
import org.eclipse.dltk.ast.references.SimpleReference;
import org.eclipse.dltk.ast.references.TypeReference;

import com.xored.fanide.core.ast.FanStructureASTBuilder.IFanMethodParameter;

public class FanArgument extends Argument implements IFanMethodParameter {
	private TypeReference type;

	public FanArgument() {
		super();
		this.setStart(0);
		this.setEnd(-1);
	}

	public void setType(TypeReference type) {
		this.type = type;
	}

	public TypeReference getType() {
		return type;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (this.getRef() != null) {
				this.getRef().traverse(visitor);
			}
			if (initialization != null) {
				initialization.traverse(visitor);
			}
			if (type != null) {
				type.traverse(visitor);
			}
			visitor.endvisit(this);
		}
	}

	public void setTypeName(String typeName, int start, int end) {
		type = new TypeReference(start, end, typeName);
	}

	public void setInitializationExpression(String value, int start, int end) {
		setInitializationExpression(new SimpleReference(start, end, value));
	}
}
