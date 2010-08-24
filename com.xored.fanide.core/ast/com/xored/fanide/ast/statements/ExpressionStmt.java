package com.xored.fanide.ast.statements;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.Expression;
import org.eclipse.dltk.ast.statements.Statement;
import org.eclipse.dltk.utils.CorePrinter;

public class ExpressionStmt extends Statement {
	private Expression expression = null;

	@Override
	public int getKind() {
		return 0;
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
			if (expression != null) {
				expression.traverse(visitor);
			}
			visitor.endvisit(this);
		}
	}

	public void printNode(CorePrinter output) {
		if (expression != null) {
			expression.printNode(output);
			output.println();
		}
	}
}
