fan.fwt = {};
fan.fwt.Widget = fan.sys.Obj.$extend(fan.sys.Obj);
fan.fwt.Widget.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.fwt.WidgetPeer(this);
  var $this = this;
  this.m_layout = null;
  this.m_onKeyDown = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.fwt.EventListeners.make(),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::EventListeners",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_onModify = fan.sys.Func.make(
        fan.sys.List.make(fan.sys.Param.$type, []),
        fan.sys.Void.$type,
        function()
        {
          $this.checkKeyListeners();
          return;
        });
      return;
    })),fan.fwt.EventListeners.$type);
  this.m_onKeyUp = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.fwt.EventListeners.make(),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::EventListeners",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_onModify = fan.sys.Func.make(
        fan.sys.List.make(fan.sys.Param.$type, []),
        fan.sys.Void.$type,
        function()
        {
          $this.checkKeyListeners();
          return;
        });
      return;
    })),fan.fwt.EventListeners.$type);
  this.m_onMouseDown = fan.fwt.EventListeners.make();
  this.m_onMouseUp = fan.fwt.EventListeners.make();
  this.m_onMouseEnter = fan.fwt.EventListeners.make();
  this.m_onMouseExit = fan.fwt.EventListeners.make();
  this.m_onMouseHover = fan.fwt.EventListeners.make();
  this.m_onMouseMove = fan.fwt.EventListeners.make();
  this.m_onMouseWheel = fan.fwt.EventListeners.make();
  this.m_onFocus = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.fwt.EventListeners.make(),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::EventListeners",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_onModify = fan.sys.Func.make(
        fan.sys.List.make(fan.sys.Param.$type, []),
        fan.sys.Void.$type,
        function()
        {
          $this.checkFocusListeners();
          return;
        });
      return;
    })),fan.fwt.EventListeners.$type);
  this.m_onBlur = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.fwt.EventListeners.make(),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::EventListeners",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_onModify = fan.sys.Func.make(
        fan.sys.List.make(fan.sys.Param.$type, []),
        fan.sys.Void.$type,
        function()
        {
          $this.checkFocusListeners();
          return;
        });
      return;
    })),fan.fwt.EventListeners.$type);
  this.m_kids = fan.sys.List.make(fan.fwt.Widget.$type);
  return;
}
fan.fwt.Widget.prototype.$typeof = function() { return fan.fwt.Widget.$type; }
fan.fwt.Widget.make = function()
{
  var self = new fan.fwt.Widget();
  fan.fwt.Widget.make$(self);
  return self;
}
fan.fwt.Widget.make$ = function(self)
{
  ;
  return;
}
fan.fwt.Widget.prototype.enabled = function()
{
  return this.peer.enabled(this);
}
fan.fwt.Widget.prototype.enabled$ = function(it)
{
  return this.peer.enabled$(this,it);
}
fan.fwt.Widget.prototype.visible = function()
{
  return this.peer.visible(this);
}
fan.fwt.Widget.prototype.visible$ = function(it)
{
  return this.peer.visible$(this,it);
}
fan.fwt.Widget.prototype.layout = function()
{
  return this.m_layout;
}
fan.fwt.Widget.prototype.layout$ = function(it)
{
  this.m_layout = it;
  return;
}
fan.fwt.Widget.prototype.onKeyDown = function()
{
  return this.m_onKeyDown;
}
fan.fwt.Widget.prototype.onKeyDown$ = function(it)
{
  this.m_onKeyDown = it;
  return;
}
fan.fwt.Widget.prototype.checkKeyListeners = function()
{
  return this.peer.checkKeyListeners(this);
}
fan.fwt.Widget.prototype.onKeyUp = function()
{
  return this.m_onKeyUp;
}
fan.fwt.Widget.prototype.onKeyUp$ = function(it)
{
  this.m_onKeyUp = it;
  return;
}
fan.fwt.Widget.prototype.onMouseDown = function()
{
  return this.m_onMouseDown;
}
fan.fwt.Widget.prototype.onMouseDown$ = function(it)
{
  this.m_onMouseDown = it;
  return;
}
fan.fwt.Widget.prototype.onMouseUp = function()
{
  return this.m_onMouseUp;
}
fan.fwt.Widget.prototype.onMouseUp$ = function(it)
{
  this.m_onMouseUp = it;
  return;
}
fan.fwt.Widget.prototype.onMouseEnter = function()
{
  return this.m_onMouseEnter;
}
fan.fwt.Widget.prototype.onMouseEnter$ = function(it)
{
  this.m_onMouseEnter = it;
  return;
}
fan.fwt.Widget.prototype.onMouseExit = function()
{
  return this.m_onMouseExit;
}
fan.fwt.Widget.prototype.onMouseExit$ = function(it)
{
  this.m_onMouseExit = it;
  return;
}
fan.fwt.Widget.prototype.onMouseHover = function()
{
  return this.m_onMouseHover;
}
fan.fwt.Widget.prototype.onMouseHover$ = function(it)
{
  this.m_onMouseHover = it;
  return;
}
fan.fwt.Widget.prototype.onMouseMove = function()
{
  return this.m_onMouseMove;
}
fan.fwt.Widget.prototype.onMouseMove$ = function(it)
{
  this.m_onMouseMove = it;
  return;
}
fan.fwt.Widget.prototype.onMouseWheel = function()
{
  return this.m_onMouseWheel;
}
fan.fwt.Widget.prototype.onMouseWheel$ = function(it)
{
  this.m_onMouseWheel = it;
  return;
}
fan.fwt.Widget.prototype.onFocus = function()
{
  return this.m_onFocus;
}
fan.fwt.Widget.prototype.onFocus$ = function(it)
{
  this.m_onFocus = it;
  return;
}
fan.fwt.Widget.prototype.checkFocusListeners = function()
{
  return this.peer.checkFocusListeners(this);
}
fan.fwt.Widget.prototype.onBlur = function()
{
  return this.m_onBlur;
}
fan.fwt.Widget.prototype.onBlur$ = function(it)
{
  this.m_onBlur = it;
  return;
}
fan.fwt.Widget.prototype.hasFocus = function()
{
  return this.peer.hasFocus(this);
}
fan.fwt.Widget.prototype.focus = function()
{
  return this.peer.focus(this);
}
fan.fwt.Widget.prototype.pos = function()
{
  return this.peer.pos(this);
}
fan.fwt.Widget.prototype.pos$ = function(it)
{
  return this.peer.pos$(this,it);
}
fan.fwt.Widget.prototype.size = function()
{
  return this.peer.size(this);
}
fan.fwt.Widget.prototype.size$ = function(it)
{
  return this.peer.size$(this,it);
}
fan.fwt.Widget.prototype.bounds = function()
{
  return fan.gfx.Rect.makePosSize(this.pos(),this.size());
}
fan.fwt.Widget.prototype.bounds$ = function(it)
{
  this.pos$(it.pos());
  this.size$(it.size());
  return;
}
fan.fwt.Widget.prototype.posOnDisplay = function()
{
  return this.peer.posOnDisplay(this);
}
fan.fwt.Widget.prototype.parent = function()
{
  return this.m_parent;
}
fan.fwt.Widget.prototype.parent$ = function(it)
{
  this.m_parent = it;
  return;
}
fan.fwt.Widget.prototype.setParent = function(p)
{
  this.m_parent = p;
  return;
}
fan.fwt.Widget.prototype.window = function()
{
  var x = this;
  while (x != null)
  {
    if (fan.sys.ObjUtil.is(x,fan.fwt.Window.$type))
    {
      return fan.sys.ObjUtil.coerce(x,fan.fwt.Window.$type);
    }
    ;
    x = x.m_parent;
  }
  ;
  return null;
}
fan.fwt.Widget.prototype.each = function(f)
{
  this.m_kids.each(f);
  return;
}
fan.fwt.Widget.prototype.children = function()
{
  return this.m_kids.ro();
}
fan.fwt.Widget.prototype.add = function(child)
{
  if (child == null)
  {
    return this;
  }
  ;
  if (child.m_parent != null)
  {
    throw fan.sys.ArgErr.make(fan.sys.Str.plus("Child already parented: ",child));
  }
  ;
  child.m_parent = this;
  this.m_kids.add(fan.sys.ObjUtil.coerce(child,fan.fwt.Widget.$type));
  try
  {
    child.attach();
  }
  catch ($_u5)
  {
    $_u5 = fan.sys.Err.make($_u5);
    if ($_u5 instanceof fan.sys.Err)
    {
      var e = $_u5;
      var e;
      e.trace();
    }
    else
    {
      throw $_u5;
    }
  }
  ;
  return this;
}
fan.fwt.Widget.prototype.remove = function(child)
{
  if (child == null)
  {
    return this;
  }
  ;
  try
  {
    child.detach();
  }
  catch ($_u6)
  {
    $_u6 = fan.sys.Err.make($_u6);
    if ($_u6 instanceof fan.sys.Err)
    {
      var e = $_u6;
      var e;
      e.trace();
    }
    else
    {
      throw $_u6;
    }
  }
  ;
  if (this.m_kids.removeSame(fan.sys.ObjUtil.coerce(child,fan.fwt.Widget.$type)) == null)
  {
    throw fan.sys.ArgErr.make(fan.sys.Str.plus("not my child: ",child));
  }
  ;
  child.m_parent = null;
  return this;
}
fan.fwt.Widget.prototype.removeAll = function()
{
  var $this = this;
  this.m_kids.dup().each(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("kid","fwt::Widget",false)]),
    fan.sys.Void.$type,
    function(kid)
    {
      $this.remove(kid);
      return;
    }));
  return this;
}
fan.fwt.Widget.prototype.relayout = function()
{
  return this.peer.relayout(this);
}
fan.fwt.Widget.prototype.pack = function()
{
  return this.peer.pack(this);
}
fan.fwt.Widget.prototype.prefSize = function(hints)
{
  if (hints === undefined) hints = fan.gfx.Hints.m_defVal;
  return this.peer.prefSize(this,hints);
}
fan.fwt.Widget.prototype.repaint = function(dirty)
{
  if (dirty === undefined) dirty = null;
  return this.peer.repaint(this,dirty);
}
fan.fwt.Widget.prototype.attached = function()
{
  return this.peer.attached(this);
}
fan.fwt.Widget.prototype.attach = function()
{
  return this.peer.attach(this);
}
fan.fwt.Widget.prototype.detach = function()
{
  return this.peer.detach(this);
}
fan.fwt.Widget.prototype.kids = function()
{
  return this.m_kids;
}
fan.fwt.Widget.prototype.kids$ = function(it)
{
  this.m_kids = it;
  return;
}
fan.fwt.Widget.prototype.m_layout = null;
fan.fwt.Widget.prototype.m_onKeyDown = null;
fan.fwt.Widget.prototype.m_onKeyUp = null;
fan.fwt.Widget.prototype.m_onMouseDown = null;
fan.fwt.Widget.prototype.m_onMouseUp = null;
fan.fwt.Widget.prototype.m_onMouseEnter = null;
fan.fwt.Widget.prototype.m_onMouseExit = null;
fan.fwt.Widget.prototype.m_onMouseHover = null;
fan.fwt.Widget.prototype.m_onMouseMove = null;
fan.fwt.Widget.prototype.m_onMouseWheel = null;
fan.fwt.Widget.prototype.m_onFocus = null;
fan.fwt.Widget.prototype.m_onBlur = null;
fan.fwt.Widget.prototype.m_bounds = null;
fan.fwt.Widget.prototype.m_parent = null;
fan.fwt.Widget.prototype.m_kids = null;
fan.fwt.WidgetPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.fwt.WidgetPeer.prototype.$ctor = function(self) {}
fan.fwt.WidgetPeer.prototype.repaint = function(self)
{
  this.sync(self);
}
fan.fwt.WidgetPeer.prototype.relayout = function(self)
{
  // short-circuit if not mounted
  if (this.elem == null) return;
  this.sync(self);
  if (self.onLayout) self.onLayout();
  var kids = self.m_kids;
  for (var i=0; i<kids.size(); i++)
  {
    var kid = kids.get(i);
    kid.peer.relayout(kid);
  }
  return self;
}
fan.fwt.WidgetPeer.prototype.posOnDisplay = function(self)
{
  var x = this.m_pos.m_x;
  var y = this.m_pos.m_y;
  var p = self.parent();
  while (p != null)
  {
    if (p instanceof fan.fwt.Tab) p = p.parent();
    x += p.peer.m_pos.m_x - p.peer.elem.scrollLeft;
    y += p.peer.m_pos.m_y - p.peer.elem.scrollTop;
    if (p instanceof fan.fwt.Dialog)
    {
      var dlg = p.peer.elem.parentNode;
      x += dlg.offsetLeft;
      y += dlg.offsetTop;
    }
    p = p.parent();
  }
  return fan.gfx.Point.make(x, y);
}
fan.fwt.WidgetPeer.prototype.prefSize = function(self, hints)
{
  // cache size
  var oldw = this.elem.style.width;
  var oldh = this.elem.style.height;
  // sync and measure pref
  this.sync(self);
  this.elem.style.width  = "auto";
  this.elem.style.height = "auto";
  var pw = this.elem.offsetWidth;
  var ph = this.elem.offsetHeight;
  // restore old size
  this.elem.style.width  = oldw;
  this.elem.style.height = oldh;
  return fan.gfx.Size.make(pw, ph);
}
fan.fwt.WidgetPeer.prototype.pack = function(self)
{
  var pref = self.prefSize();
  self.size$(fan.gfx.Size.make(pref.m_w, pref.m_h));
  self.relayout();
  return self;
}
fan.fwt.WidgetPeer.prototype.enabled = function(self) { return this.m_enabled; }
fan.fwt.WidgetPeer.prototype.enabled$ = function(self, val)
{
  this.m_enabled = val;
  if (this.elem != null) this.sync(self);
}
fan.fwt.WidgetPeer.prototype.m_enabled = true;
fan.fwt.WidgetPeer.prototype.visible = function(self) { return this.m_visible; }
fan.fwt.WidgetPeer.prototype.visible$ = function(self, val) { this.m_visible = val; }
fan.fwt.WidgetPeer.prototype.m_visible = true;
fan.fwt.WidgetPeer.prototype.pos = function(self) { return this.m_pos; }
fan.fwt.WidgetPeer.prototype.pos$ = function(self, val) { this.m_pos = val; }
fan.fwt.WidgetPeer.prototype.m_pos = fan.gfx.Point.make(0,0);
fan.fwt.WidgetPeer.prototype.size = function(self) { return this.m_size; }
fan.fwt.WidgetPeer.prototype.size$ = function(self, val) { this.m_size = val; }
fan.fwt.WidgetPeer.prototype.m_size = fan.gfx.Size.make(0,0);
fan.fwt.WidgetPeer.prototype.focus = function(self)
{
}
fan.fwt.WidgetPeer.prototype.attached = function(self)
{
}
fan.fwt.WidgetPeer.prototype.attach = function(self)
{
  // short circuit if I'm already attached
  if (this.elem != null) return;
  // short circuit if my parent isn't attached
  var parent = self.m_parent;
  if (parent == null || parent.peer.elem == null) return;
  // create control and initialize
  var elem = this.create(parent.peer.elem, self);
  this.attachTo(self, elem);
  // callback on parent
  //parent.peer.childAdded(self);
}
fan.fwt.WidgetPeer.prototype.attachTo = function(self, elem)
{
  // sync to elem
  this.elem = elem;
  this.sync(self);
  this.attachEvents(self, fan.fwt.EventId.m_mouseEnter, elem, "mouseover",  self.m_onMouseEnter.list());
  this.attachEvents(self, fan.fwt.EventId.m_mouseExit,  elem, "mouseout",   self.m_onMouseExit.list());
  this.attachEvents(self, fan.fwt.EventId.m_mouseDown,  elem, "mousedown",  self.m_onMouseDown.list());
  this.attachEvents(self, fan.fwt.EventId.m_mouseMove,  elem, "mousemove",  self.m_onMouseMove.list());
  this.attachEvents(self, fan.fwt.EventId.m_mouseUp,    elem, "mouseup",    self.m_onMouseUp.list());
  //this.attachEvents(self, fan.fwt.EventId.m_mouseHover, elem, "mousehover", self.m_onMouseHover.list());
  //this.attachEvents(self, fan.fwt.EventId.m_mouseWheel, elem, "mousewheel", self.m_onMouseWheel.list());
  // recursively attach my children
  var kids = self.m_kids;
  for (var i=0; i<kids.size(); i++)
  {
    var kid = kids.get(i);
    kid.peer.attach(kid);
  }
}
fan.fwt.WidgetPeer.prototype.attachEvents = function(self, evtId, elem, event, list)
{
  var peer = this;
  for (var i=0; i<list.size(); i++)
  {
    var meth = list.get(i);
    var func = function(e)
    {
      // find pos relative to widget
      var dis = peer.posOnDisplay(self);
      var rel = fan.gfx.Point.make(e.clientX-dis.m_x, e.clientY-dis.m_y);
      // TODO - need to fix for IE
      // TODO - only valid for mouseDown - so need to clean up this code
      var evt = fan.fwt.Event.make();
      evt.m_id = evtId;
      evt.m_pos = rel;
      evt.m_widget = self;
      //evt.count =
      evt.m_key = fan.fwt.WidgetPeer.toKey(e);
      meth.call(evt);
      return false;
    }
    if (elem.addEventListener)
      elem.addEventListener(event, func, false);
    else
      elem.attachEvent("on"+event, func);
  }
}
fan.fwt.WidgetPeer.toKey = function(event)
{
  // find primary key
  var key = null;
  if (event.keyCode != null && event.keyCode > 0)
    key = fan.fwt.WidgetPeer.keyCodeToKey(event.keyCode);
  if (event.shiftKey)   key = key==null ? fan.fwt.Key.m_shift : key.plus(fan.fwt.Key.m_shift);
  if (event.altKey)     key = key==null ? fan.fwt.Key.m_alt   : key.plus(fan.fwt.Key.m_alt);
  if (event.ctrlKey)    key = key==null ? fan.fwt.Key.m_ctrl  : key.plus(fan.fwt.Key.m_ctrl);
  // TODO FIXIT
  //if (event.commandKey) key = key.plus(Key.command);
  return key;
}
fan.fwt.WidgetPeer.keyCodeToKey = function(keyCode)
{
  // TODO FIXIT: map rest of non-alpha keys
  switch (keyCode)
  {
    case 38: return fan.fwt.Key.m_up;
    case 40: return fan.fwt.Key.m_down;
    case 37: return fan.fwt.Key.m_left;
    case 39: return fan.fwt.Key.m_right;
    default: return fan.fwt.Key.fromMask(keyCode);
  }
}
fan.fwt.WidgetPeer.prototype.checkKeyListeners = function(self) {}
fan.fwt.WidgetPeer.prototype.create = function(parentElem, self)
{
  var div = this.emptyDiv();
  parentElem.appendChild(div);
  return div;
}
fan.fwt.WidgetPeer.prototype.emptyDiv = function()
{
  var div = document.createElement("div");
  with (div.style)
  {
    position = "absolute";
    overflow = "hidden";
    top  = "0";
    left = "0";
  }
  return div;
}
fan.fwt.WidgetPeer.prototype.detach = function(self)
{
  // recursively detach my children
  var kids = self.m_kids;
  for (var i=0; i<kids.size(); i++)
  {
    var kid = kids.get(i);
    kid.peer.detach(kid);
  }
  // detach myself
  var elem = self.peer.elem;
  if (elem != null)
    elem.parentNode.removeChild(elem);
  delete self.peer.elem;
}
fan.fwt.WidgetPeer.prototype.sync = function(self, w, h)  // w,h override
{
  with (this.elem.style)
  {
    if (w === undefined) w = this.m_size.m_w;
    if (h === undefined) h = this.m_size.m_h;
    // TEMP fix for IE
    if (w < 0) w = 0;
    if (h < 0) h = 0;
    display = this.m_visible ? "block" : "none";
    left    = this.m_pos.m_x  + "px";
    top     = this.m_pos.m_y  + "px";
    width   = w + "px";
    height  = h + "px";
  }
}
fan.fwt.WidgetPeer.fontToCss = function(font)
{
  var s = "";
  if (font.m_bold)   s += "bold ";
  if (font.m_italic) s += "italic ";
  s += font.m_size + "px ";
  s += font.m_name;
  return s;
}
fan.fwt.WidgetPeer.uriToImageSrc = function(uri)
{
  if (uri.scheme() == "fan")
    return fan.sys.UriPodBase + uri.host() + uri.pathStr()
  else
    return uri.toStr();
}
fan.fwt.WidgetPeer.addCss = function(css)
{
  var style = document.createElement("style");
  style.type = "text/css";
  if (style.styleSheet) style.styleSheet.cssText = css;
  else style.appendChild(document.createTextNode(css));
  document.getElementsByTagName("head")[0].appendChild(style);
}
fan.fwt.WidgetPeer.setBg = function(elem, brush)
{
  var style = elem.style;
  if (brush == null) { style.background = "none"; return; }
  if (brush instanceof fan.gfx.Color) { style.background = brush.toCss(); return; }
  if (brush instanceof fan.gfx.Gradient)
  {
    var std    = "";  // CSS3 format
    var webkit = "";  // -webkit format
    // TODO FIXIT:
    var angle = "-90deg";
    // build pos
    std += brush.m_x1 + brush.m_x1Unit.symbol() + " " +
           brush.m_y1 + brush.m_y1Unit.symbol() + " " +
           angle;
    // try to find end-point
    webkit = brush.m_x1 + brush.m_x1Unit.symbol() + " " +
             brush.m_y1 + brush.m_y1Unit.symbol() + "," +
             brush.m_x2 + brush.m_x2Unit.symbol() + " " +
             brush.m_y2 + brush.m_y2Unit.symbol();
    // build stops
    var stops = brush.m_stops;
    for (var i=0; i<stops.size(); i++)
    {
      var stop = stops.get(i);
      var color = stop.m_color.toCss();
      // set background to first stop for fallback if gradeints not supported
      if (i == 0) background = color;
      std    += "," + color + " " + (stop.m_pos * 100) + "%";
      webkit += ",color-stop(" + stop.m_pos + ", " + color + ")";
    }
    // apply styles
    // IE throws here, so trap and use filter in catch
    try
    {
      style.background = "linear-gradient(" + std + ")";
      style.background = "-moz-linear-gradient(" + std + ")";
      style.background = "-webkit-gradient(linear, " + webkit + ")";
    }
    catch (err)
    {
      //filter = "progid:DXImageTransform.Microsoft.Gradient(" +
      //  "StartColorStr=" + c1 + ", EndColorStr=" + c2 + ")";
    }
    return;
  }
  if (brush instanceof fan.gfx.Pattern)
  {
    var str = "";
    var bg  = brush.m_bg;
    if (bg != null) str += bg.toCss() + ' ';
    str += 'url(' + brush.m_image.m_uri + ') repeat-x';
    style.background = str;
    return;
  }
}
fan.fwt.Pane = fan.sys.Obj.$extend(fan.fwt.Widget);
fan.fwt.Pane.prototype.$ctor = function()
{
  fan.fwt.Widget.prototype.$ctor.call(this);
  this.peer = new fan.fwt.PanePeer(this);
  var $this = this;
}
fan.fwt.Pane.prototype.$typeof = function() { return fan.fwt.Pane.$type; }
fan.fwt.Pane.prototype.dummyPane = function()
{
  return this.peer.dummyPane(this);
}
fan.fwt.Pane.make = function()
{
  var self = new fan.fwt.Pane();
  fan.fwt.Pane.make$(self);
  return self;
}
fan.fwt.Pane.make$ = function(self)
{
  fan.fwt.Widget.make$(self);
  return;
}
fan.fwt.PanePeer = fan.sys.Obj.$extend(fan.fwt.WidgetPeer);
fan.fwt.PanePeer.prototype.$ctor = function(self) {}
fan.fwt.BorderPane = fan.sys.Obj.$extend(fan.fwt.Pane);
fan.fwt.BorderPane.prototype.$ctor = function()
{
  fan.fwt.Pane.prototype.$ctor.call(this);
  this.peer = new fan.fwt.BorderPanePeer(this);
  var $this = this;
  this.m_border = fan.sys.ObjUtil.coerce(fan.gfx.Border.fromStr("0"),fan.gfx.Border.$type);
  this.m_bg = null;
  this.m_insets = fan.gfx.Insets.make(0,fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()));
  return;
}
fan.fwt.BorderPane.prototype.$typeof = function() { return fan.fwt.BorderPane.$type; }
fan.fwt.BorderPane.prototype.border = function()
{
  return this.m_border;
}
fan.fwt.BorderPane.prototype.border$ = function(it)
{
  this.m_border = it;
  return;
}
fan.fwt.BorderPane.prototype.bg = function()
{
  return this.m_bg;
}
fan.fwt.BorderPane.prototype.bg$ = function(it)
{
  this.m_bg = it;
  return;
}
fan.fwt.BorderPane.prototype.insets = function()
{
  return this.m_insets;
}
fan.fwt.BorderPane.prototype.insets$ = function(it)
{
  this.m_insets = it;
  return;
}
fan.fwt.BorderPane.prototype.content = function()
{
  return this.m_content;
}
fan.fwt.BorderPane.prototype.content$ = function(it)
{
  this.remove(this.m_content);
  fan.fwt.Widget.prototype.add.call(this,it);
  this.m_content = it;
  return;
}
fan.fwt.BorderPane.prototype.add = function(child)
{
  if (this.m_content == null)
  {
    this.m_content = child;
  }
  ;
  fan.fwt.Pane.prototype.add.call(this,child);
  return this;
}
fan.fwt.BorderPane.prototype.prefSize = function(hints)
{
  if (hints === undefined) hints = fan.gfx.Hints.m_defVal;
  var edgew = fan.sys.Int.plus(fan.sys.Int.plus(fan.sys.Int.plus(this.m_border.m_widthLeft,this.m_insets.m_left),this.m_insets.m_right),this.m_border.m_widthRight);
  var edgeh = fan.sys.Int.plus(fan.sys.Int.plus(fan.sys.Int.plus(this.m_border.m_widthTop,this.m_insets.m_top),this.m_insets.m_bottom),this.m_border.m_widthBottom);
  var edge = fan.gfx.Size.make(edgew,edgeh);
  if (this.content() == null)
  {
    return edge;
  }
  ;
  var pref = this.content().prefSize(hints.minus(edge));
  return fan.gfx.Size.make(fan.sys.Int.plus(pref.m_w,edgew),fan.sys.Int.plus(pref.m_h,edgeh));
}
fan.fwt.BorderPane.prototype.onLayout = function()
{
  if (this.content() == null)
  {
    return;
  }
  ;
  var size = this.size();
  this.content().bounds$(fan.gfx.Rect.make(fan.sys.Int.plus(this.m_border.m_widthLeft,this.m_insets.m_left),fan.sys.Int.plus(this.m_border.m_widthTop,this.m_insets.m_top),fan.sys.Int.minus(fan.sys.Int.minus(fan.sys.Int.minus(fan.sys.Int.minus(size.m_w,this.m_border.m_widthLeft),this.m_insets.m_left),this.m_insets.m_right),this.m_border.m_widthRight),fan.sys.Int.minus(fan.sys.Int.minus(fan.sys.Int.minus(fan.sys.Int.minus(size.m_h,this.m_border.m_widthTop),this.m_insets.m_top),this.m_insets.m_bottom),this.m_border.m_widthBottom)));
  return;
}
fan.fwt.BorderPane.prototype.onPaint = function(g)
{
  var $this = this;
  var w = this.size().m_w;
  var h = this.size().m_h;
  var shade = fan.sys.Float.make(0.3);
  if (this.m_bg != null)
  {
    g.brush$(fan.sys.ObjUtil.coerce(this.m_bg,fan.gfx.Brush.$type));
    g.fillRect(0,0,w,h);
  }
  ;
  if (fan.sys.ObjUtil.compareGT(this.m_border.m_widthLeft,0))
  {
    g.pen$(fan.gfx.Pen.make(fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
      fan.sys.Void.$type,
      function(it)
      {
        it.m_width = $this.m_border.m_widthLeft;
        return;
      })));
    var $_u7 = this.m_border.m_styleLeft;
    if (fan.sys.ObjUtil.equals($_u7,fan.gfx.Border.m_styleInset))
    {
      g.brush$(this.m_border.m_colorLeft.darker(shade));
    }
    else if (fan.sys.ObjUtil.equals($_u7,fan.gfx.Border.m_styleOutset))
    {
      g.brush$(this.m_border.m_colorLeft.lighter(shade));
    }
    else
    {
      g.brush$(this.m_border.m_colorLeft);
    }
    ;
    var off = fan.sys.Int.div(this.m_border.m_widthLeft,2);
    var x = off;
    g.drawLine(x,fan.sys.Int.plus(this.m_border.m_radiusTopLeft,off),x,fan.sys.Int.minus(fan.sys.Int.minus(h,this.m_border.m_radiusBottomLeft),off));
  }
  ;
  if (fan.sys.ObjUtil.compareGT(this.m_border.m_widthRight,0))
  {
    g.pen$(fan.gfx.Pen.make(fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
      fan.sys.Void.$type,
      function(it)
      {
        it.m_width = $this.m_border.m_widthRight;
        return;
      })));
    var $_u8 = this.m_border.m_styleRight;
    if (fan.sys.ObjUtil.equals($_u8,fan.gfx.Border.m_styleInset))
    {
      g.brush$(this.m_border.m_colorRight.lighter(shade));
    }
    else if (fan.sys.ObjUtil.equals($_u8,fan.gfx.Border.m_styleOutset))
    {
      g.brush$(this.m_border.m_colorRight.darker(shade));
    }
    else
    {
      g.brush$(this.m_border.m_colorRight);
    }
    ;
    var off = fan.sys.Int.div(this.m_border.m_widthRight,2);
    if (fan.sys.Int.isOdd(this.m_border.m_widthRight))
    {
      off = fan.sys.Int.increment(off);
    }
    ;
    var x = fan.sys.Int.minus(w,off);
    g.drawLine(x,fan.sys.Int.plus(this.m_border.m_radiusTopRight,off),x,fan.sys.Int.minus(fan.sys.Int.minus(h,this.m_border.m_radiusBottomRight),off));
  }
  ;
  if (fan.sys.ObjUtil.compareGT(this.m_border.m_widthTop,0))
  {
    g.pen$(fan.gfx.Pen.make(fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
      fan.sys.Void.$type,
      function(it)
      {
        it.m_width = $this.m_border.m_widthTop;
        return;
      })));
    var $_u9 = this.m_border.m_styleTop;
    if (fan.sys.ObjUtil.equals($_u9,fan.gfx.Border.m_styleInset))
    {
      g.brush$(this.m_border.m_colorTop.darker(shade));
    }
    else if (fan.sys.ObjUtil.equals($_u9,fan.gfx.Border.m_styleOutset))
    {
      g.brush$(this.m_border.m_colorTop.lighter(shade));
    }
    else
    {
      g.brush$(this.m_border.m_colorTop);
    }
    ;
    var off = fan.sys.Int.div(this.m_border.m_widthTop,2);
    var y = off;
    g.drawLine(fan.sys.Int.plus(this.m_border.m_radiusTopLeft,off),y,fan.sys.Int.minus(fan.sys.Int.minus(w,this.m_border.m_radiusTopRight),off),y);
    if (fan.sys.ObjUtil.compareGT(this.m_border.m_radiusTopLeft,0))
    {
      g.drawArc(off,off,fan.sys.Int.mult(this.m_border.m_radiusTopLeft,2),fan.sys.Int.mult(this.m_border.m_radiusTopLeft,2),90,90);
    }
    ;
    if (fan.sys.ObjUtil.compareGT(this.m_border.m_radiusTopRight,0))
    {
      g.drawArc(fan.sys.Int.minus(fan.sys.Int.minus(fan.sys.Int.minus(w,fan.sys.Int.mult(this.m_border.m_radiusTopRight,2)),off),1),off,fan.sys.Int.mult(this.m_border.m_radiusTopRight,2),fan.sys.Int.mult(this.m_border.m_radiusTopRight,2),0,90);
    }
    ;
  }
  ;
  if (fan.sys.ObjUtil.compareGT(this.m_border.m_widthBottom,0))
  {
    g.pen$(fan.gfx.Pen.make(fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
      fan.sys.Void.$type,
      function(it)
      {
        it.m_width = $this.m_border.m_widthBottom;
        return;
      })));
    var $_u10 = this.m_border.m_styleBottom;
    if (fan.sys.ObjUtil.equals($_u10,fan.gfx.Border.m_styleInset))
    {
      g.brush$(this.m_border.m_colorBottom.lighter(shade));
    }
    else if (fan.sys.ObjUtil.equals($_u10,fan.gfx.Border.m_styleOutset))
    {
      g.brush$(this.m_border.m_colorBottom.darker(shade));
    }
    else
    {
      g.brush$(this.m_border.m_colorBottom);
    }
    ;
    var off = fan.sys.Int.div(this.m_border.m_widthBottom,2);
    if (fan.sys.Int.isOdd(this.m_border.m_widthBottom))
    {
      off = fan.sys.Int.increment(off);
    }
    ;
    var y = fan.sys.Int.minus(h,off);
    g.drawLine(fan.sys.Int.plus(this.m_border.m_radiusBottomLeft,off),y,fan.sys.Int.minus(fan.sys.Int.minus(w,this.m_border.m_radiusBottomRight),off),y);
    if (fan.sys.ObjUtil.compareGT(this.m_border.m_radiusBottomLeft,0))
    {
      g.drawArc(off,fan.sys.Int.minus(fan.sys.Int.minus(h,fan.sys.Int.mult(this.m_border.m_radiusBottomLeft,2)),off),fan.sys.Int.mult(this.m_border.m_radiusBottomLeft,2),fan.sys.Int.mult(this.m_border.m_radiusBottomLeft,2),180,90);
    }
    ;
    if (fan.sys.ObjUtil.compareGT(this.m_border.m_radiusBottomRight,0))
    {
      g.drawArc(fan.sys.Int.minus(fan.sys.Int.minus(w,fan.sys.Int.mult(this.m_border.m_radiusBottomRight,2)),off),fan.sys.Int.minus(fan.sys.Int.minus(h,fan.sys.Int.mult(this.m_border.m_radiusBottomRight,2)),off),fan.sys.Int.mult(this.m_border.m_radiusBottomRight,2),fan.sys.Int.mult(this.m_border.m_radiusBottomRight,2),270,90);
    }
    ;
  }
  ;
  return;
}
fan.fwt.BorderPane.prototype.dummyBorderPane = function()
{
  return this.peer.dummyBorderPane(this);
}
fan.fwt.BorderPane.make = function()
{
  var self = new fan.fwt.BorderPane();
  fan.fwt.BorderPane.make$(self);
  return self;
}
fan.fwt.BorderPane.make$ = function(self)
{
  fan.fwt.Pane.make$(self);
  ;
  return;
}
fan.fwt.BorderPane.prototype.m_border = null;
fan.fwt.BorderPane.prototype.m_bg = null;
fan.fwt.BorderPane.prototype.m_insets = null;
fan.fwt.BorderPane.prototype.m_content = null;
fan.fwt.BorderPanePeer = fan.sys.Obj.$extend(fan.fwt.PanePeer);
fan.fwt.BorderPanePeer.prototype.$ctor = function(self)
{
  fan.fwt.PanePeer.prototype.$ctor.call(this, self);
}
fan.fwt.BorderPane.$isWinChrome = false;
(function() {
  var ua = window.navigator.userAgent;
  if (ua.indexOf("Windows") != -1 && ua.indexOf(" Chrome/") != -1)
    fan.fwt.BorderPane.$isWinChrome = true;
})();
fan.fwt.BorderPanePeer.prototype.relayout = function(self)
{
  // short-circuit if not mounted
  if (this.elem == null) return;
  this.sync(self);
  if (self.onLayout) self.onLayout();
  var b = self.m_border;
  var c = self.m_content;
  if (c != null)
  {
    var cx = c.peer.m_pos.m_x - b.m_widthLeft;
    var cy = c.peer.m_pos.m_y - b.m_widthTop;
    c.pos$(fan.gfx.Point.make(cx, cy));
    c.peer.relayout(c);
  }
  return self;
}
fan.fwt.BorderPanePeer.prototype.sync = function(self)
{
  var b = self.m_border;
  fan.fwt.WidgetPeer.setBg(this.elem, self.m_bg);
  with (this.elem.style)
  {
    borderStyle = "solid";
    borderTopWidth    = b.m_widthTop    + "px";
    borderRightWidth  = b.m_widthRight  + "px";
    borderBottomWidth = b.m_widthBottom + "px";
    borderLeftWidth   = b.m_widthLeft   + "px";
    borderTopColor    = b.m_colorTop.toCss();
    borderRightColor  = b.m_colorRight.toCss();
    borderBottomColor = b.m_colorBottom.toCss();
    borderLeftColor   = b.m_colorLeft.toCss();
    if (this.elem.style.MozBorderRadius != undefined)
    {
      MozBorderRadiusTopleft     = b.m_radiusTopLeft + "px";
      MozBorderRadiusTopright    = b.m_radiusTopRight + "px";
      MozBorderRadiusBottomright = b.m_radiusBottomRight + "px";
      MozBorderRadiusBottomleft  = b.m_radiusBottomLeft + "px";
    }
    else if (this.elem.style.webkitBorderRadius != undefined)
    {
      webkitBorderTopLeftRadius     = b.m_radiusTopLeft + "px";
      webkitBorderTopRightRadius    = b.m_radiusTopRight + "px";
      webkitBorderBottomRightRadius = b.m_radiusBottomRight + "px";
      webkitBorderBottomLeftRadius  = b.m_radiusBottomLeft + "px";
    }
  }
  // override style
  var override = this.$style(self);
  if (override != null)
  {
    s = this.elem.style;
    for (var k in override.keyMap)
    {
      var key = override.keyMap[k];
      var val = override.valMap[k];
      // skip for Chrome until working properly
      if (fan.fwt.BorderPane.$isWinChrome)
      {
        if (key == "-webkit-box-shadow")
        {
          var temp = "";
          var list = val.split(",")
          for (var i=0; i<list.length; i++)
          {
            if (temp.length > 0) temp += ",";
            if (list[i].indexOf("inset") == -1)
              temp += list[i];
          }
          if (temp.length == 0) continue;
          val = temp;
        }
      }
      s.setProperty(key, val, "");
    }
  }
  // sync size
  var w = this.m_size.m_w - b.m_widthLeft - b.m_widthRight;
  var h = this.m_size.m_h - b.m_widthTop - b.m_widthBottom;
  fan.fwt.WidgetPeer.prototype.sync.call(this, self, w, h);
}
fan.fwt.BorderPanePeer.prototype.$style = function(self) { return null; }
fan.fwt.Button = fan.sys.Obj.$extend(fan.fwt.Widget);
fan.fwt.Button.prototype.$ctor = function()
{
  fan.fwt.Widget.prototype.$ctor.call(this);
  this.peer = new fan.fwt.ButtonPeer(this);
  var $this = this;
  this.m_onAction = fan.fwt.EventListeners.make();
  this.m_mode = fan.fwt.ButtonMode.m_push;
  this.m_insets = fan.fwt.Button.m_defInsets;
  return;
}
fan.fwt.Button.prototype.$typeof = function() { return fan.fwt.Button.$type; }
fan.fwt.Button.make = function(f)
{
  var self = new fan.fwt.Button();
  fan.fwt.Button.make$(self,f);
  return self;
}
fan.fwt.Button.make$ = function(self,f)
{
  if (f === undefined) f = null;
  fan.fwt.Widget.make$(self);
  ;
  if (f != null)
  {
    f.call(self);
  }
  ;
  return;
}
fan.fwt.Button.makeCommand = function(c,f)
{
  var self = new fan.fwt.Button();
  fan.fwt.Button.makeCommand$(self,c,f);
  return self;
}
fan.fwt.Button.makeCommand$ = function(self,c,f)
{
  if (f === undefined) f = null;
  fan.fwt.Widget.make$(self);
  ;
  if (f != null)
  {
    f.call(self);
  }
  ;
  self.m_mode = c.m_mode.toButtonMode();
  self.command$(c);
  return;
}
fan.fwt.Button.prototype.onAction = function()
{
  return this.m_onAction;
}
fan.fwt.Button.prototype.onAction$ = function(it)
{
  this.m_onAction = it;
  return;
}
fan.fwt.Button.prototype.selected = function()
{
  return this.peer.selected(this);
}
fan.fwt.Button.prototype.selected$ = function(it)
{
  return this.peer.selected$(this,it);
}
fan.fwt.Button.prototype.text = function()
{
  return this.peer.text(this);
}
fan.fwt.Button.prototype.text$ = function(it)
{
  return this.peer.text$(this,it);
}
fan.fwt.Button.prototype.image = function()
{
  return this.peer.image(this);
}
fan.fwt.Button.prototype.image$ = function(it)
{
  return this.peer.image$(this,it);
}
fan.fwt.Button.prototype.font = function()
{
  return this.peer.font(this);
}
fan.fwt.Button.prototype.font$ = function(it)
{
  return this.peer.font$(this,it);
}
fan.fwt.Button.prototype.command = function()
{
  return this.m_command;
}
fan.fwt.Button.prototype.command$ = function(it)
{
  var $this = this;
  var newVal = it;
  (function($this) { var $_u11 = $this.m_command; if ($_u11 == null) return null; return $_u11.unregister($this); })(this);
  this.m_command = newVal;
  if (newVal != null)
  {
    this.enabled$(newVal.enabled());
    this.text$(newVal.m_name);
    this.image$(newVal.m_icon);
    this.selected$(newVal.selected());
    this.m_onAction.add(fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("e","fwt::Event",false)]),
      fan.sys.Void.$type,
      function(e)
      {
        newVal.selected$($this.selected());
        newVal.invoke(e);
        return;
      }));
    newVal.register(this);
  }
  ;
  return;
}
fan.fwt.Button.prototype.prefSize = function(hints)
{
  if (hints === undefined) hints = fan.gfx.Hints.m_defVal;
  var pref = fan.fwt.Widget.prototype.prefSize.call(this,hints);
  if ((this.m_mode === fan.fwt.ButtonMode.m_push || this.m_mode === fan.fwt.ButtonMode.m_toggle))
  {
    var i = this.m_insets;
    pref = fan.gfx.Size.make(fan.sys.Int.plus(fan.sys.Int.plus(i.m_left,pref.m_w),i.m_right),fan.sys.Int.plus(fan.sys.Int.plus(i.m_top,pref.m_h),i.m_bottom));
  }
  ;
  return pref;
}
fan.fwt.Button.static$init = function()
{
  fan.fwt.Button.m_defInsets = fan.gfx.Insets.make(0,fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable()));
  return;
}
fan.fwt.Button.prototype.m_onAction = null;
fan.fwt.Button.prototype.m_mode = null;
fan.fwt.Button.prototype.m_insets = null;
fan.fwt.Button.m_defInsets = null;
fan.fwt.Button.prototype.m_command = null;
fan.fwt.ButtonPeer = fan.sys.Obj.$extend(fan.fwt.WidgetPeer);
fan.fwt.ButtonPeer.prototype.$ctor = function(self) {}
fan.fwt.ButtonPeer.prototype.font = function(self) { return this.m_font; }
fan.fwt.ButtonPeer.prototype.font$ = function(self, val) { this.m_font = val; }
fan.fwt.ButtonPeer.prototype.m_font = null;
fan.fwt.ButtonPeer.prototype.image = function(self) { return this.m_image; }
fan.fwt.ButtonPeer.prototype.image$ = function(self, val) { this.m_image = val; }
fan.fwt.ButtonPeer.prototype.m_image = null;
fan.fwt.ButtonPeer.prototype.selected = function(self) { return this.m_selected; }
fan.fwt.ButtonPeer.prototype.selected$ = function(self, val)
{
  this.m_selected = val;
  if (this.elem != null) this.sync(self);
}
fan.fwt.ButtonPeer.prototype.m_selected = false;
fan.fwt.ButtonPeer.prototype.text = function(self) { return this.m_text; }
fan.fwt.ButtonPeer.prototype.text$ = function(self, val) { this.m_text = val; }
fan.fwt.ButtonPeer.prototype.m_text = "";
fan.fwt.ButtonPeer.prototype.m_pressed = false;
fan.fwt.ButtonPeer.prototype.prefSize = function(self, hints)
{
  var pref = fan.fwt.WidgetPeer.prototype.prefSize.call(this, self, hints);
  return fan.gfx.Size.make(pref.m_w, 25);
}
fan.fwt.ButtonPeer.prototype.create = function(parentElem, self)
{
  if (self.m_mode == fan.fwt.ButtonMode.m_push || self.m_mode == fan.fwt.ButtonMode.m_toggle)
    return this.makePush(parentElem, self);
  if (self.m_mode == fan.fwt.ButtonMode.m_check || self.m_mode == fan.fwt.ButtonMode.m_radio)
    return this.makeCheck(parentElem, self);
  // TODO - sep
}
fan.fwt.ButtonPeer.prototype.makePush = function(parentElem, self)
{
  var div = this.emptyDiv();
  var style = div.style;
  style.font = fan.fwt.WidgetPeer.fontToCss(this.m_font==null ? fan.fwt.DesktopPeer.$sysFont : this.m_font);
  style.border  = "1px solid #404040";
  style.MozBorderRadius    = "4px";
  style.webkitBorderRadius = "4px";
  style.textAlign  = "center";
  style.cursor     = "default";
  style.whiteSpace = "nowrap";
  var $this = this;
  div.onmousedown = function(event)
  {
    if (!self.enabled()) return false;
    $this.m_pressed = true;
    $this.repaint(self);
    return false;
  }
  div.onmouseout = function(event)
  {
    if (!self.enabled()) return;
    $this.m_pressed = false;
    $this.repaint(self);
  }
  div.onmouseup = function(event)
  {
    if (!self.enabled()) return;
    if ($this.m_pressed != true) return;  // mouseout before up
    // toggle selected if toggle mode
    if (self.m_mode == fan.fwt.ButtonMode.m_toggle)
      $this.m_selected = !$this.m_selected;
    var evt = fan.fwt.Event.make();
    evt.m_id = fan.fwt.EventId.m_action;
    evt.m_widget = self;
    var list = self.m_onAction.list();
    for (var i=0; i<list.size(); i++) list.get(i).call(evt);
    $this.m_pressed = false;
    $this.repaint(self);
  }
  parentElem.appendChild(div);
  return div;
}
fan.fwt.ButtonPeer.prototype.makeCheck = function(parentElem, self)
{
  var check = document.createElement("input");
  check.type = (self.m_mode == fan.fwt.ButtonMode.m_check) ? "checkbox" : "radio";
  check.style.marginRight = "6px";
  var div = this.emptyDiv();
  with (div.style)
  {
    font = fan.fwt.WidgetPeer.fontToCss(this.m_font==null ? fan.fwt.DesktopPeer.$sysFont : this.m_font);
    whiteSpace = "nowrap";
  }
  div.appendChild(check);
  div.onclick = function(event)
  {
    if (!self.enabled()) return;
    // bind selected to widget
    self.selected$(check.checked);
    var evt = fan.fwt.Event.make();
    evt.m_id = fan.fwt.EventId.m_action;
    evt.m_widget = self;
    var list = self.m_onAction.list();
    for (var i=0; i<list.size(); i++) list.get(i).call(evt);
  }
  parentElem.appendChild(div);
  return div;
}
fan.fwt.ButtonPeer.prototype.repaint = function(self)
{
  // sometimes repaint() is getting called on removed
  // widgets, so now just trap and ignore for now
  if (this.elem == null) return;
  if (self.m_mode == fan.fwt.ButtonMode.m_push ||
      self.m_mode == fan.fwt.ButtonMode.m_toggle)
  {
    var div = this.elem;
    var style = div.style;
    var pressed = this.m_pressed || this.m_selected;
    if (pressed)
    {
      style.padding = "4px 6px 2px 6px";
      fan.fwt.WidgetPeer.setBg(div, fan.gfx.Gradient.fromStr("0% 0%, 0% 100%, #b7b7b7, #c8c8c8 0.10, #cecece 0.10, #d9d9d9"));
    }
    else
    {
      style.padding = "3px 6px";
      if (this.m_enabled)
      {
        style.color = "#000";
        style.border = "1px solid #404040";
        fan.fwt.WidgetPeer.setBg(div, fan.gfx.Gradient.fromStr("0% 0%, 0% 100%, #fefefe, #d8d8d8 0.90, #d1d1d1 0.90, #b9b9b9"));
      }
      else
      {
        style.color = "#999";
        style.border = "1px solid #999";
        style.background = "#e0e0e0";
      }
    }
  }
}
fan.fwt.ButtonPeer.prototype.sync = function(self)
{
  var w = this.m_size.m_w;
  var h = this.m_size.m_h;
  if (self.m_mode == fan.fwt.ButtonMode.m_push ||
      self.m_mode == fan.fwt.ButtonMode.m_toggle)
  {
    var div = this.elem;
    // remove old text node
    while (div.firstChild != null)
    {
      var child = div.firstChild;
      div.removeChild(child);
      child = null;
      delete child;
    }
    // add new text node
    div.appendChild(document.createTextNode(this.m_text));
    // account for padding/border
    h -= 8;
    w -= 14;
  }
  else if (self.m_mode == fan.fwt.ButtonMode.m_check ||
           self.m_mode == fan.fwt.ButtonMode.m_radio)
  {
    var div = this.elem;
    // set state
    var check = this.elem.firstChild;
    check.checked = this.m_selected;
    // set text
    while (div.childNodes.length > 1) div.removeChild(div.lastChild);
    div.appendChild(document.createTextNode(this.m_text));
  }
  this.repaint(self);
  fan.fwt.WidgetPeer.prototype.sync.call(this, self, w, h);
}
fan.fwt.Canvas = fan.sys.Obj.$extend(fan.fwt.Widget);
fan.fwt.Canvas.prototype.$ctor = function()
{
  fan.fwt.Widget.prototype.$ctor.call(this);
  this.peer = new fan.fwt.CanvasPeer(this);
  var $this = this;
}
fan.fwt.Canvas.prototype.$typeof = function() { return fan.fwt.Canvas.$type; }
fan.fwt.Canvas.prototype.onPaint = function(g)
{
  return;
}
fan.fwt.Canvas.prototype.dummyCanvas = function()
{
  return this.peer.dummyCanvas(this);
}
fan.fwt.Canvas.make = function()
{
  var self = new fan.fwt.Canvas();
  fan.fwt.Canvas.make$(self);
  return self;
}
fan.fwt.Canvas.make$ = function(self)
{
  fan.fwt.Widget.make$(self);
  return;
}
fan.fwt.CanvasPeer = fan.sys.Obj.$extend(fan.fwt.WidgetPeer);
fan.fwt.CanvasPeer.prototype.$ctor = function(self) {}
fan.fwt.CanvasPeer.prototype.create = function(parentElem)
{
  // test for native canvas support
  this.hasCanvas = document.createElement("canvas").getContext != null;
  return fan.fwt.WidgetPeer.prototype.create.call(this, parentElem);
}
fan.fwt.CanvasPeer.prototype.sync = function(self)
{
  // short-circuit if not properly layed out
  var size = this.m_size
  if (size.m_w == 0 || size.m_h == 0) return;
  if (this.hasCanvas)
  {
    var div = this.elem;
    var c = div.firstChild;
    // remove old canvas if size is different
    if (c != null && (c.width != size.m_w || c.height != size.m_h))
    {
      div.removeChild(c);
      c = null;
    }
    // create new canvas if null
    if (c == null)
    {
      c = document.createElement("canvas");
      c.width  = size.m_w;
      c.height = size.m_h;
      div.appendChild(c);
    }
    // repaint canvas using Canvas.onPaint callback
    var g = new fan.fwt.Graphics();
    g.size = this.m_size;
    g.cx = c.getContext("2d");
    g.cx.lineWidth = 1;
    g.cx.lineCap = "square";
    g.cx.textBaseline = "top";
    g.cx.font = fan.fwt.WidgetPeer.fontToCss(fan.fwt.DesktopPeer.$sysFont);
    g.cx.clearRect(0, 0, this.m_size.m_w, this.m_size.m_h);
    self.onPaint(g);
  }
  else
  {
    if (this.fxLoaded == true)
    {
      // find applet tag
      var app = document.getElementById("app");
      if (app != null && size.m_w > 0 && size.m_h > 0)
      {
        app.width  = size.m_w;
        app.height = size.m_h;
        var g = new JfxGraphics(app.script);
        app.script.init();
        self.onPaint(g);
        app.script.commit();
      }
    }
    else
    {
      this.fxLoaded = true;
      var s = javafxString({
        codebase: fan.sys.UriPodBase + "fwt/res/javafx/",
        archive: "Canvas.jar",
        draggable: true,
        width:  200,
        height: 200,
        code: "fan.fwt.Canvas",
        name: "Canvas",
        id: "app"
      });
      this.elem.innerHTML = s;
    }
  }
  fan.fwt.WidgetPeer.prototype.sync.call(this, self);
}
fan.fwt.Combo = fan.sys.Obj.$extend(fan.fwt.Widget);
fan.fwt.Combo.prototype.$ctor = function()
{
  fan.fwt.Widget.prototype.$ctor.call(this);
  this.peer = new fan.fwt.ComboPeer(this);
  var $this = this;
  this.m_onAction = fan.fwt.EventListeners.make();
  this.m_onModify = fan.fwt.EventListeners.make();
  this.m_dropDown = true;
  this.m_editable = false;
  return;
}
fan.fwt.Combo.prototype.$typeof = function() { return fan.fwt.Combo.$type; }
fan.fwt.Combo.make = function(f)
{
  var self = new fan.fwt.Combo();
  fan.fwt.Combo.make$(self,f);
  return self;
}
fan.fwt.Combo.make$ = function(self,f)
{
  if (f === undefined) f = null;
  fan.fwt.Widget.make$(self);
  ;
  if (f != null)
  {
    f.call(self);
  }
  ;
  return;
}
fan.fwt.Combo.prototype.onAction = function()
{
  return this.m_onAction;
}
fan.fwt.Combo.prototype.onAction$ = function(it)
{
  this.m_onAction = it;
  return;
}
fan.fwt.Combo.prototype.onModify = function()
{
  return this.m_onModify;
}
fan.fwt.Combo.prototype.onModify$ = function(it)
{
  this.m_onModify = it;
  return;
}
fan.fwt.Combo.prototype.text = function()
{
  return this.peer.text(this);
}
fan.fwt.Combo.prototype.text$ = function(it)
{
  return this.peer.text$(this,it);
}
fan.fwt.Combo.prototype.items = function()
{
  return this.peer.items(this);
}
fan.fwt.Combo.prototype.items$ = function(it)
{
  return this.peer.items$(this,it);
}
fan.fwt.Combo.prototype.font = function()
{
  return this.peer.font(this);
}
fan.fwt.Combo.prototype.font$ = function(it)
{
  return this.peer.font$(this,it);
}
fan.fwt.Combo.prototype.selectedIndex = function()
{
  return this.peer.selectedIndex(this);
}
fan.fwt.Combo.prototype.selectedIndex$ = function(it)
{
  return this.peer.selectedIndex$(this,it);
}
fan.fwt.Combo.prototype.selected = function()
{
  var i = this.selectedIndex();
  return (function($this) { if (i == null) return null; return $this.items().get(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type)); })(this);
}
fan.fwt.Combo.prototype.selected$ = function(it)
{
  var i = this.index(fan.sys.ObjUtil.coerce(it,fan.sys.Obj.$type));
  if (i != null)
  {
    this.selectedIndex$(i);
  }
  ;
  return;
}
fan.fwt.Combo.prototype.index = function(item)
{
  return this.items().index(item);
}
fan.fwt.Combo.prototype.m_onAction = null;
fan.fwt.Combo.prototype.m_onModify = null;
fan.fwt.Combo.prototype.m_dropDown = false;
fan.fwt.Combo.prototype.m_editable = false;
fan.fwt.Combo.prototype.m_selected = null;
fan.fwt.ComboPeer = fan.sys.Obj.$extend(fan.fwt.WidgetPeer);
fan.fwt.ComboPeer.prototype.$ctor = function(self) {}
fan.fwt.ComboPeer.prototype.font   = function(self) { return this.m_font; }
fan.fwt.ComboPeer.prototype.font$  = function(self, val) { this.m_font = val; }
fan.fwt.ComboPeer.prototype.m_font = null;
fan.fwt.ComboPeer.prototype.items   = function(self) { return this.m_items; }
fan.fwt.ComboPeer.prototype.items$  = function(self, val)
{
  this.m_items = val;
  this.needsRebuild = true;
}
fan.fwt.ComboPeer.prototype.m_items = null;
fan.fwt.ComboPeer.prototype.selectedIndex   = function(self) { return this.m_selectedIndex; }
fan.fwt.ComboPeer.prototype.selectedIndex$  = function(self, val)
{
  this.m_selectedIndex = val;
  if (this.elem != null && this.elem.firstChild != null)
    this.elem.firstChild.selectedIndex = val;
}
fan.fwt.ComboPeer.prototype.m_selectedIndex = null;
fan.fwt.ComboPeer.prototype.text   = function(self) { return this.m_text; }
fan.fwt.ComboPeer.prototype.text$  = function(self, val) { this.m_text = val; }
fan.fwt.ComboPeer.prototype.m_text = "";
fan.fwt.ComboPeer.prototype.create = function(parentElem)
{
  // make sure we force rebuild
  this.needsRebuild = true;
  var select = document.createElement("select");
  var div = this.emptyDiv();
  div.appendChild(select);
  parentElem.appendChild(div);
  return div;
}
fan.fwt.ComboPeer.prototype.needsRebuild = true;
fan.fwt.ComboPeer.prototype.rebuild = function(self)
{
  // sync props
  var select = this.elem.firstChild;
  select.disabled = !this.m_enabled;
  // clear old items
  while (select.firstChild != null)
    select.removeChild(select.firstChild);
  // add new items
  for (var i=0; i<this.m_items.size(); i++)
  {
    var option = document.createElement("option");
    option.appendChild(document.createTextNode(this.m_items.get(i)));
    select.appendChild(option);
  }
}
fan.fwt.ComboPeer.prototype.sync = function(self)
{
  if (this.needsRebuild)
  {
    this.rebuild();
    this.needsRebuild = false;
  }
  // sync props
  var select = this.elem.firstChild;
  select.disabled = !this.m_enabled;
  // set selectedIndex to self to sync
  this.selectedIndex$(self, this.m_selectedIndex);
  select.onchange = function()
  {
    // sync changes back to widget
    self.selectedIndex$(select.selectedIndex);
    // fire onModify
    if (self.m_onModify.size() > 0)
    {
      var me = fan.fwt.Event.make();
      me.m_id = fan.fwt.EventId.m_modified;
      me.m_widget = self;
      var list = self.m_onModify.list();
      for (var i=0; i<list.size(); i++) list.get(i).call(me);
    }
  }
  fan.fwt.WidgetPeer.prototype.sync.call(this, self);
}
fan.fwt.Command = fan.sys.Obj.$extend(fan.sys.Obj);
fan.fwt.Command.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_onInvoke = fan.fwt.EventListeners.make();
  this.m_mode = fan.fwt.CommandMode.m_push;
  this.m_selected = false;
  this.m_enabled = true;
  this.m_registry = fan.sys.List.make(fan.fwt.Widget.$type);
  return;
}
fan.fwt.Command.prototype.$typeof = function() { return fan.fwt.Command.$type; }
fan.fwt.Command.prototype.name = function()
{
  return this.m_name;
}
fan.fwt.Command.prototype.name$ = function(it)
{
  this.m_name = it;
  return;
}
fan.fwt.Command.prototype.icon = function()
{
  return this.m_icon;
}
fan.fwt.Command.prototype.icon$ = function(it)
{
  this.m_icon = it;
  return;
}
fan.fwt.Command.prototype.accelerator = function()
{
  return this.m_accelerator;
}
fan.fwt.Command.prototype.accelerator$ = function(it)
{
  this.m_accelerator = it;
  return;
}
fan.fwt.Command.prototype.onInvoke = function()
{
  return this.m_onInvoke;
}
fan.fwt.Command.prototype.onInvoke$ = function(it)
{
  this.m_onInvoke = it;
  return;
}
fan.fwt.Command.prototype.mode = function()
{
  return this.m_mode;
}
fan.fwt.Command.prototype.mode$ = function(it)
{
  this.m_mode = it;
  return;
}
fan.fwt.Command.prototype.selected = function()
{
  return this.m_selected;
}
fan.fwt.Command.prototype.selected$ = function(it)
{
  var $this = this;
  var newVal = it;
  if (fan.sys.ObjUtil.compareNE(this.m_mode,fan.fwt.CommandMode.m_toggle))
  {
    return;
  }
  ;
  this.m_selected = newVal;
  this.widgets().each(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("w","fwt::Widget",false)]),
    fan.sys.Void.$type,
    function(w)
    {
      try
      {
        fan.sys.ObjUtil.trap(w,"selected",fan.sys.List.make(fan.sys.Obj.$type.toNullable(),[fan.sys.ObjUtil.coerce(newVal,fan.sys.Obj.$type.toNullable())]));
      }
      catch ($_u13)
      {
      }
      ;
      return;
    }));
  return;
}
fan.fwt.Command.make = function(name,icon,onInvoke)
{
  var self = new fan.fwt.Command();
  fan.fwt.Command.make$(self,name,icon,onInvoke);
  return self;
}
fan.fwt.Command.make$ = function(self,name,icon,onInvoke)
{
  if (name === undefined) name = "";
  if (icon === undefined) icon = null;
  if (onInvoke === undefined) onInvoke = null;
  ;
  self.m_name = name;
  self.m_icon = icon;
  if (onInvoke != null)
  {
    self.m_onInvoke.add(fan.sys.ObjUtil.coerce(onInvoke,fan.sys.Type.find("|fwt::Event->sys::Void|")));
  }
  ;
  return;
}
fan.fwt.Command.makeLocale = function(pod,keyBase,onInvoke)
{
  var self = new fan.fwt.Command();
  fan.fwt.Command.makeLocale$(self,pod,keyBase,onInvoke);
  return self;
}
fan.fwt.Command.makeLocale$ = function(self,pod,keyBase,onInvoke)
{
  if (onInvoke === undefined) onInvoke = null;
  ;
  var plat = fan.fwt.Desktop.platform();
  var name = pod.locale(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",keyBase),".name."),plat),null);
  if (name == null)
  {
    name = pod.locale(fan.sys.Str.plus(fan.sys.Str.plus("",keyBase),".name"));
  }
  ;
  self.m_name = fan.sys.ObjUtil.coerce(name,fan.sys.Str.$type);
  var locIcon = pod.locale(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",keyBase),".icon."),plat),null);
  if (locIcon == null)
  {
    locIcon = pod.locale(fan.sys.Str.plus(fan.sys.Str.plus("",keyBase),".icon"),null);
  }
  ;
  try
  {
    if (locIcon != null)
    {
      self.m_icon = fan.gfx.Image.make(fan.sys.Str.toUri(locIcon));
    }
    ;
  }
  catch ($_u14)
  {
    fan.fwt.Command.$type.pod().log().err(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("Command: cannot load '",keyBase),".icon' => "),locIcon));
  }
  ;
  var locAcc = pod.locale(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",keyBase),".accelerator."),plat),null);
  var locAccPlat = locAcc != null;
  if (locAcc == null)
  {
    locAcc = pod.locale(fan.sys.Str.plus(fan.sys.Str.plus("",keyBase),".accelerator"),null);
  }
  ;
  try
  {
    if (locAcc != null)
    {
      self.m_accelerator = fan.fwt.Key.fromStr(fan.sys.ObjUtil.coerce(locAcc,fan.sys.Str.$type));
      if ((!locAccPlat && fan.fwt.Desktop.isMac()))
      {
        self.m_accelerator = self.m_accelerator.replace(fan.fwt.Key.m_ctrl,fan.fwt.Key.m_command);
      }
      ;
    }
    ;
  }
  catch ($_u15)
  {
    fan.fwt.Command.$type.pod().log().err(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("Command: cannot load '",keyBase),".accelerator ' => "),locAcc));
  }
  ;
  if (onInvoke != null)
  {
    self.m_onInvoke.add(fan.sys.ObjUtil.coerce(onInvoke,fan.sys.Type.find("|fwt::Event->sys::Void|")));
  }
  ;
  return;
}
fan.fwt.Command.prototype.window = function()
{
  var $this = this;
  if (this.m_assocDialog != null)
  {
    return this.m_assocDialog;
  }
  ;
  return fan.sys.ObjUtil.coerce(this.widgets().eachWhile(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("w","fwt::Widget",false)]),
    fan.fwt.Window.$type,
    function(w)
    {
      return fan.sys.ObjUtil.coerce(w.window(),fan.fwt.Window.$type);
    })),fan.fwt.Window.$type.toNullable());
}
fan.fwt.Command.prototype.assocDialog = function()
{
  return this.m_assocDialog;
}
fan.fwt.Command.prototype.assocDialog$ = function(it)
{
  this.m_assocDialog = it;
  return;
}
fan.fwt.Command.prototype.enabled = function()
{
  return this.m_enabled;
}
fan.fwt.Command.prototype.enabled$ = function(it)
{
  var $this = this;
  var newVal = it;
  if (fan.sys.ObjUtil.equals(this.m_enabled,newVal))
  {
    return;
  }
  ;
  this.m_enabled = newVal;
  this.m_registry.each(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("w","fwt::Widget",false)]),
    fan.sys.Void.$type,
    function(w)
    {
      w.enabled$(newVal);
      return;
    }));
  return;
}
fan.fwt.Command.prototype.widgets = function()
{
  return this.m_registry.ro();
}
fan.fwt.Command.prototype.register = function(w)
{
  this.m_registry.add(w);
  return;
}
fan.fwt.Command.prototype.unregister = function(w)
{
  this.m_registry.removeSame(w);
  return;
}
fan.fwt.Command.prototype.toStr = function()
{
  return this.m_name;
}
fan.fwt.Command.prototype.registry = function()
{
  return this.m_registry;
}
fan.fwt.Command.prototype.registry$ = function(it)
{
  this.m_registry = it;
  return;
}
fan.fwt.Command.prototype.invoke = function(event)
{
  try
  {
    this.invoked(event);
  }
  catch ($_u16)
  {
    $_u16 = fan.sys.Err.make($_u16);
    if ($_u16 instanceof fan.sys.Err)
    {
      var e = $_u16;
      var e;
      this.onInvokeErr(event,e);
    }
    else
    {
      throw $_u16;
    }
  }
  ;
  return;
}
fan.fwt.Command.prototype.invoked = function(event)
{
  if (this.m_onInvoke.isEmpty())
  {
    throw fan.sys.UnsupportedErr.make(fan.sys.Str.plus("Must set onInvoke or override invoke: ",this.m_name));
  }
  ;
  this.m_onInvoke.fire(event);
  return;
}
fan.fwt.Command.prototype.onInvokeErr = function(event,err)
{
  var window = (function($this) { var $_u17 = (function($this) { var $_u18 = event; if ($_u18 == null) return null; return $_u18.window(); })($this); if ($_u17 != null) return $_u17; return (function($this) { var $_u19 = $this.m_registry.first(); if ($_u19 == null) return null; return $_u19.window(); })($this); })(this);
  fan.fwt.Dialog.openErr(window,fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",this.m_name),": "),err),err);
  return;
}
fan.fwt.Command.prototype.undoable = function()
{
  return fan.sys.ObjUtil.compareNE(fan.sys.Type.of(this).method("undo").parent(),fan.fwt.Command.$type);
}
fan.fwt.Command.prototype.redo = function()
{
  this.invoke(null);
  return;
}
fan.fwt.Command.prototype.undo = function()
{
  throw fan.sys.UnsupportedErr.make(fan.sys.Str.plus("Command not undoable ",this.m_name));
}
fan.fwt.Command.prototype.m_name = null;
fan.fwt.Command.prototype.m_icon = null;
fan.fwt.Command.prototype.m_accelerator = null;
fan.fwt.Command.prototype.m_onInvoke = null;
fan.fwt.Command.prototype.m_mode = null;
fan.fwt.Command.prototype.m_selected = false;
fan.fwt.Command.prototype.m_assocDialog = null;
fan.fwt.Command.prototype.m_enabled = false;
fan.fwt.Command.prototype.m_registry = null;
fan.fwt.ContentPane = fan.sys.Obj.$extend(fan.fwt.Pane);
fan.fwt.ContentPane.prototype.$ctor = function()
{
  fan.fwt.Pane.prototype.$ctor.call(this);
  this.peer = new fan.fwt.PanePeer(this);
  var $this = this;
}
fan.fwt.ContentPane.prototype.$typeof = function() { return fan.fwt.ContentPane.$type; }
fan.fwt.ContentPane.prototype.content = function()
{
  return this.m_content;
}
fan.fwt.ContentPane.prototype.content$ = function(it)
{
  this.remove(this.m_content);
  fan.fwt.Widget.prototype.add.call(this,it);
  this.m_content = it;
  return;
}
fan.fwt.ContentPane.prototype.add = function(child)
{
  if (this.m_content == null)
  {
    this.m_content = child;
  }
  ;
  fan.fwt.Pane.prototype.add.call(this,child);
  return this;
}
fan.fwt.ContentPane.prototype.prefSize = function(hints)
{
  if (hints === undefined) hints = fan.gfx.Hints.m_defVal;
  if (this.content() == null)
  {
    return fan.gfx.Size.m_defVal;
  }
  ;
  if (!this.visible())
  {
    return fan.gfx.Size.m_defVal;
  }
  ;
  return this.content().prefSize(hints);
}
fan.fwt.ContentPane.prototype.onLayout = function()
{
  if (this.content() == null)
  {
    return;
  }
  ;
  this.content().pos$(fan.gfx.Point.m_defVal);
  this.content().size$(this.size());
  return;
}
fan.fwt.ContentPane.make = function()
{
  var self = new fan.fwt.ContentPane();
  fan.fwt.ContentPane.make$(self);
  return self;
}
fan.fwt.ContentPane.make$ = function(self)
{
  fan.fwt.Pane.make$(self);
  return;
}
fan.fwt.ContentPane.prototype.m_content = null;
fan.fwt.ConstraintPane = fan.sys.Obj.$extend(fan.fwt.ContentPane);
fan.fwt.ConstraintPane.prototype.$ctor = function()
{
  fan.fwt.ContentPane.prototype.$ctor.call(this);
  this.peer = new fan.fwt.PanePeer(this);
  var $this = this;
  this.m_minw = null;
  this.m_minh = null;
  this.m_maxw = null;
  this.m_maxh = null;
  return;
}
fan.fwt.ConstraintPane.prototype.$typeof = function() { return fan.fwt.ConstraintPane.$type; }
fan.fwt.ConstraintPane.prototype.minw = function()
{
  return this.m_minw;
}
fan.fwt.ConstraintPane.prototype.minw$ = function(it)
{
  this.m_minw = it;
  return;
}
fan.fwt.ConstraintPane.prototype.minh = function()
{
  return this.m_minh;
}
fan.fwt.ConstraintPane.prototype.minh$ = function(it)
{
  this.m_minh = it;
  return;
}
fan.fwt.ConstraintPane.prototype.maxw = function()
{
  return this.m_maxw;
}
fan.fwt.ConstraintPane.prototype.maxw$ = function(it)
{
  this.m_maxw = it;
  return;
}
fan.fwt.ConstraintPane.prototype.maxh = function()
{
  return this.m_maxh;
}
fan.fwt.ConstraintPane.prototype.maxh$ = function(it)
{
  this.m_maxh = it;
  return;
}
fan.fwt.ConstraintPane.prototype.prefSize = function(hints)
{
  if (hints === undefined) hints = fan.gfx.Hints.m_defVal;
  if (this.content() == null)
  {
    return fan.gfx.Size.m_defVal;
  }
  ;
  if (!this.visible())
  {
    return fan.gfx.Size.m_defVal;
  }
  ;
  var pref = this.content().prefSize(hints);
  var w = pref.m_w;
  if (this.m_minw != null)
  {
    w = fan.sys.Int.max(w,fan.sys.ObjUtil.coerce(this.m_minw,fan.sys.Int.$type));
  }
  ;
  if (this.m_maxw != null)
  {
    w = fan.sys.Int.min(w,fan.sys.ObjUtil.coerce(this.m_maxw,fan.sys.Int.$type));
  }
  ;
  var h = pref.m_h;
  if (this.m_minh != null)
  {
    h = fan.sys.Int.max(h,fan.sys.ObjUtil.coerce(this.m_minh,fan.sys.Int.$type));
  }
  ;
  if (this.m_maxh != null)
  {
    h = fan.sys.Int.min(h,fan.sys.ObjUtil.coerce(this.m_maxh,fan.sys.Int.$type));
  }
  ;
  return fan.gfx.Size.make(w,h);
}
fan.fwt.ConstraintPane.make = function()
{
  var self = new fan.fwt.ConstraintPane();
  fan.fwt.ConstraintPane.make$(self);
  return self;
}
fan.fwt.ConstraintPane.make$ = function(self)
{
  fan.fwt.ContentPane.make$(self);
  ;
  return;
}
fan.fwt.ConstraintPane.prototype.m_minw = null;
fan.fwt.ConstraintPane.prototype.m_minh = null;
fan.fwt.ConstraintPane.prototype.m_maxw = null;
fan.fwt.ConstraintPane.prototype.m_maxh = null;
fan.fwt.Desktop = fan.sys.Obj.$extend(fan.sys.Obj);
fan.fwt.Desktop.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  this.peer = new fan.fwt.DesktopPeer(this);
  var $this = this;
}
fan.fwt.Desktop.prototype.$typeof = function() { return fan.fwt.Desktop.$type; }
fan.fwt.Desktop.platform = function()
{
  return fan.fwt.DesktopPeer.platform();
}
fan.fwt.Desktop.isWindows = function()
{
  return fan.fwt.DesktopPeer.isWindows();
}
fan.fwt.Desktop.isMac = function()
{
  return fan.fwt.DesktopPeer.isMac();
}
fan.fwt.Desktop.bounds = function()
{
  return fan.fwt.DesktopPeer.bounds();
}
fan.fwt.Desktop.focus = function()
{
  return fan.fwt.DesktopPeer.focus();
}
fan.fwt.Desktop.callAsync = function(f)
{
  return fan.fwt.DesktopPeer.callAsync(f);
}
fan.fwt.Desktop.disposeColor = function(c)
{
  return fan.fwt.DesktopPeer.disposeColor(c);
}
fan.fwt.Desktop.disposeFont = function(f)
{
  return fan.fwt.DesktopPeer.disposeFont(f);
}
fan.fwt.Desktop.disposeImage = function(i)
{
  return fan.fwt.DesktopPeer.disposeImage(i);
}
fan.fwt.Desktop.sysFont = function()
{
  return fan.fwt.DesktopPeer.sysFont();
}
fan.fwt.Desktop.sysFontSmall = function()
{
  return fan.fwt.DesktopPeer.sysFontSmall();
}
fan.fwt.Desktop.sysFontView = function()
{
  return fan.fwt.DesktopPeer.sysFontView();
}
fan.fwt.Desktop.sysFontMonospace = function()
{
  return fan.fwt.DesktopPeer.sysFontMonospace();
}
fan.fwt.Desktop.sysDarkShadow = function()
{
  return fan.fwt.DesktopPeer.sysDarkShadow();
}
fan.fwt.Desktop.sysNormShadow = function()
{
  return fan.fwt.DesktopPeer.sysNormShadow();
}
fan.fwt.Desktop.sysLightShadow = function()
{
  return fan.fwt.DesktopPeer.sysLightShadow();
}
fan.fwt.Desktop.sysHighlightShadow = function()
{
  return fan.fwt.DesktopPeer.sysHighlightShadow();
}
fan.fwt.Desktop.sysFg = function()
{
  return fan.fwt.DesktopPeer.sysFg();
}
fan.fwt.Desktop.sysBg = function()
{
  return fan.fwt.DesktopPeer.sysBg();
}
fan.fwt.Desktop.sysBorder = function()
{
  return fan.fwt.DesktopPeer.sysBorder();
}
fan.fwt.Desktop.sysListFg = function()
{
  return fan.fwt.DesktopPeer.sysListFg();
}
fan.fwt.Desktop.sysListBg = function()
{
  return fan.fwt.DesktopPeer.sysListBg();
}
fan.fwt.Desktop.sysListSelFg = function()
{
  return fan.fwt.DesktopPeer.sysListSelFg();
}
fan.fwt.Desktop.sysListSelBg = function()
{
  return fan.fwt.DesktopPeer.sysListSelBg();
}
fan.fwt.Desktop.make = function()
{
  var self = new fan.fwt.Desktop();
  fan.fwt.Desktop.make$(self);
  return self;
}
fan.fwt.Desktop.make$ = function(self)
{
  return;
}
fan.fwt.DesktopPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.fwt.DesktopPeer.prototype.$ctor = function(self) {}
fan.fwt.DesktopPeer.platform  = function() { return "browser"; }
fan.fwt.DesktopPeer.isWindows = function() { return !fan.fwt.DesktopPeer.$isMac; }
fan.fwt.DesktopPeer.isMac     = function() { return fan.fwt.DesktopPeer.$isMac; }
fan.fwt.DesktopPeer.$isMac = navigator.userAgent.indexOf("Mac OS X") != -1;
fan.fwt.DesktopPeer.sysFont = function()
{
  return fan.fwt.DesktopPeer.$sysFont;
}
fan.fwt.DesktopPeer.sysFontSmall = function()
{
  return fan.fwt.DesktopPeer.$sysFontSmall;
}
fan.fwt.DesktopPeer.sysFontView = function()
{
  return fan.fwt.DesktopPeer.$sysFontView;
}
fan.fwt.DesktopPeer.sysFontMonospace = function()
{
  return fan.fwt.DesktopPeer.$sysFontMonospace;
}
fan.fwt.DesktopPeer.$sysFont = fan.gfx.Font.fromStr("13pt Lucida Grande, Tahoma, Arial");
fan.fwt.DesktopPeer.$sysFontSmall = fan.gfx.Font.fromStr("11pt Lucida Grande, Tahoma, Arial");
fan.fwt.DesktopPeer.$sysFontView = fan.gfx.Font.fromStr("12pt Lucida Grande, Tahoma, Arial");
fan.fwt.DesktopPeer.$sysFontMonospace = fan.gfx.Font.fromStr("12pt Monaco, Courier New");
fan.fwt.DesktopPeer.$sysDarkShadow   = fan.gfx.Color.fromStr("#909090");
fan.fwt.DesktopPeer.$sysNormShadow   = fan.gfx.Color.fromStr("#a0a0a0");
fan.fwt.DesktopPeer.$sysLightShadow  = fan.gfx.Color.fromStr("#c0c0c0");
fan.fwt.DesktopPeer.$sysHighlightShadow = fan.gfx.Color.fromStr("#e0e0e0");
fan.fwt.DesktopPeer.$sysFg           = fan.gfx.Color.fromStr("#000000");
fan.fwt.DesktopPeer.$sysBg           = fan.gfx.Color.fromStr("#ffffff");
fan.fwt.DesktopPeer.$sysBorder       = fan.gfx.Color.fromStr("#333333");
fan.fwt.DesktopPeer.$sysListFg       = fan.gfx.Color.fromStr("#000000");
fan.fwt.DesktopPeer.$sysListBg       = fan.gfx.Color.fromStr("#ffffff");
fan.fwt.DesktopPeer.$sysListSelFg    = fan.gfx.Color.fromStr("#ffffff");
fan.fwt.DesktopPeer.$sysListSelBg    = fan.gfx.Color.fromStr("#316ac5");
fan.fwt.DesktopPeer.sysDarkShadow  = function() { return fan.fwt.DesktopPeer.$sysDarkShadow; }
fan.fwt.DesktopPeer.sysNormShadow  = function() { return fan.fwt.DesktopPeer.$sysNormShadow; }
fan.fwt.DesktopPeer.sysLightShadow = function() { return fan.fwt.DesktopPeer.$sysLightShadow; }
fan.fwt.DesktopPeer.sysHighlightShadow = function() { return fan.fwt.DesktopPeer.$sysHighlightShadow; }
fan.fwt.DesktopPeer.sysFg          = function() { return fan.fwt.DesktopPeer.$sysFg; }
fan.fwt.DesktopPeer.sysBg          = function() { return fan.fwt.DesktopPeer.$sysBg; }
fan.fwt.DesktopPeer.sysBorder      = function() { return fan.fwt.DesktopPeer.$sysBorder; }
fan.fwt.DesktopPeer.sysListFg      = function() { return fan.fwt.DesktopPeer.$sysListFg; }
fan.fwt.DesktopPeer.sysListBg      = function() { return fan.fwt.DesktopPeer.$sysListBg; }
fan.fwt.DesktopPeer.sysListSelFg   = function() { return fan.fwt.DesktopPeer.$sysListSelFg; }
fan.fwt.DesktopPeer.sysListSelBg   = function() { return fan.fwt.DesktopPeer.$sysListSelBg; }
fan.fwt.Window = fan.sys.Obj.$extend(fan.fwt.ContentPane);
fan.fwt.Window.prototype.$ctor = function()
{
  fan.fwt.ContentPane.prototype.$ctor.call(this);
  this.peer = new fan.fwt.WindowPeer(this);
  var $this = this;
  this.m_onClose = fan.fwt.EventListeners.make();
  this.m_onActive = fan.fwt.EventListeners.make();
  this.m_onInactive = fan.fwt.EventListeners.make();
  this.m_onIconified = fan.fwt.EventListeners.make();
  this.m_onDeiconified = fan.fwt.EventListeners.make();
  this.m_mode = (function($this) { if (fan.sys.ObjUtil.is($this,fan.fwt.Dialog.$type)) return fan.fwt.WindowMode.m_appModal; return fan.fwt.WindowMode.m_modeless; })(this);
  this.m_alwaysOnTop = false;
  this.m_resizable = true;
  this.m_showTrim = true;
  return;
}
fan.fwt.Window.prototype.$typeof = function() { return fan.fwt.Window.$type; }
fan.fwt.Window.prototype.onClose = function()
{
  return this.m_onClose;
}
fan.fwt.Window.prototype.onClose$ = function(it)
{
  this.m_onClose = it;
  return;
}
fan.fwt.Window.prototype.onActive = function()
{
  return this.m_onActive;
}
fan.fwt.Window.prototype.onActive$ = function(it)
{
  this.m_onActive = it;
  return;
}
fan.fwt.Window.prototype.onInactive = function()
{
  return this.m_onInactive;
}
fan.fwt.Window.prototype.onInactive$ = function(it)
{
  this.m_onInactive = it;
  return;
}
fan.fwt.Window.prototype.onIconified = function()
{
  return this.m_onIconified;
}
fan.fwt.Window.prototype.onIconified$ = function(it)
{
  this.m_onIconified = it;
  return;
}
fan.fwt.Window.prototype.onDeiconified = function()
{
  return this.m_onDeiconified;
}
fan.fwt.Window.prototype.onDeiconified$ = function(it)
{
  this.m_onDeiconified = it;
  return;
}
fan.fwt.Window.prototype.menuBar = function()
{
  return this.m_menuBar;
}
fan.fwt.Window.prototype.menuBar$ = function(it)
{
  this.remove(this.m_menuBar);
  fan.fwt.Widget.prototype.add.call(this,it);
  this.m_menuBar = it;
  return;
}
fan.fwt.Window.prototype.icon = function()
{
  return this.peer.icon(this);
}
fan.fwt.Window.prototype.icon$ = function(it)
{
  return this.peer.icon$(this,it);
}
fan.fwt.Window.prototype.title = function()
{
  return this.peer.title(this);
}
fan.fwt.Window.prototype.title$ = function(it)
{
  return this.peer.title$(this,it);
}
fan.fwt.Window.make = function(parent,f)
{
  var self = new fan.fwt.Window();
  fan.fwt.Window.make$(self,parent,f);
  return self;
}
fan.fwt.Window.make$ = function(self,parent,f)
{
  if (parent === undefined) parent = null;
  if (f === undefined) f = null;
  fan.fwt.ContentPane.make$(self);
  ;
  if (parent != null)
  {
    self.setParent(fan.sys.ObjUtil.coerce(parent,fan.fwt.Widget.$type));
  }
  ;
  if (f != null)
  {
    f.call(self);
  }
  ;
  return;
}
fan.fwt.Window.prototype.open = function()
{
  return this.peer.open(this);
}
fan.fwt.Window.prototype.close = function(result)
{
  if (result === undefined) result = null;
  return this.peer.close(this,result);
}
fan.fwt.Window.prototype.activate = function()
{
  return this.peer.activate(this);
}
fan.fwt.Window.prototype.onDrop = function()
{
  return this.m_onDrop;
}
fan.fwt.Window.prototype.onDrop$ = function(it)
{
  this.m_onDrop = it;
  return;
}
fan.fwt.Window.prototype.m_onClose = null;
fan.fwt.Window.prototype.m_onActive = null;
fan.fwt.Window.prototype.m_onInactive = null;
fan.fwt.Window.prototype.m_onIconified = null;
fan.fwt.Window.prototype.m_onDeiconified = null;
fan.fwt.Window.prototype.m_mode = null;
fan.fwt.Window.prototype.m_alwaysOnTop = false;
fan.fwt.Window.prototype.m_resizable = false;
fan.fwt.Window.prototype.m_showTrim = false;
fan.fwt.Window.prototype.m_menuBar = null;
fan.fwt.Window.prototype.m_onDrop = null;
fan.fwt.WindowPeer = fan.sys.Obj.$extend(fan.fwt.PanePeer);
fan.fwt.WindowPeer.prototype.$ctor = function(self) {}
fan.fwt.WindowPeer.prototype.open = function(self)
{
  // check for alt root
  var rootId = fan.sys.Env.cur().vars().get("fwt.window.root")
  if (rootId == null) this.root = document.body;
  else
  {
    this.root = document.getElementById(rootId);
    if (this.root == null) throw fan.sys.ArgErr.make("No root found");
  }
  // mount shell we use to attach widgets to
  var shell = document.createElement("div")
  with (shell.style)
  {
    position   = this.root === document.body ? "fixed" : "absolute";
    top        = "0";
    left       = "0";
    width      = "100%";
    height     = "100%";
    background = "#fff";
  }
  // mount window
  var elem = this.emptyDiv();
  shell.appendChild(elem);
  this.attachTo(self, elem);
  this.root.appendChild(shell);
  self.relayout();
}
fan.fwt.WindowPeer.prototype.close = function(self, result)
{
  var event    = fan.fwt.Event.make();
  event.m_id   = fan.fwt.EventId.m_close;
  event.m_data = result;
  var list = self.m_onClose.list();
  for (var i=0; i<list.size(); i++) list.get(i).call(event);
}
fan.fwt.WindowPeer.prototype.sync = function(self)
{
  var shell = this.elem.parentNode;
  this.size$(this, fan.gfx.Size.make(shell.offsetWidth, shell.offsetHeight));
  fan.fwt.WidgetPeer.prototype.sync.call(this, self);
}
fan.fwt.WindowPeer.prototype.icon = function(self) { return this.m_icon; }
fan.fwt.WindowPeer.prototype.icon$ = function(self, val) { this.m_icon = val; }
fan.fwt.WindowPeer.prototype.m_icon = null;
fan.fwt.WindowPeer.prototype.title = function(self) { return document.title; }
fan.fwt.WindowPeer.prototype.title$ = function(self, val) { document.title = val; }
fan.fwt.Dialog = fan.sys.Obj.$extend(fan.fwt.Window);
fan.fwt.Dialog.prototype.$ctor = function()
{
  fan.fwt.Window.prototype.$ctor.call(this);
  this.peer = new fan.fwt.DialogPeer(this);
  var $this = this;
  this.m_commands = fan.sys.List.make(fan.fwt.Command.$type, [fan.fwt.Dialog.ok()]);
  return;
}
fan.fwt.Dialog.prototype.$typeof = function() { return fan.fwt.Dialog.$type; }
fan.fwt.Dialog.prototype.image = function()
{
  return this.m_image;
}
fan.fwt.Dialog.prototype.image$ = function(it)
{
  this.m_image = it;
  return;
}
fan.fwt.Dialog.prototype.body = function()
{
  return this.m_body;
}
fan.fwt.Dialog.prototype.body$ = function(it)
{
  this.m_body = it;
  return;
}
fan.fwt.Dialog.prototype.details = function()
{
  return this.m_details;
}
fan.fwt.Dialog.prototype.details$ = function(it)
{
  this.m_details = it;
  return;
}
fan.fwt.Dialog.prototype.commands = function()
{
  return this.m_commands;
}
fan.fwt.Dialog.prototype.commands$ = function(it)
{
  this.m_commands = it;
  return;
}
fan.fwt.Dialog.ok = function()
{
  return fan.fwt.DialogCommand.make(fan.fwt.DialogCommandId.m_ok);
}
fan.fwt.Dialog.cancel = function()
{
  return fan.fwt.DialogCommand.make(fan.fwt.DialogCommandId.m_cancel);
}
fan.fwt.Dialog.yes = function()
{
  return fan.fwt.DialogCommand.make(fan.fwt.DialogCommandId.m_yes);
}
fan.fwt.Dialog.no = function()
{
  return fan.fwt.DialogCommand.make(fan.fwt.DialogCommandId.m_no);
}
fan.fwt.Dialog.okCancel = function()
{
  return fan.sys.List.make(fan.fwt.Command.$type, [fan.fwt.Dialog.ok(),fan.fwt.Dialog.cancel()]);
}
fan.fwt.Dialog.yesNo = function()
{
  return fan.sys.List.make(fan.fwt.Command.$type, [fan.fwt.Dialog.yes(),fan.fwt.Dialog.no()]);
}
fan.fwt.Dialog.openInfo = function(parent,msg,details,commands)
{
  if (details === undefined) details = null;
  if (commands === undefined) commands = fan.sys.List.make(fan.fwt.Command.$type, [fan.fwt.Dialog.ok()]);
  return fan.fwt.Dialog.openMsgBox(fan.sys.ObjUtil.coerce(fan.fwt.Dialog.$type.pod(),fan.sys.Pod.$type),"info",parent,msg,details,commands);
}
fan.fwt.Dialog.openWarn = function(parent,msg,details,commands)
{
  if (details === undefined) details = null;
  if (commands === undefined) commands = fan.sys.List.make(fan.fwt.Command.$type, [fan.fwt.Dialog.ok()]);
  return fan.fwt.Dialog.openMsgBox(fan.sys.ObjUtil.coerce(fan.fwt.Dialog.$type.pod(),fan.sys.Pod.$type),"warn",parent,msg,details,commands);
}
fan.fwt.Dialog.openErr = function(parent,msg,details,commands)
{
  if (details === undefined) details = null;
  if (commands === undefined) commands = fan.sys.List.make(fan.fwt.Command.$type, [fan.fwt.Dialog.ok()]);
  return fan.fwt.Dialog.openMsgBox(fan.sys.ObjUtil.coerce(fan.fwt.Dialog.$type.pod(),fan.sys.Pod.$type),"err",parent,msg,details,commands);
}
fan.fwt.Dialog.openQuestion = function(parent,msg,details,commands)
{
  if (details === undefined) details = null;
  if (commands === undefined) commands = fan.sys.List.make(fan.fwt.Command.$type, [fan.fwt.Dialog.ok()]);
  return fan.fwt.Dialog.openMsgBox(fan.sys.ObjUtil.coerce(fan.fwt.Dialog.$type.pod(),fan.sys.Pod.$type),"question",parent,msg,details,commands);
}
fan.fwt.Dialog.openMsgBox = function(pod,keyBase,parent,body,details,commands)
{
  if (details === undefined) details = null;
  if (commands === undefined) commands = fan.sys.List.make(fan.fwt.Command.$type, [fan.fwt.Dialog.ok()]);
  var $this = this;
  var title = pod.locale(fan.sys.Str.plus(fan.sys.Str.plus("",keyBase),".name"));
  var locImage = pod.locale(fan.sys.Str.plus(fan.sys.Str.plus("",keyBase),".image"));
  var image = null;
  try
  {
    image = fan.gfx.Image.make(fan.sys.Str.toUri(locImage));
  }
  catch ($_u21)
  {
  }
  ;
  if (fan.sys.ObjUtil.is(details,fan.sys.Type.find("fwt::Command[]")))
  {
    commands = fan.sys.ObjUtil.coerce(details,fan.sys.Type.find("fwt::Command[]"));
    details = null;
  }
  ;
  var dialog = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.fwt.Dialog.make(parent),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::Dialog",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.title$(fan.sys.ObjUtil.coerce(title,fan.sys.Str.$type));
      it.m_image = image;
      it.m_body = body;
      it.m_details = details;
      it.m_commands = commands;
      return;
    })),fan.fwt.Dialog.$type);
  return dialog.open();
}
fan.fwt.Dialog.openPromptStr = function(parent,msg,def,prefCols)
{
  if (def === undefined) def = "";
  if (prefCols === undefined) prefCols = 20;
  var $this = this;
  var field = fan.fwt.Text.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::Text",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.text$(def);
      it.m_prefCols = prefCols;
      return;
    }));
  var pane = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.fwt.GridPane.make(),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::GridPane",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_numCols = 2;
      it.m_expandCol = fan.sys.ObjUtil.coerce(1,fan.sys.Int.$type.toNullable());
      it.m_halignCells = fan.gfx.Halign.m_fill;
      fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.fwt.Label.make(),fan.sys.Func.make(
        fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::Label",false)]),
        fan.sys.Void.$type,
        function(it)
        {
          it.text$(msg);
          return;
        })),fan.fwt.Label.$type)),fan.fwt.GridPane.$type).add(field);
      return;
    })),fan.fwt.GridPane.$type);
  var ok = fan.fwt.Dialog.ok();
  var cancel = fan.fwt.Dialog.cancel();
  field.m_onAction.add(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("e","fwt::Event",false)]),
    fan.sys.Void.$type,
    function(e)
    {
      e.m_widget.window().close(ok);
      return;
    }));
  var r = fan.fwt.Dialog.openMsgBox(fan.sys.ObjUtil.coerce(fan.fwt.Dialog.$type.pod(),fan.sys.Pod.$type),"question",parent,pane,fan.sys.List.make(fan.fwt.Command.$type, [ok,cancel]));
  if (fan.sys.ObjUtil.compareNE(r,ok))
  {
    return null;
  }
  ;
  return field.text();
}
fan.fwt.Dialog.make = function(parent)
{
  var self = new fan.fwt.Dialog();
  fan.fwt.Dialog.make$(self,parent);
  return self;
}
fan.fwt.Dialog.make$ = function(self,parent)
{
  fan.fwt.Window.make$(self,parent);
  ;
  self.icon$(parent.icon());
  return;
}
fan.fwt.Dialog.prototype.open = function()
{
  if (this.content() == null)
  {
    this.buildContent();
  }
  ;
  return fan.fwt.Window.prototype.open.call(this);
}
fan.fwt.Dialog.prototype.buildContent = function()
{
  var $this = this;
  var body = this.m_body;
  if (body == null)
  {
    body = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.fwt.Label.make(),fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::Label",false)]),
      fan.sys.Void.$type,
      function(it)
      {
        return;
      })),fan.fwt.Label.$type);
  }
  ;
  if (fan.sys.ObjUtil.is(body,fan.sys.Str.$type))
  {
    body = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.fwt.Label.make(),fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::Label",false)]),
      fan.sys.Void.$type,
      function(it)
      {
        it.text$(fan.sys.ObjUtil.toStr(body));
        return;
      })),fan.fwt.Label.$type);
  }
  ;
  if (!fan.sys.ObjUtil.is(body,fan.fwt.Widget.$type))
  {
    throw fan.sys.Err.make(fan.sys.Str.plus("body is not Str or Widget: ",fan.sys.Type.of(fan.sys.ObjUtil.coerce(body,fan.sys.Obj.$type))));
  }
  ;
  var bodyAndImage = fan.sys.ObjUtil.as(body,fan.fwt.Widget.$type);
  if (this.m_image != null)
  {
    bodyAndImage = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.fwt.GridPane.make(),fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::GridPane",false)]),
      fan.sys.Void.$type,
      function(it)
      {
        it.m_numCols = 2;
        it.m_expandCol = fan.sys.ObjUtil.coerce(1,fan.sys.Int.$type.toNullable());
        it.m_halignCells = fan.gfx.Halign.m_fill;
        fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.fwt.Label.make(),fan.sys.Func.make(
          fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::Label",false)]),
          fan.sys.Void.$type,
          function(it)
          {
            it.image$($this.m_image);
            return;
          })),fan.fwt.Label.$type)),fan.fwt.GridPane.$type).add(fan.sys.ObjUtil.coerce(body,fan.fwt.Widget.$type.toNullable()));
        return;
      })),fan.fwt.GridPane.$type);
  }
  ;
  if (this.m_details != null)
  {
    if (fan.sys.ObjUtil.is(this.m_details,fan.sys.Err.$type))
    {
      this.m_details = fan.sys.ObjUtil.coerce(this.m_details,fan.sys.Err.$type).traceToStr();
    }
    ;
    if (fan.sys.ObjUtil.is(this.m_details,fan.sys.Str.$type))
    {
      this.m_details = fan.fwt.Text.make(fan.sys.Func.make(
        fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::Text",false)]),
        fan.sys.Void.$type,
        function(it)
        {
          it.m_multiLine = true;
          it.m_editable = false;
          it.m_prefRows = 20;
          it.font$(fan.fwt.Desktop.sysFontMonospace());
          it.text$(fan.sys.ObjUtil.toStr($this.m_details));
          return;
        }));
    }
    ;
    if (!fan.sys.ObjUtil.is(this.m_details,fan.fwt.Widget.$type))
    {
      throw fan.sys.ArgErr.make(fan.sys.Str.plus("details not Err, Str, or Widget: ",fan.sys.Type.of(fan.sys.ObjUtil.coerce(this.m_details,fan.sys.Obj.$type))));
    }
    ;
    this.m_commands = this.m_commands.dup().add(fan.fwt.DialogCommand.make(fan.fwt.DialogCommandId.m_details,this.m_details));
  }
  ;
  if (this.m_commands == null)
  {
    var commands = fan.sys.List.make(fan.fwt.Command.$type);
  }
  ;
  var buttons = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.fwt.GridPane.make(),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::GridPane",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_numCols = $this.m_commands.size();
      it.m_halignCells = fan.gfx.Halign.m_fill;
      it.m_halignPane = fan.gfx.Halign.m_right;
      it.m_uniformRows = true;
      it.m_uniformCols = true;
      return;
    })),fan.fwt.GridPane.$type);
  this.m_commands.each(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("c","fwt::Command",false)]),
    fan.sys.Void.$type,
    function(c)
    {
      c.m_assocDialog = $this;
      buttons.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.fwt.ConstraintPane.make(),fan.sys.Func.make(
        fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::ConstraintPane",false)]),
        fan.sys.Void.$type,
        function(it)
        {
          it.m_minw = fan.sys.ObjUtil.coerce(70,fan.sys.Int.$type.toNullable());
          it.add(fan.fwt.Button.makeCommand(c,fan.sys.Func.make(
            fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::Button",false)]),
            fan.sys.Void.$type,
            function(it)
            {
              it.m_insets = fan.gfx.Insets.make(0,fan.sys.ObjUtil.coerce(10,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(10,fan.sys.Int.$type.toNullable()));
              return;
            })));
          return;
        })),fan.fwt.ConstraintPane.$type));
      return;
    }));
  this.content$(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.fwt.GridPane.make(),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::GridPane",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_expandCol = fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable());
      it.m_expandRow = fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable());
      it.m_valignCells = fan.gfx.Valign.m_fill;
      it.m_halignCells = fan.gfx.Halign.m_fill;
      fan.sys.ObjUtil.coerce(it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.fwt.InsetPane.make(16),fan.sys.Func.make(
        fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::InsetPane",false)]),
        fan.sys.Void.$type,
        function(it)
        {
          it.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.fwt.ConstraintPane.make(),fan.sys.Func.make(
            fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::ConstraintPane",false)]),
            fan.sys.Void.$type,
            function(it)
            {
              it.m_minw = fan.sys.ObjUtil.coerce((function($this) { if ($this.m_details == null) return 200; return 350; })($this),fan.sys.Int.$type.toNullable());
              it.add(bodyAndImage);
              return;
            })),fan.fwt.ConstraintPane.$type));
          return;
        })),fan.fwt.InsetPane.$type)),fan.fwt.GridPane.$type).add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.fwt.InsetPane.make(),fan.sys.Func.make(
        fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::InsetPane",false)]),
        fan.sys.Void.$type,
        function(it)
        {
          it.m_insets = fan.gfx.Insets.make(0,fan.sys.ObjUtil.coerce(16,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(16,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(16,fan.sys.Int.$type.toNullable()));
          it.add(buttons);
          return;
        })),fan.fwt.InsetPane.$type));
      return;
    })),fan.fwt.GridPane.$type));
  return this;
}
fan.fwt.Dialog.prototype.dummyDialog = function()
{
  return this.peer.dummyDialog(this);
}
fan.fwt.Dialog.prototype.m_image = null;
fan.fwt.Dialog.prototype.m_body = null;
fan.fwt.Dialog.prototype.m_details = null;
fan.fwt.Dialog.prototype.m_commands = null;
fan.fwt.DialogPeer = fan.sys.Obj.$extend(fan.fwt.WindowPeer);
fan.fwt.DialogPeer.prototype.$ctor = function(self) {}
fan.fwt.DialogPeer.prototype.open = function(self)
{
  // mount mask that functions as input blocker for modality
  var mask = document.createElement("div")
  with (mask.style)
  {
    position   = "fixed";
    top        = "0";
    left       = "0";
    width      = "100%";
    height     = "100%";
    background = "#000";
    opacity    = "0.0";
    filter     = "progid:DXImageTransform.Microsoft.Alpha(opacity=25);"
    webkitTransition = "100ms";
  }
  // mount shell we use to attach widgets to
  var shell = document.createElement("div")
  with (shell.style)
  {
    position   = "fixed";
    top        = "0";
    left       = "0";
    width      = "100%";
    height     = "100%";
  }
  // mount window
  var tbar = this.emptyDiv();
  with (tbar.style)
  {
    height     = "18px";
    padding    = "4px 6px";
    color      = "#fff";
    font       = "bold " + fan.fwt.WidgetPeer.fontToCss(fan.fwt.DesktopPeer.$sysFont);
    //textShadow = "0 -1px 1px #1c1c1c";
    textAlign  = "center";
    borderTop    = "1px solid #7c7c7c";
    borderBottom = "1px solid #282828";
    MozBorderRadiusTopleft     = "4px";
    MozBorderRadiusTopright    = "4px";
    webkitBorderTopLeftRadius  = "4px";
    webkitBorderTopRightRadius = "4px";
  }
  fan.fwt.WidgetPeer.setBg(tbar, fan.gfx.Gradient.fromStr("0% 0%, 0% 100%, #707070, #5a5a5a 0.5, #525252 0.5, #484848"));
  var content = this.emptyDiv();
  with (content.style)
  {
    background = "#eee";
  }
  var dlg = this.emptyDiv();
  with (dlg.style)
  {
    border     = "1px solid #404040";
    MozBorderRadiusTopleft     = "5px";
    MozBorderRadiusTopright    = "5px";
    webkitBorderTopLeftRadius  = "5px";
    webkitBorderTopRightRadius = "5px";
    MozBoxShadow    = "0 5px 12px #404040";
    webkitBoxShadow = "0 5px 12px #404040";
    webkitTransform = "scale(0.75)";
    opacity = "0.0";
  }
  tbar.appendChild(document.createTextNode(this.m_title));
  dlg.appendChild(tbar);
  dlg.appendChild(content);
  shell.appendChild(dlg);
  this.attachTo(self, content);
  document.body.appendChild(mask);
  document.body.appendChild(shell);
  self.relayout();
  // cache elements so we can remove when we close
  this.$mask = mask;
  this.$shell = shell;
  // animate open
  mask.style.opacity = "0.25";
  dlg.style.webkitTransition = "-webkit-transform 100ms, opacity 100ms";
  dlg.style.webkitTransform = "scale(1.0)";
  dlg.style.opacity = "1.0";
  // try to focus first form element
  var elem = fan.fwt.DialogPeer.findFormControl(content);
  if (elem != null)
  {
    // NOTE: needed to use a delay here for this to
    // work reliably, assumingly to give the renderer
    // time to layout DOM changes.
    var func = function() { elem.focus(); }
    setTimeout(func, 50);
  }
}
fan.fwt.DialogPeer.findFormControl = function(node)
{
  var tag = node.tagName;
  if (tag != null)
  {
    tag = tag.toLowerCase();
    if (tag == "input" || tag == "select" || tag == "textarea") return node;
  }
  for (var i=0; i<node.childNodes.length; i++)
  {
    var n = fan.fwt.DialogPeer.findFormControl(node.childNodes[i])
    if (n != null) return n;
  }
  return null;
}
fan.fwt.DialogPeer.prototype.close = function(self, result)
{
  // animate close
  if (this.$shell)
  {
    var dlg = this.$shell.firstChild;
    dlg.style.opacity = "0.0";
    dlg.style.webkitTransform = "scale(0.75)";
    this.$mask.style.opacity = "0.0";
  }
  // allow animation to complete
  var $this = this;
  setTimeout(function() {
    if ($this.$shell) $this.$shell.parentNode.removeChild($this.$shell);
    if ($this.$mask) $this.$mask.parentNode.removeChild($this.$mask);
    fan.fwt.WindowPeer.prototype.close.call($this, self, result);
  }, 100);
}
fan.fwt.DialogPeer.prototype.sync = function(self)
{
  var content = self.content();
  if (content == null || content.peer.elem == null) return;
  var shell = this.elem.parentNode.parentNode;
  var dlg   = this.elem.parentNode;
  var tbar  = dlg.firstChild;
  var pref  = content.prefSize();
  var th = 28;
  var w  = pref.m_w;
  var h  = pref.m_h + th;
  var x  = Math.floor((shell.offsetWidth - w) / 2);
  var y  = Math.floor((shell.offsetHeight - h) / 2);
  tbar.style.width = (w-12) + "px";  // -padding/border
  with (dlg.style)
  {
    left   = x + "px";
    top    = y + "px";
    width  = w + "px";
    height = h + "px";
  }
  this.pos$(this, fan.gfx.Point.make(0, th));
  this.size$(this, fan.gfx.Size.make(pref.m_w, pref.m_h));
  fan.fwt.WidgetPeer.prototype.sync.call(this, self);
}
fan.fwt.DialogPeer.prototype.title   = function(self) { return this.m_title; }
fan.fwt.DialogPeer.prototype.title$  = function(self, val) { this.m_title = val; }
fan.fwt.DialogPeer.prototype.m_title = "";
fan.fwt.DialogCommand = fan.sys.Obj.$extend(fan.fwt.Command);
fan.fwt.DialogCommand.prototype.$ctor = function()
{
  fan.fwt.Command.prototype.$ctor.call(this);
  var $this = this;
}
fan.fwt.DialogCommand.prototype.$typeof = function() { return fan.fwt.DialogCommand.$type; }
fan.fwt.DialogCommand.make = function(id,arg)
{
  var self = new fan.fwt.DialogCommand();
  fan.fwt.DialogCommand.make$(self,id,arg);
  return self;
}
fan.fwt.DialogCommand.make$ = function(self,id,arg)
{
  if (arg === undefined) arg = null;
  fan.fwt.Command.makeLocale$(self,fan.sys.ObjUtil.coerce(fan.fwt.Dialog.$type.pod(),fan.sys.Pod.$type),id.name());
  self.m_id = id;
  self.m_arg = arg;
  if (fan.sys.ObjUtil.equals(id,fan.fwt.DialogCommandId.m_details))
  {
    self.m_mode = fan.fwt.CommandMode.m_toggle;
  }
  ;
  return;
}
fan.fwt.DialogCommand.prototype.invoked = function(e)
{
  var $_u23 = this.m_id;
  if (fan.sys.ObjUtil.equals($_u23,fan.fwt.DialogCommandId.m_details))
  {
    this.toggleDetails();
  }
  else
  {
    (function($this) { var $_u24 = $this.window(); if ($_u24 == null) return null; return $_u24.close($this); })(this);
  }
  ;
  return;
}
fan.fwt.DialogCommand.prototype.hash = function()
{
  return fan.sys.ObjUtil.hash(this.m_id);
}
fan.fwt.DialogCommand.prototype.equals = function(that)
{
  if (!fan.sys.ObjUtil.is(that,fan.fwt.DialogCommand.$type))
  {
    return false;
  }
  ;
  return fan.sys.ObjUtil.equals(fan.sys.ObjUtil.coerce(that,fan.fwt.DialogCommand.$type).m_id,this.m_id);
}
fan.fwt.DialogCommand.prototype.toggleDetails = function()
{
  var dialog = fan.sys.ObjUtil.coerce(this.window(),fan.fwt.Dialog.$type);
  var details = fan.sys.ObjUtil.coerce(this.m_arg,fan.fwt.Widget.$type);
  if (details.m_parent == null)
  {
    dialog.content().add(details);
  }
  ;
  details.visible$(this.selected());
  dialog.pack();
  return;
}
fan.fwt.DialogCommand.prototype.arg = function()
{
  return this.m_arg;
}
fan.fwt.DialogCommand.prototype.arg$ = function(it)
{
  this.m_arg = it;
  return;
}
fan.fwt.DialogCommand.prototype.m_id = null;
fan.fwt.DialogCommand.prototype.m_arg = null;
fan.fwt.DialogCommandId = fan.sys.Obj.$extend(fan.sys.Enum);
fan.fwt.DialogCommandId.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.fwt.DialogCommandId.prototype.$typeof = function() { return fan.fwt.DialogCommandId.$type; }
fan.fwt.DialogCommandId.make = function($ordinal,$name)
{
  var self = new fan.fwt.DialogCommandId();
  fan.fwt.DialogCommandId.make$(self,$ordinal,$name);
  return self;
}
fan.fwt.DialogCommandId.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.fwt.DialogCommandId.fromStr = function(name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.fwt.DialogCommandId.$type,name,checked),fan.fwt.DialogCommandId.$type.toNullable());
}
fan.fwt.DialogCommandId.static$init = function()
{
  fan.fwt.DialogCommandId.m_ok = fan.fwt.DialogCommandId.make(0,"ok");
  fan.fwt.DialogCommandId.m_cancel = fan.fwt.DialogCommandId.make(1,"cancel");
  fan.fwt.DialogCommandId.m_yes = fan.fwt.DialogCommandId.make(2,"yes");
  fan.fwt.DialogCommandId.m_no = fan.fwt.DialogCommandId.make(3,"no");
  fan.fwt.DialogCommandId.m_details = fan.fwt.DialogCommandId.make(4,"details");
  fan.fwt.DialogCommandId.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u25 = fan.sys.List.make(fan.fwt.DialogCommandId.$type, [fan.fwt.DialogCommandId.m_ok,fan.fwt.DialogCommandId.m_cancel,fan.fwt.DialogCommandId.m_yes,fan.fwt.DialogCommandId.m_no,fan.fwt.DialogCommandId.m_details]); if ($_u25 == null) return null; return fan.sys.ObjUtil.toImmutable($_u25); })(this),fan.sys.Type.find("fwt::DialogCommandId[]"));
  return;
}
fan.fwt.DialogCommandId.m_ok = null;
fan.fwt.DialogCommandId.m_cancel = null;
fan.fwt.DialogCommandId.m_yes = null;
fan.fwt.DialogCommandId.m_no = null;
fan.fwt.DialogCommandId.m_details = null;
fan.fwt.DialogCommandId.m_vals = null;
fan.fwt.EdgePane = fan.sys.Obj.$extend(fan.fwt.Pane);
fan.fwt.EdgePane.prototype.$ctor = function()
{
  fan.fwt.Pane.prototype.$ctor.call(this);
  this.peer = new fan.fwt.PanePeer(this);
  var $this = this;
}
fan.fwt.EdgePane.prototype.$typeof = function() { return fan.fwt.EdgePane.$type; }
fan.fwt.EdgePane.prototype.top = function()
{
  return this.m_top;
}
fan.fwt.EdgePane.prototype.top$ = function(it)
{
  fan.sys.ObjUtil.coerce(this.remove(this.m_top),fan.fwt.EdgePane.$type).add(it);
  this.m_top = it;
  return;
}
fan.fwt.EdgePane.prototype.bottom = function()
{
  return this.m_bottom;
}
fan.fwt.EdgePane.prototype.bottom$ = function(it)
{
  fan.sys.ObjUtil.coerce(this.remove(this.m_bottom),fan.fwt.EdgePane.$type).add(it);
  this.m_bottom = it;
  return;
}
fan.fwt.EdgePane.prototype.left = function()
{
  return this.m_left;
}
fan.fwt.EdgePane.prototype.left$ = function(it)
{
  fan.sys.ObjUtil.coerce(this.remove(this.m_left),fan.fwt.EdgePane.$type).add(it);
  this.m_left = it;
  return;
}
fan.fwt.EdgePane.prototype.right = function()
{
  return this.m_right;
}
fan.fwt.EdgePane.prototype.right$ = function(it)
{
  fan.sys.ObjUtil.coerce(this.remove(this.m_right),fan.fwt.EdgePane.$type).add(it);
  this.m_right = it;
  return;
}
fan.fwt.EdgePane.prototype.center = function()
{
  return this.m_center;
}
fan.fwt.EdgePane.prototype.center$ = function(it)
{
  fan.sys.ObjUtil.coerce(this.remove(this.m_center),fan.fwt.EdgePane.$type).add(it);
  this.m_center = it;
  return;
}
fan.fwt.EdgePane.prototype.prefSize = function(hints)
{
  if (hints === undefined) hints = fan.gfx.Hints.m_defVal;
  var top = this.pref(this.top());
  var bottom = this.pref(this.bottom());
  var left = this.pref(this.left());
  var right = this.pref(this.right());
  var center = this.pref(this.center());
  var w = fan.sys.Int.max(fan.sys.Int.max(fan.sys.Int.plus(fan.sys.Int.plus(left.m_w,center.m_w),right.m_w),top.m_w),bottom.m_w);
  var h = fan.sys.Int.plus(fan.sys.Int.plus(top.m_h,bottom.m_h),fan.sys.Int.max(fan.sys.Int.max(left.m_h,center.m_h),right.m_h));
  return fan.gfx.Size.make(w,h);
}
fan.fwt.EdgePane.prototype.pref = function(w)
{
  return (function($this) { if ((w == null || !w.visible())) return fan.gfx.Size.m_defVal; return w.prefSize(fan.gfx.Hints.m_defVal); })(this);
}
fan.fwt.EdgePane.prototype.onLayout = function()
{
  var s = this.size();
  var x = 0;
  var y = 0;
  var w = s.m_w;
  var h = s.m_h;
  var top = this.top();
  if (top != null)
  {
    var prefh = top.prefSize(fan.gfx.Hints.make(fan.sys.ObjUtil.coerce(w,fan.sys.Int.$type.toNullable()),null)).m_h;
    top.bounds$(fan.gfx.Rect.make(x,y,w,prefh));
    y = fan.sys.Int.plus(y,prefh);
    h = fan.sys.Int.minus(h,prefh);
  }
  ;
  var bottom = this.bottom();
  if (bottom != null)
  {
    var prefh = bottom.prefSize(fan.gfx.Hints.make(fan.sys.ObjUtil.coerce(w,fan.sys.Int.$type.toNullable()),null)).m_h;
    bottom.bounds$(fan.gfx.Rect.make(x,fan.sys.Int.minus(fan.sys.Int.plus(y,h),prefh),w,prefh));
    h = fan.sys.Int.minus(h,prefh);
  }
  ;
  var left = this.left();
  if (left != null)
  {
    var prefw = left.prefSize(fan.gfx.Hints.make(null,fan.sys.ObjUtil.coerce(h,fan.sys.Int.$type.toNullable()))).m_w;
    left.bounds$(fan.gfx.Rect.make(x,y,prefw,h));
    x = fan.sys.Int.plus(x,prefw);
    w = fan.sys.Int.minus(w,prefw);
  }
  ;
  var right = this.right();
  if (right != null)
  {
    var prefw = right.prefSize(fan.gfx.Hints.make(null,fan.sys.ObjUtil.coerce(h,fan.sys.Int.$type.toNullable()))).m_w;
    right.bounds$(fan.gfx.Rect.make(fan.sys.Int.minus(fan.sys.Int.plus(x,w),prefw),y,prefw,h));
    w = fan.sys.Int.minus(w,prefw);
  }
  ;
  var center = this.center();
  if (center != null)
  {
    center.bounds$(fan.gfx.Rect.make(x,y,w,h));
  }
  ;
  return;
}
fan.fwt.EdgePane.make = function()
{
  var self = new fan.fwt.EdgePane();
  fan.fwt.EdgePane.make$(self);
  return self;
}
fan.fwt.EdgePane.make$ = function(self)
{
  fan.fwt.Pane.make$(self);
  return;
}
fan.fwt.EdgePane.prototype.m_top = null;
fan.fwt.EdgePane.prototype.m_bottom = null;
fan.fwt.EdgePane.prototype.m_left = null;
fan.fwt.EdgePane.prototype.m_right = null;
fan.fwt.EdgePane.prototype.m_center = null;
fan.fwt.CommandMode = fan.sys.Obj.$extend(fan.sys.Enum);
fan.fwt.CommandMode.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.fwt.CommandMode.prototype.$typeof = function() { return fan.fwt.CommandMode.$type; }
fan.fwt.CommandMode.prototype.toButtonMode = function()
{
  return (function($this) { if (fan.sys.ObjUtil.equals($this,fan.fwt.CommandMode.m_push)) return fan.fwt.ButtonMode.m_push; return fan.fwt.ButtonMode.m_toggle; })(this);
}
fan.fwt.CommandMode.prototype.toMenuItemMode = function()
{
  return (function($this) { if (fan.sys.ObjUtil.equals($this,fan.fwt.CommandMode.m_push)) return fan.fwt.MenuItemMode.m_push; return fan.fwt.MenuItemMode.m_check; })(this);
}
fan.fwt.CommandMode.make = function($ordinal,$name)
{
  var self = new fan.fwt.CommandMode();
  fan.fwt.CommandMode.make$(self,$ordinal,$name);
  return self;
}
fan.fwt.CommandMode.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.fwt.CommandMode.fromStr = function(name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.fwt.CommandMode.$type,name,checked),fan.fwt.CommandMode.$type.toNullable());
}
fan.fwt.CommandMode.static$init = function()
{
  fan.fwt.CommandMode.m_push = fan.fwt.CommandMode.make(0,"push");
  fan.fwt.CommandMode.m_toggle = fan.fwt.CommandMode.make(1,"toggle");
  fan.fwt.CommandMode.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u29 = fan.sys.List.make(fan.fwt.CommandMode.$type, [fan.fwt.CommandMode.m_push,fan.fwt.CommandMode.m_toggle]); if ($_u29 == null) return null; return fan.sys.ObjUtil.toImmutable($_u29); })(this),fan.sys.Type.find("fwt::CommandMode[]"));
  return;
}
fan.fwt.CommandMode.m_push = null;
fan.fwt.CommandMode.m_toggle = null;
fan.fwt.CommandMode.m_vals = null;
fan.fwt.ButtonMode = fan.sys.Obj.$extend(fan.sys.Enum);
fan.fwt.ButtonMode.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.fwt.ButtonMode.prototype.$typeof = function() { return fan.fwt.ButtonMode.$type; }
fan.fwt.ButtonMode.make = function($ordinal,$name)
{
  var self = new fan.fwt.ButtonMode();
  fan.fwt.ButtonMode.make$(self,$ordinal,$name);
  return self;
}
fan.fwt.ButtonMode.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.fwt.ButtonMode.fromStr = function(name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.fwt.ButtonMode.$type,name,checked),fan.fwt.ButtonMode.$type.toNullable());
}
fan.fwt.ButtonMode.static$init = function()
{
  fan.fwt.ButtonMode.m_check = fan.fwt.ButtonMode.make(0,"check");
  fan.fwt.ButtonMode.m_push = fan.fwt.ButtonMode.make(1,"push");
  fan.fwt.ButtonMode.m_radio = fan.fwt.ButtonMode.make(2,"radio");
  fan.fwt.ButtonMode.m_toggle = fan.fwt.ButtonMode.make(3,"toggle");
  fan.fwt.ButtonMode.m_sep = fan.fwt.ButtonMode.make(4,"sep");
  fan.fwt.ButtonMode.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u30 = fan.sys.List.make(fan.fwt.ButtonMode.$type, [fan.fwt.ButtonMode.m_check,fan.fwt.ButtonMode.m_push,fan.fwt.ButtonMode.m_radio,fan.fwt.ButtonMode.m_toggle,fan.fwt.ButtonMode.m_sep]); if ($_u30 == null) return null; return fan.sys.ObjUtil.toImmutable($_u30); })(this),fan.sys.Type.find("fwt::ButtonMode[]"));
  return;
}
fan.fwt.ButtonMode.m_check = null;
fan.fwt.ButtonMode.m_push = null;
fan.fwt.ButtonMode.m_radio = null;
fan.fwt.ButtonMode.m_toggle = null;
fan.fwt.ButtonMode.m_sep = null;
fan.fwt.ButtonMode.m_vals = null;
fan.fwt.MenuItemMode = fan.sys.Obj.$extend(fan.sys.Enum);
fan.fwt.MenuItemMode.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.fwt.MenuItemMode.prototype.$typeof = function() { return fan.fwt.MenuItemMode.$type; }
fan.fwt.MenuItemMode.make = function($ordinal,$name)
{
  var self = new fan.fwt.MenuItemMode();
  fan.fwt.MenuItemMode.make$(self,$ordinal,$name);
  return self;
}
fan.fwt.MenuItemMode.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.fwt.MenuItemMode.fromStr = function(name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.fwt.MenuItemMode.$type,name,checked),fan.fwt.MenuItemMode.$type.toNullable());
}
fan.fwt.MenuItemMode.static$init = function()
{
  fan.fwt.MenuItemMode.m_check = fan.fwt.MenuItemMode.make(0,"check");
  fan.fwt.MenuItemMode.m_push = fan.fwt.MenuItemMode.make(1,"push");
  fan.fwt.MenuItemMode.m_radio = fan.fwt.MenuItemMode.make(2,"radio");
  fan.fwt.MenuItemMode.m_sep = fan.fwt.MenuItemMode.make(3,"sep");
  fan.fwt.MenuItemMode.m_menu = fan.fwt.MenuItemMode.make(4,"menu");
  fan.fwt.MenuItemMode.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u31 = fan.sys.List.make(fan.fwt.MenuItemMode.$type, [fan.fwt.MenuItemMode.m_check,fan.fwt.MenuItemMode.m_push,fan.fwt.MenuItemMode.m_radio,fan.fwt.MenuItemMode.m_sep,fan.fwt.MenuItemMode.m_menu]); if ($_u31 == null) return null; return fan.sys.ObjUtil.toImmutable($_u31); })(this),fan.sys.Type.find("fwt::MenuItemMode[]"));
  return;
}
fan.fwt.MenuItemMode.m_check = null;
fan.fwt.MenuItemMode.m_push = null;
fan.fwt.MenuItemMode.m_radio = null;
fan.fwt.MenuItemMode.m_sep = null;
fan.fwt.MenuItemMode.m_menu = null;
fan.fwt.MenuItemMode.m_vals = null;
fan.fwt.WindowMode = fan.sys.Obj.$extend(fan.sys.Enum);
fan.fwt.WindowMode.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.fwt.WindowMode.prototype.$typeof = function() { return fan.fwt.WindowMode.$type; }
fan.fwt.WindowMode.make = function($ordinal,$name)
{
  var self = new fan.fwt.WindowMode();
  fan.fwt.WindowMode.make$(self,$ordinal,$name);
  return self;
}
fan.fwt.WindowMode.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.fwt.WindowMode.fromStr = function(name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.fwt.WindowMode.$type,name,checked),fan.fwt.WindowMode.$type.toNullable());
}
fan.fwt.WindowMode.static$init = function()
{
  fan.fwt.WindowMode.m_modeless = fan.fwt.WindowMode.make(0,"modeless");
  fan.fwt.WindowMode.m_windowModal = fan.fwt.WindowMode.make(1,"windowModal");
  fan.fwt.WindowMode.m_appModal = fan.fwt.WindowMode.make(2,"appModal");
  fan.fwt.WindowMode.m_sysModal = fan.fwt.WindowMode.make(3,"sysModal");
  fan.fwt.WindowMode.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u32 = fan.sys.List.make(fan.fwt.WindowMode.$type, [fan.fwt.WindowMode.m_modeless,fan.fwt.WindowMode.m_windowModal,fan.fwt.WindowMode.m_appModal,fan.fwt.WindowMode.m_sysModal]); if ($_u32 == null) return null; return fan.sys.ObjUtil.toImmutable($_u32); })(this),fan.sys.Type.find("fwt::WindowMode[]"));
  return;
}
fan.fwt.WindowMode.m_modeless = null;
fan.fwt.WindowMode.m_windowModal = null;
fan.fwt.WindowMode.m_appModal = null;
fan.fwt.WindowMode.m_sysModal = null;
fan.fwt.WindowMode.m_vals = null;
fan.fwt.FileDialogMode = fan.sys.Obj.$extend(fan.sys.Enum);
fan.fwt.FileDialogMode.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.fwt.FileDialogMode.prototype.$typeof = function() { return fan.fwt.FileDialogMode.$type; }
fan.fwt.FileDialogMode.make = function($ordinal,$name)
{
  var self = new fan.fwt.FileDialogMode();
  fan.fwt.FileDialogMode.make$(self,$ordinal,$name);
  return self;
}
fan.fwt.FileDialogMode.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.fwt.FileDialogMode.fromStr = function(name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.fwt.FileDialogMode.$type,name,checked),fan.fwt.FileDialogMode.$type.toNullable());
}
fan.fwt.FileDialogMode.static$init = function()
{
  fan.fwt.FileDialogMode.m_openFile = fan.fwt.FileDialogMode.make(0,"openFile");
  fan.fwt.FileDialogMode.m_openFiles = fan.fwt.FileDialogMode.make(1,"openFiles");
  fan.fwt.FileDialogMode.m_saveFile = fan.fwt.FileDialogMode.make(2,"saveFile");
  fan.fwt.FileDialogMode.m_openDir = fan.fwt.FileDialogMode.make(3,"openDir");
  fan.fwt.FileDialogMode.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u33 = fan.sys.List.make(fan.fwt.FileDialogMode.$type, [fan.fwt.FileDialogMode.m_openFile,fan.fwt.FileDialogMode.m_openFiles,fan.fwt.FileDialogMode.m_saveFile,fan.fwt.FileDialogMode.m_openDir]); if ($_u33 == null) return null; return fan.sys.ObjUtil.toImmutable($_u33); })(this),fan.sys.Type.find("fwt::FileDialogMode[]"));
  return;
}
fan.fwt.FileDialogMode.m_openFile = null;
fan.fwt.FileDialogMode.m_openFiles = null;
fan.fwt.FileDialogMode.m_saveFile = null;
fan.fwt.FileDialogMode.m_openDir = null;
fan.fwt.FileDialogMode.m_vals = null;
fan.fwt.SortMode = fan.sys.Obj.$extend(fan.sys.Enum);
fan.fwt.SortMode.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.fwt.SortMode.prototype.$typeof = function() { return fan.fwt.SortMode.$type; }
fan.fwt.SortMode.prototype.toggle = function()
{
  return (function($this) { if ($this === fan.fwt.SortMode.m_up) return fan.fwt.SortMode.m_down; return fan.fwt.SortMode.m_up; })(this);
}
fan.fwt.SortMode.make = function($ordinal,$name)
{
  var self = new fan.fwt.SortMode();
  fan.fwt.SortMode.make$(self,$ordinal,$name);
  return self;
}
fan.fwt.SortMode.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.fwt.SortMode.fromStr = function(name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.fwt.SortMode.$type,name,checked),fan.fwt.SortMode.$type.toNullable());
}
fan.fwt.SortMode.static$init = function()
{
  fan.fwt.SortMode.m_up = fan.fwt.SortMode.make(0,"up");
  fan.fwt.SortMode.m_down = fan.fwt.SortMode.make(1,"down");
  fan.fwt.SortMode.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u35 = fan.sys.List.make(fan.fwt.SortMode.$type, [fan.fwt.SortMode.m_up,fan.fwt.SortMode.m_down]); if ($_u35 == null) return null; return fan.sys.ObjUtil.toImmutable($_u35); })(this),fan.sys.Type.find("fwt::SortMode[]"));
  return;
}
fan.fwt.SortMode.m_up = null;
fan.fwt.SortMode.m_down = null;
fan.fwt.SortMode.m_vals = null;
fan.fwt.Event = fan.sys.Obj.$extend(fan.sys.Obj);
fan.fwt.Event.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_id = fan.fwt.EventId.m_unknown;
  this.m_consumed = false;
  return;
}
fan.fwt.Event.prototype.$typeof = function() { return fan.fwt.Event.$type; }
fan.fwt.Event.prototype.id = function()
{
  return this.m_id;
}
fan.fwt.Event.prototype.id$ = function(it)
{
  this.m_id = it;
  return;
}
fan.fwt.Event.prototype.widget = function()
{
  return this.m_widget;
}
fan.fwt.Event.prototype.widget$ = function(it)
{
  this.m_widget = it;
  return;
}
fan.fwt.Event.prototype.window = function()
{
  return (function($this) { var $_u36 = $this.m_widget; if ($_u36 == null) return null; return $_u36.window(); })(this);
}
fan.fwt.Event.prototype.index = function()
{
  return this.m_index;
}
fan.fwt.Event.prototype.index$ = function(it)
{
  this.m_index = it;
  return;
}
fan.fwt.Event.prototype.offset = function()
{
  return this.m_offset;
}
fan.fwt.Event.prototype.offset$ = function(it)
{
  this.m_offset = it;
  return;
}
fan.fwt.Event.prototype.size = function()
{
  return this.m_size;
}
fan.fwt.Event.prototype.size$ = function(it)
{
  this.m_size = it;
  return;
}
fan.fwt.Event.prototype.button = function()
{
  return this.m_button;
}
fan.fwt.Event.prototype.button$ = function(it)
{
  this.m_button = it;
  return;
}
fan.fwt.Event.prototype.keyChar = function()
{
  return this.m_keyChar;
}
fan.fwt.Event.prototype.keyChar$ = function(it)
{
  this.m_keyChar = it;
  return;
}
fan.fwt.Event.prototype.key = function()
{
  return this.m_key;
}
fan.fwt.Event.prototype.key$ = function(it)
{
  this.m_key = it;
  return;
}
fan.fwt.Event.prototype.pos = function()
{
  return this.m_pos;
}
fan.fwt.Event.prototype.pos$ = function(it)
{
  this.m_pos = it;
  return;
}
fan.fwt.Event.prototype.count = function()
{
  return this.m_count;
}
fan.fwt.Event.prototype.count$ = function(it)
{
  this.m_count = it;
  return;
}
fan.fwt.Event.prototype.data = function()
{
  return this.m_data;
}
fan.fwt.Event.prototype.data$ = function(it)
{
  this.m_data = it;
  return;
}
fan.fwt.Event.prototype.popup = function()
{
  return this.m_popup;
}
fan.fwt.Event.prototype.popup$ = function(it)
{
  this.m_popup = it;
  if (it != null)
  {
    this.consume();
  }
  ;
  return;
}
fan.fwt.Event.prototype.consumed = function()
{
  return this.m_consumed;
}
fan.fwt.Event.prototype.consumed$ = function(it)
{
  this.m_consumed = it;
  return;
}
fan.fwt.Event.prototype.consume = function()
{
  this.m_consumed = true;
  return;
}
fan.fwt.Event.prototype.toStr = function()
{
  var s = fan.sys.StrBuf.make();
  s.add("Event { id=").add(this.m_id);
  if (this.m_index != null)
  {
    s.join("index=").add(fan.sys.ObjUtil.coerce(this.m_index,fan.sys.Obj.$type.toNullable()));
  }
  ;
  if (this.m_offset != null)
  {
    s.join("offset=").add(fan.sys.ObjUtil.coerce(this.m_offset,fan.sys.Obj.$type.toNullable()));
  }
  ;
  if (this.m_size != null)
  {
    s.join("size=").add(fan.sys.ObjUtil.coerce(this.m_size,fan.sys.Obj.$type.toNullable()));
  }
  ;
  if (this.m_button != null)
  {
    s.join("button=").add(fan.sys.ObjUtil.coerce(this.m_button,fan.sys.Obj.$type.toNullable()));
  }
  ;
  if (this.m_keyChar != null)
  {
    s.join("keyChar=").add(fan.sys.Str.toCode(fan.sys.Int.toChar(fan.sys.ObjUtil.coerce(this.m_keyChar,fan.sys.Int.$type)),fan.sys.ObjUtil.coerce(39,fan.sys.Int.$type.toNullable()),true));
  }
  ;
  if (this.m_key != null)
  {
    s.join("key=").add(this.m_key);
  }
  ;
  if (this.m_pos != null)
  {
    s.join("pos=").add(this.m_pos);
  }
  ;
  if (this.m_count != null)
  {
    s.join("count=").add(fan.sys.ObjUtil.coerce(this.m_count,fan.sys.Obj.$type.toNullable()));
  }
  ;
  if (this.m_data != null)
  {
    s.join("data=").add(this.m_data);
  }
  ;
  if (this.m_consumed)
  {
    s.join("consumed");
  }
  ;
  s.add(" }");
  return s.toStr();
}
fan.fwt.Event.make = function()
{
  var self = new fan.fwt.Event();
  fan.fwt.Event.make$(self);
  return self;
}
fan.fwt.Event.make$ = function(self)
{
  ;
  return;
}
fan.fwt.Event.prototype.m_id = null;
fan.fwt.Event.prototype.m_widget = null;
fan.fwt.Event.prototype.m_index = null;
fan.fwt.Event.prototype.m_offset = null;
fan.fwt.Event.prototype.m_size = null;
fan.fwt.Event.prototype.m_button = null;
fan.fwt.Event.prototype.m_keyChar = null;
fan.fwt.Event.prototype.m_key = null;
fan.fwt.Event.prototype.m_pos = null;
fan.fwt.Event.prototype.m_count = null;
fan.fwt.Event.prototype.m_data = null;
fan.fwt.Event.prototype.m_popup = null;
fan.fwt.Event.prototype.m_consumed = false;
fan.fwt.EventId = fan.sys.Obj.$extend(fan.sys.Enum);
fan.fwt.EventId.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.fwt.EventId.prototype.$typeof = function() { return fan.fwt.EventId.$type; }
fan.fwt.EventId.make = function($ordinal,$name)
{
  var self = new fan.fwt.EventId();
  fan.fwt.EventId.make$(self,$ordinal,$name);
  return self;
}
fan.fwt.EventId.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.fwt.EventId.fromStr = function(name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.fwt.EventId.$type,name,checked),fan.fwt.EventId.$type.toNullable());
}
fan.fwt.EventId.static$init = function()
{
  fan.fwt.EventId.m_unknown = fan.fwt.EventId.make(0,"unknown");
  fan.fwt.EventId.m_focus = fan.fwt.EventId.make(1,"focus");
  fan.fwt.EventId.m_blur = fan.fwt.EventId.make(2,"blur");
  fan.fwt.EventId.m_keyDown = fan.fwt.EventId.make(3,"keyDown");
  fan.fwt.EventId.m_keyUp = fan.fwt.EventId.make(4,"keyUp");
  fan.fwt.EventId.m_mouseDown = fan.fwt.EventId.make(5,"mouseDown");
  fan.fwt.EventId.m_mouseUp = fan.fwt.EventId.make(6,"mouseUp");
  fan.fwt.EventId.m_mouseEnter = fan.fwt.EventId.make(7,"mouseEnter");
  fan.fwt.EventId.m_mouseExit = fan.fwt.EventId.make(8,"mouseExit");
  fan.fwt.EventId.m_mouseHover = fan.fwt.EventId.make(9,"mouseHover");
  fan.fwt.EventId.m_mouseMove = fan.fwt.EventId.make(10,"mouseMove");
  fan.fwt.EventId.m_mouseWheel = fan.fwt.EventId.make(11,"mouseWheel");
  fan.fwt.EventId.m_action = fan.fwt.EventId.make(12,"action");
  fan.fwt.EventId.m_modified = fan.fwt.EventId.make(13,"modified");
  fan.fwt.EventId.m_verify = fan.fwt.EventId.make(14,"verify");
  fan.fwt.EventId.m_verifyKey = fan.fwt.EventId.make(15,"verifyKey");
  fan.fwt.EventId.m_select = fan.fwt.EventId.make(16,"select");
  fan.fwt.EventId.m_caret = fan.fwt.EventId.make(17,"caret");
  fan.fwt.EventId.m_hyperlink = fan.fwt.EventId.make(18,"hyperlink");
  fan.fwt.EventId.m_popup = fan.fwt.EventId.make(19,"popup");
  fan.fwt.EventId.m_open = fan.fwt.EventId.make(20,"open");
  fan.fwt.EventId.m_close = fan.fwt.EventId.make(21,"close");
  fan.fwt.EventId.m_active = fan.fwt.EventId.make(22,"active");
  fan.fwt.EventId.m_inactive = fan.fwt.EventId.make(23,"inactive");
  fan.fwt.EventId.m_iconified = fan.fwt.EventId.make(24,"iconified");
  fan.fwt.EventId.m_deiconified = fan.fwt.EventId.make(25,"deiconified");
  fan.fwt.EventId.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u37 = fan.sys.List.make(fan.fwt.EventId.$type, [fan.fwt.EventId.m_unknown,fan.fwt.EventId.m_focus,fan.fwt.EventId.m_blur,fan.fwt.EventId.m_keyDown,fan.fwt.EventId.m_keyUp,fan.fwt.EventId.m_mouseDown,fan.fwt.EventId.m_mouseUp,fan.fwt.EventId.m_mouseEnter,fan.fwt.EventId.m_mouseExit,fan.fwt.EventId.m_mouseHover,fan.fwt.EventId.m_mouseMove,fan.fwt.EventId.m_mouseWheel,fan.fwt.EventId.m_action,fan.fwt.EventId.m_modified,fan.fwt.EventId.m_verify,fan.fwt.EventId.m_verifyKey,fan.fwt.EventId.m_select,fan.fwt.EventId.m_caret,fan.fwt.EventId.m_hyperlink,fan.fwt.EventId.m_popup,fan.fwt.EventId.m_open,fan.fwt.EventId.m_close,fan.fwt.EventId.m_active,fan.fwt.EventId.m_inactive,fan.fwt.EventId.m_iconified,fan.fwt.EventId.m_deiconified]); if ($_u37 == null) return null; return fan.sys.ObjUtil.toImmutable($_u37); })(this),fan.sys.Type.find("fwt::EventId[]"));
  return;
}
fan.fwt.EventId.m_unknown = null;
fan.fwt.EventId.m_focus = null;
fan.fwt.EventId.m_blur = null;
fan.fwt.EventId.m_keyDown = null;
fan.fwt.EventId.m_keyUp = null;
fan.fwt.EventId.m_mouseDown = null;
fan.fwt.EventId.m_mouseUp = null;
fan.fwt.EventId.m_mouseEnter = null;
fan.fwt.EventId.m_mouseExit = null;
fan.fwt.EventId.m_mouseHover = null;
fan.fwt.EventId.m_mouseMove = null;
fan.fwt.EventId.m_mouseWheel = null;
fan.fwt.EventId.m_action = null;
fan.fwt.EventId.m_modified = null;
fan.fwt.EventId.m_verify = null;
fan.fwt.EventId.m_verifyKey = null;
fan.fwt.EventId.m_select = null;
fan.fwt.EventId.m_caret = null;
fan.fwt.EventId.m_hyperlink = null;
fan.fwt.EventId.m_popup = null;
fan.fwt.EventId.m_open = null;
fan.fwt.EventId.m_close = null;
fan.fwt.EventId.m_active = null;
fan.fwt.EventId.m_inactive = null;
fan.fwt.EventId.m_iconified = null;
fan.fwt.EventId.m_deiconified = null;
fan.fwt.EventId.m_vals = null;
fan.fwt.EventListeners = fan.sys.Obj.$extend(fan.sys.Obj);
fan.fwt.EventListeners.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_listeners = fan.sys.List.make(fan.sys.Type.find("|fwt::Event->sys::Void|"));
  return;
}
fan.fwt.EventListeners.prototype.$typeof = function() { return fan.fwt.EventListeners.$type; }
fan.fwt.EventListeners.prototype.list = function()
{
  return this.m_listeners.ro();
}
fan.fwt.EventListeners.prototype.isEmpty = function()
{
  return this.m_listeners.isEmpty();
}
fan.fwt.EventListeners.prototype.size = function()
{
  return this.m_listeners.size();
}
fan.fwt.EventListeners.prototype.add = function(cb)
{
  this.m_listeners.add(cb);
  this.modified();
  return;
}
fan.fwt.EventListeners.prototype.remove = function(cb)
{
  this.m_listeners.remove(cb);
  this.modified();
  return;
}
fan.fwt.EventListeners.prototype.fire = function(event)
{
  var $this = this;
  this.m_listeners.each(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("cb","|fwt::Event->sys::Void|",false)]),
    fan.sys.Void.$type,
    function(cb)
    {
      try
      {
        if ((event == null || !event.m_consumed))
        {
          cb.call(fan.sys.ObjUtil.coerce(event,fan.fwt.Event.$type));
        }
        ;
      }
      catch ($_u38)
      {
        $_u38 = fan.sys.Err.make($_u38);
        if ($_u38 instanceof fan.sys.Err)
        {
          var e = $_u38;
          var e;
          fan.sys.ObjUtil.echo(fan.sys.Str.plus("event: ",event));
          e.trace();
        }
        else
        {
          throw $_u38;
        }
      }
      ;
      return;
    }));
  return;
}
fan.fwt.EventListeners.prototype.modified = function()
{
  try
  {
    (function($this) { var $_u39 = $this.m_onModify; if ($_u39 == null) return null; return $_u39.call($this); })(this);
  }
  catch ($_u40)
  {
    $_u40 = fan.sys.Err.make($_u40);
    if ($_u40 instanceof fan.sys.Err)
    {
      var e = $_u40;
      var e;
      e.trace();
    }
    else
    {
      throw $_u40;
    }
  }
  ;
  return;
}
fan.fwt.EventListeners.prototype.listeners = function()
{
  return this.m_listeners;
}
fan.fwt.EventListeners.prototype.listeners$ = function(it)
{
  this.m_listeners = it;
  return;
}
fan.fwt.EventListeners.prototype.onModify = function()
{
  return this.m_onModify;
}
fan.fwt.EventListeners.prototype.onModify$ = function(it)
{
  this.m_onModify = it;
  return;
}
fan.fwt.EventListeners.make = function()
{
  var self = new fan.fwt.EventListeners();
  fan.fwt.EventListeners.make$(self);
  return self;
}
fan.fwt.EventListeners.make$ = function(self)
{
  ;
  return;
}
fan.fwt.EventListeners.prototype.m_listeners = null;
fan.fwt.EventListeners.prototype.m_onModify = null;
fan.fwt.FwtEnv = fan.sys.Obj.$extend(fan.gfx.GfxEnv);
fan.fwt.FwtEnv.prototype.$ctor = function()
{
  fan.gfx.GfxEnv.prototype.$ctor.call(this);
  this.peer = new fan.fwt.FwtEnvPeer(this);
  var $this = this;
}
fan.fwt.FwtEnv.prototype.$typeof = function() { return fan.fwt.FwtEnv.$type; }
fan.fwt.FwtEnv.prototype.imageSize = function(i)
{
  return this.peer.imageSize(this,i);
}
fan.fwt.FwtEnv.prototype.imageResize = function(i,s)
{
  return this.peer.imageResize(this,i,s);
}
fan.fwt.FwtEnv.prototype.fontHeight = function(f)
{
  return this.peer.fontHeight(this,f);
}
fan.fwt.FwtEnv.prototype.fontAscent = function(f)
{
  return this.peer.fontAscent(this,f);
}
fan.fwt.FwtEnv.prototype.fontDescent = function(f)
{
  return this.peer.fontDescent(this,f);
}
fan.fwt.FwtEnv.prototype.fontLeading = function(f)
{
  return this.peer.fontLeading(this,f);
}
fan.fwt.FwtEnv.prototype.fontWidth = function(f,s)
{
  return this.peer.fontWidth(this,f,s);
}
fan.fwt.FwtEnv.make = function()
{
  var self = new fan.fwt.FwtEnv();
  fan.fwt.FwtEnv.make$(self);
  return self;
}
fan.fwt.FwtEnv.make$ = function(self)
{
  fan.gfx.GfxEnv.make$(self);
  return;
}
fan.fwt.FwtEnvPeer = fan.sys.Obj.$extend(fan.sys.Obj);
fan.fwt.FwtEnvPeer.prototype.$ctor = function(self) {}
fan.fwt.FwtEnvPeer.imgCache = [];
fan.fwt.FwtEnvPeer.imgCacheNextMemId = 1;
fan.fwt.FwtEnvPeer.nextMemUriStr = function()
{
  return fan.sys.Uri.fromStr("mem-" + (++fan.fwt.FwtEnvPeer.imgCacheNextMemId));
}
fan.fwt.FwtEnvPeer.loadImage = function(fanImg, widget)
{
  var uri = fanImg.m_uri;
  var key = uri.toStr();
  var jsImg = fan.fwt.FwtEnvPeer.imgCache[key]
  if (!jsImg)
  {
    jsImg = document.createElement("img");
    if (widget != null)
    {
      var onload = function()
      {
        // mark that we need relayout
        var win = widget.window()
        if (win != null)
        {
          fan.fwt.FwtEnvPeer.$win = win;
          fan.fwt.FwtEnvPeer.$needRelayout = true;
        }
        else if (fan.frescoKit)
        {
          // TODO FIXIT: some base class for Window/Dialog/Popup???
          var p = widget;
          while (p != null)
          {
            if (p instanceof fan.frescoKit.Popup) break;
            p = p.parent();
          }
          if (p instanceof fan.frescoKit.Popup)
          {
            fan.fwt.FwtEnvPeer.$win = p;
            fan.fwt.FwtEnvPeer.$needRelayout = true;
          }
        }
      }
      if (jsImg.addEventListener)
        jsImg.onload = onload;
      // TODO - not seeing this needed yet in IE8...
      //else
      //  jsImg.attachEvent('onload', onload);
    }
    jsImg.src = fan.fwt.WidgetPeer.uriToImageSrc(uri);
    fan.fwt.FwtEnvPeer.imgCache[key] = jsImg;
  }
  return jsImg
}
fan.fwt.FwtEnvPeer.$win = null;
fan.fwt.FwtEnvPeer.$needRelayout = false;
fan.fwt.FwtEnvPeer.$checkRelayout = function()
{
  if (!fan.fwt.FwtEnvPeer.$needRelayout) return;
  if (fan.fwt.FwtEnvPeer.$win == null) return;
  fan.fwt.FwtEnvPeer.$needRelayout = false;
  fan.fwt.FwtEnvPeer.$win.relayout();
}
setInterval(fan.fwt.FwtEnvPeer.$checkRelayout, 50);
fan.fwt.FwtEnvPeer.prototype.imageSize = function(self, fanImg)
{
  var jsImg = fan.fwt.FwtEnvPeer.loadImage(fanImg)
  return fan.gfx.Size.make(jsImg.width, jsImg.height)
}
fan.fwt.FwtEnvPeer.prototype.imageResize = function(self, fanImg, size)
{
  // generate a unique uri as the key for the new image
  var uri = fan.fwt.FwtEnvPeer.nextMemUriStr();
  // get the original js image
  var jsOrig = fan.fwt.FwtEnvPeer.loadImage(fanImg)
  if (jsOrig.width == 0 || jsOrig.height == 0) return fanImg;
  if (jsOrig.width == size.m_w && jsOrig.height == size.m_h) return fanImg
  // create new js image which is resized version of the old by painting
  // to temp canvas, then converting into data URL used to create new image
  var canvas = document.createElement("canvas");
  canvas.width = size.m_w;
  canvas.height = size.m_h;
  var cx = canvas.getContext("2d");
  cx.drawImage(jsOrig, 0, 0, jsOrig.width, jsOrig.height, 0, 0, size.m_w, size.m_h);
  var dataUrl = canvas.toDataURL("image/png");
  var jsNew = document.createElement("img");
  jsNew.src = dataUrl;
  // put new image into the image with our auto-gen uri key
  fan.fwt.FwtEnvPeer.imgCache[uri] = jsNew;
  // create new Fan wrapper which references jsNew via uri
  return fan.gfx.Image.makeUri(uri);
}
fan.fwt.FwtEnvPeer.fontCx = null;
fan.fwt.FwtEnvPeer.prototype.fontHeight = function(self, font)
{
  // fudge this as 150% of size
  return Math.round((font.m_size-3) * 1.5);
}
fan.fwt.FwtEnvPeer.prototype.fontAscent = function(self, font)
{
  // fudge this as 100% of size
  return font.m_size-3
}
fan.fwt.FwtEnvPeer.prototype.fontDescent = function(self, font)
{
  // fudge this as 30% of size
  return Math.round((font.m_size-3) * 0.3);
}
fan.fwt.FwtEnvPeer.prototype.fontLeading = function(self, font)
{
  // fudge this as 16% of size
  return Math.round((font.m_size-3) * 0.16);
}
fan.fwt.FwtEnvPeer.prototype.fontWidth = function(self, font, str)
{
  try
  {
    // use global var to store a context for computing string width
    if (fan.fwt.FwtEnvPeer.fontCx == null)
    {
      fan.fwt.FwtEnvPeer.fontCx = document.createElement("canvas").getContext("2d");
    }
    fan.fwt.FwtEnvPeer.fontCx.font = fan.fwt.WidgetPeer.fontToCss(font);
    return fan.fwt.FwtEnvPeer.fontCx.measureText(str).width;
  }
  catch (err)
  {
    // fallback if canvas not supported
    return str.length * 7;
  }
}
fan.fwt.GridPane = fan.sys.Obj.$extend(fan.fwt.Pane);
fan.fwt.GridPane.prototype.$ctor = function()
{
  fan.fwt.Pane.prototype.$ctor.call(this);
  this.peer = new fan.fwt.PanePeer(this);
  var $this = this;
  this.m_numCols = 1;
  this.m_hgap = 4;
  this.m_vgap = 4;
  this.m_halignCells = fan.gfx.Halign.m_left;
  this.m_valignCells = fan.gfx.Valign.m_center;
  this.m_halignPane = fan.gfx.Halign.m_left;
  this.m_valignPane = fan.gfx.Valign.m_top;
  this.m_expandRow = null;
  this.m_expandCol = null;
  this.m_uniformCols = false;
  this.m_uniformRows = false;
  return;
}
fan.fwt.GridPane.prototype.$typeof = function() { return fan.fwt.GridPane.$type; }
fan.fwt.GridPane.prototype.numCols = function()
{
  return this.m_numCols;
}
fan.fwt.GridPane.prototype.numCols$ = function(it)
{
  this.m_numCols = it;
  return;
}
fan.fwt.GridPane.prototype.hgap = function()
{
  return this.m_hgap;
}
fan.fwt.GridPane.prototype.hgap$ = function(it)
{
  this.m_hgap = it;
  return;
}
fan.fwt.GridPane.prototype.vgap = function()
{
  return this.m_vgap;
}
fan.fwt.GridPane.prototype.vgap$ = function(it)
{
  this.m_vgap = it;
  return;
}
fan.fwt.GridPane.prototype.halignCells = function()
{
  return this.m_halignCells;
}
fan.fwt.GridPane.prototype.halignCells$ = function(it)
{
  this.m_halignCells = it;
  return;
}
fan.fwt.GridPane.prototype.valignCells = function()
{
  return this.m_valignCells;
}
fan.fwt.GridPane.prototype.valignCells$ = function(it)
{
  this.m_valignCells = it;
  return;
}
fan.fwt.GridPane.prototype.halignPane = function()
{
  return this.m_halignPane;
}
fan.fwt.GridPane.prototype.halignPane$ = function(it)
{
  this.m_halignPane = it;
  return;
}
fan.fwt.GridPane.prototype.valignPane = function()
{
  return this.m_valignPane;
}
fan.fwt.GridPane.prototype.valignPane$ = function(it)
{
  this.m_valignPane = it;
  return;
}
fan.fwt.GridPane.prototype.expandRow = function()
{
  return this.m_expandRow;
}
fan.fwt.GridPane.prototype.expandRow$ = function(it)
{
  this.m_expandRow = it;
  return;
}
fan.fwt.GridPane.prototype.expandCol = function()
{
  return this.m_expandCol;
}
fan.fwt.GridPane.prototype.expandCol$ = function(it)
{
  this.m_expandCol = it;
  return;
}
fan.fwt.GridPane.prototype.uniformCols = function()
{
  return this.m_uniformCols;
}
fan.fwt.GridPane.prototype.uniformCols$ = function(it)
{
  this.m_uniformCols = it;
  return;
}
fan.fwt.GridPane.prototype.uniformRows = function()
{
  return this.m_uniformRows;
}
fan.fwt.GridPane.prototype.uniformRows$ = function(it)
{
  this.m_uniformRows = it;
  return;
}
fan.fwt.GridPane.prototype.prefSize = function(hints)
{
  if (hints === undefined) hints = fan.gfx.Hints.m_defVal;
  return fan.fwt.GridPaneSizes.make(this,this.children()).m_prefPane;
}
fan.fwt.GridPane.prototype.onLayout = function()
{
  var $this = this;
  var kids = this.children();
  var sizes = fan.fwt.GridPaneSizes.make(this,kids);
  var psize = this.size();
  var actualw = psize.m_w;
  var actualh = psize.m_h;
  var prefw = sizes.m_prefPane.m_w;
  var prefh = sizes.m_prefPane.m_h;
  var expandRow = this.m_expandRow;
  var expandCol = this.m_expandCol;
  if ((expandRow != null && fan.sys.ObjUtil.compareLT(expandRow,0)))
  {
    expandRow = fan.sys.ObjUtil.coerce(fan.sys.Int.plus(sizes.numRows(),fan.sys.ObjUtil.coerce(expandRow,fan.sys.Int.$type)),fan.sys.Int.$type.toNullable());
  }
  ;
  if ((expandCol != null && fan.sys.ObjUtil.compareLT(expandCol,0)))
  {
    expandCol = fan.sys.ObjUtil.coerce(fan.sys.Int.plus(this.m_numCols,fan.sys.ObjUtil.coerce(expandCol,fan.sys.Int.$type)),fan.sys.Int.$type.toNullable());
  }
  ;
  var expandRowh = fan.sys.Int.max(0,fan.sys.Int.minus(actualh,prefh));
  var expandColw = fan.sys.Int.max(0,fan.sys.Int.minus(actualw,prefw));
  var startx = 0;
  var starty = 0;
  if (expandCol == null)
  {
    var $_u41 = this.m_halignPane;
    if (fan.sys.ObjUtil.equals($_u41,fan.gfx.Halign.m_center))
    {
      startx = fan.sys.Int.div(expandColw,2);
    }
    else if (fan.sys.ObjUtil.equals($_u41,fan.gfx.Halign.m_right))
    {
      startx = expandColw;
    }
    ;
  }
  ;
  if (expandRow == null)
  {
    var $_u42 = this.m_valignPane;
    if (fan.sys.ObjUtil.equals($_u42,fan.gfx.Valign.m_center))
    {
      starty = fan.sys.Int.div(expandRowh,2);
    }
    else if (fan.sys.ObjUtil.equals($_u42,fan.gfx.Valign.m_bottom))
    {
      starty = expandRowh;
    }
    ;
  }
  ;
  var col = 0;
  var row = 0;
  var x = startx;
  var y = starty;
  kids.each(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("kid","fwt::Widget",false),new fan.sys.Param("i","sys::Int",false)]),
    fan.sys.Void.$type,
    function(kid,i)
    {
      var pref = sizes.m_prefs.get(i);
      var kx = x;
      var ky = y;
      var kw = pref.m_w;
      var kh = pref.m_h;
      var rowh = sizes.m_rowh.get(row);
      var colw = sizes.m_colw.get(col);
      if (fan.sys.ObjUtil.equals(row,expandRow))
      {
        rowh = fan.sys.Int.plus(rowh,expandRowh);
      }
      ;
      if (fan.sys.ObjUtil.equals(col,expandCol))
      {
        colw = fan.sys.Int.plus(colw,expandColw);
      }
      ;
      var $_u43 = $this.m_halignCells;
      if (fan.sys.ObjUtil.equals($_u43,fan.gfx.Halign.m_center))
      {
        kx = fan.sys.Int.plus(x,fan.sys.Int.div(fan.sys.Int.minus(colw,kw),2));
      }
      else if (fan.sys.ObjUtil.equals($_u43,fan.gfx.Halign.m_right))
      {
        kx = fan.sys.Int.plus(x,fan.sys.Int.minus(colw,kw));
      }
      else if (fan.sys.ObjUtil.equals($_u43,fan.gfx.Halign.m_fill))
      {
        kw = colw;
      }
      ;
      var $_u44 = $this.m_valignCells;
      if (fan.sys.ObjUtil.equals($_u44,fan.gfx.Valign.m_center))
      {
        ky = fan.sys.Int.plus(y,fan.sys.Int.div(fan.sys.Int.minus(rowh,kh),2));
      }
      else if (fan.sys.ObjUtil.equals($_u44,fan.gfx.Valign.m_bottom))
      {
        ky = fan.sys.Int.plus(y,fan.sys.Int.minus(rowh,kh));
      }
      else if (fan.sys.ObjUtil.equals($_u44,fan.gfx.Valign.m_fill))
      {
        kh = rowh;
      }
      ;
      kid.pos$(fan.gfx.Point.make(kx,ky));
      kid.size$(fan.gfx.Size.make(kw,kh));
      if (fan.sys.ObjUtil.compareGE(col = fan.sys.Int.increment(col),$this.m_numCols))
      {
        x = startx;
        y = fan.sys.Int.plus(y,fan.sys.Int.plus(rowh,$this.m_vgap));
        col = 0;
        (function($this) { var $_u45 = row; row = fan.sys.Int.increment(row); return $_u45; })($this);
      }
      else
      {
        x = fan.sys.Int.plus(x,fan.sys.Int.plus(colw,$this.m_hgap));
      }
      ;
      return;
    }));
  return;
}
fan.fwt.GridPane.make = function()
{
  var self = new fan.fwt.GridPane();
  fan.fwt.GridPane.make$(self);
  return self;
}
fan.fwt.GridPane.make$ = function(self)
{
  fan.fwt.Pane.make$(self);
  ;
  return;
}
fan.fwt.GridPane.prototype.m_numCols = 0;
fan.fwt.GridPane.prototype.m_hgap = 0;
fan.fwt.GridPane.prototype.m_vgap = 0;
fan.fwt.GridPane.prototype.m_halignCells = null;
fan.fwt.GridPane.prototype.m_valignCells = null;
fan.fwt.GridPane.prototype.m_halignPane = null;
fan.fwt.GridPane.prototype.m_valignPane = null;
fan.fwt.GridPane.prototype.m_expandRow = null;
fan.fwt.GridPane.prototype.m_expandCol = null;
fan.fwt.GridPane.prototype.m_uniformCols = false;
fan.fwt.GridPane.prototype.m_uniformRows = false;
fan.fwt.GridPaneSizes = fan.sys.Obj.$extend(fan.sys.Obj);
fan.fwt.GridPaneSizes.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_colw = fan.sys.List.make(fan.sys.Int.$type);
  this.m_rowh = fan.sys.List.make(fan.sys.Int.$type);
  this.m_prefs = fan.sys.List.make(fan.gfx.Size.$type);
  return;
}
fan.fwt.GridPaneSizes.prototype.$typeof = function() { return fan.fwt.GridPaneSizes.$type; }
fan.fwt.GridPaneSizes.make = function(grid,kids)
{
  var self = new fan.fwt.GridPaneSizes();
  fan.fwt.GridPaneSizes.make$(self,grid,kids);
  return self;
}
fan.fwt.GridPaneSizes.make$ = function(self,grid,kids)
{
  var $this = self;
  ;
  if (kids.isEmpty())
  {
    self.m_prefPane = fan.gfx.Size.m_defVal;
    return;
  }
  ;
  var col = 0;
  var row = 0;
  kids.each(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("kid","fwt::Widget",false)]),
    fan.sys.Void.$type,
    function(kid)
    {
      var pref = (function($this) { if (kid.visible()) return kid.prefSize(); return fan.gfx.Size.m_defVal; })($this);
      $this.m_prefs.add(pref);
      if (fan.sys.ObjUtil.compareGE(col,$this.m_colw.size()))
      {
        $this.m_colw.add(fan.sys.ObjUtil.coerce(pref.m_w,fan.sys.Obj.$type.toNullable()));
      }
      else
      {
        $this.m_colw.set(col,fan.sys.ObjUtil.coerce(fan.sys.Int.max($this.m_colw.get(col),pref.m_w),fan.sys.Obj.$type.toNullable()));
      }
      ;
      if (fan.sys.ObjUtil.compareGE(row,$this.m_rowh.size()))
      {
        $this.m_rowh.add(fan.sys.ObjUtil.coerce(pref.m_h,fan.sys.Obj.$type.toNullable()));
      }
      else
      {
        $this.m_rowh.set(row,fan.sys.ObjUtil.coerce(fan.sys.Int.max($this.m_rowh.get(row),pref.m_h),fan.sys.Obj.$type.toNullable()));
      }
      ;
      if (fan.sys.ObjUtil.compareGE(col = fan.sys.Int.increment(col),grid.m_numCols))
      {
        col = 0;
        (function($this) { var $_u47 = row; row = fan.sys.Int.increment(row); return $_u47; })($this);
      }
      ;
      return;
    }));
  if (grid.m_uniformCols)
  {
    var max = self.m_colw.max();
    fan.sys.Int.times(self.m_colw.size(),fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("i","sys::Int",false)]),
      fan.sys.Void.$type,
      function(i)
      {
        $this.m_colw.set(i,fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(max,fan.sys.Int.$type),fan.sys.Obj.$type.toNullable()));
        return;
      }));
  }
  ;
  if (grid.m_uniformRows)
  {
    var max = self.m_rowh.max();
    fan.sys.Int.times(self.m_rowh.size(),fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("i","sys::Int",false)]),
      fan.sys.Void.$type,
      function(i)
      {
        $this.m_rowh.set(i,fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(max,fan.sys.Int.$type),fan.sys.Obj.$type.toNullable()));
        return;
      }));
  }
  ;
  var prefw = fan.sys.Int.mult(fan.sys.Int.minus(grid.m_numCols,1),grid.m_hgap);
  fan.sys.Int.times(grid.m_numCols,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("c","sys::Int",false)]),
    fan.sys.Void.$type,
    function(c)
    {
      prefw = fan.sys.Int.plus(prefw,$this.m_colw.get(c));
      return;
    }));
  var prefh = fan.sys.Int.mult(fan.sys.Int.minus(self.numRows(),1),grid.m_vgap);
  fan.sys.Int.times(self.numRows(),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("r","sys::Int",false)]),
    fan.sys.Void.$type,
    function(r)
    {
      prefh = fan.sys.Int.plus(prefh,$this.m_rowh.get(r));
      return;
    }));
  self.m_prefPane = fan.gfx.Size.make(prefw,prefh);
  return;
}
fan.fwt.GridPaneSizes.prototype.numRows = function()
{
  return this.m_rowh.size();
}
fan.fwt.GridPaneSizes.prototype.colw = function()
{
  return this.m_colw;
}
fan.fwt.GridPaneSizes.prototype.colw$ = function(it)
{
  this.m_colw = it;
  return;
}
fan.fwt.GridPaneSizes.prototype.rowh = function()
{
  return this.m_rowh;
}
fan.fwt.GridPaneSizes.prototype.rowh$ = function(it)
{
  this.m_rowh = it;
  return;
}
fan.fwt.GridPaneSizes.prototype.prefs = function()
{
  return this.m_prefs;
}
fan.fwt.GridPaneSizes.prototype.prefs$ = function(it)
{
  this.m_prefs = it;
  return;
}
fan.fwt.GridPaneSizes.prototype.prefPane = function()
{
  return this.m_prefPane;
}
fan.fwt.GridPaneSizes.prototype.prefPane$ = function(it)
{
  this.m_prefPane = it;
  return;
}
fan.fwt.GridPaneSizes.prototype.m_colw = null;
fan.fwt.GridPaneSizes.prototype.m_rowh = null;
fan.fwt.GridPaneSizes.prototype.m_prefs = null;
fan.fwt.GridPaneSizes.prototype.m_prefPane = null;
fan.fwt.InsetPane = fan.sys.Obj.$extend(fan.fwt.ContentPane);
fan.fwt.InsetPane.prototype.$ctor = function()
{
  fan.fwt.ContentPane.prototype.$ctor.call(this);
  this.peer = new fan.fwt.PanePeer(this);
  var $this = this;
  this.m_insets = fan.fwt.InsetPane.m_defInsets;
  return;
}
fan.fwt.InsetPane.prototype.$typeof = function() { return fan.fwt.InsetPane.$type; }
fan.fwt.InsetPane.prototype.insets = function()
{
  return this.m_insets;
}
fan.fwt.InsetPane.prototype.insets$ = function(it)
{
  this.m_insets = it;
  return;
}
fan.fwt.InsetPane.make = function(top,right,bottom,left)
{
  var self = new fan.fwt.InsetPane();
  fan.fwt.InsetPane.make$(self,top,right,bottom,left);
  return self;
}
fan.fwt.InsetPane.make$ = function(self,top,right,bottom,left)
{
  if (top === undefined) top = 12;
  if (right === undefined) right = null;
  if (bottom === undefined) bottom = null;
  if (left === undefined) left = null;
  fan.fwt.ContentPane.make$(self);
  ;
  if (right == null)
  {
    right = fan.sys.ObjUtil.coerce(top,fan.sys.Int.$type.toNullable());
  }
  ;
  if (bottom == null)
  {
    bottom = fan.sys.ObjUtil.coerce(top,fan.sys.Int.$type.toNullable());
  }
  ;
  if (left == null)
  {
    left = right;
  }
  ;
  self.m_insets = fan.gfx.Insets.make(top,right,bottom,left);
  return;
}
fan.fwt.InsetPane.prototype.prefSize = function(hints)
{
  if (hints === undefined) hints = fan.gfx.Hints.m_defVal;
  if (this.content() == null)
  {
    return fan.gfx.Size.m_defVal;
  }
  ;
  if (!this.visible())
  {
    return fan.gfx.Size.m_defVal;
  }
  ;
  var insetSize = this.m_insets.toSize();
  var pref = this.content().prefSize(hints.minus(insetSize));
  return fan.gfx.Size.make(fan.sys.Int.plus(pref.m_w,insetSize.m_w),fan.sys.Int.plus(pref.m_h,insetSize.m_h));
}
fan.fwt.InsetPane.prototype.onLayout = function()
{
  if (this.content() == null)
  {
    return;
  }
  ;
  this.content().bounds$(fan.gfx.Rect.make(this.m_insets.m_left,this.m_insets.m_top,fan.sys.Int.minus(fan.sys.Int.minus(this.size().m_w,this.m_insets.m_left),this.m_insets.m_right),fan.sys.Int.minus(fan.sys.Int.minus(this.size().m_h,this.m_insets.m_top),this.m_insets.m_bottom)));
  return;
}
fan.fwt.InsetPane.static$init = function()
{
  fan.fwt.InsetPane.m_defInsets = fan.gfx.Insets.make(12);
  return;
}
fan.fwt.InsetPane.prototype.m_insets = null;
fan.fwt.InsetPane.m_defInsets = null;
fan.fwt.Key = fan.sys.Obj.$extend(fan.sys.Obj);
fan.fwt.Key.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.fwt.Key.prototype.$typeof = function() { return fan.fwt.Key.$type; }
fan.fwt.Key.predefine = function(mask,str,mod)
{
  var self = new fan.fwt.Key();
  fan.fwt.Key.predefine$(self,mask,str,mod);
  return self;
}
fan.fwt.Key.predefine$ = function(self,mask,str,mod)
{
  if (mod === undefined) mod = false;
  self.m_mask = mask;
  self.m_str = str;
  return;
}
fan.fwt.Key.fromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  var $this = this;
  try
  {
    var key = fan.fwt.Key.m_byStr.get(s);
    if (key != null)
    {
      return key;
    }
    ;
    var toks = fan.sys.Str.split(s,fan.sys.ObjUtil.coerce(43,fan.sys.Int.$type.toNullable()));
    if (fan.sys.ObjUtil.equals(toks.size(),1))
    {
      var x = toks.first();
      if ((fan.sys.ObjUtil.equals(fan.sys.Str.size(x),1) && !fan.sys.Int.isAlpha(fan.sys.Str.get(x,0))))
      {
        return fan.fwt.Key.makeNew(fan.sys.Str.get(x,0),x);
      }
      ;
      throw fan.sys.Err.make();
    }
    ;
    var mask = 0;
    var gotBase = false;
    toks.each(fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("tok","sys::Str",false)]),
      fan.sys.Void.$type,
      function(tok)
      {
        var part = fan.fwt.Key.fromStr(tok);
        if (!part.isModifier())
        {
          if (gotBase)
          {
            throw fan.sys.Err.make();
          }
          ;
          gotBase = true;
        }
        ;
        mask = fan.sys.Int.or(mask,part.m_mask);
        return;
      }));
    return fan.fwt.Key.makeNew(mask,null);
  }
  catch ($_u48)
  {
  }
  ;
  if (checked)
  {
    throw fan.sys.ParseErr.make(fan.sys.Str.plus("Invalid Key: ",s));
  }
  ;
  return null;
}
fan.fwt.Key.fromMask = function(mask)
{
  return fan.sys.ObjUtil.coerce((function($this) { var $_u49 = fan.fwt.Key.m_byMask.get(fan.sys.ObjUtil.coerce(mask,fan.sys.Obj.$type.toNullable())); if ($_u49 != null) return $_u49; return fan.fwt.Key.makeNew(mask,fan.sys.Int.toChar(mask)); })(this),fan.fwt.Key.$type);
}
fan.fwt.Key.makeNew = function(mask,str)
{
  var self = new fan.fwt.Key();
  fan.fwt.Key.makeNew$(self,mask,str);
  return self;
}
fan.fwt.Key.makeNew$ = function(self,mask,str)
{
  self.m_mask = mask;
  self.m_str = str;
  return;
}
fan.fwt.Key.prototype.hash = function()
{
  return this.m_mask;
}
fan.fwt.Key.prototype.equals = function(that)
{
  var x = fan.sys.ObjUtil.as(that,fan.fwt.Key.$type);
  if (x == null)
  {
    return false;
  }
  ;
  return fan.sys.ObjUtil.equals(this.m_mask,x.m_mask);
}
fan.fwt.Key.prototype.toStr = function()
{
  if (this.m_str != null)
  {
    return fan.sys.ObjUtil.coerce(this.m_str,fan.sys.Str.$type);
  }
  ;
  var s = fan.sys.StrBuf.make();
  if (this.isShift())
  {
    s.join(fan.fwt.Key.m_shift.m_str,"+");
  }
  ;
  if (this.isAlt())
  {
    s.join(fan.fwt.Key.m_alt.m_str,"+");
  }
  ;
  if (this.isCtrl())
  {
    s.join(fan.fwt.Key.m_ctrl.m_str,"+");
  }
  ;
  if (this.isCommand())
  {
    s.join(fan.fwt.Key.m_command.m_str,"+");
  }
  ;
  var baseMask = fan.sys.Int.and(this.m_mask,fan.fwt.Key.m_modifierUnmask);
  if (fan.sys.ObjUtil.compareNE(baseMask,0))
  {
    s.join(fan.fwt.Key.fromMask(baseMask).m_str,"+");
  }
  ;
  return s.toStr();
}
fan.fwt.Key.prototype.list = function()
{
  var $this = this;
  return fan.sys.ObjUtil.coerce(fan.sys.Str.split(this.toStr(),fan.sys.ObjUtil.coerce(43,fan.sys.Int.$type.toNullable())).map(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("tok","sys::Str",false)]),
    fan.fwt.Key.$type,
    function(tok)
    {
      return fan.sys.ObjUtil.coerce(fan.fwt.Key.fromStr(tok),fan.fwt.Key.$type);
    })),fan.sys.Type.find("fwt::Key[]"));
}
fan.fwt.Key.prototype.primary = function()
{
  return fan.fwt.Key.fromMask(fan.sys.Int.and(this.m_mask,fan.sys.Int.not(fan.fwt.Key.m_modifierMask)));
}
fan.fwt.Key.prototype.modifiers = function()
{
  return fan.fwt.Key.fromMask(fan.sys.Int.and(this.m_mask,fan.fwt.Key.m_modifierMask));
}
fan.fwt.Key.prototype.isModifier = function()
{
  return fan.sys.ObjUtil.equals(fan.sys.Int.and(this.m_mask,fan.fwt.Key.m_modifierUnmask),0);
}
fan.fwt.Key.prototype.hasModifier = function()
{
  return fan.sys.ObjUtil.compareNE(fan.sys.Int.and(this.m_mask,fan.fwt.Key.m_modifierMask),0);
}
fan.fwt.Key.prototype.isDown = function(modifier)
{
  return fan.sys.ObjUtil.compareNE(fan.sys.Int.and(this.m_mask,modifier.m_mask),0);
}
fan.fwt.Key.prototype.isShift = function()
{
  return this.isDown(fan.fwt.Key.m_shift);
}
fan.fwt.Key.prototype.isAlt = function()
{
  return this.isDown(fan.fwt.Key.m_alt);
}
fan.fwt.Key.prototype.isCtrl = function()
{
  return this.isDown(fan.fwt.Key.m_ctrl);
}
fan.fwt.Key.prototype.isCommand = function()
{
  return this.isDown(fan.fwt.Key.m_command);
}
fan.fwt.Key.prototype.plus = function(x)
{
  if ((!this.isModifier() && !x.isModifier()))
  {
    throw fan.sys.ArgErr.make(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("Neither is modifier: ",this)," + "),x));
  }
  ;
  return fan.fwt.Key.makeNew(fan.sys.Int.or(this.m_mask,x.m_mask),null);
}
fan.fwt.Key.prototype.replace = function(modFrom,modTo)
{
  if (fan.sys.ObjUtil.equals(fan.sys.Int.and(this.m_mask,modFrom.m_mask),0))
  {
    return this;
  }
  ;
  return fan.fwt.Key.makeNew(fan.sys.Int.or(fan.sys.Int.and(this.m_mask,fan.sys.Int.not(modFrom.m_mask)),modTo.m_mask),null);
}
fan.fwt.Key.static$init = function()
{
  var $this = this;
  fan.fwt.Key.m_a = fan.fwt.Key.predefine(97,"A");
  fan.fwt.Key.m_b = fan.fwt.Key.predefine(98,"B");
  fan.fwt.Key.m_c = fan.fwt.Key.predefine(99,"C");
  fan.fwt.Key.m_d = fan.fwt.Key.predefine(100,"D");
  fan.fwt.Key.m_e = fan.fwt.Key.predefine(101,"E");
  fan.fwt.Key.m_f = fan.fwt.Key.predefine(102,"F");
  fan.fwt.Key.m_g = fan.fwt.Key.predefine(103,"G");
  fan.fwt.Key.m_h = fan.fwt.Key.predefine(104,"H");
  fan.fwt.Key.m_i = fan.fwt.Key.predefine(105,"I");
  fan.fwt.Key.m_j = fan.fwt.Key.predefine(106,"J");
  fan.fwt.Key.m_k = fan.fwt.Key.predefine(107,"K");
  fan.fwt.Key.m_l = fan.fwt.Key.predefine(108,"L");
  fan.fwt.Key.m_m = fan.fwt.Key.predefine(109,"M");
  fan.fwt.Key.m_n = fan.fwt.Key.predefine(110,"N");
  fan.fwt.Key.m_o = fan.fwt.Key.predefine(111,"O");
  fan.fwt.Key.m_p = fan.fwt.Key.predefine(112,"P");
  fan.fwt.Key.m_q = fan.fwt.Key.predefine(113,"Q");
  fan.fwt.Key.m_r = fan.fwt.Key.predefine(114,"R");
  fan.fwt.Key.m_s = fan.fwt.Key.predefine(115,"S");
  fan.fwt.Key.m_t = fan.fwt.Key.predefine(116,"T");
  fan.fwt.Key.m_u = fan.fwt.Key.predefine(117,"U");
  fan.fwt.Key.m_v = fan.fwt.Key.predefine(118,"V");
  fan.fwt.Key.m_w = fan.fwt.Key.predefine(119,"W");
  fan.fwt.Key.m_x = fan.fwt.Key.predefine(120,"X");
  fan.fwt.Key.m_y = fan.fwt.Key.predefine(121,"Y");
  fan.fwt.Key.m_z = fan.fwt.Key.predefine(122,"Z");
  fan.fwt.Key.m_num0 = fan.fwt.Key.predefine(48,"0");
  fan.fwt.Key.m_num1 = fan.fwt.Key.predefine(49,"1");
  fan.fwt.Key.m_num2 = fan.fwt.Key.predefine(50,"2");
  fan.fwt.Key.m_num3 = fan.fwt.Key.predefine(51,"3");
  fan.fwt.Key.m_num4 = fan.fwt.Key.predefine(52,"4");
  fan.fwt.Key.m_num5 = fan.fwt.Key.predefine(53,"5");
  fan.fwt.Key.m_num6 = fan.fwt.Key.predefine(54,"6");
  fan.fwt.Key.m_num7 = fan.fwt.Key.predefine(55,"7");
  fan.fwt.Key.m_num8 = fan.fwt.Key.predefine(56,"8");
  fan.fwt.Key.m_num9 = fan.fwt.Key.predefine(57,"9");
  fan.fwt.Key.m_space = fan.fwt.Key.predefine(32,"Space");
  fan.fwt.Key.m_backspace = fan.fwt.Key.predefine(8,"Backspace");
  fan.fwt.Key.m_enter = fan.fwt.Key.predefine(13,"Enter");
  fan.fwt.Key.m_$delete = fan.fwt.Key.predefine(127,"Del");
  fan.fwt.Key.m_esc = fan.fwt.Key.predefine(27,"Esc");
  fan.fwt.Key.m_tab = fan.fwt.Key.predefine(9,"Tab");
  fan.fwt.Key.m_up = fan.fwt.Key.predefine(16777217,"Up");
  fan.fwt.Key.m_down = fan.fwt.Key.predefine(16777218,"Down");
  fan.fwt.Key.m_left = fan.fwt.Key.predefine(16777219,"Left");
  fan.fwt.Key.m_right = fan.fwt.Key.predefine(16777220,"Right");
  fan.fwt.Key.m_pageUp = fan.fwt.Key.predefine(16777221,"PageUp");
  fan.fwt.Key.m_pageDown = fan.fwt.Key.predefine(16777222,"PageDown");
  fan.fwt.Key.m_home = fan.fwt.Key.predefine(16777223,"Home");
  fan.fwt.Key.m_end = fan.fwt.Key.predefine(16777224,"End");
  fan.fwt.Key.m_insert = fan.fwt.Key.predefine(16777225,"Insert");
  fan.fwt.Key.m_f1 = fan.fwt.Key.predefine(16777226,"F1");
  fan.fwt.Key.m_f2 = fan.fwt.Key.predefine(16777227,"F2");
  fan.fwt.Key.m_f3 = fan.fwt.Key.predefine(16777228,"F3");
  fan.fwt.Key.m_f4 = fan.fwt.Key.predefine(16777229,"F4");
  fan.fwt.Key.m_f5 = fan.fwt.Key.predefine(16777230,"F5");
  fan.fwt.Key.m_f6 = fan.fwt.Key.predefine(16777231,"F6");
  fan.fwt.Key.m_f7 = fan.fwt.Key.predefine(16777232,"F7");
  fan.fwt.Key.m_f8 = fan.fwt.Key.predefine(16777233,"F8");
  fan.fwt.Key.m_f9 = fan.fwt.Key.predefine(16777234,"F9");
  fan.fwt.Key.m_f10 = fan.fwt.Key.predefine(16777235,"F10");
  fan.fwt.Key.m_f11 = fan.fwt.Key.predefine(16777236,"F11");
  fan.fwt.Key.m_f12 = fan.fwt.Key.predefine(16777237,"F12");
  fan.fwt.Key.m_keypadMult = fan.fwt.Key.predefine(16777258,"Keypad*");
  fan.fwt.Key.m_keypadPlus = fan.fwt.Key.predefine(16777259,"Keypad+");
  fan.fwt.Key.m_keypadMinus = fan.fwt.Key.predefine(16777261,"Keypad-");
  fan.fwt.Key.m_keypadDot = fan.fwt.Key.predefine(16777262,"Keypad.");
  fan.fwt.Key.m_keypadDiv = fan.fwt.Key.predefine(16777263,"Keypad/");
  fan.fwt.Key.m_keypad0 = fan.fwt.Key.predefine(16777264,"Keypad0");
  fan.fwt.Key.m_keypad1 = fan.fwt.Key.predefine(16777265,"Keypad1");
  fan.fwt.Key.m_keypad2 = fan.fwt.Key.predefine(16777266,"Keypad2");
  fan.fwt.Key.m_keypad3 = fan.fwt.Key.predefine(16777267,"Keypad3");
  fan.fwt.Key.m_keypad4 = fan.fwt.Key.predefine(16777268,"Keypad4");
  fan.fwt.Key.m_keypad5 = fan.fwt.Key.predefine(16777269,"Keypad5");
  fan.fwt.Key.m_keypad6 = fan.fwt.Key.predefine(16777270,"Keypad6");
  fan.fwt.Key.m_keypad7 = fan.fwt.Key.predefine(16777271,"Keypad7");
  fan.fwt.Key.m_keypad8 = fan.fwt.Key.predefine(16777272,"Keypad8");
  fan.fwt.Key.m_keypad9 = fan.fwt.Key.predefine(16777273,"Keypad9");
  fan.fwt.Key.m_keypadEqual = fan.fwt.Key.predefine(16777277,"Keypad=");
  fan.fwt.Key.m_keypadEnter = fan.fwt.Key.predefine(16777296,"KeypadEnter");
  fan.fwt.Key.m_capsLock = fan.fwt.Key.predefine(16777298,"CapsLock");
  fan.fwt.Key.m_numLock = fan.fwt.Key.predefine(16777299,"NumLock");
  fan.fwt.Key.m_scrollLock = fan.fwt.Key.predefine(16777300,"ScrollLock");
  fan.fwt.Key.m_pause = fan.fwt.Key.predefine(16777301,"Pause");
  fan.fwt.Key.m_printScreen = fan.fwt.Key.predefine(16777303,"PrintScreen");
  fan.fwt.Key.m_alt = fan.fwt.Key.predefine(65536,"Alt");
  fan.fwt.Key.m_shift = fan.fwt.Key.predefine(131072,"Shift");
  fan.fwt.Key.m_ctrl = fan.fwt.Key.predefine(262144,"Ctrl");
  fan.fwt.Key.m_command = fan.fwt.Key.predefine(4194304,"Command");
  fan.fwt.Key.m_modifierMask = fan.sys.Int.or(fan.sys.Int.or(fan.sys.Int.or(fan.fwt.Key.m_alt.m_mask,fan.fwt.Key.m_shift.m_mask),fan.fwt.Key.m_ctrl.m_mask),fan.fwt.Key.m_command.m_mask);
  fan.fwt.Key.m_modifierUnmask = fan.sys.Int.not(fan.fwt.Key.m_modifierMask);
  fan.fwt.Key.m_none = fan.fwt.Key.predefine(0,"");
  if (true)
  {
    var m = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Int"),fan.sys.Type.find("fwt::Key"));
    var s = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("fwt::Key"));
    fan.fwt.Key.$type.fields().each(fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("f","sys::Field",false)]),
      fan.sys.Void.$type,
      function(f)
      {
        if ((f.isStatic() && fan.sys.ObjUtil.equals(f.type(),fan.fwt.Key.$type)))
        {
          var key = fan.sys.ObjUtil.coerce(f.get(null),fan.fwt.Key.$type);
          m.set(fan.sys.ObjUtil.coerce(key.m_mask,fan.sys.Obj.$type.toNullable()),key);
          if (!fan.sys.Str.isEmpty(key.m_str))
          {
            s.set(fan.sys.ObjUtil.coerce(key.m_str,fan.sys.Str.$type),key);
          }
          ;
        }
        ;
        return;
      }));
    fan.fwt.Key.m_byMask = fan.sys.ObjUtil.coerce((function($this) { var $_u50 = m; if ($_u50 == null) return null; return fan.sys.ObjUtil.toImmutable($_u50); })(this),fan.sys.Type.find("[sys::Int:fwt::Key]"));
    fan.fwt.Key.m_byStr = fan.sys.ObjUtil.coerce((function($this) { var $_u51 = s; if ($_u51 == null) return null; return fan.sys.ObjUtil.toImmutable($_u51); })(this),fan.sys.Type.find("[sys::Str:fwt::Key]"));
  }
  ;
  return;
}
fan.fwt.Key.m_a = null;
fan.fwt.Key.m_b = null;
fan.fwt.Key.m_c = null;
fan.fwt.Key.m_d = null;
fan.fwt.Key.m_e = null;
fan.fwt.Key.m_f = null;
fan.fwt.Key.m_g = null;
fan.fwt.Key.m_h = null;
fan.fwt.Key.m_i = null;
fan.fwt.Key.m_j = null;
fan.fwt.Key.m_k = null;
fan.fwt.Key.m_l = null;
fan.fwt.Key.m_m = null;
fan.fwt.Key.m_n = null;
fan.fwt.Key.m_o = null;
fan.fwt.Key.m_p = null;
fan.fwt.Key.m_q = null;
fan.fwt.Key.m_r = null;
fan.fwt.Key.m_s = null;
fan.fwt.Key.m_t = null;
fan.fwt.Key.m_u = null;
fan.fwt.Key.m_v = null;
fan.fwt.Key.m_w = null;
fan.fwt.Key.m_x = null;
fan.fwt.Key.m_y = null;
fan.fwt.Key.m_z = null;
fan.fwt.Key.m_num0 = null;
fan.fwt.Key.m_num1 = null;
fan.fwt.Key.m_num2 = null;
fan.fwt.Key.m_num3 = null;
fan.fwt.Key.m_num4 = null;
fan.fwt.Key.m_num5 = null;
fan.fwt.Key.m_num6 = null;
fan.fwt.Key.m_num7 = null;
fan.fwt.Key.m_num8 = null;
fan.fwt.Key.m_num9 = null;
fan.fwt.Key.m_space = null;
fan.fwt.Key.m_backspace = null;
fan.fwt.Key.m_enter = null;
fan.fwt.Key.m_$delete = null;
fan.fwt.Key.m_esc = null;
fan.fwt.Key.m_tab = null;
fan.fwt.Key.m_up = null;
fan.fwt.Key.m_down = null;
fan.fwt.Key.m_left = null;
fan.fwt.Key.m_right = null;
fan.fwt.Key.m_pageUp = null;
fan.fwt.Key.m_pageDown = null;
fan.fwt.Key.m_home = null;
fan.fwt.Key.m_end = null;
fan.fwt.Key.m_insert = null;
fan.fwt.Key.m_f1 = null;
fan.fwt.Key.m_f2 = null;
fan.fwt.Key.m_f3 = null;
fan.fwt.Key.m_f4 = null;
fan.fwt.Key.m_f5 = null;
fan.fwt.Key.m_f6 = null;
fan.fwt.Key.m_f7 = null;
fan.fwt.Key.m_f8 = null;
fan.fwt.Key.m_f9 = null;
fan.fwt.Key.m_f10 = null;
fan.fwt.Key.m_f11 = null;
fan.fwt.Key.m_f12 = null;
fan.fwt.Key.m_keypadMult = null;
fan.fwt.Key.m_keypadPlus = null;
fan.fwt.Key.m_keypadMinus = null;
fan.fwt.Key.m_keypadDot = null;
fan.fwt.Key.m_keypadDiv = null;
fan.fwt.Key.m_keypad0 = null;
fan.fwt.Key.m_keypad1 = null;
fan.fwt.Key.m_keypad2 = null;
fan.fwt.Key.m_keypad3 = null;
fan.fwt.Key.m_keypad4 = null;
fan.fwt.Key.m_keypad5 = null;
fan.fwt.Key.m_keypad6 = null;
fan.fwt.Key.m_keypad7 = null;
fan.fwt.Key.m_keypad8 = null;
fan.fwt.Key.m_keypad9 = null;
fan.fwt.Key.m_keypadEqual = null;
fan.fwt.Key.m_keypadEnter = null;
fan.fwt.Key.m_capsLock = null;
fan.fwt.Key.m_numLock = null;
fan.fwt.Key.m_scrollLock = null;
fan.fwt.Key.m_pause = null;
fan.fwt.Key.m_printScreen = null;
fan.fwt.Key.m_alt = null;
fan.fwt.Key.m_shift = null;
fan.fwt.Key.m_ctrl = null;
fan.fwt.Key.m_command = null;
fan.fwt.Key.m_modifierMask = 0;
fan.fwt.Key.m_modifierUnmask = 0;
fan.fwt.Key.m_none = null;
fan.fwt.Key.m_byMask = null;
fan.fwt.Key.m_byStr = null;
fan.fwt.Key.prototype.m_mask = 0;
fan.fwt.Key.prototype.m_str = null;
fan.fwt.Label = fan.sys.Obj.$extend(fan.fwt.Widget);
fan.fwt.Label.prototype.$ctor = function()
{
  fan.fwt.Widget.prototype.$ctor.call(this);
  this.peer = new fan.fwt.LabelPeer(this);
  var $this = this;
}
fan.fwt.Label.prototype.$typeof = function() { return fan.fwt.Label.$type; }
fan.fwt.Label.prototype.text = function()
{
  return this.peer.text(this);
}
fan.fwt.Label.prototype.text$ = function(it)
{
  return this.peer.text$(this,it);
}
fan.fwt.Label.prototype.image = function()
{
  return this.peer.image(this);
}
fan.fwt.Label.prototype.image$ = function(it)
{
  return this.peer.image$(this,it);
}
fan.fwt.Label.prototype.fg = function()
{
  return this.peer.fg(this);
}
fan.fwt.Label.prototype.fg$ = function(it)
{
  return this.peer.fg$(this,it);
}
fan.fwt.Label.prototype.bg = function()
{
  return this.peer.bg(this);
}
fan.fwt.Label.prototype.bg$ = function(it)
{
  return this.peer.bg$(this,it);
}
fan.fwt.Label.prototype.font = function()
{
  return this.peer.font(this);
}
fan.fwt.Label.prototype.font$ = function(it)
{
  return this.peer.font$(this,it);
}
fan.fwt.Label.prototype.halign = function()
{
  return this.peer.halign(this);
}
fan.fwt.Label.prototype.halign$ = function(it)
{
  return this.peer.halign$(this,it);
}
fan.fwt.Label.make = function()
{
  var self = new fan.fwt.Label();
  fan.fwt.Label.make$(self);
  return self;
}
fan.fwt.Label.make$ = function(self)
{
  fan.fwt.Widget.make$(self);
  return;
}
fan.fwt.LabelPeer = fan.sys.Obj.$extend(fan.fwt.WidgetPeer);
fan.fwt.LabelPeer.prototype.$ctor = function(self) {}
fan.fwt.LabelPeer.prototype.m_text = "";
fan.fwt.LabelPeer.prototype.text   = function(self) { return this.m_text; }
fan.fwt.LabelPeer.prototype.text$  = function(self, val)
{
  this.m_text = val;
  this.needRebuild = true;
}
fan.fwt.LabelPeer.prototype.m_bg = null;
fan.fwt.LabelPeer.prototype.bg   = function(self) { return this.m_bg; }
fan.fwt.LabelPeer.prototype.bg$  = function(self, val)
{
  this.m_bg = val;
  this.needRebuild = true;
}
fan.fwt.LabelPeer.prototype.m_fg = null;
fan.fwt.LabelPeer.prototype.fg   = function(self) { return this.m_fg; }
fan.fwt.LabelPeer.prototype.fg$  = function(self, val)
{
  this.m_fg = val;
  this.needRebuild = true;
}
fan.fwt.LabelPeer.prototype.m_font = null;
fan.fwt.LabelPeer.prototype.font   = function(self) { return this.m_font; }
fan.fwt.LabelPeer.prototype.font$  = function(self, val)
{
  this.m_font = val;
  this.needRebuild = true;
}
fan.fwt.LabelPeer.prototype.m_halign = null;
fan.fwt.LabelPeer.prototype.halign   = function(self) { return this.m_halign; }
fan.fwt.LabelPeer.prototype.halign$  = function(self, val)
{
  this.m_halign = val;
  this.needRebuild = true;
}
fan.fwt.LabelPeer.prototype.m_image = null;
fan.fwt.LabelPeer.prototype.image  = function(self) { return this.m_image; }
fan.fwt.LabelPeer.prototype.image$ = function(self, val)
{
  this.m_image = val;
  if (val != null)
  {
    var $this = this;
    var func = function() { $this.needRebuild = true; }
    fan.fwt.FwtEnvPeer.loadImage(val, self, func);
  }
  this.needRebuild = true;
}
fan.fwt.LabelPeer.prototype.create = function(parentElem, self)
{
  this.needRebuild = true; // make sure we force rebuild
  return fan.fwt.WidgetPeer.prototype.create.call(this, parentElem, self);
}
fan.fwt.LabelPeer.prototype.sync = function(self)
{
  if (this.needRebuild == true)
  {
    this.rebuild(self);
    this.needRebuild = false;
  }
  if (this.$softClip(self))
  {
    var i = this.m_image==null ? 0 : 1;
    var text = this.elem.childNodes[i];
    text.style.width = this.m_size.m_w + "px";
  }
  fan.fwt.WidgetPeer.prototype.sync.call(this, self);
}
fan.fwt.LabelPeer.prototype.needRebuild = true;
fan.fwt.LabelPeer.prototype.rebuild = function(self)
{
  var parent = this.elem;      // parent elem
  var uri  = this.$uri(self);  // uri if applicable
  var text = null;             // text node
  var img  = null;             // img node
  // remove old subtree
  while (parent.firstChild != null)
  {
    var child = parent.firstChild;
    parent.removeChild(child);
    child = null;
    delete child;
  }
  // setup image
  if (this.m_image != null)
  {
    if (uri == null)
      img = document.createElement("div");
    else
    {
      img = document.createElement("a");
      img.href = uri.uri;
    }
    img.style.display = "inline-block";
    img.style.verticalAlign = "middle";
    var imgElem = document.createElement("img");
    imgElem.border = "0";
    imgElem.src = fan.fwt.WidgetPeer.uriToImageSrc(this.m_image.m_uri);
    var imgSize = this.$imageSize();
    if (imgSize != null)
    {
      imgElem.style.width  = imgSize.m_w  + "px";
      imgElem.style.height = imgSize.m_h + "px";
    }
    img.appendChild(imgElem);
    parent.appendChild(img);
  }
  // setup text
  if (this.m_image == null || this.m_text.length > 0)
  {
    if (uri == null)
      text = document.createElement("div");
    else
    {
      text = document.createElement("a");
      text.href = uri.uri;
      switch (uri.underline)
      {
        case "none": text.style.textDecoration = "none"; break;
        case "hover":
          text.style.textDecoration = "none";
          text.onmouseover = function() { text.style.textDecoration = "underline"; }
          text.onmouseout  = function() { text.style.textDecoration = "none"; }
          break;
      }
    }
    if (this.m_fg != null) text.style.color = this.m_fg.toStr();
    if (this.$softClip(self))
    {
      text.style.overflow = "hidden";
      text.style.textOverflow = "ellipsis";
    }
    text.style.display = "inline-block";
    text.style.position = "relative";
    text.style.top = "-1px";
    text.style.verticalAlign = "middle";
    if (this.m_text.length > 0)
      text.appendChild(document.createTextNode(this.m_text));
    else
      text.innerHTML = "&nbsp;";  // to force height of empty labels
    parent.appendChild(text);
  }
  // insert padding b/w img and text
  if (img != null && text != null)
  {
    var hgap = this.$hgap(self);
    if (hgap == null) hgap = 3;
    img.style.paddingRight = hgap + "px";
  }
  // apply style
  var s = this.elem.style;
  s.font = fan.fwt.WidgetPeer.fontToCss(this.m_font==null ? fan.fwt.DesktopPeer.$sysFont : this.m_font);
  if (this.m_bg != null) s.background = this.m_bg.toStr();
  switch (this.m_halign)
  {
    case fan.gfx.Halign.m_left:   s.textAlign = "left"; break;
    case fan.gfx.Halign.m_fill:   s.textAlign = "left"; break;
    case fan.gfx.Halign.m_center: s.textAlign = "center"; break;
    case fan.gfx.Halign.m_right:  s.textAlign = "right"; break;
    default:                      s.textAlign = "left"; break;
  }
  s.cursor = "default";
  s.whiteSpace = "nowrap";
  // override style
  var override = this.$style(self);
  if (override != null && text != null)
  {
    s = text.style;
    for (var k in override.keyMap)
    {
      var key = override.keyMap[k];
      var val = override.valMap[k];
      s.setProperty(key, val, "");
    }
  }
}
fan.fwt.LabelPeer.prototype.$hgap = function(self) { return null; }
fan.fwt.LabelPeer.prototype.$softClip = function(self) { return false; }
fan.fwt.LabelPeer.prototype.$imageSize = function(self) { return null; }
fan.fwt.LabelPeer.prototype.$style = function(self) { return null; }
fan.fwt.LabelPeer.prototype.$uri = function(self) { return null; }
fan.fwt.MenuItem = fan.sys.Obj.$extend(fan.fwt.Widget);
fan.fwt.MenuItem.prototype.$ctor = function()
{
  fan.fwt.Widget.prototype.$ctor.call(this);
  this.peer = new fan.fwt.MenuItemPeer(this);
  var $this = this;
  this.m_onAction = fan.fwt.EventListeners.make();
  this.m_mode = (function($this) { if (fan.sys.ObjUtil.is($this,fan.fwt.Menu.$type)) return fan.fwt.MenuItemMode.m_menu; return fan.fwt.MenuItemMode.m_push; })(this);
  return;
}
fan.fwt.MenuItem.prototype.$typeof = function() { return fan.fwt.MenuItem.$type; }
fan.fwt.MenuItem.make = function(f)
{
  var self = new fan.fwt.MenuItem();
  fan.fwt.MenuItem.make$(self,f);
  return self;
}
fan.fwt.MenuItem.make$ = function(self,f)
{
  if (f === undefined) f = null;
  fan.fwt.Widget.make$(self);
  ;
  if (f != null)
  {
    f.call(self);
  }
  ;
  return;
}
fan.fwt.MenuItem.makeCommand = function(c)
{
  var self = new fan.fwt.MenuItem();
  fan.fwt.MenuItem.makeCommand$(self,c);
  return self;
}
fan.fwt.MenuItem.makeCommand$ = function(self,c)
{
  fan.fwt.Widget.make$(self);
  ;
  self.m_mode = c.m_mode.toMenuItemMode();
  self.command$(c);
  return;
}
fan.fwt.MenuItem.prototype.onAction = function()
{
  return this.m_onAction;
}
fan.fwt.MenuItem.prototype.onAction$ = function(it)
{
  this.m_onAction = it;
  return;
}
fan.fwt.MenuItem.prototype.selected = function()
{
  return this.peer.selected(this);
}
fan.fwt.MenuItem.prototype.selected$ = function(it)
{
  return this.peer.selected$(this,it);
}
fan.fwt.MenuItem.prototype.text = function()
{
  return this.peer.text(this);
}
fan.fwt.MenuItem.prototype.text$ = function(it)
{
  return this.peer.text$(this,it);
}
fan.fwt.MenuItem.prototype.accelerator = function()
{
  return this.peer.accelerator(this);
}
fan.fwt.MenuItem.prototype.accelerator$ = function(it)
{
  return this.peer.accelerator$(this,it);
}
fan.fwt.MenuItem.prototype.image = function()
{
  return this.peer.image(this);
}
fan.fwt.MenuItem.prototype.image$ = function(it)
{
  return this.peer.image$(this,it);
}
fan.fwt.MenuItem.prototype.command = function()
{
  return this.m_command;
}
fan.fwt.MenuItem.prototype.command$ = function(it)
{
  var $this = this;
  var newVal = it;
  (function($this) { var $_u53 = $this.m_command; if ($_u53 == null) return null; return $_u53.unregister($this); })(this);
  this.m_command = newVal;
  if (newVal != null)
  {
    this.enabled$(newVal.enabled());
    this.text$(newVal.m_name);
    this.image$(newVal.m_icon);
    this.accelerator$(newVal.m_accelerator);
    this.selected$(newVal.selected());
    this.m_onAction.add(fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("e","fwt::Event",false)]),
      fan.sys.Void.$type,
      function(e)
      {
        newVal.selected$($this.selected());
        newVal.invoke(e);
        return;
      }));
    newVal.register(this);
  }
  ;
  return;
}
fan.fwt.MenuItem.prototype.m_onAction = null;
fan.fwt.MenuItem.prototype.m_mode = null;
fan.fwt.MenuItem.prototype.m_command = null;
fan.fwt.MenuItemPeer = fan.sys.Obj.$extend(fan.fwt.WidgetPeer);
fan.fwt.MenuItemPeer.prototype.$ctor = function(self) {}
fan.fwt.MenuItemPeer.prototype.selected   = function(self) { return this.m_selected; }
fan.fwt.MenuItemPeer.prototype.selected$  = function(self, val) { this.m_selected = val; }
fan.fwt.MenuItemPeer.prototype.m_selected = false;
fan.fwt.MenuItemPeer.prototype.text   = function(self) { return this.m_text; }
fan.fwt.MenuItemPeer.prototype.text$  = function(self, val) { this.m_text = val; }
fan.fwt.MenuItemPeer.prototype.m_text = "";
fan.fwt.MenuItemPeer.prototype.accelerator   = function(self) { return this.m_accelerator; }
fan.fwt.MenuItemPeer.prototype.accelerator$  = function(self, val) { this.m_accelerator = val; }
fan.fwt.MenuItemPeer.prototype.m_accelerator = null;
fan.fwt.MenuItemPeer.prototype.image   = function(self) { return this.m_image; }
fan.fwt.MenuItemPeer.prototype.image$  = function(self, val) { this.m_image = val; }
fan.fwt.MenuItemPeer.prototype.m_image = null;
fan.fwt.MenuItemPeer.prototype.create = function(parentElem, self)
{
  var div = this.emptyDiv();
  div.style.font = fan.fwt.WidgetPeer.fontToCss(fan.fwt.DesktopPeer.$sysFont);
  div.style.cursor = "default";
  div.style.padding = "1px 4px";
  div.style.whiteSpace = "nowrap";
  div.onmouseover = function()
  {
    if (!self.peer.m_enabled) return;
    div.style.background = "#3d80df";
    div.style.color = "#fff";
  }
  div.onmouseout = function()
  {
    if (!self.peer.m_enabled) return;
    div.style.background = "";
    div.style.color = "";
  }
  div.onclick = function()
  {
    if (!self.peer.m_enabled) return;
    var evt = fan.fwt.Event.make();
    evt.id = fan.fwt.EventId.m_action;
    evt.widget = self;
    var list = self.m_onAction.list();
    for (var i=0; i<list.size(); i++) list.get(i).call(evt);
  }
  parentElem.appendChild(div);
  return div;
}
fan.fwt.MenuItemPeer.prototype.sync = function(self)
{
  var div = this.elem;
  // remove old text node
  while (div.firstChild != null)
  {
    var child = div.firstChild;
    div.removeChild(child);
    child = null;
    delete child;
  }
  // add new text node
  div.appendChild(document.createTextNode(this.m_text));
  // sync state
  div.style.color = self.peer.m_enabled ? "#000" : "#999";
  // account for padding/border
  var w = this.m_size.m_w - 8;
  var h = this.m_size.m_h - 4;
  fan.fwt.WidgetPeer.prototype.sync.call(this, self, w, h);
}
fan.fwt.Menu = fan.sys.Obj.$extend(fan.fwt.MenuItem);
fan.fwt.Menu.prototype.$ctor = function()
{
  fan.fwt.MenuItem.prototype.$ctor.call(this);
  this.peer = new fan.fwt.MenuPeer(this);
  var $this = this;
  this.m_onOpen = fan.fwt.EventListeners.make();
  return;
}
fan.fwt.Menu.prototype.$typeof = function() { return fan.fwt.Menu.$type; }
fan.fwt.Menu.make = function()
{
  var self = new fan.fwt.Menu();
  fan.fwt.Menu.make$(self);
  return self;
}
fan.fwt.Menu.make$ = function(self)
{
  fan.fwt.MenuItem.make$(self);
  ;
  return;
}
fan.fwt.Menu.prototype.onOpen = function()
{
  return this.m_onOpen;
}
fan.fwt.Menu.prototype.onOpen$ = function(it)
{
  this.m_onOpen = it;
  return;
}
fan.fwt.Menu.prototype.open = function(parent,pos)
{
  return this.peer.open(this,parent,pos);
}
fan.fwt.Menu.prototype.addCommand = function(c)
{
  var $this = this;
  var item = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.fwt.MenuItem.makeCommand(c),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::MenuItem",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.image$(null);
      return;
    })),fan.fwt.MenuItem.$type);
  this.add(item);
  return item;
}
fan.fwt.Menu.prototype.addSep = function()
{
  var $this = this;
  var item = fan.fwt.MenuItem.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::MenuItem",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_mode = fan.fwt.MenuItemMode.m_sep;
      return;
    }));
  this.add(item);
  return;
}
fan.fwt.Menu.prototype.add = function(kid)
{
  if (!fan.sys.ObjUtil.is(kid,fan.fwt.MenuItem.$type))
  {
    throw fan.sys.ArgErr.make(fan.sys.Str.plus("Child of Menu must be MenuItem, not ",fan.sys.Type.of(fan.sys.ObjUtil.coerce(kid,fan.sys.Obj.$type))));
  }
  ;
  fan.fwt.MenuItem.prototype.add.call(this,kid);
  return this;
}
fan.fwt.Menu.prototype.m_onOpen = null;
fan.fwt.MenuPeer = fan.sys.Obj.$extend(fan.fwt.WidgetPeer);
fan.fwt.MenuPeer.prototype.$ctor = function(self) {}
fan.fwt.MenuPeer.prototype.open = function(self, parent, point)
{
  this.$parent = parent;
  this.$point = point;
  // mount mask that functions as input blocker for modality
  var mask = document.createElement("div")
  with (mask.style)
  {
    position   = "fixed";
    top        = "0";
    left       = "0";
    width      = "100%";
    height     = "100%";
    background = "#fff";
    opacity    = "0.01";
    filter     = "progid:DXImageTransform.Microsoft.Alpha(opacity=1);"
  }
  // mount shell we use to attach widgets to
  var shell = document.createElement("div")
  with (shell.style)
  {
    position   = "fixed";
    top        = "0";
    left       = "0";
    width      = "100%";
    height     = "100%";
  }
  var $this = this;
  shell.onclick = function() { $this.close(); }
  // mount menu content
  var content = this.emptyDiv();
  with (content.style)
  {
    background = "#fff";
    opacity    = "0.95";
    padding    = "5px 0";
    MozBoxShadow    = "0 5px 12px #555";
    webkitBoxShadow = "0 5px 12px #555";
    MozBorderRadius     = "5px";
    webkitBorderRadius  = "5px";
  }
  // attach to DOM
  shell.appendChild(content);
  this.attachTo(self, content);
  document.body.appendChild(mask);
  document.body.appendChild(shell);
  self.relayout();
  // cache elements so we can remove when we close
  this.$mask = mask;
  this.$shell = shell;
}
fan.fwt.MenuPeer.prototype.close = function()
{
  if (this.$shell) this.$shell.parentNode.removeChild(this.$shell);
  if (this.$mask) this.$mask.parentNode.removeChild(this.$mask);
}
fan.fwt.MenuPeer.prototype.relayout = function(self)
{
  fan.fwt.WidgetPeer.prototype.relayout.call(this, self);
  var dx = 0; // account for padding
  var dy = 5; // account for padding
  var pw = 0;
  var ph = 0;
  var kids = self.m_kids;
  for (var i=0; i<kids.size(); i++)
    pw = Math.max(pw, kids.get(i).prefSize().m_w);
  pw += 8; // account for padding
  for (var i=0; i<kids.size(); i++)
  {
    var kid  = kids.get(i);
    var pref = kid.prefSize();
    var mh = pref.m_h + 2;  // account for padding
    kid.pos$(fan.gfx.Point.make(dx, dy));
    kid.size$(fan.gfx.Size.make(pw, mh));
    kid.peer.sync(kid);
    dy += mh;
    ph += mh;
  }
  var pp = this.$parent.posOnDisplay();
  var ps = this.$parent.size();
  var x = pp.m_x + this.$point.m_x;
  var y = pp.m_y + this.$point.m_y;
  var w = pw;
  var h = ph;
  // check if we need to swap dir
  var shell = this.elem.parentNode;
  if (x+w >= shell.offsetWidth-4)  x = pp.m_x + ps.m_w - w -1;
  if (y+h >= shell.offsetHeight-4) y = pp.y - h;
  this.pos$(self, fan.gfx.Point.make(x, y));
  this.size$(self, fan.gfx.Size.make(w, h));
  this.sync(self);
}
fan.fwt.TextWidget = fan.sys.Obj.$extend(fan.fwt.Widget);
fan.fwt.TextWidget.prototype.$ctor = function()
{
  fan.fwt.Widget.prototype.$ctor.call(this);
  this.peer = new fan.fwt.TextWidgetPeer(this);
  var $this = this;
  this.m_border = true;
  this.m_multiLine = fan.sys.ObjUtil.is(this,fan.fwt.RichText.$type);
  this.m_editable = true;
  this.m_wrap = false;
  this.m_hscroll = true;
  this.m_vscroll = true;
  this.m_prefCols = 20;
  this.m_prefRows = 10;
  return;
}
fan.fwt.TextWidget.prototype.$typeof = function() { return fan.fwt.TextWidget.$type; }
fan.fwt.TextWidget.prototype.caretOffset = function()
{
  return this.peer.caretOffset(this);
}
fan.fwt.TextWidget.prototype.caretOffset$ = function(it)
{
  return this.peer.caretOffset$(this,it);
}
fan.fwt.TextWidget.prototype.font = function()
{
  return this.peer.font(this);
}
fan.fwt.TextWidget.prototype.font$ = function(it)
{
  return this.peer.font$(this,it);
}
fan.fwt.TextWidget.prototype.prefCols = function()
{
  return this.m_prefCols;
}
fan.fwt.TextWidget.prototype.prefCols$ = function(it)
{
  this.m_prefCols = it;
  return;
}
fan.fwt.TextWidget.prototype.prefRows = function()
{
  return this.m_prefRows;
}
fan.fwt.TextWidget.prototype.prefRows$ = function(it)
{
  this.m_prefRows = it;
  return;
}
fan.fwt.TextWidget.prototype.selectText = function()
{
  return this.peer.selectText(this);
}
fan.fwt.TextWidget.prototype.selectStart = function()
{
  return this.peer.selectStart(this);
}
fan.fwt.TextWidget.prototype.selectSize = function()
{
  return this.peer.selectSize(this);
}
fan.fwt.TextWidget.prototype.select = function(startOffset,size)
{
  return this.peer.select(this,startOffset,size);
}
fan.fwt.TextWidget.prototype.selectAll = function()
{
  return this.peer.selectAll(this);
}
fan.fwt.TextWidget.prototype.selectClear = function()
{
  return this.peer.selectClear(this);
}
fan.fwt.TextWidget.prototype.prefSize = function(hints)
{
  if (hints === undefined) hints = fan.gfx.Hints.m_defVal;
  return this.peer.prefSize(this,hints);
}
fan.fwt.TextWidget.prototype.cut = function()
{
  return this.peer.cut(this);
}
fan.fwt.TextWidget.prototype.copy = function()
{
  return this.peer.copy(this);
}
fan.fwt.TextWidget.prototype.paste = function()
{
  return this.peer.paste(this);
}
fan.fwt.TextWidget.make = function()
{
  var self = new fan.fwt.TextWidget();
  fan.fwt.TextWidget.make$(self);
  return self;
}
fan.fwt.TextWidget.make$ = function(self)
{
  fan.fwt.Widget.make$(self);
  ;
  return;
}
fan.fwt.TextWidget.prototype.m_border = false;
fan.fwt.TextWidget.prototype.m_multiLine = false;
fan.fwt.TextWidget.prototype.m_editable = false;
fan.fwt.TextWidget.prototype.m_wrap = false;
fan.fwt.TextWidget.prototype.m_hscroll = false;
fan.fwt.TextWidget.prototype.m_vscroll = false;
fan.fwt.TextWidget.prototype.m_text = null;
fan.fwt.TextWidget.prototype.m_prefCols = 0;
fan.fwt.TextWidget.prototype.m_prefRows = 0;
fan.fwt.TextWidgetPeer = fan.sys.Obj.$extend(fan.fwt.WidgetPeer);
fan.fwt.TextWidgetPeer.prototype.$ctor = function(self) {}
fan.fwt.TextWidgetPeer.prototype.prefSize = function(self, hints)
{
  var p = fan.fwt.WidgetPeer.prototype.prefSize.call(this, self, hints);
  if (self.m_multiLine) return fan.gfx.Size.make(p.m_w, 16*self.m_prefRows);
  return p;
}
fan.fwt.TextWidgetPeer.prototype.caretOffset = function(self) { return this.m_caretOffset; }
fan.fwt.TextWidgetPeer.prototype.caretOffset$ = function(self, val) { this.m_caretOffset = val; }
fan.fwt.TextWidgetPeer.prototype.m_caretOffset = 0;
fan.fwt.TextWidgetPeer.prototype.font = function(self) { return this.m_font; }
fan.fwt.TextWidgetPeer.prototype.font$ = function(self, val) { this.m_font = val; }
fan.fwt.TextWidgetPeer.prototype.m_font = fan.fwt.Desktop.sysFont();
fan.fwt.RichText = fan.sys.Obj.$extend(fan.fwt.TextWidget);
fan.fwt.RichText.prototype.$ctor = function()
{
  fan.fwt.TextWidget.prototype.$ctor.call(this);
  this.peer = new fan.fwt.RichTextPeer(this);
  var $this = this;
  this.m_onModify = fan.fwt.EventListeners.make();
  this.m_onVerify = fan.fwt.EventListeners.make();
  this.m_onVerifyKey = fan.fwt.EventListeners.make();
  this.m_onSelect = fan.fwt.EventListeners.make();
  this.m_onCaret = fan.fwt.EventListeners.make();
  this.m_hbar = fan.fwt.ScrollBar.make();
  this.m_vbar = fan.fwt.ScrollBar.make();
  this.m_onModelModifyFunc = fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("e","sys::Obj?",false)]),
    fan.sys.Void.$type,
    function(e)
    {
      $this.onModelModify(fan.sys.ObjUtil.coerce(e,fan.fwt.Event.$type));
      return;
    });
  return;
}
fan.fwt.RichText.prototype.$typeof = function() { return fan.fwt.RichText.$type; }
fan.fwt.RichText.make = function(f)
{
  var self = new fan.fwt.RichText();
  fan.fwt.RichText.make$(self,f);
  return self;
}
fan.fwt.RichText.make$ = function(self,f)
{
  if (f === undefined) f = null;
  fan.fwt.TextWidget.make$(self);
  ;
  if (f != null)
  {
    f.call(self);
  }
  ;
  return;
}
fan.fwt.RichText.prototype.onModify = function()
{
  return this.m_onModify;
}
fan.fwt.RichText.prototype.onModify$ = function(it)
{
  this.m_onModify = it;
  return;
}
fan.fwt.RichText.prototype.onVerify = function()
{
  return this.m_onVerify;
}
fan.fwt.RichText.prototype.onVerify$ = function(it)
{
  this.m_onVerify = it;
  return;
}
fan.fwt.RichText.prototype.onVerifyKey = function()
{
  return this.m_onVerifyKey;
}
fan.fwt.RichText.prototype.onVerifyKey$ = function(it)
{
  this.m_onVerifyKey = it;
  return;
}
fan.fwt.RichText.prototype.onSelect = function()
{
  return this.m_onSelect;
}
fan.fwt.RichText.prototype.onSelect$ = function(it)
{
  this.m_onSelect = it;
  return;
}
fan.fwt.RichText.prototype.onCaret = function()
{
  return this.m_onCaret;
}
fan.fwt.RichText.prototype.onCaret$ = function(it)
{
  this.m_onCaret = it;
  return;
}
fan.fwt.RichText.prototype.hbar = function()
{
  return this.m_hbar;
}
fan.fwt.RichText.prototype.hbar$ = function(it)
{
  this.m_hbar = it;
  return;
}
fan.fwt.RichText.prototype.vbar = function()
{
  return this.m_vbar;
}
fan.fwt.RichText.prototype.vbar$ = function(it)
{
  this.m_vbar = it;
  return;
}
fan.fwt.RichText.prototype.model = function()
{
  return this.m_model;
}
fan.fwt.RichText.prototype.model$ = function(it)
{
  if (this.attached())
  {
    throw fan.sys.Err.make("Cannot change model once widget is attached");
  }
  ;
  var old = this.m_model;
  if (old != null)
  {
    old.m_onModify.remove(this.m_onModelModifyFunc);
  }
  ;
  if (it != null)
  {
    it.m_onModify.add(this.m_onModelModifyFunc);
  }
  ;
  this.m_model = it;
  return;
}
fan.fwt.RichText.prototype.onModelModifyFunc = function()
{
  return this.m_onModelModifyFunc;
}
fan.fwt.RichText.prototype.onModelModifyFunc$ = function(it)
{
  this.m_onModelModifyFunc = it;
  return;
}
fan.fwt.RichText.prototype.onModelModify = function(event)
{
  return this.peer.onModelModify(this,event);
}
fan.fwt.RichText.prototype.tabSpacing = function()
{
  return this.peer.tabSpacing(this);
}
fan.fwt.RichText.prototype.tabSpacing$ = function(it)
{
  return this.peer.tabSpacing$(this,it);
}
fan.fwt.RichText.prototype.topLine = function()
{
  return this.peer.topLine(this);
}
fan.fwt.RichText.prototype.topLine$ = function(it)
{
  return this.peer.topLine$(this,it);
}
fan.fwt.RichText.prototype.text = function()
{
  return this.model().text();
}
fan.fwt.RichText.prototype.text$ = function(it)
{
  this.model().text$(it);
  return;
}
fan.fwt.RichText.prototype.offsetAtPos = function(x,y)
{
  return this.peer.offsetAtPos(this,x,y);
}
fan.fwt.RichText.prototype.modify = function(start,replaceLen,newText)
{
  this.model().modify(start,replaceLen,newText);
  return;
}
fan.fwt.RichText.prototype.repaintLine = function(lineIndex)
{
  this.repaintRange(this.model().offsetAtLine(lineIndex),fan.sys.Str.size(this.model().line(lineIndex)));
  return;
}
fan.fwt.RichText.prototype.repaintRange = function(offset,len)
{
  return this.peer.repaintRange(this,offset,len);
}
fan.fwt.RichText.prototype.showLine = function(lineIndex)
{
  return this.peer.showLine(this,lineIndex);
}
fan.fwt.RichText.prototype.m_onModify = null;
fan.fwt.RichText.prototype.m_onVerify = null;
fan.fwt.RichText.prototype.m_onVerifyKey = null;
fan.fwt.RichText.prototype.m_onSelect = null;
fan.fwt.RichText.prototype.m_onCaret = null;
fan.fwt.RichText.prototype.m_hbar = null;
fan.fwt.RichText.prototype.m_vbar = null;
fan.fwt.RichText.prototype.m_model = null;
fan.fwt.RichText.prototype.m_onModelModifyFunc = null;
fan.fwt.RichText.prototype.m_text = null;
fan.fwt.RichTextModel = fan.sys.Obj.$extend(fan.sys.Obj);
fan.fwt.RichTextModel.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_onModify = fan.fwt.EventListeners.make();
  return;
}
fan.fwt.RichTextModel.prototype.$typeof = function() { return fan.fwt.RichTextModel.$type; }
fan.fwt.RichTextModel.prototype.onModify = function()
{
  return this.m_onModify;
}
fan.fwt.RichTextModel.prototype.onModify$ = function(it)
{
  this.m_onModify = it;
  return;
}
fan.fwt.RichTextModel.prototype.lineDelimiter = function()
{
  return "\n";
}
fan.fwt.RichTextModel.prototype.textRange = function(start,len)
{
  var lineIndex = this.lineAtOffset(start);
  var lineOffset = this.offsetAtLine(lineIndex);
  var lineText = this.line(lineIndex);
  var offsetInLine = fan.sys.Int.minus(start,lineOffset);
  if (fan.sys.ObjUtil.compareLE(fan.sys.Int.plus(offsetInLine,len),fan.sys.Str.size(lineText)))
  {
    return fan.sys.Str.getRange(lineText,fan.sys.Range.make(offsetInLine,fan.sys.Int.plus(offsetInLine,len),true));
  }
  ;
  var buf = fan.sys.StrBuf.make(len);
  var n = len;
  if (fan.sys.ObjUtil.compareGE(offsetInLine,0))
  {
    buf.add(fan.sys.Str.getRange(lineText,fan.sys.Range.make(offsetInLine,-1)));
    n = fan.sys.Int.minus(n,buf.size());
  }
  ;
  var delimiter = this.lineDelimiter();
  if (fan.sys.ObjUtil.compareGT(n,0))
  {
    buf.add(delimiter);
    n = fan.sys.Int.minus(n,fan.sys.Str.size(delimiter));
  }
  ;
  while (fan.sys.ObjUtil.compareGT(n,0))
  {
    lineText = this.line(lineIndex = fan.sys.Int.increment(lineIndex));
    if (fan.sys.ObjUtil.compareGE(n,fan.sys.Str.size(lineText)))
    {
      buf.add(lineText);
      n = fan.sys.Int.minus(n,fan.sys.Str.size(lineText));
      if (fan.sys.ObjUtil.compareGT(n,0))
      {
        buf.add(delimiter);
        n = fan.sys.Int.minus(n,fan.sys.Str.size(delimiter));
      }
      ;
    }
    else
    {
      buf.add(fan.sys.Str.getRange(lineText,fan.sys.Range.make(0,n,true)));
      break;
    }
    ;
  }
  ;
  return buf.toStr();
}
fan.fwt.RichTextModel.prototype.lineStyling = function(lineIndex)
{
  return null;
}
fan.fwt.RichTextModel.prototype.lineBackground = function(lineIndex)
{
  return null;
}
fan.fwt.RichTextModel.make = function()
{
  var self = new fan.fwt.RichTextModel();
  fan.fwt.RichTextModel.make$(self);
  return self;
}
fan.fwt.RichTextModel.make$ = function(self)
{
  ;
  return;
}
fan.fwt.RichTextModel.prototype.m_onModify = null;
fan.fwt.RichTextModel.prototype.m_text = null;
fan.fwt.RichTextStyle = fan.sys.Obj.$extend(fan.sys.Obj);
fan.fwt.RichTextStyle.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_underline = fan.fwt.RichTextUnderline.m_none;
  return;
}
fan.fwt.RichTextStyle.prototype.$typeof = function() { return fan.fwt.RichTextStyle.$type; }
fan.fwt.RichTextStyle.make = function(f)
{
  var self = new fan.fwt.RichTextStyle();
  fan.fwt.RichTextStyle.make$(self,f);
  return self;
}
fan.fwt.RichTextStyle.make$ = function(self,f)
{
  if (f === undefined) f = null;
  ;
  if (f != null)
  {
    f.call(self);
  }
  ;
  return;
}
fan.fwt.RichTextStyle.prototype.toStr = function()
{
  var s = fan.sys.StrBuf.make();
  if (this.m_fg != null)
  {
    s.add(fan.sys.Str.plus("fg=",this.m_fg));
  }
  ;
  if (this.m_bg != null)
  {
    s.add(fan.sys.Str.plus(" bg=",this.m_bg));
  }
  ;
  if (this.m_font != null)
  {
    s.add(fan.sys.Str.plus(" font=",this.m_font));
  }
  ;
  if (fan.sys.ObjUtil.compareNE(this.m_underline,fan.fwt.RichTextUnderline.m_none))
  {
    s.add(fan.sys.Str.plus(" underline=",this.m_underline));
  }
  ;
  if (this.m_underlineColor != null)
  {
    s.add(fan.sys.Str.plus(" underlineColor=",this.m_underlineColor));
  }
  ;
  return fan.sys.Str.trim(s.toStr());
}
fan.fwt.RichTextStyle.prototype.m_fg = null;
fan.fwt.RichTextStyle.prototype.m_bg = null;
fan.fwt.RichTextStyle.prototype.m_font = null;
fan.fwt.RichTextStyle.prototype.m_underlineColor = null;
fan.fwt.RichTextStyle.prototype.m_underline = null;
fan.fwt.RichTextUnderline = fan.sys.Obj.$extend(fan.sys.Enum);
fan.fwt.RichTextUnderline.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.fwt.RichTextUnderline.prototype.$typeof = function() { return fan.fwt.RichTextUnderline.$type; }
fan.fwt.RichTextUnderline.make = function($ordinal,$name)
{
  var self = new fan.fwt.RichTextUnderline();
  fan.fwt.RichTextUnderline.make$(self,$ordinal,$name);
  return self;
}
fan.fwt.RichTextUnderline.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.fwt.RichTextUnderline.fromStr = function(name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.fwt.RichTextUnderline.$type,name,checked),fan.fwt.RichTextUnderline.$type.toNullable());
}
fan.fwt.RichTextUnderline.static$init = function()
{
  fan.fwt.RichTextUnderline.m_none = fan.fwt.RichTextUnderline.make(0,"none");
  fan.fwt.RichTextUnderline.m_single = fan.fwt.RichTextUnderline.make(1,"single");
  fan.fwt.RichTextUnderline.m_squiggle = fan.fwt.RichTextUnderline.make(2,"squiggle");
  fan.fwt.RichTextUnderline.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u54 = fan.sys.List.make(fan.fwt.RichTextUnderline.$type, [fan.fwt.RichTextUnderline.m_none,fan.fwt.RichTextUnderline.m_single,fan.fwt.RichTextUnderline.m_squiggle]); if ($_u54 == null) return null; return fan.sys.ObjUtil.toImmutable($_u54); })(this),fan.sys.Type.find("fwt::RichTextUnderline[]"));
  return;
}
fan.fwt.RichTextUnderline.m_none = null;
fan.fwt.RichTextUnderline.m_single = null;
fan.fwt.RichTextUnderline.m_squiggle = null;
fan.fwt.RichTextUnderline.m_vals = null;
fan.fwt.SashPane = fan.sys.Obj.$extend(fan.fwt.Widget);
fan.fwt.SashPane.prototype.$ctor = function()
{
  fan.fwt.Widget.prototype.$ctor.call(this);
  this.peer = new fan.fwt.SashPanePeer(this);
  var $this = this;
  this.m_orientation = fan.gfx.Orientation.m_horizontal;
  return;
}
fan.fwt.SashPane.prototype.$typeof = function() { return fan.fwt.SashPane.$type; }
fan.fwt.SashPane.make = function(f)
{
  var self = new fan.fwt.SashPane();
  fan.fwt.SashPane.make$(self,f);
  return self;
}
fan.fwt.SashPane.make$ = function(self,f)
{
  if (f === undefined) f = null;
  fan.fwt.Widget.make$(self);
  ;
  if (f != null)
  {
    f.call(self);
  }
  ;
  return;
}
fan.fwt.SashPane.prototype.weights = function()
{
  return this.peer.weights(this);
}
fan.fwt.SashPane.prototype.weights$ = function(it)
{
  return this.peer.weights$(this,it);
}
fan.fwt.SashPane.prototype.m_orientation = null;
fan.fwt.SashPanePeer = fan.sys.Obj.$extend(fan.fwt.PanePeer);
fan.fwt.SashPanePeer.prototype.$ctor = function(self)
{
  fan.fwt.PanePeer.prototype.$ctor.call(this, self);
}
fan.fwt.SashPanePeer.prototype.weights   = function(self) { return this.m_weights; }
fan.fwt.SashPanePeer.prototype.weights$  = function(self, val) { this.m_weights = val; }
fan.fwt.SashPanePeer.prototype.m_weights = null;
fan.fwt.SashPanePeer.prototype.prefSize = function(self, hints)
{
  if (self.m_orientation == fan.gfx.Orientation.m_horizontal)
  {
    var max = 0;
    for (var i=0; i<self.m_kids.size(); i++)
    {
      var pref = self.m_kids.get(i).prefSize();
      max = Math.max(max, pref.m_w);
    }
    return fan.gfx.Size.make(max, 10);
  }
  else
  {
    var max = 0;
    for (var i=0; i<self.m_kids.size(); i++)
    {
      var pref = self.m_kids.get(i).prefSize();
      max = Math.max(max, pref.m_h);
    }
    return fan.gfx.Size.make(10, max);
  }
}
fan.fwt.SashPanePeer.prototype.sync = function(self)
{
  if (this.m_weights != null && this.m_weights.size() != self.m_kids.size())
    throw fan.sys.ArgErr.make("weights.size != kids.size");
  if (self.m_orientation == fan.gfx.Orientation.m_horizontal)
    this.doHoriz(self);
  else
    this.doVert(self);
  fan.fwt.WidgetPeer.prototype.sync.call(this, self);
}
fan.fwt.SashPanePeer.prototype.doHoriz = function(self)
{
  var w  = this.m_size.m_w;
  var h  = this.m_size.m_h;
  var wt = this.m_weights;
  var dy = 0;
  var dh = Math.floor(h /self.m_kids.size());
  for (var i=0; i<self.m_kids.size(); i++)
  {
    var cw = w;
    var ch = wt==null ? dh : Math.floor(h * (wt.get(i).valueOf() / 100));
    // if last widget, force to fill remaining space
    if (i == self.m_kids.size()-1) ch = h-dy;
    self.m_kids.get(i).pos$(fan.gfx.Point.make(0, dy));
    self.m_kids.get(i).size$(fan.gfx.Size.make(cw, ch));
    dy += ch;
  }
}
fan.fwt.SashPanePeer.prototype.doVert = function(self)
{
  var w  = this.m_size.m_w;
  var h  = this.m_size.m_h;
  var wt = this.m_weights;
  var dx = 0;
  var dw = Math.floor(w / self.m_kids.size());
  for (var i=0; i<self.m_kids.size(); i++)
  {
    var cw = wt==null ? dw : Math.floor(w * (wt.get(i).valueOf() / 100));
    var ch = h;
    // if last widget, force to fill remaining space
    if (i == self.m_kids.size()-1) cw = w-dx;
    self.m_kids.get(i).pos$(fan.gfx.Point.make(dx, 0));
    self.m_kids.get(i).size$(fan.gfx.Size.make(cw, ch));
    dx += cw;
  }
}
fan.fwt.ScrollBar = fan.sys.Obj.$extend(fan.fwt.Widget);
fan.fwt.ScrollBar.prototype.$ctor = function()
{
  fan.fwt.Widget.prototype.$ctor.call(this);
  this.peer = new fan.fwt.ScrollBarPeer(this);
  var $this = this;
  this.m_onModify = fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.fwt.EventListeners.make(),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::EventListeners",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_onModify = fan.sys.Func.make(
        fan.sys.List.make(fan.sys.Param.$type, []),
        fan.sys.Void.$type,
        function()
        {
          $this.checkModifyListeners();
          return;
        });
      return;
    })),fan.fwt.EventListeners.$type);
  return;
}
fan.fwt.ScrollBar.prototype.$typeof = function() { return fan.fwt.ScrollBar.$type; }
fan.fwt.ScrollBar.make = function()
{
  var self = new fan.fwt.ScrollBar();
  fan.fwt.ScrollBar.make$(self);
  return self;
}
fan.fwt.ScrollBar.make$ = function(self)
{
  fan.fwt.Widget.make$(self);
  ;
  return;
}
fan.fwt.ScrollBar.prototype.onModify = function()
{
  return this.m_onModify;
}
fan.fwt.ScrollBar.prototype.onModify$ = function(it)
{
  this.m_onModify = it;
  return;
}
fan.fwt.ScrollBar.prototype.checkModifyListeners = function()
{
  return this.peer.checkModifyListeners(this);
}
fan.fwt.ScrollBar.prototype.orientation = function()
{
  return this.peer.orientation(this);
}
fan.fwt.ScrollBar.prototype.val = function()
{
  return this.peer.val(this);
}
fan.fwt.ScrollBar.prototype.val$ = function(it)
{
  return this.peer.val$(this,it);
}
fan.fwt.ScrollBar.prototype.min = function()
{
  return this.peer.min(this);
}
fan.fwt.ScrollBar.prototype.min$ = function(it)
{
  return this.peer.min$(this,it);
}
fan.fwt.ScrollBar.prototype.max = function()
{
  return this.peer.max(this);
}
fan.fwt.ScrollBar.prototype.max$ = function(it)
{
  return this.peer.max$(this,it);
}
fan.fwt.ScrollBar.prototype.thumb = function()
{
  return this.peer.thumb(this);
}
fan.fwt.ScrollBar.prototype.thumb$ = function(it)
{
  return this.peer.thumb$(this,it);
}
fan.fwt.ScrollBar.prototype.page = function()
{
  return this.peer.page(this);
}
fan.fwt.ScrollBar.prototype.page$ = function(it)
{
  return this.peer.page$(this,it);
}
fan.fwt.ScrollBar.prototype.m_onModify = null;
fan.fwt.ScrollBarPeer = fan.sys.Obj.$extend(fan.fwt.WidgetPeer);
fan.fwt.ScrollBarPeer.prototype.$ctor = function(self) {}
fan.fwt.ScrollPane = fan.sys.Obj.$extend(fan.fwt.ContentPane);
fan.fwt.ScrollPane.prototype.$ctor = function()
{
  fan.fwt.ContentPane.prototype.$ctor.call(this);
  this.peer = new fan.fwt.ScrollPanePeer(this);
  var $this = this;
  this.m_hbar = fan.fwt.ScrollBar.make();
  this.m_vbar = fan.fwt.ScrollBar.make();
  this.m_border = true;
  return;
}
fan.fwt.ScrollPane.prototype.$typeof = function() { return fan.fwt.ScrollPane.$type; }
fan.fwt.ScrollPane.make = function(f)
{
  var self = new fan.fwt.ScrollPane();
  fan.fwt.ScrollPane.make$(self,f);
  return self;
}
fan.fwt.ScrollPane.make$ = function(self,f)
{
  if (f === undefined) f = null;
  fan.fwt.ContentPane.make$(self);
  ;
  if (f != null)
  {
    f.call(self);
  }
  ;
  return;
}
fan.fwt.ScrollPane.prototype.hbar = function()
{
  return this.m_hbar;
}
fan.fwt.ScrollPane.prototype.hbar$ = function(it)
{
  this.m_hbar = it;
  return;
}
fan.fwt.ScrollPane.prototype.vbar = function()
{
  return this.m_vbar;
}
fan.fwt.ScrollPane.prototype.vbar$ = function(it)
{
  this.m_vbar = it;
  return;
}
fan.fwt.ScrollPane.prototype.onLayout = function()
{
  if (this.content() == null)
  {
    return;
  }
  ;
  this.setMinSize(this.content().prefSize());
  return;
}
fan.fwt.ScrollPane.prototype.setMinSize = function(s)
{
  return this.peer.setMinSize(this,s);
}
fan.fwt.ScrollPane.prototype.m_hbar = null;
fan.fwt.ScrollPane.prototype.m_vbar = null;
fan.fwt.ScrollPane.prototype.m_border = false;
fan.fwt.ScrollPanePeer = fan.sys.Obj.$extend(fan.fwt.PanePeer);
fan.fwt.ScrollPanePeer.prototype.$ctor = function(self)
{
  fan.fwt.PanePeer.prototype.$ctor.call(this, self);
}
fan.fwt.ScrollPanePeer.prototype.create = function(parentElem, self)
{
  var div = this.emptyDiv();
  div.style.overflow = "auto";
  parentElem.appendChild(div);
  return div;
}
fan.fwt.ScrollPanePeer.prototype.setMinSize = function(self, s)
{
  this.m_minSize = s;
}
fan.fwt.ScrollPanePeer.prototype.relayout = function(self)
{
  // short-circuit if not mounted
  if (this.elem == null) return;
  this.sync(self);
  if (self.onLayout) self.onLayout();
  var c = self.m_content;
  if (c != null)
  {
    var sz = this.m_size;
    var ms = this.m_minSize;
    var w = (sz.m_w < ms.m_w) ? ms.m_w : sz.m_w;
    var h = (sz.m_h < ms.m_h) ? ms.m_h : sz.m_h;
    c.size$(fan.gfx.Size.make(w,h));
    c.peer.relayout(c);
  }
  return self;
}
fan.fwt.Table = fan.sys.Obj.$extend(fan.fwt.Widget);
fan.fwt.Table.prototype.$ctor = function()
{
  fan.fwt.Widget.prototype.$ctor.call(this);
  this.peer = new fan.fwt.TablePeer(this);
  var $this = this;
  this.m_onAction = fan.fwt.EventListeners.make();
  this.m_onSelect = fan.fwt.EventListeners.make();
  this.m_onPopup = fan.fwt.EventListeners.make();
  this.m_hbar = fan.fwt.ScrollBar.make();
  this.m_vbar = fan.fwt.ScrollBar.make();
  this.m_border = true;
  this.m_multi = false;
  this.m_model = fan.fwt.TableModel.make();
  this.m_view = fan.fwt.TableView.make(this);
  return;
}
fan.fwt.Table.prototype.$typeof = function() { return fan.fwt.Table.$type; }
fan.fwt.Table.make = function(f)
{
  var self = new fan.fwt.Table();
  fan.fwt.Table.make$(self,f);
  return self;
}
fan.fwt.Table.make$ = function(self,f)
{
  if (f === undefined) f = null;
  fan.fwt.Widget.make$(self);
  ;
  if (f != null)
  {
    f.call(self);
  }
  ;
  return;
}
fan.fwt.Table.prototype.onAction = function()
{
  return this.m_onAction;
}
fan.fwt.Table.prototype.onAction$ = function(it)
{
  this.m_onAction = it;
  return;
}
fan.fwt.Table.prototype.onSelect = function()
{
  return this.m_onSelect;
}
fan.fwt.Table.prototype.onSelect$ = function(it)
{
  this.m_onSelect = it;
  return;
}
fan.fwt.Table.prototype.onPopup = function()
{
  return this.m_onPopup;
}
fan.fwt.Table.prototype.onPopup$ = function(it)
{
  this.m_onPopup = it;
  return;
}
fan.fwt.Table.prototype.hbar = function()
{
  return this.m_hbar;
}
fan.fwt.Table.prototype.hbar$ = function(it)
{
  this.m_hbar = it;
  return;
}
fan.fwt.Table.prototype.vbar = function()
{
  return this.m_vbar;
}
fan.fwt.Table.prototype.vbar$ = function(it)
{
  this.m_vbar = it;
  return;
}
fan.fwt.Table.prototype.model = function()
{
  return this.m_model;
}
fan.fwt.Table.prototype.model$ = function(it)
{
  this.m_model = it;
  return;
}
fan.fwt.Table.prototype.headerVisible = function()
{
  return this.peer.headerVisible(this);
}
fan.fwt.Table.prototype.headerVisible$ = function(it)
{
  return this.peer.headerVisible$(this,it);
}
fan.fwt.Table.prototype.refreshAll = function()
{
  return this.peer.refreshAll(this);
}
fan.fwt.Table.prototype.selected = function()
{
  return this.peer.selected(this);
}
fan.fwt.Table.prototype.selected$ = function(it)
{
  return this.peer.selected$(this,it);
}
fan.fwt.Table.prototype.rowAt = function(pos)
{
  return this.peer.rowAt(this,pos);
}
fan.fwt.Table.prototype.colAt = function(pos)
{
  return this.peer.colAt(this,pos);
}
fan.fwt.Table.prototype.isColVisible = function(col)
{
  return this.view().isColVisible(col);
}
fan.fwt.Table.prototype.setColVisible = function(col,visible)
{
  this.view().setColVisible(col,visible);
  return;
}
fan.fwt.Table.prototype.sortCol = function()
{
  return this.view().m_sortCol;
}
fan.fwt.Table.prototype.sortMode = function()
{
  return this.view().m_sortMode;
}
fan.fwt.Table.prototype.sort = function(col,mode)
{
  if (mode === undefined) mode = fan.fwt.SortMode.m_up;
  return this.peer.sort(this,col,mode);
}
fan.fwt.Table.prototype.view = function()
{
  return this.m_view.sync();
}
fan.fwt.Table.prototype.view$ = function(it)
{
  this.m_view = it;
  return;
}
fan.fwt.Table.prototype.m_onAction = null;
fan.fwt.Table.prototype.m_onSelect = null;
fan.fwt.Table.prototype.m_onPopup = null;
fan.fwt.Table.prototype.m_hbar = null;
fan.fwt.Table.prototype.m_vbar = null;
fan.fwt.Table.prototype.m_border = false;
fan.fwt.Table.prototype.m_multi = false;
fan.fwt.Table.prototype.m_model = null;
fan.fwt.Table.prototype.m_view = null;
fan.fwt.TablePeer = fan.sys.Obj.$extend(fan.fwt.WidgetPeer);
fan.fwt.TablePeer.prototype.$ctor = function(self)
{
  this.m_selected = fan.sys.List.make(fan.sys.Int.$type, []);
  this.inPrefSize = false;
}
fan.fwt.TablePeer.injectCss = function()
{
  if (fan.fwt.TablePeer.hasCss == true) return;
  else fan.fwt.TablePeer.hasCss = true;
  fan.fwt.WidgetPeer.addCss(
    // th
    "table.__fwt_table th {" +
    " margin: 0px;" +
    " padding: 0px;" +
    " border: none;" +
    "}" +
    "table.__fwt_table th:last-child { width:100% }" +
    "table.__fwt_table th > div {" +
    " position:relative;" +
    " font: bold " + fan.fwt.WidgetPeer.fontToCss(fan.fwt.DesktopPeer.$sysFontSmall) + ";" +
    " padding: 3px 6px;" +
    " text-align: left;" +
    " white-space: nowrap;" +
    " border-right: 1px solid #bdbdbd;" +
    " border-bottom: 1px solid #5e5e5e;" +
    " cursor: default;" +
    " background: -moz-linear-gradient(top, #f9f9f9, #eee 50%, #e1e1e1 50%, #f5f5f5);" +
    " background: -webkit-gradient(linear, 0 0, 0 100%, color-stop(0,#f9f9f9), " +
    "   color-stop(0.5,#eee), color-stop(0.5,#e1e1e1), color-stop(1,#f5f5f5));" +
    "}" +
    "table.__fwt_table th:last-child > div { border-right:none; }" +
    "table.__fwt_table th:first-child > div { height: 100%; }" +
    // td
    "table.__fwt_table td {" +
    " padding: 3px 6px;" +
    " font: " + fan.fwt.WidgetPeer.fontToCss(fan.fwt.DesktopPeer.$sysFontView) + ";" +
    " text-align: left;" +
    " white-space: nowrap;" +
    " border-right: 1px solid #d9d9d9;" +
    "}" +
    "table.__fwt_table td:last-child {" +
    " width: 100%;" +
    " border-right: none;" +
    "}" +
    "table.__fwt_table td img { float:left; border:0; width:16px; }" +
    "table.__fwt_table td img.right { float:right }" +
    "table.__fwt_table td img + span { margin-left:3px; }" +
    "table.__fwt_table td img.right + span { margin-left:0; margin-right:6px; }" +
    "table.__fwt_table tr:nth-child(even) { background:#f1f5fa; }" +
    // selected
    "table.__fwt_table tr.selected { background:#3d80df; }" +
    "table.__fwt_table tr.selected td { color:#fff !important; border-color:#346dbe; }" +
    "table.__fwt_table tr.selected a { color:#fff; }");
}
fan.fwt.TablePeer.prototype.m_headerVisible = true;
fan.fwt.TablePeer.prototype.headerVisible   = function(self) { return this.m_headerVisible; }
fan.fwt.TablePeer.prototype.headerVisible$  = function(self, val) { this.m_headerVisible = val; }
fan.fwt.TablePeer.prototype.m_selected = null;
fan.fwt.TablePeer.prototype.selected   = function(self) { return this.m_selected; }
fan.fwt.TablePeer.prototype.selected$  = function(self, val)
{
  this.m_selected = val;
  if (this.selection != null)
  {
    this.selection.select(val);
    if (val.size() > 0) this.selection.last = val.get(0);
  }
}
fan.fwt.TablePeer.prototype.prefSize = function(self, hints)
{
  this.inPrefSize = true;
  var pref = fan.fwt.WidgetPeer.prototype.prefSize.call(this, self, hints);
  this.inPrefSize = false;
  return pref;
}
fan.fwt.TablePeer.prototype.create = function(parentElem, self)
{
  // inject css if needed
  fan.fwt.TablePeer.injectCss();
  // make sure we force rebuild
  this.needRebuild = true;
  var table = document.createElement("table");
  table.className = "__fwt_table";
  var style = table.style;
  style.overflow = "auto";
  style.width  = "100%";
  style.borderSpacing = "0";
  var div = this.emptyDiv();
  style = div.style;
  style.border     = "1px solid #404040";
  style.overflow   = "auto";
  style.background = "#fff";
  var $this = this;
  table.addEventListener("mousedown", function(event) {
    $this.$onMouseDown(self, event);
  }, false);
  div.appendChild(table);
  parentElem.appendChild(div);
  return div;
}
fan.fwt.TablePeer.prototype.sort = function(self, col, mode)
{
  self.view().sort(col, mode);
  this.refreshAll(self);
}
fan.fwt.TablePeer.prototype.refreshAll = function(self)
{
  this.needRebuild = true;
  self.relayout();
}
fan.fwt.TablePeer.prototype.needRebuild = true;
fan.fwt.TablePeer.prototype.sync = function(self)
{
  // no border if content not visible
  if (this.m_size.m_w == 0 || this.m_size.m_h == 0 && !this.inPrefSize)
    this.elem.style.borderWidth = "0px";
  else
    this.elem.style.borderWidth = "1px";
  // account for border
  var w = this.m_size.m_w - 2;
  var h = this.m_size.m_h - 2;
  fan.fwt.WidgetPeer.prototype.sync.call(this, self, w, h);
  // check if table needs to be rebuilt
  if (this.needRebuild && w>0 && h>0)
  {
    this.rebuild(self);
    this.needRebuild = false;
  }
}
fan.fwt.TablePeer.prototype.rebuild = function(self)
{
  // init hook
  if (this.selection == null)
  {
    this.selection = new fan.fwt.TableSelection(self);
    this.support   = new fan.fwt.TableSupport(self);
  }
  // used for firefox workaround
  var isFirefox = navigator.userAgent.indexOf("Firefox/") != -1;
  // build new content
  var $this = this;
  var tbody = document.createElement("tbody");
  var model = self.m_model;
  var view  = self.view();
  var rows  = view.numRows();
  var cols  = view.numCols();
  var sortCol = self.sortCol();
  if (this.m_headerVisible)
  {
    var tr = document.createElement("tr");
    for (var c=-1; c<cols; c++)
    {
      // we have to embed a div inside our th to make
      // the borders overlap correctly
      var fix = document.createElement("div");
      if (c < 0)
      {
        fix.innerHTML = "&nbsp;";
        var arrow  = this.makeArrowDown();
        arrow.style.top  = "9px";
        arrow.style.left = "14px";
        fix.appendChild(arrow);
        fix.onmousedown = function() { $this.support.popup(); }
      }
      else
      {
        var s = view.header(c);
        if (s.length == 0) fix.innerHTML = "&nbsp;"
        else fix.appendChild(document.createTextNode(s));
        var halign = view.halign(c);
        switch (halign)
        {
          case fan.gfx.Halign.m_left:   fix.style.textAlign = "left"; break;
          case fan.gfx.Halign.m_center: fix.style.textAlign = "center"; break;
          case fan.gfx.Halign.m_right:  fix.style.textAlign = "right"; break;
        }
        if (c === sortCol)
        {
          var down = self.sortMode() == fan.fwt.SortMode.m_down;
          var arrow  = this.makeArrowDown(down);
          arrow.style.top  = "9px";
          arrow.style.right = "9px";
          fix.style.paddingRight = "12px";
          fix.appendChild(arrow);
        }
      }
      var th = document.createElement("th");
      th.appendChild(fix);
      tr.appendChild(th);
    }
    tbody.appendChild(tr);
  }
  for (var r=0; r<rows; r++)
  {
    var tr = document.createElement("tr");
    for (var c=-1; c<cols; c++)
    {
      var td = document.createElement("td");
      if (c < 0)
      {
        // selection checkbox
        var cb = document.createElement("input");
        cb.type = "checkbox";
        var $this = this;
        cb.onclick = function(event) { $this.selection.toggle(event ? event : window.event) };
        td.appendChild(cb);
      }
      else
      {
        var node = td;
        // cell hyperlink
        var uri = null;
        if (model.$uri) uri = model.$uri(view.m_cols.get(c), view.m_rows.get(r));
        if (uri != null)
        {
          var a = document.createElement("a");
          a.href = uri.encode();
          node.appendChild(a);
          node = a;
        }
        // cell image
        var imgElem = null;
        var img = view.image(c,r);
        if (img != null)
        {
          imgElem = document.createElement("img");
          imgElem.src = fan.fwt.WidgetPeer.uriToImageSrc(img.m_uri);
          // image align
          var halignImg = fan.gfx.Halign.m_left;
          if (model.$halignImage) halignImg = model.$halignImage(view.m_cols.get(c));
          if (halignImg === fan.gfx.Halign.m_right) imgElem.className = "right";
        }
        // cell text
        var text = view.text(c,r);
        if (imgElem == null) node.appendChild(document.createTextNode(text));
        else
        {
          node.appendChild(imgElem);
          if (text.length > 0)
          {
            var span = document.createElement("span");
            // workaround for Firefox float "bug"
            if (isFirefox && imgElem.className == "right")
              span.style.marginRight = "22px";
            span.appendChild(document.createTextNode(text));
            node.appendChild(span);
          }
        }
        // style overrides
        var fg = view.fg(c,r); if (fg != null) td.style.color = fg.toCss();
        var bg = view.bg(c,r); if (bg != null) td.style.background = bg.toCss();
        var font = view.font(c,r); if (font != null) td.style.font = fan.fwt.WidgetPeer.fontToCss(font);
        var halign = view.halign(c);
        switch (halign)
        {
          case fan.gfx.Halign.m_left:   td.style.textAlign = "left"; break;
          case fan.gfx.Halign.m_center: td.style.textAlign = "center"; break;
          case fan.gfx.Halign.m_right:  td.style.textAlign = "right"; break;
        }
      }
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  // replace tbody
  var table = this.elem.firstChild;
  var old = table.firstChild;
  if (old != null)
  {
    table.removeChild(old);
    old = null;
    delete old;
  }
  table.appendChild(tbody);
  // sync selection
  this.selection.select(this.m_selected);
}
fan.fwt.TablePeer.prototype.$onMouseDown = function(self, event)
{
  var target = event.target;
  // header events
  if (target.tagName == "DIV") target = target.parentNode;
  if (target.tagName == "TH")
  {
    var col = target.cellIndex - 1;
    if (col < 0) return;
    var old = self.sortCol();
    var mode = old === col ? self.sortMode().toggle() : fan.fwt.SortMode.m_up;
    self.sort(col, mode);
  }
  // cell events
  if (target.tagName == "IMG") target = target.parentNode;
  if (target.tagName == "TD")
  {
    // find cell address
    var col = target.cellIndex - 1;
    var row = target.parentNode.rowIndex - 1;
    if (col < 0 || row < 0) return;
    // check for valid callback
    var model = self.m_model;
    var view  = self.view();
    if (!model.$onMouseDown) return;
    // find pos on display
    var dis = this.posOnDisplay(self);
    var posOnDis = fan.gfx.Point.make(event.clientX-dis.m_x, event.clientY-dis.m_y);
    // find pos relative to cell
    var div   = this.elem;
    var table = div.firstChild;
    var tr  = table.rows[row+1];
    var td  = tr.cells[col+1];
    var rx  = posOnDis.m_x - td.offsetLeft + div.scrollLeft;
    var ry  = posOnDis.m_y - tr.offsetTop  + div.scrollTop;
    var rel = fan.gfx.Point.make(rx, ry);
    // data map
    var data = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Obj.$type);
    data.set("posOnDisplay", posOnDis);
    data.set("cellSize",     fan.gfx.Size.make(td.offsetWidth, td.offsetHeight));
    // fire event
    var evt = fan.fwt.Event.make();
    evt.m_id = fan.fwt.EventId.m_mouseDown;
    evt.m_pos = rel;
    evt.m_widget = self;
    evt.m_data = data;
    model.$onMouseDown(evt, view.m_cols.get(col), view.m_rows.get(row));
  }
}
fan.fwt.TablePeer.prototype.makeArrowDown = function(down)
{
  if (down === undefined) down = true;
  var s = down ? 0 : 2;
  var d = down ? 1 : -1;
  var div = document.createElement("div");
  div.style.position = "absolute";
  div.width  = "5px";
  div.height = "3px";
  var dot = null;
  dot = this.makeDot(); dot.style.top=""+s+"px"; dot.style.left="0px"; div.appendChild(dot);
  dot = this.makeDot(); dot.style.top=""+s+"px"; dot.style.left="1px"; div.appendChild(dot);
  dot = this.makeDot(); dot.style.top=""+s+"px"; dot.style.left="2px"; div.appendChild(dot);
  dot = this.makeDot(); dot.style.top=""+s+"px"; dot.style.left="3px"; div.appendChild(dot);
  dot = this.makeDot(); dot.style.top=""+s+"px"; dot.style.left="4px"; div.appendChild(dot);
  s += d;
  dot = this.makeDot(); dot.style.top=""+s+"px"; dot.style.left="1px"; div.appendChild(dot);
  dot = this.makeDot(); dot.style.top=""+s+"px"; dot.style.left="2px"; div.appendChild(dot);
  dot = this.makeDot(); dot.style.top=""+s+"px"; dot.style.left="3px"; div.appendChild(dot);
  s += d;
  dot = this.makeDot(); dot.style.top=""+s+"px"; dot.style.left="2px"; div.appendChild(dot);
  return div;
}
fan.fwt.TablePeer.prototype.makeDot = function()
{
  var dot = document.createElement("div");
  dot.style.position   = "absolute";
  dot.style.width      = "1px";
  dot.style.height     = "1px";
  dot.style.background = "#404040";
  return dot;
}
fan.fwt.TableSelection = fan.sys.Obj.$extend(fan.fwt.WidgetPeer);
fan.fwt.TableSelection.prototype.$ctor = function(table)
{
  this.table = table;
  this.last = null;
}
fan.fwt.TableSelection.prototype.toggle = function(event)
{
  var target = event.target ? event.target : event.srcElement;
  var multi  = this.table.m_multi && (event.ctrlKey || event.metaKey || event.shiftKey);
  var on  = target.checked;
  var tr  = target.parentNode.parentNode;
  var row = tr.rowIndex;
  if (this.table.peer.m_headerVisible) row--; // account for th row
  var list = null;
  if (multi)
  {
    if (event.shiftKey && this.last != null)
    {
      list = [];
      var start = (this.last < row) ? this.last : row;
      var end   = (this.last < row) ? row : this.last;
      for (var i=start; i<=end; i++) list.push(i);
    }
    else
    {
      // find cur selected rows
      list = [];
      var view = this.table.view();
      var orig = this.table.peer.m_selected.m_values;
      for (var i=0; i<orig.length; i++)
        for (var j=0; j<view.m_rows.size(); j++)
          if (orig[i] == view.m_rows.get(j))
            list.push(j);
      var found = false;
      for (var i=0; i<list.length; i++)
        if (list[i] == row)
          { list.splice(i,1); found=true; }
      if (!found) list.push(row);
      this.last = row;
    }
  }
  else
  {
    var hadMulti = this.table.m_multi && this.table.peer.m_selected.size() > 1;
    list = (on || hadMulti) ? [row] : [];
    this.last = row;
  }
  this.table.peer.m_selected = this.select(list);  // keep list sorted
  this.notify(row);
}
fan.fwt.TableSelection.prototype.select = function(rows)
{
  if (rows instanceof fan.sys.List) rows = rows.m_values;
  var selected = [];
  var view  = this.table.view();
  var tbody = this.table.peer.elem.firstChild.firstChild;
  var start = this.table.peer.m_headerVisible ? 1 : 0; // skip th row
  for (var i=start; i<tbody.childNodes.length; i++)
  {
    var row = i-start;
    var tr  = tbody.childNodes[i];
    var on  = false;
    var len = rows.length;
    if (len > 1 && !this.table.m_multi) len = 1;
    for (var s=0; s<len; s++)
      if (row == rows[s])
      {
        on = true;
        selected.push(view.m_rows.get(row));
        break;
      }
    tr.className = on ? "selected" : "";
    tr.firstChild.firstChild.checked = on;
  }
  selected.sort();
  return fan.sys.List.make(fan.sys.Int.$type, selected);
}
fan.fwt.TableSelection.prototype.notify = function(primaryIndex)
{
  if (this.table.m_onSelect.size() > 0)
  {
    var se      = fan.fwt.Event.make();
    se.m_id     = fan.fwt.EventId.m_select;
    se.m_index  = primaryIndex;
    se.m_widget = this.table;
    var listeners = this.table.m_onSelect.list();
    for (var i=0; i<listeners.size(); i++) listeners.get(i).call(se);
  }
}
fan.fwt.TableSupport = fan.sys.Obj.$extend(fan.sys.Obj);
fan.fwt.TableSupport.prototype.$ctor = function(table) { this.table = table; }
fan.fwt.TableSupport.prototype.popup = function()
{
  var $this = this;
  var table = this.table;
  var selectAll = fan.fwt.MenuItem.make();
  selectAll.text$("Select All");
  selectAll.onAction().add(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::Event",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      var rows = [];
      var len  = table.view().numRows();
      for (var i=0; i<len; i++) rows.push(i);
      table.peer.m_selected = table.peer.selection.select(rows);
      table.peer.selection.notify(0);
    }));
  var selectNone = fan.fwt.MenuItem.make();
  selectNone.text$("Select None");
  selectNone.onAction().add(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::Event",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      table.peer.m_selected = table.peer.selection.select([]);
      table.peer.selection.notify(0);
    }));
  var xport = fan.fwt.MenuItem.make();
  xport.text$("Export");
  xport.onAction().add(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","fwt::Event",false)]),
    fan.sys.Void.$type,
    function(it) { $this.exportTable(); }));
  if (!table.m_multi)
  {
    selectAll.enabled$(false);
    selectNone.enabled$(false);
  }
  if (table.view().numRows() == 0) xport.enabled$(false);
  var menu = fan.fwt.Menu.make();
  menu.add(selectAll);
  menu.add(selectNone);
  menu.add(xport);
  menu.open(table, fan.gfx.Point.make(0, 23));
}
fan.fwt.TableSupport.prototype.exportTable = function()
{
  // build csv str
  var str = "";
  var model = this.table.model();
  // headers
  for (var c=0; c<model.numCols(); c++)
  {
    if (c>0) str += ",";
    str += this.escape(model.header(c));
  }
  str += "\n";
  // rows
  for (var r=0; r<model.numRows(); r++)
  {
    for (var c=0; c<model.numCols(); c++)
    {
      if (c>0) str += ",";
      str += this.escape(model.text(c, r));
    }
    str += "\n";
  }
  // show in widget
  var text = fan.fwt.Text.make();
  text.m_multiLine = true;
  text.m_prefRows = 20;
  text.text$(str);
  var cons = fan.fwt.ConstraintPane.make();
  cons.m_minw = 650;
  cons.m_maxw = 650;
  cons.content$(text);
  var dlg = fan.fwt.Dialog.make(this.table.window());
  dlg.title$("Export");
  dlg.body$(cons);
  dlg.commands$(fan.sys.List.make(fan.sys.Obj.$type, [fan.fwt.Dialog.ok()]));
  dlg.open();
}
fan.fwt.TableSupport.prototype.escape = function(str)
{
  // convert " to ""
  str = str.replace(/\"/g, "\"\"");
  // check if need to wrap in quotes
  var wrap = str.search(/[,\n\" ]/) != -1;
  if (wrap) str = "\"" + str + "\"";
  return str;
}
fan.fwt.TableModel = fan.sys.Obj.$extend(fan.sys.Obj);
fan.fwt.TableModel.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.fwt.TableModel.prototype.$typeof = function() { return fan.fwt.TableModel.$type; }
fan.fwt.TableModel.prototype.numRows = function()
{
  return 0;
}
fan.fwt.TableModel.prototype.numCols = function()
{
  return 1;
}
fan.fwt.TableModel.prototype.header = function(col)
{
  return fan.sys.Str.plus("Header ",fan.sys.ObjUtil.coerce(col,fan.sys.Obj.$type.toNullable()));
}
fan.fwt.TableModel.prototype.halign = function(col)
{
  return fan.gfx.Halign.m_left;
}
fan.fwt.TableModel.prototype.prefWidth = function(col)
{
  return null;
}
fan.fwt.TableModel.prototype.text = function(col,row)
{
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(col,fan.sys.Obj.$type.toNullable())),":"),fan.sys.ObjUtil.coerce(row,fan.sys.Obj.$type.toNullable()));
}
fan.fwt.TableModel.prototype.image = function(col,row)
{
  return null;
}
fan.fwt.TableModel.prototype.font = function(col,row)
{
  return null;
}
fan.fwt.TableModel.prototype.fg = function(col,row)
{
  return null;
}
fan.fwt.TableModel.prototype.bg = function(col,row)
{
  return null;
}
fan.fwt.TableModel.prototype.sortCompare = function(col,row1,row2)
{
  return fan.sys.Str.localeCompare(this.text(col,row1),this.text(col,row2));
}
fan.fwt.TableModel.make = function()
{
  var self = new fan.fwt.TableModel();
  fan.fwt.TableModel.make$(self);
  return self;
}
fan.fwt.TableModel.make$ = function(self)
{
  return;
}
fan.fwt.TableView = fan.sys.Obj.$extend(fan.fwt.TableModel);
fan.fwt.TableView.prototype.$ctor = function()
{
  fan.fwt.TableModel.prototype.$ctor.call(this);
  var $this = this;
  this.m_rows = fan.sys.List.make(fan.sys.Int.$type);
  this.m_cols = fan.sys.List.make(fan.sys.Int.$type);
  this.m_vis = fan.sys.List.make(fan.sys.Bool.$type);
  this.m_sortMode = fan.fwt.SortMode.m_up;
  return;
}
fan.fwt.TableView.prototype.$typeof = function() { return fan.fwt.TableView.$type; }
fan.fwt.TableView.make = function(table)
{
  var self = new fan.fwt.TableView();
  fan.fwt.TableView.make$(self,table);
  return self;
}
fan.fwt.TableView.make$ = function(self,table)
{
  fan.fwt.TableModel.make$(self);
  ;
  self.m_table = table;
  return;
}
fan.fwt.TableView.prototype.numRows = function()
{
  return this.m_rows.size();
}
fan.fwt.TableView.prototype.numCols = function()
{
  return this.m_cols.size();
}
fan.fwt.TableView.prototype.header = function(col)
{
  return this.m_table.m_model.header(this.m_cols.get(col));
}
fan.fwt.TableView.prototype.halign = function(col)
{
  return this.m_table.m_model.halign(this.m_cols.get(col));
}
fan.fwt.TableView.prototype.prefWidth = function(col)
{
  return this.m_table.m_model.prefWidth(this.m_cols.get(col));
}
fan.fwt.TableView.prototype.text = function(col,row)
{
  return this.m_table.m_model.text(this.m_cols.get(col),this.m_rows.get(row));
}
fan.fwt.TableView.prototype.image = function(col,row)
{
  return this.m_table.m_model.image(this.m_cols.get(col),this.m_rows.get(row));
}
fan.fwt.TableView.prototype.font = function(col,row)
{
  return this.m_table.m_model.font(this.m_cols.get(col),this.m_rows.get(row));
}
fan.fwt.TableView.prototype.fg = function(col,row)
{
  return this.m_table.m_model.fg(this.m_cols.get(col),this.m_rows.get(row));
}
fan.fwt.TableView.prototype.bg = function(col,row)
{
  return this.m_table.m_model.bg(this.m_cols.get(col),this.m_rows.get(row));
}
fan.fwt.TableView.prototype.isColVisible = function(col)
{
  return this.m_vis.get(col);
}
fan.fwt.TableView.prototype.setColVisible = function(col,visible)
{
  var $this = this;
  if (fan.sys.ObjUtil.equals(this.m_vis.get(col),visible))
  {
    return this;
  }
  ;
  this.m_vis.set(col,fan.sys.ObjUtil.coerce(visible,fan.sys.Obj.$type.toNullable()));
  this.m_cols.clear();
  this.m_vis.each(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("v","sys::Bool",false),new fan.sys.Param("i","sys::Int",false)]),
    fan.sys.Void.$type,
    function(v,i)
    {
      if (v)
      {
        $this.m_cols.add(fan.sys.ObjUtil.coerce(i,fan.sys.Obj.$type.toNullable()));
      }
      ;
      return;
    }));
  return this;
}
fan.fwt.TableView.prototype.sort = function(col,mode)
{
  if (mode === undefined) mode = fan.fwt.SortMode.m_up;
  var $this = this;
  var model = this.m_table.m_model;
  this.m_sortCol = col;
  this.m_sortMode = mode;
  if (col == null)
  {
    this.m_rows.each(fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("val","sys::Int",false),new fan.sys.Param("i","sys::Int",false)]),
      fan.sys.Void.$type,
      function(val,i)
      {
        $this.m_rows.set(i,fan.sys.ObjUtil.coerce(i,fan.sys.Obj.$type.toNullable()));
        return;
      }));
  }
  else
  {
    if (mode === fan.fwt.SortMode.m_up)
    {
      this.m_rows.sort(fan.sys.Func.make(
        fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("a","sys::Int",false),new fan.sys.Param("b","sys::Int",false)]),
        fan.sys.Int.$type,
        function(a,b)
        {
          return model.sortCompare(fan.sys.ObjUtil.coerce(col,fan.sys.Int.$type),a,b);
        }));
    }
    else
    {
      this.m_rows.sortr(fan.sys.Func.make(
        fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("a","sys::Int",false),new fan.sys.Param("b","sys::Int",false)]),
        fan.sys.Int.$type,
        function(a,b)
        {
          return model.sortCompare(fan.sys.ObjUtil.coerce(col,fan.sys.Int.$type),a,b);
        }));
    }
    ;
  }
  ;
  return;
}
fan.fwt.TableView.prototype.sync = function()
{
  var model = this.m_table.m_model;
  if (fan.sys.ObjUtil.compareNE(this.m_rows.size(),model.numRows()))
  {
    this.syncRows();
  }
  ;
  if (fan.sys.ObjUtil.compareNE(this.m_vis.size(),model.numCols()))
  {
    this.syncCols();
  }
  ;
  return this;
}
fan.fwt.TableView.prototype.syncRows = function()
{
  var $this = this;
  var model = this.m_table.m_model;
  this.m_rows.clear();
  this.m_rows.capacity$(model.numRows());
  fan.sys.Int.times(model.numRows(),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("i","sys::Int",false)]),
    fan.sys.Void.$type,
    function(i)
    {
      $this.m_rows.add(fan.sys.ObjUtil.coerce(i,fan.sys.Obj.$type.toNullable()));
      return;
    }));
  if (this.m_sortCol != null)
  {
    this.sort(this.m_sortCol,this.m_sortMode);
  }
  ;
  return;
}
fan.fwt.TableView.prototype.syncCols = function()
{
  var $this = this;
  var model = this.m_table.m_model;
  this.m_cols.clear();
  this.m_cols.capacity$(model.numCols());
  this.m_vis.clear();
  this.m_vis.capacity$(model.numCols());
  fan.sys.Int.times(model.numCols(),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("i","sys::Int",false)]),
    fan.sys.Void.$type,
    function(i)
    {
      $this.m_cols.add(fan.sys.ObjUtil.coerce(i,fan.sys.Obj.$type.toNullable()));
      $this.m_vis.add(fan.sys.ObjUtil.coerce(true,fan.sys.Obj.$type.toNullable()));
      return;
    }));
  return;
}
fan.fwt.TableView.prototype.table = function()
{
  return this.m_table;
}
fan.fwt.TableView.prototype.table$ = function(it)
{
  this.m_table = it;
  return;
}
fan.fwt.TableView.prototype.rows = function()
{
  return this.m_rows;
}
fan.fwt.TableView.prototype.rows$ = function(it)
{
  this.m_rows = it;
  return;
}
fan.fwt.TableView.prototype.cols = function()
{
  return this.m_cols;
}
fan.fwt.TableView.prototype.cols$ = function(it)
{
  this.m_cols = it;
  return;
}
fan.fwt.TableView.prototype.vis = function()
{
  return this.m_vis;
}
fan.fwt.TableView.prototype.vis$ = function(it)
{
  this.m_vis = it;
  return;
}
fan.fwt.TableView.prototype.sortCol = function()
{
  return this.m_sortCol;
}
fan.fwt.TableView.prototype.sortCol$ = function(it)
{
  this.m_sortCol = it;
  return;
}
fan.fwt.TableView.prototype.sortMode = function()
{
  return this.m_sortMode;
}
fan.fwt.TableView.prototype.sortMode$ = function(it)
{
  this.m_sortMode = it;
  return;
}
fan.fwt.TableView.prototype.m_table = null;
fan.fwt.TableView.prototype.m_rows = null;
fan.fwt.TableView.prototype.m_cols = null;
fan.fwt.TableView.prototype.m_vis = null;
fan.fwt.TableView.prototype.m_sortCol = null;
fan.fwt.TableView.prototype.m_sortMode = null;
fan.fwt.TabPane = fan.sys.Obj.$extend(fan.fwt.Widget);
fan.fwt.TabPane.prototype.$ctor = function()
{
  fan.fwt.Widget.prototype.$ctor.call(this);
  this.peer = new fan.fwt.TabPanePeer(this);
  var $this = this;
  this.m_onSelect = fan.fwt.EventListeners.make();
  return;
}
fan.fwt.TabPane.prototype.$typeof = function() { return fan.fwt.TabPane.$type; }
fan.fwt.TabPane.prototype.onSelect = function()
{
  return this.m_onSelect;
}
fan.fwt.TabPane.prototype.onSelect$ = function(it)
{
  this.m_onSelect = it;
  return;
}
fan.fwt.TabPane.prototype.tabs = function()
{
  return fan.sys.List.make(fan.fwt.Tab.$type).addAll(fan.sys.ObjUtil.coerce(this.children(),fan.sys.Type.find("fwt::Tab[]")));
}
fan.fwt.TabPane.prototype.selectedIndex = function()
{
  return this.peer.selectedIndex(this);
}
fan.fwt.TabPane.prototype.selectedIndex$ = function(it)
{
  return this.peer.selectedIndex$(this,it);
}
fan.fwt.TabPane.prototype.selected = function()
{
  var i = this.selectedIndex();
  return (function($this) { if (i == null) return null; return $this.tabs().get(fan.sys.ObjUtil.coerce(i,fan.sys.Int.$type)); })(this);
}
fan.fwt.TabPane.prototype.selected$ = function(it)
{
  var i = this.index(fan.sys.ObjUtil.coerce(it,fan.fwt.Tab.$type));
  if (i != null)
  {
    this.selectedIndex$(i);
  }
  ;
  return;
}
fan.fwt.TabPane.prototype.index = function(tab)
{
  return this.tabs().index(tab);
}
fan.fwt.TabPane.prototype.add = function(kid)
{
  if (!fan.sys.ObjUtil.is(kid,fan.fwt.Tab.$type))
  {
    throw fan.sys.ArgErr.make(fan.sys.Str.plus("Child of TabPane must be Tab, not ",fan.sys.Type.of(fan.sys.ObjUtil.coerce(kid,fan.sys.Obj.$type))));
  }
  ;
  fan.fwt.Widget.prototype.add.call(this,kid);
  return this;
}
fan.fwt.TabPane.make = function()
{
  var self = new fan.fwt.TabPane();
  fan.fwt.TabPane.make$(self);
  return self;
}
fan.fwt.TabPane.make$ = function(self)
{
  fan.fwt.Widget.make$(self);
  ;
  return;
}
fan.fwt.TabPane.prototype.m_onSelect = null;
fan.fwt.TabPane.prototype.m_selected = null;
fan.fwt.TabPanePeer = fan.sys.Obj.$extend(fan.fwt.PanePeer);
fan.fwt.TabPanePeer.prototype.$ctor = function(self) {}
fan.fwt.TabPanePeer.prototype.selectedIndex = function(self) { return this.m_selectedIndex; }
fan.fwt.TabPanePeer.prototype.selectedIndex$ = function(self, val) { this.m_selectedIndex = val; }
fan.fwt.TabPanePeer.prototype.m_selectedIndex = 0;
fan.fwt.TabPanePeer.prototype.sync = function(self)
{
  fan.fwt.WidgetPeer.prototype.sync.call(this, self);
  var kids = self.m_kids;
  if (kids.size() == 0) return;
  // sync tabs
  var tx = 12;  // tab x pos
  var th = 0;   // tab height
  for (var i=0; i<kids.size(); i++)
  {
    var tab = kids.get(i);
    if (tab.peer.elem == null) return; // not attached yet
    var pref = tab.prefSize();
    tab.pos$(fan.gfx.Point.make(tx, 0));
    tab.size$(fan.gfx.Size.make(pref.m_w, pref.m_h));
    tab.peer.index = i;
    tx += pref.m_w + 3;
    th = Math.max(th, pref.m_h);
  }
  // content border
  if (this.contentBorder == null)
  {
    var cb = document.createElement("div");
    this.elem.insertBefore(cb, this.elem.firstChild);
    this.contentBorder = cb;
  }
  with (this.contentBorder.style)
  {
    background = "#eee";
    border     = "1px solid #404040";
    position   = "absolute";
    left   = 0;
    top    = (th-1) + "px";
    width  = (this.m_size.m_w-2) + "px";
    height = (this.m_size.m_h-th-1) + "px";
  }
  // sync content
  var cw = this.m_size.m_w;       // content width
  var ch = this.m_size.m_h - th;  // content height
  for (var i=0; i<kids.size(); i++)
  {
    var tab = kids.get(i);
    if (tab.m_kids.size() > 0)
    {
      var s = i == this.m_selectedIndex;
      var x = 12;
      var y = 12 + th;
      var w = s ? cw-24 : 0;
      var h = s ? ch-24 : 0;
      var c = tab.m_kids.get(0);
      // check if we need to re-root content
      if (c.peer.elem.parentNode == null)
        this.elem.appendChild(c.peer.elem);
      c.pos$(fan.gfx.Point.make(x,y));
      c.size$(fan.gfx.Size.make(w,h));
    }
  }
}
fan.fwt.Tab = fan.sys.Obj.$extend(fan.fwt.Widget);
fan.fwt.Tab.prototype.$ctor = function()
{
  fan.fwt.Widget.prototype.$ctor.call(this);
  this.peer = new fan.fwt.TabPeer(this);
  var $this = this;
}
fan.fwt.Tab.prototype.$typeof = function() { return fan.fwt.Tab.$type; }
fan.fwt.Tab.prototype.text = function()
{
  return this.peer.text(this);
}
fan.fwt.Tab.prototype.text$ = function(it)
{
  return this.peer.text$(this,it);
}
fan.fwt.Tab.prototype.image = function()
{
  return this.peer.image(this);
}
fan.fwt.Tab.prototype.image$ = function(it)
{
  return this.peer.image$(this,it);
}
fan.fwt.Tab.make = function()
{
  var self = new fan.fwt.Tab();
  fan.fwt.Tab.make$(self);
  return self;
}
fan.fwt.Tab.make$ = function(self)
{
  fan.fwt.Widget.make$(self);
  return;
}
fan.fwt.TabPeer = fan.sys.Obj.$extend(fan.fwt.WidgetPeer);
fan.fwt.TabPeer.prototype.$ctor = function(self) {}
fan.fwt.TabPeer.prototype.text = function(self) { return this.m_text; }
fan.fwt.TabPeer.prototype.text$ = function(self, val) { this.m_text = val; }
fan.fwt.TabPeer.prototype.m_text = "";
fan.fwt.TabPeer.prototype.image = function(self) { return this.m_image; }
fan.fwt.TabPeer.prototype.image$ = function(self, val)
{
  this.m_image = val;
  fan.fwt.FwtEnvPeer.loadImage(val, self)
}
fan.fwt.TabPeer.prototype.m_image = null;
fan.fwt.TabPeer.prototype.sync = function(self)
{
  var elem = this.elem;
  var selected = this.index == self.m_parent.peer.m_selectedIndex;
  while (elem.firstChild != null) elem.removeChild(elem.firstChild);
  var text = document.createTextNode(this.m_text);
  elem.appendChild(text);
  var $self = self;
  elem.onmousedown = function()
  {
    $self.m_parent.peer.m_selectedIndex = $self.peer.index;
    $self.m_parent.relayout();
  }
  var css = elem.style;
  css.cursor  = "default";
  css.padding = "6px 12px";
  css.border  = "1px solid #404040";
  css.font = fan.fwt.WidgetPeer.fontToCss(fan.fwt.DesktopPeer.$sysFont);
  if (selected) css.borderBottom = "1px solid #eee";
  css.MozBorderRadius = "5px 5px 0 0";
  css.webkitBorderTopLeftRadius  = "5px";
  css.webkitBorderTopRightRadius = "5px";
  if (selected)
  {
    fan.fwt.WidgetPeer.setBg(elem, fan.gfx.Gradient.fromStr("0% 0%, 0% 100%, #f8f8f8, #eee"));
  }
  else
  {
    fan.fwt.WidgetPeer.setBg(elem, fan.gfx.Gradient.fromStr("0% 0%, 0% 100%, #eee, #ccc"));
  }
  // account for border/padding
  var w = this.m_size.m_w - 26;
  var h = this.m_size.m_h - 14;
  fan.fwt.WidgetPeer.prototype.sync.call(this, self, w, h);
}
fan.fwt.TabPeer.prototype.index = null;
fan.fwt.Text = fan.sys.Obj.$extend(fan.fwt.TextWidget);
fan.fwt.Text.prototype.$ctor = function()
{
  fan.fwt.TextWidget.prototype.$ctor.call(this);
  this.peer = new fan.fwt.TextPeer(this);
  var $this = this;
  this.m_onAction = fan.fwt.EventListeners.make();
  this.m_onModify = fan.fwt.EventListeners.make();
  this.m_password = false;
  return;
}
fan.fwt.Text.prototype.$typeof = function() { return fan.fwt.Text.$type; }
fan.fwt.Text.make = function(f)
{
  var self = new fan.fwt.Text();
  fan.fwt.Text.make$(self,f);
  return self;
}
fan.fwt.Text.make$ = function(self,f)
{
  if (f === undefined) f = null;
  fan.fwt.TextWidget.make$(self);
  ;
  if (f != null)
  {
    f.call(self);
  }
  ;
  return;
}
fan.fwt.Text.prototype.onAction = function()
{
  return this.m_onAction;
}
fan.fwt.Text.prototype.onAction$ = function(it)
{
  this.m_onAction = it;
  return;
}
fan.fwt.Text.prototype.onModify = function()
{
  return this.m_onModify;
}
fan.fwt.Text.prototype.onModify$ = function(it)
{
  this.m_onModify = it;
  return;
}
fan.fwt.Text.prototype.text = function()
{
  return this.peer.text(this);
}
fan.fwt.Text.prototype.text$ = function(it)
{
  return this.peer.text$(this,it);
}
fan.fwt.Text.prototype.modify = function(start,replaceLen,newText)
{
  this.text$(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.getRange(this.text(),fan.sys.Range.make(0,start,true)),newText),fan.sys.Str.getRange(this.text(),fan.sys.Range.make(fan.sys.Int.plus(start,replaceLen),-1))));
  return;
}
fan.fwt.Text.prototype.m_onAction = null;
fan.fwt.Text.prototype.m_onModify = null;
fan.fwt.Text.prototype.m_password = false;
fan.fwt.TextPeer = fan.sys.Obj.$extend(fan.fwt.TextWidgetPeer);
fan.fwt.TextPeer.prototype.$ctor = function(self)
{
  this.control = null;
}
fan.fwt.TextPeer.prototype.text = function(self) { return this.m_text; }
fan.fwt.TextPeer.prototype.text$ = function(self, val, sync)
{
  this.m_text = val;
  if (sync === undefined) sync = true;
  if (sync && this.control != null) this.control.value = this.m_text;
}
fan.fwt.TextPeer.prototype.m_text = "";
fan.fwt.TextPeer.prototype.create = function(parentElem, self)
{
  // create actual input element
  if (self.m_multiLine)
  {
    var text = document.createElement("textarea");
    text.style.position = "absolute";
    text.style.left     = "0px";
    text.style.top      = "1px";
    text.style.outline  = "none";
    text.style.padding  = "2px";
    text.style.resize   = "none";
    text.style.font     = fan.fwt.WidgetPeer.fontToCss(this.m_font);
    this.control = text;
  }
  else
  {
    var text = document.createElement("input");
    text.type = "text";
    text.size = self.m_prefCols;
    text.style.outline = "none";
    text.style.padding = "1px 2px 2px 2px";
    text.style.margin  = "0px";
    text.style.font    = fan.fwt.WidgetPeer.fontToCss(this.m_font);
    this.control = text;
  }
  // wire up event handler to keep text prop synchronized
  text.onkeyup = function(event)
  {
    // IE-ness
    var target = event ? event.target : window.event.srcElement;
    var event  = event ? event : window.event;
    // sync control value to widget
    self.peer.text$(self, target.value, false);
    // fire onAction
    if (event.keyCode == 13 && self.m_onAction.size() > 0)
    {
      var ae = fan.fwt.Event.make();
      ae.m_id = fan.fwt.EventId.m_action;
      ae.m_widget = self;
      var list = self.m_onAction.list();
      for (var i=0; i<list.size(); i++) list.get(i).call(ae);
    }
    // fire onModify
    if (self.m_onModify.size() > 0)
    {
      var me = fan.fwt.Event.make();
      me.m_id = fan.fwt.EventId.m_modified;
      me.m_widget = self;
      var list = self.m_onModify.list();
      for (var i=0; i<list.size(); i++) list.get(i).call(me);
    }
  }
  // inner div
  var inner = document.createElement("div");
  inner.style.borderTop = "1px solid #ccc";
  inner.appendChild(this.control);
  // container element
  var div = this.emptyDiv();
  div.style.borderBottom = "1px solid #d0d0d0";
  div.style.borderLeft   = "1px solid #9d9d9d";
  div.style.borderRight  = "1px solid #afafaf";
  div.style.borderTop    = "1px solid #707070";
  div.appendChild(inner);
  parentElem.appendChild(div);
  return div;
}
fan.fwt.TextPeer.prototype.sync = function(self)
{
  var text = this.control;
  // sync control
  text.value = this.m_text;
  text.readOnly = !self.m_editable;
  text.disabled = !this.m_enabled;
  var fade = !self.m_editable || !this.m_enabled;
  text.style.background = fade ? "#e4e4e4" : "#fff";
  text.style.border     = fade ? "1px solid #d7d7d7" : "1px solid #f5f5f5";
  text.style.borderBottom = "none";
  // sync input control size
  if (self.m_multiLine)
  {
    text.style.width  = (this.m_size.m_w - 8) + "px";
    text.style.height = (this.m_size.m_h - 8) + "px";
  }
  else
  {
    text.style.width  = (this.m_size.m_w - 8) + "px";
    text.style.height = (this.m_size.m_h - 7) + "px";
  }
  // sync widget size
  var w = this.m_size.m_w - 2;
  var h = this.m_size.m_h - 2;
  fan.fwt.WidgetPeer.prototype.sync.call(this, self, w, h);
}
fan.fwt.TextChange = fan.sys.Obj.$extend(fan.sys.Obj);
fan.fwt.TextChange.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.fwt.TextChange.prototype.$typeof = function() { return fan.fwt.TextChange.$type; }
fan.fwt.TextChange.prototype.startOffset = function()
{
  return this.m_startOffset;
}
fan.fwt.TextChange.prototype.startOffset$ = function(it)
{
  this.m_startOffset = it;
  return;
}
fan.fwt.TextChange.prototype.startLine = function()
{
  return this.m_startLine;
}
fan.fwt.TextChange.prototype.startLine$ = function(it)
{
  this.m_startLine = it;
  return;
}
fan.fwt.TextChange.prototype.oldText = function()
{
  return this.m_oldText;
}
fan.fwt.TextChange.prototype.oldText$ = function(it)
{
  this.m_oldText = it;
  return;
}
fan.fwt.TextChange.prototype.newText = function()
{
  return this.m_newText;
}
fan.fwt.TextChange.prototype.newText$ = function(it)
{
  this.m_newText = it;
  return;
}
fan.fwt.TextChange.prototype.oldNumNewlines = function()
{
  if (this.m_oldNumNewlines == null)
  {
    this.m_oldNumNewlines = (function($this) { var $_u56 = $this.m_oldText; if ($_u56 == null) return null; return fan.sys.Str.numNewlines($_u56); })(this);
  }
  ;
  return this.m_oldNumNewlines;
}
fan.fwt.TextChange.prototype.oldNumNewlines$ = function(it)
{
  this.m_oldNumNewlines = it;
  return;
}
fan.fwt.TextChange.prototype.newNumNewlines = function()
{
  if (this.m_newNumNewlines == null)
  {
    this.m_newNumNewlines = (function($this) { var $_u57 = $this.m_newText; if ($_u57 == null) return null; return fan.sys.Str.numNewlines($_u57); })(this);
  }
  ;
  return this.m_newNumNewlines;
}
fan.fwt.TextChange.prototype.newNumNewlines$ = function(it)
{
  this.m_newNumNewlines = it;
  return;
}
fan.fwt.TextChange.prototype.repaintStart = function()
{
  return this.m_repaintStart;
}
fan.fwt.TextChange.prototype.repaintStart$ = function(it)
{
  this.m_repaintStart = it;
  return;
}
fan.fwt.TextChange.prototype.repaintLen = function()
{
  return this.m_repaintLen;
}
fan.fwt.TextChange.prototype.repaintLen$ = function(it)
{
  this.m_repaintLen = it;
  return;
}
fan.fwt.TextChange.prototype.toStr = function()
{
  var o = (function($this) { if (fan.sys.ObjUtil.compareLT(fan.sys.Str.size($this.m_oldText),10)) return $this.m_oldText; return fan.sys.Str.plus(fan.sys.Str.getRange($this.m_oldText,fan.sys.Range.make(0,10,true)),"..<"); })(this);
  var n = (function($this) { if (fan.sys.ObjUtil.compareLT(fan.sys.Str.size($this.m_newText),10)) return $this.m_newText; return fan.sys.Str.plus(fan.sys.Str.getRange($this.m_newText,fan.sys.Range.make(0,10,true)),"..<"); })(this);
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("startOffset=",fan.sys.ObjUtil.coerce(this.m_startOffset,fan.sys.Obj.$type.toNullable()))," startLine="),fan.sys.ObjUtil.coerce(this.m_startLine,fan.sys.Obj.$type.toNullable()))," "),fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("newText=",fan.sys.Str.toCode(n))," oldText="),fan.sys.Str.toCode(o))," ")),fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("oldNumNewlines=",fan.sys.ObjUtil.coerce(this.oldNumNewlines(),fan.sys.Obj.$type.toNullable()))," newNumNewlines="),fan.sys.ObjUtil.coerce(this.newNumNewlines(),fan.sys.Obj.$type.toNullable())));
}
fan.fwt.TextChange.prototype.undo = function(widget)
{
  widget.modify(this.m_startOffset,fan.sys.Str.size(this.m_newText),fan.sys.ObjUtil.coerce(this.m_oldText,fan.sys.Str.$type));
  widget.select(fan.sys.Int.plus(this.m_startOffset,fan.sys.Str.size(this.m_oldText)),0);
  return;
}
fan.fwt.TextChange.prototype.redo = function(widget)
{
  widget.modify(this.m_startOffset,fan.sys.Str.size(this.m_oldText),fan.sys.ObjUtil.coerce(this.m_newText,fan.sys.Str.$type));
  widget.select(fan.sys.Int.plus(this.m_startOffset,fan.sys.Str.size(this.m_newText)),0);
  return;
}
fan.fwt.TextChange.make = function()
{
  var self = new fan.fwt.TextChange();
  fan.fwt.TextChange.make$(self);
  return self;
}
fan.fwt.TextChange.make$ = function(self)
{
  return;
}
fan.fwt.TextChange.prototype.m_startOffset = 0;
fan.fwt.TextChange.prototype.m_startLine = 0;
fan.fwt.TextChange.prototype.m_oldText = null;
fan.fwt.TextChange.prototype.m_newText = null;
fan.fwt.TextChange.prototype.m_oldNumNewlines = null;
fan.fwt.TextChange.prototype.m_newNumNewlines = null;
fan.fwt.TextChange.prototype.m_repaintStart = null;
fan.fwt.TextChange.prototype.m_repaintLen = null;
fan.fwt.$pod = fan.sys.Pod.$add('fwt');
with (fan.fwt.$pod)
{
  fan.fwt.Widget.$type = $at('Widget','sys::Obj',[],8193);
  fan.fwt.Pane.$type = $at('Pane','fwt::Widget',[],8193);
  fan.fwt.BorderPane.$type = $at('BorderPane','fwt::Pane',[],8192);
  fan.fwt.Button.$type = $at('Button','fwt::Widget',[],8192);
  fan.fwt.Canvas.$type = $at('Canvas','fwt::Widget',[],8192);
  fan.fwt.Combo.$type = $at('Combo','fwt::Widget',[],8192);
  fan.fwt.Command.$type = $at('Command','sys::Obj',[],8192);
  fan.fwt.ContentPane.$type = $at('ContentPane','fwt::Pane',[],8192);
  fan.fwt.ConstraintPane.$type = $at('ConstraintPane','fwt::ContentPane',[],8192);
  fan.fwt.Desktop.$type = $at('Desktop','sys::Obj',[],8192);
  fan.fwt.Window.$type = $at('Window','fwt::ContentPane',[],8192);
  fan.fwt.Dialog.$type = $at('Dialog','fwt::Window',[],8192);
  fan.fwt.DialogCommand.$type = $at('DialogCommand','fwt::Command',[],128);
  fan.fwt.DialogCommandId.$type = $at('DialogCommandId','sys::Enum',[],170);
  fan.fwt.EdgePane.$type = $at('EdgePane','fwt::Pane',[],8192);
  fan.fwt.CommandMode.$type = $at('CommandMode','sys::Enum',[],8234);
  fan.fwt.ButtonMode.$type = $at('ButtonMode','sys::Enum',[],8234);
  fan.fwt.MenuItemMode.$type = $at('MenuItemMode','sys::Enum',[],8234);
  fan.fwt.WindowMode.$type = $at('WindowMode','sys::Enum',[],8234);
  fan.fwt.FileDialogMode.$type = $at('FileDialogMode','sys::Enum',[],8234);
  fan.fwt.SortMode.$type = $at('SortMode','sys::Enum',[],8234);
  fan.fwt.Event.$type = $at('Event','sys::Obj',[],8192);
  fan.fwt.EventId.$type = $at('EventId','sys::Enum',[],8234);
  fan.fwt.EventListeners.$type = $at('EventListeners','sys::Obj',[],8192);
  fan.fwt.FwtEnv.$type = $at('FwtEnv','gfx::GfxEnv',[],130);
  fan.fwt.GridPane.$type = $at('GridPane','fwt::Pane',[],8192);
  fan.fwt.GridPaneSizes.$type = $at('GridPaneSizes','sys::Obj',[],128);
  fan.fwt.InsetPane.$type = $at('InsetPane','fwt::ContentPane',[],8192);
  fan.fwt.Key.$type = $at('Key','sys::Obj',[],8194);
  fan.fwt.Label.$type = $at('Label','fwt::Widget',[],8192);
  fan.fwt.MenuItem.$type = $at('MenuItem','fwt::Widget',[],8192);
  fan.fwt.Menu.$type = $at('Menu','fwt::MenuItem',[],8192);
  fan.fwt.TextWidget.$type = $at('TextWidget','fwt::Widget',[],8193);
  fan.fwt.RichText.$type = $at('RichText','fwt::TextWidget',[],8192);
  fan.fwt.RichTextModel.$type = $at('RichTextModel','sys::Obj',[],8193);
  fan.fwt.RichTextStyle.$type = $at('RichTextStyle','sys::Obj',[],8194);
  fan.fwt.RichTextUnderline.$type = $at('RichTextUnderline','sys::Enum',[],8234);
  fan.fwt.SashPane.$type = $at('SashPane','fwt::Widget',[],8192);
  fan.fwt.ScrollBar.$type = $at('ScrollBar','fwt::Widget',[],8192);
  fan.fwt.ScrollPane.$type = $at('ScrollPane','fwt::ContentPane',[],8192);
  fan.fwt.Table.$type = $at('Table','fwt::Widget',[],8192);
  fan.fwt.TableModel.$type = $at('TableModel','sys::Obj',[],8192);
  fan.fwt.TableView.$type = $at('TableView','fwt::TableModel',[],128);
  fan.fwt.TabPane.$type = $at('TabPane','fwt::Widget',[],8192);
  fan.fwt.Tab.$type = $at('Tab','fwt::Widget',[],8192);
  fan.fwt.Text.$type = $at('Text','fwt::TextWidget',[],8192);
  fan.fwt.TextChange.$type = $at('TextChange','sys::Obj',[],8192);
  fan.fwt.Widget.$type.$af('enabled',8704,'sys::Bool').$af('visible',8704,'sys::Bool').$af('layout',73728,'sys::Obj?').$af('onKeyDown',73728,'fwt::EventListeners').$af('onKeyUp',73728,'fwt::EventListeners').$af('onMouseDown',73728,'fwt::EventListeners').$af('onMouseUp',73728,'fwt::EventListeners').$af('onMouseEnter',73728,'fwt::EventListeners').$af('onMouseExit',73728,'fwt::EventListeners').$af('onMouseHover',73728,'fwt::EventListeners').$af('onMouseMove',73728,'fwt::EventListeners').$af('onMouseWheel',73728,'fwt::EventListeners').$af('onFocus',73728,'fwt::EventListeners').$af('onBlur',73728,'fwt::EventListeners').$af('pos',8704,'gfx::Point').$af('size',8704,'gfx::Size').$af('bounds',8192,'gfx::Rect').$af('parent',73728,'fwt::Widget?').$af('kids',65664,'fwt::Widget[]').$am('make',132,fan.sys.List.make(fan.sys.Param.$type,[])).$am('checkKeyListeners',640,fan.sys.List.make(fan.sys.Param.$type,[])).$am('checkFocusListeners',640,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hasFocus',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('focus',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('posOnDisplay',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('setParent',128,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('p','fwt::Widget',false)])).$am('window',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('each',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|fwt::Widget,sys::Int->sys::Void|',false)])).$am('children',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('add',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('child','fwt::Widget?',false)])).$am('remove',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('child','fwt::Widget?',false)])).$am('removeAll',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('relayout',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('pack',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('prefSize',270848,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('hints','gfx::Hints',true)])).$am('repaint',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dirty','gfx::Rect?',true)])).$am('attached',640,fan.sys.List.make(fan.sys.Param.$type,[])).$am('attach',2560,fan.sys.List.make(fan.sys.Param.$type,[])).$am('detach',2560,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.Pane.$type.$am('prefSize',271361,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('hints','gfx::Hints',true)])).$am('onLayout',270337,fan.sys.List.make(fan.sys.Param.$type,[])).$am('dummyPane',2560,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.BorderPane.$type.$af('border',73728,'gfx::Border').$af('bg',73728,'gfx::Brush?').$af('insets',73728,'gfx::Insets').$af('content',73728,'fwt::Widget?').$am('add',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('child','fwt::Widget?',false)])).$am('prefSize',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('hints','gfx::Hints',true)])).$am('onLayout',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('onPaint',128,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('g','gfx::Graphics',false)])).$am('dummyBorderPane',2560,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.Button.$type.$af('onAction',73728,'fwt::EventListeners').$af('mode',73730,'fwt::ButtonMode').$af('selected',8704,'sys::Bool').$af('text',8704,'sys::Str').$af('image',8704,'gfx::Image?').$af('font',8704,'gfx::Font?').$af('insets',73730,'gfx::Insets').$af('defInsets',100354,'gfx::Insets').$af('command',73728,'fwt::Command?').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',true)])).$am('makeCommand',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','fwt::Command',false),new fan.sys.Param('f','|sys::This->sys::Void|?',true)])).$am('prefSize',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('hints','gfx::Hints',true)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.Canvas.$type.$am('onPaint',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('g','gfx::Graphics',false)])).$am('dummyCanvas',2560,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.Combo.$type.$af('onAction',73728,'fwt::EventListeners').$af('onModify',73728,'fwt::EventListeners').$af('dropDown',73730,'sys::Bool').$af('editable',73730,'sys::Bool').$af('text',8704,'sys::Str').$af('items',8704,'sys::Obj[]').$af('font',8704,'gfx::Font?').$af('selectedIndex',8704,'sys::Int?').$af('selected',8192,'sys::Obj?').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',true)])).$am('index',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::Obj',false)]));
  fan.fwt.Command.$type.$af('name',73728,'sys::Str').$af('icon',73728,'gfx::Image?').$af('accelerator',73728,'fwt::Key?').$af('onInvoke',73728,'fwt::EventListeners').$af('mode',73728,'fwt::CommandMode').$af('selected',73728,'sys::Bool').$af('assocDialog',65664,'fwt::Dialog?').$af('enabled',73728,'sys::Bool').$af('registry',67584,'fwt::Widget[]').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',true),new fan.sys.Param('icon','gfx::Image?',true),new fan.sys.Param('onInvoke','|fwt::Event->sys::Void|?',true)])).$am('makeLocale',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pod','sys::Pod',false),new fan.sys.Param('keyBase','sys::Str',false),new fan.sys.Param('onInvoke','|fwt::Event->sys::Void|?',true)])).$am('window',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('widgets',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('register',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('w','fwt::Widget',false)])).$am('unregister',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('w','fwt::Widget',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('invoke',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','fwt::Event?',false)])).$am('invoked',266240,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','fwt::Event?',false)])).$am('onInvokeErr',266240,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','fwt::Event?',false),new fan.sys.Param('err','sys::Err',false)])).$am('undoable',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('redo',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('undo',270336,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.ContentPane.$type.$af('content',73728,'fwt::Widget?').$am('add',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('child','fwt::Widget?',false)])).$am('prefSize',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('hints','gfx::Hints',true)])).$am('onLayout',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.ConstraintPane.$type.$af('minw',73728,'sys::Int?').$af('minh',73728,'sys::Int?').$af('maxw',73728,'sys::Int?').$af('maxh',73728,'sys::Int?').$am('prefSize',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('hints','gfx::Hints',true)])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.Desktop.$type.$am('platform',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isWindows',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isMac',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('bounds',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('focus',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('callAsync',41474,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|->sys::Void|',false)])).$am('disposeColor',41474,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','gfx::Color',false)])).$am('disposeFont',41474,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','gfx::Font',false)])).$am('disposeImage',41474,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('i','gfx::Image',false)])).$am('sysFont',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sysFontSmall',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sysFontView',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sysFontMonospace',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sysDarkShadow',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sysNormShadow',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sysLightShadow',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sysHighlightShadow',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sysFg',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sysBg',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sysBorder',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sysListFg',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sysListBg',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sysListSelFg',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sysListSelBg',41474,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.Window.$type.$af('onClose',73728,'fwt::EventListeners').$af('onActive',73728,'fwt::EventListeners').$af('onInactive',73728,'fwt::EventListeners').$af('onIconified',73728,'fwt::EventListeners').$af('onDeiconified',73728,'fwt::EventListeners').$af('mode',73730,'fwt::WindowMode').$af('alwaysOnTop',73730,'sys::Bool').$af('resizable',73730,'sys::Bool').$af('showTrim',73730,'sys::Bool').$af('menuBar',73728,'fwt::Menu?').$af('icon',8704,'gfx::Image?').$af('title',8704,'sys::Str').$af('onDrop',65664,'|sys::Obj->sys::Void|?').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('parent','fwt::Window?',true),new fan.sys.Param('f','|sys::This->sys::Void|?',true)])).$am('open',270848,fan.sys.List.make(fan.sys.Param.$type,[])).$am('close',270848,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('result','sys::Obj?',true)])).$am('activate',8704,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.Dialog.$type.$af('image',73728,'gfx::Image?').$af('body',73728,'sys::Obj?').$af('details',73728,'sys::Obj?').$af('commands',73728,'fwt::Command[]?').$am('ok',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('cancel',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('yes',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('no',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('okCancel',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('yesNo',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('openInfo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('parent','fwt::Window?',false),new fan.sys.Param('msg','sys::Str',false),new fan.sys.Param('details','sys::Obj?',true),new fan.sys.Param('commands','fwt::Command[]',true)])).$am('openWarn',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('parent','fwt::Window?',false),new fan.sys.Param('msg','sys::Str',false),new fan.sys.Param('details','sys::Obj?',true),new fan.sys.Param('commands','fwt::Command[]',true)])).$am('openErr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('parent','fwt::Window?',false),new fan.sys.Param('msg','sys::Str',false),new fan.sys.Param('details','sys::Obj?',true),new fan.sys.Param('commands','fwt::Command[]',true)])).$am('openQuestion',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('parent','fwt::Window?',false),new fan.sys.Param('msg','sys::Str',false),new fan.sys.Param('details','sys::Obj?',true),new fan.sys.Param('commands','fwt::Command[]',true)])).$am('openMsgBox',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pod','sys::Pod',false),new fan.sys.Param('keyBase','sys::Str',false),new fan.sys.Param('parent','fwt::Window?',false),new fan.sys.Param('body','sys::Obj',false),new fan.sys.Param('details','sys::Obj?',true),new fan.sys.Param('commands','fwt::Command[]',true)])).$am('openPromptStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('parent','fwt::Window?',false),new fan.sys.Param('msg','sys::Str',false),new fan.sys.Param('def','sys::Str',true),new fan.sys.Param('prefCols','sys::Int',true)])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('parent','fwt::Window?',false)])).$am('open',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('buildContent',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('dummyDialog',2560,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.DialogCommand.$type.$af('id',73730,'fwt::DialogCommandId').$af('arg',73728,'sys::Obj?').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('id','fwt::DialogCommandId',false),new fan.sys.Param('arg','sys::Obj?',true)])).$am('invoked',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('e','fwt::Event?',false)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('toggleDetails',128,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.DialogCommandId.$type.$af('ok',106506,'fwt::DialogCommandId').$af('cancel',106506,'fwt::DialogCommandId').$af('yes',106506,'fwt::DialogCommandId').$af('no',106506,'fwt::DialogCommandId').$af('details',106506,'fwt::DialogCommandId').$af('vals',106498,'fwt::DialogCommandId[]').$am('make',133124,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.EdgePane.$type.$af('top',73728,'fwt::Widget?').$af('bottom',73728,'fwt::Widget?').$af('left',73728,'fwt::Widget?').$af('right',73728,'fwt::Widget?').$af('center',73728,'fwt::Widget?').$am('prefSize',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('hints','gfx::Hints',true)])).$am('pref',2048,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('w','fwt::Widget?',false)])).$am('onLayout',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.CommandMode.$type.$af('push',106506,'fwt::CommandMode').$af('toggle',106506,'fwt::CommandMode').$af('vals',106498,'fwt::CommandMode[]').$am('toButtonMode',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toMenuItemMode',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',133124,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.ButtonMode.$type.$af('check',106506,'fwt::ButtonMode').$af('push',106506,'fwt::ButtonMode').$af('radio',106506,'fwt::ButtonMode').$af('toggle',106506,'fwt::ButtonMode').$af('sep',106506,'fwt::ButtonMode').$af('vals',106498,'fwt::ButtonMode[]').$am('make',133124,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.MenuItemMode.$type.$af('check',106506,'fwt::MenuItemMode').$af('push',106506,'fwt::MenuItemMode').$af('radio',106506,'fwt::MenuItemMode').$af('sep',106506,'fwt::MenuItemMode').$af('menu',106506,'fwt::MenuItemMode').$af('vals',106498,'fwt::MenuItemMode[]').$am('make',133124,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.WindowMode.$type.$af('modeless',106506,'fwt::WindowMode').$af('windowModal',106506,'fwt::WindowMode').$af('appModal',106506,'fwt::WindowMode').$af('sysModal',106506,'fwt::WindowMode').$af('vals',106498,'fwt::WindowMode[]').$am('make',133124,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.FileDialogMode.$type.$af('openFile',106506,'fwt::FileDialogMode').$af('openFiles',106506,'fwt::FileDialogMode').$af('saveFile',106506,'fwt::FileDialogMode').$af('openDir',106506,'fwt::FileDialogMode').$af('vals',106498,'fwt::FileDialogMode[]').$am('make',133124,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.SortMode.$type.$af('up',106506,'fwt::SortMode').$af('down',106506,'fwt::SortMode').$af('vals',106498,'fwt::SortMode[]').$am('toggle',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',133124,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.Event.$type.$af('id',73728,'fwt::EventId').$af('widget',73728,'fwt::Widget?').$af('index',73728,'sys::Int?').$af('offset',73728,'sys::Int?').$af('size',73728,'sys::Int?').$af('button',73728,'sys::Int?').$af('keyChar',73728,'sys::Int?').$af('key',73728,'fwt::Key?').$af('pos',73728,'gfx::Point?').$af('count',73728,'sys::Int?').$af('data',73728,'sys::Obj?').$af('popup',73728,'fwt::Menu?').$af('consumed',73728,'sys::Bool').$am('window',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('consume',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.EventId.$type.$af('unknown',106506,'fwt::EventId').$af('focus',106506,'fwt::EventId').$af('blur',106506,'fwt::EventId').$af('keyDown',106506,'fwt::EventId').$af('keyUp',106506,'fwt::EventId').$af('mouseDown',106506,'fwt::EventId').$af('mouseUp',106506,'fwt::EventId').$af('mouseEnter',106506,'fwt::EventId').$af('mouseExit',106506,'fwt::EventId').$af('mouseHover',106506,'fwt::EventId').$af('mouseMove',106506,'fwt::EventId').$af('mouseWheel',106506,'fwt::EventId').$af('action',106506,'fwt::EventId').$af('modified',106506,'fwt::EventId').$af('verify',106506,'fwt::EventId').$af('verifyKey',106506,'fwt::EventId').$af('select',106506,'fwt::EventId').$af('caret',106506,'fwt::EventId').$af('hyperlink',106506,'fwt::EventId').$af('popup',106506,'fwt::EventId').$af('open',106506,'fwt::EventId').$af('close',106506,'fwt::EventId').$af('active',106506,'fwt::EventId').$af('inactive',106506,'fwt::EventId').$af('iconified',106506,'fwt::EventId').$af('deiconified',106506,'fwt::EventId').$af('vals',106498,'fwt::EventId[]').$am('make',133124,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.EventListeners.$type.$af('listeners',67584,'|fwt::Event->sys::Void|[]').$af('onModify',65664,'|fwt::EventListeners->sys::Void|?').$am('list',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isEmpty',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('size',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('add',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cb','|fwt::Event->sys::Void|',false)])).$am('remove',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cb','|fwt::Event->sys::Void|',false)])).$am('fire',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','fwt::Event?',false)])).$am('modified',128,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.FwtEnv.$type.$am('imageSize',271872,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('i','gfx::Image',false)])).$am('imageResize',271872,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('i','gfx::Image',false),new fan.sys.Param('s','gfx::Size',false)])).$am('fontHeight',271872,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','gfx::Font',false)])).$am('fontAscent',271872,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','gfx::Font',false)])).$am('fontDescent',271872,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','gfx::Font',false)])).$am('fontLeading',271872,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','gfx::Font',false)])).$am('fontWidth',271872,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','gfx::Font',false),new fan.sys.Param('s','sys::Str',false)])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.GridPane.$type.$af('numCols',73728,'sys::Int').$af('hgap',73728,'sys::Int').$af('vgap',73728,'sys::Int').$af('halignCells',73728,'gfx::Halign').$af('valignCells',73728,'gfx::Valign').$af('halignPane',73728,'gfx::Halign').$af('valignPane',73728,'gfx::Valign').$af('expandRow',73728,'sys::Int?').$af('expandCol',73728,'sys::Int?').$af('uniformCols',73728,'sys::Bool').$af('uniformRows',73728,'sys::Bool').$am('prefSize',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('hints','gfx::Hints',true)])).$am('onLayout',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.GridPaneSizes.$type.$af('colw',73728,'sys::Int[]').$af('rowh',73728,'sys::Int[]').$af('prefs',73728,'gfx::Size[]').$af('prefPane',73728,'gfx::Size').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('grid','fwt::GridPane',false),new fan.sys.Param('kids','fwt::Widget[]',false)])).$am('numRows',8192,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.InsetPane.$type.$af('insets',73728,'gfx::Insets').$af('defInsets',100354,'gfx::Insets').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('top','sys::Int',true),new fan.sys.Param('right','sys::Int?',true),new fan.sys.Param('bottom','sys::Int?',true),new fan.sys.Param('left','sys::Int?',true)])).$am('prefSize',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('hints','gfx::Hints',true)])).$am('onLayout',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.Key.$type.$af('a',106498,'fwt::Key').$af('b',106498,'fwt::Key').$af('c',106498,'fwt::Key').$af('d',106498,'fwt::Key').$af('e',106498,'fwt::Key').$af('f',106498,'fwt::Key').$af('g',106498,'fwt::Key').$af('h',106498,'fwt::Key').$af('i',106498,'fwt::Key').$af('j',106498,'fwt::Key').$af('k',106498,'fwt::Key').$af('l',106498,'fwt::Key').$af('m',106498,'fwt::Key').$af('n',106498,'fwt::Key').$af('o',106498,'fwt::Key').$af('p',106498,'fwt::Key').$af('q',106498,'fwt::Key').$af('r',106498,'fwt::Key').$af('s',106498,'fwt::Key').$af('t',106498,'fwt::Key').$af('u',106498,'fwt::Key').$af('v',106498,'fwt::Key').$af('w',106498,'fwt::Key').$af('x',106498,'fwt::Key').$af('y',106498,'fwt::Key').$af('z',106498,'fwt::Key').$af('num0',106498,'fwt::Key').$af('num1',106498,'fwt::Key').$af('num2',106498,'fwt::Key').$af('num3',106498,'fwt::Key').$af('num4',106498,'fwt::Key').$af('num5',106498,'fwt::Key').$af('num6',106498,'fwt::Key').$af('num7',106498,'fwt::Key').$af('num8',106498,'fwt::Key').$af('num9',106498,'fwt::Key').$af('space',106498,'fwt::Key').$af('backspace',106498,'fwt::Key').$af('enter',106498,'fwt::Key').$af('$delete',106498,'fwt::Key').$af('esc',106498,'fwt::Key').$af('tab',106498,'fwt::Key').$af('up',106498,'fwt::Key').$af('down',106498,'fwt::Key').$af('left',106498,'fwt::Key').$af('right',106498,'fwt::Key').$af('pageUp',106498,'fwt::Key').$af('pageDown',106498,'fwt::Key').$af('home',106498,'fwt::Key').$af('end',106498,'fwt::Key').$af('insert',106498,'fwt::Key').$af('f1',106498,'fwt::Key').$af('f2',106498,'fwt::Key').$af('f3',106498,'fwt::Key').$af('f4',106498,'fwt::Key').$af('f5',106498,'fwt::Key').$af('f6',106498,'fwt::Key').$af('f7',106498,'fwt::Key').$af('f8',106498,'fwt::Key').$af('f9',106498,'fwt::Key').$af('f10',106498,'fwt::Key').$af('f11',106498,'fwt::Key').$af('f12',106498,'fwt::Key').$af('keypadMult',106498,'fwt::Key').$af('keypadPlus',106498,'fwt::Key').$af('keypadMinus',106498,'fwt::Key').$af('keypadDot',106498,'fwt::Key').$af('keypadDiv',106498,'fwt::Key').$af('keypad0',106498,'fwt::Key').$af('keypad1',106498,'fwt::Key').$af('keypad2',106498,'fwt::Key').$af('keypad3',106498,'fwt::Key').$af('keypad4',106498,'fwt::Key').$af('keypad5',106498,'fwt::Key').$af('keypad6',106498,'fwt::Key').$af('keypad7',106498,'fwt::Key').$af('keypad8',106498,'fwt::Key').$af('keypad9',106498,'fwt::Key').$af('keypadEqual',106498,'fwt::Key').$af('keypadEnter',106498,'fwt::Key').$af('capsLock',106498,'fwt::Key').$af('numLock',106498,'fwt::Key').$af('scrollLock',106498,'fwt::Key').$af('pause',106498,'fwt::Key').$af('printScreen',106498,'fwt::Key').$af('alt',106498,'fwt::Key').$af('shift',106498,'fwt::Key').$af('ctrl',106498,'fwt::Key').$af('command',106498,'fwt::Key').$af('modifierMask',100354,'sys::Int').$af('modifierUnmask',100354,'sys::Int').$af('none',100354,'fwt::Key').$af('byMask',100354,'[sys::Int:fwt::Key]').$af('byStr',100354,'[sys::Str:fwt::Key]').$af('mask',65666,'sys::Int').$af('str',65666,'sys::Str?').$am('predefine',2052,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('mask','sys::Int',false),new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('mod','sys::Bool',true)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('fromMask',32898,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('mask','sys::Int',false)])).$am('makeNew',2052,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('mask','sys::Int',false),new fan.sys.Param('str','sys::Str?',false)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('list',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('primary',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('modifiers',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isModifier',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hasModifier',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isDown',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('modifier','fwt::Key',false)])).$am('isShift',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isAlt',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isCtrl',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isCommand',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('plus',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','fwt::Key',false)])).$am('replace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('modFrom','fwt::Key',false),new fan.sys.Param('modTo','fwt::Key',false)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.Label.$type.$af('text',8704,'sys::Str').$af('image',8704,'gfx::Image?').$af('fg',8704,'gfx::Color?').$af('bg',8704,'gfx::Color?').$af('font',8704,'gfx::Font?').$af('halign',8704,'gfx::Halign').$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.MenuItem.$type.$af('onAction',73728,'fwt::EventListeners').$af('mode',73730,'fwt::MenuItemMode').$af('selected',8704,'sys::Bool').$af('text',8704,'sys::Str').$af('accelerator',8704,'fwt::Key?').$af('image',8704,'gfx::Image?').$af('command',73728,'fwt::Command?').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',true)])).$am('makeCommand',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','fwt::Command',false)]));
  fan.fwt.Menu.$type.$af('onOpen',73728,'fwt::EventListeners').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[])).$am('open',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('parent','fwt::Widget',false),new fan.sys.Param('pos','gfx::Point',false)])).$am('addCommand',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','fwt::Command',false)])).$am('addSep',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('add',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('kid','fwt::Widget?',false)]));
  fan.fwt.TextWidget.$type.$af('border',73730,'sys::Bool').$af('multiLine',73730,'sys::Bool').$af('editable',73730,'sys::Bool').$af('wrap',73730,'sys::Bool').$af('hscroll',73730,'sys::Bool').$af('vscroll',73730,'sys::Bool').$af('text',270337,'sys::Str').$af('caretOffset',270848,'sys::Int').$af('font',270848,'gfx::Font?').$af('prefCols',73728,'sys::Int').$af('prefRows',73728,'sys::Int').$am('selectText',270848,fan.sys.List.make(fan.sys.Param.$type,[])).$am('selectStart',270848,fan.sys.List.make(fan.sys.Param.$type,[])).$am('selectSize',270848,fan.sys.List.make(fan.sys.Param.$type,[])).$am('select',270848,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('startOffset','sys::Int',false),new fan.sys.Param('size','sys::Int',false)])).$am('selectAll',270848,fan.sys.List.make(fan.sys.Param.$type,[])).$am('selectClear',270848,fan.sys.List.make(fan.sys.Param.$type,[])).$am('prefSize',271872,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('hints','gfx::Hints',true)])).$am('modify',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('start','sys::Int',false),new fan.sys.Param('replaceLen','sys::Int',false),new fan.sys.Param('newText','sys::Str',false)])).$am('cut',270848,fan.sys.List.make(fan.sys.Param.$type,[])).$am('copy',270848,fan.sys.List.make(fan.sys.Param.$type,[])).$am('paste',270848,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.RichText.$type.$af('onModify',73728,'fwt::EventListeners').$af('onVerify',73728,'fwt::EventListeners').$af('onVerifyKey',73728,'fwt::EventListeners').$af('onSelect',73728,'fwt::EventListeners').$af('onCaret',73728,'fwt::EventListeners').$af('hbar',73728,'fwt::ScrollBar').$af('vbar',73728,'fwt::ScrollBar').$af('model',73728,'fwt::RichTextModel?').$af('onModelModifyFunc',67584,'|fwt::Event->sys::Void|').$af('tabSpacing',8704,'sys::Int').$af('topLine',270848,'sys::Int').$af('text',271360,'sys::Str').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',true)])).$am('onModelModify',640,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('event','fwt::Event',false)])).$am('offsetAtPos',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Int',false),new fan.sys.Param('y','sys::Int',false)])).$am('modify',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('start','sys::Int',false),new fan.sys.Param('replaceLen','sys::Int',false),new fan.sys.Param('newText','sys::Str',false)])).$am('repaintLine',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('lineIndex','sys::Int',false)])).$am('repaintRange',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('offset','sys::Int',false),new fan.sys.Param('len','sys::Int',false)])).$am('showLine',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('lineIndex','sys::Int',false)]));
  fan.fwt.RichTextModel.$type.$af('onModify',73728,'fwt::EventListeners').$af('text',270337,'sys::Str').$am('charCount',270337,fan.sys.List.make(fan.sys.Param.$type,[])).$am('lineCount',270337,fan.sys.List.make(fan.sys.Param.$type,[])).$am('line',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('lineIndex','sys::Int',false)])).$am('lineAtOffset',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('offset','sys::Int',false)])).$am('offsetAtLine',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('lineIndex','sys::Int',false)])).$am('lineDelimiter',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('textRange',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('start','sys::Int',false),new fan.sys.Param('len','sys::Int',false)])).$am('modify',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('start','sys::Int',false),new fan.sys.Param('replaceLen','sys::Int',false),new fan.sys.Param('newText','sys::Str',false)])).$am('lineStyling',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('lineIndex','sys::Int',false)])).$am('lineBackground',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('lineIndex','sys::Int',false)])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.RichTextStyle.$type.$af('fg',73730,'gfx::Color?').$af('bg',73730,'gfx::Color?').$af('font',73730,'gfx::Font?').$af('underlineColor',73730,'gfx::Color?').$af('underline',73730,'fwt::RichTextUnderline').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',true)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.RichTextUnderline.$type.$af('none',106506,'fwt::RichTextUnderline').$af('single',106506,'fwt::RichTextUnderline').$af('squiggle',106506,'fwt::RichTextUnderline').$af('vals',106498,'fwt::RichTextUnderline[]').$am('make',133124,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.SashPane.$type.$af('orientation',73730,'gfx::Orientation').$af('weights',8704,'sys::Int[]?').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',true)]));
  fan.fwt.ScrollBar.$type.$af('onModify',73728,'fwt::EventListeners').$af('val',8704,'sys::Int').$af('min',8704,'sys::Int').$af('max',8704,'sys::Int').$af('thumb',8704,'sys::Int').$af('page',8704,'sys::Int').$am('make',132,fan.sys.List.make(fan.sys.Param.$type,[])).$am('checkModifyListeners',640,fan.sys.List.make(fan.sys.Param.$type,[])).$am('orientation',8704,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.ScrollPane.$type.$af('hbar',73728,'fwt::ScrollBar').$af('vbar',73728,'fwt::ScrollBar').$af('border',73730,'sys::Bool').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',true)])).$am('onLayout',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('setMinSize',2560,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','gfx::Size',false)]));
  fan.fwt.Table.$type.$af('onAction',73728,'fwt::EventListeners').$af('onSelect',73728,'fwt::EventListeners').$af('onPopup',73728,'fwt::EventListeners').$af('hbar',73728,'fwt::ScrollBar').$af('vbar',73728,'fwt::ScrollBar').$af('border',73730,'sys::Bool').$af('multi',73730,'sys::Bool').$af('model',73728,'fwt::TableModel').$af('headerVisible',8704,'sys::Bool').$af('selected',8704,'sys::Int[]').$af('view',65664,'fwt::TableView').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',true)])).$am('refreshAll',8704,fan.sys.List.make(fan.sys.Param.$type,[])).$am('rowAt',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pos','gfx::Point',false)])).$am('colAt',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pos','gfx::Point',false)])).$am('isColVisible',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false)])).$am('setColVisible',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false),new fan.sys.Param('visible','sys::Bool',false)])).$am('sortCol',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sortMode',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sort',8704,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int?',false),new fan.sys.Param('mode','fwt::SortMode',true)]));
  fan.fwt.TableModel.$type.$am('numRows',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('numCols',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('header',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false)])).$am('halign',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false)])).$am('prefWidth',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false)])).$am('text',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false),new fan.sys.Param('row','sys::Int',false)])).$am('image',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false),new fan.sys.Param('row','sys::Int',false)])).$am('font',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false),new fan.sys.Param('row','sys::Int',false)])).$am('fg',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false),new fan.sys.Param('row','sys::Int',false)])).$am('bg',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false),new fan.sys.Param('row','sys::Int',false)])).$am('sortCompare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false),new fan.sys.Param('row1','sys::Int',false),new fan.sys.Param('row2','sys::Int',false)])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.TableView.$type.$af('table',67584,'fwt::Table').$af('rows',67584,'sys::Int[]').$af('cols',67584,'sys::Int[]').$af('vis',67584,'sys::Bool[]').$af('sortCol',73728,'sys::Int?').$af('sortMode',73728,'fwt::SortMode').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('table','fwt::Table',false)])).$am('numRows',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('numCols',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('header',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false)])).$am('halign',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false)])).$am('prefWidth',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false)])).$am('text',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false),new fan.sys.Param('row','sys::Int',false)])).$am('image',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false),new fan.sys.Param('row','sys::Int',false)])).$am('font',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false),new fan.sys.Param('row','sys::Int',false)])).$am('fg',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false),new fan.sys.Param('row','sys::Int',false)])).$am('bg',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false),new fan.sys.Param('row','sys::Int',false)])).$am('isColVisible',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false)])).$am('setColVisible',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int',false),new fan.sys.Param('visible','sys::Bool',false)])).$am('sort',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('col','sys::Int?',false),new fan.sys.Param('mode','fwt::SortMode',true)])).$am('sync',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('syncRows',2048,fan.sys.List.make(fan.sys.Param.$type,[])).$am('syncCols',2048,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.TabPane.$type.$af('onSelect',73728,'fwt::EventListeners').$af('selectedIndex',8704,'sys::Int?').$af('selected',8192,'fwt::Tab?').$am('tabs',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('index',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tab','fwt::Tab',false)])).$am('add',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('kid','fwt::Widget?',false)])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.Tab.$type.$af('text',8704,'sys::Str').$af('image',8704,'gfx::Image?').$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.fwt.Text.$type.$af('onAction',73728,'fwt::EventListeners').$af('onModify',73728,'fwt::EventListeners').$af('password',73730,'sys::Bool').$af('text',271872,'sys::Str').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',true)])).$am('modify',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('start','sys::Int',false),new fan.sys.Param('replaceLen','sys::Int',false),new fan.sys.Param('newText','sys::Str',false)]));
  fan.fwt.TextChange.$type.$af('startOffset',73728,'sys::Int').$af('startLine',73728,'sys::Int').$af('oldText',73728,'sys::Str?').$af('newText',73728,'sys::Str?').$af('oldNumNewlines',73728,'sys::Int?').$af('newNumNewlines',73728,'sys::Int?').$af('repaintStart',73728,'sys::Int?').$af('repaintLen',73728,'sys::Int?').$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('undo',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('widget','fwt::TextWidget',false)])).$am('redo',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('widget','fwt::TextWidget',false)])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
}
fan.fwt.Button.static$init();
fan.fwt.DialogCommandId.static$init();
fan.fwt.CommandMode.static$init();
fan.fwt.ButtonMode.static$init();
fan.fwt.MenuItemMode.static$init();
fan.fwt.WindowMode.static$init();
fan.fwt.FileDialogMode.static$init();
fan.fwt.SortMode.static$init();
fan.fwt.EventId.static$init();
fan.fwt.InsetPane.static$init();
fan.fwt.Key.static$init();
fan.fwt.RichTextUnderline.static$init();
function JfxGraphics(script)
{
  this.script = script;
  this.brush  = fan.gfx.Color.black;
  this.pen    = fan.gfx.Pen.defVal;
}
JfxGraphics.prototype.m_brush = null
JfxGraphics.prototype.brush   = function() { return this.m_brush }
JfxGraphics.prototype.brush$  = function(b)
{
  this.m_brush = b;
  if (b instanceof fan.gfx.Color)
  {
    this.script.setColor(b.toCss());
  }
  // gradient
}
JfxGraphics.prototype.m_pen = null
JfxGraphics.prototype.pen   = function() { return this.m_pen }
JfxGraphics.prototype.pen$  = function(p)
{
  this.m_pen = p;
  this.script.setPen(p.width.valueOf());
  // lineCap
  // lineJoin
  // dashes
}
JfxGraphics.prototype.m_font = null
JfxGraphics.prototype.font   = function() { return this.m_font }
JfxGraphics.prototype.font$  = function(f)
{
  // TODO
}
JfxGraphics.prototype.m_antialias = null
JfxGraphics.prototype.antialias   = function() { return this.m_antialias }
JfxGraphics.prototype.antialias$  = function(aa)
{
  // TODO
}
JfxGraphics.prototype.m_alpha = null
JfxGraphics.prototype.alpha   = function() { return this.m_alpha}
JfxGraphics.prototype.alpha$  = function(a)
{
  // TODO
}
JfxGraphics.prototype.drawLine = function(x1, y1, x2, y2)
{
  this.script.drawLine(x1.valueOf(), y1.valueOf(), x2.valueOf(), y2.valueOf());
  return this;
}
JfxGraphics.prototype.drawRect = function(x, y, w, h)
{
  return this;
}
JfxGraphics.prototype.fillRect = function(x, y, w, h)
{
  return this;
}
JfxGraphics.prototype.oval = function(x, y, w, h)
{
}
JfxGraphics.prototype.drawOval = function(x, y, w, h)
{
  return this;
}
JfxGraphics.prototype.fillOval = function(x, y, w, h)
{
  return this;
}
JfxGraphics.prototype.drawArc = function(x, y, w, h, startAngle, arcAngle)
{
  // TODO
  return this;
}
JfxGraphics.prototype.fillArc = function(x, y, w, h, startAngle, arcAngle)
{
  // TODO
  return this;
}
JfxGraphics.prototype.drawText = function (s, x, y)
{
  return this;
}
JfxGraphics.prototype.drawImage = function (fanImg, x, y)
{
 // var jsImg = fan.fwt.FwtEnvPeer.loadImage(fanImg);
 // this.cx.drawImage(jsImg, x, y)
  return this;
}
JfxGraphics.prototype.copyImage = function (fanImg, src, dst)
{
  return this;
}
JfxGraphics.prototype.translate = function (x, y)
{
  this.script.translate(x.valueOf(), y.valueOf());
  return this;
}
JfxGraphics.prototype.clip = function (rect)
{
  return this
}
JfxGraphics.prototype.push = function ()
{
}
JfxGraphics.prototype.pop = function ()
{
}
JfxGraphics.prototype.dispose = function ()
{
  // no-op
}
JfxGraphics.prototype.stack = new Array();
fan.fwt.Graphics = fan.sys.Obj.$extend(fan.sys.Obj);
fan.fwt.Graphics.prototype.$ctor = function() {}
fan.fwt.Graphics.prototype.size = null;
fan.fwt.Graphics.prototype.cx = null;
fan.fwt.Graphics.prototype.m_brush = null
fan.fwt.Graphics.prototype.brush   = function() { return this.m_brush }
fan.fwt.Graphics.prototype.brush$  = function(b)
{
  this.m_brush = b;
  if (b instanceof fan.gfx.Color)
  {
    var style = b.toCss();
    this.cx.fillStyle = style;
    this.cx.strokeStyle = style;
  }
  else if (b instanceof fan.gfx.Gradient)
  {
    var x1 = b.m_x1;
    var y1 = b.m_y1;
    var x2 = b.m_x2;
    var y2 = b.m_y2;
    // handle percent
    if (b.m_x1Unit.m_symbol == "%") x1 = this.size.m_w * (x1 / 100);
    if (b.m_y1Unit.m_symbol == "%") y1 = this.size.m_h * (y1 / 100);
    if (b.m_x2Unit.m_symbol == "%") x2 = this.size.m_w * (x2 / 100);
    if (b.m_y2Unit.m_symbol == "%") y2 = this.size.m_h * (y2 / 100);
    // add stops
    var style = this.cx.createLinearGradient(x1, y1, x2, y2);
    var stops = b.m_stops;
    for (var i=0; i<stops.size(); i++)
    {
      var s = stops.get(i);
      style.addColorStop(s.m_pos, s.m_color.toCss());
    }
    this.cx.fillStyle = style;
    this.cx.strokeStyle = style;
  }
  else if (b instanceof fan.gfx.Pattern)
  {
    var jsImg = fan.fwt.FwtEnvPeer.loadImage(b.m_image);
    var style = (jsImg.width > 0 && jsImg.height > 0)
      ? this.cx.createPattern(jsImg, 'repeat')
      : "rgba(0,0,0,0)";
    this.cx.fillStyle = style;
    this.cx.strokeStyle = style;
  }
  else
  {
    fan.sys.Obj.echo("ERROR: unknown brush type: " + b);
  }
}
fan.fwt.Graphics.prototype.m_pen = null
fan.fwt.Graphics.prototype.pen   = function() { return this.m_pen }
fan.fwt.Graphics.prototype.pen$  = function(p)
{
  this.m_pen = p;
  this.cx.lineWidth = p.m_width;
  this.cx.lineCap   = p.capToStr();
  this.cx.lineJoin  = p.joinToStr();
  // dashes not supported
}
fan.fwt.Graphics.prototype.m_font = null
fan.fwt.Graphics.prototype.font   = function() { return this.m_font }
fan.fwt.Graphics.prototype.font$  = function(f)
{
  this.m_font = f;
  this.cx.font = fan.fwt.WidgetPeer.fontToCss(f);
}
fan.fwt.Graphics.prototype.m_antialias = null
fan.fwt.Graphics.prototype.antialias   = function() { return this.m_antialias }
fan.fwt.Graphics.prototype.antialias$  = function(aa)
{
  // Note: canvas has no control over anti-aliasing (Jun 09)
  this.m_antialias = aa;
}
fan.fwt.Graphics.prototype.m_alpha = null
fan.fwt.Graphics.prototype.alpha   = function() { return this.m_alpha}
fan.fwt.Graphics.prototype.alpha$  = function(a)
{
  this.m_alpha = a;
  this.cx.globalAlpha = a / 255;
}
fan.fwt.Graphics.prototype.drawLine = function(x1, y1, x2, y2)
{
  this.cx.beginPath();
  this.cx.moveTo(x1+0.5, y1+0.5);
  this.cx.lineTo(x2+0.5, y2+0.5);
  this.cx.closePath();
  this.cx.stroke();
  return this;
}
fan.fwt.Graphics.prototype.drawPolyline = function(p)
{
  this.cx.beginPath();
  for (var i=0; i<p.size(); i++)
  {
    var pt = p.get(i);
    if (i == 0) this.cx.moveTo(pt.m_x+0.5, pt.m_y+0.5);
    else this.cx.lineTo(pt.m_x+0.5, pt.m_y+0.5);
  }
  this.cx.stroke();
  return this;
}
fan.fwt.Graphics.prototype.drawPolygon = function(p)
{
  this.cx.beginPath();
  for (var i=0; i<p.size(); i++)
  {
    var pt = p.get(i);
    if (i == 0) this.cx.moveTo(pt.m_x+0.5, pt.m_y+0.5);
    else this.cx.lineTo(pt.m_x+0.5, pt.m_y+0.5);
  }
  this.cx.closePath();
  this.cx.stroke();
  return this;
}
fan.fwt.Graphics.prototype.fillPolygon = function(p)
{
  this.cx.beginPath();
  for (var i=0; i<p.size(); i++)
  {
    var pt = p.get(i);
    if (i == 0) this.cx.moveTo(pt.m_x, pt.m_y);
    else this.cx.lineTo(pt.m_x, pt.m_y);
  }
  this.cx.closePath();
  this.cx.fill();
  return this;
}
fan.fwt.Graphics.prototype.drawRect = function(x, y, w, h)
{
  this.cx.strokeRect(x+0.5, y+0.5, w, h);
  return this;
}
fan.fwt.Graphics.prototype.fillRect = function(x, y, w, h)
{
  this.cx.fillRect(x, y, w, h);
  return this;
}
fan.fwt.Graphics.prototype.oval = function(x, y, w, h)
{
  // Public Domain by Christopher Clay - http://canvaspaint.org/blog/
  var kappa = 4 * ((Math.sqrt(2) -1) / 3);
  var rx = w/2;
  var ry = h/2;
  var cx = x+rx+0.5;
  var cy = y+ry+0.5;
  this.cx.beginPath();
  this.cx.moveTo(cx, cy - ry);
  this.cx.bezierCurveTo(cx + (kappa * rx), cy - ry,  cx + rx, cy - (kappa * ry), cx + rx, cy);
  this.cx.bezierCurveTo(cx + rx, cy + (kappa * ry), cx + (kappa * rx), cy + ry, cx, cy + ry);
  this.cx.bezierCurveTo(cx - (kappa * rx), cy + ry, cx - rx, cy + (kappa * ry), cx - rx, cy);
  this.cx.bezierCurveTo(cx - rx, cy - (kappa * ry), cx - (kappa * rx), cy - ry, cx, cy - ry);
  this.cx.closePath();
}
fan.fwt.Graphics.prototype.drawOval = function(x, y, w, h)
{
  this.oval(x, y, w, h)
  this.cx.stroke();
  return this;
}
fan.fwt.Graphics.prototype.fillOval = function(x, y, w, h)
{
  this.oval(x, y, w, h)
  this.cx.fill();
  return this;
}
fan.fwt.Graphics.prototype.drawArc = function(x, y, w, h, startAngle, arcAngle)
{
  // TODO
  return this;
}
fan.fwt.Graphics.prototype.fillArc = function(x, y, w, h, startAngle, arcAngle)
{
  // TODO
  return this;
}
fan.fwt.Graphics.prototype.drawText = function (s, x, y)
{
  this.cx.fillText(s, x, y)
  return this;
}
fan.fwt.Graphics.prototype.drawImage = function (fanImg, x, y)
{
  var jsImg = fan.fwt.FwtEnvPeer.loadImage(fanImg);
  if (jsImg.width > 0 && jsImg.height > 0)
    this.cx.drawImage(jsImg, x, y)
  return this;
}
fan.fwt.Graphics.prototype.copyImage = function (fanImg, src, dst)
{
  var jsImg = fan.fwt.FwtEnvPeer.loadImage(fanImg);
  if (jsImg.width > 0 && jsImg.height > 0)
    this.cx.drawImage(jsImg, src.m_x, src.m_y, src.m_w, src.m_h, dst.m_x, dst.m_y, dst.m_w, dst.m_h)
  return this;
}
fan.fwt.Graphics.prototype.translate = function (x, y)
{
  this.cx.translate(x, y)
  return this;
}
fan.fwt.Graphics.prototype.clip = function (rect)
{
  this.cx.beginPath();
  this.cx.moveTo(rect.m_x, rect.m_y);
  this.cx.lineTo(rect.m_x+rect.m_w, rect.m_y);
  this.cx.lineTo(rect.m_x+rect.m_w, rect.m_y+rect.m_h);
  this.cx.lineTo(rect.m_x, rect.m_y+rect.m_h);
  this.cx.closePath();
  this.cx.clip();
  return this
}
fan.fwt.Graphics.prototype.push = function ()
{
  this.cx.save();
  var state = new Object();
  state.brush     = this.m_brush;
  state.pen       = this.m_pen;
  state.font      = this.m_font;
  state.antialias = this.m_antialias;
  state.alpha     = this.m_alpha;
  this.stack.push(state);
}
fan.fwt.Graphics.prototype.pop = function ()
{
  this.cx.restore();
  var state = this.stack.pop();
  this.m_brush     = state.brush;
  this.m_pen       = state.pen;
  this.m_font      = state.font;
  this.m_antialias = state.antialias;
  this.m_alpha     = state.alpha;
}
fan.fwt.Graphics.prototype.dispose = function ()
{
  // no-op
}
fan.fwt.Graphics.prototype.stack = new Array();
fan.concurrent.Actor.locals().set("gfx.env", fan.fwt.FwtEnv.make());
with (fan.sys.Env.cur().$props("fwt:locale/en.props"))
{
  set("question.name","Question");
  set("info.image","fan://icons/x32/question.png");
  set("ok.name","OK");
  set("info.name","Info");
  set("details.name","Details");
  set("cancel.name","Cancel");
  set("warn.image","fan://icons/x32/warn.png");
  set("question.image","fan://icons/x32/question.png");
  set("warn.name","Warning");
  set("err.image","fan://icons/x32/err.png");
  set("no.name","No");
  set("yes.name","Yes");
  set("err.name","Error");
}
