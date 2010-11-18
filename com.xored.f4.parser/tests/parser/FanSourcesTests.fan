using f4model

class FanSourcesTests : Test, UnixExecutableCutter
{
  Void testParseBuild()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/build/`),
      FakeFanNamespace(FakeFanPod(Pod.find("build"))))    
  }
  
  Void testParseCompiler()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/compiler/`),
      FakeFanNamespace(FakeFanPod(Pod.find("compiler"))))    
  }
  
  Void testParseCompilerJs()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/compilerJs/`),
      FakeFanNamespace(FakeFanPod(Pod.find("compilerJs"))))    
  }
  
  Void testParseDocCompiler()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/doCompiler/`),
      FakeFanNamespace(FakeFanPod(Pod.find("docCompiler"))))    
  }
  
  Void testParseDom()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/dom/`),
      FakeFanNamespace(FakeFanPod(Pod.find("dom"))))    
  }
  
  Void testParseEmail()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/email/`),
      FakeFanNamespace(FakeFanPod(Pod.find("email"))))    
  }
  
  Void testParseFandoc()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/fandoc/`),
      FakeFanNamespace(FakeFanPod(Pod.find("fandoc"))))    
  }
  
  Void testParseFansh()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/fansh/`),
      FakeFanNamespace(FakeFanPod(Pod.find("fansh"))))    
  }
  
//  Void testParseFlux()
//  {   
//    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/flux/`),
//      FakeFanNamespace(FakeFanPod(Pod.find("flux"))))    
//  }
  
  Void testParseFwt()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/fwt/`),
      FakeFanNamespace(FakeFanPod(Pod.find("fwt"))))    
  }
  
  Void testParseGfx()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/gfx/`),
      FakeFanNamespace(FakeFanPod(Pod.find("gfx"))))    
  }
  
  Void testParseInet()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/inet/`),
      FakeFanNamespace(FakeFanPod(Pod.find("inet"))))    
  }
  
  Void testParseJson()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/json/`),
      FakeFanNamespace(FakeFanPod(Pod.find("json"))))    
  }
  
  Void testParseObix()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/obix/`),
      FakeFanNamespace(FakeFanPod(Pod.find("obix"))))    
  }
  
  Void testParseSql()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/sql/`),
      FakeFanNamespace(FakeFanPod(Pod.find("sql"))))    
  }
  
  Void testParseSys()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/sys/`),
      FakeFanNamespace(FakeFanPod(Pod.find("sys"))))    
  }
  
  Void testParseTestCompiler()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/testCompiler/`),
      FakeFanNamespace(FakeFanPod(Pod.find("testCompiler"))))    
  }
  
  Void testParseTestJava()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/testJava/`),
      FakeFanNamespace(FakeFanPod(Pod.find("testJava"))))    
  }
  
  Void testParseTestNative()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/testNative/`),
      FakeFanNamespace(FakeFanPod(Pod.find("testNative"))))    
  }
  
  Void testParseTestSys()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/testSys/`),
      FakeFanNamespace(FakeFanPod(Pod.find("testSys"))))    
  }
  
  Void testParseUtil()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/util/`),
      FakeFanNamespace(FakeFanPod(Pod.find("util"))))    
  }
  
  Void testParseTestWeb()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/web/`),
      FakeFanNamespace(FakeFanPod(Pod.find("web"))))    
  }
  
  Void testParseTestWebmod()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/webmod/`),
      FakeFanNamespace(FakeFanPod(Pod.find("webmod"))))    
  }
  
  Void testParseTestWisp()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/wisp/`),
      FakeFanNamespace(FakeFanPod(Pod.find("wisp"))))    
  }
  
  Void testParseTestXml()
  {   
    parse(File(`file:/D:/work/fan/fantom-1.0.52/src/xml/`),
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
