//
// Copyright (c) 2009-2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Alexey Alexandrov Apr 14, 2010 - Initial Contribution
//

using [java]org.eclipse.dltk.ui.text.folding::IFoldingBlockKind

const class FanFoldingBlockKind : IFoldingBlockKind
{
  
  public static const FanFoldingBlockKind comment := make(true)
  public static const FanFoldingBlockKind code := make(false)
  
  override const Bool isComment
  
  private new make(Bool isComment) {
    this.isComment = isComment
  }
 
}
