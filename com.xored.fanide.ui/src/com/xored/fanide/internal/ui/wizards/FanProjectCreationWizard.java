/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui.wizards;

import java.io.ByteArrayInputStream;
import java.io.UnsupportedEncodingException;
import java.util.List;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IResourceProxy;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.dltk.compiler.util.Util;
import org.eclipse.dltk.core.IDLTKLanguageToolkit;
import org.eclipse.dltk.core.IScriptProject;
import org.eclipse.dltk.internal.ui.wizards.BuildpathDetector;
import org.eclipse.dltk.ui.DLTKUIPlugin;
import org.eclipse.dltk.ui.wizards.IBuildpathDetector;
import org.eclipse.dltk.ui.wizards.ProjectCreator;
import org.eclipse.dltk.ui.wizards.ProjectWizard;

import com.xored.fanide.core.BuildFan;
import com.xored.fanide.core.FanCore;
import com.xored.fanide.core.FanNature;
import com.xored.fanide.core.utils.FanProjectUtils;
import com.xored.fanide.internal.ui.FanImages;

public class FanProjectCreationWizard extends ProjectWizard {
	public static final String WIZARD_ID = "com.xored.fanide.ui.internal.wizards.newproject";

	private FanProjectWizardFirstPage fFirstPage;
	private FanProjectWizardSecondPage fSecondPage;

	public FanProjectCreationWizard() {
		setDefaultPageImageDescriptor(FanImages.DESC_WIZBAN_PROJECT_CREATION);
		setDialogSettings(DLTKUIPlugin.getDefault().getDialogSettings());
		setWindowTitle(FanWizardMessages.ProjectCreationWizard_title);
	}

	@Override
	public String getScriptNature() {
		return FanNature.NATURE_ID;
	}

	@Override
	public void addPages() {
		super.addPages();
		fFirstPage = new FanProjectWizardFirstPage();
		fFirstPage.setTitle(FanWizardMessages.ProjectCreationWizardFirstPage_title);
		fFirstPage.setDescription(FanWizardMessages.ProjectCreationWizardFirstPage_description);
		addPage(fFirstPage);
		fSecondPage = new FanProjectWizardSecondPage(fFirstPage);
		addPage(fSecondPage);
	}

	private static class FanBuildpathDetector extends BuildpathDetector {
		/**
		 * @param project
		 * @param toolkit
		 */
		public FanBuildpathDetector(IProject project, IDLTKLanguageToolkit toolkit) {
			super(project, toolkit);
		}

		@Override
		public boolean visit(IResourceProxy proxy, List<IFile> files) {
			if (proxy.getType() == IResource.FILE && BuildFan.FILENAME.equals(proxy.getName())) {
				return false;
			} else {
				return super.visit(proxy, files);
			}
		}
	}

	@Override
	protected ProjectCreator createProjectCreator() {
		return new ProjectCreator(this, getFirstPage()) {
			@Override
			protected IBuildpathDetector createBuildpathDetector() {
				return new FanBuildpathDetector(getProject(), getLanguageToolkit());
			}
		};
	}

	@Override
	protected void finishPage(IProgressMonitor monitor)
			throws InterruptedException, CoreException {
		super.finishPage(monitor);
		IProject project = fSecondPage.getScriptProject().getProject();

		createBuildFanFile(fSecondPage.getScriptProject(), monitor,
				fFirstPage.isCreateJavaSourceFolder());
		// TODO We should add possibility to choose available configurer types
		// and run configure method of selected configurer.
		// At this moment 'jdt' is hardcoded.

		FanCore.getConfigurer("jdt").configure(project);
	}

	public static void createBuildFanFile(IScriptProject project,
			IProgressMonitor monitor, boolean createJavaSourceFolder)
			throws CoreException {
		if (monitor == null) {
			monitor = new NullProgressMonitor();
		}
		final IFile file = project.getProject().getFile(BuildFan.FILENAME);
		if (!file.exists()) {
			final String fileContent = BuildFan.generateContent(project
					.getProject().getName(), FanProjectUtils
					.getSrcDirs(project), createJavaSourceFolder ? "`java/`" : null);
			byte[] bytes;
			try {
				bytes = fileContent.getBytes(Util.UTF_8);
			} catch (UnsupportedEncodingException e) {
				bytes = fileContent.getBytes();
			}
			file.create(new ByteArrayInputStream(bytes), false, monitor);
		}
	}

}
