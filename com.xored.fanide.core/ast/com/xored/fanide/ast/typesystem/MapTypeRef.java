package com.xored.fanide.ast.typesystem;

import org.eclipse.dltk.ast.ASTVisitor;


public class MapTypeRef extends FanTypeRef {

	protected boolean nullable;
	protected FanTypeRef keyType, valueType;

	public boolean isNullable() {
		return nullable;
	}

	public void setNullable(boolean nullable) {
		this.nullable = nullable;
	}

	public FanTypeRef getKeyType() {
		return keyType;
	}

	public void setKeyType(FanTypeRef keyType) {
		this.keyType = keyType;
	}

	public FanTypeRef getValueType() {
		return valueType;
	}

	public void setValueType(FanTypeRef valueType) {
		this.valueType = valueType;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (this.keyType != null)
				this.keyType.traverse(visitor);
			if (this.valueType != null)
				this.valueType.traverse(visitor);
			visitor.endvisit(this);
		}
	}

	@Override
	public String getStringRepresentation() {
		String res = keyType.getStringRepresentation() + ":"
				+ valueType.getStringRepresentation();
		if (nullable) {
			res += "?";
		}
		return res;
	}
}
