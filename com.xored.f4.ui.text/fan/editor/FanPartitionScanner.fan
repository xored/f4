using [java] org.eclipse.jface.text.rules::EndOfLineRule
using [java] org.eclipse.jface.text.rules::IPredicateRule
using [java] org.eclipse.jface.text.rules::IToken
using [java] org.eclipse.jface.text.rules::MultiLineRule
using [java] org.eclipse.jface.text.rules::RuleBasedPartitionScanner
using [java] org.eclipse.jface.text.rules::SingleLineRule
using [java] org.eclipse.jface.text.rules::Token

public class FanPartitionScanner : RuleBasedPartitionScanner
{

  /**
   * Creates the partitioner and sets up the appropriate rules.
   */
  new make() {
    string := Token(IFanPartitions.string)
    multiLineComment := Token(IFanPartitions.multiLineComment)
    singleLineComment := Token(IFanPartitions.singleLineComment)
    interpreterString := Token(IFanPartitions.interpreterString)

    doc := Token(IFanPartitions.fandoc)
    dsl := Token(IFanPartitions.dsl)

    rules := [
    EndOfLineRule("//", singleLineComment),
    EndOfLineRule("**", doc),
    MultiLineRule("/*", "*/", multiLineComment, '\\', true),
    MultiLineRule("\"\"\"", "\"\"\"", string),
    MultiLineRule("\"", "\"", string, '\\'),
    SingleLineRule("`", "`", string, '\\'),
    SingleLineRule("'", "'", string, '\\'),
    MultiLineRule("<|", "|>", dsl),
    FanInterpreterStringRule(interpreterString)]

    setPredicateRules((IPredicateRule[])rules);
  }

  Int getOffset() {
    return fOffset;
  }
}
