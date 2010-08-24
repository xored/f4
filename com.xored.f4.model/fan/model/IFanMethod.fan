const mixin IFanMethod : IFanSlot
{
  override Bool isField() {return false}
  override Bool isMethod() {return true}
  
//////////////////////////////////////////////////////////////////////////
// Signature
//////////////////////////////////////////////////////////////////////////

//  **
//  ** Type returned by the method or sys::Void if no return value.
//  ** Convenience for 'func.returns'.
//  **
//  abstract Str returns()

  **
  ** Get the parameters of the method.
  ** Convenience for 'func.params'.
  **
  abstract IFanParam[] params()
}