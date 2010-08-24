package com.xored.fanide.core.ast;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.declarations.MethodDeclaration;
import org.eclipse.dltk.ast.expressions.CallExpression;
import org.eclipse.dltk.ast.references.TypeReference;

import com.xored.fanide.core.ast.FanStructureASTBuilder.IFanMethod;
import com.xored.fanide.core.ast.FanStructureASTBuilder.IFanMethodParameter;

public class FanMethodDeclaration extends MethodDeclaration implements
		IFanMethod {

	private TypeReference type;
	private boolean isConstructur;

	public FanMethodDeclaration() {
		super(null, 0, 0, 0, 0);
	}

	public TypeReference getType() {
		return type;
	}

	public void setType(TypeReference type) {
		this.type = type;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (type != null) {
				type.traverse(visitor);
			}
			traverseChildNodes(visitor);
			visitor.endvisit(this);
		}
	}

	public IFanMethodParameter addParameter() {
		FanArgument arg = new FanArgument();
		addArgument(arg);
		return arg;
	}

	public void setTypeName(String typeName, int start, int end) {
		type = new TypeReference(start, end, typeName);
	}

	public void addFieldReference(String name, int start, int end) {
		getStatements().add(new FanFieldReference(start, end, name));

	}

	public void addMethodReference(String name, int start, int end) {
		getStatements().add(new CallExpression(start, end, null, name, null));
	}

	public void addTypeReference(String name, int start, int end) {
		getStatements().add(new TypeReference(start, end, name));
	}

	public void setConstructur(boolean isConstructur) {
		this.isConstructur = isConstructur;
	}

	public boolean isConstructur() {
		return isConstructur;
	}
}
