package com.xored.fanide.ast.statements;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.statements.Statement;
import org.eclipse.dltk.utils.CorePrinter;

public class DefaultStmt extends Statement {

	protected Statement body;

	@Override
	public int getKind() {
		return S_CASE;
	}

	public Statement getBody() {
		return body;
	}

	public void setBody(Statement body) {
		this.body = body;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (body != null)
				body.traverse(visitor);
			visitor.endvisit(this);
		}
	}

	public void printNode(CorePrinter output) {
		output.formatPrintLn("default: ");
		output.indent();
		if (body != null) {
			body.printNode(output);
		}
		output.dedent();
	}
}
