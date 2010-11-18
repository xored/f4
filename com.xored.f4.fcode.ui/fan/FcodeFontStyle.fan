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

using "[java]com.xored.fanide.internal.ui"::FanUI
using "[java]com.xored.fanide.internal.ui.text"::FanColorConstants

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
    store := FanUI.getDefault.getPreferenceStore

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

    rgb := PreferenceConverter.getColor(FanUI.getDefault.getPreferenceStore, key)
    if (rgb != null && manager is IColorManagerExtension) {
      ext := manager as IColorManagerExtension
      ext.unbindColor(key)
      ext.bindColor(key, rgb)
      return manager.getColor(key)
    }

    return null
  }

  FontStyle fontStyle(Str key) { FontStyle(style(key), clr(key)) }

  static const Str keyword := FanColorConstants.FAN_KEYWORD
  static const Str typeDefinition := FanColorConstants.FAN_CLASS_DEFINITION
  static const Str fieldDefinition := FanColorConstants.FAN_FIELD
  static const Str field := FanColorConstants.FAN_FIELD
  static const Str staticField := FanColorConstants.FAN_STATIC_FIELD
  static const Str functionDefinition := FanColorConstants.FAN_FUNCTION_DEFINITION
  static const Str variable :=  FanColorConstants.FAN_VAR_REF
  static const Str num := FanColorConstants.FAN_NUMBER
  static const Str str := FanColorConstants.FAN_STRING
  static const Str comment := FanColorConstants.FAN_SINGLE_LINE_COMMENT
}

internal class FontStyle
{
  readonly Int style
  readonly Color clr

  new make(Int style, Color clr)
  {
    this.style = style
    this.clr = clr
  }
}
