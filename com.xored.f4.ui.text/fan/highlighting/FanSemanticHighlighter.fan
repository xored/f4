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

**
** Dear future me, this code is full of bullshit, so here's a quick information
** about what's going on here:
**  - we populate the list of highlightings covered by this highlighter
**  - each semantic highlighting accepts three parameters:
**    - Text ID, must match to the provided in FanEditorColoringConfigurationBlock.java
**    - preference id for background, we don't specify it
**    - description, not used
** 
** 
class FanSemanticHighlighter : ISemanticHighlightingExtension, AstVisitor
{
  private ISemanticHighlightingRequestor? requestor
  
  private SH funcDef := SH(FanPreferenceConstants.EDITOR_FUNCTION_DEFINITION_COLOR,
          null, 
          PreferencesMessages.DLTKEditorPreferencePage_function_colors)
  
  private SH classDef := SH(FanPreferenceConstants.EDITOR_CLASS_DEFINITION_COLOR, 
          null,
          PreferencesMessages.DLTKEditorPreferencePage_class_colors)
  
  private SH str := SH(FanPreferenceConstants.EDITOR_STRING_COLOR,
          null, 
          PreferencesMessages.DLTKEditorPreferencePage_strings)
  
  private SH var := SH(FanPreferenceConstants.EDITOR_VAR_REF_COLOR,
          null, 
          PreferencesMessages.DLTKEditorPreferencePage_variables)
  
  private SH keyword := SH(FanPreferenceConstants.EDITOR_KEYWORD_COLOR,
          null, 
          PreferencesMessages.DLTKEditorPreferencePage_keywords)

  private SH field := SH(FanPreferenceConstants.EDITOR_FIELD_COLOR,
          null, 
          "Fields")
  
  private SH staticField := SH(FanPreferenceConstants.EDITOR_STATIC_FIELD_COLOR,
          null,
          "Static fields")
  
  private SH method := SH(FanPreferenceConstants.EDITOR_METHOD_COLOR,
          null, 
          "Methods")
  
  private SH staticMethod := SH(FanPreferenceConstants.EDITOR_STATIC_METHOD_COLOR,
          null,
          "Static methods")
  
  private SemanticHighlighting[] highlightings := 
  [
    funcDef,
    classDef,
    str,
    var,
    keyword,
    field,
    staticField,
    method,
    staticMethod
  ]

  private Int index(SH sh) { highlightings.index(sh) }
  
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
        requestor.addPosition(ref.start, ref.end+1, 
          index(ref.modelSlot.isStatic ? staticField : field))
      } else if(ref.id === ExprId.methodRef) {
        requestor.addPosition(ref.start, ref.end+1, 
          index(ref.modelSlot.isStatic ? staticMethod : method))
      }
    }
    else if (node is MethodVarRef)
    {
      MethodVarRef ref := node
      requestor.addPosition(ref.start, ref.end+1, index(var))
    }
    else if (node is MethodVar)
    {
      MethodVar def := (MethodVar)node
      requestor.addPosition(def.name.start, def.name.end+1, index(var))
    }
    else if (node is ItRef)
    {
      requestor.addPosition(node.start, node.end+1, index(var))
    }
    else if (node is Getter)
    {
      Getter getter := node
      requestor.addPosition(getter.name.start, getter.name.end+1, index(keyword))
    }
    else if (node is Setter)
    {
      Setter setter := node
      requestor.addPosition(setter.name.start, setter.name.end+1, index(keyword))
    }
    else if (node is FieldDef)
    {
      FieldDef f := node
      requestor.addPosition(f.name.start, f.name.end+1, 
        index(f.modifiers.has(ModifierId.Static) ? staticField : field))
    }
    return true
  }
}
