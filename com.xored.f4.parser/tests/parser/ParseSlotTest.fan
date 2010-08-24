using f4model

class ParseSlotTest : Test
{
  Void testSlot01()
  {
    verifyTypeDef(
    "class Test
     {
       Int slot
     }", |t|
      {        
        FieldDef f := t.slots[0]
        verifyEq(f.name.text, "slot")
        verifyEq(f.ctype.resolvedType.qname, "sys::Int")
        verify(f.modifiers.isEmpty)
        verifyNull(f.init)
        verifyNull(f.getter)
        verifyNull(f.setter)
      })
  }
  
  Void testSlot02()
  {
    verifyTypeDef(
    "class Test
     {
       virtual abstract const Int slot := 0
       {
         get
         {
           return *slot
         }
         set
         {
           *slot=it
         }
       }
     }", |t|
      {        
        FieldDef f := t.slots[0]
        verifyEq(f.name.text, "slot")
        verifyEq(f.ctype.resolvedType.qname, "sys::Int")
        verify(f.modifiers.has(ModifierId.Abstract))
        verify(f.modifiers.has(ModifierId.Const))
        verify(f.init is Literal)
        verifyNotNull(f.getter)
        verifyNotNull(f.setter)
      })
  }
  
  Void testSlot03()
  {
    verifyTypeDef(
    "class Test
     {
       Int method()
       {
       }
     }", |t|
      {
        MethodDef m := t.slots[0]
        verifyEq(m.name.text, "method")
        verifyEq(m.returnType.resolvedType.qname, "sys::Int")
        verify(m.params.isEmpty)
        verify(m.modifiers.isEmpty)
        verifyNull(m.ctorChain)
        verifyNotNull(m.body)
      })
  }
  
  Void testSlot04()
  {
    verifyTypeDef(
    "class Test
     {  
       new make(Int start,Int end,Str? id:=null):super(start,end)
       {
         this.id=id
       }
     }", |t|
      {
        MethodDef m := t.slots[0]
        verifyEq(m.name.text, "make")
        verifyNull(m.returnType)
        verify(m.modifiers.has(ModifierId.Ctor))
        verifyNotNull(m.body)
        
        verifyNotNull(m.ctorChain)
        verify(m.ctorChain.target is SuperRef)
        verifyEq(m.ctorChain.args.size, 2)
        
        verifyEq(m.params.size, 3)
        verifyEq(m.params[0].name.text, "start")
        verifyEq(m.params[0].ctype.resolvedType.qname, "sys::Int")
        verifyEq(m.params[1].name.text, "end")
        verifyEq(m.params[1].ctype.resolvedType.qname, "sys::Int")
        verifyEq(m.params[2].name.text, "id")
      })
  }
  
  Void testSlot05()
  {
    verifyTypeDef(
    "class Test
     {  
       static {}
     }", |t|
      {
        StaticInit s := t.slots[0]
        verifyNotNull(s.body)
      })
  }
  
//////////////////////////////////////////////////////////////////////////
// Utils
//////////////////////////////////////////////////////////////////////////
  IFanPod testPod := FakeFanPod.fake("test")
  IFanNamespace testNs := FakeFanNamespace(testPod)
  
  Void verifyTypeDef(Str script, |TypeDef def| check)
  {
    verifyRule(script, check, Parser#typeDef)
  }
  
  Void verifyRule(Str script, |Node node| check, 
    Method parserMethod := Parser#cunit)
  {
    p := Parser(script, testNs)
    Node node := parserMethod.call(p)
    
    verifyEq(node.start, 0)
    verifyEq(node.end, script.size-1)
    check.call(node)
  }
}