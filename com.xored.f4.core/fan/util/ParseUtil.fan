//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 19, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.core
using "[java]com.xored.fanide.internal.core.model"::PodFragment
using [java]org.eclipse.core.runtime::IPath

using f4parser
using f4model
**
**
**
class ParseUtil : TypeUtil
{
  static Bool inherits(IFanType? t, Str qNameBase, IFanNamespace ns)
  {
    t != null && t.inheritance.any |Str baseName -> Bool|
    {
      baseType := ns.findType(baseName)	
      return baseType.qname == qNameBase || inherits(baseType, qNameBase, ns)
    }
  }
  
  static Str[] typeNames(ISourceModule module)
  {
    parse(module).types.map |TypeDef t -> Str|
    {
      t.name.text
    }
  }
  static CUnit parse(ISourceModule module)
  {
    //(SourceParserUtil.parse(module, null) as DltkAst).unit
    Parser(module.getSource, ns(module)).cunit
  }
  
  static IFanNamespace ns(ISourceModule module)
  {
    sp := module.getScriptProject
    fp := FantomProjectManager.instance[sp.getProject]
    if( module.isBinary)
      {
      fragment := module.getAncestor(IModelElement.PROJECT_FRAGMENT)
      if(fragment is  PodFragment)
      {
        PodFragment fg := (PodFragment)fragment
        podFileName := fg.getPath.lastSegment
        podName := podFileName[0..podFileName.indexr(".")-1]
        return DltkNamespace(fp, podName)
      }
    }
    IFanNamespace? ns
    return module.getResource == null || sp.isOnBuildpath(module.getResource) ? fp.ns : ScriptNamespace(fp, module.getSource)
  }
  
  static Str wordStart(Str content, Int position, Int maxLen := 50)
  {
    if (position < 0 || position > content.size) return ""
    original := position
    while (position >= 0 &&
           maxLen > 0 &&
           isWordChar(content[position]))
    {
      position--
      maxLen--
    }
    return content[position+1..original]
  }
  
  static Str lineStart(Str content, Int position)
  {
    if (position <= 0 || position > content.size) return ""
    original := position
    while (position > 0
        && content[position] != '\n')
    {
      position--
    }
    return content[position..original]
  }
  private static Bool isWordChar(Int char) { char.isAlphaNum || char == '_' }
  
  **
  ** Attempts to split string like pod::type.method. 
  ** If there is no pod, 1st element null,
  ** If there is no method, 2nd element null,
  ** Returns null if string is not recognized
  ** 
  static Str?[]? splitMethod(Str qname)
  {
    m := mq.matcher(qname)
    if(!m.matches) return null
    return [m.group(1), m.group(2), m.group(4)]
  }
 
  **
  ** Parses func type and returns FuncType object
  ** 
  static FuncType parseFuncType(Str funcType)
  {
    try
    {
      return Parser(funcType, EmptyNamespace()).funcType(false)
    }
    catch(Err e)
    {
      e.trace
      return Parser("|Void->Void|", EmptyNamespace()).funcType(false)      
    }
  }
  
  **
  ** Returns true if type is Func type and false if not
  ** 
  static Bool isFuncType(Str type)
  {
    return type.chars.first == '|'
  }
  
  static Bool isNullableType(Str type)
  {
    return type[-1] == '?'
  }
  
  **
  ** Constructs related Func types from original Func type
  ** 
  **    Example: for "|Int i,Str s->Str|" method returns ["|Int i,Str s->Str|", "|Int i->Str|, |->Str|"]
  ** 
  static Str[] computeRelatedFuncTypes(Str originalType)
  {
    buffer := [originalType]
    funcType := parseFuncType(originalType)
    params := funcType.params
    returnType := funcType.returnType == null ? "" : funcType.returnType.toStr
    rest := isNullableType(originalType) ? "?" : ""

    for(Int i := params.size - 1; i >= 0; --i)
    {
      relatedType := StrBuf()
      relatedType.add("|")
      
      if(i > 0)
      {
        if(isFuncType(params.first.ctype.toStr))
          relatedType.add(" ")
        
        // add params list
        relatedType.add(params[0..< i].map |param|
        {
          paramType := param.ctype.toStr
          paramName := param.name != null ? " ${param.name.text}" : ""
          return "${paramType}${paramName}"
        }.join(","))
      }
      
      // add return type
      relatedType.add("->")
      relatedType.add(returnType)
      relatedType.add("|")
      
      relatedType.add(rest)
      
      buffer.add(relatedType.toStr)
    }
    
    return buffer
  }
  
  private static const Regex mq := Regex<|(?:(\w+)::)?(\w+)(.(\w+))?|>

  **
  ** Splits 'type' string so every qname in it will be an entry
  ** of result array. Result of 'join()' call on resulting array,
  ** will be 'type'.
  ** 
  static Str[] splitByQnames(Str type)
  {
    result := Str[,]

    StrBuf buf := StrBuf()

    wasQname := false
    type.each |char, i|
    {
      isQname := isQnamePos(type, i)
      if (i != 0 && isQname != wasQname)
      {
        result.add(buf.toStr)
        buf.clear
      }
      buf.addChar(char)
      wasQname = isQname
    }
    result.add(buf.toStr)

    return result
  }

}
