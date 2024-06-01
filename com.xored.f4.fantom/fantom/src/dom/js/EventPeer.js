//
// Copyright (c) 2009, Brian Frank and Andy Frank
// Licensed under the Academic Free License version 3.0
//
// History:
//   24 Feb 2009  Andy Frank  Creation
//   20 May 2009  Andy Frank  Refactor to new OO model
//    8 Jul 2009  Andy Frank  Split webappClient into sys/dom
//   26 Aug 2015  Andy Frank  Rename back to Event
//

fan.dom.EventPeer = fan.sys.Obj.$extend(fan.sys.Obj);

fan.dom.EventPeer.prototype.$ctor = function(self) {}

fan.dom.EventPeer.makeMock = function()
{
  return fan.dom.EventPeer.make(new Event("mock"));
}

fan.dom.EventPeer.fromNative = function(obj)
{
  // short-circut if peer already exists
  if (obj.peer && obj.peer.event) return obj;
  return fan.dom.EventPeer.make(obj);
}

fan.dom.EventPeer.prototype.type = function(self) { return this.event.type; }

fan.dom.EventPeer.prototype.target = function(self)
{
  if (this.$target == null)
  {
    // 8 May 2019 - Andy Frank:
    // Firefox 66.0.5 is firing events with TEXT_NODE as targets; I'm not
    // sure if this is new behavior (or correct behavoir) -- but since the
    // Fantom DOM pod only handles ELEMENT_NODE; walk up to the parent
    var t = this.event.target;
    if (t.nodeType == 3) t = t.parentNode;
    this.$target = fan.dom.ElemPeer.wrap(t);
  }
  return this.$target;
}

fan.dom.EventPeer.prototype.relatedTarget = function(self)
{
  if (this.$relatedTarget === undefined)
  {
    var rt = this.event.relatedTarget;
    this.$relatedTarget = rt == null ? null : fan.dom.ElemPeer.wrap(rt);
  }
  return this.$relatedTarget;
}

fan.dom.EventPeer.prototype.pagePos = function(self)
{
  if (this.$pagePos == null)
    this.$pagePos = fan.graphics.Point.makeInt(this.event.pageX || 0, this.event.pageY || 0);
  return this.$pagePos;
}

fan.dom.EventPeer.prototype.alt   = function(self) { return this.event.altKey; }
fan.dom.EventPeer.prototype.ctrl  = function(self) { return this.event.ctrlKey; }
fan.dom.EventPeer.prototype.shift = function(self) { return this.event.shiftKey; }
fan.dom.EventPeer.prototype.meta  = function(self) { return this.event.metaKey; }

fan.dom.EventPeer.prototype.button = function(self) { return this.event.button; }
fan.dom.EventPeer.prototype.key = function(self) { return this.$key }
fan.dom.EventPeer.prototype.keyChar = function(self) { return this.$keyChar }

fan.dom.EventPeer.prototype.delta = function(self)
{
  if (this.$delta == null)
  {
    this.$delta = this.event.deltaX != null && this.event.deltaY != null
      ? fan.graphics.Point.makeInt(this.event.deltaX, this.event.deltaY)
      : fan.graphics.Point.m_defVal;
  }
  return this.$delta;
}

fan.dom.EventPeer.prototype.err = function(self)
{
  if (this.event.error == null) return null;
  if (this.$err == null) this.$err = fan.sys.Err.make(this.event.error);
  return this.$err;
}

fan.dom.EventPeer.prototype.stop = function(self)
{
  this.event.preventDefault();
  this.event.stopPropagation();
  this.event.cancelBubble = true;
  this.event.returnValue = false;
}

fan.dom.EventPeer.prototype.get = function(self, name, def)
{
  var val = this.event[name];
  if (val != null) return val;
  if (def != null) return def;
  return null;
}

fan.dom.EventPeer.prototype.set = function(self, name, val)
{
  this.elem[name] = val;
}

fan.dom.EventPeer.prototype.data = function(self)
{
  if (this.event.data == null) return null;
  if (this.$data == null)
  {
    var data = this.event.data;
    if (data instanceof ArrayBuffer)
    {
      // old design required copying the bytes into normal array
      var bytes = new Uint8Array(data);
      var array = Array.from(bytes);
      data = fan.sys.MemBuf.makeBytes(array);
    }
    this.$data = data;
  }
  return this.$data;
}

fan.dom.EventPeer.prototype.dataTransfer = function(self)
{
  if (!this.dataTx) this.dataTx = fan.dom.DataTransferPeer.make(this.event.dataTransfer);
  return this.dataTx;
}

fan.dom.EventPeer.make = function(event)
{
  // map native to Fan
  var x = fan.dom.Event.make();
  x.peer.event = event;
  if (event.keyCode) x.peer.$key = fan.dom.Key.fromCode(event.keyCode);
  if (event.key) x.peer.$keyChar = event.key;
  return x;
}