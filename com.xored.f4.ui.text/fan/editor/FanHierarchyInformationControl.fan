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
using [java]org.eclipse.jdt.core/*org.eclipse.dltk.core*/::IMethod
using [java]org.eclipse.dltk.core::IImportDeclaration
using [java]org.eclipse.jdt.ui::JavaElementLabels
using [java]org.eclipse.jdt.core::IType
using "[java]org.eclipse.jdt.internal.ui.typehierarchy"::TypeHierarchyLifeCycle
using "[java]org.eclipse.jdt.internal.ui.typehierarchy"::TypeHierarchyViewPart
using "[java]org.eclipse.jdt.internal.ui.typehierarchy"::TraditionalHierarchyContentProvider
using "[java]org.eclipse.jdt.internal.ui.typehierarchy"::SuperTypeHierarchyContentProvider
using "[java]org.eclipse.jdt.internal.ui.text"::NamePatternFilter
using [java]org.eclipse.jdt.core::IMember
using "[java]org.eclipse.jdt.internal.ui.typehierarchy"::HierarchyLabelProvider
using [java]org.eclipse.swt.events::KeyAdapter
using "[java]org.eclipse.jdt.internal.ui.typehierarchy"::TypeHierarchyContentProvider
using "[java]org.eclipse.jdt.internal.corext.util"::MethodOverrideTester

class FanHierarchyInformationControl : HierarchyInformationControl
{
  private TypeHierarchyLifeCycle? lifeCycle
  private TypeHierarchyViewPart part
  private Bool fDoFilter
  private IMethod? fFocus // method to filter for or null if type hierarchy
  
  private HierarchyLabelProvider? fLabelProvider
  private KeyAdapter? fKeyAdapter

  private Obj?[]? fOtherExpandedElements := [,]
  private TypeHierarchyContentProvider? fOtherContentProvider
  private MethodOverrideTester? fMethodOverrideTester
  
	new make(Shell parent, Int shellStyle, Int treeStyle)
  : super(parent, shellStyle, treeStyle) 
  {
    part = TypeHierarchyViewPart()
    lifeCycle = TypeHierarchyLifeCycle(part)
  }
  
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
    
    TraditionalHierarchyContentProvider contentProvider := TraditionalHierarchyContentProvider(lifeCycle)
//    contentProvider.setMemberFilter(memberFilter)
    getTreeViewer.setContentProvider(contentProvider)
    
    fOtherContentProvider := SuperTypeHierarchyContentProvider(lifeCycle)
//    fOtherContentProvider.setMemberFilter(memberFilter)
    
    
    Obj[] topLevelObjects := contentProvider.getElements(lifeCycle)
    if (topLevelObjects.size > 0 && contentProvider.getChildren(topLevelObjects[0]).size > 40) {
      fDoFilter = false
    } else {
//      filter := NamePatternFilter()
//      getTreeViewer.addFilter(filter)
    }

    selection := null
    if (input is IMember) {
      selection =  input
    } else if (topLevelObjects.size > 0) {
      selection =  topLevelObjects[0]
    }
    inputChanged(lifeCycle, selection)
  }
  
  override protected Void stringMatcherUpdated() {
    if (fDoFilter) {
      super.stringMatcherUpdated // refresh the view
    } else {
      selectFirstMatch
    }
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
  
  override protected Str? getId() {
    "com.xored.f4.ui.text.editor.QuickHierarchy"
  }
  
  private IMethod? findMethod(IMethod filterMethod, IType typeToFindIn) {
    IType filterType := filterMethod.getDeclaringType
    if (filterType.equals(typeToFindIn)) {
      return filterMethod
    }
    
    hierarchy := lifeCycle.getHierarchy

    Bool filterOverrides := true//JavaModelUtil.isSuperType(hierarchy, typeToFindIn, filterType)
    IType focusType := filterOverrides ? filterType : typeToFindIn

    if (fMethodOverrideTester == null || !fMethodOverrideTester.getFocusType.equals(focusType)) {
      fMethodOverrideTester = MethodOverrideTester(focusType, hierarchy)
    }

    if (filterOverrides) {
      return fMethodOverrideTester.findOverriddenMethodInType((IType)typeToFindIn, (IMethod)filterMethod)
    } else {
      return fMethodOverrideTester.findOverridingMethodInType(typeToFindIn, filterMethod)
    }
  }
  
  override protected Obj? getSelectedElement() {
    Obj selectedElement := super.getSelectedElement
    if (selectedElement is IType && fFocus != null) {
      IType type := (IType) selectedElement
      IMethod? method := findMethod(fFocus, type)
      if (method != null) {
        return method
      }
    }
    return selectedElement
  }
}
