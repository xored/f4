package com.xored.fanide.ast.statements;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Expression;
import org.eclipse.dltk.ast.statements.Statement;
import org.eclipse.dltk.utils.CorePrinter;

public class ForStmt extends Statement {

	private Expression initialization;

	private Expression condition;

	private Expression increment;

	private Statement body;

	public int getKind() {
		return S_FOR;
	}

	public Expression getInitialization() {
		return initialization;
	}

	public void setInitialization(Expression initialization) {
		this.initialization = initialization;
	}

	public Expression getCondition() {
		return condition;
	}

	public void setCondition(Expression condition) {
		this.condition = condition;
	}

	public Expression getIncrement() {
		return increment;
	}

	public void setIncrement(Expression increment) {
		this.increment = increment;
	}

	public Statement getBody() {
		return body;
	}

	public void setBody(Statement body) {
		this.body = body;
	}

	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (initialization != null) {
				initialization.traverse(visitor);
			}
			if (condition != null) {
				condition.traverse(visitor);
			}
			if (increment != null) {
				increment.traverse(visitor);
			}
			if (body != null) {
				body.traverse(visitor);
			}
			visitor.endvisit(this);
		}
	}

	public void printNode(CorePrinter output) {
		output.formatPrintLn("for: ");
		if (condition != null) {
			output.formatPrintLn(" in ");
			condition.printNode(output);
		}
		if (body != null) {
			body.printNode(output);
		}
	}
}
