package com.xored.fanide.ast.statements;

import org.eclipse.dltk.ast.expressions.Expression;
import org.eclipse.dltk.ast.statements.Statement;
import org.eclipse.dltk.utils.CorePrinter;

public class ThrowStmt extends Statement {
	private Expression thrown;

	public Expression getThrown() {
		return thrown;
	}

	public void setThrown(Expression thrown) {
		this.thrown = thrown;
	}

	public int getKind() {
		return S_THROW;
	}

	public void printNode(CorePrinter output) {
		output.formatPrint("throw");
		if (thrown != null) {
			output.formatPrint(" ");
			thrown.printNode(output);
		}
		output.formatPrintLn("");
	}
}
