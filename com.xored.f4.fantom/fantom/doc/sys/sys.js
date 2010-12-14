var fan = {};
fan.sys = {};
fan.sys.Obj = function() {};
fan.sys.Obj.$init = {};
fan.sys.Obj.$extend = function(base)
{
function f()
{
if (arguments.length > 0 && arguments[0] === fan.sys.Obj.$init) return;
this.$ctor.apply(this, arguments);
}
f.prototype = new base(fan.sys.Obj.$init)
f.prototype.constructor = f;
return f;
}
fan.sys.Obj.prototype.$ctor = function() {}
fan.sys.Obj.prototype.make$ = function() {}
fan.sys.Obj.prototype.equals = function(that)
{
return this === that;
}
fan.sys.Obj.prototype.compare = function(that)
{
if (this < that) return -1;
if (this > that) return 1;
return 0;
}
fan.sys.Obj.prototype.$with = function(f)
{
f.call(this);
return this;
}
fan.sys.Obj.prototype.isImmutable = function()
{
return this.$typeof().isConst();
}
fan.sys.Obj.prototype.toImmutable = function()
{
if (this.$typeof().isConst()) return this;
throw fan.sys.NotImmutableErr.make(this.$typeof().toString());
}
fan.sys.Obj.prototype.$typeof = function()
{
return fan.sys.Obj.$type;
}
fan.sys.Obj.prototype.toStr = function()
{
return "" + this.$typeof();
}
fan.sys.Obj.prototype.toString = function()
{
return "" + this.toStr();
}
fan.sys.Obj.prototype.trap = function(name, args)
{
return fan.sys.ObjUtil.doTrap(this, name, args, this.$typeof());
}
fan.sys.Err = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Err.prototype.$ctor = function(msg, cause)
{
this.m_msg   = msg;
this.m_cause = cause;
this.m_stack = new Error().stack;
}
fan.sys.Err.make$ = function(self, msg, cause)
{
self.m_msg   = msg;
self.m_cause = cause;
self.m_stack = new Error().stack;
}
fan.sys.Err.prototype.cause = function()
{
return this.m_cause;
}
fan.sys.Err.prototype.$typeof = function()
{
return fan.sys.Err.$type;
}
fan.sys.Err.prototype.toStr = function()
{
return this.$typeof() + ": " + this.m_msg;
}
fan.sys.Err.prototype.msg = function()
{
return this.m_msg;
}
fan.sys.Err.prototype.trace = function()
{
fan.sys.ObjUtil.echo(this.traceToStr());
}
fan.sys.Err.prototype.traceToStr = function()
{
var s = this.$typeof() + ": " + this.m_msg;
if (this.m_stack != null) s += "\n" + fan.sys.Err.cleanTrace(this.m_stack);
if (this.m_cause != null) s += "\n  Caused by: " + this.m_cause.traceToStr();
return s;
}
fan.sys.Err.cleanTrace = function(orig)
{
var stack = [];
var lines = orig.split('\n');
for (var i=0; i<lines.length; i++)
{
var line = lines[i];
if (line.indexOf("@") != -1)
{
var about = line.lastIndexOf("@");
var slash = line.lastIndexOf("/");
if (slash != -1)
{
var func = "Unknown";
var sub = "  at " + func + " (" + line.substr(slash+1) + ")";
stack.push(sub);
}
}
else if (line.charAt(line.length-1) == ')')
{
var paren = line.lastIndexOf("(");
var slash = line.lastIndexOf("/");
var sub   = line.substring(0, paren+1) + line.substr(slash+1);
stack.push(sub);
}
else
{
stack.push(line)
}
}
return stack.join("\n") + "\n";
}
fan.sys.Err.make = function(err, cause)
{
if (err instanceof fan.sys.Err) return err;
if (err instanceof Error)
{
var m = err.message;
if (m.indexOf(" from null") != -1) return fan.sys.NullErr.make(m, cause);
return new fan.sys.Err(err.message, cause);
}
return new fan.sys.Err("" + err, cause);
}
fan.sys.ArgErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.ArgErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.ArgErr.prototype.$typeof = function() { return fan.sys.ArgErr.$type; }
fan.sys.ArgErr.make = function(msg, cause) { return new fan.sys.ArgErr(msg, cause); }
fan.sys.CancelledErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.CancelledErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.CancelledErr.prototype.$typeof = function() { return fan.sys.CancelledErr.$type; }
fan.sys.CancelledErr.make = function(msg, cause) { return new fan.sys.CancelledErr(msg, cause); }
fan.sys.CastErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.CastErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.CastErr.prototype.$typeof = function() { return fan.sys.CastErr.$type; }
fan.sys.CastErr.make = function(msg, cause) { return new fan.sys.CastErr(msg, cause); }
fan.sys.ConstErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.ConstErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.ConstErr.prototype.$typeof = function() { return fan.sys.ConstErr.$type; }
fan.sys.ConstErr.make = function(msg, cause) { return new fan.sys.ConstErr(msg, cause); }
fan.sys.FieldNotSetErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.FieldNotSetErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.FieldNotSetErr.prototype.$typeof = function() { return fan.sys.FieldNotSetErr.$type; }
fan.sys.FieldNotSetErr.make = function(msg, cause) { return new fan.sys.FieldNotSetErr(msg, cause); }
fan.sys.IndexErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.IndexErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.IndexErr.prototype.$typeof = function() { return fan.sys.IndexErr.$type; }
fan.sys.IndexErr.make = function(msg, cause) { return new fan.sys.IndexErr(msg, cause); }
fan.sys.InterruptedErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.InterruptedErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.InterruptedErr.prototype.$typeof = function() { return fan.sys.InterruptedErr.$type; }
fan.sys.InterruptedErr.make = function(msg, cause) { return new fan.sys.InterruptedErr(msg, cause); }
fan.sys.IOErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.IOErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.IOErr.prototype.$typeof = function() { return fan.sys.IOErr.$type; }
fan.sys.IOErr.make = function(msg, cause) { return new fan.sys.IOErr(msg, cause); }
fan.sys.NameErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.NameErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.NameErr.prototype.$typeof = function() { return fan.sys.NameErr.$type; }
fan.sys.NameErr.make = function(msg, cause) { return new fan.sys.NameErr(msg, cause); }
fan.sys.NotImmutableErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.NotImmutableErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.NotImmutableErr.prototype.$typeof = function() { return fan.sys.NotImmutableErr.$type; }
fan.sys.NotImmutableErr.make = function(msg, cause) { return new fan.sys.NotImmutableErr(msg, cause); }
fan.sys.NullErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.NullErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.NullErr.prototype.$typeof = function() { return fan.sys.NullErr.$type; }
fan.sys.NullErr.make = function(msg, cause) { return new fan.sys.NullErr(msg, cause); }
fan.sys.ParseErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.ParseErr.prototype.$ctor = function(type, val, more, cause)
{
var msg = type;
if (val != undefined)
{
msg = "Invalid " + type + ": '" + val + "'";
if (more != undefined) msg += ": " + more;
}
fan.sys.Err.prototype.$ctor.call(this, msg, cause)
}
fan.sys.ParseErr.prototype.$typeof = function() { return fan.sys.ParseErr.$type; }
fan.sys.ParseErr.make = function(type, val, more, cause) { return new fan.sys.ParseErr(type,val,more,cause); }
fan.sys.ReadonlyErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.ReadonlyErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.ReadonlyErr.prototype.$typeof = function() { return fan.sys.ReadonlyErr.$type; }
fan.sys.ReadonlyErr.make = function(msg, cause) { return new fan.sys.ReadonlyErr(msg, cause); }
fan.sys.TestErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.TestErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.TestErr.prototype.$typeof = function() { return fan.sys.TestErr.$type; }
fan.sys.TestErr.make = function(msg, cause) { return new fan.sys.TestErr(msg, cause); }
fan.sys.TimeoutErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.TimeoutErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.TimeoutErr.prototype.$typeof = function() { return fan.sys.TimeoutErr.$type; }
fan.sys.TimeoutErr.make = function(msg, cause) { return new fan.sys.TimeoutErr(msg, cause); }
fan.sys.UnknownPodErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.UnknownPodErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.UnknownPodErr.prototype.$typeof = function() { return fan.sys.UnknownPodErr.$type; }
fan.sys.UnknownPodErr.make = function(msg, cause) { return new fan.sys.UnknownPodErr(msg, cause); }
fan.sys.UnknownServiceErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.UnknownServiceErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.UnknownServiceErr.prototype.$typeof = function() { return fan.sys.UnknownServiceErr.$type; }
fan.sys.UnknownServiceErr.make = function(msg, cause) { return new fan.sys.UnknownServiceErr(msg, cause); }
fan.sys.UnknownSlotErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.UnknownSlotErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.UnknownSlotErr.prototype.$typeof = function() { return fan.sys.UnknownSlotErr.$type; }
fan.sys.UnknownSlotErr.make = function(msg, cause) { return new fan.sys.UnknownSlotErr(msg, cause); }
fan.sys.UnknownFacetErr= fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.UnknownFacetErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.UnknownFacetErr.prototype.$typeof = function() { return fan.sys.UnknownFacetErr.$type; }
fan.sys.UnknownFacetErr.make = function(msg, cause) { return new fan.sys.UnknownFacetErr(msg, cause); }
fan.sys.UnknownTypeErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.UnknownTypeErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.UnknownTypeErr.prototype.$typeof = function() { return fan.sys.UnknownTypeErr.$type; }
fan.sys.UnknownTypeErr.make = function(msg, cause) { return new fan.sys.UnknownTypeErr(msg, cause); }
fan.sys.UnresolvedErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.UnresolvedErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.UnresolvedErr.prototype.$typeof = function() { return fan.sys.UnresolvedErr.$type; }
fan.sys.UnresolvedErr.make = function(msg, cause) { return new fan.sys.UnresolvedErr(msg, cause); }
fan.sys.UnsupportedErr = fan.sys.Obj.$extend(fan.sys.Err);
fan.sys.UnsupportedErr.prototype.$ctor = function(msg, cause) { fan.sys.Err.prototype.$ctor.call(this, msg, cause); }
fan.sys.UnsupportedErr.prototype.$typeof = function() { return fan.sys.UnsupportedErr.$type; }
fan.sys.UnsupportedErr.make = function(msg, cause) { return new fan.sys.UnsupportedErr(msg, cause); }
fan.sys.Bool = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Bool.prototype.$ctor = function() {}
fan.sys.Bool.prototype.$typeof = function()
{
return fan.sys.Boo.$type;
}
fan.sys.Bool.not = function(self)    { return !self; }
fan.sys.Bool.and = function(self, b) { return self && b; }
fan.sys.Bool.or  = function(self, b) { return self || b; }
fan.sys.Bool.xor = function(self, b) { return self != b; }
fan.sys.Bool.fromStr = function(s, checked)
{
if (checked === undefined) checked = true;
if (s == "true") return true;
if (s == "false") return false;
if (!checked) return null;
throw fan.sys.ParseErr.make("Bool", s);
}
fan.sys.Bool.toStr  = function(self) { return self ? "true" : "false"; }
fan.sys.Bool.toCode = function(self) { return self ? "true" : "false"; }
fan.sys.Bool.toLocale = function(self)
{
var key = self ? "boolTrue" : "boolFalse";
return fan.sys.Env.cur().locale(fan.sys.Pod.find("sys"), key, fan.sys.Bool.toStr(self));
}
fan.sys.Buf = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Buf.prototype.$ctor = function() {}
fan.sys.Buf.make = function(capacity) { return new fan.sys.MemBuf(); }
fan.sys.Buf.prototype.equals = function(that)
{
return this == that;
}
fan.sys.Buf.prototype.toStr = function()
{
return this.$typeof().name() + "(pos=" + this.pos() + " size=" + this.size() + ")";
}
fan.sys.Buf.prototype.$typeof = function()
{
return fan.sys.Buf.$type;
}
fan.sys.Buf.prototype.isEmpty = function() { return this.size() == 0; }
fan.sys.Buf.prototype.capacity = function() { return fan.sys.Int.m_maxVal; }
fan.sys.Buf.prototype.remaining = function() { return this.size()-this.pos(); }
fan.sys.Buf.prototype.more = function() { return this.size()-this.pos() > 0; }
fan.sys.Buf.prototype.seek = function(pos)
{
var size = this.size();
if (pos < 0) pos = size + pos;
if (pos < 0 || pos > size) throw fan.sys.IndexErr.make(pos);
this.pos$(pos);
return this;
}
fan.sys.Buf.prototype.flip = function()
{
this.size(this.pos());
this.pos$(0);
return this;
}
fan.sys.Buf.prototype.get = function(pos)
{
var size = this.size();
if (pos < 0) pos = size + pos;
if (pos < 0 || pos >= size) throw fan.sys.IndexErr.make(pos);
return this.getByte(pos);
}
fan.sys.Buf.prototype.getRange = function(range)
{
var size = this.size();
var s = range.$start(size);
var e = range.$end(size);
var n = (e - s + 1);
if (n < 0) throw fan.sys.IndexErr.make(range);
var slice = [];
this.getBytes(s, slice, 0, n);
var result = new fan.sys.MemBuf(slice, n);
result.charset$(this.m_out.charset());
return result;
}
fan.sys.Buf.prototype.dup = function()
{
var size = this.size();
var copy = [];
this.getBytes(0, copy, 0, size);
var result = new MemBuf(copy, size);
result.charset$(this.m_out.charset());
return result;
}
fan.sys.Buf.prototype.set = function(pos, b)
{
var size = this.size();
if (pos < 0) pos = size + pos;
if (pos < 0 || pos >= size) throw fan.sys.IndexErr.make(pos);
this.setByte(pos, b);
return this;
}
fan.sys.Buf.prototype.trim = function()
{
return this;
}
fan.sys.Buf.prototype.clear = function()
{
this.pos$(0);
this.size$(0);
return this;
}
fan.sys.Buf.prototype.flush = function()
{
return this;
}
fan.sys.Buf.prototype.close = function()
{
return true;
}
fan.sys.Buf.prototype.charset = function()
{
return this.m_out.charset();
}
fan.sys.Buf.prototype.charset$ = function(charset)
{
this.m_out.charset$(charset);
this.m_in.charset$(charset);
}
fan.sys.Buf.prototype.fill = function(b, times)
{
if (this.capacity() < this.size()+times) this.capacity(this.size()+times);
for (var i=0; i<times; ++i) this.m_out.write(b);
return this;
}
fan.sys.Buf.prototype.out = function() { return this.m_out; }
fan.sys.Buf.prototype.write = function(b) { this.m_out.write(b); return this; }
fan.sys.Buf.prototype.writeBuf = function(other, n) { this.m_out.writeBuf(other, n); return this; }
fan.sys.Buf.prototype.writeI2 = function(x) { this.m_out.writeI2(x); return this; }
fan.sys.Buf.prototype.writeI4 = function(x) { this.m_out.writeI4(x); return this; }
fan.sys.Buf.prototype.writeI8 = function(x) { this.m_out.writeI8(x); return this; }
fan.sys.Buf.prototype.writeF4 = function(x) { this.m_out.writeF4(x); return this; }
fan.sys.Buf.prototype.writeF8 = function(x) { this.m_out.writeF8(x); return this; }
fan.sys.Buf.prototype.writeDecimal = function(x) { this.m_out.writeDecimal(x); return this; }
fan.sys.Buf.prototype.writeBool = function(x) { this.m_out.writeBool(x); return this; }
fan.sys.Buf.prototype.writeUtf = function(x) { this.m_out.writeUtf(x); return this; }
fan.sys.Buf.prototype.writeChar = function(c) { this.m_out.writeChar(c); return this; }
fan.sys.Buf.prototype.writeChars = function(s, off, len) { this.m_out.writeChars(s, off, len); return this; }
fan.sys.Buf.prototype.print = function(obj) { this.m_out.print(obj); return this; }
fan.sys.Buf.prototype.printLine = function(obj) { this.m_out.printLine(obj); return this; }
fan.sys.Buf.prototype.writeObj = function(obj, opt) { this.m_out.writeObj(obj, opt); return this; }
fan.sys.Buf.prototype.writeXml = function(s, flags) { this.m_out.writeXml(s, flags); return this; }
fan.sys.Buf.prototype.$in = function() { return this.m_in; }
fan.sys.Buf.prototype.read = function() {  return this.m_in.read(); }
fan.sys.Buf.prototype.readBuf = function(other, n) { return this.m_in.readBuf(other, n); }
fan.sys.Buf.prototype.unread = function(n) { this.m_in.unread(n); return this; }
fan.sys.Buf.prototype.readBufFully = function(buf, n) { return this.m_in.readBufFully(buf, n); }
fan.sys.Buf.prototype.readAllBuf = function() { return this.m_in.readAllBuf(); }
fan.sys.Buf.prototype.peek = function() { return this.m_in.peek(); }
fan.sys.Buf.prototype.readU1 = function() { return this.m_in.readU1(); }
fan.sys.Buf.prototype.readS1 = function() { return this.m_in.readS1(); }
fan.sys.Buf.prototype.readU2 = function() { return this.m_in.readU2(); }
fan.sys.Buf.prototype.readS2 = function() { return this.m_in.readS2(); }
fan.sys.Buf.prototype.readU4 = function() { return this.m_in.readU4(); }
fan.sys.Buf.prototype.readS4 = function() { return this.m_in.readS4(); }
fan.sys.Buf.prototype.readS8 = function() { return this.m_in.readS8(); }
fan.sys.Buf.prototype.readF4 = function() { return this.m_in.readF4(); }
fan.sys.Buf.prototype.readF8 = function() { return this.m_in.readF8(); }
fan.sys.Buf.prototype.readDecimal = function() { return this.m_in.readDecimal(); }
fan.sys.Buf.prototype.readBool = function() { return this.m_in.readBool(); }
fan.sys.Buf.prototype.readUtf = function() { return this.m_in.readUtf(); }
fan.sys.Buf.prototype.readChar = function() { return this.m_in.readChar(); }
fan.sys.Buf.prototype.unreadChar = function(c) { this.m_in.unreadChar(c); return this; }
fan.sys.Buf.prototype.peekChar = function() { return this.m_in.peekChar(); }
fan.sys.Buf.prototype.readChars = function(n) { return this.m_in.readChars(n); }
fan.sys.Buf.prototype.readLine = function(max) { return this.m_in.readLine(max); }
fan.sys.Buf.prototype.readStrToken = function(max, f) { return this.m_in.readStrToken(max, f); }
fan.sys.Buf.prototype.readAllLines = function() { return this.m_in.readAllLines(); }
fan.sys.Buf.prototype.eachLine = function(f) { this.m_in.eachLine(f); }
fan.sys.Buf.prototype.readAllStr = function(normNewlines) { return this.m_in.readAllStr(normNewlines); }
fan.sys.Buf.prototype.readObj = function(opt) { return this.m_in.readObj(opt); }
fan.sys.Buf.prototype.readProps = function() { return this.m_in.readProps(); }
fan.sys.Buf.prototype.writeProps = function(props, close) { return this.m_out.writeProps(props, close); }
fan.sys.Buf.fromHex = function(s)
{
var slen = s.length;
var buf = [];
var hexInv = fan.sys.Buf.hexInv;
var size = 0;
for (var i=0; i<slen; ++i)
{
var c0 = s.charCodeAt(i);
var n0 = c0 < 128 ? hexInv[c0] : -1;
if (n0 < 0) continue;
var n1 = -1;
if (++i < slen)
{
var c1 = s.charCodeAt(i);
n1 = c1 < 128 ? hexInv[c1] : -1;
}
if (n1 < 0) throw fan.sys.IOErr.make("Invalid hex str");
buf[size++] = (n0 << 4) | n1;
}
return fan.sys.MemBuf.makeBytes(buf);
}
fan.sys.Buf.hexChars = [
48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102];
fan.sys.Buf.hexInv = [];
for (var i=0; i<128; ++i) fan.sys.Buf.hexInv[i] = -1;
for (var i=0; i<10; ++i)  fan.sys.Buf.hexInv[48+i] = i;
for (var i=10; i<16; ++i) fan.sys.Buf.hexInv[97+i-10] = fan.sys.Buf.hexInv[65+i-10] = i;
fan.sys.Buf.prototype.toBase64 = function()
{
throw fan.sys.UnsupportedErr.make(this.$typeof()+".toBase64");
}
fan.sys.Buf.fromBase64 = function(s)
{
var slen = s.length;
var si = 0;
var max = slen * 6 / 8;
var buf = [];
var size = 0;
while (si < slen)
{
var n = 0;
var v = 0;
for (var j=0; j<4 && si<slen;)
{
var ch = s.charCodeAt(si++);
var c = ch < 128 ? fan.sys.Buf.base64inv[ch] : -1;
if (c >= 0)
{
n |= c << (18 - j++ * 6);
if (ch != 61 ) v++;
}
}
if (v > 1) buf.push(n >> 16);
if (v > 2) buf.push(n >> 8);
if (v > 3) buf.push(n);
}
return fan.sys.MemBuf.makeBytes(buf);
}
fan.sys.Buf.base64chars = [
65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,
97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,
48,49,50,51,52,53,54,55,56,57,43,47];
fan.sys.Buf.base64inv = [];
for (var i=0; i<128; ++i) fan.sys.Buf.base64inv[i] = -1;
for (var i=0; i<fan.sys.Buf.base64chars.length; ++i)
fan.sys.Buf.base64inv[fan.sys.Buf.base64chars[i]] = i;
fan.sys.Buf.base64inv[61] = 0;
fan.sys.MemBuf = fan.sys.Obj.$extend(fan.sys.Buf);
fan.sys.MemBuf.prototype.$ctor = function(buf, size)
{
this.m_buf  = (buf  !== undefined) ? buf  : [];
this.m_size = (size !== undefined) ? size : 0;
this.m_pos  = 0;
this.m_out  = new fan.sys.MemBufOutStream(this);
this.m_in   = new fan.sys.MemBufInStream(this);
}
fan.sys.MemBuf.makeBytes = function(bytes)
{
var buf = new fan.sys.MemBuf();
buf.m_buf = bytes;
buf.m_size = bytes.length;
return buf;
}
fan.sys.MemBuf.prototype.$typeof = function() { return fan.sys.MemBuf.$type; }
fan.sys.MemBuf.prototype.size = function() { return this.m_size; }
fan.sys.MemBuf.prototype.size$ = function(x) { this.m_size = x; }
fan.sys.MemBuf.prototype.pos = function() { return this.m_pos; }
fan.sys.MemBuf.prototype.pos$ = function(x) { this.m_pos = x; }
fan.sys.MemBuf.prototype.getByte = function(pos)
{
return this.m_buf[pos] & 0xFF;
}
fan.sys.MemBuf.prototype.setByte = function(pos, x)
{
this.m_buf[pos] = x & 0xFF;
}
fan.sys.MemBuf.prototype.getBytes = function(pos, dest, off, len)
{
return this.m_buf.slice(pos, pos+len);
}
fan.sys.MemBuf.prototype.pipeTo = function(dst, len)
{
if (this.m_pos+len > this.m_size) throw fan.sys.IOErr.make("Not enough bytes to write");
var byteArray = this.cpMemToJavaBuffer(len)
dst.write(byteArray, 0, len);
this.m_pos += len;
}
fan.sys.MemBuf.prototype.pipeFrom = function(src, len)
{
var byteArray = new java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, len);
var read = src.read(byteArray, 0, len);
if (read < 0) return -1;
this.cpJavaBufferToMem(byteArray, read);
this.m_pos += read;
this.m_size = this.m_pos;
return read;
}
fan.sys.MemBuf.prototype.cpMemToJavaBuffer = function(len)
{
var bytes = new java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, len);
for (var i=0; i<len; ++i)
{
var b = this.m_buf[this.m_pos+i];
if (b > 127) b |= 0xFFFFFF00;
bytes[i] = b;
}
return bytes;
}
fan.sys.MemBuf.prototype.cpJavaBufferToMem = function(bytes, len)
{
for (var i=0; i<len; ++i)
this.m_buf[this.m_pos+i] = bytes[i] & 0xFF;
}
fan.sys.MemBuf.prototype.capacity = function()
{
return this.m_buf.length;
}
fan.sys.MemBuf.prototype.trim = function()
{
if (this.m_size == this.m_buf.length) return this;
this.m_buf = this.m_buf.slice(0, size);
return this;
}
fan.sys.MemBuf.prototype.toHex = function()
{
var buf = this.m_buf;
var size = this.m_size;
var hexChars = fan.sys.Buf.hexChars;
var s = '';
for (var i=0; i<size; ++i)
{
var b = buf[i] & 0xff;
s += String.fromCharCode(hexChars[b>>4])
s += String.fromCharCode(hexChars[b&0xf]);
}
return s;
}
fan.sys.MemBuf.prototype.toBase64 = function()
{
var buf = this.m_buf;
var size = this.m_size;
var s = '';
var base64chars = fan.sys.Buf.base64chars;
var i = 0;
var end = size-2;
for (; i<end; i += 3)
{
var n = ((buf[i] & 0xff) << 16) + ((buf[i+1] & 0xff) << 8) + (buf[i+2] & 0xff);
s += String.fromCharCode(base64chars[(n >>> 18) & 0x3f]);
s += String.fromCharCode(base64chars[(n >>> 12) & 0x3f]);
s += String.fromCharCode(base64chars[(n >>> 6) & 0x3f]);
s += String.fromCharCode(base64chars[n & 0x3f]);
}
var rem = size - i;
if (rem > 0)
{
var n = ((buf[i] & 0xff) << 10) | (rem == 2 ? ((buf[size-1] & 0xff) << 2) : 0);
s += String.fromCharCode(base64chars[(n >>> 12) & 0x3f]);
s += String.fromCharCode(base64chars[(n >>> 6) & 0x3f]);
s += rem == 2 ? String.fromCharCode(base64chars[n & 0x3f]) : '=';
s += '=';
}
return s;
}
fan.sys.MemBuf.prototype.toDigest = function(algorithm)
{
var digest = null;
switch (algorithm)
{
case "MD5":   digest = fan.sys.Buf_Md5(this.m_buf);  break;
case "SHA1":
case "SHA-1": digest = fan.sys.Buf_Sha1(this.m_buf); break;
default: throw fan.sys.Err.make("Unknown digest algorithm " + algorithm);
}
return fan.sys.MemBuf.makeBytes(digest);
}
fan.sys.MemBuf.prototype.hmac = function(algorithm, keyBuf)
{
var digest = null;
switch (algorithm)
{
case "MD5":   digest = fan.sys.Buf_Md5(this.m_buf, keyBuf.m_buf);  break;
case "SHA1":
case "SHA-1": digest = fan.sys.Buf_Sha1(this.m_buf, keyBuf.m_buf); break;
default: throw fan.sys.Err.make("Unknown digest algorithm " + algorithm);
}
return fan.sys.MemBuf.makeBytes(digest);
}
fan.sys.Charset = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Charset.prototype.$ctor = function(name, encoder)
{
this.m_name = name;
this.m_encoder = encoder;
}
fan.sys.Charset.prototype.$typeof = function() { return fan.sys.Charset.$type; }
fan.sys.Charset.utf16BE = function()
{
return new fan.sys.Charset("UTF-16BE", new fan.sys.Charset.Encoder(
fan.sys.Charset.Utf16BEEncoder.encodeOut,
fan.sys.Charset.Utf16BEEncoder.encodeIn,
fan.sys.Charset.Utf16BEEncoder.decode));
}
fan.sys.Charset.utf16LE = function()
{
return new fan.sys.Charset("UTF-16LE", new fan.sys.Charset.Encoder(
fan.sys.Charset.Utf16LEEncoder.encodeOut,
fan.sys.Charset.Utf16LEEncoder.encodeIn,
fan.sys.Charset.Utf16LEEncoder.decode));
}
fan.sys.Charset.utf8 = function()
{
return new fan.sys.Charset("UTF-8", new fan.sys.Charset.Encoder(
fan.sys.Charset.Utf8Encoder.encodeOut,
fan.sys.Charset.Utf8Encoder.encodeIn,
fan.sys.Charset.Utf8Encoder.decode));
}
fan.sys.Charset.iso8851_1 = function()
{
return new fan.sys.Charset("ISO-8859-1", new fan.sys.Charset.Encoder(
fan.sys.Charset.Iso8859_1Encoder.encodeOut,
fan.sys.Charset.Iso8859_1Encoder.encodeIn,
fan.sys.Charset.Iso8859_1Encoder.decode));
}
fan.sys.Charset.iso8851_2 = function()
{
return new fan.sys.Charset("ISO-8859-2", new fan.sys.Charset.Iso8859Encoder(
fan.sys.Charset.Iso8859Encoder.iso2_u2i,
fan.sys.Charset.Iso8859Encoder.iso2_i2u
));
}
fan.sys.Charset.iso8851_5 = function()
{
return new fan.sys.Charset("ISO-8859-5", new fan.sys.Charset.Iso8859Encoder(
fan.sys.Charset.Iso8859Encoder.iso5_u2i,
fan.sys.Charset.Iso8859Encoder.iso5_i2u
));
}
fan.sys.Charset.iso8851_8 = function()
{
return new fan.sys.Charset("ISO-8859-8", new fan.sys.Charset.Iso8859Encoder(
fan.sys.Charset.Iso8859Encoder.iso8_u2i,
fan.sys.Charset.Iso8859Encoder.iso8_i2u
));
}
fan.sys.Charset.fromStr = function(name, checked)
{
if (checked === undefined) checked = true;
var nname = name.toUpperCase();
try
{
switch(nname)
{
case "UTF-8":      return fan.sys.Charset.utf8();
case "UTF-16BE":   return fan.sys.Charset.utf16BE();
case "UTF-16LE":   return fan.sys.Charset.utf16LE();
case "ISO-8859-1": return fan.sys.Charset.iso8851_1();
case "ISO-8859-2": return fan.sys.Charset.iso8851_2();
case "ISO-8859-5": return fan.sys.Charset.iso8851_5();
case "ISO-8859-8": return fan.sys.Charset.iso8851_8();
default: throw new Error();
}
}
catch (err)
{
if (!checked) return null;
throw fan.sys.ParseErr.make("Unsupported charset '" + nname + "'");
}
}
fan.sys.Charset.defVal = function() { return fan.sys.Charset.utf8(); }
fan.sys.Charset.prototype.name = function() { return this.m_name; }
fan.sys.Charset.prototype.hash = function() { return 0; }
fan.sys.Charset.prototype.equals = function(that)
{
if (that instanceof fan.sys.Charset)
{
return this.m_name == that.m_name;
}
return false;
}
fan.sys.Charset.prototype.toStr = function() { return this.name(); }
fan.sys.Charset.Encoder = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Charset.Encoder.prototype.$ctor = function(encodeOut, encodeIn, decode)
{
this.m_encodeOut = encodeOut;
this.m_encodeIn = encodeIn;
this.m_decode = decode;
}
fan.sys.Charset.Encoder.prototype.encodeOut = function(c, outStream) { this.m_encodeOut(c, outStream); }
fan.sys.Charset.Encoder.prototype.encodeIn = function(c, inStream) { this.m_encodeIn(c, inStream); }
fan.sys.Charset.Encoder.prototype.decode = function(inStream) { return this.m_decode(inStream); }
fan.sys.Charset.Utf8Encoder = fan.sys.Obj.$extend(fan.sys.Charset.Encoder);
fan.sys.Charset.Utf8Encoder.encodeOut = function(c, outStream)
{
if (c <= 0x007F)
{
outStream.write(c);
}
else if (c > 0x07FF)
{
outStream.write(0xE0 | ((c >>> 12) & 0x0F))
.write(0x80 | ((c >>>  6) & 0x3F))
.write(0x80 | ((c >>>  0) & 0x3F));
}
else
{
outStream.write(0xC0 | ((c >>>  6) & 0x1F))
.write(0x80 | ((c >>>  0) & 0x3F));
}
}
fan.sys.Charset.Utf8Encoder.encodeIn = function(c, inStream)
{
if (c <= 0x007F)
{
inStream.unread(c);
}
else if (c > 0x07FF)
{
inStream.unread(0x80 | ((c >>  0) & 0x3F))
.unread(0x80 | ((c >>  6) & 0x3F))
.unread(0xE0 | ((c >> 12) & 0x0F));
}
else
{
inStream.unread(0x80 | ((c >>  0) & 0x3F))
.unread(0xC0 | ((c >>  6) & 0x1F));
}
}
fan.sys.Charset.Utf8Encoder.decode = function(inStream)
{
var c = inStream.read();
if (c == null) return -1;
var c2, c3;
switch (c >>> 4)
{
case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
return c;
case 12: case 13:
c2 = inStream.read();
if ((c2 & 0xC0) != 0x80)
throw fan.sys.IOErr.make("Invalid UTF-8 encoding");
return ((c & 0x1F) << 6) | (c2 & 0x3F);
case 14:
c2 = inStream.read();
c3 = inStream.read();
if (((c2 & 0xC0) != 0x80) || ((c3 & 0xC0) != 0x80))
throw fan.sys.IOErr.make("Invalid UTF-8 encoding");
return (((c & 0x0F) << 12) | ((c2 & 0x3F) << 6) | ((c3 & 0x3F) << 0));
default:
throw fan.sys.IOErr.make("Invalid UTF-8 encoding");
}
}
fan.sys.Charset.Utf16BEEncoder = fan.sys.Obj.$extend(fan.sys.Charset.Encoder);
fan.sys.Charset.Utf16BEEncoder.encodeOut = function(c, outStream)
{
outStream.write((c >>> 8) & 0xFF).write((c >>> 0) & 0xFF);
}
fan.sys.Charset.Utf16BEEncoder.encodeIn = function(c, inStream)
{
inStream.unread((c >>> 0) & 0xFF).unread((c >>> 8) & 0xFF);
}
fan.sys.Charset.Utf16BEEncoder.decode = function(inStream)
{
var c1 = inStream.read();
var c2 = inStream.read();
if (c1 == null || c2 == null) return -1;
return ((c1 << 8) | c2);
}
fan.sys.Charset.Utf16LEEncoder = fan.sys.Obj.$extend(fan.sys.Charset.Encoder);
fan.sys.Charset.Utf16LEEncoder.encodeOut = function(c, outStream)
{
outStream.write((c >>> 0) & 0xFF).write((c >>> 8) & 0xFF);
}
fan.sys.Charset.Utf16LEEncoder.encodeIn = function(c, inStream)
{
inStream.unread((c >>> 8) & 0xFF).unread((c >>> 0) & 0xFF);
}
fan.sys.Charset.Utf16LEEncoder.decode = function(inStream)
{
var c1 = inStream.read();
var c2 = inStream.read();
if (c1 == null || c2 == null) return -1;
return (c1 | (c2 << 8));
}
fan.sys.Charset.Iso8859_1Encoder = fan.sys.Obj.$extend(fan.sys.Charset.Encoder);
fan.sys.Charset.Iso8859_1Encoder.encodeOut = function(c, outStream)
{
if (c > 0xFF) throw fan.sys.IOErr.make("Invalid ISO-8859-1 char");
outStream.write((c >>> 0) & 0xFF);
}
fan.sys.Charset.Iso8859_1Encoder.encodeIn = function(c, inStream)
{
inStream.unread((c >>> 0) & 0xFF);
}
fan.sys.Charset.Iso8859_1Encoder.decode = function(inStream)
{
var c = inStream.read();
if (c == null) return -1;
return (c & 0xFF);
}
fan.sys.Charset.Iso8859Encoder = fan.sys.Obj.$extend(fan.sys.Charset.Encoder);
fan.sys.Charset.Iso8859Encoder.prototype.$ctor = function(u2i, i2u)
{
this.m_encodeOut = fan.sys.Charset.Iso8859Encoder.encodeOut;
this.m_encodeIn = fan.sys.Charset.Iso8859Encoder.encodeIn;
this.m_decode = fan.sys.Charset.Iso8859Encoder.decode;
this.m_u2i = u2i;
this.m_i2u = i2u;
}
fan.sys.Charset.Iso8859Encoder.prototype.encodeOut = function(c, outStream)
{
this.m_encodeOut(this.m_u2i(c), outStream);
}
fan.sys.Charset.Iso8859Encoder.prototype.encodeIn = function(c, inStream)
{
this.m_encodeIn(this.m_u2i(c), inStream);
}
fan.sys.Charset.Iso8859Encoder.prototype.decode = function(inStream)
{
var c = this.m_decode(inStream);
if (c == -1) return -1;
return this.m_i2u(c);
}
fan.sys.Charset.Iso8859Encoder.encodeOut = function(c, outStream)
{
if (c > 0xFF) throw fan.sys.IOErr.make("Invalid ISO-8859 char");
outStream.write(c);
}
fan.sys.Charset.Iso8859Encoder.encodeIn = function(c, inStream)
{
inStream.unread(c);
}
fan.sys.Charset.Iso8859Encoder.decode = function(inStream)
{
var c = inStream.read();
if (c == null) return -1;
return c & 0xFF;
}
fan.sys.Charset.Iso8859Encoder.iso2_i2u = function(c)
{
switch(c)
{
case 0xA1: return 0x0104; case 0xA2: return 0x02D8; case 0xA3: return 0x0141;
case 0xA5: return 0x013D; case 0xA6: return 0x015A; case 0xA9: return 0x0160;
case 0xAA: return 0x015E; case 0xAB: return 0x0164; case 0xAC: return 0x0179;
case 0xAE: return 0x017D; case 0xAF: return 0x017B; case 0xB1: return 0x0105;
case 0xB2: return 0x02DB; case 0xB3: return 0x0142; case 0xB5: return 0x013E;
case 0xB6: return 0x015B; case 0xB7: return 0x02C7; case 0xB9: return 0x0161;
case 0xBA: return 0x015F; case 0xBB: return 0x0165; case 0xBC: return 0x017A;
case 0xBD: return 0x02DD; case 0xBE: return 0x017E; case 0xBF: return 0x017C;
case 0xC0: return 0x0154; case 0xC3: return 0x0102; case 0xC5: return 0x0139;
case 0xC6: return 0x0106; case 0xC8: return 0x010C; case 0xCA: return 0x0118;
case 0xCC: return 0x011A; case 0xCF: return 0x010E; case 0xD0: return 0x0110;
case 0xD1: return 0x0143; case 0xD2: return 0x0147; case 0xD5: return 0x0150;
case 0xD8: return 0x0158; case 0xD9: return 0x016E; case 0xDB: return 0x0170;
case 0xDE: return 0x0162; case 0xDF: return 0x00DF; case 0xE0: return 0x0155;
case 0xE3: return 0x0103; case 0xE5: return 0x013A; case 0xE6: return 0x0107;
case 0xE8: return 0x010D; case 0xEA: return 0x0119; case 0xEC: return 0x011B;
case 0xEF: return 0x010F; case 0xF0: return 0x0111; case 0xF1: return 0x0144;
case 0xF2: return 0x0148; case 0xF5: return 0x0151; case 0xF8: return 0x0159;
case 0xF9: return 0x016F; case 0xFB: return 0x0171; case 0xFE: return 0x0163;
case 0xFF: return 0x02D9;
default: return c;
}
}
fan.sys.Charset.Iso8859Encoder.iso2_u2i = function(c)
{
switch(c)
{
case 0x0104: return 0xA1; case 0x02D8: return 0xA2; case 0x0141: return 0xA3;
case 0x013D: return 0xA5; case 0x015A: return 0xA6; case 0x0160: return 0xA9;
case 0x015E: return 0xAA; case 0x0164: return 0xAB; case 0x0179: return 0xAC;
case 0x017D: return 0xAE; case 0x017B: return 0xAF; case 0x0105: return 0xB1;
case 0x02DB: return 0xB2; case 0x0142: return 0xB3; case 0x013E: return 0xB5;
case 0x015B: return 0xB6; case 0x02C7: return 0xB7; case 0x0161: return 0xB9;
case 0x015F: return 0xBA; case 0x0165: return 0xBB; case 0x017A: return 0xBC;
case 0x02DD: return 0xBD; case 0x017E: return 0xBE; case 0x017C: return 0xBF;
case 0x0154: return 0xC0; case 0x0102: return 0xC3; case 0x0139: return 0xC5;
case 0x0106: return 0xC6; case 0x010C: return 0xC8; case 0x0118: return 0xCA;
case 0x011A: return 0xCC; case 0x010E: return 0xCF; case 0x0110: return 0xD0;
case 0x0143: return 0xD1; case 0x0147: return 0xD2; case 0x0150: return 0xD5;
case 0x0158: return 0xD8; case 0x016E: return 0xD9; case 0x0170: return 0xDB;
case 0x0162: return 0xDE; case 0x00DF: return 0xDF; case 0x0155: return 0xE0;
case 0x0103: return 0xE3; case 0x013A: return 0xE5; case 0x0107: return 0xE6;
case 0x010D: return 0xE8; case 0x0119: return 0xEA; case 0x011B: return 0xEC;
case 0x010F: return 0xEF; case 0x0111: return 0xF0; case 0x0144: return 0xF1;
case 0x0148: return 0xF2; case 0x0151: return 0xF5; case 0x0159: return 0xF8;
case 0x016F: return 0xF9; case 0x0171: return 0xFB; case 0x0163: return 0xFE;
case 0x02D9: return 0xFF;
default: return (c >>> 0) & 0xFF;
}
}
fan.sys.Charset.Iso8859Encoder.iso5_i2u = function(c)
{
switch(c)
{
case 0xA1: return 0x0401; case 0xA2: return 0x0402; case 0xA3: return 0x0403;
case 0xA4: return 0x0404; case 0xA5: return 0x0405; case 0xA6: return 0x0406;
case 0xA7: return 0x0407; case 0xA8: return 0x0408; case 0xA9: return 0x0409;
case 0xAA: return 0x040A; case 0xAB: return 0x040B; case 0xAC: return 0x040C;
case 0xAE: return 0x040E; case 0xAF: return 0x040F; case 0xB0: return 0x0410;
case 0xB1: return 0x0411; case 0xB2: return 0x0412; case 0xB3: return 0x0413;
case 0xB4: return 0x0414; case 0xB5: return 0x0415; case 0xB6: return 0x0416;
case 0xB7: return 0x0417; case 0xB8: return 0x0418; case 0xB9: return 0x0419;
case 0xBA: return 0x041A; case 0xBB: return 0x041B; case 0xBC: return 0x041C;
case 0xBD: return 0x041D; case 0xBE: return 0x041E; case 0xBF: return 0x041F;
case 0xC0: return 0x0420; case 0xC1: return 0x0421; case 0xC2: return 0x0422;
case 0xC3: return 0x0423; case 0xC4: return 0x0424; case 0xC5: return 0x0425;
case 0xC6: return 0x0426; case 0xC7: return 0x0427; case 0xC8: return 0x0428;
case 0xC9: return 0x0429; case 0xCA: return 0x042A; case 0xCB: return 0x042B;
case 0xCC: return 0x042C; case 0xCD: return 0x042D; case 0xCE: return 0x042E;
case 0xCF: return 0x042F; case 0xD0: return 0x0430; case 0xD1: return 0x0431;
case 0xD2: return 0x0432; case 0xD3: return 0x0433; case 0xD4: return 0x0434;
case 0xD5: return 0x0435; case 0xD6: return 0x0436; case 0xD7: return 0x0437;
case 0xD8: return 0x0438; case 0xD9: return 0x0439; case 0xDA: return 0x043A;
case 0xDB: return 0x043B; case 0xDC: return 0x043C; case 0xDD: return 0x043D;
case 0xDE: return 0x043E; case 0xDF: return 0x043F; case 0xE0: return 0x0440;
case 0xE1: return 0x0441; case 0xE2: return 0x0442; case 0xE3: return 0x0443;
case 0xE4: return 0x0444; case 0xE5: return 0x0445; case 0xE6: return 0x0446;
case 0xE7: return 0x0447; case 0xE8: return 0x0448; case 0xE9: return 0x0449;
case 0xEA: return 0x044A; case 0xEB: return 0x044B; case 0xEC: return 0x044C;
case 0xED: return 0x044D; case 0xEE: return 0x044E; case 0xEF: return 0x044F;
case 0xF0: return 0x2116; case 0xF1: return 0x0451; case 0xF2: return 0x0452;
case 0xF3: return 0x0453; case 0xF4: return 0x0454; case 0xF5: return 0x0455;
case 0xF6: return 0x0456; case 0xF7: return 0x0457; case 0xF8: return 0x0458;
case 0xF9: return 0x0459; case 0xFA: return 0x045A; case 0xFB: return 0x045B;
case 0xFC: return 0x045C; case 0xFD: return 0x00A7; case 0xFE: return 0x045E;
case 0xFF: return 0x045F;
default: return c;
}
}
fan.sys.Charset.Iso8859Encoder.iso5_u2i = function(c)
{
switch(c)
{
case 0x0401: return 0xA1; case 0x0402: return 0xA2; case 0x0403: return 0xA3;
case 0x0404: return 0xA4; case 0x0405: return 0xA5; case 0x0406: return 0xA6;
case 0x0407: return 0xA7; case 0x0408: return 0xA8; case 0x0409: return 0xA9;
case 0x040A: return 0xAA; case 0x040B: return 0xAB; case 0x040C: return 0xAC;
case 0x040E: return 0xAE; case 0x040F: return 0xAF; case 0x0410: return 0xB0;
case 0x0411: return 0xB1; case 0x0412: return 0xB2; case 0x0413: return 0xB3;
case 0x0414: return 0xB4; case 0x0415: return 0xB5; case 0x0416: return 0xB6;
case 0x0417: return 0xB7; case 0x0418: return 0xB8; case 0x0419: return 0xB9;
case 0x041A: return 0xBA; case 0x041B: return 0xBB; case 0x041C: return 0xBC;
case 0x041D: return 0xBD; case 0x041E: return 0xBE; case 0x041F: return 0xBF;
case 0x0420: return 0xC0; case 0x0421: return 0xC1; case 0x0422: return 0xC2;
case 0x0423: return 0xC3; case 0x0424: return 0xC4; case 0x0425: return 0xC5;
case 0x0426: return 0xC6; case 0x0427: return 0xC7; case 0x0428: return 0xC8;
case 0x0429: return 0xC9; case 0x042A: return 0xCA; case 0x042B: return 0xCB;
case 0x042C: return 0xCC; case 0x042D: return 0xCD; case 0x042E: return 0xCE;
case 0x042F: return 0xCF; case 0x0430: return 0xD0; case 0x0431: return 0xD1;
case 0x0432: return 0xD2; case 0x0433: return 0xD3; case 0x0434: return 0xD4;
case 0x0435: return 0xD5; case 0x0436: return 0xD6; case 0x0437: return 0xD7;
case 0x0438: return 0xD8; case 0x0439: return 0xD9; case 0x043A: return 0xDA;
case 0x043B: return 0xDB; case 0x043C: return 0xDC; case 0x043D: return 0xDD;
case 0x043E: return 0xDE; case 0x043F: return 0xDF; case 0x0440: return 0xE0;
case 0x0441: return 0xE1; case 0x0442: return 0xE2; case 0x0443: return 0xE3;
case 0x0444: return 0xE4; case 0x0445: return 0xE5; case 0x0446: return 0xE6;
case 0x0447: return 0xE7; case 0x0448: return 0xE8; case 0x0449: return 0xE9;
case 0x044A: return 0xEA; case 0x044B: return 0xEB; case 0x044C: return 0xEC;
case 0x044D: return 0xED; case 0x044E: return 0xEE; case 0x044F: return 0xEF;
case 0x2116: return 0xF0; case 0x0451: return 0xF1; case 0x0452: return 0xF2;
case 0x0453: return 0xF3; case 0x0454: return 0xF4; case 0x0455: return 0xF5;
case 0x0456: return 0xF6; case 0x0457: return 0xF7; case 0x0458: return 0xF8;
case 0x0459: return 0xF9; case 0x045A: return 0xFA; case 0x045B: return 0xFB;
case 0x045C: return 0xFC; case 0x00A7: return 0xFD; case 0x045E: return 0xFE;
case 0x045F: return 0xFF;
default: return (c >>> 0) & 0xFF;
}
}
fan.sys.Charset.Iso8859Encoder.iso8_i2u = function(c)
{
switch(c)
{
case 0xAA: return 0x00D7; case 0xBA: return 0x00F7; case 0xDF: return 0x2017;
case 0xE0: return 0x05D0; case 0xE1: return 0x05D1; case 0xE2: return 0x05D2;
case 0xE3: return 0x05D3; case 0xE4: return 0x05D4; case 0xE5: return 0x05D5;
case 0xE6: return 0x05D6; case 0xE7: return 0x05D7; case 0xE8: return 0x05D8;
case 0xE9: return 0x05D9; case 0xEA: return 0x05DA; case 0xEB: return 0x05DB;
case 0xEC: return 0x05DC; case 0xED: return 0x05DD; case 0xEE: return 0x05DE;
case 0xEF: return 0x05DF; case 0xF0: return 0x05E0; case 0xF1: return 0x05E1;
case 0xF2: return 0x05E2; case 0xF3: return 0x05E3; case 0xF4: return 0x05E4;
case 0xF5: return 0x05E5; case 0xF6: return 0x05E6; case 0xF7: return 0x05E7;
case 0xF8: return 0x05E8; case 0xF9: return 0x05E9; case 0xFA: return 0x05EA;
case 0xFD: return 0x200E; case 0xFE: return 0x200F;
default: return c;
}
}
fan.sys.Charset.Iso8859Encoder.iso8_u2i = function(c)
{
switch(c)
{
case 0x00D7: return 0xAA; case 0x00F7: return 0xBA; case 0x2017: return 0xDF;
case 0x05D0: return 0xE0; case 0x05D1: return 0xE1; case 0x05D2: return 0xE2;
case 0x05D3: return 0xE3; case 0x05D4: return 0xE4; case 0x05D5: return 0xE5;
case 0x05D6: return 0xE6; case 0x05D7: return 0xE7; case 0x05D8: return 0xE8;
case 0x05D9: return 0xE9; case 0x05DA: return 0xEA; case 0x05DB: return 0xEB;
case 0x05DC: return 0xEC; case 0x05DD: return 0xED; case 0x05DE: return 0xEE;
case 0x05DF: return 0xEF; case 0x05E0: return 0xF0; case 0x05E1: return 0xF1;
case 0x05E2: return 0xF2; case 0x05E3: return 0xF3; case 0x05E4: return 0xF4;
case 0x05E5: return 0xF5; case 0x05E6: return 0xF6; case 0x05E7: return 0xF7;
case 0x05E8: return 0xF8; case 0x05E9: return 0xF9; case 0x05EA: return 0xFA;
case 0x200E: return 0xFD; case 0x200F: return 0xFE;
default: return (c >>> 0) & 0xFF;
}
}
fan.sys.Date = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Date.prototype.$ctor = function(year, month, day)
{
this.m_year = year;
this.m_month = month;
this.m_day = day;
}
fan.sys.Date.prototype.equals = function(that)
{
if (that instanceof fan.sys.Date)
{
return this.m_year.valueOf() == that.m_year.valueOf() &&
this.m_month.valueOf() == that.m_month.valueOf() &&
this.m_day.valueOf() == that.m_day.valueOf();
}
return false;
}
fan.sys.Date.prototype.compare = function(that)
{
if (this.m_year.valueOf() == that.m_year.valueOf())
{
if (this.m_month.valueOf() == that.m_month.valueOf())
{
if (this.m_day.valueOf() == that.m_day.valueOf()) return 0;
return this.m_day < that.m_day ? -1 : +1;
}
return this.m_month < that.m_month ? -1 : +1;
}
return this.m_year < that.m_year ? -1 : +1;
}
fan.sys.Date.prototype.$typeof = function()
{
return fan.sys.Date.$type;
}
fan.sys.Date.prototype.toIso = function()
{
return this.toStr();
}
fan.sys.Date.prototype.toLocale = function(pattern)
{
var s = "" + this.m_day + "-";
switch (this.m_month)
{
case 0:  s += "Jan"; break;
case 1:  s += "Feb"; break;
case 2:  s += "Mar"; break;
case 3:  s += "Apr"; break;
case 4:  s += "May"; break;
case 5:  s += "Jun"; break;
case 6:  s += "Jul"; break;
case 7:  s += "Aug"; break;
case 8:  s += "Sep"; break;
case 9:  s += "Oct"; break;
case 10: s += "Nov"; break;
case 11: s += "Dec"; break;
}
s += "-" + this.m_year;
return s;
}
fan.sys.Date.prototype.toStr = function()
{
var y = this.m_year;
var m = this.m_month+1;
var d = this.m_day;
return y + "-" + (m < 10 ? "0"+m : m) + "-" + (d < 10 ? "0"+d : d);
}
fan.sys.Date.prototype.year  = function() { return this.m_year; }
fan.sys.Date.prototype.month = function() { return fan.sys.Month.m_vals.get(this.m_month); }
fan.sys.Date.prototype.day   = function() { return this.m_day; }
fan.sys.Date.prototype.weekday = function()
{
var weekday = (fan.sys.DateTime.firstWeekday(this.m_year, this.m_month) + this.m_day - 1) % 7;
return fan.sys.Weekday.m_vals.get(weekday);
}
fan.sys.Date.prototype.dayOfYear = function()
{
return fan.sys.DateTime.dayOfYear(this.year(), this.m_month, this.day()+1);
}
fan.sys.Date.prototype.plus = function(d)
{
var ticks = d.m_ticks;
if (ticks % fan.sys.Duration.nsPerDay != 0)
throw fan.sys.ArgErr.make("Duration must be even num of days");
var year = this.m_year;
var month = this.m_month;
var day = this.m_day;
var numDays = fan.sys.Int.div(ticks, fan.sys.Duration.nsPerDay);
var dayIncr = numDays < 0 ? +1 : -1;
while (numDays != 0)
{
if (numDays > 0)
{
day++;
if (day > this.numDays(year, month))
{
day = 1;
month++;
if (month >= 12) { month = 0; year++; }
}
numDays--;
}
else
{
day--;
if (day <= 0)
{
month--;
if (month < 0) { month = 11; year--; }
day = this.numDays(year, month);
}
numDays++;
}
}
return new fan.sys.Date(year, month, day);
}
fan.sys.Date.prototype.minus = function(d)
{
return this.plus(d.negate());
}
fan.sys.Date.prototype.minusDate = function(that)
{
if (this.equals(that)) return fan.sys.Duration.m_defVal;
var a = this;
var b = that;
if (a.compare(b) > 0) { b = this; a = that; }
var days = 0;
if (a.m_year == b.m_year)
{
days = b.dayOfYear() - a.dayOfYear();
}
else
{
days = (fan.sys.DateTime.isLeapYear(a.m_year) ? 366 : 365) - a.dayOfYear();
days += b.dayOfYear();
for (var i=a.m_year+1; i<b.m_year; ++i)
days += fan.sys.DateTime.isLeapYear(i) ? 366 : 365;
}
if (a == this) days = -days;
return fan.sys.Duration.make(days * fan.sys.Duration.nsPerDay);
}
fan.sys.Date.prototype.numDays = function(year, mon)
{
if (fan.sys.DateTime.isLeapYear(year))
return fan.sys.DateTime.daysInMonLeap[mon];
else
return fan.sys.DateTime.daysInMon[mon];
}
fan.sys.Date.prototype.firstOfMonth = function()
{
if (this.m_day == 1) return this;
return new fan.sys.Date(this.m_year, this.m_month, 1);
}
fan.sys.Date.prototype.lastOfMonth = function()
{
var last = this.month().numDays(this.m_year);
if (this.m_day == last) return this;
return new fan.sys.Date(this.m_year, this.m_month, last);
}
fan.sys.Date.make = function(year, month, day)
{
return new fan.sys.Date(year, month.m_ordinal, day);
}
fan.sys.Date.today = function()
{
var d = new Date();
return new fan.sys.Date(d.getFullYear(), d.getMonth(), d.getDate());
}
fan.sys.Date.fromStr = function(s, checked)
{
try
{
var num = function(x, index) { return x.charCodeAt(index) - 48; }
var year  = num(s, 0)*1000 + num(s, 1)*100 + num(s, 2)*10 + num(s, 3);
var month = num(s, 5)*10   + num(s, 6) - 1;
var day   = num(s, 8)*10   + num(s, 9);
if (s.charAt(4) != '-' || s.charAt(7) != '-' || s.length != 10)
throw new Error();
return new fan.sys.Date(year, month, day);
}
catch (err)
{
if (checked != null && !checked) return null;
throw fan.sys.ParseErr.make("Date", s);
}
}
fan.sys.Date.fromIso = function(s, checked)
{
return fan.sys.Date.fromStr(s, checked);
}
fan.sys.Date.prototype.isYesterday = function() { return this.equals(fan.sys.Date.today().plus(fan.sys.Duration.m_negOneDay)); }
fan.sys.Date.prototype.isToday     = function() { return this.equals(fan.sys.Date.today()); }
fan.sys.Date.prototype.isTomorrow  = function() { return this.equals(fan.sys.Date.today().plus(fan.sys.Duration.m_oneDay)); }
fan.sys.Date.prototype.toDateTime = function(t, tz)
{
if (tz === undefined) tz = fan.sys.TimeZone.cur();
return fan.sys.DateTime.makeDT(this, t, tz);
}
fan.sys.Date.prototype.midnight = function(tz)
{
if (tz === undefined) tz = fan.sys.TimeZone.cur();
return fan.sys.DateTime.makeDT(this, fan.sys.Time.m_defVal, tz);
}
fan.sys.Date.prototype.toCode = function()
{
if (this.equals(fan.sys.Date.m_defVal)) return "Date.defVal";
return "Date(\"" + this.toString() + "\")";
}
fan.sys.DateTime = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.DateTime.diffJs     = 946684800000;
fan.sys.DateTime.nsPerYear  = 365*24*60*60*1000000000;
fan.sys.DateTime.nsPerDay   = 24*60*60*1000000000;
fan.sys.DateTime.nsPerHour  = 60*60*1000000000;
fan.sys.DateTime.nsPerMin   = 60*1000000000;
fan.sys.DateTime.nsPerSec   = 1000000000;
fan.sys.DateTime.nsPerMilli = 1000000;
fan.sys.DateTime.minTicks   = -3124137600000000000;
fan.sys.DateTime.maxTicks   = 3155760000000000000;
fan.sys.DateTime.now = function(tolerance)
{
if (tolerance === undefined)
{
if (fan.sys.DateTime.toleranceDefault == null)
fan.sys.DateTime.toleranceDefault = fan.sys.Duration.makeMillis(250);
tolerance = fan.sys.DateTime.toleranceDefault;
}
var now = fan.sys.DateTime.nowTicks();
if (fan.sys.DateTime.cached == null)
fan.sys.DateTime.cached = fan.sys.DateTime.makeTicks(0, fan.sys.TimeZone.cur());
var c = fan.sys.DateTime.cached;
if (tolerance != null && now - c.m_ticks <= tolerance.m_ticks)
return c;
fan.sys.DateTime.cached = fan.sys.DateTime.makeTicks(now, fan.sys.TimeZone.cur());
return fan.sys.DateTime.cached;
}
fan.sys.DateTime.nowUtc = function(tolerance)
{
if (tolerance === undefined)
{
if (fan.sys.DateTime.toleranceDefault == null)
fan.sys.DateTime.toleranceDefault = fan.sys.Duration.makeMillis(250);
tolerance = fan.sys.DateTime.toleranceDefault;
}
var now = fan.sys.DateTime.nowTicks();
if (fan.sys.DateTime.cachedUtc == null)
fan.sys.DateTime.cachedUtc = fan.sys.DateTime.makeTicks(0, fan.sys.TimeZone.utc());
var c = fan.sys.DateTime.cachedUtc;
if (tolerance != null && now - c.m_ticks <= tolerance.m_ticks)
return c;
fan.sys.DateTime.cachedUtc = fan.sys.DateTime.makeTicks(now, fan.sys.TimeZone.utc());
return fan.sys.DateTime.cachedUtc;
}
fan.sys.DateTime.nowTicks = function()
{
return (new Date().getTime() - fan.sys.DateTime.diffJs) * fan.sys.DateTime.nsPerMilli
}
fan.sys.DateTime.boot = function()
{
return fan.sys.DateTime.m_boot;
}
fan.sys.DateTime.prototype.$ctor = function() {}
fan.sys.DateTime.make = function(year, month, day, hour, min, sec, ns, tz)
{
if (sec === undefined) sec = 0;
if (ns  === undefined) ns = 0;
if (tz  === undefined) tz = fan.sys.TimeZone.cur();
month = month.ordinal();
if (year < 1901 || year > 2099) throw fan.sys.ArgErr.make("year " + year);
if (month < 0 || month > 11)    throw fan.sys.ArgErr.make("month " + month);
if (day < 1 || day > fan.sys.DateTime.numDaysInMonth(year, month)) throw fan.sys.ArgErr.make("day " + day);
if (hour < 0 || hour > 23)      throw fan.sys.ArgErr.make("hour " + hour);
if (min < 0 || min > 59)        throw fan.sys.ArgErr.make("min " + min);
if (sec < 0 || sec > 59)        throw fan.sys.ArgErr.make("sec " + sec);
if (ns < 0 || ns > 999999999)   throw fan.sys.ArgErr.make("ns " + ns);
var dayOfYear = fan.sys.DateTime.dayOfYear(year, month, day);
var timeInSec = hour*3600 + min*60 + sec;
var ticks = fan.sys.Int.plus(fan.sys.DateTime.yearTicks[year-1900],
fan.sys.Int.plus(dayOfYear * fan.sys.DateTime.nsPerDay,
fan.sys.Int.plus(timeInSec * fan.sys.DateTime.nsPerSec, ns)));
var rule = tz.rule(year);
var dst;
ticks -= rule.offset * fan.sys.DateTime.nsPerSec;
var dstOffset = fan.sys.TimeZone.dstOffset(rule, year, month, day, timeInSec);
if (dstOffset != 0) ticks -= dstOffset * fan.sys.DateTime.nsPerSec;
dst = dstOffset != 0;
var weekday = (fan.sys.DateTime.firstWeekday(year, month) + day - 1) % 7;
var fields = 0;
fields |= ((year-1900) & 0xff) << 0;
fields |= (month & 0xf) << 8;
fields |= (day & 0x1f)  << 12;
fields |= (hour & 0x1f) << 17;
fields |= (min  & 0x3f) << 22;
fields |= (weekday & 0x7) << 28;
fields |= (dst ? 1 : 0) << 31;
var instance = new fan.sys.DateTime();
instance.m_ticks = ticks;
instance.m_ns    = ns;
instance.m_tz    = tz;
instance.m_fields   = fields;
return instance;
}
fan.sys.DateTime.makeDT = function(d, t, tz)
{
if (tz === undefined) tz = fan.sys.TimeZone.cur();
return fan.sys.DateTime.make(
d.year(), d.month(), d.day(),
t.hour(), t.min(), t.sec(), t.nanoSec(), tz);
}
fan.sys.DateTime.makeTicks = function(ticks, tz)
{
if (tz === undefined) tz = fan.sys.TimeZone.cur();
if (ticks < fan.sys.DateTime.minTicks || ticks >= fan.sys.DateTime.maxTicks)
throw fan.sys.ArgErr.make("Ticks out of range 1901 to 2099");
var instance = new fan.sys.DateTime();
instance.m_ticks = ticks;
instance.m_tz    = tz;
var year = fan.sys.DateTime.ticksToYear(ticks);
var rule = tz.rule(year);
ticks += rule.offset * fan.sys.DateTime.nsPerSec;
var month = 0, day = 0, dstOffset = 0;
var rem;
while (true)
{
year = fan.sys.DateTime.ticksToYear(ticks);
rem = ticks - fan.sys.DateTime.yearTicks[year-1900];
if (rem < 0) rem += fan.sys.DateTime.nsPerYear;
var dayOfYear = fan.sys.Int.div(rem, fan.sys.DateTime.nsPerDay);
rem %= fan.sys.DateTime.nsPerDay;
if (fan.sys.DateTime.isLeapYear(year))
{
month = fan.sys.DateTime.monForDayOfYearLeap[dayOfYear];
day   = fan.sys.DateTime.dayForDayOfYearLeap[dayOfYear];
}
else
{
month = fan.sys.DateTime.monForDayOfYear[dayOfYear];
day   = fan.sys.DateTime.dayForDayOfYear[dayOfYear];
}
if (dstOffset == fan.sys.Int.m_maxVal) { dstOffset = 0; break; }
if (dstOffset != 0)
{
if (rule.isWallTime() && fan.sys.TimeZone.dstOffset(rule, year, month, day, fan.sys.Int.div(rem, fan.sys.DateTime.nsPerSec)) == 0)
{
ticks -= dstOffset * fan.sys.DateTime.nsPerSec;
dstOffset = fan.sys.Int.m_maxVal;
continue;
}
break;
}
dstOffset = fan.sys.TimeZone.dstOffset(rule, year, month, day, fan.sys.Int.div(rem, fan.sys.DateTime.nsPerSec));
if (dstOffset == 0) break;
ticks += dstOffset * fan.sys.DateTime.nsPerSec;
}
var hour = fan.sys.Int.div(rem, fan.sys.DateTime.nsPerHour);  rem %= fan.sys.DateTime.nsPerHour;
var min  = fan.sys.Int.div(rem, fan.sys.DateTime.nsPerMin);   rem %= fan.sys.DateTime.nsPerMin;
var weekday = (fan.sys.DateTime.firstWeekday(year, month) + day - 1) % 7;
var rem = ticks >= 0 ? ticks : ticks - fan.sys.DateTime.yearTicks[0];
instance.m_ns = rem % fan.sys.DateTime.nsPerSec;
var fields = 0;
fields |= ((year-1900) & 0xff) << 0;
fields |= (month & 0xf) << 8;
fields |= (day & 0x1f)  << 12;
fields |= (hour & 0x1f) << 17;
fields |= (min  & 0x3f) << 22;
fields |= (weekday & 0x7) << 28;
fields |= (dstOffset != 0 ? 1 : 0) << 31;
instance.m_fields = fields;
return instance;
}
fan.sys.DateTime.fromStr = function(s, checked, iso)
{
if (checked === undefined) checked = true;
if (iso === undefined) iso = false;
try
{
var num = function(s, index) { return s.charCodeAt(index) - 48; }
var year  = num(s, 0)*1000 + num(s, 1)*100 + num(s, 2)*10 + num(s, 3);
var month = num(s, 5)*10   + num(s, 6) - 1;
var day   = num(s, 8)*10   + num(s, 9);
var hour  = num(s, 11)*10  + num(s, 12);
var min   = num(s, 14)*10  + num(s, 15);
var sec   = num(s, 17)*10  + num(s, 18);
if (s.charAt(4)  != '-' || s.charAt(7)  != '-' ||
s.charAt(10) != 'T' || s.charAt(13) != ':' ||
s.charAt(16) != ':')
throw new Error();
var i = 19;
var ns = 0;
var tenth = 100000000;
if (s.charAt(i) == '.')
{
++i;
while (true)
{
var c = s.charCodeAt(i);
if (c < 48 || c > 57) break;
ns += (c - 48) * tenth;
tenth /= 10;
++i;
}
}
var offset = 0;
var c = s.charAt(i++);
if (c != 'Z')
{
var offHour = num(s, i++)*10 + num(s, i++);
if (s.charAt(i++) != ':') throw new Error();
var offMin  = num(s, i++)*10 + num(s, i++);
offset = offHour*3600 + offMin*60;
if (c == '-') offset = -offset;
else if (c != '+') throw new Error();
}
var tz;
if (iso)
{
if (i < s.length) throw new Error();
if (offset == 0)
tz = fan.sys.TimeZone.utc();
else
tz = fan.sys.TimeZone.fromStr("GMT" + (offset < 0 ? "+" : "-") + Math.abs(offset)/3600);
}
else
{
if (s.charAt(i++) != ' ') throw new Error();
tz = fan.sys.TimeZone.fromStr(s.substring(i), true);
}
var instance = fan.sys.DateTime.make(year, fan.sys.Month.m_vals.get(month), day, hour, min, sec, ns, tz);
return instance;
}
catch (err)
{
if (!checked) return null;
throw fan.sys.ParseErr.make("DateTime", s);
}
}
fan.sys.DateTime.prototype.equals = function(obj)
{
if (obj instanceof fan.sys.DateTime)
{
return this.m_ticks == obj.m_ticks;
}
return false;
}
fan.sys.DateTime.prototype.hash = function()
{
return this.m_ticks;
}
fan.sys.DateTime.prototype.compare = function(obj)
{
var that = obj.m_ticks;
if (this.m_ticks < that) return -1; return this.m_ticks  == that ? 0 : +1;
}
fan.sys.DateTime.prototype.$typeof = function()
{
return fan.sys.DateTime.$type;
}
fan.sys.DateTime.prototype.ticks = function() { return this.m_ticks; }
fan.sys.DateTime.prototype.date = function() { return fan.sys.Date.make(this.year(), this.month(), this.day()); }
fan.sys.DateTime.prototype.time = function() { return fan.sys.Time.make(this.hour(), this.min(), this.sec(), this.nanoSec()); }
fan.sys.DateTime.prototype.year = function() { return (this.m_fields & 0xff) + 1900; }
fan.sys.DateTime.prototype.month = function() { return fan.sys.Month.m_vals.get((this.m_fields >> 8) & 0xf); }
fan.sys.DateTime.prototype.day = function() { return (this.m_fields >> 12) & 0x1f; }
fan.sys.DateTime.prototype.hour = function() { return (this.m_fields >> 17) & 0x1f; }
fan.sys.DateTime.prototype.min = function() { return (this.m_fields >> 22) & 0x3f; }
fan.sys.DateTime.prototype.sec = function()
{
var rem = this.m_ticks >= 0 ? this.m_ticks : this.m_ticks - fan.sys.DateTime.yearTicks[0];
return fan.sys.Int.div((rem % fan.sys.DateTime.nsPerMin),  fan.sys.DateTime.nsPerSec);
}
fan.sys.DateTime.prototype.nanoSec = function()
{
return this.m_ns;
}
fan.sys.DateTime.prototype.weekday = function() { return fan.sys.Weekday.m_vals.get((this.m_fields >> 28) & 0x7); }
fan.sys.DateTime.prototype.tz = function() { return this.m_tz; }
fan.sys.DateTime.prototype.dst = function() { return ((this.m_fields >> 31) & 0x1) != 0; }
fan.sys.DateTime.prototype.tzAbbr = function() { return this.dst() ? this.m_tz.dstAbbr(this.year()) : this.m_tz.stdAbbr(this.year()); }
fan.sys.DateTime.prototype.dayOfYear = function() { return fan.sys.DateTime.dayOfYear(this.year(), this.month().m_ordinal, this.day())+1; }
fan.sys.DateTime.prototype.toLocale = function(pattern, locale)
{
if (pattern === undefined) pattern = null;
if (locale === undefined) locale = null;
if (pattern == null)
{
pattern = "D-MMM-YYYY WWW hh:mm:ss zzz";
}
var s = '';
var len = pattern.length;
for (var i=0; i<len; ++i)
{
var c = pattern.charAt(i);
if (c == '\'')
{
while (true)
{
++i;
if (i >= len) throw fan.sys.ArgErr.make("Invalid pattern: unterminated literal");
c = pattern.charAt(i);
if (c == '\'') break;
s += c;
}
continue;
}
var n = 1;
while (i+1<len && pattern.charAt(i+1) == c) { ++i; ++n; }
var invalidNum = false;
switch (c)
{
case 'Y':
var year = this.year();
switch (n)
{
case 2:  year %= 100; if (year < 10) s += '0';
case 4:  s += year; break;
default: invalidNum = true;
}
break;
case 'M':
var mon = this.month();
switch (n)
{
case 4:
if (locale == null) locale = fan.sys.Locale.cur();
s += mon.full(locale);
break;
case 3:
if (locale == null) locale = fan.sys.Locale.cur();
s += mon.abbr(locale);
break;
case 2:  if (mon.m_ordinal+1 < 10) s += '0';
case 1:  s += mon.m_ordinal+1; break;
default: invalidNum = true;
}
break;
case 'D':
var day = this.day();
switch (n)
{
case 3:  s += day + fan.sys.DateTime.daySuffix(day); break;
case 2:  if (day < 10) s += '0';
case 1:  s += day; break;
default: invalidNum = true;
}
break;
case 'W':
var weekday = this.weekday();
switch (n)
{
case 4:
if (locale == null) locale = fan.sys.Locale.cur();
s += weekday.full(locale);
break;
case 3:
if (locale == null) locale = fan.sys.Locale.cur();
s += weekday.abbr(locale);
break;
default: invalidNum = true;
}
break;
case 'h':
case 'k':
var hour = this.hour();
if (c == 'k')
{
if (hour == 0) hour = 12;
else if (hour > 12) hour -= 12;
}
switch (n)
{
case 2:  if (hour < 10) s += '0';
case 1:  s += hour; break;
default: invalidNum = true;
}
break;
case 'm':
var min = this.min();
switch (n)
{
case 2:  if (min < 10) s += '0';
case 1:  s += min; break;
default: invalidNum = true;
}
break;
case 's':
var sec = this.sec();
switch (n)
{
case 2:  if (sec < 10) s += '0';
case 1:  s += sec; break;
default: invalidNum = true;
}
break;
case 'a':
switch (n)
{
case 1:  s += this.hour() < 12 ? "a" : "p"; break;
case 2:  s += this.hour() < 12 ? "am" : "pm"; break;
default: invalidNum = true;
}
break;
case 'A':
switch (n)
{
case 1:  s += this.hour() < 12 ? "A"  : "P"; break;
case 2:  s += this.hour() < 12 ? "AM" : "PM"; break;
default: invalidNum = true;
}
break;
case 'f':
case 'F':
var req = 0, opt = 0;
if (c == 'F') opt = n;
else
{
req = n;
while (i+1<len && pattern.charAt(i+1) == 'F') { ++i; ++opt; }
}
var frac = this.nanoSec();
for (var x=0, tenth=100000000; x<9; ++x)
{
if (req > 0) req--;
else
{
if (frac == 0 || opt <= 0) break;
opt--;
}
s += fan.sys.Int.div(frac, tenth);
frac %= tenth;
tenth /= 10;
}
break;
case 'z':
var rule = this.m_tz.rule(this.year());
var dst = this.dst();
switch (n)
{
case 1:
var offset = rule.offset;
if (dst) offset += rule.dstOffset;
if (offset == 0) { s += 'Z'; break; }
if (offset < 0) { s += '-'; offset = -offset; }
else { s += '+'; }
var zh = offset / 3600;
var zm = (offset % 3600) / 60;
if (zh < 10) s += '0'; s += zh + ':';
if (zm < 10) s += '0'; s += zm;
break;
case 3:
s += dst ? rule.dstAbbr : rule.stdAbbr;
break;
case 4:
s += this.m_tz.name();
break;
default:
invalidNum = true;
break;
}
break;
default:
if (fan.sys.Int.isAlpha(c.charCodeAt(0)))
throw ArgErr.make("Invalid pattern: unsupported char '" + c + "'").val;
if (i+1<len && pattern.charAt(i+1) == 'F' && this.nanoSec() == 0)
break;
s += c;
}
if (invalidNum)
throw fan.sys.ArgErr.make("Invalid pattern: unsupported num of '" + c + "' (x" + n + ")");
}
return s;
}
fan.sys.DateTime.daySuffix = function(day)
{
switch (day)
{
case 1: return "st";
case 2: return "nd";
case 3: return "rd";
default: return "th";
}
}
fan.sys.DateTime.prototype.minusDateTime = function(time)
{
return fan.sys.Duration.make(this.m_ticks-time.m_ticks);
}
fan.sys.DateTime.prototype.plus = function(duration)
{
var d = duration.m_ticks;
if (d == 0) return this;
return fan.sys.DateTime.makeTicks(this.m_ticks+d, this.m_tz);
}
fan.sys.DateTime.prototype.minus = function(duration)
{
var d = duration.m_ticks;
if (d == 0) return this;
return fan.sys.DateTime.makeTicks(this.m_ticks-d, this.m_tz);
}
fan.sys.DateTime.prototype.toTimeZone = function(tz)
{
if (this.m_tz == tz) return this;
if (tz == fan.sys.TimeZone.m_rel || this.m_tz == fan.sys.TimeZone.m_rel)
{
return fan.sys.DateTime.make(
this.year(), this.month(), this.day(),
this.hour(), this.min(), this.sec(), this.nanoSec(), tz);
}
else
{
return fan.sys.DateTime.makeTicks(this.m_ticks, tz);
}
}
fan.sys.DateTime.prototype.toUtc = function()
{
return this.toTimeZone(fan.sys.TimeZone.m_utc);
}
fan.sys.DateTime.prototype.toRel = function()
{
return this.toTimeZone(fan.sys.TimeZone.m_rel);
}
fan.sys.DateTime.prototype.floor = function(accuracy)
{
if (this.m_ticks % accuracy.m_ticks == 0) return this;
return fan.sys.DateTime.makeTicks(this.m_ticks - (this.m_ticks % accuracy.m_ticks), this.m_tz);
}
fan.sys.DateTime.prototype.midnight = function()
{
return fan.sys.DateTime.make(this.year(), this.month(), this.day(), 0, 0, 0, 0, this.m_tz);
}
fan.sys.DateTime.prototype.isMidnight = function()
{
return this.hour() == 0 && this.min() == 0 && this.sec() == 0 && this.nanoSec() == 0;
}
fan.sys.DateTime.prototype.toStr = function()
{
return this.toLocale("YYYY-MM-DD'T'hh:mm:ss.FFFFFFFFFz zzzz");
}
fan.sys.DateTime.isLeapYear = function(year)
{
if ((year & 3) != 0) return false;
return (year % 100 != 0) || (year % 400 == 0);
}
fan.sys.DateTime.weekdayInMonth = function(year, mon, weekday, pos)
{
mon = mon.m_ordinal;
weekday = weekday.m_ordinal;
fan.sys.DateTime.checkYear(year);
if (pos == 0) throw fan.sys.ArgErr.make("Pos is zero");
var firstWeekday = fan.sys.DateTime.firstWeekday(year, mon);
var numDays = fan.sys.DateTime.numDaysInMonth(year, mon);
if (pos > 0)
{
var day = weekday - firstWeekday + 1;
if (day <= 0) day = 8 - firstWeekday + weekday;
day += (pos-1)*7;
if (day > numDays) throw fan.sys.ArgErr.make("Pos out of range " + pos);
return day;
}
else
{
var lastWeekday = (firstWeekday + numDays - 1) % 7;
var off = lastWeekday - weekday;
if (off < 0) off = 7 + off;
off -= (pos+1)*7;
var day = numDays - off;
if (day < 1) throw fan.sys.ArgErr.make("Pos out of range " + pos);
return day;
}
}
fan.sys.DateTime.dayOfYear = function(year, mon, day)
{
return fan.sys.DateTime.isLeapYear(year) ?
fan.sys.DateTime.dayOfYearForFirstOfMonLeap[mon] + day - 1 :
fan.sys.DateTime.dayOfYearForFirstOfMon[mon] + day - 1;
}
fan.sys.DateTime.numDaysInMonth = function(year, month)
{
if (month == 1 && fan.sys.DateTime.isLeapYear(year))
return 29;
else
return fan.sys.DateTime.daysInMon[month];
}
fan.sys.DateTime.ticksToYear = function(ticks)
{
var year = fan.sys.Int.div(ticks, fan.sys.DateTime.nsPerYear) + 2000;
if (fan.sys.DateTime.yearTicks[year-1900] > ticks) year--;
return year;
}
fan.sys.DateTime.firstWeekday = function(year, mon)
{
var firstDayOfYear = fan.sys.DateTime.isLeapYear(year)
? fan.sys.DateTime.dayOfYearForFirstOfMonLeap[mon]
: fan.sys.DateTime.dayOfYearForFirstOfMon[mon];
return (fan.sys.DateTime.firstWeekdayOfYear[year-1900] + firstDayOfYear) % 7;
}
fan.sys.DateTime.checkYear = function(year)
{
if (year < 1901 || year > 2099)
throw fan.sys.ArgErr.make("Year out of range " + year);
}
fan.sys.DateTime.prototype.toIso = function()
{
return this.toLocale("YYYY-MM-DD'T'hh:mm:ss.FFFFFFFFFz");
}
fan.sys.DateTime.fromIso = function(s, checked)
{
if (checked === undefined) checked = true;
return fan.sys.DateTime.fromStr(s, checked, true);
}
fan.sys.DateTime.prototype.toCode = function()
{
if (this.equals(fan.sys.DateTime.m_defVal)) return "DateTime.defVal";
return "DateTime(\"" + this.toString() + "\")";
}
fan.sys.DateTime.yearTicks = [];
fan.sys.DateTime.firstWeekdayOfYear = [];
fan.sys.DateTime.yearTicks[0] = -3155673600000000000;
fan.sys.DateTime.firstWeekdayOfYear[0] = 1;
for (var i=1; i<202; ++i)
{
var daysInYear = 365;
if (fan.sys.DateTime.isLeapYear(i+1900-1)) daysInYear = 366;
fan.sys.DateTime.yearTicks[i] = fan.sys.DateTime.yearTicks[i-1] + daysInYear * fan.sys.DateTime.nsPerDay;
fan.sys.DateTime.firstWeekdayOfYear[i] = (fan.sys.DateTime.firstWeekdayOfYear[i-1] + daysInYear) % 7;
}
fan.sys.DateTime.daysInMon     = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
fan.sys.DateTime.daysInMonLeap = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
fan.sys.DateTime.dayOfYearForFirstOfMon     = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
fan.sys.DateTime.dayOfYearForFirstOfMonLeap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
for (var i=1; i<12; ++i)
{
fan.sys.DateTime.dayOfYearForFirstOfMon[i] =
fan.sys.DateTime.dayOfYearForFirstOfMon[i-1] + fan.sys.DateTime.daysInMon[i-1];
fan.sys.DateTime.dayOfYearForFirstOfMonLeap[i] =
fan.sys.DateTime.dayOfYearForFirstOfMonLeap[i-1] + fan.sys.DateTime.daysInMonLeap[i-1];
}
fan.sys.DateTime.monForDayOfYear     = [];
fan.sys.DateTime.dayForDayOfYear     = [];
fan.sys.DateTime.monForDayOfYearLeap = [];
fan.sys.DateTime.dayForDayOfYearLeap = [];
fan.sys.DateTime.fillInDayOfYear = function(mon, days, daysInMon, len)
{
var m = 0, d = 1;
for (var i=0; i<len; ++i)
{
mon[i] = m; days[i] = d++;
if (d > daysInMon[m]) { m++; d = 1; }
}
}
fan.sys.DateTime.fillInDayOfYear(fan.sys.DateTime.monForDayOfYear, fan.sys.DateTime.dayForDayOfYear, fan.sys.DateTime.daysInMon, 365);
fan.sys.DateTime.fillInDayOfYear(fan.sys.DateTime.monForDayOfYearLeap, fan.sys.DateTime.dayForDayOfYearLeap, fan.sys.DateTime.daysInMonLeap, 366);
fan.sys.Num = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Num.prototype.$ctor = function() {}
fan.sys.Num.prototype.$typeof = function() { return fan.sys.Num.$type; }
fan.sys.Num.toDecimal = function(val) { return fan.sys.Decimal.make(val.valueOf()); }
fan.sys.Num.toFloat = function(val) { return fan.sys.Float.make(val.valueOf()); }
fan.sys.Num.toInt = function(val)
{
if (isNaN(val)) return 0;
if (val == Number.POSITIVE_INFINITY) return fan.sys.Int.m_maxVal;
if (val == Number.NEGATIVE_INFINITY) return fan.sys.Int.m_minVal;
if (val < 0) return Math.ceil(val);
return Math.floor(val);
}
fan.sys.Num.toLocale = function(p, d, df)
{
var s = "";
if (d.m_negative) s += '-';
d.round(p.m_maxFrac);
var start = 0;
if (p.m_optInt && d.zeroInt()) start = d.m_decimal;
if (p.m_minFrac == 0 && d.zeroFrac(p.m_maxFrac)) d.m_size = d.m_decimal;
for (var i=0; i<p.m_minInt-d.m_decimal; ++i) s += '0';
var decimal = false;
for (var i=start; i<d.m_size; ++i)
{
if (i < d.m_decimal)
{
if ((d.m_decimal - i) % p.m_group == 0 && i > 0)
s += ','
}
else
{
if (i == d.m_decimal && p.m_maxFrac > 0)
{
s += '.';
decimal = true;
}
if (i-d.m_decimal >= p.m_maxFrac) break;
}
s += String.fromCharCode(d.m_digits[i]);
}
for (var i=0; i<p.m_minFrac-d.fracSize(); ++i)
{
if (!decimal) { s += '.';   decimal = true; }
s += '0';
}
if (s.length == 0) return "0";
return s;
}
fan.sys.NumDigits = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.NumDigits.prototype.$ctor = function()
{
this.m_digits;
this.m_decimal;
this.m_size = 0;
this.m_negative = false;
}
fan.sys.NumDigits.makeStr = function(s)
{
var obj = new fan.sys.NumDigits();
obj.m_digits = [];
var expPos = -1;
obj.m_decimal = -99;
for (var i=0; i<s.length; ++i)
{
var c = s.charCodeAt(i);
if (c == 45) { obj.m_negative = true; continue; }
if (c == 46) { obj.m_decimal = obj.m_negative ? i-1 : i; continue; }
if (c == 101 || c == 69) { expPos = i; break; }
obj.m_digits.push(c); obj.m_size++;
}
if (obj.m_decimal < 0) obj.m_decimal = obj.m_size;
if (expPos >= 0)
{
var exp = parseInt(s.substring(expPos+1), 10);
obj.m_decimal += exp;
if (obj.m_decimal >= obj.m_size)
{
while(obj.m_size <= obj.m_decimal) obj.m_digits[obj.m_size++] = 48;
}
else if (obj.m_decimal < 0)
{
for (var i=0; i<-obj.m_decimal; ++i) obj.m_digits.unshift(48);
obj.m_size += -obj.m_decimal;
obj.m_decimal = 0;
}
}
return obj;
}
fan.sys.NumDigits.makeLong = function(l)
{
var obj = new fan.sys.NumDigits();
if (l < 0) { obj.m_negative = true; l = -l; }
var s = l.toString();
if (s.charAt(0) === '-') s = "9223372036854775808";
obj.m_digits = [];
for (var i=0; i<s.length; i++) obj.m_digits.push(s.charCodeAt(i));
obj.m_size = obj.m_decimal = obj.m_digits.length;
return obj;
}
fan.sys.NumDigits.prototype.intSize = function()  { return this.m_decimal; }
fan.sys.NumDigits.prototype.fracSize = function() { return this.m_size - this.m_decimal; }
fan.sys.NumDigits.prototype.zeroInt = function()
{
for (var i=0; i<this.m_decimal; ++i) if (this.m_digits[i] != 48) return false;
return true;
}
fan.sys.NumDigits.prototype.zeroFrac = function(maxFrac)
{
var until = this.m_decimal + maxFrac;
for (var i=this.m_decimal; i<until; ++i) if (this.m_digits[i] != 48) return false;
return true;
}
fan.sys.NumDigits.prototype.round = function(maxFrac)
{
if (this.fracSize() <= maxFrac) return;
if (this.m_digits[this.m_decimal+maxFrac] >= 53)
{
var i = this.m_decimal + maxFrac - 1;
while (true)
{
if (this.m_digits[i] < 57) { this.m_digits[i]++; break; }
this.m_digits[i--] = 48;
if (i < 0)
{
this.m_digits.unshift(49);
this.m_size++; this.m_decimal++;
break;
}
}
}
this.m_size = this.m_decimal + maxFrac;
while (this.m_digits[this.m_size-1] == 48 && this.m_size > this.m_decimal) this.m_size--;
}
fan.sys.NumDigits.prototype.toString = function()
{
var s = "";
for (var i=0; i<this.m_digits.length; i++) s += String.fromCharCode(this.m_digits[i]);
return s + " neg=" + this.m_negative + " decimal=" + this.m_decimal;
}
fan.sys.NumPattern = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.NumPattern.prototype.$ctor = function()
{
this.m_pattern;
this.m_group;
this.m_optInt;
this.m_minInt;
this.m_minFrac;
this.m_maxFrac;
}
fan.sys.NumPattern.parse = function(s)
{
var x = fan.sys.NumPattern.m_cache[s];
if (x != null) return x;
return fan.sys.NumPattern.make(s);
}
fan.sys.NumPattern.make = function(s)
{
var group = fan.sys.Int.m_maxVal;
var optInt = true;
var comma = false;
var decimal = false;
var minInt = 0, minFrac = 0, maxFrac = 0;
var last = 0;
for (var i=0; i<s.length; ++i)
{
var c = s.charAt(i);
switch (c)
{
case ',':
comma = true;
group = 0;
break;
case '0':
if (decimal)
{ minFrac++; maxFrac++; }
else
{ minInt++; if (comma) group++; }
break;
case '#':
if (decimal)
maxFrac++;
else
if (comma) group++;
break;
case '.':
decimal = true;
optInt  = last == '#';
break;
}
last = c;
}
if (!decimal) optInt = last == '#';
var obj = new fan.sys.NumPattern();
obj.m_pattern = s;
obj.m_group   = group;
obj.m_optInt  = optInt;
obj.m_minInt  = minInt;
obj.m_minFrac = minFrac;
obj.m_maxFrac = maxFrac;
return obj;
}
fan.sys.NumPattern.prototype.toString = function()
{
return this.m_pattern + " group=" + this.m_group + " minInt=" + this.m_minInt +
" maxFrac=" + this.m_maxFrac + " minFrac=" + this.m_minFrac + " optInt=" + this.m_optInt;
}
fan.sys.NumPattern.m_cache = {};
fan.sys.NumPattern.cache = function(p)
{
fan.sys.NumPattern.m_cache[p] = fan.sys.NumPattern.make(p);
}
fan.sys.Decimal = fan.sys.Obj.$extend(fan.sys.Num);
fan.sys.Decimal.prototype.$ctor = function() {}
fan.sys.Decimal.make = function(val)
{
var x = new Number(val);
x.$fanType = fan.sys.Decimal.$type;
return x;
}
fan.sys.Decimal.toFloat = function(self)
{
return fan.sys.Float.make(self.valueOf());
}
fan.sys.Decimal.negate = function(self)
{
return fan.sys.Decimal.make(-self.valueOf());
}
fan.sys.Decimal.equals = function(self, that)
{
if (that != null && self.$fanType === that.$fanType)
{
if (isNaN(self) || isNaN(that)) return false;
return self.valueOf() == that.valueOf();
}
return false;
}
fan.sys.Duration = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Duration.fromStr = function(s, checked)
{
if (checked === undefined) checked = true;
try
{
var len = s.length;
var x1  = s.charAt(len-1);
var x2  = s.charAt(len-2);
var x3  = s.charAt(len-3);
var dot = s.indexOf('.') > 0;
var mult = -1;
var suffixLen  = -1;
switch (x1)
{
case 's':
if (x2 == 'n') { mult=1; suffixLen=2; }
if (x2 == 'm') { mult=1000000; suffixLen=2; }
break;
case 'c':
if (x2 == 'e' && x3 == 's') { mult=1000000000; suffixLen=3; }
break;
case 'n':
if (x2 == 'i' && x3 == 'm') { mult=60000000000; suffixLen=3; }
break;
case 'r':
if (x2 == 'h') { mult=3600000000000; suffixLen=2; }
break;
case 'y':
if (x2 == 'a' && x3 == 'd') { mult=86400000000000; suffixLen=3; }
break;
}
if (mult < 0) throw new Error();
s = s.substring(0, len-suffixLen);
if (dot)
{
var num = parseFloat(s);
if (isNaN(num)) throw new Error();
return fan.sys.Duration.make(Math.floor(num*mult));
}
else
{
var num = fan.sys.Int.fromStr(s);
return fan.sys.Duration.make(num*mult);
}
}
catch (err)
{
if (!checked) return null;
throw fan.sys.ParseErr.make("Duration", s);
}
}
fan.sys.Duration.now = function()
{
var ms = new Date().getTime();
return fan.sys.Duration.make(ms * fan.sys.Duration.nsPerMilli);
}
fan.sys.Duration.nowTicks = function()
{
return fan.sys.Duration.now().ticks();
}
fan.sys.Duration.boot = function()
{
return fan.sys.Duration.m_boot;
}
fan.sys.Duration.uptime = function()
{
return fan.sys.Duration.now().minus(fan.sys.Duration.m_boot);
}
fan.sys.Duration.make = function(ticks)
{
var self = new fan.sys.Duration();
self.m_ticks = ticks;
return self;
}
fan.sys.Duration.makeMillis = function(ms)
{
return fan.sys.Duration.make(ms*1000000);
}
fan.sys.Duration.makeSec = function(secs)
{
return fan.sys.Duration.make(secs*1000000000);
}
fan.sys.Duration.prototype.$ctor = function(ticks)
{
this.m_ticks = 0;
}
fan.sys.Duration.prototype.equals = function(that)
{
if (that instanceof fan.sys.Duration)
return this.m_ticks == that.m_ticks;
else
return false;
}
fan.sys.Duration.prototype.compare = function(that)
{
if (this.m_ticks < that.m_ticks) return -1;
if (this.m_ticks == that.m_ticks) return 0;
return +1;
}
fan.sys.Duration.prototype.$typeof = function()
{
return fan.sys.Duration.$type;
}
fan.sys.Duration.prototype.ticks = function()
{
return this.m_ticks;
}
fan.sys.Duration.prototype.negate = function() { return fan.sys.Duration.make(-this.m_ticks); }
fan.sys.Duration.prototype.plus = function(x)  { return fan.sys.Duration.make(this.m_ticks + x.m_ticks); }
fan.sys.Duration.prototype.minus = function(x) { return fan.sys.Duration.make(this.m_ticks - x.m_ticks); }
fan.sys.Duration.prototype.mult = function(x)  { return fan.sys.Duration.make(this.m_ticks * x); }
fan.sys.Duration.prototype.div = function(x)   { return fan.sys.Duration.make(this.m_ticks / x); }
fan.sys.Duration.prototype.floor = function(accuracy)
{
if (this.m_ticks % accuracy.m_ticks == 0) return this;
return fan.sys.Duration.make(this.m_ticks - (this.m_ticks % accuracy.m_ticks));
}
fan.sys.Duration.prototype.abs = function()
{
if (this.m_ticks >= 0) return this;
return fan.sys.Duration.make(-this.m_ticks);
}
fan.sys.Duration.prototype.toStr = function()
{
if (this.m_ticks == 0) return "0ns";
var ns = this.m_ticks;
if (ns % fan.sys.Duration.nsPerMilli == 0)
{
if (ns % fan.sys.Duration.nsPerDay == 0) return ns/fan.sys.Duration.nsPerDay + "day";
if (ns % fan.sys.Duration.nsPerHr  == 0) return ns/fan.sys.Duration.nsPerHr  + "hr";
if (ns % fan.sys.Duration.nsPerMin == 0) return ns/fan.sys.Duration.nsPerMin + "min";
if (ns % fan.sys.Duration.nsPerSec == 0) return ns/fan.sys.Duration.nsPerSec + "sec";
return ns/fan.sys.Duration.nsPerMilli + "ms";
}
return ns + "ns";
}
fan.sys.Duration.prototype.$literalEncode = function(out) { out.writeChars(this.toStr()); }
fan.sys.Duration.prototype.toCode = function() { return this.toStr(); }
fan.sys.Duration.prototype.toMillis = function() { return Math.floor(this.m_ticks / fan.sys.Duration.nsPerMilli); }
fan.sys.Duration.prototype.toSec    = function() { return Math.floor(this.m_ticks / fan.sys.Duration.nsPerSec); }
fan.sys.Duration.prototype.toMin    = function() { return Math.floor(this.m_ticks / fan.sys.Duration.nsPerMin); }
fan.sys.Duration.prototype.toHour   = function() { return Math.floor(this.m_ticks / fan.sys.Duration.nsPerHr); }
fan.sys.Duration.prototype.toDay    = function() { return Math.floor(this.m_ticks / fan.sys.Duration.nsPerDay); }
fan.sys.Duration.prototype.toLocale = function()
{
var ticks = this.m_ticks;
if (ticks < 1000) return ticks + "ns";
if (ticks < 2*fan.sys.Duration.nsPerMilli)
{
var s = '';
var ms = Math.floor(ticks/fan.sys.Duration.nsPerMilli);
var us = Math.floor((ticks - ms*fan.sys.Duration.nsPerMilli)/1000);
s += ms;
s += '.';
if (us < 100) s += '0';
if (us < 10)  s += '0';
s += us;
if (s.charAt(s.length-1) == '0') s = s.substr(0, s.length-1);
if (s.charAt(s.length-1) == '0') s = s.substr(0, s.length-1);
s += "ms";
return s;
}
if (ticks < 2*fan.sys.Duration.nsPerSec)
return Math.floor(ticks/fan.sys.Duration.nsPerMilli) + "ms";
if (ticks < 1*fan.sys.Duration.nsPerMin)
return Math.floor(ticks/fan.sys.Duration.nsPerSec) + "sec";
var days = Math.floor(ticks/fan.sys.Duration.nsPerDay); ticks -= days*fan.sys.Duration.nsPerDay;
var hr   = Math.floor(ticks/fan.sys.Duration.nsPerHr);  ticks -= hr*fan.sys.Duration.nsPerHr;
var min  = Math.floor(ticks/fan.sys.Duration.nsPerMin); ticks -= min*fan.sys.Duration.nsPerMin;
var sec  = Math.floor(ticks/fan.sys.Duration.nsPerSec);
var s = '';
if (days > 0) s += days + (days == 1 ? "day " : "days ");
if (hr  > 0) s += hr + "hr ";
if (min > 0) s += min + "min ";
if (sec > 0) s += sec + "sec ";
return s.substring(0, s.length-1);
}
fan.sys.Duration.prototype.toIso = function()
{
var s = '';
var ticks = this.m_ticks;
if (ticks == 0) return "PT0S";
if (ticks < 0) s += '-';
s += 'P';
var abs  = Math.abs(ticks);
var sec  = Math.floor(abs / fan.sys.Duration.nsPerSec);
var frac = abs % fan.sys.Duration.nsPerSec;
if (sec > fan.sys.Duration.secPerDay)
{
s += Math.floor(sec/fan.sys.Duration.secPerDay) + 'D';
sec = sec % fan.sys.Duration.secPerDay;
}
if (sec == 0 && frac == 0) return s;
s += 'T';
if (sec > fan.sys.Duration.secPerHr)
{
s += Math.floor(sec/fan.sys.Duration.secPerHr) + 'H';
sec = sec % fan.sys.Duration.secPerHr;
}
if (sec > fan.sys.Duration.secPerMin)
{
s += Math.floor(sec/fan.sys.Duration.secPerMin) + 'M';
sec = sec % fan.sys.Duration.secPerMin;
}
if (sec == 0 && frac == 0) return s;
s += sec;
if (frac != 0)
{
s += '.';
for (var i=10; i<=100000000; i*=10) if (frac < i) s += '0';
s += frac;
var x = s.length-1;
while (s.charAt(x) == '0') x--;
s = s.substr(0, x+1);
}
s += 'S';
return s;
}
fan.sys.Duration.fromIso = function(s, checked)
{
if (checked === undefined) checked = true;
try
{
var ticks = 0;
var neg = false;
var p = new fan.sys.IsoParser(s);
if (p.cur == 45) { neg = true; p.consume(); }
else if (p.cur == 43) { p.consume(); }
p.consume(80);
if (p.cur == -1) throw new Error();
var num = 0;
if (p.cur != 84)
{
num = p.num();
p.consume(68);
ticks += num * fan.sys.Duration.nsPerDay;
if (p.cur == -1) return fan.sys.Duration.make(ticks);
}
p.consume(84);
if (p.cur == -1) throw new Error();
num = p.num();
if (num >= 0 && p.cur == 72)
{
p.consume();
ticks += num * fan.sys.Duration.nsPerHr;
num = p.num();
}
if (num >= 0 && p.cur == 77)
{
p.consume();
ticks += num * fan.sys.Duration.nsPerMin;
num = p.num();
}
if (num >= 0 && p.cur == 83 || p.cur == 46)
{
ticks += num * fan.sys.Duration.nsPerSec;
if (p.cur == 46) { p.consume(); ticks += p.frac(); }
p.consume(83);
}
if (p.cur != -1) throw new Error();
if (neg) ticks = -ticks;
return fan.sys.Duration.make(ticks);
}
catch (err)
{
if (!checked) return null;
throw fan.sys.ParseErr.make("ISO 8601 Duration",  s);
}
}
fan.sys.IsoParser = function(s)
{
this.s = s;
this.cur = s.charCodeAt(0);
this.off = 0;
this.curIsDigit = false;
}
fan.sys.IsoParser.prototype.num = function()
{
if (!this.curIsDigit && this.cur != -1 && this.cur != 46)
throw new Error();
var num = 0;
while (this.curIsDigit)
{
num = num*10 + this.digit();
this.consume();
}
return num;
}
fan.sys.IsoParser.prototype.frac = function()
{
var ticks = 0;
for (var i=100000000; i>=0; i/=10)
{
if (!this.curIsDigit) break;
ticks += this.digit() * i;
this.consume();
}
return ticks;
}
fan.sys.IsoParser.prototype.digit = function() { return this.cur - 48; }
fan.sys.IsoParser.prototype.consume = function(ch)
{
if (ch != null && this.cur != ch) throw new Error();
this.off++;
if (this.off < this.s.length)
{
this.cur = this.s.charCodeAt(this.off);
this.curIsDigit = 48 <= this.cur && this.cur <= 57;
}
else
{
this.cur = -1;
this.curIsDigit = false;
}
}
fan.sys.Enum = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Enum.prototype.$ctor = function() {}
fan.sys.Enum.make = function(ordinal, name)
{
throw new Error();
}
fan.sys.Enum.make$ = function(self, ordinal, name)
{
if (name == null) throw fan.sys.NullErr.make();
self.m_ordinal = ordinal;
self.m_name = name;
}
fan.sys.Enum.doFromStr = function(t, name, checked)
{
var slot = t.slot(name, false);
if (slot != null && (slot.m_flags & fan.sys.FConst.Enum) != 0)
{
try
{
return slot.get(null);
}
catch (err) {}
}
if (!checked) return null;
throw fan.sys.ParseErr.make(t.qname(), name);
}
fan.sys.Enum.prototype.equals = function(that)
{
return this == that;
}
fan.sys.Enum.prototype.compare = function(that)
{
if (this.m_ordinal < that.m_ordinal) return -1;
if (this.m_ordinal == that.m_ordinal) return 0;
return +1;
}
fan.sys.Enum.prototype.$typeof = function()    { return fan.sys.Enum.$type; }
fan.sys.Enum.prototype.toStr = function()   { return this.m_name; }
fan.sys.Enum.prototype.ordinal = function() { return this.m_ordinal; }
fan.sys.Enum.prototype.name = function()    { return this.m_name; }
fan.sys.Endian = fan.sys.Obj.$extend(fan.sys.Enum);
fan.sys.Endian.prototype.$ctor = function(ordinal, name)
{
fan.sys.Enum.make$(this, ordinal, name);
}
fan.sys.Endian.fromStr = function(name, checked)
{
if (checked === undefined) checked = true;
return fan.sys.Enum.doFromStr(fan.sys.Endian.$type, name, checked);
}
fan.sys.Endian.prototype.$typeof = function()
{
return fan.sys.Endian.$type;
}
fan.sys.Env = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Env.cur = function()
{
if (fan.sys.Env.$cur == null) fan.sys.Env.$cur = new fan.sys.Env();
return fan.sys.Env.$cur;
}
fan.sys.Env.prototype.$ctor = function()
{
this.m_args = fan.sys.List.make(fan.sys.Str.$type).toImmutable();
this.m_index = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.List.$type);
this.m_index = this.m_index.toImmutable();
this.m_vars = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type)
this.m_vars.caseInsensitive$(true);
this.m_vars = this.m_vars.toImmutable();
this.m_props = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Map.$type);
}
fan.sys.Env.prototype.$setIndex = function(index)
{
if (index.$typeof().toStr() != "[sys::Str:sys::Str[]]") throw fan.sys.ArgErr.make("Invalid type");
this.m_index = index.toImmutable();
}
fan.sys.Env.prototype.$setVars = function(vars)
{
if (vars.$typeof().toStr() != "[sys::Str:sys::Str]") throw fan.sys.ArgErr.make("Invalid type");
if (!vars.caseInsensitive()) throw fan.sys.ArgErr.make("Map must be caseInsensitive");
this.m_vars = vars.toImmutable();
}
fan.sys.Env.noDef = "_Env_nodef_";
fan.sys.Env.$rhino = false;
fan.sys.Env.prototype.$typeof = function() { return fan.sys.Env.$type; }
fan.sys.Env.prototype.toStr = function() { return this.$typeof().toString(); }
fan.sys.Env.prototype.runtime = function() { return "js"; }
fan.sys.Env.prototype.args = function() { return this.m_args; }
fan.sys.Env.prototype.vars = function() { return this.m_vars; }
fan.sys.Env.prototype.homeDir = function() { return this.m_homeDir; }
fan.sys.Env.prototype.workDir = function() { return this.m_workDir; }
fan.sys.Env.prototype.tempDir = function() { return this.m_tempDir; }
fan.sys.Env.prototype.index = function(key)
{
return this.m_index.get(key, fan.sys.Str.$type.emptyList());
}
fan.sys.Env.prototype.props = function(pod, uri, maxAge)
{
var key = pod.name() + ':' + uri.toStr();
return this.$props(key);
}
fan.sys.Env.prototype.config = function(pod, key, def)
{
if (def === undefined) def = null;
return this.props(pod, fan.sys.Env.m_configProps, fan.sys.Duration.m_oneMin).get(key, def);
}
fan.sys.Env.prototype.locale = function(pod, key, def, locale)
{
if (def === undefined) def = fan.sys.Env.noDef;
if (locale === undefined) locale = fan.sys.Locale.cur();
var val;
var maxAge = fan.sys.Duration.m_maxVal;
val = this.props(pod, locale.m_strProps, maxAge).get(key, null);
if (val != null) return val;
val = this.props(pod, locale.m_langProps, maxAge).get(key, null);
if (val != null) return val;
val = this.props(pod, fan.sys.Env.m_localeEnProps, maxAge).get(key, null);
if (val != null) return val;
if (def === fan.sys.Env.noDef) return pod + "::" + key;
return def;
}
fan.sys.Env.prototype.$props = function(key)
{
var map = this.m_props.get(key);
if (map == null)
{
map = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type)
this.m_props.add(key, map);
}
return map;
}
fan.sys.Slot = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Slot.prototype.$ctor = function()
{
this.m_parent = null;
this.m_qname  = null;
this.m_name   = null;
this.m_flags  = null;
}
fan.sys.Slot.prototype.$typeof = function() { return fan.sys.Slot.$type; }
fan.sys.Slot.prototype.toStr = function() { return this.m_qname; }
fan.sys.Slot.findMethod = function(qname, checked)
{
var slot = fan.sys.Slot.find(qname, checked);
return fan.sys.ObjUtil.coerce(slot, fan.sys.Method.$type);
}
fan.sys.Slot.findField = function(qname, checked)
{
var slot = fan.sys.Slot.find(qname, checked);
return fan.sys.ObjUtil.coerce(slot, fan.sys.Field.$type);
}
fan.sys.Slot.find = function(qname, checked)
{
if (checked === undefined) checked = true;
var typeName, slotName;
try
{
var dot = qname.indexOf('.');
typeName = qname.substring(0, dot);
slotName = qname.substring(dot+1);
}
catch (e)
{
throw fan.sys.Err.make("Invalid slot qname \"" + qname + "\", use <pod>::<type>.<slot>");
}
var type = fan.sys.Type.find(typeName, checked);
if (type == null) return null;
return type.slot(slotName, checked);
}
fan.sys.Slot.prototype.parent = function() { return this.m_parent; }
fan.sys.Slot.prototype.qname = function() { return this.m_qname; }
fan.sys.Slot.prototype.name = function() { return this.m_name; }
fan.sys.Slot.prototype.isField = function() { return this instanceof fan.sys.Field; }
fan.sys.Slot.prototype.isMethod = function() { return this instanceof fan.sys.Method; }
fan.sys.Slot.prototype.isAbstract = function()  { return (this.m_flags & fan.sys.FConst.Abstract)  != 0; }
fan.sys.Slot.prototype.isConst = function()     { return (this.m_flags & fan.sys.FConst.Const)     != 0; }
fan.sys.Slot.prototype.isCtor = function()      { return (this.m_flags & fan.sys.FConst.Ctor)      != 0; }
fan.sys.Slot.prototype.isInternal = function()  { return (this.m_flags & fan.sys.FConst.Internal)  != 0; }
fan.sys.Slot.prototype.isNative = function()    { return (this.m_flags & fan.sys.FConst.Native)    != 0; }
fan.sys.Slot.prototype.isOverride = function()  { return (this.m_flags & fan.sys.FConst.Override)  != 0; }
fan.sys.Slot.prototype.isPrivate = function()   { return (this.m_flags & fan.sys.FConst.Private)   != 0; }
fan.sys.Slot.prototype.isProtected = function() { return (this.m_flags & fan.sys.FConst.Protected) != 0; }
fan.sys.Slot.prototype.isPublic = function()    { return (this.m_flags & fan.sys.FConst.Public)    != 0; }
fan.sys.Slot.prototype.isStatic = function()    { return (this.m_flags & fan.sys.FConst.Static)    != 0; }
fan.sys.Slot.prototype.isSynthetic = function() { return (this.m_flags & fan.sys.FConst.Synthetic) != 0; }
fan.sys.Slot.prototype.isVirtual = function()   { return (this.m_flags & fan.sys.FConst.Virtual)   != 0; }
fan.sys.Slot.prototype.$name = function(n)
{
switch (n)
{
case "char":   return "$char";
case "delete": return "$delete";
case "fan":    return "$fan";
case "import": return "$import";
case "in":     return "$in";
case "typeof": return "$typeof";
case "var":    return "$var";
case "with":   return "$with";
}
return n;
}
fan.sys.Field = fan.sys.Obj.$extend(fan.sys.Slot);
fan.sys.Field.prototype.$ctor = function(parent, name, flags, type)
{
this.m_parent = parent;
this.m_name   = name;
this.m_qname  = parent.qname() + "." + name;
this.m_flags  = flags;
this.m_type   = type;
this.m_$name  = this.$name(name);
this.m_$qname = this.m_parent.m_$qname + '.m_' + this.m_$name;
this.m_getter = null;
this.m_setter = null;
}
fan.sys.Field.prototype.trap = function(name, args)
{
if (name == "getter") return this.m_getter;
if (name == "setter") return this.m_setter;
return fan.sys.Obj.prototype.trap.call(this, name, args);
}
fan.sys.Field.prototype.type = function() { return this.m_type; }
fan.sys.Field.prototype.get = function(instance)
{
if (this.isStatic())
{
return eval(this.m_$qname);
}
else
{
var target = instance;
if ((this.m_flags & fan.sys.FConst.Native) != 0)
target = instance.peer;
var getter = target[this.m_$name];
if (getter != null)
return getter.call(target);
else
return target["m_"+this.m_$name]
}
}
fan.sys.Field.prototype.set = function(instance, value, checkConst)
{
if (checkConst === undefined) checkConst = true;
if ((this.m_flags & fan.sys.FConst.Const) != 0)
{
if (checkConst)
throw fan.sys.ReadonlyErr.make("Cannot set const field " + this.m_qname);
else if (value != null && !isImmutable(value))
throw fan.sys.ReadonlyErr.make("Cannot set const field " + this.m_qname + " with mutable value");
}
if (value != null)
{
if (!fan.sys.ObjUtil.$typeof(value).is(this.m_type))
throw fan.sys.ArgErr.make("Wrong type for field " + this.m_qname + ": " + this.m_type + " != " + fan.sys.ObjUtil.$typeof(value));
}
if ((this.m_flags & fan.sys.FConst.Native) != 0)
{
var peer = instance.peer;
var setter = peer[this.m_$name + "$"];
setter.call(peer, instance, value);
}
else
{
var setter = instance[this.m_$name + "$"];
if (setter != null)
setter.call(instance, value);
else
instance["m"+this.m_$name] = value;
}
}
fan.sys.Field.prototype.$typeof = function() { return fan.sys.Field.$type; }
fan.sys.File = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.File.prototype.$ctor = function() {}
fan.sys.File.prototype.$typeof = function() { return fan.sys.File.$type; }
fan.sys.File.make = function(uri, checkSlash)
{
if (checkSlash === undefined) checkSlash = true;
if (fan.sys.Env.$rhino)
{
var f = fan.sys.LocalFile.uriToFile(uri);
if (f.isDirectory() && !checkSlash && !uri.isDir())
uri = uri.plusSlash();
return fan.sys.LocalFile.makeUri(uri, f);
}
return new fan.sys.File();
}
fan.sys.File.os = function(osPath)
{
if (fan.sys.Env.$rhino)
return fan.sys.LocalFile.make(new java.io.File(osPath));
return new fan.sys.File();
}
fan.sys.File.prototype.exists = function() { return true; }
fan.sys.LocalFile = fan.sys.Obj.$extend(fan.sys.File);
fan.sys.LocalFile.prototype.$ctor = function() {}
fan.sys.LocalFile.prototype.$typeof = function() { return fan.sys.LocalFile.$type; }
fan.sys.LocalFile.make = function(file)
{
var instance = new fan.sys.LocalFile();
instance.m_file = file;
instance.m_uri  = fan.sys.LocalFile.fileToUri(file, file.isDirectory(), null);
return instance;
}
fan.sys.LocalFile.makeUri = function(uri, file)
{
if (file.exists())
{
if (file.isDirectory())
{
if (!uri.isDir())
throw fan.sys.IOErr.make("Must use trailing slash for dir: " + uri);
}
else
{
if (uri.isDir())
throw fan.sys.IOErr.make("Cannot use trailing slash for file: " + uri);
}
}
var instance = new fan.sys.LocalFile();
instance.m_uri  = uri;
instance.m_file = file;
return instance;
}
fan.sys.LocalFile.fileToUri = function(file, isDir, scheme)
{
var path = fan.sys.Str.javaToJs(file.getPath());
var len = path.length;
var s = "";
if (scheme != null) s += scheme + ':';
if (len > 2 && path.charAt(1) == ':' && path.charAt(0) != '/')
s += '/';
for (var i=0; i<len; ++i)
{
var c = path.charAt(i);
switch (c)
{
case '?':
case '#':  s += '\\' + c; break;
case '\\': s += '/'; break;
default:   s += c;
}
}
if (isDir && (s.length == 0 || s.charAt(s.length-1) != '/'))
s += '/';
return fan.sys.Uri.fromStr(s);
}
fan.sys.LocalFile.uriToFile = function(uri)
{
if (uri.scheme() != null && uri.scheme() != "file")
throw fan.sys.ArgErr.make("Invalid Uri scheme for local file: " + uri);
return new java.io.File(fan.sys.LocalFile.uriToPath(uri));
}
fan.sys.LocalFile.uriToPath = function(uri)
{
var path = uri.pathStr();
var len  = path.length;
var s = null;
for (var i=0; i<len; ++i)
{
var c = path.charAt(i);
if (c == '\\')
{
if (s == null) { s = ""; s += path.substr(0, i); }
}
else if (s != null) s += c;
}
return s == null ? path : s;
}
fan.sys.LocalFile.fileNameToUriName = function(name)
{
var len = name.length;
var s = null;
for (var i=0; i<len; ++i)
{
var c = name.charAt(i);
switch (c)
{
case '?':
case '#':
if (s == null) { s = ""; s += name.substr(0,i); }
s += '\\' + c;
break;
default:
if (s != null) s += c;
}
}
return s == null ? name : s;
}
fan.sys.LocalFile.prototype.isDir = function() { return this.m_uri.isDir(); }
fan.sys.LocalFile.prototype.exists = function() { return this.m_file.exists(); }
fan.sys.LocalFile.prototype.size = function()
{
if (this.m_file.isDirectory()) return null;
return this.m_file.length();
}
fan.sys.LocalFile.prototype.osPath = function()
{
return fan.sys.Str.javaToJs(this.m_file.getPath());
}
fan.sys.LocalFile.prototype.parent = function()
{
var parent = this.m_uri.parent();
if (parent == null) return null;
return fan.sys.LocalFile.makeUri(parent, fan.sys.LocalFile.uriToFile(parent));
}
fan.sys.LocalFile.prototype.list = function()
{
var list = this.m_file.listFiles();
var len = list == null ? 0 : list.length;
var acc = fan.sys.List.make(fan.sys.File.$type, []);
for (var i=0; i<len; ++i)
{
var f = list[i];
var name = fan.sys.LocalFile.fileNameToUriName(f.getName());
acc.add(fan.sys.LocalFile.makeUri(this.m_uri.plusName(name, f.isDirectory()), f));
}
return acc;
}
fan.sys.LocalFile.prototype.plus = function(uri, checkSlash)
{
return fan.sys.File.make(this.m_uri.plus(uri), checkSlash);
}
fan.sys.LocalFile.prototype.create = function()
{
if (this.isDir())
this.createDir();
else
this.createFile();
return this;
}
fan.sys.LocalFile.prototype.createFile = function()
{
if (this.m_file.exists())
{
if (this.m_file.isDirectory())
throw fan.sys.IOErr.make("Already exists as dir: " + this.m_file);
}
var parent = this.m_file.getParentFile();
if (parent != null && !parent.exists())
{
if (!parent.mkdirs())
throw fan.sys.IOErr.make("Cannot create dir: " + parent);
}
try
{
var out = new java.io.FileOutputStream(this.m_file);
out.close();
}
catch (e)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.LocalFile.prototype.createDir = function()
{
if (this.m_file.exists())
{
if (!this.m_file.isDirectory())
throw fan.sys.IOErr.make("Already exists as file: " + this.m_file);
}
else
{
if (!this.m_file.mkdirs())
throw fan.sys.IOErr.make("Cannot create dir: " + this.m_file);
}
}
fan.sys.LocalFile.prototype.$delete = function()
{
if (!this.exists()) return;
if (this.m_file.isDirectory())
{
var kids = this.list();
for (var i=0; i<kids.size(); ++i)
kids.get(i).$delete();
}
if (!this.m_file['delete']())
throw fan.sys.IOErr.make("Cannot delete: " + this.m_file);
}
fan.sys.LocalFile.prototype.$in = function(bufSize)
{
if (bufSize === undefined) bufSize = fan.sys.Int.Chunk;
try
{
return fan.sys.SysInStream.make(new java.io.FileInputStream(this.m_file), bufSize);
}
catch (e)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.LocalFile.prototype.out = function(append, bufSize)
{
if (append === undefined) append = false;
if (bufSize === undefined) bufSize = fan.sys.Int.Chunk;
try
{
var parent = this.m_file.getParentFile();
if (parent != null && !parent.exists()) parent.mkdirs();
var fout = new java.io.FileOutputStream(this.m_file, append);
var bout = fan.sys.SysOutStream.toBuffered(fout, bufSize);
return new fan.sys.LocalFileOutStream(bout, fout.getFD());
return null;
}
catch (err)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.Float = fan.sys.Obj.$extend(fan.sys.Num);
fan.sys.Float.prototype.$ctor = function() {}
fan.sys.Float.make = function(val)
{
var x = new Number(val);
x.$fanType = fan.sys.Float.$type;
return x;
}
fan.sys.Float.prototype.$typeof = function()
{
return fan.sys.Float.$type;
}
fan.sys.Float.equals = function(self, that)
{
if (that != null && self.$fanType === that.$fanType)
{
return self.valueOf() == that.valueOf();
}
return false;
}
fan.sys.Float.compare = function(self, that)
{
if (self == null) return that == null ? 0 : -1;
if (that == null) return 1;
if (isNaN(self)) return isNaN(that) ? 0 : -1;
if (isNaN(that)) return 1;
if (self < that) return -1;
return self.valueOf() == that.valueOf() ? 0 : 1;
}
fan.sys.Float.isNaN = function(self)
{
return isNaN(self);
}
fan.sys.Float.toInt = function(val) { return (val<0) ? Math.ceil(val) : Math.floor(val); }
fan.sys.Float.toFloat = function(val) { return val; }
fan.sys.Float.toDecimal = function(val) { return fan.sys.Decimal.make(val); }
fan.sys.Float.abs = function(self) { return fan.sys.Float.make(Math.abs(self)); }
fan.sys.Float.approx = function(self, that, tolerance)
{
if (fan.sys.Float.compare(self, that) == 0) return true;
var t = tolerance == null
? Math.min(Math.abs(self/1e6), Math.abs(that/1e6))
: tolerance;
return Math.abs(self - that) <= t;
}
fan.sys.Float.ceil  = function(self) { return fan.sys.Float.make(Math.ceil(self)); }
fan.sys.Float.exp   = function(self) { return fan.sys.Float.make(Math.exp(self)); }
fan.sys.Float.floor = function(self) { return fan.sys.Float.make(Math.floor(self)); }
fan.sys.Float.log   = function(self) { return fan.sys.Float.make(Math.log(self)); }
fan.sys.Float.log10 = function(self) { return fan.sys.Float.make(Math.log(self) / Math.LN10); }
fan.sys.Float.min   = function(self, that) { return fan.sys.Float.make(Math.min(self, that)); }
fan.sys.Float.max   = function(self, that) { return fan.sys.Float.make(Math.max(self, that)); }
fan.sys.Float.negate = function(self) { return fan.sys.Float.make(-self); }
fan.sys.Float.pow   = function(self, exp) { return fan.sys.Float.make(Math.pow(self, exp)); }
fan.sys.Float.round = function(self) { return fan.sys.Float.make(Math.round(self)); }
fan.sys.Float.sqrt  = function(self) { return fan.sys.Float.make(Math.sqrt(self)); }
fan.sys.Float.random = function() { return fan.sys.Float.make(Math.random()); }
fan.sys.Float.plus     = function(a,b) { return fan.sys.Float.make(a+b); }
fan.sys.Float.plusInt  = function(a,b) { return fan.sys.Float.make(a+b); }
fan.sys.Float.plusDecimal = function(a,b) { return fan.sys.Decimal.make(a+b); }
fan.sys.Float.minus        = function(a,b) { return fan.sys.Float.make(a-b); }
fan.sys.Float.minusInt     = function(a,b) { return fan.sys.Float.make(a-b); }
fan.sys.Float.minusDecimal = function(a,b) { return fan.sys.Decimal.make(a-b); }
fan.sys.Float.mult        = function(a,b) { return fan.sys.Float.make(a*b); }
fan.sys.Float.multInt     = function(a,b) { return fan.sys.Float.make(a*b); }
fan.sys.Float.multDecimal = function(a,b) { return fan.sys.Decimal.make(a*b); }
fan.sys.Float.div        = function(a,b) { return fan.sys.Float.make(a/b); }
fan.sys.Float.divInt     = function(a,b) { return fan.sys.Float.make(a/b); }
fan.sys.Float.divDecimal = function(a,b) { return fan.sys.Decimal.make(a/b); }
fan.sys.Float.mod        = function(a,b) { return fan.sys.Float.make(a%b); }
fan.sys.Float.modInt     = function(a,b) { return fan.sys.Float.make(a%b); }
fan.sys.Float.modDecimal = function(a,b) { return fan.sys.Decimal.make(a%b); }
fan.sys.Float.increment = function(self) { return fan.sys.Float.make(self+1); }
fan.sys.Float.decrement = function(self) { return fan.sys.Float.make(self-1); }
fan.sys.Float.acos  = function(self) { return fan.sys.Float.make(Math.acos(self)); }
fan.sys.Float.asin  = function(self) { return fan.sys.Float.make(Math.asin(self)); }
fan.sys.Float.atan  = function(self) { return fan.sys.Float.make(Math.atan(self)); }
fan.sys.Float.atan2 = function(y, x) { return fan.sys.Float.make(Math.atan2(y, x)); }
fan.sys.Float.cos   = function(self) { return fan.sys.Float.make(Math.cos(self)); }
fan.sys.Float.sin   = function(self) { return fan.sys.Float.make(Math.sin(self)); }
fan.sys.Float.tan   = function(self) { return fan.sys.Float.make(Math.tan(self)); }
fan.sys.Float.toDegrees = function(self) { return fan.sys.Float.make(self * 180 / Math.PI); }
fan.sys.Float.toRadians = function(self) { return fan.sys.Float.make(self * Math.PI / 180); }
fan.sys.Float.cosh  = function(self) { return fan.sys.Float.make(0.5 * (Math.exp(self) + Math.exp(-self))); }
fan.sys.Float.sinh  = function(self) { return fan.sys.Float.make(0.5 * (Math.exp(self) - Math.exp(-self))); }
fan.sys.Float.tanh  = function(self) { return fan.sys.Float.make((Math.exp(2*self)-1) / (Math.exp(2*self)+1)); }
fan.sys.Float.fromStr = function(s, checked)
{
if (s == "NaN") return fan.sys.Float.m_nan;
if (s == "INF") return fan.sys.Float.m_posInf;
if (s == "-INF") return fan.sys.Float.m_negInf;
if (isNaN(s))
{
if (checked != null && !checked) return null;
throw fan.sys.ParseErr.make("Float", s);
}
return fan.sys.Float.make(parseFloat(s));
}
fan.sys.Float.toStr = function(self)
{
if (isNaN(self)) return "NaN";
if (self == fan.sys.Float.m_posInf) return "INF";
if (self == fan.sys.Float.m_negInf) return "-INF";
return ""+self;
}
fan.sys.Float.encode = function(self, out)
{
if (isNaN(self)) out.writeChars("sys::Float(\"NaN\")");
else if (self == fan.sys.Float.m_posInf) out.writeChars("sys::Float(\"INF\")");
else if (self == fan.sys.Float.m_negInf) out.writeChars("sys::Float(\"-INF\")");
else out.writeChars(""+self).writeChars("f");
}
fan.sys.Float.toCode = function(self)
{
if (isNaN(self)) return "Float.nan";
if (self == fan.sys.Float.m_posInf) return "Float.posInf";
if (self == fan.sys.Float.m_negInf) return "Float.negInf";
var s = ""+self
if (s.indexOf(".") == -1) s += ".0";
return s + "f";
}
fan.sys.Float.toLocale = function(self, pattern)
{
if (pattern === undefined) pattern = null;
try
{
var df = null;
if (isNaN(self)) return "NaN";
if (self == fan.sys.Float.m_posInf) return "INF";
if (self == fan.sys.Float.m_negInf) return "-INF";
if (pattern == null)
pattern = "#,###.0##";
var string = ''+self;
var p = fan.sys.NumPattern.parse(pattern);
var d = fan.sys.NumDigits.makeStr(string);
return fan.sys.Num.toLocale(p, d, df);
}
catch (err)
{
fan.sys.ObjUtil.echo(err);
return ''+self;
}
}
fan.sys.Func = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Func.prototype.$ctor = function()
{
}
fan.sys.Func.make = function(params, ret, func)
{
var self = new fan.sys.Func();
fan.sys.Func.make$(self, params, ret, func);
return self;
}
fan.sys.Func.make$ = function(self, params, ret, func)
{
var types = [];
for (var i=0; i<params.length; i++)
types.push(params[i].m_type);
self.m_params = params;
self.m_return = ret;
self.m_type   = new fan.sys.FuncType(types, ret);
self.m_func   = func;
}
fan.sys.Func.prototype.$typeof = function() { return this.m_type; }
fan.sys.Func.prototype.params = function() { return this.m_params; }
fan.sys.Func.prototype.returns = function() { return this.m_return; }
fan.sys.Func.prototype.call = function() { return this.m_func.apply(null, arguments); }
fan.sys.Func.prototype.callList = function(args) { return this.m_func.apply(null, args.m_values); }
fan.sys.Func.prototype.callOn = function(obj, args) { return this.m_func.apply(obj, args.m_values); }
fan.sys.InStream = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.InStream.prototype.$ctor = function()
{
this.$in = null;
this.m_charset = fan.sys.Charset.utf8();
this.m_bigEndian = true;
}
fan.sys.InStream.make$ = function(self, $in) { self.$in = $in; }
fan.sys.InStream.prototype.rChar = function()
{
if (this.$in != null)
return this.$in.rChar();
else
return this.m_charset.m_encoder.decode(this);
}
fan.sys.InStream.prototype.read = function()
{
try
{
return this.$in.read();
}
catch (err)
{
if (this.$in == null)
throw fan.sys.UnsupportedErr.make(this.$typeof().qname() + " wraps null InStream");
else
throw fan.sys.Err.make(err);
}
}
fan.sys.InStream.prototype.readBuf = function(buf, n)
{
try
{
return this.$in.readBuf(buf, n);
}
catch (err)
{
if (this.$in == null)
throw fan.sys.UnsupportedErr.make(this.$typeof().qname() + " wraps null InStream");
else
throw fan.sys.Err.make(err);
}
}
fan.sys.InStream.prototype.unread = function(n)
{
try
{
return this.$in.unread(n);
}
catch (err)
{
if (this.$in == null)
throw fan.sys.UnsupportedErr.make(this.$typeof().qname() + " wraps null InStream");
else
throw fan.sys.Err.make(err);
}
}
fan.sys.InStream.prototype.skip = function(n)
{
if (this.$in != null) return this.$in.skip(n);
for (var i=0; i<n; ++i)
if (this.read() == 0) return i;
return n;
}
fan.sys.InStream.prototype.readAllBuf = function()
{
try
{
var size = fan.sys.Int.Chunk;
var buf = fan.sys.Buf.make(size);
while (this.readBuf(buf, size) != null);
buf.flip();
return buf;
}
finally
{
try { this.close(); } catch (e) { fan.sys.ObjUtil.echo("InStream.readAllBuf: " + e); }
}
}
fan.sys.InStream.prototype.readBufFully = function(buf, n)
{
if (buf == null) buf = fan.sys.Buf.make(n);
var total = n;
var got = 0;
while (got < total)
{
var r = this.readBuf(buf, total-got);
if (r == null || r == 0) throw fan.sys.IOErr.make("Unexpected end of stream");
got += r;
}
buf.flip();
return buf;
}
fan.sys.InStream.prototype.endian = function()
{
return this.m_bigEndian ? fan.sys.Endian.m_big : fan.sys.Endian.m_little;
}
fan.sys.InStream.prototype.endian$ = function(endian)
{
this.m_bigEndian = (endian == fan.sys.Endian.m_big);
}
fan.sys.InStream.prototype.peek = function()
{
var x = this.read();
if (x != null) this.unread(x);
return x;
}
fan.sys.InStream.prototype.readU1 = function()
{
var c = this.read();
if (c == null) throw fan.sys.IOErr.make("Unexpected end of stream");
return c;
}
fan.sys.InStream.prototype.readS1 = function()
{
var c = this.read();
if (c == null) throw fan.sys.IOErr.make("Unexpected end of stream");
return c <= 0x7F ? c : (0xFFFFFF00 | c);
}
fan.sys.InStream.prototype.readU2 = function()
{
var c1 = this.read();
var c2 = this.read();
if (c1 == null || c2 == null) throw fan.sys.IOErr.make("Unexpected end of stream");
if (this.m_bigEndian)
return c1 << 8 | c2;
else
return c2 << 8 | c1;
}
fan.sys.InStream.prototype.readS2 = function()
{
var c1 = this.read();
var c2 = this.read();
if (c1 == null || c2 == null) throw fan.sys.IOErr.make("Unexpected end of stream");
var c;
if (this.m_bigEndian)
c = c1 << 8 | c2;
else
c = c2 << 8 | c1;
return c <= 0x7FFF ? c : (0xFFFF0000 | c);
}
fan.sys.InStream.prototype.readU4 = function()
{
var c1 = this.read();
var c2 = this.read();
var c3 = this.read();
var c4 = this.read();
if (c1 == null || c2 == null || c3 == null || c4 == null) throw fan.sys.IOErr.make("Unexpected end of stream");
var c;
if (this.m_bigEndian)
c = (c1 << 24) + (c2 << 16) + (c3 << 8) + c4;
else
c = (c4 << 24) + (c3 << 16) + (c2 << 8) + c1;
if (c >= 0)
return c;
else
return (c & 0x7FFFFFFF) + Math.pow(2, 31);
}
fan.sys.InStream.prototype.readS4 = function()
{
var c1 = this.read();
var c2 = this.read();
var c3 = this.read();
var c4 = this.read();
if (c1 == null || c2 == null || c3 == null || c4 == null) throw fan.sys.IOErr.make("Unexpected end of stream");
if (this.m_bigEndian)
return (c1 << 24) + (c2 << 16) + (c3 << 8) + c4;
else
return (c4 << 24) + (c3 << 16) + (c2 << 8) + c1;
}
fan.sys.InStream.prototype.readDecimal = function()
{
var inp = this.readUtf()
return fan.sys.Decimal.fromStr(inp);
}
fan.sys.InStream.prototype.readBool = function()
{
var c = this.read();
if (c == null) throw IOErr.make("Unexpected end of stream");
return c != 0;
}
fan.sys.InStream.prototype.readUtf = function()
{
var len1 = this.read();
var len2 = this.read();
if (len1 == null || len2 == null) throw fan.sys.IOErr.make("Unexpected end of stream");
var utflen = len1 << 8 | len2;
var buf = "";
var bnum = 0;
var c1, c2, c3;
while (bnum < utflen)
{
var c1 = this.read(); bnum++;
if (c1 == null) throw IOErr.make("Unexpected end of stream");
switch (c1 >> 4) {
case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
buf += String.fromCharCode(c1);
break;
case 12: case 13:
if (bnum >= utflen) throw fan.sys.IOErr.make("UTF encoding error");
c2 = this.read(); bnum++;
if (c2 == null) throw fan.sys.IOErr.make("Unexpected end of stream");
if ((c2 & 0xC0) != 0x80) throw fan.sys.IOErr.make("UTF encoding error");
buf += String.fromCharCode(((c1 & 0x1F) << 6) | (c2 & 0x3F));
break;
case 14:
if (bnum+1 >= utflen) throw fan.sys.IOErr.make("UTF encoding error");
c2 = this.read(); bnum++;
c3 = this.read(); bnum++;
if (c2 == null || c3 == null) throw fan.sys.IOErr.make("Unexpected end of stream");
if (((c2 & 0xC0) != 0x80) || ((c3 & 0xC0) != 0x80))  throw fan.sys.IOErr.make("UTF encoding error");
buf += String.fromCharCode(((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | ((c3 & 0x3F) << 0));
break;
default:
throw fan.sys.IOErr.make("UTF encoding error");
}
}
return buf;
}
fan.sys.InStream.prototype.charset = function() { return this.m_charset; }
fan.sys.InStream.prototype.charset$ = function(charset) { this.m_charset = charset; }
fan.sys.InStream.prototype.readChar = function()
{
var ch = this.rChar();
return ch < 0 ? null : ch;
}
fan.sys.InStream.prototype.unreadChar = function(c)
{
var ch = this.m_charset.m_encoder.encodeIn(c, this);
return ch < 0 ? null : ch;
}
fan.sys.InStream.prototype.peekChar = function()
{
var x = this.readChar();
if (x != null) this.unreadChar(x);
return x;
}
fan.sys.InStream.prototype.readChars = function(n)
{
if (n === undefined || n < 0) throw fan.sys.ArgErr.make("readChars n < 0: " + n);
if (n == 0) return "";
var buf = "";
for (i=n; i>0; --i)
{
var ch = this.rChar();
if (ch < 0) throw fan.sys.IOErr.make("Unexpected end of stream");
buf += String.fromCharCode(ch);
}
return buf;
}
fan.sys.InStream.prototype.readLine = function(max)
{
if (max === undefined) max = fan.sys.Int.Chunk;
var maxChars = (max != null) ? max.valueOf() : fan.sys.Int.m_maxVal;
if (maxChars <= 0) return "";
var c = this.rChar();
if (c < 0) return null;
var buf = "";
while (true)
{
if (c == 10) break;
if (c == 13)
{
c = this.rChar();
if (c >= 0 && c != 10) this.unreadChar(c);
break;
}
buf += String.fromCharCode(c);
if (buf.length >= maxChars) break;
c = this.rChar();
if (c < 0) break;
}
return buf;
}
fan.sys.InStream.prototype.readStrToken = function(max, f)
{
if (max === undefined) max = fan.sys.Int.Chunk;
var maxChars = (max != null) ? max.valueOf() : fan.sys.Int.m_maxVal;
if (maxChars <= 0) return "";
var c = this.rChar();
if (c < 0) return null;
buf = "";
while (true)
{
var terminate;
if (f == null)
terminate = fan.sys.Int.isSpace(c);
else
terminate = f.call(c);
if (terminate)
{
this.unreadChar(c);
break;
}
buf += String.fromCharCode(c);
if (buf.length >= maxChars) break;
c = this.rChar();
if (c < 0) break;
}
return buf;
}
fan.sys.InStream.prototype.readAllLines = function()
{
try
{
var list = fan.sys.List.make(fan.sys.Str.$type, []);
var line = "";
while ((line = this.readLine()) != null)
list.push(line);
return list;
}
catch (err) { fan.sys.Err.make(err).trace(); }
finally
{
try { this.close(); } catch (err) { fan.sys.Err.make(err).trace(); }
}
}
fan.sys.InStream.prototype.eachLine = function(f)
{
try
{
var line;
while ((line = this.readLine()) != null)
f.call(line);
}
finally
{
try { this.close(); } catch (err) { fan.sys.Err.make(err).trace(); }
}
}
fan.sys.InStream.prototype.readAllStr = function(normalizeNewlines)
{
if (normalizeNewlines === undefined) normalizeNewlines = true;
try
{
var s = "";
var normalize = normalizeNewlines;
var last = -1;
while (true)
{
var c = this.rChar();
if (c < 0) break;
if (normalize)
{
if (c == 13) s += String.fromCharCode(10);
else if (last == 13 && c == 10) {}
else s += String.fromCharCode(c);
last = c;
}
else
{
s += String.fromCharCode(c);
}
}
return s;
}
finally
{
try { this.close(); } catch (err) { fan.sys.Err.make(err).trace(); }
}
}
fan.sys.InStream.prototype.readObj = function(options)
{
if (options === undefined) options = null;
return new fanx_ObjDecoder(this, options).readObj();
}
fan.sys.InStream.prototype.readProps = function()
{
var origCharset = this.charset();
this.charset$(fan.sys.Charset.utf8());
try
{
var props = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type);
var name = "";
var v = null;
var inBlockComment = 0;
var inEndOfLineComment = false;
var c =  32, last = 32;
var lineNum = 1;
while (true)
{
last = c;
c = this.rChar();
if (c < 0) break;
if (c == 10 || c == 13)
{
inEndOfLineComment = false;
if (last == 13 && c == 10) continue;
var n = fan.sys.Str.trim(name);
if (v !== null)
{
props.add(n, fan.sys.Str.trim(v));
name = "";
v = null;
}
else if (n.length > 0)
throw fan.sys.IOErr.make("Invalid name/value pair [Line " + lineNum + "]");
lineNum++;
continue;
}
if (inEndOfLineComment) continue;
if (inBlockComment > 0)
{
if (last == 47 && c == 42) inBlockComment++;
if (last == 42 && c == 47) inBlockComment--;
continue;
}
if (c == 61 && v === null)
{
v = "";
continue;
}
if (c == 47 && fan.sys.Int.isSpace(last))
{
var peek = this.rChar();
if (peek < 0) break;
if (peek == 47) { inEndOfLineComment = true; continue; }
if (peek == 42) { inBlockComment++; continue; }
this.unreadChar(peek);
}
if (c == 92)
{
var peek = this.rChar();
if (peek < 0) break;
else if (peek == 110) c = 10;
else if (peek == 114) c = 13;
else if (peek == 116) c = 9;
else if (peek == 92)  c = 92;
else if (peek == 13 || peek == 10)
{
lineNum++;
if (peek == 13)
{
peek = this.rChar();
if (peek != 10) this.unreadChar(peek);
}
while (true)
{
peek = this.rChar();
if (peek == 32 || peek == 09) continue;
this.unreadChar(peek);
break;
}
continue;
}
else if (peek == 117)
{
var n3 = fan.sys.InStream.hex(this.rChar());
var n2 = fan.sys.InStream.hex(this.rChar());
var n1 = fan.sys.InStream.hex(this.rChar());
var n0 = fan.sys.InStream.hex(this.rChar());
if (n3 < 0 || n2 < 0 || n1 < 0 || n0 < 0) throw fan.sys.IOErr.make("Invalid hex value for \\uxxxx [Line " +  lineNum + "]");
c = ((n3 << 12) | (n2 << 8) | (n1 << 4) | n0);
}
else throw fan.sys.IOErr.make("Invalid escape sequence [Line " + lineNum + "]");
}
if (v === null)
name += String.fromCharCode(c);
else
v += String.fromCharCode(c);
}
var n = fan.sys.Str.trim(name);
if (v !== null)
props.add(n, fan.sys.Str.trim(v));
else if (n.length > 0)
throw fan.sys.IOErr.make("Invalid name/value pair [Line " + lineNum + "]");
return props;
}
finally
{
try { this.close(); } catch (err) { fan.sys.Err.make(err).trace(); }
this.charset$(origCharset);
}
}
fan.sys.InStream.hex = function(c)
{
if (48 <= c && c <= 57) return c - 48;
if (97 <= c && c <= 102) return c - 97 + 10;
if (65 <= c && c <= 70) return c - 65 + 10;
return -1;
}
fan.sys.InStream.prototype.pipe = function(out, toPipe, close)
{
if (toPipe === undefined) toPipe = null;
if (close === undefined) close = true;
try
{
var bufSize = fan.sys.Int.Chunk;
var buf = fan.sys.Buf.make(bufSize);
var total = 0;
if (toPipe == null)
{
while (true)
{
var n = this.readBuf(buf.clear(), bufSize);
if (n == null) break;
out.writeBuf(buf.flip(), buf.remaining());
total += n;
}
}
else
{
var toPipeVal = toPipe;
while (total < toPipeVal)
{
if (toPipeVal - total < bufSize) bufSize = toPipeVal - total;
var n = this.readBuf(buf.clear(), bufSize);
if (n == null) throw fan.sys.IOErr.make("Unexpected end of stream");
out.writeBuf(buf.flip(), buf.remaining());
total += n;
}
}
return total;
}
finally
{
if (close) this.close();
}
}
fan.sys.InStream.prototype.close = function()
{
if (this.$in != null) return this.$in.close();
return true;
}
fan.sys.InStream.prototype.$typeof = function()
{
return fan.sys.InStream.$type;
}
fan.sys.InStream.make = function($in)
{
var s = new fan.sys.InStream();
s.make$($in);
return s;
}
fan.sys.InStream.makeForStr = function(s)
{
return new fan.sys.StrInStream(s);
}
fan.sys.SysInStream = fan.sys.Obj.$extend(fan.sys.InStream);
fan.sys.SysInStream.make = function(ins, bufSize)
{
if (bufSize == null || bufSize == 0)
return new fan.sys.SysInStream(ins);
else
return new fan.sys.SysInStream(new java.io.BufferedInputStream(ins, bufSize));
}
fan.sys.SysInStream.prototype.$ctor = function(ins)
{
fan.sys.InStream.prototype.$ctor.call(this);
this.m_in = ins;
}
fan.sys.SysInStream.prototype.$typeof = function() { return fan.sys.SysInStream.$type; }
fan.sys.SysInStream.prototype.read = function() { var n = this.r(); return n < 0 ? null : n; }
fan.sys.SysInStream.prototype.r = function()
{
try
{
return this.m_in.read();
}
catch (e)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.SysInStream.prototype.readChar = function()
{
var c = this.rChar()
return (c < 0) ? null : c;
}
fan.sys.SysInStream.prototype.rChar = function()
{
return this.m_charset.m_encoder.decode(this);
}
fan.sys.SysInStream.prototype.readBuf = function(buf, n)
{
try
{
var read = buf.pipeFrom(this.m_in, n);
if (read < 0) return null;
return read;
}
catch (e)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.SysInStream.prototype.unread = function(n)
{
try
{
if (!(this.m_in instanceof java.io.PushbackInputStream))
this.m_in = new java.io.PushbackInputStream(this.m_in, 128);
this.m_in.unread(n);
return this;
}
catch (e)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.SysInStream.prototype.skip = function(n)
{
try
{
var skipped = this.m_in.skip(n);
if (skipped < 0) return 0;
return skipped;
}
catch (e)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.SysInStream.prototype.close = function()
{
try
{
if (this.m_in != null) this.m_in.close();
return true;
}
catch (e)
{
return false;
}
}
fan.sys.Int = fan.sys.Obj.$extend(fan.sys.Num);
fan.sys.Int.prototype.$ctor = function() {}
fan.sys.Int.prototype.$typeof = function() { return fan.sys.Int.$type; }
fan.sys.Int.make = function(val) { return val; }
fan.sys.Int.fromStr = function(s, radix, checked)
{
if (radix === undefined) radix = 10;
if (checked === undefined) checked = true;
try
{
if (radix === 10) { var n = fan.sys.Int.parseDecimal(s); return n; }
if (radix === 16) { var n = fan.sys.Int.parseHex(s); return n; }
throw new Error("Unsupported radix " + radix);
}
catch (err) {}
if (checked) throw fan.sys.ParseErr.make("Int", s);
return null;
}
fan.sys.Int.parseDecimal = function(s)
{
var n = 0;
if (s.charCodeAt(0) === 45) n++;
for (var i=n; i<s.length; i++)
{
ch = s.charCodeAt(i);
if (ch >= 48 && ch <= 57) continue;
throw new Error("Illegal decimal char " + s.charAt(i));
}
return parseInt(s, 10);
}
fan.sys.Int.parseHex = function(s)
{
for (var i=0; i<s.length; i++)
{
ch = s.charCodeAt(i);
if (ch >= 48 && ch <= 57) continue;
if (ch >= 65 && ch <= 70) continue;
if (ch >= 97 && ch <= 102) continue;
throw new Error("Illegal hex char " + s.charAt(i));
}
return parseInt(s, 16);
}
fan.sys.Int.toStr = function(self)
{
return self.toString();
}
fan.sys.Int.equals = function(self, obj)
{
return self === obj;
}
fan.sys.Int.abs = function(self)      { return self < 0 ? -self : self; }
fan.sys.Int.min = function(self, val) { return self < val ? self : val; }
fan.sys.Int.max = function(self, val) { return self > val ? self : val; }
fan.sys.Int.isEven  = function(self) { return self % 2 == 0; }
fan.sys.Int.isOdd   = function(self) { return self % 2 != 0; }
fan.sys.Int.isSpace = function(self) { return self == 32 || self == 9 || self == 10 || self == 13; }
fan.sys.Int.isDigit = function(self, radix)
{
if (radix == null || radix == 10) return self >= 48 && self <= 57;
if (radix == 16)
{
if (self >= 48 && self <= 57) return true;
if (self >= 65 && self <= 70) return true;
if (self >= 97 && self <= 102) return true;
return false;
}
if (radix <= 10) return 48 <= self && self <= (48+radix);
var x = self-10;
if (97 <= self && self <= 97+x) return true;
if (65 <= self && self <= 65+x) return true;
return false;
}
fan.sys.Int.toDigit = function(self, radix)
{
if (radix == null || radix == 10) return 0 <= self && self <= 9 ? 48+self : null;
if (self < 0 || self >= radix) return null;
if (self < 10) return 48+self;
return self-10+97;
}
fan.sys.Int.fromDigit = function(self, radix)
{
if (self < 0 || self >= 128) return null;
var ten = radix < 10 ? radix : 10;
if (48 <= self && self < 48+ten) return self-48;
if (radix > 10)
{
var alpha = radix-10;
if (97 <= self && self < 97+alpha) return self+10-97;
if (65 <= self && self < 65+alpha) return self+10-65;
}
return null;
}
fan.sys.Int.random = function(r)
{
if (r === undefined) return Math.floor(Math.random() * Math.pow(2, 64));
else
{
var start = r.start();
var end   = r.end();
if (r.inclusive()) ++end;
if (end <= start) throw fan.sys.ArgErr.make("Range end < start: " + r);
r = end-start;
if (r < 0) r = -r;
return Math.floor(Math.random()*r) + start;
}
}
fan.sys.Int.isUpper    = function(self) { return self >= 65 && self <= 90; }
fan.sys.Int.isLower    = function(self) { return self >= 97 && self <= 122; }
fan.sys.Int.upper      = function(self) { return fan.sys.Int.isLower(self) ? self-32 : self; }
fan.sys.Int.lower      = function(self) { return fan.sys.Int.isUpper(self) ? self+32 : self; }
fan.sys.Int.isAlpha    = function(self) { return fan.sys.Int.isUpper(self) || fan.sys.Int.isLower(self); }
fan.sys.Int.isAlphaNum = function(self) { return fan.sys.Int.isAlpha(self) || fan.sys.Int.isDigit(self); }
fan.sys.Int.equalsIgnoreCase = function(self, ch) { return (self|0x20) == (ch|0x20); }
fan.sys.Int.times = function(self, f)
{
for (var i=0; i<self; i++)
f.call(i);
}
fan.sys.Int.negate    = function(self) { return -self; }
fan.sys.Int.increment = function(self) { return self+1; }
fan.sys.Int.decrement = function(self) { return self-1; }
fan.sys.Int.plus        = function(a, b) { return a + b; }
fan.sys.Int.plusFloat   = function(a, b) { return fan.sys.Float.make(a + b); }
fan.sys.Int.plusDecimal = function(a, b) { return fan.sys.Decimal.make(a + b); }
fan.sys.Int.minus        = function(a, b) { return a - b; }
fan.sys.Int.minusFloat   = function(a, b) { return fan.sys.Float.make(a - b); }
fan.sys.Int.minusDecimal = function(a, b) { return fan.sys.Decimal.make(a - b); }
fan.sys.Int.mult         = function(a, b) { return a * b; }
fan.sys.Int.multFloat    = function(a, b) { return fan.sys.Float.make(a * b); }
fan.sys.Int.multDecimal  = function(a, b) { return fan.sys.Decimal.make(a * b); }
fan.sys.Int.div = function(a, b)
{
var r = a / b;
if (r < 0) return Math.ceil(r);
return Math.floor(r);
}
fan.sys.Int.divFloat   = function(a, b) { return fan.sys.Float.make(fan.sys.Int.div(a, b)); }
fan.sys.Int.divDecimal = function(a, b) { return fan.sys.Decimal.make(fan.sys.Int.div(a, b)); }
fan.sys.Int.mod        = function(a, b) { return a % b; }
fan.sys.Int.modFloat   = function(a, b) { return fan.sys.Float.make(a % b); }
fan.sys.Int.modDecimal = function(a, b) { return fan.sys.Decimal.make(a % b); }
fan.sys.Int.pow = function(self, pow)
{
if (pow < 0) throw fan.sys.ArgErr.make("pow < 0");
return Math.pow(self, pow);
}
fan.sys.Int.not = function(a)    { return ~a; }
fan.sys.Int.and = function(a, b) { var x = a & b;  if (x<0) x += 0xffffffff+1; return x; }
fan.sys.Int.or  = function(a, b) { var x = a | b;  if (x<0) x += 0xffffffff+1; return x; }
fan.sys.Int.xor = function(a, b) { var x = a ^ b;  if (x<0) x += 0xffffffff+1; return x; }
fan.sys.Int.shiftl = function(a, b) { var x = a << b; if (x<0) x += 0xffffffff+1; return x; }
fan.sys.Int.shiftr = function(a, b) { var x = a >> b; if (x<0) x += 0xffffffff+1; return x; }
fan.sys.Int.toInt = function(val) { return val; }
fan.sys.Int.toFloat = function(val) { return fan.sys.Float.make(val); }
fan.sys.Int.toDecimal = function(val) { return fan.sys.Decimal.make(val); }
fan.sys.Int.toChar = function(self)
{
if (self < 0 || self > 0xFFFF) throw fan.sys.Err.make("Invalid unicode char: " + self);
return String.fromCharCode(self);
}
fan.sys.Int.toHex = function(self, width)
{
if (width === undefined) width = null;
var val = self;
var s = "";
while (true)
{
s = "0123456789abcdef".charAt(val % 16) + s;
val = Math.floor(val / 16);
if (val === 0) break
}
if (width != null && s.length < width)
{
var zeros = width - s.length;
for (var i=0; i<zeros; ++i) s = '0' + s;
}
return s;
}
fan.sys.Int.$zeros = null;
fan.sys.Int.toCode = function(self, base)
{
if (base === undefined) base = 10;
if (base == 10) return self.toString();
if (base == 16) return "0x" + fan.sys.Int.toHex(self);
throw fan.sys.ArgErr.make("Invalid base " + base);
}
fan.sys.Int.toDuration = function(self)
{
return fan.sys.Duration.make(self);
}
fan.sys.Int.toDateTime = function(self, tz)
{
return (tz === undefined)
? fan.sys.DateTime.makeTicks(self)
: fan.sys.DateTime.makeTicks(self, tz);
}
fan.sys.Int.charMap = [];
fan.sys.Int.SPACE    = 0x01;
fan.sys.Int.UPPER    = 0x02;
fan.sys.Int.LOWER    = 0x04;
fan.sys.Int.DIGIT    = 0x08;
fan.sys.Int.HEX      = 0x10;
fan.sys.Int.ALPHA    = fan.sys.Int.UPPER | fan.sys.Int.LOWER;
fan.sys.Int.ALPHANUM = fan.sys.Int.UPPER | fan.sys.Int.LOWER | fan.sys.Int.DIGIT;
fan.sys.Int.charMap[32] |= fan.sys.Int.SPACE;
fan.sys.Int.charMap[10] |= fan.sys.Int.SPACE;
fan.sys.Int.charMap[13] |= fan.sys.Int.SPACE;
fan.sys.Int.charMap[9]  |= fan.sys.Int.SPACE;
fan.sys.Int.charMap[12] |= fan.sys.Int.SPACE;
for (var i=97; i<=122; ++i) fan.sys.Int.charMap[i] |= fan.sys.Int.LOWER;
for (var i=65; i<=90;  ++i) fan.sys.Int.charMap[i] |= fan.sys.Int.UPPER;
for (var i=48; i<=57; ++i) fan.sys.Int.charMap[i] |= fan.sys.Int.DIGIT;
for (var i=48; i<=57;  ++i) fan.sys.Int.charMap[i] |= fan.sys.Int.HEX;
for (var i=97; i<=102; ++i) fan.sys.Int.charMap[i] |= fan.sys.Int.HEX;
for (var i=65; i<=70;  ++i) fan.sys.Int.charMap[i] |= fan.sys.Int.HEX;
fan.sys.Int.toLocale = function(self, pattern)
{
if (pattern === undefined) pattern = null;
if (pattern != null && pattern.length == 1 && pattern.charAt(0) == 'B')
return fan.sys.Int.toLocaleBytes(self);
var df = null;
if (pattern == null)
pattern = "#,###";
var p = fan.sys.NumPattern.parse(pattern);
var d = fan.sys.NumDigits.makeLong(self);
return fan.sys.Num.toLocale(p, d, df);
}
fan.sys.Int.toLocaleBytes = function(b)
{
var KB = fan.sys.Int.m_KB;
var MB = fan.sys.Int.m_MB;
var GB = fan.sys.Int.m_GB;
if (b < KB)    return b + "B";
if (b < 10*KB) return fan.sys.Float.toLocale(b/KB, "#.#") + "KB";
if (b < MB)    return Math.round(b/KB) + "KB";
if (b < 10*MB) return fan.sys.Float.toLocale(b/MB, "#.#") + "MB";
if (b < GB)    return Math.round(b/MB) + "MB";
if (b < 10*GB) return fan.sys.Float.toLocale(b/GB, "#.#") + "GB";
return Math.round(b/fan.sys.Int.m_GB) + "GB";
}
fan.sys.Int.m_KB = 1024;
fan.sys.Int.m_MB = 1024*1024;
fan.sys.Int.m_GB = 1024*1024*1024;
fan.sys.List = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.List.make = function(of, values)
{
if (values === undefined) values = [];
var self = new fan.sys.List();
self.m_of = of;
self.m_size = values.length;
self.m_values = values;
self.m_readonly = false;
self.m_immutable = false;
return self;
}
fan.sys.List.prototype.$ctor = function()
{
}
fan.sys.List.prototype.$typeof = function() { return this.m_of.toListOf(); }
fan.sys.List.prototype.of = function() { return this.m_of; }
fan.sys.List.prototype.isEmpty = function() { return this.m_size == 0; }
fan.sys.List.prototype.size = function() { return this.m_size; }
fan.sys.List.prototype.size$ = function(val)
{
this.modify();
var oldSize = this.m_size;
var newSize = val;
for (var i=0; this.m_size+i<newSize; i++)
this.m_values.push(null);
this.m_size = newSize;
}
fan.sys.List.prototype.capacity = function() { return this.m_values.length; }
fan.sys.List.prototype.capacity$ = function(val)
{
if (val < this.m_size) throw fan.sys.ArgErr.make("capacity < size");
}
fan.sys.List.prototype.get = function(index)
{
if (index < 0) index = this.m_size + index;
if (index >= this.m_size || index < 0) throw fan.sys.IndexErr.make(index);
return this.m_values[index];
}
fan.sys.List.prototype.getSafe = function(index, def)
{
if (def === undefined) def = null;
if (index < 0) index = this.m_size + index;
if (index >= this.m_size || index < 0) return def;
return this.m_values[index];
}
fan.sys.List.prototype.getRange = function(range)
{
var s = range.$start(this.m_size);
var e = range.$end(this.m_size);
if (e+1 < s || s < 0) throw fan.sys.IndexErr.make(range);
return fan.sys.List.make(this.m_of, this.m_values.slice(s, e+1));
}
fan.sys.List.prototype.contains = function(value)
{
return this.index(value) != null;
}
fan.sys.List.prototype.containsAll = function(list)
{
for (var i=0; i<list.size(); ++i)
if (this.index(list.get(i)) == null)
return false;
return true;
}
fan.sys.List.prototype.containsAny = function(list)
{
for (var i=0; i<list.size(); ++i)
if (this.index(list.get(i)) != null)
return true;
return false;
}
fan.sys.List.prototype.index = function(value, off)
{
if (off === undefined) off = 0;
var size = this.m_size;
var values = this.m_values;
if (size == 0) return null;
var start = off;
if (start < 0) start = size + start;
if (start >= size || start < 0) throw fan.sys.IndexErr.make(off);
if (value == null)
{
for (var i=start; i<size; ++i)
if (values[i] == null)
return i;
}
else
{
for (var i=start; i<size; ++i)
{
var obj = values[i];
if (obj != null && fan.sys.ObjUtil.equals(obj, value))
return i;
}
}
return null;
}
fan.sys.List.prototype.indexSame = function(value, off)
{
if (off === undefined) off = 0;
var size = this.m_size;
var values = this.m_values;
if (size == 0) return null;
var start = off;
if (start < 0) start = size + start;
if (start >= size || start < 0) throw fan.sys.IndexErr.make(off);
for (var i=start; i<size; i++)
if (value === values[i])
return i;
return null;
}
fan.sys.List.prototype.first = function()
{
if (this.m_size == 0) return null;
return this.m_values[0];
}
fan.sys.List.prototype.last = function()
{
if (this.m_size == 0) return null;
return this.m_values[this.m_size-1];
}
fan.sys.List.prototype.dup = function()
{
return fan.sys.List.make(this.m_of, this.m_values.slice(0));
}
fan.sys.List.prototype.hash = function()
{
var hash = 33;
var size = this.m_size;
var vals = this.m_values;
for (var i=0; i<size; ++i)
{
var obj = vals[i];
if (obj != null) hash ^= fan.sys.ObjUtil.hash(obj);
}
return hash;
}
fan.sys.List.prototype.equals = function(that)
{
if (that instanceof fan.sys.List)
{
if (!this.m_of.equals(that.m_of)) return false;
if (this.m_size != that.m_size) return false;
for (var i=0; i<this.m_size; ++i)
if (!fan.sys.ObjUtil.equals(this.m_values[i], that.m_values[i]))
return false;
return true;
}
return false;
}
fan.sys.List.prototype.set = function(index, value)
{
this.modify();
if (index < 0) index = this.m_size + index;
if (index >= this.m_size || index < 0) throw fan.sys.IndexErr.make(index);
this.m_values[index] = value;
return this;
}
fan.sys.List.prototype.add = function(value)
{
return this.insert$(this.m_size, value);
}
fan.sys.List.prototype.addAll = function(list)
{
return this.insertAll$(this.m_size, list);
}
fan.sys.List.prototype.insert = function(index, value)
{
if (index < 0) index = this.m_size + index;
if (index > this.m_size || index < 0) throw fan.sys.IndexErr.make(index);
return this.insert$(index, value);
}
fan.sys.List.prototype.insert$ = function(i, value)
{
this.modify();
this.m_values.splice(i, 0, value);
this.m_size++;
return this;
}
fan.sys.List.prototype.insertAll = function(index, list)
{
if (index < 0) index = this.m_size + index;
if (index > this.m_size || index < 0) throw fan.sys.IndexErr.make(index);
return this.insertAll$(index, list);
}
fan.sys.List.prototype.insertAll$ = function(i, list)
{
this.modify();
if (list.m_size == 0) return this;
var vals = list.m_values;
if (this.m_values === vals) vals = vals.slice(0);
for (var j=0; j<list.m_size; j++)
this.m_values.splice(i+j, 0, vals[j]);
this.m_size += list.m_size;
return this;
}
fan.sys.List.prototype.remove = function(value)
{
var index = this.index(value);
if (index == null) return null;
return this.removeAt(index);
}
fan.sys.List.prototype.removeSame = function(value)
{
var index = this.indexSame(value);
if (index == null) return null;
return this.removeAt(index);
}
fan.sys.List.prototype.removeAt = function(index)
{
this.modify();
if (index < 0) index = this.m_size + index;
if (index >= this.m_size || index < 0) throw fan.sys.IndexErr.make(index);
var old = this.m_values.splice(index, 1);
this.m_size--;
return old[0];
}
fan.sys.List.prototype.removeRange = function(r)
{
this.modify();
var s = r.$start(this.m_size);
var e = r.$end(this.m_size);
var n = e - s + 1;
if (n < 0) throw fan.sys.IndexErr.make(r);
this.m_values.splice(s, n);
this.m_size -= n;
return this;
}
fan.sys.List.prototype.trim = function()
{
this.modify();
return this;
}
fan.sys.List.prototype.clear = function()
{
this.modify();
this.m_values.splice(0, this.m_size);
this.m_size = 0;
return this;
}
fan.sys.List.prototype.fill = function(value, times)
{
this.modify();
for (var i=0; i<times; i++) this.add(value);
return this;
}
fan.sys.List.prototype.peek = function()
{
if (this.m_size == 0) return null;
return this.m_values[this.m_size-1];
}
fan.sys.List.prototype.pop = function()
{
if (this.m_size == 0) return null;
return this.removeAt(-1);
}
fan.sys.List.prototype.push = function(obj)
{
return this.add(obj);
}
fan.sys.List.prototype.each = function(f)
{
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; i++)
f.call(this.m_values[i])
}
else
{
for (var i=0; i<this.m_size; i++)
f.call(this.m_values[i], i)
}
}
fan.sys.List.prototype.eachr = function(f)
{
if (f.m_params.size() == 1)
{
for (var i=this.m_size-1; i>=0; i--)
f.call(this.m_values[i])
}
else
{
for (var i=this.m_size-1; i>=0; i--)
f.call(this.m_values[i], i)
}
}
fan.sys.List.prototype.eachRange = function(r, f)
{
var s = r.$start(this.m_size);
var e = r.$end(this.m_size);
var n = e - s + 1;
if (n < 0) throw fan.sys.IndexErr.make(r);
if (f.m_params.size() == 1)
{
for (var i=s; i<=e; ++i)
f.call(this.m_values[i]);
}
else
{
for (var i=s; i<=e; ++i)
f.call(this.m_values[i], i);
}
}
fan.sys.List.prototype.eachWhile = function(f)
{
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; ++i)
{
var r = f.call(this.m_values[i]);
if (r != null) return r;
}
}
else
{
for (var i=0; i<this.m_size; ++i)
{
var r = f.call(this.m_values[i], i);
if (r != null) return r;
}
}
return null;
}
fan.sys.List.prototype.eachrWhile = function(f)
{
if (f.m_params.size() == 1)
{
for (var i=this.m_size-1; i>=0; i--)
{
var r = f.call(this.m_values[i]);
if (r != null) return r;
}
}
else
{
for (var i=this.m_size-1; i>=0; i--)
{
var r = f.call(this.m_values[i], i);
if (r != null) return r;
}
}
return null;
}
fan.sys.List.prototype.find = function(f)
{
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; i++)
if (f.call(this.m_values[i]) == true)
return this.m_values[i];
}
else
{
for (var i=0; i<this.m_size; i++)
if (f.call(this.m_values[i], i) == true)
return this.m_values[i];
}
return null;
}
fan.sys.List.prototype.findIndex = function(f)
{
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; i++)
if (f.call(this.m_values[i]) == true)
return i;
}
else
{
for (var i=0; i<this.m_size; i++)
if (f.call(this.m_values[i], i) == true)
return i;
}
return null;
}
fan.sys.List.prototype.findAll = function(f)
{
var acc = fan.sys.List.make(this.m_of);
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; i++)
if (f.call(this.m_values[i]) == true)
acc.add(this.m_values[i]);
}
else
{
for (var i=0; i<this.m_size; i++)
if (f.call(this.m_values[i], i) == true)
acc.add(this.m_values[i]);
}
return acc;
}
fan.sys.List.prototype.findType = function(t)
{
var acc = fan.sys.List.make(t);
for (var i=0; i<this.m_size; ++i)
{
var item = this.m_values[i];
if (item != null && fan.sys.ObjUtil.$typeof(item).is(t))
acc.add(item);
}
return acc;
}
fan.sys.List.prototype.exclude = function(f)
{
var acc = fan.sys.List.make(this.m_of);
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; ++i)
if (f.call(this.m_values[i]) != true)
acc.add(this.m_values[i]);
}
else
{
for (var i=0; i<this.m_size; ++i)
if (f.call(this.m_values[i], i) != true)
acc.add(this.m_values[i]);
}
return acc;
}
fan.sys.List.prototype.any = function(f)
{
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; ++i)
if (f.call(this.m_values[i]) == true)
return true;
}
else
{
for (var i=0; i<this.m_size; ++i)
if (f.call(this.m_values[i], i) == true)
return true;
}
return false;
}
fan.sys.List.prototype.all = function(f)
{
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; ++i)
if (f.call(this.m_values[i]) != true)
return false;
}
else
{
for (var i=0; i<this.m_size; ++i)
if (f.call(this.m_values[i], i) != true)
return false;
}
return true;
}
fan.sys.List.prototype.reduce = function(reduction, f)
{
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; ++i)
reduction = f.call(reduction, this.m_values[i]);
}
else
{
for (var i=0; i<this.m_size; ++i)
reduction = f.call(reduction, this.m_values[i], i);
}
return reduction;
}
fan.sys.List.prototype.map = function(f)
{
var r = f.returns();
if (r == fan.sys.Void.$type) r = fan.sys.Obj.$type.toNullable();
var acc = fan.sys.List.make(r);
if (f.m_params.size() == 1)
{
for (var i=0; i<this.m_size; ++i)
acc.add(f.call(this.m_values[i]));
}
else
{
for (var i=0; i<this.m_size; ++i)
acc.add(f.call(this.m_values[i], i));
}
return acc;
}
fan.sys.List.prototype.max = function(f)
{
if (f === undefined) f = null;
if (this.m_size == 0) return null;
var max = this.m_values[0];
for (var i=1; i<this.m_size; ++i)
{
var s = this.m_values[i];
if (f == null)
max = (s != null && s > max) ? s : max;
else
max = (s != null && f.call(s, max) > 0) ? s : max;
}
return max;
}
fan.sys.List.prototype.min = function(f)
{
if (f === undefined) f = null;
if (this.m_size == 0) return null;
var min = this.m_values[0];
for (var i=1; i<this.m_size; ++i)
{
var s = this.m_values[i];
if (f == null)
min = (s == null || s < min) ? s : min;
else
min = (s == null || f.call(s, min) < 0) ? s : min;
}
return min;
}
fan.sys.List.prototype.unique = function()
{
var dups = fan.sys.Map.make(fan.sys.Obj.$type, fan.sys.Obj.$type);
var acc = fan.sys.List.make(this.m_of);
for (var i=0; i<this.m_size; ++i)
{
var v = this.m_values[i];
var key = v;
if (key == null) key = "__null_key__";
if (dups.get(key) == null)
{
dups.set(key, this);
acc.add(v);
}
}
return acc;
}
fan.sys.List.prototype.union = function(that)
{
var dups = fan.sys.Map.make(fan.sys.Obj.$type, fan.sys.Obj.$type);
var acc = fan.sys.List.make(this.m_of);
for (var i=0; i<this.m_size; ++i)
{
var v = this.m_values[i];
var key = v;
if (key == null) key = "__null_key__";
if (dups.get(key) == null)
{
dups.set(key, this);
acc.add(v);
}
}
for (var i=0; i<that.m_size; ++i)
{
var v = that.m_values[i];
var key = v;
if (key == null) key = "__null_key__";
if (dups.get(key) == null)
{
dups.set(key, this);
acc.add(v);
}
}
return acc;
}
fan.sys.List.prototype.intersection = function(that)
{
var dups = fan.sys.Map.make(fan.sys.Obj.$type, fan.sys.Obj.$type);
for (var i=0; i<that.m_size; ++i)
{
var v = that.m_values[i];
var key = v;
if (key == null) key = "__null_key__";
dups.set(key, this);
}
var acc = fan.sys.List.make(this.m_of);
for (var i=0; i<this.m_size; ++i)
{
var v = this.m_values[i];
var key = v;
if (key == null) key = "__null_key__";
if (dups.get(key) != null)
{
acc.add(v);
dups.remove(key);
}
}
return acc;
}
fan.sys.List.prototype.sort = function(f)
{
this.modify();
if (f === undefined) f = null;
if (f != null)
this.m_values.sort(function(a,b) { return f.call(a,b) });
else
this.m_values.sort();
return this;
}
fan.sys.List.prototype.sortr = function(f)
{
this.modify();
if (f === undefined) f = null;
if (f != null)
this.m_values.sort(function(a,b) { return f.call(b,a) });
else
this.m_values.sort().reverse();
return this;
}
fan.sys.List.prototype.moveTo = function(item, toIndex)
{
this.modify();
var curIndex = this.index(item);
if (curIndex == null) return this;
if (curIndex == toIndex) return this;
this.removeAt(curIndex);
if (toIndex == -1) return this.add(item);
if (toIndex < 0) ++toIndex;
return this.insert(toIndex, item);
}
fan.sys.List.prototype.join = function(sep, f)
{
if (sep === undefined) sep = "";
if (f === undefined) f = null;
if (this.m_size === 0) return "";
if (this.m_size === 1)
{
var v = this.m_values[0];
if (f != null) return f.call(v, 0);
if (v == null) return "null";
return fan.sys.ObjUtil.toStr(v);
}
var s = ""
for (var i=0; i<this.m_size; ++i)
{
if (i > 0) s += sep;
if (f == null)
s += this.m_values[i];
else
s += f.call(this.m_values[i], i);
}
return s;
}
fan.sys.List.prototype.toStr = function()
{
if (this.m_size == 0) return "[,]";
var s = "[";
for (var i=0; i<this.m_size; i++)
{
if (i > 0) s += ", ";
s += this.m_values[i];
}
s += "]";
return s;
}
fan.sys.List.prototype.toCode = function()
{
var s = '';
s += this.m_of.signature();
s += '[';
if (this.m_size == 0) s += ',';
for (var i=0; i<this.m_size; ++i)
{
if (i > 0) s += ', ';
s += fan.sys.ObjUtil.trap(this.m_values[i], "toCode", null);
}
s += ']';
return s;
}
fan.sys.List.prototype.isRW = function()
{
return !this.m_readonly;
}
fan.sys.List.prototype.isRO = function()
{
return this.m_readonly;
}
fan.sys.List.prototype.rw = function()
{
if (!this.m_readonly) return this;
var rw = fan.sys.List.make(this.m_of, this.m_values.slice(0));
rw.m_readonly = false;
rw.m_readonlyList = this;
return rw;
}
fan.sys.List.prototype.ro = function()
{
if (this.m_readonly) return this;
if (this.m_readonlyList == null)
{
var ro = fan.sys.List.make(this.m_of, this.m_values.slice(0));
ro.m_readonly = true;
this.m_readonlyList = ro;
}
return this.m_readonlyList;
}
fan.sys.List.prototype.isImmutable = function()
{
return this.m_immutable;
}
fan.sys.List.prototype.toImmutable = function()
{
if (this.m_immutable) return this;
var temp = [];
for (var i=0; i<this.m_size; ++i)
{
var item = this.m_values[i];
if (item != null)
{
if (item instanceof fan.sys.List) item = item.toImmutable();
else if (item instanceof fan.sys.Map) item = item.toImmutable();
else if (!fan.sys.ObjUtil.isImmutable(item))
throw fan.sys.NotImmutableErr.make("Item [" + i + "] not immutable " +
fan.sys.Type.of(item));
}
temp[i] = item;
}
var ro = fan.sys.List.make(this.m_of, temp);
ro.m_readonly = true;
ro.m_immutable = true;
return ro;
}
fan.sys.List.prototype.modify = function()
{
if (this.m_readonly)
throw fan.sys.ReadonlyErr.make("List is readonly");
if (this.m_readonlyList != null)
{
this.m_readonlyList.m_values = this.m_values.slice(0);
this.m_readonlyList = null;
}
}
fan.sys.Locale = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Locale.fromStr = function(s, checked)
{
if (checked === undefined) checked = true;
var len = s.length;
try
{
if (len == 2)
{
if (fan.sys.Str.isLower(s))
return new fan.sys.Locale(s, s, null);
}
if (len == 5)
{
var lang = s.substring(0, 2);
var country = s.substring(3, 5);
if (fan.sys.Str.isLower(lang) && fan.sys.Str.isUpper(country) && s.charAt(2) == '-')
return new fan.sys.Locale(s, lang, country);
}
}
catch (err) {}
if (!checked) return null;
throw fan.sys.ParseErr.make("Locale", s);
}
fan.sys.Locale.prototype.$ctor = function(str, lang, country)
{
this.m_str       = str;
this.m_lang      = lang;
this.m_country   = country;
this.m_strProps  = fan.sys.Uri.fromStr("locale/" + str + ".props");
this.m_langProps = fan.sys.Uri.fromStr("locale/" + lang + ".props");
}
fan.sys.Locale.cur = function()
{
if (fan.sys.Locale.$cur == null) fan.sys.Locale.$cur = fan.sys.Locale.fromStr("en");
return fan.sys.Locale.$cur;
}
fan.sys.Locale.setCur = function(locale)
{
if (locale == null) throw fan.sys.NullErr.make();
fan.sys.Locale.$cur = locale;
}
fan.sys.Locale.prototype.use = function(func)
{
var old = fan.sys.Locale.cur();
try
{
fan.sys.Locale.setCur(this);
func.call(this);
}
finally
{
fan.sys.Locale.setCur(old);
}
return this;
}
fan.sys.Locale.prototype.lang = function() { return this.m_lang; }
fan.sys.Locale.prototype.country = function() { return this.m_country; }
fan.sys.Locale.prototype.$typeof = function() { return fan.sys.Locale.$type; }
fan.sys.Locale.prototype.hash = function() { return fan.sys.Str.hash(this.m_str); }
fan.sys.Locale.prototype.equals = function(obj)
{
if (obj instanceof fan.sys.Locale)
return obj.m_str == this.m_str;
return false;
}
fan.sys.Locale.prototype.toStr = function() { return this.m_str; }
fan.sys.Log = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Log.prototype.$ctor = function()
{
this.m_name  = null;
this.m_level = fan.sys.LogLevel.m_info;
}
fan.sys.Log.list = function()
{
return fan.sys.List.make(fan.sys.Log.$type, fan.sys.Log.m_byName).ro();
}
fan.sys.Log.find = function(name, checked)
{
if (checked === undefined) checked = true;
var log = fan.sys.Log.m_byName[name];
if (log != null) return log;
if (checked) throw fan.sys.Err.make("Unknown log: " + name);
return null;
}
fan.sys.Log.get = function(name)
{
var log = fan.sys.Log.m_byName[name];
if (log != null) return log;
return fan.sys.Log.make(name, true);
}
fan.sys.Log.make = function(name, register)
{
var self = new fan.sys.Log();
fan.sys.Log.make$(self, name, register);
return self;
}
fan.sys.Log.make$ = function(self, name, register)
{
fan.sys.Uri.checkName(name);
self.m_name = name;
if (register)
{
if (fan.sys.Log.m_byName[name] != null)
throw fan.sys.ArgErr.make("Duplicate log name: " + name);
fan.sys.Log.m_byName[name] = self;
}
}
fan.sys.Log.m_byName = [];
fan.sys.Log.prototype.$typeof = function() { return fan.sys.Log.$type; }
fan.sys.Log.prototype.toStr = function() { return this.m_name; }
fan.sys.Log.prototype.name = function() { return this.m_name; }
fan.sys.Log.prototype.level = function()
{
return this.m_level;
}
fan.sys.Log.prototype.level$ = function(level)
{
if (level == null) throw fan.sys.ArgErr.make("level cannot be null");
this.m_level = level;
}
fan.sys.Log.prototype.enabled = function(level)
{
return this.m_level.m_ordinal <= level.m_ordinal;
}
fan.sys.Log.prototype.isEnabled = function(level)
{
return this.enabled(level);
}
fan.sys.Log.prototype.isErr = function()   { return this.isEnabled(fan.sys.LogLevel.m_err); }
fan.sys.Log.prototype.isWarn = function()  { return this.isEnabled(fan.sys.LogLevel.m_warn); }
fan.sys.Log.prototype.isInfo = function()  { return this.isEnabled(fan.sys.LogLevel.m_info); }
fan.sys.Log.prototype.isDebug = function() { return this.isEnabled(fan.sys.LogLevel.m_debug); }
fan.sys.Log.prototype.err = function(msg, err)
{
this.log(fan.sys.LogRec.make(fan.sys.DateTime.now(), fan.sys.LogLevel.m_err, this.m_name, msg, err));
}
fan.sys.Log.prototype.warn = function(msg, err)
{
this.log(fan.sys.LogRec.make(fan.sys.DateTime.now(), fan.sys.LogLevel.m_warn, this.m_name, msg, err));
}
fan.sys.Log.prototype.info = function(msg, err)
{
this.log(fan.sys.LogRec.make(fan.sys.DateTime.now(), fan.sys.LogLevel.m_info, this.m_name, msg, err));
}
fan.sys.Log.prototype.debug = function(msg, err)
{
this.log(fan.sys.LogRec.make(fan.sys.DateTime.now(), fan.sys.LogLevel.m_debug, this.m_name, msg, err));
}
fan.sys.Log.prototype.log = function(rec)
{
if (!this.enabled(rec.m_level)) return;
for (var i=0; i<fan.sys.Log.m_handlers.length; ++i)
{
try { fan.sys.Log.m_handlers[i].call(rec); }
catch (e) { fan.sys.Err.make(e).trace(); }
}
}
fan.sys.Log.handlers = function()
{
return fan.sys.List.make(fan.sys.Func.$type, fan.sys.Log.m_handlers).ro();
}
fan.sys.Log.addHandler = function(func)
{
if (!func.isImmutable()) throw fan.sys.NotImmutableErr.make("handler must be immutable");
fan.sys.Log.m_handlers.push(func);
}
fan.sys.Log.removeHandler = function(func)
{
var index = null;
for (var i=0; i<fan.sys.Log.m_handlers.length; i++)
if (fan.sys.Log.m_handlers[i] == func) { index=i; break }
if (index == null) return;
fan.sys.Log.m_handlers.splice(index, 1);
}
fan.sys.Log.m_handlers = [];
fan.sys.LogLevel = fan.sys.Obj.$extend(fan.sys.Enum);
fan.sys.LogLevel.prototype.$ctor = function(ordinal, name)
{
fan.sys.Enum.make$(this, ordinal, name);
}
fan.sys.LogLevel.fromStr = function(name, checked)
{
if (checked === undefined) checked = true;
return fan.sys.Enum.doFromStr(fan.sys.LogLevel.$type, name, checked);
}
fan.sys.LogLevel.prototype.$typeof = function()
{
return fan.sys.LogLevel.$type;
}
fan.sys.LogRec = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.LogRec.prototype.$ctor = function() {}
fan.sys.LogRec.make = function(time, level, logName, msg, err)
{
if (err === undefined) err = null;
var self = new fan.sys.LogRec();
self.m_time    = time;
self.m_level   = level;
self.m_logName = logName;
self.m_msg     = msg;
self.m_err     = err;
return self;
}
fan.sys.LogRec.prototype.toStr = function()
{
var ts = this.m_time.toLocale("hh:mm:ss DD-MMM-YY");
return '[' + ts + '] [' + this.m_level + '] [' + this.m_logName + '] ' + this.m_msg;
}
fan.sys.LogRec.prototype.print = function(out)
{
fan.sys.ObjUtil.echo(this.toStr());
if (this.m_err != null) this.m_err.trace();
}
fan.sys.LogRec.prototype.$typeof = function() { return fan.sys.LogRec.$type; }
fan.sys.Map = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Map.make = function(k, v)
{
var mt = null;
if (k !== undefined && v === undefined)
{
mt = k;
}
else
{
if (k === undefined) k = fan.sys.Obj.$type;
if (v === undefined) v = fan.sys.Obj.$type.toNullable();
mt = new fan.sys.MapType(k, v);
}
var self = new fan.sys.Map();
self.keyMap = {};
self.valMap = {};
self.m_readonly = false;
self.m_immutable = false;
self.m_type = mt;
self.m_def = null;
return self;
}
fan.sys.Map.prototype.$ctor = function()
{
}
fan.sys.Map.prototype.$typeof = function()
{
return this.m_type;
}
fan.sys.Map.prototype.isEmpty = function() { return this.size() == 0; }
fan.sys.Map.prototype.size = function()
{
var sz = 0;
for (var k in this.valMap) sz++;
return sz;
}
fan.sys.Map.prototype.get = function(key, defVal)
{
if (defVal === undefined) defVal = this.m_def;
var k = this.hashKey(key);
var val = this.valMap[k];
if (val == null && defVal != null)
return defVal;
return val;
}
fan.sys.Map.prototype.containsKey = function(key)
{
var hash = this.hashKey(key);
for (var k in this.keyMap)
if (k == hash)
return true;
return false;
}
fan.sys.Map.prototype.keys = function()
{
var list = [];
for (var k in this.keyMap) list.push(this.keyMap[k]);
return fan.sys.List.make(this.m_type.k, list);
}
fan.sys.Map.prototype.vals = function()
{
var list = [];
for (var k in this.valMap) list.push(this.valMap[k]);
return fan.sys.List.make(this.m_type.v, list);
}
fan.sys.Map.prototype.set = function(key, val)
{
this.modify();
if (key == null)
throw fan.sys.NullErr.make("key is null");
if (!fan.sys.ObjUtil.isImmutable(key))
throw fan.sys.NotImmutableErr.make("key is not immutable: " + fan.sys.ObjUtil.$typeof(key));
var k = this.hashKey(key);
if (this.keyMap[k] == null) this.keyMap[k] = key;
this.valMap[k] = val;
return this;
}
fan.sys.Map.prototype.add = function(key, val)
{
this.modify();
if (key == null)
throw fan.sys.NullErr.make("key is null");
if (!fan.sys.ObjUtil.isImmutable(key))
throw fan.sys.NotImmutableErr.make("key is not immutable: " + fan.sys.ObjUtil.$typeof(key));
var k = this.hashKey(key);
var old = this.valMap[k];
if (old != null)
throw fan.sys.ArgErr.make("Key already mapped: " + key);
this.keyMap[k] = key;
this.valMap[k] = val;
return this;
}
fan.sys.Map.prototype.getOrAdd = function(key, valFunc)
{
var k = this.hashKey(key);
var val = this.valMap[k];
if (val != null) return val;
val = valFunc.call(key);
this.add(key, val);
return val;
}
fan.sys.Map.prototype.setAll = function(m)
{
this.modify();
var keys = m.keys();
var len = keys.size();
for (var i=0; i<len; i++)
{
var key = keys.get(i);
this.set(key, m.get(key));
}
return this;
}
fan.sys.Map.prototype.addAll = function(m)
{
this.modify();
var keys = m.keys();
var len = keys.size();
for (var i=0; i<len; i++)
{
var key = keys.get(i);
this.add(key, m.get(key));
}
return this;
}
fan.sys.Map.prototype.setList = function(list, f)
{
this.modify();
if (f === undefined) f = null;
if (f == null)
{
for (var i=0; i<list.size(); ++i)
this.set(list.get(i), list.get(i));
}
else if (f.m_params.size() == 1)
{
for (var i=0; i<list.size(); ++i)
this.set(f.call(list.get(i)), list.get(i));
}
else
{
for (var i=0; i<list.size(); ++i)
this.set(f.call(list.get(i), i), list.get(i));
}
return this;
}
fan.sys.Map.prototype.addList = function(list, f)
{
this.modify();
if (f === undefined) f = null;
if (f == null)
{
for (var i=0; i<list.size(); ++i)
this.add(list.get(i), list.get(i));
}
else if (f.m_params.size() == 1)
{
for (var i=0; i<list.size(); ++i)
this.add(f.call(list.get(i)), list.get(i));
}
else
{
for (var i=0; i<list.size(); ++i)
this.add(f.call(list.get(i), i), list.get(i));
}
return this;
}
fan.sys.Map.prototype.remove = function(key)
{
this.modify();
var k = this.hashKey(key);
var v = this.valMap[k];
delete this.keyMap[k];
delete this.valMap[k];
return v;
}
fan.sys.Map.prototype.dup = function()
{
var dup = fan.sys.Map.make(this.m_type.k, this.m_type.v);
for (k in this.keyMap) dup.keyMap[k] = this.keyMap[k];
for (k in this.valMap) dup.valMap[k] = this.valMap[k];
dup.m_caseInsensitive = this.m_caseInsensitive;
dup.m_ordered = this.m_ordered;
dup.m_def = this.m_def;
return dup;
}
fan.sys.Map.prototype.clear = function()
{
this.modify();
this.keyMap = {};
this.valMap = {};
return this;
}
fan.sys.Map.prototype.m_caseInsensitive = false;
fan.sys.Map.prototype.caseInsensitive = function() { return this.m_caseInsensitive; }
fan.sys.Map.prototype.caseInsensitive$ = function(val)
{
this.modify();
if (this.m_type.k != fan.sys.Str.$type)
throw fan.sys.UnsupportedErr.make("Map not keyed by Str: " + this.m_type);
if (this.size() != 0)
throw fan.sys.UnsupportedErr.make("Map not empty");
if (val && this.ordered())
throw fan.sys.UnsupportedErr.make("Map cannot be caseInsensitive and ordered");
this.m_caseInsensitive = val;
}
fan.sys.Map.prototype.m_ordered = false;
fan.sys.Map.prototype.ordered = function() { return this.m_ordered; }
fan.sys.Map.prototype.ordered$ = function(val)
{
this.modify();
if (this.size() != 0)
throw fan.sys.UnsupportedErr.make("Map not empty");
if (val && this.caseInsensitive())
throw fan.sys.UnsupportedErr.make("Map cannot be caseInsensitive and ordered");
this.m_ordered = val;
}
fan.sys.Map.prototype.def = function() { return this.m_def; }
fan.sys.Map.prototype.def$ = function(val)
{
this.modify();
if (val != null && !fan.sys.ObjUtil.isImmutable(val))
throw fan.sys.NotImmutableErr.make("def must be immutable: " + fan.sys.ObjUtil.$typeof(val));
this.m_def = val;
}
fan.sys.Map.prototype.equals = function(that)
{
if (that != null)
{
if (!this.m_type.equals(that.m_type)) return false;
var selfNum = 0;
for (var k in this.valMap)
{
if (!fan.sys.ObjUtil.equals(this.valMap[k], that.valMap[k])) return false;
selfNum++;
}
var thatNum = 0;
for (var k in that.valMap) thatNum++;
return selfNum == thatNum;
}
return false;
}
fan.sys.Map.prototype.hash = function()
{
return 0;
}
fan.sys.Map.prototype.toStr = function()
{
var s = "";
for (var k in this.valMap)
{
if (s.length > 0) s += ", ";
s += this.keyMap[k] + ":" + this.valMap[k];
}
if (s.length == 0) return "[:]";
return "[" + s + "]";
}
fan.sys.Map.prototype.each = function(f)
{
for (var k in this.keyMap)
{
var key = this.keyMap[k];
var val = this.valMap[k];
f.call(val, key);
}
}
fan.sys.Map.prototype.eachWhile = function(f)
{
for (var k in this.keyMap)
{
var key = this.keyMap[k];
var val = this.valMap[k];
var r = f.call(val, key);
if (r != null) return r;
}
return null;
}
fan.sys.Map.prototype.find = function(f)
{
for (var k in this.keyMap)
{
var key = this.keyMap[k];
var val = this.valMap[k];
if (f.call(val, key))
return val;
}
return null;
}
fan.sys.Map.prototype.findAll = function(f)
{
var acc = fan.sys.Map.make(this.m_type.k, this.m_type.v);
for (var k in this.keyMap)
{
var key = this.keyMap[k];
var val = this.valMap[k];
if (f.call(val, key))
acc.set(key, val);
}
return acc;
}
fan.sys.Map.prototype.exclude = function(f)
{
var acc = fan.sys.Map.make(this.m_type.k, this.m_type.v);
for (var k in this.keyMap)
{
var key = this.keyMap[k];
var val = this.valMap[k];
if (!f.call(val, key))
acc.set(key, val);
}
return acc;
}
fan.sys.Map.prototype.any = function(f)
{
if (this.size() == 0) return false;
for (var k in this.keyMap)
{
var key = this.keyMap[k];
var val = this.valMap[k];
if (f.call(val, key))
return true;
}
return false;
}
fan.sys.Map.prototype.all = function(f)
{
if (this.size() == 0) return true;
for (var k in this.keyMap)
{
var key = this.keyMap[k];
var val = this.valMap[k];
if (!f.call(val, key))
return false;
}
return true;
}
fan.sys.Map.prototype.reduce = function(reduction, f)
{
for (var k in this.keyMap)
{
var key = this.keyMap[k];
var val = this.valMap[k];
reduction = f.call(reduction, val, key)
}
return reduction;
}
fan.sys.Map.prototype.map = function(f)
{
var r = f.returns();
if (r == fan.sys.Void.$type) r = fan.sys.Obj.$type.toNullable();
var acc = fan.sys.Map.make(this.m_type.k, r);
for (var k in this.keyMap)
{
var key = this.keyMap[k];
var val = this.valMap[k];
acc.set(key, f.call(val, key));
}
return acc;
}
fan.sys.Map.prototype.join = function(sep, f)
{
if (f === undefined) f = null;
var size = this.size();
if (size == 0) return '';
var s = '';
for (var k in this.keyMap)
{
var key = this.keyMap[k];
var val = this.valMap[k];
if (s.length > 0) s += sep;
if (f == null)
s += key + ": " + val;
else
s += f.call(val, key);
}
return s;
}
fan.sys.Map.prototype.toCode = function()
{
var size = this.size();
var s = '';
s += this.m_type.signature();
s += '[';
if (size == 0) s += ':';
var first = true;
for (var k in this.keyMap)
{
var key = this.keyMap[k];
var val = this.valMap[k];
if (first) first = false;
else s += ', ';
s += fan.sys.ObjUtil.trap(key, "toCode", null)
+ ':'
+ fan.sys.ObjUtil.trap(val, "toCode", null);
}
s += ']';
return s;
}
fan.sys.Map.prototype.isRW = function() { return !this.m_readonly; }
fan.sys.Map.prototype.isRO = function() { return this.m_readonly; }
fan.sys.Map.prototype.rw = function()
{
if (!this.m_readonly) return this;
var rw = this.dup();
rw.m_caseInsensitive = this.m_caseInsensitive;
rw.m_ordered = this.m_ordered;
rw.m_readonly = false;
rw.m_def = this.m_def;
return rw;
}
fan.sys.Map.prototype.ro = function()
{
if (this.m_readonly) return this;
var ro = this.dup();
ro.m_caseInsensitive = this.m_caseInsensitive;
ro.m_ordered = this.m_ordered;
ro.m_readonly = true;
ro.m_def = this.m_def;
return ro;
}
fan.sys.Map.prototype.isImmutable = function() { return this.m_immutable; }
fan.sys.Map.prototype.toImmutable = function()
{
if (this.m_immutable) return this;
var ro = fan.sys.Map.make(this.m_type.k, this.m_type.v);
for (k in this.keyMap) ro.keyMap[k] = this.keyMap[k];
for (k in this.valMap) ro.valMap[k] = fan.sys.ObjUtil.toImmutable(this.valMap[k]);
ro.m_caseInsensitive = this.m_caseInsensitive;
ro.m_ordered = this.m_ordered;
ro.m_readonly = true;
ro.m_immutable = true;
ro.m_def = this.m_def;
return ro;
}
fan.sys.Map.prototype.modify = function()
{
if (this.m_readonly)
throw fan.sys.ReadonlyErr.make("Map is readonly");
}
fan.sys.Map.prototype.hashKey = function(key)
{
if (this.m_caseInsensitive) key = fan.sys.Str.lower(key);
return '' + key;
}
fan.sys.Map.fromLiteral = function(keys, vals, k, v)
{
var map = fan.sys.Map.make(k,v);
for (var i=0; i<keys.length; i++)
map.set(keys[i], vals[i]);
return map;
}
fan.sys.Method = fan.sys.Obj.$extend(fan.sys.Slot);
fan.sys.Method.prototype.$ctor = function(parent, name, flags, params)
{
this.m_parent = parent;
this.m_name   = name;
this.m_qname  = parent.qname() + "." + name;
this.m_flags  = flags;
this.m_params = params;
this.m_$name  = this.$name(name);
this.m_$qname = this.m_parent.m_$qname + '.' + this.m_$name;
}
fan.sys.Method.prototype.invoke = function(instance, args)
{
var func = (this.isCtor() || this.isStatic())
? eval(this.m_$qname)
: instance[this.m_$name];
var vals = args==null ? [] : args.m_values;
if (func == null && instance != null)
{
func = eval(this.m_$qname);
vals.splice(0, 0, instance);
instance = null;
}
return func.apply(instance, vals);
}
fan.sys.Method.prototype.$typeof = function() { return fan.sys.Method.$type; }
fan.sys.Method.prototype.params  = function() { return this.m_params.ro(); }
fan.sys.Method.prototype.callOn = function(target, args) { return this.invoke(target, args); }
fan.sys.Method.prototype.call = function()
{
var instance = null;
var args = arguments;
if (!this.isStatic())
{
instance = args[0];
args = Array.prototype.slice.call(args).slice(1);
}
return this.invoke(instance, fan.sys.List.make(fan.sys.Obj.$type, args));
}
fan.sys.MimeType = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.MimeType.prototype.$ctor = function() {}
fan.sys.MimeType.fromStr = function(s, checked)
{
if (checked === undefined) checked = true;
try
{
switch (s.charAt(0))
{
case 'i':
if (s == "image/png")  return fan.sys.MimeType.m_imagePng;
if (s == "image/jpeg") return fan.sys.MimeType.m_imageJpeg;
if (s == "image/gif")  return fan.sys.MimeType.m_imageGif;
break;
case 't':
if (s == "text/plain") return fan.sys.MimeType.m_textPlain;
if (s == "text/html")  return fan.sys.MimeType.m_textHtml;
if (s == "text/xml")   return fan.sys.MimeType.m_textXml;
break;
case 'x':
if (s == "x-directory/normal") return fan.sys.MimeType.m_dir;
break;
}
var slash = s.indexOf('/');
var media = s.substring(0, slash);
var sub = s.substring(slash+1, s.length);
var params = fan.sys.MimeType.emptyParams();
var semi = sub.indexOf(';');
if (semi > 0)
{
params = fan.sys.MimeType.doParseParams(sub, semi+1);
sub = fan.sys.Str.trim(sub.substring(0, semi));
}
var r = new fan.sys.MimeType();
r.m_str = s;
r.m_mediaType = fan.sys.Str.lower(media);
r.m_subType   = fan.sys.Str.lower(sub);
r.m_params    = params.ro();
return r;
}
catch (err)
{
if (!checked) return null;
throw fan.sys.ParseErr.make("MimeType",  s);
}
}
fan.sys.MimeType.parseParams = function(s, checked)
{
if (checked === undefined) checked = true;
try
{
return fan.sys.MimeType.doParseParams(s, 0);
}
catch (err)
{
if (!checked) return null;
if (err instanceof fan.sys.ParseErr) throw err;
throw fan.sys.ParseErr.make("MimeType params",  s);
}
}
fan.sys.MimeType.doParseParams = function(s, offset)
{
var params = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type);
params.caseInsensitive$(true);
var inQuotes = false;
var keyStart = offset;
var valStart = -1;
var valEnd   = -1;
var eq       = -1;
var hasEsc   = false;
for (var i=keyStart; i<s.length; ++i)
{
var c = s.charAt(i);
if (c == '(' && !inQuotes)
throw fan.sys.ParseErr.make("MimeType", s, "comments not supported");
if (c == '=' && !inQuotes)
{
eq = i++;
while (fan.sys.Int.isSpace(s.charAt(i))) ++i;
if (s.charAt(i) == '"') { inQuotes = true; ++i; }
else inQuotes = false;
valStart = i;
}
if (eq < 0) continue;
if (c == '\\' && inQuotes)
{
++i;
hasEsc = true;
continue;
}
if (c == '"' && inQuotes)
{
valEnd = i-1;
inQuotes = false;
}
if (c == ';' && !inQuotes)
{
if (valEnd < 0) valEnd = i-1;
var key = fan.sys.Str.trim(s.substring(keyStart, eq));
var val = fan.sys.Str.trim(s.substring(valStart, valEnd+1));
if (hasEsc) val = fan.sys.MimeType.unescape(val);
params.set(key, val);
keyStart = i+1;
eq = valStart = valEnd = -1;
hasEsc = false;
}
}
if (keyStart < s.length)
{
if (valEnd < 0) valEnd = s.length-1;
var key = fan.sys.Str.trim(s.substring(keyStart, eq));
var val = fan.sys.Str.trim(s.substring(valStart, valEnd+1));
if (hasEsc) val = fan.sys.MimeType.unescape(val);
params.set(key, val);
}
return params;
}
fan.sys.MimeType.unescape = function(s)
{
var buf = "";
for (var i=0; i<s.length; ++i)
{
var c = s.charAt(i);
if (c != '\\') buf += c;
else if (s.charAt(i+1) == '\\') { buf += '\\'; i++; }
}
return buf;
}
fan.sys.MimeType.forExt = function(s)
{
if (s == null) return null;
try
{
return null;
}
catch (err)
{
fan.sys.ObjUtil.echo("MimeType.forExt: " + s);
fan.sys.ObjUtil.echo(err);
return null;
}
}
fan.sys.MimeType.prototype.equals = function(obj)
{
if (obj instanceof fan.sys.MimeType)
{
return this.m_mediaType == obj.m_mediaType &&
this.m_subType == obj.m_subType &&
this.m_params.equals(obj.m_params);
}
return false;
}
fan.sys.MimeType.prototype.hash = function()
{
return 0;
}
fan.sys.MimeType.prototype.toStr = function() { return this.m_str; }
fan.sys.MimeType.prototype.$typeof = function() { return fan.sys.MimeType.$type; }
fan.sys.MimeType.prototype.mediaType = function() { return this.m_mediaType; }
fan.sys.MimeType.prototype.subType = function() { return this.m_subType; }
fan.sys.MimeType.prototype.params = function() { return this.m_params; }
fan.sys.MimeType.emptyParams = function()
{
var q = fan.sys.MimeType.emptyQuery;
if (q == null)
{
q = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type);
q.caseInsensitive$(true);
fan.sys.MimeType.emptyQuery = q;
}
return q;
}
fan.sys.MimeType.emptyQuery = null;
fan.sys.MimeType.predefined = function(media, sub)
{
var t = new fan.sys.MimeType();
t.m_mediaType = media;
t.m_subType = sub;
t.m_params = fan.sys.MimeType.emptyParams();
t.m_str = media + "/" + sub;
return t;
}
fan.sys.Month = fan.sys.Obj.$extend(fan.sys.Enum);
fan.sys.Month.prototype.$ctor = function(ordinal, name)
{
fan.sys.Enum.make$(this, ordinal, name);
}
fan.sys.Month.fromStr = function(name, checked)
{
if (checked === undefined) checked = true;
return fan.sys.Enum.doFromStr(fan.sys.Month.$type, name, checked);
}
fan.sys.Month.prototype.increment = function()
{
var arr = fan.sys.Month.m_vals;
return arr.get((this.m_ordinal+1) % arr.size());
}
fan.sys.Month.prototype.decrement = function()
{
var arr = fan.sys.Month.m_vals;
return this.m_ordinal == 0 ? arr.get(arr.size()-1) : arr.get(this.m_ordinal-1);
}
fan.sys.Month.prototype.numDays = function(year)
{
if (fan.sys.DateTime.isLeapYear(year))
return fan.sys.DateTime.daysInMonLeap[this.m_ordinal];
else
return fan.sys.DateTime.daysInMon[this.m_ordinal];
}
fan.sys.Month.prototype.$typeof = function()
{
return fan.sys.Month.$type;
}
fan.sys.Month.prototype.localeAbbr = function() { return this.abbr(null); }
fan.sys.Month.prototype.abbr = function(locale)
{
switch (this.m_ordinal)
{
case 0:  return "Jan";
case 1:  return "Feb";
case 2:  return "Mar";
case 3:  return "Apr";
case 4:  return "May";
case 5:  return "Jun";
case 6:  return "Jul";
case 7:  return "Aug";
case 8:  return "Sep";
case 9:  return "Oct";
case 10: return "Nov";
case 11: return "Dec";
}
}
fan.sys.Month.prototype.localeFull = function() { return this.abbr(null); }
fan.sys.Month.prototype.full = function(locale)
{
switch (this.m_ordinal)
{
case 0:  return "January";
case 1:  return "February";
case 2:  return "March";
case 3:  return "April";
case 4:  return "May";
case 5:  return "June";
case 6:  return "July";
case 7:  return "August";
case 8:  return "September";
case 9:  return "October";
case 10: return "November";
case 11: return "December";
}
}
fan.sys.OutStream = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.OutStream.prototype.$ctor = function()
{
this.out = null;
this.m_charset=fan.sys.Charset.utf8();
this.m_bigEndian = true;
}
fan.sys.OutStream.make$ = function(self, out) { self.out = out; }
fan.sys.OutStream.prototype.$typeof = function() { return fan.sys.OutStream.$type; }
fan.sys.OutStream.prototype.write = function(x)
{
try
{
this.out.write(x);
return this;
}
catch (err)
{
if (this.out == null)
throw fan.sys.UnsupportedErr.make(this.$typeof().qname() + " wraps null OutStream");
else
throw err;
}
}
fan.sys.OutStream.prototype.writeBuf = function(buf, n)
{
if (n === undefined) n = buf.remaining();
try
{
this.out.writeBuf(buf, n);
return this;
}
catch (err)
{
if (this.out == null)
throw fan.sys.UnsupportedErr.make(this.$typeof().qname() + " wraps null OutStream");
else
throw err;
}
}
fan.sys.OutStream.prototype.endian = function()
{
return this.m_bigEndian ? fan.sys.Endian.m_big : fan.sys.Endian.m_little;
}
fan.sys.OutStream.prototype.endian$ = function(endian)
{
this.m_bigEndian = (endian == fan.sys.Endian.m_big);
}
fan.sys.OutStream.prototype.writeI2 = function(x)
{
if (this.m_bigEndian)
return this.write((x >>> 8) & 0xFF)
.write((x >>> 0) & 0xFF);
else
return this.write((x >>> 0) & 0xFF)
.write((x >>> 8) & 0xFF);
}
fan.sys.OutStream.prototype.writeI4 = function(x)
{
if (this.m_bigEndian)
return this.write((x >>> 24) & 0xFF)
.write((x >>> 16) & 0xFF)
.write((x >>> 8)  & 0xFF)
.write((x >>> 0)  & 0xFF);
else
return this.write((x >>> 0)  & 0xFF)
.write((x >>> 8)  & 0xFF)
.write((x >>> 16) & 0xFF)
.write((x >>> 24) & 0xFF);
}
fan.sys.OutStream.prototype.writeDecimal = function(x)
{
return this.writeUtf(x.toString());
}
fan.sys.OutStream.prototype.writeBool = function(x)
{
return this.write(x ? 1 : 0);
}
fan.sys.OutStream.prototype.writeUtf = function(s)
{
var slen = s.length;
var utflen = 0;
var i = 0;
for (i=0; i<slen; ++i)
{
var c = s.charCodeAt(i);
if (c <= 0x007F)
utflen +=1;
else if (c > 0x07FF)
utflen += 3;
else
utflen += 2;
}
if (utflen > 65536) throw fan.sys.IOErr.make("String too big");
this.write((utflen >>> 8) & 0xFF);
this.write((utflen >>> 0) & 0xFF);
for (i=0; i<slen; ++i)
{
var c = s.charCodeAt(i);
if (c <= 0x007F)
{
this.write(c);
}
else if (c > 0x07FF)
{
this.write(0xE0 | ((c >> 12) & 0x0F));
this.write(0x80 | ((c >>  6) & 0x3F));
this.write(0x80 | ((c >>  0) & 0x3F));
}
else
{
this.write(0xC0 | ((c >>  6) & 0x1F));
this.write(0x80 | ((c >>  0) & 0x3F));
}
}
return this;
}
fan.sys.OutStream.prototype.charset = function() { return this.m_charset; }
fan.sys.OutStream.prototype.charset$ = function(charset) { this.m_charset = charset; }
fan.sys.OutStream.prototype.writeChar = function(c)
{
if (this.out != null)
{
this.out.writeChar(c)
return this;
}
else return this.m_charset.m_encoder.encodeOut(c, this);
}
fan.sys.OutStream.prototype.writeChars = function(s, off, len)
{
if (off === undefined) off = 0;
if (len === undefined) len = s.length-off;
var end = off+len;
for (var i=off; i<end; i++)
this.writeChar(s.charCodeAt(i));
return this;
}
fan.sys.OutStream.prototype.print = function(obj)
{
var s = obj == null ? "null" : fan.sys.ObjUtil.toStr(obj);
return this.writeChars(s, 0, s.length);
}
fan.sys.OutStream.prototype.printLine = function(obj)
{
if (obj === undefined) obj = "";
var s = obj == null ? "null" : fan.sys.ObjUtil.toStr(obj);
this.writeChars(s, 0, s.length);
return this.writeChars('\n', 0, 1);
}
fan.sys.OutStream.prototype.writeObj = function(obj, options)
{
if (options === undefined) options = null;
new fanx_ObjEncoder(this, options).writeObj(obj);
return this;
}
fan.sys.OutStream.prototype.flush = function()
{
if (this.out != null) this.out.flush();
return this;
}
fan.sys.OutStream.prototype.writeProps = function(props, close)
{
if (close === undefined) close = true;
var origCharset = this.charset();
this.charset$(fan.sys.Charset.utf8());
try
{
var keys = props.keys().sort();
var size = keys.size();
for (var i=0; i<size; ++i)
{
var key = keys.get(i);
var val = props.get(key);
this.writePropStr(key);
this.writeChar(61);
this.writePropStr(val);
this.writeChar(10);
}
return this;
}
finally
{
try { if (close) this.close(); } catch (err) { fan.sys.ObjUtil.echo(err); }
this.charset$(origCharset);
}
}
fan.sys.OutStream.prototype.writePropStr = function(s)
{
var len = s.length;
for (var i=0; i<len; ++i)
{
var ch = s.charCodeAt(i);
var peek = i+1<len ? s.charCodeAt(i+1) : -1;
switch (ch)
{
case 10: this.writeChar(92).writeChar(110); continue;
case 13: this.writeChar(92).writeChar(114); continue;
case 09: this.writeChar(92).writeChar(116); continue;
case 92: this.writeChar(92).writeChar(92); continue;
}
if ((ch < 32) || (ch == 47 && (peek == 47 || peek == 42)) || (ch == 61))
{
var nib1 = fan.sys.Int.toDigit((ch >>> 4) & 0xf, 16);
var nib2 = fan.sys.Int.toDigit((ch >>> 0) & 0xf, 16);
this.writeChar(92).writeChar(117)
.writeChar(48).writeChar(48)
.writeChar(nib1).writeChar(nib2);
continue;
}
this.writeChar(ch);
}
}
fan.sys.OutStream.prototype.writeXml = function(s, mask)
{
if (mask === undefined) mask = 0;
var escNewlines  = (mask & fan.sys.OutStream.m_xmlEscNewlines) != 0;
var escQuotes    = (mask & fan.sys.OutStream.m_xmlEscQuotes) != 0;
var escUnicode   = (mask & fan.sys.OutStream.m_xmlEscUnicode) != 0;
for (var i=0; i<s.length; ++i)
{
var ch = s.charCodeAt(i);
switch (ch)
{
case  0: case  1: case  2: case  3: case  4: case  5: case  6:
case  7: case  8: case 11: case 12:
case 14: case 15: case 16: case 17: case 18: case 19: case 20:
case 21: case 22: case 23: case 24: case 25: case 26: case 27:
case 28: case 29: case 30: case 31:
this.writeXmlEsc(ch);
break;
case 10: case 13:
if (!escNewlines)
this.writeChar(ch);
else
this.writeXmlEsc(ch);
break;
case 32:
this.writeChar(32);
break;
case 33: case 35: case 36: case 37: case 40: case 41: case 42:
case 43: case 44: case 45: case 46: case 47: case 48: case 49:
case 50: case 51: case 52: case 53: case 54: case 55: case 56:
case 57: case 58: case 59: case 61: case 63: case 64: case 65:
case 66: case 67: case 68: case 69: case 70: case 71: case 72:
case 73: case 74: case 75: case 76: case 77: case 78: case 79:
case 80: case 81: case 82: case 83: case 84: case 85: case 86:
case 87: case 88: case 89: case 90: case 91: case 92: case 93:
case 94: case 95: case 96: case 97: case 98: case 99: case 100:
case 101: case 102: case 103: case 104: case 105: case 106: case 107:
case 108: case 109: case 110: case 111: case 112: case 113: case 114:
case 115: case 116: case 117: case 118: case 119: case 120: case 121:
case 122: case 123: case 124: case 125: case 126:
this.writeChar(ch);
break;
case 60:
this.writeChar(38);
this.writeChar(108);
this.writeChar(116);
this.writeChar(59);
break;
case 62:
if (i > 0 && s.charCodeAt(i-1) != 93)
this.writeChar(62);
else
{
this.writeChar(38);
this.writeChar(103);
this.writeChar(116);
this.writeChar(59);
}
break;
case 38:
this.writeChar(38);
this.writeChar(97);
this.writeChar(109);
this.writeChar(112);
this.writeChar(59);
break;
case 34:
if (!escQuotes)
this.writeChar(34);
else
{
this.writeChar(38);
this.writeChar(113);
this.writeChar(117);
this.writeChar(111);
this.writeChar(116);
this.writeChar(59);
}
break;
case 39:
if (!escQuotes)
this.writeChar(39);
else
{
this.writeChar(38);
this.writeChar(97);
this.writeChar(112);
this.writeChar(111);
this.writeChar(115);
this.writeChar(59);
}
break;
default:
if (ch <= 0xf7 || !escUnicode)
this.writeChar(ch);
else
this.writeXmlEsc(ch);
}
}
return this;
}
fan.sys.OutStream.prototype.writeXmlEsc = function(ch)
{
var enc =  this.m_charset.m_encoder;
var hex = "0123456789abcdef";
this.writeChar(38);
this.writeChar(35);
this.writeChar(120);
if (ch > 0xff)
{
this.writeChar(hex.charCodeAt((ch >>> 12) & 0xf));
this.writeChar(hex.charCodeAt((ch >>> 8)  & 0xf));
}
this.writeChar(hex.charCodeAt((ch >>> 4) & 0xf));
this.writeChar(hex.charCodeAt((ch >>> 0) & 0xf));
this.writeChar(59);
}
fan.sys.OutStream.prototype.sync = function()
{
if (this.out != null) this.out.sync();
return this;
}
fan.sys.OutStream.prototype.close = function()
{
if (this.out != null) return this.out.close();
return true;
}
fan.sys.OutStream.prototype.close = function()
{
if (this.out != null) return this.out.close();
return true;
}
fan.sys.SysOutStream = fan.sys.Obj.$extend(fan.sys.OutStream);
fan.sys.SysOutStream.make = function(out, bufSize)
{
return new fan.sys.SysOutStream(fan.sys.SysOutStream.toBuffered(out, bufSize));
}
fan.sys.SysOutStream.toBuffered = function(out, bufSize)
{
if (bufSize == null || bufSize == 0)
return out;
else
return new java.io.BufferedOutputStream(out, bufSize);
}
fan.sys.SysOutStream.prototype.$ctor = function(out)
{
fan.sys.OutStream.prototype.$ctor.call(this);
this.out = out;
}
fan.sys.SysOutStream.prototype.$typeof = function() { return fan.sys.SysOutStream.$type; }
fan.sys.SysOutStream.prototype.w = function(v)
{
try
{
this.out.write(v);
return this;
}
catch (e)
{
throw fan.sys.IOErr.make(e).val;
}
}
fan.sys.SysOutStream.prototype.writeBuf = function(buf, n)
{
if (n === undefined) n = buf.remaining();
try
{
buf.pipeTo(this.out, n);
return this;
}
catch (e)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.SysOutStream.prototype.writeChar = function(c)
{
this.m_charset.m_encoder.encodeOut(c, this);
return this;
}
fan.sys.SysOutStream.prototype.flush = function()
{
try
{
this.out.flush();
return this;
}
catch (e)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.SysOutStream.prototype.close = function()
{
try
{
if (this.out != null) this.out.close();
return true;
}
catch (e)
{
return false;
}
}
fan.sys.LocalFileOutStream = fan.sys.Obj.$extend(fan.sys.SysOutStream);
fan.sys.LocalFileOutStream.prototype.$ctor = function(out, fd)
{
fan.sys.SysOutStream.prototype.$ctor.call(this);
this.out = out;
this.fd = fd;
}
fan.sys.LocalFileOutStream.prototype.sync = function()
{
try
{
this.flush();
this.fd.sync();
return this;
}
catch (e)
{
throw fan.sys.IOErr.make(e);
}
}
fan.sys.Param = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Param.prototype.$ctor = function(name, type, hasDefault)
{
this.m_name = name;
this.m_type = fan.sys.Type.find(type);
this.m_hasDefault = hasDefault;
}
fan.sys.Param.prototype.name = function() { return this.m_name; }
fan.sys.Param.prototype.type = function() { return this.m_type; }
fan.sys.Param.prototype.hasDefault = function() { return this.m_hasDefault; }
fan.sys.Param.prototype.$typeof = function() { return fan.sys.Param.$type; }
fan.sys.Pod = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Pod.of = function(obj)
{
return fan.sys.Type.of(obj).pod();
}
fan.sys.Pod.list = function()
{
if (fan.sys.Pod.$list == null)
{
var pods = fan.sys.Pod.$pods;
var list = fan.sys.List.make(fan.sys.Pod.$type);
for (var n in pods) list.add(pods[n]);
fan.sys.Pod.$list = list.sort().toImmutable();
}
return fan.sys.Pod.$list;
}
fan.sys.Pod.prototype.$ctor = function(name)
{
this.m_name  = name;
this.m_types = [];
}
fan.sys.Pod.prototype.$typeof = function() { return fan.sys.Pod.$type; }
fan.sys.Pod.prototype.name = function()
{
return this.m_name;
}
fan.sys.Pod.prototype.uri = function()
{
if (this.m_uri == null) this.m_uri = fan.sys.Uri.fromStr("fan://" + this.m_name);
return this.m_uri;
}
fan.sys.Pod.prototype.toStr = function() { return this.m_name; }
fan.sys.Pod.prototype.types = function()
{
if (this.$typesArray == null)
{
var arr = [];
for (p in this.m_types) arr.push(this.m_types[p]);
this.$typesArray = fan.sys.List.make(fan.sys.Type.$type, arr);
}
return this.$typesArray;
}
fan.sys.Pod.prototype.findType = function(name, checked)
{
if (checked === undefined) checked = true;
var t = this.m_types[name];
if (t == null && checked)
{
throw fan.sys.UnknownTypeErr.make(this.m_name + "::" + name);
}
return t;
}
fan.sys.Pod.prototype.locale = function(key, def)
{
return fan.sys.Env.cur().locale(this, key, def);
}
fan.sys.Pod.prototype.$at = function(name, baseQname, mixins, flags)
{
var qname = this.m_name + "::" + name;
if (this.m_types[name] != null)
throw fan.sys.Err.make("Type already exists " + qname);
var t = new fan.sys.Type(qname, baseQname, mixins, flags);
this.m_types[name] = t;
return t;
}
fan.sys.Pod.prototype.$am = function(name, baseQname, mixins, flags)
{
var t = this.$at(name, baseQname, mixins, flags);
t.m_isMixin = true;
return t;
}
fan.sys.Pod.find = function(name, checked)
{
if (checked === undefined) checked = true;
var p = fan.sys.Pod.$pods[name];
if (p == null && checked)
throw fan.sys.UnknownPodErr.make(name);
return p;
}
fan.sys.Pod.$add = function(name)
{
if (fan.sys.Pod.$pods[name] != null)
throw fan.sys.Err.make("Pod already exists " + name);
var p = new fan.sys.Pod(name);
fan.sys.Pod.$pods[name] = p;
return p;
}
fan.sys.Pod.$pods = [];
fan.sys.Pod.prototype.log = function()
{
if (this.m_log == null) this.m_log = fan.sys.Log.get(this.m_name);
return this.m_log;
}
fan.sys.Range = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Range.prototype.$ctor = function(start, end, exclusive)
{
this.m_start = start;
this.m_end = end;
this.m_exclusive = (exclusive === undefined) ? false : exclusive;
}
fan.sys.Range.makeInclusive = function(start, end)
{
return new fan.sys.Range(start, end, false);
}
fan.sys.Range.makeExclusive = function(start, end)
{
return new fan.sys.Range(start, end, true);
}
fan.sys.Range.make = function(start, end, exclusive)
{
return new fan.sys.Range(start, end, exclusive);
}
fan.sys.Range.fromStr = function(s, checked)
{
if (checked === undefined) checked = true;
try
{
var dot = s.indexOf('.');
if (s.charAt(dot+1) != '.') throw new Error();
var exclusive = s.charAt(dot+2) == '<';
var start = fan.sys.Int.fromStr(s.substr(0, dot));
var end   = fan.sys.Int.fromStr(s.substr(dot + (exclusive?3:2)));
return new fan.sys.Range(start, end, exclusive);
}
catch (err) {}
if (!checked) return null;
throw fan.sys.ParseErr.make("Range", s);
}
fan.sys.Range.prototype.start = function() { return this.m_start; }
fan.sys.Range.prototype.end   = function() { return this.m_end; }
fan.sys.Range.prototype.inclusive = function() { return !this.m_exclusive; }
fan.sys.Range.prototype.exclusive = function() { return this.m_exclusive; }
fan.sys.Range.prototype.isEmpty = function()
{
return this.m_exclusive && this.m_start == this.m_end;
}
fan.sys.Range.prototype.min = function()
{
if (this.isEmpty()) return null;
if (this.m_end < this.m_start) return this.m_exclusive ? this.m_end+1 : this.m_end;
return this.m_start;
}
fan.sys.Range.prototype.max = function()
{
if (this.isEmpty()) return null;
if (this.m_end < this.m_start) return this.m_start;
return this.m_exclusive ? this.m_end-1 : this.m_end;
}
fan.sys.Range.prototype.first = function()
{
if (this.isEmpty()) return null;
return this.m_start;
}
fan.sys.Range.prototype.last = function()
{
if (this.isEmpty()) return null;
if (!this.m_exclusive) return this.m_end;
if (this.m_start < this.m_end) return this.m_end-1;
return this.m_end+1;
}
fan.sys.Range.prototype.contains = function(i)
{
if (this.m_start < this.m_end)
{
if (this.m_exclusive)
return this.m_start <= i && i < this.m_end;
else
return this.m_start <= i && i <= this.m_end;
}
else
{
if (this.m_exclusive)
return this.m_end < i && i <= this.m_start;
else
return this.m_end <= i && i <= this.m_start;
}
}
fan.sys.Range.prototype.offset = function(offset)
{
if (offset == 0) return this;
return fan.sys.Range.make(this.m_start+offset, this.m_end+offset, this.m_exclusive);
}
fan.sys.Range.prototype.each = function(func)
{
var start = this.m_start;
var end   = this.m_end;
if (start < end)
{
if (this.m_exclusive) --end;
for (var i=start; i<=end; ++i) func.call(i);
}
else
{
if (this.m_exclusive) ++end;
for (var i=start; i>=end; --i) func.call(i);
}
}
fan.sys.Range.prototype.map = function(func)
{
var r = func.returns();
if (r === fan.sys.Void.$type) r = fan.sys.Obj.$type.toNullable();
var acc   = fan.sys.List.make(r);
var start = this.m_start;
var end   = this.m_end;
if (start < end)
{
if (this.m_exclusive) --end;
for (var i=start; i<=end; ++i) acc.add(func.call(i));
}
else
{
if (this.m_exclusive) ++end;
for (var i=start; i>=end; --i) acc.add(func.call(i));
}
return acc;
}
fan.sys.Range.prototype.toList = function()
{
var start = this.m_start;
var end = this.m_end;
var acc = fan.sys.List.make(fan.sys.Int.$type);
if (start < end)
{
if (this.m_exclusive) --end;
for (var i=start; i<=end; ++i) acc.push(i);
}
else
{
if (this.m_exclusive) ++end;
for (var i=start; i>=end; --i) acc.push(i);
}
return acc;
}
fan.sys.Range.prototype.random = function() { return fan.sys.Int.random(this); }
fan.sys.Range.prototype.equals = function(that)
{
if (that instanceof fan.sys.Range)
{
return this.m_start == that.m_start &&
this.m_end == that.m_end &&
this.m_exclusive == that.m_exclusive;
}
return false;
}
fan.sys.Range.prototype.hash = function() { return (this.m_start << 24) ^ this.m_end; }
fan.sys.Range.prototype.toStr = function()
{
if (this.m_exclusive)
return this.m_start + "..<" + this.m_end;
else
return this.m_start + ".." + this.m_end;
}
fan.sys.Range.prototype.$typeof = function() { return fan.sys.Range.$type;}
fan.sys.Range.prototype.$start = function(size)
{
if (size == null) return this.m_start;
var x = this.m_start;
if (x < 0) x = size + x;
if (x > size) throw fan.sys.IndexErr.make(this);
return x;
}
fan.sys.Range.prototype.$end = function(size)
{
if (size == null) return this.m_end;
var x = this.m_end;
if (x < 0) x = size + x;
if (this.m_exclusive) x--;
if (x >= size) throw fan.sys.IndexErr.make(this);
return x;
}
fan.sys.Regex = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Regex.fromStr = function(pattern)
{
return new fan.sys.Regex(pattern);
}
fan.sys.Regex.glob = function(pattern)
{
var s = "";
for (var i=0; i<pattern.length; ++i)
{
var c = pattern.charCodeAt(i);
if (fan.sys.Int.isAlphaNum(c)) s += String.fromCharCode(c);
else if (c == 63) s += '.';
else if (c == 42) s += '.*';
else s += '\\' + String.fromCharCode(c);
}
return new fan.sys.Regex(s);
}
fan.sys.Regex.prototype.$ctor = function(source)
{
this.m_source = source;
this.m_regexp = new RegExp(source);
}
fan.sys.Regex.prototype.equals = function(obj)
{
if (obj instanceof fan.sys.Regex)
return obj.m_source == this.m_source;
else
return false;
}
fan.sys.Regex.prototype.hash = function() { return fan.sys.Str.hash(this.m_source); }
fan.sys.Regex.prototype.toStr = function() { return this.m_source; }
fan.sys.Regex.prototype.$typeof = function() { return fan.sys.Regex.$type; }
fan.sys.Regex.prototype.matches = function(s)
{
return this.m_regexp.test(s);
}
fan.sys.Regex.prototype.split = function(s, limit)
{
if (limit === undefined) limit = 0;
var re = this.m_regexp;
var array = (limit === 0) ? s.split(re) : s.split(re, limit);
return fan.sys.List.make(fan.sys.Str.$type, array);
}
fan.sys.RegexMatcher = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.RegexMatcher.prototype.$ctor = function() {}
fan.sys.RegexMatcher.prototype.$typeof = function() { return fan.sys.RegexMatcher.$type; }
fan.sys.Str = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Str.prototype.$ctor = function() {}
fan.sys.Str.equalsIgnoreCase = function(self, that)
{
return self.toLowerCase() == that.toLowerCase();
}
fan.sys.Str.compareIgnoreCase = function(self, that)
{
var a = self.toLowerCase();
var b = that.toLowerCase();
if (a < b) return -1;
if (a == b) return 0;
return 1;
}
fan.sys.Str.hash = function(self) { return self; }
fan.sys.Str.toStr = function(self) { return self; }
fan.sys.Str.toLocale = function(self) { return self; }
fan.sys.Str.$typeof = function(self) { return fan.sys.Str.$type; }
fan.sys.Str.get = function(self, index)
{
if (index < 0) index += self.length;
if (index < 0 || index >= self.length) throw fan.sys.IndexErr.make(index);
return self.charCodeAt(index);
}
fan.sys.Str.getSafe = function(self, index, def)
{
if (def === undefined) def = 0;
try
{
if (index < 0) index += self.length;
if (index < 0 || index >= self.length) throw new Error();
return self.charCodeAt(index);
}
catch (err) { return def; }
}
fan.sys.Str.getRange = function(self, range)
{
var size = self.length;
var s = range.$start(size);
var e = range.$end(size);
if (e+1 < s) throw fan.sys.IndexErr.make(range);
return self.substr(s, (e-s)+1);
}
fan.sys.Str.plus = function(self, obj)
{
if (obj == null) return self + "null";
var x = fan.sys.ObjUtil.toStr(obj);
if (x.length == 0) return self;
return self + x;
}
fan.sys.Str.intern = function(self) { return self; }
fan.sys.Str.isEmpty = function(self) { return self.length == 0; }
fan.sys.Str.size = function(self) { return self.length; }
fan.sys.Str.startsWith = function(self, test)
{
if (self.length < test.length) return false;
for (var i=0; i<test.length; i++)
if (self[i] != test[i])
return false;
return true;
}
fan.sys.Str.endsWith = function(self, test)
{
if (self.length < test.length) return false;
for (var i=0; i<test.length; i++)
if (self[self.length-i-1] != test[test.length-i-1])
return false;
return true;
}
fan.sys.Str.contains = function(self, arg)
{
return self.indexOf(arg) != -1
}
fan.sys.Str.containsChar = function(self, arg)
{
return self.indexOf(fan.sys.Int.toChar(arg)) != -1
}
fan.sys.Str.index = function(self, s, off)
{
var i = 0;
if (off != null) i = off;
if (i < 0) i = self.length+i;
var r = self.indexOf(s, i);
if (r < 0) return null;
return r;
}
fan.sys.Str.indexr = function(self, s, off)
{
var i = -1;
if (off != null) i = off;
if (i < 0) i = self.length+i;
var r = self.lastIndexOf(s, i);
if (r < 0) return null;
return r;
}
fan.sys.Str.indexIgnoreCase = function(self, s, off)
{
return fan.sys.Str.index(self.toLowerCase(), s.toLowerCase(), off);
}
fan.sys.Str.indexrIgnoreCase = function(self, s, off)
{
return fan.sys.Str.indexr(self.toLowerCase(), s.toLowerCase(), off);
}
fan.sys.Str.each = function(self, f)
{
var len = self.length;
if (f.m_params.size() == 1)
{
for (var i=0; i<len; i++)
f.call(self.charCodeAt(i), i);
}
else
{
for (var i=0; i<len; i++)
f.call(self.charCodeAt(i), i);
}
}
fan.sys.Str.eachr = function(self, f)
{
if (f.m_params.size() == 1)
{
for (var i=self.length-1; i>=0; i--)
f.call(self.charCodeAt(i), i);
}
else
{
for (var i=self.length-1; i>=0; i--)
f.call(self.charCodeAt(i), i);
}
}
fan.sys.Str.any = function(self, f)
{
var len = self.length;
if (f.m_params.size() == 1)
{
for (var i=0; i<len; ++i)
if (f.call(self.charCodeAt(i)) == true)
return true;
}
else
{
for (var i=0; i<len; ++i)
if (f.call(self.charCodeAt(i), i) == true)
return true;
}
return false;
}
fan.sys.Str.all = function(self, f)
{
var len = self.length;
if (f.m_params.size() == 1)
{
for (var i=0; i<len; ++i)
if (f.call(self.charCodeAt(i)) == false)
return false;
}
else
{
for (var i=0; i<len; ++i)
if (f.call(self.charCodeAt(i), i) == false)
return false;
}
return true;
}
fan.sys.Str.spaces = function(n)
{
if (fan.sys.Str.$spaces == null)
{
fan.sys.Str.$spaces = new Array();
var s = "";
for (var i=0; i<20; i++)
{
fan.sys.Str.$spaces[i] = s;
s += " ";
}
}
if (n < 20) return fan.sys.Str.$spaces[n];
var s = "";
for (var i=0; i<n; i++) s += " ";
return s;
}
fan.sys.Str.$spaces = null;
fan.sys.Str.lower = function(self) { return self.toLowerCase(); }
fan.sys.Str.upper = function(self) { return self.toUpperCase(); }
fan.sys.Str.capitalize = function(self)
{
if (self.length > 0)
{
var ch = self.charCodeAt(0);
if (97 <= ch && ch <= 122)
return String.fromCharCode(ch & ~0x20) + self.substring(1);
}
return self;
}
fan.sys.Str.decapitalize = function(self)
{
if (self.length > 0)
{
var ch = self.charCodeAt(0);
if (65 <= ch && ch <= 90)
{
s = String.fromCharCode(ch | 0x20);
s += self.substring(1)
return s;
}
}
return self;
}
fan.sys.Str.toDisplayName = function(self)
{
if (self.length == 0) return "";
var s = '';
var c = self.charCodeAt(0);
if (97 <= c && c <= 122) c &= ~0x20;
s += String.fromCharCode(c);
var last = c;
for (var i=1; i<self.length; ++i)
{
c = self.charCodeAt(i);
if (65 <= c && c <= 90 && last != 95)
{
var next = i+1 < self.length ? self.charCodeAt(i+1) : 81;
if (!(65 <= last && last <= 90) || !(65 <= next && next <= 90))
s += ' ';
}
else if (97 <= c && c <= 122)
{
if ((48 <= last && last <= 57)) { s += ' '; c &= ~0x20; }
else if (last == 95) c &= ~0x20;
}
else if (48 <= c && c <= 57)
{
if (!(48 <= last && last <= 57)) s += ' ';
}
else if (c == 95)
{
s += ' ';
last = c;
continue;
}
s += String.fromCharCode(c);
last = c;
}
return s;
}
fan.sys.Str.fromDisplayName = function(self)
{
if (self.length == 0) return "";
var s = "";
var c = self.charCodeAt(0);
var c2 = self.length == 1 ? 0 : self.charCodeAt(1);
if (65 <= c && c <= 90 && !(65 <= c2 && c2 <= 90)) c |= 0x20;
s += String.fromCharCode(c);
var last = c;
for (var i=1; i<self.length; ++i)
{
c = self.charCodeAt(i);
if (c != 32)
{
if (last == 32 && 97 <= c && c <= 122) c &= ~0x20;
s += String.fromCharCode(c);
}
last = c;
}
return s;
}
fan.sys.Str.justl = function(self, width) { return fan.sys.Str.padr(self, width, 32); }
fan.sys.Str.justr = function(self, width) { return fan.sys.Str.padl(self, width, 32); }
fan.sys.Str.padl = function(self, w, ch)
{
if (ch === undefined) ch = 32;
if (self.length >= w) return self;
var c = String.fromCharCode(ch);
var s = '';
for (var i=self.length; i<w; ++i) s += c;
s += self;
return s;
}
fan.sys.Str.padr = function(self, w, ch)
{
if (ch === undefined) ch = 32;
if (self.length >= w) return self;
var c = String.fromCharCode(ch);
var s = '';
s += self;
for (var i=self.length; i<w; ++i) s += c;
return s;
}
fan.sys.Str.reverse = function(self)
{
var rev = "";
for (var i=self.length-1; i>=0; i--)
rev += self[i];
return rev;
}
fan.sys.Str.trim = function(self, trimStart, trimEnd)
{
if (self.length == 0) return self;
if (trimStart == null) trimStart = true;
if (trimEnd == null) trimEnd = true;
var s = 0;
var e = self.length-1;
while (trimStart && s<self.length && self.charCodeAt(s) <= 32) s++;
while (trimEnd && e>=s && self.charCodeAt(e) <= 32) e--;
return self.substr(s, (e-s)+1);
}
fan.sys.Str.trimStart = function(self) { return fan.sys.Str.trim(self, true, false); }
fan.sys.Str.trimEnd   = function(self) { return fan.sys.Str.trim(self, false, true); }
fan.sys.Str.split = function(self, sep, trimmed)
{
if (sep == null) return fan.sys.Str.splitws(self);
var toks = fan.sys.List.make(fan.sys.Str.$type, []);
var trim = (trimmed != null) ? trimmed : true;
var len = self.length;
var x = 0;
for (var i=0; i<len; ++i)
{
if (self.charCodeAt(i) != sep) continue;
if (x <= i) toks.add(fan.sys.Str.splitStr(self, x, i, trim));
x = i+1;
}
if (x <= len) toks.add(fan.sys.Str.splitStr(self, x, len, trim));
return toks;
}
fan.sys.Str.splitStr = function(val, s, e, trim)
{
if (trim == true)
{
while (s < e && val.charCodeAt(s) <= 32) ++s;
while (e > s && val.charCodeAt(e-1) <= 32) --e;
}
return val.substring(s, e);
}
fan.sys.Str.splitws = function(val)
{
var toks = fan.sys.List.make(fan.sys.Str.$type, []);
var len = val.length;
while (len > 0 && val.charCodeAt(len-1) <= 32) --len;
var x = 0;
while (x < len && val.charCodeAt(x) <= 32) ++x;
for (var i=x; i<len; ++i)
{
if (val.charCodeAt(i) > 32) continue;
toks.add(val.substring(x, i));
x = i + 1;
while (x < len && val.charCodeAt(x) <= 32) ++x;
i = x;
}
if (x <= len) toks.add(val.substring(x, len));
if (toks.size() == 0) toks.add("");
return toks;
}
fan.sys.Str.splitLines = function(self)
{
var lines = fan.sys.List.make(fan.sys.Str.$type, []);
var len = self.length;
var s = 0;
for (var i=0; i<len; ++i)
{
var c = self.charAt(i);
if (c == '\n' || c == '\r')
{
lines.add(self.substring(s, i));
s = i+1;
if (c == '\r' && s < len && self.charAt(s) == '\n') { i++; s++; }
}
}
lines.add(self.substring(s, len));
return lines;
}
fan.sys.Str.replace = function(self, oldstr, newstr)
{
return self.split(oldstr).join(newstr);
}
fan.sys.Str.numNewlines = function(self)
{
var numLines = 0;
var len = self.length;
for (var i=0; i<len; ++i)
{
var c = self.charCodeAt(i);
if (c == 10) numLines++;
else if (c == 13)
{
numLines++;
if (i+1<len && self.charCodeAt(i+1) == 10) i++;
}
}
return numLines;
}
fan.sys.Str.isAscii = function(self)
{
for (var i=0; i<self.length; i++)
if (self.charCodeAt(i) > 127)
return false;
return true;
}
fan.sys.Str.isSpace = function(self)
{
for (var i=0; i<self.length; i++)
{
var ch = self.charCodeAt(i);
if (ch != 32 && ch != 9 && ch != 10 && ch != 12 && ch != 13)
return false;
}
return true;
}
fan.sys.Str.isUpper = function(self)
{
for (var i=0; i<self.length; i++)
{
var ch = self.charCodeAt(i);
if (ch < 65 || ch > 90) return false;
}
return true;
}
fan.sys.Str.isLower = function(self)
{
for (var i=0; i<self.length; i++)
{
var ch = self.charCodeAt(i);
if (ch < 97 || ch > 122) return false;
}
return true;
}
fan.sys.Str.isAlpha = function(self)
{
var Int = fan.sys.Int;
for (var i=0; i<self.length; i++)
{
var ch = self.charCodeAt(i);
if (ch >= 128 || (Int.charMap[ch] & Int.ALPHA) == 0)
return false;
}
return true;
}
fan.sys.Str.isAlphaNum = function(self)
{
var Int = fan.sys.Int;
for (var i=0; i<self.length; i++)
{
var ch = self.charCodeAt(i);
if (ch >= 128 || (Int.charMap[ch] & Int.ALPHANUM) == 0)
return false;
}
return true;
}
fan.sys.Str.localeCompare = function(self, that)
{
return fan.sys.Str.compareIgnoreCase(self, that);
}
fan.sys.Str.toBool = function(self, checked) { return fan.sys.Bool.fromStr(self, checked); }
fan.sys.Str.toFloat = function(self, checked) { return fan.sys.Float.fromStr(self, checked); }
fan.sys.Str.toInt = function(self, radix, checked) { return fan.sys.Int.fromStr(self, radix, checked); }
fan.sys.Str.$in = function(self) { return fan.sys.InStream.makeForStr(self); }
fan.sys.Str.toUri = function(self) { return fan.sys.Uri.fromStr(self); }
fan.sys.Str.chars = function(self)
{
var ch = fan.sys.List.make(fan.sys.Int.$type, []);
for (var i=0; i<self.length; i++) ch.add(self.charCodeAt(i));
return ch;
}
fan.sys.Str.fromChars = function(ch)
{
var i, s = '';
for (i=0; i<ch.size(); i++) s += String.fromCharCode(ch.get(i));
return s;
}
fan.sys.Str.toBuf = function(self, charset)
{
if (charset === undefined) charset = fan.sys.Charset.utf8();
var buf = new fan.sys.MemBuf();
buf.charset$(charset);
buf.print(self);
return buf.flip();
}
fan.sys.Str.toCode = function(self, quote, escu)
{
if (quote === undefined) quote = 34;
if (escu === undefined) escu = false;
var s = "";
var q = 0;
if (quote != null)
{
q = String.fromCharCode(quote);
s += q;
}
var len = self.length;
for (var i=0; i<len; ++i)
{
var c = self.charAt(i);
switch (c)
{
case '\n': s += '\\' + 'n'; break;
case '\r': s += '\\' + 'r'; break;
case '\f': s += '\\' + 'f'; break;
case '\t': s += '\\' + 't'; break;
case '\\': s += '\\' + '\\'; break;
case '"':  if (q == '"')  s += '\\' + '"';  else s += c; break;
case '`':  if (q == '`')  s += '\\' + '`';  else s += c; break;
case '\'': if (q == '\'') s += '\\' + '\''; else s += c; break;
case '$':  s += '\\' + '$'; break;
default:
var hex  = function(x) { return "0123456789abcdef".charAt(x); }
var code = c.charCodeAt(0);
if (escu && code > 127)
{
s += '\\' + 'u'
+ hex((code>>12)&0xf)
+ hex((code>>8)&0xf)
+ hex((code>>4)&0xf)
+ hex(code & 0xf);
}
else
{
s += c;
}
}
}
if (q != 0) s += q;
return s;
}
fan.sys.Str.toXml = function(self)
{
var s = null;
var len = self.length;
for (var i=0; i<len; ++i)
{
var ch = self.charAt(i);
var c = self.charCodeAt(i);
if (c > 62)
{
if (s != null) s += ch;
}
else
{
var esc = fan.sys.Str.xmlEsc[c];
if (esc != null && (c != 62 || i==0 || self.charCodeAt(i-1) == 93))
{
if (s == null)
{
s = "";
s += self.substring(0,i);
}
s += esc;
}
else if (s != null)
{
s += ch;
}
}
}
if (s == null) return self;
return s;
}
fan.sys.Str.xmlEsc = [];
fan.sys.Str.xmlEsc[38] = "&amp;";
fan.sys.Str.xmlEsc[60] = "&lt;";
fan.sys.Str.xmlEsc[62] = "&gt;";
fan.sys.Str.xmlEsc[39] = "&apos;";
fan.sys.Str.xmlEsc[34] = "&quot;";
fan.sys.Str.javaToJs = function(java)
{
var js = "";
for(var i=0; i<java.length(); ++i) js += String.fromCharCode(java.charAt(i));
return js;
}
fan.sys.StrBuf = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.StrBuf.prototype.$ctor = function()
{
this.m_str = "";
}
fan.sys.StrBuf.prototype.$typeof = function()
{
return fan.sys.StrBuf.$type;
}
fan.sys.StrBuf.prototype.add = function(obj)
{
this.m_str += obj==null ? "null" : fan.sys.ObjUtil.toStr(obj);
return this;
}
fan.sys.StrBuf.prototype.addChar = function(ch)
{
this.m_str += String.fromCharCode(ch);
return this;
}
fan.sys.StrBuf.prototype.capacity = function()
{
if (this.m_capacity == null) return this.m_str.length;
return this.m_capacity;
}
fan.sys.StrBuf.prototype.capacity$ = function(c) { this.m_capacity = c; }
fan.sys.StrBuf.prototype.m_capacity = null;
fan.sys.StrBuf.prototype.clear = function()
{
this.m_str = "";
return this;
}
fan.sys.StrBuf.prototype.get = function(i)
{
if (i < 0) i = this.m_str.length+i;
if (i < 0 || i >= this.m_str.length) throw fan.sys.IndexErr.make(i);
return this.m_str.charCodeAt(i);
}
fan.sys.StrBuf.prototype.set = function(i, ch)
{
if (i < 0) i = this.m_str.length+i;
if (i < 0 || i >= this.m_str.length) throw fan.sys.IndexErr.make(i);
this.m_str = this.m_str.substr(0,i) + String.fromCharCode(ch) + this.m_str.substr(i+1);
return this;
}
fan.sys.StrBuf.prototype.join = function(x, sep)
{
if (sep === undefined) sep = " ";
var s = (x == null) ? "null" : fan.sys.ObjUtil.toStr(x);
if (this.m_str.length > 0) this.m_str += sep;
this.m_str += s;
return this;
}
fan.sys.StrBuf.prototype.insert = function(i, x)
{
var s = (x == null) ? "null" : fan.sys.ObjUtil.toStr(x);
if (i < 0) i = this.m_str.length+i;
if (i < 0 || i > this.m_str.length) throw fan.sys.IndexErr.make(i);
this.m_str = this.m_str.substr(0,i) + s + this.m_str.substr(i);
return this;
}
fan.sys.StrBuf.prototype.remove = function(i)
{
if (i < 0) i = this.m_str.length+i;
if (i< 0 || i >= this.m_str.length) throw fan.sys.IndexErr.make(i);
this.m_str = this.m_str.substr(0,i) + this.m_str.substr(i+1);
return this;
}
fan.sys.StrBuf.prototype.removeRange = function(r)
{
var s = r.$start(this.m_str.length);
var e = r.$end(this.m_str.length);
var n = e - s + 1;
if (s < 0 || n < 0) throw fan.sys.IndexErr.make(r);
this.m_str = this.m_str.substr(0,s) + this.m_str.substr(e+1);
return this;
}
fan.sys.StrBuf.prototype.isEmpty = function()
{
return this.m_str.length == 0;
}
fan.sys.StrBuf.prototype.size = function()
{
return this.m_str.length;
}
fan.sys.StrBuf.prototype.toStr = function()
{
return this.m_str;
}
fan.sys.StrBuf.prototype.out = function()
{
return new fan.sys.StrBufOutStream(this);
}
fan.sys.StrBuf.make = function() { return new fan.sys.StrBuf(); }
fan.sys.StrBufOutStream = fan.sys.Obj.$extend(fan.sys.OutStream);
fan.sys.StrBufOutStream.prototype.$ctor = function(buf)
{
this.m_buf = buf;
}
fan.sys.StrBufOutStream.prototype.w = function(v)
{
throw fan.sys.UnsupportedErr.make("binary write on StrBuf output");
}
fan.sys.StrBufOutStream.prototype.write = function(x)
{
throw fan.sys.UnsupportedErr.make("binary write on StrBuf output");
}
fan.sys.StrBufOutStream.prototype.writeBuf = function(buf, n)
{
throw fan.sys.UnsupportedErr.make("binary write on StrBuf output");
}
fan.sys.StrBufOutStream.prototype.writeI2 = function(x)
{
throw fan.sys.UnsupportedErr.make("binary write on StrBuf output");
}
fan.sys.StrBufOutStream.prototype.writeI4 = function(x)
{
throw fan.sys.UnsupportedErr.make("binary write on StrBuf output");
}
fan.sys.StrBufOutStream.prototype.writeI8 = function(x)
{
throw fan.sys.UnsupportedErr.make("binary write on StrBuf output");
}
fan.sys.StrBufOutStream.prototype.writeF4 = function(x)
{
throw fan.sys.UnsupportedErr.make("binary write on StrBuf output");
}
fan.sys.StrBufOutStream.prototype.writeF8 = function(x)
{
throw fan.sys.UnsupportedErr.make("binary write on StrBuf output");
}
fan.sys.StrBufOutStream.prototype.writeUtf = function(x)
{
throw fan.sys.UnsupportedErr.make("modified UTF-8 format write on StrBuf output");
}
fan.sys.StrBufOutStream.prototype.writeChar = function(c)
{
this.m_buf.m_str += String.fromCharCode(c);
return this;
}
fan.sys.StrBufOutStream.prototype.writeChars = function(s, off, len)
{
if (off === undefined) off = 0;
if (len === undefined) len = s.length-off;
this.m_buf.m_str += s.substr(off, len);
return this;
}
fan.sys.StrBufOutStream.prototype.flush = function() { return this; }
fan.sys.StrBufOutStream.prototype.close = function() { return true; }
fan.sys.Test = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Test.prototype.$ctor = function()
{
this.verifyCount = 0;
}
fan.sys.Test.make$ = function(self)
{
}
fan.sys.Test.prototype.verify = function(cond, msg)
{
if (!cond) this.fail(msg);
this.verifyCount++;
}
fan.sys.Test.prototype.verifyFalse = function(cond, msg)
{
if (cond) this.fail(msg);
this.verifyCount++;
}
fan.sys.Test.prototype.verifyNull = function(a, msg)
{
if (msg === undefined) msg = null;
if (a != null)
{
if (msg == null) msg = fan.sys.ObjUtil.toStr(a) + " is not null";
this.fail(msg);
}
this.verifyCount++;
}
fan.sys.Test.prototype.verifyNotNull = function(a, msg)
{
if (msg === undefined) msg = null;
if (a == null)
{
if (msg == null) msg = fan.sys.ObjUtil.toStr(a) + " is null";
this.fail(msg);
}
this.verifyCount++;
}
fan.sys.Test.prototype.verifyEq = function(expected, actual, msg)
{
if (!fan.sys.ObjUtil.equals(expected, actual))
{
if (msg == null) msg = fan.sys.ObjUtil.toStr(expected) + " != " + fan.sys.ObjUtil.toStr(actual);
this.fail(msg);
}
this.verifyCount++;
}
fan.sys.Test.prototype.verifyNotEq = function(expected, actual, msg)
{
if (fan.sys.ObjUtil.equals(expected, actual))
{
if (msg == null) msg = fan.sys.ObjUtil.toStr(expected) + " == " + fan.sys.ObjUtil.toStr(actual);
this.fail(msg);
}
this.verifyCount++;
}
fan.sys.Test.prototype.verifySame = function(expected, actual, msg)
{
if (!fan.sys.ObjUtil.equals(expected, actual))
{
if (msg == null) msg = fan.sys.ObjUtil.toStr(expected) + " !== " + fan.sys.ObjUtil.toStr(actual);
this.fail(msg);
}
this.verifyCount++;
}
fan.sys.Test.prototype.verifyNotSame = function(expected, actual, msg)
{
if (fan.sys.ObjUtil.equals(expected == actual))
{
if (msg == null) msg = fan.sys.ObjUtil.toStr(expected) + " === " + fan.sys.ObjUtil.toStr(actual);
this.fail(msg);
}
this.verifyCount++;
}
fan.sys.Test.prototype.verifyType = function(obj, t)
{
this.verifyEq(fan.sys.Type.of(obj), t);
}
fan.sys.Test.prototype.verifyErr = function(errType, func)
{
try
{
func.call();
}
catch (err)
{
var e = fan.sys.Err.make(err);
if (e.$typeof() == errType) { this.verifyCount++; return; }
println("  verifyErr: " + e);
this.fail(e.$typeof() + " thrown, expected " + errType);
}
this.fail("No err thrown, expected " + errType);
}
fan.sys.Test.prototype.fail = function(msg)
{
throw this.err(msg);
}
fan.sys.Test.prototype.err = function(msg)
{
if (msg == null)
return fan.sys.Err.make("Test failed");
else
return fan.sys.Err.make("Test failed: " + msg);
}
fan.sys.Test.prototype.$typeof = function()
{
return fan.sys.Test.$type;
}
fan.sys.Test.prototype.tempDir = function()
{
if (this.m_tempDir == null && fan.sys.Env.$rhino)
{
var x = fan.sys.Env.cur().tempDir();
this.m_tempDir = x.plus(fan.sys.Uri.fromStr("test/"), false);
this.m_tempDir.$delete();
this.m_tempDir.create();
}
return this.m_tempDir;
}
function TestException(msg)
{
this.mge = msg;
this.name = "TestException";
}
TestException.prototype.toString = function()
{
return this.name + ": " + this.msg;
}
fan.sys.This = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.This.prototype.$ctor = function() {}
fan.sys.This.prototype.$typeof = function() { return fan.sys.This.$type; }
fan.sys.Time = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Time.prototype.$ctor = function(hour, min, sec, ns)
{
if (hour < 0 || hour > 23)     throw fan.sys.ArgErr.make("hour " + hour);
if (min < 0 || min > 59)       throw fan.sys.ArgErr.make("min " + min);
if (sec < 0 || sec > 59)       throw fan.sys.ArgErr.make("sec " + sec);
if (ns < 0 || ns > 999999999)  throw fan.sys.ArgErr.make("ns " + ns);
this.m_hour = hour;
this.m_min  = min;
this.m_sec  = sec;
this.m_ns   = ns;
}
fan.sys.Time.make = function(hour, min, sec, ns)
{
if (sec === undefined) sec = 0;
if (ns === undefined)  ns = 0;
return new fan.sys.Time(hour, min, sec, ns);
}
fan.sys.Time.now = function(tz)
{
return fan.sys.DateTime.makeTicks(fan.sys.DateTime.nowTicks(), tz).time();
}
fan.sys.Time.fromStr = function(s, checked)
{
if (checked === undefined) checked = true;
try
{
var num = function(x,index) { return x.charCodeAt(index) - 48; }
var hour  = num(s, 0)*10  + num(s, 1);
var min   = num(s, 3)*10  + num(s, 4);
var sec   = num(s, 6)*10  + num(s, 7);
if (s.charAt(2) != ':' || s.charAt(5) != ':')
throw new Error();
var i = 8;
var ns = 0;
var tenth = 100000000;
var len = s.length;
if (i < len && s.charAt(i) == '.')
{
++i;
while (i < len)
{
var c = s.charCodeAt(i);
if (c < 48 || c > 57) break;
ns += (c - 48) * tenth;
tenth /= 10;
++i;
}
}
if (i < s.length) throw new Error();
var instance = new fan.sys.Time(hour, min, sec, ns);
return instance;
}
catch (err)
{
if (!checked) return null;
throw fan.sys.ParseErr.make("Time", s);
}
}
fan.sys.Time.prototype.equals = function(that)
{
if (that instanceof fan.sys.Time)
{
return this.m_hour.valueOf() == that.m_hour.valueOf() &&
this.m_min.valueOf() == that.m_min.valueOf() &&
this.m_sec.valueOf() == that.m_sec.valueOf() &&
this.m_ns.valueOf() == that.m_ns.valueOf();
}
return false;
}
fan.sys.Time.prototype.compare = function(that)
{
if (this.m_hour.valueOf() == that.m_hour.valueOf())
{
if (this.m_min.valueOf() == that.m_min.valueOf())
{
if (this.m_sec.valueOf() == that.m_sec.valueOf())
{
if (this.m_ns.valueOf() == that.m_ns.valueOf()) return 0;
return this.m_ns < that.m_ns ? -1 : +1;
}
return this.m_sec < that.m_sec ? -1 : +1;
}
return this.m_min < that.m_min ? -1 : +1;
}
return this.m_hour < that.m_hour ? -1 : +1;
}
fan.sys.Time.prototype.toStr = function()
{
return this.toLocale("hh:mm:ss.FFFFFFFFF");
}
fan.sys.Time.prototype.$typeof = function()
{
return fan.sys.Time.$type;
}
fan.sys.Time.prototype.hour = function() { return this.m_hour; }
fan.sys.Time.prototype.min = function() { return this.m_min; }
fan.sys.Time.prototype.sec = function() { return this.m_sec; }
fan.sys.Time.prototype.nanoSec = function() { return this.m_ns; }
fan.sys.Time.prototype.toLocale = function(pattern)
{
if (pattern === undefined) pattern = null;
var locale = null;
if (pattern == null)
{
pattern = "hh:mm:ss";
}
var s = '';
var len = pattern.length;
for (var i=0; i<len; ++i)
{
var c = pattern.charAt(i);
if (c == '\'')
{
while (true)
{
++i;
if (i >= len) throw fan.sys.ArgErr.make("Invalid pattern: unterminated literal");
c = pattern.charAt(i);
if (c == '\'') break;
s += c;
}
continue;
}
var n = 1;
while (i+1<len && pattern.charAt(i+1) == c) { ++i; ++n; }
var invalidNum = false;
switch (c)
{
case 'h':
case 'k':
var hour = this.hour();
if (c == 'k')
{
if (hour == 0) hour = 12;
else if (hour > 12) hour -= 12;
}
switch (n)
{
case 2:  if (hour < 10) s += '0';
case 1:  s += hour; break;
default: invalidNum = true;
}
break;
case 'm':
var min = this.min();
switch (n)
{
case 2:  if (min < 10) s += '0';
case 1:  s += min; break;
default: invalidNum = true;
}
break;
case 's':
var sec = this.sec();
switch (n)
{
case 2:  if (sec < 10) s += '0';
case 1:  s += sec; break;
default: invalidNum = true;
}
break;
case 'a':
switch (n)
{
case 1:  s += this.hour() < 12 ? "a" : "p"; break;
case 2:  s += this.hour() < 12 ? "am" : "pm"; break;
default: invalidNum = true;
}
break;
case 'A':
switch (n)
{
case 1:  s += this.hour() < 12 ? "A"  : "P"; break;
case 2:  s += this.hour() < 12 ? "AM" : "PM"; break;
default: invalidNum = true;
}
break;
case 'f':
case 'F':
var req = 0, opt = 0;
if (c == 'F') opt = n;
else
{
req = n;
while (i+1<len && pattern.charAt(i+1) == 'F') { ++i; ++opt; }
}
var frac = this.nanoSec();
for (var x=0, tenth=100000000; x<9; ++x)
{
if (req > 0) req--;
else
{
if (frac == 0 || opt <= 0) break;
opt--;
}
s += fan.sys.Int.div(frac, tenth);
frac %= tenth;
tenth /= 10;
}
break;
default:
if (fan.sys.Int.isAlpha(c.charCodeAt(0)))
throw fan.sys.ArgErr.make("Invalid pattern: unsupported char '" + c + "'");
if (i+1<len && pattern.charAt(i+1) == 'F' && this.nanoSec() == 0)
break;
s += c;
}
if (invalidNum)
throw fan.sys.ArgErr.make("Invalid pattern: unsupported num '" + c + "' (x" + n + ")");
}
return s;
}
fan.sys.Time.prototype.toIso = function() { return this.toStr(); }
fan.sys.Time.fromIso = function(s, checked)
{
if (checked === undefined) checked = true;
return fan.sys.Time.fromStr(s, checked);
}
fan.sys.Time.fromDuration = function(d)
{
var ticks = d.m_ticks;
if (ticks == 0) return fan.sys.Time.m_defVal;
if (ticks < 0 || ticks > fan.sys.Duration.nsPerDay )
throw fan.sys.ArgErr.make("Duration out of range: " + d);
var hour = fan.sys.Int.div(ticks, fan.sys.Duration.nsPerHr);  ticks %= fan.sys.Duration.nsPerHr;
var min  = fan.sys.Int.div(ticks, fan.sys.Duration.nsPerMin); ticks %= fan.sys.Duration.nsPerMin;
var sec  = fan.sys.Int.div(ticks, fan.sys.Duration.nsPerSec); ticks %= fan.sys.Duration.nsPerSec;
var ns   = ticks;
return new fan.sys.Time(hour, min, sec, ns);
}
fan.sys.Time.prototype.toDuration = function()
{
return fan.sys.Duration.make(this.m_hour*fan.sys.Duration.nsPerHr +
this.m_min*fan.sys.Duration.nsPerMin +
this.m_sec*fan.sys.Duration.nsPerSec +
this.m_ns);
}
fan.sys.Time.prototype.toDateTime = function(d, tz)
{
return fan.sys.DateTime.makeDT(d, this, tz);
}
fan.sys.Time.prototype.toCode = function()
{
if (this.equals(fan.sys.Time.m_defVal)) return "Time.defVal";
return "Time(\"" + this.toString() + "\")";
}
fan.sys.Time.prototype.isMidnight = function()
{
return this.equals(fan.sys.Time.m_defVal);
}
fan.sys.TimeZone = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.TimeZone.prototype.$ctor = function()
{
this.m_name = null;
this.m_fullName = null;
this.m_rules = null;
}
fan.sys.TimeZone.listNames = function()
{
return fan.sys.List.make(fan.sys.Str.$type, fan.sys.TimeZone.names).ro();
}
fan.sys.TimeZone.listFullNames = function()
{
return fan.sys.List.make(fan.sys.Str.$type, fan.sys.TimeZone.fullNames).ro();
}
fan.sys.TimeZone.fromStr = function(name, checked)
{
if (checked === undefined) checked = true;
var tz = fan.sys.TimeZone.cache[name];
if (tz != null) return tz;
if (checked) throw fan.sys.ParseErr.make("TimeZone not found: " + name);
return null;
}
fan.sys.TimeZone.defVal = function()
{
return fan.sys.TimeZone.m_utc;
}
fan.sys.TimeZone.utc = function()
{
return fan.sys.TimeZone.m_utc;
}
fan.sys.TimeZone.rel = function()
{
return fan.sys.TimeZone.m_rel;
}
fan.sys.TimeZone.cur = function()
{
if (fan.sys.TimeZone.m_cur == null)
fan.sys.TimeZone.m_cur = fan.sys.TimeZone.fromStr("New_York");
return fan.sys.TimeZone.m_cur;
}
fan.sys.TimeZone.prototype.toStr = function () { return this.m_name; }
fan.sys.TimeZone.prototype.$typeof = function() { return fan.sys.TimeZone.$type; }
fan.sys.TimeZone.prototype.name = function () { return this.m_name; }
fan.sys.TimeZone.prototype.fullName = function() { return this.m_fullName; }
fan.sys.TimeZone.prototype.offset = function(year)
{
return fan.sys.Duration.make(this.rule(year).offset * fan.sys.Duration.nsPerSec);
}
fan.sys.TimeZone.prototype.dstOffset = function(year)
{
var r = this.rule(year);
if (r.dstOffset == 0) return null;
return fan.sys.Duration.make(r.dstOffset * fan.sys.Duration.nsPerSec);
}
fan.sys.TimeZone.prototype.stdAbbr = function(year)
{
return this.rule(year).stdAbbr;
}
fan.sys.TimeZone.prototype.dstAbbr = function(year)
{
return this.rule(year).dstAbbr;
}
fan.sys.TimeZone.prototype.abbr = function(year, inDST)
{
return inDST ? this.rule(year).dstAbbr : this.rule(year).stdAbbr;
}
fan.sys.TimeZone.prototype.rule = function(year)
{
var rule = this.m_rules[0];
if (year >= rule.startYear) return rule;
for (var i=1; i<this.m_rules.length; ++i)
if (year >= (rule = this.m_rules[i]).startYear) return rule;
return this.m_rules[this.m_rules.length-1];
}
fan.sys.TimeZone.dstOffset = function(rule, year, mon, day, time)
{
var start = rule.dstStart;
var end   = rule.dstEnd;
if (start == null) return 0;
var s = fan.sys.TimeZone.compare(rule, start, year, mon, day, time);
var e = fan.sys.TimeZone.compare(rule, end,   year, mon, day, time);
if (end.mon < start.mon)
{
if (e > 0 || s <= 0) return rule.dstOffset;
}
else
{
if (s <= 0 && e > 0) return rule.dstOffset;
}
return 0;
}
fan.sys.TimeZone.compare = function(rule, x, year, mon, day, time)
{
var c = fan.sys.TimeZone.compareMonth(x, mon);
if (c != 0) return c;
c = fan.sys.TimeZone.compareOnDay(rule, x, year, mon, day);
if (c != 0) return c;
return fan.sys.TimeZone.compareAtTime(rule, x, time);
}
fan.sys.TimeZone.compareMonth = function(x, mon)
{
if (x.mon < mon) return -1;
if (x.mon > mon) return +1;
return 0;
}
fan.sys.TimeZone.compareOnDay = function(rule, x, year, mon, day)
{
if (x.atMode == 'u' && rule.offset + x.atTime < 0)
++day;
switch (x.onMode)
{
case 'd':
if (x.onDay < day) return -1;
if (x.onDay > day) return +1;
return 0;
case 'l':
var last = fan.sys.DateTime.weekdayInMonth(year, fan.sys.Month.m_vals.get(mon), fan.sys.Weekday.m_vals.get(x.onWeekday), -1);
if (last < day) return -1;
if (last > day) return +1;
return 0;
case '>':
var start = fan.sys.DateTime.weekdayInMonth(year, fan.sys.Month.m_vals.get(mon), fan.sys.Weekday.m_vals.get(x.onWeekday), 1);
while (start < x.onDay) start += 7;
if (start < day) return -1;
if (start > day) return +1;
return 0;
default:
throw new Error('' + x.onMode);
}
}
fan.sys.TimeZone.compareAtTime = function(rule, x, time)
{
var atTime = x.atTime;
if (x.atMode == 'u')
{
if (rule.offset + x.atTime < 0)
atTime = 24*60*60 + rule.offset + x.atTime;
else
atTime += rule.offset;
}
if (atTime < time) return -1;
if (atTime > time) return +1;
return 0;
}
fan.sys.TimeZone.cache = [];
fan.sys.TimeZone.names = [];
fan.sys.TimeZone.fullNames = [];
fan.sys.TimeZone.m_utc = null;
fan.sys.TimeZone.m_cur = null;
fan.sys.TimeZone$Rule = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.TimeZone$Rule.prototype.$ctor = function()
{
this.startYear = null;
this.offset = null;
this.stdAbbr = null;
this.dstOffset = null;
this.dstAbbr = null;
this.dstStart = null;
this.dstEnd = null;
}
fan.sys.TimeZone$Rule.prototype.isWallTime = function()
{
return this.dstStart.atMode == 'w';
}
fan.sys.TimeZone$DstTime = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.TimeZone$DstTime.prototype.$ctor = function(mon, onMode, onWeekday, onDay, atTime, atMode)
{
this.mon = mon;
this.onMode = String.fromCharCode(onMode);
this.onWeekday = onWeekday;
this.onDay = onDay;
this.atTime = atTime;
this.atMode = String.fromCharCode(atMode);
}
fan.sys.Type = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Type.prototype.$ctor = function(qname, base, mixins, flags)
{
if (qname === undefined) return;
if (fan.sys.Type.$type != null)
{
var acc = fan.sys.List.make(fan.sys.Type.$type, []);
for (var i=0; i<mixins.length; i++)
acc.add(fan.sys.Type.find(mixins[i]));
this.m_mixins = acc.ro();
}
var s = qname.split("::");
this.m_qname    = qname;
this.m_pod      = fan.sys.Pod.find(s[0]);
this.m_name     = s[1];
this.m_base     = base == null ? null : fan.sys.Type.find(base);
this.m_slots    = [];
this.m_flags    = flags;
this.m_$qname   = 'fan.' + this.m_pod + '.' + this.m_name;
this.m_isMixin  = false;
this.m_nullable = new fan.sys.NullableType(this);
}
fan.sys.Type.prototype.pod = function() { return this.m_pod; }
fan.sys.Type.prototype.name = function() { return this.m_name; }
fan.sys.Type.prototype.qname = function() { return this.m_qname; }
fan.sys.Type.prototype.signature = function() { return this.m_qname; }
fan.sys.Type.prototype.isAbstract  = function() { return (this.flags() & fan.sys.FConst.Abstract) != 0; }
fan.sys.Type.prototype.isClass     = function() { return (this.flags() & (fan.sys.FConst.Enum|fan.sys.FConst.Mixin)) == 0; }
fan.sys.Type.prototype.isConst     = function() { return (this.flags() & fan.sys.FConst.Const) != 0; }
fan.sys.Type.prototype.isEnum      = function() { return (this.flags() & fan.sys.FConst.Enum) != 0; }
fan.sys.Type.prototype.isFinal     = function() { return (this.flags() & fan.sys.FConst.Final) != 0; }
fan.sys.Type.prototype.isInternal  = function() { return (this.flags() & fan.sys.FConst.Internal) != 0; }
fan.sys.Type.prototype.isMixin     = function() { return (this.flags() & fan.sys.FConst.Mixin) != 0; }
fan.sys.Type.prototype.isPublic    = function() { return (this.flags() & fan.sys.FConst.Public) != 0; }
fan.sys.Type.prototype.isSynthetic = function() { return (this.flags() & fan.sys.FConst.Synthetic) != 0; }
fan.sys.Type.prototype.flags = function() { return this.m_flags; };
fan.sys.Type.prototype.trap = function(name, args)
{
if (name == "flags") return this.flags();
return fan.sys.Obj.prototype.trap.call(this, name, args);
}
fan.sys.Type.prototype.isVal = function()
{
return this === fan.sys.Bool.$type ||
this === fan.sys.Int.$type ||
this === fan.sys.Float.$type;
}
fan.sys.Type.prototype.isClass = function()   { return !this.m_isMixin && this.m_base.m_qname != "sys::Enum"; }
fan.sys.Type.prototype.isEnum = function()    { return this.m_base != null && this.m_base.m_qname == "sys::Enum"; }
fan.sys.Type.prototype.isMixin = function()   { return this.m_isMixin; }
fan.sys.Type.prototype.log = function()       { return fan.sys.Log.get(this.m_pod.m_name); }
fan.sys.Type.prototype.toStr = function()     { return this.signature(); }
fan.sys.Type.prototype.toLocale = function()  { return this.signature(); }
fan.sys.Type.prototype.$typeof = function()   { return fan.sys.Type.$type; }
fan.sys.Type.prototype.toListOf = function()
{
if (this.m_listOf == null) this.m_listOf = new fan.sys.ListType(this);
return this.m_listOf;
}
fan.sys.Type.prototype.emptyList = function()
{
if (this.$emptyList == null)
this.$emptyList = fan.sys.List.make(this).toImmutable();
return this.$emptyList;
}
fan.sys.Type.prototype.isNullable = function() { return false; }
fan.sys.Type.prototype.toNonNullable = function() { return this; }
fan.sys.Type.prototype.toNullable = function() { return this.m_nullable; }
fan.sys.Type.prototype.toNonNullable = function() { return this; }
fan.sys.Type.prototype.make = function(args)
{
if (args === undefined) args = null;
var make = this.method("make", false);
if (make != null && make.isPublic())
{
var numArgs = args == null ? 0 : args.size();
var params = make.params();
if ((numArgs == params.size()) ||
(numArgs < params.size() && params.get(numArgs).hasDefault()))
return make.invoke(null, args);
}
var defVal = this.slot("defVal", false);
if (defVal != null && defVal.isPublic())
{
if (defVal instanceof fan.sys.Field) return defVal.get(null);
if (defVal instanceof fan.sys.Method) return defVal.invoke(null, null);
}
throw Err.make("Type missing 'make' or 'defVal' slots: " + this).val;
}
fan.sys.Type.prototype.slots = function()
{
var acc = [];
for (var i in this.m_slots)
acc.push(this.m_slots[i]);
return fan.sys.List.make(fan.sys.Slot.$type, acc);
}
fan.sys.Type.prototype.methods = function()
{
var acc = [];
for (var i in this.m_slots)
if (this.m_slots[i] instanceof fan.sys.Method)
acc.push(this.m_slots[i]);
return fan.sys.List.make(fan.sys.Method.$type, acc);
}
fan.sys.Type.prototype.fields = function()
{
var acc = [];
for (var i in this.m_slots)
if (this.m_slots[i] instanceof fan.sys.Field)
acc.push(this.m_slots[i]);
return fan.sys.List.make(fan.sys.Field.$type, acc);
}
fan.sys.Type.prototype.slot = function(name, checked)
{
if (checked === undefined) checked = true;
var s = this.$slot(name);
if (s == null && checked)
throw fan.sys.UnknownSlotErr.make(this.m_qname + "." + name);
return s;
}
fan.sys.Type.prototype.method = function(name, checked)
{
if (checked === undefined) checked = true;
var f = this.$slot(name);
if ((f == null || !(f instanceof fan.sys.Method)) && checked)
throw fan.sys.UnknownSlotErr.make(this.m_qname + "." + name);
return f;
}
fan.sys.Type.prototype.field = function(name, checked)
{
if (checked === undefined) checked = true;
var f = this.$slot(name);
if ((f == null || !(f instanceof fan.sys.Field)) && checked)
throw fan.sys.UnknownSlotErr.make(this.m_qname + "." + name);
return f;
}
fan.sys.Type.prototype.$am = function(name, flags, params)
{
var m = new fan.sys.Method(this, name, flags, params);
this.m_slots[name] = m;
return this;
}
fan.sys.Type.prototype.$af = function(name, flags, of)
{
if (of == 'sys::V?') return this;
var t = fanx_TypeParser.load(of);
var f = new fan.sys.Field(this, name, flags, t);
this.m_slots[name] = f;
return this;
}
fan.sys.Type.prototype.base = function()
{
return this.m_base;
}
fan.sys.Type.prototype.mixins = function()
{
if (this.m_mixins == null)
this.m_mixins = fan.sys.List.make(fan.sys.Type.$type, []).ro();
return this.m_mixins;
}
fan.sys.Type.prototype.fits = function(that) { return this.is(that); }
fan.sys.Type.prototype.is = function(that)
{
if (that instanceof fan.sys.NullableType)
that = that.m_root;
if (this.equals(that)) return true;
if (this === fan.sys.Void.$type) return false;
var base = this.m_base;
while (base != null)
{
if (base.equals(that)) return true;
base = base.m_base;
}
var t = this;
while (t != null)
{
var m = t.mixins();
for (var i=0; i<m.size(); i++)
if (fan.sys.Type.checkMixin(m.get(i), that)) return true;
t = t.m_base;
}
return false;
}
fan.sys.Type.checkMixin = function(mixin, that)
{
if (mixin.equals(that)) return true;
var m = mixin.m_mixins;
for (var i=0; i<m.length; i++)
if (fan.sys.Type.checkMixin(m[i], that))
return true;
return false;
}
fan.sys.Type.prototype.$slot = function(name)
{
var slot = this.m_slots[name];
if (slot != null) return slot;
var base = this.m_base;
while (base != null)
{
slot = base.m_slots[name];
if (slot != null) return slot;
base = base.m_base;
}
return null;
}
fan.sys.Type.find = function(sig, checked)
{
return fanx_TypeParser.load(sig, checked);
}
fan.sys.Type.of = function(obj)
{
if (obj instanceof fan.sys.Obj)
return obj.$typeof();
else
return fan.sys.Type.toFanType(obj);
}
fan.sys.Type.toFanType = function(obj)
{
if (obj == null) throw fan.sys.Err.make("sys::Type.toFanType: obj is null");
if (obj.$fanType != undefined) return obj.$fanType;
if ((typeof obj) == "boolean" || obj instanceof Boolean) return fan.sys.Bool.$type;
if ((typeof obj) == "number"  || obj instanceof Number)  return fan.sys.Int.$type;
if ((typeof obj) == "string"  || obj instanceof String)  return fan.sys.Str.$type;
throw fan.sys.Err.make("sys::Type.toFanType: Not a Fantom type: " + obj);
}
fan.sys.Type.common = function(objs)
{
if (objs.length == 0) return fan.sys.Obj.$type.toNullable();
var nullable = false;
var best = null;
for (var i=0; i<objs.length; i++)
{
var obj = objs[i];
if (obj == null) { nullable = true; continue; }
var t = fan.sys.ObjUtil.$typeof(obj);
if (best == null) { best = t; continue; }
while (!t.is(best))
{
best = best.base();
if (best == null) return nullable ? fan.sys.Obj.$type.toNullable() : fan.sys.Obj.$type;
}
}
if (best == null) best = fan.sys.Obj.$type;
return nullable ? best.toNullable() : best;
}
fan.sys.NullableType = fan.sys.Obj.$extend(fan.sys.Type)
fan.sys.NullableType.prototype.$ctor = function(root)
{
this.m_root = root;
this.m_signature = root.signature() + "?";
}
fan.sys.NullableType.prototype.pod = function() { return this.m_root.pod(); }
fan.sys.NullableType.prototype.name = function() { return this.m_root.name(); }
fan.sys.NullableType.prototype.qname = function() { return this.m_root.qname(); }
fan.sys.NullableType.prototype.signature = function() { return this.m_signature; }
fan.sys.NullableType.prototype.flags = function() { return this.m_root.flags(); }
fan.sys.NullableType.prototype.base = function() { return this.m_root.base(); }
fan.sys.NullableType.prototype.mixins = function() { return this.m_root.mixins(); }
fan.sys.NullableType.prototype.inheritance = function() { return this.m_root.inheritance(); }
fan.sys.NullableType.prototype.is = function(type) { return this.m_root.is(type); }
fan.sys.NullableType.prototype.isVal = function() { return this.m_root.isVal(); }
fan.sys.NullableType.prototype.isNullable = function() { return true; }
fan.sys.NullableType.prototype.toNullable = function() { return this; }
fan.sys.NullableType.prototype.toNonNullable = function() { return this.m_root; }
fan.sys.NullableType.prototype.isGenericType = function() { return this.m_root.isGenericType(); }
fan.sys.NullableType.prototype.isGenericInstance = function() { return this.m_root.isGenericInstance(); }
fan.sys.NullableType.prototype.isGenericParameter = function() { return this.m_root.isGenericParameter(); }
fan.sys.NullableType.prototype.getRawType = function() { return this.m_root.getRawType(); }
fan.sys.NullableType.prototype.params = function() { return this.m_root.params(); }
fan.sys.NullableType.prototype.parameterize = function(params) { return this.m_root.parameterize(params).toNullable(); }
fan.sys.NullableType.prototype.fields = function() { return this.m_root.fields(); }
fan.sys.NullableType.prototype.methods = function() { return this.m_root.methods(); }
fan.sys.NullableType.prototype.slots = function() { return this.m_root.slots(); }
fan.sys.NullableType.prototype.slot = function(name, checked) { return this.m_root.slot(name, checked); }
fan.sys.NullableType.prototype.facets = function(inherited) { return this.m_root.facets(inherited); }
fan.sys.NullableType.prototype.facet = function(key, def, inherited) { return this.m_root.facet(key, def, inherited); }
fan.sys.NullableType.prototype.doc = function() { return this.m_root.doc(); }
fan.sys.ListType = fan.sys.Obj.$extend(fan.sys.Type)
fan.sys.ListType.prototype.$ctor = function(v)
{
this.v = v;
this.m_mixins = [];
}
fan.sys.ListType.prototype.base = function() { return fan.sys.List.$type; }
fan.sys.ListType.prototype.signature = function() { return this.v.signature() + '[]'; }
fan.sys.ListType.prototype.$slot = function(name) { return fan.sys.List.$type.$slot(name); }
fan.sys.ListType.prototype.equals = function(that)
{
if (that instanceof fan.sys.ListType)
return this.v.equals(that.v);
else
return false;
}
fan.sys.ListType.prototype.is = function(that)
{
if (that instanceof fan.sys.ListType)
{
if (that.v.qname() == "sys::Obj") return true;
return this.v.is(that.v);
}
if (that instanceof fan.sys.Type)
{
if (that.qname() == "sys::List") return true;
if (that.qname() == "sys::Obj")  return true;
}
return false;
}
fan.sys.ListType.prototype.as = function(obj, that)
{
var objType = fan.sys.ObjUtil.$typeof(obj);
if (objType instanceof fan.sys.ListType &&
objType.v.qname() == "sys::Obj" &&
that instanceof fan.sys.ListType)
return obj;
if (that instanceof fan.sys.NullableType &&
that.m_root instanceof fan.sys.ListType)
that = that.m_root;
return objType.is(that) ? obj : null;
}
fan.sys.ListType.prototype.toNullable = function()
{
if (this.m_nullable == null) this.m_nullable = new fan.sys.NullableType(this);
return this.m_nullable;
}
fan.sys.MapType = fan.sys.Obj.$extend(fan.sys.Type);
fan.sys.MapType.prototype.$ctor = function(k, v)
{
this.k = k;
this.v = v;
this.m_mixins = [];
}
fan.sys.MapType.prototype.signature = function()
{
return "[" + this.k.signature() + ':' + this.v.signature() + ']';
}
fan.sys.MapType.prototype.equals = function(that)
{
if (that instanceof fan.sys.MapType)
return this.k.equals(that.k) && this.v.equals(that.v);
else
return false;
}
fan.sys.MapType.prototype.is = function(that)
{
if (that.isNullable()) that = that.m_root;
if (that instanceof fan.sys.MapType)
{
return this.k.is(that.k) && this.v.is(that.v);
}
if (that instanceof fan.sys.Type)
{
if (that.qname() == "sys::Map") return true;
if (that.qname() == "sys::Obj")  return true;
}
return false;
}
fan.sys.MapType.prototype.as = function(obj, that)
{
var objType = fan.sys.ObjUtil.$typeof(obj);
if (objType instanceof fan.sys.MapType &&
objType.k.qname() == "sys::Obj" &&
objType.v.qname() == "sys::Obj" &&
that instanceof fan.sys.MapType)
return obj;
return objType.is(that) ? obj : null;
}
fan.sys.MapType.prototype.toNullable = function()
{
if (this.m_nullable == null) this.m_nullable = new fan.sys.NullableType(this);
return this.m_nullable;
}
fan.sys.FuncType = fan.sys.Obj.$extend(fan.sys.Type);
fan.sys.FuncType.prototype.$ctor = function(params, ret)
{
this.params = params;
this.ret = ret;
this.m_mixins = [];
}
fan.sys.FuncType.prototype.signature = function()
{
var s = '|'
for (var i=0; i<this.params.length; i++)
{
if (i > 0) s += ',';
s += this.params[i].signature();
}
s += '->';
s += this.ret.signature();
s += '|';
return s;
}
fan.sys.FuncType.prototype.equals = function(that)
{
if (that instanceof fan.sys.FuncType)
{
if (this.params.length != that.params.length) return false;
for (var i=0; i<this.params.length; i++)
if (!this.params[i].equals(that.params[i])) return false;
return this.ret.equals(that.ret);
}
return false;
}
fan.sys.FuncType.prototype.is = function(that)
{
if (this == that) return true;
if (that instanceof fan.sys.FuncType)
{
if (that.ret.m_qname != "sys::Void" && !this.ret.is(that.ret)) return false;
if (this.params.length > that.params.length) return false;
for (var i=0; i<this.params.length; ++i)
if (!that.params[i].is(this.params[i])) return false;
return true;
}
if (that.toString() == "sys::Func") return true;
if (that.toString() == "sys::Func?") return true;
return this.base().is(that);
}
fan.sys.FuncType.prototype.as = function(that)
{
return that;
}
fan.sys.Dimension = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Dimension.prototype.$ctor = function()
{
this.kg  = 0;
this.m   = 0;
this.sec = 0;
this.K   = 0;
this.A   = 0;
this.mol = 0;
this.cd  = 0;
}
fan.sys.Dimension.prototype.hashCode = function()
{
return (kg << 28) ^ (m << 23) ^ (sec << 18) ^
(K << 13) ^ (A << 8) ^ (mol << 3) ^ cd;
}
fan.sys.Dimension.prototype.equals = function(o)
{
return this.kg == x.kg && this.m   == x.m   && this.sec == x.sec && this.K == x.K &&
this.A  == x.A  && this.mol == x.mol && this.cd  == x.cd;
}
fan.sys.Dimension.prototype.toString = function()
{
if (this.m_str == null)
{
var s = "";
s = this.append(s, "kg",  this.kg);  s = this.append(s, "m",   this.m);
s = this.append(s, "sec", this.sec); s = this.append(s, "K",   this.K);
s = this.append(s, "A",   this.A);   s = this.append(s, "mol", this.mol);
s = this.append(s, "cd",  this.cd);
this.m_str = s;
}
return this.m_str;
}
fan.sys.Dimension.prototype.append = function(s, key, val)
{
if (val == 0) return s;
if (s.length > 0) s += '*';
s += key + val;
return s
}
fan.sys.Unit = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Unit.prototype.$ctor = function() {}
fan.sys.Unit.prototype.$typeof = function() { return fan.sys.Unit.$type; }
fan.sys.Unit.fromStr = function(name, checked)
{
if (checked === undefined) checked = true;
var unit = fan.sys.Unit.m_units[name];
if (unit != null || !checked) return unit;
throw fan.sys.Err.make("Unit not found: " + name);
}
fan.sys.Unit.list = function()
{
var arr = [];
var units = fan.sys.Unit.m_units;
for (p in units) arr.push(units[p]);
return fan.sys.List.make(fan.sys.Unit.$type, arr);
}
fan.sys.Unit.quantities = function()
{
return fan.sys.Unit.m_quantityNames;
}
fan.sys.Unit.quantity = function(quantity)
{
var list = fan.sys.Unit.m_quantities[quantity];
if (list == null) throw fan.sys.Err.make("Unknown unit database quantity: " + quantity);
return list;
}
fan.sys.Unit.define = function(str)
{
var unit = null;
try
{
unit = fan.sys.Unit.parseUnit(str);
}
catch (e)
{
var msg = str;
if (e instanceof fan.sys.ParseErr) msg += ": " + e.m_msg;
throw fan.sys.ParseErr.make("Unit", msg);
}
for (var i=0; i<unit.m_ids.size(); ++i)
{
var id = unit.m_ids.get(i);
fan.sys.Unit.m_units[id] = unit;
}
return unit;
}
fan.sys.Unit.parseUnit = function(s)
{
var idStrs = s;
var c = s.indexOf(';');
if (c > 0) idStrs = s.substring(0, c);
var ids = fan.sys.Str.split(idStrs, 44);
if (c < 0) return fan.sys.Unit.make(ids, fan.sys.Unit.m_dimensionless, fan.sys.Float.make(1), fan.sys.Float.make(0));
var dim = s = fan.sys.Str.trim(s.substring(c+1));
c = s.indexOf(';');
if (c < 0) return fan.sys.Unit.make(ids, fan.sys.Unit.parseDim(dim), fan.sys.Float.make(1), fan.sys.Float.make(0));
dim = fan.sys.Str.trim(s.substring(0, c));
var scale = s = fan.sys.Str.trim(s.substring(c+1));
c = s.indexOf(';');
if (c < 0) return fan.sys.Unit.make(ids, fan.sys.Unit.parseDim(dim), fan.sys.Float.fromStr(scale), fan.sys.Float.make(0));
scale = fan.sys.Str.trim(s.substring(0, c));
var offset = fan.sys.Str.trim(s.substring(c+1));
return fan.sys.Unit.make(ids, fan.sys.Unit.parseDim(dim), fan.sys.Float.fromStr(scale), fan.sys.Float.fromStr(offset));
}
fan.sys.Unit.parseDim = function(s)
{
if (s.length == 0) return fan.sys.Unit.m_dimensionless;
var dim = new fan.sys.Dimension();
var ratios = fan.sys.Str.split(s, 42, true);
for (var i=0; i<ratios.size(); ++i)
{
var r = ratios.get(i);
if (fan.sys.Str.startsWith(r, "kg"))  { dim.kg  = fan.sys.Int.fromStr(fan.sys.Str.trim(r.substring(2))); continue; }
if (fan.sys.Str.startsWith(r, "sec")) { dim.sec = fan.sys.Int.fromStr(fan.sys.Str.trim(r.substring(3))); continue; }
if (fan.sys.Str.startsWith(r, "mol")) { dim.mol = fan.sys.Int.fromStr(fan.sys.Str.trim(r.substring(3))); continue; }
if (fan.sys.Str.startsWith(r, "m"))   { dim.m   = fan.sys.Int.fromStr(fan.sys.Str.trim(r.substring(1))); continue; }
if (fan.sys.Str.startsWith(r, "K"))   { dim.K   = fan.sys.Int.fromStr(fan.sys.Str.trim(r.substring(1))); continue; }
if (fan.sys.Str.startsWith(r, "A"))   { dim.A   = fan.sys.Int.fromStr(fan.sys.Str.trim(r.substring(1))); continue; }
if (fan.sys.Str.startsWith(r, "cd"))  { dim.cd  = fan.sys.Int.fromStr(fan.sys.Str.trim(r.substring(2))); continue; }
throw fan.sys.ParseErr.make("Bad ratio '" + r + "'");
}
var key = dim.toString();
var cached = fan.sys.Unit.m_dims[key];
if (cached != null) return cached;
fan.sys.Unit.m_dims[key] = dim;
return dim;
}
fan.sys.Unit.make = function(ids, dim, scale, offset)
{
var instance = new fan.sys.Unit();
instance.m_ids    = fan.sys.Unit.checkIds(ids);
instance.m_dim    = dim;
instance.m_scale  = scale;
instance.m_offset = offset;
return instance;
}
fan.sys.Unit.checkIds = function(ids)
{
if (ids.size() == 0) throw fan.sys.ParseErr.make("No unit ids defined");
for (var i=0; i<ids.size(); ++i) fan.sys.Unit.checkId(ids.get(i));
return ids.toImmutable();
}
fan.sys.Unit.checkId = function(id)
{
if (id.length == 0) throw fan.sys.ParseErr.make("Invalid unit id length 0");
for (var i=0; i<id.length; ++i)
{
var code = id.charCodeAt(i);
var ch   = id.charAt(i);
if (fan.sys.Int.isAlpha(code) || ch == '_' || ch == '%' || ch == '/' || code > 128) continue;
throw fan.sys.ParseErr.make("Invalid unit id " + id + " (invalid char '" + ch + "')");
}
}
fan.sys.Unit.prototype.equals = function(obj) { return this == obj; }
fan.sys.Unit.prototype.hash = function() { return fan.sys.Str.hash(this.toStr()); }
fan.sys.Unit.prototype.$typeof = function() { return fan.sys.Unit.$type; }
fan.sys.Unit.prototype.toStr = function() { return this.m_ids.last(); }
fan.sys.Unit.prototype.ids = function() { return this.m_ids; }
fan.sys.Unit.prototype.name = function() { return this.m_ids.first(); }
fan.sys.Unit.prototype.symbol = function() { return this.m_ids.last(); }
fan.sys.Unit.prototype.scale = function() { return this.m_scale; }
fan.sys.Unit.prototype.offset = function() { return this.m_offset; }
fan.sys.Unit.prototype.definition = function()
{
var s = "";
for (var i=0; i<this.m_ids.size(); ++i)
{
if (i > 0) s += ", ";
s += this.m_ids.get(i);
}
if (this.m_dim != fan.sys.Unit.m_dimensionless)
{
s += "; " + this.m_dim;
if (this.m_scale != 1.0 || this.m_offset != 0.0)
{
s += "; " + this.m_scale;
if (this.m_offset != 0.0) s += "; " + this.m_offset;
}
}
return s;
}
fan.sys.Unit.prototype.kg = function() { return this.m_dim.kg; }
fan.sys.Unit.prototype.m = function() { return this.m_dim.m; }
fan.sys.Unit.prototype.sec = function() { return this.m_dim.sec; }
fan.sys.Unit.prototype.K = function() { return this.m_dim.K; }
fan.sys.Unit.prototype.A = function() { return this.m_dim.A; }
fan.sys.Unit.prototype.mol = function() { return this.m_dim.mol; }
fan.sys.Unit.prototype.cd = function() { return this.m_dim.cd; }
fan.sys.Unit.prototype.convertTo = function(scalar, to)
{
if (this.m_dim != to.m_dim) throw fan.sys.Err.make("Incovertable units: " + this + " and " + to);
return ((scalar * this.m_scale + this.m_offset) - to.m_offset) / to.m_scale;
}
fan.sys.Unit.m_units      = {};
fan.sys.Unit.m_dims       = {};
fan.sys.Unit.m_quantities = {};
fan.sys.Unit.m_quantityNames;
fan.sys.Unit.m_dimensionless = new fan.sys.Dimension();
fan.sys.Unit.m_dims[fan.sys.Unit.m_dimensionless.toString()] =  fan.sys.Unit.m_dimensionless;
fan.sys.Unsafe = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Unsafe.make = function(val)
{
var self = new fan.sys.Unsafe();
self.m_val = val;
return self;
}
fan.sys.Unsafe.prototype.$ctor = function()
{
}
fan.sys.Unsafe.prototype.val = function() { return this.m_val; }
fan.sys.Uri = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Uri.prototype.$ctor = function() {}
fan.sys.Uri.fromStr = function(s, checked)
{
if (checked === undefined) checked = true;
try
{
return fan.sys.Uri.makeSections(new fan.sys.UriDecoder(s, false).decode());
}
catch (err)
{
if (!checked) return null;
throw fan.sys.ParseErr.make("Uri",  s);
}
}
fan.sys.Uri.decode = function(s, checked)
{
if (checked === undefined) checked = true;
try
{
return new fan.sys.Uri.makeSections(new fan.sys.UriDecoder(s, true).decode());
}
catch (err)
{
if (!checked) return null;
throw fan.sys.ParseErr.make("Uri", s);
}
}
fan.sys.Uri.decodeQuery = function(s)
{
try
{
return new fan.sys.UriDecoder(s, true).decodeQuery();
}
catch (err)
{
if (err instanceof fan.sys.ArgErr)
throw fan.sys.ArgErr.make("Invalid Uri query: `" + s + "`: " + err.msg());
throw fan.sys.ArgErr.make("Invalid Uri query: `" + s + "`");
}
}
fan.sys.Uri.encodeQuery = function(map)
{
var buf  = "";
var keys = map.keys();
var len  = keys.size();
for (var i=0; i<len; i++)
{
var key = keys.get(i);
var val = map.get(key);
if (buf.length > 0) buf += '&';
buf = fan.sys.Uri.encodeQueryStr(buf, key);
if (val != null)
{
buf += '=';
buf = fan.sys.Uri.encodeQueryStr(buf, val);
}
}
return buf;
}
fan.sys.Uri.encodeQueryStr = function(buf, str)
{
var len = str.length;
for (var i=0; i<len; ++i)
{
var c = str.charCodeAt(i);
if (c < 128 && (fan.sys.Uri.charMap[c] & fan.sys.Uri.QUERY) != 0 && (fan.sys.Uri.delimEscMap[c] & fan.sys.Uri.QUERY) == 0)
buf += str.charAt(i);
else
buf = fan.sys.UriEncoder.percentEncodeChar(buf, c);
}
return buf;
}
fan.sys.Uri.makeSections = function(x)
{
var uri = new fan.sys.Uri();
uri.m_scheme   = x.scheme;
uri.m_userInfo = x.userInfo;
uri.m_host     = x.host;
uri.m_port     = x.port;
uri.m_pathStr  = x.pathStr;
uri.m_path     = x.path.ro();
uri.m_queryStr = x.queryStr;
uri.m_query    = x.query.ro();
uri.m_frag     = x.frag;
uri.m_str      = x.str != null ? x.str : new fan.sys.UriEncoder(uri, false).encode();
return uri;
}
fan.sys.Uri.prototype.m_str = null;
fan.sys.Uri.prototype.m_scheme = null;
fan.sys.Uri.prototype.m_userInfo = null;
fan.sys.Uri.prototype.m_host = null;
fan.sys.Uri.prototype.m_port = null;
fan.sys.Uri.prototype.m_path = null;
fan.sys.Uri.prototype.m_pathStr = null;
fan.sys.Uri.prototype.m_query = null;
fan.sys.Uri.prototype.m_queryStr = null;
fan.sys.Uri.prototype.m_frag = null;
fan.sys.Uri.prototype.m_encoded = null;
fan.sys.UriSections = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.UriSections.prototype.$ctor = function() {}
fan.sys.UriSections.prototype.setAuth = function(x)  { this.userInfo = x.m_userInfo; this.host = x.m_host; this.port = x.m_port; }
fan.sys.UriSections.prototype.setPath = function(x)  { this.pathStr = x.m_pathStr; this.path = x.m_path; }
fan.sys.UriSections.prototype.setQuery = function(x) { this.queryStr = x.m_queryStr; this.query = x.m_query; }
fan.sys.UriSections.prototype.setFrag = function(x)  { this.frag = x.m_frag; }
fan.sys.UriSections.prototype.normalize = function()
{
this.normalizeHttp();
this.normalizePath();
this.normalizeQuery();
}
fan.sys.UriSections.prototype.normalizeHttp = function()
{
if (this.scheme == null || this.scheme != "http")
return;
if (this.port != null && this.port == 80) this.port = null;
if (this.pathStr == null || this.pathStr.length == 0)
{
this.pathStr = "/";
if (this.path == null) this.path = fan.sys.Uri.emptyPath();
}
}
fan.sys.UriSections.prototype.normalizePath = function()
{
if (this.path == null) return;
var isAbs = fan.sys.Str.startsWith(this.pathStr, "/");
var isDir = fan.sys.Str.endsWith(this.pathStr, "/");
var dotLast = false;
var modified = false;
for (var i=0; i<this.path.size(); ++i)
{
var seg = this.path.get(i);
if (seg == "." && (this.path.size() > 1 || this.host != null))
{
this.path.removeAt(i);
modified = true;
dotLast = true;
i -= 1;
}
else if (seg == ".." && i > 0 && this.path.get(i-1).toString() != "..")
{
this.path.removeAt(i);
this.path.removeAt(i-1);
modified = true;
i -= 2;
dotLast = true;
}
else
{
dotLast = false;
}
}
if (modified)
{
if (dotLast) isDir = true;
if (this.path.size() == 0 || this.path.last().toString() == "..") isDir = false;
this.pathStr = fan.sys.Uri.toPathStr(isAbs, this.path, isDir);
}
}
fan.sys.UriSections.prototype.normalizeQuery = function()
{
if (this.query == null)
this.query = fan.sys.Uri.emptyQuery();
}
fan.sys.UriSections.prototype.scheme = null;
fan.sys.UriSections.prototype.host = null;
fan.sys.UriSections.prototype.userInfo = null;
fan.sys.UriSections.prototype.port = null;
fan.sys.UriSections.prototype.pathStr = null;
fan.sys.UriSections.prototype.path = null;
fan.sys.UriSections.prototype.queryStr = null;
fan.sys.UriSections.prototype.query = null;
fan.sys.UriSections.prototype.frag = null;
fan.sys.UriSections.prototype.str = null;
fan.sys.UriDecoder = fan.sys.Obj.$extend(fan.sys.UriSections);
fan.sys.UriDecoder.prototype.$ctor = function(str, decoding)
{
this.str = str;
this.decoding = decoding;
}
fan.sys.UriDecoder.prototype.decode = function()
{
var str = this.str;
var len = str.length;
var pos = 0;
var hasUpper = false;
for (var i=0; i<len; ++i)
{
var c = str.charCodeAt(i);
if (fan.sys.Uri.isScheme(c))
{
if (!hasUpper && fan.sys.Uri.isUpper(c)) hasUpper = true;
continue;
}
if (c != 58) break;
pos = i + 1;
var scheme = str.substring(0, i);
if (hasUpper) scheme = fan.sys.Str.lower(scheme);
this.scheme = scheme;
break;
}
if (pos+1 < len && str.charAt(pos) == '/' && str.charAt(pos+1) == '/')
{
var authStart = pos+2;
var authEnd = len;
var at = -1;
var colon = -1;
for (var i=authStart; i<len; ++i)
{
var c = str.charAt(i);
if (c == '/' || c == '?' || c == '#') { authEnd = i; break; }
else if (c == '@' && at < 0) { at = i; colon = -1; }
else if (c == ':') colon = i;
else if (c == ']') colon = -1;
}
var hostStart = authStart;
var hostEnd = authEnd;
if (at > 0)
{
this.userInfo = this.substring(authStart, at, fan.sys.Uri.USER);
hostStart = at+1;
}
if (colon > 0)
{
this.port = fan.sys.Int.fromStr(str.substring(colon+1, authEnd));
hostEnd = colon;
}
this.host = this.substring(hostStart, hostEnd, fan.sys.Uri.HOST);
pos = authEnd;
}
var pathStart = pos;
var pathEnd = len;
var numSegs = 1;
var prev = 0;
for (var i=pathStart; i<len; ++i)
{
var c = str.charAt(i);
if (prev != '\\')
{
if (c == '?' || c == '#') { pathEnd = i; break; }
if (i != pathStart && c == '/') ++numSegs;
prev = c;
}
else
{
prev = (c != '\\') ? c : 0;
}
}
this.pathStr = this.substring(pathStart, pathEnd, fan.sys.Uri.PATH);
this.path = this.pathSegments(this.pathStr, numSegs);
pos = pathEnd;
if (pos < len && str.charAt(pos) == '?')
{
var queryStart = pos+1;
var queryEnd = len;
prev = 0;
for (var i=queryStart; i<len; ++i)
{
var c = str.charAt(i);
if (prev != '\\')
{
if (c == '#') { queryEnd = i; break; }
prev = c;
}
else
{
prev = (c != '\\') ? c : 0;
}
}
this.queryStr = this.substring(queryStart, queryEnd, fan.sys.Uri.QUERY);
this.query = this.parseQuery(this.queryStr);
pos = queryEnd;
}
if (pos < len  && str.charAt(pos) == '#')
{
this.frag = this.substring(pos+1, len, fan.sys.Uri.FRAG);
}
this.normalize();
this.str = null;
return this;
}
fan.sys.UriDecoder.prototype.pathSegments = function(pathStr, numSegs)
{
var len = pathStr.length;
if (len == 0 || (len == 1 && pathStr.charAt(0) == '/'))
return fan.sys.Uri.emptyPath();
if (len > 1 && pathStr.charAt(len-1) == '/')
{
numSegs--;
len--;
}
var path = [];
var n = 0;
var segStart = 0;
var prev = 0;
for (var i=0; i<pathStr.length; ++i)
{
var c = pathStr.charAt(i);
if (prev != '\\')
{
if (c == '/')
{
if (i > 0) { path.push(pathStr.substring(segStart, i)); n++ }
segStart = i+1;
}
prev = c;
}
else
{
prev = (c != '\\') ? c : 0;
}
}
if (segStart < len)
{
path.push(pathStr.substring(segStart, pathStr.length));
n++;
}
return fan.sys.List.make(fan.sys.Str.$type, path);
}
fan.sys.UriDecoder.prototype.decodeQuery = function()
{
return this.parseQuery(this.substring(0, this.str.length, fan.sys.Uri.QUERY));
}
fan.sys.UriDecoder.prototype.parseQuery = function(q)
{
if (q == null) return null;
var map = fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type);
try
{
var start = 0;
var eq = 0;
var len = q.length;
var prev = 0;
var escaped = false;
for (var i=0; i<len; ++i)
{
var ch = q.charAt(i);
if (prev != '\\')
{
if (ch == '=') eq = i;
if (ch != '&' && ch != ';') { prev = ch; continue; }
}
else
{
escaped = true;
prev = (ch != '\\') ? ch : 0;
continue;
}
if (start < i)
{
this.addQueryParam(map, q, start, eq, i, escaped);
escaped = false;
}
start = eq = i+1;
}
if (start < len)
this.addQueryParam(map, q, start, eq, len, escaped);
}
catch (err)
{
fan.sys.Err.make(err).trace();
}
return map;
}
fan.sys.UriDecoder.prototype.addQueryParam = function(map, q, start, eq, end, escaped)
{
if (start == eq && q.charAt(start) != '=')
{
key = this.toQueryStr(q, start, end, escaped);
val = "true";
}
else
{
key = this.toQueryStr(q, start, eq, escaped);
val = this.toQueryStr(q, eq+1, end, escaped);
}
dup = map.get(key, null)
if (dup !== undefined) val = dup + "," + val
map.set(key, val)
}
fan.sys.UriDecoder.prototype.toQueryStr = function(q, start, end, escaped)
{
if (!escaped) return q.substring(start, end);
var s = "";
var prev = 0;
for (var i=start; i<end; ++i)
{
var c = q.charAt(i);
if (c != '\\')
{
s += c;
prev = c;
}
else
{
if (prev == '\\') { s += c; prev = 0; }
else prev = c;
}
}
return s;
}
fan.sys.UriDecoder.prototype.substring = function(start, end, section)
{
if (!this.decoding) return this.str.substring(start, end);
var buf = "";
this.dpos = start;
while (this.dpos < end)
{
var ch = this.nextChar(section);
if (this.nextCharWasEscaped && ch < fan.sys.Uri.delimEscMap.length && (fan.sys.Uri.delimEscMap[ch] & section) != 0)
buf += '\\';
buf += String.fromCharCode(ch);
}
return buf;
}
fan.sys.UriDecoder.prototype.nextChar = function(section)
{
var c = this.nextOctet(section);
if (c < 0) return -1;
var c2, c3;
switch (c >> 4)
{
case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
return c;
case 12: case 13:
c2 = this.nextOctet(section);
if ((c2 & 0xC0) != 0x80)
throw fan.sys.ParseErr.make("Invalid UTF-8 encoding");
return ((c & 0x1F) << 6) | (c2 & 0x3F);
case 14:
c2 = this.nextOctet(section);
c3 = this.nextOctet(section);
if (((c2 & 0xC0) != 0x80) || ((c3 & 0xC0) != 0x80))
throw fan.sys.ParseErr.make("Invalid UTF-8 encoding");
return (((c & 0x0F) << 12) | ((c2 & 0x3F) << 6) | ((c3 & 0x3F) << 0));
default:
throw fan.sys.ParseErr.make("Invalid UTF-8 encoding");
}
}
fan.sys.UriDecoder.prototype.nextOctet = function(section)
{
var c = this.str.charCodeAt(this.dpos++);
if (c == 37)
{
this.nextCharWasEscaped = true;
return (fan.sys.Uri.hexNibble(this.str.charCodeAt(this.dpos++)) << 4) | fan.sys.Uri.hexNibble(this.str.charCodeAt(this.dpos++));
return x;
}
else
{
this.nextCharWasEscaped = false;
}
if (c == 43 && section == fan.sys.Uri.QUERY)
return 32
if (c >= fan.sys.Uri.charMap.length || (fan.sys.Uri.charMap[c] & section) == 0)
throw fan.sys.ParseErr.make("Invalid char in " + fan.sys.Uri.toSection(section) + " at index " + (this.dpos-1));
return c;
}
fan.sys.UriDecoder.prototype.decoding = false;
fan.sys.UriDecoder.prototype.dpos = null;
fan.sys.UriDecoder.prototype.nextCharWasEscaped = null;
fan.sys.UriEncoder = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.UriEncoder.prototype.$ctor = function(uri, encoding)
{
this.uri = uri;
this.encoding = encoding;
this.buf = '';
}
fan.sys.UriEncoder.prototype.encode = function()
{
var uri = this.uri;
if (uri.m_scheme != null) this.buf += uri.m_scheme + ':';
if (uri.m_userInfo != null || uri.m_host != null || uri.m_port != null)
{
this.buf += '/' + '/';
if (uri.m_userInfo != null) { this.doEncode(uri.m_userInfo, fan.sys.Uri.USER); this.buf += '@'; }
if (uri.m_host != null) this.doEncode(uri.m_host, fan.sys.Uri.HOST);
if (uri.m_port != null) this.buf += ':' + uri.m_port;
}
if (uri.m_pathStr != null)
this.doEncode(uri.m_pathStr, fan.sys.Uri.PATH);
if (uri.m_queryStr != null)
{ this.buf += '?'; this.doEncode(uri.m_queryStr, fan.sys.Uri.QUERY); }
if (uri.m_frag != null)
{ this.buf += '#'; this.doEncode(uri.m_frag, fan.sys.Uri.FRAG); }
return this.buf;
}
fan.sys.UriEncoder.prototype.doEncode = function(s, section)
{
if (!this.encoding) { this.buf += s; return this.buf; }
var len = s.length;
var c = 0;
var prev;
for (var i=0; i<len; ++i)
{
prev = c;
c = s.charCodeAt(i);
if (c < 128 && (fan.sys.Uri.charMap[c] & section) != 0 && prev != 92)
{
this.buf += String.fromCharCode(c);
continue;
}
if (c == 92 && prev != 92) continue;
if (c == 32 && section == fan.sys.Uri.QUERY)
this.buf += '+';
else
this.buf = fan.sys.UriEncoder.percentEncodeChar(this.buf, c);
if (c == 92) c = 0;
}
return this.buf;
}
fan.sys.UriEncoder.prototype.uri = null;
fan.sys.UriEncoder.prototype.encoding = null;
fan.sys.UriEncoder.prototype.buf = null;
fan.sys.UriEncoder.percentEncodeChar = function(buf, c)
{
if (c <= 0x007F)
{
buf = fan.sys.UriEncoder.percentEncodeByte(buf, c);
}
else if (c > 0x07FF)
{
buf = fan.sys.UriEncoder.percentEncodeByte(buf, 0xE0 | ((c >> 12) & 0x0F));
buf = fan.sys.UriEncoder.percentEncodeByte(buf, 0x80 | ((c >>  6) & 0x3F));
buf = fan.sys.UriEncoder.percentEncodeByte(buf, 0x80 | ((c >>  0) & 0x3F));
}
else
{
buf = fan.sys.UriEncoder.percentEncodeByte(buf, 0xC0 | ((c >>  6) & 0x1F));
buf = fan.sys.UriEncoder.percentEncodeByte(buf, 0x80 | ((c >>  0) & 0x3F));
}
return buf;
}
fan.sys.UriEncoder.percentEncodeByte = function(buf, c)
{
buf += '%';
var hi = (c >> 4) & 0xf;
var lo = c & 0xf;
buf += (hi < 10 ? String.fromCharCode(48+hi) : String.fromCharCode(65+(hi-10)));
buf += (lo < 10 ? String.fromCharCode(48+lo) : String.fromCharCode(65+(lo-10)));
return buf;
}
fan.sys.Uri.prototype.$typeof = function()
{
return fan.sys.Uri.$type;
}
fan.sys.Uri.prototype.equals = function(that)
{
if (that instanceof fan.sys.Uri)
return this.m_str === that.m_str;
else
return false;
}
fan.sys.Uri.prototype.toCode = function()
{
var s = '`';
var len = this.m_str.length;
for (var i=0; i<len; ++i)
{
var c = this.m_str.charAt(i);
switch (c)
{
case '\n': s += '\\' + 'n'; break;
case '\r': s += '\\' + 'r'; break;
case '\f': s += '\\' + 'f'; break;
case '\t': s += '\\' + 't'; break;
case '`':  s += '\\' + '`'; break;
case '$':  s += '\\' + '$'; break;
default:  s += c;
}
}
s += '`';
return s;
}
fan.sys.Uri.prototype.toStr = function()
{
return this.m_str;
}
fan.sys.Uri.prototype.toLocale = function()
{
return this.m_str;
}
fan.sys.Uri.prototype.$literalEncode = function(out)
{
out.wStrLiteral(this.m_str, '`');
}
fan.sys.Uri.prototype.encode = function()
{
var x = this.m_encoded;
if (x != null) return x;
return this.m_encoded = new fan.sys.UriEncoder(this, true).encode();
}
fan.sys.Uri.prototype.get = function()
{
if (this.m_scheme == "fan")
{
if (this.m_path.size() == 0)
return fan.sys.Pod.find(this.m_host);
}
return fan.sys.File.make();
}
fan.sys.Uri.prototype.isAbs = function() { return this.m_scheme != null; }
fan.sys.Uri.prototype.isRel = function() { return this.m_scheme == null; }
fan.sys.Uri.prototype.isDir = function()
{
if (this.m_pathStr != null)
{
var p = this.m_pathStr;
var len = p.length;
if (len > 0 && p.charAt(len-1) == '/')
return true;
}
return false;
}
fan.sys.Uri.prototype.scheme = function() { return this.m_scheme; }
fan.sys.Uri.prototype.auth = function()
{
if (this.m_host == null) return null;
if (this.m_port == null)
{
if (this.m_userInfo == null) return this.m_host;
else return this.m_userInfo + '@' + this.m_host;
}
else
{
if (this.m_userInfo == null) return this.m_host + ':' + this.m_port;
else return this.m_userInfo + '@' + this.m_host + ':' + this.m_port;
}
}
fan.sys.Uri.prototype.host = function() { return this.m_host; }
fan.sys.Uri.prototype.userInfo = function() { return this.m_userInfo; }
fan.sys.Uri.prototype.port = function() { return this.m_port; }
fan.sys.Uri.prototype.path = function() { return this.m_path; }
fan.sys.Uri.prototype.pathStr = function() { return this.m_pathStr; }
fan.sys.Uri.prototype.isPathAbs = function()
{
if (this.m_pathStr == null || this.m_pathStr.length == 0)
return false;
else
return this.m_pathStr.charAt(0) == '/';
}
fan.sys.Uri.prototype.isPathOnly = function()
{
return this.m_scheme == null && this.m_host == null && this.m_port == null &&
this.m_userInfo == null && this.m_queryStr == null && this.m_frag == null;
}
fan.sys.Uri.prototype.name = function()
{
if (this.m_path.size() == 0) return "";
return this.m_path.last();
}
fan.sys.Uri.prototype.basename = function()
{
var n = this.name();
var dot = n.lastIndexOf('.');
if (dot < 2)
{
if (dot < 0) return n;
if (n == ".") return n;
if (n == "..") return n;
}
return n.substring(0, dot);
}
fan.sys.Uri.prototype.ext = function()
{
var n = this.name();
var dot = n.lastIndexOf('.');
if (dot < 2)
{
if (dot < 0) return null;
if (n == ".") return null;
if (n == "..") return null;
}
return n.substring(dot+1);
}
fan.sys.Uri.prototype.mimeType = function()
{
if (this.isDir()) return fan.sys.MimeType.m_dir;
return fan.sys.MimeType.forExt(this.ext());
}
fan.sys.Uri.prototype.query = function() { return this.m_query; }
fan.sys.Uri.prototype.queryStr = function() { return this.m_queryStr; }
fan.sys.Uri.prototype.frag = function() { return this.m_frag; }
fan.sys.Uri.prototype.parent = function()
{
if (this.m_path.size() == 0) return null;
if (this.m_path.size() == 1 && !this.isPathAbs() && !this.isDir()) return null;
return this.getRange(fan.sys.Uri.parentRange);
}
fan.sys.Uri.prototype.pathOnly = function()
{
if (this.m_pathStr == null)
throw fan.sys.Err.make("Uri has no path: " + this);
if (this.m_scheme == null && this.m_userInfo == null && this.m_host == null &&
this.m_port == null && this.m_queryStr == null && this.m_frag == null)
return this;
var t = new fan.sys.UriSections();
t.path     = this.m_path;
t.pathStr  = this.m_pathStr;
t.query    = fan.sys.Uri.emptyQuery();
t.str      = this.m_pathStr;
return fan.sys.Uri.makeSections(t);
}
fan.sys.Uri.prototype.getRangeToPathAbs = function(range) { return this.getRange(range, true); }
fan.sys.Uri.prototype.getRange = function(range, forcePathAbs)
{
if (forcePathAbs === undefined) forcePathAbs = false;
if (this.m_pathStr == null)
throw fan.sys.Err.make("Uri has no path: " + this);
var size = this.m_path.size();
var s = range.$start(size);
var e = range.$end(size);
var n = e - s + 1;
if (n < 0) throw fan.sys.IndexErr.make(range);
var head = (s == 0);
var tail = (e == size-1);
if (head && tail && (!forcePathAbs || this.isPathAbs())) return this;
var t = new fan.sys.UriSections();
t.path = this.m_path.getRange(range);
var sb = "";
if ((head && this.isPathAbs()) || forcePathAbs) sb += '/';
for (var i=0; i<t.path.size(); ++i)
{
if (i > 0) sb += '/';
sb += t.path.get(i);
}
if (t.path.size() > 0 && (!tail || this.isDir())) sb += '/';
t.pathStr = sb;
if (head)
{
t.scheme   = this.m_scheme;
t.userInfo = this.m_userInfo;
t.host     = this.m_host;
t.port     = this.m_port;
}
if (tail)
{
t.queryStr = this.m_queryStr;
t.query    = this.m_query;
t.frag     = this.m_frag;
}
else
{
t.query    = fan.sys.Uri.emptyQuery();
}
if (!head && !tail)
{
t.str = t.pathStr;
}
return fan.sys.Uri.makeSections(t);
}
fan.sys.Uri.prototype.relTo = function(base)
{
if ((this.m_scheme != base.m_scheme) ||
(this.m_userInfo != base.m_userInfo) ||
(this.m_host != base.m_host) ||
(this.m_port != base.m_port))
return this;
var t = new fan.sys.UriSections();
t.query    = this.m_query;
t.queryStr = this.m_queryStr;
t.frag     = this.m_frag;
var d=0;
var len = Math.min(this.m_path.size(), base.m_path.size());
for (; d<len; ++d)
if (this.m_path.get(d) != base.m_path.get(d))
break;
if (d == 0)
{
if (base.m_path.isEmpty() && fan.sys.Str.startsWith(this.m_pathStr, "/"))
{
t.path = this.m_path;
t.pathStr = this.m_pathStr.substring(1);
}
else
{
t.path = this.m_path;
t.pathStr = this.m_pathStr;
}
}
else if (d == this.m_path.size() && d == base.m_path.size())
{
t.path = fan.sys.Uri.emptyPath();
t.pathStr = "";
}
else
{
t.path = this.m_path.getRange(fan.sys.Range.makeInclusive(d, -1));
var backup = base.m_path.size() - d;
if (!base.isDir()) backup--;
while (backup-- > 0) t.path.insert(0, "..");
t.pathStr = fan.sys.Uri.toPathStr(false, t.path, this.isDir());
}
return fan.sys.Uri.makeSections(t);
}
fan.sys.Uri.prototype.relToAuth = function()
{
if (this.m_scheme == null && this.m_userInfo == null &&
this.m_host == null && this.m_port == null)
return this;
var t = new fan.sys.UriSections();
t.path     = this.m_path;
t.pathStr  = this.m_pathStr;
t.query    = this.m_query;
t.queryStr = this.m_queryStr;
t.frag     = this.m_frag;
return fan.sys.Uri.makeSections(t);
}
fan.sys.Uri.prototype.plus = function(r)
{
if (r.m_scheme != null) return r;
if (r.m_host != null && this.m_scheme == null) return r;
if (r.isPathAbs() && this.m_host == null) return r;
var base = this;
var t = new fan.sys.UriSections();
if (r.m_host != null)
{
t.setAuth(r);
t.setPath(r);
t.setQuery(r);
}
else
{
if (r.m_pathStr == null || r.m_pathStr == "")
{
t.setPath(base);
if (r.m_queryStr != null)
t.setQuery(r);
else
t.setQuery(base);
}
else
{
if (fan.sys.Str.startsWith(r.m_pathStr, "/"))
t.setPath(r);
else
fan.sys.Uri.merge(t, base, r);
t.setQuery(r);
}
t.setAuth(base);
}
t.scheme = base.m_scheme;
t.frag   = r.m_frag;
t.normalize();
return fan.sys.Uri.makeSections(t);
}
fan.sys.Uri.merge = function(t, base, r)
{
var baseIsAbs = base.isPathAbs();
var baseIsDir = base.isDir();
var rIsDir    = r.isDir();
var rPath     = r.m_path;
var dotLast   = false;
var tPath;
if (base.m_path.size() == 0)
{
tPath = r.m_path;
}
else
{
tPath = base.m_path.rw();
if (!baseIsDir) tPath.pop();
for (var i=0; i<rPath.size(); ++i)
{
var rSeg = rPath.get(i);
if (rSeg == ".") { dotLast = true; continue; }
if (rSeg == "..")
{
if (tPath.size() > 0) { tPath.pop(); dotLast = true; continue; }
if (baseIsAbs) continue;
}
tPath.add(rSeg); dotLast = false;
}
}
t.path = tPath;
t.pathStr = fan.sys.Uri.toPathStr(baseIsAbs, tPath, rIsDir || dotLast);
}
fan.sys.Uri.toPathStr = function(isAbs, path, isDir)
{
var buf = '';
if (isAbs) buf += '/';
for (var i=0; i<path.size(); ++i)
{
if (i > 0) buf += '/';
buf += path.get(i);
}
if (isDir && !(buf.length > 0 && buf.charAt(buf.length-1) == '/'))
buf += '/';
return buf;
}
fan.sys.Uri.prototype.plusName = function(name, asDir)
{
var size        = this.m_path.size();
var isDir       = this.isDir();
var newSize     = isDir ? size + 1 : size;
var temp        = this.m_path.dup().m_values;
temp[newSize-1] = name;
var t = new fan.sys.UriSections();
t.scheme   = this.m_scheme;
t.userInfo = this.m_userInfo;
t.host     = this.m_host;
t.port     = this.m_port;
t.query    = fan.sys.Uri.emptyQuery();
t.queryStr = null;
t.frag     = null;
t.path     = fan.sys.List.make(fan.sys.Str.$type, temp);
t.pathStr  = fan.sys.Uri.toPathStr(this.isPathAbs(), t.path, asDir);
return fan.sys.Uri.makeSections(t);
}
fan.sys.Uri.prototype.plusSlash = function()
{
if (this.isDir()) return this;
var t = new fan.sys.UriSections();
t.scheme   = this.m_scheme;
t.userInfo = this.m_userInfo;
t.host     = this.m_host;
t.port     = this.m_port;
t.query    = this.m_query;
t.queryStr = this.m_queryStr;
t.frag     = this.m_frag;
t.path     = this.m_path;
t.pathStr  = this.m_pathStr + "/";
return fan.sys.Uri.makeSections(t);
}
fan.sys.Uri.prototype.plusQuery = function(q)
{
if (q == null || q.isEmpty()) return this;
var merge = this.m_query.dup().setAll(q);
var s = "";
var keys = merge.keys();
for (var i=0; i<keys.size(); i++)
{
if (s.length > 0) s += '&';
var key = keys.get(i);
var val = merge.get(key);
s = fan.sys.Uri.appendQueryStr(s, key);
s += '=';
s = fan.sys.Uri.appendQueryStr(s, val);
}
var t = new fan.sys.UriSections();
t.scheme   = this.m_scheme;
t.userInfo = this.m_userInfo;
t.host     = this.m_host;
t.port     = this.m_port;
t.frag     = this.m_frag;
t.pathStr  = this.m_pathStr;
t.path     = this.m_path;
t.query    = merge.ro();
t.queryStr = s;
return fan.sys.Uri.makeSections(t);
}
fan.sys.Uri.appendQueryStr = function(buf, str)
{
var len = str.length;
for (var i=0; i<len; ++i)
{
var c = str.charCodeAt(i);
if (c < fan.sys.Uri.delimEscMap.length && (fan.sys.Uri.delimEscMap[c] & fan.sys.Uri.QUERY) != 0)
buf += '\\';
buf += str.charAt(i);
}
return buf;
}
fan.sys.Uri.isName = function(name)
{
var len = name.length;
if (len == 0) return false;
if (name.charAt(0) == '.' && len <= 2)
{
if (len == 1) return false;
if (name.charAt(1) == '.') return false;
}
for (var i=0; i<len; ++i)
{
var c = name.charCodeAt(i);
if (c < 128 && fan.sys.Uri.nameMap[c]) continue;
return false;
}
return true;
}
fan.sys.Uri.checkName = function(name)
{
if (!fan.sys.Uri.isName(name))
throw fan.sys.NameErr.make(name);
}
fan.sys.Uri.isUpper = function(c)
{
return 65 <= c && c <= 90;
}
fan.sys.Uri.hexNibble = function(ch)
{
if ((fan.sys.Uri.charMap[ch] & fan.sys.Uri.HEX) == 0)
throw fan.sys.ParseErr.make("Invalid percent encoded hex: '" + String.fromCharCode(ch));
if (ch <= 57) return ch - 48;
if (ch <= 90) return (ch - 65) + 10;
return (ch - 97) + 10;
}
fan.sys.Uri.toSection = function(section)
{
switch (section)
{
case fan.sys.Uri.SCHEME: return "scheme";
case fan.sys.Uri.USER:   return "userInfo";
case fan.sys.Uri.HOST:   return "host";
case fan.sys.Uri.PATH:   return "path";
case fan.sys.Uri.QUERY:  return "query";
case fan.sys.Uri.FRAG:   return "frag";
default:                 return "uri";
}
}
fan.sys.Uri.isScheme = function(c)
{
return c < 128 ? (fan.sys.Uri.charMap[c] & fan.sys.Uri.SCHEME) != 0 : false;
}
fan.sys.Uri.charMap     = [];
fan.sys.Uri.nameMap     = [];
fan.sys.Uri.delimEscMap = [];
fan.sys.Uri.SCHEME     = 0x01;
fan.sys.Uri.USER       = 0x02;
fan.sys.Uri.HOST       = 0x04;
fan.sys.Uri.PATH       = 0x08;
fan.sys.Uri.QUERY      = 0x10;
fan.sys.Uri.FRAG       = 0x20;
fan.sys.Uri.DIGIT      = 0x40;
fan.sys.Uri.HEX        = 0x80;
fan.sys.Uri.unreserved = fan.sys.Uri.SCHEME | fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
for (var i=97; i<=122; ++i) { fan.sys.Uri.charMap[i] = fan.sys.Uri.unreserved; fan.sys.Uri.nameMap[i] = true; }
for (var i=65; i<=90; ++i) { fan.sys.Uri.charMap[i] = fan.sys.Uri.unreserved; fan.sys.Uri.nameMap[i] = true; }
for (var i=48; i<=57; ++i) { fan.sys.Uri.charMap[i] = fan.sys.Uri.unreserved; fan.sys.Uri.nameMap[i] = true; }
fan.sys.Uri.charMap[45] = fan.sys.Uri.unreserved; fan.sys.Uri.nameMap[45] = true;
fan.sys.Uri.charMap[46] = fan.sys.Uri.unreserved; fan.sys.Uri.nameMap[46] = true;
fan.sys.Uri.charMap[95] = fan.sys.Uri.unreserved; fan.sys.Uri.nameMap[95] = true;
fan.sys.Uri.charMap[126] = fan.sys.Uri.unreserved; fan.sys.Uri.nameMap[126] = true;
for (var i=48; i<=57; ++i) fan.sys.Uri.charMap[i] |= fan.sys.Uri.HEX | fan.sys.Uri.DIGIT;
for (var i=97; i<=102; ++i) fan.sys.Uri.charMap[i] |= fan.sys.Uri.HEX;
for (var i=65; i<=70; ++i) fan.sys.Uri.charMap[i] |= fan.sys.Uri.HEX;
fan.sys.Uri.charMap[33]  = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[36]  = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[38]  = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[39] = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[40]  = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[41]  = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[42]  = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[43]  = fan.sys.Uri.SCHEME | fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[44]  = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[59]  = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[61]  = fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[58] = fan.sys.Uri.PATH | fan.sys.Uri.USER | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[47] = fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[63] = fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.charMap[35] = 0;
fan.sys.Uri.charMap[91] = 0;
fan.sys.Uri.charMap[93] = 0;
fan.sys.Uri.charMap[64] = fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.delimEscMap[58]  = fan.sys.Uri.PATH;
fan.sys.Uri.delimEscMap[47]  = fan.sys.Uri.PATH;
fan.sys.Uri.delimEscMap[63]  = fan.sys.Uri.PATH;
fan.sys.Uri.delimEscMap[35]  = fan.sys.Uri.PATH | fan.sys.Uri.QUERY;
fan.sys.Uri.delimEscMap[38]  = fan.sys.Uri.QUERY;
fan.sys.Uri.delimEscMap[59]  = fan.sys.Uri.QUERY;
fan.sys.Uri.delimEscMap[61]  = fan.sys.Uri.QUERY;
fan.sys.Uri.delimEscMap[92] = fan.sys.Uri.SCHEME | fan.sys.Uri.USER | fan.sys.Uri.HOST | fan.sys.Uri.PATH | fan.sys.Uri.QUERY | fan.sys.Uri.FRAG;
fan.sys.Uri.emptyPath = function()
{
var p = fan.sys.Uri.$emptyPath;
if (p == null)
{
p = fan.sys.Uri.$emptyPath =
fan.sys.List.make(fan.sys.Str.$type, []).toImmutable();
}
return p;
}
fan.sys.Uri.$emptyPath = null;
fan.sys.Uri.emptyQuery = function()
{
var q = fan.sys.Uri.$emptyQuery;
if (q == null)
{
q = fan.sys.Uri.$emptyQuery =
fan.sys.Map.make(fan.sys.Str.$type, fan.sys.Str.$type).toImmutable();
}
return q;
}
fan.sys.Uri.$emptyQuery = null;
fan.sys.Version = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Version.fromStr = function(s, checked)
{
if (checked === undefined) checked = true;
var segments = fan.sys.List.make(fan.sys.Int.$type);
var seg = -1;
var valid = true;
var len = s.length;
for (var i=0; i<len; ++i)
{
var c = s.charCodeAt(i);
if (c == 46)
{
if (seg < 0 || i+1>=len) { valid = false; break; }
segments.add(seg);
seg = -1;
}
else
{
if (48 <= c && c <= 57)
{
if (seg < 0) seg = c-48;
else seg = seg*10 + (c-48);
}
else
{
valid = false; break;
}
}
}
if (seg >= 0) segments.add(seg);
if (!valid || segments.size() == 0)
{
if (checked)
throw fan.sys.ParseErr.make("Version", s);
else
return null;
}
return new fan.sys.Version(segments);
}
fan.sys.Version.make = function(segments)
{
var valid = segments.size() > 0;
for (var i=0; i<segments.size(); ++i)
if (segments.get(i) < 0) valid = false;
if (!valid) throw fan.sys.ArgErr.make("Invalid Version: '" + segments + "'");
return new fan.sys.Version(segments);
}
fan.sys.Version.prototype.$ctor = function(segments)
{
this.m_segments = segments.ro();
}
fan.sys.Version.prototype.equals = function(obj)
{
if (obj instanceof fan.sys.Version)
return this.toStr() == obj.toStr();
else
return false;
}
fan.sys.Version.prototype.compare = function(obj)
{
var that = obj;
var a = this.m_segments;
var b = that.m_segments;
for (var i=0; i<a.size() && i<b.size(); ++i)
{
var ai = a.get(i);
var bi = b.get(i);
if (ai < bi) return -1;
if (ai > bi) return +1;
}
if (a.size() < b.size()) return -1;
if (a.size() > b.size()) return +1;
return 0;
}
fan.sys.Version.prototype.hash = function() { return fan.sys.Str.hash(this.toStr()); }
fan.sys.Version.prototype.$typeof = function() { return fan.sys.Version.$type; }
fan.sys.Version.prototype.toStr = function()
{
if (this.m_str == null)
{
var s = "";
for (var i=0; i<this.m_segments.size(); ++i)
{
if (i > 0) s += '.';
s += this.m_segments.get(i);
}
this.m_s = s;
}
return this.m_s;
}
fan.sys.Version.prototype.segments = function() { return this.m_segments; }
fan.sys.Version.prototype.major = function() { return this.m_segments.get(0); }
fan.sys.Version.prototype.minor = function()
{
if (this.m_segments.size() < 2) return null;
return this.m_segments.get(1);
}
fan.sys.Version.prototype.build = function()
{
if (this.m_segments.size() < 3) return null;
return this.m_segments.get(2);
}
fan.sys.Version.prototype.patch = function()
{
if (this.m_segments.size() < 4) return null;
return this.m_segments.get(3);
}
fan.sys.Void = function() {};
fan.sys.Void.prototype.$typeof = function() { return fan.sys.Void.$type; }
fan.sys.Weekday = fan.sys.Obj.$extend(fan.sys.Enum);
fan.sys.Weekday.prototype.$ctor = function(ordinal, name)
{
fan.sys.Enum.make$(this, ordinal, name);
}
fan.sys.Weekday.fromStr = function(name, checked)
{
if (checked === undefined) checked = true;
return fan.sys.Enum.doFromStr(fan.sys.Weekday.$type, name, checked);
}
fan.sys.Weekday.prototype.increment = function()
{
var arr = fan.sys.Weekday.m_vals;
return arr.get((this.m_ordinal+1) % arr.size());
}
fan.sys.Weekday.prototype.decrement = function()
{
var arr = fan.sys.Weekday.m_vals;
return this.m_ordinal == 0 ? arr.get(arr.size()-1) : arr.get(this.m_ordinal-1);
}
fan.sys.Weekday.prototype.$typeof = function()
{
return fan.sys.Weekday.$type;
}
fan.sys.Weekday.prototype.localeAbbr = function() { return this.abbr(null); }
fan.sys.Weekday.prototype.abbr = function(locale)
{
switch (this.m_ordinal)
{
case 0:  return "Sun";
case 1:  return "Mon";
case 2:  return "Tue";
case 3:  return "Wed";
case 4:  return "Thu";
case 5:  return "Fri";
case 6:  return "Sat";
}
}
fan.sys.Weekday.prototype.localeFull = function() { return this.full(null); }
fan.sys.Weekday.prototype.full = function(locale)
{
switch (this.m_ordinal)
{
case 0:  return "Sundary";
case 1:  return "Monday";
case 2:  return "Tuesday";
case 3:  return "Wednesday";
case 4:  return "Thursday";
case 5:  return "Friday";
case 6:  return "Saturday";
}
}
fan.sys.Weekday.localeStartOfWeek = function()
{
return fan.sys.Weekday.m_sun;
}
fan.sys.Sys = fan.sys.Obj.$extend(fan.sys.Obj);
fan.sys.Sys.prototype.$ctor = function() {}
fan.sys.Sys.genericParamTypes = [];
fan.sys.Sys.initGenericParamTypes = function()
{
fan.sys.Sys.AType = fan.sys.Sys.initGeneric('A');
fan.sys.Sys.BType = fan.sys.Sys.initGeneric('B');
fan.sys.Sys.CType = fan.sys.Sys.initGeneric('C');
fan.sys.Sys.DType = fan.sys.Sys.initGeneric('D');
fan.sys.Sys.EType = fan.sys.Sys.initGeneric('E');
fan.sys.Sys.FType = fan.sys.Sys.initGeneric('F');
fan.sys.Sys.GType = fan.sys.Sys.initGeneric('G');
fan.sys.Sys.HType = fan.sys.Sys.initGeneric('H');
fan.sys.Sys.KType = fan.sys.Sys.initGeneric('K');
fan.sys.Sys.LType = fan.sys.Sys.initGeneric('L');
fan.sys.Sys.MType = fan.sys.Sys.initGeneric('M');
fan.sys.Sys.RType = fan.sys.Sys.initGeneric('R');
fan.sys.Sys.VType = fan.sys.Sys.initGeneric('V');
}
fan.sys.Sys.initGeneric = function(ch)
{
var name = ch;
try
{
var pod = fan.sys.Pod.find("sys");
return fan.sys.Sys.genericParamTypes[ch] = pod.$at(name, "sys::Obj", [], 0);
}
catch (err)
{
throw initFail("generic " + name, e);
}
}
fan.sys.Sys.genericParamType = function(name)
{
if (name.length == 1)
return fan.sys.Sys.genericParamTypes[name];
else
return null;
}
fan.sys.Sys.initWarn = function(field, e)
{
fan.sys.ObjUtil.echo("WARN: cannot init Sys." + field);
fan.sys.ObjUtil.echo(e);
}
fan.sys.Sys.initFail = function(field, e)
{
fan.sys.ObjUtil.echo("ERROR: cannot init Sys." + field);
fan.sys.ObjUtil.echo(e);
throw new Error("Cannot boot fan: " + e);
}
function fanx_ObjDecoder(input, options)
{
this.tokenizer = new fanx_Tokenizer(input);
this.options = options;
this.curt = null;
this.usings = [];
this.numUsings = 0;
this.consume();
fanx_ObjDecoder.defaultMapType =
new fan.sys.MapType(fan.sys.Obj.$type, fan.sys.Obj.$type);
}
fanx_ObjDecoder.prototype.readObj = function()
{
this.readHeader();
return this.$readObj(null, null, true);
}
fanx_ObjDecoder.prototype.readHeader = function()
{
while (this.curt == fanx_Token.USING)
this.usings[this.numUsings++] = this.readUsing();
}
fanx_ObjDecoder.prototype.readUsing = function()
{
var line = this.tokenizer.line;
this.consume();
var podName = this.consumeId("Expecting pod name");
var pod = fan.sys.Pod.find(podName, false);
if (pod == null) throw this.err("Unknown pod: " + podName);
if (this.curt != fanx_Token.DOUBLE_COLON)
{
this.endOfStmt(line);
return new fanx_UsingPod(pod);
}
this.consume();
var typeName = this.consumeId("Expecting type name");
var t = pod.findType(typeName, false);
if (t == null) throw this.err("Unknown type: " + podName + "::" + typeName);
if (this.curt == fanx_Token.AS)
{
this.consume();
typeName = consumeId("Expecting using as name");
}
this.endOfStmt(line);
return new UsingType(t, typeName);
}
fanx_ObjDecoder.prototype.$readObj = function(curField, peekType, root)
{
if (fanx_Token.isLiteral(this.curt))
{
var val = this.tokenizer.val;
this.consume();
return val;
}
if (this.curt == fanx_Token.LBRACKET)
return this.readCollection(curField, peekType);
var line = this.tokenizer.line;
var t = (peekType != null) ? peekType : this.readType();
if (this.curt == fanx_Token.LPAREN)
return this.readSimple(line, t);
else if (this.curt == fanx_Token.POUND)
return this.readTypeLiteral(line, t);
else if (this.curt == fanx_Token.LBRACKET)
return this.readCollection(curField, t);
else
return this.readComplex(line, t, root);
}
fanx_ObjDecoder.prototype.readTypeLiteral = function(line, t)
{
this.consume(fanx_Token.POUND, "Expected '#' for type literal");
return t;
}
fanx_ObjDecoder.prototype.readSimple = function(line, t)
{
this.consume(fanx_Token.LPAREN, "Expected ( in simple");
var str = this.consumeStr("Expected string literal for simple");
this.consume(fanx_Token.RPAREN, "Expected ) in simple");
var script = "fan." + t.pod().name() + "." + t.name() + ".fromStr('" + str + "')";
return eval(script);
}
fanx_ObjDecoder.prototype.readComplex = function(line, t, root)
{
var obj = null;
try
{
var args = null;
if (root && this.options != null)
args = this.options.get("makeArgs");
obj = t.make(args);
}
catch (e)
{
throw fan.sys.IOErr.make("Cannot make " + t + ": " + e + " [Line " + line + "]", e);
}
if (this.curt != fanx_Token.LBRACE) return obj;
this.consume();
while (this.curt != fanx_Token.RBRACE)
{
line = this.tokenizer.line;
var readField = false;
if (this.curt == fanx_Token.ID)
{
var name = this.consumeId("Expected field name");
if (this.curt == fanx_Token.EQ)
{
this.consume();
this.readComplexField(t, obj, line, name);
readField = true;
}
else
{
this.tokenizer.undo(this.tokenizer.type, this.tokenizer.val, this.tokenizer.line);
this.curt = this.tokenizer.reset(fanx_Token.ID, name, line);
}
}
if (!readField) this.readComplexAdd(t, obj, line);
if (this.curt == fanx_Token.COMMA) this.consume();
else this.endOfStmt(line);
}
this.consume(fanx_Token.RBRACE, "Expected '}'");
return obj;
}
fanx_ObjDecoder.prototype.readComplexAdd = function(t, obj, line)
{
var val = this.$readObj(null, null, false);
var m = t.method("add", false);
if (m == null) throw this.err("Method not found: " + t.qname() + ".add", line);
try
{
m.invoke(obj, [val]);
}
catch (err)
{
throw fan.sys.IOErr.make("Cannot call " + t.qname() + ".add: " + err + " [Line " + line + "]", err);
}
}
fanx_ObjDecoder.prototype.readComplexField = function(t, obj, line, name)
{
var field = t.field(name, false);
if (field == null) throw this.err("Field not found: " + t.qname() + "." + name, line);
var val = this.$readObj(field, null, false);
try
{
if (field.isConst())
field.set(obj, OpUtil.toImmutable(val), false);
else
field.set(obj, val);
}
catch (err)
{
throw fan.sys.IOErr.make("Cannot set field " + t.qname() + "." + name + ": " + err + " [Line " + line + "]", err);
}
}
fanx_ObjDecoder.prototype.readCollection = function(curField, t)
{
this.consume(fanx_Token.LBRACKET, "Expecting '['");
var peekType = null;
if (this.curt == fanx_Token.ID && t == null)
{
peekType = this.readType();
if (this.curt == fanx_Token.RBRACKET && peekType instanceof fan.sys.MapType)
{
t = peekType; peekType = null;
this.consume();
while (this.curt == fanx_Token.LRBRACKET) { this.consume(); t = t.toListOf(); }
this.consume(fanx_Token.LBRACKET, "Expecting '['");
}
}
if (this.curt == fanx_Token.COMMA && peekType == null)
{
this.consume();
this.consume(fanx_Token.RBRACKET, "Expecting ']'");
return fan.sys.List.make(this.toListOfType(t, curField, false), []);
}
if (this.curt == fanx_Token.COLON && peekType == null)
{
this.consume();
this.consume(fanx_Token.RBRACKET, "Expecting ']'");
return fan.sys.Map.make(this.toMapType(t, curField, false));
}
var first = this.$readObj(null, peekType, false);
if (this.curt == fanx_Token.COLON)
return this.readMap(this.toMapType(t, curField, true), first);
else
return this.readList(this.toListOfType(t, curField, true), first);
}
fanx_ObjDecoder.prototype.readList = function(of, first)
{
var acc = [];
acc.push(first)
while (this.curt != fanx_Token.RBRACKET)
{
this.consume(fanx_Token.COMMA, "Expected ','");
if (this.curt == fanx_Token.RBRACKET) break;
acc.push(this.$readObj(null, null, false));
}
this.consume(fanx_Token.RBRACKET, "Expected ']'");
if (of == null) of = fan.sys.Type.common(acc);
return fan.sys.List.make(of, acc);
}
fanx_ObjDecoder.prototype.toListOfType = function(t, curField, infer)
{
if (t != null) return t;
if (curField != null)
{
var ft = curField.type().toNonNullable();
if (ft instanceof fan.sys.ListType) return ft.v;
}
if (infer) return null;
return fan.sys.Obj.$type.toNullable();
}
fanx_ObjDecoder.prototype.toMapType = function(t, curField, infer)
{
if (t instanceof fan.sys.MapType)
return t;
if (curField != null)
{
var ft = curField.type().toNonNullable();
if (ft instanceof fan.sys.MapType) return ft;
}
if (infer) return null;
return fanx_ObjDecoder.defaultMapType;
}
fanx_ObjDecoder.prototype.readType = function(lbracket)
{
if (lbracket === undefined) lbracket = false;
var t = this.readSimpleType();
if (this.curt == fanx_Token.QUESTION)
{
this.consume();
t = t.toNullable();
}
if (this.curt == fanx_Token.COLON)
{
this.consume();
t = new fan.sys.MapType(t, this.readType());
}
while (this.curt == fanx_Token.LRBRACKET)
{
this.consume();
t = t.toListOf();
}
if (this.curt == fanx_Token.QUESTION)
{
this.consume();
t = t.toNullable();
}
return t;
}
fanx_ObjDecoder.prototype.readSimpleType = function()
{
var line = this.tokenizer.line;
var n = this.consumeId("Expected type signature");
if (this.curt != fanx_Token.DOUBLE_COLON)
{
for (var i=0; i<this.numUsings; ++i)
{
var t = this.usings[i].resolve(n);
if (t != null) return t;
}
throw this.err("Unresolved type name: " + n);
}
this.consume(fanx_Token.DOUBLE_COLON, "Expected ::");
var typeName = this.consumeId("Expected type name");
var pod = fan.sys.Pod.find(n, false);
if (pod == null) throw this.err("Pod not found: " + n, line);
var type = pod.findType(typeName, false);
if (type == null) throw fanx_ObjDecoder.err("Type not found: " + n + "::" + typeName, line);
return type;
}
fanx_ObjDecoder.prototype.err = function(msg)
{
return fanx_ObjDecoder.err(msg, this.tokenizer.line);
}
fanx_ObjDecoder.prototype.consumeId = function(expected)
{
this.verify(fanx_Token.ID, expected);
var id = this.tokenizer.val;
this.consume();
return id;
}
fanx_ObjDecoder.prototype.consumeStr = function(expected)
{
this.verify(fanx_Token.STR_LITERAL, expected);
var id = this.tokenizer.val;
this.consume();
return id;
}
fanx_ObjDecoder.prototype.consume = function(type, expected)
{
if (type != undefined)
this.verify(type, expected);
this.curt = this.tokenizer.next();
}
fanx_ObjDecoder.prototype.verify = function(type, expected)
{
if (this.curt != type)
throw this.err(expected + ", not '" + fanx_Token.toString(this.curt) + "'");
}
fanx_ObjDecoder.prototype.endOfStmt = function(lastLine)
{
if (this.curt == fanx_Token.SEMICOLON) { this.consume(); return; }
if (lastLine < this.tokenizer.line) return;
if (this.curt == fanx_Token.RBRACE) return;
throw this.err("Expected end of statement: semicolon, newline, or end of block; not '" + fanx_Token.toString(this.curt) + "'");
}
fanx_ObjDecoder.decode = function(s)
{
return new fanx_ObjDecoder(fan.sys.InStream.makeForStr(s), null).readObj();
}
fanx_ObjDecoder.err = function(msg, line)
{
return fan.sys.IOErr.make(msg + " [Line " + line + "]");
}
fanx_ObjDecoder.defaultMapType = null;
function fanx_UsingPod(p) { this.pod = p; }
fanx_UsingPod.prototype.resolve = function(n)
{
return this.pod.findType(n, false);
}
function fanx_UsingType(t,n) { this.type = t; this.name = n; }
fanx_UsingType.prototype.resolve = function(n)
{
return this.name.equals(n) ? this.type : null;
}
function fanx_ObjEncoder(out, options)
{
this.out    = out;
this.level  = 0;
this.indent = 0;
this.skipDefaults = false;
this.skipErrors   = false;
this.curFieldType = null;
if (options != null) this.initOptions(options);
}
fanx_ObjEncoder.encode = function(obj)
{
var buf = fan.sys.StrBuf.make();
var out = new fan.sys.StrBufOutStream(buf);
new fanx_ObjEncoder(out, null).writeObj(obj);
return buf.toStr();
}
fanx_ObjEncoder.prototype.writeObj = function(obj)
{
if (obj == null)
{
this.w("null");
return;
}
var t = typeof obj;
if (t === "boolean") { this.w(obj.toString()); return; }
if (t === "number")  { this.w(obj.toString()); return; }
if (t === "string")  { this.wStrLiteral(obj.toString(), '"'); return; }
var f = obj.$fanType;
if (f === fan.sys.Float.$type)   { fan.sys.Float.encode(obj, this); return; }
if (obj.$literalEncode)
{
obj.$literalEncode(this);
return;
}
fan.sys.ObjUtil.echo(">>>> ObjEncoder.writeObj Serializable not implemented!");
var type = fan.sys.ObjUtil.$typeof(obj);
var ser = null;
if (ser != null)
{
}
else
{
if (this.skipErrors)
this.w("null ");
else
throw fan.sys.IOErr.make("Not serializable: " + type);
}
}
fanx_ObjEncoder.prototype.writeSimple = function(type, obj)
{
var str = fan.sys.ObjUtil.toStr(obj);
this.wType(type).w('(').wStrLiteral(str, '"').w(')');
}
fanx_ObjEncoder.prototype.wType = function(t)
{
return this.w(t.signature());
}
fanx_ObjEncoder.prototype.wStrLiteral = function(s, quote)
{
var len = s.length;
this.w(quote);
for (var i=0; i<len; ++i)
{
var c = s.charAt(i);
switch (c)
{
case '\n': this.w('\\').w('n'); break;
case '\r': this.w('\\').w('r'); break;
case '\f': this.w('\\').w('f'); break;
case '\t': this.w('\\').w('t'); break;
case '\\': this.w('\\').w('\\'); break;
case '"':  if (quote == '"') this.w('\\').w('"'); else this.w(c); break;
case '`':  if (quote == '`') this.w('\\').w('`'); else this.w(c); break;
case '$':  this.w('\\').w('$'); break;
default:   this.w(c);
}
}
return this.w(quote);
}
fanx_ObjEncoder.prototype.wIndent = function()
{
var num = level*indent;
for (var i=0; i<num; ++i) this.w(' ');
return this;
}
fanx_ObjEncoder.prototype.w = function(s)
{
var len = s.length;
for (var i=0; i<len; ++i)
this.out.writeChar(s.charCodeAt(i));
return this;
}
fanx_ObjEncoder.prototype.initOptions = function(options)
{
this.indent = fanx_ObjEncoder.option(options, "indent", this.indent);
this.skipDefaults = fanx_ObjEncoder.option(options, "skipDefaults", this.skipDefaults);
this.skipErrors = fanx_ObjEncoder.option(options, "skipErrors", this.skipErrors);
}
fanx_ObjEncoder.option = function(options, name, def)
{
var val = options.get(name);
if (val == null) return def;
return val;
}
function fanx_Token() {}
fanx_Token.EOF              = -1;
fanx_Token.ID               = 0;
fanx_Token.BOOL_LITERAL     = 1;
fanx_Token.STR_LITERAL      = 2;
fanx_Token.INT_LITERAL      = 3;
fanx_Token.FLOAT_LITERAL    = 4;
fanx_Token.DECIMAL_LITERAL  = 5;
fanx_Token.DURATION_LITERAL = 6;
fanx_Token.URI_LITERAL      = 7;
fanx_Token.NULL_LITERAL     = 8;
fanx_Token.DOT              = 9;
fanx_Token.SEMICOLON        = 10;
fanx_Token.COMMA            = 11;
fanx_Token.COLON            = 12;
fanx_Token.DOUBLE_COLON     = 13;
fanx_Token.LBRACE           = 14;
fanx_Token.RBRACE           = 15;
fanx_Token.LPAREN           = 16;
fanx_Token.RPAREN           = 17;
fanx_Token.LBRACKET         = 18;
fanx_Token.RBRACKET         = 19;
fanx_Token.LRBRACKET        = 20;
fanx_Token.EQ               = 21;
fanx_Token.POUND            = 22;
fanx_Token.QUESTION         = 23;
fanx_Token.AS               = 24;
fanx_Token.USING            = 25;
fanx_Token.isLiteral = function(type)
{
return fanx_Token.BOOL_LITERAL <= type && type <= fanx_Token.NULL_LITERAL;
}
fanx_Token.toString = function(type)
{
switch (type)
{
case fanx_Token.EOF:              return "end of file";
case fanx_Token.ID:               return "identifier";
case fanx_Token.BOOL_LITERAL:     return "Bool literal";
case fanx_Token.STR_LITERAL:      return "String literal";
case fanx_Token.INT_LITERAL:      return "Int literal";
case fanx_Token.FLOAT_LITERAL:    return "Float literal";
case fanx_Token.DECIMAL_LITERAL:  return "Decimal literal";
case fanx_Token.DURATION_LITERAL: return "Duration literal";
case fanx_Token.URI_LITERAL:      return "Uri literal";
case fanx_Token.NULL_LITERAL:     return "null";
case fanx_Token.DOT:              return ".";
case fanx_Token.SEMICOLON:        return ";";
case fanx_Token.COMMA:            return ",";
case fanx_Token.COLON:            return ":";
case fanx_Token.DOUBLE_COLON:     return "::";
case fanx_Token.LBRACE:           return "{";
case fanx_Token.RBRACE:           return "}";
case fanx_Token.LPAREN:           return "(";
case fanx_Token.RPAREN:           return ")";
case fanx_Token.LBRACKET:         return "[";
case fanx_Token.RBRACKET:         return "]";
case fanx_Token.LRBRACKET:        return "[]";
case fanx_Token.EQ:               return "=";
case fanx_Token.POUND:            return "#";
case fanx_Token.QUESTION:         return "?";
case fanx_Token.AS:               return "as";
case fanx_Token.USING:            return "using";
default:                          return "Token[" + type + "]";
}
}
function fanx_Tokenizer(input)
{
this.input = null;
this.type  = null;
this.val   = null;
this.line  = 1;
this.$undo = null;
this.cur   = 0;
this.curt  = 0;
this.peek  = 0;
this.peekt = 0;
this.input = input;
this.consume();
this.consume();
}
fanx_Tokenizer.prototype.next = function()
{
if (this.$undo != null) { this.$undo.reset(this); this.$undo = null; return this.type; }
this.val = null;
return this.type = this.doNext();
}
fanx_Tokenizer.prototype.doNext = function()
{
while (true)
{
while (this.curt == fanx_Tokenizer.SPACE) this.consume();
if (this.cur < 0) return fanx_Token.EOF;
if (this.curt == fanx_Tokenizer.ALPHA) return this.id();
if (this.curt == fanx_Tokenizer.DIGIT) return this.number(false);
switch (this.cur)
{
case  43:  this.consume(); return this.number(false);
case  45:  this.consume(); return this.number(true);
case  34:  return this.str();
case  39:  return this.ch();
case  96:  return this.uri();
case  40:  this.consume(); return fanx_Token.LPAREN;
case  41:  this.consume(); return fanx_Token.RPAREN;
case  44:  this.consume(); return fanx_Token.COMMA;
case  59:  this.consume(); return fanx_Token.SEMICOLON;
case  61:  this.consume(); return fanx_Token.EQ;
case  123: this.consume(); return fanx_Token.LBRACE;
case  125: this.consume(); return fanx_Token.RBRACE;
case  35:  this.consume(); return fanx_Token.POUND;
case  63:  this.consume(); return fanx_Token.QUESTION;
case  46:
if (this.peekt == fanx_Tokenizer.DIGIT) return this.number(false);
this.consume();
return fanx_Token.DOT;
case  91:
this.consume();
if (this.cur == 93 ) { this.consume(); return fanx_Token.LRBRACKET; }
return fanx_Token.LBRACKET;
case  93:
this.consume();
return fanx_Token.RBRACKET;
case  58:
this.consume();
if (this.cur == 58 ) { this.consume(); return fanx_Token.DOUBLE_COLON; }
return fanx_Token.COLON;
case  42:
if (this.peek == 42 ) { this.skipCommentSL(); continue; }
break;
case  47:
if (this.peek == 47 ) { this.skipCommentSL(); continue; }
if (this.peek == 42 ) { this.skipCommentML(); continue; }
break;
}
throw this.err("Unexpected symbol: " + this.cur + " (0x" + this.cur.toString(16) + ")");
}
}
fanx_Tokenizer.prototype.id = function()
{
var val = "";
var first = this.cur;
while ((this.curt == fanx_Tokenizer.ALPHA || this.curt == fanx_Tokenizer.DIGIT) && this.cur > 0)
{
val += String.fromCharCode(this.cur);
this.consume();
}
switch (first)
{
case  97:
if (val == "as") { return fanx_Token.AS; }
break;
case  102:
if (val == "false") { this.val = false; return fanx_Token.BOOL_LITERAL; }
break;
case  110:
if (val == "null") { this.val = null; return fanx_Token.NULL_LITERAL; }
break;
case  116:
if (val == "true") { this.val = true; return fanx_Token.BOOL_LITERAL; }
break;
case  117:
if (val == "using") { return fanx_Token.USING; }
break;
}
this.val = val;
return fanx_Token.ID;
}
fanx_Tokenizer.prototype.number = function(neg)
{
if (this.cur == 48 && this.peek == 120/*'x'*/)
return this.hex();
var s = null;
var whole = 0;
var wholeCount = 0;
while (this.curt == fanx_Tokenizer.DIGIT)
{
if (s != null)
{
s += String.fromCharCode(this.cur);
}
else
{
whole = whole*10 + (this.cur - 48);
wholeCount++;
if (wholeCount >= 18) { s = (neg) ? "-" : ""; s += whole; }
}
this.consume();
if (this.cur == 95) this.consume();
}
var floating = false;
if (this.cur == 46 && this.peekt == fanx_Tokenizer.DIGIT)
{
floating = true;
if (s == null) { s = (neg) ? "-" : ""; s += whole; }
s += '.';
this.consume();
while (this.curt == fanx_Tokenizer.DIGIT)
{
s += String.fromCharCode(this.cur);
this.consume();
if (this.cur == 95) this.consume();
}
}
if (this.cur == 101 || this.cur == 69/*'E'*/)
{
floating = true;
if (s == null) { s = (neg) ? "-" : ""; s += whole; }
s += 'e';
this.consume();
if (this.cur == 45 || this.cur == 43/*'+'*/) { s += String.fromCharCode(this.cur); this.consume(); }
if (this.curt != fanx_Tokenizer.DIGIT) throw this.err("Expected exponent digits");
while (this.curt == fanx_Tokenizer.DIGIT)
{
s += String.fromCharCode(this.cur);
this.consume();
if (this.cur == 95) this.consume();
}
}
var floatSuffix  = false;
var decimalSuffix = false;
var dur = -1;
if (100 <= this.cur && this.cur <= 115/*'s'*/)
{
if (this.cur == 110 && this.peek == 115/*'s'*/) { this.consume(); this.consume(); dur = 1; }
if (this.cur == 109 && this.peek == 115/*'s'*/) { this.consume(); this.consume(); dur = 1000000; }
if (this.cur == 115 && this.peek == 101/*'e'*/) { this.consume(); this.consume(); if (this.cur != 99/*'c'*/) throw this.err("Expected 'sec' in Duration literal"); this.consume(); dur = 1000000000; }
if (this.cur == 109 && this.peek == 105/*'i'*/) { this.consume(); this.consume(); if (this.cur != 110/*'n'*/) throw this.err("Expected 'min' in Duration literal"); this.consume(); dur = 60000000000; }
if (this.cur == 104 && this.peek == 114/*'r'*/) { this.consume(); this.consume(); dur = 3600000000000; }
if (this.cur == 100 && this.peek == 97/*'a'*/)  { this.consume(); this.consume(); if (this.cur != 121/*'y'*/) throw this.err("Expected 'day' in Duration literal"); this.consume(); dur = 86400000000000; }
}
if (this.cur == 102 || this.cur == 70/*'F'*/)
{
this.consume();
floatSuffix = true;
}
else if (this.cur == 100 || this.cur == 68/*'D'*/)
{
this.consume();
decimalSuffix = true;
}
if (neg) whole = -whole;
try
{
if (floatSuffix)
{
if (s == null)
this.val = fan.sys.Float.make(whole);
else
this.val = fan.sys.Float.fromStr(s);
return fanx_Token.FLOAT_LITERAL;
}
if (decimalSuffix || floating)
{
var num = (s == null) ? whole : fan.sys.Float.fromStr(s);
if (dur > 0)
{
this.val = fan.sys.Duration.make(num * dur);
return fanx_Token.DURATION_LITERAL;
}
else
{
this.val = fan.sys.Decimal.make(num);
return fanx_Token.DECIMAL_LITERAL;
}
}
var num = (s == null) ? whole : Math.floor(fan.sys.Float.fromStr(s, true));
if (dur > 0)
{
this.val = fan.sys.Duration.make(num*dur);
return fanx_Token.DURATION_LITERAL;
}
else
{
this.val = num;
return fanx_Token.INT_LITERAL;
}
}
catch (e)
{
throw this.err("Invalid numeric literal: " + s);
}
}
fanx_Tokenizer.prototype.hex = function()
{
this.consume();
this.consume();
var type = fanx_Token.INT_LITERAL;
var val = this.$hex(this.cur);
if (val < 0) throw this.err("Expecting hex number");
var str = String.fromCharCode(this.cur);
this.consume();
var nibCount = 1;
while (true)
{
var nib = this.$hex(this.cur);
if (nib < 0)
{
if (this.cur == 95) { this.consume(); continue; }
break;
}
str += String.fromCharCode(this.cur);
nibCount++;
if (nibCount > 16) throw this.err("Hex literal too big");
this.consume();
}
this.val = fan.sys.Int.fromStr(str, 16);
return type;
}
fanx_Tokenizer.prototype.$hex = function(c)
{
if (48 <= c && c <= 57) return c - 48;
if (97 <= c && c <= 102) return c - 97 + 10;
if (65 <= c && c <= 70) return c - 65 + 10;
return -1;
}
fanx_Tokenizer.prototype.str = function()
{
this.consume();
var s = "";
var loop = true;
while (loop)
{
switch (this.cur)
{
case 34:   this.consume(); loop = false; break;
case -1:          throw this.err("Unexpected end of string");
case 36:   throw this.err("Interpolated strings unsupported");
case 92:  s += this.escape(); break;
case 13:  s += '\n'; this.consume(); break;
default:          s += String.fromCharCode(this.cur); this.consume(); break;
}
}
this.val = s;
return fanx_Token.STR_LITERAL;
}
fanx_Tokenizer.prototype.ch = function()
{
this.consume();
var c;
if (this.cur == 92)
{
c = this.escape();
}
else
{
c = this.cur;
this.consume();
}
if (this.cur != 39) throw this.err("Expecting ' close of char literal");
this.consume();
this.val = c;
return fanx_Token.INT_LITERAL;
}
fanx_Tokenizer.prototype.escape = function()
{
if (this.cur != 92) throw this.err("Internal error");
this.consume();
switch (this.cur)
{
case   98:   this.consume(); return '\b';
case   102:  this.consume(); return '\f';
case   110:  this.consume(); return '\n';
case   114:  this.consume(); return '\r';
case   116:  this.consume(); return '\t';
case   36:   this.consume(); return '$';
case   34:   this.consume(); return '"';
case  39:   this.consume(); return '\'';
case   96:   this.consume(); return '`';
case  92:   this.consume(); return '\\';
}
if (this.cur == 117)
{
this.consume();
var n3 = this.$hex(this.cur); this.consume();
var n2 = this.$hex(this.cur); this.consume();
var n1 = this.$hex(this.cur); this.consume();
var n0 = this.$hex(this.cur); this.consume();
if (n3 < 0 || n2 < 0 || n1 < 0 || n0 < 0) throw this.err("Invalid hex value for \\uxxxx");
return String.fromCharCode((n3 << 12) | (n2 << 8) | (n1 << 4) | n0);
}
throw this.err("Invalid escape sequence");
}
fanx_Tokenizer.prototype.uri = function()
{
this.consume();
var s = "";
while (true)
{
if (this.cur < 0) throw this.err("Unexpected end of uri");
if (this.cur == 92)
{
s += this.escape();
}
else
{
if (this.cur == 96) { this.consume(); break; }
s += String.fromCharCode(this.cur);
this.consume();
}
}
this.val = fan.sys.Uri.fromStr(s);
return fanx_Token.URI_LITERAL;
}
fanx_Tokenizer.prototype.skipCommentSL = function()
{
this.consume();
this.consume();
while (true)
{
if (this.cur == 10 || this.cur == 13/*'\r'*/) { this.consume(); break; }
if (this.cur < 0) break;
this.consume();
}
return null;
}
fanx_Tokenizer.prototype.skipCommentML = function()
{
this.consume();
this.consume();
var depth = 1;
while (true)
{
if (this.cur == 42 && this.peek == 47/*'/'*/) { this.consume(); this.consume(); depth--; if (depth <= 0) break; }
if (this.cur == 47 && this.peek == 42/*'*'*/) { this.consume(); this.consume(); depth++; continue; }
if (this.cur < 0) break;
this.consume();
}
return null;
}
fanx_Tokenizer.prototype.err = function(msg)
{
return fanx_ObjDecoder.err(msg, this.line);
}
fanx_Tokenizer.prototype.consume = function()
{
if (this.cur == 10 || this.cur == 13/*'\r'*/) this.line++;
var c = this.input.readChar();
if (c == 10 && this.peek == 13/*'\r'*/) c = this.input.readChar();
if (c == null) c = -1;
this.cur   = this.peek;
this.curt  = this.peekt;
this.peek  = c;
this.peekt = 0 < c && c < 128 ? fanx_Tokenizer.charMap[c] : fanx_Tokenizer.ALPHA;
}
fanx_Tokenizer.prototype.undo = function(type, val, line)
{
if (this.$undo != null) throw new fan.sys.Err.make("only one pushback supported");
this.$undo = new fanx_Undo(type, val, line);
}
fanx_Tokenizer.prototype.reset = function(type, val, line)
{
this.type = type;
this.val  = val;
this.line = line;
return type;
}
fanx_Tokenizer.charMap = [];
fanx_Tokenizer.SPACE = 1;
fanx_Tokenizer.ALPHA = 2;
fanx_Tokenizer.DIGIT = 3;
fanx_Tokenizer.charMap[32 ]  = fanx_Tokenizer.SPACE;
fanx_Tokenizer.charMap[10 ] = fanx_Tokenizer.SPACE;
fanx_Tokenizer.charMap[13 ] = fanx_Tokenizer.SPACE;
fanx_Tokenizer.charMap[9  ] = fanx_Tokenizer.SPACE;
for (var i=97; i<=122/*'z'*/; ++i) fanx_Tokenizer.charMap[i] = fanx_Tokenizer.ALPHA;
for (var i=65; i<=90/*'Z'*/;  ++i) fanx_Tokenizer.charMap[i] = fanx_Tokenizer.ALPHA;
fanx_Tokenizer.charMap[95 ] = fanx_Tokenizer.ALPHA;
for (var i=48; i<=57/*'9'*/; ++i) fanx_Tokenizer.charMap[i] = fanx_Tokenizer.DIGIT;
function fanx_Undo(t, v, l) { this.type = t; this.val = v; this.line = l; }
fanx_Undo.prototype.reset = function(t) { t.reset(this.type, this.val, this.line); }
function fanx_TypeParser(sig, checked)
{
this.sig     = sig;
this.len     = sig.length;
this.pos     = 0;
this.cur     = sig.charAt(this.pos);
this.peek    = sig.charAt(this.pos+1);
this.checked = checked;
}
fanx_TypeParser.prototype.loadTop = function()
{
var type = this.load();
if (this.cur != null) throw this.err();
return type;
}
fanx_TypeParser.prototype.load = function()
{
var type;
if (this.cur == '|')
type = this.loadFunc();
else if (this.cur == '[' && this.sig.indexOf("[java]") != -1)
throw fan.sys.ArgErr.make("Java types not allowed '" + this.sig + "'");
else if (this.cur == '[')
type = this.loadMap();
else
type = this.loadBasic();
if (this.cur == '?')
{
this.consume('?');
type = type.toNullable();
}
while (this.cur == '[')
{
this.consume('[');
this.consume(']');
type = type.toListOf();
}
if (this.cur == '?')
{
this.consume('?');
type = type.toNullable();
}
return type;
}
fanx_TypeParser.prototype.loadMap = function()
{
this.consume('[');
var key = this.load();
this.consume(':');
var val = this.load();
this.consume(']');
return new fan.sys.MapType(key, val);
}
fanx_TypeParser.prototype.loadFunc = function()
{
this.consume('|');
var params = [];
if (this.cur != '-')
{
while (true)
{
params.push(this.load());
if (this.cur == '-') break;
this.consume(',');
}
}
this.consume('-');
this.consume('>');
var ret = this.load();
this.consume('|');
return new fan.sys.FuncType(params, ret);
}
fanx_TypeParser.prototype.loadBasic = function()
{
var podName = this.consumeId();
this.consume(':');
this.consume(':');
var typeName = this.consumeId();
if (typeName.length == 1 && podName == "sys")
{
var type = fan.sys.Sys.genericParamType(typeName);
if (type != null) return type;
}
return fanx_TypeParser.find(podName, typeName, this.checked);
}
fanx_TypeParser.prototype.consumeId = function()
{
var start = this.pos;
while (this.isIdChar(this.cur)) this.$consume();
return this.sig.substring(start, this.pos);
}
fanx_TypeParser.prototype.isIdChar = function(ch)
{
if (ch == null) return false;
return fan.sys.Int.isAlphaNum(ch.charCodeAt(0)) || ch == '_';
}
fanx_TypeParser.prototype.consume = function(expected)
{
if (this.cur != expected) throw this.err();
this.$consume();
}
fanx_TypeParser.prototype.$consume = function()
{
this.cur = this.peek;
this.pos++;
this.peek = this.pos+1 < this.len ? this.sig.charAt(this.pos+1) : null;
}
fanx_TypeParser.prototype.err = function(sig)
{
if (sig === undefined) sig = this.sig;
return fan.sys.ArgErr.make("Invalid type signature '" + sig + "'");
}
fanx_TypeParser.load = function(sig, checked)
{
var type = fanx_TypeParser.cache[sig];
if (type != null) return type;
var len = sig.length;
var last = len > 1 ? sig.charAt(len-1) : 0;
if (last == '?')
{
type = fanx_TypeParser.load(sig.substring(0, len-1), checked).toNullable();
fanx_TypeParser.cache[sig] = type;
return type;
}
if (last != ']' && last != '|')
{
var podName;
var typeName;
try
{
var colon = sig.indexOf(":");
if (sig.charAt(colon+1) != ':') throw new Exception();
podName  = sig.substring(0, colon);
typeName = sig.substring(colon+2);
if (podName.length == 0 || typeName.length == 0) throw fan.sys.Err.make("");
}
catch (err)
{
throw fan.sys.ArgErr.make("Invalid type signature '" + sig + "', use <pod>::<type>");
}
if (podName.charAt(0) == '[')
throw fan.sys.ArgErr.make("Java types not allowed '" + sig + "'");
type = fanx_TypeParser.find(podName, typeName, checked);
fanx_TypeParser.cache[sig] = type;
return type;
}
try
{
type = new fanx_TypeParser(sig, checked).loadTop();
fanx_TypeParser.cache[sig] = type;
return type;
}
catch (err)
{
throw fan.sys.Err.make(err);
}
}
fanx_TypeParser.find = function(podName, typeName, checked)
{
var pod = fan.sys.Pod.find(podName, checked);
if (pod == null) return null;
return pod.findType(typeName, checked);
}
fanx_TypeParser.cache = [];
with (fan.sys.Pod.$add('sys'))
{
  fan.sys.Obj.$type = $at('Obj',null,[],8705);
  fan.sys.Type.$type = $at('Type','sys::Obj',[],8706);
  fan.sys.Sys.initGenericParamTypes();
  fan.sys.Err.$type = $at('Err','sys::Obj',[],8706);
  fan.sys.ArgErr.$type = $at('ArgErr','sys::Err',[],8706);
  fan.sys.Bool.$type = $at('Bool','sys::Obj',[],8738);
  fan.sys.Buf.$type = $at('Buf','sys::Obj',[],8704);
  fan.sys.MemBuf.$type = $at('MemBuf','sys::Buf',[],640);
  fan.sys.CancelledErr.$type = $at('CancelledErr','sys::Err',[],8706);
  fan.sys.CastErr.$type = $at('CastErr','sys::Err',[],8706);
  fan.sys.Charset.$type = $at('Charset','sys::Obj',[],8738);
  fan.sys.ConstErr.$type = $at('ConstErr','sys::Err',[],8706);
  fan.sys.Date.$type = $at('Date','sys::Obj',[],8738);
  fan.sys.DateTime.$type = $at('DateTime','sys::Obj',[],8738);
  fan.sys.Num.$type = $at('Num','sys::Obj',[],8707);
  fan.sys.Decimal.$type = $at('Decimal','sys::Num',[],8738);
  fan.sys.Duration.$type = $at('Duration','sys::Obj',[],8738);
  fan.sys.Enum.$type = $at('Enum','sys::Obj',[],8707);
  fan.sys.Endian.$type = $at('Endian','sys::Enum',[],8746);
  fan.sys.Env.$type = $at('Env','sys::Obj',[],8707);
  fan.sys.Slot.$type = $at('Slot','sys::Obj',[],8707);
  fan.sys.Field.$type = $at('Field','sys::Slot',[],8706);
  fan.sys.FieldNotSetErr.$type = $at('FieldNotSetErr','sys::Err',[],8706);
  fan.sys.File.$type = $at('File','sys::Obj',[],8707);
  fan.sys.LocalFile.$type = $at('LocalFile','sys::File',[],642);
  fan.sys.Float.$type = $at('Float','sys::Num',[],8738);
  fan.sys.Func.$type = $at('Func','sys::Obj',[],8736);
  fan.sys.IndexErr.$type = $at('IndexErr','sys::Err',[],8706);
  fan.sys.InStream.$type = $at('InStream','sys::Obj',[],8704);
  fan.sys.SysInStream.$type = $at('SysInStream','sys::InStream',[],640);
  fan.sys.Int.$type = $at('Int','sys::Num',[],8738);
  fan.sys.InterruptedErr.$type = $at('InterruptedErr','sys::Err',[],8706);
  fan.sys.IOErr.$type = $at('IOErr','sys::Err',[],8706);
  fan.sys.List.$type = $at('List','sys::Obj',[],8736);
  fan.sys.Locale.$type = $at('Locale','sys::Obj',[],8706);
  fan.sys.Log.$type = $at('Log','sys::Obj',[],8706);
  fan.sys.LogLevel.$type = $at('LogLevel','sys::Enum',[],8746);
  fan.sys.LogRec.$type = $at('LogRec','sys::Obj',[],8706);
  fan.sys.Map.$type = $at('Map','sys::Obj',[],8736);
  fan.sys.Method.$type = $at('Method','sys::Slot',[],8706);
  fan.sys.MimeType.$type = $at('MimeType','sys::Obj',[],8738);
  fan.sys.Month.$type = $at('Month','sys::Enum',[],8746);
  fan.sys.NameErr.$type = $at('NameErr','sys::Err',[],8706);
  fan.sys.NotImmutableErr.$type = $at('NotImmutableErr','sys::Err',[],8706);
  fan.sys.NullErr.$type = $at('NullErr','sys::Err',[],8706);
  fan.sys.OutStream.$type = $at('OutStream','sys::Obj',[],8704);
  fan.sys.SysOutStream.$type = $at('SysOutStream','sys::OutStream',[],640);
  fan.sys.Param.$type = $at('Param','sys::Obj',[],8736);
  fan.sys.ParseErr.$type = $at('ParseErr','sys::Err',[],8706);
  fan.sys.Pod.$type = $at('Pod','sys::Obj',[],8738);
  fan.sys.Range.$type = $at('Range','sys::Obj',[],8738);
  fan.sys.ReadonlyErr.$type = $at('ReadonlyErr','sys::Err',[],8706);
  fan.sys.Regex.$type = $at('Regex','sys::Obj',[],8738);
  fan.sys.RegexMatcher.$type = $at('RegexMatcher','sys::Obj',[],8736);
  fan.sys.Str.$type = $at('Str','sys::Obj',[],8738);
  fan.sys.StrBuf.$type = $at('StrBuf','sys::Obj',[],8736);
  fan.sys.Test.$type = $at('Test','sys::Obj',[],8705);
  fan.sys.TestErr.$type = $at('TestErr','sys::Err',[],642);
  fan.sys.This.$type = $at('This','sys::Obj',[],8738);
  fan.sys.Time.$type = $at('Time','sys::Obj',[],8738);
  fan.sys.TimeoutErr.$type = $at('TimeoutErr','sys::Err',[],8706);
  fan.sys.TimeZone.$type = $at('TimeZone','sys::Obj',[],8706);
  fan.sys.Unit.$type = $at('Unit','sys::Obj',[],8706);
  fan.sys.UnknownFacetErr.$type = $at('UnknownFacetErr','sys::Err',[],8706);
  fan.sys.UnknownPodErr.$type = $at('UnknownPodErr','sys::Err',[],8706);
  fan.sys.UnknownServiceErr.$type = $at('UnknownServiceErr','sys::Err',[],8706);
  fan.sys.UnknownSlotErr.$type = $at('UnknownSlotErr','sys::Err',[],8706);
  fan.sys.UnknownTypeErr.$type = $at('UnknownTypeErr','sys::Err',[],8706);
  fan.sys.UnresolvedErr.$type = $at('UnresolvedErr','sys::Err',[],8706);
  fan.sys.Unsafe.$type = $at('Unsafe','sys::Obj',[],8738);
  fan.sys.UnsupportedErr.$type = $at('UnsupportedErr','sys::Err',[],8706);
  fan.sys.Uri.$type = $at('Uri','sys::Obj',[],8738);
  fan.sys.Version.$type = $at('Version','sys::Obj',[],8738);
  fan.sys.Void.$type = $at('Void','sys::Obj',[],8738);
  fan.sys.Weekday.$type = $at('Weekday','sys::Enum',[],8746);
  fan.sys.Obj.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('make',4100,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.Type.$type.$am('methods',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('facet',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Type',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('hasFacet',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Type',false)])).$am('mixins',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('isMixin',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('of',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)])).$am('isAbstract',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('qname',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isNullable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('signature',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('pod',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isFinal',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fields',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('toLocale',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('isGeneric',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isConst',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('isVal',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('slots',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isEnum',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('privateMake',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('args','sys::Obj[]?',true)])).$am('isFacet',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isClass',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('facets',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isSynthetic',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fits',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','sys::Type',false)])).$am('parameterize',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('params','[sys::Str:sys::Type]',false)])).$am('name',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('slot',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('find',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('params',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toNonNullable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isInternal',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isPublic',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('inheritance',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('emptyList',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('field',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('toNullable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('base',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('doc',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toListOf',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('method',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]));
  fan.sys.Err.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.ArgErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.Bool.$type.$af('defVal',106498,'sys::Bool').$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('xor',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Bool',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('or',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Bool',false)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toLocale',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('and',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Bool',false)])).$am('not',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toCode',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('privateMake',2052,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.Buf.$type.$af('charset',73728,'sys::Charset').$af('size',73728,'sys::Int').$af('endian',73728,'sys::Endian').$af('capacity',73728,'sys::Int').$am('readUtf',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toDigest',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('algorithm','sys::Str',false)])).$am('writeChar',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('char','sys::Int',false)])).$am('unread',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('printLine',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',true)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('close',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('pos',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isEmpty',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readAllBuf',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('more',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeProps',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('props','[sys::Str:sys::Str]',false)])).$am('readU2',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readU1',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readU4',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readBool',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readObj',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('writeF4',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false)])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('get',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('random',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('size','sys::Int',false)])).$am('writeUtf',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('dup',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('unreadChar',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('hmac',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('algorithm','sys::Str',false),new fan.sys.Param('key','sys::Buf',false)])).$am('readChars',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('readLine',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true)])).$am('writeObj',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('toBase64',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readBufFully',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf?',false),new fan.sys.Param('n','sys::Int',false)])).$am('make',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('capacity','sys::Int',true)])).$am('writeF8',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false)])).$am('readDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readBuf',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',false)])).$am('getRange',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('range','sys::Range',false)])).$am('set',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('byte','sys::Int',false)])).$am('writeChars',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('off','sys::Int',true),new fan.sys.Param('len','sys::Int',true)])).$am('readS1',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('clear',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readChar',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readS2',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readS4',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('remaining',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readAllStr',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('normalizeNewlines','sys::Bool',true)])).$am('fromHex',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('write',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('byte','sys::Int',false)])).$am('writeI2',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('read',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('peek',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('internalMake',132,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeI4',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('writeDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','sys::Decimal',false)])).$am('trim',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readStrToken',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true),new fan.sys.Param('c','|sys::Int->sys::Bool|?',true)])).$am('flip',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeI8',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('fromBase64',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('eachLine',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Str->sys::Void|',false)])).$am('peekChar',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readS8',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readF8',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeXml',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('flags','sys::Int',true)])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('readProps',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fill',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('byte','sys::Int',false),new fan.sys.Param('times','sys::Int',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readF4',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('in',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('print',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Obj?',false)])).$am('toHex',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('seek',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pos','sys::Int',false)])).$am('writeBuf',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',true)])).$am('flush',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeBool',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Bool',false)])).$am('slice',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('range','sys::Range',false)])).$am('readAllLines',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('out',8192,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.MemBuf.$type.$af('charset',73728,'sys::Charset').$af('size',73728,'sys::Int').$af('endian',73728,'sys::Endian').$af('capacity',73728,'sys::Int').$am('readUtf',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toDigest',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('algorithm','sys::Str',false)])).$am('writeChar',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('char','sys::Int',false)])).$am('unread',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('printLine',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',true)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('close',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('pos',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isEmpty',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readAllBuf',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeProps',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('props','[sys::Str:sys::Str]',false)])).$am('more',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readU2',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readU1',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readU4',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readBool',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readObj',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('writeF4',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false)])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('get',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('random',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('size','sys::Int',false)])).$am('init',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeUtf',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('dup',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('unreadChar',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('hmac',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('algorithm','sys::Str',false),new fan.sys.Param('key','sys::Buf',false)])).$am('readChars',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('readLine',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true)])).$am('writeObj',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('toBase64',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readBufFully',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf?',false),new fan.sys.Param('n','sys::Int',false)])).$am('make',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('capacity','sys::Int',true)])).$am('writeF8',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false)])).$am('readDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readBuf',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',false)])).$am('getRange',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('range','sys::Range',false)])).$am('set',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('byte','sys::Int',false)])).$am('writeChars',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('off','sys::Int',true),new fan.sys.Param('len','sys::Int',true)])).$am('readS1',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('clear',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readS2',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readChar',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('remaining',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readS4',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readAllStr',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('normalizeNewlines','sys::Bool',true)])).$am('fromHex',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('writeI2',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('write',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('byte','sys::Int',false)])).$am('read',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeI4',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('peek',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','sys::Decimal',false)])).$am('trim',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeI8',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('flip',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readStrToken',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true),new fan.sys.Param('c','|sys::Int->sys::Bool|?',true)])).$am('readS8',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('peekChar',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('eachLine',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Str->sys::Void|',false)])).$am('fromBase64',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('readF8',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeXml',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('flags','sys::Int',true)])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('fill',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('byte','sys::Int',false),new fan.sys.Param('times','sys::Int',false)])).$am('readProps',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readF4',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('in',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('print',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Obj?',false)])).$am('seek',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pos','sys::Int',false)])).$am('toHex',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeBuf',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',true)])).$am('flush',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeBool',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Bool',false)])).$am('slice',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('range','sys::Range',false)])).$am('out',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readAllLines',8192,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.CancelledErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.CastErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.Charset.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('utf8',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('defVal',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('utf16BE',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('utf16LE',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('name',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('privateMake',2052,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.ConstErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.Date.$type.$af('defVal',106498,'sys::Date').$am('toDateTime',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','sys::Time',false),new fan.sys.Param('tz','sys::TimeZone',true)])).$am('today',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tz','sys::TimeZone',true)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isToday',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('midnight',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tz','sys::TimeZone',true)])).$am('weekday',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toCode',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('fromLocale',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('pattern','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('lastOfMonth',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('year',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('firstOfMonth',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('plus',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('days','sys::Duration',false)])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('minus',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('days','sys::Duration',false)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('compare',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)])).$am('toLocale',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str?',true)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isTomorrow',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('dayOfYear',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isYesterday',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('month',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('minusDate',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('days','sys::Date',false)])).$am('toIso',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('day',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('privateMake',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('year','sys::Int',false),new fan.sys.Param('month','sys::Month',false),new fan.sys.Param('day','sys::Int',false)])).$am('fromIso',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)]));
  fan.sys.DateTime.$type.$af('defVal',106498,'sys::DateTime').$am('minusDateTime',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('time','sys::DateTime',false)])).$am('nowUnique',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isMidnight',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toHttpStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('ticks',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('dst',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('makeTicks',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ticks','sys::Int',false),new fan.sys.Param('tz','sys::TimeZone',true)])).$am('time',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('midnight',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toCode',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toJava',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromLocale',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('pattern','sys::Str',false),new fan.sys.Param('tz','sys::TimeZone',true),new fan.sys.Param('checked','sys::Bool',true)])).$am('year',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('plus',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('duration','sys::Duration',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('minus',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('duration','sys::Duration',false)])).$am('toUtc',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)])).$am('toLocale',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str?',true)])).$am('toRel',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('nowUtc',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tolerance','sys::Duration?',true)])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('floor',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('accuracy','sys::Duration',false)])).$am('now',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tolerance','sys::Duration?',true)])).$am('nowTicks',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('month',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('day',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('nanoSec',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('privateMake',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('year','sys::Int',false),new fan.sys.Param('month','sys::Month',false),new fan.sys.Param('day','sys::Int',false),new fan.sys.Param('hour','sys::Int',false),new fan.sys.Param('min','sys::Int',false),new fan.sys.Param('sec','sys::Int',true),new fan.sys.Param('ns','sys::Int',true),new fan.sys.Param('tz','sys::TimeZone',true)])).$am('fromIso',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('fromHttpStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('date',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('weekday',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('weekdayInMonth',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('year','sys::Int',false),new fan.sys.Param('mon','sys::Month',false),new fan.sys.Param('weekday','sys::Weekday',false),new fan.sys.Param('pos','sys::Int',false)])).$am('min',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('boot',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isLeapYear',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('year','sys::Int',false)])).$am('tzAbbr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hour',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('dayOfYear',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('tz',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sec',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toIso',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromJava',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('millis','sys::Int',false),new fan.sys.Param('tz','sys::TimeZone',true)])).$am('toTimeZone',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tz','sys::TimeZone',false)]));
  fan.sys.Num.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localeGrouping',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toFloat',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localeDecimal',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('localeMinus',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localeNaN',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localePercent',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localePosInf',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',132,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toInt',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localeNegInf',40962,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.Decimal.$type.$af('defVal',106498,'sys::Decimal').$am('modFloat',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)])).$am('plusInt',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('mult',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)])).$am('localeGrouping',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toFloat',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localeDecimal',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('div',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('minusInt',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('localeNaN',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('abs',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toCode',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('divFloat',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)])).$am('localePercent',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localePosInf',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('plusFloat',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)])).$am('decrement',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('min',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Decimal',false)])).$am('minusFloat',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('increment',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('plus',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('negate',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('max',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Decimal',false)])).$am('minus',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('toLocale',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str?',true)])).$am('compare',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)])).$am('divInt',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('mod',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('localeMinus',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('modInt',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('multFloat',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)])).$am('privateMake',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toInt',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localeNegInf',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('multInt',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)]));
  fan.sys.Duration.$type.$af('defVal',106498,'sys::Duration').$af('maxVal',106498,'sys::Duration').$af('minVal',106498,'sys::Duration').$am('mult',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)])).$am('ticks',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('div',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('abs',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toDay',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toCode',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toMin',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('toSec',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('plus',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Duration',false)])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('boot',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('negate',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('minus',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Duration',false)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('toLocale',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)])).$am('uptime',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('floor',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('accuracy','sys::Duration',false)])).$am('now',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('nowTicks',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toHour',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toIso',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('privateMake',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromIso',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('make',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ticks','sys::Int',false)])).$am('toMillis',8192,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.Enum.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)])).$am('doFromStr',36866,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','sys::Type',false),new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',false)])).$am('ordinal',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('name',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',4100,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ordinal','sys::Int',false),new fan.sys.Param('name','sys::Str',false)]));
  fan.sys.Endian.$type.$af('little',106506,'sys::Endian').$af('big',106506,'sys::Endian').$af('vals',106498,'sys::Endian[]').$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('ordinal',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('doFromStr',36866,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','sys::Type',false),new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',false)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('name',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('make',133124,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.Env.$type.$am('arch',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('workDir',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('args',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('locale',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pod','sys::Pod',false),new fan.sys.Param('key','sys::Str',false),new fan.sys.Param('def','sys::Str?',true),new fan.sys.Param('locale','sys::Locale',true)])).$am('gc',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('runtime',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('findAllFiles',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false)])).$am('idHash',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('config',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pod','sys::Pod',false),new fan.sys.Param('key','sys::Str',false),new fan.sys.Param('def','sys::Str?',true)])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('os',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('platform',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('tempDir',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('index',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::Str',false)])).$am('homeDir',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('host',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('parent',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('in',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('exit',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('status','sys::Int',true)])).$am('vars',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compileScript',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','sys::File',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('err',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('findFile',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('findPodFile',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('podName','sys::Str',false)])).$am('findAllPodNames',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('cur',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('diagnostics',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',4100,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('parent','sys::Env',true)])).$am('user',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('props',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pod','sys::Pod',false),new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('maxAge','sys::Duration',false)])).$am('out',270336,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.Slot.$type.$am('facet',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Type',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('hasFacet',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Type',false)])).$am('findFunc',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('facets',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('isSynthetic',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isAbstract',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('qname',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('findField',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('isPrivate',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('name',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('signature',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('find',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('isMethod',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isOverride',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('findMethod',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('isNative',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isConst',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('parent',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isVirtual',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isInternal',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isPublic',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isProtected',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('isStatic',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('doc',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',132,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isCtor',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isField',8192,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.Field.$type.$am('hasFacet',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Type',false)])).$am('facet',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Type',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('set',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('instance','sys::Obj?',false),new fan.sys.Param('value','sys::Obj?',false)])).$am('facets',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('findFunc',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('type',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('isSynthetic',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('makeSetFunc',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('vals','[sys::Field:sys::Obj?]',false)])).$am('isAbstract',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('qname',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('findField',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('isPrivate',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('name',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('signature',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('find',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('isMethod',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isOverride',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('findMethod',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('get',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('instance','sys::Obj?',true)])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('isNative',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('parent',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isConst',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isVirtual',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isPublic',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isInternal',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isProtected',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('isStatic',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('doc',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('privateMake',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isField',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isCtor',8192,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.FieldNotSetErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.File.$type.$af('modified',270337,'sys::DateTime?').$af('pathSep',106498,'sys::Str').$af('sep',106498,'sys::Str').$am('createTemp',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('prefix','sys::Str',true),new fan.sys.Param('suffix','sys::Str',true),new fan.sys.Param('dir','sys::File?',true)])).$am('listFiles',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('rename',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('newName','sys::Str',false)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('createFile',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('ext',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('open',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('mode','sys::Str',true)])).$am('readAllBuf',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeProps',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('props','[sys::Str:sys::Str]',false)])).$am('basename',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('moveInto',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dir','sys::File',false)])).$am('mimeType',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readObj',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('os',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('osPath','sys::Str',false)])).$am('plus',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('path','sys::Uri',false),new fan.sys.Param('checkSlash','sys::Bool',true)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('copyInto',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dir','sys::File',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('parent',270337,fan.sys.List.make(fan.sys.Param.$type,[])).$am('osRoots',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('pathStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('uri',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('create',270337,fan.sys.List.make(fan.sys.Param.$type,[])).$am('size',270337,fan.sys.List.make(fan.sys.Param.$type,[])).$am('mmap',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('mode','sys::Str',true),new fan.sys.Param('pos','sys::Int',true),new fan.sys.Param('size','sys::Int?',true)])).$am('writeObj',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('listDirs',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('checkSlash','sys::Bool',true)])).$am('walk',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::File->sys::Void|',false)])).$am('createDir',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)])).$am('isDir',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('normalize',270337,fan.sys.List.make(fan.sys.Param.$type,[])).$am('copyTo',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('to','sys::File',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('deleteOnExit',270337,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readAllStr',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('normalizeNewlines','sys::Bool',true)])).$am('name',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('path',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('delete',270337,fan.sys.List.make(fan.sys.Param.$type,[])).$am('makeNew',4100,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false)])).$am('moveTo',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('to','sys::File',false)])).$am('eachLine',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Str->sys::Void|',false)])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('readProps',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('list',270337,fan.sys.List.make(fan.sys.Param.$type,[])).$am('in',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('bufferSize','sys::Int?',true)])).$am('exists',270337,fan.sys.List.make(fan.sys.Param.$type,[])).$am('osPath',270337,fan.sys.List.make(fan.sys.Param.$type,[])).$am('out',270337,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('append','sys::Bool',true),new fan.sys.Param('bufferSize','sys::Int?',true)])).$am('readAllLines',8192,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.LocalFile.$type.$af('modified',336896,'sys::DateTime?').$af('pathSep',106498,'sys::Str').$af('sep',106498,'sys::Str').$am('createTemp',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('prefix','sys::Str',true),new fan.sys.Param('suffix','sys::Str',true),new fan.sys.Param('dir','sys::File?',true)])).$am('listFiles',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('rename',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('newName','sys::Str',false)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('createFile',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('ext',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('open',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('mode','sys::Str',true)])).$am('readAllBuf',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeProps',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('props','[sys::Str:sys::Str]',false)])).$am('basename',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('moveInto',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dir','sys::File',false)])).$am('mimeType',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readObj',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('plus',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('checkSlash','sys::Bool',true)])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('os',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('osPath','sys::Str',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('copyInto',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('dir','sys::File',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('init',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('parent',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('osRoots',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('pathStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('create',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('uri',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('size',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('mmap',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('mode','sys::Str',true),new fan.sys.Param('pos','sys::Int',true),new fan.sys.Param('size','sys::Int?',true)])).$am('writeObj',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('listDirs',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('checkSlash','sys::Bool',true)])).$am('walk',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::File->sys::Void|',false)])).$am('createDir',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)])).$am('isDir',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('normalize',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('copyTo',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('to','sys::File',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('deleteOnExit',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readAllStr',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('normalizeNewlines','sys::Bool',true)])).$am('name',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('path',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('delete',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('eachLine',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Str->sys::Void|',false)])).$am('moveTo',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('to','sys::File',false)])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('readProps',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('list',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('in',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('bufferSize','sys::Int?',true)])).$am('exists',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('osPath',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readAllLines',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('out',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('append','sys::Bool',true),new fan.sys.Param('bufferSize','sys::Int?',true)]));
  fan.sys.Float.$type.$af('defVal',106498,'sys::Float').$af('negInf',106498,'sys::Float').$af('pi',106498,'sys::Float').$af('nan',106498,'sys::Float').$af('posInf',106498,'sys::Float').$af('e',106498,'sys::Float').$am('plusInt',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('mult',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)])).$am('atan',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('divDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)])).$am('pow',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pow','sys::Float',false)])).$am('localeGrouping',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('cos',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toFloat',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localeDecimal',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('round',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('minusInt',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('toRadians',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('tanh',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localeNaN',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('abs',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toCode',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localePercent',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('bits32',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('decrement',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('cosh',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('increment',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('plus',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('minus',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('toLocale',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str?',true)])).$am('compare',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)])).$am('mod',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)])).$am('random',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sinh',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('log',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localeMinus',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('exp',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('modDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)])).$am('floor',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('modInt',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('isNaN',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('privateMake',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('makeBits32',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('bits','sys::Int',false)])).$am('tan',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('multInt',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('asin',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('ceil',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('div',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)])).$am('minusDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)])).$am('approx',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false),new fan.sys.Param('tolerance','sys::Float?',true)])).$am('atan2',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('y','sys::Float',false),new fan.sys.Param('x','sys::Float',false)])).$am('toDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('bits',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('toDegrees',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('multDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)])).$am('localePosInf',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('acos',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('min',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Float',false)])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('negate',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('max',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Float',false)])).$am('divInt',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('sqrt',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('log10',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('makeBits',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('bits','sys::Int',false)])).$am('sin',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toInt',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localeNegInf',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('plusDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)]));
  fan.sys.Func.$type.$am('call',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::A',true),new fan.sys.Param('b','sys::B',true),new fan.sys.Param('c','sys::C',true),new fan.sys.Param('d','sys::D',true),new fan.sys.Param('e','sys::E',true),new fan.sys.Param('f','sys::F',true),new fan.sys.Param('g','sys::G',true),new fan.sys.Param('h','sys::H',true)])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('callOn',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('target','sys::Obj?',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('params',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('callList',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('arity',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('retype',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','sys::Type',false)])).$am('method',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('returns',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('bind',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('args','sys::Obj?[]',false)]));
  fan.sys.IndexErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.InStream.$type.$af('charset',335872,'sys::Charset').$af('endian',335872,'sys::Endian').$am('readUtf',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('unread',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('skip',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('pipe',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',false),new fan.sys.Param('n','sys::Int?',true),new fan.sys.Param('close','sys::Bool',true)])).$am('close',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readS1',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readS2',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readChar',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readAllBuf',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readS4',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readAllStr',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('normalizeNewlines','sys::Bool',true)])).$am('read',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('peek',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readU2',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readU1',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readU4',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readStrToken',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true),new fan.sys.Param('c','|sys::Int->sys::Bool|?',true)])).$am('readBool',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readObj',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('eachLine',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Str->sys::Void|',false)])).$am('peekChar',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readS8',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readF8',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('readProps',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readF4',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('unreadChar',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('readChars',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('readLine',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true)])).$am('readBufFully',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf?',false),new fan.sys.Param('n','sys::Int',false)])).$am('make',4100,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('in','sys::InStream?',false)])).$am('readDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readAllLines',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readBuf',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',false)]));
  fan.sys.SysInStream.$type.$af('charset',335872,'sys::Charset').$af('endian',335872,'sys::Endian').$am('readUtf',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('unread',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('skip',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('pipe',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',false),new fan.sys.Param('n','sys::Int?',true),new fan.sys.Param('close','sys::Bool',true)])).$am('close',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readS1',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readChar',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readS2',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readAllBuf',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readS4',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readAllStr',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('normalizeNewlines','sys::Bool',true)])).$am('read',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('peek',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readU2',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readU1',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readU4',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readStrToken',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true),new fan.sys.Param('c','|sys::Int->sys::Bool|?',true)])).$am('readBool',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readS8',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readObj',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('eachLine',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Str->sys::Void|',false)])).$am('peekChar',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readF8',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('readProps',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readF4',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('unreadChar',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('readChars',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('readLine',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('max','sys::Int?',true)])).$am('readBufFully',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf?',false),new fan.sys.Param('n','sys::Int',false)])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readAllLines',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('readBuf',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',false)]));
  fan.sys.Int.$type.$af('defVal',106498,'sys::Int').$af('minVal',106498,'sys::Int').$af('maxVal',106498,'sys::Int').$am('mult',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('divDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)])).$am('pow',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pow','sys::Int',false)])).$am('lower',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localeGrouping',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toFloat',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromDigit',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('radix','sys::Int',true)])).$am('localeDecimal',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('localeNaN',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('abs',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toCode',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('base','sys::Int',true)])).$am('localeLower',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isUpper',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localePercent',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localeIsLower',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('decrement',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('minusFloat',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('plus',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('increment',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isEven',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('minus',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('shiftr',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('or',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('toLocale',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str?',true)])).$am('mod',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('compare',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)])).$am('random',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Range?',true)])).$am('isOdd',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isDigit',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('radix','sys::Int',true)])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('localeMinus',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('and',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('not',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('modDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)])).$am('multFloat',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)])).$am('privateMake',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('shiftl',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('modFloat',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)])).$am('isAlpha',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toDateTime',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tz','sys::TimeZone',true)])).$am('div',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('minusDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)])).$am('upper',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('times',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::Int->sys::Void|',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('radix','sys::Int',true),new fan.sys.Param('checked','sys::Bool',true)])).$am('equalsIgnoreCase',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ch','sys::Int',false)])).$am('divFloat',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)])).$am('multDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)])).$am('localePosInf',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('plusFloat',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Float',false)])).$am('isSpace',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localeUpper',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('min',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Int',false)])).$am('isLower',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('negate',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('xor',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Int',false)])).$am('max',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Int',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toChar',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toHex',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('width','sys::Int?',true)])).$am('localeIsUpper',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toDigit',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('radix','sys::Int',true)])).$am('isAlphaNum',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toInt',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localeNegInf',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toDuration',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('plusDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Decimal',false)]));
  fan.sys.InterruptedErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.IOErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.List.$type.$af('size',73728,'sys::Int').$af('capacity',73728,'sys::Int').$am('indexSame',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V',false),new fan.sys.Param('offset','sys::Int',true)])).$am('removeSame',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V',false)])).$am('last',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('containsAll',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('list','sys::L',false)])).$am('contains',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V',false)])).$am('pop',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('of',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isEmpty',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toCode',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('makeObj',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('capacity','sys::Int',false)])).$am('any',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Bool|',false)])).$am('insertAll',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('list','sys::L',false)])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('index',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V',false),new fan.sys.Param('offset','sys::Int',true)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('addAll',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('list','sys::L',false)])).$am('binarySearch',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::V',false),new fan.sys.Param('c','|sys::V,sys::V->sys::Int|?',true)])).$am('get',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('findAll',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Bool|',false)])).$am('random',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('getSafe',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('def','sys::V?',true)])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('reduce',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('init','sys::Obj?',false),new fan.sys.Param('c','|sys::Obj?,sys::V,sys::Int->sys::Obj?|',false)])).$am('eachWhile',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Obj?|',false)])).$am('dup',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('removeAt',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)])).$am('findType',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','sys::Type',false)])).$am('eachRange',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Range',false),new fan.sys.Param('c','|sys::V,sys::Int->sys::Void|',false)])).$am('each',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Void|',false)])).$am('sortr',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::V->sys::Int|?',true)])).$am('rw',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('of','sys::Type',false),new fan.sys.Param('capacity','sys::Int',false)])).$am('ro',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sort',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::V->sys::Int|?',true)])).$am('unique',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('containsAny',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('list','sys::L',false)])).$am('getRange',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('range','sys::Range',false)])).$am('remove',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V',false)])).$am('set',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('item','sys::V',false)])).$am('findIndex',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Bool|',false)])).$am('add',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V',false)])).$am('push',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V',false)])).$am('clear',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('flatten',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('union',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::L',false)])).$am('map',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Obj?|',false)])).$am('peek',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trim',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('eachr',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Void|',false)])).$am('find',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Bool|',false)])).$am('all',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Bool|',false)])).$am('moveTo',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('item','sys::V',false),new fan.sys.Param('toIndex','sys::Int',false)])).$am('min',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::V->sys::Int|?',true)])).$am('intersection',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::L',false)])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('reverse',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isRO',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('max',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::V->sys::Int|?',true)])).$am('fill',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::V',false),new fan.sys.Param('times','sys::Int',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('exclude',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Bool|',false)])).$am('isRW',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('join',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('separator','sys::Str',true),new fan.sys.Param('c','|sys::V,sys::Int->sys::Str|?',true)])).$am('removeRange',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Range',false)])).$am('slice',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('range','sys::Range',false)])).$am('swap',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('indexA','sys::Int',false),new fan.sys.Param('indexB','sys::Int',false)])).$am('insert',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('item','sys::V',false)])).$am('first',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('eachrWhile',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::Int->sys::Obj?|',false)]));
  fan.sys.Locale.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('use',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('func','|sys::This->sys::Void|',false)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('lang',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('country',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('cur',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('setCur',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('locale','sys::Locale',false)])).$am('privateMake',2052,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.Log.$type.$af('level',73728,'sys::LogLevel').$am('warn',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',false),new fan.sys.Param('err','sys::Err?',true)])).$am('isErr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('debug',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',false),new fan.sys.Param('err','sys::Err?',true)])).$am('removeHandler',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('handler','|sys::LogRec->sys::Void|',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('info',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',false),new fan.sys.Param('err','sys::Err?',true)])).$am('handlers',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isInfo',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('name',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('addHandler',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('handler','|sys::LogRec->sys::Void|',false)])).$am('find',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('get',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('list',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('isWarn',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('log',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('rec','sys::LogRec',false)])).$am('isEnabled',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('level','sys::LogLevel',false)])).$am('err',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',false),new fan.sys.Param('err','sys::Err?',true)])).$am('isDebug',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('register','sys::Bool',false)]));
  fan.sys.LogLevel.$type.$af('warn',106506,'sys::LogLevel').$af('silent',106506,'sys::LogLevel').$af('debug',106506,'sys::LogLevel').$af('info',106506,'sys::LogLevel').$af('err',106506,'sys::LogLevel').$af('vals',106498,'sys::LogLevel[]').$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('compare',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('ordinal',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('doFromStr',36866,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','sys::Type',false),new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',false)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('name',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('make',133124,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.LogRec.$type.$af('msg',73730,'sys::Str').$af('time',73730,'sys::DateTime').$af('level',73730,'sys::LogLevel').$af('err',73730,'sys::Err?').$af('logName',73730,'sys::Str').$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('print',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true)])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('time','sys::DateTime',false),new fan.sys.Param('level','sys::LogLevel',false),new fan.sys.Param('logName','sys::Str',false),new fan.sys.Param('message','sys::Str',false),new fan.sys.Param('err','sys::Err?',true)]));
  fan.sys.Map.$type.$af('caseInsensitive',73728,'sys::Bool').$af('def',73728,'sys::V?').$af('ordered',73728,'sys::Bool').$am('ro',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('remove',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::K',false)])).$am('set',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::K',false),new fan.sys.Param('val','sys::V',false)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('instance$init$sys$Map',133120,fan.sys.List.make(fan.sys.Param.$type,[])).$am('add',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::K',false),new fan.sys.Param('val','sys::V',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('clear',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isEmpty',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('getOrAdd',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::K',false),new fan.sys.Param('valFunc','|sys::K->sys::V|',false)])).$am('toCode',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('any',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::K->sys::Bool|',false)])).$am('map',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::K->sys::Obj?|',false)])).$am('vals',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('all',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::K->sys::Bool|',false)])).$am('find',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::K->sys::Bool|',false)])).$am('addList',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('list','sys::V[]',false),new fan.sys.Param('c','|sys::V,sys::Int->sys::K|?',true)])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('isRO',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('addAll',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('m','sys::M',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('get',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::K',false),new fan.sys.Param('def','sys::V?',true)])).$am('keys',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('findAll',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::K->sys::Bool|',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('exclude',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::K->sys::Bool|',false)])).$am('isRW',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('join',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('separator','sys::Str',false),new fan.sys.Param('c','|sys::V,sys::K->sys::Str|?',true)])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('reduce',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('init','sys::Obj?',false),new fan.sys.Param('c','|sys::Obj?,sys::V,sys::K->sys::Obj?|',false)])).$am('eachWhile',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::K->sys::Obj?|',false)])).$am('size',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('dup',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('containsKey',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('key','sys::K',false)])).$am('setAll',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('m','sys::M',false)])).$am('setList',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('list','sys::V[]',false),new fan.sys.Param('c','|sys::V,sys::Int->sys::K|?',true)])).$am('each',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::V,sys::K->sys::Void|',false)])).$am('rw',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Type',false)]));
  fan.sys.Method.$type.$am('call',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Obj?',true),new fan.sys.Param('b','sys::Obj?',true),new fan.sys.Param('c','sys::Obj?',true),new fan.sys.Param('d','sys::Obj?',true),new fan.sys.Param('e','sys::Obj?',true),new fan.sys.Param('f','sys::Obj?',true),new fan.sys.Param('g','sys::Obj?',true),new fan.sys.Param('h','sys::Obj?',true)])).$am('hasFacet',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Type',false)])).$am('facet',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('type','sys::Type',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('facets',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('findFunc',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('callList',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('isSynthetic',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isAbstract',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('qname',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('findField',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('isPrivate',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('name',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('func',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('returns',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('signature',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('find',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('isMethod',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isOverride',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('findMethod',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('qname','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('callOn',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('target','sys::Obj?',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('isNative',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('parent',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isConst',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isVirtual',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isPublic',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isInternal',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('params',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isProtected',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('isStatic',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('doc',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('privateMake',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isField',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isCtor',8192,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.MimeType.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('charset',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('params',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('parseParams',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('mediaType',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('subType',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('forExt',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ext','sys::Str',false)])).$am('make',2052,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.Month.$type.$af('dec',106506,'sys::Month').$af('mar',106506,'sys::Month').$af('jan',106506,'sys::Month').$af('vals',106498,'sys::Month[]').$af('may',106506,'sys::Month').$af('apr',106506,'sys::Month').$af('jul',106506,'sys::Month').$af('jun',106506,'sys::Month').$af('oct',106506,'sys::Month').$af('feb',106506,'sys::Month').$af('nov',106506,'sys::Month').$af('sep',106506,'sys::Month').$af('aug',106506,'sys::Month').$am('localeFull',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('name',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('decrement',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('increment',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('compare',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)])).$am('toLocale',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str?',true)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('ordinal',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('doFromStr',36866,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','sys::Type',false),new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',false)])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('localeAbbr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('numDays',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('year','sys::Int',false)])).$am('make',133124,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.NameErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.NotImmutableErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.NullErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.OutStream.$type.$af('xmlEscNewlines',106498,'sys::Int').$af('xmlEscUnicode',106498,'sys::Int').$af('charset',335872,'sys::Charset').$af('endian',335872,'sys::Endian').$af('xmlEscQuotes',106498,'sys::Int').$am('writeChar',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('char','sys::Int',false)])).$am('printLine',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',true)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('close',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeChars',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('off','sys::Int',true),new fan.sys.Param('len','sys::Int',true)])).$am('writeProps',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('props','[sys::Str:sys::Str]',false),new fan.sys.Param('close','sys::Bool',true)])).$am('sync',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeI2',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('write',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('byte','sys::Int',false)])).$am('writeI4',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('writeDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','sys::Decimal',false)])).$am('writeI8',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('writeF4',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false)])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeXml',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('mode','sys::Int',true)])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeUtf',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('print',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Obj?',false)])).$am('writeBuf',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',true)])).$am('flush',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeBool',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Bool',false)])).$am('writeObj',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',4100,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream?',false)])).$am('writeF8',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false)]));
  fan.sys.SysOutStream.$type.$af('xmlEscNewlines',106498,'sys::Int').$af('xmlEscUnicode',106498,'sys::Int').$af('charset',335872,'sys::Charset').$af('endian',335872,'sys::Endian').$af('xmlEscQuotes',106498,'sys::Int').$am('writeChar',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('char','sys::Int',false)])).$am('printLine',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',true)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('writeChars',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('off','sys::Int',true),new fan.sys.Param('len','sys::Int',true)])).$am('close',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeProps',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('props','[sys::Str:sys::Str]',false),new fan.sys.Param('close','sys::Bool',true)])).$am('sync',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('write',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('byte','sys::Int',false)])).$am('writeI2',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('writeI4',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('writeDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','sys::Decimal',false)])).$am('writeI8',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('writeF4',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false)])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeXml',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('mode','sys::Int',true)])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeUtf',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('print',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Obj?',false)])).$am('writeBuf',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('buf','sys::Buf',false),new fan.sys.Param('n','sys::Int',false)])).$am('flush',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('writeBool',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Bool',false)])).$am('writeObj',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('writeF8',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Float',false)])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.Param.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('hasDefault',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('type',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('name',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',2052,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.ParseErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.Pod.$type.$am('locale',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('def','sys::Str?',true)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('type',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('meta',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('version',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('of',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)])).$am('file',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('name',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('config',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('def','sys::Str?',true)])).$am('types',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('depends',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('find',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('files',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('list',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('uri',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('log',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('doc',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('load',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('in','sys::InStream',false)])).$am('make',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('props',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('uri','sys::Uri',false),new fan.sys.Param('maxAge','sys::Duration',false)]));
  fan.sys.Range.$type.$am('last',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('exclusive',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('contains',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('i','sys::Int',false)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('inclusive',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isEmpty',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('map',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::Int->sys::Obj?|',false)])).$am('offset',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('offset','sys::Int',false)])).$am('toList',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('end',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('min',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('max',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('random',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('makeInclusive',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('start','sys::Int',false),new fan.sys.Param('end','sys::Int',false)])).$am('makeExclusive',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('start','sys::Int',false),new fan.sys.Param('end','sys::Int',false)])).$am('start',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('each',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::Int->sys::Void|',false)])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('start','sys::Int',false),new fan.sys.Param('end','sys::Int',false),new fan.sys.Param('exclusive','sys::Bool',false)])).$am('first',8192,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.ReadonlyErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.Regex.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('matches',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('matcher',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str',false)])).$am('glob',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str',false)])).$am('split',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('limit','sys::Int',true)])).$am('make',2052,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.RegexMatcher.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('groupCount',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('matches',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('start',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('group','sys::Int',true)])).$am('group',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('group','sys::Int',true)])).$am('make',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('find',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('end',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('group','sys::Int',true)]));
  fan.sys.Str.$type.$af('defVal',106498,'sys::Str').$am('lower',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toFloat',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('checked','sys::Bool',true)])).$am('isAscii',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('contains',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('toXml',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compareIgnoreCase',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('isEmpty',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('indexrIgnoreCase',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('offset','sys::Int',true)])).$am('toCode',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('quote','sys::Int?',true),new fan.sys.Param('escapeUnicode','sys::Bool',true)])).$am('localeLower',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('any',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::Int,sys::Int->sys::Bool|',false)])).$am('isUpper',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('plus',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('spaces',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('n','sys::Int',false)])).$am('index',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('offset','sys::Int',true)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('justl',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('width','sys::Int',false)])).$am('get',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('justr',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('width','sys::Int',false)])).$am('localeCompare',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('compare',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)])).$am('toLocale',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('getSafe',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('def','sys::Int',true)])).$am('padl',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('width','sys::Int',false),new fan.sys.Param('char','sys::Int',true)])).$am('capitalize',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('trimEnd',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('size',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('padr',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('width','sys::Int',false),new fan.sys.Param('char','sys::Int',true)])).$am('split',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('separator','sys::Int?',true),new fan.sys.Param('trim','sys::Bool',true)])).$am('each',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::Int,sys::Int->sys::Void|',false)])).$am('privateMake',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('getRange',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('range','sys::Range',false)])).$am('isAlpha',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toBool',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('checked','sys::Bool',true)])).$am('splitLines',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localeCapitalize',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('numNewlines',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('upper',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromDisplayName',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toDecimal',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('checked','sys::Bool',true)])).$am('equalsIgnoreCase',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('trim',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isSpace',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('eachr',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::Int,sys::Int->sys::Void|',false)])).$am('all',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('c','|sys::Int,sys::Int->sys::Bool|',false)])).$am('localeUpper',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isLower',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toUri',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('startsWith',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('reverse',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('containsChar',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ch','sys::Int',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toBuf',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('charset','sys::Charset',true)])).$am('in',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('localeDecapitalize',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('replace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('from','sys::Str',false),new fan.sys.Param('to','sys::Str',false)])).$am('indexIgnoreCase',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('offset','sys::Int',true)])).$am('isAlphaNum',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('intern',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toDisplayName',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('slice',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('range','sys::Range',false)])).$am('fromChars',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('chars','sys::Int[]',false)])).$am('chars',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('endsWith',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('toInt',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('radix','sys::Int',true),new fan.sys.Param('checked','sys::Bool',true)])).$am('decapitalize',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('indexr',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('offset','sys::Int',true)])).$am('trimStart',8192,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.StrBuf.$type.$af('capacity',73728,'sys::Int').$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('addChar',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('ch','sys::Int',false)])).$am('get',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)])).$am('remove',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false)])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('set',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('ch','sys::Int',false)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('join',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',false),new fan.sys.Param('sep','sys::Str',true)])).$am('removeRange',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Range',false)])).$am('add',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',false)])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('size',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('clear',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isEmpty',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('insert',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('index','sys::Int',false),new fan.sys.Param('x','sys::Obj?',false)])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('capacity','sys::Int',true)])).$am('out',8192,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.Test.$type.$am('curTestMethod',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('verify',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cond','sys::Bool',false),new fan.sys.Param('msg','sys::Str?',true)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('verifyEq',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Obj?',false),new fan.sys.Param('b','sys::Obj?',false),new fan.sys.Param('msg','sys::Str?',true)])).$am('fail',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str?',true)])).$am('verifyFalse',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cond','sys::Bool',false),new fan.sys.Param('msg','sys::Str?',true)])).$am('setup',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('verifySame',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Obj?',false),new fan.sys.Param('b','sys::Obj?',false),new fan.sys.Param('msg','sys::Str?',true)])).$am('verifyNotSame',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Obj?',false),new fan.sys.Param('b','sys::Obj?',false),new fan.sys.Param('msg','sys::Str?',true)])).$am('tempDir',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('verifyErr',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('errType','sys::Type',false),new fan.sys.Param('c','|sys::Test->sys::Void|',false)])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('verifyType',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false),new fan.sys.Param('t','sys::Type',false)])).$am('verifyNotEq',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Obj?',false),new fan.sys.Param('b','sys::Obj?',false),new fan.sys.Param('msg','sys::Str?',true)])).$am('verifyNull',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Obj?',false),new fan.sys.Param('msg','sys::Str?',true)])).$am('verifyNotNull',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('a','sys::Obj?',false),new fan.sys.Param('msg','sys::Str?',true)])).$am('make',4100,fan.sys.List.make(fan.sys.Param.$type,[])).$am('teardown',270336,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.TestErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str?',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.This.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('make',2052,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.Time.$type.$af('defVal',106498,'sys::Time').$am('fromDuration',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','sys::Duration',false)])).$am('isMidnight',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toDateTime',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('d','sys::Date',false),new fan.sys.Param('tz','sys::TimeZone',true)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('toCode',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('fromLocale',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('str','sys::Str',false),new fan.sys.Param('pattern','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('min',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('compare',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)])).$am('toLocale',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str?',true)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hour',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('now',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('tz','sys::TimeZone',true)])).$am('sec',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toIso',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('nanoSec',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('privateMake',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('hour','sys::Int',false),new fan.sys.Param('min','sys::Int',false),new fan.sys.Param('sec','sys::Int',true),new fan.sys.Param('ns','sys::Int',true)])).$am('fromIso',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('toDuration',8192,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.TimeoutErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.TimeZone.$type.$am('listNames',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('dstAbbr',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('year','sys::Int',false)])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('defVal',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('utc',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('name',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('dstOffset',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('year','sys::Int',false)])).$am('cur',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('rel',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fullName',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('privateMake',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('offset',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('year','sys::Int',false)])).$am('stdAbbr',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('year','sys::Int',false)])).$am('listFullNames',40962,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.Unit.$type.$am('scale',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('mult',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Unit',false)])).$am('A',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('quantities',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('convertTo',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('scalar','sys::Float',false),new fan.sys.Param('unit','sys::Unit',false)])).$am('div',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('b','sys::Unit',false)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('K',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('kg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('name',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('quantity',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('quantity','sys::Str',false)])).$am('offset',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('define',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('symbol',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('definition',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('ids',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('list',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('m',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('mol',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('sec',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[])).$am('cd',8192,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.UnknownFacetErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.UnknownPodErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.UnknownServiceErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.UnknownSlotErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.UnknownTypeErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.UnresolvedErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.Unsafe.$type.$am('val',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('val','sys::Obj?',false)]));
  fan.sys.UnsupportedErr.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('cause',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('trace',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',true),new fan.sys.Param('options','[sys::Str:sys::Obj]?',true)])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('msg',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('traceToStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('msg','sys::Str',true),new fan.sys.Param('cause','sys::Err?',true)]));
  fan.sys.Uri.$type.$af('defVal',106498,'sys::Uri').$am('checkName',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)])).$am('sliceToPathAbs',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Range',false)])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('ext',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('scheme',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('basename',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toCode',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('mimeType',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('decodeQuery',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false)])).$am('isPathAbs',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('encode',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('plus',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('toAppend','sys::Uri',false)])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('host',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isRel',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('get',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('base','sys::Obj?',true),new fan.sys.Param('checked','sys::Bool',true)])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toLocale',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('parent',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('pathStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('queryStr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('frag',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('decode',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('relToAuth',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('privateMake',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('encodeQuery',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('q','[sys::Str:sys::Str]',false)])).$am('plusName',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('asDir','sys::Bool',true)])).$am('auth',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('port',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('relTo',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('base','sys::Uri',false)])).$am('isAbs',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('getRange',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Range',false)])).$am('plusSlash',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('query',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isDir',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isPathOnly',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isName',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('s','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('name',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('path',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('userInfo',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('pathOnly',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('slice',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Range',false)])).$am('getRangeToPathAbs',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('r','sys::Range',false)])).$am('toFile',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('plusQuery',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('query','[sys::Str:sys::Str]?',false)]));
  fan.sys.Version.$type.$af('defVal',106498,'sys::Version').$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('segments',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('hash',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('minor',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('build',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('version','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('privateMake',2052,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('segments','sys::Int[]',false)])).$am('major',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('patch',8192,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.Void.$type.$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj?',false)])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('compare',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('that','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('make',2052,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.sys.Weekday.$type.$af('sun',106506,'sys::Weekday').$af('fri',106506,'sys::Weekday').$af('thu',106506,'sys::Weekday').$af('vals',106498,'sys::Weekday[]').$af('wed',106506,'sys::Weekday').$af('mon',106506,'sys::Weekday').$af('sat',106506,'sys::Weekday').$af('tue',106506,'sys::Weekday').$am('localeFull',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('isImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('echo',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('x','sys::Obj?',true)])).$am('localeStartOfWeek',40962,fan.sys.List.make(fan.sys.Param.$type,[])).$am('name',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('fromStr',40962,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',true)])).$am('decrement',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('increment',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('typeof',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('with',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::This->sys::Void|',false)])).$am('toStr',271360,fan.sys.List.make(fan.sys.Param.$type,[])).$am('equals',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj?',false)])).$am('hash',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('toLocale',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('pattern','sys::Str?',true)])).$am('compare',271360,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('obj','sys::Obj',false)])).$am('toImmutable',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('doFromStr',36866,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('t','sys::Type',false),new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('checked','sys::Bool',false)])).$am('ordinal',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('trap',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('name','sys::Str',false),new fan.sys.Param('args','sys::Obj?[]?',false)])).$am('localeAbbr',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('make',133124,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$ordinal','sys::Int',false),new fan.sys.Param('$name','sys::Str',false)])).$am('static$init',165890,fan.sys.List.make(fan.sys.Param.$type,[]));
}
fan.sys.FConst = function() {};
fan.sys.FConst.Abstract   = 0x00000001;
fan.sys.FConst.Const      = 0x00000002;
fan.sys.FConst.Ctor       = 0x00000004;
fan.sys.FConst.Enum       = 0x00000008;
fan.sys.FConst.Facet      = 0x00000010;
fan.sys.FConst.Final      = 0x00000020;
fan.sys.FConst.Getter     = 0x00000040;
fan.sys.FConst.Internal   = 0x00000080;
fan.sys.FConst.Mixin      = 0x00000100;
fan.sys.FConst.Native     = 0x00000200;
fan.sys.FConst.Override   = 0x00000400;
fan.sys.FConst.Private    = 0x00000800;
fan.sys.FConst.Protected  = 0x00001000;
fan.sys.FConst.Public     = 0x00002000;
fan.sys.FConst.Setter     = 0x00004000;
fan.sys.FConst.Static     = 0x00008000;
fan.sys.FConst.Storage    = 0x00010000;
fan.sys.FConst.Synthetic  = 0x00020000;
fan.sys.FConst.Virtual    = 0x00040000;
fan.sys.FConst.FlagsMask  = 0x0007ffff;
fan.sys.MemBufOutStream = fan.sys.Obj.$extend(fan.sys.OutStream);
fan.sys.MemBufOutStream.prototype.$ctor = function(buf)
{
fan.sys.OutStream.prototype.$ctor.call(this);
this.buf = buf;
}
fan.sys.MemBufOutStream.prototype.write = function(v)
{
this.buf.m_buf[this.buf.m_pos++] = (0xff & v);
if (this.buf.m_pos > this.buf.m_size) this.buf.m_size = this.buf.m_pos;
return this;
}
fan.sys.MemBufOutStream.prototype.writeChar = function(c)
{
this.m_charset.m_encoder.encodeOut(c, this);
return this;
}
fan.sys.MemBufOutStream.prototype.writeBuf = function(other, n)
{
if (n === undefined) n = other.remaining();
if (other.m_pos+n > other.m_size)
throw fan.sys.IOErr.make("Not enough bytes to write");
var orig = this.buf.m_buf;
var temp = other.m_buf.slice(other.m_pos, other.m_pos+n);
this.buf.m_buf = this.buf.m_buf.slice(0, this.buf.m_pos).concat(temp);
this.buf.m_pos += n;
other.m_pos += n;
var remaining = this.buf.m_size - this.buf.m_pos;
if (remaining > 0)
{
temp = orig.slice(this.buf.m_pos, this.buf.m_pos+remaining);
this.buf.m_buf = this.buf.m_buf.concat(temp);
}
if (this.buf.m_pos > this.buf.m_size) this.buf.m_size = this.buf.m_pos;
return this;
}
fan.sys.MemBufOutStream.prototype.flush = function() {}
fan.sys.MemBufOutStream.prototype.sync = function() {}
fan.sys.MemBufInStream = fan.sys.Obj.$extend(fan.sys.InStream);
fan.sys.MemBufInStream.prototype.$ctor = function(buf)
{
fan.sys.InStream.prototype.$ctor.call(this);
this.buf = buf;
}
fan.sys.MemBufInStream.prototype.read = function()
{
if (this.buf.m_pos >= this.buf.m_size) return null;
return this.buf.m_buf[this.buf.m_pos++] & 0xff;
}
fan.sys.MemBufInStream.prototype.readChar = function()
{
var c = this.rChar();
return (c < 0) ? null : c;
}
fan.sys.MemBufInStream.prototype.rChar = function()
{
return this.m_charset.m_encoder.decode(this);
}
fan.sys.MemBufInStream.prototype.readBuf = function(other, n)
{
if (this.buf.m_pos >= this.buf.m_size) return null;
var len = Math.min(this.buf.m_size-this.buf.m_pos, n);
var orig = other.m_buf;
var temp = this.buf.m_buf.slice(this.buf.m_pos, this.buf.m_pos+len);
other.m_buf = other.m_buf.slice(0, other.m_pos).concat(temp);
this.buf.m_pos += len;
other.m_pos += len;
other.m_size = other.m_pos;
var remaining =  other.m_size - other.m_pos;
if (remaining > 0)
{
temp = orig.slice(other.m_pos, other.m_pos+remaining);
other.m_buf = other.m_buf.concat(temp);
}
return len;
}
fan.sys.MemBufInStream.prototype.unread = function(n)
{
n &= 0xFF;
if (this.buf.m_pos > 0 && this.buf.m_buf[this.buf.m_pos-1] == n)
{
this.buf.m_pos--;
}
else
{
this.buf.m_buf.splice(this.buf.m_pos, 0, n)
this.buf.m_size++;
}
return this;
}
fan.sys.MemBufInStream.prototype.peek = function()
{
if (this.buf.m_pos >= this.buf.m_size) return null;
return this.buf.m_buf[this.buf.m_pos] & 0xFF;
}
fan.sys.MemBufInStream.prototype.skip = function(n)
{
var oldPos = this.buf.m_pos;
this.buf.m_pos += n;
if (this.buf.m_pos < this.buf.m_size) return n;
this.buf.m_pos = this.buf.m_size;
return this.buf.m_pos-oldPos;
}
fan.sys.Buf_Md5 = function(buf, key)
{
var chrsz = 8;
function core_md5(x, len)
{
x[len >> 5] |= 0x80 << ((len) % 32);
x[(((len + 64) >>> 9) << 4) + 14] = len;
var a =  1732584193;
var b = -271733879;
var c = -1732584194;
var d =  271733878;
for(var i=0; i<x.length; i+=16)
{
var olda = a;
var oldb = b;
var oldc = c;
var oldd = d;
a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
a = safe_add(a, olda);
b = safe_add(b, oldb);
c = safe_add(c, oldc);
d = safe_add(d, oldd);
}
return Array(a, b, c, d);
}
function md5_cmn(q, a, b, x, s, t) { return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b); }
function md5_ff(a, b, c, d, x, s, t) { return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t); }
function md5_gg(a, b, c, d, x, s, t) { return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t); }
function md5_hh(a, b, c, d, x, s, t) { return md5_cmn(b ^ c ^ d, a, b, x, s, t); }
function md5_ii(a, b, c, d, x, s, t) { return md5_cmn(c ^ (b | (~d)), a, b, x, s, t); }
function core_hmac_md5(key, data)
{
var bkey = bytesToWords(key);
if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
var ipad = Array(16), opad = Array(16);
for(var i = 0; i < 16; i++)
{
ipad[i] = bkey[i] ^ 0x36363636;
opad[i] = bkey[i] ^ 0x5C5C5C5C;
}
var hash = core_md5(ipad.concat(bytesToWords(data)), 512 + data.length * chrsz);
return core_md5(opad.concat(hash), 512 + 128);
}
function safe_add(x, y)
{
var lsw = (x & 0xFFFF) + (y & 0xFFFF);
var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
return (msw << 16) | (lsw & 0xFFFF);
}
function bit_rol(num, cnt)
{
return (num << cnt) | (num >>> (32 - cnt));
}
function bytesToWords(bytes)
{
var words = new Array();
var size = bytes.length;
for (var i=0; size>3 && (i+4)<=size; i+=4)
{
words.push((bytes[i+3]<<24) | (bytes[i+2]<<16) | (bytes[i+1]<<8) | bytes[i]);
}
var rem = bytes.length % 4;
if (rem > 0)
{
if (rem == 3) words.push((bytes[size-1]<<16) | (bytes[size-2]<<8) | bytes[size-3]);
if (rem == 2) words.push((bytes[size-1]<<8) | bytes[size-2]);
if (rem == 1) words.push(bytes[size-1]);
}
return words;
}
var dw = (key === undefined)
? core_md5(bytesToWords(buf), buf.length * chrsz)
: core_hmac_md5(key, buf);
var db = new Array();
for (var i=0; i<dw.length; i++)
{
db.push(0xff & dw[i]);
db.push(0xff & (dw[i] >> 8));
db.push(0xff & (dw[i] >> 16));
db.push(0xff & (dw[i] >> 24));
}
return db;
}
fan.sys.ObjUtil = function() {};
fan.sys.ObjUtil.hash = function(obj)
{
return 0;
}
fan.sys.ObjUtil.equals = function(a, b, op)
{
if (a == null) return b == null;
if (a instanceof fan.sys.Obj) return a.equals(b);
var t = typeof a;
if (t === "number") return fan.sys.Int.equals(a, b);
if (t === "string") return a === b;
var f = a.$fanType;
if (f === fan.sys.Float.$type) return fan.sys.Float.equals(a, b);
if (f === fan.sys.Decimal.$type) return fan.sys.Decimal.equals(a, b);
return a === b;
}
fan.sys.ObjUtil.compare = function(a, b, op)
{
if (a instanceof fan.sys.Obj)
{
if (b == null) return +1;
return a.compare(b);
}
else if (a != null && a.$fanType != null)
{
if (op === true && (isNaN(a) || isNaN(b))) return Number.NaN;
return fan.sys.Float.compare(a, b);
}
else
{
if (a == null)
{
if (b != null) return -1;
return 0;
}
if (b == null) return 1;
if (a < b) return -1;
if (a > b) return 1;
return 0;
}
}
fan.sys.ObjUtil.compareNE = function(a,b) { return !fan.sys.ObjUtil.equals(a,b); }
fan.sys.ObjUtil.compareLT = function(a,b) { return fan.sys.ObjUtil.compare(a,b,true) <  0; }
fan.sys.ObjUtil.compareLE = function(a,b) { return fan.sys.ObjUtil.compare(a,b,true) <= 0; }
fan.sys.ObjUtil.compareGE = function(a,b) { return fan.sys.ObjUtil.compare(a,b,true) >= 0; }
fan.sys.ObjUtil.compareGT = function(a,b) { return fan.sys.ObjUtil.compare(a,b,true) >  0; }
fan.sys.ObjUtil.is = function(obj, type)
{
if (obj == null) return false;
return fan.sys.ObjUtil.$typeof(obj).is(type);
}
fan.sys.ObjUtil.as = function(obj, type)
{
if (obj == null) return null;
var t = fan.sys.ObjUtil.$typeof(obj);
if (t.is(fan.sys.Func.$type)) return t.as(obj, type);
if (t.is(fan.sys.List.$type)) return t.as(obj, type);
if (t.is(fan.sys.Map.$type))  return t.as(obj, type);
if (t.is(type)) return obj;
return null;
}
fan.sys.ObjUtil.coerce = function(obj, type)
{
if (obj == null)
{
if (type.isNullable()) return obj;
throw fan.sys.NullErr.make("Coerce to non-null");
}
var v = fan.sys.ObjUtil.as(obj, type);
if (v == null)
{
var t = fan.sys.ObjUtil.$typeof(obj);
throw fan.sys.CastErr.make(t + " cannot be cast to " + type);
}
return obj;
}
fan.sys.ObjUtil.$typeof = function(obj)
{
if (obj instanceof fan.sys.Obj) return obj.$typeof();
else return fan.sys.Type.toFanType(obj);
}
fan.sys.ObjUtil.trap = function(obj, name, args)
{
if (obj instanceof fan.sys.Obj) return obj.trap(name, args);
else return fan.sys.ObjUtil.doTrap(obj, name, args, fan.sys.Type.toFanType(obj));
}
fan.sys.ObjUtil.doTrap = function(obj, name, args, type)
{
var slot = type.slot(name, true);
if (slot instanceof fan.sys.Method)
{
return slot.invoke(obj, args);
}
else
{
var argSize = (args == null) ? 0 : args.size();
if (argSize == 0) return slot.get(obj);
if (argSize == 1)
{
var val = args.get(0);
slot.set(obj, val);
return val;
}
throw fan.sys.ArgErr.make("Invalid number of args to get or set field '" + name + "'");
}
}
fan.sys.ObjUtil.isImmutable = function(obj)
{
if (obj instanceof fan.sys.Obj) return obj.isImmutable();
else if (obj == null) return true;
else
{
if ((typeof obj) == "boolean" || obj instanceof Boolean) return true;
if ((typeof obj) == "number"  || obj instanceof Number) return true;
if ((typeof obj) == "string"  || obj instanceof String) return true;
if (obj.$fanType != null) return true;
}
throw fan.sys.UnknownTypeErr.make("Not a Fantom type: " + obj);
}
fan.sys.ObjUtil.toImmutable = function(obj)
{
if (obj instanceof fan.sys.Obj) return obj.toImmutable();
else if (obj == null) return null;
else
{
if ((typeof obj) == "boolean" || obj instanceof Boolean) return obj;
if ((typeof obj) == "number"  || obj instanceof Number) return obj;
if ((typeof obj) == "string"  || obj instanceof String) return obj;
if (obj.$fanType != null) return obj;
}
throw fan.sys.UnknownTypeErr.make("Not a Fantom type: " + obj);
}
fan.sys.ObjUtil.$with = function(self, f)
{
if (self instanceof fan.sys.Obj)
{
return self.$with(f);
}
else
{
f.call(self);
return self;
}
}
fan.sys.ObjUtil.toStr = function(obj)
{
if (obj == null) return "null";
if (typeof obj == "string") return obj;
if (obj.$fanType === fan.sys.Float.$type) return fan.sys.Float.toStr(obj);
return obj.toString();
}
fan.sys.ObjUtil.echo = function(obj)
{
var s = fan.sys.ObjUtil.toStr(obj);
try { console.log(s); }
catch (e1)
{
try { println(s); }
catch (e2) {}
}
}
fan.sys.Buf_Sha1 = function(buf, key)
{
var chrsz = 8;
function core_sha1(x, len)
{
x[len >> 5] |= 0x80 << (24 - len % 32);
x[((len + 64 >> 9) << 4) + 15] = len;
var w = Array(80);
var a =  1732584193;
var b = -271733879;
var c = -1732584194;
var d =  271733878;
var e = -1009589776;
for(var i = 0; i < x.length; i += 16)
{
var olda = a;
var oldb = b;
var oldc = c;
var oldd = d;
var olde = e;
for(var j = 0; j < 80; j++)
{
if(j < 16) w[j] = x[i + j];
else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
safe_add(safe_add(e, w[j]), sha1_kt(j)));
e = d;
d = c;
c = rol(b, 30);
b = a;
a = t;
}
a = safe_add(a, olda);
b = safe_add(b, oldb);
c = safe_add(c, oldc);
d = safe_add(d, oldd);
e = safe_add(e, olde);
}
return Array(a, b, c, d, e);
}
function sha1_ft(t, b, c, d)
{
if(t < 20) return (b & c) | ((~b) & d);
if(t < 40) return b ^ c ^ d;
if(t < 60) return (b & c) | (b & d) | (c & d);
return b ^ c ^ d;
}
function sha1_kt(t)
{
return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
(t < 60) ? -1894007588 : -899497514;
}
function core_hmac_sha1(key, data)
{
var bkey = bytesToWords(key);
if(bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);
var ipad = Array(16), opad = Array(16);
for(var i = 0; i < 16; i++)
{
ipad[i] = bkey[i] ^ 0x36363636;
opad[i] = bkey[i] ^ 0x5C5C5C5C;
}
var hash = core_sha1(ipad.concat(bytesToWords(data)), 512 + data.length * chrsz);
return core_sha1(opad.concat(hash), 512 + 160);
}
function safe_add(x, y)
{
var lsw = (x & 0xFFFF) + (y & 0xFFFF);
var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
return (msw << 16) | (lsw & 0xFFFF);
}
function rol(num, cnt)
{
return (num << cnt) | (num >>> (32 - cnt));
}
function bytesToWords(bytes)
{
var words = new Array();
var size = bytes.length;
for (var i=0; size>3 && (i+4)<=size; i+=4)
{
words.push((bytes[i]<<24) | (bytes[i+1]<<16) | (bytes[i+2]<<8) | bytes[i+3]);
}
var rem = bytes.length % 4;
if (rem > 0)
{
if (rem == 3) words.push((bytes[size-3]<<24) | (bytes[size-2]<<16) | bytes[size-1]<<8);
if (rem == 2) words.push((bytes[size-2]<<24) | bytes[size-1]<<16);
if (rem == 1) words.push(bytes[size-1]<<24);
}
return words;
}
var dw = (key === undefined)
? core_sha1(bytesToWords(buf), buf.length * chrsz)
: core_hmac_sha1(key, buf);
var db = new Array();
for (var i=0; i<dw.length; i++)
{
db.push(0xff & (dw[i] >> 24));
db.push(0xff & (dw[i] >> 16));
db.push(0xff & (dw[i] >> 8));
db.push(0xff & dw[i]);
}
return db;
}
fan.sys.StrInStream = fan.sys.Obj.$extend(fan.sys.InStream);
fan.sys.StrInStream.prototype.$ctor = function(str)
{
this.str  = str;
this.size = str.length;
this.pos  = 0;
this.pushback = null;
}
fan.sys.StrInStream.prototype.read = function()
{
var b = this.rChar();
return (b < 0) ? null : b & 0xFF;
}
fan.sys.StrInStream.prototype.readBuf = function(buf, n)
{
for (var i=0; i<n; ++i)
{
var c = this.rChar();
if (c < 0) return i == 0 ? null : i;
buf.out().writeChar(c);
}
return n;
}
fan.sys.StrInStream.prototype.unread = function(c)
{
return this.unreadChar(c);
}
fan.sys.StrInStream.prototype.rChar = function()
{
if (this.pushback != null && this.pushback.length > 0)
return this.pushback.pop();
if (this.pos >= this.size) return -1;
return this.str.charCodeAt(this.pos++);
}
fan.sys.StrInStream.prototype.readChar = function()
{
var c = this.rChar();
return (c < 0) ? null : c;
}
fan.sys.StrInStream.prototype.unreadChar = function(c)
{
if (this.pushback == null) this.pushback = [];
this.pushback.push(c);
return this;
}
fan.sys.StrInStream.prototype.close = function()
{
return true;
}
fan.sys.Bool.m_defVal = false;
fan.sys.Int.m_maxVal = Math.pow(2, 53)
fan.sys.Int.m_minVal = -Math.pow(2, 53)
fan.sys.Int.m_defVal = 0;
fan.sys.Int.Chunk  = 4096;
fan.sys.Float.m_posInf = fan.sys.Float.make(Number.POSITIVE_INFINITY);
fan.sys.Float.m_negInf = fan.sys.Float.make(Number.NEGATIVE_INFINITY);
fan.sys.Float.m_nan    = fan.sys.Float.make(Number.NaN);
fan.sys.Float.m_e      = fan.sys.Float.make(Math.E);
fan.sys.Float.m_pi     = fan.sys.Float.make(Math.PI);
fan.sys.Float.m_defVal = fan.sys.Float.make(0);
fan.sys.NumPattern.cache("00");    fan.sys.NumPattern.cache("000");       fan.sys.NumPattern.cache("0000");
fan.sys.NumPattern.cache("0.0");   fan.sys.NumPattern.cache("0.00");      fan.sys.NumPattern.cache("0.000");
fan.sys.NumPattern.cache("0.#");   fan.sys.NumPattern.cache("#,###.0");   fan.sys.NumPattern.cache("#,###.#");
fan.sys.NumPattern.cache("0.##");  fan.sys.NumPattern.cache("#,###.00");  fan.sys.NumPattern.cache("#,###.##");
fan.sys.NumPattern.cache("0.###"); fan.sys.NumPattern.cache("#,###.000"); fan.sys.NumPattern.cache("#,###.###");
fan.sys.NumPattern.cache("0.0#");  fan.sys.NumPattern.cache("#,###.0#");  fan.sys.NumPattern.cache("#,###.0#");
fan.sys.NumPattern.cache("0.0##"); fan.sys.NumPattern.cache("#,###.0##"); fan.sys.NumPattern.cache("#,###.0##");
fan.sys.Str.m_defVal = "";
fan.sys.Duration.nsPerDay   = 86400000000000;
fan.sys.Duration.nsPerHr    = 3600000000000;
fan.sys.Duration.nsPerMin   = 60000000000;
fan.sys.Duration.nsPerSec   = 1000000000;
fan.sys.Duration.nsPerMilli = 1000000;
fan.sys.Duration.secPerDay  = 86400;
fan.sys.Duration.secPerHr   = 3600;
fan.sys.Duration.secPerMin  = 60;
fan.sys.Duration.m_defVal    = fan.sys.Duration.make(0);
fan.sys.Duration.m_minVal    = fan.sys.Duration.make(fan.sys.Int.m_minVal);
fan.sys.Duration.m_maxVal    = fan.sys.Duration.make(fan.sys.Int.m_maxVal);
fan.sys.Duration.m_oneDay    = fan.sys.Duration.make(fan.sys.Duration.nsPerDay);
fan.sys.Duration.m_oneMin    = fan.sys.Duration.make(fan.sys.Duration.nsPerMin);
fan.sys.Duration.m_oneSec    = fan.sys.Duration.make(fan.sys.Duration.nsPerSec);
fan.sys.Duration.m_negOneDay = fan.sys.Duration.make(-fan.sys.Duration.nsPerDay);
fan.sys.Duration.m_boot      = fan.sys.Duration.now();
fan.sys.Endian.m_big    = new fan.sys.Endian(0,  "big");
fan.sys.Endian.m_little = new fan.sys.Endian(1,  "little");
fan.sys.Endian.m_vals = fan.sys.List.make(fan.sys.Endian.$type,
[
fan.sys.Endian.m_big,
fan.sys.Endian.m_little
]);
fan.sys.OutStream.m_xmlEscNewlines = 0x01;
fan.sys.OutStream.m_xmlEscQuotes   = 0x02;
fan.sys.OutStream.m_xmlEscUnicode  = 0x04;
fan.sys.Uri.parentRange = fan.sys.Range.make(0, -2, false);
fan.sys.Uri.m_defVal = fan.sys.Uri.fromStr("");
fan.sys.UriPodBase = "/pod/";
fan.sys.MimeType.m_imagePng  = fan.sys.MimeType.predefined("image", "png");
fan.sys.MimeType.m_imageGif  = fan.sys.MimeType.predefined("image", "gif");
fan.sys.MimeType.m_imageJpeg = fan.sys.MimeType.predefined("image", "jpeg");
fan.sys.MimeType.m_textPlain = fan.sys.MimeType.predefined("text", "plain");
fan.sys.MimeType.m_textHtml  = fan.sys.MimeType.predefined("text", "html");
fan.sys.MimeType.m_textXml   = fan.sys.MimeType.predefined("text", "xml");
fan.sys.MimeType.m_dir       = fan.sys.MimeType.predefined("x-directory", "normal");
fan.sys.LogLevel.m_debug  = new fan.sys.LogLevel(0, "debug");
fan.sys.LogLevel.m_info   = new fan.sys.LogLevel(1, "info");
fan.sys.LogLevel.m_warn   = new fan.sys.LogLevel(2, "warn");
fan.sys.LogLevel.m_err    = new fan.sys.LogLevel(3, "err");
fan.sys.LogLevel.m_silent = new fan.sys.LogLevel(4, "silent");
fan.sys.LogLevel.m_vals = fan.sys.List.make(fan.sys.LogLevel.$type,
[
fan.sys.LogLevel.m_debug,
fan.sys.LogLevel.m_info,
fan.sys.LogLevel.m_warn,
fan.sys.LogLevel.m_err,
fan.sys.LogLevel.m_silent
]).toImmutable();
fan.sys.Log.m_handlers.push(fan.sys.Func.make(
fan.sys.List.make(fan.sys.Param.$type, new fan.sys.Param("rec", fan.sys.LogRec.$type, false)),
fan.sys.Void.$type,
function(rec) { rec.print(); }
));
fan.sys.Month.m_jan = new fan.sys.Month(0,  "jan");
fan.sys.Month.m_feb = new fan.sys.Month(1,  "feb");
fan.sys.Month.m_mar = new fan.sys.Month(2,  "mar");
fan.sys.Month.m_apr = new fan.sys.Month(3,  "apr");
fan.sys.Month.m_may = new fan.sys.Month(4,  "may");
fan.sys.Month.m_jun = new fan.sys.Month(5,  "jun");
fan.sys.Month.m_jul = new fan.sys.Month(6,  "jul");
fan.sys.Month.m_aug = new fan.sys.Month(7,  "aug");
fan.sys.Month.m_sep = new fan.sys.Month(8,  "sep");
fan.sys.Month.m_oct = new fan.sys.Month(9,  "oct");
fan.sys.Month.m_nov = new fan.sys.Month(10, "nov");
fan.sys.Month.m_dec = new fan.sys.Month(11, "dec");
fan.sys.Month.m_vals = fan.sys.List.make(fan.sys.Month.$type,
[
fan.sys.Month.m_jan,
fan.sys.Month.m_feb,
fan.sys.Month.m_mar,
fan.sys.Month.m_apr,
fan.sys.Month.m_may,
fan.sys.Month.m_jun,
fan.sys.Month.m_jul,
fan.sys.Month.m_aug,
fan.sys.Month.m_sep,
fan.sys.Month.m_oct,
fan.sys.Month.m_nov,
fan.sys.Month.m_dec
]).toImmutable();
fan.sys.Weekday.m_sun = new fan.sys.Weekday(0,  "sun");
fan.sys.Weekday.m_mon = new fan.sys.Weekday(1,  "mon");
fan.sys.Weekday.m_tue = new fan.sys.Weekday(2,  "tue");
fan.sys.Weekday.m_wed = new fan.sys.Weekday(3,  "wed");
fan.sys.Weekday.m_thu = new fan.sys.Weekday(4,  "thu");
fan.sys.Weekday.m_fri = new fan.sys.Weekday(5,  "fri");
fan.sys.Weekday.m_sat = new fan.sys.Weekday(6,  "sat");
fan.sys.Weekday.m_vals = fan.sys.List.make(fan.sys.Weekday.$type,
[
fan.sys.Weekday.m_sun,
fan.sys.Weekday.m_mon,
fan.sys.Weekday.m_tue,
fan.sys.Weekday.m_wed,
fan.sys.Weekday.m_thu,
fan.sys.Weekday.m_fri,
fan.sys.Weekday.m_sat
]).toImmutable();
tz = new fan.sys.TimeZone();
tz.m_name = "UTC";
tz.m_fullName = "Etc/UTC";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
rule.startYear = 1995;
rule.offset = 0;
rule.stdAbbr = "UTC";
rule.dstOffset = 0;
tz.m_rules.push(rule);
fan.sys.TimeZone.cache["UTC"] = tz;
fan.sys.TimeZone.cache["Etc/UTC"] = tz;
fan.sys.TimeZone.names.push("UTC");
fan.sys.TimeZone.fullNames.push("Etc/UTC");
fan.sys.TimeZone.m_utc = tz;
tz = new fan.sys.TimeZone();
tz.m_name = "Rel";
tz.m_fullName = "Etc/Rel";
tz.m_rules = [new fan.sys.TimeZone$Rule()];
fan.sys.TimeZone.cache["Rel"] = tz;
fan.sys.TimeZone.cache["Etc/Rel"] = tz;
fan.sys.TimeZone.names.push("Rel");
fan.sys.TimeZone.fullNames.push("Etc/Rel");
fan.sys.TimeZone.m_rel = tz;
fan.sys.Time.m_defVal = new fan.sys.Time(0, 0, 0, 0);
fan.sys.Date.m_defVal = new fan.sys.Date(2000, 0, 1);
fan.sys.DateTime.m_defVal = fan.sys.DateTime.make(
2000, fan.sys.Month.m_jan, 1, 0, 0, 0, 0, fan.sys.TimeZone.utc());
fan.sys.Version.m_defVal = fan.sys.Version.fromStr("0");
fan.sys.Unit.m_quantityNames = fan.sys.List.make(fan.sys.Str.$type, []);
fan.sys.Env.m_configProps   = fan.sys.Uri.fromStr("config.props");
fan.sys.Env.m_localeEnProps = fan.sys.Uri.fromStr("locale/en.props");
// America/New_York
tz = new fan.sys.TimeZone();
tz.m_name = "New_York";
tz.m_fullName = "America/New_York";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 2007;
 rule.offset = -18000;
 rule.stdAbbr = "EST";
 rule.dstOffset = 3600;
 rule.dstAbbr = "EST";
 rule.dstStart = new fan.sys.TimeZone$DstTime(2,62,0,8,7200,119)
 rule.dstEnd = new fan.sys.TimeZone$DstTime(10,62,0,1,7200,119)
 tz.m_rules.push(rule);
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = -18000;
 rule.stdAbbr = "EST";
 rule.dstOffset = 3600;
 rule.dstAbbr = "EST";
 rule.dstStart = new fan.sys.TimeZone$DstTime(3,62,0,1,7200,119)
 rule.dstEnd = new fan.sys.TimeZone$DstTime(9,108,0,0,7200,119)
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["New_York"] = tz;
fan.sys.TimeZone.cache["America/New_York"] = tz;
fan.sys.TimeZone.names.push("New_York");
fan.sys.TimeZone.fullNames.push("America/New_York");

// America/Chicago
tz = new fan.sys.TimeZone();
tz.m_name = "Chicago";
tz.m_fullName = "America/Chicago";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 2007;
 rule.offset = -21600;
 rule.stdAbbr = "CST";
 rule.dstOffset = 3600;
 rule.dstAbbr = "CST";
 rule.dstStart = new fan.sys.TimeZone$DstTime(2,62,0,8,7200,119)
 rule.dstEnd = new fan.sys.TimeZone$DstTime(10,62,0,1,7200,119)
 tz.m_rules.push(rule);
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = -21600;
 rule.stdAbbr = "CST";
 rule.dstOffset = 3600;
 rule.dstAbbr = "CST";
 rule.dstStart = new fan.sys.TimeZone$DstTime(3,62,0,1,7200,119)
 rule.dstEnd = new fan.sys.TimeZone$DstTime(9,108,0,0,7200,119)
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["Chicago"] = tz;
fan.sys.TimeZone.cache["America/Chicago"] = tz;
fan.sys.TimeZone.names.push("Chicago");
fan.sys.TimeZone.fullNames.push("America/Chicago");

// America/Denver
tz = new fan.sys.TimeZone();
tz.m_name = "Denver";
tz.m_fullName = "America/Denver";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 2007;
 rule.offset = -25200;
 rule.stdAbbr = "MST";
 rule.dstOffset = 3600;
 rule.dstAbbr = "MST";
 rule.dstStart = new fan.sys.TimeZone$DstTime(2,62,0,8,7200,119)
 rule.dstEnd = new fan.sys.TimeZone$DstTime(10,62,0,1,7200,119)
 tz.m_rules.push(rule);
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = -25200;
 rule.stdAbbr = "MST";
 rule.dstOffset = 3600;
 rule.dstAbbr = "MST";
 rule.dstStart = new fan.sys.TimeZone$DstTime(3,62,0,1,7200,119)
 rule.dstEnd = new fan.sys.TimeZone$DstTime(9,108,0,0,7200,119)
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["Denver"] = tz;
fan.sys.TimeZone.cache["America/Denver"] = tz;
fan.sys.TimeZone.names.push("Denver");
fan.sys.TimeZone.fullNames.push("America/Denver");

// America/Los_Angeles
tz = new fan.sys.TimeZone();
tz.m_name = "Los_Angeles";
tz.m_fullName = "America/Los_Angeles";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 2007;
 rule.offset = -28800;
 rule.stdAbbr = "PST";
 rule.dstOffset = 3600;
 rule.dstAbbr = "PST";
 rule.dstStart = new fan.sys.TimeZone$DstTime(2,62,0,8,7200,119)
 rule.dstEnd = new fan.sys.TimeZone$DstTime(10,62,0,1,7200,119)
 tz.m_rules.push(rule);
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = -28800;
 rule.stdAbbr = "PST";
 rule.dstOffset = 3600;
 rule.dstAbbr = "PST";
 rule.dstStart = new fan.sys.TimeZone$DstTime(3,62,0,1,7200,119)
 rule.dstEnd = new fan.sys.TimeZone$DstTime(9,108,0,0,7200,119)
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["Los_Angeles"] = tz;
fan.sys.TimeZone.cache["America/Los_Angeles"] = tz;
fan.sys.TimeZone.names.push("Los_Angeles");
fan.sys.TimeZone.fullNames.push("America/Los_Angeles");

// Etc/GMT
tz = new fan.sys.TimeZone();
tz.m_name = "GMT";
tz.m_fullName = "Etc/GMT";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = 0;
 rule.stdAbbr = "GMT";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT"] = tz;
fan.sys.TimeZone.cache["Etc/GMT"] = tz;
fan.sys.TimeZone.names.push("GMT");
fan.sys.TimeZone.fullNames.push("Etc/GMT");

// Etc/GMT+1
tz = new fan.sys.TimeZone();
tz.m_name = "GMT+1";
tz.m_fullName = "Etc/GMT+1";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = -3600;
 rule.stdAbbr = "GMT+1";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT+1"] = tz;
fan.sys.TimeZone.cache["Etc/GMT+1"] = tz;
fan.sys.TimeZone.names.push("GMT+1");
fan.sys.TimeZone.fullNames.push("Etc/GMT+1");

// Etc/GMT+10
tz = new fan.sys.TimeZone();
tz.m_name = "GMT+10";
tz.m_fullName = "Etc/GMT+10";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = -36000;
 rule.stdAbbr = "GMT+10";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT+10"] = tz;
fan.sys.TimeZone.cache["Etc/GMT+10"] = tz;
fan.sys.TimeZone.names.push("GMT+10");
fan.sys.TimeZone.fullNames.push("Etc/GMT+10");

// Etc/GMT+11
tz = new fan.sys.TimeZone();
tz.m_name = "GMT+11";
tz.m_fullName = "Etc/GMT+11";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = -39600;
 rule.stdAbbr = "GMT+11";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT+11"] = tz;
fan.sys.TimeZone.cache["Etc/GMT+11"] = tz;
fan.sys.TimeZone.names.push("GMT+11");
fan.sys.TimeZone.fullNames.push("Etc/GMT+11");

// Etc/GMT+12
tz = new fan.sys.TimeZone();
tz.m_name = "GMT+12";
tz.m_fullName = "Etc/GMT+12";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = -43200;
 rule.stdAbbr = "GMT+12";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT+12"] = tz;
fan.sys.TimeZone.cache["Etc/GMT+12"] = tz;
fan.sys.TimeZone.names.push("GMT+12");
fan.sys.TimeZone.fullNames.push("Etc/GMT+12");

// Etc/GMT+2
tz = new fan.sys.TimeZone();
tz.m_name = "GMT+2";
tz.m_fullName = "Etc/GMT+2";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = -7200;
 rule.stdAbbr = "GMT+2";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT+2"] = tz;
fan.sys.TimeZone.cache["Etc/GMT+2"] = tz;
fan.sys.TimeZone.names.push("GMT+2");
fan.sys.TimeZone.fullNames.push("Etc/GMT+2");

// Etc/GMT+3
tz = new fan.sys.TimeZone();
tz.m_name = "GMT+3";
tz.m_fullName = "Etc/GMT+3";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = -10800;
 rule.stdAbbr = "GMT+3";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT+3"] = tz;
fan.sys.TimeZone.cache["Etc/GMT+3"] = tz;
fan.sys.TimeZone.names.push("GMT+3");
fan.sys.TimeZone.fullNames.push("Etc/GMT+3");

// Etc/GMT+4
tz = new fan.sys.TimeZone();
tz.m_name = "GMT+4";
tz.m_fullName = "Etc/GMT+4";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = -14400;
 rule.stdAbbr = "GMT+4";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT+4"] = tz;
fan.sys.TimeZone.cache["Etc/GMT+4"] = tz;
fan.sys.TimeZone.names.push("GMT+4");
fan.sys.TimeZone.fullNames.push("Etc/GMT+4");

// Etc/GMT+5
tz = new fan.sys.TimeZone();
tz.m_name = "GMT+5";
tz.m_fullName = "Etc/GMT+5";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = -18000;
 rule.stdAbbr = "GMT+5";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT+5"] = tz;
fan.sys.TimeZone.cache["Etc/GMT+5"] = tz;
fan.sys.TimeZone.names.push("GMT+5");
fan.sys.TimeZone.fullNames.push("Etc/GMT+5");

// Etc/GMT+6
tz = new fan.sys.TimeZone();
tz.m_name = "GMT+6";
tz.m_fullName = "Etc/GMT+6";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = -21600;
 rule.stdAbbr = "GMT+6";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT+6"] = tz;
fan.sys.TimeZone.cache["Etc/GMT+6"] = tz;
fan.sys.TimeZone.names.push("GMT+6");
fan.sys.TimeZone.fullNames.push("Etc/GMT+6");

// Etc/GMT+7
tz = new fan.sys.TimeZone();
tz.m_name = "GMT+7";
tz.m_fullName = "Etc/GMT+7";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = -25200;
 rule.stdAbbr = "GMT+7";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT+7"] = tz;
fan.sys.TimeZone.cache["Etc/GMT+7"] = tz;
fan.sys.TimeZone.names.push("GMT+7");
fan.sys.TimeZone.fullNames.push("Etc/GMT+7");

// Etc/GMT+8
tz = new fan.sys.TimeZone();
tz.m_name = "GMT+8";
tz.m_fullName = "Etc/GMT+8";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = -28800;
 rule.stdAbbr = "GMT+8";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT+8"] = tz;
fan.sys.TimeZone.cache["Etc/GMT+8"] = tz;
fan.sys.TimeZone.names.push("GMT+8");
fan.sys.TimeZone.fullNames.push("Etc/GMT+8");

// Etc/GMT+9
tz = new fan.sys.TimeZone();
tz.m_name = "GMT+9";
tz.m_fullName = "Etc/GMT+9";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = -32400;
 rule.stdAbbr = "GMT+9";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT+9"] = tz;
fan.sys.TimeZone.cache["Etc/GMT+9"] = tz;
fan.sys.TimeZone.names.push("GMT+9");
fan.sys.TimeZone.fullNames.push("Etc/GMT+9");

// Etc/GMT-1
tz = new fan.sys.TimeZone();
tz.m_name = "GMT-1";
tz.m_fullName = "Etc/GMT-1";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = 3600;
 rule.stdAbbr = "GMT-1";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT-1"] = tz;
fan.sys.TimeZone.cache["Etc/GMT-1"] = tz;
fan.sys.TimeZone.names.push("GMT-1");
fan.sys.TimeZone.fullNames.push("Etc/GMT-1");

// Etc/GMT-10
tz = new fan.sys.TimeZone();
tz.m_name = "GMT-10";
tz.m_fullName = "Etc/GMT-10";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = 36000;
 rule.stdAbbr = "GMT-10";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT-10"] = tz;
fan.sys.TimeZone.cache["Etc/GMT-10"] = tz;
fan.sys.TimeZone.names.push("GMT-10");
fan.sys.TimeZone.fullNames.push("Etc/GMT-10");

// Etc/GMT-11
tz = new fan.sys.TimeZone();
tz.m_name = "GMT-11";
tz.m_fullName = "Etc/GMT-11";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = 39600;
 rule.stdAbbr = "GMT-11";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT-11"] = tz;
fan.sys.TimeZone.cache["Etc/GMT-11"] = tz;
fan.sys.TimeZone.names.push("GMT-11");
fan.sys.TimeZone.fullNames.push("Etc/GMT-11");

// Etc/GMT-12
tz = new fan.sys.TimeZone();
tz.m_name = "GMT-12";
tz.m_fullName = "Etc/GMT-12";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = 43200;
 rule.stdAbbr = "GMT-12";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT-12"] = tz;
fan.sys.TimeZone.cache["Etc/GMT-12"] = tz;
fan.sys.TimeZone.names.push("GMT-12");
fan.sys.TimeZone.fullNames.push("Etc/GMT-12");

// Etc/GMT-13
tz = new fan.sys.TimeZone();
tz.m_name = "GMT-13";
tz.m_fullName = "Etc/GMT-13";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = 46800;
 rule.stdAbbr = "GMT-13";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT-13"] = tz;
fan.sys.TimeZone.cache["Etc/GMT-13"] = tz;
fan.sys.TimeZone.names.push("GMT-13");
fan.sys.TimeZone.fullNames.push("Etc/GMT-13");

// Etc/GMT-14
tz = new fan.sys.TimeZone();
tz.m_name = "GMT-14";
tz.m_fullName = "Etc/GMT-14";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = 50400;
 rule.stdAbbr = "GMT-14";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT-14"] = tz;
fan.sys.TimeZone.cache["Etc/GMT-14"] = tz;
fan.sys.TimeZone.names.push("GMT-14");
fan.sys.TimeZone.fullNames.push("Etc/GMT-14");

// Etc/GMT-2
tz = new fan.sys.TimeZone();
tz.m_name = "GMT-2";
tz.m_fullName = "Etc/GMT-2";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = 7200;
 rule.stdAbbr = "GMT-2";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT-2"] = tz;
fan.sys.TimeZone.cache["Etc/GMT-2"] = tz;
fan.sys.TimeZone.names.push("GMT-2");
fan.sys.TimeZone.fullNames.push("Etc/GMT-2");

// Etc/GMT-3
tz = new fan.sys.TimeZone();
tz.m_name = "GMT-3";
tz.m_fullName = "Etc/GMT-3";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = 10800;
 rule.stdAbbr = "GMT-3";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT-3"] = tz;
fan.sys.TimeZone.cache["Etc/GMT-3"] = tz;
fan.sys.TimeZone.names.push("GMT-3");
fan.sys.TimeZone.fullNames.push("Etc/GMT-3");

// Etc/GMT-4
tz = new fan.sys.TimeZone();
tz.m_name = "GMT-4";
tz.m_fullName = "Etc/GMT-4";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = 14400;
 rule.stdAbbr = "GMT-4";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT-4"] = tz;
fan.sys.TimeZone.cache["Etc/GMT-4"] = tz;
fan.sys.TimeZone.names.push("GMT-4");
fan.sys.TimeZone.fullNames.push("Etc/GMT-4");

// Etc/GMT-5
tz = new fan.sys.TimeZone();
tz.m_name = "GMT-5";
tz.m_fullName = "Etc/GMT-5";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = 18000;
 rule.stdAbbr = "GMT-5";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT-5"] = tz;
fan.sys.TimeZone.cache["Etc/GMT-5"] = tz;
fan.sys.TimeZone.names.push("GMT-5");
fan.sys.TimeZone.fullNames.push("Etc/GMT-5");

// Etc/GMT-6
tz = new fan.sys.TimeZone();
tz.m_name = "GMT-6";
tz.m_fullName = "Etc/GMT-6";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = 21600;
 rule.stdAbbr = "GMT-6";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT-6"] = tz;
fan.sys.TimeZone.cache["Etc/GMT-6"] = tz;
fan.sys.TimeZone.names.push("GMT-6");
fan.sys.TimeZone.fullNames.push("Etc/GMT-6");

// Etc/GMT-7
tz = new fan.sys.TimeZone();
tz.m_name = "GMT-7";
tz.m_fullName = "Etc/GMT-7";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = 25200;
 rule.stdAbbr = "GMT-7";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT-7"] = tz;
fan.sys.TimeZone.cache["Etc/GMT-7"] = tz;
fan.sys.TimeZone.names.push("GMT-7");
fan.sys.TimeZone.fullNames.push("Etc/GMT-7");

// Etc/GMT-8
tz = new fan.sys.TimeZone();
tz.m_name = "GMT-8";
tz.m_fullName = "Etc/GMT-8";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = 28800;
 rule.stdAbbr = "GMT-8";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT-8"] = tz;
fan.sys.TimeZone.cache["Etc/GMT-8"] = tz;
fan.sys.TimeZone.names.push("GMT-8");
fan.sys.TimeZone.fullNames.push("Etc/GMT-8");

// Etc/GMT-9
tz = new fan.sys.TimeZone();
tz.m_name = "GMT-9";
tz.m_fullName = "Etc/GMT-9";
tz.m_rules = [];
rule = new fan.sys.TimeZone$Rule();
 rule.startYear = 1995;
 rule.offset = 32400;
 rule.stdAbbr = "GMT-9";
 rule.dstOffset = 0;
 tz.m_rules.push(rule);
fan.sys.TimeZone.cache["GMT-9"] = tz;
fan.sys.TimeZone.cache["Etc/GMT-9"] = tz;
fan.sys.TimeZone.names.push("GMT-9");
fan.sys.TimeZone.fullNames.push("Etc/GMT-9");

with (fan.sys.Env.cur().$props("sys:locale/en.props"))
{
  set("aprFull","April");
  set("sunFull","Sunday");
  set("wedAbbr","Wed");
  set("weekdayStart","sun");
  set("junAbbr","Jun");
  set("dateTime","D-MMM-YYYY WWW hh:mm:ss zzz");
  set("tueFull","Tuesday");
  set("monAbbr","Mon");
  set("augFull","August");
  set("date","D-MMM-YYYY");
  set("novAbbr","Nov");
  set("mayFull","May");
  set("boolTrue","True");
  set("float","#,###.0##");
  set("thuAbbr","Thu");
  set("satFull","Saturday");
  set("marAbbr","Mar");
  set("augAbbr","Aug");
  set("marFull","March");
  set("time","hh:mm");
  set("wedFull","Wednesday");
  set("junFull","June");
  set("janAbbr","Jan");
  set("tueAbbr","Tue");
  set("sepAbbr","Sep");
  set("aprAbbr","Apr");
  set("thuFull","Thursday");
  set("novFull","November");
  set("julFull","July");
  set("boolFalse","False");
  set("sunAbbr","Sun");
  set("decFull","December");
  set("int","#,###");
  set("octAbbr","Oct");
  set("monFull","Monday");
  set("decimal","#,###.0##");
  set("satAbbr","Sat");
  set("sepFull","September");
  set("julAbbr","Jul");
  set("janFull","January");
  set("decAbbr","Dec");
  set("octFull","October");
  set("mayAbbr","May");
  set("febAbbr","Feb");
  set("friFull","Friday");
  set("friAbbr","Fri");
  set("febFull","February");
}
with (fan.sys.Env.cur().$props("sys:locale/en-US.props"))
{
  set("time","k:mmAA");
  set("dateTime","D-MMM-YYYY WWW k:mm:ssAA zzz");
}
