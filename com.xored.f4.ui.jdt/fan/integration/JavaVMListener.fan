//using [java] java.lang
using [java] java.lang.reflect
using [java] org.eclipse.core.resources
using [java] org.eclipse.core.runtime
using "[java]org.eclipse.dltk.internal.ui.actions"
using [java] org.eclipse.dltk.ui.util
using [java] org.eclipse.jdt.launching
using [java] org.eclipse.jface.dialogs
using [java] org.eclipse.swt.widgets
using [java] org.eclipse.ui
using [java] com.xored.fanide.core

using f4uiCore

const class JavaVMListener : IVMInstallChangedListener {

  public static const f4uiJdt::JavaVMListener instance := make 

  public static Void install() {
    JavaRuntime.addVMInstallChangedListener(instance)
  }

  public static Void uninstall() {
    JavaRuntime.removeVMInstallChangedListener(instance)
  }
  
  override Void vmRemoved(IVMInstall? vm) {
  }

  override Void vmChanged(PropertyChangeEvent? event) {
  }

  override Void vmAdded(IVMInstall? vm) {
  }

  override Void defaultVMInstallChanged(IVMInstall? previous, IVMInstall? current) {
    PlatformUI.getWorkbench?.getDisplay().asyncExec(|->| { updateVM })
  }  
  
  private Void updateVM() {
    Shell shell := PlatformUI.getWorkbench?.getActiveWorkbenchWindow().getShell()
    if (FanBuildUtils.doBuildDialog(null, shell)) {
      WorkbenchRunnableAdapter op := WorkbenchRunnableAdapter(
        |IProgressMonitor? monitor| { 
          FanBuildUtils.processChanges(null, monitor)
        })
      try {
        ProgressMonitorDialog(shell).run(true, true, op)
      } catch (Err e) {
        FanCore.log(e.msg)
      }
  }
  
  }
}
  