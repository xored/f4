//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   talnikov May 19, 2010 - Initial Contribution
//

using compiler

internal class FlagsStr : StyledStr
{
  new make(Int flags)
  {
    s := StrBuf()

    if (flags.and(FConst.Native)    != 0) s.add("native ")
    if (flags.and(FConst.Synthetic) != 0) s.add("synthetic ")

    if (flags.and(FConst.Abstract)  != 0) s.add("abstract ")
    if (flags.and(FConst.Virtual)   != 0) s.add("virtual ")
    if (flags.and(FConst.Override)  != 0) s.add("override ")
 
    if (flags.and(FConst.Private)   != 0) s.add("private ")
    if (flags.and(FConst.Protected) != 0) s.add("protected ")
    if (flags.and(FConst.Internal)  != 0) s.add("internal ")

    if (flags.and(FConst.Static)    != 0) s.add("static ")

    if (flags.and(FConst.Const)     != 0) s.add("const ")

    if (flags.and(FConst.Enum)      != 0) s.add("enum ")
    if (flags.and(FConst.Final)     != 0) s.add("final ")
    if (flags.and(FConst.Mixin)     != 0) s.add("mixin ")

    if (flags.and(FConst.Ctor)      != 0) s.add("new ")

    appendFragment(s.toStr.trimEnd, FcodeFontStyle.keyword)
  }
}

internal class TypeDeclStr : StyledStr
{
  new make(FType type)
  {
    append(FlagsStr(type.flags))
    if (size > 0) { appendFragment(" ") }
    // if mixin, do not write class
    if (type.flags.and(FConst.Mixin) == 0)
    {
      appendFragment("class ", FcodeFontStyle.keyword)
    }
    appendFragment(type.name, FcodeFontStyle.typeDefinition, key(type))

    pod := type.pod
    bases := pod.typeRef(type.fbase).format(pod) == "sys::Obj" ? [,] : [type.fbase]
    bases.addAll(type.fmixins)

    if (!bases.isEmpty) { appendFragment(" : ") }
    bases.each |b, i|
    {
      if (i > 0) { appendFragment(", ") }
      append(TypeRefStr(pod.typeRef(b), pod))
    }
  }

  static Str key(FType type) { type.name }
}

internal class TypeRefStr : StyledStr
{
  new make(FTypeRef typeref, FPod pod)
  {
    name := typeref.format(pod)
    if (name.startsWith("sys::")) name = name["sys::".size .. -1]
    appendFragment(name)
  }
}

internal class FieldStr : StyledStr
{
  new make(FField field)
  {
    append(FlagsStr(field.flags))
    if (size > 0) { appendFragment(" ") }
    append(TypeRefStr(field.pod.typeRef(field.typeRef), field.pod))
    appendFragment(" ")

    style := (0 == field.flags.and(FConst.Static)) ?
      FcodeFontStyle.field : FcodeFontStyle.staticField
    appendFragment(field.name, FcodeFontStyle.field, key(field))
  }

  static Str key(FField field) { "${field.fparent.name}.${field.name}" }
}

internal class FieldRefStr : StyledStr
{
  new make(FFieldRef fieldref, FPod pod)
  {
    append(TypeRefStr(pod.typeRef(fieldref.parent), pod))
    appendFragment(".")
    appendFragment("${pod.n(fieldref.name)}", FcodeFontStyle.field)
  }
}

internal class MethodDeclStr : StyledStr
{
  new make(FMethod method)
  {
    flags := method.flags
    if (method.code == null) { flags = flags.or(FConst.Native) }

    append(FlagsStr(flags))
    if (size > 0) { appendFragment(" ") }
    // skip return in constructor, getter and setter
    if (method.flags.and(FConst.Ctor.or(FConst.Getter).or(FConst.Setter)) == 0)
    {
      append(TypeRefStr(method.pod.typeRef(method.ret), method.pod))
      appendFragment(" ")
    }

    name := method.name
    if (method.flags.and(FConst.Getter) != 0) { name = "get" }
    if (method.flags.and(FConst.Setter) != 0) { name = "set" }

    appendFragment(name, FcodeFontStyle.functionDefinition, key(method))

    // skip parameters of getter and setter
    if (method.flags.and(FConst.Getter.or(FConst.Setter)) == 0)
    {
      appendFragment("(")
      method.fparams.each |param, i|
      {
        if (i > 0) { appendFragment(", ") }
        append(MethodVarStr(param))
      }
      appendFragment(")")
    }
  }

  static Str key(FMethod method)
  {
    pod := method.pod
    paramsStr := method.fparams.map{ pod.typeRef(it.typeRef).format(pod) }.join(", ")
    return "${method.fparent.name}.${method.name}($paramsStr)"
  }
}

internal class MethodRefStr : StyledStr
{
  new make(FMethodRef methodref, FPod pod)
  {
    append(TypeRefStr(pod.typeRef(methodref.parent), pod))
    appendFragment(".")
    appendFragment("${pod.n(methodref.name)}")
    appendFragment("(")
    methodref.params.each |param, i|
    {
      if (i > 0) appendFragment(", ")
      append(TypeRefStr(pod.typeRef(param), pod))
    }
    appendFragment(")")
  }
}

internal class MethodVarStr : StyledStr
{
  new make(FMethodVar var)
  {
    append(TypeRefStr(var.fpod.typeRef(var.typeRef), var.fpod))
    appendFragment(" ")
    appendFragment(var.name, FcodeFontStyle.variable)
  }
}

internal class OpStr : StyledStr
{
  new make(Op op, FPod pod)
  {
    appendFragment(op.signature, FcodeFontStyle.keyword)
    Obj[] args := op.args(pod)
    if (!args.isEmpty) appendFragment(" ")

    args.each |arg, i|
    {
      if (i > 0) appendFragment(", ")

      if (arg is Num) { appendFragment(arg.toStr, FcodeFontStyle.num) }
      else if (arg is Str) { appendFragment("\"$arg.toStr\"", FcodeFontStyle.str) }
      else if (arg is FTypeRef) { append(TypeRefStr(arg, pod)) }
      else if (arg is FFieldRef) { append(FieldRefStr(arg, pod)) }
      else if (arg is FMethodRef) { append(MethodRefStr(arg, pod)) }
    }
  }
}

internal class MethodBodyStr : StyledStr
{
  new make(Buf code, FPod pod, Str offset)
  {
    Int line := 0
    appendFragment("$offset{\n")
    Operations.parse(code).each
    {
      appendFragment("$offset\t")
      appendFragment("$line:".padl(4, ' '), FcodeFontStyle.comment)
      appendFragment("\t")
      append(OpStr(it, pod))
      appendFragment("\n")
      line += it.size + 1
    }
    appendFragment("$offset}\n")
  }
}
