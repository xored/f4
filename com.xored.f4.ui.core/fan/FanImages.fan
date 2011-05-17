/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/

using [java] org.eclipse.core.runtime::Path
using [java] org.eclipse.jface.resource::ImageDescriptor
using [java] org.eclipse.dltk.ui::PluginImagesHelper

class FanImages
{
  private static const Unsafe storage
  static {
    helper := PluginImagesHelper(FanUI.plugin.getBundle, Path("/icons"))
    storage = Unsafe([
      helper.createUnManaged(PluginImagesHelper.T_WIZBAN,"projectcreate_wiz.png"),
      helper.createUnManaged(PluginImagesHelper.T_WIZBAN,"filecreate_wiz.png")
    ])
  }
	static ImageDescriptor projectCreation() { (storage.val as List)[0] }
	static ImageDescriptor fileCreation() { (storage.val as List)[1] }
}
