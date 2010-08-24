package com.xored.fanide.ast.statements;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Expression;
import org.eclipse.dltk.utils.CorePrinter;

public class CaseStmt extends DefaultStmt {

	private Expression expression;

	@Override
	public int getKind() {
		return S_CASE;
	}

	public Expression getExpression() {
		return expression;
	}

	public void setExpression(Expression expression) {
		this.expression = expression;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (expression != null)
				expression.traverse(visitor);
			if (body != null)
				body.traverse(visitor);
			visitor.endvisit(this);
		}
	}

	public void printNode(CorePrinter output) {
		output.formatPrintLn("case: ");
		output.indent();
		if (expression != null) {
			expression.printNode(output);
			output.println();
		}
		if (body != null) {
			body.printNode(output);
		}
		output.dedent();
	}
}
