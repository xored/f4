package com.xored.fanide.ast.statements;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.references.SimpleReference;
import org.eclipse.dltk.ast.statements.Statement;
import org.eclipse.dltk.utils.CorePrinter;

import com.xored.fanide.ast.typesystem.FanTypeRef;

public class CatchStmt extends Statement {
	private Statement body;
	private FanTypeRef caughtType;
	private SimpleReference caught;

	public SimpleReference getCaught() {
		return caught;
	}

	public void setCaught(SimpleReference caught) {
		this.caught = caught;
	}

	public FanTypeRef getCaughtType() {
		return caughtType;
	}

	public void setCaughtType(FanTypeRef caughtType) {
		this.caughtType = caughtType;
	}

	public Statement getBody() {
		return body;
	}

	public void setBody(Statement body) {
		this.body = body;
	}

	public int getKind() {
		return Statement.S_TRY_CATCH;
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
		output.formatPrintLn("catch:");
		if (this.body != null) {
			this.body.printNode(output);
		}
	}
}