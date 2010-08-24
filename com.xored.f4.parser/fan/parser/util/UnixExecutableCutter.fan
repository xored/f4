mixin UnixExecutableCutter
{
  Str cutUnixExecutable(Str src)
  {
    original := src
    src = src.trimStart
    if (src.startsWith("#!"))
    {
      nl := src.index("\n")
      if (nl < src.size) return src[nl+1..-1]
    }
    return original
  }
}
