using [java] java.io::OutputStream
using [java] org.eclipse.core.runtime::IProgressMonitor
using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.core::ITypeHierarchy$Mode as Mode
using [java] org.eclipse.dltk.core::Flags
using "[java]org.eclipse.dltk.internal.core"::SourceModule
using "[java]org.eclipse.dltk.internal.core"::DefaultWorkingCopyOwner

using f4core
using f4model
using f4parser

class TypeHierarchyBuilder: ITypeHierarchyBuilder
{
  override FanTypeHierarchy? build(IType? type, Mode? mode, IProgressMonitor? monitor) {
    ns := ParseUtil.ns(type.getSourceModule)
    fanType := DltkType(ns.currPod.name, type)
    return FanTypeHierarchy(fanType)
  }
}

class FanTypeHierarchy : ITypeHierarchy, IElementChangedListener
{
  protected ITypeHierarchyChangedListener?[]? changeListeners := [,]
  protected IFanType? focusType := null
  protected IType? savedType := null
  protected ISourceModule? module := null
  public Bool needsRefresh := true
  protected IType?[]? rootClasses := [,]
  protected [Str:IType[]]? typeToSubtype := [:]
  protected [Str:IType[]]? classToSuperclass := [:]
  
  new make(IFanType? type)
  {
    focusType = (type == null) ? null : type
    savedType = type.me
    module = savedType.getSourceModule
    buildMaps
  }
  
  private Void buildMaps()
  {
    superTypes := getAllSupertypes0(savedType)
    classToSuperclass.clear
    classToSuperclass.add(savedType.getElementName, superTypes.dup)
    // find root classes and all superclasses
    temp := superTypes.dup
    while (!temp.isEmpty)
    {
      superTypes.clear
      superTypes.addAll(temp)
      temp.clear
      superTypes.each 
      {
        supers := getAllSupertypes0(it).dup
        if (classToSuperclass.get(it.getElementName) == null && (!supers.isEmpty))
        {
          // exclude all unnecessary Object elements
          if (Flags.isInterface(it.getFlags))
          {
            supers.exclude { "Obj".equals(it.getElementName) }
          }
          classToSuperclass.add(it.getElementName, supers)
        }
        temp.map { supers.exclude { containsType(temp, it) } }
      }
    }
    rootClasses.clear
    rootClasses.addAll(superTypes)
    allTypes := (IType?[]?) savedType.getSourceModule.getTypes
    allTypes.exclude { getAllClasses.contains(it) }.each { getAllSupertypes0(it) }
  }
  
  override Void addTypeHierarchyChangedListener(ITypeHierarchyChangedListener? listener)
  {
    if (changeListeners == null)
    {
      changeListeners = [,]
    }
    if (!changeListeners.contains(listener))
    {
      changeListeners.add(listener)
    }
  }
  
  override public Void elementChanged(ElementChangedEvent? event)
  {
    if (needsRefresh)
    {
      return
    }
    needsRefresh = true
    changeListeners.each { it.typeHierarchyChanged(this) }
  }
  
  override Bool contains(IType? type)
  {
    if ((classToSuperclass.get(type.getElementName) != null) || (containsType(rootClasses, type)))
    {
      return true
    }
    return false
  }
  
  private Bool containsType(IType?[]? list, IType value)
  {
//    return list.contains(value)
    list.any |IType type -> Bool| 
    { 
      if ((value is FanTypeWrapper) && (type is FanTypeWrapper))
      {
        ivalue := (FanTypeWrapper) value
        itype := (FanTypeWrapper) type
        if (!itype.type.name.equals(ivalue.type.name))
          return false
        if (!itype.type.qname.equals(ivalue.type.qname))
          return false
        if (!itype.type.inheritance.equals(ivalue.type.inheritance))
          return false
        if (!itype.type.pod.equals(ivalue.type.pod))
          return false  
      }
      return true
    }
  }
  
  override Bool exists()
  {
    if (!needsRefresh)
      return true
    return (focusType == null || focusType.me.exists) && focusType.me.getScriptProject.exists
  }
  
  override IType?[]? getAllClasses()
  {
    classes := rootClasses.dup
    classToSuperclass.each |IType[] list, Str typeName| 
    { 
      list.each 
      {   
        if (!containsType(classes, it))
          classes.add(it) 
      }
    }
    if (!containsType(classes, savedType))
      classes.add(savedType)
    return classes
  }
  
  override IType?[]? getAllSubtypes(IType? type)
  {
    if (typeToSubtype == null)
    {
      return IType[,]
    }
    return (IType?[]?) typeToSubtype.get(type.getElementName)
  }
  
  override IType?[]? getAllSuperclasses(IType? type)
  {
    return (IType?[]?) getAllSupertypes(type)
  }
  
  private Void addToSubtypeMap(IType type, IType subType)
  {
    elementName := type.getElementName
    if (Flags.isInterface(subType.getFlags) && "Obj".equals(elementName)) 
    {
      return
    }
    tmp := typeToSubtype.get(elementName)
    if (tmp == null) 
      tmp = [,]
    if (containsType(tmp, subType))
      return
    tmp.add(subType)
    typeToSubtype.remove(elementName)
    typeToSubtype.add(elementName, tmp)
  }
  
  override IType?[]? getAllSupertypes(IType? type)
  {
    if (classToSuperclass == null)
    {
      return IType[,]
    }
    return classToSuperclass.get(type.getElementName)
  }
  
  IType?[]? getAllSupertypes0(IType? type)
  {
    IType?[]? superTypes := [,]
    allTypes := [,]
    if (type is FanTypeWrapper)
    {
      fanType := (FanTypeWrapper) type
      ns := ParseUtil.ns(module)
      parents := fanType.getSuperClasses
      parents.each 
      {
        ffiType := (ns.findType(it) != null ? ns.findType(it) : findInUsings(it, type)) as IFanType
        wrapper := FanTypeWrapper(ffiType, null, savedType.getScriptProject, savedType.getSourceModule)
        if (!containsType(superTypes, wrapper))
          superTypes.add(wrapper)
      }
    } else {
      ns := ParseUtil.ns(type.getSourceModule)
      allTypes = DltkType(ns.currPod.name, type).inheritance.dup
//      if (allTypes.isEmpty && !type.getElementName.equals("Obj"))
//      {
//        allTypes.add("Obj")
//      }
      allTypes.each 
      {
        nextType := findInUsings(it, type)
        if (nextType != null)
        {
          if (!containsType(superTypes, nextType))
                superTypes.add(nextType)
        }
      }
      superTypes.each 
      { 
        name := ((FanTypeWrapper)it).getAsTypeName != null ? ((FanTypeWrapper)it).getAsTypeName : it.getElementName
        allTypes.remove(name) 
      }
      superTypes.addAll( allTypes.map { ns.findType(it).me }.exclude { it == null } )
    }
    superTypes.each { addToSubtypeMap(it, type) }
    return (superTypes.size == 0)? (IType?[]?)[,] : superTypes
  }
  
  private IType? findInUsings(Str name, IType type)
  {
    cunit := ParseUtil.parse((ISourceModule) type.getSourceModule)
    usings := cunit.usings.dup
    usng := usings.exclude
    { 
      it.typeName == null 
    }.find |UsingDef def->Bool|
    { 
      typeName := def.asTypeName
      if (typeName != null)
        return typeName.text.equals(name)
      return def.typeName.text.equals(name)
    }
    if (usng != null)
    {
      needType := usng.typeName.modelType
      typeName := usng.asTypeName != null ? usng.asTypeName.text : null
      return FanTypeWrapper(needType, typeName, savedType.getScriptProject, savedType.getSourceModule)
    }
    
    wrapper := null
    usings.findAll { it.typeName == null }.each
    {
      if (it.typeName == null)
      {
        // using without ::
        types := it.podName.modelPod.typeNames
        modelPod := it.podName.modelPod
        if (types.contains(name)){
            fondType := modelPod.findType(name)
            wrapper = FanTypeWrapper(fondType, null, savedType.getScriptProject, savedType.getSourceModule)
        }
      } 
    }
    return wrapper
  }
  
  override IType?[]? getAllTypes()
  {
    (IType[])getAllClasses
  }
  
  override Int getCachedFlags(IType? type)
  {
    type.getFlags
  }
  
  override IType?[]? getRootClasses()
  {
    if (rootClasses == null)
    {
      list := getAllSupertypes(focusType.me)
      rootClasses.addAll( list.findAll { !containsType(rootClasses, it) } )
    } 
    return rootClasses
  }
  
  override IType?[]? getSubclasses(IType? type)
  {
    typeToSubtype.get(type.getElementName)
  }
  
  override IType?[]? getSubtypes(IType? type)
  {
    subTypes := typeToSubtype.get(type.getElementName)
    if (subTypes == null)
    {
      ns := ParseUtil.ns(module)
      allPods := ns.podNames
      podName := allPods.find |Str name->Bool|  { ns.findPod(name).findType(type.getElementName, false) != null }
      name := podName + "::" + type.getElementName
      allPods.each
      {   
        types := ns.findPod(it).typeNames.dup
        types.each
        { 
          subType := ns.findType(it)
          inheritance := subType.inheritance.dup
//          if (inheritance.isEmpty && !subType.name.equals("Obj")){
//            inheritance.add("Obj")
//          }
          if ( inheritance.contains(name) || inheritance.contains(type.getElementName))
          {
            itype := FanTypeWrapper(subType, null, savedType.getScriptProject, savedType.getSourceModule)
            addToSubtypeMap(type, itype)
            addClassToSuperclass(itype, type)
            subTyps := getSubtypes(itype)
            subTyps.each {
              addToSubtypeMap((IType)itype, it)
              addClassToSuperclass(itype, it)
            }
          }
        }
      }
      subTypes = typeToSubtype.get(type.getElementName)
    } 
    return (subTypes == null)? IType[,] : subTypes
  }
  
  private Void addClassToSuperclass(IType type, IType superType)
  {
    if (Flags.isInterface(type.getFlags) && "Obj".equals(superType.getElementName)) 
    {
      return
    }
    elementName := type.getElementName
    tmp := classToSuperclass.get(elementName)
    if (tmp == null) 
      tmp = [,]
    if (containsType(tmp, superType))
      return
    tmp.add(superType)
    classToSuperclass.remove(elementName)
    classToSuperclass.add(elementName, tmp)
  }
  
  override IType?[]? getSuperclass(IType? type)
  {
    tmp := classToSuperclass.get(type.getElementName)
    if (tmp == null)
    {
      return IType[,]
    }
    return tmp
  }
  
  override IType?[]? getSupertypes(IType? type)
  {
    (IType[]) getSuperclass(type)
  }
  
  override IType? getType()
  {
    focusType.me
  }
  
  override Void refresh(IProgressMonitor? monitor)
  {
    try
    {
      if (monitor != null)
      {
        if (this.focusType != null)
        {
          monitor.beginTask(focusType.name, 100)
        } else {
          monitor.beginTask("Hierarchy creating", 100);
        }
      }
      
      if (focusType != null) 
      {
        buildMaps
      }
      needsRefresh = false
    }
    catch (Err err_variable_name) { }
    finally 
    {
      if (monitor != null)
        monitor.done
    }
  }
  
  override Void removeTypeHierarchyChangedListener(ITypeHierarchyChangedListener? listener)
  {
    if (changeListeners == null)
      return
    changeListeners.remove(listener)
  }
  
  override Void store(OutputStream? outputStream, IProgressMonitor? monitor){ }
}