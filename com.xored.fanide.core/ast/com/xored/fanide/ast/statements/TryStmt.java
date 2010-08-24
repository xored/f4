package com.xored.fanide.ast.statements;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.statements.Block;
import org.eclipse.dltk.ast.statements.Statement;
import org.eclipse.dltk.utils.CorePrinter;

public class TryStmt extends Statement {
	private Block body;
	private List<CatchStmt> catches = new ArrayList<CatchStmt>();
	private FinallyStmt finallyBlock;

	public Block getBody() {
		return body;
	}

	public void setBody(Block body) {
		this.body = body;
	}

	public List<CatchStmt> getCatches() {
		return Collections.unmodifiableList(catches);
	}

	public void addCatch(CatchStmt c) {
		this.catches.add(c);
	}

	public void setCatches(List<CatchStmt> catches) {
		this.catches = catches;
	}

	public FinallyStmt getFinallyBlock() {
		return finallyBlock;
	}

	public void setFinally(FinallyStmt finallyBlock) {
		this.finallyBlock = finallyBlock;
	}

	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (this.body != null) {
				this.body.traverse(visitor);
			}
			for (CatchStmt c : catches) {
				c.traverse(visitor);
			}
			if (finallyBlock != null) {
				finallyBlock.traverse(visitor);
			}
			visitor.endvisit(this);
		}
	}

	public int getKind() {
		return S_TRY;
	}

	public void printNode(CorePrinter output) {
		output.formatPrint("try:");
		if (this.body != null) {
			this.body.printNode(output);
		}
		for (CatchStmt c : catches) {
			c.printNode(output);
			output.println("");
		}
		if (this.finallyBlock != null) {
			this.finallyBlock.printNode(output);
		}
	}
}
