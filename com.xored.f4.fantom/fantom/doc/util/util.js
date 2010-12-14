fan.util = {};
fan.util.CsvInStream = fan.sys.Obj.$extend(fan.sys.InStream);
fan.util.CsvInStream.prototype.$ctor = function()
{
  fan.sys.InStream.prototype.$ctor.call(this);
  var $this = this;
  this.m_delimiter = 44;
  this.m_trim = true;
  this.m_rowWidth = 10;
  return;
}
fan.util.CsvInStream.prototype.$typeof = function() { return fan.util.CsvInStream.$type; }
fan.util.CsvInStream.make = function($in)
{
  var self = new fan.util.CsvInStream();
  fan.util.CsvInStream.make$(self,$in);
  return self;
}
fan.util.CsvInStream.make$ = function(self,$in)
{
  fan.sys.InStream.make$(self,$in);
  ;
  return;
}
fan.util.CsvInStream.prototype.delimiter = function()
{
  return this.m_delimiter;
}
fan.util.CsvInStream.prototype.delimiter$ = function(it)
{
  this.m_delimiter = it;
  return;
}
fan.util.CsvInStream.prototype.trim = function()
{
  return this.m_trim;
}
fan.util.CsvInStream.prototype.trim$ = function(it)
{
  this.m_trim = it;
  return;
}
fan.util.CsvInStream.prototype.readAllRows = function()
{
  var $this = this;
  var rows = fan.sys.List.make(fan.sys.Type.find("sys::Str[]"));
  this.eachRow(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("row","sys::Str[]",false)]),
    fan.sys.Void.$type,
    function(row)
    {
      rows.add(row);
      return;
    }));
  return rows;
}
fan.util.CsvInStream.prototype.eachRow = function(f)
{
  try
  {
    while (true)
    {
      var row = this.readRow();
      if (row == null)
      {
        break;
      }
      ;
      f.call(fan.sys.ObjUtil.coerce(row,fan.sys.Type.find("sys::Str[]")));
    }
    ;
  }
  finally
  {
    this.close();
  }
  ;
  return;
}
fan.util.CsvInStream.prototype.readRow = function()
{
  this.m_line = this.readLine();
  if (this.m_line == null)
  {
    return null;
  }
  ;
  var cells = fan.sys.List.make(fan.sys.Str.$type);
  cells.capacity$(this.m_rowWidth);
  this.m_pos = 0;
  while (fan.sys.ObjUtil.compareLT(this.m_pos,fan.sys.Str.size(this.m_line)))
  {
    cells.add(this.parseCell());
  }
  ;
  this.m_rowWidth = cells.size();
  return cells;
}
fan.util.CsvInStream.prototype.parseCell = function()
{
  if (this.m_trim)
  {
    while ((fan.sys.ObjUtil.compareLT(this.m_pos,fan.sys.Str.size(this.m_line)) && fan.sys.Int.isSpace(fan.sys.Str.get(this.m_line,this.m_pos))))
    {
      (function($this) { var $_u0 = $this.m_pos; $this.m_pos = fan.sys.Int.increment($this.m_pos); return $_u0; })(this);
    }
    ;
    if (fan.sys.ObjUtil.compareGE(this.m_pos,fan.sys.Str.size(this.m_line)))
    {
      return "";
    }
    ;
  }
  ;
  if (fan.sys.ObjUtil.compareNE(fan.sys.Str.get(this.m_line,this.m_pos),34))
  {
    return this.parseNonQuotedCell();
  }
  else
  {
    return this.parseQuotedCell();
  }
  ;
}
fan.util.CsvInStream.prototype.parseNonQuotedCell = function()
{
  var start = this.m_pos;
  while ((fan.sys.ObjUtil.compareLT(this.m_pos,fan.sys.Str.size(this.m_line)) && fan.sys.ObjUtil.compareNE(fan.sys.Str.get(this.m_line,this.m_pos),this.m_delimiter)))
  {
    this.m_pos = fan.sys.Int.increment(this.m_pos);
  }
  ;
  var end = fan.sys.Int.minus(this.m_pos,1);
  if (this.m_trim)
  {
    while ((fan.sys.ObjUtil.compareGT(end,start) && fan.sys.Int.isSpace(fan.sys.Str.get(this.m_line,end))))
    {
      end = fan.sys.Int.decrement(end);
    }
    ;
  }
  ;
  this.m_pos = fan.sys.Int.increment(this.m_pos);
  return fan.sys.Str.getRange(this.m_line,fan.sys.Range.make(start,end));
}
fan.util.CsvInStream.prototype.parseQuotedCell = function()
{
  var s = fan.sys.StrBuf.make();
  this.m_pos = fan.sys.Int.plus(this.m_pos,1);
  while (true)
  {
    var ch = fan.sys.Str.getSafe(this.m_line,(function($this) { var $_u1 = $this.m_pos; $this.m_pos = fan.sys.Int.increment($this.m_pos); return $_u1; })(this),0);
    while (fan.sys.ObjUtil.equals(ch,0))
    {
      this.m_pos = 0;
      this.m_line = this.readLine();
      if (this.m_line == null)
      {
        throw fan.sys.IOErr.make("Unexpected end of file in multi-line quoted cell");
      }
      ;
      s.addChar(10);
      ch = fan.sys.Str.getSafe(this.m_line,(function($this) { var $_u2 = $this.m_pos; $this.m_pos = fan.sys.Int.increment($this.m_pos); return $_u2; })(this),0);
    }
    ;
    if (fan.sys.ObjUtil.compareNE(ch,34))
    {
      s.addChar(ch);
      continue;
    }
    ;
    ch = fan.sys.Str.getSafe(this.m_line,(function($this) { var $_u3 = $this.m_pos; $this.m_pos = fan.sys.Int.increment($this.m_pos); return $_u3; })(this));
    if (fan.sys.ObjUtil.equals(ch,34))
    {
      s.addChar(ch);
      continue;
    }
    ;
    break;
  }
  ;
  return s.toStr();
}
fan.util.CsvInStream.prototype.rowWidth = function()
{
  return this.m_rowWidth;
}
fan.util.CsvInStream.prototype.rowWidth$ = function(it)
{
  this.m_rowWidth = it;
  return;
}
fan.util.CsvInStream.prototype.line = function()
{
  return this.m_line;
}
fan.util.CsvInStream.prototype.line$ = function(it)
{
  this.m_line = it;
  return;
}
fan.util.CsvInStream.prototype.pos = function()
{
  return this.m_pos;
}
fan.util.CsvInStream.prototype.pos$ = function(it)
{
  this.m_pos = it;
  return;
}
fan.util.CsvInStream.prototype.m_delimiter = 0;
fan.util.CsvInStream.prototype.m_trim = false;
fan.util.CsvInStream.prototype.m_rowWidth = 0;
fan.util.CsvInStream.prototype.m_line = null;
fan.util.CsvInStream.prototype.m_pos = 0;
fan.util.CsvOutStream = fan.sys.Obj.$extend(fan.sys.OutStream);
fan.util.CsvOutStream.prototype.$ctor = function()
{
  fan.sys.OutStream.prototype.$ctor.call(this);
  var $this = this;
  this.m_delimiter = 44;
  return;
}
fan.util.CsvOutStream.prototype.$typeof = function() { return fan.util.CsvOutStream.$type; }
fan.util.CsvOutStream.make = function(out)
{
  var self = new fan.util.CsvOutStream();
  fan.util.CsvOutStream.make$(self,out);
  return self;
}
fan.util.CsvOutStream.make$ = function(self,out)
{
  fan.sys.OutStream.make$(self,out);
  ;
  return;
}
fan.util.CsvOutStream.prototype.delimiter = function()
{
  return this.m_delimiter;
}
fan.util.CsvOutStream.prototype.delimiter$ = function(it)
{
  this.m_delimiter = it;
  return;
}
fan.util.CsvOutStream.prototype.writeRow = function(row)
{
  var $this = this;
  row.each(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("cell","sys::Str",false),new fan.sys.Param("i","sys::Int",false)]),
    fan.sys.Void.$type,
    function(cell,i)
    {
      if (fan.sys.ObjUtil.compareGT(i,0))
      {
        $this.writeChar($this.m_delimiter);
      }
      ;
      $this.writeCell(cell);
      return;
    }));
  return fan.sys.ObjUtil.coerce(this.writeChar(10),fan.util.CsvOutStream.$type);
}
fan.util.CsvOutStream.prototype.writeCell = function(cell)
{
  var $this = this;
  if (!this.isQuoteRequired(cell))
  {
    return fan.sys.ObjUtil.coerce(this.print(cell),fan.util.CsvOutStream.$type);
  }
  ;
  this.writeChar(34);
  fan.sys.Str.each(cell,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("ch","sys::Int",false)]),
    fan.sys.Void.$type,
    function(ch)
    {
      if (fan.sys.ObjUtil.equals(ch,34))
      {
        $this.writeChar(34);
      }
      ;
      $this.writeChar(ch);
      return;
    }));
  return fan.sys.ObjUtil.coerce(this.writeChar(34),fan.util.CsvOutStream.$type);
}
fan.util.CsvOutStream.prototype.isQuoteRequired = function(cell)
{
  var $this = this;
  if (fan.sys.Str.isEmpty(cell))
  {
    return true;
  }
  ;
  if ((fan.sys.Int.isSpace(fan.sys.Str.get(cell,0)) || fan.sys.Int.isSpace(fan.sys.Str.get(cell,-1))))
  {
    return true;
  }
  ;
  return fan.sys.Str.any(cell,fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("ch","sys::Int",false)]),
    fan.sys.Bool.$type,
    function(ch)
    {
      return (fan.sys.ObjUtil.equals(ch,$this.m_delimiter) || fan.sys.ObjUtil.equals(ch,34) || fan.sys.ObjUtil.equals(ch,10) || fan.sys.ObjUtil.equals(ch,13));
    }));
}
fan.util.CsvOutStream.prototype.m_delimiter = 0;
fan.util.CsvTest = fan.sys.Obj.$extend(fan.sys.Test);
fan.util.CsvTest.prototype.$ctor = function()
{
  fan.sys.Test.prototype.$ctor.call(this);
  var $this = this;
}
fan.util.CsvTest.prototype.$typeof = function() { return fan.util.CsvTest.$type; }
fan.util.CsvTest.prototype.test = function()
{
  var $this = this;
  this.verifyCsv("one, two , three",fan.sys.List.make(fan.sys.Type.find("sys::Str[]"), [fan.sys.List.make(fan.sys.Str.$type, ["one","two","three"])]),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","util::CsvInStream",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      return;
    }));
  this.verifyCsv("one, two , three",fan.sys.List.make(fan.sys.Type.find("sys::Str[]"), [fan.sys.List.make(fan.sys.Str.$type, ["one"," two "," three"])]),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","util::CsvInStream",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_trim = false;
      return;
    }));
  this.verifyCsv("1 , 2 , 3\n5 ,   , ",fan.sys.List.make(fan.sys.Type.find("sys::Str[]"), [fan.sys.List.make(fan.sys.Str.$type, ["1","2","3"]),fan.sys.List.make(fan.sys.Str.$type, ["5","",""])]),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","util::CsvInStream",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      return;
    }));
  this.verifyCsv("1|2|3\n4|5|6",fan.sys.List.make(fan.sys.Type.find("sys::Str[]"), [fan.sys.List.make(fan.sys.Str.$type, ["1","2","3"]),fan.sys.List.make(fan.sys.Str.$type, ["4","5","6"])]),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","util::CsvInStream",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_delimiter = 124;
      return;
    }));
  this.verifyCsv("foo,\"bar\"\n\"baz\",roo\n\"abc\",\"x\"",fan.sys.List.make(fan.sys.Type.find("sys::Str[]"), [fan.sys.List.make(fan.sys.Str.$type, ["foo","bar"]),fan.sys.List.make(fan.sys.Str.$type, ["baz","roo"]),fan.sys.List.make(fan.sys.Str.$type, ["abc","x"])]),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","util::CsvInStream",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      return;
    }));
  this.verifyCsv("\" one,two \",\"_\"\"hello\"\"_ \"\n\"\"\"x\"\"\",\" ,y,\"",fan.sys.List.make(fan.sys.Type.find("sys::Str[]"), [fan.sys.List.make(fan.sys.Str.$type, [" one,two ","_\"hello\"_ "]),fan.sys.List.make(fan.sys.Str.$type, ["\"x\""," ,y,"])]),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","util::CsvInStream",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      return;
    }));
  this.verifyCsv("foo, \"bar\"\n\"baz\", roo\n\"abc\", \"x\"",fan.sys.List.make(fan.sys.Type.find("sys::Str[]"), [fan.sys.List.make(fan.sys.Str.$type, ["foo","bar"]),fan.sys.List.make(fan.sys.Str.$type, ["baz","roo"]),fan.sys.List.make(fan.sys.Str.$type, ["abc","x"])]),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","util::CsvInStream",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      return;
    }));
  this.verifyCsv("long,\"line1\nline2\"",fan.sys.List.make(fan.sys.Type.find("sys::Str[]"), [fan.sys.List.make(fan.sys.Str.$type, ["long","line1\nline2"])]),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","util::CsvInStream",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      return;
    }));
  this.verifyCsv("long with empty lines,\"line1\n\nline2\"",fan.sys.List.make(fan.sys.Type.find("sys::Str[]"), [fan.sys.List.make(fan.sys.Str.$type, ["long with empty lines","line1\n\nline2"])]),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","util::CsvInStream",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      return;
    }));
  this.verifyCsv("first;\"a\nb \"\"quote\"\"\nc;\nd\"\nsecond;\"\"\"\nline2\nline3\n\"",fan.sys.List.make(fan.sys.Type.find("sys::Str[]"), [fan.sys.List.make(fan.sys.Str.$type, ["first","a\nb \"quote\"\nc;\nd"]),fan.sys.List.make(fan.sys.Str.$type, ["second","\"\nline2\nline3\n"])]),fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("it","util::CsvInStream",false)]),
    fan.sys.Void.$type,
    function(it)
    {
      it.m_delimiter = 59;
      return;
    }));
  return;
}
fan.util.CsvTest.prototype.verifyCsv = function(src,expected,f)
{
  var $this = this;
  var $in = fan.util.CsvInStream.make(fan.sys.Str.$in(src));
  f.call($in);
  this.verifyEq($in.readAllRows(),expected);
  var i = 0;
  $in = fan.util.CsvInStream.make(fan.sys.Str.$in(src));
  f.call($in);
  while (true)
  {
    var row = $in.readRow();
    if (row == null)
    {
      break;
    }
    ;
    this.verifyEq(row,expected.get((function($this) { var $_u4 = i; i = fan.sys.Int.increment(i); return $_u4; })(this)));
  }
  ;
  this.verifyEq(fan.sys.ObjUtil.coerce(i,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(expected.size(),fan.sys.Obj.$type.toNullable()));
  i = 0;
  $in = fan.util.CsvInStream.make(fan.sys.Str.$in(src));
  f.call($in);
  $in.eachRow(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("row","sys::Str[]",false)]),
    fan.sys.Void.$type,
    function(row)
    {
      $this.verifyEq(row,expected.get((function($this) { var $_u5 = i; i = fan.sys.Int.increment(i); return $_u5; })($this)));
      return;
    }));
  this.verifyEq(fan.sys.ObjUtil.coerce(i,fan.sys.Obj.$type.toNullable()),fan.sys.ObjUtil.coerce(expected.size(),fan.sys.Obj.$type.toNullable()));
  var buf = fan.sys.Buf.make();
  var out = fan.util.CsvOutStream.make(buf.out());
  out.m_delimiter = $in.m_delimiter;
  expected.each(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("row","sys::Str[]",false)]),
    fan.sys.Void.$type,
    function(row)
    {
      out.writeRow(row);
      return;
    }));
  var str = buf.flip().readAllStr();
  $in = fan.util.CsvInStream.make(fan.sys.Str.$in(str));
  f.call($in);
  this.verifyEq($in.readAllRows(),expected);
  var sb = fan.sys.StrBuf.make();
  out = fan.util.CsvOutStream.make(sb.out());
  out.m_delimiter = $in.m_delimiter;
  expected.each(fan.sys.Func.make(
    fan.sys.List.make(fan.sys.Param.$type, [new fan.sys.Param("row","sys::Str[]",false)]),
    fan.sys.Void.$type,
    function(row)
    {
      out.writeRow(row);
      return;
    }));
  str = sb.toStr();
  $in = fan.util.CsvInStream.make(fan.sys.Str.$in(str));
  f.call($in);
  this.verifyEq($in.readAllRows(),expected);
  return;
}
fan.util.CsvTest.make = function()
{
  var self = new fan.util.CsvTest();
  fan.util.CsvTest.make$(self);
  return self;
}
fan.util.CsvTest.make$ = function(self)
{
  fan.sys.Test.make$(self);
  return;
}
fan.util.$pod = fan.sys.Pod.$add('util');
with (fan.util.$pod)
{
  fan.util.CsvInStream.$type = $at('CsvInStream','sys::InStream',[],8192);
  fan.util.CsvOutStream.$type = $at('CsvOutStream','sys::OutStream',[],8192);
  fan.util.CsvTest.$type = $at('CsvTest','sys::Test',[],8192);
  fan.util.CsvInStream.$type.$af('delimiter',73728,'sys::Int').$af('trim',73728,'sys::Bool').$af('rowWidth',67584,'sys::Int').$af('line',67584,'sys::Str?').$af('pos',67584,'sys::Int').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('$in','sys::InStream',false)])).$am('readAllRows',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('eachRow',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('f','|sys::Str[]->sys::Void|',false)])).$am('readRow',270336,fan.sys.List.make(fan.sys.Param.$type,[])).$am('parseCell',2048,fan.sys.List.make(fan.sys.Param.$type,[])).$am('parseNonQuotedCell',2048,fan.sys.List.make(fan.sys.Param.$type,[])).$am('parseQuotedCell',2048,fan.sys.List.make(fan.sys.Param.$type,[]));
  fan.util.CsvOutStream.$type.$af('delimiter',73728,'sys::Int').$am('make',8196,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('out','sys::OutStream',false)])).$am('writeRow',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('row','sys::Str[]',false)])).$am('writeCell',270336,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cell','sys::Str',false)])).$am('isQuoteRequired',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('cell','sys::Str',false)]));
  fan.util.CsvTest.$type.$am('test',8192,fan.sys.List.make(fan.sys.Param.$type,[])).$am('verifyCsv',8192,fan.sys.List.make(fan.sys.Param.$type,[new fan.sys.Param('src','sys::Str',false),new fan.sys.Param('expected','sys::Str[][]',false),new fan.sys.Param('f','|util::CsvInStream->sys::Void|',false)])).$am('make',139268,fan.sys.List.make(fan.sys.Param.$type,[]));
}
