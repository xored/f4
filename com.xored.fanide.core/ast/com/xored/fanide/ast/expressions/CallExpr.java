package com.xored.fanide.ast.expressions;

import org.eclipse.dltk.ast.ASTVisitor;
import org.eclipse.dltk.ast.expressions.CallArgumentsList;
import org.eclipse.dltk.ast.expressions.Expression;
import org.eclipse.dltk.ast.references.SimpleReference;

public class CallExpr extends Expression implements FanExpressionConstants {

	private CallArgumentsList args;
	private Expression receiver;
	private SimpleReference caller;

	private Closure closure;

	public CallExpr(int start, int end) {
		super(start, end);
	}

	public CallExpr() {
	}

	@Override
	public int getKind() {
		return E_CALL;
	}

	public CallArgumentsList getArgs() {
		return args;
	}

	public void setArgs(CallArgumentsList args) {
		this.args = args;
	}

	public Closure getClosure() {
		return closure;
	}

	public void setClosure(Closure closure) {
		this.closure = closure;
	}

	public SimpleReference getCaller() {
		return caller;
	}

	public void setCaller(SimpleReference caller) {
		this.caller = caller;
	}

	public Expression getReceiver() {
		return receiver;
	}

	public void setReceiver(Expression receiver) {
		this.receiver = receiver;
	}

	@Override
	public void traverse(ASTVisitor visitor) throws Exception {
		if (visitor.visit(this)) {
			if (receiver != null)
				receiver.traverse(visitor);
			if (caller != null)
				caller.traverse(visitor);
			if (args != null)
				args.traverse(visitor);
			if (closure != null)
				closure.traverse(visitor);
			visitor.endvisit(this);
		}
	}
}
