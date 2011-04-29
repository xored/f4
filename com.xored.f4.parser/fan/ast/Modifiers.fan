enum class ModifierId
{
  Abstract,
  Const,
  Ctor,
  Enum,
  Facet,
  Final,
  Internal,
  Mixin,
  Native,
  Override,
  Private,
  Protected,
  Public,
  Static,
  Virtual,
  Once,
  Readonly
}

const class Modifier : Node
{
  const ModifierId id
  
  new make(Int start, Int end, ModifierId id)
    : super(start, end) {this.id = id}
}

const class Modifiers : Node
{
  const ModifierId:Modifier map
  const Modifier[] list
  
  new make(Int start, Int end, Modifier[] list)
    : super(start, end)
  {
    this.list = list
    temp := ModifierId:Modifier[:]
    list.each {temp[it.id] = it}
    this.map = temp
  }
  
  Bool has(ModifierId id) {return map.containsKey(id)} 
  Bool isEmpty() {return list.isEmpty}
  Modifier? get(ModifierId id) {return map[id]}
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      list.each {it.accept(v)}
      v.exitNode(this)
    }
  }
}