/*******************************************************************************
 * Copyright (c) 2000, 2007 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui.editor;

import org.eclipse.core.filebuffers.IDocumentSetupParticipant;
import org.eclipse.dltk.ui.text.ScriptTextTools;
import org.eclipse.jface.text.IDocument;

import com.xored.fanide.internal.ui.FanUI;
import com.xored.fanide.internal.ui.text.IFanPartitions;


/**
 * The document setup participant for Fan.
 */
public class FanDocumentSetupParticipant implements
		IDocumentSetupParticipant {

	public FanDocumentSetupParticipant() {
	}

	/*
	 * @see org.eclipse.core.filebuffers.IDocumentSetupParticipant#setup(org.eclipse.jface.text.IDocument)
	 */
	public void setup(IDocument document) {
		ScriptTextTools tools = FanUI.getDefault().getTextTools();
		tools.setupDocumentPartitioner(document,
				IFanPartitions.FAN_PARTITIONING);
	}
}
