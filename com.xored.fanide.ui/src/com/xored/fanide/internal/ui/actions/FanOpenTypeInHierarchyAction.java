/**
 * 
 */
package com.xored.fanide.internal.ui.actions;

import org.eclipse.dltk.ui.IDLTKUILanguageToolkit;
import org.eclipse.dltk.ui.actions.OpenTypeInHierarchyAction;

import com.xored.fanide.internal.ui.FanUILanguageToolkit;

/**
 * @author kappa
 * 
 */
public class FanOpenTypeInHierarchyAction extends OpenTypeInHierarchyAction {
	@Override
	protected IDLTKUILanguageToolkit getLanguageToolkit() {
		return FanUILanguageToolkit.getInstance();
	}
}