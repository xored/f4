//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   talnikov May 19, 2010 - Initial Contribution
//

using [java] org.eclipse.swt.graphics::Point

**
** StyledStr
**
internal class StyledStr
{
  readonly StyledStrFragment[] fragments := [,]
  readonly Int[] offsets := [,]
  readonly Str:Int userKeys := [:]

  Point append(StyledStr str)
  {
    Int len := size
    offsets.addAll(str.offsets.map { len + it } )
    userKeys.addAll(str.userKeys.map { it + fragments.size })
    fragments.addAll(str.fragments)
    return Point(len, size)
  }

  Point appendFragment(Str str, Str? styleKey := null, Str? userKey := null)
  {
    Int len := size
    offsets.add(offsets.isEmpty ? 0 : (offsets[-1] + fragments[-1].str.size))
    fragments.add(StyledStrFragment(str, styleKey))
    if (userKey != null) userKeys[userKey] = fragments.size - 1
    return Point(len, size)
  }

  StyledRange[] styles()
  {
    StyledRange[] result := [,]
    fragments.each |frag, i|
    {
      if (frag.styleKey != null)
      {
        result.add(StyledRange(offsets[i], frag.str.size, frag.styleKey))
      }
    }
    return result
  }

  Int size()
  {
    fragments.isEmpty ? 0 : offsets[-1] + fragments[-1].str.size
  }

  Point range(Int fragment)
  {
    Point(offsets[fragment], offsets[fragment] + fragments[fragment].str.size)
  }

  override Str toStr()
  {
    StrBuf buf := StrBuf()
    fragments.each { buf.add(it) }
    return buf.toStr
  }
}

internal const class StyledRange
{
  const Int offset
  const Int len
  const Str styleKey

  new make(Int offset, Int len, Str styleKey)
  {
    this.offset = offset
    this.len = len
    this.styleKey = styleKey
  }
}

internal const class StyledStrFragment
{
  const Str str
  const Str? styleKey

  new make(Str str, Str? styleKey := null)
  {
    this.str = str
    this.styleKey = styleKey
  }

  override Str toStr() { str }
}
