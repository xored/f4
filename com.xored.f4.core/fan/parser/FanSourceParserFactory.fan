using [java]org.eclipse.dltk.ast.parser::ISourceParser
using [java]org.eclipse.dltk.ast.parser::ISourceParserFactory

/**
 * Returns instances of the Fan source parser
 */
class FanSourceParserFactory : ISourceParserFactory
{
  override ISourceParser? createSourceParser() {
    return FanSourceParser()
  }
}
