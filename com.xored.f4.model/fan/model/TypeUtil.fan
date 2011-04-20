
class TypeUtil
{
  **
  ** Returns if specified typename has format 'KeyTypeName:ValueTypeName'
  ** 
  static Bool isMapType(Str type)
  {
    for (i := 0; i < type.size; i++)
    {
      if (type[i] == ':' && !isQnamePos(type, i)) { return true }
    }
    return false
  }

  **
  ** Returns if specified position in typename belongs to qname part
  ** 
  static Bool isQnamePos(Str type, Int i)
  {
    char := type[i]
    if (char.isAlphaNum || char == '.') return true
    // single ':' can appear in maps, 
    if (char == ':')
    {
      if ((i != 0 && type[i - 1] == ':') || (i != type.size - 1 && type[i + 1] == ':')) return true
    }
    return false
  }
}
