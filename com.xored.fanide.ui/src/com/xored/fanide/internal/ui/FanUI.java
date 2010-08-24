/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui;

import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Status;
import org.eclipse.dltk.ui.text.ScriptTextTools;
import org.eclipse.dltk.ui.text.templates.ICodeTemplateAccess;
import org.eclipse.ui.plugin.AbstractUIPlugin;
import org.fantom.FantomVM;
import org.osgi.framework.BundleContext;

import com.xored.fanide.internal.ui.text.FanCodeTemplateAccess;
import com.xored.fanide.internal.ui.text.FanTextTools;

/**
 * The activator class controls the plug-in life cycle
 */
public class FanUI extends AbstractUIPlugin {
	// The plug-in ID
	public static final String PLUGIN_ID = "com.xored.fanide.ui"; //$NON-NLS-1$

	public static final String ID_ACTION_SET = "com.xored.fanide.ui.actionSet"; //$NON-NLS-1$

	public static final String ID_FAN_EXPLORER = "com.xored.fanide.ui.explorer"; //$NON-NLS-1$

	// The shared instance
	private static FanUI plugin;

	private ScriptTextTools fFanTextTools;

	/**
	 * The constructor
	 */
	public FanUI() {
		plugin = this;
	}

	@Override
	public void start(BundleContext context) throws Exception {
		super.start(context);
	}

	@Override
	public void stop(BundleContext context) throws Exception {
		plugin = null;
		super.stop(context);
	}

	/**
	 * Returns the shared instance
	 * 
	 * @return the shared instance
	 */
	public static FanUI getDefault() {
		return plugin;
	}

	public synchronized ScriptTextTools getTextTools() {
		if (fFanTextTools == null)
			fFanTextTools = new FanTextTools(true);
			//fFanTextTools = (ScriptTextTools)FantomVM.makeObject("f4uiText::FanTextTools", true);
		return fFanTextTools;
	}

	public static void log(IStatus status) {
		getDefault().getLog().log(status);
	}

	public static void log(Throwable e) {
		log(new Status(IStatus.ERROR, PLUGIN_ID, e.getMessage(), e));
	}

	public static void error(String message) {
		plugin.getLog()
				.log(
						new Status(IStatus.ERROR, PLUGIN_ID, IStatus.OK,
								message, null));
	}

	public static void error(String message, Throwable t) {
		plugin.getLog().log(
				new Status(IStatus.ERROR, PLUGIN_ID, IStatus.OK, message, t));
	}

	public static void warn(String message) {
		warn(message, null);
	}

	public static void warn(String message, Throwable throwable) {
		log(new Status(IStatus.WARNING, PLUGIN_ID, message, throwable));
	}

	private ICodeTemplateAccess codeTemplateAccess = null;

	public ICodeTemplateAccess getCodeTemplateAccess() {
		if (codeTemplateAccess == null) {
			codeTemplateAccess = new FanCodeTemplateAccess();
		}
		return codeTemplateAccess;
	}
}
