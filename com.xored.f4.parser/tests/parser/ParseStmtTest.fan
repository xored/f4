using f4model

class ParseStmtTest : Test
{
  Void testBlock()
  {
    verifyStmt("{}", |Block b|
      {
        verifyEq(b.stmts.size, 0)
      })
  }
  
  Void testLocalDef()
  {
    verifyStmt("Str var", |ExprStmt stmt|
      {
        Expr e := stmt.expr
        verify(e is LocalDef)
        LocalDef def := e
        verifyEq(def.ctype.resolvedType.qname, "sys::Str")
        verifyEq(def.name.text, "var")
        verifyNull(def.init)
      })
    
    verifyStmt("Int var := 0", |ExprStmt stmt|
      {
        Expr e := stmt.expr
        verify(e is LocalDef)
        LocalDef def := e
        verifyEq(def.ctype.resolvedType.qname, "sys::Int")
        verifyEq(def.name.text, "var")
        verify(def.init is Literal)
      })
    
    verifyStmt("var := 0", |ExprStmt stmt|
      {
        Expr e := stmt.expr
        verify(e is LocalDef)
        LocalDef def := e
        verifyNull(def.ctype)
        verifyEq(def.name.text, "var")
        verify(def.init is Literal)
      })
  }

//////////////////////////////////////////////////////////////////////////
// Utils
//////////////////////////////////////////////////////////////////////////
  IFanPod testPod := FakeFanPod.fake("test")
  IFanNamespace testNs := FakeFanNamespace(testPod)
  
  Void verifyStmt(Str script, |Stmt stmt| check, 
    Method parserMethod := Parser#stmtOrBlock)
  {
    p := Parser(script, testNs)
    Stmt stmt := parserMethod.call(p)
    
    verifyEq(stmt.start, 0)
    verifyEq(stmt.end, script.size-1)
    check.call(stmt)
  }
}