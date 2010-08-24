package com.xored.fanide.ast.statements;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.eclipse.core.runtime.Assert;
import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Expression;
import org.eclipse.dltk.ast.statements.Statement;
import org.eclipse.dltk.utils.CorePrinter;

public class SwitchStmt extends Statement {
	private Expression expression;
	private List<CaseStmt> cases = new ArrayList<CaseStmt>();
	private DefaultStmt defaultStmt;

	public Expression getExpression() {
		return expression;
	}

	public void setExpression(Expression expression) {
		this.expression = expression;
	}

	public List<CaseStmt> getCases() {
		return Collections.unmodifiableList(cases);
	}

	public void setCases(List<CaseStmt> cases) {
		this.cases = cases;
	}

	public void addCase(CaseStmt c) {
		Assert.isLegal(c != null);
		this.cases.add(c);
	}

	public DefaultStmt getDefault() {
		return defaultStmt;
	}

	public void setDefault(DefaultStmt defaultStmt) {
		this.defaultStmt = defaultStmt;
	}

	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (expression != null) {
				expression.traverse(visitor);
			}
			for (CaseStmt c : cases) {
				c.traverse(visitor);
			}
			visitor.endvisit(this);
		}

	}

	public int getKind() {
		return S_SWITCH;
	}

	public void printNode(CorePrinter output) {
		output.formatPrintLn("switch:");
		if (this.expression != null) {
			this.expression.printNode(output);
		}
		output.indent();
		for (CaseStmt c : cases) {
			c.printNode(output);
			output.println();
		}
		output.dedent();
	}
}
