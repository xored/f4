//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 17, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.ast.references
using [java] java.util::List as JList
using [java] java.util::Map as JMap
using [java] java.util::HashMap as JHashMap
using [java] org.eclipse.core.runtime
using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.core.search
using "[java]org.eclipse.dltk.internal.core"

using f4core
using f4parser
using f4model
using f4core::FantomProjectManager

class CalleeProcessor : ICalleeProcessor
{
  private IMethod? method
  private IDLTKSearchScope? scope
  private IProgressMonitor? monitor
  new make(IMethod? method, IDLTKSearchScope? scope, IProgressMonitor? monitor)
  {
    this.method = method
    this.scope = scope
    this.monitor = monitor
  }
  override JMap? doOperation()
  {
    JMap map := JHashMap()
    if (method?.getSourceModule == null) return map
    CUnit unit := ParseUtil.parse(method.getSourceModule)
    MethodDef meth := getMethodNode(unit)
    meth.body?.accept(MethodVisitor(map))
    return map
  }
  
  private MethodDef? getMethodNode(CUnit unit) {
    unit.types.find |TypeDef type -> Bool| {
      type.name.text == method.getDeclaringType.getElementName 
    }?.slots?.find |SlotDef slot -> Bool| {
      slot is MethodDef && slot->name->text == method.getElementName 
    }
  }
  
}

class MethodVisitor : AstVisitor {
 
  private JMap map
  
  new make(JMap map) {
    this.map = map
  }
  
  override Bool enterNode(Node n) {
    if (n is SlotRef) {
      SlotRef slot := n
      if (slot.modelSlot is IFanMethod) {
        ref := SimpleReference(slot.start, slot.end + 1, slot.text)
        IMethod[] methods := resolve(slot)
        map.put(ref, InteropUtil.toArray(IMethod#, methods))
      }
    }
    return true
  }
  
  private static IMethod[] resolve(SlotRef slot) {
    IMethod[] methods := [,]
    project := FantomProjectManager.instance.getByPodName(slot.modelSlot.type.pod)
    if( project == null) return methods
    project.scriptProject.getScriptFolders.each {
      ((IScriptFolder)it).getSourceModules.each {
        IType? type := ((ISourceModule)it).getTypes().find |IType type -> Bool| {
          type.getElementName == slot.modelSlot.type.name
        }
        method := type?.getMethod(slot.text)
        if (method != null) methods.add(method)
      }
    }
    return methods
  }
} 