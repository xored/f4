package com.xored.fanide.internal.ui.text;

import java.util.Iterator;

import org.eclipse.dltk.internal.ui.text.ScriptWordFinder;
import org.eclipse.dltk.ui.PreferenceConstants;
import org.eclipse.dltk.ui.text.IColorManager;
import org.eclipse.dltk.ui.text.ScriptTextTools;
import org.eclipse.dltk.ui.text.templates.TemplateVariableProcessor;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.jface.preference.PreferenceConverter;
import org.eclipse.jface.text.BadLocationException;
import org.eclipse.jface.text.DefaultInformationControl;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.IInformationControl;
import org.eclipse.jface.text.IInformationControlCreator;
import org.eclipse.jface.text.IRegion;
import org.eclipse.jface.text.ITextHover;
import org.eclipse.jface.text.ITextViewer;
import org.eclipse.jface.text.contentassist.ContentAssistant;
import org.eclipse.jface.text.contentassist.IContentAssistant;
import org.eclipse.jface.text.source.ISourceViewer;
import org.eclipse.jface.text.templates.TemplateContextType;
import org.eclipse.jface.text.templates.TemplateVariableResolver;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.RGB;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.ui.texteditor.ITextEditor;

import com.xored.fanide.internal.ui.FanUI;
import com.xored.fanide.ui.FanPreferenceConstants;

@SuppressWarnings("restriction")
public class FanCodeTemplateSourceViewerConfiguration extends
		SimpleFanSourceViewerConfiguration {

	public FanCodeTemplateSourceViewerConfiguration(IColorManager colorManager,
			IPreferenceStore preferenceStore, ITextEditor editor,
			String partitioning, boolean configureFormatter,
			TemplateVariableProcessor processor) {

		super(colorManager, preferenceStore, editor, partitioning,
				configureFormatter);
		this.fProcessor = processor;
	}

	private static class TemplateVariableTextHover implements ITextHover {

		private TemplateVariableProcessor fProcessor;

		/**
		 * @param processor
		 *            the template variable processor
		 */
		public TemplateVariableTextHover(TemplateVariableProcessor processor) {
			fProcessor = processor;
		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see
		 * org.eclipse.jface.text.ITextHover#getHoverInfo(org.eclipse.jface.
		 * text.ITextViewer, org.eclipse.jface.text.IRegion)
		 */
		public String getHoverInfo(ITextViewer textViewer, IRegion subject) {
			try {
				IDocument doc = textViewer.getDocument();
				int offset = subject.getOffset();
				if (offset >= 2 && "${".equals(doc.get(offset - 2, 2))) { //$NON-NLS-1$
					String varName = doc.get(offset, subject.getLength());
					TemplateContextType contextType = fProcessor
							.getContextType();
					if (contextType != null) {
						Iterator<?> iter = contextType.resolvers();
						while (iter.hasNext()) {
							TemplateVariableResolver var = (TemplateVariableResolver) iter
									.next();
							if (varName.equals(var.getType())) {
								return var.getDescription();
							}
						}
					}
				}
			} catch (BadLocationException e) {
			}
			return null;
		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see
		 * org.eclipse.jface.text.ITextHover#getHoverRegion(org.eclipse.jface
		 * .text.ITextViewer, int)
		 */
		public IRegion getHoverRegion(ITextViewer textViewer, int offset) {
			if (textViewer != null) {
				return ScriptWordFinder.findWord(textViewer.getDocument(),
						offset);
			}
			return null;
		}

	}

	private final TemplateVariableProcessor fProcessor;

	/*
	 * @see SourceViewerConfiguration#getContentAssistant(ISourceViewer)
	 */
	@Override
	public IContentAssistant getContentAssistant(ISourceViewer sourceViewer) {

		IPreferenceStore store = FanUI.getDefault().getPreferenceStore();

		ScriptTextTools textTools = FanUI.getDefault().getTextTools();
		IColorManager manager = textTools.getColorManager();

		ContentAssistant assistant = new ContentAssistant();
		assistant.setContentAssistProcessor(fProcessor,
				IDocument.DEFAULT_CONTENT_TYPE);
		// Register the same processor for strings and single line comments to
		// get code completion at the start of those partitions.
		assistant.setContentAssistProcessor(fProcessor, IFanPartitions.FAN_DOC);
		assistant.setContentAssistProcessor(fProcessor,
				IFanPartitions.FAN_STRING);
		assistant.setContentAssistProcessor(fProcessor,
				IFanPartitions.FAN_SINGLE_LINE_COMMENT);
		assistant.setContentAssistProcessor(fProcessor,
				IFanPartitions.FAN_MULTI_LINE_COMMENT);
		assistant.setContentAssistProcessor(fProcessor,
				IFanPartitions.FAN_STRING);

		assistant.enableAutoInsert(store
				.getBoolean(FanPreferenceConstants.CODEASSIST_AUTOINSERT));
		assistant.enableAutoActivation(store
				.getBoolean(FanPreferenceConstants.CODEASSIST_AUTOACTIVATION));
		assistant
				.setAutoActivationDelay(store
						.getInt(FanPreferenceConstants.CODEASSIST_AUTOACTIVATION_DELAY));
		assistant
				.setProposalPopupOrientation(IContentAssistant.PROPOSAL_OVERLAY);
		assistant
				.setContextInformationPopupOrientation(IContentAssistant.CONTEXT_INFO_ABOVE);
		assistant
				.setInformationControlCreator(new IInformationControlCreator() {
					public IInformationControl createInformationControl(
							Shell parent) {
						return new DefaultInformationControl(parent);
					}
				});

		Color background = getColor(store,
				PreferenceConstants.CODEASSIST_PARAMETERS_BACKGROUND, manager);
		assistant.setContextInformationPopupBackground(background);
		assistant.setContextSelectorBackground(background);

		Color foreground = getColor(store,
				PreferenceConstants.CODEASSIST_PARAMETERS_FOREGROUND, manager);
		assistant.setContextInformationPopupForeground(foreground);
		assistant.setContextSelectorForeground(foreground);

		return assistant;
	}

	private Color getColor(IPreferenceStore store, String key,
			IColorManager manager) {
		RGB rgb = PreferenceConverter.getColor(store, key);
		return manager.getColor(rgb);
	}

	/*
	 * @see SourceViewerConfiguration#getTextHover(ISourceViewer, String, int)
	 * 
	 * @since 2.1
	 */
	@Override
	public ITextHover getTextHover(ISourceViewer sourceViewer,
			String contentType, int stateMask) {
		return new TemplateVariableTextHover(fProcessor);
	}

}
