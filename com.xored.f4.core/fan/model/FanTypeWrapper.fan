//
// Copyright (c) 2011 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Julia 04.09.2012 - Initial Contribution
//

using [java] org.eclipse.core.runtime::IProgressMonitor
using [java] org.eclipse.core.resources::IResource
using [java] java.io::InputStream

using [java] org.eclipse.dltk.core

using [java] com.xored.f4.core::ITypeWrapper

using f4model

class FanTypeWrapper : ITypeWrapper
{
  IFanType type
  IScriptProject project
  ISourceModule module
  
  new make (IFanType type, IScriptProject proj, ISourceModule module) 
    : super(type.name)
  {
    this.type = type
    this.project = proj
    this.module = module
  }
  
  override Str?[]? getSuperClasses() { type.inheritance }
  
  override Str? getElementName() { type.name }
  
  override IScriptProject? getScriptProject() { project }
  
  override IModelElement? getParent() { project }
  
  override ISourceModule? getSourceModule() 
  { 
    module 
  }
  
  override IType? getDeclaringType() { this }
}
