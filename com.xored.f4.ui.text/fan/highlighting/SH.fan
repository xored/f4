using [java] org.eclipse.dltk.ui.editor.highlighting::SemanticHighlighting

final class SH : SemanticHighlighting
{

  new make(Str editorXmlTagNameColor, Str desc)
  {
    getPreferenceKey = editorXmlTagNameColor
    getDisplayName = desc
  }

  override const Str? getDisplayName   // never null actually
  override const Str? getPreferenceKey // same here
  override const Bool isSemanticOnly := true
  override const Str? getBackgroundPreferenceKey := null

  override Int hash() { getPreferenceKey.hash*31 + 1345456 }
  override Bool equals(Obj? obj) { getPreferenceKey == (obj as SH)?.getPreferenceKey }
}