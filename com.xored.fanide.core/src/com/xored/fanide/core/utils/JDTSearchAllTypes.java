package com.xored.fanide.core.utils;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.jdt.core.IPackageFragment;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.core.search.IJavaSearchConstants;
import org.eclipse.jdt.core.search.IJavaSearchScope;
import org.eclipse.jdt.core.search.SearchEngine;
import org.eclipse.jdt.core.search.SearchPattern;
import org.eclipse.jdt.core.search.TypeNameMatch;
import org.eclipse.jdt.core.search.TypeNameMatchRequestor;

public class JDTSearchAllTypes {
	public static String[] search(IPackageFragment[] fragments) {

		IJavaSearchScope searchScope = SearchEngine
				.createJavaSearchScope(fragments);

		SearchEngine engine = new SearchEngine();
		final List<String> types = new ArrayList<String>();
		try {
			engine.searchAllTypeNames(null, SearchPattern.R_PATTERN_MATCH,
					null, SearchPattern.R_PATTERN_MATCH,
					IJavaSearchConstants.TYPE, searchScope,
					new TypeNameMatchRequestor() {
						@Override
						public void acceptTypeNameMatch(TypeNameMatch match) {
							String name = match.getType()
									.getTypeQualifiedName();
							if (!types.contains(name)) {
								types.add(name);
							}
						}
					}, IJavaSearchConstants.WAIT_UNTIL_READY_TO_SEARCH,
					new NullProgressMonitor());
		} catch (JavaModelException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return types.toArray(new String[types.size()]);
	}
}
