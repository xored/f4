//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 17, 2010 - Initial Contribution
//

using [java] java.lang::Class
using [java] java.lang.reflect::Array 
using [java] java.util::HashMap
using [java] fanx.interop
using [java] java.io::File as JFile
**
** Aggregates helper methods related to calling Java code
**
class InteropUtil
{
  static HashMap convertMap(Obj:Obj? map)
  {
    result := HashMap()
    map.each |v, k| { result.put(k, v) }
    return result
  }
  
  static Class getClass(Type t) { Class.forName(className(t)) }
 
  static Bool isEqual(Class c, Type t) {
    return c.getName == className(t)
  }
  
  static Obj toArray(Type type, Obj[] list) {
    array := Array.newInstance(getClass(type), list.size)
    for (Int i := 0; i < list.size; i++) {
      Array.set(array, i, list[i])
    }
    return array
  }
  
  static Str? className(Type type)
  {
    qname := type.qname
    if(!qname.startsWith("[java]")) throw ArgErr("Type $type is not Java class")
    qname = qname["[java]".size..-1].trim
    return qname.replace("::",".")
    
  }
  
  static JFile javaFile(File f) { JFile(f.osPath) }
 
  static CharArray toCharArray(Int[] list) {
    array := CharArray(list.size)
    for (Int i := 0; i < list.size; i++) array.set(i, list[i])
    return array
  }
  
}
