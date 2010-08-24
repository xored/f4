package com.xored.fanide.internal.core;

import org.eclipse.core.runtime.Preferences;
import org.eclipse.core.runtime.preferences.AbstractPreferenceInitializer;
import org.eclipse.dltk.compiler.task.TaskTagUtils;

import com.xored.fanide.core.FanCore;


public class FanCorePreferenceInitializer extends
		AbstractPreferenceInitializer {

	public void initializeDefaultPreferences() {
		Preferences store = FanCore.getDefault().getPluginPreferences();
		TaskTagUtils.initializeDefaultValues(store);
	}
}
