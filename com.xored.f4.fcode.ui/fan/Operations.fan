//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   talnikov May 17, 2010 - Initial Contribution
//

using compiler

**
** Operations
**
internal const class Operations : OpConst
{
  private static const Str:Type ops := [
    "()":VoidOp#,
    "(int)":UnaryOp#,
    "(float)":UnaryOp#,
    "(decimal)":UnaryOp#,
    "(str)":UnaryOp#,
    "(dur)":UnaryOp#,
    "(type)":UnaryOp#,
    "(uri)":UnaryOp#,
    "(reg)":UnaryOp#,
    "(field)":UnaryOp#,
    "(method)":UnaryOp#,
    "(jmp)":UnaryOp#,
    "(typePair)":TypePairOp#]

  static Op[] parse(Buf buf)
  {
    in := buf.in
    result := Op[,]

    while (buf.more)
    {
      opcode := in.read
      Op op := ops[OpSigs[opcode]].method("fromStream").callOn(null, [in, opcode])
      result.add(op)
    }
    return result
  }
}

abstract internal const class Op : OpConst
{
  const Int opcode

  Str signature() { "${OpNames[opcode]} ${OpSigs[opcode]}" }
  abstract Int size()
  abstract Obj[] args(FPod pod)
}

internal const class VoidOp : Op
{
  new make(|This|? f) { f?.call(this) }

  static VoidOp fromStream(InStream istream, Int opcode_)
  {
    if (opcode_ == Switch)
    {
      return SwitchOp
      {
        opcode = opcode_
        casesSize := istream.readU2
        readCases := Int[,]
        casesSize.times { readCases.add(istream.readU2) }
        cases = readCases
      }
    }
    return VoidOp { opcode = opcode_ }
  }

  override Obj[] args(FPod pod) { [,] }
  override Int size() { 0 }
}

internal const class SwitchOp : VoidOp
{
  const Int[] cases

  new make(|This|? f) : super(null) { f?.call(this) }

  override Obj[] args(FPod pod) { cases }
  override Int size() { 2 + cases.size*2 }
}

internal const class UnaryOp : Op
{
  const Int? arg

  new make(|This|? f) { f?.call(this) }

  static UnaryOp fromStream(InStream istream, Int opcode_)
  {
    UnaryOp
    {
      opcode = opcode_
      arg = istream.readU2
    }
  }

  override Obj[] args(FPod pod)
  {
    switch (OpSigs[opcode])
    {
      case "(int)":       return [pod.integer(arg)]
      case "(float)":     return [pod.float(arg)]
      case "(decimal)":   return [pod.decimal(arg)]
      case "(str)":       return [pod.str(arg)]
      case "(dur)":       return [pod.duration(arg)]
      case "(type)":      return [pod.typeRef(arg)]
      case "(uri)":       return [pod.uri(arg)]
      case "(field)":     return [pod.fieldRef(arg)]
      case "(method)":    return [pod.methodRef(arg)]
    }
    return [arg] // case "(jmp)", case "(reg)"
  }
  override Int size() { 2 }
}

internal const class TypePairOp : Op
{
  const Int fstArg
  const Int sndArg

  new make(|This|? f) { f?.call(this) }

  static TypePairOp fromStream(InStream istream, Int opcode_)
  {
    TypePairOp
    {
      opcode = opcode_
      fstArg = istream.readU2
      sndArg = istream.readU2
    }
  }

  FTypeRef fstArgVal(FPod pod) { pod.typeRef(fstArg) }
  FTypeRef sndArgVal(FPod pod) { pod.typeRef(sndArg) }

  override Obj[] args(FPod pod)
  {
    [pod.typeRef(fstArg), pod.typeRef(sndArg)]
  }
  override Int size() { 4 }
}
