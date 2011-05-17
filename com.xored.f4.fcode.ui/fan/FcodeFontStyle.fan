//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   talnikov May 15, 2010 - Initial Contribution
//

using [java] org.eclipse.jface.preference::IPreferenceStore
using [java] org.eclipse.swt::SWT
using [java] org.eclipse.swt.graphics::Color
using [java] org.eclipse.swt.graphics::RGB
using [java] org.eclipse.jface.text::TextAttribute
using "[java]org.eclipse.dltk.internal.ui.text"::DLTKColorManager
using [java] org.eclipse.dltk.ui::DLTKUIPlugin
using [java] org.eclipse.dltk.ui::PreferenceConstants
using [java] org.eclipse.dltk.ui.text::IColorManagerExtension
using [java] org.eclipse.jface.preference::PreferenceConverter

using f4uiCore
using f4uiText

**
** FcodeFontStyle
**
internal class FcodeFontStyle
{
  private DLTKColorManager manager := DLTKColorManager()

  Void dispose()
  {
    manager.dispose
  }

  private Int style(Str key)
  {
    store := FanUI.plugin.getPreferenceStore

    boldKey := key + PreferenceConstants.EDITOR_BOLD_SUFFIX
    italicKey := key + PreferenceConstants.EDITOR_ITALIC_SUFFIX
    strikethroughKey := key + PreferenceConstants.EDITOR_STRIKETHROUGH_SUFFIX
    underlineKey := key + PreferenceConstants.EDITOR_UNDERLINE_SUFFIX

    result := store.getBoolean(boldKey) ? SWT.BOLD : SWT.NORMAL

    if (store.getBoolean(italicKey))
      result = SWT.ITALIC.or(result)

    if (store.getBoolean(strikethroughKey))
      result = TextAttribute.STRIKETHROUGH.or(result)

    if (store.getBoolean(underlineKey))
      result = TextAttribute.UNDERLINE.or(result)

    return result
  }

  private Color? clr(Str key)
  {
    clr := manager.getColor(key)
    if (clr != null)
    {
      return clr
    }

    rgb := PreferenceConverter.getColor(FanUI.plugin.getPreferenceStore, key)
    if (rgb != null && manager is IColorManagerExtension) {
      ext := manager as IColorManagerExtension
      ext.unbindColor(key)
      ext.bindColor(key, rgb)
      return manager.getColor(key)
    }

    return null
  }

  FontStyle fontStyle(Str key) { FontStyle(style(key), clr(key)) }

  static const Str keyword := FanColorConstants.keyword
  static const Str typeDefinition := FanColorConstants.classDefinition
  static const Str fieldDefinition := FanColorConstants.field
  static const Str field := FanColorConstants.field
  static const Str staticField := FanColorConstants.staticField
  static const Str functionDefinition := FanColorConstants.functionDefinition
  static const Str variable :=  FanColorConstants.varRef
  static const Str num := FanColorConstants.number
  static const Str str := FanColorConstants.string
  static const Str comment := FanColorConstants.singleLineComment
}

internal class FontStyle
{
  Int style { private set }
  Color clr { private set }

  new make(Int style, Color clr)
  {
    this.style = style
    this.clr = clr
  }
}
