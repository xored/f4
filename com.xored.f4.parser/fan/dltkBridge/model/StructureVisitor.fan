//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Alena Repina Feb 18, 2010 - Initial Contribution
//

mixin StructureVisitor
{
  virtual Void visitModule() {}
  virtual Void endVisitModule(Int end) {}
  
  virtual Void visitType(Int start, Int flags, TokenVal name, Str[] superTypes) {}
  virtual Void endVisitType(Int end) {}
  
  virtual Void visitUsing(Int start, Int end, Str name) {}
  
  virtual Void visitField(Int start, Int flags, Str? type, TokenVal name) {}
  virtual Void endVisitField(Int end) {}
  
  virtual Void visitMethod(Int start, Int flags, Str? type, TokenVal name,
    Str[] parameterTypes, Str[] parameterNames, Str?[] parameterInitializers) {}
  virtual Void endVisitMethod(Int end) {}
}
