package com.xored.fanide.internal.ui.compare;

import org.eclipse.compare.CompareConfiguration;
import org.eclipse.dltk.ui.compare.ScriptMergeViewer;
import org.eclipse.dltk.ui.text.ScriptTextTools;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.swt.widgets.Composite;

import com.xored.fanide.internal.ui.FanUI;
import com.xored.fanide.internal.ui.FanUILanguageToolkit;

public class FanMergeViewer extends ScriptMergeViewer {

	public FanMergeViewer(Composite parent, CompareConfiguration configuration) {
		super(parent, configuration, FanUILanguageToolkit.getInstance());
	}

	@Override
	protected IPreferenceStore getPreferenceStore() {
		return FanUI.getDefault().getPreferenceStore();
	}

	@Override
	protected ScriptTextTools getTextTools() {
		return FanUI.getDefault().getTextTools();
	}

	@Override
	public String getTitle() {
		return "Fantom Compare";
	}

}
