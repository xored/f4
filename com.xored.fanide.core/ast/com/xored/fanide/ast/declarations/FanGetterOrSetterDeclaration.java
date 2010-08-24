package com.xored.fanide.ast.declarations;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.declarations.Declaration;
import org.eclipse.dltk.ast.statements.Block;

public class FanGetterOrSetterDeclaration extends Declaration {
	private FanFieldDeclaration parent;
	private Block body;
	
	public final static int D_GETTER_SETTER = 3008;
	
	public FanGetterOrSetterDeclaration(int start, String name) {
		super(start, start + name.length());
		this.setName(name);
		this.setNameStart(start);
		this.setNameEnd(start + name.length());
	}

	@Override
	public int getKind() {
		return D_GETTER_SETTER;
	}

	public void setParent(FanFieldDeclaration parent) {
		this.parent = parent;
	}
	
	public FanFieldDeclaration getParent() {
		return this.parent;
	}
	
	public void setBody(Block body) {
		this.body = body;
	}
	
	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			getRef().traverse(visitor);
			if (parent != null)
				parent.traverse(visitor);
			if (body != null)
				body.traverse(visitor);
			visitor.endvisit(this);
		}
	}
}
