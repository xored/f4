using [java]org.eclipse.dltk.ast.parser::IModuleDeclaration

using f4parser

class DltkAst : IModuleDeclaration
{  
  const CUnit unit
  
  new make(CUnit unit)
  {
    this.unit = unit  
  }
}
