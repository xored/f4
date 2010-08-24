//
// Copyright (c) 2010 xored software, Inc.
// Licensed under the Academic Free License version 3.0
//
// History:
//   21 Apr 10  Andrey Talnikov  Initial Contribution
//

**
** PrintClass
**
class PrintClass
{
  static Void main(Str[] args)
  {
    if (1 != args.size)
    {
      echo("test has one parameter - path to classfile to parse")
      return
    }

    InStream? in := null

    try
    {
      File input := File.make(Uri.decode(args[0]))
      in = input.in
    }
    catch (ParseErr e)
    {
      echo("an argument ${args[0]} is not a path to classfile")
      return
    }
    catch (IOErr e)
    {
      echo("cannot open a file ${args[0]}")
      return
    }

      JavaType c := JavaType.fromStream(in)

      echo("$c")
      echo("{")
      echo("\t// fields")
      c.fields.each
      {
        echo("\t$it;")
      }
      echo("\n\t// methods")
      c.methods.each
      {
        echo("\t$it;")
      }
      echo("}")
  }
}
