//
// Copyright (c) 2010, xored software, Inc.
// Licensed under the Academic Free License version 3.0
//
// History:
//   21 Apr 10  Andrey Talnikov  Initial Contribution
//

**
** 
**
const class TypeRef
{
  const Str descr

  private static const Int byte := 'B' 
  private static const Int char := 'C' 
  private static const Int double := 'D'
  private static const Int float := 'F'
  private static const Int int := 'I'
  private static const Int long := 'J'
  private static const Int short := 'S'
  private static const Int boolean := 'Z'
  
  private static const Int[] primitives := 
      [byte, char, double, float, int, long, short, boolean]
  
  private static const Int clsStart := 'L'
  private static const Int clsEnd   := ';'
  private static const Int array    := '['

  
  
  static const TypeRef Byte := TypeRef("B") 
  static const TypeRef Char := TypeRef("C") 
  static const TypeRef Double := TypeRef("D")
  static const TypeRef Float := TypeRef("F")
  static const TypeRef Int := TypeRef("I")
  static const TypeRef Long := TypeRef("J")
  static const TypeRef Short := TypeRef("S")
  static const TypeRef Boolean := TypeRef("Z")

  private static const Int:Str names := [byte:"byte",
    char:"char", double:"double", float:"float", int:"int",
    long:"long", short:"short", boolean:"boolean"]

  private static const Str arrayBraces  := "[]"

  private static const Str innerSep     := "/"
  private static const Str canonicalSep := "."

  new make(Str descr)
  {
    this.descr = descr
  }

  ** From slash-separated name, for example "java/lang/Object"
  static TypeRef fromInnerName(Str className)
  {
    TypeRef("${clsStart.toChar}$className${clsEnd.toChar}")
  }

  ** From dot-separated name,
  ** for example "java.lang.Object"
  static TypeRef fromCanonicalName(Str className)
  {
    TypeRef("$clsStart.toChar${className.replace(canonicalSep, innerSep)}$clsEnd.toChar")
  }

  static TypeRef arrayOf(TypeRef component)
  {
    TypeRef("$array.toChar$component.descr")
  }

  Bool isClassRef() { descr[0] == clsStart && descr[-1] == clsEnd  }

  Str? innerName() { isClassRef ? descr[1..-2] : null }

  Str? canonicalName() { innerName?.replace(innerSep, canonicalSep) }

  private static Bool isPrimitiveDescr(Int descr) { primitives.contains(descr) }

  Bool isPrimitive() { descr.size == 1 && isPrimitiveDescr(descr[0]) }

  Bool isArray() { descr.size >= 1 && descr[0] == array }

  TypeRef? elemType() { isArray ? TypeRef(descr[1..-1]) : null }

  internal static TypeRef fromStream(InStream in)
  {
    readDescriptor := StrBuf()
    firstChar := in.readChar
    readDescriptor.addChar(firstChar)

    if (isPrimitiveDescr(firstChar))
      return TypeRef(firstChar.toChar)

    if (firstChar == clsStart)
    {
      Int? readChar
      while ((readChar = in.readChar) != null)
      {
        readDescriptor.addChar(readChar)
        if (readChar == clsEnd)
          return TypeRef(readDescriptor.toStr)
      }
    }

    if (firstChar == array)
    {
      while (array == in.peekChar)
        readDescriptor.addChar(in.readChar)
      readDescriptor.add(TypeRef.fromStream(in).descr)
      return TypeRef(readDescriptor.toStr)
    }

    throw FormatErr()
  }

  override Str toStr()
  {
    if (isClassRef)
      return canonicalName

    if (isArray)
      return elemType + arrayBraces

    if (isPrimitive)
      return names[descr[0]]

    return descr
  }

  override Int hash() { descr.hash }

  override Bool equals(Obj? obj)
  {
    (obj isnot TypeRef) ? false : descr == obj->descr
  }
}
