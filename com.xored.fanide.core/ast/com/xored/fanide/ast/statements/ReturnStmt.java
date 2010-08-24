package com.xored.fanide.ast.statements;

import org.eclipse.dltk.ast.expressions.Expression;
import org.eclipse.dltk.ast.statements.Statement;
import org.eclipse.dltk.utils.CorePrinter;

public class ReturnStmt extends Statement {
	private Expression returned;

	public Expression getReturned() {
		return returned;
	}

	public void setReturned(Expression returned) {
		this.returned = returned;
	}

	public int getKind() {
		return S_RETURN;
	}

	public void printNode(CorePrinter output) {
		output.formatPrint("return");
		if (returned != null) {
			output.formatPrint(" ");
			returned.printNode(output);
		}
		output.formatPrintLn("");
	}
}
