package com.xored.fanide.internal.ui.text;

import org.eclipse.dltk.internal.ui.editor.BracketInserter;
import org.eclipse.dltk.internal.ui.editor.ScriptEditor;
import org.eclipse.dltk.ui.DLTKUIPlugin;
import org.eclipse.dltk.ui.PreferenceConstants;
import org.eclipse.jface.text.BadLocationException;
import org.eclipse.jface.text.BadPositionCategoryException;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.IRegion;
import org.eclipse.jface.text.source.ISourceViewer;
import org.eclipse.jface.util.IPropertyChangeListener;
import org.eclipse.jface.util.PropertyChangeEvent;
import org.eclipse.swt.events.VerifyEvent;
import org.eclipse.swt.graphics.Point;
import org.eclipse.ui.texteditor.ITextEditorExtension3;

import com.xored.fanide.core.FanConstants;

public class FanBracketInserter extends BracketInserter implements
		IPropertyChangeListener {

	public FanBracketInserter(ScriptEditor editor) {
		super(editor);
	}

	public void verifyKey(VerifyEvent event) {
		if (!event.doit
				|| editor.getInsertMode() != ITextEditorExtension3.SMART_INSERT)
			return;
		switch (event.character) {
		case '(':
		case '[':
		case '\'':
		case '\"':
			break;
		default:
			return;
		}

		final ISourceViewer sourceViewer = this.editor.getScriptSourceViewer();
		IDocument document = sourceViewer.getDocument();

		final Point selection = sourceViewer.getSelectedRange();
		final int offset = selection.x;
		final int length = selection.y;

		try {
			IRegion startLine = document.getLineInformationOfOffset(offset);
			IRegion endLine = document.getLineInformationOfOffset(offset
					+ length);

			FanHeuristicScanner scanner = new FanHeuristicScanner(document);
			int nextToken = scanner.nextToken(offset + length, endLine
					.getOffset()
					+ endLine.getLength());
			String next = nextToken == ISymbols.TokenEOF ? null : document.get(
					offset, scanner.getPosition() - offset).trim();
			int prevToken = scanner.previousToken(offset - 1, startLine
					.getOffset());
			int prevTokenOffset = scanner.getPosition();
			if (prevTokenOffset < 0)
				prevTokenOffset = 0;
			String previous = offset > 1 && prevToken == ISymbols.TokenEOF ? null
					: document.get(prevTokenOffset, offset - prevTokenOffset)
							.trim();
			switch (event.character) {
			case '(':
				if (!fCloseBrackets || nextToken == ISymbols.TokenLPAREN
						|| nextToken == ISymbols.TokenIDENTIFIER
						|| next != null && next.length() > 1)
					return;
				break;

			case '[':
				if (!fCloseBrackets || nextToken == ISymbols.TokenIDENTIFIER
						|| next != null && next.length() > 1)
					return;
				break;

			case '\'':
			case '"':
				if (!fCloseStrings
						|| nextToken == ISymbols.TokenIDENTIFIER
						|| next != null
						&& next.length() > 1
						|| previous != null
						&& (previous.length() > 1 && previous.charAt(0) == event.character))
					return;
				break;

			default:
				return;
			}

			int correctedOffset = (document.getLength() > 0 && document
					.getLength() == offset) ? offset - 1 : offset;
			if (!validatePartitioning(document, correctedOffset,
					FanConstants.FAN_PARTITIONING)) {
				return;
			}

			if (!this.editor.validateEditorInputState())
				return;

			insertBrackets(document, offset, length, event.character,
					getPeerCharacter(event.character));

			event.doit = false;

		} catch (BadLocationException e) {
			DLTKUIPlugin.log(e);
		} catch (BadPositionCategoryException e) {
			DLTKUIPlugin.log(e);
		}

	}

	public void propertyChange(PropertyChangeEvent event) {
		if (event.getProperty().equals(
				PreferenceConstants.EDITOR_CLOSE_BRACKETS))
			setCloseBracketsEnabled((Boolean) event.getNewValue());
		if (event.getProperty()
				.equals(PreferenceConstants.EDITOR_CLOSE_STRINGS))
			setCloseStringsEnabled((Boolean) event.getNewValue());

	}
}
