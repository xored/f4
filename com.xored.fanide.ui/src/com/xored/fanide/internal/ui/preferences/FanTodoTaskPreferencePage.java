package com.xored.fanide.internal.ui.preferences;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.Preferences;
import org.eclipse.dltk.ui.PreferencesAdapter;
import org.eclipse.dltk.ui.preferences.AbstractConfigurationBlockPropertyAndPreferencePage;
import org.eclipse.dltk.ui.preferences.AbstractOptionsBlock;
import org.eclipse.dltk.ui.preferences.AbstractTodoTaskOptionsBlock;
import org.eclipse.dltk.ui.preferences.PreferenceKey;
import org.eclipse.dltk.ui.util.IStatusChangeListener;
import org.eclipse.ui.preferences.IWorkbenchPreferenceContainer;

import com.xored.fanide.core.FanCore;
import com.xored.fanide.core.FanNature;

@SuppressWarnings("deprecation")
public class FanTodoTaskPreferencePage extends
		AbstractConfigurationBlockPropertyAndPreferencePage {

	static final PreferenceKey CASE_SENSITIVE = AbstractTodoTaskOptionsBlock
			.createCaseSensitiveKey(FanCore.PLUGIN_ID);

	static final PreferenceKey ENABLED = AbstractTodoTaskOptionsBlock
			.createEnabledKey(FanCore.PLUGIN_ID);

	static final PreferenceKey TAGS = AbstractTodoTaskOptionsBlock
			.createTagKey(FanCore.PLUGIN_ID);

	@Override
	protected String getHelpId() {
		return null;
	}

	@Override
	protected void setDescription() {
		setDescription(FanPreferencesMessages.TodoTaskDescription);
	}

	protected Preferences getPluginPreferences() {
		return FanCore.getDefault().getPluginPreferences();
	}

	@Override
	protected AbstractOptionsBlock createOptionsBlock(
			IStatusChangeListener newStatusChangedListener, IProject project,
			IWorkbenchPreferenceContainer container) {
		return new AbstractTodoTaskOptionsBlock(newStatusChangedListener,
				project, getPreferenceKeys(), container) {
			@Override
			protected PreferenceKey getTags() {
				return TAGS;
			}

			@Override
			protected PreferenceKey getEnabledKey() {
				return ENABLED;
			}

			@Override
			protected PreferenceKey getCaseSensitiveKey() {
				return CASE_SENSITIVE;
			}
		};
	}

	@Override
	protected String getNatureId() {
		return FanNature.NATURE_ID;
	}

	@Override
	protected String getProjectHelpId() {
		return null;
	}

	@Override
	protected void setPreferenceStore() {
		setPreferenceStore(new PreferencesAdapter(FanCore.getDefault()
				.getPluginPreferences()));
	}

	@Override
	protected String getPreferencePageId() {
		return "com.xored.fanide.ui.preferences.todo";
	}

	@Override
	protected String getPropertyPageId() {
		return "com.xored.fanide.ui.propertyPage.todo";
	}

	protected PreferenceKey[] getPreferenceKeys() {
		return new PreferenceKey[] { TAGS, ENABLED, CASE_SENSITIVE };
	}
}
