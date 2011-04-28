/*
import org.eclipse.jface.text.rules.IRule;
import org.eclipse.jface.text.rules.IToken;*/

using [java] fanx.interop
using [java] org.eclipse.jface.preference::IPreferenceStore
using [java] org.eclipse.jface.text.rules::EndOfLineRule
using [java] org.eclipse.jface.text.rules::MultiLineRule
using [java] org.eclipse.jface.text.rules::WhitespaceRule
using [java] org.eclipse.dltk.ui.text::AbstractScriptScanner
using [java] org.eclipse.dltk.ui.text::IColorManager
using [java] org.eclipse.dltk.ui.text.rules::ScriptWordRule
using [java] java.util::ArrayList
using [java] java.util::List as JList

class FanCodeScanner : AbstractScriptScanner
{
  //private static String[] fgKeywords = 
  //private static String fgReturnKeyword = FanKeywordProvider.KEYWORD_RETURN;
  private static const Str[] tokenProperties := [
      FanColorConstants.fandoc, FanColorConstants.dsl,
      FanColorConstants.multiLineComment,
      FanColorConstants.singleLineComment,
      FanColorConstants.defaultCode, FanColorConstants.keyword,
      FanColorConstants.keywordReturn, FanColorConstants.number,
      FanColorConstants.classDefinition,
      FanColorConstants.functionDefinition,
      FanColorConstants.decorator ]

  new make(IColorManager manager, IPreferenceStore store) : super(manager, store) { initialize }

  protected override Str?[]? getTokenProperties() { tokenProperties }

  protected override JList? createRules() {
    other := getToken(FanColorConstants.defaultCode)
    keyword := getToken(FanColorConstants.keyword)
    wordRule := ScriptWordRule(FanWordDetector(), other)
    wordRule.addNextTokenAfterSeen("class", getToken(FanColorConstants.classDefinition))
    FanKeywordProvider.keywords.each { wordRule.addWord(it, keyword) }
    wordRule.addWord(FanKeywordProvider.returnKeyword, getToken(FanColorConstants.keywordReturn))
    setDefaultReturnToken(other)
    rules := ArrayList()
    rules.add(MultiLineRule("/*", "*/", getToken(FanColorConstants.multiLineComment)))
    rules.add(EndOfLineRule("//", getToken(FanColorConstants.singleLineComment)))
    rules.add(EndOfLineRule("**", getToken(FanColorConstants.fandoc)))
    rules.add(MultiLineRule("<|", "|>", getToken(FanColorConstants.dsl)))
    rules.add(WhitespaceRule(|Int a->Bool|{ a.isSpace }))
    rules.add(FanUsingRule(other))
    rules.add(wordRule)
    rules.add(FanFloatNumberRule(getToken(FanColorConstants.number)))
    return rules
  }
}
