package com.xored.fanide.ast.statements;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.statements.Block;
import org.eclipse.dltk.ast.statements.Statement;
import org.eclipse.dltk.utils.CorePrinter;

/**
 * If statement.
 */
public class IfStmt extends Statement {
	private Statement condition;
	private Statement thenBody;
	private Statement elseBody;

	public Statement getCondition() {
		return condition;
	}

	public void setCondition(Statement condition) {
		this.condition = condition;
	}

	public Statement getThenBody() {
		return thenBody;
	}

	public void setThenBody(Statement thenBody) {
		this.thenBody = thenBody;
	}

	public Statement getElseBody() {
		return elseBody;
	}

	public void setElseBody(Statement elseBody) {
		this.elseBody = elseBody;
	}

	public void traverse(ASTVisitor visitor) throws Exception {

		if (visitor.visit(this)) {
			if (condition != null) {
				condition.traverse(visitor);
			}
			if (thenBody != null) {
				thenBody.traverse(visitor);
			}
			if (elseBody != null) {
				elseBody.traverse(visitor);
			}
			visitor.endvisit(this);
		}
	}

	public int getKind() {
		return S_IF;
	}

	public void printNode(CorePrinter output) {
		output.formatPrintLn("if: ");
		if (this.condition != null) {
			this.condition.printNode(output);
		}
		if (this.thenBody != null) {
			if (!(this.thenBody instanceof Block)) {
				output.indent();
			}
			this.thenBody.printNode(output);
			if (!(this.thenBody instanceof Block)) {
				output.dedent();
			}
		}
		if (this.elseBody != null) {
			output.formatPrintLn("else:");
			if (!(this.elseBody instanceof Block)) {
				output.indent();
			}
			this.elseBody.printNode(output);
			if (!(this.elseBody instanceof Block)) {
				output.dedent();
			}
		}

	}
}
