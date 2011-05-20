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

/**
 * The activator class controls the plug-in life cycle
 */
class FanUI : AbstractUIPlugin
{
	// The plug-in ID
	static const Str pluginId := "com.xored.f4.ui.core"
	static const Str actionSetId := "com.xored.fanide.ui.actionSet"
	static const Str explorerId := "com.xored.fanide.ui.explorer"

  
  private static const Unsafe storage := Unsafe([null]) 
	// The shared instance
	public static FanUI plugin() { (storage.val as Obj?[])[0] } 

	//private ScriptTextTools fFanTextTools;

  new make() : super() {
    
  }
	/**
	 * The constructor
	 */
	override Void start(BundleContext? context) {
    super.start(context)
		(storage.val as Obj?[])[0] = this
	}

	override Void stop(BundleContext? context)
  {
		(storage.val as Obj?[])[0] = null
		super.stop(context)
	}

	/**
	 * Returns the shared instance
	 * 
	 * @return the shared instance
	 */
//	static FanUI getDefault()
//  {
//    plugin
//	}

	/*public synchronized ScriptTextTools getTextTools() {
		if (fFanTextTools == null)
			fFanTextTools = (ScriptTextTools)FantomVM.makeObject("f4uiText::FanTextTools");
		return fFanTextTools;
	}*/

	static Void log(IStatus status) {
		plugin.getLog.log(status)
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

  once ICodeTemplateAccess getCodeTemplateAccess() { FanCodeTemplateAccess() }
}
