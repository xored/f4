package com.xored.fanide.ast.declarations;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.declarations.MethodDeclaration;

public class AbstractFanMethodDeclaration extends MethodDeclaration {
	protected List<FanFacetDeclaration> facets = new ArrayList<FanFacetDeclaration>();
	
	public AbstractFanMethodDeclaration(String name, int nameStart, int nameEnd,
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
	
	protected void traverseFacets(ASTVisitor visitor) throws Exception {
		for (FanFacetDeclaration facet : this.facets) {
			facet.traverse(visitor);
		}
	}
}
