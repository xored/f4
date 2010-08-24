package com.xored.fanide.ast.declarations;

import org.eclipse.dltk.ast.Modifiers;

public interface FanModifiers extends Modifiers {
	public static final int AccInternal = 1 << USER_MODIFIER;
	public static final int AccMixin = 1 << (USER_MODIFIER + 1);
	public static final int AccEnum = 1 << (USER_MODIFIER + 2);
	public static final int AccNative = 1 << (USER_MODIFIER + 3);
	public static final int AccOverride = 1 << (USER_MODIFIER + 4);
	public static final int AccReadOnly = 1 << (USER_MODIFIER + 5);
	public static final int AccVirtual = 1 << (USER_MODIFIER + 6);
	public static final int AccOnce = 1 << (USER_MODIFIER + 7);
	public static final int AccNew = 1 << (USER_MODIFIER + 8);
	public static final int AccEnumVal = 1 << (USER_MODIFIER + 9);
	public static final int AccGetter = 1 << (USER_MODIFIER + 10);
	public static final int AccSetter = 1 << (USER_MODIFIER + 11);
}
