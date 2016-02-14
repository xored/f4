//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//	 Ivan Inozemtsev May 27, 2010 - Initial Contribution
//

using [java] org.eclipse.core.runtime
using [java] org.eclipse.debug.core
using [java] org.eclipse.debug.core.sourcelookup
using [java] org.eclipse.dltk.launching.sourcelookup
using [java] org.eclipse.jdt.launching.sourcelookup.containers

**
class SourcePathComputer : ISourcePathComputerDelegate {
	static const Str id := "com.xored.f4.jdt.launching.fanJavaSourcePathComputer"
	
	private ISourcePathComputerDelegate? java
	private ISourcePathComputerDelegate? fan
	
	new make() {
		java = JavaSourcePathComputer()
		fan = ScriptSourcePathComputer()
	}
	
	override ISourceContainer?[]? computeSourceContainers(ILaunchConfiguration? config, IProgressMonitor? monitor) {
		ISourceContainer[] jc := java.computeSourceContainers(config, monitor)
		
		try {
			ISourceContainer[] fc := fan.computeSourceContainers(config, monitor)
			jc.addAll(fc)
		} catch(Err e) {
			e.trace //TODO: Add logging
		}
		return jc
	}
}
