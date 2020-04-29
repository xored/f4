using [java] org.eclipse.core.runtime
using [java] org.eclipse.core.resources::IProject
using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.launching
using [java] org.eclipse.jdt.core

using f4core
using f4core::FantomProjectManager

**
** This adds .jars to the "Fantom Native Libraries (Java)"
** 
class FanJavaContainer : IClasspathContainer {
	private IPath path
	private IInterpreterInstall install
	private IScriptProject project

	** Dirs with jars relative to fan.home
	private const Uri[] jarDirs := [
		`lib/java/`,
		`lib/java/ext/`,
		`lib/java/ext/$Env.cur.os-$Env.cur.arch/`
	]
	
	new make(IInterpreterInstall fan, IPath path, IScriptProject project) {
		this.install = fan
		this.path = path
		this.project = project
	}
	
	override IClasspathEntry?[]? getClasspathEntries() {
		install := ScriptRuntime.getInterpreterInstall(project)
		if (install == null) return IClasspathEntry?[,]
		if (this.install != install) this.install = install
		
		IClasspathEntry?[] cpEntries := 
			jarDirs.map |Uri loc -> File[]| {
				(home + loc).listFiles.findAll { it.ext == "jar" }
			}.flatten.map |File f -> IClasspathEntry?| {
				createLibrary(f.normalize, home + `src/${f.basename}/java/`)	// maybe it's a core Fantom pod
			}
		
		FantomProject fp := FantomProjectManager.instance.get(project.getProject)
		fp.classpathDepends.each |loc, name| {
			podFP := FantomProjectManager.instance.getByPodName(name)
			if (podFP != null) {
				IProject prj := podFP.project
				if (prj.isAccessible && prj.hasNature("org.eclipse.jdt.core.javanature")) {
					// do not need to add entry
					return
				}
			}
			
			if (isJavaPod(loc))
				cpEntries.add(createLibrary(loc, loc))
		}

		if (!fp.javaDirs.isEmpty) {
			// guess where the source root is. Sometimes we have a Java package hierarchy, sometimes we don't
			// not that this seems to work!
			javaDir := fp.javaDirs.first
			if (javaDir.path.last == fp.podName)
				javaDir = javaDir.parent
			if (javaDir?.path?.last == "fan")
				javaDir = javaDir?.parent ?: `` 
			cpEntries.add(createLibrary(fp.podOutFile, fp.projectDir + javaDir))
		}

		return cpEntries
	}
	
	private File home() { PathUtil.fanHome(install.getInstallLocation.getPath).toFile }
	
	private IClasspathEntry createLibrary(File podFile, File? srcFile) {
		JavaCore.newLibraryEntry(
			Path(podFile.normalize.osPath),
			Path(srcFile.normalize.osPath),
			Path("")
		)
	}
	
	private static Bool isJavaPod(File f) {
		if (!f.exists) return false
		
		// FIXME Slimer is this okay? I mean, why open the zip during a build thrash!?
		return f.ext == "jar" || f.ext == "pod" || f.ext == ".zip"
		
		zip := Zip.read(f.in)
		try {
			File? entry
			isJava := false
			while (!isJava && (entry = zip.readNext) != null) {
				isJava = entry.ext == "class"
			}
			return isJava
		} finally
			zip.close
	}
	
	override Int getKind() { K_APPLICATION }
	
	override IPath? getPath() { path }
	
	override Str? getDescription() { "Fantom Native Libraries (Java)" }
 }
