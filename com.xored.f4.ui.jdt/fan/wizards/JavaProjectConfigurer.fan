using [java] org.eclipse.core.resources
using [java] org.eclipse.core.runtime
using [java] org.eclipse.jdt.core
using [java] org.eclipse.jdt.launching
using [java] com.xored.fanide.core
using f4jdtLaunching

class JavaProjectConfigurer : IProjectConfigurer {

  override Void configure(IProject? project) {
    try {
      IProjectDescription description := project.getDescription()
      Str[] natures := [,]
      natures.addAll(description.getNatureIds())
      if (!natures.contains(FanNature.NATURE_ID)) {
        natures.add(FanNature.NATURE_ID)
      }
      if (!natures.contains(JavaCore.NATURE_ID)) {
        natures.add(JavaCore.NATURE_ID)
      }
      description.setNatureIds(natures)
      project.setDescription(description, null)
    } catch (Err e) {
      FanCore.log(e.msg)
    }
    IJavaProject prj := JavaCore.create(project)
    IClasspathEntry[] cp := prj.getRawClasspath
    
    //Ivan:
    //for newly created projects
    //JDT creates default classpath with one src entry
    //with path matching to project path. Therefore,
    //when we create new fantom project, we see empty
    //package. To prevent this error, we clear
    //default class path
    if(isDefaultClasspath(cp,project)) cp.clear
    
    IPath jreContainerPath := Path(JavaRuntime.JRE_CONTAINER)
    cp.add(JavaCore.newContainerEntry(Path(JavaLaunchConsts.fanJavaContainer)))
    cp.add(JavaCore.newContainerEntry(jreContainerPath))
    try {
      prj.setRawClasspath(cp, prj.readOutputLocation ?: prj.getPath, null);
    } catch (Err e) {
      FanCore.log(e.msg)
    }
  }

  private static Bool isDefaultClasspath(IClasspathEntry[] cp, IProject p)
  {
    if(cp.size != 1) return false
    IClasspathEntry entry := cp.first
    return entry.getPath == p.getFullPath
  }
  override Str?[]? getConfigurableProjectNatures() {
    return [ JavaCore.NATURE_ID ]
  }
}
