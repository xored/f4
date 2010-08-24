/**
 * 
 */
package com.xored.fanide.internal.ui.explorer;

import org.eclipse.dltk.internal.ui.actions.refactoring.RefactorActionGroup;
import org.eclipse.jface.action.IMenuManager;
import org.eclipse.ui.IActionBars;
import org.eclipse.ui.IViewPart;
import org.eclipse.ui.actions.ActionContext;
import org.eclipse.ui.navigator.CommonActionProvider;
import org.eclipse.ui.navigator.ICommonActionExtensionSite;
import org.eclipse.ui.navigator.ICommonViewerWorkbenchSite;

/**
 * @author kappa
 * 
 */
@SuppressWarnings("restriction")
public class FanExplorerRefactorActionProvider extends CommonActionProvider {
	private RefactorActionGroup fRefactorActionGroup;

	private boolean fInViewPart = false;

	@Override
	public void fillActionBars(IActionBars actionBars) {
		if (fInViewPart) {
			fRefactorActionGroup.fillActionBars(actionBars);
			fRefactorActionGroup.retargetFileMenuActions(actionBars);

		}
	}

	@Override
	public void fillContextMenu(IMenuManager menu) {
		if (fInViewPart) {
			fRefactorActionGroup.fillContextMenu(menu);
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

				fRefactorActionGroup = new RefactorActionGroup(viewPart);

				fInViewPart = true;
			}
		}
	}

	@Override
	public void setContext(ActionContext context) {
		super.setContext(context);
		if (fInViewPart) {
			fRefactorActionGroup.setContext(context);
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
			fRefactorActionGroup.dispose();

		}
		super.dispose();
	}
}
