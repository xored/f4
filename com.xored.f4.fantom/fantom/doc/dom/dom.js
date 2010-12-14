fan.dom = {};
fan.dom.Doc = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.Doc.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.DocPeer(this);
  var $this = this;
}
fan.dom.Doc.prototype.$typeof = function() { return fan.dom.Doc.$type; }
fan.dom.Doc.make = function()
{
  var self = new fan.dom.Doc();
  fan.dom.Doc.make$(self);
  return self;
}
fan.dom.Doc.make$ = function(self)
{
  return;
}
fan.dom.Doc.prototype.title = function()
{
  return this.peer.title(this);
}
fan.dom.Doc.prototype.title$ = function(it)
{
  return this.peer.title$(this,it);
}
fan.dom.Doc.prototype.body = function()
{
  return this.peer.body(this);
}
fan.dom.Doc.prototype.elem = function(id)
{
  return this.peer.elem(this,id);
}
fan.dom.Doc.prototype.createElem = function(tagName,attrib)
{
  if (attrib === undefined) attrib = null;
  return this.peer.createElem(this,tagName,attrib);
}
fan.dom.Doc.prototype.cookies = function()
{
  try
  {
    return fan.sys.MimeType.parseParams(this.getCookiesStr()).ro();
  }
  catch ($_u0)
  {
    $_u0 = fan.sys.Err.make($_u0);
    if ($_u0 instanceof fan.sys.Err)
    {
      var e = $_u0;
      var e;
      e.trace();
    }
    else
    {
      throw $_u0;
    }
  }
  ;
  return fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")).ro();
}
fan.dom.Doc.prototype.addCookie = function(c)
{
  this.addCookieStr(c.toStr());
  return;
}
fan.dom.Doc.prototype.getCookiesStr = function()
{
  return this.peer.getCookiesStr(this);
}
fan.dom.Doc.prototype.addCookieStr = function(c)
{
  return this.peer.addCookieStr(this,c);
}
fan.dom.DocPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.DocPeer.prototype.$ctor = function(self) {}
fan.dom.DocPeer.prototype.title  = function(self) { return document.title; }
fan.dom.DocPeer.prototype.title$ = function(self, val) { document.title = val; }
fan.dom.DocPeer.prototype.body = function(self)
{
  return fan.dom.ElemPeer.make(document.body);
}
fan.dom.DocPeer.prototype.elem = function(self, id)
{
  var elem = document.getElementById(id);
  if (elem == null) return null;
  return fan.dom.ElemPeer.make(elem);
}
fan.dom.DocPeer.prototype.createElem = function(self, tagName, attribs)
{
  var elem = document.createElement(tagName);
  var wrap = fan.dom.ElemPeer.make(elem);
  if (attribs != null)
  {
    var k = attribs.keys();
    for (var i=0; i<k.size(); i++)
      wrap.set(k.get(i), attribs.get(k.get(i)));
  }
  return wrap;
}
fan.dom.DocPeer.prototype.getCookiesStr = function(self) { return document.cookie; }
fan.dom.DocPeer.prototype.addCookieStr = function(self,c) { document.cookie = c; }
fan.dom.Elem = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.Elem.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.ElemPeer(this);
  var $this = this;
}
fan.dom.Elem.prototype.$typeof = function() { return fan.dom.Elem.$type; }
fan.dom.Elem.make = function()
{
  var self = new fan.dom.Elem();
  fan.dom.Elem.make$(self);
  return self;
}
fan.dom.Elem.make$ = function(self)
{
  return;
}
fan.dom.Elem.prototype.tagName = function()
{
  return this.peer.tagName(this);
}
fan.dom.Elem.prototype.id = function()
{
  return this.peer.id(this);
}
fan.dom.Elem.prototype.id$ = function(it)
{
  return this.peer.id$(this,it);
}
fan.dom.Elem.prototype.name = function()
{
  return this.peer.name(this);
}
fan.dom.Elem.prototype.name$ = function(it)
{
  return this.peer.name$(this,it);
}
fan.dom.Elem.prototype.className = function()
{
  return this.peer.className(this);
}
fan.dom.Elem.prototype.className$ = function(it)
{
  return this.peer.className$(this,it);
}
fan.dom.Elem.prototype.hasClassName = function(className)
{
  return this.peer.hasClassName(this,className);
}
fan.dom.Elem.prototype.addClassName = function(className)
{
  return this.peer.addClassName(this,className);
}
fan.dom.Elem.prototype.removeClassName = function(className)
{
  return this.peer.removeClassName(this,className);
}
fan.dom.Elem.prototype.html = function()
{
  return this.peer.html(this);
}
fan.dom.Elem.prototype.html$ = function(it)
{
  return this.peer.html$(this,it);
}
fan.dom.Elem.prototype.val = function()
{
  return this.peer.val(this);
}
fan.dom.Elem.prototype.val$ = function(it)
{
  return this.peer.val$(this,it);
}
fan.dom.Elem.prototype.checked = function()
{
  return this.peer.checked(this);
}
fan.dom.Elem.prototype.checked$ = function(it)
{
  return this.peer.checked$(this,it);
}
fan.dom.Elem.prototype.enabled = function()
{
  return this.peer.enabled(this);
}
fan.dom.Elem.prototype.enabled$ = function(it)
{
  return this.peer.enabled$(this,it);
}
fan.dom.Elem.prototype.get = function(name,def)
{
  if (def === undefined) def = null;
  return this.peer.get(this,name,def);
}
fan.dom.Elem.prototype.set = function(name,val)
{
  return this.peer.set(this,name,val);
}
fan.dom.Elem.prototype.pos = function()
{
  return this.peer.pos(this);
}
fan.dom.Elem.prototype.pos$ = function(it)
{
  return this.peer.pos$(this,it);
}
fan.dom.Elem.prototype.size = function()
{
  return this.peer.size(this);
}
fan.dom.Elem.prototype.size$ = function(it)
{
  return this.peer.size$(this,it);
}
fan.dom.Elem.prototype.bounds = function()
{
  return fan.gfx.Rect.makePosSize(this.pos(),this.size());
}
fan.dom.Elem.prototype.bounds$ = function(it)
{
  this.pos$(it.pos());
  this.size$(it.size());
  return;
}
fan.dom.Elem.prototype.parent = function()
{
  return this.peer.parent(this);
}
fan.dom.Elem.prototype.children = function()
{
  return this.peer.children(this);
}
fan.dom.Elem.prototype.first = function()
{
  return this.peer.first(this);
}
fan.dom.Elem.prototype.prev = function()
{
  return this.peer.prev(this);
}
fan.dom.Elem.prototype.next = function()
{
  return this.peer.next(this);
}
fan.dom.Elem.prototype.add = function(child)
{
  return this.peer.add(this,child);
}
fan.dom.Elem.prototype.remove = function(child)
{
  return this.peer.remove(this,child);
}
fan.dom.Elem.prototype.focus = function()
{
  return this.peer.focus(this);
}
fan.dom.Elem.prototype.find = function(c)
{
  return this.peer.find(this,c);
}
fan.dom.Elem.prototype.findAll = function(c)
{
  return this.peer.findAll(this,c);
}
fan.dom.Elem.prototype.onEvent = function(type,useCapture,handler)
{
  return this.peer.onEvent(this,type,useCapture,handler);
}
fan.dom.Elem.prototype.m_bounds = null;
fan.dom.ElemPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.ElemPeer.prototype.$ctor = function(self)
{
  this.m_pos  = fan.gfx.Point.m_defVal;
  this.m_size = fan.gfx.Size.m_defVal;
}
fan.dom.ElemPeer.prototype.tagName = function(self) { return fan.sys.Str.lower(this.elem.nodeName); }
fan.dom.ElemPeer.prototype.id  = function(self) { return this.elem.id; }
fan.dom.ElemPeer.prototype.id$ = function(self, val) { return this.elem.id = val; }
fan.dom.ElemPeer.prototype.name  = function(self) { return this.elem.name; }
fan.dom.ElemPeer.prototype.name$ = function(self, val) { return this.elem.name = val; }
fan.dom.ElemPeer.prototype.className  = function(self) { return this.elem.className; }
fan.dom.ElemPeer.prototype.className$ = function(self, val) { return this.elem.className = val; }
fan.dom.ElemPeer.prototype.hasClassName = function(self, className)
{
  var arr = this.elem.className.split(" ");
  for (var i=0; i<arr.length; i++)
    if (arr[i] == className)
      return true;
  return false;
}
fan.dom.ElemPeer.prototype.addClassName = function(self, className)
{
  if (!this.hasClassName(self, className))
    this.elem.className += " " + className;
  return this;
}
fan.dom.ElemPeer.prototype.removeClassName = function(self, className)
{
  var arr = this.elem.className.split(" ");
  for (var i=0; i<arr.length; i++)
    if (arr[i] == className)
    {
      arr.splice(i, 1);
      break;
    }
  this.elem.className = arr.join(" ");
  return this;
}
fan.dom.ElemPeer.prototype.html  = function(self) { return this.elem.innerHTML; }
fan.dom.ElemPeer.prototype.html$ = function(self, val) { this.elem.innerHTML = val; }
fan.dom.ElemPeer.prototype.val  = function(self) { return this.elem.value; }
fan.dom.ElemPeer.prototype.val$ = function(self, val) { this.elem.value = val; }
fan.dom.ElemPeer.prototype.checked  = function(self) { return this.elem.checked; }
fan.dom.ElemPeer.prototype.checked$ = function(self, val) { this.elem.checked = val; }
fan.dom.ElemPeer.prototype.enabled  = function(self) { return !this.elem.disabled; }
fan.dom.ElemPeer.prototype.enabled$ = function(self, val) { this.elem.disabled = !val; }
fan.dom.ElemPeer.prototype.get = function(self, name, def)
{
  if (name == "id")      return this.id(self);
  if (name == "name")    return this.name(self);
  if (name == "class")   return this.className(self);
  if (name == "style")   return this.style(self);
  if (name == "value")   return this.val(self);
  if (name == "checked") return this.checked(self);
  var val = this.elem[name];
  if (val != null) return val;
  if (def != null) return def;
  return null;
}
fan.dom.ElemPeer.prototype.set = function(self, name, val)
{
  if (name == "id")           this.id$(self, val);
  else if (name == "name")    this.name$(self, val);
  else if (name == "class")   this.className$(self, val);
  else if (name == "value")   this.val$(self, val);
  else if (name == "checked") this.checked$(self, val);
  else this.elem.setAttribute(name, val);
}
fan.dom.ElemPeer.prototype.pos = function(self)
{
  var x = this.elem.offsetLeft;
  var y = this.elem.offsetTop;
  if (this.m_pos.m_x != x || this.m_pos.m_y != y)
    this.m_pos = fan.gfx.Point.make(x, y);
  return this.m_pos;
}
fan.dom.ElemPeer.prototype.pos$ = function(self, val)
{
  this.m_pos = fan.gfx.Point.make(val.m_x, val.m_y);
  this.elem.style.left = val.m_x + "px";
  this.elem.style.top  = val.m_y + "px";
}
fan.dom.ElemPeer.prototype.size = function(self)
{
  var w = this.elem.offsetWidth;
  var h = this.elem.offsetHeight;
  if (this.m_size.m_w != w || this.m_size.m_h != h)
    this.m_size = fan.gfx.Size.make(w, h);
  return this.m_size;
}
fan.dom.ElemPeer.prototype.size$ = function(self, val)
{
  this.m_size = fan.gfx.Size.make(val.m_w, val.m_h);
  this.elem.style.width  = val.m_w + "px";
  this.elem.style.height = val.m_h + "px";
}
fan.dom.ElemPeer.prototype.parent = function(self)
{
  var parent = this.elem.parentNode;
  if (parent == null) return null;
  return fan.dom.ElemPeer.make(parent);
}
fan.dom.ElemPeer.prototype.children = function(self)
{
  var list = new Array();
  var kids = this.elem.childNodes;
  for (var i=0; i<kids.length; i++)
    if (kids[i].nodeType == 1)
      list.push(fan.dom.ElemPeer.make(kids[i]));
  return fan.sys.List.make(fan.dom.Elem.$type, list);
}
fan.dom.ElemPeer.prototype.first = function(self)
{
  var kids = this.elem.childNodes;
  for (var i=0; i<kids.length; i++)
    if (kids[i].nodeType == 1)
      return fan.dom.ElemPeer.make(kids[i]);
  return null;
}
fan.dom.ElemPeer.prototype.prev = function(self)
{
  var sib = this.elem.previousSibling;
  while (sib != null && sib.nodeType != 1)
    sib = sib.previousSibling;
  if (sib == null) return null;
  return fan.dom.ElemPeer.make(sib);
}
fan.dom.ElemPeer.prototype.next = function(self)
{
  var sib = this.elem.nextSibling;
  while (sib != null && sib.nodeType != 1)
    sib = sib.nextSibling;
  if (sib == null) return null;
  return fan.dom.ElemPeer.make(sib);
}
fan.dom.ElemPeer.prototype.add = function(self, child)
{
  this.elem.appendChild(child.elem);
  return this;
}
fan.dom.ElemPeer.prototype.remove = function(self, child)
{
  this.elem.removeChild(child.elem);
  return this;
}
fan.dom.ElemPeer.prototype.focus = function(self)
{
  // IE throws err if element is not visible, so we need
  // to wrap in a try block
  try { this.elem.focus(); }
  catch (err) {} // ignore
}
fan.dom.ElemPeer.prototype.find = function(self, f)
{
  var kids = this.children(self);
  for (var i=0; i<kids.length; i++)
  {
    var kid = kids[i];
    if (f.call(kid)) return kid;
    kid = kid.find(func);
    if (kid != null) return kid;
  }
  return null;
}
fan.dom.ElemPeer.prototype.findAll = function(self, f, acc)
{
  if (acc == null) acc = new Array();
  var kids = this.children(self);
  for (var i=0; i<kids.length; i++)
  {
    var kid = kids[i];
    if (f.call(kid)) acc.push(kid);
    kid.findAll(func, acc);
  }
  return acc;
}
fan.dom.ElemPeer.prototype.onEvent = function(self, type, useCapture, handler)
{
  if (this.elem.addEventListener)
  {
    this.elem.addEventListener(type, function(e) {
      handler.call(fan.dom.EventPeer.make(e));
    }, useCapture);
  }
  else
  {
    this.elem.attachEvent('on'+type, function(e) {
      handler.call(fan.dom.EventPeer.make(e));
    });
  }
}
fan.dom.ElemPeer.prototype.toStr = function(self)
{
  var name = this.elem.nodeName;
  var type = this.elem.type;
  var id   = this.elem.id;
  var str  = "<" + fan.sys.Str.lower(name);
  if (type != null && type.length > 0) str += " type='" + type + "'";
  if (id != null && id.length > 0) str += " id='" + id + "'"
  str += ">";
  return str;
}
fan.dom.ElemPeer.make = function(elem)
{
  if (elem == null) throw fan.sys.ArgErr.make("elem is null")
  if (elem._fanElem != undefined)
    return elem._fanElem;
  var x = fan.dom.Elem.make();
  x.peer.elem = elem;
  elem._fanElem = x;
  return x;
}
fan.dom.Event = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.Event.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.EventPeer(this);
  var $this = this;
  this.m_meta = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Obj?"));
  return;
}
fan.dom.Event.prototype.$typeof = function() { return fan.dom.Event.$type; }
fan.dom.Event.make = function()
{
  var self = new fan.dom.Event();
  fan.dom.Event.make$(self);
  return self;
}
fan.dom.Event.make$ = function(self)
{
  ;
  return;
}
fan.dom.Event.prototype.target = function()
{
  return this.peer.target(this);
}
fan.dom.Event.prototype.x = function()
{
  return this.peer.x(this);
}
fan.dom.Event.prototype.y = function()
{
  return this.peer.y(this);
}
fan.dom.Event.prototype.alt = function()
{
  return this.peer.alt(this);
}
fan.dom.Event.prototype.ctrl = function()
{
  return this.peer.ctrl(this);
}
fan.dom.Event.prototype.shift = function()
{
  return this.peer.shift(this);
}
fan.dom.Event.prototype.button = function()
{
  return this.peer.button(this);
}
fan.dom.Event.prototype.button$ = function(it)
{
  return this.peer.button$(this,it);
}
fan.dom.Event.prototype.meta = function()
{
  return this.m_meta;
}
fan.dom.Event.prototype.meta$ = function(it)
{
  this.m_meta = it;
  return;
}
fan.dom.Event.prototype.m_meta = null;
fan.dom.EventPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.EventPeer.prototype.$ctor = function(self) {}
fan.dom.EventPeer.prototype.target = function(self)
{
  return fan.dom.ElemPeer.make(this.event.target);
}
fan.dom.EventPeer.prototype.x = function(self) { return this.event.pageX; }
fan.dom.EventPeer.prototype.y = function(self) { return this.event.pageY; }
fan.dom.EventPeer.prototype.alt   = function(self) { return this.event.altKey; }
fan.dom.EventPeer.prototype.ctrl  = function(self) { return this.event.ctrlKey; }
fan.dom.EventPeer.prototype.shift = function(self) { return this.event.shiftKey; }
fan.dom.EventPeer.prototype.button = function(self) { return this.event.button; }
fan.dom.EventPeer.prototype.toStr = function(self)
{
  return "Event[" +
    "target:" + this.target() +
    ", x:" + this.x() + ", y:" + this.y() +
    ", alt:" + this.alt() + ", ctrl:" + this.ctrl() + ", shift:" + this.shift() +
    ", button:" + this.button() +
    "]";
}
fan.dom.EventPeer.make = function(event)
{
  var x = fan.dom.Event.make();
  x.peer.event = event;
  return x;
}
fan.dom.HttpReq = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.HttpReq.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.HttpReqPeer(this);
  var $this = this;
  this.m_uri = fan.sys.Uri.fromStr("#");
  this.m_headers = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str"));
  this.m_async = true;
  return;
}
fan.dom.HttpReq.prototype.$typeof = function() { return fan.dom.HttpReq.$type; }
fan.dom.HttpReq.make = function(f)
{
  var self = new fan.dom.HttpReq();
  fan.dom.HttpReq.make$(self,f);
  return self;
}
fan.dom.HttpReq.make$ = function(self,f)
{
  ;
  if (f != null)
  {
    f.call(self);
  }
  ;
  return;
}
fan.dom.HttpReq.prototype.uri = function()
{
  return this.m_uri;
}
fan.dom.HttpReq.prototype.uri$ = function(it)
{
  this.m_uri = it;
  return;
}
fan.dom.HttpReq.prototype.headers = function()
{
  return this.m_headers;
}
fan.dom.HttpReq.prototype.headers$ = function(it)
{
  this.m_headers = it;
  return;
}
fan.dom.HttpReq.prototype.async = function()
{
  return this.m_async;
}
fan.dom.HttpReq.prototype.async$ = function(it)
{
  this.m_async = it;
  return;
}
fan.dom.HttpReq.prototype.send = function(method,content,c)
{
  return this.peer.send(this,method,content,c);
}
fan.dom.HttpReq.prototype.get = function(c)
{
  this.send("GET","",c);
  return;
}
fan.dom.HttpReq.prototype.post = function(content,c)
{
  this.send("POST",content,c);
  return;
}
fan.dom.HttpReq.prototype.postForm = function(form,c)
{
  this.m_headers.set("Content-Type","application/x-www-form-urlencoded");
  this.send("POST",this.encodeForm(form),c);
  return;
}
fan.dom.HttpReq.prototype.encodeForm = function(form)
{
  return this.peer.encodeForm(this,form);
}
fan.dom.HttpReq.prototype.m_uri = null;
fan.dom.HttpReq.prototype.m_headers = null;
fan.dom.HttpReq.prototype.m_async = false;
fan.dom.HttpReqPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.HttpReqPeer.prototype.$ctor = function(self) {}
fan.dom.HttpReqPeer.prototype.send = function(self, method, content, f)
{
  var xhr = new XMLHttpRequest();
  xhr.open(method.toUpperCase(), self.m_uri.m_str, self.m_async);
  if (self.m_async)
  {
    xhr.onreadystatechange = function ()
    {
      if (xhr.readyState == 4)
        f.call(fan.dom.HttpReqPeer.makeRes(xhr));
    }
  }
  var ct = false;
  var k = self.m_headers.keys();
  for (var i=0; i<k.size(); i++)
  {
    var key = k.get(i);
    if (fan.sys.Str.lower(key) == "content-type") ct = true;
    xhr.setRequestHeader(key, self.m_headers.get(key));
  }
  if (!ct) xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.send(content);
  if (!self.m_async) f.call(fan.dom.HttpReqPeer.makeRes(xhr));
}
fan.dom.HttpReqPeer.makeRes = function(xhr)
{
  var res = fan.dom.HttpRes.make();
  res.m_status  = xhr.status;
  res.m_content = xhr.responseText;
  var all = xhr.getAllResponseHeaders().split("\n");
  for (var i=0; i<all.length; i++)
  {
    if (all[i].length == 0) continue;
    var j = all[i].indexOf(":");
    var k = fan.sys.Str.trim(all[i].substr(0, j));
    var v = fan.sys.Str.trim(all[i].substr(j+1));
    res.m_headers.set(k, v);
  }
  return res;
}
fan.dom.HttpReqPeer.prototype.encodeForm = function(self, form)
{
  var content = ""
  var k = form.keys();
  for (var i=0; i<k.size(); i++)
  {
    if (i > 0) content += "&";
    content += encodeURIComponent(k.get(i)) + "=" +
               encodeURIComponent(form.get(k.get(i)));
  }
  return content;
}
fan.dom.HttpRes = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.HttpRes.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_headers = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str"));
  this.m_content = "";
  return;
}
fan.dom.HttpRes.prototype.$typeof = function() { return fan.dom.HttpRes.$type; }
fan.dom.HttpRes.make = function()
{
  var self = new fan.dom.HttpRes();
  fan.dom.HttpRes.make$(self);
  return self;
}
fan.dom.HttpRes.make$ = function(self)
{
  ;
  return;
}
fan.dom.HttpRes.prototype.status = function()
{
  return this.m_status;
}
fan.dom.HttpRes.prototype.status$ = function(it)
{
  this.m_status = it;
  return;
}
fan.dom.HttpRes.prototype.headers = function()
{
  return this.m_headers;
}
fan.dom.HttpRes.prototype.headers$ = function(it)
{
  this.m_headers = it;
  return;
}
fan.dom.HttpRes.prototype.content = function()
{
  return this.m_content;
}
fan.dom.HttpRes.prototype.content$ = function(it)
{
  this.m_content = it;
  return;
}
fan.dom.HttpRes.prototype.m_status = 0;
fan.dom.HttpRes.prototype.m_headers = null;
fan.dom.HttpRes.prototype.m_content = null;
fan.dom.Storage = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.Storage.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.StoragePeer(this);
  var $this = this;
}
fan.dom.Storage.prototype.$typeof = function() { return fan.dom.Storage.$type; }
fan.dom.Storage.make = function()
{
  var self = new fan.dom.Storage();
  fan.dom.Storage.make$(self);
  return self;
}
fan.dom.Storage.make$ = function(self)
{
  return;
}
fan.dom.Storage.prototype.size = function()
{
  return this.peer.size(this);
}
fan.dom.Storage.prototype.key = function(index)
{
  return this.peer.key(this,index);
}
fan.dom.Storage.prototype.get = function(key)
{
  return this.peer.get(this,key);
}
fan.dom.Storage.prototype.set = function(key,val)
{
  return this.peer.set(this,key,val);
}
fan.dom.Storage.prototype.remove = function(key)
{
  return this.peer.remove(this,key);
}
fan.dom.Storage.prototype.clear = function()
{
  return this.peer.clear(this);
}
fan.dom.StoragePeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.StoragePeer.prototype.$ctor = function(self) {}
fan.dom.StoragePeer.prototype.$instance = null;
fan.dom.StoragePeer.prototype.size = function(self, key)
{
  return this.$instance.length;
}
fan.dom.StoragePeer.prototype.key = function(self, index)
{
  return this.$instance.key(index);
}
fan.dom.StoragePeer.prototype.get = function(self, key)
{
  return this.$instance.getItem(key);
}
fan.dom.StoragePeer.prototype.set = function(self, key, val)
{
  this.$instance.setItem(key, val);
}
fan.dom.StoragePeer.prototype.remove = function(self, key)
{
  this.$instance.removeItem(key);
}
fan.dom.StoragePeer.prototype.clear = function(self)
{
  this.$instance.clear();
}
fan.dom.Win = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.Win.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.dom.WinPeer(this);
  var $this = this;
}
fan.dom.Win.prototype.$typeof = function() { return fan.dom.Win.$type; }
fan.dom.Win.make = function()
{
  var self = new fan.dom.Win();
  fan.dom.Win.make$(self);
  return self;
}
fan.dom.Win.make$ = function(self)
{
  return;
}
fan.dom.Win.cur = function()
{
  return fan.dom.WinPeer.cur();
}
fan.dom.Win.prototype.doc = function()
{
  return this.peer.doc(this);
}
fan.dom.Win.prototype.alert = function(obj)
{
  return this.peer.alert(this,obj);
}
fan.dom.Win.prototype.viewport = function()
{
  return this.peer.viewport(this);
}
fan.dom.Win.prototype.uri = function()
{
  return this.peer.uri(this);
}
fan.dom.Win.prototype.hyperlink = function(uri)
{
  return this.peer.hyperlink(this,uri);
}
fan.dom.Win.prototype.reload = function(force)
{
  if (force === undefined) force = false;
  return this.peer.reload(this,force);
}
fan.dom.Win.prototype.onEvent = function(type,useCapture,handler)
{
  return this.peer.onEvent(this,type,useCapture,handler);
}
fan.dom.Win.prototype.sessionStorage = function()
{
  return this.peer.sessionStorage(this);
}
fan.dom.Win.prototype.localStorage = function()
{
  return this.peer.localStorage(this);
}
fan.dom.WinPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.WinPeer.prototype.$ctor = function(self) {}
fan.dom.WinPeer.cur = function()
{
  if (fan.dom.WinPeer.$cur == null) fan.dom.WinPeer.$cur = fan.dom.Win.make();
  return fan.dom.WinPeer.$cur;
}
fan.dom.WinPeer.prototype.doc = function(self)
{
  if (this.$doc == null) this.$doc = fan.dom.Doc.make();
  return this.$doc;
}
fan.dom.WinPeer.prototype.alert = function(self, obj)
{
  alert(obj);
}
fan.dom.WinPeer.prototype.viewport = function(self)
{
  return (typeof window.innerWidth != "undefined")
    ? fan.gfx.Size.make(window.innerWidth, window.innerHeight)
    : fan.gfx.Size.make(
        document.documentElement.clientWidth,
        document.documentElement.clientHeight);
}
fan.dom.WinPeer.prototype.uri = function(self)
{
  return fan.sys.Uri.decode(window.location.toString());
}
fan.dom.WinPeer.prototype.hyperlink = function(self, uri)
{
  window.location = uri.encode();
}
fan.dom.WinPeer.prototype.reload  = function(self, force)
{
  window.location.reload(force);
}
fan.dom.WinPeer.prototype.onEvent = function(self, type, useCapture, handler)
{
  var f = function(e)
  {
    var evt = fan.dom.EventPeer.make(e);
    handler.call(evt);
    if (type == "beforeunload")
    {
      var msg = evt.m_meta.get("beforeunloadMsg");
      if (msg != null)
      {
        e.returnValue = msg;
        return msg;
      }
    }
  }
  if (window.addEventListener)
  {
    // trap hashchange for non-supporting browsers
    if (type == "hashchange" && !("onhashchange" in window))
    {
      this.fakeHashChange(self, handler);
      return;
    }
    window.addEventListener(type, f, useCapture);
  }
  else
  {
    window.attachEvent('on'+type, f);
  }
}
fan.dom.WinPeer.prototype.fakeHashChange = function(self, handler)
{
  var getHash = function()
  {
    var href  = window.location.href;
    var index = href.indexOf('#');
    return index == -1 ? '' : href.substr(index+1);
  }
  var oldHash = getHash();
  var checkHash = function()
  {
    var newHash = getHash();
    if (oldHash != newHash)
    {
      oldHash = newHash;
      handler.call(fan.dom.EventPeer.make(null));
    }
  }
  setInterval(checkHash, 100);
}
fan.dom.WinPeer.prototype.sessionStorage = function(self)
{
  if (this.$sessionStorage == null)
  {
    this.$sessionStorage = fan.dom.Storage.make();
    this.$sessionStorage.peer.$instance = window.sessionStorage;
  }
  return this.$sessionStorage;
}
fan.dom.WinPeer.prototype.localStorage = function(self)
{
  if (this.$localStorage == null)
  {
    this.$localStorage = fan.dom.Storage.make();
    this.$localStorage.peer.$instance = window.localStorage;
  }
  return this.$localStorage;
}
fan.dom.DomTestClient = fan.sys.Obj.$extend(fan.sys.Obj);
fan.dom.DomTestClient.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_verifies = 0;
  return;
}
fan.dom.DomTestClient.prototype.$typeof = function() { return fan.dom.DomTestClient.$type; }
fan.dom.DomTestClient.prototype.testAttrs = function()
{
  var elem = fan.dom.Win.cur().doc().elem("testAttrs");
  this.verify(elem != null);
  this.verifyEq(elem.id(),"testAttrs");
  this.verifyEq(elem.get("id"),"testAttrs");
  this.verifyEq(elem.className(),"hidden");
  this.verifyEq(elem.get("class"),"hidden");
  var a = elem.children().get(3);
  var b = elem.children().get(4);
  var c = elem.children().get(5);
  this.verifyEq(fan.sys.ObjUtil.coerce(a.hasClassName("a"),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(a.hasClassName("b"),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(a.hasClassName("c"),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(b.hasClassName("a"),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(b.hasClassName("b"),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(b.hasClassName("c"),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(c.hasClassName("a"),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
  a.addClassName("c");
  b.addClassName("c");
  c.addClassName("c");
  this.verifyEq(fan.sys.ObjUtil.coerce(a.hasClassName("c"),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(b.hasClassName("c"),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(c.hasClassName("c"),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable()));
  a.removeClassName("a");
  b.removeClassName("a");
  this.verifyEq(fan.sys.ObjUtil.coerce(a.hasClassName("a"),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(b.hasClassName("a"),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
  c.removeClassName("c");
  this.verifyEq(fan.sys.ObjUtil.coerce(c.hasClassName("c"),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(b.className(),"b c");
  b.addClassName("b");
  this.verifyEq(b.className(),"b c");
  b.removeClassName("x");
  this.verifyEq(b.className(),"b c");
  this.verifyEq(elem.val(),null);
  this.verifyEq(elem.get("value"),null);
  this.verifyEq(fan.sys.ObjUtil.coerce(elem.checked(),fan.sys.Obj.$type.toNullable()),null);
  this.verifyEq(elem.get("checked"),null);
  this.verifyEq(elem.children().get(0).name(),"alpha");
  this.verifyEq(elem.children().get(0).get("name"),"alpha");
  this.verifyEq(elem.children().get(0).val(),"foo");
  this.verifyEq(elem.children().get(0).get("value"),"foo");
  this.verifyEq(elem.children().get(1).name(),"beta");
  this.verifyEq(elem.children().get(1).get("name"),"beta");
  this.verifyEq(fan.sys.ObjUtil.coerce(elem.children().get(1).checked(),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(elem.children().get(1).get("checked"),fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(elem.children().get(2).checked(),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(elem.children().get(2).get("checked"),fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(elem.get("foo"),null);
  this.verifyEq(elem.get("foo"),null);
  this.verifyEq(elem.get("foo","bar"),"bar");
  return;
}
fan.dom.DomTestClient.prototype.testBasics = function()
{
  var elem = fan.dom.Win.cur().doc().elem("testBasics");
  this.verify(elem != null);
  var kids = elem.children();
  this.verifyEq(fan.sys.ObjUtil.coerce(kids.size(),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.Str.trim(kids.get(0).html()),"alpha");
  this.verifyEq(kids.get(1).html(),"beta");
  this.verifyEq(kids.get(2).html(),"gamma");
  return;
}
fan.dom.DomTestClient.prototype.testCreate = function()
{
  var elem = fan.dom.Win.cur().doc().createElem("div");
  this.verifyEq(elem.tagName(),"div");
  elem = fan.dom.Win.cur().doc().createElem("div",fan.sys.Map.fromLiteral(["class"],["foo"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")));
  this.verifyEq(elem.tagName(),"div");
  this.verifyEq(elem.className(),"foo");
  elem = fan.dom.Win.cur().doc().createElem("div",fan.sys.Map.fromLiteral(["id","name","class"],["cool","yay","foo"],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str")));
  this.verifyEq(elem.tagName(),"div");
  this.verifyEq(elem.get("id"),"cool");
  this.verifyEq(elem.get("name"),"yay");
  this.verifyEq(elem.get("class"),"foo");
  return;
}
fan.dom.DomTestClient.prototype.verify = function(v)
{
  if (v)
  {
    (function($this) { var $_u1 = $this.m_verifies; $this.m_verifies = fan.sys.Int.increment($this.m_verifies); return $_u1; })(this);
  }
  else
  {
    throw fan.sys.Err.make("Test failed");
  }
  ;
  return;
}
fan.dom.DomTestClient.prototype.verifyEq = function(a,b)
{
  if (fan.sys.ObjUtil.equals(a,b))
  {
    (function($this) { var $_u2 = $this.m_verifies; $this.m_verifies = fan.sys.Int.increment($this.m_verifies); return $_u2; })(this);
  }
  else
  {
    throw fan.sys.Err.make(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",a)," != "),b));
  }
  ;
  return;
}
fan.dom.DomTestClient.prototype.verifies = function()
{
  return this.m_verifies;
}
fan.dom.DomTestClient.prototype.verifies$ = function(it)
{
  this.m_verifies = it;
  return;
}
fan.dom.DomTestClient.make = function()
{
  var self = new fan.dom.DomTestClient();
  fan.dom.DomTestClient.make$(self);
  return self;
}
fan.dom.DomTestClient.make$ = function(self)
{
  ;
  return;
}
fan.dom.DomTestClient.prototype.m_verifies = 0;
fan.dom.$pod = fan.sys.Pod.$add('dom');
with (fan.dom.$pod)
{
  fan.dom.Doc.$type = $at('Doc','sys::Obj',[],8192);
  fan.dom.Elem.$type = $at('Elem','sys::Obj',[],8192);
  fan.dom.Event.$type = $at('Event','sys::Obj',[],8192);
  fan.dom.HttpReq.$type = $at('HttpReq','sys::Obj',[],8192);
  fan.dom.HttpRes.$type = $at('HttpRes','sys::Obj',[],8192);
  fan.dom.Storage.$type = $at('Storage','sys::Obj',[],8192);
  fan.dom.Win.$type = $at('Win','sys::Obj',[],8192);
  fan.dom.DomTestClient.$type = $at('DomTestClient','sys::Obj',[],128);
  fan.dom.Doc.$type.$af('title',8704,'sys::Str').$am('make',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('body',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('elem',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('id','sys::Str',false)])).$am('createElem',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tagName','sys::Str',false),new fan.sys.Param('attrib','[sys::Str:sys::Str]?',true)])).$am('cookies',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('addCookie',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','web::Cookie',false)])).$am('getCookiesStr',2560,fan.sys.List.make(fan.sys.Param.$type,[])).$am('addCookieStr',2560,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','sys::Str',false)]));
  fan.dom.Elem.$type.$af('id',8704,'sys::Str').$af('name',8704,'sys::Str').$af('className',8704,'sys::Str').$af('html',8704,'sys::Str').$af('val',8704,'sys::Obj?').$af('checked',8704,'sys::Bool?').$af('enabled',8704,'sys::Bool?').$af('pos',8704,'gfx::Point').$af('size',8704,'gfx::Size').$af('bounds',8192,'gfx::Rect').$am('make',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('tagName',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hasClassName',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('className','sys::Str',false)])).$am('addClassName',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('className','sys::Str',false)])).$am('removeClassName',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('className','sys::Str',false)])).$am('get',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('def','sys::Obj?',true)])).$am('set',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('val','sys::Obj?',false)])).$am('parent',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('children',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('first',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('prev',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('next',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('add',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('child','dom::Elem',false)])).$am('remove',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('child','dom::Elem',false)])).$am('focus',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('find',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|dom::Elem->sys::Bool|',false)])).$am('findAll',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|dom::Elem->sys::Bool|',false)])).$am('onEvent',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Str',false),new fan.sys.Param('useCapture','sys::Bool',false),new fan.sys.Param('handler','|dom::Event->sys::Void|',false)]));
  fan.dom.Event.$type.$af('button',8704,'sys::Int?').$af('meta',73728,'[sys::Str:sys::Obj?]').$am('make',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('target',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('x',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('y',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('alt',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('ctrl',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('shift',8704,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.dom.HttpReq.$type.$af('uri',73728,'sys::Uri').$af('headers',73728,'[sys::Str:sys::Str]').$af('async',73728,'sys::Bool').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',false)])).$am('send',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('method','sys::Str',false),new fan.sys.Param('content','sys::Str',false),new fan.sys.Param('c','|dom::HttpRes->sys::Void|',false)])).$am('get',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|dom::HttpRes->sys::Void|',false)])).$am('post',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('content','sys::Str',false),new fan.sys.Param('c','|dom::HttpRes->sys::Void|',false)])).$am('postForm',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('form','[sys::Str:sys::Str]',false),new fan.sys.Param('c','|dom::HttpRes->sys::Void|',false)])).$am('encodeForm',2560,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('form','[sys::Str:sys::Str]',false)]));
  fan.dom.HttpRes.$type.$af('status',73728,'sys::Int').$af('headers',73728,'[sys::Str:sys::Str]').$af('content',73728,'sys::Str').$am('make',2052,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.dom.Storage.$type.$am('make',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('size',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('key',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)])).$am('get',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Str',false)])).$am('set',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Str',false),new fan.sys.Param('val','sys::Obj',false)])).$am('remove',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Str',false)])).$am('clear',8704,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.dom.Win.$type.$am('make',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('cur',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('doc',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('alert',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)])).$am('viewport',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('uri',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hyperlink',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false)])).$am('reload',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('force','sys::Bool',true)])).$am('onEvent',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Str',false),new fan.sys.Param('useCapture','sys::Bool',false),new fan.sys.Param('handler','|dom::Event->sys::Void|',false)])).$am('sessionStorage',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localStorage',8704,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.dom.DomTestClient.$type.$af('verifies',73728,'sys::Int').$am('testAttrs',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('testBasics',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('testCreate',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('verify',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('v','sys::Bool',false)])).$am('verifyEq',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Obj?',false),new fan.sys.Param('b','sys::Obj?',false)])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
}
