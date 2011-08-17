using [java]com.xored.fanide.core.utils::JDTTypeNameRequestor
using [java]fanx.interop::CharArray
using [java]java.lang::System
class ClassPathTypeRequestor: JDTTypeNameRequestor
{
  private Str:Str[] result := [Str:Str[]][:]

  public override Void acceptJavaType( Int modifiers, Str? packageName, Str? simpleTypeName, Str?[]? enclosingTypeNames, Str? path)
  {
    if( packageName != null && simpleTypeName != null && path != null)
    {
      list := result.getOrAdd(packageName) |->Obj| { Str[,] }
      if(!list.contains(simpleTypeName)) list.add(simpleTypeName)
    }
  }
  public Str:Str[] getClasses()
  {
    return result
  }
}
