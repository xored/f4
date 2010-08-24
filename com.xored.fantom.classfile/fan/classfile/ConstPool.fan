//
// Copyright (c) 2010, xored software, Inc.
// Licensed under the Academic Free License version 3.0
//
// History:
//   21 Apr 10  Andrey Talnikov  Initial Contribution
//

**
** ConstPool
**
const class ConstPool
{
  static const Int classTag           := 7
  static const Int fieldTag           := 9
  static const Int methodTag          := 10
  static const Int interfaceMethodTag := 11
  static const Int stringTag          := 8
  static const Int integerTag         := 3
  static const Int floatTag           := 4
  static const Int longTag            := 5
  static const Int doubleTag          := 6
  static const Int nameAndTypeTag     := 12
  static const Int utf8Tag            := 1

  private static const Int:Type tagTypes := [
    classTag:ConstClass#,
    fieldTag:ConstField#,
    methodTag:ConstMethod#,
    interfaceMethodTag:ConstInterfaceMethod#,
    stringTag:ConstString#,
    integerTag:ConstInteger#,
    floatTag:ConstFloat#,
    longTag:ConstLong#,
    doubleTag:ConstDouble#,
    nameAndTypeTag:ConstNameAndType#,
    utf8Tag:ConstUTF8#]

  private const ConstTagged[] items

  new make(|This|? f) { f?.call(this) }

  static ConstPool fromStream(InStream istream)
  {
    ConstPool
    {
      Int poolSize := istream.readU2
      // array is indexed from 1 to poolSize-1,
      // so put a filler for the first element
      ConstTagged[] readItems := ConstTagged[ConstClass(null)]
      for (Int i := 0; i < (poolSize - 1); i++)
      {
        ConstTagged entry := nextEntryFromStream(istream)
        readItems.add(entry)
        if (longTag == entry.tag || doubleTag == entry.tag)
        {
          // All 8-byte constants take up two entries in the constant_pool
          // table of the class file. If a CONSTANT_Long_info or
          // CONSTANT_Double_info structure is the item in the constant_pool
          // table at index n, then the next usable item in the pool is located
          // at index n+2. The constant_pool index n+1 must be valid but is
          // considered unusable.
          readItems.add(entry)
          i++
        }
      }
      items = readItems
    }
  }

  private static ConstTagged nextEntryFromStream(InStream istream)
  {
    Int tag := istream.readU1
    if (!tagTypes.containsKey(tag))
    {
      throw FormatErr()
    }

    return tagTypes[tag].method("fromStream").callOn(null, [istream])
  }

  Str utf8(Int index)
  {
    ConstUTF8 constString := items[index]
    return constString.value
  }

  Str className(Int index)
  {
    ConstClass entry := items[index]
    return utf8(entry.nameIndex)
  }
}

**
** ConstTagged
**
abstract const class ConstTagged
{
  abstract Int tag()
}

**
** ConstClass
**
internal const class ConstClass : ConstTagged
{
  override const Int tag := ConstPool.classTag
  const Int nameIndex

  new make(|This|? f) { f?.call(this) }
  
  static ConstClass fromStream(InStream istream)
  {
    ConstClass { nameIndex = istream.readU2 }
  }
}

**
** ConstDouble
**
internal const class ConstDouble : ConstTagged
{
  override const Int tag := ConstPool.longTag
  const Int highBytes
  const Int lowBytes

  new make(|This|? f) { f?.call(this) }
  
  static ConstDouble fromStream(InStream istream)
  {
    ConstDouble
    {
      highBytes = istream.readU4
      lowBytes = istream.readU4
    }
  }
}

**
** ConstField
**
internal const class ConstField : ConstTagged
{
  override const Int tag := ConstPool.fieldTag
  const Int classIndex
  const Int nameAndTypeIndex

  new make(|This|? f) { f?.call(this) }
  
  static ConstField fromStream(InStream istream)
  {
    ConstField
    {
      classIndex = istream.readU2
      nameAndTypeIndex = istream.readU2
    }
  }
}

**
** ConstFloat
**
internal const class ConstFloat : ConstTagged
{
  override const Int tag := ConstPool.floatTag
  const Int bytes

  new make(|This|? f) { f?.call(this) }
  
  static ConstFloat fromStream(InStream istream)
  {
    ConstFloat { bytes = istream.readU4 }
  }
}

**
** ConstInteger
**
internal const class ConstInteger : ConstTagged
{
  override const Int tag := ConstPool.integerTag
  const Int bytes

  new make(|This|? f) { f?.call(this) }
  
  static ConstInteger fromStream(InStream istream)
  {
    ConstInteger { bytes = istream.readU4 }
  }
}

**
** ConstInterfaceMethod
**
internal const class ConstInterfaceMethod : ConstTagged
{
  override const Int tag := ConstPool.interfaceMethodTag
  const Int classIndex
  const Int nameAndTypeIndex

  new make(|This|? f) { f?.call(this) }
  
  static ConstInterfaceMethod fromStream(InStream istream)
  {
    ConstInterfaceMethod
    {
      classIndex = istream.readU2
      nameAndTypeIndex = istream.readU2
    }
  }
}

**
** ConstLong
**
internal const class ConstLong : ConstTagged
{
  override const Int tag := ConstPool.longTag
  const Int highBytes
  const Int lowBytes

  new make(|This|? f) { f?.call(this) }
  
  static ConstLong fromStream(InStream istream)
  {
    ConstLong
    {
      highBytes = istream.readU4
      lowBytes = istream.readU4
    }
  }
}

**
** ConstMethod
**
internal const class ConstMethod : ConstTagged
{
  override const Int tag := ConstPool.methodTag
  const Int classIndex
  const Int nameAndTypeIndex

  new make(|This|? f) { f?.call(this) }
  
  static ConstMethod fromStream(InStream istream)
  {
    ConstMethod
    {
      classIndex = istream.readU2
      nameAndTypeIndex = istream.readU2
    }
  }
}

**
** ConstNameAndType
**
internal const class ConstNameAndType : ConstTagged
{
  override const Int tag := ConstPool.nameAndTypeTag
  const Int nameIndex
  const Int descriptorIndex

  new make(|This|? f) { f?.call(this) }
  
  static ConstNameAndType fromStream(InStream istream)
  {
    ConstNameAndType
    {
      nameIndex = istream.readU2
      descriptorIndex = istream.readU2
    }
  }
}

**
** ConstString
**
internal const class ConstString : ConstTagged
{
  override const Int tag := ConstPool.stringTag
  const Int stringIndex

  new make(|This|? f) { f?.call(this) }
  
  static ConstString fromStream(InStream istream)
  {
    ConstString { stringIndex = istream.readU2 }
  }
}

**
** ConstUTF8
**
internal const class ConstUTF8 : ConstTagged
{
  override const Int tag := ConstPool.utf8Tag
  const Int bytesNumber
  const Str value := ""

  new make(|This|? f) { f?.call(this) }
  
  static ConstUTF8 fromStream(InStream istream)
  {
    ConstUTF8
    {
      bytesNumber = istream.readU2
      value = UTF8Util.readString(istream, bytesNumber)
    }
  }
}
