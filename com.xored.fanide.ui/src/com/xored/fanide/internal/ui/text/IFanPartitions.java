/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *

 *******************************************************************************/
package com.xored.fanide.internal.ui.text;

import org.eclipse.jface.text.IDocument;

import com.xored.fanide.core.FanConstants;

public interface IFanPartitions {

	public final static String FAN_PARTITIONING = FanConstants.FAN_PARTITIONING;

	public final static String FAN_MULTI_LINE_COMMENT = "__fan_multi_line_comment";
	public final static String FAN_SINGLE_LINE_COMMENT = "__fan_single_line_comment";
	public final static String FAN_INTERPRETER_STRING = "__fan_interpreter_string";
	public final static String FAN_DOC = "__fan_doc";
	public final static String FAN_STRING = "__fan_string";
	public final static String FAN_DSL = "__fan_dsl";

	public final static String[] FAN_PARITION_TYPES = new String[] {
			IFanPartitions.FAN_STRING, IFanPartitions.FAN_MULTI_LINE_COMMENT,
			IFanPartitions.FAN_INTERPRETER_STRING,
			IFanPartitions.FAN_SINGLE_LINE_COMMENT, IFanPartitions.FAN_DOC,
			IFanPartitions.FAN_DSL, IDocument.DEFAULT_CONTENT_TYPE };
}
