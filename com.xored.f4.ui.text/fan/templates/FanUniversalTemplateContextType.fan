using [java] org.eclipse.jface.text::IDocument
using [java] org.eclipse.dltk.core::ISourceModule
using [java] org.eclipse.dltk.ui.templates::ScriptTemplateContext
using [java] com.xored.f4.ui.text::ScriptTemplateContextTypeBridge

class FanUniversalTemplateContextType : ScriptTemplateContextTypeBridge
{
  static const Str contextTypeId := "FanUniversalTemplateContextType"
  /*
  public FanUniversalTemplateContextType() {
    // empty constructor
  }
  
  public FanUniversalTemplateContextType(String id, String name) {
    super(id, name);
  }

  public FanUniversalTemplateContextType(String id) {
    super(id);
  }*/

  override ScriptTemplateContext? createCtx(IDocument? document,
      Int completionPosition, Int length, ISourceModule? sourceModule)
  {
    return FanTemplateContext(this, document, completionPosition, length, sourceModule)
  }

}
