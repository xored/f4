using [java] org.eclipse.dltk.core::IDLTKLanguageToolkit
using [java] org.eclipse.dltk.ui.search::ScriptSearchPage
using [java] com.xored.fanide.core::FanLanguageToolkit

public class FanSearchPage : ScriptSearchPage {

  new make() : super() {
    
  }
  
  override IDLTKLanguageToolkit? getLanguageToolkit() {
    return FanLanguageToolkit.getDefault
  }
}
