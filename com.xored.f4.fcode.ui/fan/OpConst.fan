//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   talnikov May 17, 2010 - Initial Contribution
//


**
** OpConst
**
internal mixin OpConst
{
//////////////////////////////////////////////////////////////////////////
// OpCodes
//////////////////////////////////////////////////////////////////////////

  static const Int Nop             :=   0 // ()        no operation
  static const Int LoadNull        :=   1 // ()        load null literal onto stack
  static const Int LoadFalse       :=   2 // ()        load false literal onto stack
  static const Int LoadTrue        :=   3 // ()        load true literal onto stack
  static const Int LoadInt         :=   4 // (Int)     load Int const by index onto stack
  static const Int LoadFloat       :=   5 // (float)   load Float const by index onto stack
  static const Int LoadDecimal     :=   6 // (decimal)  load Decimal const by index onto stack
  static const Int LoadStr         :=   7 // (str)     load Str const by index onto stack
  static const Int LoadDuration    :=   8 // (dur)     load Duration const by index onto stack
  static const Int LoadType        :=   9 // (type)    load Type instance by index onto stack
  static const Int LoadUri         :=  10 // (uri)     load Uri const by index onto stack
  static const Int LoadVar         :=  11 // (reg)     local var register index (0 is this)
  static const Int StoreVar        :=  12 // (reg)     local var register index (0 is this)
  static const Int LoadInstance    :=  13 // (field)   load field from storage
  static const Int StoreInstance   :=  14 // (field)   store field to storage
  static const Int LoadStatic      :=  15 // (field)   load static field from storage
  static const Int StoreStatic     :=  16 // (field)   store static field to storage
  static const Int LoadMixinStatic :=  17 // (field)   load static on mixin field from storage
  static const Int StoreMixinStatic :=  18 // (field)   store static on mixin field to storage
  static const Int CallNew         :=  19 // (method)  alloc new object and call constructor
  static const Int CallCtor        :=  20 // (method)  call constructor (used for constructor chaining)
  static const Int CallStatic      :=  21 // (method)  call static method
  static const Int CallVirtual     :=  22 // (method)  call virtual instance method
  static const Int CallNonVirtual  :=  23 // (method)  call instance method non-virtually (private or super only b/c of Java invokespecial)
  static const Int CallMixinStatic :=  24 // (method)  call static mixin method
  static const Int CallMixinVirtual :=  25 // (method)  call virtual mixin method
  static const Int CallMixinNonVirtual :=  26 // (method)  call instance mixin method non-virtually (named super)
  static const Int Jump            :=  27 // (jmp)     unconditional jump
  static const Int JumpTrue        :=  28 // (jmp)     jump if bool true
  static const Int JumpFalse       :=  29 // (jmp)     jump if bool false
  static const Int CompareEQ       :=  30 // (typePair)  a.equals(b)
  static const Int CompareNE       :=  31 // (typePair)  !a.equals(b)
  static const Int Compare         :=  32 // (typePair)  a.compare(b)
  static const Int CompareLE       :=  33 // (typePair)  a.compare(b) <:= 0
  static const Int CompareLT       :=  34 // (typePair)  a.compare(b) < 0
  static const Int CompareGT       :=  35 // (typePair)  a.compare(b) > 0
  static const Int CompareGE       :=  36 // (typePair)  a.compare(b) >:= 0
  static const Int CompareSame     :=  37 // ()        a :=:=:= b
  static const Int CompareNotSame  :=  38 // ()        a !:=:= b
  static const Int CompareNull     :=  39 // (type)    a :=:= null
  static const Int CompareNotNull  :=  40 // (type)    a !:= null
  static const Int Return          :=  41 // ()        return from method
  static const Int Pop             :=  42 // (type)    pop top object off stack
  static const Int Dup             :=  43 // (type)    duplicate object ref on top of stack
  static const Int Is              :=  44 // (type)    is operator
  static const Int As              :=  45 // (type)    as operator
  static const Int Coerce          :=  46 // (typePair)  from->to coercion value/reference/nullable
  static const Int Switch          :=  47 // ()        switch jump table 2 count + 2*count
  static const Int Throw           :=  48 // ()        throw Err on top of stack
  static const Int Leave           :=  49 // (jmp)     jump out of a try or catch block
  static const Int JumpFinally     :=  50 // (jmp)     jump to a finally block
  static const Int CatchAllStart   :=  51 // ()        start catch all block - do not leave Err on stack
  static const Int CatchErrStart   :=  52 // (type)    start catch block - leave typed Err on stack
  static const Int CatchEnd        :=  53 // ()        start catch block - leave typed Err on stack
  static const Int FinallyStart    :=  54 // ()        starting instruction of a finally block
  static const Int FinallyEnd      :=  55 // ()        ending instruction of a finally block

  static const Str[] OpNames :=
  [
    "Nop",                //   0
    "LoadNull",           //   1
    "LoadFalse",          //   2
    "LoadTrue",           //   3
    "LoadInt",            //   4
    "LoadFloat",          //   5
    "LoadDecimal",        //   6
    "LoadStr",            //   7
    "LoadDuration",       //   8
    "LoadType",           //   9
    "LoadUri",            //  10
    "LoadVar",            //  11
    "StoreVar",           //  12
    "LoadInstance",       //  13
    "StoreInstance",      //  14
    "LoadStatic",         //  15
    "StoreStatic",        //  16
    "LoadMixinStatic",    //  17
    "StoreMixinStatic",   //  18
    "CallNew",            //  19
    "CallCtor",           //  20
    "CallStatic",         //  21
    "CallVirtual",        //  22
    "CallNonVirtual",     //  23
    "CallMixinStatic",    //  24
    "CallMixinVirtual",   //  25
    "CallMixinNonVirtual",  //  26
    "Jump",               //  27
    "JumpTrue",           //  28
    "JumpFalse",          //  29
    "CompareEQ",          //  30
    "CompareNE",          //  31
    "Compare",            //  32
    "CompareLE",          //  33
    "CompareLT",          //  34
    "CompareGT",          //  35
    "CompareGE",          //  36
    "CompareSame",        //  37
    "CompareNotSame",     //  38
    "CompareNull",        //  39
    "CompareNotNull",     //  40
    "Return",             //  41
    "Pop",                //  42
    "Dup",                //  43
    "Is",                 //  44
    "As",                 //  45
    "Coerce",             //  46
    "Switch",             //  47
    "Throw",              //  48
    "Leave",              //  49
    "JumpFinally",        //  50
    "CatchAllStart",      //  51
    "CatchErrStart",      //  52
    "CatchEnd",           //  53
    "FinallyStart",       //  54
    "FinallyEnd",         //  55
  ]

  static const Str[] OpSigs :=
  [
    "()",         //   0 Nop
    "()",         //   1 LoadNull
    "()",         //   2 LoadFalse
    "()",         //   3 LoadTrue
    "(int)",      //   4 LoadInt
    "(float)",    //   5 LoadFloat
    "(decimal)",  //   6 LoadDecimal
    "(str)",      //   7 LoadStr
    "(dur)",      //   8 LoadDuration
    "(type)",     //   9 LoadType
    "(uri)",      //  10 LoadUri
    "(reg)",      //  11 LoadVar
    "(reg)",      //  12 StoreVar
    "(field)",    //  13 LoadInstance
    "(field)",    //  14 StoreInstance
    "(field)",    //  15 LoadStatic
    "(field)",    //  16 StoreStatic
    "(field)",    //  17 LoadMixinStatic
    "(field)",    //  18 StoreMixinStatic
    "(method)",   //  19 CallNew
    "(method)",   //  20 CallCtor
    "(method)",   //  21 CallStatic
    "(method)",   //  22 CallVirtual
    "(method)",   //  23 CallNonVirtual
    "(method)",   //  24 CallMixinStatic
    "(method)",   //  25 CallMixinVirtual
    "(method)",   //  26 CallMixinNonVirtual
    "(jmp)",      //  27 Jump
    "(jmp)",      //  28 JumpTrue
    "(jmp)",      //  29 JumpFalse
    "(typePair)",  //  30 CompareEQ
    "(typePair)",  //  31 CompareNE
    "(typePair)",  //  32 Compare
    "(typePair)",  //  33 CompareLE
    "(typePair)",  //  34 CompareLT
    "(typePair)",  //  35 CompareGT
    "(typePair)",  //  36 CompareGE
    "()",         //  37 CompareSame
    "()",         //  38 CompareNotSame
    "(type)",     //  39 CompareNull
    "(type)",     //  40 CompareNotNull
    "()",         //  41 Return
    "(type)",     //  42 Pop
    "(type)",     //  43 Dup
    "(type)",     //  44 Is
    "(type)",     //  45 As
    "(typePair)",  //  46 Coerce
    "()",         //  47 Switch
    "()",         //  48 Throw
    "(jmp)",      //  49 Leave
    "(jmp)",      //  50 JumpFinally
    "()",         //  51 CatchAllStart
    "(type)",     //  52 CatchErrStart
    "()",         //  53 CatchEnd
    "()",         //  54 FinallyStart
    "()",         //  55 FinallyEnd
  ]
}
