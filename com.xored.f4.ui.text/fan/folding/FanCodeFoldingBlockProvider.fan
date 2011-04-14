//
// Copyright (c) 2009-2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Alexey Alexandrov Apr 14, 2010 - Initial Contribution
//

using [java]org.eclipse.dltk.core::IScriptProject
using [java]org.eclipse.dltk.ui.text.folding::IFoldingContent
using [java]org.eclipse.dltk.ui.text.folding::IFoldingBlockProvider
using [java]org.eclipse.dltk.ui.text.folding::IFoldingBlockRequestor
using [java]org.eclipse.jface.preference::IPreferenceStore
using [java]org.eclipse.dltk.ui::PreferenceConstants
using [java]com.xored.fanide.ui::FanPreferenceConstants
using [java]org.eclipse.dltk.core::SourceParserUtil
using [java]org.eclipse.dltk.core::ISourceModule
using f4parser
using f4model
using f4core

class FanCodeFoldingBlockProvider : IFoldingBlockProvider
{
 
  private IFoldingBlockRequestor? requestor := null
  private Int minLineCount := 3
  
  override Int getMinimalLineCount() { minLineCount }
  Bool collapseClasses := false { private set }
  Bool collapseMethods := false { private set }
  Bool collapseClosures := false { private set }
  Bool collapseImports := false { private set }
  
  public IFoldingBlockRequestor? getRequestor() {
    return requestor
  }
  
  override Void initializePreferences(IPreferenceStore? ps) {
    if (ps == null) return
    minLineCount = ps.getInt(PreferenceConstants.EDITOR_FOLDING_LINES_LIMIT)
    collapseClasses = ps.getBoolean(PreferenceConstants.EDITOR_FOLDING_INIT_CLASSES)
    collapseMethods = ps.getBoolean(PreferenceConstants.EDITOR_FOLDING_INIT_METHODS)
    collapseClosures = ps.getBoolean(FanPreferenceConstants.EDITOR_FOLDING_INIT_CLOSURES)
    collapseImports = ps.getBoolean(FanPreferenceConstants.EDITOR_FOLDING_INIT_IMPORTS)
  }
  
  override Void setRequestor(IFoldingBlockRequestor? requestor) {
    this.requestor = requestor
  }

  private IFanNamespace getNamespace(IFoldingContent? content) {
    project := content?.getModelElement?.getScriptProject?.getProject
    if(project == null) return EmptyNamespace()
    if (!(project?.isOpen ?: false)) return EmptyNamespace()
    return FantomProjectManager.instance[project].ns
  }
  
  override Void computeFoldableBlocks(IFoldingContent? content) {
    DltkAst ast := SourceParserUtil.parse(content.getModelElement as ISourceModule, null)
    CUnit unit := ast.unit  
    unit.accept(ImportVisitor(this))
    unit.accept(CodeVisitor(this))
  }
  
}