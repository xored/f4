#! /usr/bin/env fan
//
// Copyright (c) 2008, Brian Frank and Andy Frank
// Licensed under the Academic Free License version 3.0
//
// History:
//   20 Nov 08  Brian Frank  Break out tests
//

using build

**
** Build: testJava
**
class Build : BuildPod
{
  new make()
  {
    podName = "testJava"
    summary = "Test suite for Java FFI compiler plugin"
    meta    = ["org.name":     "Fantom",
               "org.uri":      "http://fantom.org/",
               "proj.name":    "Fantom Core",
               "proj.uri":     "http://fantom.org/",
               "license.name": "Academic Free License 3.0",
               "vcs.name":     "Mercurial",
               "vcs.uri":      "http://hg.fantom.org/fan-1.0/"]
    depends = ["sys 1.0", "compiler 1.0", "compilerJava 1.0", "testCompiler 1.0"]
    srcDirs = [`fan/`]
    docApi  = false
  }
}

