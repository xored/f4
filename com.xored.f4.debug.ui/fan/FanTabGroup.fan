//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 31, 2010 - Initial Contribution
//

using [java] org.eclipse.debug.ui
using [java] org.eclipse.debug.core
using [java] org.eclipse.dltk.debug.ui.launchConfigurations
using "[java]org.eclipse.dltk.internal.launching"
using [java] org.eclipse.swt.widgets
using [java] org.eclipse.swt.layout
using [java] org.eclipse.swt.events
using [java] org.eclipse.swt
using f4core
using f4launching
using f4model
**
**
**
class FanTabGroup : AbstractLaunchConfigurationTabGroup
{
  override Void createTabs(ILaunchConfigurationDialog? dialog, Str? mode)
  {
    main := FanMainConfigTab(mode)
    tabs := [main, ScriptArgumentsTab(), InterpreterTab(main),
      EnvironmentTab(), CommonTab()]
    setTabs(tabs)
  }
}

class FanMainConfigTab : MainLaunchConfigurationTab
{
  new make(Str mode) : super(mode) {}
  
  override Str? getNatureID() { F4Nature.id }
  
  override protected Void doCreateControl(Composite? parent)
  {
    group := Group(parent, SWT.NONE)
    group.setText("Launch class:")
    group.setLayoutData(GridData(GridData.FILL_HORIZONTAL))
    layout := GridLayout()
    layout.numColumns = 2
    group.setLayout(layout) 
    
    classText = Text(group, SWT.SINGLE.or(SWT.BORDER))
    classText.setLayoutData(GridData(GridData.FILL_HORIZONTAL))
    classText.addModifyListener(getWidgetListener)
    
    searchButton = createPushButton(group, "Browse...", null)
    searchButton.addSelectionListener(BrowseButtonListener(this))
  }
  
  private Button? searchButton
  private Text? classText
  
  Void browseClicked()
  {
    
  }
  
  override protected Void updateMainModuleFromConfig(ILaunchConfiguration? config)
  {
    classText.setText(mainClassName(config))
  }
  
  override protected Void doPerformApply(ILaunchConfigurationWorkingCopy? config)
  {
    super.doPerformApply(config)
    config.setAttribute(LaunchConsts.fanClass, mainClassText)
  }
  
  ** we don't need script name
  override protected Str? getScriptName() { "" }
  
  ** Validate class name instead
  override protected Bool validateScript() { validateClass }
  
  protected Bool validateClass()
  {
    className := mainClassText
    if(className.isEmpty) className = "Main"
    
    ns := FantomProjectManager.instance[getProject.getProject].ns
    type := ns.currPod.findType(className,false)
    if(type == null)
    {
      setErrorMessage("Class $className is not found")
      return false
    }
    mainSlot := type.findSlot("main", ns, false)
    if(mainSlot == null)
    {
      setErrorMessage("Class $className does not have 'main' method")
      return false
    }
    
    return true
  }
  
  private Str mainClassText() { classText.getText.trim }
  
  private Str mainClassName(ILaunchConfiguration? config)
  {
    LaunchConfigurationUtils.getString(config, LaunchConsts.fanClass, "")
  }
  
  
}

**************************************************************************
** BrowseButtonListener
**************************************************************************
class BrowseButtonListener : SelectionAdapter
{
  private FanMainConfigTab tab
  new make(FanMainConfigTab tab) { this.tab = tab }
  
  override Void widgetSelected(SelectionEvent? e)
  {
    tab.browseClicked
  }
}