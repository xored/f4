using f4model

class ParseTypeTest : Test
{
  Void testType01()
  {
    verifyTypeDef("class Test {}", |t|
      {
        verifyEq(t.name.text, "Test")
        verify(t.slots.isEmpty)
        verify(t.modifiers.isEmpty)
      })
  }
  
  Void testType02()
  {
    verifyTypeDef("abstract const abstract class Test {}", |t|
      {
        verifyEq(t.name.text, "Test")
        verify(t.slots.isEmpty)
        verify(t.modifiers.has(ModifierId.Abstract))
        verify(t.modifiers.has(ModifierId.Const))
      })
  }
  
  Void testInheritance()
  {
    verifyTypeDef("class Test : Obj, Int {}", |t|
      {
        verifyEq(t.name.text, "Test")      
        verify(t.slots.isEmpty)
        verifyEq(t.inheritance.size, 2)
        verifyEq(t.inheritance[0].resolvedType.qname, "sys::Obj")
        verifyEq(t.inheritance[1].resolvedType.qname, "sys::Int")
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