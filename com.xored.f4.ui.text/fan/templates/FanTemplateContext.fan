using [java] org.eclipse.jface.text::IDocument
using [java] org.eclipse.jface.text.templates::TemplateContextType
using [java] org.eclipse.dltk.core::ISourceModule
using [java] org.eclipse.dltk.ui.templates::ScriptTemplateContext

class FanTemplateContext : ScriptTemplateContext
{
  new make(TemplateContextType? type, IDocument? document, Int completionOffset,
      Int completionLength, ISourceModule? sourceModule)
    : super(type, document, completionOffset, completionLength, sourceModule) { }
}
