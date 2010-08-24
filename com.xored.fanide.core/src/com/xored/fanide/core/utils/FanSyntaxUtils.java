package com.xored.fanide.core.utils;

import org.eclipse.dltk.core.ISourceRange;
import org.eclipse.dltk.internal.core.SourceRange;

public class FanSyntaxUtils {
	public static boolean isFanName(String str) {
		return str.matches("^(@{0,2}|\\$)[_a-zA-Z0-9]+[\\?!=]?$"); //$NON-NLS-1$
	}

	/**
	 * Tries to find name enclosing given position. See isFanName method for
	 * "name" definion.
	 * 
	 * @param contents
	 * @param pos
	 * @return
	 */
	public static ISourceRange getEnclosingName(CharSequence contents, int pos) {
		if (pos < 0 || pos >= contents.length())
			return null;

		int start = pos - 1;
		int end = pos;

		while (start >= 0
				&& Character.isJavaIdentifierPart(contents.charAt(start)))
			start--;
		if (start > 0) {
			if (contents.charAt(start) == '@') {
				start--;
				if (start > 0 && contents.charAt(start) == '@')
					start--;
			} else if (contents.charAt(start) == '$')
				start--;
		}

		end = start + 1;

		if (end < contents.length() && contents.charAt(end) == '@') {
			end++;
			if (end < contents.length() && contents.charAt(end) == '@')
				end++;
		} else if (end < contents.length() && contents.charAt(end) == '$')
			end++;

		while (end < contents.length()
				&& Character.isJavaIdentifierPart(contents.charAt(end)))
			end++;
		if (end < contents.length()) {
			char c = contents.charAt(end);
			if (c == '?' || c == '!' || c == '=') {
				end++;
			} else {

			}

		}

		int actualStart = start + 1;
		int actualEnd = end - 1;
		if (actualStart > actualEnd)
			return null;

		return new SourceRange(actualStart, actualEnd - actualStart + 1);
	}
}
