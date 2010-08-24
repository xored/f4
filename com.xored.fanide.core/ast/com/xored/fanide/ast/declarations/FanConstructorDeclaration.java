package com.xored.fanide.ast.declarations;

import org.eclipse.dltk.ast.ASTVisitor;

import com.xored.fanide.ast.expressions.CallExpr;

public class FanConstructorDeclaration extends AbstractFanMethodDeclaration {
	private CallExpr ctorChain;

	public FanConstructorDeclaration(String name, int nameStart, int nameEnd,
			int declStart, int declEnd) {
		super(name, nameStart, nameEnd, declStart, declEnd);
	}
	
	public void setCtorChain(CallExpr ctorChain) {
		this.ctorChain = ctorChain;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			traverseFacets(visitor);
			if (ctorChain != null)
				ctorChain.traverse(visitor);
			traverseChildNodes(visitor);
			visitor.endvisit(this);
		}
	}
}
