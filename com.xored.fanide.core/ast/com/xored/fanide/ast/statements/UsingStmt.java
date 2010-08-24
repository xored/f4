package com.xored.fanide.ast.statements;

import org.eclipse.core.runtime.Assert;
import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.references.SimpleReference;
import org.eclipse.dltk.ast.statements.Statement;

public class UsingStmt extends Statement {

	protected SimpleReference podName = null, typeName = null,
			localName = null;

	public SimpleReference getPodName() {
		Assert.isLegal(podName != null);
		return podName;
	}

	public void setPodName(SimpleReference podName) {
		Assert.isLegal(podName != null);
		this.podName = podName;
	}

	public SimpleReference getTypeName() {
		Assert.isLegal(typeName != null);
		return typeName;
	}

	public void setTypeName(SimpleReference typeName) {
		Assert.isLegal(typeName != null);
		this.typeName = typeName;
	}

	public SimpleReference getLocalName() {
		Assert.isLegal(localName != null);
		return localName;
	}

	public void setLocalName(SimpleReference localName) {
		Assert.isLegal(localName != null);
		this.localName = localName;
	}

	@Override
	public int getKind() {
		return 0;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (podName != null)
				podName.traverse(visitor);
			if (typeName != null)
				typeName.traverse(visitor);
			if (localName != null)
				localName.traverse(visitor);
			visitor.endvisit(this);
		}
	}
}
