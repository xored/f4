package com.xored.fanide.internal.ui.text;

import org.eclipse.dltk.compiler.task.ITodoTaskPreferences;
import org.eclipse.dltk.ui.text.IColorManager;
import org.eclipse.dltk.ui.text.ScriptMultilineCommentScanner;
import org.eclipse.jface.preference.IPreferenceStore;

public class FanMultiLineCommentScanner extends ScriptMultilineCommentScanner {
	public FanMultiLineCommentScanner(IColorManager manager,
			IPreferenceStore store, String comment, String todoTag,
			ITodoTaskPreferences preferences) {
		super(manager, store, comment, todoTag, preferences, true);
	}

}
