package com.xored.fanide.ast.typesystem;

import org.eclipse.dltk.ast.references.SimpleReference;

public class SimpleTypeRef extends FanTypeRef {
	protected boolean nullable;
	protected PodRef pod;
	protected SimpleReference type;

	public boolean isNullable() {
		return nullable;
	}

	public void setNullable(boolean nullable) {
		this.nullable = nullable;
	}

	public PodRef getPod() {
		return pod;
	}

	public void setPod(PodRef pod) {
		this.pod = pod;
	}

	public SimpleReference getType() {
		return type;
	}

	public void setType(SimpleReference type) {
		this.type = type;
	}

	@Override
	public String getStringRepresentation() {
		String res = (pod != null) ? pod.getStringRepresentation() + "::" : "";
		res += type.getStringRepresentation();
		if (nullable) {
			res += "?";
		}
		return res;
	}
}
