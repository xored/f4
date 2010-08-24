package com.xored.fanide.ast.references;

import org.eclipse.core.runtime.Assert;
import org.eclipse.dltk.ast.references.SimpleReference;

import com.xored.fanide.ast.typesystem.SimpleTypeRef;

public class UnresolvedReference extends SimpleReference {

	public UnresolvedReference(SimpleTypeRef ref) {
		super(ref.sourceStart(), ref.sourceEnd(), ref.getType().getName());
		Assert.isLegal(ref.isNullable() == false);
		Assert.isLegal(ref.getPod() == null);
	}

	public UnresolvedReference(SimpleReference ref) {
		super(ref.sourceStart(), ref.sourceEnd(), ref.getName());
	}
}
