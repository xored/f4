package com.xored.f4.launching;

import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.dltk.core.environment.IFileHandle;
import org.eclipse.dltk.internal.launching.AbstractInterpreterInstallType;
import org.eclipse.dltk.launching.EnvironmentVariable;
import org.eclipse.dltk.launching.IInterpreterInstallType;
import org.eclipse.dltk.launching.LibraryLocation;

public abstract class AbstractInterpreterInstallTypeBridge extends
		AbstractInterpreterInstallType implements IInterpreterInstallType {
	@Override
	public IStatus validateInstallLocation(IFileHandle installLocation,
			EnvironmentVariable[] variables,
			LibraryLocation[] libraryLocations, IProgressMonitor monitor) {
		return validateInstall(installLocation);
	}
	
	public abstract IStatus validateInstall(IFileHandle installLocation);
}
