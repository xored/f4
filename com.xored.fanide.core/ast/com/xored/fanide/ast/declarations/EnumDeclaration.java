package com.xored.fanide.ast.declarations;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.dltk.ast.ASTVisitor;

public class EnumDeclaration extends AbstractFanTypeDeclaration {
	
	public EnumDeclaration() {
		super();
	}

	List<EnumValueDeclaration> values = new ArrayList<EnumValueDeclaration>();

	public void addValue(EnumValueDeclaration value) {
		if (value != null) {
			values.add(value);
		}
	}
	
	public List<EnumValueDeclaration> getValues() {
		return this.values;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			traverseChildNodes(visitor);
			for (EnumValueDeclaration value : values) {
				value.traverse(visitor);
			}
			visitor.endvisit(this);
		}
	}
}
