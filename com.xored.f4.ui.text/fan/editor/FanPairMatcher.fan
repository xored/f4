using [java] fanx.interop
using [java] org.eclipse.jface.text::IDocument
using [java] org.eclipse.jface.text::IRegion
using [java] org.eclipse.jface.text.source::DefaultCharacterPairMatcher
using [java] com.xored.fanide.core::FanConstants
using [java] com.xored.f4.ui.text::FanJavaPairMatcher

class FanPairMatcher : FanJavaPairMatcher
{
//  private int fBlockAnchor;
  
  private static CharArray brackets() {
    res := CharArray(6)
    "{}[]()".each |c, i| { res[i] = c }
    return res
  }

  new make() : super(brackets, FanConstants.FAN_PARTITIONING) { }

  /* @see ICharacterPairMatcher#match(IDocument, int) */
  override IRegion? doMatch(IDocument? document, Int offset)
  {
    return offset < 0 || offset > document.getLength || document == null
      ? null : super.doMatch(document, offset)
  }

  /*public int getAnchor() {
    int superAnchor = super.getAnchor();
    if (superAnchor < 0)
      return fBlockAnchor;
    else
      return superAnchor;
  }

  public void clear() {
    super.clear();
    fBlockAnchor = -1;
  }*/
}