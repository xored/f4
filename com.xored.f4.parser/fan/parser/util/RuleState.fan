class RuleState
{
  Bool failed := false
  Int tokenPos
  Int start
  Int? end
  [Str:Obj?] store := [:]
  
  new make(Int start, Int tokenPos)
  {
    this.start = start
    this.tokenPos = tokenPos
  }  
  
  Obj get(Str key)
  {
    res := store[key]
    if (res == null) throw Err("No $key found")
    return res
  }
  
  Obj? safeGet(Str key) {return store[key]}
  
  Void replace(Str key, Obj? val) {store[key] = val}
  
  Void set(Str key, Obj? val)
  {
    was := store[key]
    if (was == null) store[key] = val
    else 
    {
      if (was is List) store[key] = ((List)was).add(val)
      else store[key] = [was, val]
    }
  }
  
  Bool has(Str key) {return store.containsKey(key)}
  Str getName(Str key) {return get(key)}
  Void setFlag(Str key) {store[key] = true}
  
  Void count(Str key)
  {
    Int? c := store[key]
    if (c != null) store[key] = c+1
    else store[key] = 1
  }
  
  Int getCount(Str key) {return safeGet(key)?:0}
  
  List getNonEmptyList(Str key)
  {
    obj := get(key)
    if (obj is List) return obj
    return [obj]
  }  
  
  List getList(Str key)
  {
    obj := safeGet(key)
    if (obj == null) return [,]
    else if (obj is List) return obj
    return [obj]
  }  
}
