//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 25, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.launching
**
**
**
class LaunchConsts : ScriptLaunchConfigurationConstants
{
  static const Str skipAutosave := "fanSkipAutoSave"
  static const Str skipErrs := "fanSkipErrors"
  
  static const Str fanScriptId := "com.xored.fanide.launching.FanLaunchConfigurationType"
  static const Str fanProcessTypeId := "fanInterpreter"; //$NON-NLS-1$
  static const Str fanClass := "fanMainClass"; //$NON-NLS-1$
  
  static const Str fanProject := ATTR_PROJECT_NAME
  static const Str scriptNature := ATTR_SCRIPT_NATURE
}
