package com.xored.fanide.core;

import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IImportDeclaration;
import org.eclipse.jdt.core.IJavaElement;
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
		// long start = System.currentTimeMillis();
		try {
			ITypeParameter[] typeParameters = type.getTypeParameters();
			if (typeParameters != null) {
				for (ITypeParameter tp : typeParameters) {
					if (tp.getElementName().equals(name)) {
						return new String[] { Object.class.getName() };
					}
				}
			}
			ICompilationUnit unit = (ICompilationUnit) type
					.getAncestor(IJavaElement.COMPILATION_UNIT);
			if (unit != null) {
				IImportDeclaration[] imports = unit.getImports();
				for (IImportDeclaration im : imports) {
					String imName = im.getElementName();
					if (imName.endsWith("." + name)) {
						return new String[] { imName };
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
		} catch (Throwable e) {
		} finally {
			// System.out.println("Resolve: " + type.getTypeQualifiedName()
			// + " name: " + name + " time: "
			// + Long.toString(System.currentTimeMillis() - start));
		}
		return null;
	}
}
