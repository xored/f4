//
// Copyright (c) 2009-2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Alexey Alexandrov Apr 14, 2010 - Initial Contribution
//

using [java]org.eclipse.dltk.core::IScriptProject
using [java]org.eclipse.dltk.ui.text.folding::IFoldingBlockProvider
using [java]org.eclipse.dltk.ui.text.folding::IFoldingContent
using [java]org.eclipse.dltk.ui.text.folding::IFoldingBlockRequestor
using [java]org.eclipse.dltk.ui.text.folding::PartitioningFoldingBlockProvider
using [java]org.eclipse.dltk.ui.text::IPartitioningProvider
using [java]org.eclipse.jface.preference::IPreferenceStore
using [java]org.eclipse.jface.text::Document
using [java]org.eclipse.dltk.ui.text.folding::IFoldingBlockKind
using [java]org.eclipse.jface.text::IRegion
using [java]java.util::List as JList

class FanCommentFoldingBlockProvider : PartitioningFoldingBlockProvider
{

  new make() : super(FanTextTools.instance) {     }
  
  private Void report(IFoldingContent content, Str pattern, Bool collapse) {
    computeBlocksForPartitionType(content, pattern, FanFoldingBlockKind.comment, collapse)
  }
  
  override Void computeFoldableBlocks(IFoldingContent? content) {
    if (isFoldingComments) {
      report(content, IFanPartitions.singleLineComment, isCollapseComments)
      report(content, IFanPartitions.multiLineComment, isCollapseComments)
    }
    if (isFoldingDocs) report(content, IFanPartitions.fandoc, isCollapseDocs)
  }

  override Void reportRegions(Document? document, JList? regions,
      IFoldingBlockKind? kind, Bool collapse) {
        for (i := 0; i < regions.size(); i++) {
          IRegion region := regions.get(i)
          Bool first := (region.getOffset == 0) 
          requestor?.acceptBlock(region.getOffset, region.getOffset
            + region.getLength, kind, null, first ? isCollapseHeaderComment : collapse)
        }
  }
  
}