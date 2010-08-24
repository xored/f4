/**
 * 
 */
package com.xored.fanide.internal.ui.explorer;

import org.eclipse.dltk.internal.ui.navigator.OpenAndExpand;
import org.eclipse.dltk.ui.actions.OpenAction;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.action.IMenuManager;
import org.eclipse.jface.viewers.TreeViewer;
import org.eclipse.ui.IActionBars;
import org.eclipse.ui.IViewPart;
import org.eclipse.ui.actions.ActionContext;
import org.eclipse.ui.navigator.CommonActionProvider;
import org.eclipse.ui.navigator.ICommonActionConstants;
import org.eclipse.ui.navigator.ICommonActionExtensionSite;
import org.eclipse.ui.navigator.ICommonViewerWorkbenchSite;

/**
 * @author kappa
 * 
 */
@SuppressWarnings("restriction")
public class FanExplorerNavigateActionProvider extends CommonActionProvider {

	private IAction fOpenAndExpand;
	private NavigateActionGroup fNavigateActionGroup;

	private boolean fInViewPart = false;

	@Override
	public void fillActionBars(IActionBars actionBars) {
		if (fInViewPart) {
			fNavigateActionGroup.fillActionBars(actionBars);

			if (fOpenAndExpand == null
					&& fNavigateActionGroup.getOpenAction().isEnabled())
				actionBars.setGlobalActionHandler(ICommonActionConstants.OPEN,
						fNavigateActionGroup.getOpenAction());
			else if (fOpenAndExpand.isEnabled())
				actionBars.setGlobalActionHandler(ICommonActionConstants.OPEN,
						fOpenAndExpand);
		}

	}

	@Override
	public void fillContextMenu(IMenuManager menu) {
		if (fInViewPart) {
			fNavigateActionGroup.fillContextMenu(menu);

		}
	}

	@Override
	public void init(ICommonActionExtensionSite site) {

		ICommonViewerWorkbenchSite workbenchSite = null;
		if (site.getViewSite() instanceof ICommonViewerWorkbenchSite)
			workbenchSite = (ICommonViewerWorkbenchSite) site.getViewSite();

		if (workbenchSite != null) {
			if (workbenchSite.getPart() != null
					&& workbenchSite.getPart() instanceof IViewPart) {
				IViewPart viewPart = (IViewPart) workbenchSite.getPart();
				fNavigateActionGroup = new NavigateActionGroup(viewPart);
				if (site.getStructuredViewer() instanceof TreeViewer)
					fOpenAndExpand = new OpenAndExpand(workbenchSite.getSite(),
							(OpenAction) fNavigateActionGroup.getOpenAction(),
							(TreeViewer) site.getStructuredViewer());
				fInViewPart = true;
			}
		}
	}

	@Override
	public void setContext(ActionContext context) {
		super.setContext(context);
		if (fInViewPart) {
			fNavigateActionGroup.setContext(context);
		}
	}

	/*
	 * @see org.eclipse.ui.actions.ActionGroup#dispose()
	 * 
	 * @since 3.5
	 */
	@Override
	public void dispose() {
		if (fInViewPart) {
			fNavigateActionGroup.dispose();
		}
		super.dispose();
	}

}
