mixin AstFactory
{  
  CUnit makeCUnit(RuleState s, Comment[] comments)
  {
    return CUnit(s.start, s.end, s.getList("usings"), s.getList("types"), comments)
  }
  
  UsingDef makeUsingDef(RuleState s)
  {
    return UsingDef(s.start, s.end, s.safeGet("ffi"), s.get("pod"), 
      s.safeGet("type"), s.safeGet("as"))
  }
  
  Modifier makeModifier(RuleState s)
  {
    return Modifier(s.start, s.end, s.get("id"))
  }
  
  Modifiers makeModifiers(RuleState s)
  {
    return Modifiers(s.start, s.end, s.getList("modifiers"))
  }
  
  PodRef makePodName(RuleState s)
  {
    nameList := s.getNonEmptyList("pod")
    return PodRef(s.start, s.end, nameList.join("."))
  }
  
  TypeRef makeTypeName(RuleState s)
  {
    nameList := s.getNonEmptyList("name")
    return TypeRef(s.start, s.end, nameList.join)
  }
  
  TypeDef makeTypeDef(RuleState s)
  {
    return TypeDef(s.start, s.end, s.getList("docs"), s.getList("facets"), 
      s.get("modifiers"), s.get("name"), s.getList("inheritance"), s.getList("slots")) 
  }
  
  EnumValDef makeEnumValDef(RuleState s)
  {
    return EnumValDef(s.start, s.end, s.getList("docs"), s.get("name"), s.getList("facets")) 
  }
  
  StaticInit makeStaticInit(RuleState s)
  {
    return StaticInit(s.start, s.end, s.get("block"))
  }

  FieldDef makeFieldDef(RuleState s)
  {
    return FieldDef(s.start, s.end, s.getList("docs"), s.getList("facets"), 
      s.get("modifiers"), s.safeGet("type"), s.get("name"),
      s.safeGet("init"), s.safeGet("getter"), s.safeGet("setter"))
  }
  
  Getter makeGetter(RuleState s)
  {
    return Getter(s.start, s.end, s.get("name"), s.safeGet("block"))
  }
  
  Setter makeSetter(RuleState s)
  {
    return Setter(s.start, s.end, s.get("modifiers"), s.get("name"), s.safeGet("block"))
  }
  
  MethodDef makeMethodDef(RuleState s)
  {
    return MethodDef(s.start, s.end, s.getList("docs"), s.getList("facets"), 
      s.get("modifiers"), s.safeGet("type"), s.get("name"), 
      s.getList("params"), s.safeGet("ctorChain"), s.safeGet("body"))
  }
  
  CtorChain makeCtorChain(RuleState s)
  {
    return CtorChain(s.start, s.end, s.get("target"), s.safeGet("ctor"),s.getList("args"))
  }
  
  FacetDef[] makeFacets(RuleState s) {return s.getList("facets")}
  
  FacetDef makeFacetDef(RuleState s)
  {
    return FacetDef(s.start, s.end, s.get("type"), s.getList("names"), s.getList("vals"))
  }
  
  ParamDef[] makeParams(RuleState s) {return s.getList("params")}
  
  ParamDef makeParamDef(RuleState s)
  {
    return ParamDef(s.start, s.end, s.get("type"), s.get("name"), s.safeGet("init"))
  }
  
  List makeDocList(RuleState s)
  {
    return s.getList("list")
  }
  
  FanDoc makeDoc(RuleState s)
  {
    return FanDoc(s.start, s.end)
  }
  
//////////////////////////////////////////////////////////////////////////
// Statements
//////////////////////////////////////////////////////////////////////////
  
  Block makeBlock(RuleState s)
  {
    return Block(s.start, s.end, s.getList("stmts"))
  }

  IfStmt makeIfStmt(RuleState s)
  {
    return IfStmt(s.start, s.end, s.get("cond"), s.get("trueBlock"), s.safeGet("falseBlock"))
  } 

  ReturnStmt makeReturnStmt(RuleState s)
  {
    return ReturnStmt(s.start, s.end, s.safeGet("expr"))
  } 

  ThrowStmt makeThrowStmt(RuleState s)
  {
    return ThrowStmt(s.start, s.end, s.safeGet("expr"))
  } 

  WhileStmt makeWhileStmt(RuleState s)
  {
    return WhileStmt(s.start, s.end, s.get("cond"), s.get("block"))
  }  

  ForStmt makeForStmt(RuleState s)
  {
    return ForStmt(s.start, s.end, s.safeGet("init"), s.safeGet("cond"), 
      s.safeGet("update"), s.get("block"))
  }

  BreakStmt makeBreakStmt(RuleState s)
  {
    return BreakStmt(s.start, s.end)
  }

  ContinueStmt makeContinueStmt(RuleState s)
  {
    return ContinueStmt(s.start, s.end)
  }

  TryStmt makeTryStmt(RuleState s)
  {
    return TryStmt(s.start, s.end, s.get("block"), s.getList("catches"), s.safeGet("finallyBlock"))
  }

  CatchStmt makeCatchStmt(RuleState s)
  {
    // TODO fix start, end of local
    LocalDef? def
    if (s.has("errVar")) 
      def = LocalDef(s.start, s.end, s.safeGet("type"), s.safeGet("errVar"))
    return CatchStmt(s.start, s.end, def, s.get("block"))
  }

  SwitchStmt makeSwitchStmt(RuleState s)
  {
    return SwitchStmt(s.start, s.end, s.get("expr"), s.getList("cases"), s.safeGet("defaultBlock"))
  }

  CaseStmt makeCaseStmt(RuleState s)
  {
    return CaseStmt(s.start, s.end, s.getList("cases"), s.safeGet("block"))
  }
  
  DefaultStmt makeDefaultStmt(RuleState s)
  {
    return DefaultStmt(s.start, s.end, s.get("block"))
  }
  
  Stmt[] makeSwitchBlock(RuleState s)
  {
    return s.getList("stmts")
  }
  
  Stmt makeExprStmt(RuleState s)
  {
    return ExprStmt(s.start, s.end, s.get("expr"))
  }
}