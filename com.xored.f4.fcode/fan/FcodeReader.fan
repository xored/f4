//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   ivaninozemtsev May 5, 2010 - Initial Contribution
//

using compiler
**
**
**
class FcodeReader
{
  new make(File podFile) { this.podFile = podFile }
  
  private File podFile
  
  Void accept(FcodeVisitor visitor)
  {
    Zip? zip := null
    try
    {
      zip = Zip.open(podFile)
      fpod := FPod(FakeNamespace(), podFile.basename, Zip.open(podFile))
      fpod.read
      visitor.visitPod(fpod)
      fpod.ftypes.each |ftype|
      {
        if(visitor.visitType(ftype))
        {
          ftype.read
          ftype.ffields.each { visitor.visitField(it) }
          ftype.fmethods.each { visitor.visitMethod(it) }
          visitor.endVisitType
        }
      }
      visitor.endVisitPod
    } finally zip?.close
  }
}

internal class FakeNamespace : CNamespace
{
  override CPod? findPod(Str name) { null }
}
mixin FcodeVisitor
{
  **
  ** If false, visitField, visitMethod and endVisitType won't be called
  ** 
  virtual Bool visitType(FType type) { false }
  virtual Void visitMethod(FMethod method) { }
  virtual Void visitField(FField field) { }
  virtual Void endVisitType() {}
  virtual Void visitPod(FPod pod) {}
  virtual Void endVisitPod() {}
}