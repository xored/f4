using [java] org.eclipse.jface.preference::IPreferenceStore
using [java] org.eclipse.dltk.compiler.task::ITodoTaskPreferences
using [java] org.eclipse.dltk.ui.text::IColorManager
using [java] org.eclipse.dltk.ui.text::ScriptCommentScanner

class FanSingleLineCommentScanner : ScriptCommentScanner
{
  new make(IColorManager manager, IPreferenceStore store, Str comment, Str todoTag,
      ITodoTaskPreferences preferences)
    : super(manager, store, comment, todoTag, preferences) { }
    
  protected override Int skipCommentChars()
  {
    c := read
    while (c.isSpace) c = read
    c2 := read
    if (c == c2 && (c == '/' || c == '*'))
      return 2;
    else
    {
      unread
      unread
      return 0
    }
  }
}
