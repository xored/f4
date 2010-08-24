package com.xored.f4.debug.ui;

import org.eclipse.ui.plugin.AbstractUIPlugin;

public class FanDebug extends AbstractUIPlugin {

	public FanDebug() {
		plugin = this;
	}

	private static FanDebug plugin;
	
	public static FanDebug getDefault() { return plugin; }
}
