package com.xored.fanide.internal.ui.text;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.eclipse.dltk.ui.text.templates.CodeTemplateAccess;
import org.eclipse.dltk.ui.text.templates.CodeTemplateCategory;
import org.eclipse.dltk.ui.text.templates.ICodeTemplateCategory;
import org.eclipse.jface.text.templates.ContextTypeRegistry;
import org.eclipse.jface.text.templates.TemplateContextType;
import org.eclipse.ui.editors.text.templates.ContributionContextTypeRegistry;

import com.xored.fanide.internal.ui.FanUI;

public class FanCodeTemplateAccess extends CodeTemplateAccess {

	/**
	 * The key to store customized code templates.
	 */
	private static final String CODE_TEMPLATES_KEY = "com.xored.fanide.text.custom_code_templates"; //$NON-NLS-1$
	private static final String FILES_CONTEXT_PREFIX = "com.xored.fanide.text.template.type";
	public static final String FILES_CONTEXT_ID = FILES_CONTEXT_PREFIX + ".fan";
	private static final String TYPES_CONTEXT_PREFIX = "com.xored.fanide.text.template.class";
	public static final String TYPES_CONTEXT_ID = TYPES_CONTEXT_PREFIX + ".fan";

	public FanCodeTemplateAccess() {
		super(FanUI.PLUGIN_ID, CODE_TEMPLATES_KEY, FanUI.getDefault()
				.getPreferenceStore());
	}

	@Override
	protected ContextTypeRegistry createContextTypeRegistry() {
		final ContributionContextTypeRegistry registry = new ContributionContextTypeRegistry();
		registry.addContextType(FILES_CONTEXT_ID);
		registry.addContextType(TYPES_CONTEXT_ID);
		return registry;
	}

	private HashMap<String, ICodeTemplateCategory> categories = null;

	@SuppressWarnings("unchecked")
	public ICodeTemplateCategory[] getCategories() {
		if (categories == null) {
			Iterator<TemplateContextType> i = getContextTypeRegistry()
					.contextTypes();
			List<TemplateContextType> contextTypesFiles = new ArrayList<TemplateContextType>();
			List<TemplateContextType> contextTypesTypes = new ArrayList<TemplateContextType>();
			while (i.hasNext()) {
				TemplateContextType tct = i.next();
				if (tct.getId().startsWith(FILES_CONTEXT_PREFIX)) {
					contextTypesFiles.add(tct);
				} else if (tct.getId().startsWith(TYPES_CONTEXT_PREFIX)) {
					contextTypesTypes.add(tct);
				}
			}
			categories = new HashMap<String, ICodeTemplateCategory>();
			categories.put(FILES_CONTEXT_PREFIX, new CodeTemplateCategory(
					"Files", true, contextTypesFiles
							.toArray(new TemplateContextType[contextTypesFiles
									.size()])));
			categories.put(TYPES_CONTEXT_PREFIX, new CodeTemplateCategory(
					"Types", true, contextTypesTypes
							.toArray(new TemplateContextType[contextTypesTypes
									.size()])));
		}
		return categories.values().toArray(new ICodeTemplateCategory[0]);
	}

	public ICodeTemplateCategory getCategoryOfContextType(String contextTypeId) {
		if (contextTypeId.startsWith(FILES_CONTEXT_PREFIX)) {
			return categories.get(FILES_CONTEXT_PREFIX);
		} else if (contextTypeId.startsWith(TYPES_CONTEXT_PREFIX)) {
			return categories.get(TYPES_CONTEXT_PREFIX);
		} else {
			return null;
		}
	}

}
