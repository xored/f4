fan.web = {};
fan.web.Cookie = fan.sys.Obj.$extend(fan.sys.Obj);
fan.web.Cookie.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
  this.m_path = "/";
  this.m_secure = false;
  return;
}
fan.web.Cookie.prototype.$typeof = function() { return fan.web.Cookie.$type; }
fan.web.Cookie.fromStr = function(s)
{
  var eq = fan.sys.Str.index(s,"=");
  if (eq == null)
  {
    throw fan.sys.ParseErr.make(s);
  }
  ;
  var name = fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(0,fan.sys.ObjUtil.coerce(eq,fan.sys.Int.$type),true)));
  var val = fan.sys.Str.trim(fan.sys.Str.getRange(s,fan.sys.Range.make(fan.sys.Int.plus(fan.sys.ObjUtil.coerce(eq,fan.sys.Int.$type),1),-1)));
  if ((fan.sys.ObjUtil.compareGE(fan.sys.Str.size(val),2) && fan.sys.ObjUtil.equals(fan.sys.Str.get(val,0),34) && fan.sys.ObjUtil.equals(fan.sys.Str.get(val,-1),34)))
  {
    val = fan.web.WebUtil.fromQuotedStr(val);
  }
  ;
  return fan.web.Cookie.make(name,val);
}
fan.web.Cookie.make = function(name,val,f)
{
  var self = new fan.web.Cookie();
  fan.web.Cookie.make$(self,name,val,f);
  return self;
}
fan.web.Cookie.make$ = function(self,name,val,f)
{
  if (f === undefined) f = null;
  var $this = self;
  ;
  if (f != null)
  {
    f.call(self);
  }
  ;
  self.m_name = name;
  self.m_val = val;
  if ((!fan.web.WebUtil.isToken(self.m_name) || fan.sys.ObjUtil.equals(fan.sys.Str.get(self.m_name,0),36)))
  {
    throw fan.sys.ArgErr.make(fan.sys.Str.plus("Cookie name has illegal chars: ",val));
  }
  ;
  if (!fan.sys.Str.all(self.m_val,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("c","sys::Int",false)]),
    fan.sys.Bool.$type,
    function(c)
    {
      return (fan.sys.ObjUtil.compareLE(32,c) && fan.sys.ObjUtil.compareLE(c,126) && fan.sys.ObjUtil.compareNE(c,59));
    })))
  {
    throw fan.sys.ArgErr.make(fan.sys.Str.plus("Cookie value has illegal chars: ",val));
  }
  ;
  if (fan.sys.ObjUtil.compareGE(fan.sys.Int.plus(fan.sys.Str.size(self.m_val),32),fan.web.WebUtil.m_maxTokenSize))
  {
    throw fan.sys.ArgErr.make("Cookie value too big");
  }
  ;
  return;
}
fan.web.Cookie.prototype.toStr = function()
{
  var s = fan.sys.StrBuf.make(64);
  s.add(this.m_name).add("=").add(fan.web.WebUtil.toQuotedStr(this.m_val));
  if (this.m_maxAge != null)
  {
    s.add(";Max-Age=").add(fan.sys.ObjUtil.coerce(this.m_maxAge.toSec(),fan.sys.Obj.$type.toNullable()));
    if (fan.sys.ObjUtil.compareLE(this.m_maxAge.ticks(),0))
    {
      s.add(";Expires=").add("Sat, 01 Jan 2000 00:00:00 GMT");
    }
    else
    {
      s.add(";Expires=").add(fan.sys.DateTime.nowUtc().plus(fan.sys.ObjUtil.coerce(this.m_maxAge,fan.sys.Duration.$type)).toHttpStr());
    }
    ;
  }
  ;
  if (this.m_domain != null)
  {
    s.add(";Domain=").add(this.m_domain);
  }
  ;
  if (this.m_path != null)
  {
    s.add(";Path=").add(this.m_path);
  }
  ;
  if (this.m_secure)
  {
    s.add(";Secure");
  }
  ;
  return s.toStr();
}
fan.web.Cookie.prototype.m_name = null;
fan.web.Cookie.prototype.m_val = null;
fan.web.Cookie.prototype.m_maxAge = null;
fan.web.Cookie.prototype.m_domain = null;
fan.web.Cookie.prototype.m_path = null;
fan.web.Cookie.prototype.m_secure = false;
fan.web.WebUtil = fan.sys.Obj.$extend(fan.sys.Obj);
fan.web.WebUtil.prototype.$ctor = function()
{
  fan.sys.Obj.prototype.$ctor.call(this);
  var $this = this;
}
fan.web.WebUtil.prototype.$typeof = function() { return fan.web.WebUtil.$type; }
fan.web.WebUtil.isToken = function(s)
{
  var $this = this;
  if (fan.sys.Str.isEmpty(s))
  {
    return false;
  }
  ;
  return fan.sys.Str.all(s,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("c","sys::Int",false)]),
    fan.sys.Bool.$type,
    function(c)
    {
      return (fan.sys.ObjUtil.compareLT(c,127) && fan.web.WebUtil.m_tokenChars.get(c));
    }));
}
fan.web.WebUtil.toQuotedStr = function(s)
{
  var $this = this;
  var buf = fan.sys.StrBuf.make();
  buf.addChar(34);
  fan.sys.Str.each(s,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("c","sys::Int",false)]),
    fan.sys.Void.$type,
    function(c)
    {
      if ((fan.sys.ObjUtil.compareLT(c,32) || fan.sys.ObjUtil.compareGT(c,126)))
      {
        throw fan.sys.ArgErr.make(fan.sys.Str.plus("Invalid quoted str chars: ",s));
      }
      ;
      if (fan.sys.ObjUtil.equals(c,34))
      {
        buf.addChar(92);
      }
      ;
      buf.addChar(c);
      return;
    }));
  buf.addChar(34);
  return buf.toStr();
}
fan.web.WebUtil.fromQuotedStr = function(s)
{
  if ((fan.sys.ObjUtil.compareLT(fan.sys.Str.size(s),2) || fan.sys.ObjUtil.compareNE(fan.sys.Str.get(s,0),34) || fan.sys.ObjUtil.compareNE(fan.sys.Str.get(s,-1),34)))
  {
    throw fan.sys.ArgErr.make(fan.sys.Str.plus("Not quoted str: ",s));
  }
  ;
  return fan.sys.Str.replace(fan.sys.Str.getRange(s,fan.sys.Range.make(1,-2)),"\\\"","\"");
}
fan.web.WebUtil.parseList = function(s)
{
  return fan.sys.Str.split(s,fan.sys.ObjUtil.coerce(44,fan.sys.Int.$type.toNullable()));
}
fan.web.WebUtil.parseHeaders = function($in)
{
  var headers = fan.sys.Map.fromLiteral([],[],fan.sys.Type.find("sys::Str"),fan.sys.Type.find("sys::Str"));
  headers.caseInsensitive$(true);
  var last = null;
  while (true)
  {
    var peek = $in.peek();
    if (fan.sys.ObjUtil.equals(peek,fan.web.WebUtil.m_CR))
    {
      break;
    }
    ;
    if ((fan.sys.Int.isSpace(fan.sys.ObjUtil.coerce(peek,fan.sys.Int.$type)) && last != null))
    {
      (function($this) { var $_u2 = headers; var $_u3 = fan.sys.ObjUtil.coerce(last,fan.sys.Str.$type); var $_u0 = fan.sys.Str.plus(headers.get(fan.sys.ObjUtil.coerce(last,fan.sys.Str.$type)),fan.sys.Str.plus(" ",fan.sys.Str.trim($in.readLine()))); $_u2.set($_u3,$_u0); return $_u0; })(this);
      continue;
    }
    ;
    var key = fan.sys.Str.trim(fan.web.WebUtil.token($in,58));
    var val = fan.sys.Str.trim(fan.web.WebUtil.token($in,fan.web.WebUtil.m_CR));
    if (fan.sys.ObjUtil.compareNE($in.read(),fan.web.WebUtil.m_LF))
    {
      throw fan.sys.ParseErr.make("Invalid CRLF line ending");
    }
    ;
    var dup = headers.get(key);
    if (dup == null)
    {
      headers.set(key,val);
    }
    else
    {
      headers.set(key,fan.sys.Str.plus(fan.sys.Str.plus(dup,","),val));
    }
    ;
    last = key;
  }
  ;
  if ((fan.sys.ObjUtil.compareNE($in.read(),fan.web.WebUtil.m_CR) || fan.sys.ObjUtil.compareNE($in.read(),fan.web.WebUtil.m_LF)))
  {
    throw fan.sys.ParseErr.make("Invalid CRLF headers ending");
  }
  ;
  return headers;
}
fan.web.WebUtil.token = function($in,sep)
{
  var $this = this;
  var tok = $in.readStrToken(fan.sys.ObjUtil.coerce(fan.web.WebUtil.m_maxTokenSize,fan.sys.Int.$type.toNullable()),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("ch","sys::Int",false)]),
    fan.sys.Bool.$type,
    function(ch)
    {
      return fan.sys.ObjUtil.equals(ch,sep);
    }));
  if (tok == null)
  {
    throw fan.sys.IOErr.make("Unexpected end of stream");
  }
  ;
  if (fan.sys.ObjUtil.compareGE(fan.sys.Str.size(tok),fan.web.WebUtil.m_maxTokenSize))
  {
    throw fan.sys.ParseErr.make("Token too big");
  }
  ;
  $in.read();
  return fan.sys.ObjUtil.coerce(tok,fan.sys.Str.$type);
}
fan.web.WebUtil.makeContentInStream = function(headers,$in)
{
  var $this = this;
  var cs = fan.sys.Charset.utf8();
  var ct = headers.get("Content-Type");
  if (ct != null)
  {
    cs = fan.sys.MimeType.fromStr(fan.sys.ObjUtil.coerce(ct,fan.sys.Str.$type)).charset();
  }
  ;
  var len = headers.get("Content-Length");
  if (len != null)
  {
    return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.web.WebUtil.makeFixedInStream($in,fan.sys.ObjUtil.coerce(fan.sys.Str.toInt(len),fan.sys.Int.$type)),fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::InStream",false)]),
      fan.sys.Void.$type,
      function(it)
      {
        it.charset$(cs);
        return;
      })),fan.sys.InStream.$type);
  }
  ;
  if (fan.sys.Str.contains(fan.sys.Str.lower(headers.get("Transfer-Encoding","")),"chunked"))
  {
    return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.web.WebUtil.makeChunkedInStream($in),fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::InStream",false)]),
      fan.sys.Void.$type,
      function(it)
      {
        it.charset$(cs);
        return;
      })),fan.sys.InStream.$type);
  }
  ;
  if (ct != null)
  {
    return $in;
  }
  ;
  return null;
}
fan.web.WebUtil.makeContentOutStream = function(headers,out)
{
  var $this = this;
  var cs = fan.sys.Charset.utf8();
  var ct = headers.get("Content-Type");
  if (ct != null)
  {
    cs = fan.sys.MimeType.fromStr(fan.sys.ObjUtil.coerce(ct,fan.sys.Str.$type)).charset();
  }
  ;
  var len = headers.get("Content-Length");
  if (len != null)
  {
    return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.web.WebUtil.makeFixedOutStream(out,fan.sys.ObjUtil.coerce(fan.sys.Str.toInt(len),fan.sys.Int.$type)),fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::OutStream",false)]),
      fan.sys.Void.$type,
      function(it)
      {
        it.charset$(cs);
        return;
      })),fan.sys.OutStream.$type);
  }
  ;
  if (ct != null)
  {
    headers.set("Transfer-Encoding","chunked");
    return fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.$with(fan.web.WebUtil.makeChunkedOutStream(out),fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","sys::OutStream",false)]),
      fan.sys.Void.$type,
      function(it)
      {
        it.charset$(cs);
        return;
      })),fan.sys.OutStream.$type);
  }
  ;
  return null;
}
fan.web.WebUtil.makeFixedInStream = function($in,fixed)
{
  return fan.web.ChunkInStream.make($in,fan.sys.ObjUtil.coerce(fixed,fan.sys.Int.$type.toNullable()));
}
fan.web.WebUtil.makeChunkedInStream = function($in)
{
  return fan.web.ChunkInStream.make($in,null);
}
fan.web.WebUtil.makeFixedOutStream = function(out,fixed)
{
  return fan.web.FixedOutStream.make(out,fixed);
}
fan.web.WebUtil.makeChunkedOutStream = function(out)
{
  return fan.web.ChunkOutStream.make(out);
}
fan.web.WebUtil.parseMultiPart = function($in,boundary,cb)
{
  boundary = fan.sys.Str.plus("--",boundary);
  var line = $in.readLine();
  if (fan.sys.ObjUtil.equals(line,fan.sys.Str.plus(boundary,"--")))
  {
    return;
  }
  ;
  if (fan.sys.ObjUtil.compareNE(line,boundary))
  {
    throw fan.sys.IOErr.make(fan.sys.Str.plus("Expecting boundry line ",fan.sys.Str.toCode(boundary)));
  }
  ;
  while (true)
  {
    var headers = fan.web.WebUtil.parseHeaders($in);
    var partIn = fan.web.MultiPartInStream.make($in,boundary);
    cb.call(headers,partIn);
    if (partIn.m_endOfParts)
    {
      break;
    }
    ;
  }
  ;
  return;
}
fan.web.WebUtil.jsMain = function(out,main,env)
{
  if (env === undefined) env = null;
  var $this = this;
  var envStr = fan.sys.StrBuf.make();
  if (fan.sys.ObjUtil.compareGT((function($this) { var $_u4 = env; if ($_u4 == null) return null; return $_u4.size(); })(this),0))
  {
    envStr.add("var env = fan.sys.Map.make(fan.sys.Str.\$type, fan.sys.Str.\$type);\n");
    envStr.add("env.caseInsensitive\$(true);\n");
    env.each(fan.sys.Func.make(
      fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("v","sys::Str",false),new fan.sys.Param("k","sys::Str",false)]),
      fan.sys.Void.$type,
      function(v,k)
      {
        envStr.add("  ");
        if (fan.sys.ObjUtil.equals(k,"sys.uriPodBase"))
        {
          envStr.add(fan.sys.Str.plus(fan.sys.Str.plus("fan.sys.UriPodBase = '",v),"';\n"));
        }
        else
        {
          envStr.add(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("env.set('",k),"', '"),v),"');\n"));
        }
        ;
        return;
      }));
    envStr.add("fan.sys.Env.cur().\$setVars(env);\n");
  }
  ;
  out.printLine(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus(fan.sys.Str.plus("<script type='text/javascript'>\n//<![CDATA[\nvar webJsMain_hasRun = false;\nvar doLoad = function()\n{\n  // safari appears to have a problem calling this event\n  // twice, so make sure we short-circuit if already run\n  if (webJsMain_hasRun) return;\n  webJsMain_hasRun = true;\n\n  // inject env vars\n  ",envStr.toStr()),"\n\n  // find main\n  var qname = '"),main),"';\n  var dot = qname.indexOf('.');\n  if (dot < 0) qname += '.main';\n  var main = fan.sys.Slot.findMethod(qname);\n\n  // invoke main\n  if (main.isStatic()) main.call();\n  else main.callOn(main.parent().make());\n}\nif (window.addEventListener)\n  window.addEventListener('load', doLoad, false);\nelse\n  window.attachEvent('onload', doLoad);\n//]]>\n</script>"));
  return;
}
fan.web.WebUtil.make = function()
{
  var self = new fan.web.WebUtil();
  fan.web.WebUtil.make$(self);
  return self;
}
fan.web.WebUtil.make$ = function(self)
{
  return;
}
fan.web.WebUtil.static$init = function()
{
  if (true)
  {
    var m = fan.sys.List.make(fan.sys.Bool.$type);
    for (var i = 0; fan.sys.ObjUtil.compareLT(i,127); i = fan.sys.Int.increment(i))
    {
      m.add(fan.sys.ObjUtil.coerce(fan.sys.ObjUtil.compareGT(i,32),fan.sys.Obj.$type.toNullable()));
    }
    ;
    m.set(40,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(41,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(60,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(62,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(64,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(44,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(59,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(58,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(92,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(34,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(47,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(91,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(93,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(63,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(61,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(123,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(125,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(32,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    m.set(9,fan.sys.ObjUtil.coerce(false,fan.sys.Obj.$type.toNullable()));
    fan.web.WebUtil.m_tokenChars = fan.sys.ObjUtil.coerce((function($this) { var $_u5 = m; if ($_u5 == null) return null; return fan.sys.ObjUtil.toImmutable($_u5); })(this),fan.sys.Type.find("sys::Bool[]"));
  }
  ;
  fan.web.WebUtil.m_CR = 13;
  fan.web.WebUtil.m_LF = 10;
  fan.web.WebUtil.m_HT = 9;
  fan.web.WebUtil.m_SP = 32;
  fan.web.WebUtil.m_maxTokenSize = 4096;
  return;
}
fan.web.WebUtil.m_tokenChars = null;
fan.web.WebUtil.m_CR = 0;
fan.web.WebUtil.m_LF = 0;
fan.web.WebUtil.m_HT = 0;
fan.web.WebUtil.m_SP = 0;
fan.web.WebUtil.m_maxTokenSize = 0;
fan.web.$pod = fan.sys.Pod.$add('web');
with (fan.web.$pod)
{
  fan.web.Cookie.$type = $at('Cookie','sys::Obj',[],8194);
  fan.web.WebUtil.$type = $at('WebUtil','sys::Obj',[],8192);
  fan.web.Cookie.$type.$af('name',73730,'sys::Str').$af('val',73730,'sys::Str').$af('maxAge',73730,'sys::Duration?').$af('domain',73730,'sys::Str?').$af('path',73730,'sys::Str?').$af('secure',73730,'sys::Bool').$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('val','sys::Str',false),new fan.sys.Param('f','|sys::This->sys::Void|?',true)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.web.WebUtil.$type.$af('tokenChars',100354,'sys::Bool[]').$af('CR',98434,'sys::Int').$af('LF',98434,'sys::Int').$af('HT',98434,'sys::Int').$af('SP',98434,'sys::Int').$af('maxTokenSize',98434,'sys::Int').$am('isToken',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('toQuotedStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('fromQuotedStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('parseList',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('parseHeaders',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$in','sys::InStream',false)])).$am('token',34818,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$in','sys::InStream',false),new fan.sys.Param('sep','sys::Int',false)])).$am('makeContentInStream',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('headers','[sys::Str:sys::Str]',false),new fan.sys.Param('$in','sys::InStream',false)])).$am('makeContentOutStream',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('headers','[sys::Str:sys::Str]',false),new fan.sys.Param('out','sys::OutStream',false)])).$am('makeFixedInStream',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$in','sys::InStream',false),new fan.sys.Param('fixed','sys::Int',false)])).$am('makeChunkedInStream',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$in','sys::InStream',false)])).$am('makeFixedOutStream',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',false),new fan.sys.Param('fixed','sys::Int',false)])).$am('makeChunkedOutStream',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',false)])).$am('parseMultiPart',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$in','sys::InStream',false),new fan.sys.Param('boundary','sys::Str',false),new fan.sys.Param('cb','|[sys::Str:sys::Str],sys::InStream->sys::Void|',false)])).$am('jsMain',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',false),new fan.sys.Param('main','sys::Str',false),new fan.sys.Param('env','[sys::Str:sys::Str]?',true)])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
}
fan.web.WebUtil.static$init();
