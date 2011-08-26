package com.xored.fanide.core.utils;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.dltk.core.IProjectFragment;
import org.eclipse.dltk.core.IType;
import org.eclipse.dltk.core.ModelException;
import org.eclipse.dltk.core.search.IDLTKSearchConstants;
import org.eclipse.dltk.core.search.IDLTKSearchScope;
import org.eclipse.dltk.core.search.SearchEngine;
import org.eclipse.dltk.core.search.SearchPattern;
import org.eclipse.dltk.core.search.TypeNameMatch;
import org.eclipse.dltk.core.search.TypeNameMatchRequestor;

import com.xored.fanide.core.FanLanguageToolkit;

public class DLTKSearchAllTypes {
	public static IType[] search(IProjectFragment[] fragments) {

		IDLTKSearchScope searchScope = SearchEngine.createSearchScope(
				fragments, FanLanguageToolkit.getDefault());

		SearchEngine engine = new SearchEngine();
		final List<IType> types = new ArrayList<IType>();
		try {
			engine.searchAllTypeNames(null, SearchPattern.R_PATTERN_MATCH,
					null, SearchPattern.R_PATTERN_MATCH,
					IDLTKSearchConstants.TYPE, searchScope,
					new TypeNameMatchRequestor() {
						@Override
						public void acceptTypeNameMatch(TypeNameMatch match) {
							if (!types.contains(match.getType())) {
								types.add(match.getType());
							}
						}
					}, IDLTKSearchConstants.WAIT_UNTIL_READY_TO_SEARCH,
					new NullProgressMonitor());
		} catch (ModelException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return types.toArray(new IType[types.size()]);
	}
}
