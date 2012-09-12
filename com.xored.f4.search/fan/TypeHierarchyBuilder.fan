using [java] java.io::OutputStream
using [java] org.eclipse.core.runtime::IProgressMonitor
using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.core::ITypeHierarchy$Mode as Mode

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
    
    temp := superTypes.dup
    while (!temp.isEmpty)
    {
      superTypes.clear
      superTypes.addAll(temp)
      temp.clear
      superTypes.each 
      { 
        supers := getAllSupertypes0(it)
        var := classToSuperclass.get(it.getElementName)
        if (var == null && (supers.size != 0))
          classToSuperclass.add(it.getElementName, supers.dup)
        supers.each |IType type| {
          if (!containsType(temp, type))
            temp.add(type) 
        }
      }
    }
    rootClasses.clear
    rootClasses.addAll(superTypes)
    allTypes := (IType?[]?) savedType.getSourceModule.getTypes
    allUsedTypes := getAllClasses
    allTypes = allTypes.exclude { allUsedTypes.contains(it) }
    allTypes.each |IType subType| { superCls := getAllSupertypes0(subType) }
  }
  
  private Bool containsType(IType?[]? list, IType value)
  {
    list.any |IType type -> Bool| {  return type.getFullyQualifiedName.equals(value.getFullyQualifiedName) }
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
        pod := ns.findType(it)
        wrapper := FanTypeWrapper(pod, savedType.getScriptProject, savedType.getSourceModule)
        if (!containsType(superTypes, wrapper))
          superTypes.add(wrapper)
      }
    } else {
      ns := ParseUtil.ns(type.getSourceModule)
      fanType := DltkType(ns.currPod.name, type)
      allTypes = fanType.inheritance.dup
      cunit := ParseUtil.parse((ISourceModule) type.getSourceModule)
      usings := cunit.usings.dup
      usings.exclude { it.typeName == null }.each 
      {
        if(allTypes.contains(it.typeName.text)) 
        {
          needType := it.typeName.modelType
          wrapper := FanTypeWrapper(needType, savedType.getScriptProject, savedType.getSourceModule)
          allTypes.remove(it.typeName.text)
          if (!containsType(superTypes, wrapper))
            superTypes.add(wrapper)
        }
      }
      superTypes.addAll( allTypes.map 
      { 
        ns.findType(it).me 
      }.exclude { it == null } )
    }
    superTypes.each { addToSubtypeMap(it, type) }
    return (superTypes.size == 0)? (IType?[]?)[,] : superTypes
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
      echo(ns.podNames)
      
      allPods := ns.podNames
      allPods.each 
      {   
        pod := ns.findPod(it)
        name := pod.name + "::" + type.getElementName
        types := pod.typeNames.dup
        types.each 
        { 
          subType := ns.findType(it)
          inheritance := subType.inheritance
          if ( inheritance.contains(name) )
          {
            itype := FanTypeWrapper(subType, savedType.getScriptProject, module)
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