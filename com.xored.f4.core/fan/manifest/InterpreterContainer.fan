using [java]org.eclipse.dltk.launching::IInterpreterContainerExtension
using [java]org.eclipse.dltk.launching::IInterpreterContainerExtension2
using [java]org.eclipse.dltk.launching::IInterpreterInstall
using [java]org.eclipse.dltk.core::DLTKCore
using [java]org.eclipse.dltk.core::IBuildpathEntry
using [java]org.eclipse.dltk.core::IScriptProject 
using [java]java.util::List as JList
using [java]org.eclipse.core.runtime
using [java]org.fantom
using [java]org.osgi.framework
using [java]java.net::URL

** Interpreter container extension
class InterpreterContainer : IInterpreterContainerExtension, IInterpreterContainerExtension2 {
	
	private static const Str PDE_NATURE := "org.eclipse.pde.PluginNature"
	
	override Void preProcessEntries(IInterpreterInstall? install, JList? entriesList) {
		try 	{
			IBuildpathEntry[] entries := entriesList.toArray
			fanSrc := PathUtil.srcByInterpreter(install.getInstallLocation.getPath)
			//if(!fanSrc.exists) return
			fanSrcExist := fanSrc.exists
			
			entries.each | IBuildpathEntry entry| {
				path := PathUtil.resolveLocalPath(entry.getPath, false)
				if(path == null || !path.exists || path.ext != "pod") return
				
				src := fanSrc + Uri.fromStr(path.basename).plusSlash
				if(fanSrcExist && src.exists) {
					entry.setSourceAttachmentPath(PathUtil.toPath(src))
					entry.setSourceAttachmentRootPath(Path.EMPTY)
				} else {
					podFile := Uri.fromStr(path.toStr).toFile
					if( podFile.exists) {
						Zip.open(podFile) {
							srcDir := it.contents.find |File f, Uri uri->Bool| {
								return uri.toStr.startsWith("/src/") && uri.toStr.endsWith(".fan")
							}
							if( srcDir != null ) {
								// try to use pod itself as source container
								entry.setSourceAttachmentPath(PathUtil.toPath(path))
								entry.setSourceAttachmentRootPath(Path.EMPTY)
							}
						}.close
					}
				}
			}
		} catch(Err e) { e.trace }
	}
	
	override Void processEntres(IScriptProject? project, JList? librariesList) {
		IBuildpathEntry[] libraries := librariesList.toArray
		entries := IBuildpathEntry[,]
		podNames := Str[,]
		fpm := FantomProjectManager.instance
		fp := fpm[project.getProject]
		podNames.addAll(fp.rawDepends.map {it.name })
		podNames.add("sys")
		podNames = podNames.unique
		podNames.each | podName | {
			projectPod := fpm.getByPod(podName)
			if(projectPod != null) {
				entries.add(DLTKCore.newProjectEntry(projectPod.project.getFullPath))
				return
			}
			
			lib := libraries.find |IBuildpathEntry l -> Bool| {
				l.getPath.removeFileExtension.lastSegment == podName
			}
			if(lib != null) {
				entries.add(copyLib(lib))
				return
			}
		}
		librariesList.clear
		entries.each { librariesList.add(it) }
	}
	
	private static IBuildpathEntry copyLib(IBuildpathEntry lib) {
		result := DLTKCore.newLibraryEntry(lib.getPath)
		result.setSourceAttachmentPath(lib.getSourceAttachmentPath)
		result.setSourceAttachmentRootPath(lib.getSourceAttachmentRootPath)
		return result
	}
	
	private static Str? findPdePod(Str name) {
		IConfigurationElement[] elements := Platform.getExtensionRegistry
			.getConfigurationElementsFor(FantomVM.PLUGIN_ID + ".pod")
		Str? found
		elements.each {
			if (name == getAttribute("name")) {
				Str bundleId := getContributor.getName
				Bundle bundle := Platform.getBundle(bundleId)
				URL url := FileLocator.toFileURL(bundle.getEntry(getAttribute("location")))
				found = url.getPath 
			}
		}
		return found
	}
	
	private static Bool isPod(IPath path) {
		path.segmentCount > 0 && 
		!path.segments.first.toStr.startsWith(IBuildpathEntry.BUILDPATH_SPECIAL) &&
		path.getFileExtension == "pod"
	}
}
