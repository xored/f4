using [java] org.eclipse.ui.texteditor::ITextEditor
using [java] org.eclipse.jface.preference::IPreferenceStore
using [java] org.eclipse.jface.text::IAutoEditStrategy
using [java] org.eclipse.jface.text::IDocument
using [java] org.eclipse.jface.text::ITextDoubleClickStrategy
using [java] org.eclipse.jface.text.contentassist::ContentAssistant
using [java] org.eclipse.jface.text.information::IInformationProvider
using [java] org.eclipse.jface.text.information::InformationPresenter
using [java] org.eclipse.jface.text.presentation::IPresentationReconciler
using [java] org.eclipse.jface.text.rules::DefaultDamagerRepairer
using [java] org.eclipse.jface.text.rules::RuleBasedScanner
using [java] org.eclipse.jface.text.source::ISourceViewer
using [java] org.eclipse.jface.util::PropertyChangeEvent
using [java] org.eclipse.dltk.ui.text::AbstractScriptScanner
using [java] org.eclipse.dltk.ui.text::IColorManager
using [java] org.eclipse.dltk.ui.text::ScriptMultilineCommentScanner
using [java] org.eclipse.dltk.ui.text::ScriptSourceViewerConfiguration
using [java] org.eclipse.dltk.ui.text::ScriptPresentationReconciler
using [java] org.eclipse.dltk.ui.text::TodoTaskPreferencesOnPreferenceStore
using [java] org.eclipse.dltk.ui.text.completion::ContentAssistPreference

class FanSourceViewerConfiguration : ScriptSourceViewerConfiguration
{
  new make(IColorManager colorManager, IPreferenceStore preferenceStore,
    ITextEditor? editor, Str partitioning)
  : super(colorManager, preferenceStore, editor, partitioning) { }

  override Str?[]? getConfiguredContentTypes(ISourceViewer? sourceViewer) { IFanPartitions.partitionTypes }

  override const Str? getCommentPrefix := "//"
  
  private AbstractScriptScanner? codeScanner
  private AbstractScriptScanner? stringScanner
  private AbstractScriptScanner? dslScanner
  private AbstractScriptScanner? interpreterStringScanner
  private AbstractScriptScanner? singleLineCommentScanner
  private AbstractScriptScanner? multiLineCommentScanner
  private AbstractScriptScanner? docScanner

  override Void initializeScanners()
  {
    codeScanner = FanCodeScanner(getColorManager, fPreferenceStore)
    stringScanner = FanStringScanner(getColorManager, fPreferenceStore)
    dslScanner = FanDslScanner(getColorManager, fPreferenceStore)
    interpreterStringScanner = FanInterpreterStringScanner(getColorManager, fPreferenceStore)

    singleLineCommentScanner = FanSingleLineCommentScanner(getColorManager, fPreferenceStore,
        FanColorConstants.singleLineComment, FanColorConstants.todoTag,
        TodoTaskPreferencesOnPreferenceStore(fPreferenceStore))

    multiLineCommentScanner = ScriptMultilineCommentScanner(
        getColorManager, fPreferenceStore,
        FanColorConstants.multiLineComment,
        FanColorConstants.todoTag,
        TodoTaskPreferencesOnPreferenceStore(fPreferenceStore), true)

    docScanner = FanSingleLineCommentScanner(getColorManager(),
        fPreferenceStore, FanColorConstants.fandoc,
        FanColorConstants.todoTag,
        TodoTaskPreferencesOnPreferenceStore(fPreferenceStore))
  }

  override IPresentationReconciler? getPresentationReconciler(
      ISourceViewer? sourceViewer)
  {
    reconciler := ScriptPresentationReconciler()
    reconciler.setDocumentPartitioning(getConfiguredDocumentPartitioning(sourceViewer))

    dr := DefaultDamagerRepairer(codeScanner)
    reconciler.setDamager(dr, IDocument.DEFAULT_CONTENT_TYPE)
    reconciler.setRepairer(dr, IDocument.DEFAULT_CONTENT_TYPE)

    dr = DefaultDamagerRepairer(stringScanner)
    reconciler.setDamager(dr, IFanPartitions.string)
    reconciler.setRepairer(dr, IFanPartitions.string)

    dr = DefaultDamagerRepairer(singleLineCommentScanner)
    reconciler.setDamager(dr, IFanPartitions.singleLineComment)
    reconciler.setRepairer(dr, IFanPartitions.singleLineComment)

    dr = DefaultDamagerRepairer(interpreterStringScanner)
    reconciler.setDamager(dr, IFanPartitions.interpreterString)
    reconciler.setRepairer(dr, IFanPartitions.interpreterString)

    dr = DefaultDamagerRepairer(multiLineCommentScanner)
    reconciler.setDamager(dr, IFanPartitions.multiLineComment)
    reconciler.setRepairer(dr, IFanPartitions.multiLineComment)

    dr = DefaultDamagerRepairer(docScanner)
    reconciler.setDamager(dr, IFanPartitions.fandoc)
    reconciler.setRepairer(dr, IFanPartitions.fandoc)

    dr = DefaultDamagerRepairer(dslScanner)
    reconciler.setDamager(dr, IFanPartitions.dsl)
    reconciler.setRepairer(dr, IFanPartitions.dsl)

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
  override Void handlePropertyChangeEvent(PropertyChangeEvent? event)
  {
    if (codeScanner.affectsBehavior(event))
      codeScanner.adaptToPreferenceChange(event)
    if (stringScanner.affectsBehavior(event))
      stringScanner.adaptToPreferenceChange(event)
    if (singleLineCommentScanner.affectsBehavior(event))
      singleLineCommentScanner.adaptToPreferenceChange(event)
    if (interpreterStringScanner.affectsBehavior(event))
      interpreterStringScanner.adaptToPreferenceChange(event)
    if (multiLineCommentScanner.affectsBehavior(event))
      multiLineCommentScanner.adaptToPreferenceChange(event)
    if (docScanner.affectsBehavior(event))
      docScanner.adaptToPreferenceChange(event)
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
  override Bool affectsTextPresentation(PropertyChangeEvent? event)
  {
    return codeScanner.affectsBehavior(event)
        || stringScanner.affectsBehavior(event)
        || singleLineCommentScanner.affectsBehavior(event)
        || multiLineCommentScanner.affectsBehavior(event)
        || docScanner.affectsBehavior(event)
        || interpreterStringScanner.affectsBehavior(event)
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * org.eclipse.jface.text.source.SourceViewerConfiguration#getAutoEditStrategies
   * (org.eclipse.jface.text.source.ISourceViewer, java.lang.String)
   */
  override IAutoEditStrategy?[]? getAutoEditStrategies(
    ISourceViewer? sourceViewer, Str? contentType)
  {
    // TODO: check contentType. think, do we really need it? :)
    partitioning := getConfiguredDocumentPartitioning(sourceViewer);
    if (IFanPartitions.fandoc.equals(contentType)
        || IFanPartitions.multiLineComment.equals(contentType))
      return [FanDocAutoIndentStrategy(partitioning)]

    return [FanAutoEditStrategy(fPreferenceStore, partitioning)]
  }

  protected override Void initializeQuickOutlineContexts(
      InformationPresenter? presenter, IInformationProvider? provider)
  {
    presenter.setInformationProvider(provider, IFanPartitions.multiLineComment)
    presenter.setInformationProvider(provider, IFanPartitions.singleLineComment)
    presenter.setInformationProvider(provider, IFanPartitions.interpreterString)
    presenter.setInformationProvider(provider, IFanPartitions.fandoc)
    presenter.setInformationProvider(provider, IFanPartitions.dsl)
    presenter.setInformationProvider(provider, IFanPartitions.string)
  }

  protected override ContentAssistPreference? getContentAssistPreference()
  {
    FanContentAssistPreference()
  }

  protected override Void alterContentAssistant(ContentAssistant? assistant) {
    processor := FanCompletionProcessor(getEditor, assistant, IDocument.DEFAULT_CONTENT_TYPE)
    assistant.setContentAssistProcessor(processor, IDocument.DEFAULT_CONTENT_TYPE)
 
    strProcessor := FanCompletionProcessor(getEditor, assistant, IFanPartitions.string)
    assistant.setContentAssistProcessor(processor, IFanPartitions.string)
  }

  override ITextDoubleClickStrategy? getDoubleClickStrategy(
      ISourceViewer? sourceViewer, Str? contentType) { FanDoubleClickStrategy() }
}
