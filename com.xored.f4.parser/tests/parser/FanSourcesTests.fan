using f4model

class FanSourcesTests : Test, UnixExecutableCutter
{
  Void testParseBuild()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/build/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("build"))))    
  }
  
  Void testParseCompiler()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/compiler/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("compiler"))))    
  }
  
  Void testParseCompilerJs()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/compilerJs/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("compilerJs"))))    
  }
  
  Void testParseDocCompiler()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/doCompiler/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("docCompiler"))))    
  }
  
  Void testParseDom()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/dom/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("dom"))))    
  }
  
  Void testParseEmail()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/email/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("email"))))    
  }
  
  Void testParseFandoc()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/fandoc/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("fandoc"))))    
  }
  
  Void testParseFansh()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/fansh/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("fansh"))))    
  }
  
//  Void testParseFlux()
//  {   
//    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/flux/`),
//      FakeFanNamespace(FakeFanPod(Pod.find("flux"))))    
//  }
  
  Void testParseFwt()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/fwt/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("fwt"))))    
  }
  
  Void testParseGfx()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/gfx/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("gfx"))))    
  }
  
  Void testParseInet()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/inet/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("inet"))))    
  }
  
  Void testParseJson()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/json/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("json"))))    
  }
  
  Void testParseObix()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/obix/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("obix"))))    
  }
  
  Void testParseSql()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/sql/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("sql"))))    
  }
  
  Void testParseSys()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/sys/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("sys"))))    
  }
  
  Void testParseTestCompiler()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/testCompiler/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("testCompiler"))))    
  }
  
  Void testParseTestJava()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/testJava/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("testJava"))))    
  }
  
  Void testParseTestNative()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/testNative/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("testNative"))))    
  }
  
  Void testParseTestSys()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/testSys/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("testSys"))))    
  }
  
  Void testParseUtil()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/util/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("util"))))    
  }
  
  Void testParseTestWeb()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/web/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("web"))))    
  }
  
  Void testParseTestWebmod()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/webmod/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("webmod"))))    
  }
  
  Void testParseTestWisp()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/wisp/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("wisp"))))    
  }
  
  Void testParseTestXml()
  {   
    parse(`file:/D:/work/fan/fantom-1.0.52/src/xml/`.toFile,
      FakeFanNamespace(FakeFanPod(Pod.find("xml"))))    
  }
  
  // just parse
  Void parse(File dir, IFanNamespace ns)
  {
    Int i := 0
    Int avg := 0
    dir.walk |File f|
    {
      if (f.ext == "fan" 
        && f.name != "buildboot.fan"
        && f.name != "buildpods.fan"
        && f.name != "buildall.fan"
        && f.name != "build.fan" 
        && f.name != "pod.fan" 
        && f.name != "gamma.fan"
        && f.name != "test.fan") 
      {
        echo("${++i} : $f")
        Str content := f.readAllStr
        start := DateTime.now
        collector := ProblemCollector.make
        Str source := cutUnixExecutable(content)
        Parser.make(source, ns, f.pathStr, collector).cunit
//        info := SourceInfo(source, f.pathStr, collector)
//        echo(info.problemsToStr)
        verifyEq(collector.list.size, 0)
        end := DateTime.now
        avg += end.ticks - start.ticks
      }
    }
    echo("all: $avg")
    avg = i == 0 ? avg : avg/i
    avgTime := DateTime.makeTicks(avg)
    echo("avg: $avg")
    echo("avgTime: $avgTime.sec")
  }
}
