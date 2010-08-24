package com.xored.fanide.internal.ui.editor;

import org.eclipse.osgi.util.NLS;

public class Messages extends NLS {
	private static final String BUNDLE_NAME = "com.xored.fanide.internal.ui.editor.messages";
	public static String FanEditor_matchingBracketIsOutsideSelectedElement;
	public static String FanEditor_nobracketSelected;
	public static String FanEditor_noMatchingBracketFound;
	static {
		NLS.initializeMessages(BUNDLE_NAME, Messages.class);
	}

	private Messages() {
	}
}
