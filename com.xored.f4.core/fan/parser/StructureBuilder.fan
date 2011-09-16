//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 18, 2010 - Initial Contribution
//

using f4parser

using [java]org.eclipse.dltk.compiler::ISourceElementRequestor as Requestor
using [java]org.eclipse.dltk.compiler.env::IModuleSource
using [java]org.eclipse.dltk.compiler::IElementRequestor$ImportInfo as ImportInfo
using [java]org.eclipse.dltk.compiler::IElementRequestor$FieldInfo as FieldInfo
using [java]com.xored.fanide.core.utils::ElementInfoWrappers$TypeInfo as TypeInfo
using [java]com.xored.fanide.core.utils::ElementInfoWrappers$MethodInfo as MethodInfo

**
**
**
class StructureBuilder
{
  static Void build(IModuleSource module, Requestor requestor)
  {
    Str script := module.getSourceContents
    visitor := FanSourceElementRequestVisitor(requestor)
    parser := StructureParser.make(script, visitor)
    try
      parser.parseUnit
    catch {}
  }
}


**************************************************************************
** FanSourceElementRequestVisitor
**************************************************************************

class FanSourceElementRequestVisitor : StructureVisitor
{  
  private Bool insideMethod := false
  private Bool insideType := false
  private Bool insideField := false
  Requestor requestor { private set }
  
  new make(Requestor requestor)
  {
    this.requestor = requestor
  }
  
  override Void visitModule()
  {
    requestor.enterModule
  }
  
  override Void endVisitModule(Int end)
  {
    requestor.exitModule(end)
  }
  
  override Void visitUsing(Int start, Int end, Str name, Str? asName)
  {
    info := ImportInfo()
    info.sourceStart = start
    info.sourceEnd = end
    info.containerName = ""
    if( asName != null)
      info.name = name + " as " + asName
    else
      info.name = name
    info.version = ""
    requestor.acceptImport(info)
  }
  
  override Void visitType(Int start, Int flags, TokenVal name, Str[] superTypes)
  {
    if (insideField) endVisitField(start-1)
    if (insideMethod) endVisitMethod(start-1)
    if (insideType) endVisitType(start-1)
    if (name.kind != Token.identifier) return
    insideType = true
    info := TypeInfo()
    info.declarationStart = start
    info.modifiers = convertFlags(flags)
    info.name = name.text
    info.nameSourceStart = name.start
    info.nameSourceEnd = name.end
    info.setSuperClasses(superTypes)
    requestor.enterType(info)
  }
  
  override Void endVisitType(Int end)
  {
    insideType = false
    requestor.exitType(end)
  }
  
  override Void visitField(Int start, Int flags, Str? type, TokenVal name)
  {
    if (insideField) endVisitField(start-1)
    if (insideMethod) endVisitMethod(start-1)
    insideField = true
    info := FieldInfo()
    info.declarationStart = start
    info.modifiers = convertFlags(flags)
    info.name = name.text
    info.nameSourceStart = name.start
    info.nameSourceEnd = name.end
    info.type = type?:""
    requestor.enterField(info)
  }
  
  override Void endVisitField(Int end)
  {
    insideField = false
    requestor.exitField(end)
  }
  
  override Void visitMethod(Int start, Int flags, Str? type, TokenVal name,
    Str[] parameterTypes, Str[] parameterNames, Str?[] parameterInitializers)
  {
    if (insideField) endVisitField(start-1)
    if (insideMethod) endVisitMethod(start-1)
    insideMethod = true
    info := MethodInfo()
    info.declarationStart = start
    info.modifiers = convertFlags(flags)
    info.name = name.text
    info.nameSourceStart = name.start
    info.nameSourceEnd = name.end
    info.returnType = type?:""
    info.isConstructor = flags.and(Flag.Ctor) != 0
    
    info.setParameterNames(parameterNames)
    info.setParameterInitializers(parameterInitializers)
    info.setParameterTypes(parameterTypes)
    
    requestor.enterMethod(info)
  }
  
  override Void endVisitMethod(Int end)
  {
    insideMethod = false
    requestor.exitMethod(end)
  }
  
  Int convertFlags(Int flags)
  {
    Int dltkFlags := 0
    if (flags.and(Flag.Abstract) != 0)  dltkFlags = dltkFlags.or(FanModifiers.AccAbstract)
    if (flags.and(Flag.Const) != 0)     dltkFlags = dltkFlags.or(FanModifiers.AccConst)
    if (flags.and(Flag.Ctor) != 0)      dltkFlags = dltkFlags.or(FanModifiers.AccNew)
    if (flags.and(Flag.Enum) != 0)      dltkFlags = dltkFlags.or(FanModifiers.AccEnum)
    if (flags.and(Flag.Final) != 0)     dltkFlags = dltkFlags.or(FanModifiers.AccFinal)
//    if (flags.and(Flag.Getter) != 0)    dltkFlags |= FanModifiers.AccGetter
    if (flags.and(Flag.Internal) != 0)  dltkFlags = dltkFlags.or(FanModifiers.AccInternal)
    if (flags.and(Flag.Mixin) != 0)     dltkFlags = dltkFlags.or(FanModifiers.AccInterface)
    if (flags.and(Flag.Native) != 0)    dltkFlags = dltkFlags.or(FanModifiers.AccNative)
    if (flags.and(Flag.Override) != 0)  dltkFlags = dltkFlags.or(FanModifiers.AccOverride)
    if( flags.and(Flag.Facet) != 0)     dltkFlags = dltkFlags.or(FanModifiers.AccAnnotation)
    if (flags.and(Flag.Private) != 0)   dltkFlags = dltkFlags.or(FanModifiers.AccPrivate)
    if (flags.and(Flag.Protected) != 0) dltkFlags = dltkFlags.or(FanModifiers.AccProtected)
    if (flags.and(Flag.Public) != 0)    dltkFlags = dltkFlags.or(FanModifiers.AccPublic)
//    if (flags.and(Flag.Setter) != 0)    dltkFlags |= FanModifiers.AccSetter
    if (flags.and(Flag.Static) != 0)    dltkFlags = dltkFlags.or(FanModifiers.AccStatic)
//    if (flags & Flag.Storage != 0) dltkFlags |= 
//    if (flags.and(Flag.Synthetic) != 0) dltkFlags |= FanModifiers.AccSynthetic
    if (flags.and(Flag.Virtual) != 0)   dltkFlags = dltkFlags.or(FanModifiers.AccVirtual)
    if (flags.and(Flag.Readonly) != 0)  dltkFlags = dltkFlags.or(FanModifiers.AccReadOnly)
    if (flags.and(Flag.Once) != 0)      dltkFlags = dltkFlags.or(FanModifiers.AccOnce)
//    if (flags.and(Flag.EnumVal) != 0)   dltkFlags |= FanModifiers.AccEnumVal
    return dltkFlags
  }
}
