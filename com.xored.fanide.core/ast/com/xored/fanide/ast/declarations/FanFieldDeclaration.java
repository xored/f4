package com.xored.fanide.ast.declarations;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.declarations.FieldDeclaration;
import org.eclipse.dltk.ast.expressions.Expression;

import com.xored.fanide.ast.typesystem.FanTypeRef;

public class FanFieldDeclaration extends FieldDeclaration {

	private Expression initializer;
	private FanTypeRef type;
	private FanGetterOrSetterDeclaration getter;
	private FanGetterOrSetterDeclaration setter;
	private List<FanFacetDeclaration> facets = new ArrayList<FanFacetDeclaration>();

	public FanFieldDeclaration(String name, int nameStart, int nameEnd,
			int declStart, int declEnd) {
		super(name, nameStart, nameEnd, declStart, declEnd);
	}

	public void addFacet(FanFacetDeclaration facet) {
		if (facet != null) {
			this.facets.add(facet);
			int facetStart = facet.sourceStart();
			if (facetStart < this.sourceStart()) {
				this.setStart(facetStart);
			}
		}
	}

	public List<FanFacetDeclaration> getFacets() {
		return this.facets;
	}

	public FanTypeRef getType() {
		return type;
	}

	public void setType(FanTypeRef type) {
		this.type = type;
	}
	
	public void setInitializer(Expression initializer) {
		this.initializer = initializer;
	}
	
	public Expression getInitializer() {
		return this.initializer;
	}

	public void setGetter(FanGetterOrSetterDeclaration getter) {
		this.getter = getter;
	}
	
	public FanGetterOrSetterDeclaration getGetter() {
		return this.getter;
	}

	public void setSetter(FanGetterOrSetterDeclaration setter) {
		this.setter = setter;
	}
	
	public FanGetterOrSetterDeclaration getSetter() {
		return this.setter;
	}

	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			for (FanFacetDeclaration facet : this.facets) {
				facet.traverse(visitor);
			}
			if (type != null)
				type.traverse(visitor);
			this.getRef().traverse(visitor);
			if (initializer != null)
				initializer.traverse(visitor);
			if (getter != null)
				getter.traverse(visitor);
			if (setter != null)
				setter.traverse(visitor);
			visitor.endvisit(this);
		}
	}
}
