using [java] org.eclipse.dltk.ui.text.templates::ICodeTemplateAccess
using [java] org.eclipse.dltk.ui.text.templates::ICodeTemplateArea

class FanCodeTemplateArea : ICodeTemplateArea
{
  static const Str prefId := "com.xored.fanide.ui.preferences.code.templates"
  static const Str propId := "com.xored.fanide.ui.propertyPage.CodeTemplatePage"
	override ICodeTemplateAccess? getTemplateAccess()
  {
		FanUI.instance.getCodeTemplateAccess
	}

	override Str? getTemplatePreferencePageId := prefId { private set }
	override Str? getTemplatePropertyPageId := propId { private set }
}
