/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui.editor;

import org.eclipse.dltk.core.IDLTKLanguageToolkit;
import org.eclipse.dltk.internal.ui.editor.BracketInserter;
import org.eclipse.dltk.internal.ui.editor.ScriptEditor;
import org.eclipse.dltk.internal.ui.editor.ScriptOutlinePage;
import org.eclipse.dltk.ui.PreferenceConstants;
import org.eclipse.dltk.ui.text.ScriptTextTools;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.IDocumentExtension3;
import org.eclipse.jface.text.ITextViewerExtension;
import org.eclipse.jface.text.source.ICharacterPairMatcher;
import org.eclipse.jface.text.source.ISourceViewer;
import org.eclipse.jface.util.IPropertyChangeListener;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.ui.IEditorInput;
import org.eclipse.ui.IPageLayout;
import org.eclipse.ui.part.IShowInTargetList;

import com.xored.fanide.core.FanLanguageToolkit;
import com.xored.fanide.internal.ui.FanUI;
import com.xored.fanide.internal.ui.text.FanBracketInserter;
import com.xored.fanide.internal.ui.text.FanPairMatcher;
import com.xored.fanide.internal.ui.text.IFanPartitions;

public class FanEditor extends ScriptEditor {

	public static final String EDITOR_ID = "com.xored.fanide.ui.editor.FanEditor";

	public static final String EDITOR_CONTEXT = "#FanEditorContext";

	public static final String RULER_CONTEXT = "#FanRulerContext";

	private BracketInserter fBracketInserter = new FanBracketInserter(this);

	private IPreferenceStore fStore = FanUI.getDefault().getPreferenceStore();

	@Override
	protected void initializeEditor() {
		super.initializeEditor();
		setEditorContextMenuId(EDITOR_CONTEXT);
		setRulerContextMenuId(RULER_CONTEXT);
	}

	@Override
	protected IPreferenceStore getScriptPreferenceStore() {
		return FanUI.getDefault().getPreferenceStore();
	}

	@Override
	public ScriptTextTools getTextTools() {
		return FanUI.getDefault().getTextTools();
	}

	@Override
	protected ScriptOutlinePage doCreateOutlinePage() {
		return new FanOutlinePage(this, FanUI.getDefault().getPreferenceStore());
	}

	@Override
	protected void connectPartitioningToElement(IEditorInput input,
			IDocument document) {
		if (document instanceof IDocumentExtension3) {
			IDocumentExtension3 extension = (IDocumentExtension3) document;
			if (extension
					.getDocumentPartitioner(IFanPartitions.FAN_PARTITIONING) == null) {
				FanDocumentSetupParticipant participant = new FanDocumentSetupParticipant();
				participant.setup(document);
			}
		}
	}

	@Override
	public void createPartControl(Composite parent) {
		super.createPartControl(parent);

		fBracketInserter.setCloseBracketsEnabled(fStore
				.getBoolean(PreferenceConstants.EDITOR_CLOSE_BRACKETS));
		fBracketInserter.setCloseStringsEnabled(fStore
				.getBoolean(PreferenceConstants.EDITOR_CLOSE_STRINGS));
		if (fBracketInserter instanceof IPropertyChangeListener)
			fStore
					.addPropertyChangeListener((FanBracketInserter) fBracketInserter);
		/*
		 * FIXME fBracketInserter is added as PropertyChangeListener but never
		 * removed. Another way is just override handlePreferenceStoreChanged()
		 * or move most of the code to the base editor class.
		 */

		ISourceViewer sourceViewer = getSourceViewer();
		if (sourceViewer instanceof ITextViewerExtension)
			((ITextViewerExtension) sourceViewer)
					.prependVerifyKeyListener(fBracketInserter);
	}

	@Override
	public String getEditorId() {
		return EDITOR_ID;
	}

	@Override
	public IDLTKLanguageToolkit getLanguageToolkit() {
		return FanLanguageToolkit.getDefault();
	}

	@Override
	public String getCallHierarchyID() {
		return "org.eclipse.dltk.callhierarchy.view"; //$NON-NLS-1$
	}

	@Override
	protected void initializeKeyBindingScopes() {
		setKeyBindingScopes(new String[] { "org.eclipse.dltk.ui.FanEditorScope" }); //$NON-NLS-1$
	}

	@Override
	protected ICharacterPairMatcher createBracketMatcher() {
		return new FanPairMatcher();
	}

	@Override
	public Object getAdapter(Class required) {
		if (required == IShowInTargetList.class) {
			return new IShowInTargetList() {
				public String[] getShowInTargetIds() {
					return new String[] { FanUI.ID_FAN_EXPLORER,
							IPageLayout.ID_OUTLINE };
				}
			};
		}
		return super.getAdapter(required);
	}

}
