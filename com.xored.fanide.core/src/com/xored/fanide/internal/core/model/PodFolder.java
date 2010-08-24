/*******************************************************************************
 * Copyright (c) 2005, 2007 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.core.model;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.dltk.core.ModelException;
import org.eclipse.dltk.internal.core.OpenableElementInfo;
import org.eclipse.dltk.internal.core.ScriptFolder;

public class PodFolder extends ScriptFolder {
	private List<PodEntryFile> foreignResources = new ArrayList<PodEntryFile>();

	public PodFolder(PodFragment parent, IPath path, boolean exists) {
		super(parent, path);
	}

	protected boolean computeChildren(OpenableElementInfo info,
			ArrayList entryNames) {
		return true;
	}

	public boolean isReadOnly() {
		return true;
	}

	@Override
	public boolean exists() {
		return true;
	}

	protected Object createElementInfo() {
		return null; // not used for ArchiveFolders: info is created when
		// archive is opened
	}

	public Object[] getForeignResources() throws ModelException {
		return foreignResources.toArray();
	}

	public void setForeignResources(List<PodEntryFile> foreignResources) {
		this.foreignResources = foreignResources;
	}

	public Object getElementInfo(IProgressMonitor monitor)
			throws ModelException {
		return null;
	}
}
