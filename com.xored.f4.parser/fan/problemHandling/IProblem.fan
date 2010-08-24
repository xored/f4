const mixin IProblem
{
  abstract ProblemKind kind()
  abstract Severity severity()
  abstract Int start()
  abstract Int end()  
  abstract Int line()
  abstract Str msg()
  abstract Str? fileName()
}