//
// Copyright (c) 2011 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Julia 14.08.2012 - Initial Contribution
//

using [java] org.eclipse.debug.ui
using [java] org.eclipse.debug.core
using [java] org.eclipse.swt.widgets
using [java] org.eclipse.swt.events
using [java] org.eclipse.swt.layout
using [java] org.eclipse.swt
using [java] org.eclipse.swt.graphics::Image
using [java] org.eclipse.jface.dialogs::Dialog
using [java] org.eclipse.ui::PlatformUI
using [java] org.eclipse.ui::ISharedImages
using [java] org.eclipse.jface.viewers
using [java] org.eclipse.ui.plugin::AbstractUIPlugin
using [java] java.util::ArrayList
using f4core
using f4core::FantomProjectManager2
using f4launching

class ProjectTab : AbstractLaunchConfigurationTab 
{
  private Combo? fSelectionCombo
  private CheckboxTreeViewer? fPluginTreeViewer
  private Button? selectAllButton
  private Button? deSelectAllButton
  private Button? addRequiredButton
  private FantomProject[]? projects
  
  // for combo
  private static const Int DEFAULT_SELECTION  := 0
  private static const Int CUSTOM_SELECTION   := 1

  private static const Str ATTR_PROJECT_SELECTION := "ATTR_PROJECTS_CUSTOM_SELECTION"
  
  new make() : super() { }
  
  override Void dispose() { super.dispose }
  
  protected Void createTreeViewer(Composite composite, Int span, Int indent)
  {
    fPluginTreeViewer = CheckboxTreeViewer(composite, SWT.BORDER.or(SWT.H_SCROLL).or(SWT.V_SCROLL).or(SWT.MULTI))
    fPluginTreeViewer.setContentProvider(TreeContentProvider())
    fPluginTreeViewer.setLabelProvider(TreeLabelProvider())
    fPluginTreeViewer.addCheckStateListener(CheckStateListener(this))
    fPluginTreeViewer.setAutoExpandLevel(1)
    
    gd := GridData(GridData.FILL_BOTH)
    gd.horizontalSpan = span
    gd.horizontalIndent = indent
    fPluginTreeViewer.getTree.setLayoutData(gd)
    
    if (fPluginTreeViewer.getInput == null){
      fPluginTreeViewer.setUseHashlookup(true)
      fPluginTreeViewer.setInput(getFantomProjects)
    }
  }
  
  protected Void createButtonContainer(Composite parent)
  {
    composite := Composite(parent, SWT.NONE)
    layout := GridLayout()
    layout.marginHeight = layout.marginWidth = 0
    composite.setLayout(layout)
    composite.setLayoutData(GridData(GridData.FILL_VERTICAL))
    label := Label(composite, SWT.NONE)
    selectAllButton   = createButton(composite, "Select All")
    deSelectAllButton = createButton(composite, "Deselect All")
    addRequiredButton = createButton(composite, "Add Required Projects")
  }
  
  private Button? createButton(Composite? composite, Str? text)
  {
    button := Button(composite, SWT.NONE)
    button.setText(text)
    button.setLayoutData(GridData(GridData.FILL_HORIZONTAL))
    button.addSelectionListener(ButtonListener(this))
    return button
  }
  
  override Void createControl(Composite? parent)
  {
    composite := Composite(parent, SWT.NONE)
    composite.setLayout(GridLayout(3, false))
    Label label := Label(composite, SWT.NONE)
    label.setText("Launch with:")
    fSelectionCombo = Combo(composite, SWT.READ_ONLY.or(SWT.BORDER))
    fSelectionCombo.setItems(Str ["all Fantom projects", "projects selected below only"])
    fSelectionCombo.setText(fSelectionCombo.getItem(0))
    fSelectionCombo.setLayoutData(GridData(GridData.FILL_HORIZONTAL))
    fSelectionCombo.addSelectionListener(ComboListener(this))
    
    gd := GridData(GridData.FILL_HORIZONTAL)
    gd.horizontalSpan = 3
    separator := Label(composite, SWT.SEPARATOR.or(SWT.HORIZONTAL))
    separator.setLayoutData(gd)

    createTreeViewer(composite, 2, 10)
    createButtonContainer(composite)
    enableViewer(false)
    
    setControl(composite)
    Dialog.applyDialogFont(composite)
  }
  
  override Void initializeFrom(ILaunchConfiguration? configuration) 
  {
    enableViewer(false)
    FantomProject[] allProj := getFantomProjects
    fPluginTreeViewer.setCheckedElements(allProj)
    fSelectionCombo.setText(fSelectionCombo.getItem(DEFAULT_SELECTION))
    if (configuration.getAttribute(ATTR_PROJECT_SELECTION, false))
    {
      ArrayList configEnv := configuration.getAttribute(LaunchConsts.projectList, ArrayList())
      fPluginTreeViewer.setInput(allProj)
      fSelectionCombo.setText(fSelectionCombo.getItem(CUSTOM_SELECTION))
      enableViewer(true)
      if (!configEnv.isEmpty)
      {
        selectedProj := allProj.exclude |FantomProject p -> Bool| { return !configEnv.contains(p.podName) }
        fPluginTreeViewer.setCheckedElements(selectedProj)
      } else {
        fPluginTreeViewer.setCheckedElements([,])
      }
      updateLaunchConfigurationDialog
    }
  }
  
  override Void setDefaults(ILaunchConfigurationWorkingCopy? configuration) 
  {
    configuration.setContainer(null)
  }
  
  override Void performApply(ILaunchConfigurationWorkingCopy? configuration) 
  {
    configuration.setAttribute(ATTR_PROJECT_SELECTION, (fSelectionCombo.getSelectionIndex == CUSTOM_SELECTION))
    if (fSelectionCombo.getSelectionIndex == DEFAULT_SELECTION) 
    {
      // if all projects selected -> no list saving
      configuration.removeAttribute(LaunchConsts.projectList)
    } else
    {
      FantomProject[] proj := (fSelectionCombo.getSelectionIndex == CUSTOM_SELECTION)? fPluginTreeViewer.getCheckedElements : getFantomProjects
      ArrayList configEnv := ArrayList()
      proj.each |FantomProject p| 
      { 
        string := p.podName
        if (!configEnv.contains(string))
          configEnv.add(string)  
      }
      configuration.setAttribute(LaunchConsts.projectList, configEnv)
    }
  }
  
  private FantomProject[] getFantomProjects()
  {
    return FantomProjectManager2.instance.allProjects.exclude { it.isPlugin }
  }
  
  private Void toggleProjects(Bool select)
  {
    fPluginTreeViewer.setCheckedElements(select ? getFantomProjects : [,])
  }
  
  protected Void buttonPressed(Obj source)
  {
    if (source == selectAllButton) {
      toggleProjects(true)
    } else if (source == deSelectAllButton) {
      toggleProjects(false)
    } else if (source == addRequiredButton) {
//      computeSubset()
    }
    updateLaunchConfigurationDialog
  }
  
  protected Void comboSelected()
  {
    enableViewer(fSelectionCombo.getSelectionIndex == CUSTOM_SELECTION)
    if (fSelectionCombo.getSelectionIndex == DEFAULT_SELECTION) 
      fPluginTreeViewer.setCheckedElements([,])
    updateLaunchConfigurationDialog
  }
  
  protected Void checkStateChanged()
  {
    updateLaunchConfigurationDialog
  }

  protected Void enableViewer(Bool enable)
  {
    fPluginTreeViewer.getTree.setEnabled(enable)
    selectAllButton.setEnabled(enable)
    deSelectAllButton.setEnabled(enable)
    addRequiredButton.setEnabled(false)
  }
  
  override Str? getId() { return "ProjectsTab" } 
  
  override Str? getName() { return "Projects" }
  
  override Image? getImage() 
  { 
    return PlatformUI.getWorkbench().getSharedImages().getImage(ISharedImages.IMG_OBJ_PROJECT) 
  }
	
  override Bool OkToLeaveTab() { true }
  override Void postApply() { }
}

************************************************************************************************
** ContentProvider for CheckBoxTreeViewer
************************************************************************************************ 
class TreeContentProvider : ITreeContentProvider
{
  private FantomProject[]? content 
  
  override Void dispose(){}
  
  override Void inputChanged(Viewer? viewer, Obj? oldInput, Obj? newInput) 
  { 
      this.content = (newInput != null)? (FantomProject[])newInput : null
  }
  
  override public Obj?[]? getElements(Obj? inputElement) { return content }
  
  override public Obj?[]? getChildren(Obj? parentElement) { return null }
  
  override public Obj? getParent(Obj? element) { return null }
  
  override public Bool hasChildren(Obj? element) { return false }
}

**
** Listener for CheckboxTreeViewer check state changes
** 
class CheckStateListener : ICheckStateListener
{
  private ProjectTab tab
  new make(ProjectTab tab) { this.tab = tab }
  
  override Void checkStateChanged(CheckStateChangedEvent? event) 
  {
    tab.checkStateChanged
  }
}

**
** LabelProvider for CheckBoxTreeViewer
** 
class TreeLabelProvider : LabelProvider 
{
  Image icon
  
  new make() 
  {
    icon = AbstractUIPlugin.imageDescriptorFromPlugin("com.xored.f4.debug.ui", "icons/obj16/fan_proj.gif").createImage
  }
  
  override Str? getText(Obj? element) 
  {
    return ((FantomProject) element).podName
  }

  override Image? getImage(Obj? element) { return icon }
}

**************************************************************************
** ComboListener
**************************************************************************
class ComboListener : SelectionAdapter
{
  private ProjectTab tab
  new make(ProjectTab tab) { this.tab = tab }
  
  override Void widgetSelected(SelectionEvent? e)
  {
    tab.comboSelected
  }
}

**
** Listener for buttons
** 
class ButtonListener : SelectionAdapter 
{
  private ProjectTab tab
  new make(ProjectTab tab) { this.tab = tab }
  
  override Void widgetSelected(SelectionEvent? e) 
  {
    source := e.getSource()
    tab.buttonPressed(source)
  }
}
