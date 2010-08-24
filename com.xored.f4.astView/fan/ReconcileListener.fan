using [java]org.eclipse.dltk.internal.ui.text
using [java]org.eclipse.core.runtime
using [java]org.eclipse.dltk.core
using [java]org.eclipse.ui.progress

class ReconcileListener : IScriptReconcilingListener {

  private AstView view 
  
  public new make(AstView view) {
    this.view = view
  }
  
  override Void aboutToBeReconciled() {
    
  }

  override Void reconciled(ISourceModule? module, Bool forced,
      IProgressMonitor? progressMonitor) {
    if (module != null) UpdateJob(view, module).schedule
  }
}

class UpdateJob : UIJob {
  
  private AstView view 
  private ISourceModule? module
  
  new make(AstView view, ISourceModule? module) : super("AST View Update") {
    this.view = view
    this.module = module
  }
  
  override IStatus? runInUIThread(IProgressMonitor? monitor) {
    view.update(module)
    return Status.OK_STATUS
  }
  
}