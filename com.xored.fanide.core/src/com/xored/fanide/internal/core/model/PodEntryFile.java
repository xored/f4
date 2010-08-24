/*******************************************************************************
 * Copyright (c) 2000, 2007 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.core.model;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import org.eclipse.core.resources.IStorage;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.PlatformObject;
import org.eclipse.dltk.core.IModelStatusConstants;
import org.eclipse.dltk.core.ModelException;
import org.eclipse.dltk.core.environment.EnvironmentPathUtils;
import org.eclipse.dltk.internal.core.ModelStatus;

public class PodEntryFile extends PlatformObject implements IStorage {

	private String entryName;
	private IPath path;
	private PodFragment archiveProjectFragment;

	public PodEntryFile(String entryName, IPath parentRelativePath,
			PodFragment archiveProjectFragment) {
		this.entryName = entryName;
		this.path = parentRelativePath;
		this.archiveProjectFragment = archiveProjectFragment;
	}

	public InputStream getContents() throws CoreException {
		try {
			ZipFile zipFile = null;
			InputStream inputStream = null;
			try {

				zipFile = new ZipFile(EnvironmentPathUtils.getLocalPath(
						archiveProjectFragment.getPodPath()).toFile());
				ZipEntry zipEntry = zipFile.getEntry(EnvironmentPathUtils
						.getLocalPath(this.path.append(this.entryName))
						.toString());
				if (zipEntry == null) {
					throw new ModelException(new ModelStatus(
							IModelStatusConstants.INVALID_PATH, this.entryName));
				}

				inputStream = zipFile.getInputStream(zipEntry);
				final int entrySize = (int) zipEntry.getSize();
				if (entrySize >= 0) {
					final byte[] buf = new byte[entrySize];
					int offset = 0;
					int len;
					while (entrySize > offset
							&& (len = inputStream.read(buf, offset, entrySize
									- offset)) > 0) {
						offset += len;
					}
					return new ByteArrayInputStream(buf, 0, offset);
				} else {
					byte[] buf = new byte[1024];
					int len;
					ByteArrayOutputStream arrayOut = new ByteArrayOutputStream();
					while ((len = inputStream.read(buf)) > 0) {
						arrayOut.write(buf, 0, len);
					}
					return new ByteArrayInputStream(arrayOut.toByteArray());
				}
			} finally {
				if (inputStream != null) {
					inputStream.close();
				}
				if (zipFile != null) {
					zipFile.close();
				}
			}
		} catch (IOException e) {
			throw new ModelException(e, IModelStatusConstants.IO_EXCEPTION);
		}
	}

	/**
	 * @see IStorage#getFullPath
	 */
	public IPath getFullPath() {
		return path.append(this.entryName);
	}

	/**
	 * @see IStorage#getName
	 */
	public String getName() {
		return new Path(this.entryName).lastSegment();
	}

	/**
	 * @see IStorage#isReadOnly()
	 */
	public boolean isReadOnly() {
		return true;
	}
}
