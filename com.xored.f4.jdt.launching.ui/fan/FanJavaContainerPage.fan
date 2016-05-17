//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//	 Ivan Inozemtsev May 26, 2010 - Initial Contribution
//

using [java] org.eclipse.core.runtime
using [java] org.eclipse.jdt.core
using [java] org.eclipse.jdt.ui.wizards
using [java] org.eclipse.jface.wizard
using [java] org.eclipse.swt.widgets::Composite
using [java] org.fantom.fwt.util::FwtUtil
using f4jdtLaunching
using fwt

class FanJavaContainerPage : WizardPage, IClasspathContainerPage {
	new make() : super(FanJavaContainer#.name) {}
	
	override Bool finish() { true }
	
	private IClasspathEntry? cpEntry
	
	override IClasspathEntry? getSelection() { cpEntry }
	
	override Void setSelection(IClasspathEntry? containerEntry)	{
		cpEntry = containerEntry ?: 
			JavaCore.newContainerEntry(Path(JavaLaunchConsts.fanJavaContainer))
	}
	
	override Void createControl(Composite? parent) {
		control := GridPane {
			Label { text = "Fantom java container" },
		}
		
		FwtUtil.addToSwt(control, parent)
		setControl(FwtUtil.widget(control))
	}
}
