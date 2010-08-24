package com.xored.fanide.ast.declarations;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.declarations.Argument;

import com.xored.fanide.ast.typesystem.FanTypeRef;

public class FanArgument extends Argument {
	private FanTypeRef type;
	
	public FanArgument() {
		super();
		this.setStart(0);
		this.setEnd(-1);
	}
	
	public void setType(FanTypeRef type) {
		this.type = type;
	}
	
	public FanTypeRef getType() {
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
}
