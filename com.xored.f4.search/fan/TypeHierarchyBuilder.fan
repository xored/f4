using [java] java.io::OutputStream
using [java] org.eclipse.core.runtime::IProgressMonitor
using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.core::ITypeHierarchy$Mode as Mode

using f4core
using f4model

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
  /** Change listeners - null if no one is listening */
  protected ITypeHierarchyChangedListener?[]? changeListeners := [,]
  
  /** The type the hierarchy was specifically computed for, possibly null */
  protected IFanType? focusType := null
  
  protected IType? savedType := null
  
  /** Whether this hierarchy needs refresh */
  public Bool needsRefresh := true
  
  protected IType?[]? rootClasses := [,]
  protected [Str:IType[]]? typeToSubtype := [:]
  protected [Str:IType[]]? classToSuperclass := [:]
  
  new make(IFanType? type)
  {
    focusType = (type == null) ? null : type
    savedType = type.me 
    buildMaps
  }
  
    //create all maps and lists? 
  private Void buildMaps()
  {
    superTypes := getAllSupertypes(savedType)
    temp := superTypes.dup
    while (!temp.isEmpty)
    {
      superTypes.clear
      superTypes.addAll(temp)
      temp.clear
      superTypes.each { temp.addAll(getAllSupertypes(it)) }
    }
    rootClasses.clear
    rootClasses.addAll(superTypes)
    classToSuperclass.clear
    classToSuperclass.add(savedType.getElementName, getAllSupertypes(savedType))
    
    allTypes := (IType?[]?) savedType.getSourceModule.getTypes
    allUsedTypes := getAllClasses
    allTypes = allTypes.exclude { allUsedTypes.contains(it) }
    allTypes.each |IType subType| { superCls := getAllSuperclasses(subType) }
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
    if (classToSuperclass.get(type.getElementName) != null)
    {
      return true
    }
    // root classes
    if (rootClasses.contains(type))
    {
      return true
    }
    return false
  }
  
  /*
   * Returns whether the type and project this hierarchy was created on exist.
   */
  override Bool exists()
  {
    if (!needsRefresh)
      return true
    return (focusType == null || focusType.me.exists) && focusType.me.getScriptProject.exists
  }
  
  /*
   * Returns all classes in this type hierarchy's graph
   */
  override IType?[]? getAllClasses()
  {
    classes := rootClasses.dup
    classToSuperclass.each |IType[] list, Str typeName| { classes.addAll(list) }
    classes.add(savedType)
    return classes
  }
  
  /*
   * Returns all resolved subtypes (direct and indirect) of the given type
   */
  override IType?[]? getAllSubtypes(IType? type)
  {
    if (typeToSubtype == null)
    {
      return IType[,]
    }
    return (IType?[]?) typeToSubtype.get(type.getElementName)
  }
  
  /**
   * Returns all resolved superclasses of the given class, in bottom-up order
   */
  override IType?[]? getAllSuperclasses(IType? type)
  {
    return (IType?[]?) getAllSupertypes(type)
  }
  
  private Void addToSubtypeMap(IType type, IType subType)
  {
    tmp := typeToSubtype.get(type.getElementName)
    if (tmp == null) 
      tmp = [,]
    if (!tmp.contains(subType))
      tmp.add(subType)
    typeToSubtype.remove(type.getElementName)
    typeToSubtype.add(type.getElementName, tmp) 
  }
  
  /*
   * Returns all resolved supertypes of the given type, in bottom-up order
   */
  override IType?[]? getAllSupertypes(IType? type)
  {
    ns := ParseUtil.ns(type.getSourceModule)
    fanType := DltkType(ns.currPod.name, type)
    IType?[]? superTypes := fanType.inheritance.map { ns.findType(it).me }.exclude { it == null }
    superTypes.each { addToSubtypeMap(it, type) }
    return (superTypes.size == 0)? (IType?[]?)[,] : superTypes 
  }
  
  /*
  *  Returns all types in this type hierarchy's graph
  **/
  override IType?[]? getAllTypes()
  {
    return (IType[])getAllClasses
  }
  
  /**
  * Return the flags associated with the given type (would be equivalent to
   * <code>IMember.getFlags()</code>), or <code>-1</code> if this
   * information wasn't cached on the hierarchy during its computation
   *  */
  override Int getCachedFlags(IType? type)
  {
    return type.getFlags
  }
  
  /**
   * Returns all classes in the graph which have no resolved superclass
   **/
  override IType?[]? getRootClasses()
  {
    if (rootClasses == null)
    {
      list := getAllSupertypes(focusType.me)
      rootClasses.addAll( list.findAll { !rootClasses.contains(it) } )
    } 
    return rootClasses
  }
  
  /**
  * Returns the direct resolved subclasses of the given class
  * */
  override IType?[]? getSubclasses(IType? type)
  {
    return typeToSubtype.get(type.getElementName)
  }
  
  /**
   * Returns the direct resolved subtypes of the given type
   */
  override IType?[]? getSubtypes(IType? type)
  {
    subTypes := typeToSubtype.get(type.getElementName)
    if (subTypes == null)
    {
      return (IType?[]?) type.getTypes
    } 
    return subTypes
  }
  
  /**
   * Returns the resolved superclass of the given class
   */
  override IType?[]? getSuperclass(IType? type)
  {
    tmp := classToSuperclass.get(type.getElementName)
    if (tmp == null)
    {
      return (IType?[]?) getAllSupertypes(type) //(IType?[]?)[,]
    }
    return tmp
  }
  
  /**
   * Returns the resolved supertypes of the given type
   */
  override IType?[]? getSupertypes(IType? type)
  {
    return (IType[])getSuperclass(type)
  }
  
  ** Returns the type this hierarchy was computed for
  ** see ITypeHierarchy
  override IType? getType()
  {
    return focusType.me
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
    catch (Err err_variable_name)
    {
      // todo: handle error
    }
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
  
  /**
  * Stores the type hierarchy in an output stream
  * */
  override Void store(OutputStream? outputStream, IProgressMonitor? monitor){ }
}