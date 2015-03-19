/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui.wizards;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.dltk.ui.util.BusyIndicatorRunnableContext;
import org.eclipse.dltk.ui.util.IStatusChangeListener;
import org.eclipse.dltk.ui.wizards.BuildpathsBlock;
import org.eclipse.dltk.ui.wizards.ProjectWizardSecondPage;
import org.eclipse.dltk.utils.ResourceUtil;
import org.eclipse.jdt.core.JavaCore;

import com.xored.fanide.internal.ui.preferences.FanBuildPathsBlock;

public class FanProjectWizardSecondPage extends ProjectWizardSecondPage {

	private final FanProjectWizardFirstPage firstPage;

	public FanProjectWizardSecondPage(FanProjectWizardFirstPage firstPage) {
		super(firstPage);
		this.firstPage = firstPage;
	}
	
	@Override
	protected BuildpathsBlock createBuildpathBlock(IStatusChangeListener listener) {
		return new FanBuildPathsBlock(new BusyIndicatorRunnableContext(), listener, 0, useNewSourcePage(), null);
	}
	
	@Override
	protected void configureNatures(IProject project, IProgressMonitor monitor) throws CoreException {
		super.configureNatures(project, monitor);
		ResourceUtil.addNature(project, monitor, JavaCore.NATURE_ID);
	}

}
