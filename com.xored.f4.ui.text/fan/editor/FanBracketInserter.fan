using [java] org.eclipse.swt.events::VerifyEvent
using [java] org.eclipse.ui.texteditor::ITextEditorExtension3
using [java] org.eclipse.jface.util::IPropertyChangeListener
using [java] org.eclipse.jface.util::PropertyChangeEvent
using [java] org.eclipse.dltk.ui::PreferenceConstants
using "[java]org.eclipse.dltk.internal.ui.editor"::BracketInserter
using "[java]org.eclipse.dltk.internal.ui.editor"::ScriptEditor
using [java] com.xored.fanide.core::FanConstants

class FanBracketInserter : BracketInserter, IPropertyChangeListener
{
  new make(ScriptEditor editor) : super(editor) { }

  override Void verifyKey(VerifyEvent? event)
  {
    if (!event.doit || editor.getInsertMode != ITextEditorExtension3.SMART_INSERT) return
    switch (event.character)
    {
    case '(':
    case '[':
    case '\'':
    case '\"':
      if (true) { }
    default:
      return
    }

    sourceViewer := editor.getScriptSourceViewer
    document := sourceViewer.getDocument

    selection := sourceViewer.getSelectedRange
    offset := selection.x
    length := selection.y

    //try {
      startLine := document.getLineInformationOfOffset(offset)
      endLine := document.getLineInformationOfOffset(offset + length)

      scanner := FanHeuristicScanner(document)
      nextToken := scanner.nextToken(offset + length, endLine.getOffset
          + endLine.getLength)
      next := nextToken == Symbol.eof ? null : document.get(
          offset, scanner.pos - offset).trim
      prevToken := scanner.previousToken(offset - 1, startLine
          .getOffset())
      prevTokenOffset := scanner.pos
      if (prevTokenOffset < 0) prevTokenOffset = 0
      previous := offset > 1 && prevToken == Symbol.eof ? null
          : document.get(prevTokenOffset, offset - prevTokenOffset)
              .trim
      switch (event.character)
      {
      case '(':
        if (!fCloseBrackets || nextToken == Symbol.lparen
            || nextToken == Symbol.identifier
            || next != null && next.size > 1)
          return
      case '[':
        if (!fCloseBrackets || nextToken == Symbol.identifier
            || next != null && next.size > 1)
          return
      case '\'':
      case '"':
        if (!fCloseStrings
            || nextToken == Symbol.identifier
            || next != null
            && next.size > 1
            || previous != null
            && (previous.size > 1 && previous[0] == event.character))
          return
      default:
        return
      }

      correctedOffset := (document.getLength > 0 &&
        document.getLength == offset) ? offset - 1 : offset
      if (!validatePartitioning(document, correctedOffset,
          FanConstants.FAN_PARTITIONING, Str?[,])) {
        return;
      }

      if (!editor.validateEditorInputState()) return

      insertBrackets(document, offset, length, event.character,
          getPeerCharacter(event.character))

      event.doit = false
    //} catch (BadLocationException e) {
    //  DLTKUIPlugin.log(e);
    //} catch (BadPositionCategoryException e) {
    //  DLTKUIPlugin.log(e);
    //}
  }

  override Void propertyChange(PropertyChangeEvent? event)
  {
    if (event.getProperty == PreferenceConstants.EDITOR_CLOSE_BRACKETS)
      setCloseBracketsEnabled(event.getNewValue)
    if (event.getProperty == PreferenceConstants.EDITOR_CLOSE_STRINGS)
      setCloseStringsEnabled(event.getNewValue)
  }
}
