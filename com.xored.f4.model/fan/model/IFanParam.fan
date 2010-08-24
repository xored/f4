const mixin IFanParam
{
  **
  ** Name of the parameter.
  **
  abstract Str name()

  **
  ** Type of the parameter.
  **
  abstract Str of()

  **
  ** Return if this parameter has a default value.  If true,
  ** then callers are not required to specify an argument.
  **
  abstract Bool hasDefault()
}