package com.xored.fanide.internal.core;

import java.util.HashMap;

import org.eclipse.core.runtime.IConfigurationElement;
import org.eclipse.core.runtime.Platform;

import com.xored.fanide.core.FanCore;
import com.xored.fanide.core.IProjectConfigurer;

public class FanProjectConfigurerExtensionPointManager {
	private static final String PROJECTCONFIGURER_ID = "com.xored.fanide.projectconfigurer";
	private static final String TYPE_ATTRIBUTE_NAME = "type";
	private final HashMap<String, IProjectConfigurer> configurers;

	public FanProjectConfigurerExtensionPointManager() {
		this.configurers = new HashMap<String, IProjectConfigurer>();
		init();
	}

	public HashMap<String, IProjectConfigurer> getConfigurers() {
		return this.configurers;
	}

	private void init() {
		try {
			IConfigurationElement[] config = Platform.getExtensionRegistry()
					.getConfigurationElementsFor(PROJECTCONFIGURER_ID);
			for (IConfigurationElement iConfigurationElement : config) {
				String type = iConfigurationElement
						.getAttribute(TYPE_ATTRIBUTE_NAME);
				if (this.configurers.containsKey(type)) {
					FanCore
							.warning("There should be only one project configurer for '"
									+ type + "' type!");
				} else {
					final Object o = iConfigurationElement
							.createExecutableExtension("class");
					if (o instanceof IProjectConfigurer) {
						this.configurers.put(type, (IProjectConfigurer) o);
					}
				}
			}
		} catch (Exception ex) {
			FanCore.log(ex);
		}
	}
}
