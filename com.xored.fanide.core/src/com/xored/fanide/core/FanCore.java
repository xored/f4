package com.xored.fanide.core;

import java.util.Collection;

import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Plugin;
import org.eclipse.core.runtime.Status;
import org.fantom.FantomVM;
import org.osgi.framework.BundleContext;

import com.xored.fanide.internal.core.FanBuildPathListener;
import com.xored.fanide.internal.core.FanProjectConfigurerExtensionPointManager;

/**
 * The activator class controls the plug-in life cycle
 */
public class FanCore extends Plugin {

	// The plug-in ID
	public static final String PLUGIN_ID = "com.xored.fanide.core"; //$NON-NLS-1$

	@Deprecated
	public static final String POD_FAN = "pod.fan"; //$NON-NLS-1$

	public static final String MAIN_METHOD = "main"; //$NON-NLS-1$

	public static final String POD_EXTENSION = "pod"; //$NON-NLS-1$

	public static final String DOT_POD_EXTENSION = "." + POD_EXTENSION; //$NON-NLS-1$

	// The shared instance
	private static FanCore plugin;

	/**
	 * The constructor
	 */
	public FanCore() {
	}

	@Override
	public void start(BundleContext context) throws Exception {
		super.start(context);
		plugin = this;
		FanBuildPathListener.install();
		FantomVM.getDefault();
	}

	@Override
	public void stop(BundleContext context) throws Exception {
		FanBuildPathListener.uninstall();
		plugin = null;
		super.stop(context);
	}

	/**
	 * Returns the shared instance
	 * 
	 * @return the shared instance
	 */
	public static FanCore getDefault() {
		return plugin;
	}

	public static String getUniqueIdentifier() {
		return PLUGIN_ID;
	}

	private static FanProjectConfigurerExtensionPointManager configurerManager;

	private static synchronized FanProjectConfigurerExtensionPointManager getConfigurerManager() {
		if (configurerManager == null) {
			configurerManager = new FanProjectConfigurerExtensionPointManager();
		}
		return configurerManager;
	}

	public static IProjectConfigurer[] getConfigurers() {
		final Collection<IProjectConfigurer> values = getConfigurerManager()
				.getConfigurers().values();
		return values.toArray(new IProjectConfigurer[values.size()]);
	}

	public static IProjectConfigurer getConfigurer(String name) {
		return getConfigurerManager().getConfigurers().get(name);
	}

	public static void log(IStatus status) {
		getDefault().getLog().log(status);
	}

	public static void warning(String message) {
		log(new Status(IStatus.WARNING, getUniqueIdentifier(), IStatus.ERROR,
				message, null));
	}

	public static void log(String message) {
		log(new Status(IStatus.ERROR, getUniqueIdentifier(), IStatus.ERROR,
				message, null));
	}

	public static void log(String message, Throwable th) {
		log(new Status(IStatus.ERROR, getUniqueIdentifier(), IStatus.ERROR,
				message, th));
	}

	public static void log(Throwable e) {
		log(new Status(IStatus.ERROR, getUniqueIdentifier(), IStatus.ERROR, e
				.getMessage(), e));
	}
}
