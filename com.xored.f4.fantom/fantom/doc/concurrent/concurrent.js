fan.concurrent = {};
fan.concurrent.Actor = fan.sys.Obj.$extend(fan.sys.Obj);
fan.concurrent.Actor.prototype.$ctor = function() {}
fan.concurrent.Actor.prototype.$typeof = function() { return fan.concurrent.Actor.$type; }
fan.concurrent.Actor.locals = function()
{
  if (fan.concurrent.Actor.$locals == null)
  {
    var k = fan.sys.Str.$type;
    var v = fan.sys.Obj.$type.toNullable();
    fan.concurrent.Actor.$locals = fan.sys.Map.make(k, v);
  }
  return fan.concurrent.Actor.$locals;
}
fan.concurrent.Actor.$locals = null;
fan.concurrent.ActorPool = fan.sys.Obj.$extend(fan.sys.Obj);
fan.concurrent.ActorPool.prototype.$ctor = function() {}
fan.concurrent.ActorPool.prototype.$typeof = function() { return fan.concurrent.ActorPool.$type; }
fan.concurrent.Future = fan.sys.Obj.$extend(fan.sys.Obj);
fan.concurrent.Future.prototype.$ctor = function() {}
fan.concurrent.Future.prototype.$typeof = function() { return fan.concurrent.Future.$type; }
fan.concurrent.$pod = fan.sys.Pod.$add('concurrent');
with (fan.concurrent.$pod)
{
  fan.concurrent.Actor.$type = $at('Actor','sys::Obj',[],8706);
  fan.concurrent.ActorPool.$type = $at('ActorPool','sys::Obj',[],8706);
  fan.concurrent.Future.$type = $at('Future','sys::Obj',[],8738);
  fan.concurrent.Actor.$type.$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pool','concurrent::ActorPool',false),new fan.sys.Param('receive','|sys::Obj?->sys::Obj?|?',true)])).$am('makeCoalescing',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pool','concurrent::ActorPool',false),new fan.sys.Param('toKey','|sys::Obj?->sys::Obj?|?',false),new fan.sys.Param('coalesce','|sys::Obj?,sys::Obj?->sys::Obj?|?',false),new fan.sys.Param('receive','|sys::Obj?->sys::Obj?|?',true)])).$am('pool',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('send',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Obj?',false)])).$am('sendLater',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','sys::Duration',false),new fan.sys.Param('msg','sys::Obj?',false)])).$am('sendWhenDone',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','concurrent::Future',false),new fan.sys.Param('msg','sys::Obj?',false)])).$am('receive',266240,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Obj?',false)])).$am('sleep',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('duration','sys::Duration',false)])).$am('locals',40962,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.concurrent.ActorPool.$type.$af('maxThreads',73730,'sys::Int').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',true)])).$am('isStopped',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isDone',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('stop',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('kill',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('join',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('timeout','sys::Duration?',true)]));
  fan.concurrent.Future.$type.$am('make',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('get',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('timeout','sys::Duration?',true)])).$am('isDone',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isCancelled',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('cancel',8192,fan.sys.List.make(fan.sys.Param.$type,[]));
}
