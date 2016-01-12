//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 3, 2010 - Initial Contribution
//

using [java] org.eclipse.debug.core
using [java] org.eclipse.debug.ui
using [java] org.eclipse.dltk.debug.ui
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
class FanTestingTabGroup : AbstractLaunchConfigurationTabGroup
{
  override Void createTabs(ILaunchConfigurationDialog? dialog, Str? mode)
  {
    main := FanTestingMainTab(mode)
    tabs := ILaunchConfigurationTab[ 
      main, 
      ScriptArgumentsTab(),
      InterpreterTab(main),
      EnvironmentTab(), 
      FanCommonTab()
    ]
    setTabs(tabs)
  }
}

class FanCommonTab : CommonTab
{
  override Void performApply(ILaunchConfigurationWorkingCopy? config)
  {
    super.performApply(config)
    config.setAttribute(IDebugUIConstants.ATTR_CAPTURE_IN_CONSOLE, null as Str)
  }
}

class FanTestingMainTab : MainLaunchConfigurationTab
{
  new make(Str mode) : super(mode) {}
  
  override Str? getNatureID := F4Nature.id
//////////////////////////////////////////////////////////////////////////
// Starting from here and till the end of file, the code is just a 
// copy-paste of `f4debugUi::FanTabGroup`. This happens because 
// in Fantom we can't inherit Java class with depth more than one
// and Ivan was too busy to simulate inheritance via composition
// So once this issue will be fixed on Fantom side, the code must
// be generalized
//////////////////////////////////////////////////////////////////////////
  
  override protected Void doCreateControl(Composite? parent)
  {
    group := Group(parent, SWT.NONE)
    group.setText("Launch class (tests for entire pod if empty):")
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
    if(className.isEmpty) return true //that's ok, tests from entire pod
    
    ns := FantomProjectManager.instance[getProject.getProject].ns
    type := ns.currPod.findType(className,false)
    if(type == null)
    {
      setErrorMessage("Class $className is not found")
      return false
    }
    
    if(!ParseUtil.inherits(type, "sys::Test", ns))
    {
      setErrorMessage("Class $className does not extend 'sys::Test' class")
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
  private FanTestingMainTab tab
  new make(FanTestingMainTab tab) { this.tab = tab }
  
  override Void widgetSelected(SelectionEvent? e)
  {
    tab.browseClicked
  }
}
