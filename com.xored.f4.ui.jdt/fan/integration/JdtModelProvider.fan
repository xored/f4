using [java] java.lang
using [java] org.eclipse.core.resources
using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.ui
using [java] org.eclipse.jdt.core
using [java] org.eclipse.jdt.internal.core
using [java] org.eclipse.jdt.internal.ui.packageview
using [java] org.eclipse.jdt.ui
using [java] org.eclipse.jface.viewers
using [java] org.eclipse.swt.graphics
using [java] java.util::List as JList
using [java] org.eclipse.dltk.ui::IModelCompareProvider$CompareResult as CompareResult
using [java] org.eclipse.jdt.ui::PreferenceConstants as JdtUiPreferenceConstants
using [java] com.xored.f4.ui.jdt

class JDTCategories {
  public static const Int PROJECTS := 1
  public static const Int PACKAGEFRAGMENTROOTS := 2
  public static const Int PACKAGEFRAGMENT := 3
  public static const Int COMPILATIONUNITS := 4
  public static const Int CLASSFILES := 5
  public static const Int RESOURCEFOLDERS := 7
  public static const Int RESOURCES := 8
  public static const Int PACKAGE_DECL := 10
  public static const Int IMPORT_CONTAINER := 11
  public static const Int IMPORT_DECLARATION := 12
  public static const Int MEMBERSOFFSET := 15
  public static const Int JAVAELEMENTS := 50
  public static const Int OTHERS := 51
}

class JdtModelProvider : ModelCompareProviderBridge, IModelContentProvider, ILabelProvider {

  private PackageExplorerContentProvider contentProvider
  private PackageExplorerLabelProvider labelProvider
  private JavaElementComparator compareProvider
  private Bool isPackagesFoldedInScriptExplorer

  new make() {
    contentProvider = PackageExplorerContentProvider(true)
    contentProvider.setShowLibrariesNode(true)
    contentProvider.setIsFlatLayout(true)
    isPackagesFoldedInScriptExplorer = JdtUiPreferenceConstants
        .getPreferenceStore()
        .getBoolean(JdtUiPreferenceConstants.APPEARANCE_FOLD_PACKAGES_IN_PACKAGE_EXPLORER)
    labelProvider = PackageExplorerLabelProvider(contentProvider)
    labelProvider.setIsFlatLayout(true)
    compareProvider = JavaElementComparator()
  }

  override Obj? getParentElement(Obj? element, ITreeContentProvider? treeContentProvider) {
    return contentProvider.getParent(element)
  }

  override Void provideModelChanges(Obj? parentElement, JList? children,
      ITreeContentProvider? treeContentProvider) {
    if (parentElement is IScriptProject) {
      IScriptProject scriptProject := (IScriptProject) parentElement
      IProject project := scriptProject.getProject()
      IJavaProject? javaProject := JavaCore.create(project)
      if (javaProject != null) {
        IClasspathEntry[]? rawClasspath := null
        try {
          rawClasspath = javaProject.getRawClasspath()
        } catch (Err e) {
          // ignore
        }
        if (rawClasspath != null) {
          for (Int i := 0; i < rawClasspath.size; i++) {
            IClasspathEntry classpathEntry := rawClasspath[i]
            if (classpathEntry.getEntryKind() == IClasspathEntry.CPE_CONTAINER) {
              children.add(ClassPathContainer(javaProject, classpathEntry))
            }
          }
        }
      }
      return
    }

    if (parentElement is ClassPathContainer) {
      ClassPathContainer container := (ClassPathContainer) parentElement
      if (contentProvider.hasChildren(container)) {
        contentProvider.getChildren(container).each {
          children.add(it)
        }
      }
      return
    }

    if (parentElement is JarPackageFragmentRoot
        && isPackagesFoldedInScriptExplorer) {
      JarPackageFragmentRoot container := (JarPackageFragmentRoot) parentElement
      if (contentProvider.hasChildren(container)) {
        contentProvider.getChildren(container).each {
          try {
            if (!(it is IPackageFragment
                && ((IPackageFragment) it).hasSubpackages())) 
              children.add(it)
          } catch (Err e) {
            // ignore
          }
          
        }
      }
      return
    }

    if (contentProvider.getParent(parentElement) != null
        && contentProvider.hasChildren(parentElement)) {
      children.clear()
      contentProvider.getChildren(parentElement).each {
        children.add(it)
      }
    }
  }

  override Image? getImage(Obj? element) {
    if (contentProvider.getParent(element) != null) {
      return labelProvider.getImage(element)
    }
    return null
  }

  override Str? getText(Obj? element) {
    if (contentProvider.getParent(element) != null) {
      return labelProvider.getText(element)
    }
    return null
  }

  override Void addListener(ILabelProviderListener? listener) {
  }

  override Void dispose() {
    contentProvider.dispose()
    labelProvider.dispose()
  }

  override Bool isLabelProperty(Obj? element, Str? property) {
    if (contentProvider.getParent(element) != null) {
      return labelProvider.isLabelProperty(element, property)
    }
    return false
  }

  override Void removeListener(ILabelProviderListener? listener) {
  }

  override Integer? category(Obj? parentElement) {
    if (!(parentElement is IJavaElement)
        && !(parentElement is ClassPathContainer)) {
      return null
    }
    if (contentProvider.getParent(parentElement) != null) {
      Int jdtCategory := compareProvider.category(parentElement)
      Int result := 0
      switch (jdtCategory) {
      case JDTCategories.PACKAGEFRAGMENTROOTS:
        result = ModelElementSorter.PROJECTFRAGMENT
      case JDTCategories.CLASSFILES:
      case JDTCategories.JAVAELEMENTS:
        result = ModelElementSorter.SOURCEMODULES
      case JDTCategories.PROJECTS:
        result = ModelElementSorter.PROJECTS
      case JDTCategories.PACKAGEFRAGMENT:
        result = ModelElementSorter.SCRIPTFOLDER
      default:
        result = jdtCategory
      }
      return Integer(result)
    }
    return null
  }

  override CompareResult? compareModel(Obj? element1, Obj? element2, Int cat1,
      Int cat2) {
    if (element1 is ClassPathContainer) {
      return IModelCompareProvider.GREATER
    }
    if (element2 is ClassPathContainer) {
      return IModelCompareProvider.LESS
    }
    if (contentProvider.getParent(element1) != null
        && contentProvider.getParent(element2) != null) {
      return CompareResult(JavaElementComparatorWrapper.compareElements(
        compareProvider, null, element1, element2))
    }
    return null
  }
}
