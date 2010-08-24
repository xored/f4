grammar Fan_v1_0_;

options {
  language = Java;
}

tokens {
	Abstract = 'abstract';
	Native = 'native';
	Once = 'once';
	Override = 'override';
	Static = 'static';
	Virtual = 'virtual';
	Const = 'const';
	Final = 'final';
	ReadOnly = 'readonly';
	Using = 'using';
	As = 'as';
	Class='class';
	Enum='enum';
	Mixin='mixin';
	Public= 'public';
	Protected= 'protected';
	Private= 'private';
	Internal= 'internal';
	New = 'new';
	This = 'this';
	Super = 'super';
	It = 'it';
	Null = 'null';
	Break       =  'break';
	Continue    =  'continue';
	For         =  'for';
	If          =  'if';
	Else ='else';
	Return      =  'return';
	Throw       =  'throw';
	While       =  'while';
	Try         =  'try';
	Catch       =  'catch';
	Finally     =  'finally';
	Switch      =  'switch';
	Case        =  'case';
	Default     =  'default';
	False        =  'false';
	True     =  'true';  
	
	RangeExclOld = '...';
  RangeExcl = '..<';
  Range = '..';
  Dot = '.';
	
}

@header {
package com.xored.fanide.internal.core.parser;
import org.eclipse.dltk.ast.*;
import org.eclipse.dltk.ast.declarations.*;
import org.eclipse.dltk.ast.expressions.*;
import org.eclipse.dltk.ast.statements.*;
import org.eclipse.dltk.ast.references.*;
import com.xored.fanide.ast.*;
import com.xored.fanide.ast.declarations.*;
import com.xored.fanide.ast.typesystem.*;
import com.xored.fanide.ast.expressions.*;
import com.xored.fanide.ast.references.*;
import com.xored.fanide.ast.statements.*;
}

@members {
Object curSlot = null;
TypeDeclaration curType = null;

public FanErrorReporter reporter;
  
public ModuleDeclaration module;
  
public int length;

public ASTFactory factory;
public TokenConverter converter;

public SimpleReference convert(Token token) {
  if (token == null) return new SimpleReference(0,0,"");
  int start = converter.convert(token.getLine(), token.getCharPositionInLine());
  String text = token.getText();
  SimpleReference word = new SimpleReference(start,
      start + text.length(), text);
  return word;
}
    private int startPos() {        
        Token token = getTokenStream().LT(1);
        int offset = token.getCharPositionInLine();
        int line = token.getLine();
        int pos = converter.convert(line, offset);
        return pos;
      }
    private int endPos() {    
      Token token = getTokenStream().LT(-1);
      int offset = token.getCharPositionInLine();
      int line = token.getLine();
      int pos = converter.convert(line, offset);
      int len = 0;
      String text = token.getText();
      if (text != null) {
        len = text.length();
      }
      return pos+len;
    }
public void append(SimpleReference r1, SimpleReference r2) {
  if (r1==null || r2 ==null) return; 
  if (r1.sourceEnd() <= r2.sourceStart()) {
    r1.setEnd(r2.sourceEnd());
  } else if (r2.sourceEnd() < r1.sourceStart()) {
    r1.setStart(r2.sourceStart());
  } else {
    throw new IllegalArgumentException();
  }
  r1.setName(converter.get(r1.sourceStart(), r1.sourceEnd()));
}
public void emitErrorMessage(String msg) {
  if( reporter != null ) {
    reporter.reportMessage(msg);
  }
}
public void reportError(RecognitionException e) {
    if ( errorRecovery ) {
      return;
    }
    errorRecovery = true;
  if( reporter != null ) {
    reporter.reportError(e);
  }
}
private boolean lookupNL()
        {
          int index=input.index();
    int start=input.mark();
    
    if (index >= input.size()) {
      return true;
    }
    if(index < input.size())
    {
      // Always allowing comma as end of line might be a bit too "loose"
      // it's neeed for itBlocks Add feature
      // maybe i shoul match only when in an itBlock ?
      if(input.get(index).getType() == Comma)
        return true;
      // if next token is a BRACKET_R, that counts as a newline
      if(input.get(index).getType() == RC)
        return true;
    }
    Token token;
    boolean result=false;
    while (index > 0)
    {
      // look back in the hidden channel until we find a linebreak
      index--;
      token = input.get(index);
      if (token.getType() == EOF) {
        result=true;
        break;
      }
      if (token.getChannel() != Token.HIDDEN_CHANNEL)
      {
        /* We are out of the hidden channel, in other word we found a "real" item,
        which means we didn't find a linebreak, so we are done (false)
        */
        break;
      }
      if (token.getType() == EOL)
      {
        // found our LineBreak (true)
        result=true;
        break;
      }
    }
    if(index==0)
      result=true;
    input.rewind(start);
    return result;
}
private boolean noWhitespaceBefore()
{
    int index=input.index();
    while (index > 0)
    {
      Token token = input.get(--index);
      if (token.getChannel() == Token.DEFAULT_CHANNEL) {
        break;
      } else if (token.getType() == WS) {
        return false;
      }    
    }
    return true;
}
private boolean noNewLineBefore()
{
    int index=input.index();
    while (index > 0)
    {
      Token token = input.get(--index);
      if (token.getChannel() == Token.DEFAULT_CHANNEL) {
        break;
      } else if (token.getType() == EOL) {
        return false;
      }    
    }
    return true;
}
protected void handleRecognitionException(RecognitionException re) throws RuntimeException {
  if( reporter != null ) {
    reporter.reportError(re);
  }
  recover(input,re);
}
protected void handleThrowable(Throwable th) throws RuntimeException {
  if( reporter != null ) {
    reporter.reportThrowable(th);
  }
}
}

@lexer::header {
package com.xored.fanide.internal.core.parser; 
}

@lexer::members {
public void reportError(RecognitionException e) {
}

List tokens = new ArrayList();
public void emit(Token token) {
      this.token = token;
      tokens.add(token);
}
public Token nextToken() {
      super.nextToken();
        if ( tokens.size()==0 ) {
            return Token.EOF_TOKEN;
        }
        return (Token)tokens.remove(0);
}
}  

@rulecatch {
catch (RecognitionException re) {
  handleRecognitionException(re);
}
catch (Throwable th) {
  handleThrowable(th);
}
}

fragment
HexDigit : ('0'..'9'|'a'..'f'|'A'..'F') ;


fragment
EscapeSequence
    :   '\\' ('$'|'b'|'t'|'n'|'f'|'r'|'\"'|'\''|'\\')
    |   UnicodeEscape
    ;

fragment
UnicodeEscape
    :   '\\' 'u' HexDigit HexDigit HexDigit HexDigit
    ;
fragment Digits: '0'..'9' ('0'..'9'|'_')*;
fragment
Postfix : 'ns'|'ms'|'sec'|'min'|'hr'|'day'|'d'|'D'|'f'|'F';
fragment
Exponent : ('e'|'E') ('+'|'-')? Digits;


AtId : '@' IDSTART (IDCHAR)*;
Id : IDSTART (IDCHAR)*;
fragment IDSTART         :  'A'..'Z' | 'a'..'z' | '_';
fragment IDCHAR          :  'A'..'Z' |'a'..'z' | '_' | '0'..'9';
  


Number //IntLiteral 
options {backtrack=true;}
    :  
        d=Digits dot='.' (id=Id{
        $d.setType(Number);
        emit($d);
        $dot.setType(Dot);
        emit($dot);
        $id.setType(Id);
        emit($id);
        }
        | Digits Exponent? Postfix?)        
    |   d=Digits r='...'
        {
        $d.setType(Number);
        emit($d);
        $r.setType(RangeExclOld);
        emit($r);
        }
    |   d=Digits r='..<'
        {
        $d.setType(Number);
        emit($d);
        $r.setType(RangeExcl);
        emit($r);
        }
    |   d=Digits r='..'
        {
        $d.setType(Number);
        emit($d);
        $r.setType(Range);
        emit($r);
        }
    |   '.' Digits Exponent? Postfix?
    |   Digits Exponent? Postfix?
    |   '0' ('x'|'X') (HexDigit|'_')+               // hexal
    |   '\'' ( EscapeSequence | ~('\''|'\\') ) '\'' // character
    ;

String
    :  '"""' ( EscapeSequence | ~('\\'|'"""') )* '"""' // triple quoted
    |  'r"' ( ~('"') )* '"'
    |  '"' ( EscapeSequence | ~('\\'|'"') )* '"'
    ;
    
Uri : '`' (~('`')/*|'\\')) | EscapeSequence*/)* '`';  
  
Dsl : '<|' ( options {greedy=false;} : . )* '|>' ;

LB : '[';
RB : ']';
LP : '(';
RP : ')';
LC : '{';
RC : '}';
Comma : ',';
DoubleColon : '::';
Define : ':=';
Colon : ':';
Semi : ';';
QuArrow : '?->';
Arrow : '->';
Assign :  '=';
MulAss : '*=';
DivAss :'/=';
ModAss : '%=';
AddAss : '+=';
SubAss : '-=';
LShiftAss : '<<=' ; 
RShiftAss : '>>=';
BAndAss : '&=';
BNotAss :  '^=';
PipeAss : '|=';
QuDot : '?.';
Elvis :'?:';
Qu : '?';
Or : '||';
And : '&&';
SEq: '===';
NSEq : '!==';
Eq : '==';
NEq: '!=';
//IsNot : 'isnot';
//Is : 'is';
LShift : '<<';
RShift : '>>';
LEG :'<=>';
LE : '<=';
GE : '>=';
LT : '<';
GT : '>';
BNot : '^';
Pipe : '|';
BAnd : '&';
Incr : '++';
Decr : '--';
Add  : '+';
Sub : '-';
Mul : '*';
Div : '/';
Mod : '%';
Not : '!';
Inv : '~';
DslStart : '<|';
DslEnd : '|>';
Pound   :'#';

fragment LF // Line Feed
  : '\n'
  ;

fragment CR // Carriage Return
  : '\r'
  ;
fragment LineTerminator
  : CR | LF/* | LS | PS*/
  ;
    
EOL
  : ( ( CR LF? ) | LF/* | LS | PS*/ ) { $channel = HIDDEN; }
  ;
    
fragment TAB
  : '\u0009'
  ;

fragment VT // Vertical TAB
  : '\u000b'
  ;

fragment FF // Form Feed
  : '\u000c'
  ;

fragment SP // Space
  : '\u0020'
  ;

fragment NBSP // Non-Breaking Space
  : '\u00a0'
  ;
  
WS  : ( TAB | VT | FF | SP | NBSP/* | USP*/)+ { $channel = HIDDEN; }
    ;

DocComment
    :   '**' ( ~( LineTerminator ) )*  {$channel=HIDDEN;}
    ;

Comment
    :   '/*' ( options {greedy=false;} : . )* '*/' {$channel=HIDDEN;}
    ;

LineComment
    : '//' ( ~( LineTerminator ) )*  {$channel=HIDDEN;}
    ;


compilationUnit:
  intro? 
  (u = using {if (module!=null && u!= null) {module.addStatement(u);}})* 
  (d = typeDef {if (module!=null && d!= null) {module.addStatement(d);}})* 
  EOF
;
    
facets returns [List<FanFacetDeclaration> list = new ArrayList<FanFacetDeclaration>()]
  :
  ((AtId)=>f=facet { if (f != null) list.add(f);})*
;
 
facet returns [FanFacetDeclaration facet]
  :
  key=AtId (Assign value=expr)?
;
finally {
  if (backtracking == 0 && key != null) {
    facet = new FanFacetDeclaration();
    facet.accept(convert(key), value);
  }
}

intro : Pound Not (Div Id)*  Id;

using returns [UsingStmt using = new UsingStmt()]: 
	{using.setStart(startPos());}
	start = 'using' 
	podSpec_res = podSpec 
	{using.setPodName(podSpec_res);}
	(DoubleColon 
		typeName = Id {using.setTypeName(convert(typeName));}
    ('$' locName = Id
			{SimpleReference r = convert(typeName);
			  r.setName(r.getName() + "$");
			  r.setEnd(r.sourceEnd() + 1);
			  append(r, convert(locName));
        using.setTypeName(r);}
    )?
		('as'
			localName = Id 
			{using.setTypeName(convert(localName));}
		)?
	)? 
	eos
	{using.setEnd(endPos());}
;

podSpec returns [SimpleReference ref = null]
@init{ref = new SimpleReference(0,0,"");}: 
  {ref.setStart(startPos());}
	(ffi_res = ffi 
		{ref.setName(ref.getName()+ffi_res);}
	)?   
	f=Id
	{ref.setName(ref.getName()+f.getText());}
	(Dot 
		n=Id 
		{ref.setName(ref.getName()+"." + n.getText());}
	)*
	{ref.setEnd(endPos());}
;

ffi returns [String res] :  
LB 
i=Id
{res="{"+i.getText()+"}";} 
RB
;

// Type Def

flags returns [int flags = 0]:
    ('abstract' {flags |= FanModifiers.AccAbstract;}
  | 'const' {flags |= FanModifiers.AccConst;}
  | 'final' {flags |= FanModifiers.AccFinal;}
  | 'internal' {flags |= FanModifiers.AccInternal;}
  | 'native' {flags |= FanModifiers.AccNative;}
  | 'new' {flags |= FanModifiers.AccNew;}
  | 'once' {flags |= FanModifiers.AccOnce;}
  | 'override' {flags |= FanModifiers.AccOverride;}
  | 'private' {flags |= FanModifiers.AccPrivate;}
  | 'protected' {flags |= FanModifiers.AccProtected;}
  | 'public' {flags |= FanModifiers.AccPublic;}
  | 'readonly' {flags |= FanModifiers.AccReadOnly;}
  | 'static' {flags |= FanModifiers.AccStatic;}
  | 'virtual' {flags |= FanModifiers.AccVirtual;}
  )*
;
typeDef returns [AbstractFanTypeDeclaration decl]:
  fts=facets
  f=flags
  (c=classDef {decl = c; if (decl != null) decl.setModifiers(f);}  
  | m=mixinDef {decl = m; if (decl != null) decl.setModifiers(f|FanModifiers.AccMixin);}
  | e=enumDef {decl = e; if (decl != null) decl.setModifiers(f|FanModifiers.AccEnum);}
  )
;
finally {
  if (backtracking == 0 && decl != null && fts != null) {
    factory.handleTypeFacets(decl, fts);
  }
}

enumDef returns [EnumDeclaration decl = new EnumDeclaration()]:
  {decl.setStart(startPos());}
  'enum'
  name = Id 
  {SimpleReference nameRef=convert(name); 
  if (nameRef!=null){ 
    decl.setName(nameRef.getName());
    decl.setNameStart(nameRef.sourceStart());
    decl.setNameEnd(nameRef.sourceEnd());
  }}    
  (Colon f=ctype {if (f!=null) decl.addSuperClass(f);} 
    (Comma n=ctype {if (n!=null) decl.addSuperClass(n);})*
  )?
  LC
  enumValDefs[decl]
  ( slot = slotDef[decl.getName()] 
  {if (slot!=null) {
    decl.getStatements().add(slot);
  }}
  )*
  RC
  {decl.setEnd(endPos());}
;

classDef returns [ClassDeclaration decl = new ClassDeclaration()]:
  {decl.setStart(startPos());}
  'class'
  name = Id 
  {SimpleReference nameRef=convert(name); 
  if (nameRef!=null){ 
    decl.setName(nameRef.getName());
    decl.setNameStart(nameRef.sourceStart());
    decl.setNameEnd(nameRef.sourceEnd());
  }}    
  (Colon f=ctype {if (f!=null) decl.addSuperClass(f);} 
    (Comma n=ctype {if (n!=null) decl.addSuperClass(n);})*
  )?
  LC
  ( slot = slotDef[decl.getName()] 
  {if (slot!=null) {
    decl.getStatements().add(slot);
  }}
  )*
  RC
  {decl.setEnd(endPos());}
;

mixinDef returns [MixinDeclaration decl = new MixinDeclaration()]:
  {decl.setStart(startPos());}
  'mixin'
  name = Id 
  {SimpleReference nameRef=convert(name); 
  if (nameRef!=null){ 
    decl.setName(nameRef.getName());
    decl.setNameStart(nameRef.sourceStart());
    decl.setNameEnd(nameRef.sourceEnd());
  }}    
  (Colon f=ctype {if (f!=null) decl.addSuperClass(f);} 
    (Comma n=ctype {if (n!=null) decl.addSuperClass(n);})*
  )?
  LC
  ( slot = slotDef[decl.getName()] 
  {if (slot!=null) {
    decl.getStatements().add(slot);
  }}
  )*
  RC
  {decl.setEnd(endPos());}
;

// Slot Def

enumValDefs[EnumDeclaration decl]:
  first = enumValDef {if (decl != null) decl.addValue(first);} (
    c = Comma
    next = enumValDef {if (decl != null) decl.addValue(next);}
  )* 
  eos
;
enumValDef returns [EnumValueDeclaration value = new EnumValueDeclaration()]
@init{value.setStart(startPos());}:
  (Id)=>name=Id ((LP)=>list=args)?
  {value.setEnd(endPos());}
;
finally {
  if (backtracking == 0 && name != null) {
    SimpleReference ref = convert(name);
    value.setName(ref.getName());
    value.setNameStart(ref.sourceStart());
    value.setNameEnd(ref.sourceEnd());
    if (list != null)
      value.setInitializingArgs(list);
  }
}

slotDef [String ownerName] returns [Declaration decl = null] 
options {backtrack=true;} @init{int start=0;}
:
  ('static' LC)=>('static' block)
  | 
  fts=facets 
  {start = startPos();}
  f=flags (
    (ctype)=> type=ctype name=Id 
    (
    (LP)=>m = methodDef[type,ownerName, convert(name), fts]{decl=m;}
    |(Define)=>ff=fieldDefWithInitializer[type,convert(name), fts]{decl=ff;}
    | (LC)=>fff=fieldDef[type,convert(name), fts]{decl=fff;}
    |eos{
    SimpleReference ref = convert(name);
    decl = new FanFieldDeclaration(
		  ref.getName(),
		  ref.sourceStart(),
		  ref.sourceEnd(),
		  0,0);
  ((FanFieldDeclaration)decl).setType(type);
  }
      )
    | (Id)=>cc=ctorDef[fts] {decl=cc;}
    )
  {if (decl!=null) {
    decl.setStart(start);
    decl.setEnd(endPos());
    decl.setModifiers(f);
   }}
;
fieldDefWithInitializer [FanTypeRef type, SimpleReference name, List<FanFacetDeclaration> facets] 
returns [FanFieldDeclaration decl]
@init{decl = new FanFieldDeclaration(
	  name.getName(),
	  name.sourceStart(),
	  name.sourceEnd(),
	  0,0);
	  decl.setType(type);
	  if (facets != null)
	    factory.handleFieldFacets(decl, facets);
  }:
  Define in=expr {decl.setInitializer(in);}
  ((LC)=>getterAndSetter[decl])? 
  eos
;
fieldDef [FanTypeRef type, SimpleReference name, List<FanFacetDeclaration> facets] 
returns [FanFieldDeclaration decl]
@init{decl = new FanFieldDeclaration(
	  name.getName(),
	  name.sourceStart(),
	  name.sourceEnd(),
	  0,0);
	  decl.setType(type);
    if (facets != null)
      factory.handleFieldFacets(decl, facets);
  }:
  (LC)=>getterAndSetter[decl]
  eos
;
getterAndSetter [FanFieldDeclaration base]
  :
  LC (((get)=>getter=fieldGetter (setter=fieldSetter)?)|(setter=fieldSetter (getter=fieldGetter)?)
  ) 
  RC
;
finally {
  if (backtracking == 0) {
    if (getter != null)
      base.setGetter(getter);
    if (setter != null)
      base.setSetter(setter);
  }
}

fieldGetter returns [FanGetterOrSetterDeclaration getter]
@init{int start = startPos();}
@after{if (getter != null) getter.setEnd(endPos());}
  :
  get {getter = new FanGetterOrSetterDeclaration(start, "get");}
  (eos | bl=block {getter.setBody(bl);})
;

fieldSetter returns [FanGetterOrSetterDeclaration setter]
@init{int start = startPos();}
@after{if (setter != null) { setter.setEnd(endPos()); setter.setModifiers(f); }}
  :
  f=flags set {setter = new FanGetterOrSetterDeclaration(start, "set");}
  (eos | bl=block {setter.setBody(bl);})
;
get      : t=Id {t.getText().equals("get")}?;
set      : t=Id {t.getText().equals("set")}?;

methodDef [FanTypeRef type, String ownerName, SimpleReference name, List<FanFacetDeclaration> facets] 
returns [FanMethodDeclaration decl]
@init{decl = new FanMethodDeclaration(
	  name.getName(),
	  name.sourceStart(),
	  name.sourceEnd(),
	  0,0);
	  decl.setDeclaringTypeName(ownerName);
	  decl.setType(type);
    if (facets != null)
      factory.handleMethodFacets(decl, facets);
  }:
	LP
		(f=param {decl.addArgument(f);}
		((Comma)=> Comma 
		n=param {decl.addArgument(n);})*)?
	RP
	body=methodBody  {decl.acceptBody(body);}
;

param returns [FanArgument arg = new FanArgument()] : 
	{arg.setStart(startPos());}  
	   ((ctype)=>t=ctype {arg.setType(t);} (name=Id)?
	|  (Id)=>name=Id)
	(Define in=expr)?
	{arg.setEnd(endPos());} 
;
finally {
  if (backtracking == 0) {
    SimpleReference nameRef=convert(name); 
	  if (nameRef != null) {
	    arg.setName(nameRef.getName());
	    arg.setNameStart(nameRef.sourceStart());
	    arg.setNameEnd(nameRef.sourceEnd());
	  }
    if (t != null)
      arg.setType(t);
    if (in != null)
      arg.setInitializationExpression(in);
  }
}

methodBody returns  [Block bl = new Block();]
@init{bl.setStart(startPos());}
@after{bl.setEnd(endPos());}:
	(LC)=>
	( 
    lc = LC
    (s=stmt {bl.addStatement(s);})*
    rc = RC
  ) | eos
;
ctorDef[List<FanFacetDeclaration> facets] returns [FanConstructorDeclaration decl]
@init{decl = new FanConstructorDeclaration("",0,0,0,0);}:
	name = Id  
	{SimpleReference nameRef=convert(name); 
	  if (nameRef!=null){ 
	    decl.setName(nameRef.getName());
	    decl.setNameStart(nameRef.sourceStart());
	    decl.setNameEnd(nameRef.sourceEnd());
    }
    if (facets != null)
      factory.handleMethodFacets(decl, facets);
  }
	LP
		(f=param {decl.addArgument(f);}
		((Comma)=> Comma 
		n=param {decl.addArgument(n);})*)?
	RP
  (ch=ctorChain {decl.setCtorChain(ch);})?
  body=methodBody {decl.acceptBody(body);}
;

ctorChain returns [CallExpr expr]
  :
  Colon (ex=ctorChainThis | ex=ctorChainSuper) {expr=ex;}
;

ctorChainThis returns [CallExpr expr]
  :
  thref=thisRef
  Dot
  name=simpleRef
  list=args
;
finally {
  if (backtracking == 0) {
    Expression ex = factory.handleIdAccess(thref,name,null);
    expr = (CallExpr)factory.handleCallArgs(ex,list,null);
  }
}

ctorChainSuper returns [CallExpr expr]
  :
  sref=superRef
  (Dot name=simpleRef)?
  list=args
;
finally {
  if (backtracking == 0) {
    Expression ex = null;
    if (name != null)
      ex = factory.handleIdAccess(sref,name,null);
    else
      ex = sref;
    expr = (CallExpr)factory.handleCallArgs(ex,list,null);
  }
}

args returns [CallArgumentsList list]
@init{
  List<Expression> args = new ArrayList<Expression>();
}
:
  lp=LP 
  ( f=expr {args.add(f);}
    ( Comma 
      n=expr {args.add(n);}
    )*
  )? 
  rp=RP
;
finally {
  if (backtracking==0) {
    list = factory.makeCallArgs(lp, args, rp);
  }
}

//----------------------------------------------------------------------
// Statements
//----------------------------------------------------------------------
block returns [Block stmt]
  :  
  lc=LC 
  list=stmts
  rc=RC
  ;
finally {
  stmt = factory.makeBlock(lc,list,rc);
}
//----------------------------------------------------------------------
blockOrSingleStmt returns [Statement stmt]:  
    (LC) => bl=block {stmt = bl;}
  | single=stmt {stmt = single;}
  ;
//----------------------------------------------------------------------
stmts returns [StmtList stmt]
@init{
List<Statement> list = new ArrayList<Statement>();
} :
  (
    s=stmt {list.add(s);}
  )*
  ;
finally {
  stmt = factory.makeStmtList(list);
}
//----------------------------------------------------------------------
stmt returns [Statement stmt]
  :  
    ('break')=>
    brs=breakStmt     {stmt=brs;}
  | ('continue')=>
    cos=continueStmt  {stmt=cos;}
  | ('for')=>
    fos=forStmt       {stmt=fos;}
  | ('if')=>
    ifs=ifStmt        {stmt=ifs;}
  | ('return')=>
    res=returnStmt    {stmt=res;}
  | ('switch')=>
    sws=switchStmt    {stmt=sws;}
  | ('throw')=>
    ths=throwStmt     {stmt=ths;}
  | ('while')=>
    whs=whileStmt     {stmt=whs;}
  | ('try')=>
    trs=tryStmt       {stmt=trs;}
  | les=locOrExprStmt {stmt=les;}
  ;
//----------------------------------------------------------------------
locOrExprStmt returns [Statement stmt]  options { backtrack = true; }:
    (Id Define)=>s1=inferredTypedLocalDefStmt{stmt=s1;}
  | (ctype Id Define)=>s2=localDefStmt{stmt=s2;}
  | s3=exprStmt{stmt=s3;}
;
//----------------------------------------------------------------------
localDefStmt returns [ExpressionStmt stmt = new ExpressionStmt()]:
	d = localDef {stmt.setExpression(d); 
	stmt.setStart(d.sourceStart());
	stmt.setEnd(d.sourceEnd());}
	eos
;
//----------------------------------------------------------------------
inferredTypedLocalDefStmt returns [ExpressionStmt stmt = new ExpressionStmt()]:
	d=inferredTypedLocalDef {stmt.setExpression(d); 
	stmt.setStart(d.sourceStart());
	stmt.setEnd(d.sourceEnd());}
	eos
;
//----------------------------------------------------------------------
locOrExpr returns [Expression s] options { backtrack = true; }:
    s1=localDef{s=s1;}
  | s2=inferredTypedLocalDef{s=s2;}
  | s3=expr{s=s3;}
;
//----------------------------------------------------------------------
localDef returns [LocalVariableDef def = new LocalVariableDef()]
@init{def.setStart(startPos());}
@after{def.setEnd(endPos());}:
	t=ctype {def.setType(t);}
	name=Id {def.setName(convert(name));}
	(Define in=expr {def.setInitializer(in);})?
;
//----------------------------------------------------------------------
inferredTypedLocalDef returns [LocalVariableDef def = new LocalVariableDef()]
@init{def.setStart(startPos());}
@after{def.setEnd(endPos());}:
	name=Id {def.setName(convert(name));}
	Define 
	in=expr {def.setInitializer(in);}
;
//----------------------------------------------------------------------
breakStmt returns [BreakStmt stmt]
  :
  breakKw='break'
  semi=eos
  ;
finally {
  stmt = factory.makeBreakStmt(breakKw,semi);
}
//----------------------------------------------------------------------
continueStmt returns [ContinueStmt stmt]
  :
  continueKw='continue'
  semi=eos
  ;
finally {
  stmt = factory.makeContinueStmt(continueKw,semi);
}
//----------------------------------------------------------------------
forStmt returns [ForStmt stmt]
  :
  forKw='for'
  lp=LP
  init=forInit
  (Semi)=>
  semi1=Semi
  cond=expr?
  (Semi)=>
  semi2=Semi
  incr=expr?
  rp=RP
  body=blockOrSingleStmt
  ;
finally {
  stmt = factory.makeForStmt(forKw,lp,init,semi1,cond,semi2,incr,rp,body);
}
forInit returns [Expression expr]:
  (e=locOrExpr {expr = e;})?
  ;
//----------------------------------------------------------------------
ifStmt returns [IfStmt stmt]
  :
  ifKw='if'
  lp=LP
  cond=expr
  rp=RP
  thenBody=blockOrSingleStmt
  (('else')=>
    elseKw='else'
    elseBody=blockOrSingleStmt
  )?
  ;
finally {
  stmt = factory.makeIfStmt(ifKw,lp,cond,rp,thenBody,elseKw,elseBody);
}
//----------------------------------------------------------------------
returnStmt returns [ReturnStmt stmt]
  :
  returnKw='return'
  ((eos)=>|
    returned=expr
  )?
  semic=eos
  ;
finally {
  stmt = factory.makeReturnStmt(returnKw,returned,semic);
}
//----------------------------------------------------------------------
throwStmt returns [ThrowStmt stmt]
  :
  throwKw='throw'
  thrown=expr
  semic=eos
  ;
finally {
  stmt = factory.makeThrowStmt(throwKw,thrown,semic);
}
//----------------------------------------------------------------------
whileStmt returns [WhileStmt stmt]
  :
  whileKw='while' 
  lp=LP 
  cond=expr 
  rp=RP 
  body=blockOrSingleStmt
  ;
finally {
  stmt = factory.makeWhileStmt(whileKw,lp,cond,rp,body);
}
//----------------------------------------------------------------------
exprStmt returns [ExpressionStmt s = new ExpressionStmt()]
@init{s.setStart(startPos());}
@after{s.setEnd(endPos());}:
  ee=expr {s.setExpression(ee);} 
  (Comma ((eos)=>|expr)?)* 
  eos
  ;
//----------------------------------------------------------------------
tryStmt returns [TryStmt stmt]
@init{
List<CatchStmt> catches = new ArrayList<CatchStmt>();
}
  :
  tryKw='try'
  body=blockOrSingleStmt
  (('catch')=>
    c=catchStmt {catches.add(c);}
  )*
  (('finally')=>
    f=finallyStmt
  )?
  ;
finally {
  stmt = factory.makeTryStmt(tryKw,catches,f);
}
catchStmt returns [CatchStmt stmt]
  :
  catchKw='catch'
  ((LP)=>
    lp=LP
    type=ctype
    id=Id
    rp=RP
  )?
  body=blockOrSingleStmt
  ;
finally {
  stmt = factory.makeCatchStmt(catchKw,lp,type,id,rp,body);
}
finallyStmt returns [FinallyStmt stmt]
  :
  finallyKw='finally'
  body=blockOrSingleStmt
  ;
finally {
  stmt = factory.makeFinallyStmt(finallyKw,body);
}
//----------------------------------------------------------------------
switchStmt returns [SwitchStmt stmt]
@init{
List<CaseStmt> cases = new ArrayList<CaseStmt>();
}
  :
  switchKw='switch'
  lp=LP
  e=expr
  rp=RP
  lc=LC
  (c=caseStmt {cases.add(c);})*
  (d=defaultStmt)?
  rc=RC
  ;
finally {
  stmt = factory.makeSwitchStmt(switchKw,lp,e,rp,lc,cases,d,rc);
}

caseStmt returns [CaseStmt stmt]
  :
  caseKw='case'
  ex=expr
  colon=Colon
  body=stmts
  ;
finally {
  stmt = factory.makeCaseStmt(caseKw,ex,colon,body);
}
defaultStmt returns [DefaultStmt stmt]
  :
  defaultKw='default'
  colon=Colon
  body=stmts
  ;
finally {
  stmt = factory.makeDefaultStmt(defaultKw,colon,body);
}
//----------------------------------------------------------------------
// Type Definition
//----------------------------------------------------------------------
ctype returns [FanTypeRef ref]
  : (
      (Id)   => st=simpleType {ref=st;}
    | (LB)   => LB br=ctype RB {ref=br;}
    | (Pipe) => func=funcType {ref=func;}
  )
  ({noWhitespaceBefore()}?=> Qu {ref.setNullable(true);})? 
  (
    (LB)=>lb=LB rb=RB 
    {
      ArrayTypeRef array = factory.makeArrayTypeRef(ref,lb,rb);
      ref = array;
    }
  )* 
  (
    {noWhitespaceBefore()}?=>colon=Colon 
    valueType=ctype
    {
      MapTypeRef map = factory.makeMapTypeRef(ref,colon,valueType);
      ref = map;
    }
  )? 
  ({noWhitespaceBefore()}?=> Qu {ref.setNullable(true);})?
  ;
  
//----------------------------------------------------------------------
simpleType returns [SimpleTypeRef ref]
  :  
  (
    podName=Id 
    dc=DoubleColon
  )?
  typeName=Id
  ;
finally {
  if (backtracking==0) ref = factory.makeSimpleTypeRef(podName,dc,typeName);
}
//----------------------------------------------------------------------
funcType returns [FuncTypeRef ref]
@init {
  FanTypeRef returnedType = null;
  List<FuncTypeRef.Param> params = new ArrayList<FuncTypeRef.Param>();
} : 
  startPipe=Pipe
  (
    Comma
  | arrow=Arrow returnedType1=ctype {returnedType=returnedType1;}
  | firstParam=funcTypeParam {params.add(firstParam);}
      (Comma nextParam=funcTypeParam {params.add(nextParam);})* 
      (Arrow returnedType2=ctype {returnedType=returnedType2;})?
  )
  endPipe=Pipe
  ;
finally {
  if (backtracking==0) ref = factory.makeFuncTypeRef(startPipe,params,returnedType,endPipe);
}
//----------------------------------------------------------------------
funcTypeParam returns [FuncTypeRef.Param ref]
@init{
  Token paramName = null;
} : 
  (Id|Pipe|LB)=>(
    type=ctype  
    (id1=Id {paramName=id1;})?
  )
  | id2=Id {paramName=id2;} 
;
finally {
  if (backtracking==0) ref = factory.makeFuncTypeParamRef(type,paramName);
}

//----------------------------------------------------------------------
// Expressions
//----------------------------------------------------------------------
expr returns [Expression ex] :  
  asex = assignExpr {ex = asex;}
;
assignExpr returns[Expression ex] :  
  f=ternaryExpr {ex = f;} ((Assign|MulAss|DivAss| ModAss | AddAss | 
                      SubAss | LShiftAss | RShiftAss  |
                     BAndAss | BNotAss | PipeAss)=>kind = assignOp s=assignExpr
  {
    BinaryExpression binary = new BinaryExpression();
    if (ex!=null) {
      binary.setFirst(ex);
      binary.setStart(ex.sourceStart());
    }
    if (s!=null) {
      binary.setSecond(s);
      binary.setEnd(s.sourceEnd());
    }
    binary.setKind(kind);
    ex = binary;
  }   
  )*;
                     
assignOp returns[int kind] :  
    Assign {kind = FanExpressionConstants.E_ASSIGN;}
  | MulAss  {kind = FanExpressionConstants.E_MULT_ASSIGN;}
  | DivAss  {kind = FanExpressionConstants.E_DIV_ASSIGN;}
  | ModAss  {kind = FanExpressionConstants.E_MOD_ASSIGN;}
  | AddAss  {kind = FanExpressionConstants.E_PLUS_ASSIGN;}
  | SubAss  {kind = FanExpressionConstants.E_MINUS_ASSIGN;}
  | LShiftAss  {kind = FanExpressionConstants.E_SL_ASSIGN;}
  | RShiftAss   {kind = FanExpressionConstants.E_SR_ASSIGN;}
  | BAndAss  {kind = FanExpressionConstants.E_BAND_ASSIGN;}
  | BNotAss  {kind = FanExpressionConstants.E_BNOT_ASSIGN;}
  | PipeAss {kind = FanExpressionConstants.E_BOR_ASSIGN;}
  ;
ternaryExpr returns[Expression ex] @init{TernaryExpression ternary = null;}:  
  first = condOrExpr {ex = first;}
  ((Qu)=>Qu {
    ternary = new TernaryExpression();
    ternary.setKind(FanExpressionConstants.E_CONDITIONAL);
    if (first!=null) {
      ternary.setFirst(first);
      ternary.setStart(first.sourceStart());
    }
  }
  second = condOrExpr {
    if (second!=null) {
       ternary.setSecond(second);
    }
  } 
  Colon 
  third =condOrExpr {
    if (third!=null) {
	    ternary.setThird(third);
	    ternary.setStart(third.sourceStart());
    }
  }
  )?
  ;
condOrExpr  returns[Expression ex]  :  
  f= condAndExpr  {ex = f;}
  (Or s=condAndExpr
    {
    BinaryExpression binary = new BinaryExpression();
    if (ex!=null) {
      binary.setFirst(ex);
      binary.setStart(ex.sourceStart());
    }
    if (s!=null) {
      binary.setSecond(s);
      binary.setEnd(s.sourceEnd());
    }
    binary.setKind(FanExpressionConstants.E_BOR);
    ex = binary;
  } 
  )*
  ;
condAndExpr  returns[Expression ex]  :  
  f =equalityExpr  {ex = f;}
  (And s=equalityExpr
    {
    BinaryExpression binary = new BinaryExpression();
    if (ex!=null) {
      binary.setFirst(ex);
      binary.setStart(ex.sourceStart());
    }
    if (s!=null) {
      binary.setSecond(s);
      binary.setEnd(s.sourceEnd());
    }
    binary.setKind(FanExpressionConstants.E_BAND);
    ex = binary;    
    }
  )*
  ;
equalityExpr  returns[Expression ex] @init {int kind = 0;}:  
  f=relationalExpr {ex = f;}
((Eq | NEq | SEq | NSEq)=>
  ( Eq {kind = FanExpressionConstants.E_EQUAL;} 
  | NEq  {kind = FanExpressionConstants.E_NOT_EQUAL;}
  | SEq  {kind = FanExpressionConstants.E_SAME;}
  | NSEq {kind = FanExpressionConstants.E_NOT_SAME;}
  ) 
  s=relationalExpr
    {
    BinaryExpression binary = new BinaryExpression();
    if (ex!=null) {
      binary.setFirst(ex);
      binary.setStart(ex.sourceStart());
    }
    if (s!=null) {
      binary.setSecond(s);
      binary.setEnd(s.sourceEnd());
    }
    binary.setKind(kind);
    ex = binary;
    }
  )*
;

relationalExpr returns[Expression ex] @init {int kind = 0;}:   
  f=elvisExpr {ex = f;}
  (   ( 'isnot'{kind = FanExpressionConstants.E_ISNOT;} 
      | 'is'{kind = FanExpressionConstants.E_IS;} 
      | 'as'{kind = FanExpressionConstants.E_AS;} 
      ) t = ctype 
		    {
		    BinaryExpression binary = new BinaryExpression();
		    if (ex!=null) {
		      binary.setFirst(ex);
		      binary.setStart(ex.sourceStart());
		    }
		    if (s!=null) {
		      binary.setSecond(t);
		      binary.setEnd(t.sourceEnd());
		    }
		    binary.setKind(kind);
		    ex = binary;
		    }
    | (
      ( LEG{kind = FanExpressionConstants.E_COMPARE;}
      | LE{kind = FanExpressionConstants.E_LE;}
      | LT{kind = FanExpressionConstants.E_LT;}
      | GE{kind = FanExpressionConstants.E_GE;}
      | GT{kind = FanExpressionConstants.E_GT;}
      ) s=elvisExpr
        {
        BinaryExpression binary = new BinaryExpression();
        if (ex!=null) {
          binary.setFirst(ex);
          binary.setStart(ex.sourceStart());
        }
        if (s!=null) {
          binary.setSecond(s);
          binary.setEnd(s.sourceEnd());
        }
        binary.setKind(kind);
        ex = binary;
        }
   )*
  )
;
  
elvisExpr returns[Expression ex]:  
  f=rangeExpr {ex = f;}
  (Elvis s=rangeExpr
        {
        BinaryExpression binary = new BinaryExpression();
        if (ex!=null) {
          binary.setFirst(ex);
          binary.setStart(ex.sourceStart());
        }
        if (s!=null) {
          binary.setSecond(s);
          binary.setEnd(s.sourceEnd());
        }
        binary.setKind(FanExpressionConstants.E_ELVIS);
        ex = binary;
        }
  )?
  ;
rangeExpr returns[Expression ex] @init {int kind = 0;}:
  f=bitOrExpr {ex = f;}
  ((  RangeExclOld {kind = FanExpressionConstants.E_RANGE_EXCL;}
    | RangeExcl{kind = FanExpressionConstants.E_RANGE;}
    | Range{kind = FanExpressionConstants.E_RANGE;}
    ) 
  s=bitOrExpr
      {
        BinaryExpression binary = new BinaryExpression();
        if (ex!=null) {
          binary.setFirst(ex);
          binary.setStart(ex.sourceStart());
        }
        if (s!=null) {
          binary.setSecond(s);
          binary.setEnd(s.sourceEnd());
        }
        binary.setKind(kind);
        ex = binary;
      }
  )*
  ;
bitOrExpr returns[Expression ex]  @init {int kind = 0;}:  
  f=bitAndExpr {ex = f;}
  ((BNot | Pipe)=>(
      BNot {kind = FanExpressionConstants.E_BNOT;}
    | Pipe{kind = FanExpressionConstants.E_BOR;}
  ) 
  s=bitAndExpr
      {
        BinaryExpression binary = new BinaryExpression();
        if (ex!=null) {
          binary.setFirst(ex);
          binary.setStart(ex.sourceStart());
        }
        if (s!=null) {
          binary.setSecond(s);
          binary.setEnd(s.sourceEnd());
        }
        binary.setKind(kind);
        ex = binary;
      })*
  ;
bitAndExpr returns[Expression ex] :  
  f=shiftExpr  {ex = f;}
  ((BAnd)=>BAnd 
    s=shiftExpr
      {
        BinaryExpression binary = new BinaryExpression();
        if (ex!=null) {
          binary.setFirst(ex);
          binary.setStart(ex.sourceStart());
        }
        if (s!=null) {
          binary.setSecond(s);
          binary.setEnd(s.sourceEnd());
        }
        binary.setKind(FanExpressionConstants.E_BAND);
        ex = binary;
      }
  )*;
shiftExpr returns[Expression ex] @init {int kind = 0;}: 
  f=addExpr  {ex = f;} (
  ( LShift {kind = FanExpressionConstants.E_LSHIFT;}
  | RShift{kind = FanExpressionConstants.E_RSHIFT;}
  ) 
    s=addExpr
      {
        BinaryExpression binary = new BinaryExpression();
        if (ex!=null) {
          binary.setFirst(ex);
          binary.setStart(ex.sourceStart());
        }
        if (s!=null) {
          binary.setSecond(s);
          binary.setEnd(s.sourceEnd());
        }
        binary.setKind(kind);
        ex = binary;
      }
  )*
;
addExpr returns[Expression ex] @init {int kind = 0;}:   
  f=multExpr  {ex = f;} (
  (Add | Sub)=>(
      Add {kind = FanExpressionConstants.E_PLUS;}
    | Sub{kind = FanExpressionConstants.E_MINUS;}
  ) s=multExpr
      {
        BinaryExpression binary = new BinaryExpression();
        if (ex!=null) {
          binary.setFirst(ex);
          binary.setStart(ex.sourceStart());
        }
        if (s!=null) {
          binary.setSecond(s);
          binary.setEnd(s.sourceEnd());
        }
        binary.setKind(kind);
        ex = binary;
      }
  )*
;
multExpr returns[Expression ex] @init {int kind = 0;}:  
  f=unaryExpr  {ex = f;}
  ((
      Mul {kind = FanExpressionConstants.E_MULT;}
    | Div {kind = FanExpressionConstants.E_DIV;}
    | Mod{kind = FanExpressionConstants.E_MOD;}
    ) 
  s=unaryExpr
      {
        BinaryExpression binary = new BinaryExpression();
        if (ex!=null) {
          binary.setFirst(ex);
          binary.setStart(ex.sourceStart());
        }
        if (s!=null) {
          binary.setSecond(s);
          binary.setEnd(s.sourceEnd());
        }
        binary.setKind(kind);
        ex = binary;
      }
 )*;
unaryExpr  returns[Expression ex]
    :   a=Add u1 = unaryExpr {
          UnaryExpression uu1 = new UnaryExpression(); 
          uu1.setStart(convert(a).sourceStart());
	        if (u1!=null) {
	          uu1.setOperand(u1);
	          uu1.setEnd(u1.sourceEnd());
	        }
          uu1.setKind(FanExpressionConstants.E_PLUS);
          ex= uu1;
        }
    |   s=Sub u2 = unaryExpr {
          UnaryExpression uu2 = new UnaryExpression();
          if (s != null) 
            uu2.setStart(convert(s).sourceStart());
          if (u2!=null) {
            uu2.setOperand(u2);
            uu2.setEnd(u2.sourceEnd());
          }
          uu2.setKind(FanExpressionConstants.E_MINUS);
          ex= uu2;
        }
    |   i=Incr u3 = unaryExpr {
          UnaryExpression uu3 = new UnaryExpression();
          if (i != null) 
            uu3.setStart(convert(i).sourceStart());
          if (u3!=null) {
            uu3.setOperand(u3);
            uu3.setEnd(u3.sourceEnd());
          }
          uu3.setKind(FanExpressionConstants.E_INC);
          ex= uu3;
        }
    |   d=Decr u4 = unaryExpr {
          UnaryExpression uu4 = new UnaryExpression();
          if (d != null) 
            uu4.setStart(convert(d).sourceStart());
          if (u4!=null) {
            uu4.setOperand(u4);
            uu4.setEnd(u4.sourceEnd());
          }
          uu4.setKind(FanExpressionConstants.E_DEC);
          ex= uu4;
        }
    |   u4 = unaryExprNotPlusMinus {ex = u4;}
    ;

unaryExprNotPlusMinus returns[Expression ex] options {backtrack  =true;}
    :   i=Inv u1=unaryExpr{
          UnaryExpression uu1 = new UnaryExpression();
          if (i != null) 
            uu1.setStart(convert(i).sourceStart());
          if (u1!=null) {
            uu1.setOperand(u1);
            uu1.setEnd(u1.sourceEnd());
          }
          uu1.setKind(FanExpressionConstants.E_TILDE);
          ex= uu1;
        }
    |   n=Not u2=unaryExpr {
          UnaryExpression uu2 = new UnaryExpression();
          if (n != null) 
            uu2.setStart(convert(n).sourceStart());
          if (u2!=null) {
            uu2.setOperand(u2);
            uu2.setEnd(u2.sourceEnd());
          }
          uu2.setKind(FanExpressionConstants.E_LNOT);
          ex= uu2;
        }
    |   b=BAnd u3=unaryExpr {
          UnaryExpression uu3 = new UnaryExpression();
          if (b != null) 
            uu3.setStart(convert(b).sourceStart());
          if (u3!=null) {
            uu3.setOperand(u3);
            uu3.setEnd(u3.sourceEnd());
          }
          uu3.setKind(FanExpressionConstants.E_BAND);
          ex= uu3;
        }
    |   u4=castExpr {ex = u4;}
    |   u5=termExpr {ex = u5;} ((Incr)=>ii=Incr{
	          UnaryExpression uu5 = new UnaryExpression();
	          if (ii != null) 
	            uu5.setEnd(convert(ii).sourceEnd());
	          if (u5!=null) {
	            uu5.setOperand(u5);
	            uu5.setStart(u5.sourceStart());
	          }
	          uu5.setKind(FanExpressionConstants.E_INC);
	          ex= uu5;
	        }
        |(Decr)=>dd=Decr{
          UnaryExpression uu6 = new UnaryExpression();
          if (dd != null) 
            uu6.setEnd(convert(dd).sourceEnd());
          if (u5!=null) {
            uu6.setOperand(u5);
            uu6.setStart(u5.sourceStart());
          }
          uu6.setKind(FanExpressionConstants.E_DEC);
          ex= uu6;
        }
      )?
;

castExpr  returns[Expression ex]
    :  (l=LP c=ctype r=RP) u1=unaryExpr {
          UnaryExpression uu1 = new UnaryExpression();
          if (l != null)  
            uu1.setStart(convert(l).sourceStart());
          if (r != null)
            uu1.setEnd(convert(r).sourceEnd());
          if (c!=null) {
            uu1.setOperand(c);
          }
          uu1.setKind(FanExpressionConstants.E_CAST);
          ex= uu1;
        }
    ;

termExpr  returns[Expression ex]:
  base = termBaseExpr {ex=base;}
  ((Dot|Arrow|QuDot|QuArrow|LP|LC|LB)=>
    next=termChainExpr[base] {ex=base=next;}
  )*
;

termBaseExpr returns [Expression ex] :  
  nl=numberLiteral {ex=nl;}
  | sl=stringLiteral {ex=sl;}
  | ul=uriLiteral {ex=ul;}
  | nu=nullLiteral {ex=nu;}
  | sr=superRef {ex=sr;}
  | tr=thisRef {ex=tr;}
  | ir=itRef {ex=ir;}
  | bl=boolLiteral {ex=bl;}
  | ds=dslLiteral {ex=ds;}
  | (Pound)=>slit=slotWithoutTypeLit {ex=slit;}
  | (ctype Pound)=>sot=slotOrTypeLiteral {ex=sot;}
  | (simpleType LC)=>stCall=callExprWithoutArgs {ex=stCall;}
  | (idNotType)=>ie=idExpr[null] {ex=ie;}
  | cl=closure {ex=cl;}
  | (ctype)=> r=ctype { ex=r; }
  | (LB)=> lm=listOrMap {ex=lm;}
  | (LP)=> pe=parenExpr {ex=pe;}
;

idNotType:
    (AtId | Id)
    (
      ((LB)=>LB ~(Comma|Colon))
    | ~(Colon|DoubleColon)
    )
;

callExprWithoutArgs returns [Expression ex]
  :
  st=simpleType
  cl=itBlock
;
finally {
  if (backtracking==0 && st != null && cl != null) {
    ex = factory.handleIdAccess(st,st.getType(),cl);
  }
}

slotWithoutTypeLit returns [SlotLiteral literal]:
  Pound
  slot=Id {literal = factory.makeSlotLiteral(slot, null);}
;

slotOrTypeLiteral returns [Literal literal]:
    r=ctype
    p=Pound
    (slot=Id)?
;
finally {
  if (backtracking == 0 && r != null) {
    if (slot != null)
      literal = factory.makeSlotLiteral(slot, r);
    else
      literal = factory.makeTypeLiteral(r);
  }
}

parenExpr returns [UnaryExpression expr]
  :
  lp=LP
  ex=expr
  rp=RP
  ;
finally {
  if (backtracking==0) expr = factory.makeParenExpr(lp,ex,rp);
}

itRef returns [ItReference ref]
  :
  token='it'
  ;
finally {
  if (backtracking==0) ref = factory.makeItRef(token);
}

thisRef returns [ThisReference ref]
  :
  token='this'
  ;
finally {
  if (backtracking==0) ref = factory.makeThisRef(token);
}

superRef returns [SuperReference ref]
  :
  token='super'
  ;
finally {
  if (backtracking==0) ref = factory.makeSuperRef(token);
}

stringLiteral returns [StrLiteral literal]
  :
  token=String
  ;
finally {
  if (backtracking==0) literal = factory.makeStrLiteral(token);
}

nullLiteral returns [NullLiteral literal]
  :
  token='null'
  ;
finally {
  if (backtracking==0) literal = factory.makeNullLiteral(token);
}

uriLiteral returns [UriLiteral literal]
  :
  token=Uri
  ;
finally {
  if (backtracking==0) literal = factory.makeUriLiteral(token);
}

numberLiteral returns [Literal literal]
  :
  token=Number
  ;
finally {
  if (backtracking==0) literal = factory.makeNumberLiteral(token);
}

dslLiteral returns [DslLiteral literal]
  :
  token=Dsl
  ;
finally {
  if (backtracking==0) literal = factory.makeDslLiteral(token);
}

boolLiteral returns [BoolLiteral literal]
@init {
  Token token = null;
} :
    t='true' {token=t;}
  | f='false' {token=f;}
  ;
finally {
  if (backtracking==0) literal = factory.makeBoolLiteral(token);
}

termChainExpr [Expression base] returns [Expression ex]
  :  
    d=Dot (ex2=superCallExpr[base]|ex2=idExprIndex[base] {ex=ex2;})
  | a=Arrow ex3=idExprIndex[base] {ex=ex3;}
  | qd=QuDot ex4=idExprIndex[base] {ex=ex4;}
  | qa=QuArrow ex5=idExprIndex[base] {ex=ex5;}
  | (LB)=>lm=listOrMap {ex=factory.makeTypedMapOrList(base,lm);}
  | {noNewLineBefore()}?=> ex8=callArgs[base] {ex=ex8;}
;

superCallExpr[Expression base] returns [Expression ex]
  :
  sr=superRef
;
finally {
  if (backtracking == 0 && sr != null) {
    ex = factory.handleSuperAccess(base, sr);
  }
}

idExpr [Expression base] returns[Expression ex]
  :
    fs=fieldStorage[base] {ex=fs;}
  | ia=idAccess[base] {ex=ia;}
  ;
  
simpleRef returns[SimpleReference ex]
  :
  name=Id
  ;
finally {
  if (backtracking==0) ex = factory.makeSimpleReference(name);
}

idAccess [Expression base] returns[Expression ex]
  :
  name=simpleRef
  (
    (closure)=>cl=closure
  )?
  ;
finally {
  if (backtracking==0) ex = factory.handleIdAccess(base,name,cl);
}

idExprIndex [Expression base] returns [Expression expr]
  :
    ex=fieldStorage[base]
  | ex=idAccess[base]
  (
    (LB)=>(
		  lb=LB
		  index=expr
		  rb=RB
    )
  )?
;
finally {
  if (backtracking==0) {
    if (index != null && ex != null)
      expr = factory.makeIndexExpr(ex,lb,index,rb);
    else
      expr = ex;
  }
}

fieldStorage [Expression base] returns [FieldStorage fs]
  :
  name=AtId
  ;
finally {
  if (backtracking==0) fs = factory.makeFieldStorage(base,name);
}

itBlock returns [Closure closure = new Closure()]:
  b=block
;
finally {
  if (backtracking==0 && b != null) {
    int end = b.sourceEnd();
    closure.setStart(b.sourceStart());
    closure.setEnd(end);
    closure.setBody(b);
  }
}

callArgs [Expression base] returns [Expression ex]
@init{
  List<Expression> args = new ArrayList<Expression>();
}
:
  lp=LP 
  ( f=expr {args.add(f);}
    ( Comma 
      n=expr {args.add(n);}
    )*
  )? 
  rp=RP
  (   (funcType)=>cl=closure
    | (LC)=>cl=itBlock
  )?
;
finally {
  if (backtracking==0) {
    CallArgumentsList list = factory.makeCallArgs(lp, args, rp);
    ex = factory.handleCallArgs(base,list,cl);
  }
}

closure returns [Closure closure]
: 
  ft=funcType
  b=block
  ;
finally {
  if (backtracking==0) closure = factory.makeClosure(ft,b);
}

listOrMap returns[Expression ex=new ListLiteral()] :
  start = LB
  (
      Comma
    | Colon {ex = new MapLiteral();}
    | first = expr (
      ((Colon)=>  {ex = new MapLiteral();} 
      Colon second = expr {((MapLiteral)ex).accept(first, second);}
      (Comma (nextFirst = expr Colon nextSecond = expr
        {((MapLiteral)ex).accept(nextFirst, nextSecond);})?)*)
      | ((Comma)=> {((ListLiteral)ex).accept(first);}
          (Comma (next=expr {((ListLiteral)ex).accept(next);})?)+)
    )?
    )
  end = RB
;

// Misc

eos returns [Token eosToken = null]
  :
    EOF
  | semi = Semi {eosToken = semi;}
  | {lookupNL()}?;