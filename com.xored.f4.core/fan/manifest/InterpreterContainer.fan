using [java]org.eclipse.dltk.launching::IInterpreterContainerExtension
using [java]org.eclipse.dltk.launching::IInterpreterContainerExtension2
using [java]org.eclipse.dltk.launching::IInterpreterInstall
using [java]org.eclipse.dltk.core::DLTKCore
using [java]org.eclipse.dltk.core::IBuildpathEntry
using [java]org.eclipse.dltk.core::IScriptProject 
using [java]java.util::List as JList
using [java]org.eclipse.core.runtime
//using [java]org.fantom
using [java]org.osgi.framework
using [java]java.net::URL

** Interpreter container extension
class InterpreterContainer : IInterpreterContainerExtension, IInterpreterContainerExtension2 {
	
	private static const Str PDE_NATURE := "org.eclipse.pde.PluginNature"
	
	override Void preProcessEntries(IInterpreterInstall? install, JList? entriesList) {
		try {
			IBuildpathEntry[] buildEntries := entriesList.toArray
			fanSrcDir := PathUtil.srcByInterpreter(install.getInstallLocation.getPath)
			
			buildEntries.each | IBuildpathEntry buildEntry| {
				podFile := PathUtil.resolveLocalPath(buildEntry.getPath, false)
				if (podFile == null || !podFile.exists || podFile.ext != "pod") return
				
				attachSource(buildEntry, fanSrcDir, podFile)
			}
		} catch(Err e) { e.trace }
	}
	
	override Void processEntres(IScriptProject? project, JList? librariesList) {
		if (project == null || librariesList == null) return

		entries			:= IBuildpathEntry[,]
		fpm				:= FantomProjectManager2.instance
		fantomProject	:= fpm.get(project.getProject)
		interpreter		:= fantomProject?.interpreterInstall?.getInstallLocation?.getPath		

		fantomProject.resolvedPods.each |podFile, podName| { 
			podProject := fpm.getByPodName(podName)
			if (podProject != null) {
				entries.add(DLTKCore.newProjectEntry(podProject.project.getFullPath))
				return
			}
			
			buildEntry := DLTKCore.newLibraryEntry(PathUtil.toPath(podFile))
			if (interpreter != null)
				attachSource(buildEntry, PathUtil.srcByInterpreter(interpreter), podFile)
			entries.add(buildEntry)
		}
		
		// copy entries into librariesList
		librariesList.clear
		entries.each { librariesList.add(it) }
	}
	
	private static Void attachSource(IBuildpathEntry buildEntry, File fanSrcDir, File podFile) {
		podSrcDir := fanSrcDir + Uri.fromStr(podFile.basename).plusSlash
		if (fanSrcDir.exists && podSrcDir.exists) {
			buildEntry.setSourceAttachmentPath(PathUtil.toPath(podSrcDir))
			buildEntry.setSourceAttachmentRootPath(Path.EMPTY)

		} else if (podFile.exists)	{
			Zip.open(podFile) {
				srcDir := it.contents.find |File f, Uri uri->Bool| {
					return uri.toStr.startsWith("/src/") && uri.toStr.endsWith(".fan")
				}

				if (srcDir != null) {
					// try to use pod itself as source container
					buildEntry.setSourceAttachmentPath(PathUtil.toPath(podFile))
					buildEntry.setSourceAttachmentRootPath(Path.EMPTY)
				}
			}.close
		}		
	}
}
