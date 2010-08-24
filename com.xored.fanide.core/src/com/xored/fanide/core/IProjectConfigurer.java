package com.xored.fanide.core;

import org.eclipse.core.resources.IProject;

public interface IProjectConfigurer {
	public void configure(IProject project);

	public String[] getConfigurableProjectNatures();
}
