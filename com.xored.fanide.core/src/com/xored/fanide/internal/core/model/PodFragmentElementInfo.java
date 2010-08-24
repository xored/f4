/**
 * 
 */
package com.xored.fanide.internal.core.model;

import org.eclipse.dltk.core.model.binary.SourceMapper;
import org.eclipse.dltk.internal.core.OpenableElementInfo;

public class PodFragmentElementInfo extends OpenableElementInfo {
	private SourceMapper sourceMapper;

	public SourceMapper getSourceMapper() {
		return sourceMapper;
	}

	public void setSourceMapper(SourceMapper sourceMapper) {
		this.sourceMapper = sourceMapper;
	}
}