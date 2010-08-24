package com.xored.fanide.ast.statements;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.statements.Statement;
import org.eclipse.dltk.utils.CorePrinter;

public class ContinueStmt extends Statement {

	@Override
	public int getKind() {
		return S_CONTINUE;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			visitor.endvisit(this);
		}
	}

	@Override
	public void printNode(CorePrinter output) {
		output.formatPrintLn("continue");
	}
}
