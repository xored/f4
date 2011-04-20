using [java]org.eclipse.dltk.ast.parser::IModuleDeclaration
using [java]org.eclipse.dltk.ast.parser::AbstractSourceParser
using [java]org.eclipse.dltk.compiler.env::IModuleSource
using [java]org.eclipse.dltk.core::IScriptProject
using [java]org.eclipse.dltk.compiler.problem::IProblemReporter

using f4parser

public class FanSourceParser : AbstractSourceParser
{
  /**
   * Parses selected context to module declaration using Fan parser.
   */
  override IModuleDeclaration? parse(IModuleSource? input, IProblemReporter? reporter)
  {
    ns := ParseUtil.ns(input.getModelElement)
    collector := DltkProblemCollector(reporter)
    return DltkAst(Parser(input.getSourceContents,ns,null,collector).cunit)
  }
}
