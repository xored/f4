package com.xored.fanide.ui.highlighting;

import org.eclipse.dltk.ui.editor.highlighting.SemanticHighlighting;

public final class SH extends SemanticHighlighting {

	private final String preferenceKey;
	private final String bgColor;
	private final String description;

	public SH(String editorXmlTagNameColor, String bgColor, String desc) {
		this.preferenceKey = editorXmlTagNameColor;
		this.bgColor = bgColor;
		this.description = desc;
	}

	@Override
	public boolean isSemanticOnly() {
		return description != null;
	}

	@Override
	public String getPreferenceKey() {
		return preferenceKey;
	}

	@Override
	public String getBackgroundPreferenceKey() {
		return bgColor;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((preferenceKey == null) ? 0 : preferenceKey.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		final SH other = (SH) obj;
		if (preferenceKey == null) {
			if (other.preferenceKey != null)
				return false;
		} else if (!preferenceKey.equals(other.preferenceKey))
			return false;
		return true;
	}

	@Override
	public String getDisplayName() {
		return description;
	}
}