package com.xored.fanide.ast.references;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.references.SimpleReference;

import com.xored.fanide.ast.expressions.FanExpressionConstants;

public class FieldStorage extends SimpleReference implements
		FanExpressionConstants {

	public FieldStorage() {
		super(0, 0, "");
	}

	@Override
	public int getKind() {
		return E_FIELD_STORAGE;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			visitor.endvisit(this);
		}
	}

}
