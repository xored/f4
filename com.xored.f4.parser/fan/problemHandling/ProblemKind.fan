enum class ProblemKind
{
  unknown(""),
  
  // Lexer
  lexer_internalError("Internal lexer error"),
  
  lexer_unexpected("Unexpected symbol"),
  lexer_carriage("Carriage return \\r not allowed in source"),
  lexer_exponentDigit("Expected exponent digits"),
  lexer_expectedSec("Expected 'sec' in Duration literal"),
  lexer_expectedMin("Expected 'min' in Duration literal"),
  lexer_expectedDay("Expected 'day' in Duration literal"),
  lexer_invalidNumeric("Invalid numeric literal"),
  lexer_invalidHex("Invalid hex value for \\uxxxx"),
  lexer_expectingHex("Expecting hex number"),
  lexer_hexTooBig("Hex literal too big"),
  lexer_multiLineLeadingSpaces("Leading space in multi-line Str must be {0} spaces"),
  lexer_multiLineLeadingSpacesAndTabs("Leading space in multi-line Str must be {1} tabs and {0} spaces"),
  lexer_unclosedChar("Expecting ' close of char literal"),
  lexer_invalidEscape("Invalid escape sequence"),
  lexer_unexpectedEndOfQuoted("Unexpected end of quoted"),
  lexer_unexpectedEndOfDsl("Unexpected end of DSL"),
  
  lexer_interpolation_missingCurly("Unexpected end of quoted, missing }"),
  lexer_interpolation_missingExpr("Expected identifier after \$"),
  lexer_interpolation_missingId("Expected identifier"),
  
  // Parser
  parser_internalError("Internal parser error"),
  
  parser_unexpectedToken("Expected '{0}', not '{1}'"),
  parser_missingId("Expecting identifier"),
  
  parser_invalidAssignInFieldInit("Must use := for field initialization"),
  parser_invalidAssignInParamDef("Must use := for parameter default"),
  parser_invalidAssignInLocalDecl("Must use := for declaration assignments"),
  parser_invalidAssignInExpr("Must use = for expression assignments"),
  
  parser_extraGetter("Extra getter"),
  parser_extraSetter("Extra setter"),
  parser_expectedGetOrSet("Expected 'get' or 'set'"),
  
  parser_missingCatchOrFinally("Expecting catch or finally block"),
  parser_missingCaseOrDefault("Expected case or default statement"),
  
  parser_expectedThisOrSuperInCtorChain("Expecting this or super for constructor chaining"),
  parser_expectedExpr("Expected expression"),
  parser_expectedType("Expected identifier"),
  parser_expectedId("Expected type"),
  parser_expectedEndOfStmt("Expected end of statement: semicolon, newline, or end of block"),
  parser_invalidEmptyList("Invalid list literal; use '[,]' for empty Obj[] list"),
  parser_invalidMapType("Invalid map type"),
  
  parser_missedToken("Insert {0} to complete {1}"),
  parser_invalidToken("Expected {0}"),
  
  
  parser_fieldWithoutType("Type inference not supported for fields"),
  
  // Resolving
  parser_unresolvedType("Unresolved type: {0}"),
  parser_unresolvedVar("Unresolved variable"),
  parser_methodNotFound("Method {0} is not found")
  
  
  const Str msg
  
  private new make(Str msg)
  {
    this.msg = msg;
  }
  
  Str compileMsg(Obj[] args)
  {
    compiled := msg
    for (i:=0; i<args.size; i++)
    {
      if (compiled.contains("{$i}"))
      {
        compiled = compiled.replace("{$i}", args[i].toStr);
      }
    }
    return compiled
  }
}