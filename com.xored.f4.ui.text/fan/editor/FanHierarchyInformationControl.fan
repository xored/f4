//
// Copyright (c) 2011 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Julia 27.09.2012 - Initial Contribution
//

using "[java]org.eclipse.jdt.internal.ui.typehierarchy"::HierarchyInformationControl
using [java] org.eclipse.swt.widgets::Shell
using "[java]org.eclipse.dltk.internal.core"::SourceType
using [java]org.eclipse.dltk.core::IModelElement
using [java]org.eclipse.dltk.core::IMethod
using [java]org.eclipse.dltk.core::IImportDeclaration
using [java]org.eclipse.jdt.ui::JavaElementLabels

class FanHierarchyInformationControl : HierarchyInformationControl
{
	new make(Shell parent, Int shellStyle, Int treeStyle)
  : super(parent, shellStyle, treeStyle) {}
  
  override public Void setInput(Obj? information)
  {
    echo(information)
    echo(((SourceType)information).getElementType)
    
    input := null
    locked := null
    
    element := (SourceType)information
    type := element.getElementType
    switch (type)
    {
      case IModelElement.SCRIPT_PROJECT :
      case IModelElement.TYPE:
        input = element
      
      case IModelElement.METHOD :
        IMethod method := (IMethod) element
        if (!method.isConstructor) {
          locked = method
        }
        input = method.getDeclaringType
      
      case IModelElement.FIELD:
        input = element.getDeclaringType
      
      case IModelElement.PACKAGE_DECLARATION :
        input = element.getParent.getParent
      
//    case IModelElement.IMPORT_DECLARATION :
//      IImportDeclaration decl := (IImportDeclaration) element
//      input = decl.getJavaProject().findType(decl.getElementName())
      default: 
        echo("Error in switch")
    }
    
    super.setTitleText(getHeaderLabel(locked == null ? input : locked))
//    super.fLifeCycle.ensureRefreshedTypeHierarchy(input, JavaPlugin.getActiveWorkbenchWindow)
    memberFilter := (locked != null) ? [locked] : null
    
    
    
  }
  
  private Str getHeaderLabel(IModelElement? input) {
    if (input is IMethod) {
//      Str[] args := [ JavaElementLabels.getElementLabel(input.getParent, JavaElementLabels.ALL_DEFAULT), JavaElementLabels.getElementLabel(input, JavaElementLabels.ALL_DEFAULT) ]
      return input.getParent.getElementName//Messages.format(TypeHierarchyMessages.HierarchyInformationControl_methodhierarchy_label, args);
    } else if (input != null) {
//      Str arg := JavaElementLabels.getElementLabel(input, JavaElementLabels.DEFAULT_QUALIFIED);
      return input.getElementName//Messages.format(TypeHierarchyMessages.HierarchyInformationControl_hierarchy_label, arg);
    } else {
      return ""; //$NON-NLS-1$
    }
  }
  
}
