//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Dmitriy Malyugin July 26, 2010 - Initial Contribution
//

using [java] java.util

using [java] org.eclipse.dltk.ui
using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.ui.text.completion
using [java] org.eclipse.dltk.ui.text.completion::ScriptMethodCompletionProposal
using [java] org.eclipse.dltk.ui.text.completion::ReplacementBuffer as IReplacementBuffer
using [java] org.eclipse.jface.preference
using [java] org.eclipse.swt.graphics
using [java] org.eclipse.jface.text
using [java] fanx.interop

using f4model
using f4parser
using f4core

class FanMethodCompletionProposal : ScriptMethodCompletionProposal {
  
  new make(CompletionProposal proposal,
      ScriptContentAssistInvocationContext context)
    : super(proposal, context) {
    }
  
  override protected Void computeReplacement(IReplacementBuffer? buffer) 
  {
    if (!hasArgumentList) {
      return super.computeReplacement(buffer)
    }

    params := (fProposal.getExtraInfo as FanMethodCompletionProposalExtraInfo).params
    
    buffer.append(fProposal.getName)
    if(params.isEmpty) 
    {
      // leave method without brackets
      setCursorPosition(buffer.toString.size)
      return
    }

    setCursorPosition(buffer.toString.size + 1)
    
    // check if last param is Func
    lastClosure := ParseUtil.isFuncType(params.last?.of ?: "") ? params.last : null
    if(lastClosure != null) params = params[0..-2]
    
    argumentOffset := 0
    if(!params.isEmpty) { 
      buffer.append("(")
      
      buffer.append(params.map |param|{ 
        paramName := computeReplacementParam(param, buffer, argumentOffset)         
        argumentOffset += paramName.size + 2
        //param, COMMA and SPACE
        
        return paramName
      }.join(", "))
      
      buffer.append(")")
    }

    if(lastClosure == null) return
    
    // and finally last param
    lastParam := computeReplacementParam(lastClosure, buffer, argumentOffset)
    
    buffer.append(" ")
    buffer.append(lastParam)      
  }
  
  private Str computeReplacementParam(IFanParam param, IReplacementBuffer replacementBuffer, Int baseOffset) {
    Str type := param.of
    
    if (ParseUtil.isFuncType(type)) { 
      return computeReplacementClosureParam(ParseUtil.parseFuncType(type), replacementBuffer, baseOffset)
    }
    
    replacementBuffer.addArgument(baseOffset, param.name.size)
    return param.name
  }
  
  private Str computeReplacementClosureParam(FuncType funcType, IReplacementBuffer replacementBuffer, Int baseOffset) {
    buffer := StrBuf()
    closureParams := funcType.params
    returnType := funcType.returnType == null ? "" : funcType.returnType.toStr
    
    argumentOffset := baseOffset + 1
    // base offset + "|"
    
    if(!closureParams.isEmpty) {
      buffer.add("|")
      
      count := 0
      buffer.add(closureParams.map |closureParam| {
        paramName := closureParam.name != null ? closureParam.name.text : null
        
        if(paramName == null) {
          ++count
          paramName = "p${count}"
        }
        
        replacementBuffer.addArgument(argumentOffset, paramName.size)
        argumentOffset += paramName.size + 2
        //param, COMMA and SPACE
        
        return paramName
      }.join(", "))
      
      buffer.add("|").add(" ")
      argumentOffset += 2
    } else {
//      buffer.add("|").add("->").add(returnType).add("|").add(" ")
//      argumentOffset += 6 + returnType.size
       argumentOffset += 1
    }
    
    buffer.add("{   }")
    replacementBuffer.addArgument(argumentOffset, 1)
    // one space only
    
    return buffer.toStr
  }

  override protected CharArray? computeTriggerCharacters() {
    res := super.computeTriggerCharacters
    for(i := 1;i<res.size;i++)
      if (res[i] == '.') {
        ans := Arrays.copyOf(res,res.size-1)
        ans[i] = res.size-1
        return ans
      }
    return res
  }
}