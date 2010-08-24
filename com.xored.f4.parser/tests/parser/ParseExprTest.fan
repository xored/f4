using f4model

class ParseExprTest : Test
{
//////////////////////////////////////////////////////////////////////////
// Literals
//////////////////////////////////////////////////////////////////////////
  
  Void testNullLiteral()
  {
    verifyExpr(ExprId.nullLiteral, "null", |Literal l|
      {
        verifyEq(l.val, null)
        verifyEq(l.resolvedType.qname, "sys::Obj")
      })
  }
  
  Void testBoolLiteral()
  {
    verifyExpr(ExprId.boolLiteral, "true", |Literal l|
      {
        verifyEq(l.val, true)
        verifyEq(l.resolvedType.qname, "sys::Bool")
      })    
    verifyExpr(ExprId.boolLiteral, "false", |Literal l|
      {
        verifyEq(l.val, false)
        verifyEq(l.resolvedType.qname, "sys::Bool")
      })   
  }
  
  Void testIntLiteral()
  {
    verifyExpr(ExprId.intLiteral, "1", |Literal l|
      {
        verifyEq(l.val, 1)
        verifyEq(l.resolvedType.qname, "sys::Int")
      })   
    verifyExpr(ExprId.intLiteral, "123_456", |Literal l|
      {
        verifyEq(l.val, 123_456)
        verifyEq(l.resolvedType.qname, "sys::Int")
      }) 
    verifyExpr(ExprId.intLiteral, "493859850", |Literal l|
      {
        verifyEq(l.val, 493859850)
        verifyEq(l.resolvedType.qname, "sys::Int")
      }) 
    verifyExpr(ExprId.intLiteral, "0xabcd_1234_fedc_9876", |Literal l|
      {
        verifyEq(l.val, 0xabcd_1234_fedc_9876)
        verifyEq(l.resolvedType.qname, "sys::Int")
      })  
  } 
  
  Void testFloatLiteral()
  {
    verifyExpr(ExprId.floatLiteral, "1f", |Literal l|
      {
        verifyEq(l.val, 1f)
        verifyEq(l.resolvedType.qname, "sys::Float")
      }) 
    verifyExpr(ExprId.floatLiteral, "1e10f", |Literal l|
      {
        verifyEq(l.val, 1e10f)
        verifyEq(l.resolvedType.qname, "sys::Float")
      }) 
    verifyExpr(ExprId.floatLiteral, "1.234_567f", |Literal l|
      {
        verifyEq(l.val, 1.234_567f)
        verifyEq(l.resolvedType.qname, "sys::Float")
      }) 
    verifyExpr(ExprId.floatLiteral, ".1f", |Literal l|
      {
        verifyEq(l.val, .1f)
        verifyEq(l.resolvedType.qname, "sys::Float")
      }) 
  }
  
  Void testDecimalLiteral()
  {
    verifyExpr(ExprId.decimalLiteral, "3d", |Literal l|
      {
        verifyEq(l.val, 3d)
        verifyEq(l.resolvedType.qname, "sys::Decimal")
      }) 
    verifyExpr(ExprId.decimalLiteral, "4.02e14d", |Literal l|
      {
        verifyEq(l.val, 4.02e14d)
        verifyEq(l.resolvedType.qname, "sys::Decimal")
      })
  }
  
  Void testStrLiteral()
  {
    verifyExpr(ExprId.strLiteral, "\"\"", |Literal l|
      {
        verifyEq(l.val, "")
        verifyEq(l.resolvedType.qname, "sys::Str")
      })
    verifyExpr(ExprId.strLiteral, "\"x\"", |Literal l|
      {
        verifyEq(l.val, "x")
        verifyEq(l.resolvedType.qname, "sys::Str")
      })
    verifyExpr(ExprId.strLiteral, "\"x\\ny\"", |Literal l|
      {
        verifyEq(l.val, "x\ny")
        verifyEq(l.resolvedType.qname, "sys::Str")
      })
  }
  
  Void testDurationLiteral()
  {
    verifyExpr(ExprId.durationLiteral, "0ns", |Literal l|
      {
        verifyEq(l.val, 0ns)
        verifyEq(l.resolvedType.qname, "sys::Duration")
      })
    verifyExpr(ExprId.durationLiteral, "1ms", |Literal l|
      {
        verifyEq(l.val, 1ms)
        verifyEq(l.resolvedType.qname, "sys::Duration")
      })
    verifyExpr(ExprId.durationLiteral, "1.2sec", |Literal l|
      {
        verifyEq(l.val, 1.2sec)
        verifyEq(l.resolvedType.qname, "sys::Duration")
      })
    verifyExpr(ExprId.durationLiteral, "1.5min", |Literal l|
      {
        verifyEq(l.val, 1.5min)
        verifyEq(l.resolvedType.qname, "sys::Duration")
      })
    verifyExpr(ExprId.durationLiteral, "1hr", |Literal l|
      {
        verifyEq(l.val, 1hr)
        verifyEq(l.resolvedType.qname, "sys::Duration")
      })
    verifyExpr(ExprId.durationLiteral, "0.5day", |Literal l|
      {
        verifyEq(l.val, 0.5day)
        verifyEq(l.resolvedType.qname, "sys::Duration")
      })
  }
  
  Void testUriLiteral()
  {
    verifyExpr(ExprId.uriLiteral, "`x`", |Literal l|
      {
        verifyEq(l.val, `x`)
        verifyEq(l.resolvedType.qname, "sys::Uri")
      })    
    verifyExpr(ExprId.uriLiteral, "`http://fantom/path/file?query#frag`", |Literal l|
      {
        verifyEq(l.val, `http://fantom/path/file?query#frag`)
        verifyEq(l.resolvedType.qname, "sys::Uri")
      })    
  }
  
  Void testTypeLiteral01()
  {
    verifyExpr(ExprId.typeLiteral, "sys::Str#", |TypeLiteral l| 
      {
        SimpleType t := l.ctype        
        verifyEq(t.start, 0)
        verifyEq(t.end, 7)
        
        verifyEq(t.podName.start, 0)
        verifyEq(t.podName.end, 2)
        verifyEq(t.podName.text, "sys")
        verifyEq(t.podName.modelPod.name, "sys")
        
        verifyEq(t.typeName.start, 5)
        verifyEq(t.typeName.end, 7)
        verifyEq(t.typeName.text, "Str")
        verifyEq(t.typeName.modelType.qname, "sys::Str")
        
        verifyEq(l.resolvedType.qname, "sys::Type")
      })
  }
  
  Void testSlotLiteral01()
  {
    verifyExpr(ExprId.slotLiteral, "Str#defVal", |SlotLiteral l| 
      {
        SimpleType t := l.ctype        
        verifyEq(t.start, 0)
        verifyEq(t.end, 2)
        
        verifyEq(t.typeName.start, 0)
        verifyEq(t.typeName.end, 2)
        verifyEq(t.typeName.text, "Str")
        verifyEq(t.typeName.modelType.qname, "sys::Str")
        
        verifyEq(l.slot.start, 4)
        verifyEq(l.slot.end, 9)
        verifyEq(l.slot.text, "defVal")
        verifyEq(l.slot.modelSlot.qname, "sys::Str.defVal")
        
        verifyEq(l.resolvedType.qname, "sys::Slot")
      })
  }
  
  Void testRangeLiteral()
  {
    verifyExpr(ExprId.rangeLiteral, "0..1", |RangeLiteral l|
      {
        verifyEq(l.startExpr.id, ExprId.intLiteral)
        verifyEq(l.endExpr.id, ExprId.intLiteral)
        verifyEq(l.exclusive, false)
        verifyEq(l.resolvedType.qname, "sys::Range")
      })  
    verifyExpr(ExprId.rangeLiteral, "0..<2", |RangeLiteral l|
      {
        verifyEq(l.startExpr.id, ExprId.intLiteral)
        verifyEq(l.endExpr.id, ExprId.intLiteral)
        verifyEq(l.exclusive, true)
        verifyEq(l.resolvedType.qname, "sys::Range")
      })  
  }
  
  Void testListLiteral()
  { 
    verifyExpr(ExprId.listLiteral, "Str[,]", |ListLiteral l|
      {
        verifyEq(l.items.size, 0)
        verifyEq(l.resolvedType.qname, "sys::List")
      })
    verifyExpr(ExprId.listLiteral, "[0, 1, ]", |ListLiteral l|
      {
        verifyEq(l.items.size, 3)
        verifyEq(l.items[0].id, ExprId.intLiteral)
        verifyEq(l.items[1].id, ExprId.intLiteral)
        verifyEq(l.items[2].id, ExprId.noneLiteral)
        verifyEq(l.resolvedType.qname, "sys::List")
      })
    verifyExpr(ExprId.listLiteral, "[]", |ListLiteral l|
      {
        verifyEq(l.items.size, 0)
        verifyEq(l.resolvedType.qname, "sys::List")
      })
    verifyExpr(ExprId.listLiteral, "[,]", |ListLiteral l|
      {
        verifyEq(l.items.size, 0)
        verifyEq(l.resolvedType.qname, "sys::List")
      })
  }
  
  Void testMapLiteral()
  {
    verifyExpr(ExprId.mapLiteral, "[0:\"zero\", 1:\"one\", ]", |MapLiteral l|
      {
        verifyEq(l.keys.size, 3)
        verifyEq(l.vals.size, 3)
        verifyEq(l.keys[0].id, ExprId.intLiteral)
        verifyEq(l.vals[0].id, ExprId.strLiteral)
        verifyEq(l.keys[1].id, ExprId.intLiteral)
        verifyEq(l.vals[1].id, ExprId.strLiteral)
        verifyEq(l.keys[2].id, ExprId.noneLiteral)
        verifyEq(l.vals[2].id, ExprId.noneLiteral)
        verifyEq(l.resolvedType.qname, "sys::Map")
      })
    
    verifyExpr(ExprId.mapLiteral, "[:]", |MapLiteral l|
      {
        verifyEq(l.keys.size, 0)
        verifyEq(l.vals.size, 0)
        verifyEq(l.resolvedType.qname, "sys::Map")
      })
  }
  
//////////////////////////////////////////////////////////////////////////
// References
//////////////////////////////////////////////////////////////////////////
  
  Void testReferences()
  {    
    verifyExpr(ExprId.fieldRef, "x", |SlotRef field|
    {
      verifyEq(field.text, "x")
      verifyEq(field.modelSlot.qname, "test::Test.x")
      verifyEq(field.resolvedType.qname, "sys::Str")      
    }, Parser#termBase)
    
    verifyExpr(ExprId.methodRef, "foo", |SlotRef method|
    {
      verifyEq(method.text, "foo")
      verifyEq(method.modelSlot.qname, "test::Test.foo")
      verifyEq(method.resolvedType.qname, "sys::Int")     
    }, Parser#termBase)
    
    verifyExpr(ExprId.unresolvedRef, "xyz", |UnresolvedRef ref|
    {
      verifyEq(ref.text, "xyz")
      verifyEq(ref.resolvedType, null)     
    }, Parser#termBase)
    
    verifyExpr(ExprId.methodVarRef, "var", |MethodVarRef local|
    {
      verifyEq(local.text, "var")
      verifyEq(local.resolvedType.qname, "sys::Bool")    
    }, Parser#termBase)
    
    verifyExpr(ExprId.thisRef, "this", |ThisRef ref|
    {
      verifyEq(ref.resolvedType.qname, "test::Test")     
    }, Parser#termBase)
    
    verifyExpr(ExprId.superRef, "super", |SuperRef ref|
    {
      verifyEq(ref.resolvedType.qname, "sys::Obj")   
    }, Parser#termBase)
    
    verifyExpr(ExprId.superRef, "Err.super", |SuperRef ref|
    {
      verifyEq(ref.resolvedType.qname, "sys::Err")   
    }, Parser#termBase)
  }
  
//  TODO itRef
  
//////////////////////////////////////////////////////////////////////////
// Invocation
//////////////////////////////////////////////////////////////////////////
  
  Void testInvocation()
  {   
    verifyExpr(ExprId.staticInvoke, "x.trim", |InvokeExpr expr|
      {verifyEq(expr.resolvedType.qname, "sys::Str")})
    verifyExpr(ExprId.staticSafeInvoke, "x?.trim", |InvokeExpr expr|
      {verifyEq(expr.resolvedType.qname, "sys::Str")})
    verifyExpr(ExprId.dynamicInvoke, "x->trim", |InvokeExpr expr|
      {verifyEq(expr.resolvedType.qname, "sys::Str")})
    verifyExpr(ExprId.dynamicSafeInvoke, "x?->trim", |InvokeExpr expr|
      {verifyEq(expr.resolvedType.qname, "sys::Str")})
  }
  
//////////////////////////////////////////////////////////////////////////
// Type check
//////////////////////////////////////////////////////////////////////////
 
  Void testTypeCheckExpr()
  {
    verifyExpr(ExprId.asExpr, "x as Int", |TypeCheckExpr e| 
      {verifyEq(e.resolvedType.qname, "sys::Int")})
    verifyExpr(ExprId.isExpr, "x is Int", |TypeCheckExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Bool")})
    verifyExpr(ExprId.isnotExpr, "x isnot Int", |TypeCheckExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Bool")})
    verifyExpr(ExprId.coerce, "(Int) x", |TypeCheckExpr e| 
      {verifyEq(e.resolvedType.qname, "sys::Int")})
  }

//////////////////////////////////////////////////////////////////////////
// Ternary
//////////////////////////////////////////////////////////////////////////
  
  Void testIfExpr()
  {
    verifyExpr(ExprId.ternary, "var ? x : foo", |TernaryExpr e| 
      {verifyEq(e.resolvedType.qname, "sys::Obj")})
    verifyExpr(ExprId.elvis, "var ?: throw Err()", |BinaryExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Obj")})
  }
  
//////////////////////////////////////////////////////////////////////////
// Assign
//////////////////////////////////////////////////////////////////////////

  Void testAssignExpr()
  {
    verifyExpr(ExprId.assign, "p = foo", |BinaryExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Int")})
    verifyExpr(ExprId.assignPlus, "p += foo", |BinaryExpr e|       
      {verifyEq(e.resolvedType.qname, "sys::Int")})
    verifyExpr(ExprId.assignMinus, "p -= foo", |BinaryExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Int")})
    verifyExpr(ExprId.assignMult, "p *= foo", |BinaryExpr e|       
      {verifyEq(e.resolvedType.qname, "sys::Int")})
    verifyExpr(ExprId.assignDiv, "p /= foo", |BinaryExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Int")})
    verifyExpr(ExprId.assignMod, "p %= foo", |BinaryExpr e|       
      {verifyEq(e.resolvedType.qname, "sys::Int")})
  }
  
//////////////////////////////////////////////////////////////////////////
// BinaryExpr
//////////////////////////////////////////////////////////////////////////
  
  Void testCondExpr()
  {
    verifyExpr(ExprId.or, "x || y", |BinaryExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Bool")})
    verifyExpr(ExprId.and, "x && y", |BinaryExpr e|       
      {verifyEq(e.resolvedType.qname, "sys::Bool")})
    
    verifyExpr(ExprId.eq, "x == y", |BinaryExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Bool")})
    verifyExpr(ExprId.notEq, "x != y", |BinaryExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Bool")})
    verifyExpr(ExprId.same, "x === y", |BinaryExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Bool")})
    verifyExpr(ExprId.notSame, "x !== y", |BinaryExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Bool")})
    
    verifyExpr(ExprId.lt, "x < y", |BinaryExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Bool")})
    verifyExpr(ExprId.le, "x <= y", |BinaryExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Bool")})
    verifyExpr(ExprId.gt, "x > y", |BinaryExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Bool")})
    verifyExpr(ExprId.ge, "x >= y", |BinaryExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Bool")})
  }

//////////////////////////////////////////////////////////////////////////
// Shortcuts
//////////////////////////////////////////////////////////////////////////
  
  Void testShortcutExpr()
  {
    verifyExpr(ExprId.plus, "p+p", |BinaryExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Int")})
    verifyExpr(ExprId.minus, "p-p", |BinaryExpr e|       
      {verifyEq(e.resolvedType.qname, "sys::Int")})
    verifyExpr(ExprId.mult, "p*p", |BinaryExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Int")})
    verifyExpr(ExprId.div, "p/p", |BinaryExpr e|       
      {verifyEq(e.resolvedType.qname, "sys::Int")})
    verifyExpr(ExprId.mod, "p%p", |BinaryExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Int")})
    verifyExpr(ExprId.cmp, "p<=>p", |BinaryExpr e|       
      {verifyEq(e.resolvedType.qname, "sys::Int")})
    
    verifyExpr(ExprId.unaryPlus, "+p", |UnaryExpr e|       
      {verifyEq(e.resolvedType.qname, "sys::Int")})
    verifyExpr(ExprId.unaryMinus, "-p", |UnaryExpr e|       
      {verifyEq(e.resolvedType.qname, "sys::Int")})
    verifyExpr(ExprId.inc, "++p", |UnaryExpr e|       
      {verifyEq(e.resolvedType.qname, "sys::Int")})
    verifyExpr(ExprId.dec, "--p", |UnaryExpr e|       
      {verifyEq(e.resolvedType.qname, "sys::Int")})
    verifyExpr(ExprId.postfixInc, "p++", |UnaryExpr e|       
      {verifyEq(e.resolvedType.qname, "sys::Int")})
    verifyExpr(ExprId.postfixDec, "p--", |UnaryExpr e|       
      {verifyEq(e.resolvedType.qname, "sys::Int")})
    
    verifyExpr(ExprId.index, "x[0]", |BinaryExpr e|       
      {verifyEq(e.resolvedType.qname, "sys::Int")})    
    verifyExpr(ExprId.index, "x[0..-1]", |BinaryExpr e|       
      {verifyEq(e.resolvedType.qname, "sys::Str")})
  }

//////////////////////////////////////////////////////////////////////////
// Misc
////////////////////////////////////////////////////////////////////////// 
  
  Void testClosure()
  {
    verifyExpr(ExprId.closure, "|->| {}", |Closure e|  
      {verifyEq(e.resolvedType.qname, "sys::Func")})    
  }
  
  Void testClosure02()
  {
    verifyExpr(ExprId.staticInvoke, "srcDir.list.any |File src->Bool| {}", 
      |InvokeExpr e| {})  
  }
  
  Void testCallExpr()
  {
    verifyExpr(ExprId.call, "foo(3)", |CallExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Int")})    
  }
  
  Void testDslExpr()
  {
    verifyExpr(ExprId.dsl, "Str <|test|>", |DslExpr e|  
      {verifyEq(e.resolvedType.qname, "sys::Str")})    
  }
  
  Void testStaticTargetExpr()
  {
    verifyExpr(ExprId.staticInvoke, "Str.defVal", |InvokeExpr e|  
      {
        verifyEq(e.resolvedType.qname, "sys::Str")
        verifyEq(e.callee.id, ExprId.staticTarget)        
      })    
  }
  
  Void testParenExpr()
  {
    verifyExpr(ExprId.paren, "(x)", |Expr e|  
      {
        verifyEq(e.resolvedType.qname, "sys::Str")       
      })    
  }
  
  Void testStorage()
  {
    verifyExpr(ExprId.storage, "*x", |StorageExpr e|  
      {
        verifyEq(e.resolvedType.qname, "sys::Str")       
      })    
  }
  
  Void testLocalDef()
  {
    verifyExpr(ExprId.localDef, "Bool var", |LocalDef e|  
      {
        verifyEq(e.resolvedType.qname, "sys::Bool")       
      }, Parser#exprOrLocalDef) 
    verifyExpr(ExprId.localDef, "var := true", |LocalDef e|  
      {
        verifyEq(e.resolvedType.qname, "sys::Bool")       
      }, Parser#exprOrLocalDef)
    verifyExpr(ExprId.localDef, "Bool? var", |LocalDef e|  
      {
        verifyEq(e.resolvedType.qname, "sys::Bool")       
      }, Parser#exprOrLocalDef)     
  }
  
// TODO exprList
// not
  
  Void test()
  {
    verifyExpr(ExprId.listLiteral, "Test[,]", |ListLiteral l|
      {
        verifyEq(l.items.size, 0)
        verifyEq(l.resolvedType.qname, "sys::List")
      })
  }

//////////////////////////////////////////////////////////////////////////
// Utils
//////////////////////////////////////////////////////////////////////////
   
  IFanField testField := FakeFanField.fake("x", "test::Test", "Str")
  IFanParam testParam := FakeFanParam.fake("p", "test::Int", false)
  IFanMethod testMethod := FakeFanMethod.fake("foo", "test::Test", "Int", [testParam])
  IFanType testType := FakeFanType.fake("Test", "test", [,], [testField, testMethod])
  IFanPod testPod := FakeFanPod.fake("test", [testType])
  IFanNamespace testNs := FakeFanNamespace(testPod)
  
  SlotDef f := FieldDef(0,0,[,],[,],Modifiers(0,0,[,]),
        SimpleType(0,0,null,TypeRef(0,0,"Str",testNs.findPod("sys").findType("Str"))),
        Id(0,0,"x"),null,null,null)
  
  ParamDef param := ParamDef(0,0, SimpleType(0,0,null,
      TypeRef(0,0,"Int",testNs.findPod("sys").findType("Int"))),
        Id(0,0,"p"),null)
  
  SlotDef m := MethodDef(0,0,[,],[,],Modifiers(0,0,[,]),
        SimpleType(0,0,null,TypeRef(0,0,"Int",testNs.findPod("sys").findType("Int"))),
        Id(0,0,"foo"),[param],null,null)
    
  TypeDef def := TypeDef(0,0,[,],[,],Modifiers(0,0,[,]),Id(0,0,"Test"),[,], [f,m])
  
  LocalDef local := LocalDef(0,0, SimpleType(0,0,null,
      TypeRef(0,0,"Bool",testNs.findPod("sys").findType("Bool"))),
        Id(0,0,"var"),null)
  
  Void verifyExpr(ExprId expectedId, Str script, 
    |Expr expr| check, Method parserMethod := Parser#expr)
  {
    p := Parser(script, testNs)
    p.enterTypeDef(def.name.text)
    p.enterFunc([param])
    p.addLocal(local)
    Expr expr := parserMethod.call(p)
    
    verifyEq(expr.id, expectedId)
    verifyEq(expr.start, 0)
    verifyEq(expr.end, script.size-1)
    check.call(expr)
  }
}