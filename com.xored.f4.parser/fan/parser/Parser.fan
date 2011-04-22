using f4model

class Parser : AstFactory
{  
  private IFanNamespace ns
  private Str? fName
  IProblemCollector? collector  
  
  private Bool noTypeExpected := false
  private Bool inFieldInit
  private Bool inType
  private Str? curTypeName
  private Bool inSlot  
  static const Token usingDefSymptom := Token.usingKeyword
  static const Token[] typeDefSymptoms := [
    Token.classKeyword,
    Token.mixinKeyword,
    Token.enumKeyword,
    Token.docComment, 
//    Token.at, 
//    Token.pipe,
    Token.abstractKeyword,
    Token.constKeyword,
    Token.finalKeyword,
    Token.internalKeyword,
    Token.nativeKeyword,
    Token.newKeyword,
    Token.onceKeyword,
    Token.overrideKeyword,
    Token.privateKeyword,
    Token.protectedKeyword,
    Token.publicKeyword,
    Token.readonlyKeyword,
    Token.staticKeyword,
    Token.virtualKeyword]
  
  static const Token[] usingDefOrtypeDefSymptoms := 
    typeDefSymptoms.rw.add(usingDefSymptom).sort  
  
  new make(Str source, IFanNamespace ns, Str? fName := null, 
    IProblemCollector? collector := null)
  {    
    t := Tokenizer(source, collector)
    tokens = t.tokenize
    comments = t.getComments
    numTokens = tokens.size
    reset(0)
    this.currPod = ns.currPod
    this.ns = ns
    this.fName = fName
    this.collector = collector
  }
  
  CUnit cunit()
  {
    s := startRule
    recoverTo(usingDefOrtypeDefSymptoms)
    while (curt == Token.usingKeyword)
    {
      safe |->| {s["usings"] = usingDef}
      recoverTo(usingDefOrtypeDefSymptoms)
    }
    usings = s.getList("usings")
    while (true)
    {      
      mark := pos
      //docs
      if (match(Token.eof)) break
      reset(mark)
      safe |->| {s["types"] = typeDef}
      recoverTo(typeDefSymptoms)
    }    
    return endRule(s).makeCUnit(s, getComments(comments))
  }

  UsingDef usingDef()
  {
    s := startRule
    consume(Token.usingKeyword)
    PodRef p := podName
    TypeRef? t
    Id? a
    if (matchAndConsume(Token.doubleColon))
      safe |->| {t = typeName(p)}
    if (matchAndConsume(Token.asKeyword)) 
      safe |->| {a = id}
    safe |->| {endOfStmt}
    endRule(s)
    return UsingDef(s.start, s.end, p, t, a)
  }
  
  protected PodRef podName()
  {
    s := startRule
    podName := ""
    if (curt === Token.strLiteral)
    {
      podName = consume.val 
    }
    else if (matchAndConsume(Token.lbracket))
    {
      safe |->| {podName = "[$id.text]"}
      safe |->| {consume(Token.rbracket)}
    }
    if (curt === Token.identifier)
      safe |->| { podName += id.text }
    while (matchAndConsume(Token.dot))
      safe |->| { podName += "."+id.text }      
    found := ns.findPod(podName)
    endRule(s)
    return PodRef(s.start, s.end, podName, found)
  }
  
  protected TypeRef typeName(PodRef p)
  {
    s := startRule
    typeName := id.text
    while (matchAndConsume(Token.dollar)) 
    {
      typeName += "\$"
      if (match(Token.identifier))
        typeName += id.text
    }
    found := p.modelPod?.findType(typeName, false)
    endRule(s)
    return TypeRef(s.start, s.end, typeName, found)
  }
  
  Bool isTypeDef()
  {
    s := startRule
    docs
    facets
    s["modifiers"] = modifiers
    match :=  matchAny([Token.mixinKeyword,
      Token.enumKeyword,Token.classKeyword])
    ruleFailed(s)
    return match
  }

  TypeDef typeDef()
  {
    s := startRule
    s["docs"] = docs
    s["facets"] = facets
    s["modifiers"] = modifiers

    isEnum  := false
    if (matchAndConsume(Token.mixinKeyword)) 
    {
      Modifiers m := s["modifiers"]
      s.replace("modifiers", Modifiers.make(m.start, pos, m.list.dup.add(Modifier.make(pos, pos + 6, ModifierId.Mixin))))
    }
    else if (matchAndConsume(Token.enumKeyword))
    {
      consume(Token.classKeyword)
      isEnum = true
    }
    else if (cur.val == "facet")
    {
      consume
      consume(Token.classKeyword)
    }
    else consume(Token.classKeyword)
    typeId := id  
    curTypeName = typeId.text
    s["name"] = typeId    
    if (matchAndConsume(Token.colon))
    {
      safe |->| {s["inheritance"] = ctype}
      while (matchAndConsume(Token.comma))        
        safe |->| {s["inheritance"] = ctype}
    }
    failed := !safe |->| {s["bodyStart"] = consume(Token.lbrace).start}
    if (failed) recoverToNl //docs, flags,
    inType = true
    enterTypeDef(curTypeName)
    if (isEnum) 
    {
      s["slots"] = enumValDef
      while (matchAndConsume(Token.comma)) s["slots"] = enumValDef
      endOfStmt(false)
    }
    while (true)
    {
      mark := pos
      docs
      if (curt === Token.rbrace 
        || curt === Token.eof
        ) break
      reset(mark)
      if (isTypeDef) return endRule(s).makeTypeDef(s)
      failed = !safe |->| {s["slots"] = slotDef}
      if (failed) recoverToNl //docs, flags,
    }
    inType = false
    exitTypeDef
    if (!match(Token.rbrace)) err(curLoc, ProblemKind.parser_missedToken, ["}","type body"])
    else s["bodyEnd"] = consume(Token.rbrace).end
    return endRule(s).makeTypeDef(s)
  }
  
  Modifier modifier()
  {
    s := startRule
    switch (curt)
    {
      case Token.abstractKeyword:  s["id"] = ModifierId.Abstract
      case Token.constKeyword:     s["id"] = ModifierId.Const
      case Token.finalKeyword:     s["id"] = ModifierId.Final
      case Token.internalKeyword:  s["id"] = ModifierId.Internal
      case Token.nativeKeyword:    s["id"] = ModifierId.Native
      case Token.newKeyword:       s["id"] = ModifierId.Ctor
      case Token.onceKeyword:      s["id"] = ModifierId.Once
      case Token.overrideKeyword:  s["id"] = ModifierId.Override
      case Token.privateKeyword:   s["id"] = ModifierId.Private
      case Token.protectedKeyword: s["id"] = ModifierId.Protected
      case Token.publicKeyword:    s["id"] = ModifierId.Public
      case Token.readonlyKeyword:  s["id"] = ModifierId.Readonly
      case Token.staticKeyword:    s["id"] = ModifierId.Static
      case Token.virtualKeyword:   s["id"] = ModifierId.Virtual
      default: throw Err()
    }
    consume
    return endRule(s).makeModifier(s)
  }

  Modifiers modifiers()
  {
    s := startRule
    while(true)
    {
      try s["modifiers"] = modifier
      catch (Err err) break
    }
    return endRule(s).makeModifiers(s)
  }

  EnumValDef enumValDef()
  {
    s := startRule
    s["docs"] = docs
    s["name"] = id

    // optional ctor args
    if (matchAndConsume(Token.lparen))
    {
      if (curt != Token.rparen)
      {
        while (true)
        {
          s["args"] = expr
          if (curt === Token.rparen) break
          consume(Token.comma)
        }
      }
      consume(Token.rparen)
    }
    return endRule(s).makeEnumValDef(s)
  }

//////////////////////////////////////////////////////////////////////////
// Slots
//////////////////////////////////////////////////////////////////////////

  Node slotDef()
  {
    if (curt === Token.staticKeyword && peekt === Token.lbrace)
      return staticInit
    
    s := startRule
    s["docs"] = docs
    s["facets"] = facets
    s["modifiers"] = modifiers  
    
    if (curt === Token.identifier && 
      (peekt === Token.defAssign || peekt === Token.assign))
        err(curLoc, ProblemKind.parser_fieldWithoutType)
    else if (curt === Token.identifier && 
      peekt === Token.lparen) {}
    else 
    {
      CType? t := null
      t = tryType    
      if (t == null)
      {
        consume
        throw err(curLoc, ProblemKind.parser_invalidToken, ["type"])    
      }
      s["type"] = t 
    }   
    
    s["name"] = id
    
    if (match(Token.lparen))
    {
      safe |->| {s["params"] = params}
      if (curt === Token.colon) safe |->| {s["ctorChain"] = ctorChain}
      if (curt == Token.lbrace)
      {
        enterFunc(s.safeGet("params")?:[,])
        safe |->| {s["body"] = block}        
        exitFunc
      } else endOfStmt
      inSlot = true
      return endRule(s).makeMethodDef(s)
    }
    if (curt === Token.defAssign || curt === Token.assign)
    {
      if (curt === Token.assign) err(curLoc, ProblemKind.parser_invalidAssignInFieldInit)
      consume
      inFieldInit = inSlot = true
      failed := !safe |->| {s["init"] = expr}
      inFieldInit = inSlot = false
    }
    if (matchAndConsume(Token.lbrace))
    {
      Bool wasGetter := false
      Bool wasSetter := false
      while (true)
      {
        mark := pos
        modifiers
        if (curt !== Token.identifier) break
        id := id.text
        if (id == "get") {reset(mark);
          if (wasGetter) {err(curLoc, ProblemKind.parser_extraGetter); getter}
          else {s["getter"] = getter; wasGetter = true}
        }
        else if (id == "set") {reset(mark);
          if (wasSetter) {err(curLoc, ProblemKind.parser_extraSetter); setter}
          else {s["setter"] = setter; wasSetter = true}          
        }
        else err(curLoc, ProblemKind.parser_expectedGetOrSet)
      }
      safe |->| {consume(Token.rbrace)}
    }
    failed := !safe |->| {endOfStmt}
    if (failed) recoverToNl
    return endRule(s).makeFieldDef(s)
  }
  
  StaticInit staticInit()
  {
    s := startRule
    consume(Token.staticKeyword)
    inSlot = true
    s["block"] = block
    inSlot = false
    return endRule(s).makeStaticInit(s)
  }

  Getter getter()
  {
    s := startRule
    loc := cur
    s["modifiers"] = modifiers
//    if (f != 0) err("Cannot use modifiers on field getter", loc)
    s["name"] = id
    if (curt === Token.lbrace) s["block"] = block
    else endOfStmt
    return endRule(s).makeGetter(s)
  }

  Setter setter()
  {
    s := startRule
    s["modifiers"] = modifiers
    s["name"] = id
    if (curt === Token.lbrace) s["block"] = block
    else endOfStmt
    return endRule(s).makeSetter(s)
  }
  
  ParamDef[] params()
  {
    s := startRule
    consume(Token.lparen)
    if (curt !== Token.rparen)
    {
      while (true)
      {
        s["params"] = paramDef
        if (curt === Token.rparen) break
        consume(Token.comma)
      }
    }
    consume(Token.rparen)
    return endRule(s).makeParams(s)
  }

  ParamDef paramDef()
  {
    s := startRule
    s["type"] = ctype
    s["name"] = id
    if (curt === Token.defAssign || curt === Token.assign)
    {
      if (curt === Token.assign) err(curLoc, ProblemKind.parser_invalidAssignInParamDef);
      consume
      s["init"] = expr
    }
    return endRule(s).makeParamDef(s)
  }

  CtorChain ctorChain()
  {
    s := startRule
    consume(Token.colon)
    switch (curt)
    {
      case Token.superKeyword: s["target"] = superRef
      case Token.thisKeyword:  s["target"] = thisRef
      default: throw err(curLoc, ProblemKind.parser_expectedThisOrSuperInCtorChain)
    }
    if (matchAndConsume(Token.dot)) s["ctor"] = baseCtorRef
    if (matchAndConsume(Token.lparen))
    {
      if (!match(Token.rparen))
      {
        while (true)
        {
          s["args"] = expr
          if (match(Token.rparen)) break
          consume(Token.comma)
        }
      }
      consume
    }
    return endRule(s).makeCtorChain(s)
  }

//////////////////////////////////////////////////////////////////////////
// Facets
//////////////////////////////////////////////////////////////////////////

  FacetDef facet()
  {
    s := startRule
    consume(Token.at)
    if (curt !== Token.identifier) throw err(curLoc, ProblemKind.parser_missingId)
    s["type"] = ctype
    if (curt === Token.lbrace)
    {
      consume(Token.lbrace)
      while (curt === Token.identifier)
      {
        s["names"] = id
        consume(Token.assign)
        s["vals"] = expr
        endOfStmt
      }
      consume(Token.rbrace)
    }
    return endRule(s).makeFacetDef(s)
  }
  
  FacetDef[] facets()
  {
    s := startRule
    while (match(Token.at)) s["facets"] = facet
    return endRule(s).makeFacets(s)
  }
  
  FanDoc[] docs()
  {
    s := startRule
    while (curt === Token.docComment) s["list"] = doc
    return endRule(s).makeDocList(s)
  }
  
  FanDoc doc()
  {
    s := startRule
    s["val"] = consume(Token.docComment).val
    return endRule(s).makeDoc(s)
  } 

  Comment[] getComments(TokenVal[] tokens) {
    comments := [,]
    tokens.each {
      Comment? comment := getComment(it)
      if (comment != null) comments.add(comment)
    }
    return comments
  }
  
  Comment? getComment(TokenVal token) {
    if (token.kind === Token.slComment) return SLComment(token.start, token.end, token.line, token.val)
    if (token.kind === Token.mlComment) return MLComment(token.start, token.end, token.line, token.val)
    return null
  }
  
  
//////////////////////////////////////////////////////////////////////////
// Statements
//////////////////////////////////////////////////////////////////////////
  
  Stmt block()
  {
    s := startRule
    consume(Token.lbrace)
    while(!matchAny([Token.rbrace, Token.eof]))
    {
      lastPos := pos
      failed := !safe |->| {s["stmts"] = stmt  }
      if (failed) {
        recoverToNl
        if (lastPos == pos) {
          //consume extra token if we are still at the same pos
          consume
        }
      }
    }
    consume(Token.rbrace)
    return endRule(s).makeBlock(s)
  }

  Stmt stmtOrBlock()
  {
    if (!match(Token.lbrace)) return stmt
    return block
  }

  Stmt stmt()
  {
    // check for statement keywords
    switch (curt)
    {
      case Token.breakKeyword:    return breakStmt
      case Token.continueKeyword: return continueStmt
      case Token.forKeyword:      return forStmt
      case Token.ifKeyword:       return ifStmt
      case Token.returnKeyword:   return returnStmt
      case Token.switchKeyword:   return switchStmt
      case Token.throwKeyword:    return throwStmt
      case Token.tryKeyword:      return tryStmt
      case Token.whileKeyword:    return whileStmt
    }

    // at this point we either have an expr or local var declaration
    s := startRule
    expr := exprOrLocalDef
    // TODO: based on FAN-399, check if works
    endOfStmt(true)
    endRule(s)
    return ExprStmt(s.start, s.end, expr)
  }

  Expr exprOrLocalDef()
  {
    s := startRule
    
    CType? localType := null
    
    // identifier followed by def assign is inferred typed local var declaration
    if (curt === Token.identifier && peekt === Token.defAssign)
    {
      name := id
      consume
      init := expr
      endRule(s)
      return addLocal(LocalDef(s.start, s.end, localType, name, init))   
    }
    
    mark := pos
    localType = tryType

    // type followed by identifier must be local variable declaration
    if (localType != null && !nl && match(Token.identifier))
    {
      name := id
      Expr? init
      if (matchAny([Token.defAssign, Token.assign]))
      {
        if (curt === Token.assign) err(curLoc, ProblemKind.parser_invalidAssignInLocalDecl)
        consume
        init = expr
      }
      if (isEndOfStmt)
      {
        endRule(s)
        return addLocal(LocalDef(s.start, s.end, localType, name, init))        
      }
    }
    reset(mark)
    
    return exprList
  }

  IfStmt ifStmt()
  {
    s := startRule
    consume(Token.ifKeyword)
    consume(Token.lparen)
    if (!safe |->| { s["cond"] = expr })
    {
      s["cond"] = NoneLiteral(cur.start)
    }
    if (!match(Token.rparen)) err(curLoc, ProblemKind.parser_missedToken, [")","condition"])
    else consume(Token.rparen)
    if (!safe |->| { s["trueBlock"] = stmtOrBlock })
    {
      s["trueBlock"] = Block(cur.start, cur.start, [,])
    }
    if (matchAndConsume(Token.elseKeyword))
    {
      s["falseBlock"] = stmtOrBlock
    }
    return endRule(s).makeIfStmt(s)
  }

  ReturnStmt returnStmt()
  {
    s := startRule
    consume(Token.returnKeyword)
    if (!endOfStmt(true))
    {
      s["expr"] = expr
      endOfStmt
    }
    return endRule(s).makeReturnStmt(s)
  }

  ThrowStmt throwStmt()
  {
    s := startRule
    consume(Token.throwKeyword)
    s["expr"] = expr
    endOfStmt
    return endRule(s).makeThrowStmt(s)
  }

  WhileStmt whileStmt()
  {
    s := startRule
    consume(Token.whileKeyword)
    consume(Token.lparen)
    s["cond"] = expr
    consume(Token.rparen)
    s["block"] = stmtOrBlock
    return endRule(s).makeWhileStmt(s)
  }

  ForStmt forStmt()
  {
    s := startRule
    consume(Token.forKeyword)
    consume(Token.lparen)

    if (curt !== Token.semicolon) s["init"] = exprOrLocalDef
    consume(Token.semicolon)
    if (curt != Token.semicolon) s["cond"] = expr
    consume(Token.semicolon)
    if (curt != Token.rparen) s["update"] = expr
    consume(Token.rparen)

    s["block"] = stmtOrBlock

    return endRule(s).makeForStmt(s)
  }

  BreakStmt breakStmt()
  {
    s := startRule
    consume(Token.breakKeyword)
    endOfStmt
    return endRule(s).makeBreakStmt(s)
  }

  ContinueStmt continueStmt()
  {
    s := startRule
    consume(Token.continueKeyword)
    endOfStmt
    return endRule(s).makeContinueStmt(s)
  }

  TryStmt tryStmt()
  {
    s := startRule
    consume(Token.tryKeyword)
    s["block"] = stmtOrBlock
    if (curt !== Token.catchKeyword && curt !== Token.finallyKeyword)
      throw err(curLoc, ProblemKind.parser_missingCatchOrFinally)
    while (curt === Token.catchKeyword)
    {
      s["catches"] = catchStmt
    }
    if (matchAndConsume(Token.finallyKeyword))
    {
      s["finallyBlock"] = stmtOrBlock
    }
    return endRule(s).makeTryStmt(s)
  }

  CatchStmt catchStmt()
  {
    s := startRule
    consume(Token.catchKeyword)
    if (matchAndConsume(Token.lparen))
    {
      s["type"] = ctype
      s["errVar"] = id
      consume(Token.rparen)
    }
    s["block"] = stmtOrBlock
    return endRule(s).makeCatchStmt(s)
  }

  SwitchStmt switchStmt()
  {
    s := startRule
    consume(Token.switchKeyword)
    consume(Token.lparen)
    s["expr"] = expr
    consume(Token.rparen)
    consume(Token.lbrace)
    while (curt != Token.rbrace)
    {
      if (curt === Token.caseKeyword) s["cases"] = caseStmt
      else if (match(Token.defaultKeyword)) s["defaultBlock"] = defaultStmt
      else throw err(curLoc, ProblemKind.parser_missingCaseOrDefault)
    }
    consume(Token.rbrace)
    endOfStmt
    return endRule(s).makeSwitchStmt(s)
  }

  CaseStmt caseStmt()
  {
    s := startRule
    while (matchAndConsume(Token.caseKeyword))
    {
      s["cases"] = expr
      consume(Token.colon)
    }
    if (!match(Token.defaultKeyword))
    {
      s["block"] = switchBlock
    }
    return endRule(s).makeCaseStmt(s)
  }

  DefaultStmt defaultStmt()
  {
    s := startRule
    consume(Token.defaultKeyword)
    consume(Token.colon)
    s["block"] = switchBlock
    return endRule(s).makeDefaultStmt(s)
  }

  Stmt[] switchBlock()
  {
    s := startRule
    while (curt !== Token.caseKeyword 
      && curt != Token.defaultKeyword 
      && curt !== Token.rbrace) s["stmts"] = stmt
    return endRule(s).makeSwitchBlock(s)
  }
  
//////////////////////////////////////////////////////////////////////////
// Expressions
//////////////////////////////////////////////////////////////////////////
  
  Expr exprList()
  {
    s := startRule
    left := expr
    while (curt === Token.comma)
    {
      op := consume
      if (curt === Token.rbrace || curt === Token.semicolon) break
      right := assignExpr
      endRule(s)
      left = shortcut(s.start, s.end, ExprId.add, "add", left, right, op)
      if (curt === Token.rbrace || curt === Token.semicolon) break
    }
    return left
  }
  
  Expr expr() {return assignExpr}
  
  Expr assignExpr()
  {
    s := startRule
    left := ternary
    switch(curt)
    {
      case Token.assign: consume; right := assignExpr; endRule(s)
        return BinaryExpr(s.start, s.end, left, right, ExprId.assign, right.resolvedType)
      case Token.defAssign: err(curLoc, ProblemKind.parser_invalidAssignInExpr)
        op := consume; right := assignExpr; endRule(s)        
        return BinaryExpr(s.start, s.end, left, right, ExprId.assign, right.resolvedType)
      case Token.assignPlus: op := consume; right := assignExpr; endRule(s)
        return shortcut(s.start, s.end, ExprId.assignPlus, "plus", left, right, op)
      case Token.assignMinus: op := consume; right := assignExpr; endRule(s)
        return shortcut(s.start, s.end, ExprId.assignMinus, "minus", left, right, op)
      case Token.assignStar: op := consume; right := assignExpr; endRule(s)
        return shortcut(s.start, s.end, ExprId.assignMult, "mult", left, right, op)
      case Token.assignSlash: op := consume; right := assignExpr; endRule(s)
        return shortcut(s.start, s.end, ExprId.assignDiv, "div", left, right, op)
      case Token.assignPercent: op := consume; right := assignExpr; endRule(s)
        return shortcut(s.start, s.end, ExprId.assignMod, "mod", left, right, op)
    }
    return left
  }
  
  Expr ternary()
  {
    s := startRule
    first := orExpr
    if (curt === Token.question && 
       peekt === Token.colon &&
       !peek.newline)
    {
      consume; consume
      second := ifExprBody
      endRule(s)
      return BinaryExpr(s.start, s.end, first, second, ExprId.elvis, commonSuper(first.resolvedType, second.resolvedType))
    }
    if (curt === Token.question)
    {
      consume
      condExpr := first
      mark := pos
      trueExpr := ifExprBody
      if (!match(Token.colon))
      {
        reset(mark)
        old := noTypeExpected
        noTypeExpected = true
        trueExpr = ifExprBody
        noTypeExpected = old
      }
      consume(Token.colon)
      falseExpr := ifExprBody
      endRule(s)
      return TernaryExpr(s.start, s.end, condExpr, trueExpr, falseExpr, commonSuper(trueExpr.resolvedType, falseExpr.resolvedType))
    }
    return first
  }
  
  Expr ifExprBody()
  {
    if (curt === Token.throwKeyword)
    {
      s := startRule
      consume
      e := expr
      endRule(s)
      return ThrowExpr(s.start, s.end, e)
    }
    return orExpr
  }
  
  Expr orExpr()
  {
    s := startRule
    e := andExpr
    if (curt === Token.doublePipe)
    {
      consume; second := orExpr; endRule(s)
      return BinaryExpr(s.start, s.end, e, second, ExprId.or, resolveBool)
    }
    return e
  }
  
  Expr andExpr()
  {
    s := startRule
    e := equalityExpr
    if (curt === Token.doubleAmp)
    {
      consume; second := andExpr; endRule(s)
      return BinaryExpr(s.start, s.end, e, second, ExprId.and, resolveBool)
    }
    return e
  }
  
  Expr equalityExpr()
  {
    s := startRule
    e := relationalExpr
    switch(curt)
    {
      case Token.eq: consume; e2 := equalityExpr; endRule(s)
        return BinaryExpr(s.start, s.end, e, e2, ExprId.eq, resolveBool)
      case Token.notEq: consume; e2 := equalityExpr; endRule(s)
        return BinaryExpr(s.start, s.end, e, e2, ExprId.notEq, resolveBool)
      case Token.same: consume; e2 := equalityExpr; endRule(s)
        return BinaryExpr(s.start, s.end, e, e2, ExprId.same, resolveBool)      
      case Token.notSame: consume; e2 := equalityExpr; endRule(s)
        return BinaryExpr(s.start, s.end, e, e2, ExprId.notSame, resolveBool)     
    }
    return e
  }
  
  Expr relationalExpr()
  {
    s := startRule
    left := rangeExpr
    switch(curt)
    {
      case Token.lt: consume; right := relationalExpr; endRule(s)
        return BinaryExpr(s.start, s.end, left, right, ExprId.lt, resolveBool)
      case Token.ltEq: consume; right := relationalExpr; endRule(s)
        return BinaryExpr(s.start, s.end, left, right, ExprId.le, resolveBool)
      case Token.gt: consume; right := relationalExpr; endRule(s)
        return BinaryExpr(s.start, s.end, left, right, ExprId.gt, resolveBool)      
      case Token.gtEq: consume; right := relationalExpr; endRule(s)
        return BinaryExpr(s.start, s.end, left, right, ExprId.ge, resolveBool)      
      case Token.cmp: op := consume; right := relationalExpr; endRule(s)
        return shortcut(s.start, s.end, ExprId.cmp, "compare", left, right, op)      
      case Token.asKeyword: consume; t := ctype; endRule(s)
        return TypeCheckExpr.asExpr(s.start, s.end, t, left)      
      case Token.isKeyword: consume; t := ctype; endRule(s)
        return TypeCheckExpr.isExpr(s.start, s.end, t, left, resolveBool)    
      case Token.isnotKeyword: consume; t := ctype; endRule(s)
        return TypeCheckExpr.isnotExpr(s.start, s.end, t, left, resolveBool)
    }    
    return left
  }
  
  Expr rangeExpr()
  {
    s := startRule
    left := addExpr
    switch(curt)
    {
      case Token.dotDot: op := consume; right := addExpr; endRule(s)
        return RangeLiteral(s.start, s.end, left, right, false, resolveRange)
      case Token.dotDotLt: op := consume; right := addExpr; endRule(s)
        return RangeLiteral(s.start, s.end, left, right, true, resolveRange)
      default: return left
    }
  }
  
  Expr addExpr()
  {
    s := startRule
    left := multExpr
    switch(curt)
    {
      case Token.plus: op := consume; right := addExpr; endRule(s)
        return shortcut(s.start, s.end, ExprId.plus, "plus", left, right, op)
      case Token.minus: op := consume; right := addExpr; endRule(s)
        return shortcut(s.start, s.end, ExprId.minus, "minus", left, right, op)
      default: return left
    }
  }
  
  Expr multExpr()
  {
    s := startRule
    left := primaryExpr
    switch(curt)
    {
      case Token.star: op := consume; right := multExpr; endRule(s)
        return shortcut(s.start, s.end, ExprId.mult, "mult", left, right, op)
      case Token.slash: op := consume; right := multExpr; endRule(s)
        return shortcut(s.start, s.end, ExprId.div, "div", left, right, op)
      case Token.percent: op := consume; right := multExpr; endRule(s)
        return shortcut(s.start, s.end, ExprId.mod, "mod", left, right, op)
      default: return left
    }
  }
  
  Expr primaryExpr()
  {
    if (match(Token.lparen))
    {
      castExpr := tryCastExpr
      if (castExpr != null) return castExpr
      return termExpr
    }
    return unaryExpr
  }
  
  Expr? tryCastExpr()
  {
    s := startRule
    consume(Token.lparen)
    castType := tryType
    if (castType != null && castType.resolvedType != null && matchAndConsume(Token.rparen))
    {
      try
      {
        expr := primaryExpr
        endRule(s)
        return TypeCheckExpr.coerce(s.start, s.end, castType, expr)
      }
      catch (Err err)
      {
        if (err is IProblem) return ruleFailed(s)
        throw err
      }
    }
    return ruleFailed(s)
  }

  Expr unaryExpr()
  {
    s := startRule
    switch(curt)
    {
      case Token.bang: op := consume; operand := primaryExpr; endRule(s)
        return UnaryExpr(s.start, s.end, operand, ExprId.not, resolveBool)
      case Token.plus: op := consume; operand := primaryExpr; endRule(s)
        return UnaryExpr(s.start, s.end, operand, ExprId.unaryPlus, operand.resolvedType)
      case Token.minus: op := consume; operand := primaryExpr; endRule(s)
        return shortcut(s.start, s.end, ExprId.unaryMinus, "negate", operand, null, op)
      case Token.increment: op := consume; operand := primaryExpr; endRule(s)
        return shortcut(s.start, s.end, ExprId.inc, "increment", operand, null, op)
      case Token.decrement: op := consume; operand := primaryExpr; endRule(s)
        return shortcut(s.start, s.end, ExprId.dec, "decrement", operand, null, op)
    }
    operand := termExpr    
    switch(curt)
    {
      case Token.increment: op := consume; endRule(s)
        return shortcut(s.start, s.end, ExprId.postfixInc, "increment", operand, null, op)
      case Token.decrement: op := consume; endRule(s)
        return shortcut(s.start, s.end, ExprId.postfixDec, "decrement", operand, null, op)
    }
    return operand
  }
  
  Expr shortcut(Int start, Int end, ExprId id, Str methodName, Expr left, Expr? right, TokenVal op)
  {
    IFanType? rt := null
    if (left.resolvedType != null)
    {
      method := left.resolvedType.method(methodName, false)
      if (method == null)
        err(locOf(op), ProblemKind.parser_methodNotFound, [left.resolvedType.name + "." + methodName])
      else rt = ns.findType(method.of)
    }
    if (right == null) return UnaryExpr(start, end, left, id, rt)
    return BinaryExpr(start, end, left, right, id, rt)
  }

//////////////////////////////////////////////////////////////////////////
// Term Expr
//////////////////////////////////////////////////////////////////////////
  
  Expr termExpr()
  {
    s := startRule
    base := termBase
    while(true)
    {
      Expr? expr := termChain(base)
      if (expr == null) break
      base = expr
    } 
    return base
  }
  
  Expr? tryTypeOrLocalOrSlot()
  {
    if (curt === Token.amp) return idExpr(null)
    if (!noTypeExpected)
    {
      mark := pos
      t := tryTypeBase
      if (t != null) return t
      reset(mark)
    }
    if (curt === Token.identifier) return idExpr(null)
    return null
  }
  
  private SlotLiteral slotLiteral(RuleState s, CType? t := null)
  {
    slot := slotRef(t) as SlotRef
    slotType := resolveSlot
    if(slot?.modelSlot is IFanField)
      slotType = resolveField
    else if(slot?.modelSlot is IFanMethod)
      slotType = resolveMethod
    endRule(s)
    return SlotLiteral(s.start, s.end, t, slot, slotType)
  }
  
  Expr termBase()
  {
    res := tryTypeOrLocalOrSlot
    if (res != null) return res

    s := startRule
    if (matchAndConsume(Token.pound))
    {
      if (noWs && match(Token.identifier))
      {
        return slotLiteral(s)          
      }      
    }
    switch(curt)
    {
      case Token.pipe: return closure
      
      case Token.lparen: return parenExpr
      
      case Token.thisKeyword : return thisRef
      case Token.superKeyword : return superRef
      case Token.itKeyword :
        consume
        endRule(s)
        if (itTypes.isEmpty)
        {
          return UnresolvedRef(s.start, s.end, "it")
        }
        return ItRef(s.start, s.end, itTypes.last)

      case Token.nullKeyword : consume; endRule(s)
        return Literal(s.start, s.end, ExprId.nullLiteral, null, resolveObjQue)
      case Token.trueKeyword : consume; endRule(s)
        return Literal(s.start, s.end, ExprId.boolLiteral, true, resolveBool)
      case Token.falseKeyword : consume; endRule(s)
        return Literal(s.start, s.end, ExprId.boolLiteral, false, resolveBool)
      case Token.strLiteral : val := consume.val; endRule(s)
        return Literal(s.start, s.end, ExprId.strLiteral, val, resolveStr)
      case Token.intLiteral : val := consume.val; endRule(s)
        return Literal(s.start, s.end, ExprId.intLiteral, val, resolveInt)
      case Token.floatLiteral : val := consume.val; endRule(s)
        return Literal(s.start, s.end, ExprId.floatLiteral, val, resolveFloat)
      case Token.decimalLiteral : val := consume.val; endRule(s)
        return Literal(s.start, s.end, ExprId.decimalLiteral, val, resolveDecimal)
      case Token.durationLiteral : val := consume.val; endRule(s)
        return Literal(s.start, s.end, ExprId.durationLiteral, val, resolveDuration)
      case Token.uriLiteral : val := consume.val; endRule(s)
        return Literal(s.start, s.end, ExprId.uriLiteral, Uri.fromStr(val), resolveUri)
      
      case Token.lbracket : return listOrMapLiteral
    }
    throw err(curLoc, ProblemKind.parser_expectedExpr)
  }
  
  NoneLiteral noneLiteral() {return NoneLiteral(startRule.start)}
  
  ParenExpr parenExpr()
  {
    s := startRule
    consume(Token.lparen)
    e := expr
    consume(Token.rparen)
    endRule(s)
    return ParenExpr(s.start, s.end, e)
  }
  
  Expr dslLiteral()
  {   
    s := startRule
    val := consume.val
    endRule(s)
    return DslLiteral(s.start, s.end, val)
  }
  
  Expr? tryTypeBase()
  {
    s := startRule
    
    mark := pos
    t := tryType

    if (t == null) return ruleFailed(s)
    
    s["type"] = t
    
    if (matchAndConsume(Token.pound))
    {
      if (noWs && match(Token.identifier))
      {
        return slotLiteral(s, t)
      }
      else
      {        
        endRule(s)
        return TypeLiteral(s.start, s.end, t, resolveType)   
      }
    }
    if (match(Token.dot, Token.superKeyword))
    {
      consume; consume
      endRule(s)
      return SuperRef(s.start, s.end, t)      
    }
    if (match(Token.dsl))
    {
      literal := dslLiteral
      endRule(s)
      return DslExpr(s.start, s.end, t, literal)
    }
    if (match(Token.lbracket, Token.comma))
      return listOrMapLiteral(t)
    if (match(Token.lbracket, Token.colon))
      return listOrMapLiteral(t)
    if (t.resolvedType == null) return null
    endRule(s)

    if (match(Token.lbracket))return listOrMapLiteral(t)
    if (match(Token.lbrace) && t is FuncType)
    {
      // <FuncType>{ == closure
      reset(mark)
      return closure
    }
    /*if (match(Token.lbrace))
    {
      // <Type>{ == ctor with closure param
      return call(StaticTargetExpr(s.start, s.end, t))
    }*/
    if (curt == Token.lparen || curt == Token.lbrace)
    {
      // <Type>( == ctor
      // <Type>{ == ctor with closure param
      return call(StaticTargetExpr(s.start, s.end, t))
    }
    return StaticTargetExpr(s.start, s.end, t)
  }

  StorageExpr storage(Expr? prev)
  {
    s := startRule
    consume
    ss := startRule
    name := consume(Token.identifier).val
    endRule(ss)
    Ref? ref := UnresolvedRef(ss.start, ss.end, name)
    IFanType? resolvedType := prev == null? currType : prev.resolvedType
    if (resolvedType != null)
    {
      slot := resolvedType.findSlot(name, ns, false)
      if (slot != null)
      {
        id := slot.isField ? ExprId.fieldRef : ExprId.methodRef
        ref = SlotRef(ss.start, ss.end, name, id, slot, ns.findType(slot.of), resolvedType)
      }
    }
    endRule(s)
    return StorageExpr(s.start, s.end, ref)
  }

  **
  ** Passes arguments in parentheses (they don't have to exist) to method call on 'caller'.
  ** If it is followed by closure, closure is treated as last argument or as a single
  ** argument for 'sys::Obj.with' call depending on 'caller' argument type in closure
  ** position.
  ** 
  Expr call(Expr caller)
  {
    s := startRule
    s.start = caller.start
    Expr[] args := [,]
    if (curt === Token.lparen)
    {
        consume
        if (!match(Token.rparen))
        {
          while (true)
          {
            args.add(expr)
            if (match(Token.rparen)) break
            consume(Token.comma)
          }
        }
        consume
    }

    expectedArgs := expectedClosureArgs(caller, args.size)

    // TODO: compare signatures of expected and following closures
    if (expectedArgs != null && isClosure(expectedArgs.size != 0))
    {
      args.add(closure(expectedArgs))
    }
    endRule(s)

    // if there is one more closure, make with-call
    if (isClosure)
    {
      // if caller is method or closure, need to close previous
      // call and make a with-call on its result
      withCaller := (callerAsMethod(caller) != null || caller is Closure) ?
        CallExpr(s.start, s.end, caller, args) : caller
      
      
      cl := closure([withCaller.resolvedType])
      withCall := withCall(withCaller, cl)

      

      if (withCall != null)
      {
        return InvokeExpr.staticInvoke(withCaller.start, cl.end, withCaller, withCall)
      }
      else
      {
        // shouldn't be so - just skip closure
        args.add(cl)
      }
    }
    if (caller.resolvedType?.qname == "sys::Func" && !callerIsMethod(caller) )
    {
      //generate invoke of 'call method'
      return InvokeExpr.staticInvoke(caller.start, s.end, caller, callCall(caller, args))
    }

    return CallExpr(s.start, s.end, caller, args)
  }
  
  Bool callerIsMethod(Expr caller)
  {
    (caller as SlotRef)?.modelSlot is IFanMethod
  }

  CallExpr callCall(Expr caller, Expr[] args)
  {
    callSlot := resolveCallSlot(caller.resolvedType)
    callRef := SlotRef(caller.end, caller.end, "call", ExprId.methodRef, callSlot, callerTypeForCall(caller), resolveObjQue)
    return CallExpr(args.first?.start ?: caller.end, args.last?.end ?: caller.end, callRef, args)
  }
  
  private IFanType? callerTypeForCall(Expr caller)
  {
    // TODO: check what's line below for
    //((caller as MethodVarRef)?.def?.init as Closure)?.resolvedReturnType ?: resolveObj
    caller.resolvedType?.parametrization?.get("sys::R") ?: resolveObjQue
  }
  **
  ** Makes 'SlotRef' on 'with' slot.
  ** 
  CallExpr? withCall(Expr caller, Expr callee)
  {
    withSlot := resolveWithSlot
    if (withSlot == null) { return null }
    withRef := SlotRef(callee.start, callee.start, "with", ExprId.methodRef, withSlot, ns.findType(withSlot.of), caller.resolvedType)
    return CallExpr(callee.start, callee.end, withRef, [callee])
  }

  **
  ** Returns a list of argument types of following closure. If closure
  ** is not expected, 'null' is returned.
  ** 
  IFanType?[]? expectedClosureArgs(Expr caller, Int argNum)
  {
    callerType := callerThisType(caller)
    return (callerAsMethod(caller)?.name == "with") ?
      [callerType] : resolveFuncSigParams(argType(caller, argNum), callerType)
  }

  **
  ** Returns a 'This' type in caller declaration
  **
  private IFanType? callerThisType(Expr caller)
  {
    if (caller is InvokeExpr)
    {
      return (caller as InvokeExpr).callee.resolvedType
    }
    if (caller is SlotRef)
    {
      return (caller as SlotRef).thisType
    }
    if (caller is StaticTargetExpr)
    {
      return (caller as StaticTargetExpr).ctype.resolvedType
    }
    //Somehow |This|
    return null
  }

  **
  ** Returns a typename of caller argument in 'argNum' place.
  ** Caller must be either 'SlotRef' on method, 'StaticTargetExpr' -
  ** in such case call is treated as 'make' ctor, or 'Closure'.
  **
  private Str? argType(Expr caller, Int argNum)
  {
    methodArgType(caller, argNum) ?: closureArgType(caller, argNum)
  }

  **
  ** Returns a typename of caller argument in 'argNum' place.
  ** Caller must be either 'SlotRef' on method, or 'StaticTargetExpr' -
  ** in such case call is treated as 'make' ctor.
  **
  private Str? methodArgType(Expr caller, Int argNum)
  {
    method := callerAsMethod(caller) 
    if (method == null) { return null }
    return method.params.getSafe(argNum)?.of
  }

  **
  ** If 'caller' is 'SlotRef' on method returns corresponding slot, if 'caller' is
  ** 'StaticTargetExpr' returns 'make' ctor slot.
  **
  private IFanMethod? callerAsMethod(Expr caller)
  {
    IFanSlot? slot
    if (caller is InvokeExpr)
    {
      caller = (caller as InvokeExpr).caller
    }
    if (caller is SlotRef)
    {
      slot = (caller as SlotRef).modelSlot
    }
    if (caller is StaticTargetExpr)
    {
      slot = (caller as StaticTargetExpr).ctype.resolvedType?.method("make", false)
    }
    return (slot isnot IFanMethod) ? null : slot
  }

  **
  ** Returns a typename of caller argument in 'argNum' place.
  ** Caller must be 'Closure'.
  **
  private Str? closureArgType(Expr caller, Int argNum)
  {
    if (caller isnot Closure) { return null }
    return (caller as Closure).argTypesHint?.getSafe(argNum)?.qname
  }

  **
  ** Returns a list conaining types of arguments if 'sig' is valid closure signature,
  ** otherwise 'null'. Resolves 'sys::This' with 'enclosingType'.
  **
  private IFanType?[]? resolveFuncSigParams(Str? sig, IFanType? enclosingType)
  {
    funcSigParams(sig)?.map{ resolveTypename(it, enclosingType) }
  }

  **
  ** Returns a list conaining typenames of arguments if 'sig' is closure signature,
  ** otherwise 'null'.
  ** 
  private Str?[]? funcSigParams(Str? sig)
  {
    if (sig == null) { return null }
    if (sig[-1] == '?') { sig = sig[0 .. -2] }
    if (!sig.startsWith("|") || !sig.endsWith("|")) { return null }
    sigArgs := sig[1 ..< (sig.index("->") ?: sig.size - 1)]
    return sigArgs.split(',').exclude{it.isEmpty}.map{ it[-1] == '?' ? it[0..-2] : it }
  }

  **
  ** Resolves 'sys::This' or finds a type in current namespace.
  ** 
  private IFanType? resolveTypename(Str name, IFanType? enclosingType)
  {
    resolveThisTypename(name,enclosingType) ?: ns.findType(name)
  }

  **
  ** Returns 'enclosingType ?: sys::Obj' if name is 'This' or 'sys::This', otherwise 'null' 
  ** 
  private IFanType? resolveThisTypename(Str name, IFanType? enclosingType)
  {
    if (name == "This" || name == "sys::This")
    {
      return enclosingType ?: ns.findType("sys::Obj")
    }
    return null
  }

  Closure closure(IFanType?[]? argsHint := null)
  {
    s := startRule
    signature := (curt === Token.pipe) ? funcType(true, argsHint) : null  

    if (signature == null)
    {
      itTypes.push(argsHint?.getSafe(0))
    }
    else
    {
      enterFunc(
        signature.params.exclude{ it.name == null }.map
        {
          LocalDef(it.start, it.end, it.ctype, it.name, null, it.resolvedType)
        })
    }

    body := block

    if (signature == null) { itTypes.pop }
    else { exitFunc }

    endRule(s)
    return Closure(s.start, s.end, signature, body, signature?.resolvedType ?: resolveFunc, argsHint)
  }

  Expr listOrMapLiteral(CType? parsedType := null)
  {
    mark := pos
    consume(Token.lbracket)
    switch (curt)
    {
      case Token.rbracket:
      case Token.comma: reset(mark); return listLiteral(parsedType)
      case Token.colon: reset(mark); return mapLiteral(parsedType)
    }
    expr
    switch (curt)
    {
      case Token.rbracket:
      case Token.comma: reset(mark); return listLiteral(parsedType)
      case Token.colon: reset(mark); return mapLiteral(parsedType)
      default : throw err(curLoc, ProblemKind.parser_missedToken, [Token.rbracket])
    }
  }  
  
  ListLiteral listLiteral(CType? parsedType := null)
  {
    s := startRule
    Expr[] items := [,]
    if (parsedType != null) s.start = parsedType.start
    consume(Token.lbracket)
    if (matchAndConsume(Token.rbracket))
    {
      err(locOfRange(-2, -1), ProblemKind.parser_invalidEmptyList)
      endRule(s)
      return ListLiteral(s.start, s.end, parsedType, items, resolveList(parsedType, items))
    }
    if (matchAndConsume(Token.comma))
    {
      consume(Token.rbracket)
      endRule(s)
      return ListLiteral(s.start, s.end, parsedType, items, resolveList(parsedType, items))
    }
    items.add(expr)
    while(matchAndConsume(Token.comma))
    {
      if (match(Token.rbracket)) items.add(noneLiteral)
      else items.add(expr)
    }
    consume(Token.rbracket)
    endRule(s)
    return ListLiteral(s.start, s.end, parsedType, items, resolveList(parsedType, items))
  } 
  
  MapLiteral mapLiteral(CType? parsedType := null)
  {
    s := startRule

    CType? keyType := null
    CType? valueType := null
    if (parsedType != null && parsedType is MapType)
    {
      mapType := parsedType as MapType
      keyType = mapType.keyType
      valueType = mapType.valType
    }

    Expr[] keys := [,]
    Expr[] vals := [,]
    if (parsedType != null)
    {
      s.start = parsedType.start
      s["type"] = parsedType
    }
    consume(Token.lbracket)
    if (matchAndConsume(Token.colon))
    {
      consume(Token.rbracket)
      endRule(s)
      return MapLiteral(s.start, s.end, parsedType, keys, vals, resolveMap(keyType, valueType, keys, vals))
    }
    keys.add(expr)
    consume(Token.colon)
    vals.add(expr)
    while(matchAndConsume(Token.comma))
    {
      if (match(Token.rbracket))
      {
        keys.add(noneLiteral)
        vals.add(noneLiteral)
      }
      else
      {
        keys.add(expr)
        consume(Token.colon)
        vals.add(expr) 
      }
    }
    consume(Token.rbracket)
    endRule(s)
    return MapLiteral(s.start, s.end, parsedType, keys, vals, resolveMap(keyType, valueType, keys, vals))
  }  

  SuperRef superRef()
  {
    s := startRule
    consume(Token.superKeyword)
    endRule(s)
    return SuperRef(s.start, s.end, null, immediateSuper(currType) ?: resolveObj)
  }

  ThisRef thisRef()
  {
    s := startRule
    consume(Token.thisKeyword)
    endRule(s)
    return ThisRef(s.start, s.end, currType)
  }
  
  Expr? termChain(Expr base)
  {
    s := startRule
    s.start = base.start
    switch(curt)
    {
      case Token.dot : consume; 
        if (match(Token.identifier))
        {
          caller := idExpr(base)
          endRule(s)
          return InvokeExpr.staticInvoke(s.start, s.end, base, caller)
        }
        else return base
      case Token.arrow : consume; 
        if (match(Token.identifier))
        {
          caller := idExpr(base)
          endRule(s)
          return InvokeExpr.dynamicInvoke(s.start, s.end, base, caller)
        }
        else return base
      case Token.safeDot : consume; 
        if (match(Token.identifier))
        {
          caller := idExpr(base)
          endRule(s)
          return InvokeExpr.staticSafeInvoke(s.start, s.end, base, caller)
        }
        else return base
    }
    if (curt === Token.question && 
       peekt === Token.arrow &&
       !peek.newline)
    {
      consume
      consume
      if (match(Token.identifier))
      {
        caller := idExpr(base)
        endRule(s)
        return InvokeExpr.dynamicSafeInvoke(s.start, s.end, base, caller)
      }
      else return base
    }
    if (!nl && curt === Token.lbracket)
    {
      op := consume
      index := expr
      consume(Token.rbracket)
      IFanType? rt := null
      endRule(s)
      if (index is RangeLiteral)
        return shortcut(s.start, s.end, ExprId.index, "getRange", base, index, op)
      else      
        return shortcut(s.start, s.end, ExprId.index, "get", base, index, op)
    }
    if (isClosure || curt === Token.lparen) return call(base)
    return null
  }
  
  Expr idExpr(Expr? prev)
  {
    if (curt === Token.amp) return storage(prev)
    Expr? expr
    if (curt === Token.identifier)
    {
      s := startRule
      name := consume(Token.identifier).val
      endRule(s)
      if (prev == null)
      {
        // <expr>: current type slot ref or local var ref
        MethodVar? def := findLocal(name)
        if (def != null)
        {
          expr = MethodVarRef(s.start, s.end, name, def)
        }
        else
        {
          // current type slot or last it type slot
          slot := itTypes.peek?.findSlot(name, ns, false)
          slotThisType := itTypes.peek
          if(slot == null)
          {
            slot = currType?.findSlot(name, ns, false)
            slotThisType = currType
          }
          if (slot != null)
          {
            id := slot.isField ? ExprId.fieldRef : ExprId.methodRef
            expr = SlotRef(s.start, s.end, name, id, slot, ns.findType(slot.of), slotThisType)
          }
        }
      }
      else
      {
        // <prev>.<expr>: slot of prev
        if (prev.resolvedType != null)
        {
          slot := prev.resolvedType.findSlot(name, ns, false)
          if (slot != null)
          {
            id := slot.isField ? ExprId.fieldRef : ExprId.methodRef
            expr = SlotRef(s.start, s.end, name, id, slot, ns.findType(slot.of), prev?.resolvedType)
          }
        }
      }
      if (expr == null)
      {
        err(curLoc, ProblemKind.parser_unresolvedVar)
        expr = UnresolvedRef(s.start, s.end, name)        
      }
    }
    else throw err(curLoc, ProblemKind.parser_expectedId)
    return expr
  }
  
  Bool isComplexLit()
  {
    if (!match(Token.lbrace)) return false
    if (!inSlot) return true
    return false
  }
  
  Bool isClosure(Bool canBeItBlock := true)
  {
    if (!(canBeItBlock && match(Token.lbrace) || !nl && match(Token.pipe))) return false
//    if (inFieldInit)
//    {
      switch(peekt)
      {
        case Token.publicKeyword: return false
        case Token.privateKeyword: return false
        case Token.protectedKeyword: return false
        case Token.internalKeyword: return false
        case Token.staticKeyword: return false
        case Token.readonlyKeyword: return false
        case Token.identifier:
          if (peek.val == "get" || peek.val == "set") return false
      }
//    }
    return true
  }
  
  Bool endOfStmt(Bool optional := false)
  {
    if (nl) return true
    if (match(Token.semicolon)) { consume; return true }
    if (match(Token.rbrace)) return true
    if (match(Token.eof)) return true
    
    if (optional) return false
    throw err(locOfRange(-1), ProblemKind.parser_expectedEndOfStmt)
  }
  
  Bool isEndOfStmt()
  {
    if (nl) return true
    if (match(Token.semicolon)) return true
    if (match(Token.rbrace)) return true
    if (match(Token.eof)) return true
    
    return false
  }
  
//////////////////////////////////////////////////////////////////////////
// References
//////////////////////////////////////////////////////////////////////////
     
  Ref slotRef(CType? t := null)
  {    
    s := startRule
    Str slotName := consume(Token.identifier).val
    name := slotName
    endRule(s)

    tt := t?.resolvedType ?: currType
    found := tt?.findSlot(slotName, ns, false)

    if (found == null)
      return UnresolvedRef(s.start, s.end, name)

    rt := ns.findType(found.of)
    return SlotRef(s.start, s.end, name, found.isField? ExprId.fieldRef : ExprId.methodRef, found, rt, tt)
  }
  
  Ref baseCtorRef()
  {
    s := startRule
    name := consume(Token.identifier).val
    endRule(s)
    return UnresolvedRef(s.start, s.end, name)
  }  
  
  PodRef podRef()
  {
    s := startRule
    Str podName := consume(Token.identifier).val
    found := ns.findPod(podName)
    endRule(s)
    return PodRef(s.start, s.end, podName, found)
  }
  
  TypeRef typeRef(PodRef? p)
  {
    s := startRule
    Str typeName := consume(Token.identifier).val
    found := null
    if (p == null) {
      found = usings.eachWhile |UsingDef def->IFanType?|{
        if (def.typeName == null)
          return def.podName.modelPod?.findType(typeName,false)
        else if (typeName == def.typeName.text)
          return def.typeName.resolvedType
        return null;
      }
      if (found == null)
        found = currPod.findType(typeName,false)
      if (found == null)
        found = ns.findPod("sys")?.findType(typeName,false)
    }
    else
      p.modelPod?.findType(typeName, false)
//    if (found == null) 
//      throw err(locOfRange(-1), ProblemKind.parser_unresolvedType, [typeName])
    endRule(s)
    return TypeRef(s.start, s.end, typeName, found)
  }
  
  Id id()
  {
    s := startRule
    text := consume(Token.identifier).val
    endRule(s)
    return Id(s.start, s.end, text)
  }
  
  UsingDef[] usings := [,]
  Str:IFanPod podsMap := [:]
  MethodVar[][] funcStack := [,]
  IFanPod currPod
  IFanType? currType
  IFanType?[] itTypes := [,] // stack of itTypes

  Void enterTypeDef(Str name) {currType = currPod.findType(name, false)}
  Void exitTypeDef() {currType = null}
  
  Void enterFunc(MethodVar[] vars)
  {
    funcStack.push(MethodVar[,])
    funcStack.peek.addAll(vars)
  }
  
  LocalDef addLocal(LocalDef var)
  {
    if (funcStack.peek == null)
      err(curLoc, ProblemKind.parser_internalError)
    else
      funcStack.peek.add(var)
    return var    
  }
  
  Void exitFunc() { funcStack.pop }
  MethodVar[]? getLocals() { funcStack.flatten }  

  MethodVar? findLocal(Str name)
  {
    getLocals?.find {it.name.text == name}
  }

  once IFanType? resolveObj() {ns.findPod("sys")?.findType("Obj", false)}
  once IFanType? resolveObjQue() { resolveObj?.toNullable }
  once IFanType? resolveVoid() {ns.findPod("sys")?.findType("Void", false)}
  once IFanType? resolveBool() {ns.findPod("sys")?.findType("Bool", false)}
  once IFanType? resolveStr() {ns.findPod("sys")?.findType("Str", false)}
  once IFanType? resolveInt() {ns.findPod("sys")?.findType("Int", false)}
  once IFanType? resolveFloat() {ns.findPod("sys")?.findType("Float", false)}
  once IFanType? resolveDecimal() {ns.findPod("sys")?.findType("Decimal", false)}
  once IFanType? resolveDuration() {ns.findPod("sys")?.findType("Duration", false)}
  once IFanType? resolveUri() {ns.findPod("sys")?.findType("Uri", false)}
  once IFanType? resolveRange() {ns.findPod("sys")?.findType("Range", false)}
  IFanType? resolveList(CType? valueType, Expr[]? items := null)
  {
    resolved := resolveItemType(items ?: Expr[,], valueType)
    type := ns.findPod("sys")?.findType("List", false)
    return resolved == null ? type : type?.parameterize(["sys::V":resolved])
  }
  IFanType? resolveMap(CType? keyType, CType? valueType, Expr[]? keys := null, Expr[]? vals := null)
  {
    resolvedKey := resolveItemType(keys ?: Expr[,], keyType)
    resolvedVal := resolveItemType(vals ?: Expr[,], valueType)
    type := ns.findPod("sys")?.findType("Map", false)
    map := ["sys::K":resolvedKey,"sys::V":resolvedVal]
    return type?.parameterize(map.exclude { it == null })
  }
  
  private static const Str[] genArgs := ["sys::A","sys::B",
    "sys::C","sys::D","sys::E","sys::F","sys::G","sys::H"]
  
  // TODO: |A,B,C,D,E,F,G,H,I| is not assignable to |A,B,C,D,E,F,G,H,J| but, honestly, who cares
  IFanType? resolveFunc(FuncTypeParam[]? argTypes := null, CType? retType := null) {
    type := ns.findPod("sys")?.findType("Func", false)
    resolvedRet := retType == null ? resolveVoid : retType.resolvedType
    map := ["sys::R":resolvedRet]
    if (argTypes != null) {
      // TODO: Store variable names somehow
      if (argTypes.size > genArgs.size)
        argTypes = argTypes[0..<genArgs.size]
      map.addList(argTypes.map{ it.ctype.resolvedType }.exclude{ it == null }) |v,i| { genArgs[i] }
    }
    return type?.parameterize(map)
  }
  
  private IFanType? resolveItemType(Expr[] items, CType? valueType := null)
  {
    if (valueType != null) return valueType?.resolvedType
    isNull := |Expr e->Bool| { e.id == ExprId.nullLiteral }
    hasNull := items.any(isNull)
    types := items.exclude(isNull).map { resolvedType }.exclude { it == null }
    if (types.size == 0) return resolveObjQue
    init := types.pop()
    IFanType? res := types.reduce(init, #commonSuper.func.bind([this]))
    if (res == null) return resolveObjQue
    return hasNull ? res.toNullable : res
  }
  
  private IFanType? commonSuper(IFanType? first, IFanType? second)
  {
    if (first == null) return second
    if (second == null) return resolveObjQue
    line1 := lineage(first)
    line2 := lineage(second)
    Int i
    for(i = line1.size.min(line2.size)-1; i >= 0; i--) {
      if (line1[i].qname == line2[i].qname) break;
    }
    if (i < 0) return null
    res := ns.findType(line1[i].qname)
    if (res.qname == "sys::List") {
      firstElem := first.parametrization["sys::V"]
      secondElem := second.parametrization["sys::V"]
      commonElem := null
      if (firstElem != null && secondElem != null)
        commonElem = commonSuper(firstElem,secondElem)
      res = res.parameterize(["sys::V":commonElem]);
    }
    if (res.qname == "sys::Map" || res.qname == "sys::Func") {
      if (first.parametrization == second.parametrization)
        res = first
    }
    return first.isNullable||second.isNullable ? res.toNullable : res
  }
  
  **
  ** Return list of superclasses ordered from Obj to given type
  ** Mixins excluded
  ** 
  private IFanType[] lineage(IFanType type)
  {
    res := IFanType[type]
    while (true)
    {
      next := immediateSuper(res[-1])
      if (next == null || res.contains(next)) break
      res.add(next)
    }
    res.reverse
    if (res.peek.isMixin) res.pop
    return res
  }
  
  private IFanType? immediateSuper(IFanType? type)
  {
    if (type == null || type.qname == "sys::Obj") return null
    if (type.inheritance.size == 0) return resolveObj
    given := ns.findType(type.inheritance[0])
    if (given == null) return null
    if (given.isMixin) return resolveObj
    return given
  }
  
  once IFanType? resolveSlot() {ns.findPod("sys")?.findType("Slot", false)}
  once IFanType? resolveMethod() {ns.findPod("sys")?.findType("Method", false)}
  once IFanType? resolveField() {ns.findPod("sys")?.findType("Field", false)}
  once IFanType? resolveType() {ns.findPod("sys")?.findType("Type", false)}
  once IFanSlot? resolveWithSlot() { resolveObj?.slot("with", false) }
  IFanSlot? resolveCallSlot(IFanType? t) { (t ?: resolveFunc)?.slot("call", false) }
  
//////////////////////////////////////////////////////////////////////////
// Types
//////////////////////////////////////////////////////////////////////////
  
  CType? tryType()
  {
    s := startRule
    try return ctype
    catch (Err err)
    {
      if (err is IProblem) return ruleFailed(s)
      throw err
    }
  }
  
  CType ctype() { return mapType }
  
  CType mapType()
  {
    s := startRule
    t := listOrNullType
    if(matchAndConsume(Token.colon))
    {      
      keyType := t
      valType := mapType
      IFanType? resolvedType := resolveMap(keyType, valType)
      if (keyType.resolvedType == null && valType.resolvedType == null)
        resolvedType = null
      endRule(s)
      return MapType(s.start, s.end, keyType, valType, false, resolvedType)
    }
    return t
  }

  CType listOrNullType()
  {
    s := startRule
    base := nonNullType
    while(true)
    {
      CType? type := typeChain(base)
      if (type == null) break
      base = type
    } 
    return base
  }
  
  CType? typeChain(CType base)
  {
    s := startRule
    s.start = base.start
    if (matchAndConsume(Token.question))
    {
      endRule(s)
      return NullableType(s.start, s.end, base)
    }
    if (matchAndConsume(Token.lbracket,Token.rbracket))
    {
      endRule(s)
      return ListType(s.start, s.end, base, resolveList(base))
    }
    return null;
  }

  CType nonNullType()
  {
    switch(curt)
    {
      case Token.pipe: return funcType(false)
      case Token.lbracket: return bracketMapType
      default: return simpleType
    }
    throw err(curLoc, ProblemKind.parser_expectedType)
  }
  
  MapType bracketMapType()
  {
    s := startRule
    consume(Token.lbracket)
    t := mapType
    // TODO !!! FIXIT
    if (t isnot MapType) throw err(Loc(t.start, t.end, -1), ProblemKind.parser_invalidMapType)
    MapType mt := t
    keyType := mt.keyType
    valType := mt.valType
    consume(Token.rbracket)
    endRule(s)
    return MapType(s.start, s.end, keyType, valType, true, resolveMap(keyType, valType))
  }

  FuncType funcType(Bool isClosure, IFanType?[]? argsHint := null)
  {
    s := startRule
    consume(Token.pipe)
    CType? t
    FuncTypeParam[] formals := [,]
    if (matchAndConsume(Token.arrow))
    {
      if (curt !== Token.pipe) t = ctype
    }
    else
    {
      argNum := 0
      formals.add(formal(isClosure, argsHint?.getSafe(argNum++)))
      while(matchAndConsume(Token.comma)) formals.add(formal(isClosure, argsHint?.getSafe(argNum++)))
      if (matchAndConsume(Token.arrow))
      {
        if (curt !== Token.pipe) t = ctype
      }
    }
    consume(Token.pipe)
    endRule(s)
    return FuncType(s.start, s.end, formals, t, resolveFunc(formals, t))
  }

  FuncTypeParam formal(Bool isClosure, IFanType? typeHint := null)
  {
    s := startRule
    CType? type
    Id? name

    mark := pos
    if (!safeAndSilent |->| { type = ctype; name = id })
    {
      reset(mark)
      if (isClosure)
      {
        name = id
      }
      else
      {
        type = ctype
      }
    }

    endRule(s)
    return FuncTypeParam(s.start, s.end, type, name, isClosure? typeHint : null)
  }

  SimpleType simpleType()
  {
    s := startRule
    PodRef? podName
    if (match(Token.identifier, Token.doubleColon))
    {
      podName = podRef
      consume
    }
    typeName := typeRef(podName)
    endRule(s)
    return SimpleType(s.start, s.end, podName, typeName)
  }
   
//////////////////////////////////////////////////////////////////////////
// Error Handling
//////////////////////////////////////////////////////////////////////////
  
//  override protected Problem err(Loc loc, ProblemKind kind, Obj[] args := [,])
//  {
//    problem := Problem(Severity.err, kind, kind.compileMsg(args), 
//      loc.start, loc.end, loc.line, fName)
//    return problem
//  }
  
//  override protected Problem warn(Loc loc, ProblemKind kind, Obj[] args := [,])
//  {
//    problem := Problem(Severity.warn, kind, kind.compileMsg(args), 
//      loc.start, loc.end, loc.line, fName)
//    collector?.addProblem(problem)
//    return problem
//  }
    
//////////////////////////////////////////////////////////////////////////
// Parsing stuff
//////////////////////////////////////////////////////////////////////////

  protected Void verify(Token kind)
  {
    if (curt !== kind)
      throw err(curLoc, ProblemKind.parser_unexpectedToken, [kind.symbol, cur])
  }
  
  protected Bool noWs() {return !cur.whitespace} 
  protected Bool nl() {return cur.newline}   
  protected Bool match(Token t, Token? n := null)
  {
    if (curt !== t) return false
    if (n == null) return true
    return peekt === n    
  }
  protected Bool matchAny(Token[] kinds) {return kinds.any |Token t -> Bool| {return curt === t}}
  
  protected Bool matchAndConsume(Token t, Token? n := null)
  {
    if (match(t, n)){consume; if (n!=null) consume; return true}
    return false
  }

  protected TokenVal consume(Token? kind := null)
  {
    // verify if not null
    if (kind != null) verify(kind)

    // save the current we are about to consume for return
    result := cur

    // get the next token from the buffer, if pos is past numTokens,
    // then always use the last token which will be eof
    TokenVal? next;
    pos++;
    if (pos+1 < numTokens)
      next = tokens[pos+1]  // next peek is cur+1
    else
      next = tokens[numTokens-1]

    this.cur   = peek
    this.peek  = next
    this.curt  = cur.kind
    this.peekt = peek.kind

    return result
  }
  
  protected Void reset(Int pos)
  {
    //TODO: Ivan: someone more familiar with parsers should verify the fix (1 line below)
    pos = pos.min(tokens.size - 1)
    this.pos   = pos
    this.cur   = tokens[pos]  
    if (pos+1 < numTokens)
      this.peek  = tokens[pos+1]
    else
      this.peek  = tokens[pos]
    this.curt  = cur.kind
    this.peekt = peek.kind
  }

  protected TokenVal[] tokens       // tokens all read in
  protected TokenVal[] comments       // comments all read in
  protected Int numTokens           // number of tokens
  protected Int pos                 // offset into tokens for cur
  protected Int line(Int start) {return -1}                
  protected TokenVal? cur           // current token
  protected Token? curt             // current token type
  protected TokenVal? peek          // next token
  protected Token? peekt            // next token type

//////////////////////////////////////////////////////////////////////////
// Rule Handling
//////////////////////////////////////////////////////////////////////////
  
  protected Loc curLoc()
  {
    return Loc(cur.start, cur.end, cur.line)
  }
  
  protected Loc locOf(TokenVal tok)
  {
    return Loc(tok.start, tok.end, tok.line)
  }
  
  protected Loc locOfRange(Int fromToken, Int toToken := fromToken)
  {
    from := tokens[fromToken]
    to := tokens[toToken]
    return Loc(from.start, to.end, from.line)
  }
  
  protected RuleState startRule()  {return RuleState(cur.start, pos)}
  
  protected This endRule(RuleState s)
  {
    s.end = tokens[pos-1].end
    return this
  }
  
  protected Obj? ruleFailed(RuleState s)
  {
    reset(s.tokenPos)
    return null
  }
  
//////////////////////////////////////////////////////////////////////////
// Error Handling
//////////////////////////////////////////////////////////////////////////
  
  protected Problem err(Loc loc, ProblemKind kind, Obj[] args := [,])
  {
    problem := Problem(Severity.err, kind, kind.compileMsg(args), 
      loc.start, loc.end, loc.line, fName)
    return problem
  }
  
//////////////////////////////////////////////////////////////////////////
// Recovery
//////////////////////////////////////////////////////////////////////////
  
  protected This recoverTo(Token[] tokens)
  {
    while (!tokens.contains(curt))
    {
      if (curt === Token.eof) break
      consume
    }
    return this
  }
  
  protected Bool safe(|->| stuffToDo)
  {
    try stuffToDo.call()
    catch (Problem err)
    {
      collector?.addProblem(err)
      return false
    }
    return true
  }  
  
  protected Bool safeAndSilent(|->| stuffToDo)
  {
    try stuffToDo.call()
    catch (Problem err)
    {
      return false
    }
    return true
  }  
  
  protected This recoverToNl()
  {
    Int was := cur.line
    while (true)
    {
      Int line := cur.line
      if (nl && line>was) return this
      if (match(Token.semicolon) && line>was) {consume; return this}
      if (match(Token.rbrace) && line>was) return this
      if (match(Token.eof)) return this
      consume
    }
    return this
  }

}