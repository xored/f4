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
  private FPod? fpod := null
  private Bool loaded() { fpod != null }
  private Void load() 
  { 
    if(loaded) return
    fpod = FPod(FakeNamespace(), podFile.basename, Zip.open(podFile))
    fpod.read
  }
  
  Void accept(FcodeVisitor visitor)
  {
    load
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