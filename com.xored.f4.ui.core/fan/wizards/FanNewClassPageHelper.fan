using [java] org.eclipse.swt::SWT
using [java] org.eclipse.swt.layout::GridLayout
using [java] org.eclipse.swt.widgets::Composite
using [java] org.eclipse.jface.dialogs::Dialog
using [java] org.eclipse.jface.dialogs::IDialogSettings
using [java] org.eclipse.jface.viewers::IStructuredSelection
using "[java]org.eclipse.dltk.internal.ui.wizards.dialogfields"::DialogField
using "[java]org.eclipse.dltk.internal.ui.wizards.dialogfields"::LayoutUtil
using "[java]org.eclipse.dltk.internal.ui.wizards.dialogfields"::SelectionButtonDialogFieldGroup

using "[java]com.xored.fanide.internal.ui.wizards"::FanWizardMessages

class FanNewClassPageHelper : FanNewTypePageHelper
{
  static const Str pageId := "com.xored.fanide.ui.FanNewClassWizardPage"
  
  private static const Str createMain := "create_main"
  private static const Str createConstr := "create_constructor"
  private static const Str createUnimpl := "create_unimplemented"
  
  private SelectionButtonDialogFieldGroup methodStubsButtons
  
  /**
   * Creates a new <code>FanNewClassPage</code>
   */
  new make() : super(TypeKind.classType, pageId,
    FanWizardMessages.NewClassPage_title,
    FanWizardMessages.NewClassPage_description) 
  {
    buttonNames3 := [
      FanWizardMessages.NewClassPage_methods_main,
      FanWizardMessages.NewClassPage_methods_constructors, 
      FanWizardMessages.NewClassPage_methods_inherited
    ]
    methodStubsButtons= SelectionButtonDialogFieldGroup(SWT.CHECK, buttonNames3, 1)
    methodStubsButtons.setLabelText(FanWizardMessages.NewClassPage_methods_label)   
  }
  
  override Void init(IStructuredSelection selection, FanNewTypePage page)
  {
    melem := page.getInitialScriptElement(selection)
    page.initTypePage(melem)
    page.doStatusUpdate
    
    createMainMethod := false
    createConstructors := false
    createUnimplemented := false
    dialogSettings := page.getDialogSettings
    if (dialogSettings != null)
    {
      section := dialogSettings.getSection(pageId)
      if (section != null)
      {
        createMainMethod = section.getBoolean(createMain)
        createConstructors = section.getBoolean(createConstr)
        createUnimplemented = section.getBoolean(createUnimpl)
      }
    }
    setMethodStubSelection(createMainMethod, createConstructors, createUnimplemented, true)
  }
  
  /*
   * @see WizardPage#createControl
   */
  Void createControl(Composite parent, FanNewTypePage page)
  {
    page.initializeDialogUnits(parent)
    composite := Composite(parent, SWT.NONE)
    composite.setFont(parent.getFont)
    
    nColumns := 4
    
    layout := GridLayout()
    layout.numColumns= nColumns    
    composite.setLayout(layout)
    
    // pick & choose the wanted UI components
    
    page.createContainerControls(composite, nColumns)

    page.createFilenameControls(composite, nColumns)
        
    page.createSeparator(composite, nColumns)
    
    page.createTypeNameControls(composite, nColumns)
    page.createModifierControls(composite, nColumns)
      
    page.createSuperClassControls(composite, nColumns)
    page.createSuperMixinsControls(composite, nColumns)
        
    createMethodStubSelectionControls(composite, nColumns)
    
    page.createCommentControls(composite, nColumns)
    page.enableCommentControl(true)
    
    page.setControl(composite)
      
    Dialog.applyDialogFont(composite)
  }
  
  /*
   * @see WizardPage#becomesVisible
   */
  override Void storeSettings(IDialogSettings dialogSettings)
  {
    section := dialogSettings.getSection(pageId) ?: dialogSettings.addNewSection(pageId)
    section.put(createMain, isCreateMain)
    section.put(createConstr, isCreateConstructors)
    section.put(createUnimpl, isCreateInherited)
  } 
  
  private Void createMethodStubSelectionControls(Composite composite, Int nColumns)
  {
    labelControl := methodStubsButtons.getLabelControl(composite)
    LayoutUtil.setHorizontalSpan(labelControl, nColumns)
    
    DialogField.createEmptySpace(composite)
    
    buttonGroup := methodStubsButtons.getSelectionButtonsGroup(composite)
    LayoutUtil.setHorizontalSpan(buttonGroup, nColumns - 1)  
  }
  
  /**
   * Returns the current selection state of the 'Create Main' checkbox.
   * 
   * @return the selection state of the 'Create Main' checkbox
   */
  Bool isCreateMain() { methodStubsButtons.isSelected(0) }

  /**
   * Returns the current selection state of the 'Create Constructors' checkbox.
   * 
   * @return the selection state of the 'Create Constructors' checkbox
   */
  Bool isCreateConstructors() { methodStubsButtons.isSelected(1) }
  
  /**
   * Returns the current selection state of the 'Create inherited abstract methods' 
   * checkbox.
   * 
   * @return the selection state of the 'Create inherited abstract methods' checkbox
   */
  Bool isCreateInherited() { methodStubsButtons.isSelected(2) }

  /**
   * Sets the selection state of the method stub checkboxes.
   * 
   * @param createMain initial selection state of the 'Create Main' checkbox.
   * @param createConstructors initial selection state of the 'Create Constructors' checkbox.
   * @param createInherited initial selection state of the 'Create inherited abstract methods' checkbox.
   * @param canBeModified if <code>true</code> the method stub checkboxes can be changed by 
   * the user. If <code>false</code> the buttons are "read-only"
   */
  public Void setMethodStubSelection(Bool createMain, Bool createConstructors, Bool createInherited, Bool canBeModified)
  {
    methodStubsButtons.setSelection(0, createMain)
    methodStubsButtons.setSelection(1, createConstructors)
    methodStubsButtons.setSelection(2, createInherited)
    methodStubsButtons.setEnabled(canBeModified)
  }

  override Str getTypeBody(Str typeName, Str lineDelimiter)
  {
    buf := StrBuf()
    if(isCreateMain())buf.add(getMainMethod(lineDelimiter))
    if(isCreateConstructors())buf.add(getConstructors(lineDelimiter))
    if(isCreateInherited())buf.add(getInheritedMethods(lineDelimiter))
    return buf.toStr
  }

  private Str getInheritedMethods(Str lineDelimiter) { "" }

  private Str getConstructors(Str lineDelimiter) { "" }

  private Str getMainMethod(Str lineDelimiter)
  {
    buf := StrBuf();
    buf.add("\tstatic Void main(Str[] args)").add(lineDelimiter)
    buf.add("\t{").add(lineDelimiter).add(lineDelimiter)
    buf.add("\t}").add(lineDelimiter)    
    return buf.toStr
  }
}
