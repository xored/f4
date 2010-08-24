package com.xored.fanide.ast.statements;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.statements.Statement;
import org.eclipse.dltk.utils.CorePrinter;

/**
 * While statement.
 */
public class WhileStmt extends Statement {
	private Statement condition;
	private Statement body;

	public Statement getCondition() {
		return condition;
	}

	public void setCondition(Statement condition) {
		this.condition = condition;
	}

	public Statement getBody() {
		return body;
	}

	public void setBody(Statement body) {
		this.body = body;
	}

	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (condition != null) {
				condition.traverse(visitor);
			}
			if (body != null) {
				body.traverse(visitor);
			}
			visitor.endvisit(this);
		}
	}

	public int getKind() {
		return S_WHILE;
	}

	public void printNode(CorePrinter output) {
		output.formatPrintLn("while");
		if (this.condition != null) {
			this.condition.printNode(output);
		}
		if (this.body != null) {
			output.indent();
			this.body.printNode(output);
			output.dedent();
		}
		output.formatPrint("");
	}
}
