/**
 * 
 */
package com.xored.fanide.internal.ui.explorer;

import org.eclipse.dltk.internal.ui.actions.ImportActionGroup;
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
public class ScriptPortingActionProvider extends CommonActionProvider {

	private ImportActionGroup fImportGroup;

	private boolean fInViewPart = false;

	@Override
	public void fillActionBars(IActionBars actionBars) {
		if (fInViewPart) {
			fImportGroup.fillActionBars(actionBars);
		}
	}

	@Override
	public void fillContextMenu(IMenuManager menu) {
		if (fInViewPart) {
			fImportGroup.fillContextMenu(menu);
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

				fImportGroup = new ImportActionGroup(viewPart);
				fInViewPart = true;
			}
		}
	}

	@Override
	public void setContext(ActionContext context) {
		super.setContext(context);
		if (fInViewPart) {
			fImportGroup.setContext(context);
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
			fImportGroup.dispose();
		}
		super.dispose();
	}

}
