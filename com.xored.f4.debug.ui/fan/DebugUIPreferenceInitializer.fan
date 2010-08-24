//
// Copyright (c) 2010 xored software, Inc.
// Licensed under Eclipse Public License version 1.0
//
// History:
//   Ivan Inozemtsev May 31, 2010 - Initial Contribution
//

using [java] org.eclipse.dltk.debug.ui
using f4core
**
**
**
class DebugUIPreferenceInitializer : DLTKDebugUIPluginPreferenceInitializer
{
  override protected Str? getNatureId := F4Nature.id
}
