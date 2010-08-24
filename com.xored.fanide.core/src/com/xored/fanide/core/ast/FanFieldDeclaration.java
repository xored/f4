package com.xored.fanide.core.ast;

import org.eclipse.dltk.ast.ASTNode;
import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.declarations.FieldDeclaration;
import org.eclipse.dltk.ast.expressions.Expression;
import org.eclipse.dltk.ast.references.TypeReference;

import com.xored.fanide.core.ast.FanStructureASTBuilder.IFanField;

public class FanFieldDeclaration extends FieldDeclaration implements IFanField {

	private Expression initializer;
	private TypeReference type;

	public FanFieldDeclaration() {
		super(null, 0, 0, 0, 0);
	}

	public TypeReference getType() {
		return type;
	}

	public void setType(TypeReference type) {
		this.type = type;
	}

	public void setInitializer(Expression initializer) {
		this.initializer = initializer;
	}

	public Expression getInitializer() {
		return this.initializer;
	}

	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (type != null)
				type.traverse(visitor);
			this.getRef().traverse(visitor);
			if (initializer != null) {
				initializer.traverse(visitor);
			}
			visitor.endvisit(this);
		}
	}

	public void setTypeName(String typeName, int start, int end) {
		type = new TypeReference(start, end, typeName);
	}

	public void setInitializer(ASTNode node) {
		// TODO: implement
	}
}
