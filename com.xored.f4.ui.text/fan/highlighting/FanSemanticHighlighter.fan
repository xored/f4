//
// Copyright (c) 2009-2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Alexey Alexandrov Apr 13, 2010 - Initial Contribution
//

using [java]org.eclipse.dltk.core
using [java]org.eclipse.dltk.compiler.env::IModuleSource
using [java]org.eclipse.dltk.ui.editor.highlighting::AbstractSemanticHighlighter
using [java]org.eclipse.dltk.ui.editor.highlighting::ISemanticHighlightingRequestor
using [java]org.eclipse.dltk.ui.editor.highlighting::SemanticHighlighting
using [java]org.eclipse.dltk.ui.preferences::PreferencesMessages

using [java]com.xored.fanide.ui::FanPreferenceConstants

using f4parser
using f4model
using f4core

class FanSemanticHighlighter : AbstractSemanticHighlighter, AstVisitor
{
  private SH funcDef := SH(FanPreferenceConstants.EDITOR_FUNCTION_DEFINITION_COLOR,
          PreferencesMessages.DLTKEditorPreferencePage_function_colors)
  
  private SH classDef := SH(FanPreferenceConstants.EDITOR_CLASS_DEFINITION_COLOR, 
          PreferencesMessages.DLTKEditorPreferencePage_class_colors)
  
  private SH str := SH(FanPreferenceConstants.EDITOR_STRING_COLOR,
          PreferencesMessages.DLTKEditorPreferencePage_strings)
  
  private SH var := SH(FanPreferenceConstants.EDITOR_VAR_REF_COLOR,
          PreferencesMessages.DLTKEditorPreferencePage_variables)
  
  private SH keyword := SH(FanPreferenceConstants.EDITOR_KEYWORD_COLOR,
          PreferencesMessages.DLTKEditorPreferencePage_keywords)

  private SH field := SH(FanPreferenceConstants.EDITOR_FIELD_COLOR,
          "Fields")
  
  private SH staticField := SH(FanPreferenceConstants.EDITOR_STATIC_FIELD_COLOR,
          "Static fields")
  
  private SH method := SH(FanPreferenceConstants.EDITOR_METHOD_COLOR,
          "Methods")
  
  private SH staticMethod := SH(FanPreferenceConstants.EDITOR_STATIC_METHOD_COLOR,
          "Static methods")
  
  override SemanticHighlighting?[]? getSemanticHighlightings()
  {
    [funcDef, classDef, str, var, keyword, field, staticField, method, staticMethod]
  }

  private Str index(SH sh) { sh.getPreferenceKey }

  protected override Bool doHighlighting(IModuleSource? sourceModule)
  {
    me := sourceModule.getModelElement
    if(me == null) return false
    ParseUtil.parse(me).accept(this) 
    return true
  }
  
  override Bool enterNode(Node node)
  {
    if (node is SlotRef)
    {
      SlotRef ref := node
      if (ref.id === ExprId.fieldRef)
        addPosition(ref.start, ref.end+1, index(ref.modelSlot.isStatic ? staticField : field))
      else if(ref.id === ExprId.methodRef)
        addPosition(ref.start, ref.end+1, index(ref.modelSlot.isStatic ? staticMethod : method))
    }
    else if (node is MethodVarRef)
    {
      MethodVarRef ref := node
      addPosition(ref.start, ref.end+1, index(var))
    }
    else if (node is FuncTypeParam)
    {
      FuncTypeParam param := node
      name := param.name
      if (name != null) addPosition(name.start, name.end+1, index(var))
    }
    else if (node is TypeDef)
    {
      TypeDef def := node
      mod := def.modifiers.map[ModifierId.Enum]
      if (mod != null) addPosition(mod.start, mod.end+1, index(keyword))
      mod = def.modifiers.map[ModifierId.Facet]
      if (mod != null) addPosition(mod.start, mod.end+1, index(keyword))
    }
    else if (node is Getter)
    {
      Getter getter := node
      addPosition(getter.name.start, getter.name.end+1, index(keyword))
    }
    else if (node is Setter)
    {
      Setter setter := node
      addPosition(setter.name.start, setter.name.end+1, index(keyword))
    }
    else if (node is MethodVar)
    {
      MethodVar def := (MethodVar)node
      addPosition(def.name.start, def.name.end+1, index(var))
    }
    else if (node is FuncTypeParam)
    {
      FuncTypeParam param := node
      addPosition(param.name.start, param.name.end+1, index(var))
    }
    else if (node is EnumValDef)
    {
      EnumValDef f := node
      addPosition(f.name.start, f.name.end+1, index(staticField))
    }
    else if (node is FieldDef)
    {
      FieldDef f := node
      addPosition(f.name.start, f.name.end+1, index(f.modifiers.has(ModifierId.Static) ? staticField : field))
    }
    return true
  }
}
