using f4core
using f4launching
using compiler
using concurrent

using [java]org.eclipse.dltk.launching::LibraryLocation
using [java]org.eclipse.dltk.launching::ScriptRuntime
using [java]org.eclipse.core.runtime::NullProgressMonitor
using [java]org.eclipse.debug.core::ILaunchManager
using [java]org.eclipse.debug.core.model::IProcess

**
** Base class for builders
** 
abstract class Builder
{
  const FantomProject fp
  new make(FantomProject fp)
  {
    this.fp = fp
  }
  
  CompilerErr[] build(|Str|? consumer := null)
  {
    configErrs := [
        fp.projectErrs.map { projectErr(it) }, 
        fp.buildfanErrs.map { projectErr(it) }, 
        interpreterErrs
      ].flatten
    return configErrs.isEmpty ? buildPod(consumer) : configErrs
  }
  
  
  abstract CompilerErr[] buildPod(|Str|? consumer)
  
  private CompilerErr buildFanErr(ProjectErr e) 
  {
    CompilerErr.make(e.msg, Loc.makeFile(fp.baseDir + `$Manifest.filename`, e.line, 0), null, LogLevel.err)
  }
  
  protected CompilerErr[] interpreterErrs() 
  {
    fp.isInterpreterSet ? [,] : [projectErr(ProjectErr("Interpreter is not configured"))]
  }
  
  private CompilerErr projectErr(ProjectErr e)
  {
    CompilerErr.make(e.msg, Loc.makeFile(fp.baseDir , e.line, 0), null, LogLevel.err)
  }
  
  protected static Str:File getAllPods(FantomProject fp)
  {
    result :=  [:]
    
    //add interpreter libraries
    libLocs := ScriptRuntime.getLibraryLocations(fp.getInterpreterInstall) as LibraryLocation[]
    libLocs.each 
    {
      file := PathUtil.resolveLocalPath(it.getLibraryPath())
      result[file.basename] = file
    }
    
    //add workspace pods
    FantomProjectManager.instance.listProjects.each |FantomProject p|
    {
      result[p.podName] = (p.outDir.uri + `${p.podName}.pod`).toFile
    }
    
    //uncomment if necessary 
    //result.setAll(fp.depends)
    return result
  }

  
}


**
** This builder uses embedded compiler via API
** 
class InternalBuilder : Builder
{
  new make(FantomProject fp) : super(fp) {}
  
  override CompilerErr[] buildPod(|Str|? consumer)
  {
    buf := StrBuf()
    input := CompilerInput.make
    try {
      input.log         = CompilerLog(buf.out)
      input.podName     = fp.podName
      input.version     = fp.version
      input.ns          = F4Namespace(getAllPods(fp), fp.classpath)
      input.depends     = fp.rawDepends.dup
      input.includeDoc  = true
      input.summary     = fp.summary
      input.mode        = CompilerInputMode.file
      input.baseDir     = fp.baseDir
      input.srcFiles    = fp.srcDirs
      input.resFiles    = fp.resDirs
      input.index       = fp.index
      input.outDir      = fp.outDir
      input.output      = CompilerOutputMode.podFile
      input.jsFiles     = fp.jsDirs
      return compile(input)
    } finally {
      if (input.ns is F4Namespace)
        ((F4Namespace)input.ns).close
    }
  }
  
  private CompilerErr[] compile(CompilerInput input)
  {
    caughtErrs := CompilerErr[,]
    compiler := Compiler(input)
    
    try compiler.compile  
    catch(CompilerErr e) caughtErrs.add(e) 
    catch(Err e) e.trace //TODO: add logging
    return [compiler.errs, compiler.warns, caughtErrs].flatten.unique
  }
}

class SpyCompilerLog : CompilerLog
{
  private |Str|? listener
  new make(|Str|? listener, OutStream out := Env.cur.out) : super(out) 
  {
    this.listener = listener
  }
}

class ExternalBuilder : Builder
{
  new make(FantomProject fp) : super(fp) {}
  
  override CompilerErr[] buildPod(|Str|? consumer) 
  {
    wc := TargetLaunchUtil.createFanLaunchConfig
    wc.setAttribute(LaunchConsts.skipAutosave, true)
    wc.setAttribute(LaunchConsts.skipErrs, true)
    wc.setAttribute(LaunchConsts.fanClass, Manifest.filename)
    wc.setAttribute(LaunchConsts.fanProject, fp.project.getName)
    wc.setAttribute(LaunchConsts.useClassOnly, true)
    install := ScriptRuntime.computeInterpreterInstall(wc)
    if(!install.getInstallLocation.exists)
      return interpreterErrs
    launch := wc.launch(ILaunchManager.RUN_MODE, NullProgressMonitor(), false, false)
    if(launch.getProcesses.isEmpty) return [,]
    process := launch.getProcesses.first as IProcess
    out := StrBuf()
    process.getStreamsProxy.getOutputStreamMonitor.addListener |txt| { consumer?.call(txt); out.add(txt) }
    process.getStreamsProxy.getErrorStreamMonitor.addListener |txt| { consumer?.call(txt); out.add(txt) }
    while(!process.isTerminated) Actor.sleep(25ms)
    return parseErrors(out.toStr)
  }
  
  private CompilerErr[] parseErrors(Str out)
  {
    echo(out)
    return out.splitLines.map { errFromLine(it) }.exclude { it == null }
  }
  
  private static const Regex loc := Regex<|(\((\d+)(,(\d+))?\))|> 
  private CompilerErr? errFromLine(Str line)
  {
    //assume that err/warn line always starts with base directory
    if(!line.startsWith(fp.baseDir.osPath)) return null
    m := loc.matcher(line)
    if(!m.find) return null
    file := line[0..<m.start]
    lineNo := m.group(2).toInt
    col := m.group(4).isEmpty ? null : m.group(4).toInt
    msg := line[m.end+1..-1].trim
    isWarn := msg.startsWith("WARN")
    if(isWarn) msg = msg["WARN".size..-1]
    return CompilerErr.make(msg, Loc.make(file, lineNo, col)
      , null, isWarn ? LogLevel.warn : LogLevel.err)
  }
}
