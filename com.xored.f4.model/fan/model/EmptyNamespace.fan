//
// Copyright (c) 2009-2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Apr 16, 2010 - Initial Contribution
//
class EmptyNamespace : IFanNamespace
{
  override IFanPod currPod := EmptyPod.INSTANCE
  override IFanPod? findPod(Str name) { null }
  override IFanType? findType(Str name) { null }
  override Str[] podNames() { Str[,] }
}

const class EmptyPod : IFanPod
{
  public static const EmptyPod INSTANCE := make()

  override const Str name := "unknown"
  override IFanType? findType(Str name, Bool checked := true) { null }
  override const Str[] typeNames := Str[,]
}