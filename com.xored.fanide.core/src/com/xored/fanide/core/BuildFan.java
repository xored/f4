/*******************************************************************************
 * Copyright (c) 2010 xored software, Inc.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     xored software, Inc. - initial API and Implementation (Alex Panchenko)
 *******************************************************************************/
package com.xored.fanide.core;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.dltk.compiler.util.Util;
import org.eclipse.dltk.utils.TextUtils;

public class BuildFan {

	public static final String FILENAME = "build.fan"; //$NON-NLS-1$
	private static final String POD_NAME = "podName";
	private static final String SRC_DIRS = "srcDirs";
	private static final String DEPS = "depends";
	//private static final String VERSION = "version";
	//private static final Version defaultVersion = Version.fromStr("0");

	/*public static String readPodName(IProject project) {
		IFile podConf = project.getFile(new Path(FILENAME));
		if (!podConf.exists()) {
			return null;
		}
		BufferedInputStream inp = null;
		try {
			inp = new BufferedInputStream(podConf.getContents());
			String content = new String(Util.getInputStreamAsCharArray(inp, -1,
					null));
			final String REGEX = "^\\s*" + POD_NAME + "\\s*=\\s*\"(.*)\"";
			final Matcher matcher = Pattern.compile(REGEX, Pattern.MULTILINE)
					.matcher(content);
			if (matcher.find()) {
				return matcher.group(1);
			}
		} catch (CoreException e) {
			FanCore.log(e);
		} catch (IOException e) {
			FanCore.log(e);
		} finally {
			if (inp != null) {
				try {
					inp.close();
				} catch (IOException e) {
					// Ignore
				}
			}
		}
		return null;
	}*/

	/*public static Version readVersion(IProject project) {
		IFile podConf = project.getFile(new Path(FILENAME));
		if (!podConf.exists()) {
			return defaultVersion;
		}
		BufferedInputStream inp = null;
		try {
			inp = new BufferedInputStream(podConf.getContents());
			String content = new String(Util.getInputStreamAsCharArray(inp, -1,
					null));
			final String REGEX = "^\\s*" + VERSION
					+ "\\s*=\\s*Version\\.fromStr\\(\\s*\"(.*)\"\\s*\\)";
			final Matcher matcher = Pattern.compile(REGEX, Pattern.MULTILINE)
					.matcher(content);
			if (matcher.find()) {
				return Version.fromStr(matcher.group(1));
			}
		} catch (CoreException e) {
			FanCore.log(e);
		} catch (IOException e) {
			FanCore.log(e);
		} finally {
			if (inp != null) {
				try {
					inp.close();
				} catch (IOException e) {
					// Ignore
				}
			}
		}
		return defaultVersion;
	}*/

	/*public static Depend[] readDeps(IProject project) {
		IFile podConf = project.getFile(new Path(FILENAME));
		if (!podConf.exists()) {
			return new Depend[0];
		}
		BufferedInputStream inp = null;
		try {
			inp = new BufferedInputStream(podConf.getContents());
			String content = new String(Util.getInputStreamAsCharArray(inp, -1,
					null));
			final String REGEX = "^\\s*" + DEPS + "\\s*=\\s*(\\[.*\\])";
			final Matcher matcher = Pattern.compile(REGEX, Pattern.MULTILINE)
					.matcher(content);
			if (matcher.find()) {
				return strToDeps(matcher.group(1));
			}
		} catch (CoreException e) {
			FanCore.log(e);
		} catch (IOException e) {
			FanCore.log(e);
		} finally {
			if (inp != null) {
				try {
					inp.close();
				} catch (IOException e) {
					// Ignore
				}
			}
		}
		return new Depend[0];
	}*/

	/**
	 * @param podFile
	 * @param srcDirs
	 * @throws IOException
	 * @throws CoreException
	 */
	public static void updateSrcDirs(IFile podFile, String srcDirs)
			throws CoreException, IOException {
		final StringBuilder content = read(podFile);
		final Pattern POD_SRC_DIRS = Pattern.compile(SRC_DIRS
				+ "\\s*=\\s*\\[(.*)\\]"); //$NON-NLS-1$
		final Matcher matcher = POD_SRC_DIRS.matcher(content);
		if (matcher.find()) {
			if (!srcDirs.equals(matcher.group(1))) {
				content.replace(matcher.start(1), matcher.end(1), srcDirs);
				final ByteArrayInputStream newContent = new ByteArrayInputStream(
						content.toString().getBytes(podFile.getCharset()));
				podFile.setContents(newContent, true, true,
						new NullProgressMonitor());
			}
		} else {
			FanCore.warning(SRC_DIRS + " not found in " //$NON-NLS-1$
					+ podFile.getFullPath() + ":" + content); //$NON-NLS-1$
		}
	}

	/*private static String depsToStr(Depend[] deps) {
		StringBuilder b = new StringBuilder();
		b.append("[");
		for (int i = 0; i < deps.length; i++) {
			if (i > 0)
				b.append(", ");
			b.append("\"");
			b.append(deps[i].toString());
			b.append("\"");
		}
		b.append("]");
		return b.toString();
	}*/

	/*private static Depend[] strToDeps(String str) {
		Matcher array = Pattern.compile(
				"^\\s*\\[((?:\\s*\"[^\"]*\"\\s*,?\\s*)*)\\]\\s*$").matcher(str);
		Pattern dep = Pattern.compile("\\s*\"(.*)\"\\s*");
		if (array.find()) {
			List<Depend> deps = new ArrayList<Depend>();
			for (String item : array.group(1).split(",")) {
				Matcher matcher = dep.matcher(item);
				if (matcher.matches())
					try {
						deps.add(Depend.fromStr(matcher.group(1)));
					} catch (Err.Val e) {
						if (DLTKCore.DEBUG)
							e.printStackTrace();
					}
			}
			return deps.toArray(new Depend[0]);
		} else {
			FanCore.warning("failed to parse depends: " + str);
			return new Depend[0];
		}
	}*/

	/*public static void updateDeps(IProject project, Depend[] deps)
			throws CoreException, IOException {
		IFile podFile = project.getFile(new Path(FILENAME));
		if (!podFile.exists())
			return;
		final StringBuilder content = read(podFile);
		final Pattern POD_DEPS = Pattern.compile(DEPS + "\\s*=\\s*(\\[.*\\])"); //$NON-NLS-1$
		final Matcher matcher = POD_DEPS.matcher(content);
		if (matcher.find()) {
			content.replace(matcher.start(1), matcher.end(1), depsToStr(deps));
			final ByteArrayInputStream newContent = new ByteArrayInputStream(
					content.toString().getBytes(podFile.getCharset()));
			podFile.setContents(newContent, true, true,
					new NullProgressMonitor());
		} else {
			FanCore.warning(DEPS + " not found in " //$NON-NLS-1$
					+ podFile.getFullPath() + ":" + content); //$NON-NLS-1$
		}
	}*/

	private static StringBuilder read(IFile file) throws CoreException,
			IOException {
		final InputStream ins = file.getContents();
		try {
			final Reader reader = new InputStreamReader(ins, file.getCharset());
			final StringBuilder sb = new StringBuilder();
			char[] buffer = new char[1024];
			int len;
			while ((len = reader.read(buffer)) != -1) {
				sb.append(buffer, 0, len);
			}
			return sb;
		} finally {
			try {
				ins.close();
			} catch (IOException e) {
				// ignore
			}
		}
	}

	public static String generateContent(String podName, String srcDirs) {
		List<String> sb = new ArrayList<String>();
		sb.add("using build");
		sb.add("class Build : build::BuildPod");
		sb.add("{");
		sb.add("  new make()");
		sb.add("  {");
		sb.add("    " + POD_NAME + " = \"" + podName + "\"");
		sb.add("    summary = \"\"");
		sb.add("    " + SRC_DIRS + " = [" + srcDirs + "]");
		sb.add("    " + DEPS + " = [\"sys 1.0\"]");
		sb.add("  }");
		sb.add("}");
		return TextUtils.join(sb, Util.LINE_SEPARATOR) + Util.LINE_SEPARATOR;
	}

}
