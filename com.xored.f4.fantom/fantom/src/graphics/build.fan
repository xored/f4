#! /usr/bin/env fan
//
// Copyright (c) 2017, Brian Frank and Andy Frank
// Licensed under the Academic Free License version 3.0
//
// History:
//   17 May 2017  Brian Frank  Creation
//

using build

**
** Build: graphics
**
class Build : BuildPod
{
  new make()
  {
    podName  = "graphics"
    summary  = "Graphics API"
    meta     = ["org.name":     "Fantom",
                "org.uri":      "https://fantom.org/",
                "proj.name":    "Fantom Core",
                "proj.uri":     "https://fantom.org/",
                "license.name": "Academic Free License 3.0",
                "vcs.name":     "Git",
                "vcs.uri":      "https://github.com/fantom-lang/fantom"]
    depends  = ["sys 1.0", "concurrent 1.0"]
    srcDirs  = [`fan/`, `test/`]
    docSrc   = true
  }
}