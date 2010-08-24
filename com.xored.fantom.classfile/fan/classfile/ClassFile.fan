//
// Copyright (c) 2010, xored software, Inc.
// Licensed under the Academic Free License version 3.0
//
// History:
//   21 Apr 10  Andrey Talnikov  Initial Contribution
//

**
** ClassFile
**
const class ClassFile
{
  static const Int magic := 0xCAFEBABE
  const Int minorVersion
  const Int majorVersion
  const ConstPool constPool
  const Int accessFlags
  const Int thisClass
  const Int superClass
  const Int[] interfaces
  const ClassFileField[] fields
  const ClassFileMethod[] methods
  const ClassFileAttr[] attrs

  private static const Str exceptionsAttrName    := "Exceptions"
  private static const Str innerClassesAttrName  := "InnerClasses"

  new make(|This|? f) { f?.call(this) }

  static ClassFile fromStream(InStream istream)
  {
    ClassFile
    {
      if (magic != istream.readU4)
      {
        throw FormatErr()
      }
  
      minorVersion = istream.readU2
      majorVersion = istream.readU2
  
      constPool = ConstPool.fromStream(istream)
  
      accessFlags = istream.readU2
      thisClass = istream.readU2
      superClass = istream.readU2
  
      Int[] readInterfaces := [,]
      Int interfacesCount := istream.readU2
      interfacesCount.times
      {
        readInterfaces.add(istream.readU2)
      }
      interfaces = readInterfaces
  
      ClassFileField[] readFields := [,]
      Int fieldsCount := istream.readU2
      fieldsCount.times
      {
        readFields.add(ClassFileField.fromStream(istream))
      }
      fields = readFields

      ClassFileMethod[] readMethods := [,]
      Int methodsCount := istream.readU2
      methodsCount.times
      {
        readMethods.add(ClassFileMethod.fromStream(istream))
      }
      methods = readMethods

      ClassFileAttr[] readAttrs := [,]
      Int attrsCount := istream.readU2
      attrsCount.times
      {
        readAttrs.add(ClassFileAttr.fromStream(istream))
      }
      attrs = readAttrs
    }
  }

  Str className(Int index) { constPool.className(index) }

  Str str(Int index) { constPool.utf8(index) }

  Str[] exceptions(ClassFileMethod method)
  {
    exceptions := [,]
    attr := method.attrs.find
    {
      exceptionsAttrName == constPool.utf8(it.nameIndex)
    }

    if(attr == null) return Str[,]

    return ExceptionsAttrInfo.fromStream(attr.info.in).exceptionIndexTable.map
    {
      constPool.className(it)
    }
  }
}
