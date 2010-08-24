package com.xored.fanide.core.ast;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.references.SimpleReference;

public class FanFieldReference extends SimpleReference {

	public FanFieldReference(int start, int end, String name) {
		super(start, end, name);
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			visitor.endvisit(this);
		}
	}

}
