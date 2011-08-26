package com.xored.fanide.core;

import org.eclipse.jdt.core.IType;
import org.eclipse.jdt.core.ITypeParameter;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.core.WorkingCopyOwner;
import org.eclipse.jdt.internal.core.DefaultWorkingCopyOwner;

public class JDTSupport {
	public static WorkingCopyOwner getJDTWorkingCopyOwner() {
		return DefaultWorkingCopyOwner.PRIMARY;
	}

	public static String[] resolve(IType type, String name) {
		try {
			ITypeParameter[] typeParameters = type.getTypeParameters();
			if (typeParameters != null) {
				for (ITypeParameter tp : typeParameters) {
					if (tp.getElementName().equals(name)) {
						return new String[] { Object.class.getName() };
					}
				}
			}
			String[][] values = type.resolveType(name);
			if (values == null) {
				return null;
			}
			String[] result = new String[values.length];
			int i = 0;
			for (String[] v : values) {
				result[i] = v[0] + '.' + v[1];
				i++;
			}
			return result;
		} catch (JavaModelException e) {
		}
		return null;
	}
}
