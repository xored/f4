/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui.text;

import org.eclipse.core.runtime.Assert;
import org.eclipse.dltk.ui.text.AbstractScriptScanner;
import org.eclipse.dltk.ui.text.IColorManager;
import org.eclipse.dltk.ui.text.ScriptPresentationReconciler;
import org.eclipse.dltk.ui.text.ScriptSourceViewerConfiguration;
import org.eclipse.dltk.ui.text.ScriptTextTools;
import org.eclipse.dltk.ui.text.TodoTaskPreferencesOnPreferenceStore;
import org.eclipse.dltk.ui.text.completion.ContentAssistPreference;
import org.eclipse.dltk.ui.text.completion.ScriptCompletionProcessor;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.jface.text.IAutoEditStrategy;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.ITextDoubleClickStrategy;
import org.eclipse.jface.text.contentassist.ContentAssistant;
import org.eclipse.jface.text.information.IInformationProvider;
import org.eclipse.jface.text.information.InformationPresenter;
import org.eclipse.jface.text.presentation.IPresentationReconciler;
import org.eclipse.jface.text.presentation.PresentationReconciler;
import org.eclipse.jface.text.rules.DefaultDamagerRepairer;
import org.eclipse.jface.text.rules.RuleBasedScanner;
import org.eclipse.jface.text.source.ISourceViewer;
import org.eclipse.jface.util.PropertyChangeEvent;
import org.eclipse.ui.texteditor.ITextEditor;
import org.fantom.FantomException;
import org.fantom.FantomVM;

import com.xored.fanide.core.FanCore;

public class FanSourceViewerConfiguration extends
		ScriptSourceViewerConfiguration {

	private ScriptTextTools fTextTools;

	private FanCodeScanner fCodeScanner;

	private AbstractScriptScanner fStringScanner;

	private AbstractScriptScanner fSingleLineCommentScanner;

	private AbstractScriptScanner fInterpreterStringScanner;

	private AbstractScriptScanner fMultiLineCommentScanner;

	private AbstractScriptScanner fDocScanner;
	
	private AbstractScriptScanner fDslScanner;

	public FanSourceViewerConfiguration(IColorManager colorManager,
			IPreferenceStore preferenceStore, ITextEditor editor,
			String partitioning) {
		super(colorManager, preferenceStore, editor, partitioning);
	}

	@Override
	public String[] getConfiguredContentTypes(ISourceViewer sourceViewer) {
		return IFanPartitions.FAN_PARITION_TYPES;
	}

	@Override
	protected String getCommentPrefix() {
		return "//";
	}

	@Override
	protected void initializeScanners() {
		Assert.isTrue(isNewSetup());
		fCodeScanner = new FanCodeScanner(getColorManager(), fPreferenceStore);
		fStringScanner = new FanStringScanner(getColorManager(),
				fPreferenceStore);
		
		fDslScanner = new FanDslScanner(getColorManager(), fPreferenceStore);

		fInterpreterStringScanner = new FanInterpreterStringScanner(
				getColorManager(), fPreferenceStore);

		fSingleLineCommentScanner = new FanSingleLineCommentScanner(
				getColorManager(), fPreferenceStore,
				FanColorConstants.FAN_SINGLE_LINE_COMMENT,
				FanColorConstants.FAN_TODO_TAG,
				new TodoTaskPreferencesOnPreferenceStore(fPreferenceStore));

		fMultiLineCommentScanner = new FanMultiLineCommentScanner(
				getColorManager(), fPreferenceStore,
				FanColorConstants.FAN_MULTI_LINE_COMMENT,
				FanColorConstants.FAN_TODO_TAG,
				new TodoTaskPreferencesOnPreferenceStore(fPreferenceStore));

		fDocScanner = new FanSingleLineCommentScanner(getColorManager(),
				fPreferenceStore, FanColorConstants.FAN_DOC,
				FanColorConstants.FAN_TODO_TAG,
				new TodoTaskPreferencesOnPreferenceStore(fPreferenceStore));
	}

	/**
	 * @return <code>true</code> if the new setup without text tools is in use.
	 */
	private boolean isNewSetup() {
		return fTextTools == null;
	}

	/**
	 * Returns the Fantom string scanner for this configuration.
	 * 
	 * @return the Fantom string scanner
	 */
	protected RuleBasedScanner getStringScanner() {
		return fStringScanner;
	}

	/**
	 * Returns the Fantom comment scanner for this configuration.
	 * 
	 * @return the Fantom comment scanner
	 */
	protected RuleBasedScanner getSingleLineCommentScanner() {
		return fSingleLineCommentScanner;
	}

	/**
	 * Returns the Fantom interpreter string scanner for this configuration.
	 * 
	 * @return the Fantom interpreter string scanner
	 */
	protected RuleBasedScanner getInterpreterStringScanner() {
		return fInterpreterStringScanner;
	}

	/**
	 * Returns the Fantom comment scanner for this configuration.
	 * 
	 * @return the Fantom comment scanner
	 */
	protected RuleBasedScanner getMultiLineCommentScanner() {
		return fMultiLineCommentScanner;
	}

	/**
	 * Returns the Fantom documentation scanner for this configuration.
	 * 
	 * @return the Fantom docummentation scanner
	 */
	protected RuleBasedScanner getDocScanner() {
		return fDocScanner;
	}
	
	/**
	 * Returns the Fantom dsl scanner for this configuration.
	 * 
	 * @return the Fantom dsl scanner
	 */
	protected RuleBasedScanner getDslScanner() {
		return fDslScanner;
	}

	@Override
	public IPresentationReconciler getPresentationReconciler(
			ISourceViewer sourceViewer) {
		PresentationReconciler reconciler = new ScriptPresentationReconciler();
		reconciler
				.setDocumentPartitioning(getConfiguredDocumentPartitioning(sourceViewer));

		DefaultDamagerRepairer dr = new DefaultDamagerRepairer(
				this.fCodeScanner);
		reconciler.setDamager(dr, IDocument.DEFAULT_CONTENT_TYPE);
		reconciler.setRepairer(dr, IDocument.DEFAULT_CONTENT_TYPE);

		dr = new DefaultDamagerRepairer(getStringScanner());
		reconciler.setDamager(dr, IFanPartitions.FAN_STRING);
		reconciler.setRepairer(dr, IFanPartitions.FAN_STRING);

		dr = new DefaultDamagerRepairer(getSingleLineCommentScanner());
		reconciler.setDamager(dr, IFanPartitions.FAN_SINGLE_LINE_COMMENT);
		reconciler.setRepairer(dr, IFanPartitions.FAN_SINGLE_LINE_COMMENT);

		dr = new DefaultDamagerRepairer(getInterpreterStringScanner());
		reconciler.setDamager(dr, IFanPartitions.FAN_INTERPRETER_STRING);
		reconciler.setRepairer(dr, IFanPartitions.FAN_INTERPRETER_STRING);

		dr = new DefaultDamagerRepairer(getMultiLineCommentScanner());
		reconciler.setDamager(dr, IFanPartitions.FAN_MULTI_LINE_COMMENT);
		reconciler.setRepairer(dr, IFanPartitions.FAN_MULTI_LINE_COMMENT);

		dr = new DefaultDamagerRepairer(getDocScanner());
		reconciler.setDamager(dr, IFanPartitions.FAN_DOC);
		reconciler.setRepairer(dr, IFanPartitions.FAN_DOC);

		dr = new DefaultDamagerRepairer(getDslScanner()); //this.fCodeScanner);
		reconciler.setDamager(dr, IFanPartitions.FAN_DSL);
		reconciler.setRepairer(dr, IFanPartitions.FAN_DSL);

		return reconciler;
	}

	/**
	 * Adapts the behavior of the contained components to the change encoded in
	 * the given event.
	 * <p>
	 * Clients are not allowed to call this method if the old setup with text
	 * tools is in use.
	 * </p>
	 * 
	 * @param event
	 *            the event to which to adapt
	 * @see FanSourceViewerConfiguration#ScriptSourceViewerConfiguration(IColorManager,
	 *      IPreferenceStore, ITextEditor, String)
	 */
	@Override
	public void handlePropertyChangeEvent(PropertyChangeEvent event) {
		Assert.isTrue(isNewSetup());
		if (fCodeScanner.affectsBehavior(event))
			fCodeScanner.adaptToPreferenceChange(event);
		if (fStringScanner.affectsBehavior(event))
			fStringScanner.adaptToPreferenceChange(event);
		if (fSingleLineCommentScanner.affectsBehavior(event))
			fSingleLineCommentScanner.adaptToPreferenceChange(event);
		if (fInterpreterStringScanner.affectsBehavior(event))
			fInterpreterStringScanner.adaptToPreferenceChange(event);
		if (fMultiLineCommentScanner.affectsBehavior(event))
			fMultiLineCommentScanner.adaptToPreferenceChange(event);
		if (fDocScanner.affectsBehavior(event))
			fDocScanner.adaptToPreferenceChange(event);
	}

	/**
	 * Determines whether the preference change encoded by the given event
	 * changes the behavior of one of its contained components.
	 * 
	 * @param event
	 *            the event to be investigated
	 * @return <code>true</code> if event causes a behavioral change
	 * 
	 */
	@Override
	public boolean affectsTextPresentation(PropertyChangeEvent event) {
		return fCodeScanner.affectsBehavior(event)
				|| fStringScanner.affectsBehavior(event)
				|| fSingleLineCommentScanner.affectsBehavior(event)
				|| fMultiLineCommentScanner.affectsBehavior(event)
				|| fDocScanner.affectsBehavior(event)
				|| fInterpreterStringScanner.affectsBehavior(event);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.eclipse.jface.text.source.SourceViewerConfiguration#getAutoEditStrategies
	 * (org.eclipse.jface.text.source.ISourceViewer, java.lang.String)
	 */
	@Override
	public IAutoEditStrategy[] getAutoEditStrategies(
			ISourceViewer sourceViewer, String contentType) {
		// TODO: check contentType. think, do we really need it? :)
		String partitioning = getConfiguredDocumentPartitioning(sourceViewer);
		if (IFanPartitions.FAN_DOC.equals(contentType)
				|| IFanPartitions.FAN_MULTI_LINE_COMMENT.equals(contentType))
			return new IAutoEditStrategy[] { new FanDocAutoIndentStrategy(
					partitioning) };

		return new IAutoEditStrategy[] { new FanAutoEditStrategy(
				fPreferenceStore, partitioning) };
	}

	@Override
	protected void initializeQuickOutlineContexts(
			InformationPresenter presenter, IInformationProvider provider) {
		presenter.setInformationProvider(provider,
				IFanPartitions.FAN_MULTI_LINE_COMMENT);
		presenter.setInformationProvider(provider,
				IFanPartitions.FAN_SINGLE_LINE_COMMENT);
		presenter.setInformationProvider(provider,
				IFanPartitions.FAN_INTERPRETER_STRING);
		presenter.setInformationProvider(provider, IFanPartitions.FAN_DOC);
		presenter.setInformationProvider(provider, IFanPartitions.FAN_DSL);
		presenter.setInformationProvider(provider, IFanPartitions.FAN_STRING);
	}

	@Override
	protected ContentAssistPreference getContentAssistPreference() {
		try {
			return (ContentAssistPreference) FantomVM
					.create("f4uiText::FanContentAssistPreference");
		} catch (FantomException e) {
			FanCore.log(e);
			return null;
		}
	}

	@Override
	protected void alterContentAssistant(ContentAssistant assistant) {
		ScriptCompletionProcessor processor = (ScriptCompletionProcessor) FantomVM
				.makeObject("f4uiText::FanCompletionProcessor", getEditor(),
						assistant, IDocument.DEFAULT_CONTENT_TYPE);
		assistant.setContentAssistProcessor(processor,
				IDocument.DEFAULT_CONTENT_TYPE);
	}

	@Override
	public ITextDoubleClickStrategy getDoubleClickStrategy(
			ISourceViewer sourceViewer, String contentType) {
		return new FanDoubleClickStrategy();
	}
}
