abstract const class Stmt : Node
{
  new make(Int start, Int end) : super(start, end) {}
}

const class Block : Stmt
{
  const Stmt[] stmts
  new make(Int start, Int end, Stmt[] stmts)
    : super(start, end) {this.stmts = stmts}
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      stmts.each {it.accept(v)}
      v.exitNode(this)
    }
  }
}

const class ExprStmt : Stmt
{
  const Expr expr  
  new make(Int start, Int end, Expr expr)
    : super(start, end) {this.expr = expr}
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      expr.accept(v)
      v.exitNode(this)
    }
  }
}

const class IfStmt : Stmt
{
  const Expr cond
  const Stmt trueBlock
  const Stmt? falseBlock
  
  new make(Int start, Int end, Expr cond, Stmt trueBlock, Stmt? falseBlock)
    : super(start, end)
  {
    this.cond = cond
    this.trueBlock = trueBlock
    this.falseBlock = falseBlock
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      cond.accept(v)
      trueBlock.accept(v)
      falseBlock?.accept(v)
      v.exitNode(this)
    }
  }
}

const class ReturnStmt : Stmt
{
  const Expr? returned  
  
  new make(Int start, Int end, Expr? returned) 
    : super(start, end) {this.returned = returned}
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      returned?.accept(v)
      v.exitNode(this)
    }
  }
}

const class ThrowStmt : Stmt
{
  const Expr thrown  
  
  new make(Int start, Int end, Expr thrown)
    : super(start, end) {this.thrown = thrown}
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      thrown.accept(v)
      v.exitNode(this)
    }
  }
}

const class WhileStmt : Stmt
{
  const Expr cond
  const Stmt block
  
  new make(Int start, Int end, Expr cond, Stmt block) 
    : super(start, end)
  {
    this.cond = cond
    this.block = block
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      cond.accept(v)
      block.accept(v)
      v.exitNode(this)
    }
  }
}

const class ForStmt : Stmt
{
  const Expr? init
  const Expr? cond
  const Expr? update
  const Stmt block
  
  new make(Int start, Int end, Expr? init, Expr? cond, Expr? update, Stmt block)
    : super(start, end)
  {
    this.init = init
    this.cond = cond
    this.update = update
    this.block = block
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      init?.accept(v)
      cond?.accept(v)
      update?.accept(v)
      block.accept(v)
      v.exitNode(this)
    }
  }
}

const class BreakStmt : Stmt
{
  new make(Int start, Int end) : super(start, end) {}
}

const class ContinueStmt : Stmt
{
  new make(Int start, Int end) : super(start, end) {}
}

const class TryStmt : Stmt
{
  const Stmt block
  const CatchStmt[] catches
  const Stmt? finallyBlock
  
  new make(Int start, Int end, Stmt block, CatchStmt[] catches, Stmt? finallyBlock)
    : super(start, end) 
  {
    this.block = block
    this.catches = catches
    this.finallyBlock = finallyBlock
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      block.accept(v)
      catches.each {it.accept(v)}
      finallyBlock?.accept(v)
      v.exitNode(this)
    }
  }
}

const class CatchStmt : Stmt {
	const LocalDef?	errVar	// errVars are optional for Fantom
	const Stmt		block

	new make(Int start, Int end, LocalDef? errVar, Stmt block) : super(start, end) {
		this.errVar	= errVar
		this.block	= block
	}
	
	override Void accept(AstVisitor v) {
		if (v.enterNode(this)) {
			
			block.accept(v)
				
			// make sure to accept the Err var *inside* the catch block, to make it available
			errVar?.accept(v)

			v.exitNode(this)
		}
	}
}

const class SwitchStmt : Stmt
{
  const Expr expr
  const CaseStmt[] cases
  const DefaultStmt? defaultBlock
  
  new make(Int start, Int end, Expr expr, CaseStmt[] cases, DefaultStmt? defaultBlock)
    : super(start, end)
  {
    this.expr = expr
    this.cases = cases
    this.defaultBlock = defaultBlock
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      expr.accept(v)
      cases.each {it.accept(v)}
      defaultBlock?.accept(v)
      v.exitNode(this)
    }
  }
}

const class CaseStmt : Stmt
{
  const Expr[] exprs
  const Stmt[]? block
  
  new make(Int start, Int end, Expr[] exprs, Stmt[]? block)
    : super(start, end)
  {
    this.exprs = exprs
    this.block = block
  }
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      exprs.each {it.accept(v)}
      
      if (block != null)
        block.each {it.accept(v)}
      
      v.exitNode(this)
    }
  }
}

const class DefaultStmt : Stmt
{
  const Stmt[] block
  
  new make(Int start, Int end, Stmt[] block)
    : super(start, end) {this.block = block}
  
  override Void accept(AstVisitor v)
  {
    if (v.enterNode(this))
    {
      block.each {it.accept(v)}
      v.exitNode(this)
    }
  }
}