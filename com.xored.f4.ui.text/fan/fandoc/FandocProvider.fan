//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev Jun 9, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.core
using [java] org.eclipse.dltk.ui.documentation
using [java] com.xored.f4.ui.text
using [java] org.eclipse.jdt.core::IJavaElement
using [java] org.eclipse.jdt.core::IMember as JavaMember
using [java] org.eclipse.jdt.ui::JavaElementLabels
using "[java]org.eclipse.jdt.internal.ui.viewsupport"::JavaElementImageProvider

using f4core
using f4parser
using f4model
using fandoc
**
**
**
class FandocProvider : ScriptDocumentationProviderBridge, IScriptDocumentationProviderExtension2
{
  override Str? getStrInfo(Str? content) { "" }
  
  override Str? getMemberInfo(IMember? elem, Bool lookParents, Bool lookExternal) 
  {
    src := elem.getSourceModule.getSource
    defNode := elem is IType ? type(elem) : slot(elem)
    if(defNode == null) return ""
    return compile(result(src, defNode)) 
  }
  override IDocumentationResponse? getDocumentationFor(Obj? element)
  {
    if( element is JavaMember )
    {
      doc := JDTJavaDocBridge.getJavaDoc((IJavaElement)element);
      label := JavaElementLabels.getElementLabel(element, JavaElementLabels.ALL_FULLY_QUALIFIED)
      img := imageProvider.getJavaImageDescriptor(element, JavaElementImageProvider.SMALL_ICONS
          .or(JavaElementImageProvider.OVERLAY_ICONS))
      if( doc != null)
      {
        return TextDocumentationResponse(element, label, img, doc)
      }
    }
    else if( element is IMember)
    {
      return TextDocumentationResponse(element, getMemberInfo((IMember)element, true, true))
    }
    return null
  }
    
  private JavaElementImageProvider imageProvider := JavaElementImageProvider()
  
  protected CUnit unit(IMember member)
  {
    ParseUtil.parse(member.getSourceModule)
  }
  
  protected TypeDef? type(IMember member)
  {
    IMember tm := member.getDeclaringType ?: member
    return unit(tm).types.find |t|
    {
      name(t).text == tm.getElementName
    }
  }
  
  protected Node? slot(IMember member)
  {
    type(member)?.slots?.find |n|
    {
      name((Node)n).text == member.getElementName
    } as Node
  }
  
  protected Id name(Node node)
  {
    if(node is DefNode) return (node as DefNode).name
    else if(node is EnumValDef) return (node as EnumValDef).name
    return node->id
  }
  
  protected FanDoc[] docs(Node node)
  {
    if(node is DefNode) return (node as DefNode).docs
    else if (node is EnumValDef) return (node as EnumValDef).docs
    return node->docs
  }
  
  protected Str result(Str src, Node node)
  {
    docs(node).map |doc|
    {
      src[doc.start..doc.end].splitLines.map |s|
      {
        s = s.trim
        if (s.startsWith("**")) s = s[2..-1]
        // See compiler::Tokenizer#docComment
        if (s.startsWith(" ")) s = s[1..-1]
        return s
      }.join("\n")
    }.join("\n") 
  }
  
  protected Str compile(Str fandoc)
  {
    doc := FandocParser().parseStr(fandoc)
    buf := StrBuf()
    doc.write(HtmlDocWriter(buf.out))
    return buf.toStr
  }
  
  
}
