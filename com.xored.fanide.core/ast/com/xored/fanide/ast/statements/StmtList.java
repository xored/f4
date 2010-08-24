package com.xored.fanide.ast.statements;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.eclipse.dltk.ast.statements.Statement;
import org.eclipse.dltk.utils.CorePrinter;

public class StmtList extends Statement {
	private List<Statement> list = new ArrayList<Statement>();

	public List<Statement> get() {
		return Collections.unmodifiableList(list);
	}

	public void set(List<Statement> list) {
		this.list = list;
	}

	public void add(Statement stmt) {
		this.list.add(stmt);
	}

	@Override
	public int getKind() {
		return 0;
	}

	public void printNode(CorePrinter output) {
		for (Statement st : list) {
			st.printNode(output);
			output.formatPrintLn("");
		}
	}
}
