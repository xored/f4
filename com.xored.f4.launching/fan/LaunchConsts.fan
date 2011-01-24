//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 25, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.launching
using [java] org.eclipse.debug.core::DebugPlugin
**
**
**
class LaunchConsts : ScriptLaunchConfigurationConstants
{
  static const Str skipAutosave := "fanSkipAutoSave"
  static const Str skipErrs := "fanSkipErrors"
  
  static const Str fanScriptId := "com.xored.fanide.launching.FanLaunchConfigurationType"
  static const Str fanProcessTypeId := "fanInterpreter"
  static const Str fanClass := "fanMainClass"
  static const Str useClassOnly := "useClassOnly" 
  static const Str fanProject := ATTR_PROJECT_NAME
  static const Str scriptNature := ATTR_SCRIPT_NATURE
  static const Str consoleEncoding := DebugPlugin.ATTR_CONSOLE_ENCODING
}
