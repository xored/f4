package com.xored.fanide.ast.declarations;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.declarations.TypeDeclaration;

public abstract class AbstractFanTypeDeclaration extends TypeDeclaration {
	protected List<FanFacetDeclaration> facets = new ArrayList<FanFacetDeclaration>();
	
	public AbstractFanTypeDeclaration() {
		super("", 0, 0, 0, 0);
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

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			traverseChildNodes(visitor);
			visitor.endvisit(this);
		}
	}
	
	protected void traverseChildNodes(ASTVisitor visitor) throws Exception {
		for (FanFacetDeclaration facet : this.facets) {
			facet.traverse(visitor);
		}
		if (this.getSuperClasses() != null) {
			this.getSuperClasses().traverse(visitor);
		}
		if (this.fBody != null) {
			fBody.traverse(visitor);
		}
	}
}
