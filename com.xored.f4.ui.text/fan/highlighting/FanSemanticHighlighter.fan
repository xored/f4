//
// Copyright (c) 2009-2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Alexey Alexandrov Apr 13, 2010 - Initial Contribution
//

using [java]org.eclipse.dltk.ui.editor.highlighting::SemanticHighlighting
using [java]com.xored.fanide.ui.highlighting::ISemanticHighlightingExtension
using [java]org.eclipse.dltk.ui.editor.highlighting::ISemanticHighlightingRequestor
using [java]org.eclipse.dltk.compiler.env::IModuleSource
using [java]com.xored.fanide.ui.highlighting::SH
using [java]com.xored.fanide.ui::FanPreferenceConstants
using [java]org.eclipse.dltk.ui.preferences::PreferencesMessages
using [java]org.eclipse.dltk.core

using f4parser
using f4model
using f4core

class FanSemanticHighlighter : ISemanticHighlightingExtension, AstVisitor
{
  private ISemanticHighlightingRequestor? requestor
  private SemanticHighlighting[] highlightings := 
  [
      SH("DLTK_function_definition",
          null, PreferencesMessages.DLTKEditorPreferencePage_function_colors),
      SH("DLTK_class_definition", null,
          PreferencesMessages.DLTKEditorPreferencePage_class_colors),
      SH("DLTK_string",
          null, PreferencesMessages.DLTKEditorPreferencePage_strings),
      SH("fan_variable",
          null, PreferencesMessages.DLTKEditorPreferencePage_variables),
      SH("DLTK_keyword",
          null, PreferencesMessages.DLTKEditorPreferencePage_keywords),
      SH("fan_field",
          null, PreferencesMessages.DLTKEditorPreferencePage_keywords),
      SH("fan_static_field", null,
          PreferencesMessages.DLTKEditorPreferencePage_keywords)
  ]

  private static const Int HL_KEYWORDS := 4;
  private static const Int HL_VARIABLES := 3;
  private static const Int HL_FIELD := 5;
  private static const Int HL_STATIC_FIELD := 6;

  override SemanticHighlighting?[]? getHighlightings() {
    return highlightings
  }

  override Bool process(IModuleSource? sourceModule,
      ISemanticHighlightingRequestor? requestor)
  {
    if (requestor == null) return false
    this.requestor = requestor
    p := sourceModule.getModelElement?.getScriptProject?.getProject
    if(p == null) return false
    ns := FantomProjectManager.instance[p].ns
    content := sourceModule.getSourceContents
    cunit := Parser(content, ns).cunit 
    cunit.accept(this)
    this.requestor = null
    return true
  }
  
  override Bool enterNode(Node node)
  {
    if (node is SlotRef)
    {
      SlotRef ref := node
      if (ref.id === ExprId.fieldRef)
      {
        if (ref.modelSlot.isStatic())
          requestor.addPosition(ref.start, ref.end+1, HL_STATIC_FIELD)
        else
          requestor.addPosition(ref.start, ref.end+1, HL_FIELD)       
      }
    }
    else if (node is MethodVarRef)
    {
      MethodVarRef ref := node
      requestor.addPosition(ref.start, ref.end+1, HL_VARIABLES)
    }
    else if (node is LocalDef)
    {
      LocalDef def := node
      requestor.addPosition(def.name.start, def.name.end+1, HL_VARIABLES)
    }
    else if (node is ItRef)
    {
      requestor.addPosition(node.start, node.end+1, HL_VARIABLES)
    }
    else if (node is Getter)
    {
      Getter getter := node
      requestor.addPosition(getter.name.start, getter.name.end+1, HL_KEYWORDS)
    }
    else if (node is Setter)
    {
      Setter setter := node
      requestor.addPosition(setter.name.start, setter.name.end+1, HL_KEYWORDS)
    }
    else if (node is FieldDef)
    {
      FieldDef f := node
      if (f.modifiers.has(ModifierId.Static))
        requestor.addPosition(f.name.start, f.name.end+1, HL_STATIC_FIELD)
      else
        requestor.addPosition(f.name.start, f.name.end+1, HL_FIELD)
    }
    return true
  }
}
