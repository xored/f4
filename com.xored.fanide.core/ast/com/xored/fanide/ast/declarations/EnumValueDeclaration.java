package com.xored.fanide.ast.declarations;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.declarations.Declaration;
import org.eclipse.dltk.ast.expressions.CallArgumentsList;

public class EnumValueDeclaration extends Declaration {
	private CallArgumentsList initArgs;
	
	public final static int D_ENUM_VALUE = 3248;
	
	public EnumValueDeclaration() {
		super();
		this.setStart(0);
		this.setEnd(-1);
	}

	@Override
	public int getKind() {
		return D_ENUM_VALUE;
	}
	
	public void setInitializingArgs(CallArgumentsList initArgs) {
		this.initArgs = initArgs;
	}
	
	public CallArgumentsList getInitializingArgs() {
		return this.initArgs;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			this.getRef().traverse(visitor);
			if (initArgs != null)
				initArgs.traverse(visitor);
			visitor.endvisit(this);
		}
	}

}
