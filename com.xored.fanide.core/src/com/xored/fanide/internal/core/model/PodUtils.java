package com.xored.fanide.internal.core.model;

import org.eclipse.core.runtime.IPath;

import com.xored.fanide.core.FanCore;

public class PodUtils {

	public static String toPodName(IPath podPath) {
		String podName = podPath.lastSegment();
        if (podName.endsWith(FanCore.DOT_POD_EXTENSION))
            podName = podName.substring(0, podName.length() - FanCore.DOT_POD_EXTENSION.length());
        if (podName.indexOf('-') > 0)
            podName = podName.substring(0, podName.indexOf('-'));
		return podName;
	}

}
