package com.xored.fanide.ast.typesystem;

public class PodRef extends FanTypeRef {
	private String name;

	public PodRef() {
	}

	public PodRef(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String getStringRepresentation() {
		return name;
	}

	@Override
	public void setNullable(boolean b) {
	}
}
