package com.xored.fanide.internal.ui.wizards;

import org.eclipse.dltk.ui.DLTKUILanguageManager;
import org.eclipse.dltk.ui.IDLTKUILanguageToolkit;
import org.eclipse.dltk.ui.PreferenceConstants;
import org.eclipse.dltk.ui.wizards.ProjectWizardFirstPage;
import org.eclipse.jface.layout.GridDataFactory;
import org.eclipse.jface.layout.GridLayoutFactory;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Group;

public class FanProjectWizardFirstPage extends ProjectWizardFirstPage {
	private boolean createJavaSourceFolder = false;

	@Override
	protected boolean interpeterRequired() {
		return true;
	}

	@Override
	public boolean isSrc() {
		final IDLTKUILanguageToolkit fanToolkit = DLTKUILanguageManager
				.getLanguageToolkit(getScriptNature());
		return fanToolkit
				.getBoolean(PreferenceConstants.SRCBIN_FOLDERS_IN_NEWPROJ);
	}

	@Override
	protected void createCustomGroups(Composite composite) {
		Group g = new Group(composite, SWT.NONE);
		g.setText("Fantom Java Options");
		GridDataFactory.fillDefaults().grab(true, false).applyTo(g);
		g.setLayout(initGridLayout(new GridLayout(1, false), true));

		final Button cnj = new Button(g, SWT.CHECK);
		cnj.setText("Create java source folder");
		cnj.addSelectionListener(new SelectionAdapter() {
			@Override
			public void widgetSelected(SelectionEvent e) {
				createJavaSourceFolder = cnj.getSelection();
			}
		});
	}

	public boolean isCreateJavaSourceFolder() {
		return createJavaSourceFolder;
	}
}
