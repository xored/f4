//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//	 Ivan Inozemtsev Jun 1, 2010 - Initial Contribution
//

using [java] org.eclipse.core.resources
using [java] org.eclipse.dltk.core
using f4core

class LaunchUtils {
	static Bool isOnBuildpath(IFile? file) {
		if (file == null) return false
		project := file.getProject
		if (!project.hasNature(F4Nature.id)) return false
		sp := DLTKCore.create(project)
		return sp.isOnBuildpath(file)
	}
}
