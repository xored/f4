using [java] org.eclipse.dltk.ui.text::DLTKColorConstants

class FanColorConstants
{
  private new make() { }
  /**
   * The color key for string and character literals in Fantom code.
   */
  static const Str string := DLTKColorConstants.DLTK_STRING

  /**
   * The color key for Fantom documentation.
   */
  static const Str fandoc := DLTKColorConstants.DLTK_DOC

  /**
   * The color key for Fantom domain specific language.
   */
  static const Str dsl := "com.xored.fanide.ui.dsl" 

  /**
   * The color key for Fantom multi-line comments.
   */
  static const Str multiLineComment := DLTKColorConstants.DLTK_MULTI_LINE_COMMENT 

  /**
   * The color key for Fantom comments.
   */
  static const Str singleLineComment := DLTKColorConstants.DLTK_SINGLE_LINE_COMMENT 

  /**
   * The color key for Fantom numbers.
   */
  static const Str number := DLTKColorConstants.DLTK_NUMBER

  /**
   * The color key for Fantom keywords.
   */
  static const Str keyword := DLTKColorConstants.DLTK_KEYWORD

  /**
   * The color key for Fantom keyword 'return'.
   */
  static const Str keywordReturn := DLTKColorConstants.DLTK_KEYWORD_RETURN 

  /**
   * The color key for Fantom code.
   */
  static const Str defaultCode := DLTKColorConstants.DLTK_DEFAULT

  /**
   * The color key for Fantom class definition.
   */
  static const Str classDefinition := DLTKColorConstants.DLTK_CLASS_DEFINITION

  /**
   * The color key for Fantom function definition.
   */
  static const Str functionDefinition := DLTKColorConstants.DLTK_FUNCTION_DEFINITION

  /**
   * The color key for Fantom decorator.
   */
  static const Str decorator := "DLTK_decorator"

  /**
   * The color key for Fantom local variable reference
   */
  static const Str varRef := "fan_var_ref"
  
  /**
   * The color key for Fantom local variable definition
   */
  static const Str varDef := "fan_var_def"
  
  /**
   * The color key for Fantom parameter def or ref
   */
  static const Str param := "fan_param"
  
  /**
   * The color key for Fantom field.
   */
  static const Str field := "fan_field"

  /**
   * The color key for Fantom static field.
   */
  static const Str staticField := "fan_static_field"

  /**
   * The color key for TO-DO tasks in comments.
   */
  static const Str todoTag := DLTKColorConstants.TASK_TAG
  static const Str interpreterString := "FAN_interpreter_string"
  
  /**
   * The color key for Fantom method
   */
  static const Str method := "fan_method"
  
  /**
   * The color key for Fantom static method
   */
  static const Str staticMethod := "fan_static_method"

}
