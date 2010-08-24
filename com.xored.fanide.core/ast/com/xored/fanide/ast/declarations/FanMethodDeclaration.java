package com.xored.fanide.ast.declarations;

import org.eclipse.dltk.ast.ASTVisitor;

import com.xored.fanide.ast.typesystem.FanTypeRef;

public class FanMethodDeclaration extends AbstractFanMethodDeclaration {

	private FanTypeRef type;

	public FanMethodDeclaration(String name, int nameStart, int nameEnd,
			int declStart, int declEnd) {
		super(name, nameStart, nameEnd, declStart, declEnd);
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
			traverseFacets(visitor);
			if (type != null)
				type.traverse(visitor);
			traverseChildNodes(visitor);
			visitor.endvisit(this);
		}
	}
}
