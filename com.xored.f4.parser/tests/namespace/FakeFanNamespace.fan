using f4model

class FakeFanNamespace : IFanNamespace
{
  Str:IFanPod podsMap := [:]
  override const IFanPod currPod 
  
  new make(IFanPod currPod)
  {
    this.currPod = currPod
    this.podsMap.add(currPod.name, currPod)
//    this.currPod.depends.keys.each
//    {
//      echo(it)
//      this.podsMap[it] = FakeFanPod(Pod.find(it))      
//    }
  }
  
  override Str[] podNames() {
    return podsMap.keys
  }
  
  override IFanPod? findPod(Str name)
  {
//    found := this.podsMap[name]
//    if (found == null)
//    {
//      p := Pod.find(name, false)
//      if (p != null)
//      {
//        found = FakeFanPod(p)
//        podsMap[name] = found
//      }
//    }
//    return found
    return podsMap[name]
  }
  
  override Str toStr() {return podsMap.vals.join(",")}
}

const class FakeFanPod : IFanPod
{
  override const Str name
  override const Str[] typeNames
//  override const Version version
//  override const Str:Version depends
  const private Str:IFanType typesMap
  
  new make(Pod pod)
  {
    this.name = pod.name
//    this.version = pod.version
    Str:Version deps := [:]
    pod.depends.each {
      deps.add(it.name, it.version)
    }
//    this.depends = deps
    Str:IFanType tempTypesMap := [:]
    pod.types.each {tempTypesMap.add(it.name, FakeFanType(it))}
    this.typesMap = tempTypesMap
    this.typeNames = this.typesMap.keys
  }
  
  new fake(Str name, IFanType[] types := [,], Version version := Version([0]), 
    Str:Version depends := ["sys" : Version.fromStr("1.0")])
  {
    this.name = name
//    this.depends = depends
//    this.version = version
    Str:IFanType tempTypesMap := [:]
    types.each {tempTypesMap.add(it.name, it)}
    this.typesMap = tempTypesMap
//    this.types = types
  }
  
  override IFanType? findType(Str name, Bool checked := true)
  {
    found := this.typesMap[name]
    if (found == null && checked) throw UnknownTypeErr.make
    return found
  }
  
  override Str toStr() {return name}
}

const class FakeFanType : IFanType
{
  override const Str name
  override const Str qname
  override const Str pod
  
//  override const Str? base
//  override const Str[] mixins
  override const Str[] inheritance
  
  override const Bool isAbstract
  override const Bool isClass
  override const Bool isConst
  override const Bool isEnum
  override const Bool isFinal
  override const Bool isInternal
  override const Bool isMixin
  override const Bool isPublic
  override const Bool isSynthetic
  
  override const IFanField[] fields
  override const IFanMethod[] methods
  override const IFanSlot[] slots
  
  override const Str:IFanSlot slotsMap  
  
  override const Str[] params := [,]
  override const Str:IFanType parametrization := [:]
  override const Str genericQname
  override const Bool isNullable
  override IFanType toNullable() { RtNullableType(this) }
  
  new make(Type t)
  {
    this.name = t.name
    Int? idx := this.name.index("\$")
    if (idx!=null) 
      this.name = this.name[0..<idx]
    this.qname = "$t.pod.name::$name"
    this.genericQname = qname
    this.pod = t.pod.name
//    this.base = t.base?.qname
//    this.mixins = t.mixins.map |Type m->Str| {return m.qname}
    this.inheritance = t.inheritance.map |Type i->Str| {return i.qname}
    
    this.isAbstract = t.isAbstract
    this.isClass = t.isClass
    this.isConst = t.isConst
    this.isEnum = t.isEnum
    this.isFinal = t.isFinal
    this.isInternal = t.isInternal
    this.isMixin = t.isMixin
    this.isPublic = t.isPublic
    this.isSynthetic = t.isSynthetic
    this.isNullable = false
    
    Str:IFanSlot tempSlotsMap := [:]
    IFanSlot[] tempSlots := [,]
    IFanField[] tempFields := [,]
    IFanMethod[] tempMethods := [,]
    
    t.fields.each
    {
      f := FakeFanField(this, it)
      tempSlotsMap.add(it.name, f)
      tempFields.add(f)
      tempSlots.add(f)
    }
    t.methods.each
    {
      m := FakeFanMethod(this, it)
      tempSlotsMap.add(it.name, m)
      tempMethods.add(m)
      tempSlots.add(m)
    }
    
    this.slotsMap = tempSlotsMap
    this.slots = tempSlots
    this.fields = tempFields
    this.methods = tempMethods
  }
  
  new fake(Str name, Str pod, Str[] inheritance, IFanSlot[] slots)
  {
    this.name = name
    this.qname = "$pod::$name"
    this.genericQname = qname
    this.pod = pod
    this.inheritance = inheritance
    
    Str:IFanSlot tempSlotsMap := [:]
    IFanSlot[] tempSlots := [,]
    IFanField[] tempFields := [,]
    IFanMethod[] tempMethods := [,]
    
    slots.each
    {
      if (it.isField) tempFields.add(it)
      else tempMethods.add(it)
      tempSlotsMap.add(it.name, it)
      tempSlots.add(it)  
    }
    
    this.slotsMap = tempSlotsMap
    this.slots = tempSlots
    this.fields = tempFields
    this.methods = tempMethods
  }
  
  override IFanField? field(Str name, Bool checked := true)
  {
    found := this.slotsMap[name]
    if (found isnot IFanField) found = null
    if (found == null && checked) throw UnknownTypeErr.make
    return found
  }
  
  override IFanMethod? method(Str name, Bool checked := true)
  {
    found := this.slotsMap[name]
    if (found isnot IFanMethod) found = null
    if (found == null && checked) throw UnknownTypeErr.make
    return found
  }
  
  override IFanSlot? slot(Str name, Bool checked := true)
  {
    found := this.slotsMap[name]
    if (found == null && checked) throw UnknownTypeErr.make
    return found
  }
  
  override Str toStr() {return qname}

  // Just copies current type 
  override FakeFanType parameterize(Str:IFanType parametrization)
  {
    FakeFanType.fake(name, pod, inheritance, slots)
  }
  
}

abstract const class FakeFanSlot : IFanSlot
{
  override const Str name
  override const Str qname
  override const Str parent
  override const Str of
  
  override const Bool isAbstract
  override const Bool isConst
  override const Bool isCtor
  override const Bool isInternal
  override const Bool isNative
  override const Bool isOverride
  override const Bool isPrivate
  override const Bool isProtected
  override const Bool isPublic
  override const Bool isStatic
  override const Bool isSynthetic
  override const Bool isVirtual
  override const IFanType type
  new make(IFanType type, Slot s)
  {
    this.type = type
    this.name = s.name
    this.qname = s.qname
    this.parent = s.parent.qname
    this.of = s.isField? (s as Field).type().qname : (s as Method).returns.qname
    
    this.isAbstract = s.isAbstract
    this.isConst = s.isConst
    this.isCtor = s.isCtor
    this.isInternal = s.isInternal
    this.isNative = s.isNative
    this.isOverride = s.isOverride
    this.isPrivate = s.isPrivate
    this.isProtected = s.isProtected
    this.isPublic = s.isPublic
    this.isStatic = s.isStatic
    this.isSynthetic = s.isSynthetic
    this.isVirtual = s.isVirtual
  }
  
  new fake(Str name, Str parent, Str of)
  {
    this.name = name
    this.qname = "$parent"+".$name"
    this.parent = parent
    this.of = of
  }
  
  override Str toStr() {return qname}
}

const class FakeFanField : FakeFanSlot, IFanField
{  
  new make(IFanType type, Field f) : super(type, f) {this.of = f.type().qname}  
  new fake(Str name, Str parent, Str of)
   : super.fake(name, parent, of) {}
}

const class FakeFanMethod : FakeFanSlot, IFanMethod
{
  override const IFanParam[] params  
  new make(IFanType type, Method m) : super(type, m)
  { 
    this.params = m.params.map |Param p->IFanParam| {return FakeFanParam(p)}
  }
  
  new fake(Str name, Str parent, Str returns, IFanParam[] params)
   : super.fake(name, parent, returns)
  {
    this.params = params
  }
}

const class FakeFanParam : IFanParam
{
  override const Str name
  override const Str of
  override const Bool hasDefault
  
  new make(Param p)
  {
    this.name = p.name
    this.of = p.type().qname
    this.hasDefault = p.hasDefault
  }
  
  new fake(Str name, Str of, Bool hasDefault)
  {
    this.name = name
    this.of = of
    this.hasDefault = hasDefault
  }
  
  override Str toStr() {return name}
}
