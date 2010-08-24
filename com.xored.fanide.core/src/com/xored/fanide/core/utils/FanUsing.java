package com.xored.fanide.core.utils;

import com.xored.fanide.ast.statements.UsingStmt;

public class FanUsing implements Comparable<FanUsing>{
	private final static String USING_PREFIX = "using "; 
	private String typeName;
	private String podName;

	public FanUsing(String typeName, String podName) {
		super();
		this.typeName = typeName;
		this.podName = podName;
	}

	public FanUsing(UsingStmt stmt) {
		this(stmt.getTypeName().getName(), stmt.getPodName().getName());
	}

	public FanUsing(String qualifiedName) {
		int pos = qualifiedName.lastIndexOf("::");
		if(pos != -1) {
			this.typeName = qualifiedName.substring(pos + 2);
			this.podName = qualifiedName.substring(0, pos);
		} else {
			this.typeName = null;
			this.podName = qualifiedName;
		}
	}

	public String getTypeName() {
		return typeName;
	}
	
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	
	public String getPodName() {
		return podName;
	}
	
	public void setPodName(String podName) {
		this.podName = podName;
	}
	
	public String getUsing() {
		String result = "";
		if(podName != null && podName.length() > 0)
			result += podName;
		if(typeName != null && typeName.length() > 0)
			result += "::" + typeName;
		return result.length() > 0 ? result : null; 
	}

	@Override
	public String toString() {
		String using = getUsing(); 
		if(using != null)
			return USING_PREFIX + using;
		return "";
	}

	@Override
	public boolean equals(Object obj) {
		return (obj instanceof FanUsing) && (podName.equals(((FanUsing)obj).podName))
				&& (typeName.equals(((FanUsing)obj).typeName));
	}

	@Override
	public int hashCode() {
		return getUsing().hashCode();
	}

	public int compareTo(FanUsing o) {
		int res = podName.compareTo(o.podName);
		return res == 0 ? typeName.compareTo(o.typeName) : res;
	}
}
