fan.gfx = {};
fan.gfx.Border = fan.sys.Obj.$extend(fan.sys.Obj);
fan.gfx.Border.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_widthTop = 1;
  this.m_widthRight = 1;
  this.m_widthBottom = 1;
  this.m_widthLeft = 1;
  this.m_styleTop = fan.gfx.Border.m_styleSolid;
  this.m_styleRight = fan.gfx.Border.m_styleSolid;
  this.m_styleBottom = fan.gfx.Border.m_styleSolid;
  this.m_styleLeft = fan.gfx.Border.m_styleSolid;
  this.m_colorTop = fan.gfx.Border.m_black;
  this.m_colorRight = fan.gfx.Border.m_black;
  this.m_colorBottom = fan.gfx.Border.m_black;
  this.m_colorLeft = fan.gfx.Border.m_black;
  this.m_radiusTopLeft = 0;
  this.m_radiusTopRight = 0;
  this.m_radiusBottomRight = 0;
  this.m_radiusBottomLeft = 0;
  return;
}
fan.gfx.Border.prototype.$typeof = function() { return fan.gfx.Border.$type; }
fan.gfx.Border.make = function(f)
{
  var self = new fan.gfx.Border();
  fan.gfx.Border.make$(self,f);
  return self;
}
fan.gfx.Border.make$ = function(self,f)
{
  ;
  f.call(self);
  self.m_toStr = self.formatStr();
  return;
}
fan.gfx.Border.fromStr = function(str,checked)
{
  if (checked === undefined) checked = true;
  try
  {
    if (fan.sys.Str.isEmpty(str))
    {
      return fan.gfx.Border.m_defVal;
    }
    ;
    return fan.gfx.Border.makeStr(str);
  }
  catch ($_u9)
  {
  }
  ;
  if (checked)
  {
    throw fan.sys.ParseErr.make(fan.sys.Str.plus("Invalid Border: ",str));
  }
  ;
  return null;
}
fan.gfx.Border.makeStr = function(str)
{
  var self = new fan.gfx.Border();
  fan.gfx.Border.makeStr$(self,str);
  return self;
}
fan.gfx.Border.makeStr$ = function(self,str)
{
  var $this = self;
  ;
  var p = fan.gfx.BorderParser.make(str);
  p.parseGroup(fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("s","sys::Str",false)]),
    fan.sys.Obj.$type.toNullable(),
    function(s)
    {
      return fan.sys.ObjUtil.coerce(fan.sys.Int.fromStr(s,10,false),fan.sys.Obj.$type.toNullable());
    }));
  self.m_widthTop = fan.sys.ObjUtil.coerce(p.m_top,fan.sys.Int.$type);
  self.m_widthRight = fan.sys.ObjUtil.coerce(p.m_right,fan.sys.Int.$type);
  self.m_widthBottom = fan.sys.ObjUtil.coerce(p.m_bottom,fan.sys.Int.$type);
  self.m_widthLeft = fan.sys.ObjUtil.coerce(p.m_left,fan.sys.Int.$type);
  p.parseGroup(fan.sys.ObjUtil.coerce(fan.gfx.Border.m_styleSolid,fan.sys.Obj.$type),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("s","sys::Str",false)]),
    fan.sys.Obj.$type.toNullable(),
    function(s)
    {
      return fan.sys.ObjUtil.coerce(fan.gfx.Border.styleFromStr(s,false),fan.sys.Obj.$type.toNullable());
    }));
  self.m_styleTop = fan.sys.ObjUtil.coerce(p.m_top,fan.sys.Int.$type);
  self.m_styleRight = fan.sys.ObjUtil.coerce(p.m_right,fan.sys.Int.$type);
  self.m_styleBottom = fan.sys.ObjUtil.coerce(p.m_bottom,fan.sys.Int.$type);
  self.m_styleLeft = fan.sys.ObjUtil.coerce(p.m_left,fan.sys.Int.$type);
  p.parseGroup(fan.gfx.Border.m_black,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("s","sys::Str",false)]),
    fan.sys.Obj.$type.toNullable(),
    function(s)
    {
      return fan.gfx.Color.fromStr(s,false);
    }));
  self.m_colorTop = fan.sys.ObjUtil.coerce(p.m_top,fan.gfx.Color.$type);
  self.m_colorRight = fan.sys.ObjUtil.coerce(p.m_right,fan.gfx.Color.$type);
  self.m_colorBottom = fan.sys.ObjUtil.coerce(p.m_bottom,fan.gfx.Color.$type);
  self.m_colorLeft = fan.sys.ObjUtil.coerce(p.m_left,fan.gfx.Color.$type);
  p.parseGroup(fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("s","sys::Str",false)]),
    fan.sys.Obj.$type.toNullable(),
    function(s)
    {
      return fan.sys.ObjUtil.coerce(fan.sys.Int.fromStr(s,10,false),fan.sys.Obj.$type.toNullable());
    }));
  self.m_radiusTopLeft = fan.sys.ObjUtil.coerce(p.m_top,fan.sys.Int.$type);
  self.m_radiusTopRight = fan.sys.ObjUtil.coerce(p.m_right,fan.sys.Int.$type);
  self.m_radiusBottomRight = fan.sys.ObjUtil.coerce(p.m_bottom,fan.sys.Int.$type);
  self.m_radiusBottomLeft = fan.sys.ObjUtil.coerce(p.m_left,fan.sys.Int.$type);
  if (p.m_tok != null)
  {
    throw fan.sys.Err.make();
  }
  ;
  self.m_toStr = self.formatStr();
  return;
}
fan.gfx.Border.prototype.hash = function()
{
  return fan.sys.Str.hash(this.m_toStr);
}
fan.gfx.Border.prototype.equals = function(obj)
{
  var that = fan.sys.ObjUtil.as(obj,fan.gfx.Border.$type);
  if (that == null)
  {
    return false;
  }
  ;
  return fan.sys.ObjUtil.equals(this.m_toStr,that.m_toStr);
}
fan.gfx.Border.styleToStr = function(s)
{
  var $_u10 = s;
  if (fan.sys.ObjUtil.equals($_u10,fan.gfx.Border.m_styleSolid))
  {
    return "solid";
  }
  else if (fan.sys.ObjUtil.equals($_u10,fan.gfx.Border.m_styleInset))
  {
    return "inset";
  }
  else if (fan.sys.ObjUtil.equals($_u10,fan.gfx.Border.m_styleOutset))
  {
    return "outset";
  }
  else
  {
    throw fan.sys.ArgErr.make();
  }
  ;
}
fan.gfx.Border.styleFromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  var $_u11 = s;
  if (fan.sys.ObjUtil.equals($_u11,"solid"))
  {
    return fan.sys.ObjUtil.coerce(fan.gfx.Border.m_styleSolid,fan.sys.Int.$type.toNullable());
  }
  else if (fan.sys.ObjUtil.equals($_u11,"inset"))
  {
    return fan.sys.ObjUtil.coerce(fan.gfx.Border.m_styleInset,fan.sys.Int.$type.toNullable());
  }
  else if (fan.sys.ObjUtil.equals($_u11,"outset"))
  {
    return fan.sys.ObjUtil.coerce(fan.gfx.Border.m_styleOutset,fan.sys.Int.$type.toNullable());
  }
  else
  {
    if (checked)
    {
      throw fan.sys.ParseErr.make(s);
    }
    ;
    return null;
  }
  ;
}
fan.gfx.Border.prototype.toStr = function()
{
  return this.m_toStr;
}
fan.gfx.Border.prototype.formatStr = function()
{
  var $this = this;
  var s = fan.sys.StrBuf.make();
  this.formatPart(s,fan.sys.ObjUtil.coerce(this.m_widthTop,fan.sys.Obj.$type),fan.sys.ObjUtil.coerce(this.m_widthRight,fan.sys.Obj.$type),fan.sys.ObjUtil.coerce(this.m_widthBottom,fan.sys.Obj.$type),fan.sys.ObjUtil.coerce(this.m_widthLeft,fan.sys.Obj.$type),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Obj",false)]),
    fan.sys.Str.$type,
    function(it)
    {
      return fan.sys.ObjUtil.toStr(it);
    }));
  this.formatPart(s,fan.sys.ObjUtil.coerce(this.m_styleTop,fan.sys.Obj.$type),fan.sys.ObjUtil.coerce(this.m_styleRight,fan.sys.Obj.$type),fan.sys.ObjUtil.coerce(this.m_styleBottom,fan.sys.Obj.$type),fan.sys.ObjUtil.coerce(this.m_styleLeft,fan.sys.Obj.$type),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Obj",false)]),
    fan.sys.Str.$type,
    function(it)
    {
      return fan.gfx.Border.styleToStr(fan.sys.ObjUtil.coerce(it,fan.sys.Int.$type));
    }));
  this.formatPart(s,this.m_colorTop,this.m_colorRight,this.m_colorBottom,this.m_colorLeft,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Obj",false)]),
    fan.sys.Str.$type,
    function(it)
    {
      return fan.sys.ObjUtil.toStr(it);
    }));
  this.formatPart(s,fan.sys.ObjUtil.coerce(this.m_radiusTopLeft,fan.sys.Obj.$type),fan.sys.ObjUtil.coerce(this.m_radiusTopRight,fan.sys.Obj.$type),fan.sys.ObjUtil.coerce(this.m_radiusBottomRight,fan.sys.Obj.$type),fan.sys.ObjUtil.coerce(this.m_radiusBottomLeft,fan.sys.Obj.$type),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Obj",false)]),
    fan.sys.Str.$type,
    function(it)
    {
      return fan.sys.ObjUtil.toStr(it);
    }));
  return s.toStr();
}
fan.gfx.Border.prototype.formatPart = function(s,t,r,b,l,f)
{
  if (!s.isEmpty())
  {
    s.addChar(32);
  }
  ;
  if (fan.sys.ObjUtil.equals(l,r))
  {
    if (fan.sys.ObjUtil.equals(t,b))
    {
      if (fan.sys.ObjUtil.equals(t,l))
      {
        return s.add(f.call(t));
      }
      ;
      return s.add(f.call(t)).addChar(44).add(f.call(l));
    }
    ;
    return s.add(f.call(t)).addChar(44).add(f.call(r)).addChar(44).add(f.call(b));
  }
  ;
  return s.add(f.call(t)).addChar(44).add(f.call(r)).addChar(44).add(f.call(b)).addChar(44).add(f.call(l));
}
fan.gfx.Border.prototype.toSize = function()
{
  return fan.gfx.Size.make(fan.sys.Int.plus(this.m_widthRight,this.m_widthLeft),fan.sys.Int.plus(this.m_widthTop,this.m_widthBottom));
}
fan.gfx.Border.static$init = function()
{
  var $this = this;
  fan.gfx.Border.m_styleSolid = 0;
  fan.gfx.Border.m_styleInset = 1;
  fan.gfx.Border.m_styleOutset = 2;
  fan.gfx.Border.m_black = fan.gfx.Color.make(0);
  fan.gfx.Border.m_defVal = fan.gfx.Border.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Border",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      return;
    }));
  return;
}
fan.gfx.Border.prototype.m_widthTop = 0;
fan.gfx.Border.prototype.m_widthRight = 0;
fan.gfx.Border.prototype.m_widthBottom = 0;
fan.gfx.Border.prototype.m_widthLeft = 0;
fan.gfx.Border.prototype.m_styleTop = 0;
fan.gfx.Border.prototype.m_styleRight = 0;
fan.gfx.Border.prototype.m_styleBottom = 0;
fan.gfx.Border.prototype.m_styleLeft = 0;
fan.gfx.Border.m_styleSolid = 0;
fan.gfx.Border.m_styleInset = 0;
fan.gfx.Border.m_styleOutset = 0;
fan.gfx.Border.prototype.m_colorTop = null;
fan.gfx.Border.prototype.m_colorRight = null;
fan.gfx.Border.prototype.m_colorBottom = null;
fan.gfx.Border.prototype.m_colorLeft = null;
fan.gfx.Border.prototype.m_radiusTopLeft = 0;
fan.gfx.Border.prototype.m_radiusTopRight = 0;
fan.gfx.Border.prototype.m_radiusBottomRight = 0;
fan.gfx.Border.prototype.m_radiusBottomLeft = 0;
fan.gfx.Border.m_black = null;
fan.gfx.Border.m_defVal = null;
fan.gfx.Border.prototype.m_toStr = null;
fan.gfx.BorderParser = fan.sys.Obj.$extend(fan.sys.Obj);
fan.gfx.BorderParser.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_tok = "?";
  return;
}
fan.gfx.BorderParser.prototype.$typeof = function() { return fan.gfx.BorderParser.$type; }
fan.gfx.BorderParser.make = function(str)
{
  var self = new fan.gfx.BorderParser();
  fan.gfx.BorderParser.make$(self,str);
  return self;
}
fan.gfx.BorderParser.make$ = function(self,str)
{
  ;
  self.m_str = str;
  self.next();
  return;
}
fan.gfx.BorderParser.prototype.parseGroup = function(def,f)
{
  this.m_top = (function($this) { if ($this.m_tok != null) return f.call(fan.sys.ObjUtil.coerce($this.m_tok,fan.sys.Str.$type)); return null; })(this);
  if (this.m_top == null)
  {
    this.m_top = this.m_right = this.m_bottom = this.m_left = def;
    return;
  }
  ;
  this.m_right = (function($this) { if ($this.m_comma) return $this.parse(f); return $this.m_top; })(this);
  this.m_bottom = (function($this) { if ($this.m_comma) return $this.parse(f); return $this.m_top; })(this);
  this.m_left = (function($this) { if ($this.m_comma) return $this.parse(f); return $this.m_right; })(this);
  if (this.m_comma)
  {
    throw fan.sys.Err.make();
  }
  ;
  this.next();
  return;
}
fan.gfx.BorderParser.prototype.parse = function(f)
{
  this.next();
  var val = f.call(fan.sys.ObjUtil.coerce(this.m_tok,fan.sys.Str.$type));
  if (val == null)
  {
    throw fan.sys.Err.make();
  }
  ;
  return fan.sys.ObjUtil.coerce(val,fan.sys.Obj.$type);
}
fan.gfx.BorderParser.prototype.next = function()
{
  var size = fan.sys.Str.size(this.m_str);
  if (fan.sys.ObjUtil.compareGE(this.m_n,size))
  {
    this.m_tok = null;
    this.m_comma = false;
    return;
  }
  ;
  while ((fan.sys.ObjUtil.compareLT(this.m_n,size) && fan.sys.ObjUtil.equals(fan.sys.Str.get(this.m_str,this.m_n),32)))
  {
    this.m_n = fan.sys.Int.increment(this.m_n);
  }
  ;
  var s = this.m_n;
  for (; fan.sys.ObjUtil.compareLT(this.m_n,size); this.m_n = fan.sys.Int.increment(this.m_n))
  {
    if ((fan.sys.ObjUtil.equals(fan.sys.Str.get(this.m_str,this.m_n),32) || fan.sys.ObjUtil.equals(fan.sys.Str.get(this.m_str,this.m_n),44)))
    {
      break;
    }
    ;
  }
  ;
  this.m_tok = fan.sys.Str.getRange(this.m_str,fan.sys.Range.make(s,this.m_n,true));
  while ((fan.sys.ObjUtil.compareLT(this.m_n,size) && fan.sys.ObjUtil.equals(fan.sys.Str.get(this.m_str,this.m_n),32)))
  {
    this.m_n = fan.sys.Int.increment(this.m_n);
  }
  ;
  this.m_comma = (fan.sys.ObjUtil.compareLT(this.m_n,size) && fan.sys.ObjUtil.equals(fan.sys.Str.get(this.m_str,this.m_n),44));
  if (this.m_comma)
  {
    this.m_n = fan.sys.Int.increment(this.m_n);
  }
  ;
  return;
}
fan.gfx.BorderParser.prototype.str = function()
{
  return this.m_str;
}
fan.gfx.BorderParser.prototype.str$ = function(it)
{
  this.m_str = it;
  return;
}
fan.gfx.BorderParser.prototype.n = function()
{
  return this.m_n;
}
fan.gfx.BorderParser.prototype.n$ = function(it)
{
  this.m_n = it;
  return;
}
fan.gfx.BorderParser.prototype.tok = function()
{
  return this.m_tok;
}
fan.gfx.BorderParser.prototype.tok$ = function(it)
{
  this.m_tok = it;
  return;
}
fan.gfx.BorderParser.prototype.comma = function()
{
  return this.m_comma;
}
fan.gfx.BorderParser.prototype.comma$ = function(it)
{
  this.m_comma = it;
  return;
}
fan.gfx.BorderParser.prototype.top = function()
{
  return this.m_top;
}
fan.gfx.BorderParser.prototype.top$ = function(it)
{
  this.m_top = it;
  return;
}
fan.gfx.BorderParser.prototype.right = function()
{
  return this.m_right;
}
fan.gfx.BorderParser.prototype.right$ = function(it)
{
  this.m_right = it;
  return;
}
fan.gfx.BorderParser.prototype.bottom = function()
{
  return this.m_bottom;
}
fan.gfx.BorderParser.prototype.bottom$ = function(it)
{
  this.m_bottom = it;
  return;
}
fan.gfx.BorderParser.prototype.left = function()
{
  return this.m_left;
}
fan.gfx.BorderParser.prototype.left$ = function(it)
{
  this.m_left = it;
  return;
}
fan.gfx.BorderParser.prototype.m_str = null;
fan.gfx.BorderParser.prototype.m_n = 0;
fan.gfx.BorderParser.prototype.m_tok = null;
fan.gfx.BorderParser.prototype.m_comma = false;
fan.gfx.BorderParser.prototype.m_top = null;
fan.gfx.BorderParser.prototype.m_right = null;
fan.gfx.BorderParser.prototype.m_bottom = null;
fan.gfx.BorderParser.prototype.m_left = null;
fan.gfx.Brush = function() {}
fan.gfx.Brush.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.Brush.prototype.$typeof = function() { return fan.gfx.Brush.$type; }
fan.gfx.Pattern = fan.sys.Obj.$extend(fan.sys.Obj);
fan.gfx.Pattern.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_valign = fan.gfx.Valign.m_repeat;
  this.m_halign = fan.gfx.Halign.m_repeat;
  return;
}
fan.gfx.Pattern.prototype.$typeof = function() { return fan.gfx.Pattern.$type; }
fan.gfx.Pattern.make = function(image,f)
{
  var self = new fan.gfx.Pattern();
  fan.gfx.Pattern.make$(self,image,f);
  return self;
}
fan.gfx.Pattern.make$ = function(self,image,f)
{
  if (f === undefined) f = null;
  ;
  self.m_image = image;
  if (f != null)
  {
    f.call(self);
  }
  ;
  if ((self.m_halign === fan.gfx.Halign.m_fill || self.m_valign === fan.gfx.Valign.m_fill))
  {
    throw fan.sys.ArgErr.make();
  }
  ;
  return;
}
fan.gfx.Pattern.prototype.hash = function()
{
  return fan.sys.Int.xor(fan.sys.Int.xor(fan.sys.Int.xor(this.m_image.hash(),(function($this) { if ($this.m_bg == null) return 97; return $this.m_bg.hash(); })(this)),fan.sys.Int.shiftl(fan.sys.ObjUtil.hash(this.m_halign),11)),fan.sys.Int.shiftl(fan.sys.ObjUtil.hash(this.m_valign),7));
}
fan.gfx.Pattern.prototype.equals = function(obj)
{
  var that = fan.sys.ObjUtil.as(obj,fan.gfx.Pattern.$type);
  if (that == null)
  {
    return false;
  }
  ;
  return (fan.sys.ObjUtil.equals(this.m_image,that.m_image) && fan.sys.ObjUtil.equals(this.m_bg,that.m_bg) && fan.sys.ObjUtil.equals(this.m_valign,that.m_valign) && fan.sys.ObjUtil.equals(this.m_halign,that.m_halign));
}
fan.gfx.Pattern.prototype.toStr = function()
{
  var s = fan.sys.StrBuf.make().add(this.m_image);
  if (this.m_bg != null)
  {
    s.add(" bg=").add(this.m_bg);
  }
  ;
  s.add(" valign=").add(this.m_valign).add(" halign=").add(this.m_halign);
  return s.toStr();
}
fan.gfx.Pattern.prototype.m_image = null;
fan.gfx.Pattern.prototype.m_bg = null;
fan.gfx.Pattern.prototype.m_valign = null;
fan.gfx.Pattern.prototype.m_halign = null;
fan.gfx.Color = fan.sys.Obj.$extend(fan.sys.Obj);
fan.gfx.Color.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.Color.prototype.$typeof = function() { return fan.gfx.Color.$type; }
fan.gfx.Color.make = function(argb,hasAlpha)
{
  var self = new fan.gfx.Color();
  fan.gfx.Color.make$(self,argb,hasAlpha);
  return self;
}
fan.gfx.Color.make$ = function(self,argb,hasAlpha)
{
  if (argb === undefined) argb = 0;
  if (hasAlpha === undefined) hasAlpha = false;
  if (!hasAlpha)
  {
    argb = fan.sys.Int.or(argb,4278190080);
  }
  ;
  self.m_argb = argb;
  return;
}
fan.gfx.Color.makeArgb = function(a,r,g,b)
{
  return fan.gfx.Color.make(fan.sys.Int.or(fan.sys.Int.or(fan.sys.Int.or(fan.sys.Int.shiftl(fan.sys.Int.and(a,255),24),fan.sys.Int.shiftl(fan.sys.Int.and(r,255),16)),fan.sys.Int.shiftl(fan.sys.Int.and(g,255),8)),fan.sys.Int.and(b,255)),true);
}
fan.gfx.Color.makeRgb = function(r,g,b)
{
  return fan.gfx.Color.make(fan.sys.Int.or(fan.sys.Int.or(fan.sys.Int.shiftl(fan.sys.Int.and(r,255),16),fan.sys.Int.shiftl(fan.sys.Int.and(g,255),8)),fan.sys.Int.and(b,255)),false);
}
fan.gfx.Color.makeHsv = function(h,s,v)
{
  var r = v;
  var g = v;
  var b = v;
  if (fan.sys.ObjUtil.compareNE(s,fan.sys.Float.make(0.0)))
  {
    if (fan.sys.ObjUtil.equals(h,fan.sys.Float.make(360.0)))
    {
      h = fan.sys.Float.make(0.0);
    }
    ;
    h = fan.sys.Float.div(h,fan.sys.Float.make(60.0));
    var i = fan.sys.Float.floor(h);
    var f = fan.sys.Float.minus(h,i);
    var p = fan.sys.Float.mult(v,fan.sys.Float.minus(fan.sys.Float.make(1.0),s));
    var q = fan.sys.Float.mult(v,fan.sys.Float.minus(fan.sys.Float.make(1.0),fan.sys.Float.mult(s,f)));
    var t = fan.sys.Float.mult(v,fan.sys.Float.minus(fan.sys.Float.make(1.0),fan.sys.Float.mult(s,fan.sys.Float.minus(fan.sys.Float.make(1.0),f))));
    var $_u17 = fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(i,fan.sys.Num.$type));
    if (fan.sys.ObjUtil.equals($_u17,0))
    {
      r = v;
      g = t;
      b = p;
    }
    else if (fan.sys.ObjUtil.equals($_u17,1))
    {
      r = q;
      g = v;
      b = p;
    }
    else if (fan.sys.ObjUtil.equals($_u17,2))
    {
      r = p;
      g = v;
      b = t;
    }
    else if (fan.sys.ObjUtil.equals($_u17,3))
    {
      r = p;
      g = q;
      b = v;
    }
    else if (fan.sys.ObjUtil.equals($_u17,4))
    {
      r = t;
      g = p;
      b = v;
    }
    else if (fan.sys.ObjUtil.equals($_u17,5))
    {
      r = v;
      g = p;
      b = q;
    }
    ;
  }
  ;
  return fan.gfx.Color.make(fan.sys.Int.or(fan.sys.Int.or(fan.sys.Int.shiftl(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Float.mult(r,fan.sys.Float.make(255.0)),fan.sys.Num.$type)),16),fan.sys.Int.shiftl(fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Float.mult(g,fan.sys.Float.make(255.0)),fan.sys.Num.$type)),8)),fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(fan.sys.Float.mult(b,fan.sys.Float.make(255.0)),fan.sys.Num.$type))),false);
}
fan.gfx.Color.fromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  try
  {
    if (!fan.sys.Str.startsWith(s,"#"))
    {
      throw fan.sys.Err.make();
    }
    ;
    var sub = fan.sys.Str.getRange(s,fan.sys.Range.make(1,-1));
    var hex = fan.sys.Str.toInt(sub,16);
    var $_u18 = fan.sys.Str.size(sub);
    if (fan.sys.ObjUtil.equals($_u18,3))
    {
      var r = fan.sys.Int.and(fan.sys.Int.shiftr(fan.sys.ObjUtil.coerce(hex,fan.sys.Int.$type),8),15);
      r = fan.sys.Int.or(fan.sys.Int.shiftl(r,4),r);
      var g = fan.sys.Int.and(fan.sys.Int.shiftr(fan.sys.ObjUtil.coerce(hex,fan.sys.Int.$type),4),15);
      g = fan.sys.Int.or(fan.sys.Int.shiftl(g,4),g);
      var b = fan.sys.Int.and(fan.sys.Int.shiftr(fan.sys.ObjUtil.coerce(hex,fan.sys.Int.$type),0),15);
      b = fan.sys.Int.or(fan.sys.Int.shiftl(b,4),b);
      return fan.gfx.Color.make(fan.sys.Int.or(fan.sys.Int.or(fan.sys.Int.shiftl(r,16),fan.sys.Int.shiftl(g,8)),b));
    }
    else if (fan.sys.ObjUtil.equals($_u18,6))
    {
      return fan.gfx.Color.make(fan.sys.ObjUtil.coerce(hex,fan.sys.Int.$type),false);
    }
    else if (fan.sys.ObjUtil.equals($_u18,8))
    {
      return fan.gfx.Color.make(fan.sys.ObjUtil.coerce(hex,fan.sys.Int.$type),true);
    }
    else
    {
      throw fan.sys.Err.make();
    }
    ;
  }
  catch ($_u19)
  {
  }
  ;
  if (checked)
  {
    throw fan.sys.ParseErr.make(fan.sys.Str.plus("Invalid Color: ",s));
  }
  ;
  return null;
}
fan.gfx.Color.prototype.rgb = function()
{
  return fan.sys.Int.and(this.m_argb,16777215);
}
fan.gfx.Color.prototype.a = function()
{
  return fan.sys.Int.and(fan.sys.Int.shiftr(this.m_argb,24),255);
}
fan.gfx.Color.prototype.r = function()
{
  return fan.sys.Int.and(fan.sys.Int.shiftr(this.m_argb,16),255);
}
fan.gfx.Color.prototype.g = function()
{
  return fan.sys.Int.and(fan.sys.Int.shiftr(this.m_argb,8),255);
}
fan.gfx.Color.prototype.b = function()
{
  return fan.sys.Int.and(this.m_argb,255);
}
fan.gfx.Color.prototype.h = function()
{
  var r = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(this.r(),fan.sys.Num.$type));
  var b = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(this.b(),fan.sys.Num.$type));
  var g = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(this.g(),fan.sys.Num.$type));
  var min = fan.sys.Float.min(r,fan.sys.Float.min(b,g));
  var max = fan.sys.Float.max(r,fan.sys.Float.max(b,g));
  var delta = fan.sys.Float.minus(max,min);
  var s = (function($this) { if (fan.sys.ObjUtil.equals(max,fan.sys.Float.make(0.0))) return fan.sys.Float.make(0.0); return fan.sys.Float.div(delta,max); })(this);
  var h = fan.sys.Float.make(0.0);
  if (fan.sys.ObjUtil.compareNE(s,fan.sys.Float.make(0.0)))
  {
    if (fan.sys.ObjUtil.equals(r,max))
    {
      h = fan.sys.Float.div(fan.sys.Float.minus(g,b),delta);
    }
    else
    {
      if (fan.sys.ObjUtil.equals(g,max))
      {
        h = fan.sys.Float.plus(fan.sys.Float.make(2.0),fan.sys.Float.div(fan.sys.Float.minus(b,r),delta));
      }
      else
      {
        if (fan.sys.ObjUtil.equals(b,max))
        {
          h = fan.sys.Float.plus(fan.sys.Float.make(4.0),fan.sys.Float.div(fan.sys.Float.minus(r,g),delta));
        }
        ;
      }
      ;
    }
    ;
    h = fan.sys.Float.mult(h,fan.sys.Float.make(60.0));
    if (fan.sys.ObjUtil.compareLT(h,fan.sys.Float.make(0.0)))
    {
      h = fan.sys.Float.plus(h,fan.sys.Float.make(360.0));
    }
    ;
  }
  ;
  return h;
}
fan.gfx.Color.prototype.s = function()
{
  var min = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(fan.sys.Int.min(this.r(),fan.sys.Int.min(this.b(),this.g())),fan.sys.Num.$type));
  var max = fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(fan.sys.Int.max(this.r(),fan.sys.Int.max(this.b(),this.g())),fan.sys.Num.$type));
  return (function($this) { if (fan.sys.ObjUtil.equals(max,fan.sys.Float.make(0.0))) return fan.sys.Float.make(0.0); return fan.sys.Float.div(fan.sys.Float.minus(max,min),max); })(this);
}
fan.gfx.Color.prototype.v = function()
{
  return fan.sys.Float.div(fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(fan.sys.Int.max(this.r(),fan.sys.Int.max(this.b(),this.g())),fan.sys.Num.$type)),fan.sys.Float.make(255.0));
}
fan.gfx.Color.prototype.hash = function()
{
  return this.rgb();
}
fan.gfx.Color.prototype.equals = function(that)
{
  var x = fan.sys.ObjUtil.as(that,fan.gfx.Color.$type);
  return (function($this) { if (x == null) return false; return fan.sys.ObjUtil.equals(x.m_argb,$this.m_argb); })(this);
}
fan.gfx.Color.prototype.toStr = function()
{
  if (fan.sys.ObjUtil.equals(this.a(),255))
  {
    return fan.sys.Str.plus("#",fan.sys.Int.toHex(this.rgb(),fan.sys.ObjUtil.coerce(6,fan.sys.Int.$type.toNullable())));
  }
  else
  {
    return fan.sys.Str.plus("#",fan.sys.Int.toHex(this.m_argb,fan.sys.ObjUtil.coerce(8,fan.sys.Int.$type.toNullable())));
  }
  ;
}
fan.gfx.Color.prototype.toCss = function()
{
  if (fan.sys.ObjUtil.equals(this.a(),255))
  {
    return fan.sys.Str.plus("#",fan.sys.Int.toHex(this.rgb(),fan.sys.ObjUtil.coerce(6,fan.sys.Int.$type.toNullable())));
  }
  ;
  var alphaVal = fan.sys.Int.div(fan.sys.Int.mult(this.a(),100),255);
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("rgba(",fan.sys.ObjUtil.coerce(this.r(),fan.sys.Obj.$type.toNullable())),","),fan.sys.ObjUtil.coerce(this.g(),fan.sys.Obj.$type.toNullable())),","),fan.sys.ObjUtil.coerce(this.b(),fan.sys.Obj.$type.toNullable())),",0."),fan.sys.ObjUtil.coerce(alphaVal,fan.sys.Obj.$type.toNullable())),")");
}
fan.gfx.Color.prototype.lighter = function(percentage)
{
  if (percentage === undefined) percentage = fan.sys.Float.make(0.2);
  var v = fan.sys.Float.min(fan.sys.Float.max(fan.sys.Float.plus(this.v(),percentage),fan.sys.Float.make(0.0)),fan.sys.Float.make(1.0));
  return fan.gfx.Color.makeHsv(this.h(),this.s(),v);
}
fan.gfx.Color.prototype.darker = function(percentage)
{
  if (percentage === undefined) percentage = fan.sys.Float.make(0.2);
  return this.lighter(fan.sys.Float.negate(percentage));
}
fan.gfx.Color.static$init = function()
{
  fan.gfx.Color.m_black = fan.gfx.Color.make(0);
  fan.gfx.Color.m_white = fan.gfx.Color.make(16777215);
  fan.gfx.Color.m_red = fan.gfx.Color.make(16711680);
  fan.gfx.Color.m_green = fan.gfx.Color.make(65280);
  fan.gfx.Color.m_blue = fan.gfx.Color.make(255);
  fan.gfx.Color.m_gray = fan.gfx.Color.make(8421504);
  fan.gfx.Color.m_darkGray = fan.gfx.Color.make(11119017);
  fan.gfx.Color.m_yellow = fan.gfx.Color.make(16776960);
  fan.gfx.Color.m_orange = fan.gfx.Color.make(16753920);
  fan.gfx.Color.m_purple = fan.gfx.Color.make(8388736);
  return;
}
fan.gfx.Color.m_black = null;
fan.gfx.Color.m_white = null;
fan.gfx.Color.m_red = null;
fan.gfx.Color.m_green = null;
fan.gfx.Color.m_blue = null;
fan.gfx.Color.m_gray = null;
fan.gfx.Color.m_darkGray = null;
fan.gfx.Color.m_yellow = null;
fan.gfx.Color.m_orange = null;
fan.gfx.Color.m_purple = null;
fan.gfx.Color.prototype.m_argb = 0;
fan.gfx.Halign = fan.sys.Obj.$extend(fan.sys.Enum);
fan.gfx.Halign.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.Halign.prototype.$typeof = function() { return fan.gfx.Halign.$type; }
fan.gfx.Halign.make = function($ordinal,$name)
{
  var self = new fan.gfx.Halign();
  fan.gfx.Halign.make$(self,$ordinal,$name);
  return self;
}
fan.gfx.Halign.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.gfx.Halign.fromStr = function(name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.gfx.Halign.$type,name,checked),fan.gfx.Halign.$type.toNullable());
}
fan.gfx.Halign.static$init = function()
{
  fan.gfx.Halign.m_left = fan.gfx.Halign.make(0,"left");
  fan.gfx.Halign.m_center = fan.gfx.Halign.make(1,"center");
  fan.gfx.Halign.m_right = fan.gfx.Halign.make(2,"right");
  fan.gfx.Halign.m_fill = fan.gfx.Halign.make(3,"fill");
  fan.gfx.Halign.m_repeat = fan.gfx.Halign.make(4,"repeat");
  fan.gfx.Halign.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u23 = fan.sys.List.make(fan.gfx.Halign.$type, [fan.gfx.Halign.m_left,fan.gfx.Halign.m_center,fan.gfx.Halign.m_right,fan.gfx.Halign.m_fill,fan.gfx.Halign.m_repeat]); if ($_u23 == null) return null; return fan.sys.ObjUtil.toImmutable($_u23); })(this),fan.sys.Type.find("gfx::Halign[]"));
  return;
}
fan.gfx.Halign.m_left = null;
fan.gfx.Halign.m_center = null;
fan.gfx.Halign.m_right = null;
fan.gfx.Halign.m_fill = null;
fan.gfx.Halign.m_repeat = null;
fan.gfx.Halign.m_vals = null;
fan.gfx.Valign = fan.sys.Obj.$extend(fan.sys.Enum);
fan.gfx.Valign.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.Valign.prototype.$typeof = function() { return fan.gfx.Valign.$type; }
fan.gfx.Valign.make = function($ordinal,$name)
{
  var self = new fan.gfx.Valign();
  fan.gfx.Valign.make$(self,$ordinal,$name);
  return self;
}
fan.gfx.Valign.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.gfx.Valign.fromStr = function(name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.gfx.Valign.$type,name,checked),fan.gfx.Valign.$type.toNullable());
}
fan.gfx.Valign.static$init = function()
{
  fan.gfx.Valign.m_top = fan.gfx.Valign.make(0,"top");
  fan.gfx.Valign.m_center = fan.gfx.Valign.make(1,"center");
  fan.gfx.Valign.m_bottom = fan.gfx.Valign.make(2,"bottom");
  fan.gfx.Valign.m_fill = fan.gfx.Valign.make(3,"fill");
  fan.gfx.Valign.m_repeat = fan.gfx.Valign.make(4,"repeat");
  fan.gfx.Valign.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u24 = fan.sys.List.make(fan.gfx.Valign.$type, [fan.gfx.Valign.m_top,fan.gfx.Valign.m_center,fan.gfx.Valign.m_bottom,fan.gfx.Valign.m_fill,fan.gfx.Valign.m_repeat]); if ($_u24 == null) return null; return fan.sys.ObjUtil.toImmutable($_u24); })(this),fan.sys.Type.find("gfx::Valign[]"));
  return;
}
fan.gfx.Valign.m_top = null;
fan.gfx.Valign.m_center = null;
fan.gfx.Valign.m_bottom = null;
fan.gfx.Valign.m_fill = null;
fan.gfx.Valign.m_repeat = null;
fan.gfx.Valign.m_vals = null;
fan.gfx.Orientation = fan.sys.Obj.$extend(fan.sys.Enum);
fan.gfx.Orientation.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.Orientation.prototype.$typeof = function() { return fan.gfx.Orientation.$type; }
fan.gfx.Orientation.make = function($ordinal,$name)
{
  var self = new fan.gfx.Orientation();
  fan.gfx.Orientation.make$(self,$ordinal,$name);
  return self;
}
fan.gfx.Orientation.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.gfx.Orientation.fromStr = function(name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.gfx.Orientation.$type,name,checked),fan.gfx.Orientation.$type.toNullable());
}
fan.gfx.Orientation.static$init = function()
{
  fan.gfx.Orientation.m_horizontal = fan.gfx.Orientation.make(0,"horizontal");
  fan.gfx.Orientation.m_vertical = fan.gfx.Orientation.make(1,"vertical");
  fan.gfx.Orientation.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u25 = fan.sys.List.make(fan.gfx.Orientation.$type, [fan.gfx.Orientation.m_horizontal,fan.gfx.Orientation.m_vertical]); if ($_u25 == null) return null; return fan.sys.ObjUtil.toImmutable($_u25); })(this),fan.sys.Type.find("gfx::Orientation[]"));
  return;
}
fan.gfx.Orientation.m_horizontal = null;
fan.gfx.Orientation.m_vertical = null;
fan.gfx.Orientation.m_vals = null;
fan.gfx.GradientMode = fan.sys.Obj.$extend(fan.sys.Enum);
fan.gfx.GradientMode.prototype.$ctor = function()
{
  fan.sys.Enum.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.GradientMode.prototype.$typeof = function() { return fan.gfx.GradientMode.$type; }
fan.gfx.GradientMode.make = function($ordinal,$name)
{
  var self = new fan.gfx.GradientMode();
  fan.gfx.GradientMode.make$(self,$ordinal,$name);
  return self;
}
fan.gfx.GradientMode.make$ = function(self,$ordinal,$name)
{
  fan.sys.Enum.make$(self,$ordinal,$name);
  return;
}
fan.gfx.GradientMode.fromStr = function(name,checked)
{
  if (checked === undefined) checked = true;
  return fan.sys.ObjUtil.coerce(fan.sys.Enum.doFromStr(fan.gfx.GradientMode.$type,name,checked),fan.gfx.GradientMode.$type.toNullable());
}
fan.gfx.GradientMode.static$init = function()
{
  fan.gfx.GradientMode.m_linear = fan.gfx.GradientMode.make(0,"linear");
  fan.gfx.GradientMode.m_radial = fan.gfx.GradientMode.make(1,"radial");
  fan.gfx.GradientMode.m_vals = fan.sys.ObjUtil.coerce((function($this) { var $_u26 = fan.sys.List.make(fan.gfx.GradientMode.$type, [fan.gfx.GradientMode.m_linear,fan.gfx.GradientMode.m_radial]); if ($_u26 == null) return null; return fan.sys.ObjUtil.toImmutable($_u26); })(this),fan.sys.Type.find("gfx::GradientMode[]"));
  return;
}
fan.gfx.GradientMode.m_linear = null;
fan.gfx.GradientMode.m_radial = null;
fan.gfx.GradientMode.m_vals = null;
fan.gfx.Font = fan.sys.Obj.$extend(fan.sys.Obj);
fan.gfx.Font.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_name = "Serif";
  this.m_size = 11;
  return;
}
fan.gfx.Font.prototype.$typeof = function() { return fan.gfx.Font.$type; }
fan.gfx.Font.make = function(f)
{
  var self = new fan.gfx.Font();
  fan.gfx.Font.make$(self,f);
  return self;
}
fan.gfx.Font.make$ = function(self,f)
{
  ;
  f.call(self);
  return;
}
fan.gfx.Font.makeFields = function(name,size,bold,italic)
{
  var self = new fan.gfx.Font();
  fan.gfx.Font.makeFields$(self,name,size,bold,italic);
  return self;
}
fan.gfx.Font.makeFields$ = function(self,name,size,bold,italic)
{
  if (size === undefined) size = 12;
  if (bold === undefined) bold = false;
  if (italic === undefined) italic = false;
  ;
  self.m_name = name;
  self.m_size = size;
  self.m_bold = bold;
  self.m_italic = italic;
  return;
}
fan.gfx.Font.fromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  try
  {
    var name = null;
    var size = null;
    var bold = false;
    var italic = false;
    var toks = fan.sys.Str.split(s);
    for (var i = 0; fan.sys.ObjUtil.compareLT(i,toks.size()); i = fan.sys.Int.increment(i))
    {
      var tok = toks.get(i);
      if (fan.sys.ObjUtil.equals(tok,"bold"))
      {
        bold = true;
      }
      else
      {
        if (fan.sys.ObjUtil.equals(tok,"italic"))
        {
          italic = true;
        }
        else
        {
          if (size != null)
          {
            name = (function($this) { if (name == null) return tok; return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",name)," "),tok); })(this);
          }
          else
          {
            if (!fan.sys.Str.endsWith(tok,"pt"))
            {
              throw fan.sys.Err.make();
            }
            else
            {
              size = fan.sys.Str.toInt(fan.sys.Str.getRange(tok,fan.sys.Range.make(0,-3)));
            }
            ;
          }
          ;
        }
        ;
      }
      ;
    }
    ;
    return fan.gfx.Font.makeFields(fan.sys.ObjUtil.coerce(name,fan.sys.Str.$type),fan.sys.Num.toInt(fan.sys.ObjUtil.coerce(size,fan.sys.Num.$type)),bold,italic);
  }
  catch ($_u28)
  {
  }
  ;
  if (checked)
  {
    throw fan.sys.ParseErr.make(fan.sys.Str.plus("Invalid Font: ",s));
  }
  ;
  return null;
}
fan.gfx.Font.prototype.hash = function()
{
  var hash = fan.sys.Int.xor(fan.sys.Str.hash(this.m_name),this.m_size);
  if (this.m_bold)
  {
    hash = fan.sys.Int.mult(hash,73);
  }
  ;
  if (this.m_italic)
  {
    hash = fan.sys.Int.mult(hash,19);
  }
  ;
  return hash;
}
fan.gfx.Font.prototype.equals = function(that)
{
  var x = fan.sys.ObjUtil.as(that,fan.gfx.Font.$type);
  if (x == null)
  {
    return false;
  }
  ;
  return (fan.sys.ObjUtil.equals(this.m_name,x.m_name) && fan.sys.ObjUtil.equals(this.m_size,x.m_size) && fan.sys.ObjUtil.equals(this.m_bold,x.m_bold) && fan.sys.ObjUtil.equals(this.m_italic,x.m_italic));
}
fan.gfx.Font.prototype.toStr = function()
{
  var s = fan.sys.StrBuf.make();
  if (this.m_bold)
  {
    s.add("bold");
  }
  ;
  if (this.m_italic)
  {
    if (!s.isEmpty())
    {
      s.add(" ");
    }
    ;
    s.add("italic");
  }
  ;
  if (!s.isEmpty())
  {
    s.add(" ");
  }
  ;
  s.add(fan.sys.ObjUtil.coerce(this.m_size,fan.sys.Obj.$type.toNullable())).add("pt ").add(this.m_name);
  return s.toStr();
}
fan.gfx.Font.prototype.toSize = function(size)
{
  if (fan.sys.ObjUtil.equals(this.m_size,size))
  {
    return this;
  }
  ;
  return fan.gfx.Font.makeFields(this.m_name,size,this.m_bold,this.m_italic);
}
fan.gfx.Font.prototype.toPlain = function()
{
  if ((!this.m_bold && !this.m_italic))
  {
    return this;
  }
  ;
  return fan.gfx.Font.makeFields(this.m_name,this.m_size,false,false);
}
fan.gfx.Font.prototype.toBold = function()
{
  if (this.m_bold)
  {
    return this;
  }
  ;
  return fan.gfx.Font.makeFields(this.m_name,this.m_size,true,this.m_italic);
}
fan.gfx.Font.prototype.toItalic = function()
{
  if (this.m_italic)
  {
    return this;
  }
  ;
  return fan.gfx.Font.makeFields(this.m_name,this.m_size,this.m_bold,true);
}
fan.gfx.Font.prototype.height = function()
{
  return fan.gfx.GfxEnv.cur().fontHeight(this);
}
fan.gfx.Font.prototype.ascent = function()
{
  return fan.gfx.GfxEnv.cur().fontAscent(this);
}
fan.gfx.Font.prototype.descent = function()
{
  return fan.gfx.GfxEnv.cur().fontDescent(this);
}
fan.gfx.Font.prototype.leading = function()
{
  return fan.gfx.GfxEnv.cur().fontLeading(this);
}
fan.gfx.Font.prototype.width = function(s)
{
  return fan.gfx.GfxEnv.cur().fontWidth(this,s);
}
fan.gfx.Font.prototype.m_name = null;
fan.gfx.Font.prototype.m_size = 0;
fan.gfx.Font.prototype.m_bold = false;
fan.gfx.Font.prototype.m_italic = false;
fan.gfx.Point = fan.sys.Obj.$extend(fan.sys.Obj);
fan.gfx.Point.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.Point.prototype.$typeof = function() { return fan.gfx.Point.$type; }
fan.gfx.Point.make = function(x,y)
{
  var self = new fan.gfx.Point();
  fan.gfx.Point.make$(self,x,y);
  return self;
}
fan.gfx.Point.make$ = function(self,x,y)
{
  self.m_x = x;
  self.m_y = y;
  return;
}
fan.gfx.Point.fromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  try
  {
    var comma = fan.sys.Str.index(s,",");
    return fan.gfx.Point.make(fan.sys.ObjUtil.coerce(fan.sys.Str.toInt(fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(0,fan.sys.ObjUtil.coerce(comma,fan.sys.Int.$type),true)))),fan.sys.Int.$type),fan.sys.ObjUtil.coerce(fan.sys.Str.toInt(fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(comma,fan.sys.Int.$type),1),-1)))),fan.sys.Int.$type));
  }
  catch ($_u29)
  {
  }
  ;
  if (checked)
  {
    throw fan.sys.ParseErr.make(fan.sys.Str.plus("Invalid Point: ",s));
  }
  ;
  return null;
}
fan.gfx.Point.prototype.translate = function(t)
{
  return fan.gfx.Point.make(fan.sys.Int.plus(this.m_x,t.m_x),fan.sys.Int.plus(this.m_y,t.m_y));
}
fan.gfx.Point.prototype.hash = function()
{
  return fan.sys.Int.xor(this.m_x,fan.sys.Int.shiftl(this.m_y,16));
}
fan.gfx.Point.prototype.equals = function(obj)
{
  var that = fan.sys.ObjUtil.as(obj,fan.gfx.Point.$type);
  if (that == null)
  {
    return false;
  }
  ;
  return (fan.sys.ObjUtil.equals(this.m_x,that.m_x) && fan.sys.ObjUtil.equals(this.m_y,that.m_y));
}
fan.gfx.Point.prototype.toStr = function()
{
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(this.m_x,fan.sys.Obj.$type.toNullable())),","),fan.sys.ObjUtil.coerce(this.m_y,fan.sys.Obj.$type.toNullable()));
}
fan.gfx.Point.static$init = function()
{
  fan.gfx.Point.m_defVal = fan.gfx.Point.make(0,0);
  return;
}
fan.gfx.Point.m_defVal = null;
fan.gfx.Point.prototype.m_x = 0;
fan.gfx.Point.prototype.m_y = 0;
fan.gfx.Size = fan.sys.Obj.$extend(fan.sys.Obj);
fan.gfx.Size.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.Size.prototype.$typeof = function() { return fan.gfx.Size.$type; }
fan.gfx.Size.make = function(w,h)
{
  var self = new fan.gfx.Size();
  fan.gfx.Size.make$(self,w,h);
  return self;
}
fan.gfx.Size.make$ = function(self,w,h)
{
  self.m_w = w;
  self.m_h = h;
  return;
}
fan.gfx.Size.fromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  try
  {
    var comma = fan.sys.Str.index(s,",");
    return fan.gfx.Size.make(fan.sys.ObjUtil.coerce(fan.sys.Str.toInt(fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(0,fan.sys.ObjUtil.coerce(comma,fan.sys.Int.$type),true)))),fan.sys.Int.$type),fan.sys.ObjUtil.coerce(fan.sys.Str.toInt(fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(comma,fan.sys.Int.$type),1),-1)))),fan.sys.Int.$type));
  }
  catch ($_u30)
  {
  }
  ;
  if (checked)
  {
    throw fan.sys.ParseErr.make(fan.sys.Str.plus("Invalid Size: ",s));
  }
  ;
  return null;
}
fan.gfx.Size.prototype.toStr = function()
{
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(this.m_w,fan.sys.Obj.$type.toNullable())),","),fan.sys.ObjUtil.coerce(this.m_h,fan.sys.Obj.$type.toNullable()));
}
fan.gfx.Size.prototype.hash = function()
{
  return fan.sys.Int.xor(this.m_w,fan.sys.Int.shiftl(this.m_h,16));
}
fan.gfx.Size.prototype.equals = function(obj)
{
  var that = fan.sys.ObjUtil.as(obj,fan.gfx.Size.$type);
  if (that == null)
  {
    return false;
  }
  ;
  return (fan.sys.ObjUtil.equals(this.m_w,that.m_w) && fan.sys.ObjUtil.equals(this.m_h,that.m_h));
}
fan.gfx.Size.static$init = function()
{
  fan.gfx.Size.m_defVal = fan.gfx.Size.make(0,0);
  return;
}
fan.gfx.Size.m_defVal = null;
fan.gfx.Size.prototype.m_w = 0;
fan.gfx.Size.prototype.m_h = 0;
fan.gfx.Rect = fan.sys.Obj.$extend(fan.sys.Obj);
fan.gfx.Rect.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.Rect.prototype.$typeof = function() { return fan.gfx.Rect.$type; }
fan.gfx.Rect.make = function(x,y,w,h)
{
  var self = new fan.gfx.Rect();
  fan.gfx.Rect.make$(self,x,y,w,h);
  return self;
}
fan.gfx.Rect.make$ = function(self,x,y,w,h)
{
  self.m_x = x;
  self.m_y = y;
  self.m_w = w;
  self.m_h = h;
  return;
}
fan.gfx.Rect.makePosSize = function(p,s)
{
  var self = new fan.gfx.Rect();
  fan.gfx.Rect.makePosSize$(self,p,s);
  return self;
}
fan.gfx.Rect.makePosSize$ = function(self,p,s)
{
  self.m_x = p.m_x;
  self.m_y = p.m_y;
  self.m_w = s.m_w;
  self.m_h = s.m_h;
  return;
}
fan.gfx.Rect.fromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  try
  {
    var c1 = fan.sys.Str.index(s,",");
    var c2 = fan.sys.Str.index(s,",",fan.sys.Int.plus(fan.sys.ObjUtil.coerce(c1,fan.sys.Int.$type),1));
    var c3 = fan.sys.Str.index(s,",",fan.sys.Int.plus(fan.sys.ObjUtil.coerce(c2,fan.sys.Int.$type),1));
    return fan.gfx.Rect.make(fan.sys.ObjUtil.coerce(fan.sys.Str.toInt(fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(0,fan.sys.ObjUtil.coerce(c1,fan.sys.Int.$type),true)))),fan.sys.Int.$type),fan.sys.ObjUtil.coerce(fan.sys.Str.toInt(fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(c1,fan.sys.Int.$type),1),fan.sys.ObjUtil.coerce(c2,fan.sys.Int.$type),true)))),fan.sys.Int.$type),fan.sys.ObjUtil.coerce(fan.sys.Str.toInt(fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(c2,fan.sys.Int.$type),1),fan.sys.ObjUtil.coerce(c3,fan.sys.Int.$type),true)))),fan.sys.Int.$type),fan.sys.ObjUtil.coerce(fan.sys.Str.toInt(fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(c3,fan.sys.Int.$type),1),-1)))),fan.sys.Int.$type));
  }
  catch ($_u31)
  {
  }
  ;
  if (checked)
  {
    throw fan.sys.ParseErr.make(fan.sys.Str.plus("Invalid Rect: ",s));
  }
  ;
  return null;
}
fan.gfx.Rect.prototype.pos = function()
{
  return fan.gfx.Point.make(this.m_x,this.m_y);
}
fan.gfx.Rect.prototype.size = function()
{
  return fan.gfx.Size.make(this.m_w,this.m_h);
}
fan.gfx.Rect.prototype.contains = function(x,y)
{
  return (fan.sys.ObjUtil.compareGE(x,this.m_x) && fan.sys.ObjUtil.compareLE(x,fan.sys.Int.plus(this.m_x,this.m_w)) && fan.sys.ObjUtil.compareGE(y,this.m_y) && fan.sys.ObjUtil.compareLE(y,fan.sys.Int.plus(this.m_y,this.m_h)));
}
fan.gfx.Rect.prototype.toStr = function()
{
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(this.m_x,fan.sys.Obj.$type.toNullable())),","),fan.sys.ObjUtil.coerce(this.m_y,fan.sys.Obj.$type.toNullable())),","),fan.sys.ObjUtil.coerce(this.m_w,fan.sys.Obj.$type.toNullable())),","),fan.sys.ObjUtil.coerce(this.m_h,fan.sys.Obj.$type.toNullable()));
}
fan.gfx.Rect.prototype.hash = function()
{
  return fan.sys.Int.xor(fan.sys.Int.xor(fan.sys.Int.xor(this.m_x,fan.sys.Int.shiftl(this.m_y,8)),fan.sys.Int.shiftl(this.m_w,16)),fan.sys.Int.shiftl(this.m_w,24));
}
fan.gfx.Rect.prototype.equals = function(obj)
{
  var that = fan.sys.ObjUtil.as(obj,fan.gfx.Rect.$type);
  if (that == null)
  {
    return false;
  }
  ;
  return (fan.sys.ObjUtil.equals(this.m_x,that.m_x) && fan.sys.ObjUtil.equals(this.m_y,that.m_y) && fan.sys.ObjUtil.equals(this.m_w,that.m_w) && fan.sys.ObjUtil.equals(this.m_h,that.m_h));
}
fan.gfx.Rect.static$init = function()
{
  fan.gfx.Rect.m_defVal = fan.gfx.Rect.make(0,0,0,0);
  return;
}
fan.gfx.Rect.m_defVal = null;
fan.gfx.Rect.prototype.m_x = 0;
fan.gfx.Rect.prototype.m_y = 0;
fan.gfx.Rect.prototype.m_w = 0;
fan.gfx.Rect.prototype.m_h = 0;
fan.gfx.Insets = fan.sys.Obj.$extend(fan.sys.Obj);
fan.gfx.Insets.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.Insets.prototype.$typeof = function() { return fan.gfx.Insets.$type; }
fan.gfx.Insets.make = function(top,right,bottom,left)
{
  var self = new fan.gfx.Insets();
  fan.gfx.Insets.make$(self,top,right,bottom,left);
  return self;
}
fan.gfx.Insets.make$ = function(self,top,right,bottom,left)
{
  if (right === undefined) right = null;
  if (bottom === undefined) bottom = null;
  if (left === undefined) left = null;
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
  self.m_top = top;
  self.m_right = fan.sys.ObjUtil.coerce(right,fan.sys.Int.$type);
  self.m_bottom = fan.sys.ObjUtil.coerce(bottom,fan.sys.Int.$type);
  self.m_left = fan.sys.ObjUtil.coerce(left,fan.sys.Int.$type);
  return;
}
fan.gfx.Insets.fromStr = function(s,checked)
{
  if (checked === undefined) checked = true;
  try
  {
    var c1 = fan.sys.Str.index(s,",");
    if (c1 == null)
    {
      var len = fan.sys.Str.toInt(s);
      return fan.gfx.Insets.make(fan.sys.ObjUtil.coerce(len,fan.sys.Int.$type),len,len,len);
    }
    ;
    var c2 = fan.sys.Str.index(s,",",fan.sys.Int.plus(fan.sys.ObjUtil.coerce(c1,fan.sys.Int.$type),1));
    var c3 = fan.sys.Str.index(s,",",fan.sys.Int.plus(fan.sys.ObjUtil.coerce(c2,fan.sys.Int.$type),1));
    return fan.gfx.Insets.make(fan.sys.ObjUtil.coerce(fan.sys.Str.toInt(fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(0,fan.sys.ObjUtil.coerce(c1,fan.sys.Int.$type),true)))),fan.sys.Int.$type),fan.sys.Str.toInt(fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(c1,fan.sys.Int.$type),1),fan.sys.ObjUtil.coerce(c2,fan.sys.Int.$type),true)))),fan.sys.Str.toInt(fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(c2,fan.sys.Int.$type),1),fan.sys.ObjUtil.coerce(c3,fan.sys.Int.$type),true)))),fan.sys.Str.toInt(fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(c3,fan.sys.Int.$type),1),-1)))));
  }
  catch ($_u32)
  {
  }
  ;
  if (checked)
  {
    throw fan.sys.ParseErr.make(fan.sys.Str.plus("Invalid Insets: ",s));
  }
  ;
  return null;
}
fan.gfx.Insets.prototype.toStr = function()
{
  if ((fan.sys.ObjUtil.equals(this.m_top,this.m_right) && fan.sys.ObjUtil.equals(this.m_top,this.m_bottom) && fan.sys.ObjUtil.equals(this.m_top,this.m_left)))
  {
    return fan.sys.Int.toStr(this.m_top);
  }
  else
  {
    return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(this.m_top,fan.sys.Obj.$type.toNullable())),","),fan.sys.ObjUtil.coerce(this.m_right,fan.sys.Obj.$type.toNullable())),","),fan.sys.ObjUtil.coerce(this.m_bottom,fan.sys.Obj.$type.toNullable())),","),fan.sys.ObjUtil.coerce(this.m_left,fan.sys.Obj.$type.toNullable()));
  }
  ;
}
fan.gfx.Insets.prototype.hash = function()
{
  return fan.sys.Int.xor(fan.sys.Int.xor(fan.sys.Int.xor(this.m_top,fan.sys.Int.shiftl(this.m_right,8)),fan.sys.Int.shiftl(this.m_bottom,16)),fan.sys.Int.shiftl(this.m_left,24));
}
fan.gfx.Insets.prototype.equals = function(obj)
{
  var that = fan.sys.ObjUtil.as(obj,fan.gfx.Insets.$type);
  if (that == null)
  {
    return false;
  }
  ;
  return (fan.sys.ObjUtil.equals(this.m_top,that.m_top) && fan.sys.ObjUtil.equals(this.m_right,that.m_right) && fan.sys.ObjUtil.equals(this.m_bottom,that.m_bottom) && fan.sys.ObjUtil.equals(this.m_left,that.m_left));
}
fan.gfx.Insets.prototype.toSize = function()
{
  return fan.gfx.Size.make(fan.sys.Int.plus(this.m_right,this.m_left),fan.sys.Int.plus(this.m_top,this.m_bottom));
}
fan.gfx.Insets.static$init = function()
{
  fan.gfx.Insets.m_defVal = fan.gfx.Insets.make(0,fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()));
  return;
}
fan.gfx.Insets.m_defVal = null;
fan.gfx.Insets.prototype.m_top = 0;
fan.gfx.Insets.prototype.m_right = 0;
fan.gfx.Insets.prototype.m_bottom = 0;
fan.gfx.Insets.prototype.m_left = 0;
fan.gfx.Hints = fan.sys.Obj.$extend(fan.sys.Obj);
fan.gfx.Hints.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.Hints.prototype.$typeof = function() { return fan.gfx.Hints.$type; }
fan.gfx.Hints.make = function(w,h)
{
  var self = new fan.gfx.Hints();
  fan.gfx.Hints.make$(self,w,h);
  return self;
}
fan.gfx.Hints.make$ = function(self,w,h)
{
  self.m_w = w;
  self.m_h = h;
  return;
}
fan.gfx.Hints.prototype.toStr = function()
{
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(this.m_w,fan.sys.Obj.$type.toNullable())),","),fan.sys.ObjUtil.coerce(this.m_h,fan.sys.Obj.$type.toNullable()));
}
fan.gfx.Hints.prototype.hash = function()
{
  return fan.sys.Int.xor((function($this) { if ($this.m_w == null) return 3; return fan.sys.Int.hash(fan.sys.ObjUtil.coerce($this.m_w,fan.sys.Int.$type)); })(this),fan.sys.Int.shiftl((function($this) { if ($this.m_h == null) return 11; return fan.sys.Int.hash(fan.sys.ObjUtil.coerce($this.m_h,fan.sys.Int.$type)); })(this),16));
}
fan.gfx.Hints.prototype.equals = function(obj)
{
  var that = fan.sys.ObjUtil.as(obj,fan.gfx.Hints.$type);
  if (that == null)
  {
    return false;
  }
  ;
  return (fan.sys.ObjUtil.equals(this.m_w,that.m_w) && fan.sys.ObjUtil.equals(this.m_h,that.m_h));
}
fan.gfx.Hints.prototype.plus = function(size)
{
  return fan.gfx.Hints.make((function($this) { if ($this.m_w == null) return null; return fan.sys.ObjUtil.coerce(fan.sys.Int.plus(fan.sys.ObjUtil.coerce($this.m_w,fan.sys.Int.$type),size.m_w),fan.sys.Int.$type.toNullable()); })(this),(function($this) { if ($this.m_h == null) return null; return fan.sys.ObjUtil.coerce(fan.sys.Int.plus(fan.sys.ObjUtil.coerce($this.m_h,fan.sys.Int.$type),size.m_h),fan.sys.Int.$type.toNullable()); })(this));
}
fan.gfx.Hints.prototype.minus = function(size)
{
  return fan.gfx.Hints.make((function($this) { if ($this.m_w == null) return null; return fan.sys.ObjUtil.coerce(fan.sys.Int.minus(fan.sys.ObjUtil.coerce($this.m_w,fan.sys.Int.$type),size.m_w),fan.sys.Int.$type.toNullable()); })(this),(function($this) { if ($this.m_h == null) return null; return fan.sys.ObjUtil.coerce(fan.sys.Int.minus(fan.sys.ObjUtil.coerce($this.m_h,fan.sys.Int.$type),size.m_h),fan.sys.Int.$type.toNullable()); })(this));
}
fan.gfx.Hints.static$init = function()
{
  fan.gfx.Hints.m_defVal = fan.gfx.Hints.make(null,null);
  return;
}
fan.gfx.Hints.m_defVal = null;
fan.gfx.Hints.prototype.m_w = null;
fan.gfx.Hints.prototype.m_h = null;
fan.gfx.GfxEnv = fan.sys.Obj.$extend(fan.sys.Obj);
fan.gfx.GfxEnv.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.GfxEnv.prototype.$typeof = function() { return fan.gfx.GfxEnv.$type; }
fan.gfx.GfxEnv.cur = function(checked)
{
  if (checked === undefined) checked = true;
  var env = fan.sys.ObjUtil.coerce(fan.concurrent.Actor.locals().get("gfx.env"),fan.gfx.GfxEnv.$type.toNullable());
  if (env != null)
  {
    return env;
  }
  ;
  if (checked)
  {
    throw fan.sys.Err.make("No GfxEnv is active");
  }
  ;
  return null;
}
fan.gfx.GfxEnv.make = function()
{
  var self = new fan.gfx.GfxEnv();
  fan.gfx.GfxEnv.make$(self);
  return self;
}
fan.gfx.GfxEnv.make$ = function(self)
{
  return;
}
fan.gfx.Gradient = fan.sys.Obj.$extend(fan.sys.Obj);
fan.gfx.Gradient.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_mode = fan.gfx.GradientMode.m_linear;
  this.m_x1 = 0;
  this.m_y1 = 0;
  this.m_x2 = 100;
  this.m_y2 = 100;
  this.m_x1Unit = fan.gfx.Gradient.m_pixel;
  this.m_y1Unit = fan.gfx.Gradient.m_pixel;
  this.m_x2Unit = fan.gfx.Gradient.m_pixel;
  this.m_y2Unit = fan.gfx.Gradient.m_pixel;
  this.m_stops = fan.sys.ObjUtil.coerce((function($this) { var $_u39 = fan.gfx.Gradient.m_defStops; if ($_u39 == null) return null; return fan.sys.ObjUtil.toImmutable($_u39); })(this),fan.sys.Type.find("gfx::GradientStop[]"));
  return;
}
fan.gfx.Gradient.prototype.$typeof = function() { return fan.gfx.Gradient.$type; }
fan.gfx.Gradient.fromStr = function(str,checked)
{
  if (checked === undefined) checked = true;
  try
  {
    return fan.gfx.Gradient.makeStr(str);
  }
  catch ($_u40)
  {
  }
  ;
  if (checked)
  {
    throw fan.sys.ParseErr.make(fan.sys.Str.plus("Invalid Gradient: ",str));
  }
  ;
  return null;
}
fan.gfx.Gradient.makeStr = function(str)
{
  var self = new fan.gfx.Gradient();
  fan.gfx.Gradient.makeStr$(self,str);
  return self;
}
fan.gfx.Gradient.makeStr$ = function(self,str)
{
  var $this = self;
  ;
  if (fan.sys.ObjUtil.equals(fan.sys.Str.get(str,-1),41))
  {
    if (fan.sys.Str.startsWith(str,"radial("))
    {
      self.m_mode = fan.gfx.GradientMode.m_radial;
    }
    else
    {
      if (!fan.sys.Str.startsWith(str,"linear("))
      {
        throw fan.sys.Err.make();
      }
      ;
    }
    ;
    str = fan.sys.Str.getRange(str,fan.sys.Range.make(7,-2));
  }
  ;
  var parts = fan.sys.Str.split(str,fan.sys.ObjUtil.coerce(44,fan.sys.Int.$type.toNullable()));
  for (var i = 0; fan.sys.ObjUtil.compareLT(i,2); i = fan.sys.Int.increment(i))
  {
    var pos = parts.get(i);
    var coor = fan.sys.Str.split(pos);
    if (fan.sys.ObjUtil.compareNE(coor.size(),2))
    {
      throw fan.sys.Err.make();
    }
    ;
    var x = null;
    var y = null;
    var xUnit = null;
    var yUnit = null;
    var xs = coor.get(0);
    if (fan.sys.Str.endsWith(xs,"%"))
    {
      x = fan.sys.Str.toInt(fan.sys.Str.getRange(xs,fan.sys.Range.make(0,-2)));
      xUnit = fan.gfx.Gradient.m_percent;
    }
    else
    {
      if (fan.sys.Str.endsWith(xs,"px"))
      {
        x = fan.sys.Str.toInt(fan.sys.Str.getRange(xs,fan.sys.Range.make(0,-3)));
        xUnit = fan.gfx.Gradient.m_pixel;
      }
      else
      {
        throw fan.sys.Err.make();
      }
      ;
    }
    ;
    var ys = coor.get(1);
    if (fan.sys.Str.endsWith(ys,"%"))
    {
      y = fan.sys.Str.toInt(fan.sys.Str.getRange(ys,fan.sys.Range.make(0,-2)));
      yUnit = fan.gfx.Gradient.m_percent;
    }
    else
    {
      if (fan.sys.Str.endsWith(ys,"px"))
      {
        y = fan.sys.Str.toInt(fan.sys.Str.getRange(ys,fan.sys.Range.make(0,-3)));
        yUnit = fan.gfx.Gradient.m_pixel;
      }
      else
      {
        throw fan.sys.Err.make();
      }
      ;
    }
    ;
    if (fan.sys.ObjUtil.equals(i,0))
    {
      self.m_x1 = fan.sys.ObjUtil.coerce(x,fan.sys.Int.$type);
      self.m_x1Unit = fan.sys.ObjUtil.coerce(xUnit,fan.sys.Unit.$type);
      self.m_y1 = fan.sys.ObjUtil.coerce(y,fan.sys.Int.$type);
      self.m_y1Unit = fan.sys.ObjUtil.coerce(yUnit,fan.sys.Unit.$type);
    }
    else
    {
      self.m_x2 = fan.sys.ObjUtil.coerce(x,fan.sys.Int.$type);
      self.m_x2Unit = fan.sys.ObjUtil.coerce(xUnit,fan.sys.Unit.$type);
      self.m_y2 = fan.sys.ObjUtil.coerce(y,fan.sys.Int.$type);
      self.m_y2Unit = fan.sys.ObjUtil.coerce(yUnit,fan.sys.Unit.$type);
    }
    ;
  }
  ;
  var stopColors = fan.sys.List.make(fan.gfx.Color.$type);
  var stopPos = fan.sys.List.make(fan.sys.Str.$type.toNullable());
  for (var i = 2; fan.sys.ObjUtil.compareLT(i,parts.size()); i = fan.sys.Int.increment(i))
  {
    var stopPart = parts.get(i);
    var space = fan.sys.Str.index(stopPart," ");
    if (space == null)
    {
      stopColors.add(fan.sys.ObjUtil.coerce(fan.gfx.Color.fromStr(stopPart),fan.gfx.Color.$type));
      stopPos.add(null);
    }
    else
    {
      stopColors.add(fan.sys.ObjUtil.coerce(fan.gfx.Color.fromStr(fan.sys.Str.getRange(stopPart,fan.sys.Range.make(0,fan.sys.ObjUtil.coerce(space,fan.sys.Int.$type),true))),fan.gfx.Color.$type));
      stopPos.add(fan.sys.Str.getRange(stopPart,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(space,fan.sys.Int.$type),1),-1)));
    }
    ;
  }
  ;
  if (fan.sys.ObjUtil.compareLT(stopColors.size(),2))
  {
    throw fan.sys.Err.make();
  }
  ;
  self.m_stops = fan.sys.ObjUtil.coerce((function($this) { var $_u41 = fan.sys.ObjUtil.coerce(stopColors.map(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("color","gfx::Color",false),new fan.sys.Param("i","sys::Int",false)]),
    fan.sys.Obj.$type.toNullable(),
    function(color,i)
    {
      var pos = (function($this) { var $_u42 = (function($this) { var $_u43 = stopPos.get(i); if ($_u43 == null) return null; return fan.sys.Str.toFloat($_u43); })($this); if ($_u42 != null) return $_u42; return fan.sys.ObjUtil.coerce(fan.sys.Float.div(fan.sys.Num.toFloat(fan.sys.ObjUtil.coerce(fan.sys.Int.div(fan.sys.Int.mult(i,100),fan.sys.Int.minus(stopPos.size(),1)),fan.sys.Num.$type)),fan.sys.Float.make(100.0)),fan.sys.Float.$type.toNullable()); })($this);
      return fan.gfx.GradientStop.make(color,fan.sys.ObjUtil.coerce(pos,fan.sys.Float.$type));
    })),fan.sys.Type.find("gfx::GradientStop[]")); if ($_u41 == null) return null; return fan.sys.ObjUtil.toImmutable($_u41); })(self),fan.sys.Type.find("gfx::GradientStop[]"));
  return;
}
fan.gfx.Gradient.make = function(f)
{
  var self = new fan.gfx.Gradient();
  fan.gfx.Gradient.make$(self,f);
  return self;
}
fan.gfx.Gradient.make$ = function(self,f)
{
  if (f === undefined) f = null;
  ;
  if (f != null)
  {
    f.call(self);
  }
  ;
  if ((self.m_x1Unit !== fan.gfx.Gradient.m_percent && self.m_x1Unit !== fan.gfx.Gradient.m_pixel))
  {
    throw fan.sys.ArgErr.make(fan.sys.Str.plus("Invalid x1Unit: ",self.m_x1Unit));
  }
  ;
  if ((self.m_y1Unit !== fan.gfx.Gradient.m_percent && self.m_y1Unit !== fan.gfx.Gradient.m_pixel))
  {
    throw fan.sys.ArgErr.make(fan.sys.Str.plus("Invalid y1Unit: ",self.m_y1Unit));
  }
  ;
  if ((self.m_x2Unit !== fan.gfx.Gradient.m_percent && self.m_x2Unit !== fan.gfx.Gradient.m_pixel))
  {
    throw fan.sys.ArgErr.make(fan.sys.Str.plus("Invalid x2Unit: ",self.m_x2Unit));
  }
  ;
  if ((self.m_y2Unit !== fan.gfx.Gradient.m_percent && self.m_y2Unit !== fan.gfx.Gradient.m_pixel))
  {
    throw fan.sys.ArgErr.make(fan.sys.Str.plus("Invalid y2Unit: ",self.m_y2Unit));
  }
  ;
  if (fan.sys.ObjUtil.compareLT(self.m_stops.size(),2))
  {
    throw fan.sys.ArgErr.make("Must have 2 or more stops");
  }
  ;
  return;
}
fan.gfx.Gradient.prototype.hash = function()
{
  return fan.sys.Int.xor(fan.sys.Int.xor(fan.sys.Int.xor(fan.sys.Int.xor(fan.sys.Int.xor(fan.sys.Int.shiftl(fan.sys.ObjUtil.hash(this.m_mode),28),fan.sys.Int.shiftl(fan.sys.Int.hash(this.m_x1),21)),fan.sys.Int.shiftl(fan.sys.Int.hash(this.m_y1),14)),fan.sys.Int.shiftl(fan.sys.Int.hash(this.m_x2),21)),fan.sys.Int.shiftl(fan.sys.Int.hash(this.m_y2),14)),this.m_stops.hash());
}
fan.gfx.Gradient.prototype.equals = function(obj)
{
  var that = fan.sys.ObjUtil.as(obj,fan.gfx.Gradient.$type);
  if (that == null)
  {
    return false;
  }
  ;
  return (fan.sys.ObjUtil.equals(this.m_mode,that.m_mode) && fan.sys.ObjUtil.equals(this.m_x1,that.m_x1) && fan.sys.ObjUtil.equals(this.m_y1,that.m_y1) && fan.sys.ObjUtil.equals(this.m_x1Unit,that.m_x1Unit) && fan.sys.ObjUtil.equals(this.m_y1Unit,that.m_y1Unit) && fan.sys.ObjUtil.equals(this.m_x2,that.m_x2) && fan.sys.ObjUtil.equals(this.m_y2,that.m_y2) && fan.sys.ObjUtil.equals(this.m_x2Unit,that.m_x2Unit) && fan.sys.ObjUtil.equals(this.m_y2Unit,that.m_y2Unit) && fan.sys.ObjUtil.equals(this.m_stops,that.m_stops));
}
fan.gfx.Gradient.prototype.toStr = function()
{
  var $this = this;
  var s = fan.sys.StrBuf.make();
  s.add(this.m_mode.name()).addChar(40);
  s.add(fan.sys.ObjUtil.coerce(this.m_x1,fan.sys.Obj.$type.toNullable())).add(this.m_x1Unit.symbol()).addChar(32);
  s.add(fan.sys.ObjUtil.coerce(this.m_y1,fan.sys.Obj.$type.toNullable())).add(this.m_y1Unit.symbol()).addChar(44);
  s.add(fan.sys.ObjUtil.coerce(this.m_x2,fan.sys.Obj.$type.toNullable())).add(this.m_x2Unit.symbol()).addChar(32);
  s.add(fan.sys.ObjUtil.coerce(this.m_y2,fan.sys.Obj.$type.toNullable())).add(this.m_y2Unit.symbol());
  this.m_stops.each(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("stop","gfx::GradientStop",false)]),
    fan.sys.Void.$type,
    function(stop)
    {
      s.addChar(44).add(stop);
      return;
    }));
  return s.addChar(41).toStr();
}
fan.gfx.Gradient.loadUnit = function(name,symbol)
{
  try
  {
    return fan.sys.ObjUtil.coerce(fan.sys.Unit.fromStr(name),fan.sys.Unit.$type);
  }
  catch ($_u44)
  {
    $_u44 = fan.sys.Err.make($_u44);
    if ($_u44 instanceof fan.sys.Err)
    {
      var e = $_u44;
      var e;
      return fan.sys.Unit.define(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",name),","),symbol));
    }
    else
    {
      throw $_u44;
    }
  }
  ;
}
fan.gfx.Gradient.static$init = function()
{
  fan.gfx.Gradient.m_percent = fan.gfx.Gradient.loadUnit("percent","%");
  fan.gfx.Gradient.m_pixel = fan.gfx.Gradient.loadUnit("pixel","px");
  fan.gfx.Gradient.m_defStops = fan.sys.ObjUtil.coerce((function($this) { var $_u45 = fan.sys.List.make(fan.gfx.GradientStop.$type, [fan.gfx.GradientStop.make(fan.gfx.Color.m_white,fan.sys.Float.make(0.0)),fan.gfx.GradientStop.make(fan.gfx.Color.m_black,fan.sys.Float.make(1.0))]); if ($_u45 == null) return null; return fan.sys.ObjUtil.toImmutable($_u45); })(this),fan.sys.Type.find("gfx::GradientStop[]"));
  return;
}
fan.gfx.Gradient.m_percent = null;
fan.gfx.Gradient.m_pixel = null;
fan.gfx.Gradient.prototype.m_mode = null;
fan.gfx.Gradient.prototype.m_x1 = 0;
fan.gfx.Gradient.prototype.m_y1 = 0;
fan.gfx.Gradient.prototype.m_x2 = 0;
fan.gfx.Gradient.prototype.m_y2 = 0;
fan.gfx.Gradient.prototype.m_x1Unit = null;
fan.gfx.Gradient.prototype.m_y1Unit = null;
fan.gfx.Gradient.prototype.m_x2Unit = null;
fan.gfx.Gradient.prototype.m_y2Unit = null;
fan.gfx.Gradient.prototype.m_stops = null;
fan.gfx.Gradient.m_defStops = null;
fan.gfx.GradientStop = fan.sys.Obj.$extend(fan.sys.Obj);
fan.gfx.GradientStop.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.GradientStop.prototype.$typeof = function() { return fan.gfx.GradientStop.$type; }
fan.gfx.GradientStop.make = function(color,pos)
{
  var self = new fan.gfx.GradientStop();
  fan.gfx.GradientStop.make$(self,color,pos);
  return self;
}
fan.gfx.GradientStop.make$ = function(self,color,pos)
{
  self.m_color = color;
  self.m_pos = pos;
  return;
}
fan.gfx.GradientStop.prototype.hash = function()
{
  return fan.sys.Int.xor(fan.sys.Float.hash(this.m_pos),this.m_color.hash());
}
fan.gfx.GradientStop.prototype.equals = function(obj)
{
  var that = fan.sys.ObjUtil.as(obj,fan.gfx.GradientStop.$type);
  if (that == null)
  {
    return false;
  }
  ;
  return (fan.sys.ObjUtil.equals(this.m_pos,that.m_pos) && fan.sys.ObjUtil.equals(this.m_color,that.m_color));
}
fan.gfx.GradientStop.prototype.toStr = function()
{
  return fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",this.m_color)," "),fan.sys.ObjUtil.coerce(this.m_pos,fan.sys.Obj.$type.toNullable()));
}
fan.gfx.GradientStop.prototype.m_color = null;
fan.gfx.GradientStop.prototype.m_pos = fan.sys.Float.make(0);
fan.gfx.Graphics = function() {}
fan.gfx.Graphics.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.Graphics.prototype.$typeof = function() { return fan.gfx.Graphics.$type; }
fan.gfx.Graphics.prototype.m_brush = null;
fan.gfx.Graphics.prototype.m_pen = null;
fan.gfx.Graphics.prototype.m_font = null;
fan.gfx.Graphics.prototype.m_antialias = false;
fan.gfx.Graphics.prototype.m_alpha = 0;
fan.gfx.Image = fan.sys.Obj.$extend(fan.sys.Obj);
fan.gfx.Image.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.Image.prototype.$typeof = function() { return fan.gfx.Image.$type; }
fan.gfx.Image.make = function(uri,checked)
{
  if (checked === undefined) checked = true;
  var $this = this;
  try
  {
    var f = fan.sys.ObjUtil.coerce(uri.get(),fan.sys.File.$type);
    if (!f.exists())
    {
      throw fan.sys.UnresolvedErr.make(fan.sys.Str.plus("file does not exist: ",f));
    }
    ;
    return fan.gfx.Image.makeUri(uri,fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Image",false)]),
      fan.sys.Void.$type,
      function(it)
      {
        it.m_file = f;
        return;
      }));
  }
  catch ($_u46)
  {
    $_u46 = fan.sys.Err.make($_u46);
    if ($_u46 instanceof fan.sys.Err)
    {
      var e = $_u46;
      var e;
      if (checked)
      {
        throw e;
      }
      ;
      return null;
    }
    else
    {
      throw $_u46;
    }
  }
  ;
}
fan.gfx.Image.makeFile = function(f,checked)
{
  if (checked === undefined) checked = true;
  var $this = this;
  try
  {
    if (!f.exists())
    {
      throw fan.sys.UnresolvedErr.make(fan.sys.Str.plus("file does not exist: ",f));
    }
    ;
    return fan.gfx.Image.makeUri(f.uri(),fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Image",false)]),
      fan.sys.Void.$type,
      function(it)
      {
        it.m_file = f;
        return;
      }));
  }
  catch ($_u47)
  {
    $_u47 = fan.sys.Err.make($_u47);
    if ($_u47 instanceof fan.sys.Err)
    {
      var e = $_u47;
      var e;
      if (checked)
      {
        throw e;
      }
      ;
      return null;
    }
    else
    {
      throw $_u47;
    }
  }
  ;
}
fan.gfx.Image.fromStr = function(uri,checked)
{
  if (checked === undefined) checked = true;
  return fan.gfx.Image.make(fan.sys.Str.toUri(uri),checked);
}
fan.gfx.Image.makeUri = function(uri,f)
{
  var self = new fan.gfx.Image();
  fan.gfx.Image.makeUri$(self,uri,f);
  return self;
}
fan.gfx.Image.makeUri$ = function(self,uri,f)
{
  if (f === undefined) f = null;
  self.m_uri = uri;
  if (f != null)
  {
    f.call(self);
  }
  ;
  return;
}
fan.gfx.Image.prototype.hash = function()
{
  return this.m_uri.hash();
}
fan.gfx.Image.prototype.equals = function(that)
{
  var x = fan.sys.ObjUtil.as(that,fan.gfx.Image.$type);
  if (x == null)
  {
    return false;
  }
  ;
  return fan.sys.ObjUtil.equals(this.m_uri,x.m_uri);
}
fan.gfx.Image.prototype.toStr = function()
{
  return this.m_uri.toStr();
}
fan.gfx.Image.prototype.size = function()
{
  return fan.gfx.GfxEnv.cur().imageSize(this);
}
fan.gfx.Image.prototype.resize = function(size)
{
  return fan.gfx.GfxEnv.cur().imageResize(this,size);
}
fan.gfx.Image.prototype.m_uri = null;
fan.gfx.Image.prototype.m_file = null;
fan.gfx.Pen = fan.sys.Obj.$extend(fan.sys.Obj);
fan.gfx.Pen.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_width = 1;
  this.m_cap = fan.gfx.Pen.m_capSquare;
  this.m_join = fan.gfx.Pen.m_joinMiter;
  return;
}
fan.gfx.Pen.prototype.$typeof = function() { return fan.gfx.Pen.$type; }
fan.gfx.Pen.make = function(f)
{
  var self = new fan.gfx.Pen();
  fan.gfx.Pen.make$(self,f);
  return self;
}
fan.gfx.Pen.make$ = function(self,f)
{
  ;
  f.call(self);
  return;
}
fan.gfx.Pen.fromStr = function(str,checked)
{
  if (checked === undefined) checked = true;
  var $this = this;
  try
  {
    var w = null;
    var c = fan.gfx.Pen.m_capSquare;
    var j = fan.gfx.Pen.m_joinMiter;
    var d = null;
    var b = fan.sys.Str.index(str,"[");
    if (b != null)
    {
      d = fan.sys.List.make(fan.sys.Int.$type);
      fan.sys.Str.split(fan.sys.Str.getRange(str,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(b,fan.sys.Int.$type),1),fan.sys.ObjUtil.coerce(fan.sys.Str.index(str,"]"),fan.sys.Int.$type),true)),fan.sys.ObjUtil.coerce(44,fan.sys.Int.$type.toNullable())).each(fan.sys.Func.make(
        fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("tok","sys::Str",false)]),
        fan.sys.Void.$type,
        function(tok)
        {
          d.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.coerce(fan.sys.Str.toInt(tok),fan.sys.Int.$type),fan.sys.Obj.$type.toNullable()));
          return;
        }));
      str = fan.sys.Str.trim(fan.sys.Str.getRange(str,fan.sys.Range.make(0,fan.sys.ObjUtil.coerce(b,fan.sys.Int.$type),true)));
    }
    ;
    fan.sys.Str.split(str).each(fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("s","sys::Str",false)]),
      fan.sys.Void.$type,
      function(s)
      {
        var $_u48 = s;
        if (fan.sys.ObjUtil.equals($_u48,"capSquare"))
        {
          c = fan.gfx.Pen.m_capSquare;
        }
        else if (fan.sys.ObjUtil.equals($_u48,"capButt"))
        {
          c = fan.gfx.Pen.m_capButt;
        }
        else if (fan.sys.ObjUtil.equals($_u48,"capRound"))
        {
          c = fan.gfx.Pen.m_capRound;
        }
        else if (fan.sys.ObjUtil.equals($_u48,"joinMiter"))
        {
          j = fan.gfx.Pen.m_joinMiter;
        }
        else if (fan.sys.ObjUtil.equals($_u48,"joinBevel"))
        {
          j = fan.gfx.Pen.m_joinBevel;
        }
        else if (fan.sys.ObjUtil.equals($_u48,"joinRound"))
        {
          j = fan.gfx.Pen.m_joinRound;
        }
        else
        {
          w = fan.sys.Str.toInt(s);
        }
        ;
        return;
      }));
    return fan.gfx.Pen.make(fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
      fan.sys.Void.$type,
      function(it)
      {
        it.m_width = fan.sys.ObjUtil.coerce(w,fan.sys.Int.$type);
        it.m_cap = c;
        it.m_join = j;
        it.m_dash = fan.sys.ObjUtil.coerce((function($this) { var $_u49 = d; if ($_u49 == null) return null; return fan.sys.ObjUtil.toImmutable($_u49); })($this),fan.sys.Type.find("sys::Int[]?"));
        return;
      }));
  }
  catch ($_u50)
  {
  }
  ;
  if (checked)
  {
    throw fan.sys.ParseErr.make(fan.sys.Str.plus("Invalid Pen: ",str));
  }
  ;
  return null;
}
fan.gfx.Pen.prototype.hash = function()
{
  var h = fan.sys.Int.xor(fan.sys.Int.xor(this.m_width,fan.sys.Int.shiftl(this.m_cap,16)),fan.sys.Int.shiftl(this.m_join,20));
  if (this.m_dash != null)
  {
    h = fan.sys.Int.xor(h,fan.sys.Int.shiftl(this.m_dash.hash(),32));
  }
  ;
  return h;
}
fan.gfx.Pen.prototype.equals = function(obj)
{
  var that = fan.sys.ObjUtil.as(obj,fan.gfx.Pen.$type);
  if (that == null)
  {
    return false;
  }
  ;
  return (fan.sys.ObjUtil.equals(this.m_width,that.m_width) && fan.sys.ObjUtil.equals(this.m_cap,that.m_cap) && fan.sys.ObjUtil.equals(this.m_join,that.m_join) && fan.sys.ObjUtil.equals(this.m_dash,that.m_dash));
}
fan.gfx.Pen.prototype.capToStr = function()
{
  var $_u51 = this.m_cap;
  if (fan.sys.ObjUtil.equals($_u51,fan.gfx.Pen.m_capSquare))
  {
    return "square";
  }
  else if (fan.sys.ObjUtil.equals($_u51,fan.gfx.Pen.m_capButt))
  {
    return "butt";
  }
  else if (fan.sys.ObjUtil.equals($_u51,fan.gfx.Pen.m_capRound))
  {
    return "round";
  }
  else
  {
    throw fan.sys.Err.make();
  }
  ;
}
fan.gfx.Pen.prototype.joinToStr = function()
{
  var $_u52 = this.m_join;
  if (fan.sys.ObjUtil.equals($_u52,fan.gfx.Pen.m_joinMiter))
  {
    return "miter";
  }
  else if (fan.sys.ObjUtil.equals($_u52,fan.gfx.Pen.m_joinRound))
  {
    return "round";
  }
  else if (fan.sys.ObjUtil.equals($_u52,fan.gfx.Pen.m_joinBevel))
  {
    return "bevel";
  }
  else
  {
    throw fan.sys.Err.make();
  }
  ;
}
fan.gfx.Pen.prototype.toStr = function()
{
  var s = fan.sys.Int.toStr(this.m_width);
  var $_u53 = this.m_cap;
  if (fan.sys.ObjUtil.equals($_u53,fan.gfx.Pen.m_capButt))
  {
    s = fan.sys.Str.plus(s," capButt");
  }
  else if (fan.sys.ObjUtil.equals($_u53,fan.gfx.Pen.m_capRound))
  {
    s = fan.sys.Str.plus(s," capRound");
  }
  ;
  var $_u54 = this.m_join;
  if (fan.sys.ObjUtil.equals($_u54,fan.gfx.Pen.m_joinBevel))
  {
    s = fan.sys.Str.plus(s," joinBevel");
  }
  else if (fan.sys.ObjUtil.equals($_u54,fan.gfx.Pen.m_joinRound))
  {
    s = fan.sys.Str.plus(s," joinRound");
  }
  ;
  if (this.m_dash != null)
  {
    s = fan.sys.Str.plus(s,fan.sys.Str.plus(fan.sys.Str.plus(" [",this.m_dash.join(",")),"]"));
  }
  ;
  return s;
}
fan.gfx.Pen.static$init = function()
{
  var $this = this;
  fan.gfx.Pen.m_capSquare = 0;
  fan.gfx.Pen.m_capButt = 1;
  fan.gfx.Pen.m_capRound = 2;
  fan.gfx.Pen.m_joinMiter = 0;
  fan.gfx.Pen.m_joinBevel = 1;
  fan.gfx.Pen.m_joinRound = 3;
  fan.gfx.Pen.m_defVal = fan.gfx.Pen.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      return;
    }));
  return;
}
fan.gfx.Pen.prototype.m_width = 0;
fan.gfx.Pen.prototype.m_cap = 0;
fan.gfx.Pen.m_capSquare = 0;
fan.gfx.Pen.m_capButt = 0;
fan.gfx.Pen.m_capRound = 0;
fan.gfx.Pen.prototype.m_join = 0;
fan.gfx.Pen.m_joinMiter = 0;
fan.gfx.Pen.m_joinBevel = 0;
fan.gfx.Pen.m_joinRound = 0;
fan.gfx.Pen.prototype.m_dash = null;
fan.gfx.Pen.m_defVal = null;
fan.gfx.BorderTest = fan.sys.Obj.$extend(fan.sys.Test);
fan.gfx.BorderTest.prototype.$ctor = function()
{
  fan.sys.Test.prototype.$ctor.call(this);
  var $this = this;
  this.m_solid = fan.gfx.Border.m_styleSolid;
  this.m_inset = fan.gfx.Border.m_styleInset;
  this.m_outset = fan.gfx.Border.m_styleOutset;
  this.m_black = fan.gfx.Color.m_black;
  this.m_red = fan.gfx.Color.m_red;
  this.m_green = fan.gfx.Color.m_green;
  this.m_blue = fan.gfx.Color.m_blue;
  return;
}
fan.gfx.BorderTest.prototype.$typeof = function() { return fan.gfx.BorderTest.$type; }
fan.gfx.BorderTest.prototype.test = function()
{
  var $this = this;
  this.verifyBorder("2",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_black]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]),"2 solid #000000 0");
  this.verifyBorder("2,3",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_black]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]),"2,3 solid #000000 0");
  this.verifyBorder("2,3,4",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_black]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]),"2,3,4 solid #000000 0");
  this.verifyBorder("2,3,4,5",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(5,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_black]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]),"2,3,4,5 solid #000000 0");
  this.verifyBorder("2, 3",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_black]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]),"2,3 solid #000000 0");
  this.verifyBorder("2, 3 ,4  ,  5",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(5,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_black]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]),"2,3,4,5 solid #000000 0");
  this.verifyBorder("solid",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_black]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]),"1 solid #000000 0");
  this.verifyBorder("inset",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_inset,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_black]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]),"1 inset #000000 0");
  this.verifyBorder("inset,solid",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_inset,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(this.m_inset,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_black]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]),"1 inset,solid #000000 0");
  this.verifyBorder("inset,solid,outset",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_inset,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(this.m_outset,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_black]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]),"1 inset,solid,outset #000000 0");
  this.verifyBorder("inset,solid,outset,inset",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_inset,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(this.m_outset,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(this.m_inset,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_black]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]),"1 inset,solid,outset,inset #000000 0");
  this.verifyBorder("#000",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_black]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]),"1 solid #000000 0");
  this.verifyBorder("#ff0000",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_red]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]),"1 solid #ff0000 0");
  this.verifyBorder("#f00, #0f0",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_red,this.m_green,this.m_red,this.m_green]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]),"1 solid #ff0000,#00ff00 0");
  this.verifyBorder("#f00,#0f0,#00f",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_red,this.m_green,this.m_blue,this.m_green]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]),"1 solid #ff0000,#00ff00,#0000ff 0");
  this.verifyBorder("#f00, #0f0 ,#00f,#000",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_red,this.m_green,this.m_blue,this.m_black]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable())]),"1 solid #ff0000,#00ff00,#0000ff,#000000 0");
  this.verifyBorder("1 3",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_black]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type.toNullable())]),"1 solid #000000 3");
  this.verifyBorder("1 3, 4",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_black]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Obj.$type.toNullable())]),"1 solid #000000 3,4");
  this.verifyBorder("solid 3, 4 ,5",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_black]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(5,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Obj.$type.toNullable())]),"1 solid #000000 3,4,5");
  this.verifyBorder("1 3,4,5,6",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_black]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(5,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(6,fan.sys.Obj.$type.toNullable())]),"1 solid #000000 3,4,5,6");
  this.verifyBorder("2 inset #00ff00 3",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_inset,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_green]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type.toNullable())]),"2 inset #00ff00 3");
  this.verifyBorder("1,2 inset #00ff00 3,0,0,2",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_inset,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_green]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type.toNullable())]),"1,2 inset #00ff00 3,0,0,2");
  this.verifyBorder("0,1,1,1 solid #00f 0,0,2,2",fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(this.m_solid,fan.sys.Obj.$type.toNullable())]),fan.sys.List.make(fan.gfx.Color.$type, [this.m_blue]),fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(0,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type.toNullable())]),"0,1,1 solid #0000ff 0,0,2,2");
  this.verifyEq(fan.gfx.Border.fromStr("%",false),null);
  this.verifyEq(fan.gfx.Border.fromStr("% 3",false),null);
  this.verifyEq(fan.gfx.Border.fromStr("1,2,3,4,",false),null);
  this.verifyEq(fan.gfx.Border.fromStr("1,2,3,",false),null);
  this.verifyEq(fan.gfx.Border.fromStr("2 bad",false),null);
  this.verifyEq(fan.gfx.Border.fromStr("2 solid bad",false),null);
  this.verifyErr(fan.sys.ParseErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Border.fromStr("x",true);
      return;
    }));
  this.verifyErr(fan.sys.ParseErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Border.fromStr("2x");
      return;
    }));
  this.verifyErr(fan.sys.ParseErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Border.fromStr("2 x");
      return;
    }));
  return;
}
fan.gfx.BorderTest.prototype.verifyBorder = function(str,w,s,c,r,normStr)
{
  this.expand(w);
  this.expand(s);
  this.expand(c);
  this.expand(r);
  var b = fan.sys.ObjUtil.coerce(fan.gfx.Border.fromStr(str),fan.gfx.Border.$type);
  this.verifyEq(b.m_toStr,normStr);
  this.verifyEq(b,fan.gfx.Border.fromStr(normStr));
  this.verifyEq(fan.sys.ObjUtil.coerce(b.m_widthTop,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(w.get(0),fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(b.m_widthRight,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(w.get(1),fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(b.m_widthBottom,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(w.get(2),fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(b.m_widthLeft,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(w.get(3),fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(b.m_styleTop,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(s.get(0),fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(b.m_styleRight,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(s.get(1),fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(b.m_styleBottom,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(s.get(2),fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(b.m_styleLeft,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(s.get(3),fan.sys.Obj.$type.toNullable()));
  this.verifyEq(b.m_colorTop,c.get(0));
  this.verifyEq(b.m_colorRight,c.get(1));
  this.verifyEq(b.m_colorBottom,c.get(2));
  this.verifyEq(b.m_colorLeft,c.get(3));
  this.verifyEq(fan.sys.ObjUtil.coerce(b.m_radiusTopLeft,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(r.get(0),fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(b.m_radiusTopRight,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(r.get(1),fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(b.m_radiusBottomRight,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(r.get(2),fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(b.m_radiusBottomLeft,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(r.get(3),fan.sys.Obj.$type.toNullable()));
  return;
}
fan.gfx.BorderTest.prototype.expand = function(list)
{
  if (fan.sys.ObjUtil.equals(list.size(),4))
  {
    return;
  }
  ;
  if (fan.sys.ObjUtil.compareNE(list.size(),1))
  {
    throw fan.sys.Err.make();
  }
  ;
  var v = list.first();
  list.add(fan.sys.ObjUtil.coerce(v,fan.sys.Obj.$type)).add(fan.sys.ObjUtil.coerce(v,fan.sys.Obj.$type)).add(fan.sys.ObjUtil.coerce(v,fan.sys.Obj.$type));
  return;
}
fan.gfx.BorderTest.make = function()
{
  var self = new fan.gfx.BorderTest();
  fan.gfx.BorderTest.make$(self);
  return self;
}
fan.gfx.BorderTest.make$ = function(self)
{
  fan.sys.Test.make$(self);
  ;
  return;
}
fan.gfx.BorderTest.prototype.m_solid = 0;
fan.gfx.BorderTest.prototype.m_inset = 0;
fan.gfx.BorderTest.prototype.m_outset = 0;
fan.gfx.BorderTest.prototype.m_black = null;
fan.gfx.BorderTest.prototype.m_red = null;
fan.gfx.BorderTest.prototype.m_green = null;
fan.gfx.BorderTest.prototype.m_blue = null;
fan.gfx.ColorTest = fan.sys.Obj.$extend(fan.sys.Test);
fan.gfx.ColorTest.prototype.$ctor = function()
{
  fan.sys.Test.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.ColorTest.prototype.$typeof = function() { return fan.gfx.ColorTest.$type; }
fan.gfx.ColorTest.prototype.testMake = function()
{
  var c = fan.gfx.Color.make(11189196);
  this.verifyEq(fan.sys.ObjUtil.coerce(c.m_argb,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(4289379276,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(c.rgb(),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(11189196,fan.sys.Obj.$type.toNullable()));
  this.verifyColor(c,255,170,187,204,"#aabbcc");
  c = fan.gfx.Color.make(2864434397,true);
  this.verifyEq(fan.sys.ObjUtil.coerce(c.m_argb,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(2864434397,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(c.rgb(),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(12307677,fan.sys.Obj.$type.toNullable()));
  this.verifyColor(c,170,187,204,221,"#aabbccdd");
  c = fan.gfx.Color.makeArgb(1,2,3,4);
  this.verifyEq(fan.sys.ObjUtil.coerce(c.m_argb,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(16909060,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(c.rgb(),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(131844,fan.sys.Obj.$type.toNullable()));
  this.verifyColor(c,1,2,3,4,"#01020304");
  c = fan.gfx.Color.makeRgb(51,34,17);
  this.verifyEq(fan.sys.ObjUtil.coerce(c.m_argb,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(4281541137,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(c.rgb(),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(3351057,fan.sys.Obj.$type.toNullable()));
  this.verifyColor(c,255,51,34,17,"#332211");
  return;
}
fan.gfx.ColorTest.prototype.verifyColor = function(c,a,r,g,b,s)
{
  this.verifyEq(fan.sys.ObjUtil.coerce(c.a(),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(a,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(c.r(),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(r,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(c.g(),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(g,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(c.b(),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(b,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(c.toStr(),s);
  this.verifyEq(c,fan.gfx.Color.fromStr(c.toStr()));
  this.verifyEq(c,fan.sys.Buf.make().writeObj(c).flip().readObj());
  this.verifyEq(c,fan.gfx.Color.makeArgb(a,r,g,b));
  return;
}
fan.gfx.ColorTest.prototype.testFromStr = function()
{
  var $this = this;
  this.verifyEq(fan.gfx.Color.fromStr("#abc"),fan.gfx.Color.make(11189196));
  this.verifyEq(fan.gfx.Color.fromStr("#345"),fan.gfx.Color.make(3359829));
  this.verifyEq(fan.gfx.Color.fromStr("#a4b5c6"),fan.gfx.Color.make(10794438));
  this.verifyEq(fan.gfx.Color.fromStr("#dea4b5c6"),fan.gfx.Color.make(3735336390,true));
  this.verifyEq(fan.gfx.Color.fromStr("#abdc",false),null);
  this.verifyErr(fan.sys.ParseErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Color.fromStr("abc");
      return;
    }));
  this.verifyErr(fan.sys.ParseErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Color.fromStr("#xyz",true);
      return;
    }));
  return;
}
fan.gfx.ColorTest.prototype.testEquals = function()
{
  this.verifyEq(fan.gfx.Color.make(11189196),fan.gfx.Color.make(11189196));
  this.verifyEq(fan.gfx.Color.make(2864434397,true),fan.gfx.Color.make(2864434397,true));
  this.verifyNotEq(fan.gfx.Color.make(11144140),fan.gfx.Color.make(11189196));
  this.verifyNotEq(fan.gfx.Color.make(11189196),fan.gfx.Color.make(11189196,true));
  this.verifyNotEq(fan.gfx.Color.make(1084931020,true),fan.gfx.Color.make(816495564,true));
  return;
}
fan.gfx.ColorTest.prototype.testToStr = function()
{
  this.verifyEq(fan.gfx.Color.m_black.toStr(),"#000000");
  this.verifyEq(fan.gfx.Color.m_red.toStr(),"#ff0000");
  this.verifyEq(fan.gfx.Color.m_blue.toStr(),"#0000ff");
  this.verifyEq(fan.gfx.Color.m_orange.toStr(),"#ffa500");
  return;
}
fan.gfx.ColorTest.prototype.testToCss = function()
{
  this.verifyEq(fan.gfx.Color.make(11189196).toCss(),"#aabbcc");
  this.verifyEq(fan.gfx.Color.make(1084931020,true).toCss(),"rgba(170,187,204,0.25)");
  return;
}
fan.gfx.ColorTest.prototype.testHsv = function()
{
  this.verifyHsv(0,fan.sys.Float.make(0.0),fan.sys.Float.make(0.0),fan.sys.Float.make(0.0));
  this.verifyHsv(16777215,fan.sys.Float.make(0.0),fan.sys.Float.make(0.0),fan.sys.Float.make(1.0));
  this.verifyHsv(16711680,fan.sys.Float.make(0.0),fan.sys.Float.make(1.0),fan.sys.Float.make(1.0));
  this.verifyHsv(65280,fan.sys.Float.make(120.0),fan.sys.Float.make(1.0),fan.sys.Float.make(1.0));
  this.verifyHsv(255,fan.sys.Float.make(240.0),fan.sys.Float.make(1.0),fan.sys.Float.make(1.0));
  this.verifyHsv(16776960,fan.sys.Float.make(60.0),fan.sys.Float.make(1.0),fan.sys.Float.make(1.0));
  this.verifyHsv(65535,fan.sys.Float.make(180.0),fan.sys.Float.make(1.0),fan.sys.Float.make(1.0));
  this.verifyHsv(16711935,fan.sys.Float.make(300.0),fan.sys.Float.make(1.0),fan.sys.Float.make(1.0));
  this.verifyHsv(6592200,fan.sys.Float.make(210.0),fan.sys.Float.make(0.5),fan.sys.Float.make(0.78));
  this.verifyHsv(3328080,fan.sys.Float.make(132.0),fan.sys.Float.make(0.75),fan.sys.Float.make(0.78));
  return;
}
fan.gfx.ColorTest.prototype.verifyHsv = function(rgb,h,s,v)
{
  var c = fan.gfx.Color.make(rgb,false);
  this.verify(fan.sys.Float.approx(c.h(),h,fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.1),fan.sys.Float.$type.toNullable())));
  this.verify(fan.sys.Float.approx(c.s(),s,fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.01),fan.sys.Float.$type.toNullable())));
  this.verify(fan.sys.Float.approx(c.v(),v,fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.01),fan.sys.Float.$type.toNullable())));
  this.verifyEq(c,fan.gfx.Color.makeHsv(c.h(),c.s(),c.v()));
  return;
}
fan.gfx.ColorTest.make = function()
{
  var self = new fan.gfx.ColorTest();
  fan.gfx.ColorTest.make$(self);
  return self;
}
fan.gfx.ColorTest.make$ = function(self)
{
  fan.sys.Test.make$(self);
  return;
}
fan.gfx.FontTest = fan.sys.Obj.$extend(fan.sys.Test);
fan.gfx.FontTest.prototype.$ctor = function()
{
  fan.sys.Test.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.FontTest.prototype.$typeof = function() { return fan.gfx.FontTest.$type; }
fan.gfx.FontTest.prototype.testMake = function()
{
  var $this = this;
  this.verifyFont(fan.gfx.Font.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Font",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_name = "Arial";
      it.m_size = 10;
      return;
    })),"Arial",10,false,false,"10pt Arial");
  this.verifyFont(fan.gfx.Font.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Font",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_name = "Arial Special";
      it.m_size = 10;
      it.m_bold = true;
      return;
    })),"Arial Special",10,true,false,"bold 10pt Arial Special");
  this.verifyFont(fan.gfx.Font.makeFields("Courier",11,false,true),"Courier",11,false,true,"italic 11pt Courier");
  this.verifyFont(fan.gfx.Font.makeFields("Courier",16,true,true),"Courier",16,true,true,"bold italic 16pt Courier");
  this.verifyEq(fan.gfx.Font.fromStr("22pt Arial"),fan.gfx.Font.makeFields("Arial",22));
  this.verifyEq(fan.gfx.Font.fromStr("bold 22pt Foo Bar"),fan.gfx.Font.makeFields("Foo Bar",22,true));
  this.verifyEq(fan.gfx.Font.fromStr("italic 5pt Arial"),fan.gfx.Font.makeFields("Arial",5,false,true));
  this.verifyEq(fan.gfx.Font.fromStr("bold italic 10pt Aa Bb"),fan.gfx.Font.makeFields("Aa Bb",10,true,true));
  this.verifyEq(fan.gfx.Font.fromStr("Arial",false),null);
  this.verifyErr(fan.sys.ParseErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Font.fromStr("10 Arial");
      return;
    }));
  this.verifyErr(fan.sys.ParseErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Font.fromStr("",true);
      return;
    }));
  return;
}
fan.gfx.FontTest.prototype.verifyFont = function(f,name,size,bold,italic,str)
{
  var $this = this;
  this.verifyEq(f.m_name,name);
  this.verifyEq(fan.sys.ObjUtil.coerce(f.m_size,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(size,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(f.m_bold,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(bold,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(f.m_italic,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(italic,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(f.toStr(),str);
  this.verifyEq(f,fan.gfx.Font.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Font",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_name = name;
      it.m_size = size;
      it.m_bold = bold;
      it.m_italic = italic;
      return;
    })));
  this.verifyNotEq(f,fan.gfx.Font.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Font",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_name = fan.sys.Str.plus(name,"x");
      it.m_size = size;
      it.m_bold = bold;
      it.m_italic = italic;
      return;
    })));
  this.verifyNotEq(f,fan.gfx.Font.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Font",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_name = name;
      it.m_size = fan.sys.Int.plus(size,1);
      it.m_bold = bold;
      it.m_italic = italic;
      return;
    })));
  this.verifyNotEq(f,fan.gfx.Font.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Font",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_name = name;
      it.m_size = size;
      it.m_bold = !bold;
      it.m_italic = italic;
      return;
    })));
  this.verifyNotEq(f,fan.gfx.Font.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Font",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_name = name;
      it.m_size = size;
      it.m_bold = bold;
      it.m_italic = !italic;
      return;
    })));
  this.verifyEq(f,fan.gfx.Font.fromStr(f.toStr()));
  this.verifyEq(f,fan.sys.Buf.make().writeObj(f).flip().readObj());
  return;
}
fan.gfx.FontTest.make = function()
{
  var self = new fan.gfx.FontTest();
  fan.gfx.FontTest.make$(self);
  return self;
}
fan.gfx.FontTest.make$ = function(self)
{
  fan.sys.Test.make$(self);
  return;
}
fan.gfx.GeomTest = fan.sys.Obj.$extend(fan.sys.Test);
fan.gfx.GeomTest.prototype.$ctor = function()
{
  fan.sys.Test.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.GeomTest.prototype.$typeof = function() { return fan.gfx.GeomTest.$type; }
fan.gfx.GeomTest.prototype.testPoint = function()
{
  var $this = this;
  this.verifyEq(fan.gfx.Point.m_defVal,fan.gfx.Point.make(0,0));
  this.verifyEq(fan.gfx.Point.$type.make(),fan.gfx.Point.make(0,0));
  this.verifyEq(fan.gfx.Point.make(3,4),fan.gfx.Point.make(3,4));
  this.verifyNotEq(fan.gfx.Point.make(3,9),fan.gfx.Point.make(3,4));
  this.verifyNotEq(fan.gfx.Point.make(9,4),fan.gfx.Point.make(3,4));
  this.verifyEq(fan.gfx.Point.fromStr("4,-2"),fan.gfx.Point.make(4,-2));
  this.verifyEq(fan.gfx.Point.fromStr("33 , 44"),fan.gfx.Point.make(33,44));
  this.verifyEq(fan.gfx.Point.fromStr("x,-2",false),null);
  this.verifyErr(fan.sys.ParseErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Point.fromStr("x,-2");
      return;
    }));
  this.verifyErr(fan.sys.ParseErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Point.fromStr("x,-2",true);
      return;
    }));
  this.verifySer(fan.gfx.Point.make(0,1));
  this.verifySer(fan.gfx.Point.make(-99,-505));
  return;
}
fan.gfx.GeomTest.prototype.testSize = function()
{
  var $this = this;
  this.verifyEq(fan.gfx.Size.m_defVal,fan.gfx.Size.make(0,0));
  this.verifyEq(fan.gfx.Size.$type.make(),fan.gfx.Size.make(0,0));
  this.verifyEq(fan.gfx.Size.make(3,4),fan.gfx.Size.make(3,4));
  this.verifyNotEq(fan.gfx.Size.make(3,9),fan.gfx.Size.make(3,4));
  this.verifyNotEq(fan.gfx.Size.make(9,4),fan.gfx.Size.make(3,4));
  this.verifyEq(fan.gfx.Size.fromStr("4,-2"),fan.gfx.Size.make(4,-2));
  this.verifyEq(fan.gfx.Size.fromStr("-33 , 60"),fan.gfx.Size.make(-33,60));
  this.verifyEq(fan.gfx.Size.fromStr("x,-2",false),null);
  this.verifyErr(fan.sys.ParseErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Size.fromStr("x,-2");
      return;
    }));
  this.verifyErr(fan.sys.ParseErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Size.fromStr("x,-2",true);
      return;
    }));
  this.verifySer(fan.gfx.Size.make(0,1));
  this.verifySer(fan.gfx.Size.make(-99,-505));
  return;
}
fan.gfx.GeomTest.prototype.testRect = function()
{
  var $this = this;
  this.verifyEq(fan.gfx.Rect.m_defVal,fan.gfx.Rect.make(0,0,0,0));
  this.verifyEq(fan.gfx.Rect.$type.make(),fan.gfx.Rect.make(0,0,0,0));
  this.verifyEq(fan.gfx.Rect.make(1,2,3,4),fan.gfx.Rect.make(1,2,3,4));
  this.verifyNotEq(fan.gfx.Rect.make(0,2,3,4),fan.gfx.Rect.make(1,2,3,4));
  this.verifyNotEq(fan.gfx.Rect.make(1,0,3,4),fan.gfx.Rect.make(1,2,3,4));
  this.verifyNotEq(fan.gfx.Rect.make(1,2,0,4),fan.gfx.Rect.make(1,2,3,4));
  this.verifyNotEq(fan.gfx.Rect.make(1,2,3,0),fan.gfx.Rect.make(1,2,3,4));
  var r = fan.gfx.Rect.make(2,2,6,6);
  this.verify(r.contains(4,4));
  this.verify(r.contains(2,4));
  this.verify(r.contains(4,2));
  this.verify(r.contains(2,2));
  this.verify(r.contains(8,8));
  this.verify(!r.contains(1,1));
  this.verify(!r.contains(2,9));
  this.verify(!r.contains(1,5));
  this.verifyEq(fan.gfx.Rect.fromStr("3,4,5,6"),fan.gfx.Rect.make(3,4,5,6));
  this.verifyEq(fan.gfx.Rect.fromStr("-1 , -2, -3  , -4"),fan.gfx.Rect.make(-1,-2,-3,-4));
  this.verifyEq(fan.gfx.Rect.fromStr("3,4,5",false),null);
  this.verifyErr(fan.sys.ParseErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Rect.fromStr("3,4,x,6");
      return;
    }));
  this.verifyErr(fan.sys.ParseErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Rect.fromStr("",true);
      return;
    }));
  this.verifySer(fan.gfx.Rect.make(1,2,3,4));
  this.verifySer(fan.gfx.Rect.make(-1,2,-3,4));
  return;
}
fan.gfx.GeomTest.prototype.testInsets = function()
{
  var $this = this;
  this.verifyEq(fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable())),fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable())));
  this.verifyEq(fan.sys.ObjUtil.coerce(fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable())).m_top,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable())).m_right,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable())).m_bottom,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable())).m_left,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable())).toSize(),fan.gfx.Size.make(6,4));
  this.verifyNotEq(fan.gfx.Insets.make(0,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable())),fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable())));
  this.verifyNotEq(fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable())),fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable())));
  this.verifyNotEq(fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable())),fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable())));
  this.verifyNotEq(fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(0,fan.sys.Int.$type.toNullable())),fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable())));
  this.verifyEq(fan.gfx.Insets.make(1),fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(1,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(1,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(1,fan.sys.Int.$type.toNullable())));
  this.verifyEq(fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable())),fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(1,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable())));
  this.verifyEq(fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable())),fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable())));
  this.verifyEq(fan.gfx.Insets.fromStr("3,4,5,6"),fan.gfx.Insets.make(3,fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(5,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(6,fan.sys.Int.$type.toNullable())));
  this.verifyEq(fan.gfx.Insets.fromStr("10"),fan.gfx.Insets.make(10,fan.sys.ObjUtil.coerce(10,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(10,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(10,fan.sys.Int.$type.toNullable())));
  this.verifyEq(fan.gfx.Insets.fromStr("-1 , -2, -3  , -4"),fan.gfx.Insets.make(-1,fan.sys.ObjUtil.coerce(-2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(-3,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(-4,fan.sys.Int.$type.toNullable())));
  this.verifyEq(fan.gfx.Insets.fromStr("3,4,5",false),null);
  this.verifyErr(fan.sys.ParseErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Insets.fromStr("3,4,x,6");
      return;
    }));
  this.verifyErr(fan.sys.ParseErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Insets.fromStr("",true);
      return;
    }));
  this.verifySer(fan.gfx.Insets.make(1,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable())));
  this.verifySer(fan.gfx.Insets.make(-1,fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(-3,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable())));
  return;
}
fan.gfx.GeomTest.prototype.testHints = function()
{
  this.verifyEq(fan.gfx.Hints.m_defVal,fan.gfx.Hints.make(null,null));
  this.verifyEq(fan.gfx.Hints.$type.make(),fan.gfx.Hints.make(null,null));
  this.verifyEq(fan.gfx.Hints.make(fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable()),null),fan.gfx.Hints.make(fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable()),null));
  this.verifyEq(fan.gfx.Hints.make(null,fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable())),fan.gfx.Hints.make(null,fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable())));
  this.verifyEq(fan.gfx.Hints.make(fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(5,fan.sys.Int.$type.toNullable())),fan.gfx.Hints.make(fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(5,fan.sys.Int.$type.toNullable())));
  this.verifyNotEq(fan.gfx.Hints.make(fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable()),null),fan.gfx.Hints.make(fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(5,fan.sys.Int.$type.toNullable())));
  this.verifyNotEq(fan.gfx.Hints.make(null,fan.sys.ObjUtil.coerce(5,fan.sys.Int.$type.toNullable())),fan.gfx.Hints.make(fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(5,fan.sys.Int.$type.toNullable())));
  this.verifyNotEq(fan.gfx.Hints.make(fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(6,fan.sys.Int.$type.toNullable())),fan.gfx.Hints.make(fan.sys.ObjUtil.coerce(4,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(5,fan.sys.Int.$type.toNullable())));
  var size = fan.gfx.Size.make(3,4);
  this.verifyEq(fan.gfx.Hints.make(null,null).plus(size),fan.gfx.Hints.make(null,null));
  this.verifyEq(fan.gfx.Hints.make(fan.sys.ObjUtil.coerce(5,fan.sys.Int.$type.toNullable()),null).plus(size),fan.gfx.Hints.make(fan.sys.ObjUtil.coerce(8,fan.sys.Int.$type.toNullable()),null));
  this.verifyEq(fan.gfx.Hints.make(null,fan.sys.ObjUtil.coerce(5,fan.sys.Int.$type.toNullable())).plus(size),fan.gfx.Hints.make(null,fan.sys.ObjUtil.coerce(9,fan.sys.Int.$type.toNullable())));
  this.verifyEq(fan.gfx.Hints.make(fan.sys.ObjUtil.coerce(11,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(5,fan.sys.Int.$type.toNullable())).plus(size),fan.gfx.Hints.make(fan.sys.ObjUtil.coerce(14,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(9,fan.sys.Int.$type.toNullable())));
  this.verifyEq(fan.gfx.Hints.make(null,null).minus(size),fan.gfx.Hints.make(null,null));
  this.verifyEq(fan.gfx.Hints.make(fan.sys.ObjUtil.coerce(5,fan.sys.Int.$type.toNullable()),null).minus(size),fan.gfx.Hints.make(fan.sys.ObjUtil.coerce(2,fan.sys.Int.$type.toNullable()),null));
  this.verifyEq(fan.gfx.Hints.make(null,fan.sys.ObjUtil.coerce(7,fan.sys.Int.$type.toNullable())).minus(size),fan.gfx.Hints.make(null,fan.sys.ObjUtil.coerce(3,fan.sys.Int.$type.toNullable())));
  this.verifyEq(fan.gfx.Hints.make(fan.sys.ObjUtil.coerce(11,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(13,fan.sys.Int.$type.toNullable())).minus(size),fan.gfx.Hints.make(fan.sys.ObjUtil.coerce(8,fan.sys.Int.$type.toNullable()),fan.sys.ObjUtil.coerce(9,fan.sys.Int.$type.toNullable())));
  return;
}
fan.gfx.GeomTest.prototype.verifySer = function(obj)
{
  var x = fan.sys.Buf.make().writeObj(obj).flip().readObj();
  this.verifyEq(obj,x);
  return;
}
fan.gfx.GeomTest.make = function()
{
  var self = new fan.gfx.GeomTest();
  fan.gfx.GeomTest.make$(self);
  return self;
}
fan.gfx.GeomTest.make$ = function(self)
{
  fan.sys.Test.make$(self);
  return;
}
fan.gfx.GradientTest = fan.sys.Obj.$extend(fan.sys.Test);
fan.gfx.GradientTest.prototype.$ctor = function()
{
  fan.sys.Test.prototype.$ctor.call(this);
  var $this = this;
  this.m_abc = fan.sys.ObjUtil.coerce(fan.gfx.Color.fromStr("#abc"),fan.gfx.Color.$type);
  this.m_def = fan.sys.ObjUtil.coerce(fan.gfx.Color.fromStr("#def"),fan.gfx.Color.$type);
  this.m_red = fan.gfx.Color.m_red;
  this.m_blue = fan.gfx.Color.m_blue;
  return;
}
fan.gfx.GradientTest.prototype.$typeof = function() { return fan.gfx.GradientTest.$type; }
fan.gfx.GradientTest.prototype.test = function()
{
  var $this = this;
  this.verifyGradient("linear(0% 0%, 100% 100%, #abc 0.0, #def 1.0)","0%","0%","100%","100%",fan.sys.List.make(fan.sys.Type.find("sys::Obj[]"), [fan.sys.List.make(fan.sys.Obj.$type, [this.m_abc,fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.0),fan.sys.Obj.$type)]),fan.sys.List.make(fan.sys.Obj.$type, [this.m_def,fan.sys.ObjUtil.coerce(fan.sys.Float.make(1.0),fan.sys.Obj.$type)])]));
  this.verifyGradient("linear(0% 0%, 100% 100%, #abc, #def)","0%","0%","100%","100%",fan.sys.List.make(fan.sys.Type.find("sys::Obj[]"), [fan.sys.List.make(fan.sys.Obj.$type, [this.m_abc,fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.0),fan.sys.Obj.$type)]),fan.sys.List.make(fan.sys.Obj.$type, [this.m_def,fan.sys.ObjUtil.coerce(fan.sys.Float.make(1.0),fan.sys.Obj.$type)])]));
  this.verifyGradient("linear(0% 0%, 100% 100%, #abc 0.5, #def)","0%","0%","100%","100%",fan.sys.List.make(fan.sys.Type.find("sys::Obj[]"), [fan.sys.List.make(fan.sys.Obj.$type, [this.m_abc,fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.5),fan.sys.Obj.$type)]),fan.sys.List.make(fan.sys.Obj.$type, [this.m_def,fan.sys.ObjUtil.coerce(fan.sys.Float.make(1.0),fan.sys.Obj.$type)])]));
  this.verifyGradient("linear(0% 0%, 100% 100%, #abc, #00f, #def)","0%","0%","100%","100%",fan.sys.List.make(fan.sys.Type.find("sys::Obj[]"), [fan.sys.List.make(fan.sys.Obj.$type, [this.m_abc,fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.0),fan.sys.Obj.$type)]),fan.sys.List.make(fan.sys.Obj.$type, [this.m_blue,fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.5),fan.sys.Obj.$type)]),fan.sys.List.make(fan.sys.Obj.$type, [this.m_def,fan.sys.ObjUtil.coerce(fan.sys.Float.make(1.0),fan.sys.Obj.$type)])]));
  this.verifyGradient("linear(0% 0%, 100% 100%, #abc, #00f, #ffff0000, #def)","0%","0%","100%","100%",fan.sys.List.make(fan.sys.Type.find("sys::Obj[]"), [fan.sys.List.make(fan.sys.Obj.$type, [this.m_abc,fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.0),fan.sys.Obj.$type)]),fan.sys.List.make(fan.sys.Obj.$type, [this.m_blue,fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.33),fan.sys.Obj.$type)]),fan.sys.List.make(fan.sys.Obj.$type, [this.m_red,fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.66),fan.sys.Obj.$type)]),fan.sys.List.make(fan.sys.Obj.$type, [this.m_def,fan.sys.ObjUtil.coerce(fan.sys.Float.make(1.0),fan.sys.Obj.$type)])]));
  this.verifyGradient("linear(20% 30%, 100% 100%, #f00, #00f)","20%","30%","100%","100%",fan.sys.List.make(fan.sys.Type.find("sys::Obj[]"), [fan.sys.List.make(fan.sys.Obj.$type, [this.m_red,fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.0),fan.sys.Obj.$type)]),fan.sys.List.make(fan.sys.Obj.$type, [this.m_blue,fan.sys.ObjUtil.coerce(fan.sys.Float.make(1.0),fan.sys.Obj.$type)])]));
  this.verifyGradient("linear(3px 5%, 11px 100%, #f00, #00f)","3px","5%","11px","100%",fan.sys.List.make(fan.sys.Type.find("sys::Obj[]"), [fan.sys.List.make(fan.sys.Obj.$type, [this.m_red,fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.0),fan.sys.Obj.$type)]),fan.sys.List.make(fan.sys.Obj.$type, [this.m_blue,fan.sys.ObjUtil.coerce(fan.sys.Float.make(1.0),fan.sys.Obj.$type)])]));
  this.verifyGradient("linear(13% 55px, 83% 75px, #f00, #00f)","13%","55px","83%","75px",fan.sys.List.make(fan.sys.Type.find("sys::Obj[]"), [fan.sys.List.make(fan.sys.Obj.$type, [this.m_red,fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.0),fan.sys.Obj.$type)]),fan.sys.List.make(fan.sys.Obj.$type, [this.m_blue,fan.sys.ObjUtil.coerce(fan.sys.Float.make(1.0),fan.sys.Obj.$type)])]));
  this.verifyGradient("linear(-3px -2px, 44px 22px, #f00, #00f)","-3px","-2px","44px","22px",fan.sys.List.make(fan.sys.Type.find("sys::Obj[]"), [fan.sys.List.make(fan.sys.Obj.$type, [this.m_red,fan.sys.ObjUtil.coerce(fan.sys.Float.make(0.0),fan.sys.Obj.$type)]),fan.sys.List.make(fan.sys.Obj.$type, [this.m_blue,fan.sys.ObjUtil.coerce(fan.sys.Float.make(1.0),fan.sys.Obj.$type)])]));
  this.verifyEq(fan.gfx.Gradient.fromStr("",false),null);
  this.verifyEq(fan.gfx.Gradient.fromStr("linear(3p 4px, 6px 8px, f00, #00f)",false),null);
  this.verifyErr(fan.sys.ParseErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Gradient.fromStr("line(2)",true);
      return;
    }));
  this.verifyErr(fan.sys.ParseErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Gradient.fromStr("linear(-3px -2px 100 100, #f00, #00f)");
      return;
    }));
  return;
}
fan.gfx.GradientTest.prototype.verifyGradient = function(str,x1,y1,x2,y2,stops)
{
  var $this = this;
  var g = fan.sys.ObjUtil.coerce(fan.gfx.Gradient.fromStr(str),fan.gfx.Gradient.$type);
  this.verifyEq(g,fan.gfx.Gradient.fromStr(g.toStr()));
  this.verifyIntUnit(g.m_x1,g.m_x1Unit,x1);
  this.verifyIntUnit(g.m_y1,g.m_y1Unit,y1);
  this.verifyIntUnit(g.m_x2,g.m_x2Unit,x2);
  this.verifyIntUnit(g.m_y2,g.m_y2Unit,y2);
  this.verifyEq(fan.sys.ObjUtil.coerce(g.m_stops.size(),fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(stops.size(),fan.sys.Obj.$type.toNullable()));
  g.m_stops.each(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("stop","gfx::GradientStop",false),new fan.sys.Param("i","sys::Int",false)]),
    fan.sys.Void.$type,
    function(stop,i)
    {
      $this.verifyEq(stop.m_color,stops.get(i).get(0));
      $this.verifyEq(fan.sys.ObjUtil.coerce(stop.m_pos,fan.sys.Obj.$type.toNullable()),stops.get(i).get(1));
      return;
    }));
  return;
}
fan.gfx.GradientTest.prototype.verifyIntUnit = function(v,u,str)
{
  this.verify((u === fan.gfx.Gradient.m_percent || u === fan.gfx.Gradient.m_pixel));
  this.verifyEq(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("",fan.sys.ObjUtil.coerce(v,fan.sys.Obj.$type.toNullable())),""),u.symbol()),str);
  return;
}
fan.gfx.GradientTest.make = function()
{
  var self = new fan.gfx.GradientTest();
  fan.gfx.GradientTest.make$(self);
  return self;
}
fan.gfx.GradientTest.make$ = function(self)
{
  fan.sys.Test.make$(self);
  ;
  return;
}
fan.gfx.GradientTest.prototype.m_abc = null;
fan.gfx.GradientTest.prototype.m_def = null;
fan.gfx.GradientTest.prototype.m_red = null;
fan.gfx.GradientTest.prototype.m_blue = null;
fan.gfx.ImageTest = fan.sys.Obj.$extend(fan.sys.Test);
fan.gfx.ImageTest.prototype.$ctor = function()
{
  fan.sys.Test.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.ImageTest.prototype.$typeof = function() { return fan.gfx.ImageTest.$type; }
fan.gfx.ImageTest.prototype.test = function()
{
  var $this = this;
  var file = fan.sys.Env.cur().homeDir().plus(fan.sys.Uri.fromStr("lib/fan/gfx.pod")).normalize();
  var verify = fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("img","gfx::Image",false)]),
    fan.sys.Void.$type,
    function(img)
    {
      $this.verifyEq(img.m_uri,file.uri());
      $this.verifyEq(img,fan.gfx.Image.make(file.uri()));
      $this.verifyEq(img,fan.gfx.Image.makeFile(file));
      $this.verifyEq(img.m_file,file);
      $this.verifyEq(img.m_file,file);
      return;
    });
  verify.call(fan.sys.ObjUtil.coerce(fan.gfx.Image.make(file.uri()),fan.gfx.Image.$type));
  verify.call(fan.sys.ObjUtil.coerce(fan.gfx.Image.makeFile(file),fan.gfx.Image.$type));
  var bad = fan.sys.Uri.fromStr("/some/really/bad/uri/for/a/image.xyz");
  this.verifyNull(fan.gfx.Image.make(bad,false));
  this.verifyNull(fan.gfx.Image.makeFile(bad.toFile(),false));
  this.verifyErr(fan.sys.UnresolvedErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Image.make(bad);
      return;
    }));
  this.verifyErr(fan.sys.UnresolvedErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Image.make(bad,true);
      return;
    }));
  this.verifyErr(fan.sys.UnresolvedErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Image.makeFile(bad.toFile());
      return;
    }));
  this.verifyErr(fan.sys.UnresolvedErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Image.makeFile(bad.toFile(),true);
      return;
    }));
  var buf = fan.sys.Buf.make().writeObj(fan.gfx.Image.make(file.uri()));
  var x = fan.sys.ObjUtil.coerce(buf.flip().readObj(),fan.gfx.Image.$type);
  this.verifyEq(x.m_uri,file.uri());
  return;
}
fan.gfx.ImageTest.make = function()
{
  var self = new fan.gfx.ImageTest();
  fan.gfx.ImageTest.make$(self);
  return self;
}
fan.gfx.ImageTest.make$ = function(self)
{
  fan.sys.Test.make$(self);
  return;
}
fan.gfx.PenTest = fan.sys.Obj.$extend(fan.sys.Test);
fan.gfx.PenTest.prototype.$ctor = function()
{
  fan.sys.Test.prototype.$ctor.call(this);
  var $this = this;
}
fan.gfx.PenTest.prototype.$typeof = function() { return fan.gfx.PenTest.$type; }
fan.gfx.PenTest.prototype.testMake = function()
{
  var $this = this;
  this.verifyPen(fan.gfx.Pen.m_defVal,1,fan.gfx.Pen.m_capSquare,fan.gfx.Pen.m_joinMiter,"1");
  this.verifyPen(fan.sys.ObjUtil.coerce(fan.gfx.Pen.$type.make(),fan.gfx.Pen.$type),1,fan.gfx.Pen.m_capSquare,fan.gfx.Pen.m_joinMiter,"1");
  this.verifyPen(fan.gfx.Pen.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      return;
    })),1,fan.gfx.Pen.m_capSquare,fan.gfx.Pen.m_joinMiter,"1");
  this.verifyPen(fan.gfx.Pen.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_width = 3;
      return;
    })),3,fan.gfx.Pen.m_capSquare,fan.gfx.Pen.m_joinMiter,"3");
  this.verifyPen(fan.gfx.Pen.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_cap = fan.gfx.Pen.m_capSquare;
      return;
    })),1,fan.gfx.Pen.m_capSquare,fan.gfx.Pen.m_joinMiter,"1");
  this.verifyPen(fan.gfx.Pen.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_cap = fan.gfx.Pen.m_capButt;
      return;
    })),1,fan.gfx.Pen.m_capButt,fan.gfx.Pen.m_joinMiter,"1 capButt");
  this.verifyPen(fan.gfx.Pen.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_cap = fan.gfx.Pen.m_capRound;
      return;
    })),1,fan.gfx.Pen.m_capRound,fan.gfx.Pen.m_joinMiter,"1 capRound");
  this.verifyPen(fan.gfx.Pen.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_join = fan.gfx.Pen.m_joinMiter;
      return;
    })),1,fan.gfx.Pen.m_capSquare,fan.gfx.Pen.m_joinMiter,"1");
  this.verifyPen(fan.gfx.Pen.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_join = fan.gfx.Pen.m_joinBevel;
      return;
    })),1,fan.gfx.Pen.m_capSquare,fan.gfx.Pen.m_joinBevel,"1 joinBevel");
  this.verifyPen(fan.gfx.Pen.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_join = fan.gfx.Pen.m_joinRound;
      return;
    })),1,fan.gfx.Pen.m_capSquare,fan.gfx.Pen.m_joinRound,"1 joinRound");
  this.verifyPen(fan.gfx.Pen.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_width = 3;
      it.m_cap = fan.gfx.Pen.m_capRound;
      it.m_join = fan.gfx.Pen.m_joinRound;
      return;
    })),3,fan.gfx.Pen.m_capRound,fan.gfx.Pen.m_joinRound,"3 capRound joinRound");
  this.verifyEq(fan.gfx.Pen.fromStr("capRound 4"),fan.gfx.Pen.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_width = 4;
      it.m_cap = fan.gfx.Pen.m_capRound;
      return;
    })));
  this.verifyEq(fan.gfx.Pen.fromStr("foo",false),null);
  this.verifyErr(fan.sys.ParseErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Pen.fromStr("foo");
      return;
    }));
  this.verifyErr(fan.sys.ParseErr.$type,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::Test",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      fan.gfx.Pen.fromStr("",true);
      return;
    }));
  return;
}
fan.gfx.PenTest.prototype.testDash = function()
{
  var $this = this;
  var p = fan.gfx.Pen.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_dash = fan.sys.ObjUtil.coerce((function($this) { var $_u55 = fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type.toNullable())]); if ($_u55 == null) return null; return fan.sys.ObjUtil.toImmutable($_u55); })($this),fan.sys.Type.find("sys::Int[]?"));
      return;
    }));
  this.verifyEq(fan.sys.ObjUtil.coerce(p.m_width,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(p.m_dash,fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(1,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(2,fan.sys.Obj.$type.toNullable())]));
  this.verify(fan.sys.ObjUtil.isImmutable(p.m_dash));
  this.verifyEq(p.toStr(),"1 [1,2]");
  this.verifyEq(p,fan.sys.Buf.make().writeObj(p).flip().readObj());
  this.verifyEq(fan.gfx.Pen.fromStr("2 capButt [3, 4, 5]"),fan.gfx.Pen.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_width = 2;
      it.m_cap = fan.gfx.Pen.m_capButt;
      it.m_dash = fan.sys.ObjUtil.coerce((function($this) { var $_u56 = fan.sys.List.make(fan.sys.Int.$type, [fan.sys.ObjUtil.coerce(3,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(4,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(5,fan.sys.Obj.$type.toNullable())]); if ($_u56 == null) return null; return fan.sys.ObjUtil.toImmutable($_u56); })($this),fan.sys.Type.find("sys::Int[]?"));
      return;
    })));
  this.verify(fan.sys.ObjUtil.isImmutable(fan.gfx.Pen.fromStr("2 capButt [3, 4, 5]").m_dash));
  return;
}
fan.gfx.PenTest.prototype.verifyPen = function(p,w,c,j,str)
{
  var $this = this;
  this.verifyEq(fan.sys.ObjUtil.coerce(p.m_width,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(w,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(p.m_cap,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(c,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(fan.sys.ObjUtil.coerce(p.m_join,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(j,fan.sys.Obj.$type.toNullable()));
  this.verifyEq(p.toStr(),str);
  var capStrs = fan.sys.Map.fromLiteral([fan.sys.ObjUtil.coerce(fan.gfx.Pen.m_capButt,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(fan.gfx.Pen.m_capRound,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(fan.gfx.Pen.m_capSquare,fan.sys.Obj.$type.toNullable())],["butt","round","square"],fan.sys.Type.find("sys::Int"),fan.sys.Type.find("sys::Str"));
  this.verifyEq(p.capToStr(),capStrs.get(fan.sys.ObjUtil.coerce(c,fan.sys.Obj.$type.toNullable())));
  var joinStrs = fan.sys.Map.fromLiteral([fan.sys.ObjUtil.coerce(fan.gfx.Pen.m_joinRound,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(fan.gfx.Pen.m_joinBevel,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(fan.gfx.Pen.m_joinMiter,fan.sys.Obj.$type.toNullable())],["round","bevel","miter"],fan.sys.Type.find("sys::Int"),fan.sys.Type.find("sys::Str"));
  this.verifyEq(p.joinToStr(),joinStrs.get(fan.sys.ObjUtil.coerce(j,fan.sys.Obj.$type.toNullable())));
  this.verifyEq(p,fan.gfx.Pen.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_width = w;
      it.m_cap = c;
      it.m_join = j;
      return;
    })));
  this.verifyNotEq(p,fan.gfx.Pen.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_width = fan.sys.Int.plus(w,1);
      it.m_cap = c;
      it.m_join = j;
      return;
    })));
  this.verifyNotEq(p,fan.gfx.Pen.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_width = w;
      it.m_cap = fan.sys.Int.mod(fan.sys.Int.plus(c,1),3);
      it.m_join = j;
      return;
    })));
  this.verifyNotEq(p,fan.gfx.Pen.make(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","gfx::Pen",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_width = w;
      it.m_cap = c;
      it.m_join = fan.sys.Int.mod(fan.sys.Int.plus(j,1),3);
      return;
    })));
  this.verifyEq(p,fan.gfx.Pen.fromStr(p.toStr()));
  this.verifyEq(p,fan.sys.Buf.make().writeObj(p).flip().readObj());
  return;
}
fan.gfx.PenTest.make = function()
{
  var self = new fan.gfx.PenTest();
  fan.gfx.PenTest.make$(self);
  return self;
}
fan.gfx.PenTest.make$ = function(self)
{
  fan.sys.Test.make$(self);
  return;
}
fan.gfx.$pod = fan.sys.Pod.$add('gfx');
with (fan.gfx.$pod)
{
  fan.gfx.Border.$type = $at('Border','sys::Obj',[],8194);
  fan.gfx.BorderParser.$type = $at('BorderParser','sys::Obj',[],128);
  fan.gfx.Brush.$type = $am('Brush','sys::Obj',[],8449);
  fan.gfx.Pattern.$type = $at('Pattern','sys::Obj',['gfx::Brush'],8194);
  fan.gfx.Color.$type = $at('Color','sys::Obj',['gfx::Brush'],8194);
  fan.gfx.Halign.$type = $at('Halign','sys::Enum',[],8234);
  fan.gfx.Valign.$type = $at('Valign','sys::Enum',[],8234);
  fan.gfx.Orientation.$type = $at('Orientation','sys::Enum',[],8234);
  fan.gfx.GradientMode.$type = $at('GradientMode','sys::Enum',[],8234);
  fan.gfx.Font.$type = $at('Font','sys::Obj',[],8194);
  fan.gfx.Point.$type = $at('Point','sys::Obj',[],8194);
  fan.gfx.Size.$type = $at('Size','sys::Obj',[],8194);
  fan.gfx.Rect.$type = $at('Rect','sys::Obj',[],8194);
  fan.gfx.Insets.$type = $at('Insets','sys::Obj',[],8194);
  fan.gfx.Hints.$type = $at('Hints','sys::Obj',[],8194);
  fan.gfx.GfxEnv.$type = $at('GfxEnv','sys::Obj',[],8195);
  fan.gfx.Gradient.$type = $at('Gradient','sys::Obj',['gfx::Brush'],8194);
  fan.gfx.GradientStop.$type = $at('GradientStop','sys::Obj',[],8194);
  fan.gfx.Graphics.$type = $am('Graphics','sys::Obj',[],8449);
  fan.gfx.Image.$type = $at('Image','sys::Obj',[],8194);
  fan.gfx.Pen.$type = $at('Pen','sys::Obj',[],8194);
  fan.gfx.BorderTest.$type = $at('BorderTest','sys::Test',[],8192);
  fan.gfx.ColorTest.$type = $at('ColorTest','sys::Test',[],8192);
  fan.gfx.FontTest.$type = $at('FontTest','sys::Test',[],8192);
  fan.gfx.GeomTest.$type = $at('GeomTest','sys::Test',[],8192);
  fan.gfx.GradientTest.$type = $at('GradientTest','sys::Test',[],8192);
  fan.gfx.ImageTest.$type = $at('ImageTest','sys::Test',[],8192);
  fan.gfx.PenTest.$type = $at('PenTest','sys::Test',[],8192);
  fan.gfx.Border.$type.$af('widthTop',73730,'sys::Int').$af('widthRight',73730,'sys::Int').$af('widthBottom',73730,'sys::Int').$af('widthLeft',73730,'sys::Int').$af('styleTop',73730,'sys::Int').$af('styleRight',73730,'sys::Int').$af('styleBottom',73730,'sys::Int').$af('styleLeft',73730,'sys::Int').$af('styleSolid',106498,'sys::Int').$af('styleInset',106498,'sys::Int').$af('styleOutset',106498,'sys::Int').$af('colorTop',73730,'gfx::Color').$af('colorRight',73730,'gfx::Color').$af('colorBottom',73730,'gfx::Color').$af('colorLeft',73730,'gfx::Color').$af('radiusTopLeft',73730,'sys::Int').$af('radiusTopRight',73730,'sys::Int').$af('radiusBottomRight',73730,'sys::Int').$af('radiusBottomLeft',73730,'sys::Int').$af('black',100354,'gfx::Color').$af('defVal',106498,'gfx::Border').$af('toStr',336898,'sys::Str').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('makeStr',2052,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('styleToStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Int',false)])).$am('styleFromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('formatStr',2048,fan.sys.List.make(fan.sys.Param.$type,[])).$am('formatPart',2048,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::StrBuf',false),new fan.sys.Param('t','sys::Obj',false),new fan.sys.Param('r','sys::Obj',false),new fan.sys.Param('b','sys::Obj',false),new fan.sys.Param('l','sys::Obj',false),new fan.sys.Param('f','|sys::Obj->sys::Str|',false)])).$am('toSize',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.BorderParser.$type.$af('str',73728,'sys::Str').$af('n',73728,'sys::Int').$af('tok',73728,'sys::Str?').$af('comma',73728,'sys::Bool').$af('top',73728,'sys::Obj?').$af('right',73728,'sys::Obj?').$af('bottom',73728,'sys::Obj?').$af('left',73728,'sys::Obj?').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false)])).$am('parseGroup',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('def','sys::Obj',false),new fan.sys.Param('f','|sys::Str->sys::Obj?|',false)])).$am('parse',2048,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Str->sys::Obj?|',false)])).$am('next',2048,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.Pattern.$type.$af('image',73730,'gfx::Image').$af('bg',73730,'gfx::Color?').$af('valign',73730,'gfx::Valign').$af('halign',73730,'gfx::Halign').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('image','gfx::Image',false),new fan.sys.Param('f','|sys::This->sys::Void|?',true)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.Color.$type.$af('black',106498,'gfx::Color').$af('white',106498,'gfx::Color').$af('red',106498,'gfx::Color').$af('green',106498,'gfx::Color').$af('blue',106498,'gfx::Color').$af('gray',106498,'gfx::Color').$af('darkGray',106498,'gfx::Color').$af('yellow',106498,'gfx::Color').$af('orange',106498,'gfx::Color').$af('purple',106498,'gfx::Color').$af('argb',73730,'sys::Int').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('argb','sys::Int',true),new fan.sys.Param('hasAlpha','sys::Bool',true)])).$am('makeArgb',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Int',false),new fan.sys.Param('r','sys::Int',false),new fan.sys.Param('g','sys::Int',false),new fan.sys.Param('b','sys::Int',false)])).$am('makeRgb',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Int',false),new fan.sys.Param('g','sys::Int',false),new fan.sys.Param('b','sys::Int',false)])).$am('makeHsv',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('h','sys::Float',false),new fan.sys.Param('s','sys::Float',false),new fan.sys.Param('v','sys::Float',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('rgb',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('a',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('r',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('g',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('b',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('h',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('s',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('v',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toCss',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('lighter',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('percentage','sys::Float',true)])).$am('darker',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('percentage','sys::Float',true)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.Halign.$type.$af('left',106506,'gfx::Halign').$af('center',106506,'gfx::Halign').$af('right',106506,'gfx::Halign').$af('fill',106506,'gfx::Halign').$af('repeat',106506,'gfx::Halign').$af('vals',106498,'gfx::Halign[]').$am('make',133124,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.Valign.$type.$af('top',106506,'gfx::Valign').$af('center',106506,'gfx::Valign').$af('bottom',106506,'gfx::Valign').$af('fill',106506,'gfx::Valign').$af('repeat',106506,'gfx::Valign').$af('vals',106498,'gfx::Valign[]').$am('make',133124,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.Orientation.$type.$af('horizontal',106506,'gfx::Orientation').$af('vertical',106506,'gfx::Orientation').$af('vals',106498,'gfx::Orientation[]').$am('make',133124,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.GradientMode.$type.$af('linear',106506,'gfx::GradientMode').$af('radial',106506,'gfx::GradientMode').$af('vals',106498,'gfx::GradientMode[]').$am('make',133124,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.Font.$type.$af('name',73730,'sys::Str').$af('size',73730,'sys::Int').$af('bold',73730,'sys::Bool').$af('italic',73730,'sys::Bool').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('makeFields',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('size','sys::Int',true),new fan.sys.Param('bold','sys::Bool',true),new fan.sys.Param('italic','sys::Bool',true)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toSize',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('size','sys::Int',false)])).$am('toPlain',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toBold',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toItalic',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('height',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('ascent',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('descent',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('leading',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('width',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)]));
  fan.gfx.Point.$type.$af('defVal',106498,'gfx::Point').$af('x',73730,'sys::Int').$af('y',73730,'sys::Int').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Int',false),new fan.sys.Param('y','sys::Int',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('translate',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','gfx::Point',false)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.Size.$type.$af('defVal',106498,'gfx::Size').$af('w',73730,'sys::Int').$af('h',73730,'sys::Int').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('w','sys::Int',false),new fan.sys.Param('h','sys::Int',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.Rect.$type.$af('defVal',106498,'gfx::Rect').$af('x',73730,'sys::Int').$af('y',73730,'sys::Int').$af('w',73730,'sys::Int').$af('h',73730,'sys::Int').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Int',false),new fan.sys.Param('y','sys::Int',false),new fan.sys.Param('w','sys::Int',false),new fan.sys.Param('h','sys::Int',false)])).$am('makePosSize',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('p','gfx::Point',false),new fan.sys.Param('s','gfx::Size',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('pos',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('size',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('contains',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Int',false),new fan.sys.Param('y','sys::Int',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.Insets.$type.$af('defVal',106498,'gfx::Insets').$af('top',73730,'sys::Int').$af('right',73730,'sys::Int').$af('bottom',73730,'sys::Int').$af('left',73730,'sys::Int').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('top','sys::Int',false),new fan.sys.Param('right','sys::Int?',true),new fan.sys.Param('bottom','sys::Int?',true),new fan.sys.Param('left','sys::Int?',true)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('toSize',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.Hints.$type.$af('defVal',106498,'gfx::Hints').$af('w',73730,'sys::Int?').$af('h',73730,'sys::Int?').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('w','sys::Int?',false),new fan.sys.Param('h','sys::Int?',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('plus',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('size','gfx::Size',false)])).$am('minus',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('size','gfx::Size',false)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.GfxEnv.$type.$am('cur',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('checked','sys::Bool',true)])).$am('imageSize',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('img','gfx::Image',false)])).$am('imageResize',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('img','gfx::Image',false),new fan.sys.Param('size','gfx::Size',false)])).$am('fontHeight',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','gfx::Font',false)])).$am('fontAscent',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','gfx::Font',false)])).$am('fontDescent',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','gfx::Font',false)])).$am('fontLeading',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','gfx::Font',false)])).$am('fontWidth',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','gfx::Font',false),new fan.sys.Param('s','sys::Str',false)])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.Gradient.$type.$af('percent',106498,'sys::Unit').$af('pixel',106498,'sys::Unit').$af('mode',73730,'gfx::GradientMode').$af('x1',73730,'sys::Int').$af('y1',73730,'sys::Int').$af('x2',73730,'sys::Int').$af('y2',73730,'sys::Int').$af('x1Unit',73730,'sys::Unit').$af('y1Unit',73730,'sys::Unit').$af('x2Unit',73730,'sys::Unit').$af('y2Unit',73730,'sys::Unit').$af('stops',73730,'gfx::GradientStop[]').$af('defStops',100354,'gfx::GradientStop[]').$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('makeStr',2052,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false)])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|?',true)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('loadUnit',34818,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('symbol','sys::Str',false)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.GradientStop.$type.$af('color',73730,'gfx::Color').$af('pos',73730,'sys::Float').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('color','gfx::Color',false),new fan.sys.Param('pos','sys::Float',false)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.Graphics.$type.$af('brush',270337,'gfx::Brush').$af('pen',270337,'gfx::Pen').$af('font',270337,'gfx::Font').$af('antialias',270337,'sys::Bool').$af('alpha',270337,'sys::Int').$am('drawLine',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x1','sys::Int',false),new fan.sys.Param('y1','sys::Int',false),new fan.sys.Param('x2','sys::Int',false),new fan.sys.Param('y2','sys::Int',false)])).$am('drawPolyline',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('p','gfx::Point[]',false)])).$am('drawPolygon',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('p','gfx::Point[]',false)])).$am('fillPolygon',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('p','gfx::Point[]',false)])).$am('drawRect',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Int',false),new fan.sys.Param('y','sys::Int',false),new fan.sys.Param('w','sys::Int',false),new fan.sys.Param('h','sys::Int',false)])).$am('fillRect',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Int',false),new fan.sys.Param('y','sys::Int',false),new fan.sys.Param('w','sys::Int',false),new fan.sys.Param('h','sys::Int',false)])).$am('drawOval',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Int',false),new fan.sys.Param('y','sys::Int',false),new fan.sys.Param('w','sys::Int',false),new fan.sys.Param('h','sys::Int',false)])).$am('fillOval',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Int',false),new fan.sys.Param('y','sys::Int',false),new fan.sys.Param('w','sys::Int',false),new fan.sys.Param('h','sys::Int',false)])).$am('drawArc',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Int',false),new fan.sys.Param('y','sys::Int',false),new fan.sys.Param('w','sys::Int',false),new fan.sys.Param('h','sys::Int',false),new fan.sys.Param('startAngle','sys::Int',false),new fan.sys.Param('arcAngle','sys::Int',false)])).$am('fillArc',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Int',false),new fan.sys.Param('y','sys::Int',false),new fan.sys.Param('w','sys::Int',false),new fan.sys.Param('h','sys::Int',false),new fan.sys.Param('startAngle','sys::Int',false),new fan.sys.Param('arcAngle','sys::Int',false)])).$am('drawText',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('x','sys::Int',false),new fan.sys.Param('y','sys::Int',false)])).$am('drawImage',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('image','gfx::Image',false),new fan.sys.Param('x','sys::Int',false),new fan.sys.Param('y','sys::Int',false)])).$am('copyImage',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('image','gfx::Image',false),new fan.sys.Param('src','gfx::Rect',false),new fan.sys.Param('dest','gfx::Rect',false)])).$am('translate',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Int',false),new fan.sys.Param('y','sys::Int',false)])).$am('clip',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','gfx::Rect',false)])).$am('push',270337,fan.sys.List.make(fan.sys.Param.$type,[])).$am('pop',270337,fan.sys.List.make(fan.sys.Param.$type,[])).$am('dispose',270337,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.Image.$type.$af('uri',73730,'sys::Uri').$af('file',73730,'sys::File?').$am('make',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('makeFile',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','sys::File',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('makeUri',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('f','|sys::This->sys::Void|?',true)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('size',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('resize',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('size','gfx::Size',false)]));
  fan.gfx.Pen.$type.$af('width',73730,'sys::Int').$af('cap',73730,'sys::Int').$af('capSquare',106498,'sys::Int').$af('capButt',106498,'sys::Int').$af('capRound',106498,'sys::Int').$af('join',73730,'sys::Int').$af('joinMiter',106498,'sys::Int').$af('joinBevel',106498,'sys::Int').$af('joinRound',106498,'sys::Int').$af('dash',73730,'sys::Int[]?').$af('defVal',106498,'gfx::Pen').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('capToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('joinToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.BorderTest.$type.$af('solid',73730,'sys::Int').$af('inset',73730,'sys::Int').$af('outset',73730,'sys::Int').$af('black',73730,'gfx::Color').$af('red',73730,'gfx::Color').$af('green',73730,'gfx::Color').$af('blue',73730,'gfx::Color').$am('test',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('verifyBorder',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('w','sys::Int[]',false),new fan.sys.Param('s','sys::Int[]',false),new fan.sys.Param('c','gfx::Color[]',false),new fan.sys.Param('r','sys::Int[]',false),new fan.sys.Param('normStr','sys::Str',false)])).$am('expand',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('list','sys::Obj[]',false)])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.ColorTest.$type.$am('testMake',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('verifyColor',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','gfx::Color',false),new fan.sys.Param('a','sys::Int',false),new fan.sys.Param('r','sys::Int',false),new fan.sys.Param('g','sys::Int',false),new fan.sys.Param('b','sys::Int',false),new fan.sys.Param('s','sys::Str',false)])).$am('testFromStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('testEquals',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('testToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('testToCss',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('testHsv',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('verifyHsv',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('rgb','sys::Int',false),new fan.sys.Param('h','sys::Float',false),new fan.sys.Param('s','sys::Float',false),new fan.sys.Param('v','sys::Float',false)])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.FontTest.$type.$am('testMake',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('verifyFont',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','gfx::Font',false),new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('size','sys::Int',false),new fan.sys.Param('bold','sys::Bool',false),new fan.sys.Param('italic','sys::Bool',false),new fan.sys.Param('str','sys::Str',false)])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.GeomTest.$type.$am('testPoint',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('testSize',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('testRect',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('testInsets',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('testHints',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('verifySer',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.GradientTest.$type.$af('abc',73730,'gfx::Color').$af('def',73730,'gfx::Color').$af('red',73730,'gfx::Color').$af('blue',73730,'gfx::Color').$am('test',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('verifyGradient',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('x1','sys::Str',false),new fan.sys.Param('y1','sys::Str',false),new fan.sys.Param('x2','sys::Str',false),new fan.sys.Param('y2','sys::Str',false),new fan.sys.Param('stops','sys::Obj[][]',false)])).$am('verifyIntUnit',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('v','sys::Int',false),new fan.sys.Param('u','sys::Unit',false),new fan.sys.Param('str','sys::Str',false)])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.ImageTest.$type.$am('test',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.gfx.PenTest.$type.$am('testMake',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('testDash',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('verifyPen',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('p','gfx::Pen',false),new fan.sys.Param('w','sys::Int',false),new fan.sys.Param('c','sys::Int',false),new fan.sys.Param('j','sys::Int',false),new fan.sys.Param('str','sys::Str',false)])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
}
fan.gfx.Border.static$init();
fan.gfx.Color.static$init();
fan.gfx.Halign.static$init();
fan.gfx.Valign.static$init();
fan.gfx.Orientation.static$init();
fan.gfx.GradientMode.static$init();
fan.gfx.Point.static$init();
fan.gfx.Size.static$init();
fan.gfx.Rect.static$init();
fan.gfx.Insets.static$init();
fan.gfx.Hints.static$init();
fan.gfx.Gradient.static$init();
fan.gfx.Pen.static$init();
