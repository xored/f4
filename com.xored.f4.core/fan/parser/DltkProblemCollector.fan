using [java]org.eclipse.dltk.compiler.problem::IProblemReporter
using [java]org.eclipse.dltk.compiler.problem::IProblem as IDltkProblem
using [java]org.eclipse.dltk.compiler.problem::IProblemIdentifier

using [java]org.eclipse.dltk.compiler.problem::ProblemSeverity

using f4parser
class DltkProblemCollector : IProblemCollector
{
  IProblemReporter reporter
  
  new make(IProblemReporter reporter) {this.reporter = reporter}
  
  override Void addProblem(IProblem prob)
  {
    reporter.reportProblem(DltkProblem(prob))
  }  
}

const class DltkProblem : Problem, IProblem, IDltkProblem
{
  override Str?[]? getArguments() {return Str?[,]}
  override IProblemIdentifier? getID() {return null}
  override Str? getMessage() {return msg}
  override Str? getOriginatingFileName() {return fileName}
  override Int getSourceEnd() {return end}
  override Int getSourceLineNumber() {return line}
  override Int getSourceStart() {return start}
  override Bool isError() {return severity === Severity.err}
  override Bool isWarning() {return severity === Severity.warn}
  override Bool isTask() { return false }
  override Void setSourceEnd(Int sourceEnd) {}
  override Void setSourceLineNumber(Int lineNumber) {}
  override Void setSourceStart(Int sourceStart) {}
  
  /*override*/ ProblemSeverity? getSeverity() {return null}
  /*override*/ Void setSeverity(ProblemSeverity? severity) {}
  
  
  
  new make(IProblem p)
  : super(p.severity, p.kind, p.msg, 
    p.start, p.end, p.line, p.fileName) {}
  
}
