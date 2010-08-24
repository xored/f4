/**
 * 
 */
package com.xored.fanide.internal.ui.explorer;

import org.eclipse.dltk.internal.ui.actions.CCPActionGroup;
import org.eclipse.dltk.internal.ui.wizards.buildpath.newsourcepage.GenerateBuildPathActionGroup;
import org.eclipse.dltk.ui.IContextMenuConstants;
import org.eclipse.dltk.ui.actions.GenerateActionGroup;
import org.eclipse.jface.action.IMenuManager;
import org.eclipse.jface.action.Separator;
import org.eclipse.ui.IActionBars;
import org.eclipse.ui.IViewPart;
import org.eclipse.ui.actions.ActionContext;
import org.eclipse.ui.navigator.CommonActionProvider;
import org.eclipse.ui.navigator.ICommonActionExtensionSite;
import org.eclipse.ui.navigator.ICommonViewerWorkbenchSite;

/**
 * @author akazantsev
 * 
 */
@SuppressWarnings("restriction")
public class FanExplorerActionProvider extends CommonActionProvider {

	private CCPActionGroup fCCPGroup;
	private GenerateBuildPathActionGroup generateBPGroup;
	private GenerateActionGroup generateActionGroup;

	private boolean fInViewPart = false;

	@Override
	public void fillActionBars(IActionBars actionBars) {
		if (fInViewPart) {
			fCCPGroup.fillActionBars(actionBars);
			generateBPGroup.fillActionBars(actionBars);
			generateActionGroup.fillActionBars(actionBars);
			// fRefactorActionGroup.fillActionBars(actionBars);

		}
	}

	@Override
	public void fillContextMenu(IMenuManager menu) {
		if (fInViewPart) {
			fCCPGroup.fillContextMenu(menu);

			menu.appendToGroup("group.edit", new Separator());
			generateBPGroup.fillContextMenu(menu);
			generateActionGroup.fillContextMenu(menu);
			// fRefactorActionGroup.fillContextMenu(menu);

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

				fCCPGroup = new CCPActionGroup(viewPart);
				generateBPGroup = new GenerateBuildPathActionGroup(viewPart);
				generateActionGroup = new GenerateActionGroup(viewPart,
						IContextMenuConstants.GROUP_SHOW);
				// fRefactorActionGroup = new RefactorActionGroup(viewPart);

				fInViewPart = true;
			}
		}
	}

	@Override
	public void setContext(ActionContext context) {
		super.setContext(context);
		if (fInViewPart) {
			fCCPGroup.setContext(context);
			generateBPGroup.setContext(context);
			generateActionGroup.setContext(context);
			// fRefactorActionGroup.setContext(context);
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
			fCCPGroup.dispose();
			generateBPGroup.dispose();
			generateActionGroup.dispose();
			// fRefactorActionGroup.dispose();

		}
		super.dispose();
	}

}
