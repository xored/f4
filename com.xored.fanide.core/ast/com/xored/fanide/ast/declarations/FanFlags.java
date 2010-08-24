package com.xored.fanide.ast.declarations;

public class FanFlags implements FanModifiers {

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

