package com.xored.fanide.core.utils;

public class ElementInfoWrappers {
	public static class TypeInfo extends
			org.eclipse.dltk.compiler.IElementRequestor.TypeInfo {
		public void setSuperClasses(String[] superclasses) {
			super.superclasses = superclasses;
		}
	}

	public static class MethodInfo extends
			org.eclipse.dltk.compiler.IElementRequestor.MethodInfo {
		public void setParameterNames(String[] parameterNames) {
			super.parameterNames = parameterNames;
		}

		public void setParameterInitializers(String[] parameterInitializers) {
			super.parameterInitializers = parameterInitializers;
		}

		public void setParameterTypes(String[] parameterTypes) {
			super.parameterTypes = parameterTypes;
		}

		public void setExceptionTypes() {
			super.exceptionTypes = new String[0];
		}
	}

}
