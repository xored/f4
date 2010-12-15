//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 1, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.launching
using [java] org.eclipse.core.runtime
using [java] org.eclipse.core.runtime.jobs

using f4fcode
using f4core
using compiler
**
**
**
class InterpreterUtils
{
  static Str getVersion(File fanHome) 
  {
    job := LoadInfoJob(fanHome)
    job.schedule
    job.join
    return job.version
  }
  
  static Bool isValid(File pod)
  {
    try FcodeReader.make(pod).accept(VersionReader())
    catch return false
    return true
  }
}

class LoadInfoJob : Job
{
  private File fanHome
  Str version := "fan"
  new make(File fanHome) : super("Load Fantom Interpreter info...")
  {
    this.fanHome = fanHome
  }
  
  override IStatus? run(IProgressMonitor? m)
  {
    m.beginTask("Load Fantom version", IProgressMonitor.UNKNOWN)
    
    versionReader := VersionReader()
    FcodeReader.make(locateSysPod).accept(versionReader)
    version = "fantom-$versionReader.version"
    return Status.OK_STATUS
  }
  
  private File locateSysPod() 
  {
    fanHome + `lib/fan/sys.pod`
  }
  
}

class VersionReader : FcodeVisitor
{
  Str version := "1.0"
  override Void visitPod(FPod pod)
  {
    this.version = pod.version.toStr
  }
}