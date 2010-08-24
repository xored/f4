package com.xored.fanide.internal.ui.actions;

import org.eclipse.dltk.ui.actions.ScriptOpenSearchPageAction;

public class OpenFanSearchPageAction extends ScriptOpenSearchPageAction {

	private static final String FAN_SEARCH_PAGE_ID = "com.xored.fanide.ui.FanSearchPage";

	@Override
	protected String getSearchPageId() {
		return FAN_SEARCH_PAGE_ID;
	}
}
