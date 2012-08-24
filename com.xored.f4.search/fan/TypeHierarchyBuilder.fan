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
    while (temp.size != 0)
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
    typeToSubtype.clear
    typeToSubtype.add(savedType.getElementName, (savedType.getTypes.isEmpty)? [,] : savedType.getTypes)
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
    return classes
  }
  
  /*
   * Returns all resolved subtypes (direct and indirect) of the given type
   */
  override IType?[]? getAllSubtypes(IType? type)
  {
    subTypes := IType[,]
    alreadyProcessed := IType[,]
    getAllSubtypesForType0(type, subTypes, alreadyProcessed)
    subClasses := IType[,]
    subClasses.addAll(subTypes)
    return subClasses
  }
  
  private Void getAllSubtypesForType0(IType type, IType[] subs, IType[] alreadyProcessed) 
  {
    subTypes := getAllSubtypes(type)
    if (subTypes.size != 0) {
      subTypes.each 
      {   
        IType subType := it
        if (!alreadyProcessed.contains(subType))
        {
          alreadyProcessed.add(subType)
          subs.add(subType)
          getAllSubtypesForType0(subType, subs, alreadyProcessed)
        }
      }
    }
  }
  
  /**
   * Returns all resolved superclasses of the given class, in bottom-up order
   */
  override IType?[]? getAllSuperclasses(IType? type)
  {
//    IType?[]? superclass := getSuperclass(type)
//    IType[] supers := [,]
//    if (superclass == null) {
//      return supers
//    }
//    superclass.each 
//    { 
//      if (!type.equals(it))
//      {
//        supers.add(it)
//        supers.addAll(getAllSuperclasses(it))
//      }
//    }
//    return supers
    return (IType?[]?) getAllSupertypes(type)
  }
  
  /*
   * Returns all resolved supertypes of the given type, in bottom-up order
   */
  override IType?[]? getAllSupertypes(IType? type)
  {
    ns := ParseUtil.ns(type.getSourceModule)
    fanType := DltkType(ns.currPod.name, type)
    IType?[]? superTypes := fanType.inheritance.map { ns.findType(it).me }.exclude { it == null }
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
    } else 
    {
      return IType[,]
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
//    return (IType[])type.getTypes
    return typeToSubtype.get(type.getElementName)
  }
  
  /**
   * Returns the resolved superclass of the given class
   */
  override IType?[]? getSuperclass(IType? type)
  {
//    return (IType[])type.getSuperClasses
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
        // TODO write refresh action here
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
//    if (changeListeners.isEmpty)
//    {
//      DLTKCore.removeElementChangedListener(this)
//    }
  }
  
  /**
  * Stores the type hierarchy in an output stream
  * */
  override Void store(OutputStream? outputStream, IProgressMonitor? monitor)
  {
    
  }
  
}