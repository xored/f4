using [java] java.util::Iterator
using [java] org.eclipse.ui.editors.text.templates::ContributionContextTypeRegistry
using [java] org.eclipse.jface.text.templates::ContextTypeRegistry
using [java] org.eclipse.jface.text.templates::TemplateContextType
using [java] org.eclipse.dltk.ui.text.templates::CodeTemplateAccess
using [java] org.eclipse.dltk.ui.text.templates::CodeTemplateCategory
using [java] org.eclipse.dltk.ui.text.templates::ICodeTemplateCategory

class FanCodeTemplateAccess : CodeTemplateAccess
{
	/**
	 * The key to store customized code templates.
	 */
	private static const Str codeTemplatesKey := "com.xored.fanide.text.custom_code_templates"
	private static const Str filesContextPrefix := "com.xored.fanide.text.template.type"
  private static const Str typesContextPrefix := "com.xored.fanide.text.template.class"
	static const Str filesContextId := filesContextPrefix + ".fan"
	static const Str typesContextId := typesContextPrefix + ".fan"

	new make() : super(FanUI.pluginId, codeTemplatesKey, FanUI.instance.plugin.getPreferenceStore) { }

	protected override ContextTypeRegistry? createContextTypeRegistry()
  {
		registry := ContributionContextTypeRegistry()
		registry.addContextType(filesContextId)
		registry.addContextType(typesContextId)
		return registry
	}

	//private HashMap<String, ICodeTemplateCategory> categories = null;
  private Str:ICodeTemplateCategory categories := [:]

	override ICodeTemplateCategory?[]? getCategories()
  {
		if (categories.isEmpty)
    {
			i := getContextTypeRegistry.contextTypes
			contextTypesFiles := TemplateContextType[,]
			contextTypesTypes := TemplateContextType[,]
			while (i.hasNext)
      {
				TemplateContextType tct := i.next
				if (tct.getId.startsWith(filesContextPrefix))
					contextTypesFiles.add(tct)
				else if (tct.getId.startsWith(typesContextPrefix))
					contextTypesTypes.add(tct)
			}
			categories[filesContextPrefix] = CodeTemplateCategory("Files", true, contextTypesFiles)
			categories[typesContextPrefix] = CodeTemplateCategory("Types", true, contextTypesTypes)
		}
		return categories.vals
	}

	override ICodeTemplateCategory? getCategoryOfContextType(Str? contextTypeId) {
		if (contextTypeId.startsWith(filesContextPrefix))
			return categories.get(filesContextPrefix)
		else if (contextTypeId.startsWith(typesContextPrefix))
			return categories.get(typesContextPrefix)
		else
			return null
	}
}
