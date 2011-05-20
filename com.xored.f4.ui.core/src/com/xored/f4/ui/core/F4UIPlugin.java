package com.xored.f4.ui.core;

import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.ui.plugin.AbstractUIPlugin;
import org.osgi.framework.BundleContext;

import com.xored.fanide.internal.ui.FanUI;

public class F4UIPlugin extends AbstractUIPlugin {
	public static final String PLUGIN_ID = "com.xored.f4.ui.core";
	public F4UIPlugin() {}
	private static F4UIPlugin plugin = null;
	
	public static F4UIPlugin getDefault() {
		return plugin;
	}
	@Override
	public void start(BundleContext context) throws Exception {
		super.start(context);
		plugin = this;
	}
	
	@Override
	public void stop(BundleContext context) throws Exception {
		plugin = null;
		super.stop(context);
	}
	
	@Override
	public IPreferenceStore getPreferenceStore() {
		return FanUI.getDefault().getPreferenceStore();
	}

}
