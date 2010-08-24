//
// Copyright (c) 2010, xored software, Inc.
// Licensed under the Academic Free License version 3.0
//
// History:
//   21 Apr 10  Andrey Talnikov  Initial Contribution
//

**
** JavaClass
**
const class JavaType
{
  const TypeRef? type
  const Int flags
  const TypeRef? superClass
  const TypeRef[] interfaces := [,]

  const JavaField[] fields := [,]
  const JavaMethod[] methods := [,]

  new make(|This|? f) { f?.call(this) }

  static JavaType fromClassFile(ClassFile cf)
  {
    JavaType
    {
      type = TypeRef.fromInnerName(cf.className(cf.thisClass))
      flags = cf.accessFlags
      superClass = cf.superClass == 0 ? null : TypeRef.fromInnerName(cf.className(cf.superClass))
      interfaces = cf.interfaces.map { TypeRef.fromInnerName(cf.className(it)) }

      fields = cf.fields.map |cff| //classFileField
      {
        JavaField
        {
          name = cf.str(cff.nameIndex)
          flags = cff.accessFlags
          type = TypeRef(cf.str(cff.descriptorIndex))
        }
      }

      methods = cf.methods.map |cfm| //classFileMethod
      {
        JavaMethod
        {
          exceptions = cf.exceptions(cfm).map { TypeRef.fromInnerName(it) }
          descr = MethodDescr.fromStr(cf.str(cfm.descriptorIndex))
          name = cf.str(cfm.nameIndex)
          flags = cfm.accessFlags
        }
      }
    }
  }

  static JavaType fromStream(InStream in)
  {
    fromClassFile(ClassFile.fromStream(in))
  }

  override Str toStr()
  {
    result := StrBuf() 
    result.add("${Flags.strClassFlags(flags)} $type")
    result.add(superClass == null ? "" : " extends $superClass")
    if (!interfaces.isEmpty)
    {
      result.add(" implements ")
      result.add(interfaces.join(", "))
    }
    return result.toStr
  }
}
