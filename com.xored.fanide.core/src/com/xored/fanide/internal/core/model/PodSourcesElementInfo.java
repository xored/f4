package com.xored.fanide.internal.core.model;

import org.eclipse.dltk.internal.core.OpenableElementInfo;

public class PodSourcesElementInfo extends OpenableElementInfo {
	private String podName;
	private String podVersion;

	public void setPodName(String podName) {
		this.podName = podName;
	}

	public String getPodName() {
		return podName;
	}

	public void setPodVersion(String podVersion) {
		this.podVersion = podVersion;
	}

	public String getPodVersion() {
		return podVersion;
	}
}
