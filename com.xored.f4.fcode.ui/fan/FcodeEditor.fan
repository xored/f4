//
// Copyright (c) 2009 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   talnikov May 6, 2010 - Initial Contribution
//

using [java] java.lang::Class
using [java] org.eclipse.core.runtime::IProgressMonitor
using [java] org.eclipse.ui.plugin::AbstractUIPlugin
using [java] org.eclipse.ui.part::EditorPart
using [java] org.eclipse.ui::IEditorInput
using [java] org.eclipse.ui::IEditorSite
using [java] org.eclipse.ui::IStorageEditorInput
using [java] org.eclipse.ui.views.contentoutline::IContentOutlinePage
using [java] org.eclipse.swt::SWT
using [java] org.eclipse.swt.custom::StyledText
using [java] org.eclipse.swt.custom::StyleRange
using [java] org.eclipse.swt.custom::CaretListener
using [java] org.eclipse.swt.custom::CaretEvent
using [java] org.eclipse.swt.graphics::Color
using [java] org.eclipse.swt.graphics::Point
using [java] org.eclipse.swt.widgets::Composite
using [java] org.eclipse.jface.action::IAction
using [java] org.eclipse.jface.viewers::ISelectionChangedListener
using [java] org.eclipse.jface.viewers::IStructuredSelection
using [java] org.eclipse.jface.viewers::SelectionChangedEvent
using [java] org.eclipse.jface.resource::JFaceResources
using [java] org.eclipse.jface.preference::IPreferenceStore
using [java] org.eclipse.dltk.core::IModelElement
using [java] org.eclipse.dltk.core::ISourceReference
using [java] org.eclipse.dltk.core::IDLTKLanguageToolkit
using [java] org.eclipse.dltk.core::IParameter
using [java] org.eclipse.dltk.core.model.binary::BinaryMember
using [java] org.eclipse.dltk.core.model.binary::BinaryMethod
using "[java]org.eclipse.dltk.internal.ui.editor"::EditorUtility
using "[java]org.eclipse.dltk.internal.ui.editor"::IScriptEditor
using "[java]org.eclipse.dltk.internal.ui.editor"::ScriptOutlinePage

using [java] com.xored.fanide.core::FanLanguageToolkit
using "[java]com.xored.fanide.internal.core.model"::PodModule

using f4fcode::FcodeReader
using f4fcode::FcodeVisitor
using f4uiCore
using f4uiText
using compiler

**
** FcodeEditor
**
class FcodeEditor : EditorPart, FcodeVisitor, IScriptEditor, ISelectionChangedListener
{
  private StyledText? control
  private IContentOutlinePage? outlinePage
  private FcodeFontStyle fontStyle := FcodeFontStyle()

  private StyledStr text := StyledStr()
  private Str:IModelElement model := [:]
  private Definition[] definitions := [,]

  // editor

  override Void doSave(IProgressMonitor? monitor) {}
  override Bool isSaveAsAllowed() { false }
  override Void doSaveAs() {}
  override Bool isDirty() { false }
  override Void dispose() { fontStyle.dispose }

  override Void setFocus() { control.setFocus }

  override Void createPartControl(Composite? parent)
  {
    control = StyledText(parent, SWT.H_SCROLL.or(SWT.V_SCROLL))
    control.setEditable(false)
    control.setFont(JFaceResources.getFont(JFaceResources.TEXT_FONT))
    updateContent
  }

  override Void init(IEditorSite? site, IEditorInput? input)
  {
    setSite(site)
    setInput(input)
  }

  override Void setInput(IEditorInput? input)
  {
    super.setInput(input)
    updateContent
  }

  private PodModule? storage()
  {
    return (getEditorInput as IStorageEditorInput)?.getStorage as PodModule
  }

  private Void updateContent()
  {
    pod := storage

    if (control == null || pod == null) { return }
    setPartName(pod.getElementName)

    // clear definitions
    definitions.clear

    // visit types
    text = StyledStr()
    FcodeReader(File(Uri.decode(pod.getParent.getPath.toStr.split(':').last))).accept(this)

    // update control
    control.setText(text.toStr)
    control.setStyleRanges(text.styles.map |range -> StyleRange|
      {
        style := fontStyle.fontStyle(range.styleKey)
        return StyleRange(
          range.offset, range.len, style.clr, control.getBackground, style.style)
      } as StyleRange[])

    // make binary types map
    model.clear
    BinaryMember[] toVisit := pod.getChildren
    while (!toVisit.isEmpty)
    {
      BinaryMember e := toVisit.first
      toVisit.removeAt(0)
      model[elementName(e)] = e
      toVisit.addAll(e.getChildren)
    }
  }

  override Obj? getAdapter(Class? required)
  {
    // TODO: fix forName
    if (required == Class.forName("org.eclipse.ui.views.contentoutline.IContentOutlinePage"))
    {
      return outlinePage = createOutlinePage
    }
    return super.getAdapter(required)
  }

  private ScriptOutlinePage createOutlinePage()
  {
    page := FanOutlinePage(this, FanUI.instance.plugin.getPreferenceStore)
    setOutlinePageInput(page, getEditorInput)
    page.addPostSelectionChangedListener(this)
    control.addCaretListener(EditorSelectionListener(this, page))
    return page
  }

  private Void setOutlinePageInput(ScriptOutlinePage page, IEditorInput editorInput)
  {
    me := getInputModelElement
    page.setInput(me != null && me.exists ? me : null)
  }

  public IModelElement? getInputModelElement()
  {
    EditorUtility.getEditorInputModelElement(this, false)
  }

  // script editor

  override ISourceReference? computeHighlightRangeSourceReference()
  {
    element := getElementAt(control.getCaretOffset)
    if (element == null || element isnot ISourceReference) return null
    return element as ISourceReference
  }

  override Void synchronizeOutlinePage(ISourceReference? element, Bool checkIfOutlinePageActive) {}

  override IDLTKLanguageToolkit? getLanguageToolkit() { FanLanguageToolkit.getDefault }

  override IAction? getAction(Str? undo) { null }

  override Void outlinePageClosed() {}

  override IModelElement? getElementAt(Int offset)
  {
    def := definitions.find { it.start <= offset && offset < it.end }
    if (def == null) return null
    while (true)
    {
      inner := def.inner.find { it.start <= offset && offset < it.end }
      if (inner == null) return model.get(def.key, null)
      def = inner
    }
    return null
  }

  override Void setSelection(IModelElement? element)
  {
    elementDeclaration := findName(element)
    if (elementDeclaration == null) { return }
    updateControlSelection(elementDeclaration.x, elementDeclaration.y)
  }

  private Void updateControlSelection(Int start, Int end)
  {
    // TODO: asynch
    //control.setFocus();
    control.setSelection(start, end);
    control.showSelection();
  }

  private static Str elementName(IModelElement element)
  {
    switch (element.getElementType)
    {
      case IModelElement.FIELD:
        return "${element.getParent.getElementName}.${element.getElementName}"
      case IModelElement.METHOD:
        IParameter[] params := (element as BinaryMethod).getParameters
        paramsStr := params.map{ it.getType }.join(", ")
        return "${element.getParent.getElementName}.${element.getElementName}($paramsStr)"
    }
    return element.getElementName // case IModelElement.TYPE
  }

  private Point? findName(IModelElement element)
  {
    frag := text.userKeys.get(elementName(element), null)
    if (frag == null) return null
    return text.range(frag)
  }

  // selection listener

  override Void selectionChanged(SelectionChangedEvent? event)
  {
    selection := event.getSelection
    if (selection is IStructuredSelection)
    {
      element := (selection as IStructuredSelection).getFirstElement
      if (element != null && element is IModelElement)
      {
        setSelection(element as IModelElement)
      }
    }
  }

  // visitor

  override Bool visitType(FType type)
  {
    // TODO: fix
    if ((storage.getFTypes.toArray as Str[]).any { it.split('/')[-1] == "${type.name}.fcode" })
    {
      text.appendFragment(
        "
         **************************************************************************
         ** $type.name
         **************************************************************************
         
         ", FcodeFontStyle.comment)
      definitions.add(Definition(TypeDeclStr.key(type), Point(text.size, -1)))
      text.append(TypeDeclStr(type))
      text.appendFragment("\n{\n")
      return true
    }
    return false
  }

  override Void visitMethod(FMethod method)
  {
    // getters and setters are handled when visiting corresponding field
    if (method.flags.and(FConst.Getter) == 0 && method.flags.and(FConst.Setter) == 0)
    {
      definitions[-1].insert(Definition(MethodDeclStr.key(method),
        appendMethod(method, "\t")))
    }
  }

  private Point appendMethod(FMethod method, Str offset)
  {
    text.appendFragment("\n")

    text.appendFragment(offset)
    range := text.append(MethodDeclStr(method))
    text.appendFragment("\n")
    if (method.code != null)
    {
      range.y = text.append(MethodBodyStr(method.code, method.pod, offset)).y
    }
    return range
  }

  override Void visitField(FField field)
  {
    text.appendFragment("\n")

    text.appendFragment("\t")
    range := text.append(FieldStr(field))
    // plus one to treat end of field name as still field
    range.y = range.y + 1

    text.appendFragment("\n")
    getter := field.fparent.fmethods.find
    {
      it.name == field.name && it.flags.and(FConst.Getter) != 0
    }
    setter := field.fparent.fmethods.find
    {
      it.name == field.name && it.flags.and(FConst.Setter) != 0
    }
    if (getter != null || setter != null)
    {
      text.appendFragment("\t{\n")
      if (getter != null) appendMethod(getter, "\t\t")
      if (setter != null) appendMethod(setter, "\t\t")
      endpoint := text.appendFragment("\t}\n")

      range.y = endpoint.y - 1 // minus one for \n
    }

    definitions[-1].insert(Definition(FieldStr.key(field), range))
  }

  override Void endVisitType()
  {
    text.appendFragment("}\n")
    definitions[-1].end = text.size
  }
}

internal class EditorSelectionListener : CaretListener
{
  FcodeEditor editor { private set }
  FanOutlinePage page { private set }

  new make(FcodeEditor editor, FanOutlinePage page)
  {
    this.editor = editor
    this.page = page
  }

  override Void caretMoved(CaretEvent? e)
  {
    sourceRef := editor.computeHighlightRangeSourceReference
    page.removePostSelectionChangedListener(editor)
    page.select(sourceRef)
    page.addPostSelectionChangedListener(editor)
  }
}

internal class Definition
{
  Str key
  Int start
  Int end
  Definition[] inner := [,]

  new make(Str key, Point range)
  {
    this.key = key
    start = range.x;
    end = range.y
  }

  Bool in(Definition another) { another.start < start && another.end > end }
  Void insert(Definition def) { inner.add(def) }
}
