using [java] org.eclipse.jface.dialogs::IDialogSettings
using [java] org.eclipse.jface.viewers::IStructuredSelection

abstract class FanNewTypePageHelper
{
  const TypeKind typeKind
  const Str pageName
  const Str title
  const Str description
  new make(TypeKind typeKind, Str pageName, Str title, Str description)
  {
    this.typeKind = typeKind
    this.pageName = pageName
    this.title = title
    this.description = description
  }
  abstract Void storeSettings(IDialogSettings dialogSettings)
  abstract Str getTypeBody(Str typeName, Str typeDelimiter)
  abstract Void init(IStructuredSelection selection, FanNewTypePage page)
}
