package com.xored.fanide.ast.statements;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.statements.Statement;
import org.eclipse.dltk.utils.CorePrinter;

public class FinallyStmt extends Statement {
	private Statement body;

	public Statement getBody() {
		return body;
	}

	public void setBody(Statement body) {
		this.body = body;
	}

	public int getKind() {
		return Statement.S_TRY_FINALLY;
	}

	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (this.body != null) {
				this.body.traverse(visitor);
			}
			visitor.endvisit(this);
		}
	}

	public void printNode(CorePrinter output) {
		output.formatPrintLn("finally:");
		if (this.body != null) {
			this.body.printNode(output);
		}
	}
}
