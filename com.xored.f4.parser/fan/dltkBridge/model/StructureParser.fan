//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Alena Repina Feb 18, 2010 - Initial Contribution
//

**************************************************************************
** ParserScope
**************************************************************************
enum class ParserScope
{
  nowhere,
  insideUnit,
  insideUsings,
  insideType,
  insideSlot  
}
**************************************************************************
** ParserState
**************************************************************************
const class ParserState
{
  static const ParserState initial := make(0, ParserScope.nowhere)
  new make(Int pos, ParserScope scope)
  {
    this.pos = pos
    this.scope = scope
  }
  
  const Int pos
  const ParserScope scope
}

**************************************************************************
** TypeFound
**************************************************************************
const class TypeFound : Err { new make() : super("Type found") {} }

**************************************************************************
** SlotFound
**************************************************************************
const class SlotFound : Err { new make() : super("Slot found") {} }

**************************************************************************
** EOF
**************************************************************************
const class EOF : Err { new make() : super("Eof found") {} }

**************************************************************************
** StructureParser
**************************************************************************
class StructureParser
{  
  private TokenVal[] tokens       // tokens all read in
  private Int numTokens           // number of tokens
  private Int pos                 // offset into tokens for cur
  private TokenVal? prev           // current token
  private Token? prevt             // current token type
  private TokenVal? cur           // current token
  private Token? curt             // current token type
  private TokenVal? peek          // next token
  private Token? peekt            // next token type
  private StructureVisitor? visitor
  
  private ParserScope? scope
  private Str script
  
  new make(Str script, StructureVisitor? visitor := null)
  {
    this.script = script
    Tokenizer t := Tokenizer(script)
    this.tokens = [,]    
    try
      this.tokens = t.tokenize
    catch (Err err) {}
    this.numTokens = tokens.size
    reset(ParserState.initial)
    this.visitor = visitor
  }
  
  Void parseUnit()
  {    
    if (numTokens == 0) return
    enterUnit
    try {
      parseUsings
      parseTypes
    } 
    catch (EOF err){}
    finally {
      exitUnit
    }
  }
  
  Void parseUsings()
  {
    if (numTokens == 0) return
    Bool startWasHere := scope === ParserScope.nowhere
    enterUsings
    try
    {
      while (true)
      {
        try
        {
          recover
          usingDef
        }
        catch (TypeFound err){return}
        catch (EOF err)
        {
          if (!startWasHere) throw err
        }
      }
    }
    finally
    {
      exitUsings
    }
  }
  
  Void parseTypes()
  {
    if (numTokens == 0) return
    Bool isStartPoint := scope === ParserScope.nowhere
    while (true) {
      Int? end := null
      recover
      Obj[] res := typeDef
      Str name := res[0]
      Int flags := res[1]
      if (curt === Token.lbrace)
      {
        consume
        enterType
        if (flags.and(Flag.Enum) != 0) 
        {
          enumDefs(name)
        }
      }     
      try {        
        try
        {
          recover
        }
        catch (SlotFound e)
        {
          enterType
        }
        while (true)
        {
          slotDef(name)
          if (curt === Token.rbrace) end = cur.end
          recover
        }
      }
      catch (EOF err)
      {
        if (!isStartPoint) throw err
      }
      catch (TypeFound err)
      {
        continue
      }
      finally 
      {
        visitor?.endVisitType(end?:prev.end)
        exitType
      }
    }
  }
  
  private Void enterUnit()
  {
    scope = ParserScope.insideUnit
    visitor?.visitModule
  }
  
  private Void exitUnit()
  {
    scope = ParserScope.nowhere
    visitor?.endVisitModule(script.size)
  }  
  
  private Void enterUsings()
  {
    scope = ParserScope.insideUsings
  }
  
  private Void exitUsings()
  {
    scope = ParserScope.insideUnit
  }
  
  private Void enterType()
  {
    scope = ParserScope.insideType
  }
  
  private Void exitType()
  {
    scope = ParserScope.insideUnit
  }
  
  private Void enterSlot()
  {
    scope = ParserScope.insideSlot
  }
  
  private Void exitSlot()
  {
    scope = ParserScope.insideType
  }
  
////////////////////////////////////////////////////////////////////////////
//// 
////////////////////////////////////////////////////////////////////////////
  
  private Void usingDef()
  {
    Int start := cur.start
    Int end := cur.end
    consume(Token.usingKeyword)   
    Int nameStart := cur.start    
    // using [ffi]
    if (curt === Token.lbracket)
    {
      consume
      consume
      consume(Token.rbracket)
      end = prev.end     
    
      
    }    
    // using [ffi] pod
    consume
    end = prev.end
    while (curt === Token.dot) // allow dots in pod name
    {
      consume
      consume
      end = prev.end
    }    
    // using [ffi] pod::type
    if (curt === Token.doubleColon)
    {
      consume
      consume
      end = prev.end
      while (curt === Token.dollar) // allow $ in type name
      {
        consume
        if (curt == Token.identifier) consume
      }
      end = prev.end     
    }
      // using [ffi] pod::type as rename
    Bool haveAs := false
    asStart := 0
    asEnd := 0
    if (curt === Token.asKeyword)
    {
      consume
      asStart = cur.start
      asEnd = cur.end
      consume
      haveAs = true
    }
    visitor?.visitUsing(start, prev.end, script[nameStart..end], haveAs?script[asStart..asEnd]:null )
    endOfStmt
  }

  private Obj[] typeDef()
  {
    Int start := cur.start
    Int flags := flags()
    isMixin := false
    isEnum  := false

    if (curt === Token.mixinKeyword)
    {
      flags = flags.or(Flag.Mixin).or(Flag.Abstract)
      isMixin = true
      consume
    }
    else if (curt === Token.identifier && cur.val == "enum")
    {
      consume
      consume(Token.classKeyword)
      flags = flags.or(Flag.Enum).or(Flag.Const).or(Flag.Final)
      isEnum = true
    }
    else if (curt === Token.identifier && cur.val == "facet")
    {
      consume
      consume(Token.classKeyword)
      flags = flags.or(Flag.Facet).or(Flag.Const).or(Flag.Final)
      isEnum = true
    }
    else
    {
      consume(Token.classKeyword)
    }

    TokenVal name := consume
    Str[] superTypes := [,]
    if (curt === Token.colon)
    {
      // first inheritance type can be extends or mixin
      consume
      superTypes.add(ctype.text)
      // additional mixins
      while (curt === Token.comma)
      {
        consume
        superTypes.add(ctype.text)
      }
    }  
    visitor?.visitType(start, flags, name, superTypes)
    return [name.text, flags]
  }
  
  private Int flags(Bool normalize := true)
  {
    flags := 0
    protection := false
    for (done := false; !done; )
    {
      oldFlags := flags
      switch (curt)
      {
        case Token.abstractKeyword:  flags = flags.or(Flag.Abstract)
        case Token.constKeyword:     flags = flags.or(Flag.Const)
        case Token.finalKeyword:     flags = flags.or(Flag.Final)
        case Token.internalKeyword:  flags = flags.or(Flag.Internal);  protection = true
        case Token.nativeKeyword:    flags = flags.or(Flag.Native)
        case Token.newKeyword:       flags = flags.or(Flag.Ctor)
        case Token.onceKeyword:      flags = flags.or(Flag.Once)
        case Token.overrideKeyword:  flags = flags.or(Flag.Override)
        case Token.facetKeyword:     flags = flags.or(Flag.Facet)
        case Token.privateKeyword:   flags = flags.or(Flag.Private);   protection = true
        case Token.protectedKeyword: flags = flags.or(Flag.Protected); protection = true
        case Token.publicKeyword:    flags = flags.or(Flag.Public);    protection = true
        case Token.readonlyKeyword:  flags = flags.or(Flag.Readonly)
        case Token.staticKeyword:    flags = flags.or(Flag.Static)
        case Token.virtualKeyword:   flags = flags.or(Flag.Virtual)
        default:                     done = true
      }
      if (done) break
      oldFlags = flags
      consume
    }
    if (normalize && !protection) flags = flags.or(Flag.Public)

    return flags
  }
  
  private Void enumDefs(Str typeName/*TypeDef def*/)
  {
    if (curt === Token.rbrace) return
    enumDef(typeName)
    while (curt === Token.comma)
    {
      consume
      enumDef(typeName)
    }
    endOfStmt
  }

  **
  ** Enum definition:
  **   <enumDef>  :=  <id> ["(" <args> ")"]
  **
  private Void enumDef(Str typeName)
  {
    Int start := cur.start
    Int flags := Flag.Static.or(Flag.Public).or(Flag.Const)//.or(Flag.EnumVal)
    while (curt === Token.docComment) consume
    TokenVal name := consume
    visitor?.visitField(start, flags, typeName, name)

    if (curt === Token.lparen)
    {
      while (true) {
        if (curt === Token.rparen) {consume; break}
        if (curt === Token.eof) break
        consume
      }
    }
  }
  
  private Void slotDef(Str parentName)
  {
    startTok := cur
    Int flags := flags()
    // check if this is a Java style constructor, log error and parse like Fan sytle ctor
    if (curt === Token.identifier 
      && cur.val == parentName && peekt == Token.lparen)
    {
      name := consume
      return methodDef(startTok, flags.or(Flag.Ctor), null, name)
    }

    // check for inferred typed field
    // if = used rather than := then fieldDef() will log error
    if (curt === Token.identifier && (peekt === Token.defAssign || peekt === Token.assign))
    {
      name := consume
      return fieldDef(startTok, flags, null, name)
    }

    // check for constructor
    if (flags.and(Flag.Ctor) != 0)
    {
      name := consume
      return methodDef(startTok, flags, null, name)
    }

    // otherwise must be field or method
    type := ctype
    name := consume
    if (curt === Token.lparen)
    {
      return methodDef(startTok, flags, type, name)
    }
    else
    {
      return fieldDef(startTok, flags, type, name)
    }
  }

//////////////////////////////////////////////////////////////////////////
// FieldDef
//////////////////////////////////////////////////////////////////////////

  **
  ** Field definition:
  **   <fieldDef>     :=  <facets> <fieldFlags> [<type>] <id> [":=" <expr>]
  **                      [ "{" [<fieldGetter>] [<fieldSetter>] "}" ] <eos>
  **   <fieldFlags>   :=  [<protection>] ["readonly"] ["static"]
  **   <fieldGetter>  :=  "get" (<eos> | <block>)
  **   <fieldSetter>  :=  <protection> "set" (<eos> | <block>)
  **
  private Void fieldDef(TokenVal startTok,Int flags, 
    Word? type, TokenVal name)
  {
    visitor?.visitField(startTok.start, flags, type?.text, name)
    if (curt === Token.lbrace)
    {
      skipBlock
      visitor?.endVisitField(prev.end-1)
    }
    else
      visitor?.endVisitField(prev.end)
  }
  
  private Void methodDef(TokenVal startTok, 
    Int flags, Word? ret, TokenVal name)
  {
    consume(Token.lparen)
    Str[] parameterNames := [,]
    Str?[] parameterInitializers := [,]
    Str[] parameterTypes := [,]
    if (curt !== Token.rparen)
    {
      while (true)
      {        
        if (curt !== Token.comma && curt !== Token.rparen)
        {   
          hasDefault := false
          parameterTypes.add(ctype.text)
          if (curt !== Token.comma && curt !== Token.rparen)
          {
            parameterNames.add(consume.text)
            if (curt === Token.defAssign || curt === Token.assign)
            {
              // TODO: add actual initializer
              consume
              skipParamInit
              hasDefault = true
              parameterInitializers.add("default")
            }
          }
          if(!hasDefault)
          {
            parameterInitializers.add(null)
          }
        }
        if (curt === Token.comma)
          consume
        else break
      }
    }
    if (curt === Token.rparen) consume   
    visitor?.visitMethod(startTok.start, flags, ret?.text, name, 
      parameterTypes, parameterNames, parameterInitializers)
    if (curt === Token.lbrace)
    {
      skipBlock
      visitor?.endVisitMethod(prev.end-1)
    }
  }
  
  internal Word? ctype()
  {
    Word? t := null

    // Types can begin with:
    //   - id
    //   - [k:v]
    //   - |a, b -> r|
    if (curt === Token.identifier)
    {
      t = simpleType
    }
    else if (curt === Token.lbracket)
    {
      t = Word(consume(Token.lbracket))
      inner := ctype;
      if (inner != null) t.append(inner)
      t.appendToken(consume(Token.rbracket))
    }
    else if (curt === Token.pipe)
    {
      t = funcType
    }
    else
    { 
      // shouldn't happen!!
      throw UnexpTokenErr("Expecting type name, but was $cur", cur.line, cur.col)
    }

    // check for ? nullable
    if (curt === Token.question)
    {
      if (!cur.whitespace) {
        // ERROR
      }
      t.appendToken(consume(Token.question))
    }

    // trailing [] for lists
    while (curt === Token.lbracket && peekt === Token.rbracket)
    {
      t.appendToken(consume(Token.lbracket))
      t.appendToken(consume(Token.rbracket))
    }

    // check for type?:type map (illegal)
    if (curt === Token.elvis)
    { 
      // ERROR
      if (!cur.whitespace) {
        // ERROR
      }
      t.appendToken(consume)
      t.append(ctype)
      return t
      //throw Err("Map type cannot have nullable key type")
    }

    // check for ":" for map type
    if (curt === Token.colon)
    {
      t.appendToken(consume(Token.colon))
      t.append(ctype)
    }

    // check for ? nullable
    if (curt === Token.question)
    {
      if (!cur.whitespace) {
        // ERROR
      }
      t.appendToken(consume(Token.question))
    }

    return t
  }

  **
  ** Simple type signature:
  **   <simpleType>  :=  <id> ["::" <id>]
  **
  private Word simpleType()
  {
    Word type := Word.make(consume)

    // fully qualified
    if (curt === Token.doubleColon)
    { 
      consume
      type.appendText("::")
      type.appendToken(consume)
    }
    return type
  }

  **
  ** Method type signature:
  **   <funcType>       :=  "|" ("," | <funcTypeSig>) "|"
  **   <funcTypeSig>    :=  <formals> ["->" <type>]
  **   <formals>        :=  [<formal> ("," <formal>)*]
  **   <formal>         :=  <formFull> | <formalInferred> | <formalTypeOnly>
  **   <formalFull>     :=  <type> <id>
  **   <formalInferred> :=  <id>
  **   <formalTypeOnly> :=  <type>
  **
  private Word funcType()
  {
    // opening pipe
    Word ft := Word(consume(Token.pipe))

    // |,| is the empty method type
    try {
      if (curt === Token.comma)
      {
        ft.appendToken(consume)
        ft.appendToken(consume(Token.pipe))
        return ft
      }
      
      if(curt === Token.pipe)
        ft.appendText(" ")
  
      // params, must be one if no ->
      if (curt !== Token.arrow) //inferred = 
        ft.append(funcTypeFormal())
      while (curt === Token.comma)
      {
        ft.appendToken(consume)
        //inferred |= 
        ft.append(funcTypeFormal())
      }
  
      // if we see ?-> in a fttion type, that means |X?->ret|
      if (curt === Token.safeArrow)
      {
        ft.appendToken(consume)
        ft.append(ctype)
      }
  
      // optional arrow
      if (curt === Token.arrow)
      {
        ft.appendToken(consume)
        if (curt === Token.pipe) {
          throw UnexpTokenErr("Unexpected pipe",cur.line, cur.col)
        }
        ft.append(ctype)
      }      
    } catch(UnexpTokenErr err) {
      skipped := recoverFuncType
      if (skipped != null) ft.append(skipped)
    }

    // closing pipe
    ft.appendToken(consume(Token.pipe))
    return ft
  }

  private Word funcTypeFormal()
  {
    if (curt === Token.pipe) {
//      throw UnexpTokenErr("Unexpected pipe",cur.line, cur.col)
      return funcType()
    }
    if (curt === Token.identifier && peekt === Token.comma) {
      return Word(consume)
    }
    Word formal := ctype
    if (curt === Token.identifier) {
      formal.appendText(" ")
      formal.appendToken(consume)
    }
    return formal
  }
  
////////////////////////////////////////////////////////////////////////////
//// Recovery
//////////////////////////////////////////////////////////////////////////// 
  
  private Void recover()
  {
    while (true) {
      if (curt === Token.eof) throw EOF()
      if (curt === Token.lbrace && scope === ParserScope.insideType)
      {
        skipBlock
        exitSlot
      }
      Bool isUsing := isUsingStart
      Bool isType := isTypeStart
      Bool isSlot := isSlotStart
      switch (scope)
      {
        case ParserScope.nowhere : return
        case ParserScope.insideUsings : 
          if (isUsing) return
          else if (isType) throw TypeFound() 
        case ParserScope.insideUnit : 
          if (isType) return
          else if (isSlot) throw SlotFound()
        case ParserScope.insideSlot : 
          if (isSlot) return
          else if (isType) throw TypeFound()
        case ParserScope.insideType : 
          if (isSlot) return
          else if (isType) throw TypeFound()
      }
      consume
    }
  }
  
  private Void skipBlock(Bool searchForSlots := false)
  {
    enterSlot
    try
    {
      Int deep := 0;
      consume(Token.lbrace)
      deep++;
      while (deep > 0)
      {
        if (searchForSlots)
        {
          if (isFlagsStart)
            break
          if (isTrueSlotStart(true)) 
            break
        }
        tok := consume
        
        if (tok.kind === Token.eof) break
        switch (tok.kind)
        {
          case Token.lbrace: deep++
          case Token.rbrace: deep--
        }
      }
    }
    finally
    {
      exitSlot
    }
  }
  
  private Bool isSlotStart(Bool methodOnly := false)
  {
    ParserState saved := ParserState(pos,scope)
    try {
      flags := this.flags(false)
      if (flags.and(Flag.Ctor) != 0) {
        return curt === Token.identifier
      }        
      if (isTrueSlotStart(methodOnly, flags)) return true
      return false    
    } finally {
      reset(saved)
    }
  }
  
  private Bool isTrueSlotStart(Bool methodOnly := false, Int flags := 0)
  {
    if (   flags != 0
        || cur.newline 
        || prevt === Token.semicolon 
        || prevt === Token.rbrace
        || (prevt === Token.lbrace && scope == ParserScope.insideType))
    {
      if (!methodOnly && curt === Token.identifier 
          && (peekt === Token.defAssign || peekt === Token.assign))
        return true
      if (curt === Token.identifier
            || curt === Token.pipe
            || curt === Token.lbracket)
      {
        try
        {
          t := ctype
          if (!methodOnly) {
            return curt === Token.identifier
          }          
          return curt === Token.identifier 
              && peekt === Token.lparen
        } 
        catch
        {
          return false
        }    
      }
    }
    return false
  }
  
  private Bool isTypeStart()
  {
    ParserState saved := ParserState(pos,scope)
    try
    {
      if (isFlagsStart)
      {
        flags
      }
      switch (curt)
      {
        case Token.classKeyword: return true
        case Token.mixinKeyword: return true
        case Token.identifier: return cur.val == "enum" || cur.val == "facet"
      }
      return false
    } finally {
      reset(saved)
    }
  }
  
  private Bool isUsingStart()
  {
    return curt === Token.usingKeyword
  }
  
//  private Bool isDocStart()
//  {
//    return curt === Token.docComment
//  }
//  
//  private Bool isFacetStart()
//  {
//    return cur.newline && curt === Token.at
//  }
  
  private Bool isFlagsStart()
  {
    switch (curt)
    {
      case Token.abstractKeyword:  return true 
      case Token.constKeyword:     return true
      case Token.finalKeyword:     return true
      case Token.internalKeyword:  return true
      case Token.nativeKeyword:    return true
      case Token.facetKeyword:     return true
      case Token.newKeyword:       return true
      case Token.onceKeyword:      return true
      case Token.overrideKeyword:  return true
      case Token.privateKeyword:   return true
      case Token.protectedKeyword: return true
      case Token.publicKeyword:    return true
      case Token.readonlyKeyword:  return true
      case Token.staticKeyword:    return true
      case Token.virtualKeyword:   return true
      default:                     return false
    }
  }
  
  private Void skipParamInit()
  {
    Int deep := 1
    while (true) {
      switch (curt)
      {
        case Token.comma: if (deep == 1) return;
        case Token.lparen: deep++
        case Token.rparen: deep--;if (deep == 0) return;
        case Token.lbracket: deep++
        case Token.rbracket: deep--
        case Token.semicolon: return;
        case Token.rbrace: return;
        case Token.eof: return;
      }
      consume
    }
  }
  
  private Word? recoverFuncType()
  {
    Word? skipped := null
    while (true) {
      if (curt === Token.pipe) break
      if (curt === Token.eof) break
      if (skipped == null) skipped = Word(consume)
      else skipped.appendToken(consume)
    }
    return skipped;
  }
  
////////////////////////////////////////////////////////////////////////////
//// Tokens
//////////////////////////////////////////////////////////////////////////// 
  
  private Void verify(Token kind)
  {
    if (curt !== kind)
      throw UnexpTokenErr("Expected '$kind.symbol', not '$cur'",cur.line, cur.col);
  }

  private TokenVal consume(Token? kind := null)
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

    this.prev  = cur
    this.cur   = peek
    this.peek  = next
    this.prevt = prev.kind
    this.curt  = cur.kind
    this.peekt = peek.kind

    return result
  }

  private Bool endOfStmt(Str? errMsg := "Expected end of statement: semicolon, newline, or end of block; not '$cur'")
  {
    if (cur.newline) return true
    if (curt === Token.semicolon) {
      consume; 
      return true }
    if (curt === Token.rbrace){
      return true}
    if (curt === Token.eof) return true
    throw EndOfStmtErr(errMsg, cur.line, cur.col)
  }

  private Void reset(ParserState state)
  {        
    if (numTokens == 0) return
    this.pos   = state.pos
    this.scope   = state.scope
    
    this.cur   = tokens[pos]    
    
    if (pos-1 >= 0)
      this.prev  = tokens[pos-1]
    else
      this.prev  = tokens[numTokens-1]
    
    if (pos+1 < numTokens)
      this.peek  = tokens[pos+1]
    else
      this.peek  = tokens[pos]
    
    this.prevt = prev.kind
    this.curt  = cur.kind
    this.peekt = peek.kind
  }
}
