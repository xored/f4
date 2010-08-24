package com.xored.fanide.core;

import org.eclipse.dltk.core.AbstractLanguageToolkit;
import org.eclipse.dltk.core.DLTKFeatures;
import org.eclipse.dltk.core.IDLTKLanguageToolkit;
import org.eclipse.dltk.core.IDLTKLanguageToolkitExtension;
import org.eclipse.dltk.core.DLTKFeatures.BooleanFeature;

public class FanLanguageToolkit extends AbstractLanguageToolkit implements
		IDLTKLanguageToolkitExtension {
	private static FanLanguageToolkit sInstance = new FanLanguageToolkit();

	public FanLanguageToolkit() {
	}

	public boolean languageSupportZIPBuildpath() {
		return false;
	}

	public String getNatureId() {
		return FanNature.NATURE_ID;
	}

	public static IDLTKLanguageToolkit getDefault() {
		return sInstance;
	}

	public String getLanguageName() {
		return "Fantom";
	}

	public String getLanguageContentType() {
		return "com.xored.fanide.core.contentType";
	}

	public String getPreferenceQualifier() {
		return FanCore.PLUGIN_ID;
	}

	/**
	 * Should return false. Because PODs are implemented using model providers.
	 */
	public boolean isArchiveFileName(String name) {
		// if (name.endsWith(".pod")) {
		// return true;
		// }
		return false;
	}

	@Override
	public boolean get(BooleanFeature feature) {
		if (DLTKFeatures.FILE_EXTENSION_REQUIRED.equals(feature)) {
			return true;
		} else {
			return super.get(feature);
		}
	}
}
