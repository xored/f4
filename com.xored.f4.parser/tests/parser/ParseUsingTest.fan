using f4model

class ParseUsingTest : Test
{
  Void testUsingPod()
  {
    verifyUsing("using sys", |u|
      {
        verifyEq(u.podName.modelPod.name, "sys")
      })
  }
  
  Void testUsingPodType()
  {
    verifyUsing("using sys::Pod", |u|
      {
        verifyEq(u.podName.modelPod.name, "sys")
        verifyEq(u.typeName.modelType.qname, "sys::Pod")
      })
  }
  
  Void testUsingPodTypeAs()
  {    
    verifyUsing("using sys::Pod as sysPod", |u|
      {
        verifyEq(u.podName.modelPod.name, "sys")
        verifyEq(u.typeName.modelType.qname, "sys::Pod")
        verifyEq(u.asTypeName.text, "sysPod")
      })
  }
  
  Void testUsingJavaFfi()
  {    
    verifyUsing("using [java] java.util", |u|
      {
        //verifyEq(u.ffi.text, "java")
        verifyEq(u.podName.text, "[java]java.util")
      })
  }
  
  Void testUsingJavaFfiType()
  {    
    verifyUsing("using [java] java.util::Map", |u|
      {
        //verifyEq(u.ffi.text, "java")
        verifyEq(u.podName.text, "[java]java.util")
        verifyEq(u.typeName.text, "Map")
      })
  }
  
  Void testUsingJavaFfiInnerType()
  {    
    verifyUsing("using [java] java.util::Map\$Entry", |u|
      {
        //verifyEq(u.ffi.text, "java")
        verifyEq(u.podName.text, "[java]java.util")
        verifyEq(u.typeName.text, "Map\$Entry")
      })
  }
  
  Void testUsingJavaFfiInnerType02()
  {
     verifyUsing("using [java] java.util::Map\$Entry\$", |u|
      {
        //verifyEq(u.ffi.text, "java")
        verifyEq(u.podName.text, "[java]java.util")
        verifyEq(u.typeName.text, "Map\$Entry\$")
      })
  }
  
  //Void testUsingWithInternalKeyword()
  //{    
  //  verifyUsing("using internal.package.internal::InternalType", |u|
  //    {
  //      verifyEq(u.podName.text, "internal.package.internal")
  //      verifyEq(u.typeName.text, "InternalType")
  //    })
  //}

//////////////////////////////////////////////////////////////////////////
// Utils
//////////////////////////////////////////////////////////////////////////
  IFanPod testPod := FakeFanPod.fake("test")
  IFanNamespace testNs := FakeFanNamespace(testPod)
  
  Void verifyUsing(Str script, |UsingDef u| check)
  {
    verifyRule(script, check, Parser#usingDef)
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