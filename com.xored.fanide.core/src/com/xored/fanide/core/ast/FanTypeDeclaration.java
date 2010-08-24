package com.xored.fanide.core.ast;

import org.eclipse.dltk.ast.declarations.TypeDeclaration;
import org.eclipse.dltk.ast.expressions.CallExpression;
import org.eclipse.dltk.ast.references.TypeReference;

import com.xored.fanide.core.ast.FanStructureASTBuilder.IFanField;
import com.xored.fanide.core.ast.FanStructureASTBuilder.IFanMethod;
import com.xored.fanide.core.ast.FanStructureASTBuilder.IFanType;

public class FanTypeDeclaration extends TypeDeclaration implements IFanType {

	public FanTypeDeclaration() {
		super(null, 0, 0, 0, 0);
	}

	public void addSuperType(String superTypename, int start, int end) {
		addSuperClass(new TypeReference(start, end, superTypename));
	}

	public IFanField addField() {
		FanFieldDeclaration decl = new FanFieldDeclaration();
		getStatements().add(decl);
		return decl;
	}

	public IFanMethod addMethod() {
		FanMethodDeclaration decl = new FanMethodDeclaration();
		getStatements().add(decl);
		return decl;

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
}
