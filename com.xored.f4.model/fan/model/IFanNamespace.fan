mixin IFanNamespace
{ 
  abstract IFanPod currPod()
  abstract Str[] podNames()
  abstract IFanPod? findPod(Str name)
  abstract IFanType? findType(Str name)
}