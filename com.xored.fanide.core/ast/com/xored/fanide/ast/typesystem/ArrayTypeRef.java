package com.xored.fanide.ast.typesystem;

import org.eclipse.dltk.ast.ASTVisitor;

public class ArrayTypeRef extends FanTypeRef {
	protected boolean nullable;
	protected FanTypeRef baseType;

	public boolean isNullable() {
		return nullable;
	}

	public void setNullable(boolean nullable) {
		this.nullable = nullable;
	}

	public FanTypeRef getBaseType() {
		return baseType;
	}

	public void setBaseType(FanTypeRef baseType) {
		this.baseType = baseType;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (this.baseType != null)
				this.baseType.traverse(visitor);
			visitor.endvisit(this);
		}
	}

	@Override
	public String getStringRepresentation() {
		String res = baseType.getStringRepresentation() + "[]";
		if (nullable) {
			res += "?";
		}
		return res;
	}
}
