/*******************************************************************************
 * Copyright (c) 2009 xored software, inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 
 *******************************************************************************/
package com.xored.fanide.ui;

import org.eclipse.dltk.ui.CodeFormatterConstants;
import org.eclipse.dltk.ui.PreferenceConstants;
import org.eclipse.dltk.ui.preferences.NewScriptProjectPreferencePage;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.jface.preference.PreferenceConverter;
import org.eclipse.swt.graphics.RGB;

import com.xored.fanide.internal.ui.text.FanColorConstants;

public class FanPreferenceConstants extends PreferenceConstants {

	/*
	 * Domain specific language
	 */
	/**
	 * A named preference that holds the color used to render DSLs.
	 * <p>
	 * Value is of type <code>String</code>. A RGB color value encoded as a
	 * string using class <code>PreferenceConverter</code>
	 * </p>
	 * 
	 * @see org.eclipse.jface.resource.StringConverter
	 * @see org.eclipse.jface.preference.PreferenceConverter
	 */
	public final static String EDITOR_DSL_COLOR = FanColorConstants.FAN_DSL;

	/**
	 * A named preference that controls whether DSLs are rendered in bold.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> DSLs are
	 * rendered in bold. If <code>false</code> the are rendered using no font
	 * style attribute.
	 * </p>
	 */
	public final static String EDITOR_DSL_BOLD = FanColorConstants.FAN_DSL
			+ EDITOR_BOLD_SUFFIX;

	/**
	 * A named preference that controls whether DSLs are rendered in italic.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> DSLs are
	 * rendered in italic. If <code>false</code> the are rendered using no
	 * italic font style attribute.
	 * </p>
	 */
	public final static String EDITOR_DSL_ITALIC = FanColorConstants.FAN_DSL
			+ EDITOR_ITALIC_SUFFIX;

	/**
	 * A named preference that controls whether DSLs are rendered in
	 * strikethrough.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> DSLs are
	 * rendered in strikethrough. If <code>false</code> the are rendered using
	 * no italic font style attribute.
	 * </p>
	 */
	public final static String EDITOR_DSL_STRIKETHROUGH = FanColorConstants.FAN_DSL
			+ EDITOR_STRIKETHROUGH_SUFFIX;

	/**
	 * A named preference that controls whether DSLs are rendered in underline.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> DSLs are
	 * rendered in underline. If <code>false</code> the are rendered using no
	 * italic font style attribute.
	 * </p>
	 * 
	 * 
	 */
	public final static String EDITOR_DSL_UNDERLINE = FanColorConstants.FAN_DSL
			+ EDITOR_UNDERLINE_SUFFIX;

	/*
	 * Documentation
	 */
	/**
	 * A named preference that holds the color used to render documentation.
	 * <p>
	 * Value is of type <code>String</code>. A RGB color value encoded as a
	 * string using class <code>PreferenceConverter</code>
	 * </p>
	 * 
	 * @see org.eclipse.jface.resource.StringConverter
	 * @see org.eclipse.jface.preference.PreferenceConverter
	 */
	public final static String EDITOR_DOC_COLOR = FanColorConstants.FAN_DOC;

	/**
	 * A named preference that controls whether documentation are rendered in
	 * bold.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> documentation
	 * are rendered in bold. If <code>false</code> the are rendered using no
	 * font style attribute.
	 * </p>
	 */
	public final static String EDITOR_DOC_BOLD = FanColorConstants.FAN_DOC
			+ EDITOR_BOLD_SUFFIX;

	/**
	 * A named preference that controls whether documentation are rendered in
	 * italic.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> documentation
	 * are rendered in italic. If <code>false</code> the are rendered using no
	 * italic font style attribute.
	 * </p>
	 */
	public final static String EDITOR_DOC_ITALIC = FanColorConstants.FAN_DOC
			+ EDITOR_ITALIC_SUFFIX;

	/**
	 * A named preference that controls whether documentation are rendered in
	 * strikethrough.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> documentation
	 * are rendered in strikethrough. If <code>false</code> the are rendered
	 * using no italic font style attribute.
	 * </p>
	 */
	public final static String EDITOR_DOC_STRIKETHROUGH = FanColorConstants.FAN_DOC
			+ EDITOR_STRIKETHROUGH_SUFFIX;

	/**
	 * A named preference that controls whether documentation are rendered in
	 * underline.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> documentation
	 * are rendered in underline. If <code>false</code> the are rendered using
	 * no italic font style attribute.
	 * </p>
	 * 
	 * 
	 */
	public final static String EDITOR_DOC_UNDERLINE = FanColorConstants.FAN_DOC
			+ EDITOR_UNDERLINE_SUFFIX;

	/*
	 * Multi line comment
	 */
	/**
	 * A named preference that holds the color used to render multi line
	 * comments.
	 * <p>
	 * Value is of type <code>String</code>. A RGB color value encoded as a
	 * string using class <code>PreferenceConverter</code>
	 * </p>
	 * 
	 * @see org.eclipse.jface.resource.StringConverter
	 * @see org.eclipse.jface.preference.PreferenceConverter
	 */
	public final static String EDITOR_MULTI_LINE_COMMENT_COLOR = FanColorConstants.FAN_MULTI_LINE_COMMENT;

	/**
	 * A named preference that controls whether multi line comments are rendered
	 * in bold.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> multi line
	 * comments are rendered in bold. If <code>false</code> the are rendered
	 * using no font style attribute.
	 * </p>
	 */
	public final static String EDITOR_MULTI_LINE_COMMENT_BOLD = FanColorConstants.FAN_MULTI_LINE_COMMENT
			+ EDITOR_BOLD_SUFFIX;

	/**
	 * A named preference that controls whether multi line comments are rendered
	 * in italic.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> multi line
	 * comments are rendered in italic. If <code>false</code> the are rendered
	 * using no italic font style attribute.
	 * </p>
	 */
	public final static String EDITOR_MULTI_LINE_COMMENT_ITALIC = FanColorConstants.FAN_MULTI_LINE_COMMENT
			+ EDITOR_ITALIC_SUFFIX;

	/**
	 * A named preference that controls whether multi line comments are rendered
	 * in strikethrough.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> multi line
	 * comments are rendered in strikethrough. If <code>false</code> the are
	 * rendered using no italic font style attribute.
	 * </p>
	 */
	public final static String EDITOR_MULTI_LINE_COMMENT_STRIKETHROUGH = FanColorConstants.FAN_MULTI_LINE_COMMENT
			+ EDITOR_STRIKETHROUGH_SUFFIX;

	/**
	 * A named preference that controls whether multi line comments are rendered
	 * in underline.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> multi line
	 * comments are rendered in underline. If <code>false</code> the are
	 * rendered using no italic font style attribute.
	 * </p>
	 * 
	 * 
	 */
	public final static String EDITOR_MULTI_LINE_COMMENT_UNDERLINE = FanColorConstants.FAN_MULTI_LINE_COMMENT
			+ EDITOR_UNDERLINE_SUFFIX;

	/*
	 * Single line comment
	 */
	/**
	 * A named preference that holds the color used to render single line
	 * comments.
	 * <p>
	 * Value is of type <code>String</code>. A RGB color value encoded as a
	 * string using class <code>PreferenceConverter</code>
	 * </p>
	 * 
	 * @see org.eclipse.jface.resource.StringConverter
	 * @see org.eclipse.jface.preference.PreferenceConverter
	 */
	public final static String EDITOR_SINGLE_LINE_COMMENT_COLOR = FanColorConstants.FAN_SINGLE_LINE_COMMENT;

	/**
	 * A named preference that controls whether single line comments are
	 * rendered in bold.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in bold. If <code>false</code> the are rendered
	 * using no font style attribute.
	 * </p>
	 */
	public final static String EDITOR_SINGLE_LINE_COMMENT_BOLD = FanColorConstants.FAN_SINGLE_LINE_COMMENT
			+ EDITOR_BOLD_SUFFIX;

	/**
	 * A named preference that controls whether single line comments are
	 * rendered in italic.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in italic. If <code>false</code> the are rendered
	 * using no italic font style attribute.
	 * </p>
	 */
	public final static String EDITOR_SINGLE_LINE_COMMENT_ITALIC = FanColorConstants.FAN_SINGLE_LINE_COMMENT
			+ EDITOR_ITALIC_SUFFIX;

	/**
	 * A named preference that controls whether single line comments are
	 * rendered in strikethrough.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in strikethrough. If <code>false</code> the are
	 * rendered using no italic font style attribute.
	 * </p>
	 */
	public final static String EDITOR_SINGLE_LINE_COMMENT_STRIKETHROUGH = FanColorConstants.FAN_SINGLE_LINE_COMMENT
			+ EDITOR_STRIKETHROUGH_SUFFIX;

	/**
	 * A named preference that controls whether single line comments are
	 * rendered in underline.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in underline. If <code>false</code> the are
	 * rendered using no italic font style attribute.
	 * </p>
	 * 
	 * 
	 */
	public final static String EDITOR_SINGLE_LINE_COMMENT_UNDERLINE = FanColorConstants.FAN_SINGLE_LINE_COMMENT
			+ EDITOR_UNDERLINE_SUFFIX;

	/*
	 * Key worlds
	 */
	/**
	 * A named preference that holds the color used to render keyword.
	 * <p>
	 * Value is of type <code>String</code>. A RGB color value encoded as a
	 * string using class <code>PreferenceConverter</code>
	 * </p>
	 * 
	 * @see org.eclipse.jface.resource.StringConverter
	 * @see org.eclipse.jface.preference.PreferenceConverter
	 */
	public final static String EDITOR_KEYWORD_COLOR = FanColorConstants.FAN_KEYWORD;

	/**
	 * A named preference that controls whether kwyword are rendered in bold.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in bold. If <code>false</code> the are rendered
	 * using no font style attribute.
	 * </p>
	 */
	public final static String EDITOR_KEYWORD_BOLD = FanColorConstants.FAN_KEYWORD
			+ EDITOR_BOLD_SUFFIX;

	/**
	 * A named preference that controls whether keyword are rendered in italic.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in italic. If <code>false</code> the are rendered
	 * using no italic font style attribute.
	 * </p>
	 */
	public final static String EDITOR_KEYWORD_ITALIC = FanColorConstants.FAN_KEYWORD
			+ EDITOR_ITALIC_SUFFIX;

	/**
	 * A named preference that controls whether single line comments are
	 * rendered in strikethrough.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in strikethrough. If <code>false</code> the are
	 * rendered using no italic font style attribute.
	 * </p>
	 */
	public final static String EDITOR_KEYWORD_STRIKETHROUGH = FanColorConstants.FAN_KEYWORD
			+ EDITOR_STRIKETHROUGH_SUFFIX;

	/**
	 * A named preference that controls whether keyword are rendered in
	 * underline.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in underline. If <code>false</code> the are
	 * rendered using no italic font style attribute.
	 * </p>
	 * 
	 * 
	 */
	public final static String EDITOR_KEYWORD_UNDERLINE = FanColorConstants.FAN_KEYWORD
			+ EDITOR_UNDERLINE_SUFFIX;
	/*
	 * keyword return color
	 */
	/**
	 * A named preference that holds the color used to render keyword.
	 * <p>
	 * Value is of type <code>String</code>. A RGB color value encoded as a
	 * string using class <code>PreferenceConverter</code>
	 * </p>
	 * 
	 * @see org.eclipse.jface.resource.StringConverter
	 * @see org.eclipse.jface.preference.PreferenceConverter
	 */
	public final static String EDITOR_KEYWORD_RETURN_COLOR = FanColorConstants.FAN_KEYWORD_RETURN;

	/**
	 * A named preference that controls whether kwyword are rendered in bold.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in bold. If <code>false</code> the are rendered
	 * using no font style attribute.
	 * </p>
	 */
	public final static String EDITOR_KEYWORD_RETURN_BOLD = FanColorConstants.FAN_KEYWORD_RETURN
			+ EDITOR_BOLD_SUFFIX;

	/**
	 * A named preference that controls whether keyword are rendered in italic.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in italic. If <code>false</code> the are rendered
	 * using no italic font style attribute.
	 * </p>
	 */
	public final static String EDITOR_KEYWORD_RETURN_ITALIC = FanColorConstants.FAN_KEYWORD_RETURN
			+ EDITOR_ITALIC_SUFFIX;

	/**
	 * A named preference that controls whether single line comments are
	 * rendered in strikethrough.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in strikethrough. If <code>false</code> the are
	 * rendered using no italic font style attribute.
	 * </p>
	 */
	public final static String EDITOR_KEYWORD_RETURN_STRIKETHROUGH = FanColorConstants.FAN_KEYWORD_RETURN
			+ EDITOR_STRIKETHROUGH_SUFFIX;

	/**
	 * A named preference that controls whether keyword are rendered in
	 * underline.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in underline. If <code>false</code> the are
	 * rendered using no italic font style attribute.
	 * </p>
	 * 
	 * 
	 */
	public final static String EDITOR_KEYWORD_RETURN_UNDERLINE = FanColorConstants.FAN_KEYWORD_RETURN
			+ EDITOR_UNDERLINE_SUFFIX;

	/*
	 * Numbers
	 */
	/**
	 * A named preference that holds the color used to render NUMBER.
	 * <p>
	 * Value is of type <code>String</code>. A RGB color value encoded as a
	 * string using class <code>PreferenceConverter</code>
	 * </p>
	 * 
	 * @see org.eclipse.jface.resource.StringConverter
	 * @see org.eclipse.jface.preference.PreferenceConverter
	 */
	public final static String EDITOR_NUMBER_COLOR = FanColorConstants.FAN_NUMBER;

	/**
	 * A named preference that controls whether number are rendered in bold.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in bold. If <code>false</code> the are rendered
	 * using no font style attribute.
	 * </p>
	 */
	public final static String EDITOR_NUMBER_BOLD = FanColorConstants.FAN_NUMBER
			+ EDITOR_BOLD_SUFFIX;

	/**
	 * A named preference that controls whether NUMBER are rendered in italic.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in italic. If <code>false</code> the are rendered
	 * using no italic font style attribute.
	 * </p>
	 */
	public final static String EDITOR_NUMBER_ITALIC = FanColorConstants.FAN_NUMBER
			+ EDITOR_ITALIC_SUFFIX;

	/**
	 * A named preference that controls whether single line comments are
	 * rendered in strikethrough.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in strikethrough. If <code>false</code> the are
	 * rendered using no italic font style attribute.
	 * </p>
	 */
	public final static String EDITOR_NUMBER_STRIKETHROUGH = FanColorConstants.FAN_NUMBER
			+ EDITOR_STRIKETHROUGH_SUFFIX;

	/**
	 * A named preference that controls whether NUMBER are rendered in
	 * underline.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in underline. If <code>false</code> the are
	 * rendered using no italic font style attribute.
	 * </p>
	 * 
	 * 
	 */

	public final static String EDITOR_NUMBER_UNDERLINE = FanColorConstants.FAN_NUMBER
			+ EDITOR_UNDERLINE_SUFFIX;

	/*
	 * Strings
	 */
	/**
	 * A named preference that holds the color used to render STRING.
	 * <p>
	 * Value is of type <code>String</code>. A RGB color value encoded as a
	 * string using class <code>PreferenceConverter</code>
	 * </p>
	 * 
	 * @see org.eclipse.jface.resource.StringConverter
	 * @see org.eclipse.jface.preference.PreferenceConverter
	 */
	public final static String EDITOR_STRING_COLOR = FanColorConstants.FAN_STRING;

	/**
	 * A named preference that controls whether STRING are rendered in bold.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in bold. If <code>false</code> the are rendered
	 * using no font style attribute.
	 * </p>
	 */
	public final static String EDITOR_STRING_BOLD = FanColorConstants.FAN_STRING
			+ EDITOR_BOLD_SUFFIX;

	/**
	 * A named preference that controls whether STRING are rendered in italic.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in italic. If <code>false</code> the are rendered
	 * using no italic font style attribute.
	 * </p>
	 */
	public final static String EDITOR_STRING_ITALIC = FanColorConstants.FAN_STRING
			+ EDITOR_ITALIC_SUFFIX;

	/**
	 * A named preference that controls whether single line comments are
	 * rendered in strikethrough.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in strikethrough. If <code>false</code> the are
	 * rendered using no italic font style attribute.
	 * </p>
	 */
	public final static String EDITOR_STRING_STRIKETHROUGH = FanColorConstants.FAN_STRING
			+ EDITOR_STRIKETHROUGH_SUFFIX;

	/**
	 * A named preference that controls whether STRING are rendered in
	 * underline.
	 * <p>
	 * Value is of type <code>Boolean</code>. If <code>true</code> single line
	 * comments are rendered in underline. If <code>false</code> the are
	 * rendered using no italic font style attribute.
	 * </p>
	 */
	public final static String EDITOR_STRING_UNDERLINE = FanColorConstants.FAN_STRING
			+ EDITOR_UNDERLINE_SUFFIX;

	public final static String EDITOR_FUNCTION_DEFINITION_COLOR = FanColorConstants.FAN_FUNCTION_DEFINITION;
	public final static String EDITOR_CLASS_DEFINITION_COLOR = FanColorConstants.FAN_CLASS_DEFINITION;
	public final static String EDITOR_DECORATOR_COLOR = FanColorConstants.FAN_DECORATOR;

	public final static String COMMENT_TASK_TAGS = FanColorConstants.FAN_TODO_TAG;

	public final static String COMMENT_INTERPRETER_STRING = FanColorConstants.FAN_INTERPRETER_STRING;
	public final static String COMMENT_TASK_TAGS_BOLD = COMMENT_TASK_TAGS
			+ EDITOR_BOLD_SUFFIX;

	/**
	 * A named preference that controls if comment stubs will be added
	 * automatically to newly created types and methods.
	 * <p>
	 * Value is of type <code>Boolean</code>.
	 * </p>
	 * 
	 */
	public static final String CODEGEN_ADD_COMMENTS = "com.xored.fanide.ui.javadoc"; //$NON-NLS-1$

	/*
	 * Variables
	 */
	public final static String EDITOR_VAR_REF_COLOR = FanColorConstants.FAN_VAR_REF;
	public final static String EDITOR_VAR_REF_BOLD = FanColorConstants.FAN_VAR_REF + EDITOR_BOLD_SUFFIX;
	public final static String EDITOR_VAR_REF_ITALIC = FanColorConstants.FAN_VAR_REF + EDITOR_ITALIC_SUFFIX;
	public final static String EDITOR_VAR_REF_STRIKETHROUGH = FanColorConstants.FAN_VAR_REF + EDITOR_STRIKETHROUGH_SUFFIX;
	public final static String EDITOR_VAR_REF_UNDERLINE = FanColorConstants.FAN_VAR_REF + EDITOR_UNDERLINE_SUFFIX;
	
	public final static String EDITOR_VAR_DEF_COLOR = FanColorConstants.FAN_VAR_DEF;
	public final static String EDITOR_VAR_DEF_BOLD = FanColorConstants.FAN_VAR_DEF + EDITOR_BOLD_SUFFIX;
	public final static String EDITOR_VAR_DEF_ITALIC = FanColorConstants.FAN_VAR_DEF + EDITOR_ITALIC_SUFFIX;
	public final static String EDITOR_VAR_DEF_STRIKETHROUGH = FanColorConstants.FAN_VAR_DEF + EDITOR_STRIKETHROUGH_SUFFIX;
	public final static String EDITOR_VAR_DEF_UNDERLINE = FanColorConstants.FAN_VAR_DEF + EDITOR_UNDERLINE_SUFFIX;
	
	public final static String EDITOR_PARAM_COLOR = FanColorConstants.FAN_PARAM;
	public final static String EDITOR_PARAM_BOLD = FanColorConstants.FAN_PARAM + EDITOR_BOLD_SUFFIX;
	public final static String EDITOR_PARAM_ITALIC = FanColorConstants.FAN_PARAM + EDITOR_ITALIC_SUFFIX;
	public final static String EDITOR_PARAM_STRIKETHROUGH = FanColorConstants.FAN_PARAM + EDITOR_STRIKETHROUGH_SUFFIX;
	public final static String EDITOR_PARAM_UNDERLINE = FanColorConstants.FAN_PARAM + EDITOR_UNDERLINE_SUFFIX;

	// fields

	public final static String EDITOR_FIELD_COLOR = FanColorConstants.FAN_FIELD;
	public final static String EDITOR_FIELD_BOLD = FanColorConstants.FAN_FIELD
			+ EDITOR_BOLD_SUFFIX;
	public final static String EDITOR_FIELD_ITALIC = FanColorConstants.FAN_FIELD
			+ EDITOR_ITALIC_SUFFIX;
	public final static String EDITOR_FIELD_STRIKETHROUGH = FanColorConstants.FAN_FIELD
			+ EDITOR_STRIKETHROUGH_SUFFIX;

	public final static String EDITOR_FIELD_UNDERLINE = FanColorConstants.FAN_FIELD
			+ EDITOR_UNDERLINE_SUFFIX;
	// static fields

	public final static String EDITOR_STATIC_FIELD_COLOR = FanColorConstants.FAN_STATIC_FIELD;
	public final static String EDITOR_STATIC_FIELD_BOLD = FanColorConstants.FAN_STATIC_FIELD
			+ EDITOR_BOLD_SUFFIX;
	public final static String EDITOR_STATIC_FIELD_ITALIC = FanColorConstants.FAN_STATIC_FIELD
			+ EDITOR_ITALIC_SUFFIX;
	public final static String EDITOR_STATIC_FIELD_STRIKETHROUGH = FanColorConstants.FAN_STATIC_FIELD
			+ EDITOR_STRIKETHROUGH_SUFFIX;

	public final static String EDITOR_STATIC_FIELD_UNDERLINE = FanColorConstants.FAN_STATIC_FIELD
			+ EDITOR_UNDERLINE_SUFFIX;

	public final static String EDITOR_FOLDING_INIT_CLOSURES = "fan_folding_init_closures";

	public final static String EDITOR_FOLDING_INIT_IMPORTS = "fan_folding_init_imports";

	public final static String EDITOR_METHOD_COLOR = FanColorConstants.FAN_METHOD;
	public final static String EDITOR_METHOD_BOLD = FanColorConstants.FAN_METHOD + EDITOR_BOLD_SUFFIX;
	public final static String EDITOR_METHOD_ITALIC = FanColorConstants.FAN_METHOD + EDITOR_ITALIC_SUFFIX;
	public final static String EDITOR_METHOD_STRIKETHROUGH = FanColorConstants.FAN_METHOD + EDITOR_STRIKETHROUGH_SUFFIX;
	public final static String EDITOR_METHOD_UNDERLINE = FanColorConstants.FAN_METHOD + EDITOR_UNDERLINE_SUFFIX;
	
	public final static String EDITOR_STATIC_METHOD_COLOR = FanColorConstants.FAN_STATIC_METHOD;
	public final static String EDITOR_STATIC_METHOD_BOLD = FanColorConstants.FAN_STATIC_METHOD + EDITOR_BOLD_SUFFIX;
	public final static String EDITOR_STATIC_METHOD_ITALIC = FanColorConstants.FAN_STATIC_METHOD + EDITOR_ITALIC_SUFFIX;
	public final static String EDITOR_STATIC_METHOD_STRIKETHROUGH = FanColorConstants.FAN_STATIC_METHOD + EDITOR_STRIKETHROUGH_SUFFIX;
	public final static String EDITOR_STATIC_METHOD_UNDERLINE = FanColorConstants.FAN_STATIC_METHOD + EDITOR_UNDERLINE_SUFFIX;
	
	
	public static void initializeDefaultValues(IPreferenceStore store) {
		PreferenceConstants.initializeDefaultValues(store);

		PreferenceConverter.setDefault(store,
				FanPreferenceConstants.EDITOR_DOC_COLOR, new RGB(63, 127, 95));
		PreferenceConverter.setDefault(store,
				FanPreferenceConstants.EDITOR_DSL_COLOR, new RGB(166, 0, 0));
		PreferenceConverter.setDefault(store,
				FanPreferenceConstants.EDITOR_MULTI_LINE_COMMENT_COLOR,
				new RGB(63, 127, 95));
		PreferenceConverter.setDefault(store,
				FanPreferenceConstants.EDITOR_SINGLE_LINE_COMMENT_COLOR,
				new RGB(63, 127, 95));
		PreferenceConverter.setDefault(store,
				FanPreferenceConstants.EDITOR_KEYWORD_COLOR,
				new RGB(127, 0, 85));
		PreferenceConverter.setDefault(store,
				FanPreferenceConstants.EDITOR_KEYWORD_RETURN_COLOR, new RGB(
						127, 0, 85));
		PreferenceConverter
				.setDefault(store, FanPreferenceConstants.EDITOR_STRING_COLOR,
						new RGB(42, 0, 255));
		PreferenceConverter.setDefault(store,
				FanPreferenceConstants.EDITOR_NUMBER_COLOR, new RGB(128, 0, 0));
		PreferenceConverter.setDefault(store,
				FanPreferenceConstants.EDITOR_DECORATOR_COLOR, new RGB(128,
						128, 128));
		PreferenceConverter.setDefault(store,
				FanPreferenceConstants.EDITOR_CLASS_DEFINITION_COLOR, new RGB(
						0, 0, 0));
		PreferenceConverter.setDefault(store,
				FanPreferenceConstants.EDITOR_FUNCTION_DEFINITION_COLOR,
				new RGB(0, 0, 0));

		PreferenceConverter.setDefault(store,
				FanPreferenceConstants.EDITOR_VAR_REF_COLOR,
				new RGB(200, 0, 0));
		PreferenceConverter.setDefault(store,
				FanPreferenceConstants.EDITOR_VAR_DEF_COLOR,
				new RGB(200, 0, 0));
		
		PreferenceConverter.setDefault(store,
				FanPreferenceConstants.EDITOR_FIELD_COLOR, new RGB(0, 0, 200));

		PreferenceConverter.setDefault(store,
				FanPreferenceConstants.EDITOR_STATIC_FIELD_COLOR, new RGB(0, 0,
						250));

		store.setDefault(FanPreferenceConstants.EDITOR_STATIC_FIELD_ITALIC,
				true);

		store.setDefault(
				FanPreferenceConstants.EDITOR_SINGLE_LINE_COMMENT_BOLD, false);
		store
				.setDefault(
						FanPreferenceConstants.EDITOR_SINGLE_LINE_COMMENT_ITALIC,
						false);

		store.setDefault(FanPreferenceConstants.EDITOR_DOC_ITALIC, true);
		store.setDefault(FanPreferenceConstants.EDITOR_DSL_ITALIC, true);

		store.setDefault(FanPreferenceConstants.EDITOR_KEYWORD_BOLD, true);
		store.setDefault(FanPreferenceConstants.EDITOR_KEYWORD_ITALIC, false);
		store.setDefault(FanPreferenceConstants.EDITOR_KEYWORD_RETURN_BOLD,
				true);
		store.setDefault(FanPreferenceConstants.EDITOR_KEYWORD_RETURN_ITALIC,
				false);

		store.setDefault(PreferenceConstants.EDITOR_SMART_INDENT, true);
		store.setDefault(PreferenceConstants.EDITOR_CLOSE_STRINGS, true);
		store.setDefault(PreferenceConstants.EDITOR_CLOSE_BRACKETS, true);
		store.setDefault(PreferenceConstants.EDITOR_CLOSE_BRACES, true);
		store.setDefault(PreferenceConstants.EDITOR_SMART_TAB, true);
		store.setDefault(PreferenceConstants.EDITOR_SMART_PASTE, true);
		store.setDefault(PreferenceConstants.EDITOR_SMART_HOME_END, true);
		store.setDefault(PreferenceConstants.EDITOR_SUB_WORD_NAVIGATION, true);
		store.setDefault(PreferenceConstants.EDITOR_TAB_WIDTH, 4);
		store.setDefault(
				PreferenceConstants.EDITOR_SYNC_OUTLINE_ON_CURSOR_MOVE, true);

		PreferenceConverter.setDefault(store, COMMENT_TASK_TAGS, new RGB(127,
				159, 191));

		PreferenceConverter.setDefault(store, COMMENT_INTERPRETER_STRING,
				new RGB(128, 128, 128));

		store.setDefault(COMMENT_TASK_TAGS_BOLD, true);

		// folding
		initializeFoldingDefaults(store);

		store.setDefault(CodeFormatterConstants.FORMATTER_TAB_CHAR,
				CodeFormatterConstants.TAB);
		store.setDefault(CodeFormatterConstants.FORMATTER_TAB_SIZE, "4");
		store
				.setDefault(CodeFormatterConstants.FORMATTER_INDENTATION_SIZE,
						"4");

		NewScriptProjectPreferencePage.initDefaults(store);

		store.setDefault(PreferenceConstants.APPEARANCE_COMPRESS_PACKAGE_NAMES,
				false);
		store
				.setDefault(PreferenceConstants.APPEARANCE_METHOD_RETURNTYPE,
						true);
		store.setDefault(PreferenceConstants.APPEARANCE_METHOD_TYPEPARAMETERS,
				true);
		store.setDefault(
				PreferenceConstants.APPEARANCE_PKG_NAME_PATTERN_FOR_PKG_VIEW,
				""); //$NON-NLS-1$

		store.setDefault(PreferenceConstants.SHOW_SOURCE_MODULE_CHILDREN, true);

		store.setDefault(
				PreferenceConstants.CODEASSIST_AUTOACTIVATION_TRIGGERS, ".");
		store.setDefault(CODEGEN_ADD_COMMENTS, false);
		
		PreferenceConverter.setDefault(store, EDITOR_METHOD_COLOR, new RGB(0, 128, 128));
		PreferenceConverter.setDefault(store, EDITOR_STATIC_METHOD_COLOR, new RGB(0, 128, 128));
		store.setDefault(EDITOR_STATIC_METHOD_ITALIC, true);
	}

	protected static void initializeFoldingDefaults(IPreferenceStore store) {
		store.setDefault(PreferenceConstants.EDITOR_FOLDING_ENABLED, true);
		store.setDefault(PreferenceConstants.EDITOR_FOLDING_LINES_LIMIT, 2);
		store.setDefault(
				PreferenceConstants.EDITOR_FOLDING_INIT_HEADER_COMMENTS, true);
		store.setDefault(PreferenceConstants.EDITOR_COMMENTS_FOLDING_ENABLED,
				true);
		store.setDefault(PreferenceConstants.EDITOR_DOCS_FOLDING_ENABLED, true);
		store.setDefault(FanPreferenceConstants.EDITOR_FOLDING_INIT_CLOSURES,
				false);
		store.setDefault(FanPreferenceConstants.EDITOR_FOLDING_INIT_IMPORTS,
				true);
	}

}
