//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   ivaninozemtsev Apr 30, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.core::IType
using [java] org.eclipse.dltk.core::IModelElement
using [java] org.eclipse.dltk.core::IField
using [java] org.eclipse.dltk.core::IMethod
using [java] org.eclipse.dltk.core::ISourceModule
using [java] org.eclipse.dltk.core::IImportContainer
using [java] org.eclipse.dltk.core::IImportDeclaration
using f4model
using f4parser

**
**
**
const class DltkType : IFanType, Flags
{
  override const Str pod 
  override const Str name
  override const Str qname
  
  override protected const Str:IFanSlot slotsMap
  override const Str[] inheritance
  override const Int flags
  
  private const Unsafe meHolder
  override IModelElement? me() { meHolder.val }

  override const Str[] params
  override const Str:IFanType parametrization
  override const Str genericQname
  override const Bool isNullable

  private static const Str[] genArgs := ["sys::A","sys::B","sys::C","sys::D","sys::E","sys::F","sys::G","sys::H"]
  new make(Str pod, IType type, [Str:IFanType]? parametrization := null)
  {
    this.pod = pod
    this.name = type.getElementName
    this.qname = "$pod::$name"
    this.flags = type.getFlags
    this.meHolder = Unsafe(type)
    this.inheritance = type.getSuperClasses
    this.isNullable = false
    slotsMap = [Str:IFanSlot][:].setList(
      type.getFields.map |IField f->IFanField| { DltkField(this, f) }
    ) { it.name }.setList(
      type.getMethods.map |IMethod m->IFanMethod| { DltkMethod(this, m) }
    ) { it.name }

    if (qname == "sys::List")
    {
      this.params = ["sys::L", "sys::V"]
      resultParametrization := parametrization ?: [:]
      resultParametrization["sys::L"] = this
      this.parametrization = resultParametrization
      this.genericQname = isGeneric ? qname : (this.parametrization["sys::V"].genericQname + "[]")
    } else if (qname == "sys::Map")
    {
      this.params = ["sys::M", "sys::K", "sys::V"]
      resultParametrization := parametrization ?: [:]
      resultParametrization["sys::M"] = this
      this.parametrization = resultParametrization
      this.genericQname = isGeneric ? qname :
        ("[" + this.parametrization["sys::K"].genericQname + ":" + this.parametrization["sys::V"].genericQname + "]")
    } else if (qname == "sys::Func")
    {
      this.params = ["sys::R"]
      this.parametrization = parametrization ?: [:]
      if (isGeneric)
        this.genericQname = qname
      else
      {
        res := "|"
        genArgs.eachWhile |arg| {
          cur := parametrization[arg]
          if (cur == null) return 0
          res += (res == "|" ? "" : ",") + cur.genericQname
          return null
        }
        retType := parametrization["sys::R"]
        if (res == "|" || retType.qname != "sys::Void")
          res += "->"
        if (retType.qname != "sys::Void")
          res += retType.genericQname
        this.genericQname = res + "|"
      }
    }
    else
    {
      this.params = [,]
      this.parametrization = parametrization ?: [:]
      this.genericQname = qname
    }
  }
  
  Int getFlags(){ this.flags }
  
  override DltkType parameterize(Str:IFanType parametrization)
  {
    return DltkType(pod, me, [:].addAll(this.parametrization).addAll(parametrization))
  }

  **
  ** Substitutes type parameter with actual type if possible, otherwise returns 'type'.
  ** Handles nullable types.
  ** 
  Str evaluateType(Str type)
  {
    splitted := ParseUtil.splitByQnames(type)
    replaced := splitted.map |Str val-> Str | {
      val2 := parametrization[val]?.genericQname
      if( val2 == null)
        val2 = val
      if( val2 != null && val2.trim.startsWith("[java]"))
      {
        val2 = val2[6..-1]
      }
      if( val2 != null && val2.trim.index("::") != null)
      {
        val2 = val2[val2.trim.index("::")+2..-1]
      }
      return val2
    }
    return replaced.join
  }
 
  override Str toStr() { genericQname }
  
  override IFanType toNullable() {
    RtNullableType(this)
  }
  override Str? findImportedType(Str name)
  {
    modelElement := me
    if( modelElement != null)
    {
      ISourceModule sourceModule := modelElement.getAncestor(IModelElement.SOURCE_MODULE)
      IModelElement[]? childs := sourceModule.getChildren
      return childs?.eachWhile |IModelElement e->Str?| {
        if( e.getElementType == IModelElement.IMPORT_CONTAINER)
        {
          IImportContainer ct := e
          IImportDeclaration[] imports := ct.getImports
          return imports.eachWhile |IImportDeclaration import -> Str?| {
            return findImportName(import.getElementName, name)
          }
        }
        return null
      }
    }
    return null
  }
  private Str? findImportName(Str importName, Str name)
  {
    Tokenizer t := Tokenizer(importName)
    TokenVal[] tokens := t.tokenize
    Str newName := ""
    Int i := 0
    while(i < tokens.size)
    {
      cur := tokens[i]
      if( cur.kind == Token.eof)
        break
      if( cur.kind == Token.asKeyword)
      {
        if( importName[cur.end+1..-1].trim == name)
        {
          return newName
        }
        break
      }
      newName += cur.text
      i++
    }
    if( newName.endsWith(name))
    {
      return newName
    }
    return null
  }
}
