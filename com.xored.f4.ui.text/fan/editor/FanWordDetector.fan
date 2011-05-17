using [java] org.eclipse.jface.text.rules::IWordDetector

/**
 * A fantom aware word detector.
 */
class FanWordDetector : IWordDetector
{

  /* (non-Javadoc)
   * Method declared on IWordDetector.
   */
  override Bool isWordPart(Int character) { return character.isAlphaNum }
  
  /* (non-Javadoc)
   * Method declared on IWordDetector.
   */
  override Bool isWordStart(Int character) { return character.isAlpha }
}
