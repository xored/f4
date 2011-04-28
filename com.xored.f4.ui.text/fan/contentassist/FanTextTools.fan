using [java] org.eclipse.ui.texteditor::ITextEditor
using [java] org.eclipse.jface.preference::IPreferenceStore
using [java] org.eclipse.jface.text.rules::IPartitionTokenScanner
using [java] org.eclipse.dltk.ui.editor.highlighting::ISemanticHighlightingUpdater
using [java] org.eclipse.dltk.ui.editor.highlighting::SemanticHighlighting
using [java] org.eclipse.dltk.ui.text::ScriptSourceViewerConfiguration
using [java] org.eclipse.dltk.ui.text::ScriptTextTools
using [java] org.eclipse.dltk.ui.text.templates::TemplateVariableProcessor
using [java] com.xored.f4.ui.text::ScriptTextToolsBridge

class FanTextTools : ScriptTextToolsBridge
{
  private static const Str[] legalContentTypes := [
      IFanPartitions.string, IFanPartitions.multiLineComment,
      IFanPartitions.singleLineComment,
      IFanPartitions.interpreterString, IFanPartitions.fandoc,
      IFanPartitions.dsl ];
  
  private static const Unsafe store := Unsafe(FanTextTools())
  public static FanTextTools instance() { store.val }

  public new make() : super(IFanPartitions.partitioning, legalContentTypes) { }

  override ScriptSourceViewerConfiguration? srcViewerConf(
      IPreferenceStore? preferenceStore, ITextEditor? editor,
      Str? partitioning)
  {
    return FanSourceViewerConfiguration(getColorManager(),
        preferenceStore, editor, partitioning);
  }

  
  /*override ScriptSourceViewerConfiguration createSourceViewerConfiguraton(
      IPreferenceStore preferenceStore, ITextEditor editor,
      TemplateVariableProcessor variableProcessor) {
    return FanCodeTemplateSourceViewerConfiguration(getColorManager(),
        preferenceStore, editor, getDefaultPartitioning(), true,
        variableProcessor);
  }*/

  override IPartitionTokenScanner? getPartitionScanner() { FanPartitionScanner() }

  override SemanticHighlighting?[]? getSemanticHighlightings() {
    (SemanticHighlighting?[])FanSemanticHighlighter().getSemanticHighlightings
  }

  override ISemanticHighlightingUpdater? semanticPosUpdater() {
    return FanSemanticHighlighter()
  }
}

