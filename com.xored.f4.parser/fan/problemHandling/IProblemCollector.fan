mixin IProblemCollector
{
  abstract Void addProblem(IProblem prob)
}

class ProblemCollector : IProblemCollector
{
  IProblem[] list := [,]
  
  override Void addProblem(IProblem prob)
  {
    list.add(prob)
  }
}