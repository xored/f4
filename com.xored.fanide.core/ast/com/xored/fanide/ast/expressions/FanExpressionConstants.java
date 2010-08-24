package com.xored.fanide.ast.expressions;

import org.eclipse.dltk.ast.expressions.ExpressionConstants;

public interface FanExpressionConstants extends ExpressionConstants {

	static public final int INT_LITERAL = USER_EXPRESSION_START + 1;

	static public final int FLOAT_LITERAL = USER_EXPRESSION_START + 2;

	static public final int DECIMAL_LITERAL = USER_EXPRESSION_START + 3;

	static public final int URI_LITERAL = USER_EXPRESSION_START + 4;

	static public final int DURATION_LITERAL = USER_EXPRESSION_START + 5;

	static public final int TYPE_LITERAL = USER_EXPRESSION_START + 6;

	static public final int SLOT_LITERAL = USER_EXPRESSION_START + 7;

	static public final int LIST_LITERAL = USER_EXPRESSION_START + 8;

	static public final int MAP_LITERAL = USER_EXPRESSION_START + 9;

	static public final int NULL_LITERAL = USER_EXPRESSION_START + 10;

	static public final int DSL_LITERAL = USER_EXPRESSION_START + 11;

	static public final int E_SAME = USER_EXPRESSION_START + 12;

	static public final int E_NOT_SAME = USER_EXPRESSION_START + 13;

	static public final int E_COMPARE = USER_EXPRESSION_START + 14;

	static public final int E_AS = USER_EXPRESSION_START + 15;

	static public final int E_ELVIS = USER_EXPRESSION_START + 16;

	static public final int E_RANGE = USER_EXPRESSION_START + 17;

	static public final int E_RANGE_EXCL = USER_EXPRESSION_START + 18;

	static public final int E_STATIC_INVOKE = USER_EXPRESSION_START + 19;

	static public final int E_STATIC_SAFETY_INVOKE = USER_EXPRESSION_START + 20;

	static public final int E_DYNAMIC_INVOKE = USER_EXPRESSION_START + 21;

	static public final int E_DYNAMIC_SAFETY_INVOKE = USER_EXPRESSION_START + 22;

	static public final int E_CLOSURE = USER_EXPRESSION_START + 23;

	static public final int E_FIELD_STORAGE = USER_EXPRESSION_START + 24;
}
