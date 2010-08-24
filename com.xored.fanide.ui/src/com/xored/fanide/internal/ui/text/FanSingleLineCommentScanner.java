package com.xored.fanide.internal.ui.text;

import org.eclipse.dltk.compiler.task.ITodoTaskPreferences;
import org.eclipse.dltk.ui.text.IColorManager;
import org.eclipse.dltk.ui.text.ScriptCommentScanner;
import org.eclipse.jface.preference.IPreferenceStore;

public class FanSingleLineCommentScanner extends ScriptCommentScanner {
	public FanSingleLineCommentScanner(IColorManager manager,
			IPreferenceStore store, String comment, String todoTag,
			ITodoTaskPreferences preferences) {
		super(manager, store, comment, todoTag, preferences);
		// TODO Auto-generated constructor stub
	}

	@Override
	protected int skipCommentChars() {
		int c = read();
		while (Character.isWhitespace((char) c))
			c = read();
		int c2 = read();
		if (c == c2 && (c == '/' || c == '*')) {
			return 2;
		} else {
			unread();
			unread();
			return 0;
		}
	}
}
