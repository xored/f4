//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 5, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.core::IModelElement
using [java] org.eclipse.dltk.core.model.binary::IBinaryElementParser
using [java] org.eclipse.dltk.core.model.binary::IBinaryModule

using "[java]com.xored.fanide.internal.core.model"::PodModule
using "[java]com.xored.fanide.internal.core.model"::PodFragment

using [java] org.eclipse.dltk.compiler::IBinaryElementRequestor
using [java]org.eclipse.dltk.compiler::IElementRequestor$FieldInfo as FieldInfo
using [java]com.xored.fanide.core.utils::ElementInfoWrappers$TypeInfo as TypeInfo
using [java]com.xored.fanide.core.utils::ElementInfoWrappers$MethodInfo as MethodInfo

using f4core
using compiler
**
**
**
class FcodeElementParser : IBinaryElementParser
{
  private IBinaryElementRequestor? requestor
  override Void setRequestor(IBinaryElementRequestor? requestor)
  {
    this.requestor = requestor
  }
  
  override Void parseBinaryModule(IBinaryModule? module)
  {
    if(module isnot PodModule || requestor == null) 
      return
    
    podModule := module as PodModule

    podFragment := module.getAncestor(IModelElement.PROJECT_FRAGMENT) as PodFragment
    if(podFragment == null)
      return 
    
    podPath := PathUtil.resolveLocalPath(podFragment.getPodPath)
    if(podPath == null) 
      return
    
    reader := FcodeReader(podPath)
    reader.accept(BinaryElementVisitor(requestor, podModule))
  }
}

class BinaryElementVisitor : FcodeVisitor
{
  private Str[] types
  private IBinaryElementRequestor requestor
  new make(IBinaryElementRequestor requestor, PodModule module)
  {
    types = module.getFTypes.toArray
    this.requestor = requestor
  }
  
  override Void visitPod(FPod pod) { requestor.enterModule }
  
  override Void endVisitPod() { requestor.exitModule(0) } 
  override Bool visitType(FType type)
  {
    if(!types.contains(filename(type))) return false
    if(type.name.index("\$") != null) return false
    //compose type info
    info := TypeInfo()
    info.name = type.name
    
    info.modifiers = FcodeUtil.flagsFcodeToDltk(type.flags)
    info.setSuperClasses(
      Str[,].addAll([
        type.fbase == 0xFFFF ? [,] : type.fbase, //base class or empty array 
        type.fmixins ?: [,] //mixins or empty 
      ].flatten.map |Int index -> Str|
    {
      FcodeUtil.resolveType(type.pod, index)
    }))
    requestor.enterType(info)
    return true
  }
  
  //TODO: remove after moving PodModule to fantom code
  **
  ** Someone's perverse mind have decided that PodModule.getFTypes 
  ** should return list of file names. Therefore, we have to 
  ** build "filename" of FType in order to check if this type belongs
  ** to module
  ** 
  private static Str filename(FType type)
  {
    "fcode/${type.name}.fcode"
  }
  
  override Void visitField(FField field)
  {
    info := FieldInfo()
    info.name = field.name
    info.type = FcodeUtil.resolveType(field.pod, field.typeRef)
    info.modifiers = FcodeUtil.flagsFcodeToDltk(field.flags)
    requestor.enterField(info)
    requestor.exitField(0)
  }
  
  override Void visitMethod(FMethod method)
  {
    info := MethodInfo()
    info.name = method.name
    if(method.isGetter || method.isSetter || method.name.contains("\$")) {
      return
    }
    
    info.modifiers = FcodeUtil.flagsFcodeToDltk(method.flags)
    info.setExceptionTypes
    info.returnType = FcodeUtil.resolveType(method.pod, method.ret)

    paramNames := Str[,]
    paramTypes := Str[,]
    method.fparams.each |fparam|
    {
      paramNames.add(fparam.name)
      paramTypes.add(FcodeUtil.resolveType(method.pod, fparam.typeRef))
    }
    info.setParameterNames(paramNames)
    info.setParameterTypes(paramTypes)
    info.setParameterInitializers(method.fparams.map{ it.hasDefault ? "<init>" : null } as Str?[])

    requestor.enterMethod(info)
    requestor.exitMethod(0)
  }
  
  override Void endVisitType() { requestor.exitType(0) }
}