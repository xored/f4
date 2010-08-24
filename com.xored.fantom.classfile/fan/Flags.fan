//
// Copyright (c) 2010 xored software, Inc.
// Licensed under the Academic Free License version 3.0
//
// History:
//   21 Apr 10  Andrey Talnikov  Initial Contribution
//

enum class Flags
{
  Public(0x0001, "public"),
  Private(0x0002, "private"),
  Protected(0x0004, "protected"),
  Static(0x0008, "static"),
  Final(0x0010, "final"),
  Super(0x0020, "super"),
  Synchronized(0x0020, "synchronized"),
  Volatile(0x0040, "volatile"),
  Bridge(0x0040, "bridge"),
  Transient(0x0080, "transient"),
  Varargs(0x0080, "varargs"),
  Native(0x0100, "native"),
  Interface(0x0200, "interface"),
  Abstract(0x0400, "abstract"),
  Strict(0x0800, "strict"),
  Annotation(0x2000, "@interface"),
  Enum(0x4000, "enum")

  private new make(Int mask, Str displayName) 
  { 
    this.mask = mask
    this.displayName = displayName 
  }
  const Int mask
  const Str displayName

  Bool isSet(Int flags) { flags.and(mask) == mask }

  static Str strClassFlags(Int flags)
  {
    result := Str[,]
    [Public, Private, Protected, Static, Final].each
    {
      if(it.isSet(flags)) result.add(it.displayName)
    }

    if(Interface.isSet(flags)) result.add(Interface.displayName)
    else if(Annotation.isSet(flags)) result.add(Annotation.displayName)
    else if(Flags.Enum.isSet(flags)) result.add(Flags.Enum.displayName)
    else
    {
      if(Abstract.isSet(flags)) result.add(Abstract.displayName)
      result.add("class")
    }
    return result.join(" ")
  }

  static Str strFieldFlags(Int flags)
  {
    [Public, Private, Protected, Static, Final, Volatile, Flags.Transient].findAll 
    {
      it.isSet(flags)
    }.map { it.displayName }.join(" ")
  }

  static Str strMethodFlags(Int flags)
  {
    [Public, Private, Protected, Static, Final, Synchronized, Native, Abstract, Strict].findAll
    {
      it.isSet(flags)
    }.map { it.displayName }.join(" ")
  }
}
