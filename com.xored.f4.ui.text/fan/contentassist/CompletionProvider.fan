//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 19, 2010 - Initial Contribution
//

using [java]org.eclipse.dltk.core::CompletionProposal
using [java]org.eclipse.dltk.core::IModelElement
using [java]org.eclipse.dltk.core::IMember
using [java]org.eclipse.dltk.core.model::LocalVariable

using f4core
using f4model
using f4parser
**************************************************************************
** CompletionReporter 
**************************************************************************

**
** This class allows to create and report completion proposals
** We don't create a separate Fantom class for completion proposals
** as it seems there is no need for that and use just DLTK CompletionProposal
** 
mixin CompletionReporter
{
  abstract CompletionProposal create(ProposeKind kind)
  abstract Void report(CompletionProposal proposal)
  abstract Bool ignores(ProposeKind kind)
}

**************************************************************************
** CompletionProvider
**************************************************************************
**
** Base class for providing completions
**
abstract class CompletionProvider
{
  protected IFanNamespace ns
  protected Str src
  protected CUnit unit
  
  protected Int? pos
  ** word prefix, used for filtering
  protected Str? prefix
  protected CompletionReporter? reporter
  
  new make(IFanNamespace ns, Str src, CUnit unit)
  {
    this.ns = ns
    this.src = src
    this.unit = unit
  }

  **
  ** Sets input for completion
  ** If this particular provider is not applicable
  ** for input, it should return false
  ** Default implementation just sets corresponding fields
  ** and returns true
  ** 
  virtual Bool setInput(Int pos, Str prefix)
  {
    this.pos = pos
    this.prefix = prefix
    return true
  }
  
  **
  ** This method provides completions for previously set input to reporter
  ** Returns 'true' if no other providers should be called. 
  ** Default implementation just returns false   
  ** 
  virtual Bool complete(CompletionReporter reporter)
  {
    this.reporter = reporter
    return false
  }
  
  **
  ** Helper method to report bunch of slots
  ** 
  protected Void reportSlots(IFanSlot[] slots)
  {
    slots = slots.findAll { it.name.startsWith(prefix) }
    slots.each |slot|
    {
      if(slot.isField) reportField(slot)
      else if(slot.isMethod) reportMethod(slot) 
    }
  }

  **
  ** Helper to report field
  ** 
  protected Void reportField(IFanSlot field)
  {
    if(reporter.ignores(ProposeKind.field)) return
    reporter.report(createProposal(ProposeKind.field, field.name, field.me))
  }

  protected Void reportMethod(IFanMethod method)
  {
    params := method.params
   
    if(reporter.ignores(ProposeKind.method)) return

    required := params.findIndex { it.hasDefault }
    if (required == null) { required = params.size }

    for (i := required; i < params.size + 1; i++)
    {
      curParams := params[0..< i]
      allRelatedParams := [curParams]
      curParams.each |param, index| 
      {
        // generate all variants of Func type
        if(ParseUtil.isFuncType(param.of))
        {
          relatedTypes := ParseUtil.computeRelatedFuncTypes(param.of)
          allRelatedParamsSize := allRelatedParams.size
          relatedTypes[1..-1].each |type|
          {
            for(Int j := 0; j < allRelatedParamsSize; ++j)
            {
              originalRelatedParams := allRelatedParams[j]
              relatedParams := originalRelatedParams[0..-1]
              originalParam := originalRelatedParams[index]
              relatedParams[index] = FakeFanParam.fake(originalParam.name, 
                  type, originalParam.hasDefault)
              
              allRelatedParams.add(relatedParams)
            }
          }
        }
      }
      
      allRelatedParams.each |relatedParams|
      {
        proposal := createProposal(ProposeKind.method, method.name, method.me)
        proposal.setIsConstructor(method.isCtor)
        proposal.setParameterNames(relatedParams.map{ it.name } as Str[])
        proposal.setExtraInfo(FanMethodCompletionProposalExtraInfo(method, relatedParams))
        reporter.report(proposal)
      }
    }
  }

  protected Void reportPodTypes(IFanPod? pod)
  {
    if(pod == null || reporter.ignores(ProposeKind.type)) return
    pod.typeNames
      .findAll { it.startsWith(prefix) }
      .each { reportType(pod.findType(it)) }
  }
  
  protected Void reportNsTypes()
  {
    if(reporter.ignores(ProposeKind.type)) return
    ns.podNames.each
    {
      reportPodTypes(ns.findPod(it))
    }
  }
  
  protected Void reportFFI()
  {
    if(reporter.ignores(ProposeKind.type)) return
    unit.usings.each { 
      if( it.typeName != null && it.typeName.resolvedType != null )
      {
        Str? tname := (it.asTypeName != null)?it.asTypeName.text:it.typeName.text
        if( tname != null) 
        {
          if( tname.startsWith(prefix))
          {
            reporter.report(createProposal(ProposeKind.type, tname , it.typeName.resolvedType.me))          
          }
        }
      }
      else if( !ns.podNames.contains(it.podName.text))
      {
        if( it.podName.modelPod != null )
        {
          modelpod := it.podName.modelPod
          types := modelpod.typeNames
          types.each {
            if( it.startsWith(prefix))
            {
              type := modelpod.findType(it)
              if( type != null )
                reporter.report(createProposal(ProposeKind.type, it , type.me))          
            }
          }
        }
      }
    }
  }
  
  protected Void reportPod(IFanPod? pod)
  {
    if(pod == null) return
    if(reporter.ignores(ProposeKind.pod)) return
    reporter.report(createProposal(ProposeKind.pod, pod.name))
  }
  
  protected Void reportNsPods()
  {
    if(reporter.ignores(ProposeKind.pod)) return
    ns.podNames.each 
    {
      if(it.startsWith(prefix) && it != ns.currPod.name)
        reportPod(ns.findPod(it)) 
    }
  }
  
  protected Void reportType(IFanType type)
  {
    if(reporter.ignores(ProposeKind.type)) return
    
    reporter.report(createProposal(ProposeKind.type, type.name, type.me))
  }
  
  protected Void reportLocal(Str name, Str? type := null, IModelElement? parent := null)
  {    
    if(reporter.ignores(ProposeKind.var) || !name.startsWith(prefix)) return
    if(type == null || parent == null)
    {
      reporter.report(createProposal(ProposeKind.var, name))
      return
    }
    
    // TODO: set actual declaration location and name location
    locaVar := LocalVariable(
        parent, //parent
        name, //name
        -1, -1, //declaration location
        -1, -1, //name location
        type
        )
    
    reporter.report(createProposal(ProposeKind.var, name, locaVar))
  }
  
  protected Void reportKeywords(Str[] keywords)
  {
    if(reporter.ignores(ProposeKind.keyword)) return
    keywords.each |kw|
    {
      if(!kw.startsWith(prefix)) return
      reporter.report(createProposal(ProposeKind.keyword, kw))
    }
  }
  
  protected Void reportDefaultCtor()
  {
    if(!"make".startsWith(prefix)) return
    if(reporter.ignores(ProposeKind.method)) return
    proposal := createProposal(ProposeKind.field, "make")
    proposal.setIsConstructor(true)
    proposal.setFlags(FanModifiers.AccPublic)
    reporter.report(proposal)
  }

  protected CompletionProposal createProposal(ProposeKind kind, Str name, IModelElement? me := null)
  {
    proposal := reporter.create(kind)
    proposal.setName(name)
    proposal.setCompletion(name)
    proposal.setRelevance(kind.relevance.val)
    proposal.setModelElement(me)
    if(me is IMember) 
    {
      proposal.setFlags((me as IMember).getFlags)
    }
    return proposal
  }
}

