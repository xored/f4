const class Problem : Err, IProblem
{
  override const ProblemKind kind
  override const Severity severity
  override const Int start
  override const Int end  
  override const Int line
  override const Str? fileName
  
  new make(Severity severity, ProblemKind kind, Str msg, 
    Int start, Int end, Int line, Str? fileName)
    : super(msg)
  {
    this.kind = kind
    this.severity = severity
    this.start = start
    this.end = end
    this.line = line
    this.fileName = fileName
  }
  
  override Str toStr()
  {
    return "$fileName:$line $msg"
  }
}