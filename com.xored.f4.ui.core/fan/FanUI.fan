/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/

using [java] org.osgi.framework::BundleContext
using [java] org.eclipse.core.runtime::IStatus
using [java] org.eclipse.core.runtime::Status
using [java] org.eclipse.ui.plugin::AbstractUIPlugin
using [java] org.eclipse.dltk.ui.text.templates::ICodeTemplateAccess
using [java] org.eclipse.dltk.ui.text::ScriptTextTools

using [java] fanx.interop
using [java] com.xored.f4.ui.core::F4UIPlugin

/**
 * The activator class controls the plug-in life cycle
 */
class FanUI
{
	// The plug-in ID
	static const Str pluginId := F4UIPlugin.PLUGIN_ID
	static const Str actionSetId := "com.xored.fanide.ui.actionSet"
	static const Str explorerId := "com.xored.fanide.ui.explorer"

  
  private static const Unsafe storage := Unsafe([null]) 
	// The shared instance
	public static FanUI instance() {
    FanUI? result := storage.val->first
    if(result == null) {
      result = FanUI.make(F4UIPlugin.getDefault);
      storage.val->set(0, result)
    }
    return result
	} 

	//private ScriptTextTools fFanTextTools;

  AbstractUIPlugin plugin
  private new make(F4UIPlugin plugin) {
    this.plugin = plugin
  }
	
	static Void log(IStatus status) {
		instance.plugin.getLog.log(status)
	}

	static Void logErr(Err e)
  {
		log(Status(IStatus.ERROR, pluginId, e.msg, Interop.toJava(e)))
	}

	static Void error(Str message, Err? t := null) {
		log(Status(IStatus.ERROR, pluginId, IStatus.OK, message, Interop.toJava(t)))
	}

	static Void warn(Str message, Err? t := null)
  {
		log(Status(IStatus.WARNING, pluginId, message, Interop.toJava(t)))
	}

	//private ICodeTemplateAccess? codeTemplateAccess := null

  ICodeTemplateAccess getCodeTemplateAccess() { FanCodeTemplateAccess() }
}
