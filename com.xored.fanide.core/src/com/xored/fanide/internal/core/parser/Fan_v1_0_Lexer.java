// $ANTLR 3.0.1 C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g 2009-08-11 17:45:24

package com.xored.fanide.internal.core.parser; 


import org.antlr.runtime.*;
import java.util.Stack;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
public class Fan_v1_0_Lexer extends Lexer {
    public static final int ReadOnly=12;
    public static final int VT=121;
    public static final int Switch=38;
    public static final int Inv=112;
    public static final int LT=99;
    public static final int Pipe=102;
    public static final int NSEq=91;
    public static final int Static=8;
    public static final int BNotAss=83;
    public static final int NEq=93;
    public static final int IDCHAR=54;
    public static final int LP=63;
    public static final int BAndAss=82;
    public static final int Mul=108;
    public static final int Uri=59;
    public static final int RangeExcl=44;
    public static final int EOF=-1;
    public static final int Finally=37;
    public static final int RangeExclOld=43;
    public static final int Decr=105;
    public static final int Default=40;
    public static final int EOL=119;
    public static final int T129=129;
    public static final int QuArrow=72;
    public static final int Comment=127;
    public static final int Digits=50;
    public static final int QuDot=85;
    public static final int Class=15;
    public static final int T131=131;
    public static final int T130=130;
    public static final int AtId=55;
    public static final int Native=5;
    public static final int Null=26;
    public static final int GE=98;
    public static final int Mod=110;
    public static final int Incr=104;
    public static final int This=23;
    public static final int Dsl=60;
    public static final int Eq=92;
    public static final int DivAss=76;
    public static final int Colon=70;
    public static final int Const=10;
    public static final int FF=122;
    public static final int Range=45;
    public static final int RShiftAss=81;
    public static final int WS=125;
    public static final int Semi=71;
    public static final int LShiftAss=80;
    public static final int Break=27;
    public static final int DslStart=113;
    public static final int PipeAss=84;
    public static final int GT=100;
    public static final int DslEnd=114;
    public static final int Else=31;
    public static final int EscapeSequence=49;
    public static final int Private=20;
    public static final int Abstract=4;
    public static final int Elvis=86;
    public static final int Try=35;
    public static final int RC=66;
    public static final int RB=62;
    public static final int RP=64;
    public static final int BNot=101;
    public static final int False=41;
    public static final int LineComment=128;
    public static final int Pound=115;
    public static final int Virtual=9;
    public static final int Final=11;
    public static final int Exponent=52;
    public static final int While=34;
    public static final int Enum=16;
    public static final int Case=39;
    public static final int Add=106;
    public static final int Internal=21;
    public static final int HexDigit=47;
    public static final int Define=69;
    public static final int Assign=74;
    public static final int Number=57;
    public static final int DoubleColon=68;
    public static final int String=58;
    public static final int Or=88;
    public static final int True=42;
    public static final int Return=32;
    public static final int Id=56;
    public static final int If=30;
    public static final int Postfix=51;
    public static final int And=89;
    public static final int Div=109;
    public static final int Continue=28;
    public static final int As=14;
    public static final int Arrow=73;
    public static final int Catch=36;
    public static final int Protected=19;
    public static final int MulAss=75;
    public static final int It=25;
    public static final int Super=24;
    public static final int SEq=90;
    public static final int Throw=33;
    public static final int TAB=120;
    public static final int Once=6;
    public static final int RShift=95;
    public static final int SubAss=79;
    public static final int Mixin=17;
    public static final int Tokens=132;
    public static final int LShift=94;
    public static final int For=29;
    public static final int Sub=107;
    public static final int Public=18;
    public static final int LEG=96;
    public static final int New=22;
    public static final int UnicodeEscape=48;
    public static final int NBSP=124;
    public static final int SP=123;
    public static final int LineTerminator=118;
    public static final int Not=111;
    public static final int Dot=46;
    public static final int IDSTART=53;
    public static final int LC=65;
    public static final int LB=61;
    public static final int Qu=87;
    public static final int Using=13;
    public static final int Override=7;
    public static final int DocComment=126;
    public static final int AddAss=78;
    public static final int ModAss=77;
    public static final int CR=117;
    public static final int Comma=67;
    public static final int LE=97;
    public static final int BAnd=103;
    public static final int LF=116;

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

    public Fan_v1_0_Lexer() {;} 
    public Fan_v1_0_Lexer(CharStream input) {
        super(input);
        ruleMemo = new HashMap[136+1];
     }
    public String getGrammarFileName() { return "C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g"; }

    // $ANTLR start Abstract
    public final void mAbstract() throws RecognitionException {
        try {
            int _type = Abstract;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:27:10: ( 'abstract' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:27:12: 'abstract'
            {
            match("abstract"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Abstract

    // $ANTLR start Native
    public final void mNative() throws RecognitionException {
        try {
            int _type = Native;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:28:8: ( 'native' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:28:10: 'native'
            {
            match("native"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Native

    // $ANTLR start Once
    public final void mOnce() throws RecognitionException {
        try {
            int _type = Once;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:29:6: ( 'once' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:29:8: 'once'
            {
            match("once"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Once

    // $ANTLR start Override
    public final void mOverride() throws RecognitionException {
        try {
            int _type = Override;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:30:10: ( 'override' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:30:12: 'override'
            {
            match("override"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Override

    // $ANTLR start Static
    public final void mStatic() throws RecognitionException {
        try {
            int _type = Static;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:31:8: ( 'static' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:31:10: 'static'
            {
            match("static"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Static

    // $ANTLR start Virtual
    public final void mVirtual() throws RecognitionException {
        try {
            int _type = Virtual;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:32:9: ( 'virtual' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:32:11: 'virtual'
            {
            match("virtual"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Virtual

    // $ANTLR start Const
    public final void mConst() throws RecognitionException {
        try {
            int _type = Const;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:33:7: ( 'const' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:33:9: 'const'
            {
            match("const"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Const

    // $ANTLR start Final
    public final void mFinal() throws RecognitionException {
        try {
            int _type = Final;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:34:7: ( 'final' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:34:9: 'final'
            {
            match("final"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Final

    // $ANTLR start ReadOnly
    public final void mReadOnly() throws RecognitionException {
        try {
            int _type = ReadOnly;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:35:10: ( 'readonly' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:35:12: 'readonly'
            {
            match("readonly"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end ReadOnly

    // $ANTLR start Using
    public final void mUsing() throws RecognitionException {
        try {
            int _type = Using;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:36:7: ( 'using' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:36:9: 'using'
            {
            match("using"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Using

    // $ANTLR start As
    public final void mAs() throws RecognitionException {
        try {
            int _type = As;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:37:4: ( 'as' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:37:6: 'as'
            {
            match("as"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end As

    // $ANTLR start Class
    public final void mClass() throws RecognitionException {
        try {
            int _type = Class;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:38:7: ( 'class' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:38:9: 'class'
            {
            match("class"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Class

    // $ANTLR start Enum
    public final void mEnum() throws RecognitionException {
        try {
            int _type = Enum;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:39:6: ( 'enum' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:39:8: 'enum'
            {
            match("enum"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Enum

    // $ANTLR start Mixin
    public final void mMixin() throws RecognitionException {
        try {
            int _type = Mixin;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:40:7: ( 'mixin' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:40:9: 'mixin'
            {
            match("mixin"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Mixin

    // $ANTLR start Public
    public final void mPublic() throws RecognitionException {
        try {
            int _type = Public;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:41:8: ( 'public' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:41:10: 'public'
            {
            match("public"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Public

    // $ANTLR start Protected
    public final void mProtected() throws RecognitionException {
        try {
            int _type = Protected;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:42:11: ( 'protected' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:42:13: 'protected'
            {
            match("protected"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Protected

    // $ANTLR start Private
    public final void mPrivate() throws RecognitionException {
        try {
            int _type = Private;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:43:9: ( 'private' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:43:11: 'private'
            {
            match("private"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Private

    // $ANTLR start Internal
    public final void mInternal() throws RecognitionException {
        try {
            int _type = Internal;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:44:10: ( 'internal' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:44:12: 'internal'
            {
            match("internal"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Internal

    // $ANTLR start New
    public final void mNew() throws RecognitionException {
        try {
            int _type = New;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:45:5: ( 'new' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:45:7: 'new'
            {
            match("new"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end New

    // $ANTLR start This
    public final void mThis() throws RecognitionException {
        try {
            int _type = This;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:46:6: ( 'this' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:46:8: 'this'
            {
            match("this"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end This

    // $ANTLR start Super
    public final void mSuper() throws RecognitionException {
        try {
            int _type = Super;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:47:7: ( 'super' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:47:9: 'super'
            {
            match("super"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Super

    // $ANTLR start It
    public final void mIt() throws RecognitionException {
        try {
            int _type = It;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:48:4: ( 'it' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:48:6: 'it'
            {
            match("it"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end It

    // $ANTLR start Null
    public final void mNull() throws RecognitionException {
        try {
            int _type = Null;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:49:6: ( 'null' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:49:8: 'null'
            {
            match("null"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Null

    // $ANTLR start Break
    public final void mBreak() throws RecognitionException {
        try {
            int _type = Break;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:50:7: ( 'break' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:50:9: 'break'
            {
            match("break"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Break

    // $ANTLR start Continue
    public final void mContinue() throws RecognitionException {
        try {
            int _type = Continue;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:51:10: ( 'continue' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:51:12: 'continue'
            {
            match("continue"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Continue

    // $ANTLR start For
    public final void mFor() throws RecognitionException {
        try {
            int _type = For;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:52:5: ( 'for' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:52:7: 'for'
            {
            match("for"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end For

    // $ANTLR start If
    public final void mIf() throws RecognitionException {
        try {
            int _type = If;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:53:4: ( 'if' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:53:6: 'if'
            {
            match("if"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end If

    // $ANTLR start Else
    public final void mElse() throws RecognitionException {
        try {
            int _type = Else;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:54:6: ( 'else' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:54:8: 'else'
            {
            match("else"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Else

    // $ANTLR start Return
    public final void mReturn() throws RecognitionException {
        try {
            int _type = Return;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:55:8: ( 'return' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:55:10: 'return'
            {
            match("return"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Return

    // $ANTLR start Throw
    public final void mThrow() throws RecognitionException {
        try {
            int _type = Throw;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:56:7: ( 'throw' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:56:9: 'throw'
            {
            match("throw"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Throw

    // $ANTLR start While
    public final void mWhile() throws RecognitionException {
        try {
            int _type = While;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:57:7: ( 'while' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:57:9: 'while'
            {
            match("while"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end While

    // $ANTLR start Try
    public final void mTry() throws RecognitionException {
        try {
            int _type = Try;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:58:5: ( 'try' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:58:7: 'try'
            {
            match("try"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Try

    // $ANTLR start Catch
    public final void mCatch() throws RecognitionException {
        try {
            int _type = Catch;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:59:7: ( 'catch' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:59:9: 'catch'
            {
            match("catch"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Catch

    // $ANTLR start Finally
    public final void mFinally() throws RecognitionException {
        try {
            int _type = Finally;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:60:9: ( 'finally' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:60:11: 'finally'
            {
            match("finally"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Finally

    // $ANTLR start Switch
    public final void mSwitch() throws RecognitionException {
        try {
            int _type = Switch;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:61:8: ( 'switch' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:61:10: 'switch'
            {
            match("switch"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Switch

    // $ANTLR start Case
    public final void mCase() throws RecognitionException {
        try {
            int _type = Case;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:62:6: ( 'case' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:62:8: 'case'
            {
            match("case"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Case

    // $ANTLR start Default
    public final void mDefault() throws RecognitionException {
        try {
            int _type = Default;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:63:9: ( 'default' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:63:11: 'default'
            {
            match("default"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Default

    // $ANTLR start False
    public final void mFalse() throws RecognitionException {
        try {
            int _type = False;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:64:7: ( 'false' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:64:9: 'false'
            {
            match("false"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end False

    // $ANTLR start True
    public final void mTrue() throws RecognitionException {
        try {
            int _type = True;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:65:6: ( 'true' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:65:8: 'true'
            {
            match("true"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end True

    // $ANTLR start RangeExclOld
    public final void mRangeExclOld() throws RecognitionException {
        try {
            int _type = RangeExclOld;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:66:14: ( '...' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:66:16: '...'
            {
            match("..."); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end RangeExclOld

    // $ANTLR start RangeExcl
    public final void mRangeExcl() throws RecognitionException {
        try {
            int _type = RangeExcl;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:67:11: ( '..<' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:67:13: '..<'
            {
            match("..<"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end RangeExcl

    // $ANTLR start Range
    public final void mRange() throws RecognitionException {
        try {
            int _type = Range;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:68:7: ( '..' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:68:9: '..'
            {
            match(".."); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Range

    // $ANTLR start Dot
    public final void mDot() throws RecognitionException {
        try {
            int _type = Dot;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:69:5: ( '.' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:69:7: '.'
            {
            match('.'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Dot

    // $ANTLR start T129
    public final void mT129() throws RecognitionException {
        try {
            int _type = T129;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:70:6: ( '$' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:70:8: '$'
            {
            match('$'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end T129

    // $ANTLR start T130
    public final void mT130() throws RecognitionException {
        try {
            int _type = T130;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:71:6: ( 'isnot' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:71:8: 'isnot'
            {
            match("isnot"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end T130

    // $ANTLR start T131
    public final void mT131() throws RecognitionException {
        try {
            int _type = T131;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:72:6: ( 'is' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:72:8: 'is'
            {
            match("is"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end T131

    // $ANTLR start HexDigit
    public final void mHexDigit() throws RecognitionException {
        try {
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:257:10: ( ( '0' .. '9' | 'a' .. 'f' | 'A' .. 'F' ) )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:257:12: ( '0' .. '9' | 'a' .. 'f' | 'A' .. 'F' )
            {
            if ( (input.LA(1)>='0' && input.LA(1)<='9')||(input.LA(1)>='A' && input.LA(1)<='F')||(input.LA(1)>='a' && input.LA(1)<='f') ) {
                input.consume();
            failed=false;
            }
            else {
                if (backtracking>0) {failed=true; return ;}
                MismatchedSetException mse =
                    new MismatchedSetException(null,input);
                recover(mse);    throw mse;
            }


            }

        }
        finally {
        }
    }
    // $ANTLR end HexDigit

    // $ANTLR start EscapeSequence
    public final void mEscapeSequence() throws RecognitionException {
        try {
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:262:5: ( '\\\\' ( '$' | 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) | UnicodeEscape )
            int alt1=2;
            int LA1_0 = input.LA(1);

            if ( (LA1_0=='\\') ) {
                int LA1_1 = input.LA(2);

                if ( (LA1_1=='u') ) {
                    alt1=2;
                }
                else if ( (LA1_1=='\"'||LA1_1=='$'||LA1_1=='\''||LA1_1=='\\'||LA1_1=='b'||LA1_1=='f'||LA1_1=='n'||LA1_1=='r'||LA1_1=='t') ) {
                    alt1=1;
                }
                else {
                    if (backtracking>0) {failed=true; return ;}
                    NoViableAltException nvae =
                        new NoViableAltException("260:1: fragment EscapeSequence : ( '\\\\' ( '$' | 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) | UnicodeEscape );", 1, 1, input);

                    throw nvae;
                }
            }
            else {
                if (backtracking>0) {failed=true; return ;}
                NoViableAltException nvae =
                    new NoViableAltException("260:1: fragment EscapeSequence : ( '\\\\' ( '$' | 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) | UnicodeEscape );", 1, 0, input);

                throw nvae;
            }
            switch (alt1) {
                case 1 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:262:9: '\\\\' ( '$' | 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' )
                    {
                    match('\\'); if (failed) return ;
                    if ( input.LA(1)=='\"'||input.LA(1)=='$'||input.LA(1)=='\''||input.LA(1)=='\\'||input.LA(1)=='b'||input.LA(1)=='f'||input.LA(1)=='n'||input.LA(1)=='r'||input.LA(1)=='t' ) {
                        input.consume();
                    failed=false;
                    }
                    else {
                        if (backtracking>0) {failed=true; return ;}
                        MismatchedSetException mse =
                            new MismatchedSetException(null,input);
                        recover(mse);    throw mse;
                    }


                    }
                    break;
                case 2 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:263:9: UnicodeEscape
                    {
                    mUnicodeEscape(); if (failed) return ;

                    }
                    break;

            }
        }
        finally {
        }
    }
    // $ANTLR end EscapeSequence

    // $ANTLR start UnicodeEscape
    public final void mUnicodeEscape() throws RecognitionException {
        try {
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:268:5: ( '\\\\' 'u' HexDigit HexDigit HexDigit HexDigit )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:268:9: '\\\\' 'u' HexDigit HexDigit HexDigit HexDigit
            {
            match('\\'); if (failed) return ;
            match('u'); if (failed) return ;
            mHexDigit(); if (failed) return ;
            mHexDigit(); if (failed) return ;
            mHexDigit(); if (failed) return ;
            mHexDigit(); if (failed) return ;

            }

        }
        finally {
        }
    }
    // $ANTLR end UnicodeEscape

    // $ANTLR start Digits
    public final void mDigits() throws RecognitionException {
        try {
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:270:16: ( '0' .. '9' ( '0' .. '9' | '_' )* )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:270:18: '0' .. '9' ( '0' .. '9' | '_' )*
            {
            matchRange('0','9'); if (failed) return ;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:270:27: ( '0' .. '9' | '_' )*
            loop2:
            do {
                int alt2=2;
                int LA2_0 = input.LA(1);

                if ( ((LA2_0>='0' && LA2_0<='9')||LA2_0=='_') ) {
                    alt2=1;
                }


                switch (alt2) {
            	case 1 :
            	    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:
            	    {
            	    if ( (input.LA(1)>='0' && input.LA(1)<='9')||input.LA(1)=='_' ) {
            	        input.consume();
            	    failed=false;
            	    }
            	    else {
            	        if (backtracking>0) {failed=true; return ;}
            	        MismatchedSetException mse =
            	            new MismatchedSetException(null,input);
            	        recover(mse);    throw mse;
            	    }


            	    }
            	    break;

            	default :
            	    break loop2;
                }
            } while (true);


            }

        }
        finally {
        }
    }
    // $ANTLR end Digits

    // $ANTLR start Postfix
    public final void mPostfix() throws RecognitionException {
        try {
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:272:9: ( 'ns' | 'ms' | 'sec' | 'min' | 'hr' | 'day' | 'd' | 'D' | 'f' | 'F' )
            int alt3=10;
            switch ( input.LA(1) ) {
            case 'n':
                {
                alt3=1;
                }
                break;
            case 'm':
                {
                int LA3_2 = input.LA(2);

                if ( (LA3_2=='s') ) {
                    alt3=2;
                }
                else if ( (LA3_2=='i') ) {
                    alt3=4;
                }
                else {
                    if (backtracking>0) {failed=true; return ;}
                    NoViableAltException nvae =
                        new NoViableAltException("271:1: fragment Postfix : ( 'ns' | 'ms' | 'sec' | 'min' | 'hr' | 'day' | 'd' | 'D' | 'f' | 'F' );", 3, 2, input);

                    throw nvae;
                }
                }
                break;
            case 's':
                {
                alt3=3;
                }
                break;
            case 'h':
                {
                alt3=5;
                }
                break;
            case 'd':
                {
                int LA3_5 = input.LA(2);

                if ( (LA3_5=='a') ) {
                    alt3=6;
                }
                else {
                    alt3=7;}
                }
                break;
            case 'D':
                {
                alt3=8;
                }
                break;
            case 'f':
                {
                alt3=9;
                }
                break;
            case 'F':
                {
                alt3=10;
                }
                break;
            default:
                if (backtracking>0) {failed=true; return ;}
                NoViableAltException nvae =
                    new NoViableAltException("271:1: fragment Postfix : ( 'ns' | 'ms' | 'sec' | 'min' | 'hr' | 'day' | 'd' | 'D' | 'f' | 'F' );", 3, 0, input);

                throw nvae;
            }

            switch (alt3) {
                case 1 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:272:11: 'ns'
                    {
                    match("ns"); if (failed) return ;


                    }
                    break;
                case 2 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:272:16: 'ms'
                    {
                    match("ms"); if (failed) return ;


                    }
                    break;
                case 3 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:272:21: 'sec'
                    {
                    match("sec"); if (failed) return ;


                    }
                    break;
                case 4 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:272:27: 'min'
                    {
                    match("min"); if (failed) return ;


                    }
                    break;
                case 5 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:272:33: 'hr'
                    {
                    match("hr"); if (failed) return ;


                    }
                    break;
                case 6 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:272:38: 'day'
                    {
                    match("day"); if (failed) return ;


                    }
                    break;
                case 7 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:272:44: 'd'
                    {
                    match('d'); if (failed) return ;

                    }
                    break;
                case 8 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:272:48: 'D'
                    {
                    match('D'); if (failed) return ;

                    }
                    break;
                case 9 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:272:52: 'f'
                    {
                    match('f'); if (failed) return ;

                    }
                    break;
                case 10 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:272:56: 'F'
                    {
                    match('F'); if (failed) return ;

                    }
                    break;

            }
        }
        finally {
        }
    }
    // $ANTLR end Postfix

    // $ANTLR start Exponent
    public final void mExponent() throws RecognitionException {
        try {
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:274:10: ( ( 'e' | 'E' ) ( '+' | '-' )? Digits )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:274:12: ( 'e' | 'E' ) ( '+' | '-' )? Digits
            {
            if ( input.LA(1)=='E'||input.LA(1)=='e' ) {
                input.consume();
            failed=false;
            }
            else {
                if (backtracking>0) {failed=true; return ;}
                MismatchedSetException mse =
                    new MismatchedSetException(null,input);
                recover(mse);    throw mse;
            }

            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:274:22: ( '+' | '-' )?
            int alt4=2;
            int LA4_0 = input.LA(1);

            if ( (LA4_0=='+'||LA4_0=='-') ) {
                alt4=1;
            }
            switch (alt4) {
                case 1 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:
                    {
                    if ( input.LA(1)=='+'||input.LA(1)=='-' ) {
                        input.consume();
                    failed=false;
                    }
                    else {
                        if (backtracking>0) {failed=true; return ;}
                        MismatchedSetException mse =
                            new MismatchedSetException(null,input);
                        recover(mse);    throw mse;
                    }


                    }
                    break;

            }

            mDigits(); if (failed) return ;

            }

        }
        finally {
        }
    }
    // $ANTLR end Exponent

    // $ANTLR start AtId
    public final void mAtId() throws RecognitionException {
        try {
            int _type = AtId;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:277:6: ( '@' IDSTART ( IDCHAR )* )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:277:8: '@' IDSTART ( IDCHAR )*
            {
            match('@'); if (failed) return ;
            mIDSTART(); if (failed) return ;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:277:20: ( IDCHAR )*
            loop5:
            do {
                int alt5=2;
                int LA5_0 = input.LA(1);

                if ( ((LA5_0>='0' && LA5_0<='9')||(LA5_0>='A' && LA5_0<='Z')||LA5_0=='_'||(LA5_0>='a' && LA5_0<='z')) ) {
                    alt5=1;
                }


                switch (alt5) {
            	case 1 :
            	    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:277:21: IDCHAR
            	    {
            	    mIDCHAR(); if (failed) return ;

            	    }
            	    break;

            	default :
            	    break loop5;
                }
            } while (true);


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end AtId

    // $ANTLR start Id
    public final void mId() throws RecognitionException {
        try {
            int _type = Id;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:278:4: ( IDSTART ( IDCHAR )* )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:278:6: IDSTART ( IDCHAR )*
            {
            mIDSTART(); if (failed) return ;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:278:14: ( IDCHAR )*
            loop6:
            do {
                int alt6=2;
                int LA6_0 = input.LA(1);

                if ( ((LA6_0>='0' && LA6_0<='9')||(LA6_0>='A' && LA6_0<='Z')||LA6_0=='_'||(LA6_0>='a' && LA6_0<='z')) ) {
                    alt6=1;
                }


                switch (alt6) {
            	case 1 :
            	    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:278:15: IDCHAR
            	    {
            	    mIDCHAR(); if (failed) return ;

            	    }
            	    break;

            	default :
            	    break loop6;
                }
            } while (true);


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Id

    // $ANTLR start IDSTART
    public final void mIDSTART() throws RecognitionException {
        try {
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:279:26: ( 'A' .. 'Z' | 'a' .. 'z' | '_' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:
            {
            if ( (input.LA(1)>='A' && input.LA(1)<='Z')||input.LA(1)=='_'||(input.LA(1)>='a' && input.LA(1)<='z') ) {
                input.consume();
            failed=false;
            }
            else {
                if (backtracking>0) {failed=true; return ;}
                MismatchedSetException mse =
                    new MismatchedSetException(null,input);
                recover(mse);    throw mse;
            }


            }

        }
        finally {
        }
    }
    // $ANTLR end IDSTART

    // $ANTLR start IDCHAR
    public final void mIDCHAR() throws RecognitionException {
        try {
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:280:26: ( 'A' .. 'Z' | 'a' .. 'z' | '_' | '0' .. '9' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:
            {
            if ( (input.LA(1)>='0' && input.LA(1)<='9')||(input.LA(1)>='A' && input.LA(1)<='Z')||input.LA(1)=='_'||(input.LA(1)>='a' && input.LA(1)<='z') ) {
                input.consume();
            failed=false;
            }
            else {
                if (backtracking>0) {failed=true; return ;}
                MismatchedSetException mse =
                    new MismatchedSetException(null,input);
                recover(mse);    throw mse;
            }


            }

        }
        finally {
        }
    }
    // $ANTLR end IDCHAR

    // $ANTLR start Number
    public final void mNumber() throws RecognitionException {
        try {
            int _type = Number;
            Token d=null;
            Token id=null;
            Token r=null;

            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:286:5: (d= Digits dot= '.' (id= Id | Digits ( Exponent )? ( Postfix )? ) | d= Digits r= '...' | d= Digits r= '..<' | d= Digits r= '..' | '.' Digits ( Exponent )? ( Postfix )? | Digits ( Exponent )? ( Postfix )? | '0' ( 'x' | 'X' ) ( HexDigit | '_' )+ | '\\'' ( EscapeSequence | ~ ( '\\'' | '\\\\' ) ) '\\'' )
            int alt16=8;
            alt16 = dfa16.predict(input);
            switch (alt16) {
                case 1 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:287:9: d= Digits dot= '.' (id= Id | Digits ( Exponent )? ( Postfix )? )
                    {
                    int dStart710 = getCharIndex();
                    mDigits(); if (failed) return ;
                    d = new CommonToken(input, Token.INVALID_TOKEN_TYPE, Token.DEFAULT_CHANNEL, dStart710, getCharIndex()-1);
                    int rStart = getCharIndex();
                    match('.'); if (failed) return ;
                    r = new CommonToken(input, Token.INVALID_TOKEN_TYPE, Token.DEFAULT_CHANNEL, rStart, getCharIndex()-1);
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:287:26: (id= Id | Digits ( Exponent )? ( Postfix )? )
                    int alt9=2;
                    int LA9_0 = input.LA(1);

                    if ( ((LA9_0>='A' && LA9_0<='Z')||LA9_0=='_'||(LA9_0>='a' && LA9_0<='z')) ) {
                        alt9=1;
                    }
                    else if ( ((LA9_0>='0' && LA9_0<='9')) ) {
                        alt9=2;
                    }
                    else {
                        if (backtracking>0) {failed=true; return ;}
                        NoViableAltException nvae =
                            new NoViableAltException("287:26: (id= Id | Digits ( Exponent )? ( Postfix )? )", 9, 0, input);

                        throw nvae;
                    }
                    switch (alt9) {
                        case 1 :
                            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:287:27: id= Id
                            {
                            int idStart719 = getCharIndex();
                            mId(); if (failed) return ;
                            id = new CommonToken(input, Token.INVALID_TOKEN_TYPE, Token.DEFAULT_CHANNEL, idStart719, getCharIndex()-1);
                            if ( backtracking==0 ) {

                                      d.setType(Number);
                                      emit(d);
                                      r.setType(Dot);
                                      emit(r);
                                      id.setType(Id);
                                      emit(id);
                                      
                            }

                            }
                            break;
                        case 2 :
                            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:295:11: Digits ( Exponent )? ( Postfix )?
                            {
                            mDigits(); if (failed) return ;
                            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:295:18: ( Exponent )?
                            int alt7=2;
                            int LA7_0 = input.LA(1);

                            if ( (LA7_0=='E'||LA7_0=='e') ) {
                                alt7=1;
                            }
                            switch (alt7) {
                                case 1 :
                                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:295:18: Exponent
                                    {
                                    mExponent(); if (failed) return ;

                                    }
                                    break;

                            }

                            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:295:28: ( Postfix )?
                            int alt8=2;
                            int LA8_0 = input.LA(1);

                            if ( (LA8_0=='D'||LA8_0=='F'||LA8_0=='d'||LA8_0=='f'||LA8_0=='h'||(LA8_0>='m' && LA8_0<='n')||LA8_0=='s') ) {
                                alt8=1;
                            }
                            switch (alt8) {
                                case 1 :
                                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:295:28: Postfix
                                    {
                                    mPostfix(); if (failed) return ;

                                    }
                                    break;

                            }


                            }
                            break;

                    }


                    }
                    break;
                case 2 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:296:9: d= Digits r= '...'
                    {
                    int dStart759 = getCharIndex();
                    mDigits(); if (failed) return ;
                    d = new CommonToken(input, Token.INVALID_TOKEN_TYPE, Token.DEFAULT_CHANNEL, dStart759, getCharIndex()-1);
                    int rStart = getCharIndex();
                    match("..."); if (failed) return ;
                    r = new CommonToken(input, Token.INVALID_TOKEN_TYPE, Token.DEFAULT_CHANNEL, rStart, getCharIndex()-1);
                    if ( backtracking==0 ) {

                              d.setType(Number);
                              emit(d);
                              r.setType(RangeExclOld);
                              emit(r);
                              
                    }

                    }
                    break;
                case 3 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:303:9: d= Digits r= '..<'
                    {
                    int dStart785 = getCharIndex();
                    mDigits(); if (failed) return ;
                    d = new CommonToken(input, Token.INVALID_TOKEN_TYPE, Token.DEFAULT_CHANNEL, dStart785, getCharIndex()-1);
                    int rStart = getCharIndex();
                    match("..<"); if (failed) return ;
                    r = new CommonToken(input, Token.INVALID_TOKEN_TYPE, Token.DEFAULT_CHANNEL, rStart, getCharIndex()-1);
                    if ( backtracking==0 ) {

                              d.setType(Number);
                              emit(d);
                              r.setType(RangeExcl);
                              emit(r);
                              
                    }

                    }
                    break;
                case 4 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:310:9: d= Digits r= '..'
                    {
                    int dStart811 = getCharIndex();
                    mDigits(); if (failed) return ;
                    d = new CommonToken(input, Token.INVALID_TOKEN_TYPE, Token.DEFAULT_CHANNEL, dStart811, getCharIndex()-1);
                    int rStart = getCharIndex();
                    match(".."); if (failed) return ;
                    r = new CommonToken(input, Token.INVALID_TOKEN_TYPE, Token.DEFAULT_CHANNEL, rStart, getCharIndex()-1);
                    if ( backtracking==0 ) {

                              d.setType(Number);
                              emit(d);
                              r.setType(Range);
                              emit(r);
                              
                    }

                    }
                    break;
                case 5 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:317:9: '.' Digits ( Exponent )? ( Postfix )?
                    {
                    match('.'); if (failed) return ;
                    mDigits(); if (failed) return ;
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:317:20: ( Exponent )?
                    int alt10=2;
                    int LA10_0 = input.LA(1);

                    if ( (LA10_0=='E'||LA10_0=='e') ) {
                        alt10=1;
                    }
                    switch (alt10) {
                        case 1 :
                            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:317:20: Exponent
                            {
                            mExponent(); if (failed) return ;

                            }
                            break;

                    }

                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:317:30: ( Postfix )?
                    int alt11=2;
                    int LA11_0 = input.LA(1);

                    if ( (LA11_0=='D'||LA11_0=='F'||LA11_0=='d'||LA11_0=='f'||LA11_0=='h'||(LA11_0>='m' && LA11_0<='n')||LA11_0=='s') ) {
                        alt11=1;
                    }
                    switch (alt11) {
                        case 1 :
                            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:317:30: Postfix
                            {
                            mPostfix(); if (failed) return ;

                            }
                            break;

                    }


                    }
                    break;
                case 6 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:318:9: Digits ( Exponent )? ( Postfix )?
                    {
                    mDigits(); if (failed) return ;
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:318:16: ( Exponent )?
                    int alt12=2;
                    int LA12_0 = input.LA(1);

                    if ( (LA12_0=='E'||LA12_0=='e') ) {
                        alt12=1;
                    }
                    switch (alt12) {
                        case 1 :
                            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:318:16: Exponent
                            {
                            mExponent(); if (failed) return ;

                            }
                            break;

                    }

                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:318:26: ( Postfix )?
                    int alt13=2;
                    int LA13_0 = input.LA(1);

                    if ( (LA13_0=='D'||LA13_0=='F'||LA13_0=='d'||LA13_0=='f'||LA13_0=='h'||(LA13_0>='m' && LA13_0<='n')||LA13_0=='s') ) {
                        alt13=1;
                    }
                    switch (alt13) {
                        case 1 :
                            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:318:26: Postfix
                            {
                            mPostfix(); if (failed) return ;

                            }
                            break;

                    }


                    }
                    break;
                case 7 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:319:9: '0' ( 'x' | 'X' ) ( HexDigit | '_' )+
                    {
                    match('0'); if (failed) return ;
                    if ( input.LA(1)=='X'||input.LA(1)=='x' ) {
                        input.consume();
                    failed=false;
                    }
                    else {
                        if (backtracking>0) {failed=true; return ;}
                        MismatchedSetException mse =
                            new MismatchedSetException(null,input);
                        recover(mse);    throw mse;
                    }

                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:319:23: ( HexDigit | '_' )+
                    int cnt14=0;
                    loop14:
                    do {
                        int alt14=2;
                        int LA14_0 = input.LA(1);

                        if ( ((LA14_0>='0' && LA14_0<='9')||(LA14_0>='A' && LA14_0<='F')||LA14_0=='_'||(LA14_0>='a' && LA14_0<='f')) ) {
                            alt14=1;
                        }


                        switch (alt14) {
                    	case 1 :
                    	    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:
                    	    {
                    	    if ( (input.LA(1)>='0' && input.LA(1)<='9')||(input.LA(1)>='A' && input.LA(1)<='F')||input.LA(1)=='_'||(input.LA(1)>='a' && input.LA(1)<='f') ) {
                    	        input.consume();
                    	    failed=false;
                    	    }
                    	    else {
                    	        if (backtracking>0) {failed=true; return ;}
                    	        MismatchedSetException mse =
                    	            new MismatchedSetException(null,input);
                    	        recover(mse);    throw mse;
                    	    }


                    	    }
                    	    break;

                    	default :
                    	    if ( cnt14 >= 1 ) break loop14;
                    	    if (backtracking>0) {failed=true; return ;}
                                EarlyExitException eee =
                                    new EarlyExitException(14, input);
                                throw eee;
                        }
                        cnt14++;
                    } while (true);


                    }
                    break;
                case 8 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:320:9: '\\'' ( EscapeSequence | ~ ( '\\'' | '\\\\' ) ) '\\''
                    {
                    match('\''); if (failed) return ;
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:320:14: ( EscapeSequence | ~ ( '\\'' | '\\\\' ) )
                    int alt15=2;
                    int LA15_0 = input.LA(1);

                    if ( (LA15_0=='\\') ) {
                        alt15=1;
                    }
                    else if ( ((LA15_0>='\u0000' && LA15_0<='&')||(LA15_0>='(' && LA15_0<='[')||(LA15_0>=']' && LA15_0<='\uFFFE')) ) {
                        alt15=2;
                    }
                    else {
                        if (backtracking>0) {failed=true; return ;}
                        NoViableAltException nvae =
                            new NoViableAltException("320:14: ( EscapeSequence | ~ ( '\\'' | '\\\\' ) )", 15, 0, input);

                        throw nvae;
                    }
                    switch (alt15) {
                        case 1 :
                            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:320:16: EscapeSequence
                            {
                            mEscapeSequence(); if (failed) return ;

                            }
                            break;
                        case 2 :
                            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:320:33: ~ ( '\\'' | '\\\\' )
                            {
                            if ( (input.LA(1)>='\u0000' && input.LA(1)<='&')||(input.LA(1)>='(' && input.LA(1)<='[')||(input.LA(1)>=']' && input.LA(1)<='\uFFFE') ) {
                                input.consume();
                            failed=false;
                            }
                            else {
                                if (backtracking>0) {failed=true; return ;}
                                MismatchedSetException mse =
                                    new MismatchedSetException(null,input);
                                recover(mse);    throw mse;
                            }


                            }
                            break;

                    }

                    match('\''); if (failed) return ;

                    }
                    break;

            }
            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Number

    // $ANTLR start String
    public final void mString() throws RecognitionException {
        try {
            int _type = String;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:324:5: ( '\"\"\"' ( EscapeSequence | ~ ( '\\\\' | '\"\"\"' ) )* '\"\"\"' | 'r\"' (~ ( '\"' ) )* '\"' | '\"' ( EscapeSequence | ~ ( '\\\\' | '\"' ) )* '\"' )
            int alt20=3;
            int LA20_0 = input.LA(1);

            if ( (LA20_0=='\"') ) {
                int LA20_1 = input.LA(2);

                if ( (LA20_1=='\"') ) {
                    int LA20_3 = input.LA(3);

                    if ( (LA20_3=='\"') ) {
                        alt20=1;
                    }
                    else {
                        alt20=3;}
                }
                else if ( ((LA20_1>='\u0000' && LA20_1<='!')||(LA20_1>='#' && LA20_1<='\uFFFE')) ) {
                    alt20=3;
                }
                else {
                    if (backtracking>0) {failed=true; return ;}
                    NoViableAltException nvae =
                        new NoViableAltException("323:1: String : ( '\"\"\"' ( EscapeSequence | ~ ( '\\\\' | '\"\"\"' ) )* '\"\"\"' | 'r\"' (~ ( '\"' ) )* '\"' | '\"' ( EscapeSequence | ~ ( '\\\\' | '\"' ) )* '\"' );", 20, 1, input);

                    throw nvae;
                }
            }
            else if ( (LA20_0=='r') ) {
                alt20=2;
            }
            else {
                if (backtracking>0) {failed=true; return ;}
                NoViableAltException nvae =
                    new NoViableAltException("323:1: String : ( '\"\"\"' ( EscapeSequence | ~ ( '\\\\' | '\"\"\"' ) )* '\"\"\"' | 'r\"' (~ ( '\"' ) )* '\"' | '\"' ( EscapeSequence | ~ ( '\\\\' | '\"' ) )* '\"' );", 20, 0, input);

                throw nvae;
            }
            switch (alt20) {
                case 1 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:324:8: '\"\"\"' ( EscapeSequence | ~ ( '\\\\' | '\"\"\"' ) )* '\"\"\"'
                    {
                    match("\"\"\""); if (failed) return ;

                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:324:14: ( EscapeSequence | ~ ( '\\\\' | '\"\"\"' ) )*
                    loop17:
                    do {
                        int alt17=3;
                        int LA17_0 = input.LA(1);

                        if ( (LA17_0=='\"') ) {
                            int LA17_1 = input.LA(2);

                            if ( (LA17_1=='\"') ) {
                                int LA17_4 = input.LA(3);
//MF ANTLR BUG!
//                                if ( (LA17_4=='\"') ) {
//                                    int LA17_5 = input.LA(4);
//
//                                    if ( ((LA17_5>='\u0000' && LA17_5<='\uFFFE')) ) {
//                                        alt17=2;
//                                    }
//
//
//                                }
//                                else
                                if ( ((LA17_4>='\u0000' && LA17_4<='!')||(LA17_4>='#' && LA17_4<='\uFFFE')) ) {
                                    alt17=2;
                                }


                            }
                            else if ( ((LA17_1>='\u0000' && LA17_1<='!')||(LA17_1>='#' && LA17_1<='\uFFFE')) ) {
                                alt17=2;
                            }


                        }
                        else if ( (LA17_0=='\\') ) {
                            alt17=1;
                        }
                        else if ( ((LA17_0>='\u0000' && LA17_0<='!')||(LA17_0>='#' && LA17_0<='[')||(LA17_0>=']' && LA17_0<='\uFFFE')) ) {
                            alt17=2;
                        }


                        switch (alt17) {
                    	case 1 :
                    	    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:324:16: EscapeSequence
                    	    {
                    	    mEscapeSequence(); if (failed) return ;

                    	    }
                    	    break;
                    	case 2 :
                    	    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:324:33: ~ ( '\\\\' | '\"\"\"' )
                    	    {
                    	    if ( (input.LA(1)>='\u0000' && input.LA(1)<='[')||(input.LA(1)>=']' && input.LA(1)<='\uFFFE') ) {
                    	        input.consume();
                    	    failed=false;
                    	    }
                    	    else {
                    	        if (backtracking>0) {failed=true; return ;}
                    	        MismatchedSetException mse =
                    	            new MismatchedSetException(null,input);
                    	        recover(mse);    throw mse;
                    	    }


                    	    }
                    	    break;

                    	default :
                    	    break loop17;
                        }
                    } while (true);

                    match("\"\"\""); if (failed) return ;


                    }
                    break;
                case 2 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:325:8: 'r\"' (~ ( '\"' ) )* '\"'
                    {
                    match("r\""); if (failed) return ;

                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:325:13: (~ ( '\"' ) )*
                    loop18:
                    do {
                        int alt18=2;
                        int LA18_0 = input.LA(1);

                        if ( ((LA18_0>='\u0000' && LA18_0<='!')||(LA18_0>='#' && LA18_0<='\uFFFE')) ) {
                            alt18=1;
                        }


                        switch (alt18) {
                    	case 1 :
                    	    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:325:15: ~ ( '\"' )
                    	    {
                    	    if ( (input.LA(1)>='\u0000' && input.LA(1)<='!')||(input.LA(1)>='#' && input.LA(1)<='\uFFFE') ) {
                    	        input.consume();
                    	    failed=false;
                    	    }
                    	    else {
                    	        if (backtracking>0) {failed=true; return ;}
                    	        MismatchedSetException mse =
                    	            new MismatchedSetException(null,input);
                    	        recover(mse);    throw mse;
                    	    }


                    	    }
                    	    break;

                    	default :
                    	    break loop18;
                        }
                    } while (true);

                    match('\"'); if (failed) return ;

                    }
                    break;
                case 3 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:326:8: '\"' ( EscapeSequence | ~ ( '\\\\' | '\"' ) )* '\"'
                    {
                    match('\"'); if (failed) return ;
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:326:12: ( EscapeSequence | ~ ( '\\\\' | '\"' ) )*
                    loop19:
                    do {
                        int alt19=3;
                        int LA19_0 = input.LA(1);

                        if ( (LA19_0=='\\') ) {
                            alt19=1;
                        }
                        else if ( ((LA19_0>='\u0000' && LA19_0<='!')||(LA19_0>='#' && LA19_0<='[')||(LA19_0>=']' && LA19_0<='\uFFFE')) ) {
                            alt19=2;
                        }


                        switch (alt19) {
                    	case 1 :
                    	    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:326:14: EscapeSequence
                    	    {
                    	    mEscapeSequence(); if (failed) return ;

                    	    }
                    	    break;
                    	case 2 :
                    	    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:326:31: ~ ( '\\\\' | '\"' )
                    	    {
                    	    if ( (input.LA(1)>='\u0000' && input.LA(1)<='!')||(input.LA(1)>='#' && input.LA(1)<='[')||(input.LA(1)>=']' && input.LA(1)<='\uFFFE') ) {
                    	        input.consume();
                    	    failed=false;
                    	    }
                    	    else {
                    	        if (backtracking>0) {failed=true; return ;}
                    	        MismatchedSetException mse =
                    	            new MismatchedSetException(null,input);
                    	        recover(mse);    throw mse;
                    	    }


                    	    }
                    	    break;

                    	default :
                    	    break loop19;
                        }
                    } while (true);

                    match('\"'); if (failed) return ;

                    }
                    break;

            }
            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end String

    // $ANTLR start Uri
    public final void mUri() throws RecognitionException {
        try {
            int _type = Uri;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:329:5: ( '`' (~ ( '`' ) )* '`' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:329:7: '`' (~ ( '`' ) )* '`'
            {
            match('`'); if (failed) return ;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:329:11: (~ ( '`' ) )*
            loop21:
            do {
                int alt21=2;
                int LA21_0 = input.LA(1);

                if ( ((LA21_0>='\u0000' && LA21_0<='_')||(LA21_0>='a' && LA21_0<='\uFFFE')) ) {
                    alt21=1;
                }


                switch (alt21) {
            	case 1 :
            	    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:329:12: ~ ( '`' )
            	    {
            	    if ( (input.LA(1)>='\u0000' && input.LA(1)<='_')||(input.LA(1)>='a' && input.LA(1)<='\uFFFE') ) {
            	        input.consume();
            	    failed=false;
            	    }
            	    else {
            	        if (backtracking>0) {failed=true; return ;}
            	        MismatchedSetException mse =
            	            new MismatchedSetException(null,input);
            	        recover(mse);    throw mse;
            	    }


            	    }
            	    break;

            	default :
            	    break loop21;
                }
            } while (true);

            match('`'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Uri

    // $ANTLR start Dsl
    public final void mDsl() throws RecognitionException {
        try {
            int _type = Dsl;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:331:5: ( '<|' ( options {greedy=false; } : . )* '|>' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:331:7: '<|' ( options {greedy=false; } : . )* '|>'
            {
            match("<|"); if (failed) return ;

            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:331:12: ( options {greedy=false; } : . )*
            loop22:
            do {
                int alt22=2;
                int LA22_0 = input.LA(1);

                if ( (LA22_0=='|') ) {
                    int LA22_1 = input.LA(2);

                    if ( (LA22_1=='>') ) {
                        alt22=2;
                    }
                    else if ( ((LA22_1>='\u0000' && LA22_1<='=')||(LA22_1>='?' && LA22_1<='\uFFFE')) ) {
                        alt22=1;
                    }


                }
                else if ( ((LA22_0>='\u0000' && LA22_0<='{')||(LA22_0>='}' && LA22_0<='\uFFFE')) ) {
                    alt22=1;
                }


                switch (alt22) {
            	case 1 :
            	    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:331:40: .
            	    {
            	    matchAny(); if (failed) return ;

            	    }
            	    break;

            	default :
            	    break loop22;
                }
            } while (true);

            match("|>"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Dsl

    // $ANTLR start LB
    public final void mLB() throws RecognitionException {
        try {
            int _type = LB;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:333:4: ( '[' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:333:6: '['
            {
            match('['); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end LB

    // $ANTLR start RB
    public final void mRB() throws RecognitionException {
        try {
            int _type = RB;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:334:4: ( ']' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:334:6: ']'
            {
            match(']'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end RB

    // $ANTLR start LP
    public final void mLP() throws RecognitionException {
        try {
            int _type = LP;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:335:4: ( '(' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:335:6: '('
            {
            match('('); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end LP

    // $ANTLR start RP
    public final void mRP() throws RecognitionException {
        try {
            int _type = RP;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:336:4: ( ')' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:336:6: ')'
            {
            match(')'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end RP

    // $ANTLR start LC
    public final void mLC() throws RecognitionException {
        try {
            int _type = LC;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:337:4: ( '{' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:337:6: '{'
            {
            match('{'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end LC

    // $ANTLR start RC
    public final void mRC() throws RecognitionException {
        try {
            int _type = RC;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:338:4: ( '}' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:338:6: '}'
            {
            match('}'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end RC

    // $ANTLR start Comma
    public final void mComma() throws RecognitionException {
        try {
            int _type = Comma;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:339:7: ( ',' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:339:9: ','
            {
            match(','); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Comma

    // $ANTLR start DoubleColon
    public final void mDoubleColon() throws RecognitionException {
        try {
            int _type = DoubleColon;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:340:13: ( '::' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:340:15: '::'
            {
            match("::"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end DoubleColon

    // $ANTLR start Define
    public final void mDefine() throws RecognitionException {
        try {
            int _type = Define;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:341:8: ( ':=' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:341:10: ':='
            {
            match(":="); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Define

    // $ANTLR start Colon
    public final void mColon() throws RecognitionException {
        try {
            int _type = Colon;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:342:7: ( ':' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:342:9: ':'
            {
            match(':'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Colon

    // $ANTLR start Semi
    public final void mSemi() throws RecognitionException {
        try {
            int _type = Semi;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:343:6: ( ';' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:343:8: ';'
            {
            match(';'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Semi

    // $ANTLR start QuArrow
    public final void mQuArrow() throws RecognitionException {
        try {
            int _type = QuArrow;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:344:9: ( '?->' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:344:11: '?->'
            {
            match("?->"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end QuArrow

    // $ANTLR start Arrow
    public final void mArrow() throws RecognitionException {
        try {
            int _type = Arrow;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:345:7: ( '->' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:345:9: '->'
            {
            match("->"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Arrow

    // $ANTLR start Assign
    public final void mAssign() throws RecognitionException {
        try {
            int _type = Assign;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:346:8: ( '=' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:346:11: '='
            {
            match('='); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Assign

    // $ANTLR start MulAss
    public final void mMulAss() throws RecognitionException {
        try {
            int _type = MulAss;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:347:8: ( '*=' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:347:10: '*='
            {
            match("*="); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end MulAss

    // $ANTLR start DivAss
    public final void mDivAss() throws RecognitionException {
        try {
            int _type = DivAss;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:348:8: ( '/=' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:348:9: '/='
            {
            match("/="); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end DivAss

    // $ANTLR start ModAss
    public final void mModAss() throws RecognitionException {
        try {
            int _type = ModAss;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:349:8: ( '%=' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:349:10: '%='
            {
            match("%="); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end ModAss

    // $ANTLR start AddAss
    public final void mAddAss() throws RecognitionException {
        try {
            int _type = AddAss;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:350:8: ( '+=' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:350:10: '+='
            {
            match("+="); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end AddAss

    // $ANTLR start SubAss
    public final void mSubAss() throws RecognitionException {
        try {
            int _type = SubAss;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:351:8: ( '-=' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:351:10: '-='
            {
            match("-="); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end SubAss

    // $ANTLR start LShiftAss
    public final void mLShiftAss() throws RecognitionException {
        try {
            int _type = LShiftAss;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:352:11: ( '<<=' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:352:13: '<<='
            {
            match("<<="); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end LShiftAss

    // $ANTLR start RShiftAss
    public final void mRShiftAss() throws RecognitionException {
        try {
            int _type = RShiftAss;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:353:11: ( '>>=' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:353:13: '>>='
            {
            match(">>="); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end RShiftAss

    // $ANTLR start BAndAss
    public final void mBAndAss() throws RecognitionException {
        try {
            int _type = BAndAss;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:354:9: ( '&=' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:354:11: '&='
            {
            match("&="); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end BAndAss

    // $ANTLR start BNotAss
    public final void mBNotAss() throws RecognitionException {
        try {
            int _type = BNotAss;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:355:9: ( '^=' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:355:12: '^='
            {
            match("^="); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end BNotAss

    // $ANTLR start PipeAss
    public final void mPipeAss() throws RecognitionException {
        try {
            int _type = PipeAss;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:356:9: ( '|=' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:356:11: '|='
            {
            match("|="); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end PipeAss

    // $ANTLR start QuDot
    public final void mQuDot() throws RecognitionException {
        try {
            int _type = QuDot;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:357:7: ( '?.' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:357:9: '?.'
            {
            match("?."); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end QuDot

    // $ANTLR start Elvis
    public final void mElvis() throws RecognitionException {
        try {
            int _type = Elvis;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:358:7: ( '?:' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:358:8: '?:'
            {
            match("?:"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Elvis

    // $ANTLR start Qu
    public final void mQu() throws RecognitionException {
        try {
            int _type = Qu;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:359:4: ( '?' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:359:6: '?'
            {
            match('?'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Qu

    // $ANTLR start Or
    public final void mOr() throws RecognitionException {
        try {
            int _type = Or;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:360:4: ( '||' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:360:6: '||'
            {
            match("||"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Or

    // $ANTLR start And
    public final void mAnd() throws RecognitionException {
        try {
            int _type = And;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:361:5: ( '&&' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:361:7: '&&'
            {
            match("&&"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end And

    // $ANTLR start SEq
    public final void mSEq() throws RecognitionException {
        try {
            int _type = SEq;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:362:4: ( '===' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:362:6: '==='
            {
            match("==="); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end SEq

    // $ANTLR start NSEq
    public final void mNSEq() throws RecognitionException {
        try {
            int _type = NSEq;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:363:6: ( '!==' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:363:8: '!=='
            {
            match("!=="); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end NSEq

    // $ANTLR start Eq
    public final void mEq() throws RecognitionException {
        try {
            int _type = Eq;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:364:4: ( '==' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:364:6: '=='
            {
            match("=="); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Eq

    // $ANTLR start NEq
    public final void mNEq() throws RecognitionException {
        try {
            int _type = NEq;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:365:4: ( '!=' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:365:6: '!='
            {
            match("!="); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end NEq

    // $ANTLR start LShift
    public final void mLShift() throws RecognitionException {
        try {
            int _type = LShift;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:368:8: ( '<<' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:368:10: '<<'
            {
            match("<<"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end LShift

    // $ANTLR start RShift
    public final void mRShift() throws RecognitionException {
        try {
            int _type = RShift;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:369:8: ( '>>' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:369:10: '>>'
            {
            match(">>"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end RShift

    // $ANTLR start LEG
    public final void mLEG() throws RecognitionException {
        try {
            int _type = LEG;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:370:5: ( '<=>' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:370:6: '<=>'
            {
            match("<=>"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end LEG

    // $ANTLR start LE
    public final void mLE() throws RecognitionException {
        try {
            int _type = LE;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:371:4: ( '<=' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:371:6: '<='
            {
            match("<="); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end LE

    // $ANTLR start GE
    public final void mGE() throws RecognitionException {
        try {
            int _type = GE;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:372:4: ( '>=' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:372:6: '>='
            {
            match(">="); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end GE

    // $ANTLR start LT
    public final void mLT() throws RecognitionException {
        try {
            int _type = LT;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:373:4: ( '<' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:373:6: '<'
            {
            match('<'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end LT

    // $ANTLR start GT
    public final void mGT() throws RecognitionException {
        try {
            int _type = GT;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:374:4: ( '>' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:374:6: '>'
            {
            match('>'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end GT

    // $ANTLR start BNot
    public final void mBNot() throws RecognitionException {
        try {
            int _type = BNot;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:375:6: ( '^' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:375:8: '^'
            {
            match('^'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end BNot

    // $ANTLR start Pipe
    public final void mPipe() throws RecognitionException {
        try {
            int _type = Pipe;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:376:6: ( '|' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:376:8: '|'
            {
            match('|'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Pipe

    // $ANTLR start BAnd
    public final void mBAnd() throws RecognitionException {
        try {
            int _type = BAnd;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:377:6: ( '&' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:377:8: '&'
            {
            match('&'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end BAnd

    // $ANTLR start Incr
    public final void mIncr() throws RecognitionException {
        try {
            int _type = Incr;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:378:6: ( '++' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:378:8: '++'
            {
            match("++"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Incr

    // $ANTLR start Decr
    public final void mDecr() throws RecognitionException {
        try {
            int _type = Decr;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:379:6: ( '--' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:379:8: '--'
            {
            match("--"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Decr

    // $ANTLR start Add
    public final void mAdd() throws RecognitionException {
        try {
            int _type = Add;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:380:6: ( '+' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:380:8: '+'
            {
            match('+'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Add

    // $ANTLR start Sub
    public final void mSub() throws RecognitionException {
        try {
            int _type = Sub;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:381:5: ( '-' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:381:7: '-'
            {
            match('-'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Sub

    // $ANTLR start Mul
    public final void mMul() throws RecognitionException {
        try {
            int _type = Mul;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:382:5: ( '*' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:382:7: '*'
            {
            match('*'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Mul

    // $ANTLR start Div
    public final void mDiv() throws RecognitionException {
        try {
            int _type = Div;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:383:5: ( '/' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:383:7: '/'
            {
            match('/'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Div

    // $ANTLR start Mod
    public final void mMod() throws RecognitionException {
        try {
            int _type = Mod;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:384:5: ( '%' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:384:7: '%'
            {
            match('%'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Mod

    // $ANTLR start Not
    public final void mNot() throws RecognitionException {
        try {
            int _type = Not;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:385:5: ( '!' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:385:7: '!'
            {
            match('!'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Not

    // $ANTLR start Inv
    public final void mInv() throws RecognitionException {
        try {
            int _type = Inv;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:386:5: ( '~' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:386:7: '~'
            {
            match('~'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Inv

    // $ANTLR start DslStart
    public final void mDslStart() throws RecognitionException {
        try {
            int _type = DslStart;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:387:10: ( '<|' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:387:12: '<|'
            {
            match("<|"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end DslStart

    // $ANTLR start DslEnd
    public final void mDslEnd() throws RecognitionException {
        try {
            int _type = DslEnd;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:388:8: ( '|>' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:388:10: '|>'
            {
            match("|>"); if (failed) return ;


            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end DslEnd

    // $ANTLR start Pound
    public final void mPound() throws RecognitionException {
        try {
            int _type = Pound;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:389:9: ( '#' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:389:10: '#'
            {
            match('#'); if (failed) return ;

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Pound

    // $ANTLR start LF
    public final void mLF() throws RecognitionException {
        try {
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:392:3: ( '\\n' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:392:5: '\\n'
            {
            match('\n'); if (failed) return ;

            }

        }
        finally {
        }
    }
    // $ANTLR end LF

    // $ANTLR start CR
    public final void mCR() throws RecognitionException {
        try {
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:396:3: ( '\\r' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:396:5: '\\r'
            {
            match('\r'); if (failed) return ;

            }

        }
        finally {
        }
    }
    // $ANTLR end CR

    // $ANTLR start LineTerminator
    public final void mLineTerminator() throws RecognitionException {
        try {
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:399:3: ( CR | LF )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:
            {
            if ( input.LA(1)=='\n'||input.LA(1)=='\r' ) {
                input.consume();
            failed=false;
            }
            else {
                if (backtracking>0) {failed=true; return ;}
                MismatchedSetException mse =
                    new MismatchedSetException(null,input);
                recover(mse);    throw mse;
            }


            }

        }
        finally {
        }
    }
    // $ANTLR end LineTerminator

    // $ANTLR start EOL
    public final void mEOL() throws RecognitionException {
        try {
            int _type = EOL;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:403:3: ( ( ( CR ( LF )? ) | LF ) )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:403:5: ( ( CR ( LF )? ) | LF )
            {
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:403:5: ( ( CR ( LF )? ) | LF )
            int alt24=2;
            int LA24_0 = input.LA(1);

            if ( (LA24_0=='\r') ) {
                alt24=1;
            }
            else if ( (LA24_0=='\n') ) {
                alt24=2;
            }
            else {
                if (backtracking>0) {failed=true; return ;}
                NoViableAltException nvae =
                    new NoViableAltException("403:5: ( ( CR ( LF )? ) | LF )", 24, 0, input);

                throw nvae;
            }
            switch (alt24) {
                case 1 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:403:7: ( CR ( LF )? )
                    {
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:403:7: ( CR ( LF )? )
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:403:9: CR ( LF )?
                    {
                    mCR(); if (failed) return ;
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:403:12: ( LF )?
                    int alt23=2;
                    int LA23_0 = input.LA(1);

                    if ( (LA23_0=='\n') ) {
                        alt23=1;
                    }
                    switch (alt23) {
                        case 1 :
                            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:403:12: LF
                            {
                            mLF(); if (failed) return ;

                            }
                            break;

                    }


                    }


                    }
                    break;
                case 2 :
                    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:403:20: LF
                    {
                    mLF(); if (failed) return ;

                    }
                    break;

            }

            if ( backtracking==0 ) {
               channel = HIDDEN; 
            }

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end EOL

    // $ANTLR start TAB
    public final void mTAB() throws RecognitionException {
        try {
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:407:3: ( '\\u0009' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:407:5: '\\u0009'
            {
            match('\t'); if (failed) return ;

            }

        }
        finally {
        }
    }
    // $ANTLR end TAB

    // $ANTLR start VT
    public final void mVT() throws RecognitionException {
        try {
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:411:3: ( '\\u000b' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:411:5: '\\u000b'
            {
            match('\u000B'); if (failed) return ;

            }

        }
        finally {
        }
    }
    // $ANTLR end VT

    // $ANTLR start FF
    public final void mFF() throws RecognitionException {
        try {
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:415:3: ( '\\u000c' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:415:5: '\\u000c'
            {
            match('\f'); if (failed) return ;

            }

        }
        finally {
        }
    }
    // $ANTLR end FF

    // $ANTLR start SP
    public final void mSP() throws RecognitionException {
        try {
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:419:3: ( '\\u0020' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:419:5: '\\u0020'
            {
            match(' '); if (failed) return ;

            }

        }
        finally {
        }
    }
    // $ANTLR end SP

    // $ANTLR start NBSP
    public final void mNBSP() throws RecognitionException {
        try {
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:423:3: ( '\\u00a0' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:423:5: '\\u00a0'
            {
            match('\u00A0'); if (failed) return ;

            }

        }
        finally {
        }
    }
    // $ANTLR end NBSP

    // $ANTLR start WS
    public final void mWS() throws RecognitionException {
        try {
            int _type = WS;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:426:5: ( ( TAB | VT | FF | SP | NBSP )+ )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:426:7: ( TAB | VT | FF | SP | NBSP )+
            {
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:426:7: ( TAB | VT | FF | SP | NBSP )+
            int cnt25=0;
            loop25:
            do {
                int alt25=2;
                int LA25_0 = input.LA(1);

                if ( (LA25_0=='\t'||(LA25_0>='\u000B' && LA25_0<='\f')||LA25_0==' '||LA25_0=='\u00A0') ) {
                    alt25=1;
                }


                switch (alt25) {
            	case 1 :
            	    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:
            	    {
            	    if ( input.LA(1)=='\t'||(input.LA(1)>='\u000B' && input.LA(1)<='\f')||input.LA(1)==' '||input.LA(1)=='\u00A0' ) {
            	        input.consume();
            	    failed=false;
            	    }
            	    else {
            	        if (backtracking>0) {failed=true; return ;}
            	        MismatchedSetException mse =
            	            new MismatchedSetException(null,input);
            	        recover(mse);    throw mse;
            	    }


            	    }
            	    break;

            	default :
            	    if ( cnt25 >= 1 ) break loop25;
            	    if (backtracking>0) {failed=true; return ;}
                        EarlyExitException eee =
                            new EarlyExitException(25, input);
                        throw eee;
                }
                cnt25++;
            } while (true);

            if ( backtracking==0 ) {
               channel = HIDDEN; 
            }

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end WS

    // $ANTLR start DocComment
    public final void mDocComment() throws RecognitionException {
        try {
            int _type = DocComment;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:430:5: ( '**' (~ ( LineTerminator ) )* )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:430:9: '**' (~ ( LineTerminator ) )*
            {
            match("**"); if (failed) return ;

            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:430:14: (~ ( LineTerminator ) )*
            loop26:
            do {
                int alt26=2;
                int LA26_0 = input.LA(1);

                if ( ((LA26_0>='\u0000' && LA26_0<='\t')||(LA26_0>='\u000B' && LA26_0<='\f')||(LA26_0>='\u000E' && LA26_0<='\uFFFE')) ) {
                    alt26=1;
                }


                switch (alt26) {
            	case 1 :
            	    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:430:16: ~ ( LineTerminator )
            	    {
            	    if ( (input.LA(1)>='\u0000' && input.LA(1)<='\t')||(input.LA(1)>='\u000B' && input.LA(1)<='\f')||(input.LA(1)>='\u000E' && input.LA(1)<='\uFFFE') ) {
            	        input.consume();
            	    failed=false;
            	    }
            	    else {
            	        if (backtracking>0) {failed=true; return ;}
            	        MismatchedSetException mse =
            	            new MismatchedSetException(null,input);
            	        recover(mse);    throw mse;
            	    }


            	    }
            	    break;

            	default :
            	    break loop26;
                }
            } while (true);

            if ( backtracking==0 ) {
              channel=HIDDEN;
            }

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end DocComment

    // $ANTLR start Comment
    public final void mComment() throws RecognitionException {
        try {
            int _type = Comment;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:434:5: ( '/*' ( options {greedy=false; } : . )* '*/' )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:434:9: '/*' ( options {greedy=false; } : . )* '*/'
            {
            match("/*"); if (failed) return ;

            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:434:14: ( options {greedy=false; } : . )*
            loop27:
            do {
                int alt27=2;
                int LA27_0 = input.LA(1);

                if ( (LA27_0=='*') ) {
                    int LA27_1 = input.LA(2);

                    if ( (LA27_1=='/') ) {
                        alt27=2;
                    }
                    else if ( ((LA27_1>='\u0000' && LA27_1<='.')||(LA27_1>='0' && LA27_1<='\uFFFE')) ) {
                        alt27=1;
                    }


                }
                else if ( ((LA27_0>='\u0000' && LA27_0<=')')||(LA27_0>='+' && LA27_0<='\uFFFE')) ) {
                    alt27=1;
                }


                switch (alt27) {
            	case 1 :
            	    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:434:42: .
            	    {
            	    matchAny(); if (failed) return ;

            	    }
            	    break;

            	default :
            	    break loop27;
                }
            } while (true);

            match("*/"); if (failed) return ;

            if ( backtracking==0 ) {
              channel=HIDDEN;
            }

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end Comment

    // $ANTLR start LineComment
    public final void mLineComment() throws RecognitionException {
        try {
            int _type = LineComment;
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:438:5: ( '//' (~ ( LineTerminator ) )* )
            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:438:7: '//' (~ ( LineTerminator ) )*
            {
            match("//"); if (failed) return ;

            // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:438:12: (~ ( LineTerminator ) )*
            loop28:
            do {
                int alt28=2;
                int LA28_0 = input.LA(1);

                if ( ((LA28_0>='\u0000' && LA28_0<='\t')||(LA28_0>='\u000B' && LA28_0<='\f')||(LA28_0>='\u000E' && LA28_0<='\uFFFE')) ) {
                    alt28=1;
                }


                switch (alt28) {
            	case 1 :
            	    // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:438:14: ~ ( LineTerminator )
            	    {
            	    if ( (input.LA(1)>='\u0000' && input.LA(1)<='\t')||(input.LA(1)>='\u000B' && input.LA(1)<='\f')||(input.LA(1)>='\u000E' && input.LA(1)<='\uFFFE') ) {
            	        input.consume();
            	    failed=false;
            	    }
            	    else {
            	        if (backtracking>0) {failed=true; return ;}
            	        MismatchedSetException mse =
            	            new MismatchedSetException(null,input);
            	        recover(mse);    throw mse;
            	    }


            	    }
            	    break;

            	default :
            	    break loop28;
                }
            } while (true);

            if ( backtracking==0 ) {
              channel=HIDDEN;
            }

            }

            this.type = _type;
        }
        finally {
        }
    }
    // $ANTLR end LineComment

    public void mTokens() throws RecognitionException {
        // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:8: ( Abstract | Native | Once | Override | Static | Virtual | Const | Final | ReadOnly | Using | As | Class | Enum | Mixin | Public | Protected | Private | Internal | New | This | Super | It | Null | Break | Continue | For | If | Else | Return | Throw | While | Try | Catch | Finally | Switch | Case | Default | False | True | RangeExclOld | RangeExcl | Range | Dot | T129 | T130 | T131 | AtId | Id | Number | String | Uri | Dsl | LB | RB | LP | RP | LC | RC | Comma | DoubleColon | Define | Colon | Semi | QuArrow | Arrow | Assign | MulAss | DivAss | ModAss | AddAss | SubAss | LShiftAss | RShiftAss | BAndAss | BNotAss | PipeAss | QuDot | Elvis | Qu | Or | And | SEq | NSEq | Eq | NEq | LShift | RShift | LEG | LE | GE | LT | GT | BNot | Pipe | BAnd | Incr | Decr | Add | Sub | Mul | Div | Mod | Not | Inv | DslStart | DslEnd | Pound | EOL | WS | DocComment | Comment | LineComment )
        int alt29=112;
        switch ( input.LA(1) ) {
        case 'a':
            {
            switch ( input.LA(2) ) {
            case 'b':
                {
                int LA29_51 = input.LA(3);

                if ( (LA29_51=='s') ) {
                    int LA29_129 = input.LA(4);

                    if ( (LA29_129=='t') ) {
                        int LA29_183 = input.LA(5);

                        if ( (LA29_183=='r') ) {
                            int LA29_219 = input.LA(6);

                            if ( (LA29_219=='a') ) {
                                int LA29_252 = input.LA(7);

                                if ( (LA29_252=='c') ) {
                                    int LA29_279 = input.LA(8);

                                    if ( (LA29_279=='t') ) {
                                        int LA29_294 = input.LA(9);

                                        if ( ((LA29_294>='0' && LA29_294<='9')||(LA29_294>='A' && LA29_294<='Z')||LA29_294=='_'||(LA29_294>='a' && LA29_294<='z')) ) {
                                            alt29=48;
                                        }
                                        else {
                                            alt29=1;}
                                    }
                                    else {
                                        alt29=48;}
                                }
                                else {
                                    alt29=48;}
                            }
                            else {
                                alt29=48;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
                }
                break;
            case 's':
                {
                int LA29_52 = input.LA(3);

                if ( ((LA29_52>='0' && LA29_52<='9')||(LA29_52>='A' && LA29_52<='Z')||LA29_52=='_'||(LA29_52>='a' && LA29_52<='z')) ) {
                    alt29=48;
                }
                else {
                    alt29=11;}
                }
                break;
            default:
                alt29=48;}

            }
            break;
        case 'n':
            {
            switch ( input.LA(2) ) {
            case 'a':
                {
                int LA29_53 = input.LA(3);

                if ( (LA29_53=='t') ) {
                    int LA29_131 = input.LA(4);

                    if ( (LA29_131=='i') ) {
                        int LA29_184 = input.LA(5);

                        if ( (LA29_184=='v') ) {
                            int LA29_220 = input.LA(6);

                            if ( (LA29_220=='e') ) {
                                int LA29_253 = input.LA(7);

                                if ( ((LA29_253>='0' && LA29_253<='9')||(LA29_253>='A' && LA29_253<='Z')||LA29_253=='_'||(LA29_253>='a' && LA29_253<='z')) ) {
                                    alt29=48;
                                }
                                else {
                                    alt29=2;}
                            }
                            else {
                                alt29=48;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
                }
                break;
            case 'e':
                {
                int LA29_54 = input.LA(3);

                if ( (LA29_54=='w') ) {
                    int LA29_132 = input.LA(4);

                    if ( ((LA29_132>='0' && LA29_132<='9')||(LA29_132>='A' && LA29_132<='Z')||LA29_132=='_'||(LA29_132>='a' && LA29_132<='z')) ) {
                        alt29=48;
                    }
                    else {
                        alt29=19;}
                }
                else {
                    alt29=48;}
                }
                break;
            case 'u':
                {
                int LA29_55 = input.LA(3);

                if ( (LA29_55=='l') ) {
                    int LA29_133 = input.LA(4);

                    if ( (LA29_133=='l') ) {
                        int LA29_186 = input.LA(5);

                        if ( ((LA29_186>='0' && LA29_186<='9')||(LA29_186>='A' && LA29_186<='Z')||LA29_186=='_'||(LA29_186>='a' && LA29_186<='z')) ) {
                            alt29=48;
                        }
                        else {
                            alt29=23;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
                }
                break;
            default:
                alt29=48;}

            }
            break;
        case 'o':
            {
            switch ( input.LA(2) ) {
            case 'v':
                {
                int LA29_56 = input.LA(3);

                if ( (LA29_56=='e') ) {
                    int LA29_134 = input.LA(4);

                    if ( (LA29_134=='r') ) {
                        int LA29_187 = input.LA(5);

                        if ( (LA29_187=='r') ) {
                            int LA29_222 = input.LA(6);

                            if ( (LA29_222=='i') ) {
                                int LA29_254 = input.LA(7);

                                if ( (LA29_254=='d') ) {
                                    int LA29_281 = input.LA(8);

                                    if ( (LA29_281=='e') ) {
                                        int LA29_295 = input.LA(9);

                                        if ( ((LA29_295>='0' && LA29_295<='9')||(LA29_295>='A' && LA29_295<='Z')||LA29_295=='_'||(LA29_295>='a' && LA29_295<='z')) ) {
                                            alt29=48;
                                        }
                                        else {
                                            alt29=4;}
                                    }
                                    else {
                                        alt29=48;}
                                }
                                else {
                                    alt29=48;}
                            }
                            else {
                                alt29=48;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
                }
                break;
            case 'n':
                {
                int LA29_57 = input.LA(3);

                if ( (LA29_57=='c') ) {
                    int LA29_135 = input.LA(4);

                    if ( (LA29_135=='e') ) {
                        int LA29_188 = input.LA(5);

                        if ( ((LA29_188>='0' && LA29_188<='9')||(LA29_188>='A' && LA29_188<='Z')||LA29_188=='_'||(LA29_188>='a' && LA29_188<='z')) ) {
                            alt29=48;
                        }
                        else {
                            alt29=3;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
                }
                break;
            default:
                alt29=48;}

            }
            break;
        case 's':
            {
            switch ( input.LA(2) ) {
            case 't':
                {
                int LA29_58 = input.LA(3);

                if ( (LA29_58=='a') ) {
                    int LA29_136 = input.LA(4);

                    if ( (LA29_136=='t') ) {
                        int LA29_189 = input.LA(5);

                        if ( (LA29_189=='i') ) {
                            int LA29_224 = input.LA(6);

                            if ( (LA29_224=='c') ) {
                                int LA29_255 = input.LA(7);

                                if ( ((LA29_255>='0' && LA29_255<='9')||(LA29_255>='A' && LA29_255<='Z')||LA29_255=='_'||(LA29_255>='a' && LA29_255<='z')) ) {
                                    alt29=48;
                                }
                                else {
                                    alt29=5;}
                            }
                            else {
                                alt29=48;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
                }
                break;
            case 'u':
                {
                int LA29_59 = input.LA(3);

                if ( (LA29_59=='p') ) {
                    int LA29_137 = input.LA(4);

                    if ( (LA29_137=='e') ) {
                        int LA29_190 = input.LA(5);

                        if ( (LA29_190=='r') ) {
                            int LA29_225 = input.LA(6);

                            if ( ((LA29_225>='0' && LA29_225<='9')||(LA29_225>='A' && LA29_225<='Z')||LA29_225=='_'||(LA29_225>='a' && LA29_225<='z')) ) {
                                alt29=48;
                            }
                            else {
                                alt29=21;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
                }
                break;
            case 'w':
                {
                int LA29_60 = input.LA(3);

                if ( (LA29_60=='i') ) {
                    int LA29_138 = input.LA(4);

                    if ( (LA29_138=='t') ) {
                        int LA29_191 = input.LA(5);

                        if ( (LA29_191=='c') ) {
                            int LA29_226 = input.LA(6);

                            if ( (LA29_226=='h') ) {
                                int LA29_257 = input.LA(7);

                                if ( ((LA29_257>='0' && LA29_257<='9')||(LA29_257>='A' && LA29_257<='Z')||LA29_257=='_'||(LA29_257>='a' && LA29_257<='z')) ) {
                                    alt29=48;
                                }
                                else {
                                    alt29=35;}
                            }
                            else {
                                alt29=48;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
                }
                break;
            default:
                alt29=48;}

            }
            break;
        case 'v':
            {
            int LA29_5 = input.LA(2);

            if ( (LA29_5=='i') ) {
                int LA29_61 = input.LA(3);

                if ( (LA29_61=='r') ) {
                    int LA29_139 = input.LA(4);

                    if ( (LA29_139=='t') ) {
                        int LA29_192 = input.LA(5);

                        if ( (LA29_192=='u') ) {
                            int LA29_227 = input.LA(6);

                            if ( (LA29_227=='a') ) {
                                int LA29_258 = input.LA(7);

                                if ( (LA29_258=='l') ) {
                                    int LA29_284 = input.LA(8);

                                    if ( ((LA29_284>='0' && LA29_284<='9')||(LA29_284>='A' && LA29_284<='Z')||LA29_284=='_'||(LA29_284>='a' && LA29_284<='z')) ) {
                                        alt29=48;
                                    }
                                    else {
                                        alt29=6;}
                                }
                                else {
                                    alt29=48;}
                            }
                            else {
                                alt29=48;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
            }
            else {
                alt29=48;}
            }
            break;
        case 'c':
            {
            switch ( input.LA(2) ) {
            case 'o':
                {
                int LA29_62 = input.LA(3);

                if ( (LA29_62=='n') ) {
                    switch ( input.LA(4) ) {
                    case 't':
                        {
                        int LA29_193 = input.LA(5);

                        if ( (LA29_193=='i') ) {
                            int LA29_228 = input.LA(6);

                            if ( (LA29_228=='n') ) {
                                int LA29_259 = input.LA(7);

                                if ( (LA29_259=='u') ) {
                                    int LA29_285 = input.LA(8);

                                    if ( (LA29_285=='e') ) {
                                        int LA29_297 = input.LA(9);

                                        if ( ((LA29_297>='0' && LA29_297<='9')||(LA29_297>='A' && LA29_297<='Z')||LA29_297=='_'||(LA29_297>='a' && LA29_297<='z')) ) {
                                            alt29=48;
                                        }
                                        else {
                                            alt29=25;}
                                    }
                                    else {
                                        alt29=48;}
                                }
                                else {
                                    alt29=48;}
                            }
                            else {
                                alt29=48;}
                        }
                        else {
                            alt29=48;}
                        }
                        break;
                    case 's':
                        {
                        int LA29_194 = input.LA(5);

                        if ( (LA29_194=='t') ) {
                            int LA29_229 = input.LA(6);

                            if ( ((LA29_229>='0' && LA29_229<='9')||(LA29_229>='A' && LA29_229<='Z')||LA29_229=='_'||(LA29_229>='a' && LA29_229<='z')) ) {
                                alt29=48;
                            }
                            else {
                                alt29=7;}
                        }
                        else {
                            alt29=48;}
                        }
                        break;
                    default:
                        alt29=48;}

                }
                else {
                    alt29=48;}
                }
                break;
            case 'l':
                {
                int LA29_63 = input.LA(3);

                if ( (LA29_63=='a') ) {
                    int LA29_141 = input.LA(4);

                    if ( (LA29_141=='s') ) {
                        int LA29_195 = input.LA(5);

                        if ( (LA29_195=='s') ) {
                            int LA29_230 = input.LA(6);

                            if ( ((LA29_230>='0' && LA29_230<='9')||(LA29_230>='A' && LA29_230<='Z')||LA29_230=='_'||(LA29_230>='a' && LA29_230<='z')) ) {
                                alt29=48;
                            }
                            else {
                                alt29=12;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
                }
                break;
            case 'a':
                {
                switch ( input.LA(3) ) {
                case 't':
                    {
                    int LA29_142 = input.LA(4);

                    if ( (LA29_142=='c') ) {
                        int LA29_196 = input.LA(5);

                        if ( (LA29_196=='h') ) {
                            int LA29_231 = input.LA(6);

                            if ( ((LA29_231>='0' && LA29_231<='9')||(LA29_231>='A' && LA29_231<='Z')||LA29_231=='_'||(LA29_231>='a' && LA29_231<='z')) ) {
                                alt29=48;
                            }
                            else {
                                alt29=33;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                    }
                    break;
                case 's':
                    {
                    int LA29_143 = input.LA(4);

                    if ( (LA29_143=='e') ) {
                        int LA29_197 = input.LA(5);

                        if ( ((LA29_197>='0' && LA29_197<='9')||(LA29_197>='A' && LA29_197<='Z')||LA29_197=='_'||(LA29_197>='a' && LA29_197<='z')) ) {
                            alt29=48;
                        }
                        else {
                            alt29=36;}
                    }
                    else {
                        alt29=48;}
                    }
                    break;
                default:
                    alt29=48;}

                }
                break;
            default:
                alt29=48;}

            }
            break;
        case 'f':
            {
            switch ( input.LA(2) ) {
            case 'i':
                {
                int LA29_65 = input.LA(3);

                if ( (LA29_65=='n') ) {
                    int LA29_144 = input.LA(4);

                    if ( (LA29_144=='a') ) {
                        int LA29_198 = input.LA(5);

                        if ( (LA29_198=='l') ) {
                            switch ( input.LA(6) ) {
                            case 'l':
                                {
                                int LA29_263 = input.LA(7);

                                if ( (LA29_263=='y') ) {
                                    int LA29_286 = input.LA(8);

                                    if ( ((LA29_286>='0' && LA29_286<='9')||(LA29_286>='A' && LA29_286<='Z')||LA29_286=='_'||(LA29_286>='a' && LA29_286<='z')) ) {
                                        alt29=48;
                                    }
                                    else {
                                        alt29=34;}
                                }
                                else {
                                    alt29=48;}
                                }
                                break;
                            case '0':
                            case '1':
                            case '2':
                            case '3':
                            case '4':
                            case '5':
                            case '6':
                            case '7':
                            case '8':
                            case '9':
                            case 'A':
                            case 'B':
                            case 'C':
                            case 'D':
                            case 'E':
                            case 'F':
                            case 'G':
                            case 'H':
                            case 'I':
                            case 'J':
                            case 'K':
                            case 'L':
                            case 'M':
                            case 'N':
                            case 'O':
                            case 'P':
                            case 'Q':
                            case 'R':
                            case 'S':
                            case 'T':
                            case 'U':
                            case 'V':
                            case 'W':
                            case 'X':
                            case 'Y':
                            case 'Z':
                            case '_':
                            case 'a':
                            case 'b':
                            case 'c':
                            case 'd':
                            case 'e':
                            case 'f':
                            case 'g':
                            case 'h':
                            case 'i':
                            case 'j':
                            case 'k':
                            case 'm':
                            case 'n':
                            case 'o':
                            case 'p':
                            case 'q':
                            case 'r':
                            case 's':
                            case 't':
                            case 'u':
                            case 'v':
                            case 'w':
                            case 'x':
                            case 'y':
                            case 'z':
                                {
                                alt29=48;
                                }
                                break;
                            default:
                                alt29=8;}

                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
                }
                break;
            case 'o':
                {
                int LA29_66 = input.LA(3);

                if ( (LA29_66=='r') ) {
                    int LA29_145 = input.LA(4);

                    if ( ((LA29_145>='0' && LA29_145<='9')||(LA29_145>='A' && LA29_145<='Z')||LA29_145=='_'||(LA29_145>='a' && LA29_145<='z')) ) {
                        alt29=48;
                    }
                    else {
                        alt29=26;}
                }
                else {
                    alt29=48;}
                }
                break;
            case 'a':
                {
                int LA29_67 = input.LA(3);

                if ( (LA29_67=='l') ) {
                    int LA29_146 = input.LA(4);

                    if ( (LA29_146=='s') ) {
                        int LA29_200 = input.LA(5);

                        if ( (LA29_200=='e') ) {
                            int LA29_234 = input.LA(6);

                            if ( ((LA29_234>='0' && LA29_234<='9')||(LA29_234>='A' && LA29_234<='Z')||LA29_234=='_'||(LA29_234>='a' && LA29_234<='z')) ) {
                                alt29=48;
                            }
                            else {
                                alt29=38;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
                }
                break;
            default:
                alt29=48;}

            }
            break;
        case 'r':
            {
            switch ( input.LA(2) ) {
            case '\"':
                {
                alt29=50;
                }
                break;
            case 'e':
                {
                switch ( input.LA(3) ) {
                case 't':
                    {
                    int LA29_147 = input.LA(4);

                    if ( (LA29_147=='u') ) {
                        int LA29_201 = input.LA(5);

                        if ( (LA29_201=='r') ) {
                            int LA29_235 = input.LA(6);

                            if ( (LA29_235=='n') ) {
                                int LA29_266 = input.LA(7);

                                if ( ((LA29_266>='0' && LA29_266<='9')||(LA29_266>='A' && LA29_266<='Z')||LA29_266=='_'||(LA29_266>='a' && LA29_266<='z')) ) {
                                    alt29=48;
                                }
                                else {
                                    alt29=29;}
                            }
                            else {
                                alt29=48;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                    }
                    break;
                case 'a':
                    {
                    int LA29_148 = input.LA(4);

                    if ( (LA29_148=='d') ) {
                        int LA29_202 = input.LA(5);

                        if ( (LA29_202=='o') ) {
                            int LA29_236 = input.LA(6);

                            if ( (LA29_236=='n') ) {
                                int LA29_267 = input.LA(7);

                                if ( (LA29_267=='l') ) {
                                    int LA29_288 = input.LA(8);

                                    if ( (LA29_288=='y') ) {
                                        int LA29_299 = input.LA(9);

                                        if ( ((LA29_299>='0' && LA29_299<='9')||(LA29_299>='A' && LA29_299<='Z')||LA29_299=='_'||(LA29_299>='a' && LA29_299<='z')) ) {
                                            alt29=48;
                                        }
                                        else {
                                            alt29=9;}
                                    }
                                    else {
                                        alt29=48;}
                                }
                                else {
                                    alt29=48;}
                            }
                            else {
                                alt29=48;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                    }
                    break;
                default:
                    alt29=48;}

                }
                break;
            default:
                alt29=48;}

            }
            break;
        case 'u':
            {
            int LA29_9 = input.LA(2);

            if ( (LA29_9=='s') ) {
                int LA29_69 = input.LA(3);

                if ( (LA29_69=='i') ) {
                    int LA29_149 = input.LA(4);

                    if ( (LA29_149=='n') ) {
                        int LA29_203 = input.LA(5);

                        if ( (LA29_203=='g') ) {
                            int LA29_237 = input.LA(6);

                            if ( ((LA29_237>='0' && LA29_237<='9')||(LA29_237>='A' && LA29_237<='Z')||LA29_237=='_'||(LA29_237>='a' && LA29_237<='z')) ) {
                                alt29=48;
                            }
                            else {
                                alt29=10;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
            }
            else {
                alt29=48;}
            }
            break;
        case 'e':
            {
            switch ( input.LA(2) ) {
            case 'n':
                {
                int LA29_70 = input.LA(3);

                if ( (LA29_70=='u') ) {
                    int LA29_150 = input.LA(4);

                    if ( (LA29_150=='m') ) {
                        int LA29_204 = input.LA(5);

                        if ( ((LA29_204>='0' && LA29_204<='9')||(LA29_204>='A' && LA29_204<='Z')||LA29_204=='_'||(LA29_204>='a' && LA29_204<='z')) ) {
                            alt29=48;
                        }
                        else {
                            alt29=13;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
                }
                break;
            case 'l':
                {
                int LA29_71 = input.LA(3);

                if ( (LA29_71=='s') ) {
                    int LA29_151 = input.LA(4);

                    if ( (LA29_151=='e') ) {
                        int LA29_205 = input.LA(5);

                        if ( ((LA29_205>='0' && LA29_205<='9')||(LA29_205>='A' && LA29_205<='Z')||LA29_205=='_'||(LA29_205>='a' && LA29_205<='z')) ) {
                            alt29=48;
                        }
                        else {
                            alt29=28;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
                }
                break;
            default:
                alt29=48;}

            }
            break;
        case 'm':
            {
            int LA29_11 = input.LA(2);

            if ( (LA29_11=='i') ) {
                int LA29_72 = input.LA(3);

                if ( (LA29_72=='x') ) {
                    int LA29_152 = input.LA(4);

                    if ( (LA29_152=='i') ) {
                        int LA29_206 = input.LA(5);

                        if ( (LA29_206=='n') ) {
                            int LA29_240 = input.LA(6);

                            if ( ((LA29_240>='0' && LA29_240<='9')||(LA29_240>='A' && LA29_240<='Z')||LA29_240=='_'||(LA29_240>='a' && LA29_240<='z')) ) {
                                alt29=48;
                            }
                            else {
                                alt29=14;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
            }
            else {
                alt29=48;}
            }
            break;
        case 'p':
            {
            switch ( input.LA(2) ) {
            case 'r':
                {
                switch ( input.LA(3) ) {
                case 'o':
                    {
                    int LA29_153 = input.LA(4);

                    if ( (LA29_153=='t') ) {
                        int LA29_207 = input.LA(5);

                        if ( (LA29_207=='e') ) {
                            int LA29_241 = input.LA(6);

                            if ( (LA29_241=='c') ) {
                                int LA29_270 = input.LA(7);

                                if ( (LA29_270=='t') ) {
                                    int LA29_289 = input.LA(8);

                                    if ( (LA29_289=='e') ) {
                                        int LA29_300 = input.LA(9);

                                        if ( (LA29_300=='d') ) {
                                            int LA29_308 = input.LA(10);

                                            if ( ((LA29_308>='0' && LA29_308<='9')||(LA29_308>='A' && LA29_308<='Z')||LA29_308=='_'||(LA29_308>='a' && LA29_308<='z')) ) {
                                                alt29=48;
                                            }
                                            else {
                                                alt29=16;}
                                        }
                                        else {
                                            alt29=48;}
                                    }
                                    else {
                                        alt29=48;}
                                }
                                else {
                                    alt29=48;}
                            }
                            else {
                                alt29=48;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                    }
                    break;
                case 'i':
                    {
                    int LA29_154 = input.LA(4);

                    if ( (LA29_154=='v') ) {
                        int LA29_208 = input.LA(5);

                        if ( (LA29_208=='a') ) {
                            int LA29_242 = input.LA(6);

                            if ( (LA29_242=='t') ) {
                                int LA29_271 = input.LA(7);

                                if ( (LA29_271=='e') ) {
                                    int LA29_290 = input.LA(8);

                                    if ( ((LA29_290>='0' && LA29_290<='9')||(LA29_290>='A' && LA29_290<='Z')||LA29_290=='_'||(LA29_290>='a' && LA29_290<='z')) ) {
                                        alt29=48;
                                    }
                                    else {
                                        alt29=17;}
                                }
                                else {
                                    alt29=48;}
                            }
                            else {
                                alt29=48;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                    }
                    break;
                default:
                    alt29=48;}

                }
                break;
            case 'u':
                {
                int LA29_74 = input.LA(3);

                if ( (LA29_74=='b') ) {
                    int LA29_155 = input.LA(4);

                    if ( (LA29_155=='l') ) {
                        int LA29_209 = input.LA(5);

                        if ( (LA29_209=='i') ) {
                            int LA29_243 = input.LA(6);

                            if ( (LA29_243=='c') ) {
                                int LA29_272 = input.LA(7);

                                if ( ((LA29_272>='0' && LA29_272<='9')||(LA29_272>='A' && LA29_272<='Z')||LA29_272=='_'||(LA29_272>='a' && LA29_272<='z')) ) {
                                    alt29=48;
                                }
                                else {
                                    alt29=15;}
                            }
                            else {
                                alt29=48;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
                }
                break;
            default:
                alt29=48;}

            }
            break;
        case 'i':
            {
            switch ( input.LA(2) ) {
            case 'n':
                {
                int LA29_75 = input.LA(3);

                if ( (LA29_75=='t') ) {
                    int LA29_156 = input.LA(4);

                    if ( (LA29_156=='e') ) {
                        int LA29_210 = input.LA(5);

                        if ( (LA29_210=='r') ) {
                            int LA29_244 = input.LA(6);

                            if ( (LA29_244=='n') ) {
                                int LA29_273 = input.LA(7);

                                if ( (LA29_273=='a') ) {
                                    int LA29_292 = input.LA(8);

                                    if ( (LA29_292=='l') ) {
                                        int LA29_302 = input.LA(9);

                                        if ( ((LA29_302>='0' && LA29_302<='9')||(LA29_302>='A' && LA29_302<='Z')||LA29_302=='_'||(LA29_302>='a' && LA29_302<='z')) ) {
                                            alt29=48;
                                        }
                                        else {
                                            alt29=18;}
                                    }
                                    else {
                                        alt29=48;}
                                }
                                else {
                                    alt29=48;}
                            }
                            else {
                                alt29=48;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
                }
                break;
            case 'f':
                {
                int LA29_76 = input.LA(3);

                if ( ((LA29_76>='0' && LA29_76<='9')||(LA29_76>='A' && LA29_76<='Z')||LA29_76=='_'||(LA29_76>='a' && LA29_76<='z')) ) {
                    alt29=48;
                }
                else {
                    alt29=27;}
                }
                break;
            case 't':
                {
                int LA29_77 = input.LA(3);

                if ( ((LA29_77>='0' && LA29_77<='9')||(LA29_77>='A' && LA29_77<='Z')||LA29_77=='_'||(LA29_77>='a' && LA29_77<='z')) ) {
                    alt29=48;
                }
                else {
                    alt29=22;}
                }
                break;
            case 's':
                {
                switch ( input.LA(3) ) {
                case 'n':
                    {
                    int LA29_159 = input.LA(4);

                    if ( (LA29_159=='o') ) {
                        int LA29_211 = input.LA(5);

                        if ( (LA29_211=='t') ) {
                            int LA29_245 = input.LA(6);

                            if ( ((LA29_245>='0' && LA29_245<='9')||(LA29_245>='A' && LA29_245<='Z')||LA29_245=='_'||(LA29_245>='a' && LA29_245<='z')) ) {
                                alt29=48;
                            }
                            else {
                                alt29=45;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                    }
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                case 'A':
                case 'B':
                case 'C':
                case 'D':
                case 'E':
                case 'F':
                case 'G':
                case 'H':
                case 'I':
                case 'J':
                case 'K':
                case 'L':
                case 'M':
                case 'N':
                case 'O':
                case 'P':
                case 'Q':
                case 'R':
                case 'S':
                case 'T':
                case 'U':
                case 'V':
                case 'W':
                case 'X':
                case 'Y':
                case 'Z':
                case '_':
                case 'a':
                case 'b':
                case 'c':
                case 'd':
                case 'e':
                case 'f':
                case 'g':
                case 'h':
                case 'i':
                case 'j':
                case 'k':
                case 'l':
                case 'm':
                case 'o':
                case 'p':
                case 'q':
                case 'r':
                case 's':
                case 't':
                case 'u':
                case 'v':
                case 'w':
                case 'x':
                case 'y':
                case 'z':
                    {
                    alt29=48;
                    }
                    break;
                default:
                    alt29=46;}

                }
                break;
            default:
                alt29=48;}

            }
            break;
        case 't':
            {
            switch ( input.LA(2) ) {
            case 'h':
                {
                switch ( input.LA(3) ) {
                case 'r':
                    {
                    int LA29_161 = input.LA(4);

                    if ( (LA29_161=='o') ) {
                        int LA29_212 = input.LA(5);

                        if ( (LA29_212=='w') ) {
                            int LA29_246 = input.LA(6);

                            if ( ((LA29_246>='0' && LA29_246<='9')||(LA29_246>='A' && LA29_246<='Z')||LA29_246=='_'||(LA29_246>='a' && LA29_246<='z')) ) {
                                alt29=48;
                            }
                            else {
                                alt29=30;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                    }
                    break;
                case 'i':
                    {
                    int LA29_162 = input.LA(4);

                    if ( (LA29_162=='s') ) {
                        int LA29_213 = input.LA(5);

                        if ( ((LA29_213>='0' && LA29_213<='9')||(LA29_213>='A' && LA29_213<='Z')||LA29_213=='_'||(LA29_213>='a' && LA29_213<='z')) ) {
                            alt29=48;
                        }
                        else {
                            alt29=20;}
                    }
                    else {
                        alt29=48;}
                    }
                    break;
                default:
                    alt29=48;}

                }
                break;
            case 'r':
                {
                switch ( input.LA(3) ) {
                case 'y':
                    {
                    int LA29_163 = input.LA(4);

                    if ( ((LA29_163>='0' && LA29_163<='9')||(LA29_163>='A' && LA29_163<='Z')||LA29_163=='_'||(LA29_163>='a' && LA29_163<='z')) ) {
                        alt29=48;
                    }
                    else {
                        alt29=32;}
                    }
                    break;
                case 'u':
                    {
                    int LA29_164 = input.LA(4);

                    if ( (LA29_164=='e') ) {
                        int LA29_215 = input.LA(5);

                        if ( ((LA29_215>='0' && LA29_215<='9')||(LA29_215>='A' && LA29_215<='Z')||LA29_215=='_'||(LA29_215>='a' && LA29_215<='z')) ) {
                            alt29=48;
                        }
                        else {
                            alt29=39;}
                    }
                    else {
                        alt29=48;}
                    }
                    break;
                default:
                    alt29=48;}

                }
                break;
            default:
                alt29=48;}

            }
            break;
        case 'b':
            {
            int LA29_15 = input.LA(2);

            if ( (LA29_15=='r') ) {
                int LA29_81 = input.LA(3);

                if ( (LA29_81=='e') ) {
                    int LA29_165 = input.LA(4);

                    if ( (LA29_165=='a') ) {
                        int LA29_216 = input.LA(5);

                        if ( (LA29_216=='k') ) {
                            int LA29_249 = input.LA(6);

                            if ( ((LA29_249>='0' && LA29_249<='9')||(LA29_249>='A' && LA29_249<='Z')||LA29_249=='_'||(LA29_249>='a' && LA29_249<='z')) ) {
                                alt29=48;
                            }
                            else {
                                alt29=24;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
            }
            else {
                alt29=48;}
            }
            break;
        case 'w':
            {
            int LA29_16 = input.LA(2);

            if ( (LA29_16=='h') ) {
                int LA29_82 = input.LA(3);

                if ( (LA29_82=='i') ) {
                    int LA29_166 = input.LA(4);

                    if ( (LA29_166=='l') ) {
                        int LA29_217 = input.LA(5);

                        if ( (LA29_217=='e') ) {
                            int LA29_250 = input.LA(6);

                            if ( ((LA29_250>='0' && LA29_250<='9')||(LA29_250>='A' && LA29_250<='Z')||LA29_250=='_'||(LA29_250>='a' && LA29_250<='z')) ) {
                                alt29=48;
                            }
                            else {
                                alt29=31;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
            }
            else {
                alt29=48;}
            }
            break;
        case 'd':
            {
            int LA29_17 = input.LA(2);

            if ( (LA29_17=='e') ) {
                int LA29_83 = input.LA(3);

                if ( (LA29_83=='f') ) {
                    int LA29_167 = input.LA(4);

                    if ( (LA29_167=='a') ) {
                        int LA29_218 = input.LA(5);

                        if ( (LA29_218=='u') ) {
                            int LA29_251 = input.LA(6);

                            if ( (LA29_251=='l') ) {
                                int LA29_278 = input.LA(7);

                                if ( (LA29_278=='t') ) {
                                    int LA29_293 = input.LA(8);

                                    if ( ((LA29_293>='0' && LA29_293<='9')||(LA29_293>='A' && LA29_293<='Z')||LA29_293=='_'||(LA29_293>='a' && LA29_293<='z')) ) {
                                        alt29=48;
                                    }
                                    else {
                                        alt29=37;}
                                }
                                else {
                                    alt29=48;}
                            }
                            else {
                                alt29=48;}
                        }
                        else {
                            alt29=48;}
                    }
                    else {
                        alt29=48;}
                }
                else {
                    alt29=48;}
            }
            else {
                alt29=48;}
            }
            break;
        case '.':
            {
            switch ( input.LA(2) ) {
            case '.':
                {
                switch ( input.LA(3) ) {
                case '<':
                    {
                    alt29=41;
                    }
                    break;
                case '.':
                    {
                    alt29=40;
                    }
                    break;
                default:
                    alt29=42;}

                }
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                {
                alt29=49;
                }
                break;
            default:
                alt29=43;}

            }
            break;
        case '$':
            {
            alt29=44;
            }
            break;
        case '@':
            {
            alt29=47;
            }
            break;
        case 'A':
        case 'B':
        case 'C':
        case 'D':
        case 'E':
        case 'F':
        case 'G':
        case 'H':
        case 'I':
        case 'J':
        case 'K':
        case 'L':
        case 'M':
        case 'N':
        case 'O':
        case 'P':
        case 'Q':
        case 'R':
        case 'S':
        case 'T':
        case 'U':
        case 'V':
        case 'W':
        case 'X':
        case 'Y':
        case 'Z':
        case '_':
        case 'g':
        case 'h':
        case 'j':
        case 'k':
        case 'l':
        case 'q':
        case 'x':
        case 'y':
        case 'z':
            {
            alt29=48;
            }
            break;
        case '\'':
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            {
            alt29=49;
            }
            break;
        case '\"':
            {
            alt29=50;
            }
            break;
        case '`':
            {
            alt29=51;
            }
            break;
        case '<':
            {
            switch ( input.LA(2) ) {
            case '|':
                {
                int LA29_86 = input.LA(3);

                if ( ((LA29_86>='\u0000' && LA29_86<='\uFFFE')) ) {
                    alt29=52;
                }
                else {
                    alt29=105;}
                }
                break;
            case '<':
                {
                int LA29_87 = input.LA(3);

                if ( (LA29_87=='=') ) {
                    alt29=72;
                }
                else {
                    alt29=86;}
                }
                break;
            case '=':
                {
                int LA29_88 = input.LA(3);

                if ( (LA29_88=='>') ) {
                    alt29=88;
                }
                else {
                    alt29=89;}
                }
                break;
            default:
                alt29=91;}

            }
            break;
        case '[':
            {
            alt29=53;
            }
            break;
        case ']':
            {
            alt29=54;
            }
            break;
        case '(':
            {
            alt29=55;
            }
            break;
        case ')':
            {
            alt29=56;
            }
            break;
        case '{':
            {
            alt29=57;
            }
            break;
        case '}':
            {
            alt29=58;
            }
            break;
        case ',':
            {
            alt29=59;
            }
            break;
        case ':':
            {
            switch ( input.LA(2) ) {
            case '=':
                {
                alt29=61;
                }
                break;
            case ':':
                {
                alt29=60;
                }
                break;
            default:
                alt29=62;}

            }
            break;
        case ';':
            {
            alt29=63;
            }
            break;
        case '?':
            {
            switch ( input.LA(2) ) {
            case '-':
                {
                alt29=64;
                }
                break;
            case '.':
                {
                alt29=77;
                }
                break;
            case ':':
                {
                alt29=78;
                }
                break;
            default:
                alt29=79;}

            }
            break;
        case '-':
            {
            switch ( input.LA(2) ) {
            case '>':
                {
                alt29=65;
                }
                break;
            case '-':
                {
                alt29=97;
                }
                break;
            case '=':
                {
                alt29=71;
                }
                break;
            default:
                alt29=99;}

            }
            break;
        case '=':
            {
            int LA29_37 = input.LA(2);

            if ( (LA29_37=='=') ) {
                int LA29_101 = input.LA(3);

                if ( (LA29_101=='=') ) {
                    alt29=82;
                }
                else {
                    alt29=84;}
            }
            else {
                alt29=66;}
            }
            break;
        case '*':
            {
            switch ( input.LA(2) ) {
            case '=':
                {
                alt29=67;
                }
                break;
            case '*':
                {
                alt29=110;
                }
                break;
            default:
                alt29=100;}

            }
            break;
        case '/':
            {
            switch ( input.LA(2) ) {
            case '=':
                {
                alt29=68;
                }
                break;
            case '/':
                {
                alt29=112;
                }
                break;
            case '*':
                {
                alt29=111;
                }
                break;
            default:
                alt29=101;}

            }
            break;
        case '%':
            {
            int LA29_40 = input.LA(2);

            if ( (LA29_40=='=') ) {
                alt29=69;
            }
            else {
                alt29=102;}
            }
            break;
        case '+':
            {
            switch ( input.LA(2) ) {
            case '+':
                {
                alt29=96;
                }
                break;
            case '=':
                {
                alt29=70;
                }
                break;
            default:
                alt29=98;}

            }
            break;
        case '>':
            {
            switch ( input.LA(2) ) {
            case '>':
                {
                int LA29_115 = input.LA(3);

                if ( (LA29_115=='=') ) {
                    alt29=73;
                }
                else {
                    alt29=87;}
                }
                break;
            case '=':
                {
                alt29=90;
                }
                break;
            default:
                alt29=92;}

            }
            break;
        case '&':
            {
            switch ( input.LA(2) ) {
            case '=':
                {
                alt29=74;
                }
                break;
            case '&':
                {
                alt29=81;
                }
                break;
            default:
                alt29=95;}

            }
            break;
        case '^':
            {
            int LA29_44 = input.LA(2);

            if ( (LA29_44=='=') ) {
                alt29=75;
            }
            else {
                alt29=93;}
            }
            break;
        case '|':
            {
            switch ( input.LA(2) ) {
            case '=':
                {
                alt29=76;
                }
                break;
            case '|':
                {
                alt29=80;
                }
                break;
            case '>':
                {
                alt29=106;
                }
                break;
            default:
                alt29=94;}

            }
            break;
        case '!':
            {
            int LA29_46 = input.LA(2);

            if ( (LA29_46=='=') ) {
                int LA29_127 = input.LA(3);

                if ( (LA29_127=='=') ) {
                    alt29=83;
                }
                else {
                    alt29=85;}
            }
            else {
                alt29=103;}
            }
            break;
        case '~':
            {
            alt29=104;
            }
            break;
        case '#':
            {
            alt29=107;
            }
            break;
        case '\n':
        case '\r':
            {
            alt29=108;
            }
            break;
        case '\t':
        case '\u000B':
        case '\f':
        case ' ':
        case '\u00A0':
            {
            alt29=109;
            }
            break;
        default:
            if (backtracking>0) {failed=true; return ;}
            NoViableAltException nvae =
                new NoViableAltException("1:1: Tokens : ( Abstract | Native | Once | Override | Static | Virtual | Const | Final | ReadOnly | Using | As | Class | Enum | Mixin | Public | Protected | Private | Internal | New | This | Super | It | Null | Break | Continue | For | If | Else | Return | Throw | While | Try | Catch | Finally | Switch | Case | Default | False | True | RangeExclOld | RangeExcl | Range | Dot | T129 | T130 | T131 | AtId | Id | Number | String | Uri | Dsl | LB | RB | LP | RP | LC | RC | Comma | DoubleColon | Define | Colon | Semi | QuArrow | Arrow | Assign | MulAss | DivAss | ModAss | AddAss | SubAss | LShiftAss | RShiftAss | BAndAss | BNotAss | PipeAss | QuDot | Elvis | Qu | Or | And | SEq | NSEq | Eq | NEq | LShift | RShift | LEG | LE | GE | LT | GT | BNot | Pipe | BAnd | Incr | Decr | Add | Sub | Mul | Div | Mod | Not | Inv | DslStart | DslEnd | Pound | EOL | WS | DocComment | Comment | LineComment );", 29, 0, input);

            throw nvae;
        }

        switch (alt29) {
            case 1 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:10: Abstract
                {
                mAbstract(); if (failed) return ;

                }
                break;
            case 2 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:19: Native
                {
                mNative(); if (failed) return ;

                }
                break;
            case 3 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:26: Once
                {
                mOnce(); if (failed) return ;

                }
                break;
            case 4 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:31: Override
                {
                mOverride(); if (failed) return ;

                }
                break;
            case 5 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:40: Static
                {
                mStatic(); if (failed) return ;

                }
                break;
            case 6 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:47: Virtual
                {
                mVirtual(); if (failed) return ;

                }
                break;
            case 7 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:55: Const
                {
                mConst(); if (failed) return ;

                }
                break;
            case 8 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:61: Final
                {
                mFinal(); if (failed) return ;

                }
                break;
            case 9 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:67: ReadOnly
                {
                mReadOnly(); if (failed) return ;

                }
                break;
            case 10 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:76: Using
                {
                mUsing(); if (failed) return ;

                }
                break;
            case 11 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:82: As
                {
                mAs(); if (failed) return ;

                }
                break;
            case 12 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:85: Class
                {
                mClass(); if (failed) return ;

                }
                break;
            case 13 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:91: Enum
                {
                mEnum(); if (failed) return ;

                }
                break;
            case 14 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:96: Mixin
                {
                mMixin(); if (failed) return ;

                }
                break;
            case 15 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:102: Public
                {
                mPublic(); if (failed) return ;

                }
                break;
            case 16 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:109: Protected
                {
                mProtected(); if (failed) return ;

                }
                break;
            case 17 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:119: Private
                {
                mPrivate(); if (failed) return ;

                }
                break;
            case 18 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:127: Internal
                {
                mInternal(); if (failed) return ;

                }
                break;
            case 19 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:136: New
                {
                mNew(); if (failed) return ;

                }
                break;
            case 20 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:140: This
                {
                mThis(); if (failed) return ;

                }
                break;
            case 21 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:145: Super
                {
                mSuper(); if (failed) return ;

                }
                break;
            case 22 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:151: It
                {
                mIt(); if (failed) return ;

                }
                break;
            case 23 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:154: Null
                {
                mNull(); if (failed) return ;

                }
                break;
            case 24 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:159: Break
                {
                mBreak(); if (failed) return ;

                }
                break;
            case 25 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:165: Continue
                {
                mContinue(); if (failed) return ;

                }
                break;
            case 26 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:174: For
                {
                mFor(); if (failed) return ;

                }
                break;
            case 27 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:178: If
                {
                mIf(); if (failed) return ;

                }
                break;
            case 28 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:181: Else
                {
                mElse(); if (failed) return ;

                }
                break;
            case 29 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:186: Return
                {
                mReturn(); if (failed) return ;

                }
                break;
            case 30 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:193: Throw
                {
                mThrow(); if (failed) return ;

                }
                break;
            case 31 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:199: While
                {
                mWhile(); if (failed) return ;

                }
                break;
            case 32 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:205: Try
                {
                mTry(); if (failed) return ;

                }
                break;
            case 33 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:209: Catch
                {
                mCatch(); if (failed) return ;

                }
                break;
            case 34 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:215: Finally
                {
                mFinally(); if (failed) return ;

                }
                break;
            case 35 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:223: Switch
                {
                mSwitch(); if (failed) return ;

                }
                break;
            case 36 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:230: Case
                {
                mCase(); if (failed) return ;

                }
                break;
            case 37 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:235: Default
                {
                mDefault(); if (failed) return ;

                }
                break;
            case 38 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:243: False
                {
                mFalse(); if (failed) return ;

                }
                break;
            case 39 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:249: True
                {
                mTrue(); if (failed) return ;

                }
                break;
            case 40 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:254: RangeExclOld
                {
                mRangeExclOld(); if (failed) return ;

                }
                break;
            case 41 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:267: RangeExcl
                {
                mRangeExcl(); if (failed) return ;

                }
                break;
            case 42 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:277: Range
                {
                mRange(); if (failed) return ;

                }
                break;
            case 43 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:283: Dot
                {
                mDot(); if (failed) return ;

                }
                break;
            case 44 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:287: T129
                {
                mT129(); if (failed) return ;

                }
                break;
            case 45 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:292: T130
                {
                mT130(); if (failed) return ;

                }
                break;
            case 46 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:297: T131
                {
                mT131(); if (failed) return ;

                }
                break;
            case 47 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:302: AtId
                {
                mAtId(); if (failed) return ;

                }
                break;
            case 48 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:307: Id
                {
                mId(); if (failed) return ;

                }
                break;
            case 49 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:310: Number
                {
                mNumber(); if (failed) return ;

                }
                break;
            case 50 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:317: String
                {
                mString(); if (failed) return ;

                }
                break;
            case 51 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:324: Uri
                {
                mUri(); if (failed) return ;

                }
                break;
            case 52 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:328: Dsl
                {
                mDsl(); if (failed) return ;

                }
                break;
            case 53 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:332: LB
                {
                mLB(); if (failed) return ;

                }
                break;
            case 54 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:335: RB
                {
                mRB(); if (failed) return ;

                }
                break;
            case 55 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:338: LP
                {
                mLP(); if (failed) return ;

                }
                break;
            case 56 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:341: RP
                {
                mRP(); if (failed) return ;

                }
                break;
            case 57 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:344: LC
                {
                mLC(); if (failed) return ;

                }
                break;
            case 58 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:347: RC
                {
                mRC(); if (failed) return ;

                }
                break;
            case 59 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:350: Comma
                {
                mComma(); if (failed) return ;

                }
                break;
            case 60 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:356: DoubleColon
                {
                mDoubleColon(); if (failed) return ;

                }
                break;
            case 61 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:368: Define
                {
                mDefine(); if (failed) return ;

                }
                break;
            case 62 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:375: Colon
                {
                mColon(); if (failed) return ;

                }
                break;
            case 63 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:381: Semi
                {
                mSemi(); if (failed) return ;

                }
                break;
            case 64 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:386: QuArrow
                {
                mQuArrow(); if (failed) return ;

                }
                break;
            case 65 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:394: Arrow
                {
                mArrow(); if (failed) return ;

                }
                break;
            case 66 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:400: Assign
                {
                mAssign(); if (failed) return ;

                }
                break;
            case 67 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:407: MulAss
                {
                mMulAss(); if (failed) return ;

                }
                break;
            case 68 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:414: DivAss
                {
                mDivAss(); if (failed) return ;

                }
                break;
            case 69 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:421: ModAss
                {
                mModAss(); if (failed) return ;

                }
                break;
            case 70 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:428: AddAss
                {
                mAddAss(); if (failed) return ;

                }
                break;
            case 71 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:435: SubAss
                {
                mSubAss(); if (failed) return ;

                }
                break;
            case 72 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:442: LShiftAss
                {
                mLShiftAss(); if (failed) return ;

                }
                break;
            case 73 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:452: RShiftAss
                {
                mRShiftAss(); if (failed) return ;

                }
                break;
            case 74 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:462: BAndAss
                {
                mBAndAss(); if (failed) return ;

                }
                break;
            case 75 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:470: BNotAss
                {
                mBNotAss(); if (failed) return ;

                }
                break;
            case 76 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:478: PipeAss
                {
                mPipeAss(); if (failed) return ;

                }
                break;
            case 77 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:486: QuDot
                {
                mQuDot(); if (failed) return ;

                }
                break;
            case 78 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:492: Elvis
                {
                mElvis(); if (failed) return ;

                }
                break;
            case 79 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:498: Qu
                {
                mQu(); if (failed) return ;

                }
                break;
            case 80 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:501: Or
                {
                mOr(); if (failed) return ;

                }
                break;
            case 81 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:504: And
                {
                mAnd(); if (failed) return ;

                }
                break;
            case 82 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:508: SEq
                {
                mSEq(); if (failed) return ;

                }
                break;
            case 83 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:512: NSEq
                {
                mNSEq(); if (failed) return ;

                }
                break;
            case 84 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:517: Eq
                {
                mEq(); if (failed) return ;

                }
                break;
            case 85 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:520: NEq
                {
                mNEq(); if (failed) return ;

                }
                break;
            case 86 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:524: LShift
                {
                mLShift(); if (failed) return ;

                }
                break;
            case 87 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:531: RShift
                {
                mRShift(); if (failed) return ;

                }
                break;
            case 88 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:538: LEG
                {
                mLEG(); if (failed) return ;

                }
                break;
            case 89 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:542: LE
                {
                mLE(); if (failed) return ;

                }
                break;
            case 90 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:545: GE
                {
                mGE(); if (failed) return ;

                }
                break;
            case 91 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:548: LT
                {
                mLT(); if (failed) return ;

                }
                break;
            case 92 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:551: GT
                {
                mGT(); if (failed) return ;

                }
                break;
            case 93 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:554: BNot
                {
                mBNot(); if (failed) return ;

                }
                break;
            case 94 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:559: Pipe
                {
                mPipe(); if (failed) return ;

                }
                break;
            case 95 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:564: BAnd
                {
                mBAnd(); if (failed) return ;

                }
                break;
            case 96 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:569: Incr
                {
                mIncr(); if (failed) return ;

                }
                break;
            case 97 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:574: Decr
                {
                mDecr(); if (failed) return ;

                }
                break;
            case 98 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:579: Add
                {
                mAdd(); if (failed) return ;

                }
                break;
            case 99 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:583: Sub
                {
                mSub(); if (failed) return ;

                }
                break;
            case 100 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:587: Mul
                {
                mMul(); if (failed) return ;

                }
                break;
            case 101 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:591: Div
                {
                mDiv(); if (failed) return ;

                }
                break;
            case 102 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:595: Mod
                {
                mMod(); if (failed) return ;

                }
                break;
            case 103 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:599: Not
                {
                mNot(); if (failed) return ;

                }
                break;
            case 104 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:603: Inv
                {
                mInv(); if (failed) return ;

                }
                break;
            case 105 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:607: DslStart
                {
                mDslStart(); if (failed) return ;

                }
                break;
            case 106 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:616: DslEnd
                {
                mDslEnd(); if (failed) return ;

                }
                break;
            case 107 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:623: Pound
                {
                mPound(); if (failed) return ;

                }
                break;
            case 108 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:629: EOL
                {
                mEOL(); if (failed) return ;

                }
                break;
            case 109 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:633: WS
                {
                mWS(); if (failed) return ;

                }
                break;
            case 110 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:636: DocComment
                {
                mDocComment(); if (failed) return ;

                }
                break;
            case 111 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:647: Comment
                {
                mComment(); if (failed) return ;

                }
                break;
            case 112 :
                // C:\\Documents and Settings\\Anastasia.MAZAF\\FAN workspace\\com.xored.fanide.core\\src\\com\\xored\\fanide\\internal\\core\\parser\\Fan_v1_0_.g:1:655: LineComment
                {
                mLineComment(); if (failed) return ;

                }
                break;

        }

    }


    protected DFA16 dfa16 = new DFA16(this);
    static final String DFA16_eotS =
        "\1\uffff\1\7\1\uffff\1\7\2\uffff\1\7\2\uffff\1\15\4\uffff";
    static final String DFA16_eofS =
        "\16\uffff";
    static final String DFA16_minS =
        "\1\47\1\56\1\uffff\1\56\2\uffff\1\56\1\uffff\2\56\4\uffff";
    static final String DFA16_maxS =
        "\1\71\1\170\1\uffff\1\137\2\uffff\1\137\1\uffff\1\172\1\74\4\uffff";
    static final String DFA16_acceptS =
        "\2\uffff\1\5\1\uffff\1\10\1\7\1\uffff\1\6\2\uffff\1\1\1\3\1\2\1"+
        "\4";
    static final String DFA16_specialS =
        "\16\uffff}>";
    static final String[] DFA16_transitionS = {
            "\1\4\6\uffff\1\2\1\uffff\1\1\11\3",
            "\1\10\1\uffff\12\6\36\uffff\1\5\6\uffff\1\6\30\uffff\1\5",
            "",
            "\1\10\1\uffff\12\6\45\uffff\1\6",
            "",
            "",
            "\1\10\1\uffff\12\6\45\uffff\1\6",
            "",
            "\1\11\1\uffff\12\12\7\uffff\32\12\4\uffff\1\12\1\uffff\32"+
            "\12",
            "\1\14\15\uffff\1\13",
            "",
            "",
            "",
            ""
    };

    static final short[] DFA16_eot = DFA.unpackEncodedString(DFA16_eotS);
    static final short[] DFA16_eof = DFA.unpackEncodedString(DFA16_eofS);
    static final char[] DFA16_min = DFA.unpackEncodedStringToUnsignedChars(DFA16_minS);
    static final char[] DFA16_max = DFA.unpackEncodedStringToUnsignedChars(DFA16_maxS);
    static final short[] DFA16_accept = DFA.unpackEncodedString(DFA16_acceptS);
    static final short[] DFA16_special = DFA.unpackEncodedString(DFA16_specialS);
    static final short[][] DFA16_transition;

    static {
        int numStates = DFA16_transitionS.length;
        DFA16_transition = new short[numStates][];
        for (int i=0; i<numStates; i++) {
            DFA16_transition[i] = DFA.unpackEncodedString(DFA16_transitionS[i]);
        }
    }

    class DFA16 extends DFA {

        public DFA16(BaseRecognizer recognizer) {
            this.recognizer = recognizer;
            this.decisionNumber = 16;
            this.eot = DFA16_eot;
            this.eof = DFA16_eof;
            this.min = DFA16_min;
            this.max = DFA16_max;
            this.accept = DFA16_accept;
            this.special = DFA16_special;
            this.transition = DFA16_transition;
        }
        public String getDescription() {
            return "284:1: Number options {backtrack=true; } : (d= Digits dot= '.' (id= Id | Digits ( Exponent )? ( Postfix )? ) | d= Digits r= '...' | d= Digits r= '..<' | d= Digits r= '..' | '.' Digits ( Exponent )? ( Postfix )? | Digits ( Exponent )? ( Postfix )? | '0' ( 'x' | 'X' ) ( HexDigit | '_' )+ | '\\'' ( EscapeSequence | ~ ( '\\'' | '\\\\' ) ) '\\'' );";
        }
    }
 

}