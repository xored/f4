//
// Copyright (c) 2009, Brian Frank and Andy Frank
// Licensed under the Academic Free License version 3.0
//
// History:
//   13 Jun 09  Andy Frank  Creation
//

//////////////////////////////////////////////////////////////////////////
// MemBufOutStream
//////////////////////////////////////////////////////////////////////////

fan.sys.MemBufOutStream = fan.sys.Obj.$extend(fan.sys.OutStream);
fan.sys.MemBufOutStream.prototype.$ctor = function(buf)
{
  fan.sys.OutStream.prototype.$ctor.call(this);
  this.buf = buf;
}

fan.sys.MemBufOutStream.prototype.write = function(v)
{
  if (this.buf.m_pos+1 >= this.buf.m_buf.length) this.buf.grow(this.buf.m_pos+1);
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
  // TODO FIXIT: pull out into util (see readBuf)

  if (n === undefined) n = other.remaining();

  this.buf.grow(this.buf.m_pos + n);

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

///////////////////////////////////////////////////////z///////////////////
// MemBufInStream
//////////////////////////////////////////////////////////////////////////

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
  // unreading a buffer is a bit weird - the typical case
  // is that we are pushing back the byte we just read in
  // which case we can just rewind the position; however
  // if we pushing back a different byte then we need
  // to shift the entire buffer and insert the byte
  n &= 0xFF;
  if (this.buf.m_pos > 0 && this.buf.m_buf[this.buf.m_pos-1] == n)
  {
    this.buf.m_pos--;
  }
  else
  {
    if (this.buf.m_size+1 >= this.buf.m_buf.length) this.buf.grow(this.buf.m_size+1);
    this.buf.m_buf.splice(this.buf.m_pos, 0, n)
    this.buf.m_size++;
  }
  return this;
}

fan.sys.MemBufInStream.prototype.avail = function()
{
  return this.buf.remaining();
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

///////////////////////////////////////////////////////z///////////////////
// ErrInStream
//////////////////////////////////////////////////////////////////////////

fan.sys.ErrInStream = fan.sys.Obj.$extend(fan.sys.InStream);
fan.sys.ErrInStream.prototype.read    = function()         { throw this.err(); }
fan.sys.ErrInStream.prototype.rChar    = function()         { throw this.err(); }
fan.sys.ErrInStream.prototype.readBuf = function(other, n) { throw this.err(); }
fan.sys.ErrInStream.prototype.unread  = function(n)        { throw this.err(); }
fan.sys.ErrInStream.prototype.unread  = function(n)        { throw this.err(); }
fan.sys.ErrInStream.prototype.endian  = function(endian)   { throw this.err(); }
fan.sys.ErrInStream.prototype.charset = function(charset)  { throw this.err(); }
fan.sys.ErrInStream.prototype.err     = function() { return fan.sys.ReadonlyErr.make("Buf is immutable; use Buf.in()"); }

///////////////////////////////////////////////////////z///////////////////
// ErrOutStream
//////////////////////////////////////////////////////////////////////////

fan.sys.ErrOutStream = fan.sys.Obj.$extend(fan.sys.OutStream);
fan.sys.ErrOutStream.prototype.write     = function(v)        { throw this.err(); }
fan.sys.ErrOutStream.prototype.writeBuf  = function(other, n) { throw this.err(); }
fan.sys.ErrOutStream.prototype.writeChar = function(c)        { throw this.err(); }
fan.sys.ErrOutStream.prototype.writeChar = function(c)        { throw this.err(); }
fan.sys.ErrOutStream.prototype.endian    = function(endian)   { throw this.err(); }
fan.sys.ErrOutStream.prototype.charset   = function(charset)  { throw this.err(); }
fan.sys.ErrOutStream.prototype.err       = function() { return fan.sys.ReadonlyErr.make("Buf is immutable"); }

///////////////////////////////////////////////////////z///////////////////
// ConstBufInStream
//////////////////////////////////////////////////////////////////////////

fan.sys.ConstBufInStream = fan.sys.Obj.$extend(fan.sys.InStream);

fan.sys.ConstBufInStream.prototype.$ctor = function(buf)
{
  this.$in  = null;
  this.buf  = buf;
  this.pos  = 0;
  this.size = buf.size();
  this.endian$(buf.endian());
  this.charset$(buf.charset());
}

fan.sys.ConstBufInStream.prototype.read = function()
{
  if (this.pos >= this.size) return null;
  return this.buf.m_buf[this.pos++] & 0xFF;
}

fan.sys.ConstBufInStream.prototype.readBuf = function(other, n)
{
  if (this.pos >= this.size) return null;
  var len = Math.min(this.size - this.pos, n);
  other.pipeFrom(buf.m_buf, pos, len);
  this.pos += len;
  return len;
}

fan.sys.ConstBufInStream.prototype.unread = function(n)
{
  // unreading a buffer is a bit weird - the typical case
  // is that we are pushing back the byte we just read in
  // which case we can just rewind the position; however
  // if we pushing back a different byte then we need
  // to shift the entire buffer and insert the byte
  if (this.pos > 0 && this.buf.m_buf[this.pos-1] == n)
  {
    this.pos--;
  }
  else
  {
    throw this.buf.err();
  }
  return this;
}

fan.sys.ConstBufInStream.prototype.peek = function()
{
  if (this.pos >= this.size) return null;
  return this.buf.m_buf[this.pos] & 0xFF;
}

fan.sys.ConstBufInStream.prototype.skip = function(n)
{
  var oldPos = this.pos;
  this.pos += n;
  if (this.pos < this.size) return n;
  this.pos = this.size;
  return this.pos-oldPos;
}
