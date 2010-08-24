/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui.editor;

import java.util.ArrayList;

import org.eclipse.dltk.core.IModelElement;
import org.eclipse.dltk.internal.ui.editor.IScriptEditor;
import org.eclipse.dltk.internal.ui.editor.ScriptOutlinePage;
import org.eclipse.dltk.ui.DLTKPluginImages;
import org.eclipse.dltk.ui.actions.MemberFilterActionGroup;
import org.eclipse.dltk.ui.viewsupport.MemberFilterAction;
import org.eclipse.dltk.ui.viewsupport.ModelElementFilter;
import org.eclipse.jface.action.IToolBarManager;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.ui.IActionBars;

public class FanOutlinePage extends ScriptOutlinePage {

	public FanOutlinePage(IScriptEditor editor, IPreferenceStore store) {
		super(editor, store);
	}

	@Override
	protected void registerSpecialToolbarActions(IActionBars actionBars) {
		IToolBarManager toolBarManager = actionBars.getToolBarManager();

		MemberFilterActionGroup fMemberFilterActionGroup = new MemberFilterActionGroup(
				fOutlineViewer, fStore); //$NON-NLS-1$

		String title, helpContext;
		ArrayList<MemberFilterAction> actions = new ArrayList<MemberFilterAction>(
				3);

		// fill-in actions variables

		title = ActionMessages.MemberFilterActionGroup_hide_variables_label;
		// TODO help support
		helpContext = "";// IDLTKHelpContextIds.FILTER_FIELDS_ACTION;
		MemberFilterAction hideVariables = new MemberFilterAction(
				fMemberFilterActionGroup, title, new ModelElementFilter(
						IModelElement.FIELD), helpContext, true);
		hideVariables
				.setDescription(ActionMessages.MemberFilterActionGroup_hide_variables_description);
		hideVariables
				.setToolTipText(ActionMessages.MemberFilterActionGroup_hide_variables_tooltip);
		DLTKPluginImages.setLocalImageDescriptors(hideVariables,
				"filter_fields.gif"); //$NON-NLS-1$
		actions.add(hideVariables);

		// procedures

		title = ActionMessages.MemberFilterActionGroup_hide_functions_label;
		// TODO help support
		helpContext = "";// IDLTKHelpContextIds.FILTER_STATIC_ACTION;
		MemberFilterAction hideProcedures = new MemberFilterAction(
				fMemberFilterActionGroup, title, new ModelElementFilter(
						IModelElement.METHOD), helpContext, true);
		hideProcedures
				.setDescription(ActionMessages.MemberFilterActionGroup_hide_functions_description);
		hideProcedures
				.setToolTipText(ActionMessages.MemberFilterActionGroup_hide_functions_tooltip);
		// TODO: add correct icon
		DLTKPluginImages.setLocalImageDescriptors(hideProcedures,
				"filter_methods.gif"); //$NON-NLS-1$
		actions.add(hideProcedures);

		// namespaces

		title = ActionMessages.MemberFilterActionGroup_hide_classes_label;
		// TODO help support
		helpContext = "";// IDLTKHelpContextIds.FILTER_PUBLIC_ACTION;
		MemberFilterAction hideNamespaces = new MemberFilterAction(
				fMemberFilterActionGroup, title, new ModelElementFilter(
						IModelElement.TYPE), helpContext, true);
		hideNamespaces
				.setDescription(ActionMessages.MemberFilterActionGroup_hide_classes_description);
		hideNamespaces
				.setToolTipText(ActionMessages.MemberFilterActionGroup_hide_classes_tooltip);
		DLTKPluginImages.setLocalImageDescriptors(hideNamespaces,
				"filter_classes.gif"); //$NON-NLS-1$
		actions.add(hideNamespaces);

		// order corresponds to order in toolbar
		MemberFilterAction[] fFilterActions = actions
				.toArray(new MemberFilterAction[actions.size()]);

		fMemberFilterActionGroup.setActions(fFilterActions);

		fMemberFilterActionGroup.contributeToToolBar(toolBarManager);
	}
}
