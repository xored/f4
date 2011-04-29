/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui;

import org.eclipse.dltk.core.IDLTKLanguageToolkit;
import org.eclipse.dltk.core.IModelElement;
import org.eclipse.dltk.core.IProjectFragment;
import org.eclipse.dltk.core.IScriptFolder;
import org.eclipse.dltk.core.ISourceModule;
import org.eclipse.dltk.core.model.binary.IBinaryModule;
import org.eclipse.dltk.core.model.binary.ISourceMapperProvider;
import org.eclipse.dltk.core.model.binary.SourceMapper;
import org.eclipse.dltk.ui.AbstractDLTKUILanguageToolkit;
import org.eclipse.dltk.ui.IDLTKUILanguageToolkit;
import org.eclipse.dltk.ui.PreferenceConstants;
import org.eclipse.dltk.ui.ScriptElementLabels;
import org.eclipse.dltk.ui.text.ScriptSourceViewerConfiguration;
import org.eclipse.dltk.ui.text.ScriptTextTools;
import org.eclipse.dltk.ui.viewsupport.ScriptUILabelProvider;
import org.eclipse.jface.dialogs.IDialogSettings;
import org.eclipse.jface.preference.IPreferenceStore;

import com.xored.fanide.core.FanConstants;
import com.xored.fanide.core.FanLanguageToolkit;
import com.xored.fanide.internal.core.model.PodFragment;
import com.xored.fanide.internal.core.model.PodModule;
import com.xored.fanide.internal.core.model.PodSourcesFolder;
import com.xored.fanide.internal.ui.text.SimpleFanSourceViewerConfiguration;
import com.xored.fanide.ui.FanUIConstants;

public class FanUILanguageToolkit extends AbstractDLTKUILanguageToolkit {
	private static ScriptElementLabels sInstance = new ScriptElementLabels() {
		protected void getScriptFolderLabel(IScriptFolder folder,
				StringBuffer buf) {
			if (folder instanceof PodSourcesFolder) {
				return;
			}
			String name = folder.getElementName();
			name = name.replace(IScriptFolder.PACKAGE_DELIMITER, '.');
			buf.append(name);
		}

		public void getScriptFolderLabel(IProjectFragment pack, long flags,
				StringBuffer buf) {
			if (pack instanceof PodFragment) {
				// buf.append(((PodFragment) pack).getPodPath().lastSegment());
				// buf.append(' ');
				return;
			}
			super.getScriptFolderLabel(pack, flags, buf);
		}

		public void getProjectFragmentLabel(IProjectFragment root, long flags,
				StringBuffer buf) {
			if (root instanceof PodFragment) {
				buf.append(((PodFragment) root).getPodPath().lastSegment());
				buf.append(' ');
				return;
			}
			super.getProjectFragmentLabel(root, flags, buf);
		};

		protected void getScriptFolderLabel(IScriptFolder folder, long flags,
				StringBuffer buf) {
			// if( folder instanceof PodSourcesFolder ) {
			// return;
			// }
			// boolean podFolder = true;// folder instanceof PodSourcesFolder;
			if (getFlag(flags, P_QUALIFIED)) {
				getProjectFragmentLabel((IProjectFragment) folder.getParent(),
						ROOT_QUALIFIED, buf);
				buf.append('/');
			}
			// refreshPackageNamePattern();
			if (folder.isRootFolder()) {
				// if (!podFolder) {
				// buf.append(DEFAULT_PACKAGE);
				// }
			} else if (getFlag(flags, P_COMPRESSED) && fgPkgNameLength >= 0) {
				String name = folder.getElementName();
				int start = 0;
				int dot = name.indexOf(IScriptFolder.PACKAGE_DELIMITER, start);
				while (dot > 0) {
					if (dot - start > fgPkgNameLength - 1) {
						buf.append(fgPkgNamePrefix);
						if (fgPkgNameChars > 0)
							buf.append(name.substring(start, Math.min(start
									+ fgPkgNameChars, dot)));
						buf.append(fgPkgNamePostfix);
					} else
						buf.append(name.substring(start, dot + 1));
					start = dot + 1;
					dot = name.indexOf(IScriptFolder.PACKAGE_DELIMITER, start);
				}
				buf.append(name.substring(start));
			} else {
				getScriptFolderLabel(folder, buf);
			}
			if (getFlag(flags, P_POST_QUALIFIED)) {
				// if (!podFolder) {
				// buf.append(CONCAT_STRING);
				// }
				getProjectFragmentLabel((IProjectFragment) folder.getParent(),
						ROOT_QUALIFIED, buf);
			}
		}

		protected void getSourceModule(ISourceModule module, long flags,
				StringBuffer buf) {
			if (getFlag(flags, CU_QUALIFIED)) {
				IScriptFolder pack = (IScriptFolder) module.getParent();

				getScriptFolderLabel(pack, (flags & QUALIFIER_FLAGS), buf);
				// if (!(module instanceof PodModule)) {
				// buf.append(getTypeDelimiter(module));
				// }
			}
			buf.append(module.getElementName());

			if (getFlag(flags, CU_POST_QUALIFIED)) {
				buf.append(CONCAT_STRING);
				getScriptFolderLabel((IScriptFolder) module.getParent(), flags
						& QUALIFIER_FLAGS, buf);
			}
		};

	};

	private static FanUILanguageToolkit sToolkit = null;

	public static synchronized IDLTKUILanguageToolkit getInstance() {
		if (sToolkit == null) {
			sToolkit = new FanUILanguageToolkit();
		}
		return sToolkit;
	}

	public ScriptElementLabels getScriptElementLabels() {
		return sInstance;
	}

	public IPreferenceStore getPreferenceStore() {
		return FanUI.getDefault().getPreferenceStore();
	}

	public IDLTKLanguageToolkit getCoreToolkit() {
		return FanLanguageToolkit.getDefault();
	}

	public IDialogSettings getDialogSettings() {
		return FanUI.getDefault().getDialogSettings();
	}

	public String getPartitioningId() {
		return FanConstants.FAN_PARTITIONING;
	}

	public String getEditorId(Object inputElement) {
		if (inputElement instanceof IModelElement) {
			IModelElement e = (IModelElement) inputElement;
			IModelElement module = e.getAncestor(IModelElement.SOURCE_MODULE);
			if (module != null) {
				if (module instanceof PodModule) {
					ISourceMapperProvider provider = (ISourceMapperProvider) module;
					SourceMapper mapper = provider.getSourceMapper();
					if (mapper != null) {
						String source = mapper
								.getSource((IBinaryModule) module);
						if (source == null) {
							return FanUIConstants.FCODE_EDITOR_ID;
						}
					} else {
						return FanUIConstants.FCODE_EDITOR_ID;
					}
				}
			}
		}
		return FanUIConstants.FAN_EDITOR_ID;
	}

	public String getInterpreterContainerId() {
		return "com.xored.fanide.launching.INTERPRETER_CONTAINER";
	}

	public ScriptUILabelProvider createScriptUILabelProvider() {
		return null;
	}

	public boolean getProvideMembers(ISourceModule element) {
		return true;
	}

	public ScriptTextTools getTextTools() {
		return FanUI.getDefault().getTextTools();
	}

	public ScriptSourceViewerConfiguration createSourceViewerConfiguration() {
		return new SimpleFanSourceViewerConfiguration(getTextTools()
				.getColorManager(), getPreferenceStore(), null,
				getPartitioningId(), false);
	}

	private static final String INTERPRETERS_PREFERENCE_PAGE_ID = "com.xored.fanide.ui.preferences.interpreters";
	private static final String DEBUG_PREFERENCE_PAGE_ID = "com.xored.fanide.preferences.debug";
	private static final String[] EDITOR_PREFERENCE_PAGES_IDS = {
			"com.xored.fanide.preferences.editor",
			"com.xored.fanide.ui.editor.SyntaxColoring",
			"com.xored.fanide.ui.editor.SmartTyping",
			"com.xored.fanide.ui.editor.FanFolding" };

	public String getInterpreterPreferencePage() {
		return INTERPRETERS_PREFERENCE_PAGE_ID;
	}

	public String getDebugPreferencePage() {
		return DEBUG_PREFERENCE_PAGE_ID;
	}

	public String[] getEditorPreferencePages() {
		return EDITOR_PREFERENCE_PAGES_IDS;
	}

	@Override
	public boolean getBoolean(String name) {
		if (PreferenceConstants.SRCBIN_FOLDERS_IN_NEWPROJ.equals(name)) {
			return true;
		}
		return super.getBoolean(name);
	}

	@Override
	public String getString(String name) {
		if (PreferenceConstants.SRC_SRCNAME.equals(name)) {
			return "fan"; //$NON-NLS-1$
		}
		return super.getString(name);
	}
}
