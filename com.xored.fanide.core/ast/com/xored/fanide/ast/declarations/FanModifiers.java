package com.xored.fanide.ast.declarations;

import org.eclipse.dltk.ast.Modifiers;

public class FanModifiers implements Modifiers {
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

	/**
	 * Returns whether the given integer includes the <code>internal</code> modifier.
	 *
	 * @param flags the flags
	 * @return <code>true</code> if the <code>internal</code> modifier is included
	 */
	public static boolean isInternal(int flags) {
		return (flags & AccInternal) != 0;
	}
	/**
	 * Returns whether the given integer includes the <code>public</code> modifier.
	 *
	 * @param flags the flags
	 * @return <code>true</code> if the <code>public</code> modifier is included
	 */
	public static boolean isPublic(int flags) {
		return (flags & AccPublic) != 0;
	}
	/**
	 * Returns whether the given integer includes the <code>const</code> modifier.
	 *
	 * @param flags the flags
	 * @return <code>true</code> if the <code>const</code> modifier is included
	 */
	public static boolean isConst(int flags) {
		return (flags & AccConst) != 0;
	}
	/**
	 * Returns whether the given integer includes the <code>final</code> modifier.
	 *
	 * @param flags the flags
	 * @return <code>true</code> if the <code>final</code> modifier is included
	 */
	public static boolean isFinal(int flags) {
		return (flags & AccFinal) != 0;
	}
	/**
	 * Returns whether the given integer includes the <code>abstract</code> modifier.
	 *
	 * @param flags the flags
	 * @return <code>true</code> if the <code>abstract</code> modifier is included
	 */
	public static boolean isAbstract(int flags) {
		return (flags & AccAbstract) != 0;
	}
	
	public static String toString(int flags) {
		StringBuffer sb = new StringBuffer();

		if (isPublic(flags))
			sb.append("public ");
		if (isInternal(flags))
			sb.append("internal ");
		if (isAbstract(flags))
			sb.append("abstract ");
		if (isFinal(flags))
			sb.append("final ");
		if (isConst(flags))
			sb.append("const ");

		int len = sb.length();
		if (len == 0)
			return "";
		sb.setLength(len - 1);
		return sb.toString();
	}

}
