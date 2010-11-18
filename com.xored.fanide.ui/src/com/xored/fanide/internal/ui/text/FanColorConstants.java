/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.internal.ui.text;

import org.eclipse.dltk.ui.text.DLTKColorConstants;

public final class FanColorConstants {
	private FanColorConstants() {
	}

	/**
	 * The color key for string and character literals in Fantom code.
	 */
	public static final String FAN_STRING = DLTKColorConstants.DLTK_STRING; //$NON-NLS-1$

	/**
	 * The color key for Fantom documentation.
	 */
	public static final String FAN_DOC = DLTKColorConstants.DLTK_DOC; //$NON-NLS-1$

	/**
	 * The color key for Fantom domain specific language.
	 */
	public static final String FAN_DSL = "com.xored.fanide.ui.dsl"; //$NON-NLS-1$	

	/**
	 * The color key for Fantom multi-line comments.
	 */
	public static final String FAN_MULTI_LINE_COMMENT = DLTKColorConstants.DLTK_MULTI_LINE_COMMENT; //$NON-NLS-1$	

	/**
	 * The color key for Fantom comments.
	 */
	public static final String FAN_SINGLE_LINE_COMMENT = DLTKColorConstants.DLTK_SINGLE_LINE_COMMENT; //$NON-NLS-1$	

	/**
	 * The color key for Fantom numbers.
	 */
	public static final String FAN_NUMBER = DLTKColorConstants.DLTK_NUMBER; //$NON-NLS-1$

	/**
	 * The color key for Fantom keywords.
	 */
	public static final String FAN_KEYWORD = DLTKColorConstants.DLTK_KEYWORD; //$NON-NLS-1$

	/**
	 * The color key for Fantom keyword 'return'.
	 */
	public static final String FAN_KEYWORD_RETURN = DLTKColorConstants.DLTK_KEYWORD_RETURN; //$NON-NLS-1$	

	/**
	 * The color key for Fantom code.
	 */
	public static final String FAN_DEFAULT = DLTKColorConstants.DLTK_DEFAULT; //$NON-NLS-1$

	/**
	 * The color key for Fantom class definition.
	 */
	public static final String FAN_CLASS_DEFINITION = DLTKColorConstants.DLTK_CLASS_DEFINITION; //$NON-NLS-1$

	/**
	 * The color key for Fantom function definition.
	 */
	public static final String FAN_FUNCTION_DEFINITION = DLTKColorConstants.DLTK_FUNCTION_DEFINITION;

	/**
	 * The color key for Fantom decorator.
	 */
	public static final String FAN_DECORATOR = "DLTK_decorator";

	/**
	 * The color key for Fantom local variable reference
	 */
	public static final String FAN_VAR_REF = "fan_var_ref"; //$NON-NLS-1$
	
	/**
	 * The color key for Fantom local variable definition
	 */
	public static final String FAN_VAR_DEF = "fan_var_def"; //$NON-NLS-1$
	

	/**
	 * The color key for Fantom parameter def or ref
	 */
	public static final String FAN_PARAM = "fan_param"; //$NON-NLS-1$
	
	/**
	 * The color key for Fantom field.
	 */
	public static final String FAN_FIELD = "fan_field"; //$NON-NLS-1$

	/**
	 * The color key for Fantom static field.
	 */
	public static final String FAN_STATIC_FIELD = "fan_static_field"; //$NON-NLS-1$

	/**
	 * The color key for TO-DO tasks in comments.
	 */
	public static final String FAN_TODO_TAG = DLTKColorConstants.TASK_TAG;
	public static final String FAN_INTERPRETER_STRING = "FAN_interpreter_string";
	
	/**
	 * The color key for Fantom method
	 */
	public static final String FAN_METHOD = "fan_method"; //$NON-NLS-1$
	
	/**
	 * The color key for Fantom static method
	 */
	public static final String FAN_STATIC_METHOD = "fan_static_method"; //$NON-NLS-1$

}
