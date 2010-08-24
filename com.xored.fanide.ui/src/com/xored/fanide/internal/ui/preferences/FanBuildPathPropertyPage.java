/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui.preferences;

import java.lang.reflect.InvocationTargetException;

import org.eclipse.core.resources.IWorkspaceRunnable;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.OperationCanceledException;
import org.eclipse.dltk.core.IDLTKLanguageToolkit;
import org.eclipse.dltk.internal.ui.actions.WorkbenchRunnableAdapter;
import org.eclipse.dltk.ui.preferences.BuildPathsPropertyPage;
import org.eclipse.dltk.ui.preferences.PreferencesMessages;
import org.eclipse.dltk.ui.util.BusyIndicatorRunnableContext;
import org.eclipse.dltk.ui.util.ExceptionHandler;
import org.eclipse.dltk.ui.wizards.BuildpathsBlock;
import org.eclipse.jface.dialogs.ProgressMonitorDialog;
import org.eclipse.ui.IWorkbenchPropertyPage;
import org.eclipse.ui.preferences.IWorkbenchPreferenceContainer;

import com.xored.fanide.core.FanLanguageToolkit;
import com.xored.fanide.ui.utils.FanBuildUtils;

public class FanBuildPathPropertyPage extends BuildPathsPropertyPage implements
		IWorkbenchPropertyPage {
	private BuildpathsBlock fBuildPathsBlock;

	public FanBuildPathPropertyPage() {
	}

	@Override
	protected BuildpathsBlock createBuildPathBlock(
			IWorkbenchPreferenceContainer pageContainer) {
		fBuildPathsBlock = new FanBuildPathsBlock(
				new BusyIndicatorRunnableContext(), this, getSettings().getInt(
						INDEX), false, pageContainer);
		return fBuildPathsBlock;
	}

	@Override
	public boolean performOk() {
		if (fBuildPathsBlock != null) {
			getSettings().put(INDEX, fBuildPathsBlock.getPageIndex());
			if (fBuildPathsBlock.hasChangesInDialog()) {
				final boolean doBuild = FanBuildUtils.doBuildDialog(
						getProject(), getShell());
				IWorkspaceRunnable runnable = new IWorkspaceRunnable() {
					public void run(IProgressMonitor monitor)
							throws CoreException, OperationCanceledException {
						fBuildPathsBlock.configureScriptProject(monitor);
						if (doBuild) {
							FanBuildUtils.processChanges(getProject(), monitor);
						}
					}
				};

				WorkbenchRunnableAdapter op = new WorkbenchRunnableAdapter(
						runnable);
				if (true/* fBlockOnApply */) {
					try {
						new ProgressMonitorDialog(getShell()).run(true, true,
								op);
					} catch (InvocationTargetException e) {
						ExceptionHandler
								.handle(
										e,
										getShell(),
										PreferencesMessages.BuildPathsPropertyPage_error_title,
										PreferencesMessages.BuildPathsPropertyPage_error_message);
						return false;
					} catch (InterruptedException e) {
						return false;
					}
				} else {
					op
							.runAsUserJob(
									PreferencesMessages.BuildPathsPropertyPage_job_title,
									null);
				}
			}
		}
		return true;
	}

	public IDLTKLanguageToolkit getLanguageToolkit() {
		return FanLanguageToolkit.getDefault();
	}
}
