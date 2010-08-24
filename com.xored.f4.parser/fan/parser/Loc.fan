const class Loc
{
  const Int start
  const Int end
  const Int? line
  
  new make(Int start, Int end, Int? line := null, Str? fileName := null)
  {
    this.start = start
    this.end = end
    this.line = line
  }
}
