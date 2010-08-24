/**
 * 
 */
package com.xored.fanide.internal.ui.explorer;

import org.eclipse.dltk.ui.actions.OpenEditorActionGroup;
import org.eclipse.dltk.ui.actions.OpenViewActionGroup;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.action.IMenuManager;
import org.eclipse.ui.IActionBars;
import org.eclipse.ui.IViewPart;
import org.eclipse.ui.actions.ActionContext;
import org.eclipse.ui.actions.ActionGroup;

/**
 * @author kappa
 * 
 */
public class NavigateActionGroup extends ActionGroup {
	private OpenEditorActionGroup fOpenEditorActionGroup;
	private OpenViewActionGroup fOpenViewActionGroup;

	/**
	 * Creates a new <code>NavigateActionGroup</code>. The group requires that
	 * the selection provided by the part's selection provider is of type <code>
	 * org.eclipse.jface.viewers.IStructuredSelection</code>
	 * .
	 * 
	 * @param part
	 *            the view part that owns this action group
	 */
	public NavigateActionGroup(IViewPart part) {
		fOpenEditorActionGroup = new OpenEditorActionGroup(part);
		fOpenViewActionGroup = new OpenViewActionGroup(part) {

			@Override
			protected boolean getShowProperties() {
				return false;
			}

		};
	}

	/**
	 * Returns the open action managed by this action group.
	 * 
	 * @return the open action. Returns <code>null</code> if the group doesn't
	 *         provide any open action
	 */
	public IAction getOpenAction() {
		return fOpenEditorActionGroup.getOpenAction();
	}

	/*
	 * (non-Javadoc) Method declared in ActionGroup
	 */
	@Override
	public void dispose() {
		super.dispose();
		fOpenEditorActionGroup.dispose();
		fOpenViewActionGroup.dispose();
	}

	/*
	 * (non-Javadoc) Method declared in ActionGroup
	 */
	@Override
	public void fillActionBars(IActionBars actionBars) {
		super.fillActionBars(actionBars);
		fOpenEditorActionGroup.fillActionBars(actionBars);
		fOpenViewActionGroup.fillActionBars(actionBars);
	}

	/*
	 * (non-Javadoc) Method declared in ActionGroup
	 */
	@Override
	public void fillContextMenu(IMenuManager menu) {
		super.fillContextMenu(menu);

		fOpenEditorActionGroup.fillContextMenu(menu);
		fOpenViewActionGroup.fillContextMenu(menu);
	}

	/*
	 * (non-Javadoc) Method declared in ActionGroup
	 */
	@Override
	public void setContext(ActionContext context) {
		super.setContext(context);
		fOpenEditorActionGroup.setContext(context);
		fOpenViewActionGroup.setContext(context);
	}

	/*
	 * (non-Javadoc) Method declared in ActionGroup
	 */
	@Override
	public void updateActionBars() {
		super.updateActionBars();
		fOpenEditorActionGroup.updateActionBars();
		fOpenViewActionGroup.updateActionBars();
	}
}
