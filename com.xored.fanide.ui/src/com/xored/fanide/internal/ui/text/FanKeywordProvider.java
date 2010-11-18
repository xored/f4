package com.xored.fanide.internal.ui.text;

public final class FanKeywordProvider {

	public final static String KEYWORD_ABSTRACT = "abstract";
	public final static String KEYWORD_NATIVE = "native";
	public final static String KEYWORD_ONCE = "once";
	public final static String KEYWORD_OVERRIDE = "override";
	public final static String KEYWORD_STATIC = "static";
	public final static String KEYWORD_VIRTUAL = "virtual";
	public final static String KEYWORD_CONST = "const";
	public final static String KEYWORD_FINAL = "final";
	public final static String KEYWORD_READONLY = "readonly";
	public final static String KEYWORD_USING = "using";
	public final static String KEYWORD_AS = "as";
	public final static String KEYWORD_CLASS = "class";
	public final static String KEYWORD_ENUM = "enum";
	public final static String KEYWORD_MIXIN = "mixin";
	public final static String KEYWORD_PUBLIC = "public";
	public final static String KEYWORD_PROTECTED = "protected";
	public final static String KEYWORD_PRIVATE = "private";
	public final static String KEYWORD_INTERNAL = "internal";
	// public final static String KEYWORD_GET = "get";
	// public final static String KEYWORD_SET = "set";
	public final static String KEYWORD_NEW = "new";
	public final static String KEYWORD_THIS = "this";
	public final static String KEYWORD_THIS_TYPE = "This";
	public final static String KEYWORD_SUPER = "super";
	// public final static String KEYWORD_IT = "it";
	public final static String KEYWORD_NULL = "null";
	public final static String KEYWORD_BREAK = "break";
	public final static String KEYWORD_CONTINUE = "continue";
	public final static String KEYWORD_FOR = "for";
	public final static String KEYWORD_IF = "if";
	public final static String KEYWORD_ELSE = "else";
	public final static String KEYWORD_RETURN = "return";
	public final static String KEYWORD_THROW = "throw";
	public final static String KEYWORD_WHILE = "while";
	public final static String KEYWORD_TRY = "try";
	public final static String KEYWORD_CATCH = "catch";
	public final static String KEYWORD_FINALLY = "finally";
	public final static String KEYWORD_SWITCH = "switch";
	public final static String KEYWORD_CASE = "case";
	public final static String KEYWORD_DEFAULT = "default";
	public final static String KEYWORD_TRUE = "true";
	public final static String KEYWORD_FALSE = "false";
	public final static String KEYWORD_IS = "is";
	public final static String KEYWORD_ISNOT = "isnot";
	public final static String KEYWORD_FACET = "facet";

	public static String[] getKeywords() {
		return new String[] { KEYWORD_ABSTRACT, KEYWORD_NATIVE, KEYWORD_ONCE,
				KEYWORD_OVERRIDE, KEYWORD_STATIC, KEYWORD_VIRTUAL,
				KEYWORD_CONST, KEYWORD_FINAL,
				KEYWORD_READONLY,
				KEYWORD_USING,
				KEYWORD_AS,
				KEYWORD_CLASS,
				KEYWORD_ENUM,
				KEYWORD_MIXIN,
				KEYWORD_PUBLIC,
				KEYWORD_PROTECTED,
				KEYWORD_PRIVATE,
				KEYWORD_INTERNAL,
				// KEYWORD_GET,
				// KEYWORD_SET,
				KEYWORD_NEW,
				KEYWORD_THIS,
				KEYWORD_THIS_TYPE,
				KEYWORD_SUPER,
				// KEYWORD_IT,
				KEYWORD_NULL, KEYWORD_BREAK, KEYWORD_CONTINUE, KEYWORD_FOR,
				KEYWORD_IF, KEYWORD_ELSE, KEYWORD_RETURN, KEYWORD_THROW,
				KEYWORD_WHILE, KEYWORD_TRY, KEYWORD_CATCH, KEYWORD_FINALLY,
				KEYWORD_SWITCH, KEYWORD_CASE, KEYWORD_DEFAULT, KEYWORD_TRUE,
				KEYWORD_FALSE, KEYWORD_IS, KEYWORD_ISNOT,
				KEYWORD_FACET };
	}
}
