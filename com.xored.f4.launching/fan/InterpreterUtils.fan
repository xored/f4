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
  static Str getVersion(IInterpreterInstall interp) 
  {
    job := LoadInfoJob(interp)
    job.schedule
    job.join
    return job.version
  }
}

class LoadInfoJob : Job
{
  private IInterpreterInstall install
  Str version := "fan"
  new make(IInterpreterInstall install) : super("Load Fantom Interpreter info...")
  {
    this.install = install
  }
  
  override IStatus? run(IProgressMonitor? m)
  {
    m.beginTask("Load Fantom version", IProgressMonitor.UNKNOWN)
    env := install.getExecEnvironment
    if(env == null) return Status.CANCEL_STATUS
    
    versionReader := VersionReader()
    FcodeReader.make(locateSysPod).accept(versionReader)
    version = "fantom-$versionReader.version"
    return Status.OK_STATUS
  }
  
  private File locateSysPod() 
  {
    (PathUtil.libByInterpreter(install.getInstallLocation.getPath).uri +
      `sys.pod`).toFile
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