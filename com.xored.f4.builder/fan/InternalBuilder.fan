using f4core
using f4launching
using compiler
using concurrent

using [java]org.eclipse.debug.core::DebugPlugin
using [java]org.eclipse.debug.core::ILaunchConfigurationWorkingCopy
using [java]org.eclipse.dltk.launching::ScriptRuntime
using [java]org.eclipse.dltk.launching::AbstractScriptLaunchConfigurationDelegate
using [java]org.eclipse.jdt.launching::IJavaLaunchConfigurationConstants as JavaConsts
using [java]org.eclipse.jdt.launching::IRuntimeClasspathEntry
using [java]org.eclipse.jdt.core::JavaCore
using [java]org.eclipse.jdt.core::IJavaProject
using [java]org.eclipse.jdt.launching::JavaRuntime
using "[java]org.eclipse.core.externaltools.internal"::IExternalToolConstants as ExtConsts

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
      errs := compile(input)
      if (!errs[0].isEmpty) return errs.flatten
      if (!fp.javaDirs.isEmpty) errs.add(compileJava(consumer))
      return errs.flatten
    } finally {
      if (input.ns is F4Namespace)
        ((F4Namespace)input.ns).close
    }
  }
  
  private CompilerErr[][] compile(CompilerInput input)
  {
    caughtErrs := CompilerErr[,]
    compiler := Compiler(input)
    
    try compiler.compile  
    catch(CompilerErr e) caughtErrs.add(e) 
    catch(Err e) e.trace //TODO: add logging
    return [caughtErrs.addAll(compiler.errs), compiler.warns]
  }

  private CompilerErr[] compileJava(|Str|? consumer)
  {
    jtemp    := fp.baseDir+`temp-java/`

    jtemp.create
    wc := createLaunchConfig(JavaConsts.ID_JAVA_APPLICATION, "Jstub configuration")
    wc.setAttribute(JavaConsts.ATTR_MAIN_TYPE_NAME, "fanx.tools.Jstub")
    fanHome := PathUtil.fanHome(fp.getInterpreterInstall.getInstallLocation.getPath).toFile.osPath
    wc.setAttribute(JavaConsts.ATTR_VM_ARGUMENTS, "-Dfan.home=\"$fanHome\"")
    wc.setAttribute(JavaConsts.ATTR_PROGRAM_ARGUMENTS, "-nozip -d $jtemp $fp.podName")
    wc.setAttribute(JavaConsts.ATTR_PROJECT_NAME, fp.project.getName)
    launch(wc, consumer)
    
    jp := JavaCore.create(fp.project)
    wc = createJdkConfig("Javac configutation", "javac", jp)
    IRuntimeClasspathEntry[] entries := JavaRuntime.computeUnresolvedRuntimeClasspath(jp)
    entries = entries.map { JavaRuntime.resolveRuntimeClasspathEntry(it, jp) }.flatten
    classpath := entries.map { getLocation }.add(jtemp.osPath).join(File.pathSep)
    javaFiles := listFiles(fp.javaDirs).join(" ")
    wc.setAttribute(ExtConsts.ATTR_TOOL_ARGUMENTS, "-d $jtemp -cp \"$classpath\" $javaFiles")
    launch(wc, consumer)
    
    wc = createJdkConfig("Jar configuration", "jar", jp)
    podFile := (fp.outDir+`${fp.podName}.pod`).osPath
    wc.setAttribute(ExtConsts.ATTR_TOOL_ARGUMENTS, "-fu $podFile -C $jtemp.osPath \".\"")
    launch(wc, consumer)
    
    jtemp.delete
    return [,]
  }
  private ILaunchConfigurationWorkingCopy createJdkConfig(Str name,Str exec, IJavaProject jp)
  {
    wc := createLaunchConfig(ExtConsts.ID_PROGRAM_BUILDER_LAUNCH_CONFIGURATION_TYPE, name)
    fullExec := JavaRuntime.getVMInstall(jp).getInstallLocation.toStr+(Env.cur.os == "win32" ? "/bin/${exec}.exe" : "/bin/$exec")
    wc.setAttribute(ExtConsts.ATTR_LOCATION, fullExec)
    return wc
  }
  
  private Str[] listFiles(Uri[] uris)
  {
    list := Str[,]
    uris.each
    {
      (fp.baseDir+it).walk
      {
        if (ext == "java") list.add(osPath)
      }
    }
    return list
  }
  
  private ILaunchConfigurationWorkingCopy createLaunchConfig(Str type, Str name)
  {
    DebugPlugin.getDefault.getLaunchManager.getLaunchConfigurationType(type).newInstance(null, name)
  }
}

