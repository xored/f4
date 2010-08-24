//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 3, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.testing
using [java] org.eclipse.debug.core
using [java] org.eclipse.dltk.core
**
**
**
class FanTestingEngine : AbstractTestingEngine
{
  public static const Str id := "com.xored.fanide.testing.fantest.testingEngine"
  override Str? getId := id
  
  override Str? getName := "FanTestingEngine"
  
  override ITestRunnerUI? getTestRunnerUI(IScriptProject? proj, ILaunchConfiguration? config)
  {
    FanTestRunnerUI(this,proj)
  }
}
