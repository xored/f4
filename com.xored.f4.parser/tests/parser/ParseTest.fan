using f4model

class ParseTest : Test
{
//  Void test01()
//  {
//    verifyRule("depends  := (Depend[])this.depends.map |s->Depend| { Depend(s) }", 
//      |node| {}, Parser#stmt)
//  }
//  
//  Void test02()
//  {
//    verifyRule(
//     "internal class GroupTarget : TargetMethod
//      {
//        new make(BuildGroup s, Str n) : super(s, BuildGroup#runOnChildren) { name = n }
//        override const Str name
//        override Str help() { \"Run '\$name' on group\" }
//        override Void run() { ((BuildGroup)script).runOnChildren(name) }
//      }",  
//      |node| {}, Parser#typeDef, FakeFanNamespace(FakeFanPod(Pod.find("build"))))
//  }
//  
//  Void test03()
//  {
//    verifyRule(
//      "   newLines := Line[,] { capacity=32 }
//          ", 
//      |node| {}, Parser#stmt, FakeFanNamespace(FakeFanPod(Pod.find("flux"))))
//  }
  
//////////////////////////////////////////////////////////////////////////
// Utils
//////////////////////////////////////////////////////////////////////////
  IFanPod testPod := FakeFanPod.fake("test")
  IFanNamespace testNs := FakeFanNamespace(testPod)
  
  Void verifyRule(Str script, |Node node| check,
    Method parserMethod := Parser#cunit, IFanNamespace? ns := null)
  {
    p := Parser(script, ns?:testNs, "test", ProblemCollector.make)
    Node node := parserMethod.call(p)
    (p.collector as ProblemCollector).list.each {echo("$it.line : $it.msg")}
    verifyEq((p.collector as ProblemCollector).list.size, 0)
    verifyEq(node.start, 0)
    verifyEq(node.end, script.size-1)
    check.call(node)
  }
}