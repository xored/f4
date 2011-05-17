using [java] org.eclipse.core.runtime::IProgressMonitor
using [java] org.eclipse.dltk.core::IModelElement
using [java] org.eclipse.dltk.ui::DLTKUIPlugin
using [java] org.eclipse.dltk.ui.wizards::NewElementWizard

using "[java]com.xored.fanide.internal.ui.wizards"::FanWizardMessages

class FanNewClassWizard : NewElementWizard
{
	static const Str wizardId := "com.xored.fanide.ui.internal.wizards.newclass"

	private FanNewTypePage? page
	private Bool openEditorOnFinish
	
  private Void create(FanNewTypePage? page, Bool openEditorOnFinish)
  {
    setDefaultPageImageDescriptor(FanImages.fileCreation)
    setDialogSettings(DLTKUIPlugin.getDefault.getDialogSettings)
    setWindowTitle(FanWizardMessages.NewClassWizard_title)
    
    this.page = page
    this.openEditorOnFinish = openEditorOnFinish
  }

  new make(FanNewTypePage page, Bool openEditorOnFinish) { create(page, openEditorOnFinish) }
	
  new makeNoArgs() { create(null, true) }
	
	override Void addPages()
  {
		super.addPages
		if (page == null) {
			page = FanNewTypePage(FanNewClassPageHelper())
			page.init(getSelection)
		}
		addPage(page)
	}
	
	protected override Void finishPage(IProgressMonitor? monitor) { page.createType(monitor) }
		
	override Bool performFinish()
  {
		module := page.currentSourceModule
		if (super.performFinish)
    {
      if (module != null)
      {
  		  selectAndReveal(module.getResource)
			  if (openEditorOnFinish)
  				openResource(module.getResource)
	  	}
      return true
    }
		return false
	}

	override IModelElement? getCreatedElement() { page.createdType }
}