//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 3, 2010 - Initial Contribution
//

using [java] java.lang::System
using [java] org.eclipse.debug.core
using [java] org.eclipse.dltk.testing
using [java] org.eclipse.dltk.testing.model
**
**
**
class FanTestProcessor : ITestingProcessor
{
  private static const Int STATE_NORMAL := 0
  private static const Int STATE_TEST_FAILED := 1
  private static const Int STATE_MESSAGE := 2
  
  private ILaunch? launch
  private Int startTime := 0
  private Int index := 0
  private ITestRunSession? session := null
  private ITestingClient? client := null
  private Int state := STATE_NORMAL
  private Bool skip := false
  private Str message := ""
  private Str resultActual := ""
  private Str resultExpected := ""
  private Int? testID := null
  private Str? testName := null
  
  new make(ILaunch? launch) { this.launch = launch }

  override public Void done() {
    if (session == null || client == null) return
    session.setTotalCount(index)
    client.testTerminated(System.currentTimeMillis - startTime)
  }

  override Void processLine(Str? line) {
    if (session == null || client == null || line == null) return
    if (line.size == 0) return
    if (line.startsWith("-- Run:")) {
      if (state != STATE_NORMAL) finishTest()
      testID = ++index
      testName = line[9 ..<line.indexr("...")]
      client.testTree(testID, testName, false, 0)
      client.testStarted(testID, testName)
      session.setTotalCount(testID)
    } else if (line.equals("TEST FAILED")) {
      state = STATE_TEST_FAILED
      client.testFailed(ITestingClient.FAILED, testID, testName)
      return
    } else if (line.startsWith("   Pass: " + testName)) {
      client.testEnded(testID, testName)
      finishTest
      return
    } else if (line.startsWith("***")) {
      finishTest
      return
    } else if (line.startsWith("Time: ")) {
      finishTest
      return
    }
    switch (state) {
    case STATE_TEST_FAILED:
      try {
        resultActual = line[line.index("Test failed: ") + "Test failed: ".size .. line.index(" != ")]
        resultExpected = line[line.index(" != ") + 4 ..-1]
        client.testActual(resultActual)
        client.testExpected(resultExpected)
      } catch (Err e) {
        // Unknow test failure
      } finally {
        client.traceStart
        message += line + "\n"
        state = STATE_MESSAGE
      }
    case STATE_MESSAGE:
      message += line + "\n"
    }
  }

  private Void finishTest() {
    if (state == STATE_MESSAGE) {
      client.traceMessage(message)
      client.traceEnd()
    }
    resetState
  }

  private Void resetState() {
    state = STATE_NORMAL
    resultActual = ""
    resultExpected = ""
    message = ""
  }

  override Void start() {
    startTime = System.currentTimeMillis
    index = 0
    session = DLTKTestingPlugin.getTestRunSession(launch)
    if (session == null) return

    client = session.getTestRunnerClient
    if (client != null) {
      client.testRunStart(0)
    }
  }

}
