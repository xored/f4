//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 3, 2010 - Initial Contribution
//


using [java] org.eclipse.jdt.core::JavaCore

using [java] org.eclipse.core.resources::IProject

using [java] org.eclipse.dltk.testing
using [java] org.eclipse.dltk.testing.model
using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.internal.launching
using [java] org.eclipse.jface.action::IAction
using [java] org.eclipse.jface.action::Action
using [java] java.lang::Class

using [java] com.xored.f4.debug.ui::JavaOpenEditorAction
using f4core
using f4model
using f4debugUi
**
**
**
class FanTestRunnerUI : AbstractTestRunnerUI, ITestElementResolver
{
  protected IScriptProject? proj
  protected AbstractTestingEngine? engine
  protected IPathEquality? pathEquality
  
  static const Str FRAME_PREFIX := "at "
  
  new make(AbstractTestingEngine? engine, IScriptProject? proj)
  {
    this.engine = engine
    this.proj = proj
    this.pathEquality = PathEqualityUtils.getInstance
  }
  
  private Bool isJavaSource(Str traceLine) {
    FanHyperlink(traceLine).fileName.split('.').last == "java"
  }
  
  override Bool canFilterStack() {
    return true;
  }

  override Str? filterStackTrace(Str? trace) {
    trace.splitLines.exclude { 
      isJavaSource(it)
    }.join("\n")
  }
  
  override Bool isStackFrame(Str? line) {
    return FanFileHyperlink.isStackTraceLink(line);
  }
  
  private IAction createJavaOpenEditorAction(Str traceLine) {
    testName := traceLine[0..-1]
    framePrefixIndex := testName.index(FRAME_PREFIX) ?: 0
    testName = testName[framePrefixIndex..-1]
    
    lBraceIndex := testName.indexr("(") ?: -1
    testName = testName[0..<lBraceIndex].trim
    
    dotIndex := testName.indexr(".") ?: -1
    testName = testName[0..<dotIndex]
    
    innerSeparatorIndex := testName.index("\$") ?: 0
    innerSeparatorIndex --
    testName = testName[0..innerSeparatorIndex]

    lineNumber := traceLine[0..-1];
    colonIndex := lineNumber.index(":") ?: 0
    rBraceIndex := lineNumber.indexr(")") ?: -1
    lineNumber = lineNumber[colonIndex + 1..<rBraceIndex]
    line := lineNumber.toInt
    
    return JavaOpenEditorAction(JavaCore.create(proj.getProject), testName, line)
  }
  
  private IAction createFanOpenEditorAction(Str traceLine) {
    return FanSourceSearchAction(traceLine)
  }
  
  override IAction? createOpenEditorAction(Str? traceLine) {
    if(traceLine == null)
      return null
    
    if(isJavaSource(traceLine))
      return createJavaOpenEditorAction(traceLine)

    return createFanOpenEditorAction(traceLine)
  }
  
  override Str? getDisplayName() { engine.getName }
  
  override IScriptProject? getProject() { proj }
  
  override ITestingEngine? getTestingEngine() { engine }
  
  override Obj? getAdapter(Class? adapter)
  {
    if (InteropUtil.isEqual(adapter, ITestElementResolver#))
      return this
    else 
      return super.getAdapter(adapter)
  }
  
  override TestElementResolution? resolveElement(ITestElement? element)
  {
    if(element isnot ITestCaseElement) return null
    
    elem := element as ITestCaseElement
    
    podTypeMethod := ParseUtil.splitMethod(elem.getTestName)
    if(podTypeMethod == null || podTypeMethod.size != 3) return null
    pod := podTypeMethod[0]
    type := podTypeMethod[1]
    method := podTypeMethod[2]
    
    if(pod == null) return null
    fp := FantomProjectManager.instance.getByPod(pod)
    if(fp == null) return null
    
    IMethod? result := 
     fp.ns.currPod.findType(type, false)?.method(method, false)?.me as IMethod
    if(result == null) return null
    return TestElementResolution(result, result.getNameRange)
  }
}
