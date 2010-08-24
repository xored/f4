/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui;

import org.eclipse.core.runtime.Path;
import org.eclipse.dltk.ui.PluginImagesHelper;
import org.eclipse.jface.resource.ImageDescriptor;

public class FanImages {
	private static final PluginImagesHelper helper = new PluginImagesHelper(
			FanUI.getDefault().getBundle(), new Path("/icons")); //$NON-NLS-1$

	public static final ImageDescriptor DESC_WIZBAN_PROJECT_CREATION = helper
			.createUnManaged(PluginImagesHelper.T_WIZBAN,
					"projectcreate_wiz.png");

	public static final ImageDescriptor DESC_WIZBAN_FILE_CREATION = helper
	.createUnManaged(PluginImagesHelper.T_WIZBAN,
			"filecreate_wiz.png");

}
